# disappearing-messages

- [disappearing-messages](#disappearing-messages)
  - [Dev Setup](#dev-setup)
  - [Migrations](#migrations)
    - [Development](#development)
    - [Production](#production)

## Dev Setup

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

## Migrations

### Development

1. Update `packages/db/src/schema.ts`
2. Run `npm run dev:db:generate`
3. Run `npm run db:migrate`

### Production

Migrations run automatically on deploy.
