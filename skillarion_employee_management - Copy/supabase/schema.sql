-- SkillArion Portal — Supabase schema
-- -----------------------------------------------------------------------------
-- Two things live in this file:
--   1. kv_store  — one table holding the whole app's JSON blob (users,
--      attendance, tasks, projects, leave requests, announcements, etc.)
--      under a single key, "app-db". It mirrors the window.storage API the
--      frontend already expects, so App.jsx did not need to change at all.
--   2. portal-files — a Storage bucket for real uploaded files (Business
--      Development files, Daily Work Log photos, Project documents). The
--      database only stores each file's public URL.
--
-- HOW TO RUN THIS:
--   1. Go to your Supabase project → SQL Editor.
--   2. Paste this whole file in and click "Run".
-- -----------------------------------------------------------------------------

create table if not exists public.kv_store (
  key        text primary key,
  value      text not null,
  shared     boolean not null default true,
  updated_at timestamptz not null default now()
);

-- Keep updated_at fresh on every write.
create or replace function public.kv_store_set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_kv_store_updated_at on public.kv_store;
create trigger trg_kv_store_updated_at
  before update on public.kv_store
  for each row execute function public.kv_store_set_updated_at();

-- -----------------------------------------------------------------------------
-- Row Level Security
-- -----------------------------------------------------------------------------
-- This app does its own login screen (username/password checked in the app,
-- against the "app-db" blob) rather than using Supabase Auth. That means the
-- browser only ever has the public "anon" key — so, for the app to be able to
-- read/write its data at all, the anon role needs access to this table
-- (and, further down, to the portal-files storage bucket).
--
-- This is fine for an internal/demo tool, but it does mean anyone with your
-- Supabase URL + anon key could read or overwrite the whole "app-db" blob,
-- or upload/read/delete files in the bucket, directly — bypassing the
-- portal's own login. If that matters for your deployment, the real fix is
-- to move all reads/writes behind a small server-side function (Supabase
-- Edge Function) that checks a session before touching this table or
-- bucket, instead of hitting Supabase directly from the browser.
-- Flagging this for later — not changed here per your instructions.
-- -----------------------------------------------------------------------------

alter table public.kv_store enable row level security;

drop policy if exists "anon read kv_store" on public.kv_store;
create policy "anon read kv_store"
  on public.kv_store for select
  to anon
  using (true);

drop policy if exists "anon write kv_store" on public.kv_store;
create policy "anon write kv_store"
  on public.kv_store for insert
  to anon
  with check (true);

drop policy if exists "anon update kv_store" on public.kv_store;
create policy "anon update kv_store"
  on public.kv_store for update
  to anon
  using (true)
  with check (true);

-- -----------------------------------------------------------------------------
-- Storage bucket — for real file uploads
-- -----------------------------------------------------------------------------
-- Business Development files, Daily Work Log photos, and Project documents
-- are uploaded here as real files (not embedded as base64 in kv_store), and
-- the app stores just their public URL. Bucket is public-read so those URLs
-- work directly in <img>/download links without extra auth.
-- -----------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('portal-files', 'portal-files', true)
on conflict (id) do nothing;

drop policy if exists "anon read portal-files" on storage.objects;
create policy "anon read portal-files"
  on storage.objects for select
  to anon
  using (bucket_id = 'portal-files');

drop policy if exists "anon upload portal-files" on storage.objects;
create policy "anon upload portal-files"
  on storage.objects for insert
  to anon
  with check (bucket_id = 'portal-files');

drop policy if exists "anon delete portal-files" on storage.objects;
create policy "anon delete portal-files"
  on storage.objects for delete
  to anon
  using (bucket_id = 'portal-files');
