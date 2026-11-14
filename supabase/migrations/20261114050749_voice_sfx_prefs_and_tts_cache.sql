-- Voice / sound-effect preferences, synced per user.
alter table public.user_profiles
  add column if not exists voice_enabled boolean not null default true,
  add column if not exists sfx_enabled boolean not null default true,
  add column if not exists voice_volume numeric(3, 2) not null default 0.9 check (voice_volume between 0 and 1),
  add column if not exists voice_speed numeric(3, 2) not null default 1.0 check (voice_speed between 0.5 and 2);

-- Scrambled Eggs now has a fourth clue (the voice tell).
alter table public.scrambled_eggs_logs drop constraint if exists scrambled_eggs_logs_clues_used_check;
alter table public.scrambled_eggs_logs add constraint scrambled_eggs_logs_clues_used_check check (clues_used between 1 and 4);

-- Cache for generated tutor voice lines. Public read by URL; only the fish-tts
-- Edge Function (service role) writes. No storage.objects policies are added,
-- so clients cannot list, upload or delete.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('tts-cache', 'tts-cache', true, 5242880, array['audio/mpeg'])
on conflict (id) do nothing;
