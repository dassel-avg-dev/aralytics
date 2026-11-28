# Aralytics — System Architecture

Purpose: describe the current structure of the Aralytics full-stack application so contributors can navigate the frontend, backend API, persistence layer, and diagnostic engine seam.

Status: **Full-stack MVP implemented** — React 19 + Vite 8 + Tailwind CSS v4 SPA in `frontend/` (`http://localhost:3000`) wired via `frontend/src/api/client.js` to the Spring Boot 3.4.13 / Java 21 REST API in `backend/` (`http://localhost:8080`) backed by PostgreSQL 16 + Flyway. Diagnostic feedback runs through `DiagnosticEngine` (`MockDiagnosticEngine` by default; `LlmDiagnosticEngine` stub under the `ai` profile).

## High-Level Diagram

```
+------------------------------------------+
|                 BROWSER                  |
|   http://localhost:3000 (Vite dev server)|
+---------------------+--------------------+
                      |
                      v
+------------------------------------------+
|         React SPA  (frontend/src)        |
|                                          |
|  [ Public & Auth ] /, /login, /register, |
|    /forgot-password, /reset-password     |
|  [ Shared ]        /profile, /forbidden  |
|  [ Student ]       /student/*            |
|                    (StudentShell)        |
|  [ Teacher ]       /teacher/* (AppShell) |
|                                          |
|  API client: frontend/src/api/client.js  |
|  Auth: stateless Bearer JWT in session   |
+---------------------+--------------------+
                      | HTTP JSON (Authorization: Bearer <jwt>)
                      v
+------------------------------------------+
|   Spring Boot 3.4.13 API  (backend/)     |
|   http://localhost:8080                  |
|                                          |
|  /api/public/*   /api/auth/*             |
|  /api/student/*  /api/teacher/*          |
|  Security: Spring Security + HS256 JWT   |
|  Diagnostics: DiagnosticEngine seam      |
+---------------------+--------------------+
                      | Spring Data JPA + Flyway (ddl-auto: validate)
                      v
+------------------------------------------+
|        PostgreSQL 16  (:5432)            |
|  aralytics (dev,seed) / aralytics_prod   |
+------------------------------------------+
```

See [`../backend/README.md`](../backend/README.md) and [`NAVIGATION.md`](./NAVIGATION.md) for the complete REST surface (implemented endpoints and the 6 deferred `501` teacher endpoints).

## Route Map

Derived from `HANDOFF.md` section 4. Core routes only; `App.jsx` also defines backwards-compatible redirects (`/home`, `/student`, `/dashboard`, `/activate`, etc.) — see `frontend/src/App.jsx` for the full list.

| Route | Component | Layout Chrome |
|---|---|---|
| `/` | `frontend/src/screens/public/LandingPage.jsx` | Standalone (public marketing header + footer) |
| `/login` | `frontend/src/screens/public/LoginScreen.jsx` | Standalone (auth header + split card + footer) |
| `/register` | `frontend/src/screens/public/AccountActivationScreen.jsx` | Standalone (auth header + split card + footer) |
| `/forgot-password` | `frontend/src/screens/public/ForgotPasswordScreen.jsx` | Standalone (auth header + card + footer) |
| `/reset-password` | `frontend/src/screens/public/ResetPasswordScreen.jsx` | Standalone (auth header + card + footer) |
| `/forbidden` | `frontend/src/screens/shared/ForbiddenScreen.jsx` | Standalone (brand header + 403 card + footer) |
| `/profile` | `frontend/src/screens/shared/ProfileScreen.jsx` | Role-aware (`AppShell` for Teacher, `StudentShell` for Student) |
| `/student/dashboard` | `frontend/src/screens/student/StudentDashboard.jsx` | `StudentShell` |
| `/student/activities` | `frontend/src/screens/student/StudentMyActivities.jsx` | `StudentShell` |
| `/student/quiz` | `frontend/src/screens/student/StudentLiveQuiz.jsx` | `StudentShell` |
| `/student/feedback` | `frontend/src/screens/student/StudentDiagnosticReport.jsx` | `StudentShell` |
| `/student/progress` | `frontend/src/screens/student/StudentProgressHistory.jsx` | `StudentShell` |
| `/teacher/dashboard` | `frontend/src/screens/teacher/TeacherDashboard.jsx` | `AppShell` (`Sidebar` + `TopBar`) |
| `/teacher/students` | `frontend/src/screens/teacher/StudentsMasteryRoster.jsx` | `AppShell` (`Sidebar` + `TopBar`) |
| `/teacher/activities` | `frontend/src/screens/teacher/ActivitiesQuizManagement.jsx` | `AppShell` (`Sidebar` + `TopBar`) |
| `/teacher/reports` | `frontend/src/screens/teacher/ClassReportsLearningAnalytics.jsx` | `AppShell` (`Sidebar` + `TopBar`) |
| `/teacher/settings` | `frontend/src/screens/teacher/TeacherClassroomSettings.jsx` | `AppShell` (`Sidebar` + `TopBar`) |

## Layout Architecture

The app uses a three-mode layout split in `frontend/src/App.jsx`:

- **AppShell (Teacher View)** — defined in `frontend/src/App.jsx`, active when the pathname starts with `/teacher/` or equals `/profile` for a teacher. It renders the fixed left `Sidebar.jsx`, sticky `TopBar.jsx`, wraps children in `<main>`, and owns the responsive mobile slide-over drawer (`lg:hidden`).
- **StudentShell (Student View)** — `frontend/src/components/layout/StudentShell.jsx`, active when the pathname starts with `/student/` or equals `/profile` for a student. It renders the shared 72px top bar (`Home`, `Activities`, `Quiz`, `Feedback`, `Progress`, horizontal from `lg+` with `<lg` mobile drawer), `NotificationBell`, `Avatar`, and Sign Out.
- **Standalone chrome (Public/Auth + `/forbidden`)** — screens under `frontend/src/screens/public/` and `ForbiddenScreen.jsx` render their own header and footer and bypass `AppShell` and `StudentShell`.
- **Role separation** — public/auth, shared, student, and teacher screens live in separate directories (`screens/public/`, `screens/shared/`, `screens/student/`, `screens/teacher/`). `RequireAuth` guards `/student/*`, `/teacher/*`, and `/profile` and redirects role mismatches to `/forbidden`.

## Design System

- **Tokens** live in the `@theme` block of `frontend/src/index.css` (**Warm Editorial EdTech v2**: `#fff9f0` canvas, `Nunito Sans` + `Source Sans 3` + `JetBrains Mono`, WCAG AA status tokens). Canonical token list: `HANDOFF.md` section 3.
- **UI Primitives** (`frontend/src/components/ui/`): shared `Button`, `Badge`, `Card`, and `Avatar` components.
- **Brand identity**: `frontend/src/components/BrandLogo.jsx` is the single source of the header brand lockup. Use it on every public/auth/student header and in the teacher `Sidebar`; do not place it in footers.
- **Icons**: Google Material Symbols Outlined (`.material-symbols-outlined`, configured in `frontend/src/index.css`).
- **Responsive convention**: teacher multi-column grids switch at `xl` (1280px), not `lg`, because the fixed sidebar occupies 250px from `lg` up.

## Tooling & Quality Gates

- **Frontend** (run from `frontend/` or with `npm --prefix frontend`): `dev` (port `3000`), `build` (`frontend/dist/`), `lint` (`oxlint`).
- **Backend** (run from `backend/`): `.\mvnw.cmd -B verify` (JUnit 5 unit tests + H2 MockMvc ITs + Docker-gated PostgreSQL 16 Testcontainers IT).

**Quality gate: frontend `lint` + `build` and backend `verify` must pass before merge.**

## Data, Persistence & Environment Switching

- **Persistence**: PostgreSQL 16 with Flyway migrations (`V1__init_postgres.sql`, 19 tables) and `ddl-auto: validate`. Quiz drafts (`QUIZ_DRAFT`), teacher settings (`TEACHER_SETTINGS`), password reset tokens (`PASSWORD_RESET_TOKEN`), and pilot inquiries (`PILOT_INQUIRY`) are stored in the database.
- **Unified `.env`**: a single root `.env` (`ENV=development|production`) isolates `dev,seed` (`aralytics` DB, Swagger on, demo credentials prefilled) from `prod` (`aralytics_prod` DB, schema-only, Swagger off, `ProductionConfigGuard` enforced).
- **Frontend API layer**: `frontend/src/api/client.js` and `useApiResource.js` handle Bearer JWT injection, `401` redirects, and RFC 7807 error parsing rendered via `DataState.jsx`.

## Testing Pointer

- **Backend**: `.\mvnw.cmd -B verify` runs `MockDiagnosticEngineTest`, `ReportServiceTest`, `AuthFlowIT`, `PilotInquiryIT`, `QuizLifecycleIT`, `AuthorizationIT`, `SubmitIdempotencyIT`, and Docker-gated `EndToEndPostgresTest`.
- **Frontend**: E2E/visual checks via Playwright MCP against `http://localhost:3000`; unit test runner is not chosen yet. See [`../frontend/tests/README.md`](../frontend/tests/README.md).
