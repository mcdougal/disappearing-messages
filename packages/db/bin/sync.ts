/* eslint-disable no-console */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const SUPABASE_MIGRATIONS_DIR = path.resolve(
  path.join(__dirname, `..`, `..`, `..`, `supabase`, `migrations`)
);

const run = async (): Promise<void> => {
  const { POSTGRES_URL_PRODUCTION } = process.env;

  if (!POSTGRES_URL_PRODUCTION) {
    throw new Error(`Missing environment variable: POSTGRES_URL_PRODUCTION`);
  }

  console.log(`Removing Supabase migrations: ${SUPABASE_MIGRATIONS_DIR}`);
  fs.rmSync(SUPABASE_MIGRATIONS_DIR, { recursive: true, force: true });

  execSync(
    `supabase db dump --db-url '${POSTGRES_URL_PRODUCTION}' | supabase migration new prod_sync`
  );

  execSync(
    `supabase db dump --db-url '${POSTGRES_URL_PRODUCTION}' --data-only | supabase migration new prod_sync`
  );

  execSync(`supabase db reset`);
};

if (module === require.main) {
  run().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
