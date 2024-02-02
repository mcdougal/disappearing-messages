import type { Config } from 'drizzle-kit';

const { POSTGRES_URL } = process.env;

if (!POSTGRES_URL) {
  throw new Error(`Missing environment variable: POSTGRES_URL`);
}

export default {
  dbCredentials: { connectionString: POSTGRES_URL },
  out: `./drizzle`,
  schema: `./src/schema.ts`,
} satisfies Config;
