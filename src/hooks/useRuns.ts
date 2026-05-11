import { useQuery } from '@powersync/react';
import { execute } from '@/lib/db';
import type { RunRow, RunWithDetails } from '@/lib/schema';

function normalizeRunTimeMs(value: number | null | undefined): number | null {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return null;
  }

  if (!Number.isInteger(value) && Math.abs(value) < 1000) {
    return Math.round(value * 1000);
  }

  return Math.round(value);
}

const RUNS_SQL = `
  SELECT
    r.*,
    h.barn_name AS horse_name,
    h.profile_image_path AS horse_profile_image_path,
    h.deleted_at AS horse_deleted_at,
    a.name AS arena_name,
    a.deleted_at AS arena_deleted_at,
    (SELECT COUNT(*) FROM media m WHERE m.run_id = r.id AND m.type = 'photo' AND m.deleted_at IS NULL) AS photo_count,
    (SELECT COUNT(*) FROM media m WHERE m.run_id = r.id AND m.type = 'video' AND m.deleted_at IS NULL) AS video_count
  FROM runs r
  LEFT JOIN horses h ON h.id = r.horse_id
  LEFT JOIN arenas a ON a.id = r.arena_id
  WHERE r.deleted_at IS NULL
  ORDER BY r.run_at DESC
`;

export function useRuns() {
  const { data, isLoading, error } = useQuery<RunWithDetails>(RUNS_SQL);
  return { runs: data, isLoading, error };
}

export type CreateRunInput = {
  userId: string;
  horseId?: string | null;
  arenaId?: string | null;
  runAt?: string;
  timeMs?: number | null;
  isClean?: boolean;
  barrelCount?: number | null;
  payoutCents?: number | null;
  notes?: string | null;
};

export async function createRun(input: CreateRunInput): Promise<string> {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const runAt = input.runAt ?? now;
  const normalizedTimeMs = normalizeRunTimeMs(input.timeMs ?? null);

  await execute(
    `INSERT INTO runs (
      id, user_id, horse_id, arena_id, run_at,
      time_ms, is_clean, barrel_count, payout_cents, notes,
      created_at, updated_at,
      time_updated_at, is_clean_updated_at, payout_updated_at, notes_updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      input.userId,
      input.horseId ?? null,
      input.arenaId ?? null,
      runAt,
      normalizedTimeMs,
      input.isClean ? 1 : 0,
      input.barrelCount ?? 0,
      input.payoutCents ?? null,
      input.notes ?? null,
      now,
      now,
      now,
      now,
      now,
      now,
    ],
  );

  return id;
}

export type UpdateRunInput = Partial<
  Pick<RunRow, 'horse_id' | 'arena_id' | 'run_at' | 'time_ms' | 'is_clean' | 'barrel_count' | 'payout_cents' | 'notes'>
>;

export async function updateRun(id: string, input: UpdateRunInput): Promise<void> {
  const now = new Date().toISOString();
  const fields: string[] = ['updated_at = ?'];
  const values: (string | number | null)[] = [now];

  if ('time_ms' in input) {
    fields.push('time_ms = ?', 'time_updated_at = ?');
    values.push(normalizeRunTimeMs(input.time_ms ?? null), now);
  }
  if ('is_clean' in input) {
    fields.push('is_clean = ?', 'is_clean_updated_at = ?');
    values.push(input.is_clean ?? null, now);
  }
  if ('barrel_count' in input) {
    fields.push('barrel_count = ?');
    values.push(input.barrel_count ?? 0);
  }
  if ('payout_cents' in input) {
    fields.push('payout_cents = ?', 'payout_updated_at = ?');
    values.push(input.payout_cents ?? null, now);
  }
  if ('notes' in input) {
    fields.push('notes = ?', 'notes_updated_at = ?');
    values.push(input.notes ?? null, now);
  }
  if ('horse_id' in input) {
    fields.push('horse_id = ?');
    values.push(input.horse_id ?? null);
  }
  if ('arena_id' in input) {
    fields.push('arena_id = ?');
    values.push(input.arena_id ?? null);
  }
  if ('run_at' in input) {
    fields.push('run_at = ?');
    values.push(input.run_at ?? null);
  }

  values.push(id);
  await execute(`UPDATE runs SET ${fields.join(', ')} WHERE id = ?`, values);
}

export async function deleteRun(id: string): Promise<void> {
  const now = new Date().toISOString();
  await execute(
    `UPDATE runs SET deleted_at = ?, updated_at = ? WHERE id = ?`,
    [now, now, id],
  );
}
