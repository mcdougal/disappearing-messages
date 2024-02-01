import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const { DATABASE_URL } = process.env;

if (!DATABASE_URL) {
  throw new Error(`Missing environment variable: DATABASE_URL`);
}

// Disable prefetch as it is not supported for "Transaction" pool mode
// See: https://orm.drizzle.team/docs/get-started-postgresql#supabase
const PREPARE = false;

export const client = postgres(DATABASE_URL, { prepare: PREPARE });
export const db = drizzle(client);
