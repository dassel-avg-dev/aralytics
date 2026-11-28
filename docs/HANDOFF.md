# HANDOFF.md — Aralytics Architecture & Continuation Guide

> **Always read this file alongside [`SETUP.md`](./SETUP.md), [`NAVIGATION.md`](./NAVIGATION.md), [`LOG.md`](./LOG.md), and [`FILETREE.md`](./FILETREE.md) before touching any code.**

---

## 1. Project Overview

**Aralytics** (also branded **Aralytics Pilipinas AI**) is a Philippine CS / Python coding classroom and diagnostic analytics platform. The repository combines a Spring Boot 3.4.13 + PostgreSQL 16 REST API in `backend/` (`http://localhost:8080`, see [`../backend/README.md`](../backend/README.md)) with a React 19 + Vite 8 + Tailwind CSS v4 SPA in `frontend/` (`http://localhost:3000`) organized into three role-separated views:
1. **Public & Authentication View** (`frontend/src/screens/public/` + `frontend/src/screens/shared/`):
   - Public Marketing Landing Page (`/`)
   - Unified Student / Teacher Login (`/login`)
   - 2-Step Institutional Key & Account Activation (`/register`)
   - Password Reset Request (`/forgot-password`) & Reset (`/reset-password`)
   - Role-Mismatch 403 Access Denied (`/forbidden`) & User Profile (`/profile`)
2. **Student View** (`frontend/src/screens/student/`, routes under `/student/*`, wrapped in `StudentShell`):
   - Student Portal Home / Dashboard (`/student/dashboard`)
   - Student Assigned Coding Activities (`/student/activities`)
   - Student Live Quiz & Situational Code Scenario Arena (`/student/quiz`)
   - Student Instant AI Feedback & Diagnostic Report (`/student/feedback`)
   - Student Feedback History & Progress Analytics (`/student/progress`)
3. **Teacher View** (`frontend/src/screens/teacher/`, routes under `/teacher/*`, wrapped in `AppShell`):
   - Teacher Desktop Dashboard (`/teacher/dashboard`)
   - Students & Coding Mastery Roster (`/teacher/students`)
   - Coding Activities & Quizzes Management (`/teacher/activities`)
   - Cohort Reports & Learning Analytics (`/teacher/reports`)
   - Teacher Classroom Settings (`/teacher/settings`)

The UI originated from 13 Google Stitch HTML exports in `screens/stitch/` (gitignored via `/screens/` in `.gitignore`) and was redesigned into the **Warm Editorial EdTech v2** system across 17 routed screens in `frontend/`.

---

## 2. Tech Stack & Commands

| Layer | Package / Version | Notes |
|---|---|---|
| Framework | `react@^19.3.1`, `react-dom@^19.3.1` | Functional components + hooks only |
| Routing | `react-router-dom@^7.18.4` | `<BrowserRouter>` in `frontend/src/main.jsx`, `<Routes>` in `frontend/src/App.jsx` |
| Styling | `tailwindcss@^4.3.3`, `@tailwindcss/vite@^4.3.3` | Configured via `@theme` block in `frontend/src/index.css` (no `tailwind.config.js`) |
| Bundler | `vite@^8.3.4`, `@vitejs/plugin-react@^6.1.2` | Dev server on `http://localhost:3000` |
| Linter | `oxlint@^1.88.0` | `npm run lint` (`oxlint`) inside `frontend/` |
| Backend API | Spring Boot `3.4.13` (Java 21, Maven wrapper) | Stateless HS256 JWT (`jjwt@0.12.7`), RFC 7807 errors, port `8080` |
| Database | PostgreSQL `16` + Flyway (`ddl-auto: validate`) | `aralytics` (`dev,seed`: `V1` + `V2`) and `aralytics_prod` (`prod`: `V1` only) |

### Frontend Commands (run from `frontend/` or with `--prefix frontend`)
- `npm --prefix frontend run dev` — start Vite dev server
- `npm --prefix frontend run build` — production bundle into `frontend/dist/`
- `npm --prefix frontend run lint` — run `oxlint` across `frontend/src/`

### Backend Commands & Environment Switching
A single root `.env` (copied from `.env.example`) controls both backend and frontend via `ENV`, isolating `dev,seed` (`aralytics` DB) from `prod` (`aralytics_prod` DB) so switching modes never triggers Flyway `V2` validation conflicts:
- **`ENV=development` (default)**: backend runs `dev,seed` on `aralytics` (Swagger UI + demo accounts); Vite `npm run dev` enables demo login pre-fill, seeded activation hints, and dev-only activation demo autofill (`Fill Demo Key` / `Fill Demo Profile`).
- **`ENV=production`**: backend runs `prod` on `aralytics_prod` (schema-only, Swagger off, `ProductionConfigGuard` requires `JWT_SECRET` >= 32 bytes); Vite strips demo credentials, seeded activation hints, and activation demo autofill.
- **Docker Compose (run from repo root — reads root `.env` automatically)**:
  - `docker compose up -d` — start PostgreSQL 16 + backend (`--build` rebuilds after Java edits)
  - `docker compose up -d postgres` — start PostgreSQL 16 container (`aralytics-postgres` on `:5432`); fresh volumes auto-create `aralytics` and `aralytics_prod` via `backend/docker/postgres-init.sql` (if you have a pre-existing `postgres_data` volume, run `docker exec aralytics-postgres psql -U postgres -c "CREATE DATABASE aralytics_prod;"` once)
  - `docker compose down` — stop containers
- **Local Maven (run from `backend/`)**:
  - Load root `..\.env` into `Env:`, then `.\mvnw.cmd spring-boot:run` (honors `ENV=development|production`)
  - `.\mvnw.cmd -B verify` — run JUnit 5 + MockMvc + Testcontainers suite

---

## 3. Design System Tokens (`frontend/src/index.css`)

All Stitch exports share the "Warm Editorial EdTech v2" Material-3-inspired palette and typography defined inside `@theme` in `frontend/src/index.css`:

- **Colors**:
  - Primary (Indigo): `--color-primary: #422ec2`, `--color-primary-container: #5b4bdb`, `--color-primary-fixed: #e9e6ff`, `--color-primary-fixed-dim: #c6c0ff`, `--color-on-primary-fixed: #150066`, `--color-on-primary-fixed-variant: #3e28be`
  - Secondary (Emerald): `--color-secondary: #006b5f`, `--color-secondary-container: #6df5e1`, `--color-secondary-fixed: #71f8e4`, `--color-on-secondary-container: #006f64`, `--color-on-secondary-fixed: #00201c`
  - Semantic Status: `--color-status-ok: #1d8a5a`, `--color-status-ok-tint: #ddf5e8`, `--color-warn: #5f4700` (WCAG AA >=7:1 on `#ffefd1`), `--color-warn-tint: #ffefd1`, `--color-accent-yellow: #ffc93c`, `--color-error: #ba1a1a`, `--color-danger-tint: #fde4e5`
  - Surfaces (Warm Cream): `--color-background: #fff9f0`, `--color-surface: #fff9f0`, `--color-surface-bright: #fff9f0`, `--color-surface-container-lowest: #ffffff`, `--color-surface-container-low: #f6f1ea`, `--color-surface-container: #f0ebf8`, `--color-surface-container-high: #e7e2f8`, `--color-surface-container-highest: #ddd7f5`, `--color-on-surface: #181b33`, `--color-on-surface-variant: #4e526e`, `--color-outline: #70748e`, `--color-outline-variant: #ddd6cc`
- **Fonts** (loaded in `frontend/index.html`):
  - `--font-headline`: `'Nunito Sans', sans-serif` (tokens `--font-display-lg`, `--font-headline-lg/md/sm`, `--font-metric-number`)
  - `--font-body`: `'Source Sans 3', sans-serif` (`--font-body-lg/md/sm`)
  - `--font-label`: `'Source Sans 3', sans-serif` (`--font-label-lg/md/sm`)
  - `--font-mono`: `'JetBrains Mono', monospace`
- **Shared UI Primitives** (`frontend/src/components/ui/`):
  - `Button` (`variant`: `primary|secondary|accent|ghost|danger`, `size`: `sm|md|lg`, `to` for `<Link>`)
  - `Badge` (`tone`: `neutral|mastered|on-track|nudge|help|ai`, `dot`)
  - `Card` (`variant`: `elevated|tinted|subtle`)
  - `Avatar` (`name`, `size`: `sm|md|lg` — deterministic initials circle)
- **Layout Shells**:
  - `StudentShell` (`frontend/src/components/layout/StudentShell.jsx`) wraps `/student/*` and Student `/profile` in `App.jsx`.
  - `AppShell` (`Sidebar` + `TopBar`) wraps `/teacher/*` and Teacher `/profile` in `App.jsx`.
- **Radii** (`@theme` overrides):
  - `--radius-sm: 4px`, `--radius-DEFAULT: 8px`, `--radius-md: 8px`, `--radius-lg: 12px`, `--radius-xl: 16px`, `--radius-2xl: 20px`, `--radius-3xl: 24px`, `--radius-full: 9999px`
- **Custom Spacing** (`@theme`):
  - `--spacing-space-xs: 4px` (`p-space-xs`, `gap-space-xs`, etc.)
  - `--spacing-space-sm: 8px` (`p-space-sm`, `gap-space-sm`, etc.)
  - `--spacing-space-md: 16px` (`p-space-md`, `gap-space-md`, etc.)
  - `--spacing-space-lg: 24px` (`p-space-lg`, `gap-space-lg`, etc.)
  - `--spacing-space-xl: 32px` (`p-space-xl`, `gap-space-xl`, etc.)
  - `--spacing-space-2xl: 48px` (`p-space-2xl`, `gap-space-2xl`, etc.)
- **Icons**: Google Material Symbols Outlined (`.material-symbols-outlined` in `frontend/src/index.css` with `font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24`).
- **Brand lockup**: `<BrandLogo />` (`frontend/src/components/BrandLogo.jsx`) is the single source of the header identity: primary rounded-square with the `school` glyph in `tertiary-fixed`, amber status dot, and `font-headline-sm` “Aralytics” in `text-on-surface`. Use it on every public/auth/student header and in the teacher `Sidebar`; do not hand-roll alternate logo marks, and do not place it (or a duplicate wordmark) in any footer. Every logo links to the public landing page (`/`). There is no EN/FIL language switcher anywhere in the product.
- **Teacher responsive breakpoint**: because the fixed sidebar consumes 250px from 1024px up, teacher multi-column grids and split headers switch at `xl` (1280px), not `lg`. Dense teacher tables use `min-w` + horizontal scroll below `xl`.

> **CRITICAL CSS RULE**: Never put a literal `*/` inside a CSS block comment in `frontend/src/index.css` (e.g., use `[all-screens]` instead of `*` followed by `/`), as that prematurely terminates the comment and breaks the Tailwind CSS parser.

---

## 4. Screen & Route Map

| Route | Component | Source Stitch Export | Layout Chrome |
|---|---|---|---|
| `/` | `frontend/src/screens/public/LandingPage.jsx` | `screens/stitch/landing_page/code.html` | Standalone (Public Marketing Header + Footer) |
| `/login` | `frontend/src/screens/public/LoginScreen.jsx` | `screens/stitch/aralytics_login/code.html` | Standalone (Auth Header + Card + Footer) |
| `/register` | `frontend/src/screens/public/AccountActivationScreen.jsx` | `screens/stitch/aralytics_account_registration_activation/code.html` | Standalone (Auth Header + Card + Footer) |
| `/forgot-password` | `frontend/src/screens/public/ForgotPasswordScreen.jsx` | — | Standalone (Auth Header + Card + Footer) |
| `/reset-password` | `frontend/src/screens/public/ResetPasswordScreen.jsx` | — | Standalone (Auth Header + Card + Footer) |
| `/forbidden` | `frontend/src/screens/shared/ForbiddenScreen.jsx` | — | Standalone (Brand Header + 403 Card + Centered Footer) |
| `/profile` | `frontend/src/screens/shared/ProfileScreen.jsx` | — | Role-aware (`AppShell` for Teacher, `StudentShell` for Student) |
| `/student/dashboard` | `frontend/src/screens/student/StudentDashboard.jsx` | `screens/stitch/portal/code.html` | `StudentShell` |
| `/student/activities` | `frontend/src/screens/student/StudentMyActivities.jsx` | `screens/stitch/aralytics_student_my_activities/code.html` | `StudentShell` |
| `/student/quiz` | `frontend/src/screens/student/StudentLiveQuiz.jsx` | `screens/stitch/aralytics_student_live_quiz_code_scenario/code.html` | `StudentShell` |
| `/student/feedback` | `frontend/src/screens/student/StudentDiagnosticReport.jsx` | `screens/stitch/aralytics_instant_ai_feedback_diagnostic_report/code.html` | `StudentShell` |
| `/student/progress` | `frontend/src/screens/student/StudentProgressHistory.jsx` | `screens/stitch/aralytics_student_feedback_history_progress/code.html` | `StudentShell` |
| `/teacher/dashboard` | `frontend/src/screens/teacher/TeacherDashboard.jsx` | `screens/stitch/aralytics_teacher_desktop_dashboard/code.html` | `AppShell` (`Sidebar` + `TopBar`) |
| `/teacher/students` | `frontend/src/screens/teacher/StudentsMasteryRoster.jsx` | `screens/stitch/aralytics_students_mastery_roster/code.html` | `AppShell` (`Sidebar` + `TopBar`) |
| `/teacher/activities` | `frontend/src/screens/teacher/ActivitiesQuizManagement.jsx` | `screens/stitch/aralytics_activities_quiz_management/code.html` | `AppShell` (`Sidebar` + `TopBar`) |
| `/teacher/reports` | `frontend/src/screens/teacher/ClassReportsLearningAnalytics.jsx` | `screens/stitch/reports/code.html` | `AppShell` (`Sidebar` + `TopBar`) |
| `/teacher/settings` | `frontend/src/screens/teacher/TeacherClassroomSettings.jsx` | `screens/stitch/teacher_settings/code.html` | `AppShell` (`Sidebar` + `TopBar`) |

### Backwards-Compatible Redirects (`frontend/src/App.jsx`)
- `/home` and `/student` -> `/student/dashboard`
- `/student/diagnostic-report` -> `/student/feedback`
- `/teacher` and `/dashboard` -> `/teacher/dashboard`
- `/students` -> `/teacher/students`
- `/activities` -> `/teacher/activities`
- `/reports` -> `/teacher/reports`
- `/settings` -> `/teacher/settings`

---

## 5. Layout Architecture (`AppShell` vs `StudentShell` vs Standalone)

- **Teacher View Screens** (`/teacher/dashboard`, `/teacher/students`, `/teacher/activities`, `/teacher/reports`, `/teacher/settings`, and teacher `/profile`) share the 250px fixed left `<aside>` (`Sidebar.jsx`) and 72px fixed `<header>` (`TopBar.jsx`). `AppShell` in `frontend/src/App.jsx` renders both, plus a mobile backdrop/drawer (`lg:hidden`), and wraps children in `<div className="lg:pl-[250px]"><main className="relative pt-[72px] bg-surface min-h-screen">{children}</main></div>`.
  - Therefore, the 5 teacher screen components in `frontend/src/screens/teacher/` render **only the inner content of `<main>`** (from the Page Header `<div>` through the end of `<main>`), plus any screen-specific modals/drawers.
- **Student View Screens** (`/student/dashboard`, `/student/activities`, `/student/quiz`, `/student/feedback`, `/student/progress`, and student `/profile`) are wrapped in `StudentShell` (`frontend/src/components/layout/StudentShell.jsx`) inside `frontend/src/App.jsx`, which renders the shared 72px top bar (`Home`, `Activities`, `Quiz`, `Feedback`, `Progress`, horizontal from `lg+` with a `<lg` slide-down mobile drawer, `NotificationBell`, `Avatar`, and Sign Out) and `<main className="w-full pt-[72px] bg-surface min-h-screen">`.
- **Public & Auth Screens** (`/`, `/login`, `/register`, `/forgot-password`, `/reset-password`) and `/forbidden` use standalone headers and footers and bypass `AppShell` and `StudentShell`.

---

## 6. Rules for Modifying or Adding Screens

1. **Use Warm Editorial EdTech v2 Tokens & Primitives**: Reuse `Button`, `Badge`, `Card`, and `Avatar` from `frontend/src/components/ui/` and semantic theme tokens from `frontend/src/index.css` rather than raw hex colors. Keep WCAG AA text contrast (`>= 4.5:1`) and `>= 44px` interactive tap targets.
2. **React/JSX Cleanliness**:
   - Convert inline handlers into idiomatic React `useState` state and event handlers. Never use `window.alert` or `window.confirm`.
   - Always clean up `setTimeout` / `setInterval` timers on unmount via `useEffect` + `useRef`.
3. **Initials Avatars**: Use `<Avatar name={...} />` (`frontend/src/components/ui/Avatar.jsx`) instead of external `lh3.googleusercontent.com` image URLs so offline/blocked environments render cleanly.
4. **Update Documentation**: Every time you complete a change, append an entry to [`LOG.md`](./LOG.md) and update [`FILETREE.md`](./FILETREE.md) + [`HANDOFF.md`](./HANDOFF.md) if routes, files, or architecture changed.
