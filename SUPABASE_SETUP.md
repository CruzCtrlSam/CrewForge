# CrewForge Shared Trial Setup

This adds shared data for the trial so a foreman's phone and the office computer can see the same timesheets, jobs, people, and production.

The cleaned version only syncs company data:

- `weeks`
- `people`
- `jobs`
- `sheets`
- `production`

Each device keeps its own local view settings:

- signed-in trial user
- selected operating area
- current tab
- selected week
- selected production filter

## Supabase Table

In Supabase, open SQL Editor and run:

```sql
create table if not exists public.app_state (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.app_state disable row level security;

alter publication supabase_realtime add table public.app_state;
```

If the final line says the table is already a member, that is fine.

## Demo Security Note

This is acceptable for a short private trial only. Row level security is off, so anyone with the site link can read or change the shared demo data.

Before real company use, CrewForge needs real Supabase Auth accounts, row-level security, and separate records instead of one shared demo state row.

## Current Demo Project

The current `script.js` is configured with the Supabase project URL, public publishable key, and workspace id:

```js
const WORKSPACE_ID = "crewforge-demo";
```

Everyone using the same deployed app and workspace id shares the same demo dataset.
