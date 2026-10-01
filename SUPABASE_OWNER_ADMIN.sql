begin;

create table if not exists public.companies (
  code text primary key check (code = upper(code) and code ~ '^[A-Z0-9-]{3,20}$'),
  name text not null check (char_length(trim(name)) between 2 and 120),
  workspace_id text not null unique,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  created_by uuid
);

create table if not exists public.company_members (
  user_id uuid primary key references auth.users(id) on delete cascade,
  company_code text not null references public.companies(code),
  email text not null,
  display_name text not null,
  role text not null check (role in ('Admin', 'Safety', 'Quality')),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  created_by uuid
);

alter table public.companies enable row level security;
alter table public.company_members enable row level security;

revoke all on table public.companies from anon, authenticated;
revoke all on table public.company_members from anon, authenticated;

insert into public.companies (code, name, workspace_id)
values ('VALOR', 'Valor Steel', 'crewforge-demo')
on conflict (code) do update
set name = excluded.name,
    workspace_id = excluded.workspace_id,
    active = true;

create or replace function public.resolve_company_code(requested_code text)
returns table (code text, name text, workspace_id text)
language sql
stable
security definer
set search_path = public
as $$
  select c.code, c.name, c.workspace_id
  from public.companies c
  where c.active = true
    and c.code = upper(trim(requested_code))
  limit 1;
$$;

revoke all on function public.resolve_company_code(text) from public;
grant execute on function public.resolve_company_code(text) to anon, authenticated;

commit;
