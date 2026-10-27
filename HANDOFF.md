# HANDOFF.md

Working state of the **Aralytics** project. Update this file whenever the project changes meaningfully.

**Last updated:** 2026-10-27 (new session: unreferenced scaffold assets removed — `public/icons.svg`, `src/assets/hero.png`, `react.svg`, `vite.svg`; `favicon.svg` kept, `index.html` references it)

## Project Overview

Aralytics — an AI learning-analytics platform for Filipino classrooms. **All 7 screens are now converted 1:1 from the Stitch exports in `screens/stitch/*/code.html`** and verified via Playwright at desktop (1440px) + mobile (390px): public landing, learner home, and 5 teacher screens. The original mockup dirs (`screens/aralytics_*`, `screens/home screen/`, `screens/landing page/`, `screens/aralytics_teacher_dashboard/`) were deleted 2026-10-27 — only `screens/stitch/` and `screens/warm_editorial_edtech/DESIGN.md` remain.

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
| Stitch MCP | remote, configured in **global** config `~/.config/opencode/opencode.json` (NOT project config — the `X-Goog-Api-Key` header must never be committed). **Disabled 2026-10-27** (`disabled: true`) — all needed exports already in `screens/stitch/`. Re-enable by flipping the flag | Fetches screen HTML + hosted screenshots for project `17585807675120887156` |
| Playwright MCP | configured in `opencode.json` (`npx -y @playwright/mcp@latest`), **disabled 2026-10-27** (`disabled: true`) after the verification pass; flip the field to re-enable | Browser checks; user toggled off+on via `disabled: true` field before |

## Design System

Source of truth: `screens/warm_editorial_edtech/DESIGN.md` ("Warm Editorial EdTech"). Same design system exists in the Stitch project (`Warm Editorial EdTech` asset) — generated screens under `screens/stitch/` use it.

⚠️ **Reference package history:** the first build derived from `screens/aralytics_*` + `screens/` mockup dirs — **those were deleted 2026-10-27** (only `stitch/` + `warm_editorial_edtech/DESIGN.md` kept). `screens/stitch/` is now the sole screen-design source — every screen in `src/screens/` was re-implemented from its `code.html`. Differences that came out of the re-conversion:
- `teacher_desktop_dashboard/code.html` is the **real dashboard design** (KPI cards, SVG trend chart + donut, AI insights, Needs-Attention triage, student directory table) — now live at `/dashboard`, replacing the old hand-built variant (and its `StatCard`/`MasteryRing` components, now deleted).
- `student_desktop_portal/code.html` replaced the old `/home` design: simplified restyle (calmer streak banner, compact AI Coach card, inline metadata pills; no "Warm-up preview" filler — the new hero card ends at its metadata pills, so the left bento card has intentional empty space).
- `landing_page/code.html` replaced the old landing: flatter bordered cards, plain "Warm Editorial" styling, same section inventory (hero → pillars → tabs → DepEd → testimonials → metrics → pilot).
- The other 4 (roster, settings, reports, activities) were re-derived verbatim; structure unchanged.

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
| `/` | `LandingPage.jsx` | none (own header) | converted from `screens/stitch/landing_page/code.html`; product tabs (students/teachers), demo modal, pilot form w/ success state, hamburger menu below `lg` (includes mobile CTA) |
| `/home` | `HomeScreen.jsx` | none (own header) | learner home ("Magandang araw, Maria!"); converted from `screens/stitch/student_desktop_portal/code.html`; EN/FIL toggle state, hamburger below `xl`; bento: quiz card (ends at metadata pills — intentional gap) + mastery cards + learning path + gamification + footer |
| `/dashboard` | `TeacherDashboard.jsx` | yes | converted from `screens/stitch/teacher_desktop_dashboard/code.html` — KPI cards, SVG trend chart (Line Chart/Table toggle) + status donut, topic snapshot w/ filter pills, AI-ranked Needs-Attention triage (View → student modal w/ EN/FIL note language toggle), student directory table (search + status filter pills + pagination), toasts for AI Summary/encouragement |
| `/students` | `StudentsMasteryRoster.jsx` | yes | converted; masterlist table w/ `overflow-x-auto`, search + status filter pills + topic select + pagination state, teacher log, Batch Nudge toast |
| `/activities` | `ActivitiesQuizManagement.jsx` | yes | converted; create-activity drawer (useState + backdrop), status tabs + subject chips + format selector state |
| `/reports` | `ClassReportsLearningAnalytics.jsx` | yes | converted; inline SVG bar chart, quarter/section selects, export button busy states |
| `/settings` | `TeacherClassroomSettings.jsx` | yes | converted; tab switching, tone cards, threshold slider, toggles, dirty flag + save toast via useState |
| `*` | redirect → `/` | | |

Unknown paths land on `/`. Landing logo → `/home`; Home nav pills → `/activities`, `/reports`; sidebar logo → `/home`. Landing "Log In" CTA still inert (`#`).

## Layout Components (`src/components/`)

- `layout/Sidebar.jsx` — teacher nav rail; below `lg` becomes hamburger drawer (App-level `navOpen` state, backdrop tap + link tap auto-close), active route highlight via NavLink; logo image + wordmark → `/home`
- `layout/TopBar.jsx` — fixed bar: hamburger (mobile), class pill, search, EN/FIL, notifications, New Activity → `/activities`, avatar; elements progressively hidden on narrow widths

Screens are self-contained JSX (converted from `screens/stitch/*/code.html`; Tailwind classes verbatim; remote googleusercontent images kept with `onError` hide fallbacks; dashboard avatars use initials). Screens don't import each other. `ui/` is empty — the old `StatCard.jsx`/`MasteryRing.jsx` were only used by the pre-reconversion dashboard and were deleted.

## Verified State (end of session)

- git repo ✅ initialized (commits: baseline → .playwright-mcp ignore → re-implementation); anchored `/screens/` ignore works
- `npx vite build` ✅ (~550 kB JS / ~49 kB CSS; chunk-size warning is noise) • `npx oxlint src` ✅ clean • dev server on port **3000** running (fresh instance this session; old one was stale — it served pre-edit modules until killed)
- Playwright-verified (desktop 1440px + mobile 390px, full-page screenshots): all 7 routes styled & correct. Interactions spot-checked in browser: dashboard student modal (EN/FIL toggle, Send Encouragement toast), activities create drawer, landing hamburger menu. Entities bug found & fixed: `&amp;`/`&lt;` written literally inside JS string literals in `TeacherDashboard.jsx` (JSX text children decode entities, JS strings don't)
- Landing footer uses `CURRENT_YEAR` (© 2026); Home footer too
- Exercise for later: `sm`/`md` tablet widths not exhaustively eyeballed; home bento left-card gap could take a filler block (dropped filler no longer in reference HTML); row action buttons on roster + dashboard pagination pages 2-6 have no data rows (static-safe)

## Not Set Up Yet

backend/API/data layer (all data static — roster search/filter/pagination operate on the 9 rendered sample rows only), auth (login CTA inert), tests, CI, mobile app.

New-session note: user env var `STITCH_API_KEY` exists (setx) but `{env:…}` did NOT expand inside the live opencode service during this session (Windows doesn't refresh running process env) — if env substitution is ever needed, restart OpenCode from a new terminal first. The global-config key already proves the sanctioned path.

## Conventions

- Tailwind v4 only — extend theme via `@theme` in `src/index.css`, never a JS config.
- `screens/` (root) → reference package, git-ignored via anchored `/screens/`, read-only runtime rule: never import from it.
- Interactive polish goes through the browser first (playwright MCP) — inspect live, fix, re-screenshot, clean up artifacts.
- Footer years dynamic via `CURRENT_YEAR`; DepEd school-year/quarter strings are content data (do not "update" them).
- Keep this file + `FILETREE.md` in sync (both updated end of session).

## Suggested Next Steps

1. Replace static data with a data layer (local mock JSON first), then loading/empty states — roster/dashboard filters and pagination currently operate on hardcoded sample rows.
2. Wire landing "Log In" → simple auth → route role-based (teacher → `/dashboard`, learner → `/home`).
3. Feature work behind inert buttons: Upload/Export CSV, Batch Nudge, filters, "Start Quiz Now".
4. Tablet-width (`sm`/`md`) eyeball pass for landing + home; consider a filler block for the home bento left-card gap.
