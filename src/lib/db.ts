import { PowerSyncDatabase } from '@powersync/web';
import { AppSchema } from './schema';
import { SupabasePowerSyncConnector } from './connector';

export const db = new PowerSyncDatabase({
  schema: AppSchema,
  database: {
    dbFilename: 'rodeopro-web.db',
  },
  workerAssets: {
    mainScript: '/@powersync/index.umd.js',
    wasmModule: '/@powersync/index.wasm',
  },
});

let connector: SupabasePowerSyncConnector | null = null;
let connectPromise: Promise<void> | null = null;

export async function connectPowerSync(): Promise<void> {
  if (connectPromise) {
    return connectPromise;
  }

  connector = new SupabasePowerSyncConnector();
  connectPromise = db.connect(connector).then(() => {
    connectPromise = null;
  }).catch((err) => {
    connectPromise = null;
    throw err;
  });

  await connectPromise;
}

export async function disconnectPowerSync(): Promise<void> {
  await db.disconnect();
  connector = null;
}

export async function execute(
  sql: string,
  params?: (string | number | null | boolean)[],
): Promise<void> {
  await db.execute(sql, params);
}
