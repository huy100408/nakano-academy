# Nakano Academy

A desktop study app inspired by *The Quintessential Quintuplets*. Each Nakano sister tutors you in one subject, and Head Tutor Fuutarou Uesugi (500/500) tracks your mock-exam total. To earn Mr. Maruo Nakano's approval you need 30+ in every subject.

Runs on **macOS** (`.dmg`, Apple Silicon and Intel), **Windows** (`.exe` installer) and in the browser.

**Website:** https://huy100408.github.io/nakano-academy/ · **Learn online (free):** https://huy100408.github.io/nakano-academy/learn/ · **Built by** [Brian Nguyen](https://github.com/huy100408)

| No. | Tutor | Subject | Desk item |
| --- | --- | --- | --- |
| 01 | Ichika | Mathematics (algebra, geometry) | Script: 50/50 hint |
| 02 | Nino | English (grammar, vocabulary) | Pastry: streak shield |
| 03 | Miku | AP Human Geography (AP-exam style) | Matcha soda: 50/50 hint |
| 04 | Yotsuba | Computer Science | Medal: streak shield |
| 05 | Itsuki | Science (biology, physics) | Curry bun: 50/50 hint |

## Features

- **Launch intro.** The app and the website open with an intro clip, streamed through YouTube's official embed and not stored in this repo, followed by an animated title card. Press `Esc` to skip, or turn it off in Settings.

- **Classroom.** Each tutor has a video stage and a visual-novel dialogue box with four moods (Idle, Teaching, Praising, Flustered).
- **Lesson deck.** 6 flip cards per subject, each with a deep note. Itsuki asks for a curry bun before she shares hers.
- **Live quiz.** 8 questions per subject. Question and option order are shuffled on every attempt, and every answer comes with an explanation in the tutor's voice. Your best score per subject is kept.
- **Scrambled Eggs.** Every sister is disguised as Itsuki, and you identify who is speaking from her subject hint, speech pattern and posture.
- **Report Card.** A 5-axis radar chart compares you with the sisters' canon scores and with Fuutarou's 500. Passing every subject unlocks a School Festival certificate.
- **Extras.** A Pomodoro timer with Yotsuba, affection levels, streaks, and a 4-Core / 5-Full toggle (4-Core leaves CS out of the total).
- **Progress is saved** on your computer. Keyboard shortcuts: `Space` flips a card, `← →` browse cards, `1–4` answer, `Enter` goes to the next question.
- **Optional character voices** through [Fish Audio](https://fish.audio). See below.

## Download

Get the latest installer from the [Releases](https://github.com/huy100408/nakano-academy/releases) page.

> The builds are not code-signed. On macOS, right-click the app and choose **Open** the first time. On Windows, click **More info → Run anyway** in SmartScreen.

## Development

```bash
npm install
npm run dev            # web app at http://localhost:5173
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

To add or fix questions, edit `src/data/sisters.js`. Each question's `answer` is the index of the correct option.

## Disclaimer

This is a non-commercial fan project. *The Quintessential Quintuplets* and its characters belong to Negi Haruba and Kodansha. This project is not affiliated with or endorsed by them. The intro clip is a fan edit by its YouTube creator. It is embedded, not redistributed. The code is released under the MIT License. That license does not cover the characters or likenesses.
