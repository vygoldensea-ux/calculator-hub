create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do update set email = excluded.email, updated_at = timezone('utc', now());

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create table if not exists public.calculator_runs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  calculator_slug text not null,
  inputs jsonb not null,
  result jsonb not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.saved_calculations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  calculator_slug text not null,
  inputs jsonb not null,
  result jsonb not null,
  label text,
  is_pinned boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text,
  status text not null default 'active',
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.lead_forms (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text,
  message text,
  source text,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists calculator_runs_user_id_created_at_idx
  on public.calculator_runs (user_id, created_at desc);

create index if not exists saved_calculations_user_id_created_at_idx
  on public.saved_calculations (user_id, created_at desc);

create index if not exists saved_calculations_user_id_is_pinned_idx
  on public.saved_calculations (user_id, is_pinned);

drop trigger if exists saved_calculations_set_updated_at on public.saved_calculations;

create trigger saved_calculations_set_updated_at
before update on public.saved_calculations
for each row execute procedure public.set_updated_at();

drop trigger if exists profiles_set_updated_at on public.profiles;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute procedure public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.calculator_runs enable row level security;
alter table public.saved_calculations enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.lead_forms enable row level security;

drop policy if exists "Profiles are viewable by owner" on public.profiles;
create policy "Profiles are viewable by owner"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Profiles are updateable by owner" on public.profiles;
create policy "Profiles are updateable by owner"
  on public.profiles for update
  using (auth.uid() = id);

drop policy if exists "Runs are insertable by owner" on public.calculator_runs;
create policy "Runs are insertable by owner"
  on public.calculator_runs for insert
  with check (auth.uid() = user_id);

drop policy if exists "Runs are readable by owner" on public.calculator_runs;
create policy "Runs are readable by owner"
  on public.calculator_runs for select
  using (auth.uid() = user_id);

drop policy if exists "Saved calculations are insertable by owner" on public.saved_calculations;
create policy "Saved calculations are insertable by owner"
  on public.saved_calculations for insert
  with check (auth.uid() = user_id);

drop policy if exists "Saved calculations are readable by owner" on public.saved_calculations;
create policy "Saved calculations are readable by owner"
  on public.saved_calculations for select
  using (auth.uid() = user_id);

drop policy if exists "Saved calculations are updateable by owner" on public.saved_calculations;
create policy "Saved calculations are updateable by owner"
  on public.saved_calculations for update
  using (auth.uid() = user_id);

drop policy if exists "Saved calculations are deletable by owner" on public.saved_calculations;
create policy "Saved calculations are deletable by owner"
  on public.saved_calculations for delete
  using (auth.uid() = user_id);

drop policy if exists "Newsletter subscribers can be inserted by anyone" on public.newsletter_subscribers;
create policy "Newsletter subscribers can be inserted by anyone"
  on public.newsletter_subscribers for insert
  with check (true);

drop policy if exists "Lead forms can be inserted by anyone" on public.lead_forms;
create policy "Lead forms can be inserted by anyone"
  on public.lead_forms for insert
  with check (true);
