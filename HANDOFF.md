# HANDOFF.md

Working state of the **Aralytics** project. Update this file whenever the project changes meaningfully.

**Last updated:** 2026-10-27 (latest session — **all 5 teacher screens re-implemented from their NEW CS-rebrand Stitch exports** (re-fetched 11:33 PM 2026-10-27): roster, dashboard, activities, reports, settings; Sidebar/TopBar chrome rebranded (CS Instructor / 💻 CS 101: Intro to Python). Whole app is now consistently CS/Python-themed. All verified via Playwright text/computed-style checks (no image input) + desktop screenshots saved to `.playwright-mcp/`)

## Project Overview

Aralytics — an AI learning-analytics platform for **Filipino CS classrooms** (Python programming diagnostics). **All 7 screens are now converted 1:1 from the CS-rebrand Stitch exports in `screens/stitch/*/code.html`** and verified via Playwright at desktop (1440px) + mobile (390px) overflow checks: public landing, learner home, and 5 teacher screens. Only `screens/stitch/` and `screens/warm_editorial_edtech/DESIGN.md` remain as references.

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
| Stitch MCP | remote, configured in **global** config `~/.config/opencode/opencode.json` (NOT project config — the `X-Goog-Api-Key` header must never be committed). **Re-enabled 2026-10-27** (later session) and hot-reloaded mid-session — remote MCP config changes DO hot-reload in OpenCode | Fetches screen HTML + hosted screenshots for project `17585807675120887156` |
| Playwright MCP | configured in `opencode.json` (`npx -y @playwright/mcp@latest`), **re-enabled 2026-10-27** | Browser checks; hot-reload also worked here |

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
| `/` | `LandingPage.jsx` | none (own header) | re-implemented from **new** `screens/stitch/landing_page/code.html` (CS rebrand): python-quiz hero demo card + Aral Coach panel, product tabs (students: coding app preview / teachers: CS-101 triage table), "Coding Competencies Covered" card, 3 CS testimonials, metrics band (<5s / 94.2% / 10+ hours / 100%), pilot form w/ success state, demo modal w/ remote bg image, hamburger menu below `lg` (includes mobile CTA) |
| `/home` | `HomeScreen.jsx` | none (own header) | learner home re-implemented from **new** `stitch/student_desktop_portal/code.html` ("Kumusta, Miguel!" — Python 101 • Section Py-B, Coach Alex Reyes); EN/FIL toggle state, hamburger below `xl`; bento: quiz card (Python Loops & List Comprehension Diagnostic) + Aral Coach AI (Diagnostic) + mastery cards (CS competencies) + learning path (coding drills) + milestones (Debug Ace/Speed Coder badges) + footer |
| `/dashboard` | `TeacherDashboard.jsx` | yes | re-implemented from **new CS export**: "Welcome back, Mr. Reyes! 💻", cohort CS 101 - Intro to Python (Section A), KPIs (84.6% pass rate / 92.8% lab submissions), Coding Benchmark SVG trend (Line/Table toggle), Mastery by CS Concept pills (All/Syntax/Logic/Functions actually filter), Flagged for Coding Support (Miguel 58% off-by-one), directory table (CS-2024-00X IDs, initials avatars, search + status pills), student modal w/ EN/FIL note toggle, Export Lab CSV busy state, AI Diagnostics toast |
| `/students` | `StudentsMasteryRoster.jsx` | yes | re-implemented from **new CS export**: 7 rows (Miguel Ramos 58% selected by default … Sofia Bautista 81%), `STU-109283-0X` IDs, "Needs Help" red bars rows 1–4, right drawer = Miguel detail card (Loops 42%/Conditionals 65%/Data Structures 70%/Functions 55%, per-topic grid, Assign Remedial Coding Quiz / Student Chat / Open Sandbox), row click selects; search + filter pills + topic select + pagination (1–4) + teacher log + Batch Nudge toast preserved; Incomplete/Inactive pills match zero rows in new export |
| `/activities` | `ActivitiesQuizManagement.jsx` | yes | re-implemented from **new CS export**: "Coding Activities & Quizzes", topic chips (Python Fundamentals/Control Flow/Data Structures/Functions/Debugging), 4 coding activity cards (Loops & List Comprehension Diagnostic, Functions & Return Values debugging, Conditional Logic MCQ, While-Loop Remediation), Python 101 coverage footer 82%, create-activity drawer (Topic/Module + Section selects) + toast system |
| `/reports` | `ClassReportsLearningAnalytics.jsx` | yes | re-implemented from **new CS export**: "Cohort Reports & Learning Analytics" for CS 101-A, Term/Section selects, 4 metric cards (83.4% mastery, 81% diagnostic efficacy, 8m45s debugging, 4-student remedial queue), CS-PY-101…104 competencies, growth matrix SVG (new students), AI Diagnostic Engine Telemetry panel replaces old 'Aral' tutor card, Institutional Reports & Exports w/ busy states |
| `/settings` | `TeacherClassroomSettings.jsx` | yes | re-implemented from **new CS export**: "COMPUTER SCIENCE DEPARTMENT · DIAGNOSTIC CONFIGURATION", tabs (Profile & Account / Classroom & Grading / AI Diagnostic Model & Tone / Language / Notifications), Aralytics-Code-7B local model card, 3 tone cards (Socratic default), 70% intervention threshold slider, EN/Bilingual toggles, profile Mr. Ronald Reyes w/ CS 101-A + CS 201-B cohorts, 40/60 MCQ-vs-debugging weighting, dirty flag + save toast |
| `*` | redirect → `/` | | |

Unknown paths land on `/`. Landing logo → `/home`; Home nav pills → `/activities`, `/reports`; sidebar logo → `/home`. Landing "Log In" CTA still inert (`#`).

## Layout Components (`src/components/`)

- `layout/Sidebar.jsx` — teacher nav rail; below `lg` becomes hamburger drawer (App-level `navOpen` state, backdrop tap + link tap auto-close), active route highlight via NavLink; logo image + wordmark → `/home`
- `layout/TopBar.jsx` — fixed bar: hamburger (mobile), class pill, search, EN/FIL, notifications, New Activity → `/activities`, avatar; elements progressively hidden on narrow widths

Screens are self-contained JSX (converted from `screens/stitch/*/code.html`; Tailwind classes verbatim; remote googleusercontent images kept with `onError` hide fallbacks; dashboard avatars use initials). Screens don't import each other. `ui/` is empty — the old `StatCard.jsx`/`MasteryRing.jsx` were only used by the pre-reconversion dashboard and were deleted.

## Verified State (end of session)

- git repo ✅ (commits through: MCP re-enables → asset cleanup → new Stitch re-exports → /home + / re-implementation → **5 teacher screens CS rebrand**)
- `npx oxlint src` ✅ clean (exit 0) • `npx vite build` ✅ (~550 kB JS chunk-size warning is noise) • dev server running (port 3002 this session — 3000/3001 occupied by stale prior instances; kill them or pick the reported port)
- Playwright-verified all 5 teacher routes at 1440px: per-route text assertions (CS terms present, zero stale "Grade 8/Sampaguita/LRN" terms) pass; body bg `rgb(251, 248, 255)` (canvas) + Inter confirmed; **no horizontal overflow at 390px on all 5**. Settings' "Mr. Ronald Reyes" confirmed present on the Profile & Account tab (not the default tab)
- ⚠️ Model again had no image input — no visual eyeballing. Full-page desktop screenshots saved: `.playwright-mcp/{dashboard,roster,activities,reports,settings}-desktop-1440.png` (+ 4 older landing/home shots) for a human visual pass
- Chrome components: Sidebar ("CS Instructor") + TopBar ("💻 CS 101: Intro to Python (42 students)" / "CS 101" mobile) rebranded manually (exports don't include chrome) — uncommitted edits from the interrupted prior session, now committed
- Only remaining stale term in src: one decorative `data-alt` on `LandingPage.jsx` (verbatim from the landing export; text-only attribute)
- Exercise for later: `sm`/`md` tablet widths not eyeballed; mobile-viewport screenshots of the 5 teacher screens not captured this session (overflow checks only); row action buttons/table pagination on all screens remain static-safe

## Not Set Up Yet

backend/API/data layer (all data static — roster search/filter/pagination operate on the 9 rendered sample rows only), auth (login CTA inert), tests, CI, mobile app.

New-session note: user env var `STITCH_API_KEY` exists (setx) but `{env:…}` did NOT expand inside the live opencode service during this session (Windows doesn't refresh running process env) — if env substitution is ever needed, restart OpenCode from a new terminal first. The global-config key already proves the sanctioned path.

## Conventions

- Tailwind v4 only — extend theme via `@theme` in `src/index.css`, never a JS config.
- `screens/` (root) → reference package, git-ignored via anchored `/screens/`, read-only runtime rule: never import from it.
- Interactive polish goes through the browser first (playwright MCP) — inspect live, fix, re-screenshot, clean up artifacts.
- Footer years dynamic via `CURRENT_YEAR`; DepEd school-year/quarter strings are content data (do not "update" them).
- Keep this file + `FILETREE.md` in sync (both updated end of session).
- Log every step in `LOG.md` as you go (append during the session, not just at the end).

## Suggested Next Steps

1. Replace static data with a data layer (local mock JSON first), then loading/empty states — roster/dashboard filters and pagination currently operate on hardcoded sample rows.
2. Human visual pass over the 9 `.playwright-mcp/*.png` screenshots against `screens/stitch/*/screen.*` (model had no image input — DOM checks only; also capture mobile screenshots of the 5 teacher screens next time).
3. Wire landing "Log In" → simple auth → route role-based (teacher → `/dashboard`, learner → `/home`).
4. Feature work behind inert buttons: Quick Drill / Start Quiz Now, View All Feedback, Preview Student Coding App, CSV exports, Batch Nudge.
