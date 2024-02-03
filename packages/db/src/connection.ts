import { isProduction } from '@/common/env';
import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schema';

const { NODE_ENV, POSTGRES_URL, SUPABASE_CERT } = process.env;

if (!POSTGRES_URL) {
  throw new Error(`Missing environment variable: POSTGRES_URL`);
}

// Disable prefetch as it is not supported for "Transaction" pool mode
// See: https://orm.drizzle.team/docs/get-started-postgresql#supabase
const PREPARE = false;

let ssl: Record<string, string> | undefined = undefined;

if (NODE_ENV === `production`) {
  if (!SUPABASE_CERT) {
    throw new Error(`Missing environment variable: SUPABASE_CERT`);
  }

  ssl = { ca: SUPABASE_CERT };
}

export const client = postgres(POSTGRES_URL, {
  prepare: PREPARE,
  ssl,
});

// Avoid too many connections when we are hot reloading
declare global {
  // eslint-disable-next-line no-var
  var dbGlobal: PostgresJsDatabase<typeof schema> | null;
}

const makeDrizzleClient = (): PostgresJsDatabase<typeof schema> => {
  return drizzle(client, {
    schema,
  });
};

const getDrizzleClient = (): PostgresJsDatabase<typeof schema> => {
  if (isProduction()) {
    return makeDrizzleClient();
  }

  // Avoid too many connections when we are hot reloading
  if (!globalThis.dbGlobal) {
    globalThis.dbGlobal = makeDrizzleClient();
  }

  return globalThis.dbGlobal;
};

export const db = getDrizzleClient();

// There are too many utilities to manually export one-by-one, so we're
// just re-exporting everything.
// eslint-disable-next-line @disappearing-messages/no-export-from
export * from 'drizzle-orm';
