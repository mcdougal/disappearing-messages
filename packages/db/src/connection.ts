import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schema';

const { POSTGRES_URL } = process.env;

if (!POSTGRES_URL) {
  throw new Error(`Missing environment variable: POSTGRES_URL`);
}

// Disable prefetch as it is not supported for "Transaction" pool mode
// See: https://orm.drizzle.team/docs/get-started-postgresql#supabase
const PREPARE = false;

export const client = postgres(POSTGRES_URL, { prepare: PREPARE, ssl: true });
export const db = drizzle(client, { schema });

export * from 'drizzle-orm';
