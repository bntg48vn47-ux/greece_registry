-- Greece Registry database. Supabase dashboard > SQL Editor > New query > paste all > Run.

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null check (username ~ '^[A-Za-z0-9_]{3,20}$'),
  country text not null check (country ~ '^[A-Z]{2}$'),
  role text not null default 'user' check (role in ('user','admin')),
  banned boolean not null default false,
  created_at timestamptz not null default now()
);
create unique index profiles_username_ci on public.profiles (lower(username));

create table public.cars (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  brand text not null check (char_length(brand) between 1 and 50),
  model text not null check (char_length(model) between 1 and 60),
  year int check (year between 1950 and 2100),
  plate_prefix text check (char_length(plate_prefix) <= 3),   -- only the first 3 letters are ever stored
  color text check (char_length(color) <= 40),
  interior text check (char_length(interior) <= 40),
  drive text check (drive in ('LHD','RHD')),
  notes text check (char_length(notes) <= 300),
  photos text[] not null default '{}' check (coalesce(array_length(photos,1),0) <= 10),  -- max 10 photos
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now()
);

-- Helper functions
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, username, country)
  values (new.id, new.raw_user_meta_data->>'username', upper(new.raw_user_meta_data->>'country'));
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.is_admin() returns boolean
language sql security definer stable set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin' and not banned) $$;

create or replace function public.is_banned() returns boolean
language sql security definer stable set search_path = public as $$
  select coalesce((select banned from public.profiles where id = auth.uid()), false) $$;

create or replace function public.username_available(u text) returns boolean
language sql security definer stable set search_path = public as $$
  select not exists (select 1 from public.profiles where lower(username) = lower(u)) $$;
grant execute on function public.username_available(text) to anon, authenticated;

-- Row level security
alter table public.profiles enable row level security;
alter table public.cars enable row level security;

create policy "own profile or admin reads" on public.profiles for select to authenticated
  using (id = auth.uid() or public.is_admin());
create policy "admin updates profiles" on public.profiles for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "approved, own, or admin reads" on public.cars for select to authenticated
  using (status = 'approved' or user_id = auth.uid() or public.is_admin());
create policy "members add own cars" on public.cars for insert to authenticated
  with check (user_id = auth.uid() and not public.is_banned() and (status = 'pending' or public.is_admin()));
create policy "admin updates cars" on public.cars for update to authenticated
  using (public.is_admin()) with check (public.is_admin());
create policy "admin or owner (unapproved) deletes" on public.cars for delete to authenticated
  using (public.is_admin() or (user_id = auth.uid() and status <> 'approved'));

-- OPTIONAL: let logged-out visitors browse approved cars (also set REQUIRE_LOGIN=false in config.js)
-- create policy "public reads approved" on public.cars for select to anon using (status = 'approved');

-- Photo storage (public bucket, 5 MB per file, images only, 10 per car enforced above)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('car-photos', 'car-photos', true, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;
create policy "upload into own folder" on storage.objects for insert to authenticated
  with check (bucket_id = 'car-photos' and (storage.foldername(name))[1] = auth.uid()::text and not public.is_banned());
create policy "delete own or admin photos" on storage.objects for delete to authenticated
  using (bucket_id = 'car-photos' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin()));

-- AFTER you create your own account on the site, make yourself admin (change the username):
-- update public.profiles set role = 'admin' where lower(username) = lower('YOUR_USERNAME');
