-- Numbered course lessons (1.1, 2.5, …): completion and whiteboard-check scores per user.
create table public.lesson_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  subject_id text not null,
  lesson_id text not null,
  beats_done integer not null default 0 check (beats_done >= 0),
  completed boolean not null default false,
  check_passed boolean not null default false,
  best_score integer not null default 0 check (best_score between 0 and 100),
  attempts integer not null default 0 check (attempts >= 0),
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, subject_id, lesson_id)
);

alter table public.lesson_progress enable row level security;
revoke all on public.lesson_progress from anon;

create policy "Users read own lesson progress" on public.lesson_progress
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "Users insert own lesson progress" on public.lesson_progress
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Users update own lesson progress" on public.lesson_progress
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Users delete own lesson progress" on public.lesson_progress
  for delete to authenticated using ((select auth.uid()) = user_id);
