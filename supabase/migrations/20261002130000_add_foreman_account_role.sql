begin;

alter table public.company_members
  drop constraint if exists company_members_role_check;

alter table public.company_members
  add constraint company_members_role_check
  check (role in ('Admin', 'Safety', 'Quality', 'Foreman'));

commit;
