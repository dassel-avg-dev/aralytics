# FILETREE.md

File tree of the **Aralytics** project, excluding third-party directories (`node_modules/`) and build output (`dist/`).

**Last updated:** 2026-10-27

**Rule:** update this file whenever files or folders are added, removed, or renamed.

```text
aralytics/
├── HANDOFF.md                       # Project state, stack, conventions, next steps
├── FILETREE.md                      # This file
├── .gitignore                       # Ignores node_modules, dist, etc.
├── .oxlintrc.json                   # oxlint linter configuration
├── package.json                     # Scripts, dependencies
├── package-lock.json                # Pinned dependency versions
├── opencode.json                    # OpenCode project config (Playwright MCP local; Stitch MCP lives in global config to keep its API key out of git)
├── README.md                        # Scaffold-generated README
├── vite.config.js                   # Vite config: react() + tailwindcss(), dev port 3000
├── index.html                       # SPA entry; loads Nunito Sans / Inter / Material Symbols fonts
├── public/                          # Static assets served at the root URL
│   ├── favicon.svg
│   └── icons.svg
├── screens/                         # Reference design package (input material, NOT runtime code) — git-ignored
│   ├── warm_editorial_edtech/
│   │   └── DESIGN.md                # Design system: tokens, colors, type, components
│   ├── aralytics_teacher_dashboard/
│   │   └── code.html                # ⚠️ duplicate of mastery roster; real dashboard missing
│   ├── aralytics_students_mastery_roster/
│   │   ├── code.html
│   │   └── screen.png
│   ├── aralytics_activities_quiz_management/
│   │   ├── code.html
│   │   └── screen.png
│   ├── aralytics_class_reports_learning_analytics/
│   │   ├── code.html
│   │   └── screen.png
│   ├── aralytics_teacher_classroom_settings/
│   │   ├── code.html
│   │   └── screen.png
│   └── stitch/                        # Fresh Stitch MCP export (2026-10-27), project 17585807675120887156
│       ├── students_mastery_roster/           # 11487fb0… (roster) code + full-res screenshot
│       ├── student_desktop_portal/            # 1cddafa2… (learner portal; NEW — not in app yet)
│       ├── landing_page/                      # 77d817e2… (updated landing design)
│       ├── teacher_classroom_settings/        # 7893867e…
│       ├── class_reports_learning_analytics/  # 97a29eb9…
│       ├── activities_quiz_management/        # a703a15b…
│       └── teacher_desktop_dashboard/         # faeb2f3b… (real dashboard design — replaces duplicate)
└── src/                             # Application source code
    ├── App.jsx                      # Router shell: Sidebar + TopBar + Routes
    ├── main.jsx                     # React bootstrap (renders App, imports index.css)
    ├── index.css                    # Tailwind v4 @theme with full design-token set
    ├── assets/                      # Images bundled with imports
    │   ├── hero.png
    │   ├── react.svg
    │   └── vite.svg
    ├── components/
    │   ├── layout/
    │   │   ├── Sidebar.jsx          # 250px fixed nav rail, active route highlight, logo image
    │   │   └── TopBar.jsx           # Fixed top bar: hamburger (mobile), class pill, search, EN/FIL, alerts
    │   └── ui/                      # (empty — StatCard.jsx/MasteryRing.jsx removed after dashboard re-conversion)
    └── screens/                     # Route screens (all converted 1:1 from screens/stitch/*/code.html)
        ├── LandingPage.jsx          # /           (converted from stitch/landing_page)
        ├── HomeScreen.jsx           # /home       (converted from stitch/student_desktop_portal)
        ├── TeacherDashboard.jsx     # /dashboard  (converted from stitch/teacher_desktop_dashboard)
        ├── StudentsMasteryRoster.jsx        # /students (converted from stitch/students_mastery_roster)
        ├── ActivitiesQuizManagement.jsx     # /activities (converted from stitch/activities_quiz_management)
        ├── ClassReportsLearningAnalytics.jsx # /reports (converted from stitch/class_reports_learning_analytics)
        └── TeacherClassroomSettings.jsx     # /settings (converted from stitch/teacher_classroom_settings)

Not shown: node_modules/ (third-party packages), dist/ (build output)
```
