import type { Config } from 'drizzle-kit';

const { DATABASE_URL } = process.env;

if (!DATABASE_URL) {
  throw new Error(`Missing environment variable: DATABASE_URL`);
}

export default {
  dbCredentials: { connectionString: DATABASE_URL },
  out: `./drizzle`,
  schema: `./src/schema.ts`,
} satisfies Config;
