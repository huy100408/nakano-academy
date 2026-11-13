-- Nakano Academy: cloud progress schema.
-- Every table is owner-only: Row Level Security allows a signed-in user to read and
-- write exactly the rows whose user_id equals their auth.uid(), and nothing else.

create schema if not exists private;

-- ───────────────────────── user_profiles ─────────────────────────
create table public.user_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  exam_score integer not null default 0 check (exam_score >= 0),
  study_streak integer not null default 0 check (study_streak >= 0),
  best_streak integer not null default 0 check (best_streak >= 0),
  last_study_date date,
  maruo_approval integer not null default 70 check (maruo_approval between 0 and 100),
  preferred_sister text not null default 'miku'
    check (preferred_sister in ('ichika', 'nino', 'miku', 'yotsuba', 'itsuki')),
  -- Starting point for the report-card radar: the quintuplets' canon mock-exam scores.
  baseline_mastery jsonb not null
    default '{"math": 39, "english": 43, "geo": 68, "cs": 31, "science": 56}'::jsonb
    check (jsonb_typeof(baseline_mastery) = 'object'),
  current_mastery jsonb not null
    default '{"math": 0, "english": 0, "geo": 0, "cs": 0, "science": 0}'::jsonb
    check (jsonb_typeof(current_mastery) = 'object'),
  item_inventory jsonb not null
    default '{"ichika_notes": 2, "nino_timer": 2, "miku_headphones": 2, "yotsuba_ribbon": 2, "itsuki_bun": 2}'::jsonb
    check (jsonb_typeof(item_inventory) = 'object'),
  scrambled_eggs_high_score integer not null default 0 check (scrambled_eggs_high_score >= 0),
  scrambled_eggs_best_streak integer not null default 0 check (scrambled_eggs_best_streak >= 0),
  updated_at timestamptz not null default now()
);

-- ───────────────────────── question_progress ─────────────────────────
-- Spaced repetition (SM-2 style) and weak-spot tracking, one row per user per question.
create table public.question_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  subject_id text not null,
  question_id text not null,
  correct_count integer not null default 0 check (correct_count >= 0),
  incorrect_count integer not null default 0 check (incorrect_count >= 0),
  is_weak_spot boolean not null default false,
  ease_factor numeric(4, 2) not null default 2.5 check (ease_factor between 1.3 and 5),
  interval_days integer not null default 1 check (interval_days >= 0),
  next_review_at timestamptz not null default now(),
  last_answered_at timestamptz not null default now(),
  constraint question_progress_user_subject_question_key unique (user_id, subject_id, question_id)
);
-- The unique constraint's index (user_id, subject_id, question_id) also serves user_id lookups.
create index question_progress_review_idx on public.question_progress (user_id, next_review_at);

-- ───────────────────────── study_sessions ─────────────────────────
create table public.study_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  sister_id text not null,
  subject_id text not null,
  difficulty_tier text not null,
  score_earned integer not null default 0,
  correct_answers integer not null default 0 check (correct_answers >= 0),
  total_questions integer not null default 0 check (total_questions >= 0),
  maruo_delta integer not null default 0,
  items_used jsonb not null default '{}'::jsonb,
  completed_at timestamptz not null default now()
);
create index study_sessions_user_completed_idx on public.study_sessions (user_id, completed_at desc);

-- ───────────────────────── scrambled_eggs_logs ─────────────────────────
create table public.scrambled_eggs_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  target_sister text not null,
  guessed_sister text not null,
  clues_used integer not null check (clues_used between 1 and 3),
  multiplier integer not null check (multiplier between 0 and 3),
  points_awarded integer not null default 0 check (points_awarded >= 0),
  streak_at_time integer not null default 0 check (streak_at_time >= 0),
  played_at timestamptz not null default now()
);
create index scrambled_eggs_logs_user_played_idx on public.scrambled_eggs_logs (user_id, played_at desc);

-- ───────────────────────── Row Level Security ─────────────────────────
alter table public.user_profiles enable row level security;
alter table public.question_progress enable row level security;
alter table public.study_sessions enable row level security;
alter table public.scrambled_eggs_logs enable row level security;

-- Signed-out (anon) visitors get no table access at all.
revoke all on public.user_profiles, public.question_progress, public.study_sessions, public.scrambled_eggs_logs from anon;

create policy "Users read own profile" on public.user_profiles
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "Users insert own profile" on public.user_profiles
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Users update own profile" on public.user_profiles
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Users delete own profile" on public.user_profiles
  for delete to authenticated using ((select auth.uid()) = user_id);

create policy "Users read own question progress" on public.question_progress
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "Users insert own question progress" on public.question_progress
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Users update own question progress" on public.question_progress
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Users delete own question progress" on public.question_progress
  for delete to authenticated using ((select auth.uid()) = user_id);

create policy "Users read own study sessions" on public.study_sessions
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "Users insert own study sessions" on public.study_sessions
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Users update own study sessions" on public.study_sessions
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Users delete own study sessions" on public.study_sessions
  for delete to authenticated using ((select auth.uid()) = user_id);

create policy "Users read own eggs logs" on public.scrambled_eggs_logs
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "Users insert own eggs logs" on public.scrambled_eggs_logs
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Users update own eggs logs" on public.scrambled_eggs_logs
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Users delete own eggs logs" on public.scrambled_eggs_logs
  for delete to authenticated using ((select auth.uid()) = user_id);

-- ───────────────────────── Triggers ─────────────────────────
-- Keep updated_at current on every profile write.
create or replace function private.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger user_profiles_touch_updated_at
  before update on public.user_profiles
  for each row execute function private.touch_updated_at();

-- Create a default profile the first time someone signs in with Google.
create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.user_profiles (user_id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    coalesce(new.raw_user_meta_data ->> 'avatar_url', new.raw_user_meta_data ->> 'picture')
  )
  on conflict (user_id) do nothing;
  return new;
end;
$$;

revoke execute on function private.handle_new_user() from public, anon, authenticated;
revoke execute on function private.touch_updated_at() from public, anon, authenticated;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function private.handle_new_user();
