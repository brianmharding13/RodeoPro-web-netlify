import {
  AbstractPowerSyncDatabase,
  PowerSyncBackendConnector,
  UpdateType,
} from '@powersync/web';
import { supabase } from './supabase';

const JSON_ARRAY_FIELDS: Record<string, string[]> = {
  users: ['expo_push_tokens'],
};

const CLIENT_ONLY_FIELDS: Record<string, string[]> = {
  media: ['local_uri'],
};

const INTEGER_BOOL_FIELDS: Record<string, string[]> = {
  runs: ['is_clean'],
};

const INTEGER_FIELDS: Record<string, string[]> = {
  runs: ['barrel_count', 'time_ms'],
  horses: [],
  arenas: [],
};

function transformOpData(
  table: string,
  data: Record<string, unknown>,
): Record<string, unknown> {
  const result: Record<string, unknown> = { ...data };

  for (const field of CLIENT_ONLY_FIELDS[table] ?? []) {
    delete result[field];
  }

  for (const field of JSON_ARRAY_FIELDS[table] ?? []) {
    const value = result[field];
    if (typeof value === 'string') {
      try {
        result[field] = JSON.parse(value);
      } catch {
        result[field] = [];
      }
    }
  }

  for (const field of INTEGER_BOOL_FIELDS[table] ?? []) {
    if (field in result) {
      result[field] = result[field] === 1 || result[field] === true;
    }
  }

  for (const field of INTEGER_FIELDS[table] ?? []) {
    if (field in result) {
      const val = result[field];
      if (val === null || val === undefined) continue;
      result[field] = Math.round(Number(val));
    }
  }

  return result;
}

export class SupabasePowerSyncConnector implements PowerSyncBackendConnector {
  async fetchCredentials() {
    const endpoint = import.meta.env.VITE_POWERSYNC_URL as string | undefined;
    if (!endpoint) {
      console.warn('[PowerSync] VITE_POWERSYNC_URL is not configured');
      return null;
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.access_token) {
      console.warn('[PowerSync] No access token available');
      return null;
    }

    console.log('[PowerSync] Credentials fetched:', { endpoint });
    return { endpoint, token: session.access_token };
  }

  async uploadData(database: AbstractPowerSyncDatabase): Promise<void> {
    const batch = await database.getCrudBatch(200);
    if (!batch) return;

    try {
      for (const op of batch.crud) {
        switch (op.op) {
          case UpdateType.PUT: {
            const data = transformOpData(op.table, {
              id: op.id,
              ...op.opData,
            });
            const { error } = await supabase.from(op.table).upsert(data);
            if (error) throw new Error(`PUT ${op.table}: ${error.message}`);
            break;
          }

          case UpdateType.PATCH: {
            const data = transformOpData(op.table, op.opData ?? {});
            const { error } = await supabase
              .from(op.table)
              .update(data)
              .eq('id', op.id);
            if (error) throw new Error(`PATCH ${op.table}: ${error.message}`);
            break;
          }

          case UpdateType.DELETE: {
            // Use soft delete to preserve data recoverability.
            // Hard deletes should never be issued by this client, but this
            // guards against accidental permanent data loss.
            const { error } = await supabase
              .from(op.table)
              .update({ deleted_at: new Date().toISOString() })
              .eq('id', op.id);
            if (error) throw new Error(`DELETE ${op.table}: ${error.message}`);
            break;
          }
        }
      }

      await batch.complete();
    } catch (error) {
      console.error('[PowerSync] uploadData failed, will retry:', error);
      throw error;
    }
  }
}
