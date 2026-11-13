# Nakano Academy

A study app themed on *The Quintessential Quintuplets*. It ships three ways from one codebase:

| Target | Entry | Built by | Served at |
| --- | --- | --- | --- |
| Web app ("Learn online") | `index.html` → `src/main.jsx` | `vite build --outDir site-dist/learn` | `https://huy100408.github.io/nakano-academy/learn/` |
| Website (landing page) | `site/index.html` → `site/Site.jsx` | `vite build -c vite.site.config.js` | `https://huy100408.github.io/nakano-academy/` |
| Desktop app (macOS `.dmg`, Windows `.exe`) | same as the web app, loaded from `dist/` | `npm run dist:mac` / `dist:win` (Electron + electron-builder) | GitHub Releases |

Stack: React 18, Vite 6, Tailwind CSS 4, lucide-react, Supabase (Auth + Postgres), Electron 33. Mostly JavaScript; the Supabase layer is TypeScript (`npx tsc --noEmit` checks `src/**/*.ts(x)`).

## Layout

```
src/
  main.jsx, App.jsx            app shell: intro → AuthGate → Shell (sidebar HUD, views, mobile nav)
  features/auth/AuthGate.tsx   mandatory Google sign-in, OAuth callback handling, cloud hydration
  services/supabaseSync.ts     optimistic write queue → Supabase (debounced upserts, offline queue)
  state/useAcademy.tsx         all app state + actions (answer, finishSession, items, eggs, reset)
  lib/supabase.ts              Supabase client + redirect URL logic
  types/supabase.ts            generated: `supabase gen types typescript --project-id <ref>`
  data/sisters.js              the five tutors (theme colours, persona, dialogue lines)
  data/subjects/*.js           lesson content, one module per sister (24 questions, 10 flashcards, 3 egg rounds)
  data/curriculum.js           MODULES, TIERS, QUESTION_INDEX, EGG_ROUNDS
  data/items.js                the five signature items
  components/                  Classroom, Stage, LessonDeck, Quiz, ReviewView, EggsView, ReportView, Sidebar (HUD)
  intro/                       launch sequence (YouTube embed + title card)
electron/main.cjs, preload.cjs window, nakano:// sign-in link, Fish Audio voice bridge
site/                          GitHub Pages landing page
supabase/migrations/           SQL migrations (source of truth for the schema)
```

Subjects and their keys (used everywhere, including the database): `math` (Ichika), `english` (Nino), `geo` = AP Human Geography (Miku), `cs` = Computer Science (Yotsuba), `science` (Itsuki).

## Supabase

Project ref `eudaajneofcbjbommbnl`. Schema: `supabase/migrations/20261114000000_nakano_academy_init.sql`.

| Table | Purpose |
| --- | --- |
| `user_profiles` | one row per user: exam score, streaks, Maruo approval (0–100), preferred sister, `baseline_mastery` / `current_mastery` (jsonb by subject key), `item_inventory` (jsonb), Scrambled Eggs records |
| `question_progress` | spaced repetition per question (SM-2 style ease/interval, `is_weak_spot`, `next_review_at`); unique on `(user_id, subject_id, question_id)` |
| `study_sessions` | log of every finished run (`difficulty_tier`: easy, medium, hard, review, midterm_rescue) |
| `scrambled_eggs_logs` | one row per Scrambled Eggs round |

Rules:
- Every table has RLS enabled with owner-only policies, `(select auth.uid()) = user_id`, for authenticated users. `anon` has no table grants.
- `private.handle_new_user()` (security definer, `search_path = ''`) creates the profile row on sign-up; the client also upserts it if missing.
- Schema changes go in a **new** file in `supabase/migrations/`, then apply them (Supabase MCP `apply_migration`, or the CLI) and regenerate `src/types/supabase.ts`.
- After changing schema, run the Supabase security and performance advisors (MCP `get_advisors`).
- Clients write rows with client-generated UUIDs and upserts so offline retries are idempotent. Never trust the client for anything security-relevant; RLS is the boundary.

### Auth

Google only, through Supabase Auth with the PKCE flow.
- Web: `signInWithOAuth` redirects back to the current page (`origin + pathname`, e.g. `/nakano-academy/learn/`). `detectSessionInUrl` finishes the code exchange; `AuthGate` shows a loading state until `getSession()` resolves, then strips `?code=` from the URL.
- Desktop: `redirectTo: 'nakano://auth-callback'`, `skipBrowserRedirect: true`; the URL opens in the default browser via `window.nakano.auth.openExternal`. `electron/main.cjs` registers the `nakano` protocol, receives the link (`open-url` on macOS, `second-instance` argv on Windows) and forwards it; `AuthGate` calls `exchangeCodeForSession(code)`.
- Supabase → Authentication → URL Configuration must allow: `https://huy100408.github.io/nakano-academy/**`, `http://localhost:5173/**`, `http://localhost:4173/**`, `nakano://auth-callback`.

## Environment

`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (publishable/anon key, safe in browsers) come from `.env` locally (see `.env.example`; `.env` is git-ignored) and from GitHub **Actions variables** in CI (`pages.yml`, `release.yml`). Without them the app shows a setup message instead of the login screen.

Local UI work without signing in: `npm run dev`, then open `http://localhost:5173/?demo` (dev builds only; it uses fake local data and never touches Supabase).

## GitHub Pages base-path rules

- The website is built with `base: '/nakano-academy/'` (`vite.site.config.js`). The app is built with `base: './'` so the **same** bundle works at `/nakano-academy/learn/` and from `file://` inside Electron. Reference assets as relative paths (`./videos/...`, `asset()` in `components/ui.jsx`), never `/videos/...`.
- `public/404.html` sends unknown paths back to `/nakano-academy/` or `/learn/`, keeping the query and hash.
- The app has no client-side routes; views are React state, so deep links use query params (`/learn/?tutor=miku`).

## Commands

```bash
npm run dev            # web app at http://localhost:5173 (add ?demo to skip sign-in)
npm run dev:site       # website
npm run electron:dev   # desktop app with hot reload
npm run build          # web/desktop bundle → dist/
npm run build:site     # website + /learn/ → site-dist/ (what Pages deploys)
npx tsc --noEmit       # type-check the TypeScript files
npm run dist           # .dmg + .exe → release/
```

Content rules: each `src/data/subjects/*.js` module must keep exactly 4 options per question, a valid `answer` index, a `tier` of easy/medium/hard and a `hint`. Question ids are stored in `question_progress`; **never renumber or reuse an id**, or users' review history attaches to the wrong question.
