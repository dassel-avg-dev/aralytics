import { useState } from 'react'
import { Link } from 'react-router-dom'
import BrandLogo from '../../components/BrandLogo'

export default function StudentMyActivities() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [menuOpen, setMenuOpen] = useState(false)
  const [slotBooked, setSlotBooked] = useState(false)

  const isVisible = (category) => activeFilter === 'all' || activeFilter === category

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(91,75,219,0.06)]">
        <div className="h-20 max-w-7xl mx-auto px-gutter flex items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-lg">
            <BrandLogo to="/student/dashboard" />
            <nav
              className="hidden xl:flex items-center gap-space-xs bg-surface-container-low/70 p-1.5 rounded-2xl"
              data-active-classes="bg-surface-container-high text-primary font-label-lg font-bold rounded-xl"
            >
              <Link
                className="px-3.5 py-2 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all"
                data-path="dashboard"
                to="/student/dashboard"
              >
                Dashboard
              </Link>
              <Link
                aria-current="page"
                className="px-3.5 py-2 transition-all bg-surface-container-high text-primary font-label-lg font-bold rounded-xl"
                data-path="my-activities"
                to="/student/activities"
              >
                My Activities
              </Link>
              <Link
                className="px-3.5 py-2 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all"
                data-path="code-quiz-exercises"
                to="/student/quiz"
              >
                Code Quiz &amp; Exercises
              </Link>
              <Link
                className="px-3.5 py-2 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all"
                data-path="ai-feedback-history"
                to="/student/feedback"
              >
                AI Feedback History
              </Link>
              <Link
                className="px-3.5 py-2 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all"
                data-path="my-progress-skills"
                to="/student/progress"
              >
                My Progress &amp; Skills
              </Link>
            </nav>
            <button
              aria-expanded={menuOpen}
              aria-label="Open navigation menu"
              className="xl:hidden w-10 h-10 rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-all shrink-0"
              onClick={() => setMenuOpen(!menuOpen)}
              title="Menu"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">
                {menuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
          <div className="flex items-center gap-space-sm sm:gap-space-md">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md">
              <span className="material-symbols-outlined text-[18px] text-tertiary-container">
                local_fire_department
              </span>
              <span className="">4 Days Active</span>
            </div>
            <button
              aria-label="Notifications &amp; Reminders"
              className="relative w-10 h-10 rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-error ring-2 ring-surface"></span>
            </button>
            <div className="flex items-center gap-space-sm pl-1 sm:pl-2">
              <div className="flex items-center gap-2.5 bg-surface-container-low py-1.5 pl-2 pr-2 sm:pr-3.5 rounded-full">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-on-primary text-[18px]">
                    person
                  </span>
                </div>
                <div className="hidden md:flex flex-col text-left">
                  <span className="font-label-md text-label-md text-on-surface leading-tight font-semibold">
                    Miguel Santos
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant leading-none">
                    Grade 10 · CS 101
                  </span>
                </div>
              </div>
              <Link
                className="w-9 h-9 rounded-xl flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-error-container transition-all"
                data-path="login"
                title="Sign out"
                to="/login"
              >
                <span className="material-symbols-outlined text-[20px]">logout</span>
              </Link>
            </div>
          </div>
        </div>
        {/* Mobile nav dropdown */}
        {menuOpen && (
          <div className="xl:hidden border-t border-outline-variant/30 bg-surface-container-lowest/95 backdrop-blur-xl px-gutter py-space-md flex flex-col gap-1">
            <Link
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container transition-all"
              onClick={() => setMenuOpen(false)}
              to="/student/dashboard"
            >
              <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-extrabold">
                Aralytics Dashboard
              </span>
              <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm font-bold tracking-wide">
                Pilipinas AI
              </span>
            </Link>
            <Link
              aria-current="page"
              className="flex items-center px-3.5 py-2.5 rounded-xl bg-surface-container-high text-primary font-label-lg text-label-lg font-bold"
              onClick={() => setMenuOpen(false)}
              to="/student/activities"
            >
              My Activities
            </Link>
            <Link
              className="flex items-center px-3.5 py-2.5 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container transition-all"
              onClick={() => setMenuOpen(false)}
              to="/student/quiz"
            >
              Code Quiz &amp; Exercises
            </Link>
            <Link
              className="flex items-center px-3.5 py-2.5 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container transition-all"
              onClick={() => setMenuOpen(false)}
              to="/student/feedback"
            >
              AI Feedback History
            </Link>
            <Link
              className="flex items-center px-3.5 py-2.5 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container transition-all"
              onClick={() => setMenuOpen(false)}
              to="/student/progress"
            >
              My Progress &amp; Skills
            </Link>
            <Link
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-label-lg text-label-lg text-error hover:bg-error-container/40 transition-all mt-1 border-t border-outline-variant/20 pt-3"
              onClick={() => setMenuOpen(false)}
              to="/login"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              <span>Sign Out</span>
            </Link>
          </div>
        )}
      </header>
      <main className="w-full pt-20 bg-surface flex-1">
        <div className="max-w-7xl mx-auto px-gutter py-space-lg">
          <div className="flex flex-col w-full gap-space-lg">
            {/* Course Context Sub-header & Action Bar */}
            <section className="flex flex-col md:flex-row md:items-end justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
              <div className="flex flex-col gap-space-xs">
                <div className="flex flex-wrap items-center gap-space-xs">
                  <span className="px-2.5 py-1 rounded-full bg-primary-container/10 text-primary font-label-sm text-label-sm uppercase tracking-wider font-bold">
                    DepEd SHS Computer Science
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                    Academic Year 2024–2025 · Q2
                  </span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-extrabold">
                  Assigned Coding Activities
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Course: <span className="font-semibold text-on-surface">CS 101 - Intro to Python</span>{' '}
                  • Section A • Instructor:{' '}
                  <span className="font-semibold text-primary">Mr. Ronald Reyes</span>
                </p>
              </div>
              {/* Quick Stats Metric Pills */}
              <div className="flex flex-wrap items-center gap-space-sm">
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-container-low">
                  <span className="material-symbols-outlined text-primary text-[20px]">
                    assignment_turned_in
                  </span>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-on-surface-variant leading-none">
                      Completion
                    </span>
                    <span className="font-label-lg text-label-lg font-bold text-on-surface">
                      3 of 5 Done
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-secondary-fixed text-on-secondary-fixed">
                  <span className="material-symbols-outlined text-[20px]">insights</span>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm opacity-80 leading-none">
                      Diagnostic Avg
                    </span>
                    <span className="font-label-lg text-label-lg font-bold">90.0%</span>
                  </div>
                </div>
              </div>
            </section>
            {/* Urgent Due Date Reminder Banner (PRD US-09) */}
            <aside className="relative overflow-hidden bg-tertiary-fixed text-on-tertiary-fixed p-space-md md:p-space-lg rounded-xl shadow-md">
              <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-tertiary-fixed-dim/30 pointer-events-none blur-2xl"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
                <div className="flex items-center gap-space-md">
                  <div className="w-12 h-12 rounded-xl bg-tertiary-container text-on-tertiary-container flex items-center justify-center flex-shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-[26px]">alarm</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-label-md text-label-md bg-tertiary-container text-on-tertiary-container px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                        Urgent Deadline
                      </span>
                      <span className="font-body-sm text-body-sm text-tertiary font-semibold">
                        Diagnostic Assessment
                      </span>
                    </div>
                    <p className="font-headline-sm text-headline-sm font-bold text-on-tertiary-fixed mt-0.5">
                      Python Loops &amp; List Comprehension Diagnostic
                    </p>
                    <span className="font-body-sm text-body-sm text-on-tertiary-fixed-variant">
                      Due Tomorrow at 11:59 PM (Dec 19). Diagnostic informs next week&apos;s adaptive
                      exercise stream.
                    </span>
                  </div>
                </div>
                <Link
                  className="px-5 py-2.5 rounded-xl bg-on-tertiary-fixed text-tertiary-fixed font-label-lg text-label-lg font-bold hover:bg-tertiary transition-all flex items-center gap-1.5 flex-shrink-0 shadow-sm"
                  to="/student/quiz"
                >
                  <span className="">Go to Assessment</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
                </Link>
              </div>
            </aside>
            {/* Filter & Segmented Navigation Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-space-md">
              <div
                className="inline-flex p-1 rounded-2xl bg-surface-container-high max-w-full overflow-x-auto"
                id="filter-tab-container"
              >
                <button
                  className={
                    activeFilter === 'all'
                      ? 'filter-btn px-4 py-2 rounded-xl font-label-lg text-label-lg font-bold bg-surface-container-lowest text-primary shadow-sm transition-all flex items-center gap-2 shrink-0'
                      : 'filter-btn px-4 py-2 rounded-xl font-label-lg text-label-lg font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all flex items-center gap-2 shrink-0'
                  }
                  data-filter="all"
                  onClick={() => setActiveFilter('all')}
                  type="button"
                >
                  <span className="">All Activities</span>
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm">
                    5
                  </span>
                </button>
                <button
                  className={
                    activeFilter === 'assigned'
                      ? 'filter-btn px-4 py-2 rounded-xl font-label-lg text-label-lg font-bold bg-surface-container-lowest text-primary shadow-sm transition-all flex items-center gap-2 shrink-0'
                      : 'filter-btn px-4 py-2 rounded-xl font-label-lg text-label-lg font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all flex items-center gap-2 shrink-0'
                  }
                  data-filter="assigned"
                  onClick={() => setActiveFilter('assigned')}
                  type="button"
                >
                  <span className="">Due Soon / Pending</span>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container-lowest text-on-surface-variant font-label-sm text-label-sm">
                    2
                  </span>
                </button>
                <button
                  className={
                    activeFilter === 'completed'
                      ? 'filter-btn px-4 py-2 rounded-xl font-label-lg text-label-lg font-bold bg-surface-container-lowest text-primary shadow-sm transition-all flex items-center gap-2 shrink-0'
                      : 'filter-btn px-4 py-2 rounded-xl font-label-lg text-label-lg font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all flex items-center gap-2 shrink-0'
                  }
                  data-filter="completed"
                  onClick={() => setActiveFilter('completed')}
                  type="button"
                >
                  <span className="">Completed</span>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container-lowest text-on-surface-variant font-label-sm text-label-sm">
                    3
                  </span>
                </button>
                <button
                  className={
                    activeFilter === 'remedial'
                      ? 'filter-btn px-4 py-2 rounded-xl font-label-lg text-label-lg font-bold bg-surface-container-lowest text-primary shadow-sm transition-all flex items-center gap-2 shrink-0'
                      : 'filter-btn px-4 py-2 rounded-xl font-label-lg text-label-lg font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all flex items-center gap-2 shrink-0'
                  }
                  data-filter="remedial"
                  onClick={() => setActiveFilter('remedial')}
                  type="button"
                >
                  <span className="">Needs Remedial Practice</span>
                  <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">
                    1
                  </span>
                </button>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[18px]">sync</span>
                <span className="">Synced with DepEd LMS • Just now</span>
              </div>
            </div>
            {/* Primary Asymmetric Layout Grid (8 Cols Content / 4 Cols Sidebar) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
              {/* Main Content Column (8 Cols) */}
              <div className="lg:col-span-8 flex flex-col gap-space-lg">
                {/* 1. Priority In-Progress / Urgent Card (PRD US-01, 5.1.3) */}
                {isVisible('assigned') && (
                  <section
                    className="activity-card group bg-surface-container-lowest rounded-xl p-space-lg shadow-md relative overflow-hidden flex flex-col gap-space-md"
                    data-category="assigned"
                    id="urgent-card"
                  >
                    {/* Colored Ambient Accent Bar */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-container via-primary to-secondary"></div>
                    <div className="flex flex-wrap items-center justify-between gap-space-sm pt-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">warning</span>
                          Pending • Due Tomorrow (Dec 19, 11:59 PM)
                        </span>
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm font-semibold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            auto_awesome
                          </span>
                          AI Diagnostic
                        </span>
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">schedule</span>
                        Est. 15–20 mins
                      </span>
                    </div>
                    <div className="flex flex-col gap-space-xs">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 className="font-headline-md text-headline-md font-bold text-on-surface group-hover:text-primary transition-colors">
                            Python Loops &amp; List Comprehension Diagnostic
                          </h2>
                          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                            Comprehensive situational diagnostic testing control flow intuition and
                            algorithmic correctness.
                          </p>
                        </div>
                        <div className="w-14 h-14 rounded-xl bg-surface-container-low text-primary flex items-center justify-center flex-shrink-0">
                          <span className="material-symbols-outlined text-[30px]">terminal</span>
                        </div>
                      </div>
                    </div>
                    {/* Diagnostic Details & Sub-modules */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm bg-surface-container-low/70 p-space-md rounded-xl">
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                          Format
                        </span>
                        <span className="font-label-lg text-label-lg font-bold text-on-surface">
                          10 Questions
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          MCQs + Situational Fixes
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                          Core Focus Areas
                        </span>
                        <span className="font-label-lg text-label-lg font-bold text-on-surface">
                          Nested Loops &amp; Indices
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Boundary conditions
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                          Feedback Engine
                        </span>
                        <span className="font-label-lg text-label-lg font-bold text-secondary">
                          Sub-5s AI Diagnostic
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Personalized breakdowns
                        </span>
                      </div>
                    </div>
                    {/* Tags / Competencies */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                        #NestedWhile
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                        #ListIndexing
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                        #OffByOnePrevention
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                        #DepEd-CS-LO3.4
                      </span>
                    </div>
                    {/* Interactive Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md pt-2">
                      <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                        <Link
                          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg font-bold hover:bg-primary transition-all flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(91,75,219,0.24)]"
                          to="/student/quiz"
                        >
                          <span className="">Start Activity</span>
                          <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                        </Link>
                        <Link
                          className="w-full sm:w-auto px-4 py-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-lg text-label-lg font-semibold transition-all flex items-center justify-center gap-1.5"
                          to="/student/progress"
                        >
                          <span className="material-symbols-outlined text-[18px]">menu_book</span>
                          <span className="">Preview Syllabus</span>
                        </Link>
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-primary">
                          verified_user
                        </span>
                        Permits 1 retake after AI guidance review
                      </span>
                    </div>
                  </section>
                )}
                {/* Section Title for Remaining Activities */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    Curriculum Pathway &amp; Exercises
                  </h3>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Showing activities for Unit 3: Control Flow
                  </span>
                </div>
                {/* Other Assigned Activities List */}
                <div className="flex flex-col gap-space-md" id="activities-container">
                  {/* Card 1: Remedial Drill (Needs Remedial Practice) */}
                  {isVisible('remedial') && (
                    <article
                      className="activity-card bg-surface-container-lowest rounded-xl p-space-md md:p-space-lg shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col gap-space-md"
                      data-category="remedial"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-error"></div>
                      <div className="flex flex-wrap items-center justify-between gap-space-sm pl-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">
                              psychology_alt
                            </span>
                            Needs Remedial Practice
                          </span>
                          <span className="px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold">
                            Assigned Today
                          </span>
                        </div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          5 Micro-drills • ~8 mins
                        </span>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-space-md pl-2">
                        <div className="flex flex-col gap-1 max-w-xl">
                          <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                            Targeted Remedial: While Loop Counter &amp; Off-By-One Drills
                          </h4>
                          <p className="font-body-md text-body-md text-on-surface-variant">
                            Assigned by Mr. Reyes following AI diagnostic recommendation. Helps
                            prevent infinite loops and correct boundary values in iteration
                            counters.
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="material-symbols-outlined text-[16px] text-tertiary">
                              support_agent
                            </span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                              Instructor Note: “Practice question 3 again carefully Miguel.”
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row md:flex-col items-end gap-2 flex-shrink-0 justify-center">
                          <Link
                            className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-error text-on-error font-label-lg text-label-lg font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-sm"
                            to="/student/quiz"
                          >
                            <span className="">Start Remedial Drill</span>
                            <span className="material-symbols-outlined text-[18px]">bolt</span>
                          </Link>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            Untimed practice mode
                          </span>
                        </div>
                      </div>
                    </article>
                  )}
                  {/* Card 2: Upcoming / Due Dec 22 */}
                  {isVisible('assigned') && (
                    <article
                      className="activity-card bg-surface-container-lowest rounded-xl p-space-md md:p-space-lg shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col gap-space-md"
                      data-category="assigned"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary-container"></div>
                      <div className="flex flex-wrap items-center justify-between gap-space-sm pl-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold">
                            Upcoming
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            Due Dec 22 (Sunday, 11:59 PM)
                          </span>
                        </div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          8 Scenario MCQs • ~20 mins
                        </span>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-space-md pl-2">
                        <div className="flex flex-col gap-1 max-w-xl">
                          <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                            Functions &amp; Return Values: Scenario Debugging
                          </h4>
                          <p className="font-body-md text-body-md text-on-surface-variant">
                            Analyze trace tables for functions returning tuples, void returns (
                            `None`), and scope visibility between global and local variables.
                          </p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="px-2 py-0.5 rounded bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">
                              #ScopeRules
                            </span>
                            <span className="px-2 py-0.5 rounded bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">
                              #ReturnSyntax
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row md:flex-col items-end gap-2 flex-shrink-0 justify-center">
                          <Link
                            className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-primary font-label-lg text-label-lg font-bold transition-all flex items-center justify-center gap-2"
                            to="/student/quiz"
                          >
                            <span className="">View Details</span>
                            <span className="material-symbols-outlined text-[18px]">
                              visibility
                            </span>
                          </Link>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            Unlocks tomorrow
                          </span>
                        </div>
                      </div>
                    </article>
                  )}
                  {/* Card 3: Completed / Graded Dec 14 */}
                  {isVisible('completed') && (
                    <article
                      className="activity-card bg-surface-container-lowest rounded-xl p-space-md md:p-space-lg shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col gap-space-md"
                      data-category="completed"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary"></div>
                      <div className="flex flex-wrap items-center justify-between gap-space-sm pl-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">
                              check_circle
                            </span>
                            Graded • AI Feedback Available
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            Completed Dec 14
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 font-label-md text-label-md text-secondary font-bold">
                          <span className="material-symbols-outlined text-[16px]">stars</span>
                          Score: 92% (Exceeds Standard)
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-space-md pl-2">
                        <div className="flex flex-col gap-1 max-w-xl">
                          <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                            Conditional Statements &amp; Boolean Short-Circuit Evaluation
                          </h4>
                          <p className="font-body-md text-body-md text-on-surface-variant">
                            12 code trace problems focusing on logical `and`/`or` precedence,
                            nested if-else ladders, and truthy/falsy types.
                          </p>
                          <div className="p-3 bg-surface-container-low rounded-xl mt-2 flex items-start gap-2">
                            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">
                              auto_awesome
                            </span>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">
                              <span className="font-bold text-on-surface">AI Summary:</span>{' '}
                              Excellent grasp of boolean operator precedence. Review falsy zero vs
                              empty string conversion.
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row md:flex-col items-end gap-2 flex-shrink-0 justify-center">
                          <Link
                            className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-primary-container/10 hover:bg-primary-container/20 text-primary font-label-lg text-label-lg font-bold transition-all flex items-center justify-center gap-2"
                            to="/student/feedback"
                          >
                            <span className="">Review Feedback</span>
                            <span className="material-symbols-outlined text-[18px]">
                              chat_bubble_outline
                            </span>
                          </Link>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            12/12 evaluated
                          </span>
                        </div>
                      </div>
                    </article>
                  )}
                  {/* Card 4: Completed / Graded Dec 10 */}
                  {isVisible('completed') && (
                    <article
                      className="activity-card bg-surface-container-lowest rounded-xl p-space-md md:p-space-lg shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col gap-space-md"
                      data-category="completed"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary"></div>
                      <div className="flex flex-wrap items-center justify-between gap-space-sm pl-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">
                              check_circle
                            </span>
                            Graded • AI Feedback Available
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            Completed Dec 10
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 font-label-md text-label-md text-secondary font-bold">
                          <span className="material-symbols-outlined text-[16px]">stars</span>
                          Score: 88% (Proficient)
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-space-md pl-2">
                        <div className="flex flex-col gap-1 max-w-xl">
                          <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                            Intro to Data Structures: Lists &amp; Dictionaries
                          </h4>
                          <p className="font-body-md text-body-md text-on-surface-variant">
                            10 problems examining dictionary key lookups, nested dictionary
                            indexing, slice operations, and mutation risks.
                          </p>
                          <div className="p-3 bg-surface-container-low rounded-xl mt-2 flex items-start gap-2">
                            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">
                              auto_awesome
                            </span>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">
                              <span className="font-bold text-on-surface">AI Summary:</span> Strong
                              dictionary keys iteration. Slightly hindered by negative list slicing
                              syntax.
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row md:flex-col items-end gap-2 flex-shrink-0 justify-center">
                          <Link
                            className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-primary-container/10 hover:bg-primary-container/20 text-primary font-label-lg text-label-lg font-bold transition-all flex items-center justify-center gap-2"
                            to="/student/feedback"
                          >
                            <span className="">Review Feedback</span>
                            <span className="material-symbols-outlined text-[18px]">
                              chat_bubble_outline
                            </span>
                          </Link>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            10/10 evaluated
                          </span>
                        </div>
                      </div>
                    </article>
                  )}
                </div>
              </div>
              {/* 3. Sidebar / Companion & Milestones Column (4 Cols) */}
              <aside className="lg:col-span-4 flex flex-col gap-space-lg">
                {/* AI Diagnostic Companion Explainer Card */}
                <section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm relative overflow-hidden flex flex-col gap-space-md">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center flex-shrink-0 shadow-sm">
                      <span className="material-symbols-outlined text-[22px]">smart_toy</span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                        Your AI Diagnostic Companion
                      </h3>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Powered by Aralytics-Code-7B
                      </span>
                    </div>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Instant personalized explanations generated{' '}
                    <span className="font-bold text-primary">within 5 seconds</span> of every
                    submission. Rather than just giving answers, our fine-tuned model identifies
                    the exact misconception behind your syntax or logic error.
                  </p>
                  {/* Graphic Callout: 3 Steps */}
                  <div className="flex flex-col gap-2.5 bg-surface-container-low p-3.5 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-sm text-label-sm font-bold flex-shrink-0">
                        1
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface">
                        Detects off-by-one &amp; syntax edge cases
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-sm text-label-sm font-bold flex-shrink-0">
                        2
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface">
                        Cross-references DepEd Python CS rubrics
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-sm text-label-sm font-bold flex-shrink-0">
                        3
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface">
                        Auto-generates custom 3-minute remedial drills
                      </span>
                    </div>
                  </div>
                  {/* Latency SLA Chip */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-label-sm text-label-sm text-secondary flex items-center gap-1 font-semibold">
                      <span className="material-symbols-outlined text-[16px]">speed</span>
                      &lt; 3.8s Avg Diagnostic Latency
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                      99.8% Uptime
                    </span>
                  </div>
                </section>
                {/* Teacher Office Hours & Consultation */}
                <section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
                  <div className="flex items-center justify-between">
                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                      Instructor Office Hours
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
                      Open
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary flex-shrink-0 font-headline-sm text-headline-sm font-extrabold">
                      RR
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-lg text-label-lg font-bold text-on-surface">
                        Mr. Ronald Reyes
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Computer Science Faculty • Room 304
                      </span>
                    </div>
                  </div>
                  <div className="bg-surface-container-low p-3.5 rounded-xl flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-on-surface font-label-md text-label-md">
                      <span className="material-symbols-outlined text-[18px] text-primary">
                        calendar_today
                      </span>
                      <span className="">Thursday · 3:30 PM – 5:00 PM</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Topics: Python while loops remediation, debugging logic traps, and Quarter 2
                      diagnostic preparation.
                    </p>
                  </div>
                  <button
                    className="w-full py-2.5 px-4 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-primary font-label-lg text-label-lg font-bold transition-all flex items-center justify-center gap-2"
                    onClick={() => setSlotBooked(!slotBooked)}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {slotBooked ? 'event_available' : 'calendar_add_on'}
                    </span>
                    <span className="">
                      {slotBooked ? '15-min Slot Requested' : 'Book 15-min Slot'}
                    </span>
                  </button>
                </section>
                {/* Upcoming Milestones Widget */}
                <section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
                  <div className="flex items-center justify-between">
                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                      Quarter 2 Milestones
                    </h3>
                    <Link
                      className="font-label-sm text-label-sm text-primary font-bold hover:underline"
                      to="/student/progress"
                    >
                      Q2 Target
                    </Link>
                  </div>
                  {/* Milestone Timeline */}
                  <div className="flex flex-col gap-3">
                    {/* Item 1 */}
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-secondary text-on-secondary flex items-center justify-center flex-shrink-0 text-[14px]">
                        <span className="material-symbols-outlined text-[16px]">check</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-on-surface font-semibold">
                          Unit 1 &amp; 2 Foundations Exam
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Completed with Distinction • Dec 08
                        </span>
                      </div>
                    </div>
                    {/* Item 2 */}
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center flex-shrink-0 text-[14px]">
                        <span className="material-symbols-outlined text-[16px]">pending</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-primary font-bold">
                          Unit 3 Diagnostic Checkpoint
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          In Progress • Due Dec 19, 11:59 PM
                        </span>
                      </div>
                    </div>
                    {/* Item 3 */}
                    <div className="flex items-start gap-3 opacity-60">
                      <div className="w-7 h-7 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center flex-shrink-0 text-[14px]">
                        <span className="material-symbols-outlined text-[16px]">lock</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-on-surface">
                          Mid-Quarter Capstone Project
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Opens Jan 08, 2025
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Mini Progress Bar */}
                  <div className="flex flex-col gap-1.5 pt-2">
                    <div className="flex items-center justify-between font-label-sm text-label-sm">
                      <span className="text-on-surface-variant">Syllabus Progress</span>
                      <Link
                        className="font-bold text-on-surface hover:text-primary transition-colors"
                        to="/student/progress"
                      >
                        65% Complete
                      </Link>
                    </div>
                    <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </section>
              </aside>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
