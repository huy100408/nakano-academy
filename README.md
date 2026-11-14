# Nakano Academy

A study app inspired by *The Quintessential Quintuplets*. Each Nakano sister tutors you in one subject, and Head Tutor Fuutarou Uesugi (500/500) keeps watch while you earn Mr. Maruo Nakano's approval.

Runs in the browser, on **macOS** (`.dmg`, Apple Silicon and Intel) and on **Windows** (`.exe`). You sign in with Google, and your progress syncs across all of them through Supabase.

**Website:** https://huy100408.github.io/nakano-academy/ · **Learn online (free):** https://huy100408.github.io/nakano-academy/learn/ · **Built by** [Brian Nguyen](https://github.com/huy100408)

| No. | Tutor | Subject | Signature item |
| --- | --- | --- | --- |
| 01 | Ichika | Mathematics | Script Notes: crosses out 2 wrong answers |
| 02 | Nino | English | Kitchen Timer: streak shield |
| 03 | Miku | AP Human Geography | Headphones: hint before you answer |
| 04 | Yotsuba | Computer Science | Ribbon: double points on a question |
| 05 | Itsuki | Science | Curry Bun: +10% Maruo approval |

## Features

- **Sign in with Google.** Required on every platform. Scores, streaks, items, review schedule and history are saved to your account and sync between devices. Changes made offline are queued and sent when you reconnect. The HUD shows the sync status.
- **Launch intro.** An intro clip, streamed through YouTube's official embed and not stored in this repo, followed by an animated title card. Press `Esc` to skip, or turn it off in Settings.
- **Classroom.** Each tutor has a video stage and a visual-novel dialogue box with four moods. Picking a sister switches the colour theme, and your choice is remembered on every device.
- **Flashcards.** 10 per subject, each with a key takeaway and a memory hook.
- **Practice in three tiers.** Tutoring Session (easy), Midterm (medium) and Final Exam (hard): 24 questions per subject with step-by-step explanations and reactions in the tutor's voice.
- **Review weak spots.** Spaced repetition: missed questions and questions due for review come back across all subjects.
- **Fuutarou HUD.** Exam score, study streak, item inventory and Mr. Maruo Nakano's approval rating. If approval falls below 40%, a **Midterm Warning** unlocks a Midterm Rescue challenge worth +15%.
- **Scrambled Eggs.** Every sister is disguised as Itsuki. Clues reveal one at a time (an academic answer, a speech slip, a behavioural tell), and guessing earlier scores ×3 / ×2 / ×1. Every round is logged, with your history and a recognition leaderboard.
- **Report Card.** A 5-axis radar comparing your baseline with your current mastery, F to S+ grades, Fuutarou's and Maruo's verdicts, and recent sessions.
- **Keyboard shortcuts:** `1`–`5` switch tutors, `Space` flips a card, `A`–`D` answer, `Enter` goes to the next question. On phones and tablets there's a bottom tab bar and safe-area padding.
- **Optional character voices** through [Fish Audio](https://fish.audio) (desktop app). See below.

## Download

Get the latest installer from the [Releases](https://github.com/huy100408/nakano-academy/releases) page.

> The builds are not notarized. On macOS, open the app once, then go to **System Settings → Privacy & Security → Open Anyway** (or run `xattr -dr com.apple.quarantine "/Applications/Nakano Academy.app"`). On Windows, click **More info → Run anyway** in SmartScreen.

## Development

```bash
npm install
cp .env.example .env   # add your Supabase URL + publishable/anon key
npm run dev            # web app at http://localhost:5173 (add ?demo to try it without signing in)
npm run dev:site       # website at http://localhost:5173/nakano-academy/
npm run electron:dev   # desktop window with hot reload
```

If Electron fails to start after `npm install`, your npm version may be blocking install scripts. Run `npm rebuild electron`.

### Build installers

```bash
npm run dist:mac   # release/*.dmg  (arm64 + x64)
npm run dist:win   # release/*.exe  (NSIS, x64), which also works from macOS
```

Pushing to `main` deploys the website (`.github/workflows/pages.yml`). Pushing a tag like `v1.0.0` runs `.github/workflows/release.yml`. It builds both installers on GitHub's macOS and Windows runners and attaches them to a release.

## Supabase setup (for forks)

1. Create a Supabase project and apply `supabase/migrations/*.sql` (with the Supabase CLI, `supabase db push`, or in the SQL editor).
2. **Authentication → Sign In / Providers → Google:** turn it on with a Google OAuth client. In Google Cloud, the redirect URI is `https://<ref>.supabase.co/auth/v1/callback`.
3. **Authentication → URL Configuration:** allow your site, e.g. `https://<you>.github.io/nakano-academy/**`, `http://localhost:5173/**` and `nakano://auth-callback` (desktop app).
4. Put the URL and publishable/anon key in `.env`, and in GitHub → Settings → Secrets and variables → Actions → **Variables** as `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

See `CLAUDE.md` for the architecture and schema.

## Character voices (Fish Audio)

1. Open **Settings** (the gear in the bottom-left panel).
2. Paste your Fish Audio API key and click **Save**.
3. Paste a voice model ID (`reference_id`) for each sister. Use the speaker button to test it.
4. Turn on **Speak dialogue aloud**.

The key is stored only in the app's local settings file (`settings.json` in the OS user-data folder) with owner-only permissions. Requests go out from Electron's main process, so the key never reaches the web page. You can also set `FISH_AUDIO_API_KEY` in the environment before the first launch. The request code lives in `electron/main.cjs`.

## Project layout

```
electron/        main process (window, settings, Fish Audio bridge) + preload
src/data/        all lesson cards, quiz questions, dialogue lines
src/components/  Sidebar, Classroom, Stage, LessonDeck, Quiz, EggsView, ReportView, SettingsSheet
src/lib/         persisted progress store, voice client
public/videos/   one looping, silent teaching clip per sister
src/intro/       launch sequence (YouTube embed + title animation)
site/            the GitHub Pages website
scripts/         icon generator
```

To add or fix questions, edit the subject's file in `src/data/subjects/`. Each question's `answer` is the index of the correct option. Never reuse or renumber a question `id`, because review history is stored by id.

## Disclaimer

This is a non-commercial fan project. *The Quintessential Quintuplets* and its characters belong to Negi Haruba and Kodansha. This project is not affiliated with or endorsed by them. The intro clip is a fan edit by its YouTube creator. It is embedded, not redistributed. The code is released under the MIT License. That license does not cover the characters or likenesses.
