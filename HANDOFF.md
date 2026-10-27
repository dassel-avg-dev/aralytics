# HANDOFF.md

Working state of the **Aralytics** project. Update this file whenever the project changes meaningfully.

**Last updated:** 2026-10-27 (end of session — Stitch MCP configured & auth-verified; all 7 current screen designs + full-res screenshots exported to `screens/stitch/`; API key moved to global config; docs fully synced)

## Project Overview

Aralytics — an AI learning-analytics platform for Filipino classrooms. Built from a design-package reference (HTML mockups in `screens/`, git-ignored). **7 screens live and verified via Playwright at desktop (1440px) + mobile (390px)**: public landing, learner home, and 5 teacher screens.

⚠️ **If the UI looks unstyled/broken next session, check these two known root-cause bugs FIRST** (both happened once, both would silently recur):
1. `src/index.css` — never let a CSS comment contain a literal `*/` sequence (it was in a `screens/*/code.html` path string; it terminates the comment early and corrupts the `@theme` block → every custom utility vanishes).
2. `.gitignore` — the `screens` pattern **must stay root-anchored** (`/screens/`). Unanchored `screens` also matches `src/screens/`, and Tailwind v4 content detection respects `.gitignore` → all screen-only classes silently dropped from generated CSS.
Symptom of either: page renders but cards/colors/paddings/grid missing. Fix, then **restart `npm run dev`** (vite does NOT restart on `.gitignore` changes, does restart on `vite.config.js` changes).

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| Vite | 8.3.5 | Dev server/bundler (rolldown-powered `vite` pkg; logs a harmless chunk-size warning in `vite build`) |
| React | 19 | UI (JavaScript/JSX, no TypeScript) |
| React Router | v7 (`react-router-dom`) | Client routing |
| Tailwind CSS | 4 via `@tailwindcss/vite` | Theme tokens in `src/index.css` `@theme` |
| oxlint | installed | `npm run lint` (empty output = clean) |
| Stitch MCP | remote, configured in **global** config `~/.config/opencode/opencode.json` (NOT project config — the `X-Goog-Api-Key` header must never be committed). Auth-verified. See Stitch usage notes under Design System | Fetches screen HTML + hosted screenshots for project `17585807675120887156` |
| Playwright MCP | configured in `opencode.json` (`npx -y @playwright/mcp@latest`), currently **enabled/connected** | Browser checks; user toggled off+on via `disabled: true` field before |

## Design System

Source of truth: `screens/warm_editorial_edtech/DESIGN.md` ("Warm Editorial EdTech"). Same design system exists in the Stitch project (`Warm Editorial EdTech` asset) — generated screens under `screens/stitch/` use it.

⚠️ **Reference package now has TWO generations**: the original `screens/aralytics_*` + `screens/` mockup dirs used for the built screens, and **`screens/stitch/` (added 2026-10-27)** — full HTML + full-res screenshots for all 7 current Stitch screens, fetched via the Stitch MCP. Key changes vs the originals:
- `screens/stitch/teacher_desktop_dashboard/code.html` is the **real dashboard design** (the hand-built `TeacherDashboard.jsx` was based on a byte-identical roster duplicate; re-convert from this).
- `screens/stitch/student_desktop_portal/code.html` is a **learner portal screen** (new; `/home` was built from an older design; compare before touching it).
- `screens/stitch/landing_page/code.html` is a **updated landing design** (longer page, 1280×5888 at canvas scale — compare with current `LandingPage.jsx` before assuming drift).
- The other 4 (roster, settings, reports, activities) match the already-converted screens in structure.

**Stitch screen IDs ↔ `screens/stitch/` slugs** (project `17585807675120887156`, "Aralytics Learning Platform Design"):

| Screen slug | Screen ID |
|---|---|
| `students_mastery_roster` | `11487fb061364d58a7ee13f3a74832f7` |
| `student_desktop_portal` | `1cddafa20c304b4885c42373a9c80497` |
| `landing_page` | `77d817e2ddb94e56b55af094f1460c07` |
| `teacher_classroom_settings` | `7893867e409b4d3d8dae0db9cc614681` |
| `class_reports_learning_analytics` | `97a29eb994734c3eaa14511cd3081f80` |
| `activities_quiz_management` | `a703a15b41d64dc7a3660377b9f7a1fc` |
| `teacher_desktop_dashboard` | `faeb2f3b87484dd991ff3e818486f71a` |

Also in the project (not downloaded, unless needed): `4f40a181…` hidden 390px mobile screen, `b2ec0693…` hidden legacy "Aralytics Teacher Dashboard".

**Stitch MCP usage notes** (gotchas hit in 2026-10-27 session):
- `get_screen({ name: "projects/{pid}/screens/{sid}" })` → returns `htmlCode` + `screenshot` objects with resource `name`s; `download_file({ name })` → raw `html` string or base64 `image`.
- Hosted URLs (`lh3.googleusercontent.com/aida/…` for images, `contribution.usercontent.google.com/download?c=…` for HTML) are **publicly curl-able, no auth** — for images append **`=s0`** or you get ~512px-tall thumbnails. The 4 older screens host PNGs; the 3 newer ones (portal/landing/dashboard) host JPEGs regardless of URL extension — detect by magic bytes (`89 50 4E 47` vs `FF D8`).
- Screenshot dims as exported: roster 2560×2856, settings 2560×3442, reports 2560×4760, activities 2560×2726 (PNG); portal 1600×2013, landing 1600×7360, dashboard 1600×2515 (JPG).

- Palette: indigo primary `#422ec2`/container `#5b4bdb`, turquoise secondary, amber tertiary, canvas `#fbf8ff`, ink `#151936`; status: On Track `#22a06b`, Nudge `#b8740b`/tint `#ffefd1`, Help `#e5484d`/tint `#fde4e5`; accent yellow `#ffc93c` for celebratory CTAs.
- Fonts (**loaded in `index.html`**): **Nunito Sans** 700/800 headings+metrics, **Inter** 400–600 body, **Material Symbols Outlined** icons.
- Custom class tokens ported verbatim into `src/index.css` `@theme` (`bg-surface-container-lowest`, `text-on-surface-variant`, `font-headline-sm`, `text-metric-number`, `px-space-lg`, `px-margin`, functional colors like `text-warn`, `bg-danger-tint`, `border-lavender-ash`, `bg-cream`) — class names in components match the mockup HTML with zero rewriting. Module-scope `const CURRENT_YEAR` drives footer years on Landing + Home.

## App Shell & Routing (`src/App.jsx`)

`BrowserRouter` → `AppShell` wrapper that renders the teacher chrome (fixed `Sidebar` 250px + fixed `TopBar` 72px + `<main pt-[72px] lg:pl-[250px]>`) **only** on teacher paths; standalone screens render fullscreen with their own headers.

| Route | Screen (`src/screens/`) | Shell | Notes |
|---|---|---|---|
| `/` | `LandingPage.jsx` | none (own header) | converted from `screens/landing page/` mockup; product tabs (students/teachers), demo modal, pilot form w/ success state, hamburger menu below `lg` (includes mobile CTA) |
| `/home` | `HomeScreen.jsx` | none (own header) | learner home ("Magandang araw, Maria!"); EN/FIL toggle state, hamburger below `xl`; bento: quiz card + "Warm-up preview" filler block (fills equal-height gap vs taller Aral Coach card) + mastery cards + learning path + gamification + footer |
| `/dashboard` | `TeacherDashboard.jsx` | yes | **hand-built** — original package's `aralytics_teacher_dashboard/code.html` was a byte-identical duplicate of the roster mockup; the **real dashboard design now exists** at `screens/stitch/teacher_desktop_dashboard/code.html` (KPI cards, SVG trend chart + donut, AI insights, Needs-Attention triage, student directory table) — re-convert from it. Current: KPI rings (StatCard), SVG trend chart, AI-ranked nudges, upcoming, topic snapshot |
| `/students` | `StudentsMasteryRoster.jsx` | yes | converted from `code.html`; masterlist table with `overflow-x-auto` |
| `/activities` | `ActivitiesQuizManagement.jsx` | yes | converted; create-activity drawer (useState open/close + backdrop) |
| `/reports` | `ClassReportsLearningAnalytics.jsx` | yes | converted; SVG bar chart inline, ambient glow divs kept |
| `/settings` | `TeacherClassroomSettings.jsx` | yes | converted; tab switching, toggles, slider, dirty flag + save toast all work via useState |
| `*` | redirect → `/` | | |

Unknown paths land on `/`. Landing logo → `/home`; Home nav pills → `/activities`, `/reports`; sidebar logo → `/home`. Landing "Log In" CTA still inert (`#`).

## Layout Components (`src/components/`)

- `layout/Sidebar.jsx` — teacher nav rail; below `lg` becomes hamburger drawer (App-level `navOpen` state, backdrop tap + link tap auto-close), active route highlight via NavLink
- `layout/TopBar.jsx` — fixed bar: hamburger (mobile), class pill, search, EN/FIL, notifications, New Activity → `/activities`, avatar; elements progressively hidden on narrow widths
- `ui/MasteryRing.jsx` — SVG progress ring (value, color class, size)
- `ui/StatCard.jsx` — KPI scorecard (dot + big Nunito metric + trend + MasteryRing) — used by TeacherDashboard only

Screens are self-contained JSX (converted from mockup HTML; Tailwind classes verbatim; remote googleusercontent images kept with `onError` hide fallbacks; dashboard avatars use initials). Screens don't import each other.

## Verified State (end of session)

- `npx vite build` ✅ (~425 kB JS / ~49 kB CSS; chunk-size warning is noise) • `npx oxlint src` ✅ clean • dev server port **3000** was running as a background task but the two opencode service restarts this session likely killed it — `npx vite dev` first if the browser shows nothing
- Playwright-verified: all routes 200; landing + home + dashboard pixel-checked desktop & mobile; home bento gap fixed w/ Warm-up preview; "Just In" pill fixed; hamburger menus work on home + landing at 390px; `.playwright-mcp` + temp screenshots cleaned up after checks
- Stitch MCP ✅ connected + auth-verified (`get_screen` 200 with real data after key moved to global config; earlier `{env:…}`-based attempt 401'd and was reverted — see Stitch usage notes)
- `screens/stitch/` ✅ all 7 code.html identity-checked (titles/h1 markers) + all 7 screenshots magic-byte/dimension-verified at full res; scratch scripts + `temp_raw/` deleted
- Exercise for later: landing & home at `sm`/`md` tablet widths not exhaustively eyeballed; `screens/stitch/` HTML was never diffed line-by-line against the converted JSX screens

## Not Set Up Yet

git repo (dir is not initialized — do this FIRST next session, `.gitignore` is ready; ✅ project `opencode.json` is secret-free now, Stitch key lives in **global** config), backend/API/data layer (all data static), auth (login CTA inert), tests, CI, mobile app.

New-session note: user env var `STITCH_API_KEY` exists (setx) but `{env:…}` did NOT expand inside the live opencode service during this session (Windows doesn't refresh running process env) — if env substitution is ever needed, restart OpenCode from a new terminal first. The global-config key already proves the sanctioned path.

## Conventions

- Tailwind v4 only — extend theme via `@theme` in `src/index.css`, never a JS config.
- `screens/` (root) → reference package, git-ignored via anchored `/screens/`, read-only runtime rule: never import from it.
- Interactive polish goes through the browser first (playwright MCP) — inspect live, fix, re-screenshot, clean up artifacts.
- Footer years dynamic via `CURRENT_YEAR`; DepEd school-year/quarter strings are content data (do not "update" them).
- Keep this file + `FILETREE.md` in sync (both updated end of session).

## Suggested Next Steps

1. `git init` + first commit (`.gitignore` ready; confirms anchored `/screens/` works in practice). ✓ Stitch API key already lives in *global* config (not committed) — project `opencode.json` is secret-free and safe to commit.
2. Re-convert `TeacherDashboard.jsx` from `screens/stitch/teacher_desktop_dashboard/code.html` (real design now available).
3. Review `screens/stitch/student_desktop_portal/code.html` vs current `/home` — either diff-convert or adopt as `HomeScreen` v2.
4. Replace static data with a data layer (local mock JSON first), then loading/empty states.
5. Wire landing "Log In" → simple auth → route role-based (teacher → `/dashboard`, learner → `/home`).
6. Feature work behind inert buttons: Upload/Export CSV, Batch Nudge, filters, "Start Quiz Now".
