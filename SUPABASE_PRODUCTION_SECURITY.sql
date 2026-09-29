begin;

alter table public.app_state enable row level security;

revoke all on table public.app_state from anon;
revoke all on table public.app_state from authenticated;
grant select, insert, update on table public.app_state to authenticated;

drop policy if exists "company workspace select" on public.app_state;
drop policy if exists "company workspace insert" on public.app_state;
drop policy if exists "company workspace update" on public.app_state;

create policy "company workspace select"
on public.app_state
for select
to authenticated
using (
  id = case
    when upper(coalesce(auth.jwt() -> 'app_metadata' ->> 'company_code', '')) = 'VALOR'
      then 'crewforge-demo'
    else 'crewforge-' || lower(coalesce(auth.jwt() -> 'app_metadata' ->> 'company_code', ''))
  end
  and coalesce(auth.jwt() -> 'app_metadata' ->> 'company_code', '') <> ''
);

create policy "company workspace insert"
on public.app_state
for insert
to authenticated
with check (
  id = case
    when upper(coalesce(auth.jwt() -> 'app_metadata' ->> 'company_code', '')) = 'VALOR'
      then 'crewforge-demo'
    else 'crewforge-' || lower(coalesce(auth.jwt() -> 'app_metadata' ->> 'company_code', ''))
  end
  and coalesce(auth.jwt() -> 'app_metadata' ->> 'company_code', '') <> ''
);

create policy "company workspace update"
on public.app_state
for update
to authenticated
using (
  id = case
    when upper(coalesce(auth.jwt() -> 'app_metadata' ->> 'company_code', '')) = 'VALOR'
      then 'crewforge-demo'
    else 'crewforge-' || lower(coalesce(auth.jwt() -> 'app_metadata' ->> 'company_code', ''))
  end
  and coalesce(auth.jwt() -> 'app_metadata' ->> 'company_code', '') <> ''
)
with check (
  id = case
    when upper(coalesce(auth.jwt() -> 'app_metadata' ->> 'company_code', '')) = 'VALOR'
      then 'crewforge-demo'
    else 'crewforge-' || lower(coalesce(auth.jwt() -> 'app_metadata' ->> 'company_code', ''))
  end
  and coalesce(auth.jwt() -> 'app_metadata' ->> 'company_code', '') <> ''
);

commit;
