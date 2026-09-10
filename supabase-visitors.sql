create table if not exists public.visitors (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 1 and 80),
  created_at timestamptz not null default now()
);

alter table public.visitors enable row level security;

create policy "Anyone can read visitors"
on public.visitors for select
to anon, authenticated
using (true);

create policy "Anyone can add a visitor"
on public.visitors for insert
to anon, authenticated
with check (true);

create policy "Anyone can remove old visitors"
on public.visitors for delete
to anon, authenticated
using (true);