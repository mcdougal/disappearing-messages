# disappearing-messages

- [disappearing-messages](#disappearing-messages)
  - [Dev Setup](#dev-setup)
  - [Migrations](#migrations)
    - [Development](#development)
    - [Production](#production)
  - [Supabase Setup](#supabase-setup)

## Dev Setup

Install dependencies:

1. Node v20.11.0 ([Instructions](https://nodejs.org/en))
2. Supabase CLI ([Instructions](https://supabase.com/docs/guides/cli/getting-started))

Environment variables:

1. Copy `.env.template` to `.env`
2. Restrict access to the `.env` file: `chmod 600 .env`
3. Fill out environment variables in `.env`

```sh
npm run install
```

Avoid `code ENOWORKSPACES` error when running `next dev` in an NPM workspace. See <https://github.com/vercel/next.js/issues/47121>.

```sh
npx next telemetry disable
```

Install Supabase CLI: <https://supabase.com/docs/guides/cli/getting-started?platform=linux>

Set up Supabase:

```sh
supabase login
supabase link --project-ref ********************
```

Run the app:

```sh
npm run dev
```

Run Supabase:

```sh
supabase start
```

Sync production data:

```sh
npm run dev:sync
```

## Migrations

### Development

1. Update `packages/db/src/schema.ts`
2. Run `npm run dev:generate`
3. Run `npm run db:migrate`

### Production

Migrations run automatically on deploy.

## Supabase Setup

1. Install Vercel integration ([Settings](https://supabase.com/dashboard/project/yiccmvrkavbejqykifkl/settings/integrations))
2. Force SSL connections ([Settings](https://supabase.com/dashboard/project/yiccmvrkavbejqykifkl/settings/database))
3. Add `SUPABASE_CERT` environment variable to Vercel
