create table if not exists public.todos (
  id uuid not null default gen_random_uuid(),
  primary key(id),

  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  is_completed integer not null default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.todos enable row level security;
create policy "Users can see their own todos" on todos
  for select
  using (auth.uid() = owner_id);
create policy "Users can insert their own todos" on todos
  for insert
  with check (auth.uid() = owner_id);
create policy "Users can update their own todos" on todos
  for update
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);
create policy "Users can delete their own todos" on todos
  for delete
  using (auth.uid() = owner_id);

