# CrewForge Production Authentication Setup

CrewForge now uses this entry order:

1. Company code
2. Email and password
3. Department filter

The browser never stores a configured password in the application source. Supabase Auth verifies the email and password and stores the authenticated session securely in the browser.

## Create the Owner Account

In the Supabase dashboard:

1. Open **Authentication > Users**.
2. Choose **Add user**.
3. Enter the owner email address supplied for CrewForge.
4. Enter the password directly in Supabase. Do not add it to this repository.
5. Mark the email confirmed if the dashboard asks whether to send a confirmation email.

Then open the SQL Editor and assign the protected company and role metadata:

```sql
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || jsonb_build_object(
  'company_code', 'VALOR',
  'role', 'Admin',
  'display_name', 'Sam Cruz',
  'is_owner', true
)
where lower(email) = lower('sam@raicesadvisors.com');
```

Authorization metadata belongs in `raw_app_meta_data`, not `raw_user_meta_data`, because users cannot edit app metadata themselves.

## Secure the Shared Workspace

Run [SUPABASE_PRODUCTION_SECURITY.sql](./SUPABASE_PRODUCTION_SECURITY.sql) in the Supabase SQL Editor. It:

- enables Row-Level Security on `app_state`
- removes all anonymous table access
- permits authenticated reads and writes only
- limits each account to the workspace assigned through its company code
- preserves Valor's existing `crewforge-demo` row

## Add Another Company

After the owner tools are deployed, sign in with the owner account and open **Companies & Accounts / Companias y cuentas**. Create the company first, then create its Admin, Safety, Quality, or Foreman accounts. Company codes are resolved from Supabase and no longer need to be added to `script.js`.

Allowed application roles are `Admin`, `Safety`, `Quality`, and `Foreman`. Foreman accounts also require a department and at least one assigned job in protected Auth app metadata.

## Offline Behavior

The first secure sign-in requires internet. Once a valid Supabase session and the app shell have been saved on the device, CrewForge continues to open during spotty service and keeps changes locally until synchronization is available.

Public employee training links remain intentionally accessible without an account. They expose only the selected training workflow, not the authenticated company workspace.

## Deploy Owner Administration

1. Run [SUPABASE_OWNER_ADMIN.sql](./SUPABASE_OWNER_ADMIN.sql) in the Supabase SQL Editor. This creates the protected company directory and exact-code lookup.
2. Deploy `supabase/functions/owner-admin/index.ts` as the `owner-admin` Edge Function with JWT verification enabled.
3. Set the Edge Function secret `CREWFORGE_OWNER_EMAIL` to the CrewForge owner's email address.
4. Re-run the owner metadata SQL above so `is_owner` is stored in protected app metadata.

The Edge Function is the only part of CrewForge permitted to use the Supabase service-role credential. That credential must never be copied into `script.js`, GitHub, or a browser setting.
