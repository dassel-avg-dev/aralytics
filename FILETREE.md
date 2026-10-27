# FILETREE.md

File tree of the **Aralytics** project, excluding third-party directories (`node_modules/`) and build output (`dist/`).

**Last updated:** 2026-10-27

**Rule:** update this file whenever files or folders are added, removed, or renamed.

```text
aralytics/
├── HANDOFF.md                       # Project state, stack, conventions, next steps
├── FILETREE.md                      # This file
├── LOG.md                           # Chronological log of every step taken in work sessions
├── .gitignore                       # Ignores node_modules, dist, etc.
├── .oxlintrc.json                   # oxlint linter configuration
├── package.json                     # Scripts, dependencies
├── package-lock.json                # Pinned dependency versions
├── opencode.json                    # OpenCode project config (Playwright MCP local; Stitch MCP lives in global config to keep its API key out of git)
├── README.md                        # Scaffold-generated README
├── vite.config.js                   # Vite config: react() + tailwindcss(), dev port 3000
├── index.html                       # SPA entry; loads Nunito Sans / Inter / Material Symbols fonts
├── public/                          # Static assets served at the root URL
│   └── favicon.svg                  # Referenced by index.html (icons.svg removed 2026-10-27, unreferenced)
├── .playwright-mcp/                 # Playwright verification screenshots (git-ignored)
│   ├── home-desktop-1440.png / home-mobile-390.png      # /home after CS rebrand re-implementation
│   ├── landing-desktop-1440.png / landing-mobile-390.png # / after CS rebrand re-implementation
│   ├── dashboard-desktop-1440.png            # /dashboard after full CS rebrand
│   ├── roster-desktop-1440.png               # /students after full CS rebrand
│   ├── activities-desktop-1440.png           # /activities after full CS rebrand
│   ├── reports-desktop-1440.png              # /reports after full CS rebrand
│   └── settings-desktop-1440.png             # /settings after full CS rebrand
├── screens/                         # Reference design package (input material, NOT runtime code) — git-ignored
│   ├── warm_editorial_edtech/
│   │   └── DESIGN.md                # Design system source of truth: tokens, colors, type, components
│   └── stitch/                        # Fresh Stitch MCP export (2026-10-27), project 17585807675120887156
│       ├── students_mastery_roster/           # 11487fb0… (roster) code + full-res screenshot
│       ├── student_desktop_portal/            # 1cddafa2… (learner portal — live at /home)
│       ├── landing_page/                      # 77d817e2… (updated landing design)
│       ├── teacher_classroom_settings/        # 7893867e…
│       ├── class_reports_learning_analytics/  # 97a29eb9…
│       ├── activities_quiz_management/        # a703a15b…
│       └── teacher_desktop_dashboard/         # faeb2f3b… (real dashboard design — live at /dashboard)
└── src/                             # Application source code
    ├── App.jsx                      # Router shell: Sidebar + TopBar + Routes
    ├── main.jsx                     # React bootstrap (renders App, imports index.css)
    ├── index.css                    # Tailwind v4 @theme with full design-token set
    ├── assets/                      # (empty — scaffold images hero.png/react.svg/vite.svg removed 2026-10-27, unreferenced)
    ├── components/
    │   ├── layout/
    │   │   ├── Sidebar.jsx          # 250px fixed nav rail, active route highlight, logo image
    │   │   └── TopBar.jsx           # Fixed top bar: hamburger (mobile), class pill, search, EN/FIL, alerts
    │   └── ui/                      # (empty — StatCard.jsx/MasteryRing.jsx removed after dashboard re-conversion)
    └── screens/                     # Route screens (all converted 1:1 from screens/stitch/*/code.html)
        ├── LandingPage.jsx          # /           (re-implemented from new CS-rebrand stitch/landing_page export)
        ├── HomeScreen.jsx           # /home       (re-implemented from new CS-rebrand stitch/student_desktop_portal export)
        ├── TeacherDashboard.jsx     # /dashboard  (re-implemented from CS-rebrand stitch/teacher_desktop_dashboard export)
        ├── StudentsMasteryRoster.jsx        # /students (re-implemented from CS-rebrand stitch/students_mastery_roster export)
        ├── ActivitiesQuizManagement.jsx     # /activities (re-implemented from CS-rebrand stitch/activities_quiz_management export)
        ├── ClassReportsLearningAnalytics.jsx # /reports (re-implemented from CS-rebrand stitch/class_reports_learning_analytics export)
        └── TeacherClassroomSettings.jsx     # /settings (re-implemented from CS-rebrand stitch/teacher_classroom_settings export)

Not shown: node_modules/ (third-party packages), dist/ (build output)
```
