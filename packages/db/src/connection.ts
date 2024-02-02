import { drizzle } from 'drizzle-orm/postgres-js';
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

  ssl = { cert: SUPABASE_CERT };
}

export const client = postgres(POSTGRES_URL, {
  prepare: PREPARE,
  ssl,
});

export const db = drizzle(client, {
  schema,
});

export * from 'drizzle-orm';
