import { useState } from 'react'
import { Link } from 'react-router-dom'

const INITIAL_NOTES = [
  {
    id: 'note-1',
    pinColor: 'text-tertiary-container',
    meta: 'Saved Dec 18 • Tag: #Loops',
    content: (
      <>
        Remember: Python lists are 0-indexed, so{' '}
        <code className="font-mono text-[11px] bg-surface-container px-1 rounded">arr[len(arr)]</code> is always an
        IndexError!
      </>
    ),
  },
  {
    id: 'note-2',
    pinColor: 'text-secondary',
    meta: 'Saved Dec 14 • Tag: #Functions',
    content: (
      <>
        <code className="font-mono text-[11px] bg-surface-container px-1 rounded">print()</code> just displays text;
        only <code className="font-mono text-[11px] bg-surface-container px-1 rounded">return</code> passes data back to
        caller functions.
      </>
    ),
  },
]

const FILTER_OPTIONS = [
  { id: 'all', label: 'All (4)', dotClass: null },
  { id: 'needs-review', label: 'Needs Review (1)', dotClass: 'bg-tertiary-container' },
  { id: 'resolved', label: 'Resolved (2)', dotClass: 'bg-secondary' },
  { id: 'baseline', label: 'Baseline', dotClass: null },
]

export default function StudentProgressHistory() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [reportModalTitle, setReportModalTitle] = useState(null)
  const [notes, setNotes] = useState(INITIAL_NOTES)
  const [newNoteText, setNewNoteText] = useState('')

  const handleAddNote = () => {
    const trimmed = newNoteText.trim()
    if (!trimmed) return

    const newNote = {
      id: `note-${Date.now()}`,
      pinColor: 'text-primary',
      meta: 'Saved Just now • Tag: #CustomNote',
      text: trimmed,
    }
    setNotes((prev) => [newNote, ...prev])
    setNewNoteText('')
  }

  const handleDeleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id))
  }

  const matchesCard = (category, keywords, textSummary) => {
    const matchesCategory = selectedFilter === 'all' || category === selectedFilter
    const query = searchQuery.toLowerCase().trim()
    const matchesSearch =
      !query || keywords.toLowerCase().includes(query) || textSummary.toLowerCase().includes(query)
    return matchesCategory && matchesSearch
  }

  const showCard1 = matchesCard(
    'needs-review',
    'python loops list comprehension indexerror boundary condition len',
    'Python Loops & List Comprehension Diagnostic Remedial Drill Pending Dec 18, 2024 Score: 80% (8/10) 1 Conceptual Misconception AI Root-Cause Diagnosis Key Diagnosed Issue: IndexError: list index out of range i <= len(arr) i < len(arr) zero-indexed length AI Recommendation Revisit zero-indexing principles in Python sequences Completed in 14 mins Instructor: Mr. Del Rosario'
  )

  const showCard2 = matchesCard(
    'resolved',
    'functions return values print recursion helper function scenario debugging',
    'Functions & Return Values: Scenario Debugging Resolved Misconception Dec 14, 2024 Score: 88% (7/8) Successfully Mastered on Follow-up AI Root-Cause Diagnosis (Resolved) Key Diagnosed Issue: Confusing print() side-effects with actual caller output returns in recursive helper function calc_factorial() NoneType assignments AI Status: Resolved Completed in 18 mins Follow-up verified'
  )

  const showCard3 = matchesCard(
    'resolved',
    'conditionals boolean logic and or operator precedence diagnostic',
    'Conditionals & Boolean Logic Diagnostic Mastered Dec 05, 2024 Score: 92% (11/12) Exceeds Benchmark AI Root-Cause Diagnosis (Mastered) Key Diagnosed Issue: Minor hesitation regarding compound and vs or operator evaluation precedence when parentheses are omitted Completed in 11 mins'
  )

  const showCard4 = matchesCard(
    'baseline',
    'baseline python diagnostic course entry initial starting level growth',
    'Baseline Python Diagnostic (Course Entry) Starting Baseline Oct 20, 2024 Score: 58% +22% Improvement to Date Outstanding Growth Trajectory! Initial assessment before Aralytics adaptive interventions flagged syntax uncertainty and loop boundaries Initial diagnostic benchmark'
  )

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(91,75,219,0.06)]">
        <div className="h-20 max-w-7xl mx-auto px-gutter flex items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-lg">
            <Link className="flex items-center gap-space-xs group" data-path="dashboard" to="/student/dashboard">
              <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-on-primary shadow-[0_4px_16px_rgba(91,75,219,0.2)] relative">
                <span className="material-symbols-outlined text-[22px] text-on-primary">school</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-extrabold">
                  Aralytics
                </span>
              </div>
            </Link>
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
                className="px-3.5 py-2 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all"
                data-path="my-activities"
                to="/student/activities"
              >
                &nbsp;Activities
              </Link>
              <Link
                className="px-3.5 py-2 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all"
                data-path="code-quiz-exercises"
                to="/student/quiz"
              >
                &nbsp;Quiz &amp; Exercises
              </Link>
              <Link
                className="px-3.5 py-2 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all"
                data-path="ai-feedback-history"
                to="/student/feedback"
              >
                AI Feedback History
              </Link>
              <Link
                className="px-3.5 py-2 text-label-lg hover:bg-surface-container transition-all bg-surface-container-high text-primary font-label-lg font-bold rounded-xl"
                data-path="my-progress-skills"
                to="/student/progress"
              >
                My Progress &amp; Skills
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-space-sm sm:gap-space-md">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md">
              <span className="material-symbols-outlined text-[18px] text-tertiary-container">
                local_fire_department
              </span>
              <span className="">4 Days Active</span>
            </div>
            <button
              aria-label="Notifications & Reminders"
              className="relative w-10 h-10 rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-error ring-2 ring-surface"></span>
            </button>
            <div className="flex items-center gap-space-xs sm:gap-space-sm sm:pl-2">
              <div className="flex items-center gap-2.5 bg-surface-container-low py-1.5 pl-2 pr-2 sm:pr-3.5 rounded-full">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
                </div>
                <div className="hidden sm:flex flex-col text-left">
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
              <button
                aria-label="Toggle navigation menu"
                className="xl:hidden w-10 h-10 rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-all"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                type="button"
              >
                <span className="material-symbols-outlined text-[22px]">{mobileMenuOpen ? 'close' : 'menu'}</span>
              </button>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="xl:hidden bg-surface-container-lowest border-t border-outline-variant/20 px-gutter py-space-md shadow-lg">
            <nav className="flex flex-col gap-1">
              <Link
                className="px-3.5 py-2.5 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all"
                onClick={() => setMobileMenuOpen(false)}
                to="/student/dashboard"
              >
                Dashboard
              </Link>
              <Link
                className="px-3.5 py-2.5 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all"
                onClick={() => setMobileMenuOpen(false)}
                to="/student/activities"
              >
                Activities
              </Link>
              <Link
                className="px-3.5 py-2.5 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all"
                onClick={() => setMobileMenuOpen(false)}
                to="/student/quiz"
              >
                Quiz &amp; Exercises
              </Link>
              <Link
                className="px-3.5 py-2.5 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all"
                onClick={() => setMobileMenuOpen(false)}
                to="/student/feedback"
              >
                AI Feedback History
              </Link>
              <Link
                className="px-3.5 py-2.5 bg-surface-container-high text-primary font-label-lg text-label-lg font-bold rounded-xl"
                onClick={() => setMobileMenuOpen(false)}
                to="/student/progress"
              >
                My Progress &amp; Skills
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="w-full pt-20 bg-surface flex-1">
        <div className="max-w-7xl mx-auto px-gutter py-space-lg">
          <div className="flex flex-col w-full">
            {/* Header & Context Banner */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md mb-space-xl">
              <div className="flex flex-col gap-space-xs max-w-2xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-1 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm uppercase tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">psychology</span>
                    Diagnostic Analytics &amp; Interventions
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                    CS 101: Intro to Python
                  </span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                  My Learning Progress &amp; AI Feedback History
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Track your growth across CS 101 concepts, review historical AI explanations, and revisit past
                  mistakes.
                </p>
              </div>
              {/* Quick Actions / Encouraging Tag */}
              <div className="flex items-center gap-space-sm bg-surface-container-low p-2 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
                  <span className="material-symbols-outlined text-[22px]">trending_up</span>
                </div>
                <div className="flex flex-col pr-3">
                  <span className="font-label-sm text-label-sm text-secondary font-semibold">Growth Trajectory</span>
                  <span className="font-label-md text-label-md text-on-surface font-bold">
                    +20.5% vs Semester Start
                  </span>
                </div>
              </div>
            </div>

            {/* Top Metric Cards (4 Bento Stats) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter mb-space-xl">
              {/* Stat 1: Overall Mastery */}
              <div className="relative overflow-hidden bg-surface-container-lowest rounded-2xl p-space-lg shadow-[0_4px_16px_rgba(91,75,219,0.06)] flex flex-col justify-between group hover:shadow-[0_8px_24px_rgba(91,75,219,0.12)] transition-all">
                <div className="flex items-start justify-between">
                  <span className="font-label-md text-label-md text-on-surface-variant font-medium">
                    Overall Concept Mastery
                  </span>
                  <span className="w-8 h-8 rounded-lg bg-primary-fixed text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                  </span>
                </div>
                <div className="mt-4 flex flex-col">
                  <div className="flex items-baseline gap-2">
                    <span className="font-metric-number text-metric-number text-primary">78.5%</span>
                    <span className="inline-flex items-center gap-0.5 text-secondary font-label-md text-label-md font-semibold">
                      <span className="material-symbols-outlined text-[16px]">arrow_upward</span> +12%
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    Gained 12% in the last 30 days
                  </span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-1.5 mt-3 overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '78.5%' }}></div>
                </div>
              </div>

              {/* Stat 2: Activities Completed */}
              <div className="relative overflow-hidden bg-surface-container-lowest rounded-2xl p-space-lg shadow-[0_4px_16px_rgba(91,75,219,0.06)] flex flex-col justify-between group hover:shadow-[0_8px_24px_rgba(91,75,219,0.12)] transition-all">
                <div className="flex items-start justify-between">
                  <span className="font-label-md text-label-md text-on-surface-variant font-medium">
                    Activities Completed
                  </span>
                  <span className="w-8 h-8 rounded-lg bg-surface-container text-on-surface-variant flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">assignment_turned_in</span>
                  </span>
                </div>
                <div className="mt-4 flex flex-col">
                  <div className="flex items-baseline gap-1">
                    <span className="font-metric-number text-metric-number text-on-surface">6</span>
                    <span className="font-body-md text-body-md text-on-surface-variant ml-1">Assessments</span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    4 Quizzes, 2 Diagnostic Drills
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-3 text-secondary font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span> 100% on-time submission
                  rate
                </div>
              </div>

              {/* Stat 3: Common Misconceptions Resolved */}
              <div className="relative overflow-hidden bg-surface-container-lowest rounded-2xl p-space-lg shadow-[0_4px_16px_rgba(91,75,219,0.06)] flex flex-col justify-between group hover:shadow-[0_8px_24px_rgba(91,75,219,0.12)] transition-all">
                <div className="flex items-start justify-between">
                  <span className="font-label-md text-label-md text-on-surface-variant font-medium">
                    Misconceptions Resolved
                  </span>
                  <span className="w-8 h-8 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">lightbulb</span>
                  </span>
                </div>
                <div className="mt-4 flex flex-col">
                  <div className="flex items-baseline gap-1">
                    <span className="font-metric-number text-metric-number text-on-surface">4</span>
                    <span className="font-body-md text-body-md text-on-surface-variant ml-1">of 5 Target Gaps</span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    1 active gap in Loops &amp; Indexing
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-3 text-tertiary-container font-label-sm text-label-sm font-semibold">
                  <span className="material-symbols-outlined text-[16px]">task_alt</span> 80% resolution efficiency
                </div>
              </div>

              {/* Stat 4: AI Latency & Support */}
              <div className="relative overflow-hidden bg-surface-container-lowest rounded-2xl p-space-lg shadow-[0_4px_16px_rgba(91,75,219,0.06)] flex flex-col justify-between group hover:shadow-[0_8px_24px_rgba(91,75,219,0.12)] transition-all">
                <div className="flex items-start justify-between">
                  <span className="font-label-md text-label-md text-on-surface-variant font-medium">
                    AI Feedback Latency
                  </span>
                  <span className="w-8 h-8 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">bolt</span>
                  </span>
                </div>
                <div className="mt-4 flex flex-col">
                  <div className="flex items-baseline gap-1">
                    <span className="font-metric-number text-metric-number text-secondary">2.4s</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant ml-1">avg</span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    100% instant code diagnostics
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-3 text-secondary font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[16px]">speed</span> Real-time AST error parser active
                </div>
              </div>
            </div>

            {/* Two-Column Asymmetric Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
              {/* LEFT PANEL: Core Concept Mastery & Historical Feedback Archive (8 Columns) */}
              <div className="lg:col-span-8 flex flex-col gap-space-xl">
                {/* Section 1: Concept Mastery Map (PRD 5.2.2) */}
                <section className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-[0_4px_16px_rgba(91,75,219,0.06)] flex flex-col gap-space-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl bg-primary-container text-on-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-[18px]">hub</span>
                      </span>
                      <div>
                        <h2 className="font-headline-sm text-headline-sm text-on-surface">Concept Mastery Map</h2>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Continuous evaluation across 5 foundational computer science modules
                        </p>
                      </div>
                    </div>
                    <span className="self-start sm:self-auto font-label-sm text-label-sm px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-medium">
                      DepEd Senior High CS Framework
                    </span>
                  </div>

                  {/* Concept Matrix Cards / Bars */}
                  <div className="flex flex-col gap-space-md pt-2">
                    {/* Concept 1: Loops & Iteration (Attention Needed) */}
                    <div className="p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors flex flex-col gap-2">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="material-symbols-outlined text-[20px] text-tertiary-container">replay</span>
                          <span className="font-label-lg text-label-lg text-on-surface font-bold">
                            Loops &amp; Iteration
                          </span>
                          <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-semibold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">warning</span> 1 Flagged Gap
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-label-md text-label-md text-on-surface font-bold">72%</span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant hidden sm:inline">
                            (Approaching Mastery)
                          </span>
                        </div>
                      </div>
                      {/* Progress Bar */}
                      <div className="w-full bg-surface-container-highest rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-tertiary-fixed-dim h-full rounded-full transition-all duration-500"
                          style={{ width: '72%' }}
                        ></div>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-2 text-body-sm font-body-sm text-on-surface-variant pt-1">
                        <span className="">
                          Boundary indexing inside{' '}
                          <code className="font-mono text-[11px] bg-surface-container px-1 py-0.5 rounded">
                            for/while
                          </code>{' '}
                          conditions
                        </span>
                        <Link
                          className="text-primary hover:underline font-label-sm text-label-sm font-semibold inline-flex items-center gap-0.5"
                          to="/student/quiz"
                        >
                          Practice Remedial Drill <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                        </Link>
                      </div>
                    </div>

                    {/* Concept 2: Conditionals & Boolean Logic (Mastered) */}
                    <div className="p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors flex flex-col gap-2">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="material-symbols-outlined text-[20px] text-secondary">alt_route</span>
                          <span className="font-label-lg text-label-lg text-on-surface font-bold">
                            Conditionals &amp; Boolean Logic
                          </span>
                          <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-semibold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">check_circle</span> Advanced Mastery
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-label-md text-label-md text-secondary font-bold">92%</span>
                        </div>
                      </div>
                      <div className="w-full bg-surface-container-highest rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-secondary h-full rounded-full transition-all duration-500"
                          style={{ width: '92%' }}
                        ></div>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-2 text-body-sm font-body-sm text-on-surface-variant pt-1">
                        <span className="">
                          Strong grasp of nested{' '}
                          <code className="font-mono text-[11px] bg-surface-container px-1 py-0.5 rounded">
                            if/elif/else
                          </code>{' '}
                          and Boolean operator precedence
                        </span>
                        <span className="text-secondary font-label-sm text-label-sm font-medium">
                          Solid Performance
                        </span>
                      </div>
                    </div>

                    {/* Concept 3: Functions & Modular Code (Proficient) */}
                    <div className="p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors flex flex-col gap-2">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="material-symbols-outlined text-[20px] text-primary">data_object</span>
                          <span className="font-label-lg text-label-lg text-on-surface font-bold">
                            Functions &amp; Modular Code
                          </span>
                          <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-semibold">
                            Proficient
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-label-md text-label-md text-on-surface font-bold">86%</span>
                        </div>
                      </div>
                      <div className="w-full bg-surface-container-highest rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-primary-container h-full rounded-full transition-all duration-500"
                          style={{ width: '86%' }}
                        ></div>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-2 text-body-sm font-body-sm text-on-surface-variant pt-1">
                        <span className="">Param pass-by-reference resolved; return values well applied</span>
                        <span className="text-on-surface-variant font-label-sm text-label-sm">
                          3 of 3 tasks verified
                        </span>
                      </div>
                    </div>

                    {/* Concept 4: Data Structures: Lists & Dictionaries */}
                    <div className="p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors flex flex-col gap-2">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="material-symbols-outlined text-[20px] text-primary">table_chart</span>
                          <span className="font-label-lg text-label-lg text-on-surface font-bold">
                            Data Structures: Lists &amp; Dictionaries
                          </span>
                          <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-semibold">
                            Proficient
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-label-md text-label-md text-on-surface font-bold">84%</span>
                        </div>
                      </div>
                      <div className="w-full bg-surface-container-highest rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-primary-container h-full rounded-full transition-all duration-500"
                          style={{ width: '84%' }}
                        ></div>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-2 text-body-sm font-body-sm text-on-surface-variant pt-1">
                        <span className="">Key-value mappings and iteration over dictionary entries</span>
                        <span className="text-on-surface-variant font-label-sm text-label-sm">High comprehension</span>
                      </div>
                    </div>

                    {/* Concept 5: Syntax & Error Handling */}
                    <div className="p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors flex flex-col gap-2">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="material-symbols-outlined text-[20px] text-primary">terminal</span>
                          <span className="font-label-lg text-label-lg text-on-surface font-bold">
                            Syntax &amp; Error Handling
                          </span>
                          <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-semibold">
                            Proficient
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-label-md text-label-md text-on-surface font-bold">80%</span>
                        </div>
                      </div>
                      <div className="w-full bg-surface-container-highest rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-primary-container h-full rounded-full transition-all duration-500"
                          style={{ width: '80%' }}
                        ></div>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-2 text-body-sm font-body-sm text-on-surface-variant pt-1">
                        <span className="">
                          Handling{' '}
                          <code className="font-mono text-[11px] bg-surface-container px-1 py-0.5 rounded">
                            try/except
                          </code>{' '}
                          blocks &amp; interpreting Python tracebacks
                        </span>
                        <span className="text-on-surface-variant font-label-sm text-label-sm">Stable execution</span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section 2: Historical Feedback Archive (PRD 5.2.3, US-11) */}
                <section className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-[0_4px_16px_rgba(91,75,219,0.06)] flex flex-col gap-space-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl bg-surface-container text-on-surface flex items-center justify-center">
                        <span className="material-symbols-outlined text-[18px]">history_edu</span>
                      </span>
                      <div>
                        <h2 className="font-headline-sm text-headline-sm text-on-surface">
                          Diagnostic Feedback History
                        </h2>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Review how AI identified your logical bugs and track the corrections you made
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Search & Interactive Filters Bar */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-space-sm bg-surface-container-low p-2 rounded-2xl">
                    <div className="relative flex-1">
                      <span className="material-symbols-outlined text-[18px] text-outline absolute left-3 top-1/2 -translate-y-1/2">
                        search
                      </span>
                      <input
                        className="w-full pl-9 pr-4 py-2 bg-surface-container-lowest text-on-surface rounded-xl font-body-md text-body-md placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                        id="feedbackSearch"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search concepts (e.g., 'while loop', 'IndexError', 'function')..."
                        type="text"
                        value={searchQuery}
                      />
                    </div>
                    {/* Filter Buttons */}
                    <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0" id="filterButtonGroup">
                      {FILTER_OPTIONS.map((filter) => {
                        const isActive = selectedFilter === filter.id
                        return (
                          <button
                            className={`filter-btn px-3 py-1.5 rounded-xl font-label-sm text-label-sm ${
                              filter.id === 'all' ? 'font-semibold' : 'hover:bg-surface-container font-medium'
                            } transition-all ${filter.dotClass ? 'flex items-center gap-1' : ''} ${
                              isActive ? 'active-filter bg-primary text-on-primary' : 'text-on-surface-variant'
                            }`}
                            data-filter={filter.id}
                            key={filter.id}
                            onClick={() => setSelectedFilter(filter.id)}
                            type="button"
                          >
                            {filter.dotClass && <span className={`w-2 h-2 rounded-full ${filter.dotClass}`}></span>}
                            {filter.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* History Log Card Stream */}
                  <div className="flex flex-col gap-space-md" id="historyCardList">
                    {/* Card 1: Needs Review (IndexError) */}
                    {showCard1 && (
                      <div
                        className="history-item bg-surface-container-low rounded-2xl p-space-lg flex flex-col gap-space-md hover:bg-surface-container transition-all"
                        data-category="needs-review"
                        data-keywords="python loops list comprehension indexerror boundary condition len"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-headline-sm text-headline-sm text-on-surface">
                                Python Loops &amp; List Comprehension Diagnostic
                              </span>
                              <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">flag</span> Remedial Drill
                                Pending
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-body-sm font-body-sm text-on-surface-variant mt-1 flex-wrap">
                              <span className="">Dec 18, 2024</span>
                              <span className="">•</span>
                              <span className="font-semibold text-on-surface">Score: 80% (8/10)</span>
                              <span className="">•</span>
                              <span className="text-tertiary-container font-medium">1 Conceptual Misconception</span>
                            </div>
                          </div>
                          <div className="flex items-center self-start sm:self-center gap-2">
                            <span className="px-3 py-1 rounded-xl bg-surface-container-highest text-on-surface font-label-md text-label-md font-bold">
                              80%
                            </span>
                          </div>
                        </div>

                        {/* AI Diagnosed Detail Callout */}
                        <div className="bg-surface-container-lowest p-space-md rounded-xl flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-primary font-label-md text-label-md font-semibold">
                            <span className="material-symbols-outlined text-[18px]">neurology</span>
                            <span className="">AI Root-Cause Diagnosis</span>
                          </div>
                          <p className="font-body-md text-body-md text-on-surface">
                            Key Diagnosed Issue:{' '}
                            <span className="font-mono text-[13px] bg-error-container text-on-error-container px-1.5 py-0.5 rounded font-bold">
                              IndexError: list index out of range
                            </span>
                            . Student initialized the loop boundary with{' '}
                            <code className="font-mono text-[12px] bg-surface-container px-1 rounded">
                              i &lt;= len(arr)
                            </code>{' '}
                            instead of{' '}
                            <code className="font-mono text-[12px] bg-surface-container px-1 rounded">
                              i &lt; len(arr)
                            </code>
                            , confusing zero-indexed length with the final valid index.
                          </p>
                          <div className="flex items-start gap-2 bg-surface-container-low p-2.5 rounded-lg mt-1">
                            <span className="material-symbols-outlined text-[18px] text-primary flex-shrink-0 mt-0.5">
                              auto_fix_high
                            </span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">
                              <strong className="text-on-surface font-semibold">AI Recommendation:</strong> Revisit
                              zero-indexing principles in Python sequences. An interactive 10-minute micro-drill has
                              been queued for Miguel.
                            </span>
                          </div>
                        </div>

                        {/* Card Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-space-sm pt-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                              <span className="material-symbols-outlined text-[16px]">schedule</span> Completed in 14
                              mins
                            </span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">•</span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">
                              Instructor: Mr. Del Rosario
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              className="px-4 py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-primary-container transition-all flex items-center gap-1.5 shadow-sm"
                              onClick={() => setReportModalTitle('Python Loops & List Comprehension Diagnostic')}
                              type="button"
                            >
                              <span className="">View Full Diagnostic Report</span>
                              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Card 2: Resolved (Functions & Return Values) */}
                    {showCard2 && (
                      <div
                        className="history-item bg-surface-container-low rounded-2xl p-space-lg flex flex-col gap-space-md hover:bg-surface-container transition-all"
                        data-category="resolved"
                        data-keywords="functions return values print recursion helper function scenario debugging"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-headline-sm text-headline-sm text-on-surface">
                                Functions &amp; Return Values: Scenario Debugging
                              </span>
                              <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">check_circle</span> Resolved
                                Misconception
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-body-sm font-body-sm text-on-surface-variant mt-1 flex-wrap">
                              <span className="">Dec 14, 2024</span>
                              <span className="">•</span>
                              <span className="font-semibold text-on-surface">Score: 88% (7/8)</span>
                              <span className="">•</span>
                              <span className="text-secondary font-medium">Successfully Mastered on Follow-up</span>
                            </div>
                          </div>
                          <div className="flex items-center self-start sm:self-center gap-2">
                            <span className="px-3 py-1 rounded-xl bg-surface-container-highest text-on-surface font-label-md text-label-md font-bold">
                              88%
                            </span>
                          </div>
                        </div>

                        {/* AI Diagnosed Detail Callout */}
                        <div className="bg-surface-container-lowest p-space-md rounded-xl flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-secondary font-label-md text-label-md font-semibold">
                            <span className="material-symbols-outlined text-[18px]">verified</span>
                            <span className="">AI Root-Cause Diagnosis (Resolved)</span>
                          </div>
                          <p className="font-body-md text-body-md text-on-surface">
                            Key Diagnosed Issue: Confusing{' '}
                            <code className="font-mono text-[12px] bg-surface-container px-1 rounded">print()</code>{' '}
                            side-effects with actual caller output returns in recursive helper function{' '}
                            <code className="font-mono text-[12px] bg-surface-container px-1 rounded">
                              calc_factorial()
                            </code>
                            , resulting in unexpected{' '}
                            <code className="font-mono text-[12px] bg-surface-container px-1 rounded">NoneType</code>{' '}
                            assignments.
                          </p>
                          <div className="flex items-start gap-2 bg-surface-container-low p-2.5 rounded-lg mt-1">
                            <span className="material-symbols-outlined text-[18px] text-secondary flex-shrink-0 mt-0.5">
                              task_alt
                            </span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">
                              <strong className="text-on-surface font-semibold">AI Status:</strong> Resolved. Miguel
                              passed the follow-up 3-question return value verification drill with 100% accuracy on Dec
                              15.
                            </span>
                          </div>
                        </div>

                        {/* Card Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-space-sm pt-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                              <span className="material-symbols-outlined text-[16px]">schedule</span> Completed in 18
                              mins
                            </span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">•</span>
                            <span className="font-label-sm text-label-sm text-secondary font-medium">
                              Follow-up verified
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              className="px-4 py-2 rounded-xl bg-surface-container-highest text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container transition-all flex items-center gap-1.5"
                              onClick={() => setReportModalTitle('Functions & Return Values: Scenario Debugging')}
                              type="button"
                            >
                              <span className="">View Full Diagnostic Report</span>
                              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Card 3: Resolved (Conditionals & Boolean Logic) */}
                    {showCard3 && (
                      <div
                        className="history-item bg-surface-container-low rounded-2xl p-space-lg flex flex-col gap-space-md hover:bg-surface-container transition-all"
                        data-category="resolved"
                        data-keywords="conditionals boolean logic and or operator precedence diagnostic"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-headline-sm text-headline-sm text-on-surface">
                                Conditionals &amp; Boolean Logic Diagnostic
                              </span>
                              <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">check_circle</span> Mastered
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-body-sm font-body-sm text-on-surface-variant mt-1 flex-wrap">
                              <span className="">Dec 05, 2024</span>
                              <span className="">•</span>
                              <span className="font-semibold text-on-surface">Score: 92% (11/12)</span>
                              <span className="">•</span>
                              <span className="text-secondary font-medium">Exceeds Benchmark</span>
                            </div>
                          </div>
                          <div className="flex items-center self-start sm:self-center gap-2">
                            <span className="px-3 py-1 rounded-xl bg-surface-container-highest text-secondary font-label-md text-label-md font-bold">
                              92%
                            </span>
                          </div>
                        </div>

                        {/* AI Diagnosed Detail Callout */}
                        <div className="bg-surface-container-lowest p-space-md rounded-xl flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-secondary font-label-md text-label-md font-semibold">
                            <span className="material-symbols-outlined text-[18px]">psychology</span>
                            <span className="">AI Root-Cause Diagnosis (Mastered)</span>
                          </div>
                          <p className="font-body-md text-body-md text-on-surface">
                            Key Diagnosed Issue: Minor hesitation regarding compound{' '}
                            <code className="font-mono text-[12px] bg-surface-container px-1 rounded">and</code> vs{' '}
                            <code className="font-mono text-[12px] bg-surface-container px-1 rounded">or</code> operator
                            evaluation precedence when parentheses are omitted. Resolved autonomously upon reviewing
                            diagnostic feedback.
                          </p>
                        </div>

                        {/* Card Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-space-sm pt-1">
                          <div className="flex items-center gap-2">
                            <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                              <span className="material-symbols-outlined text-[16px]">schedule</span> Completed in 11
                              mins
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              className="px-4 py-2 rounded-xl bg-surface-container-highest text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container transition-all flex items-center gap-1.5"
                              onClick={() => setReportModalTitle('Conditionals & Boolean Logic Diagnostic')}
                              type="button"
                            >
                              <span className="">View Full Diagnostic Report</span>
                              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Card 4: Baseline Entry Diagnostic */}
                    {showCard4 && (
                      <div
                        className="history-item bg-surface-container-low rounded-2xl p-space-lg flex flex-col gap-space-md hover:bg-surface-container transition-all"
                        data-category="baseline"
                        data-keywords="baseline python diagnostic course entry initial starting level growth"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-headline-sm text-headline-sm text-on-surface">
                                Baseline Python Diagnostic (Course Entry)
                              </span>
                              <span className="px-2.5 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm font-semibold">
                                Starting Baseline
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-body-sm font-body-sm text-on-surface-variant mt-1 flex-wrap">
                              <span className="">Oct 20, 2024</span>
                              <span className="">•</span>
                              <span className="font-semibold text-on-surface">Score: 58%</span>
                              <span className="">•</span>
                              <span className="text-primary font-bold">+22% Improvement to Date</span>
                            </div>
                          </div>
                          <div className="flex items-center self-start sm:self-center gap-2">
                            <span className="px-3 py-1 rounded-xl bg-surface-container-highest text-on-surface-variant font-label-md text-label-md font-bold">
                              58%
                            </span>
                          </div>
                        </div>

                        {/* Baseline Growth Badge */}
                        <div className="bg-surface-container-lowest p-space-md rounded-xl flex items-center gap-space-md">
                          <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary flex-shrink-0">
                            <span className="material-symbols-outlined text-[24px]">military_tech</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-label-md text-label-md text-primary font-bold">
                              Outstanding Growth Trajectory!
                            </span>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">
                              Initial assessment before Aralytics adaptive interventions flagged syntax uncertainty and
                              loop boundaries. Since then, your diagnostic score has climbed from 58% to an 80% course
                              average.
                            </p>
                          </div>
                        </div>

                        {/* Card Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-space-sm pt-1">
                          <div className="flex items-center gap-2">
                            <span className="font-label-sm text-label-sm text-on-surface-variant">
                              Initial diagnostic benchmark
                            </span>
                          </div>
                          <button
                            className="px-4 py-2 rounded-xl bg-surface-container-highest text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container transition-all flex items-center gap-1.5"
                            onClick={() => setReportModalTitle('Baseline Python Diagnostic')}
                            type="button"
                          >
                            <span className="">View Historical Baseline</span>
                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              </div>

              {/* RIGHT PANEL: Sidebar / Self-Study Recommendation & Reflections (4 Columns) */}
              <div className="lg:col-span-4 flex flex-col gap-space-xl">
                {/* Recommended AI Micro-Drill Widget (Targeting the flagged gap) */}
                <section
                  className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-[0_4px_16px_rgba(91,75,219,0.08)] flex flex-col gap-space-md relative overflow-hidden"
                  id="micro-drill"
                >
                  {/* Visual Accent Pill */}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">auto_awesome</span> Recommended
                      Micro-Drill
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">timer</span> ~10 mins
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface leading-tight">
                      Boundary Conditions &amp; Zero-Indexing in Python
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Targeted specifically for the{' '}
                      <code className="font-mono text-[11px] bg-surface-container px-1 py-0.5 rounded">IndexError</code>{' '}
                      issue flagged in your Dec 18 diagnostic. 3 interactive code-repair questions.
                    </p>
                  </div>
                  {/* Visual Concept snippet mini-card */}
                  <div className="bg-surface-container-low rounded-xl p-3 flex flex-col gap-1">
                    <span className="font-label-xs text-[11px] text-on-surface-variant uppercase font-mono tracking-wider">
                      Targeted Code Pattern:
                    </span>
                    <div className="font-mono text-[12px] text-on-surface bg-surface-container-lowest p-2 rounded-lg leading-relaxed overflow-x-auto">
                      <span className="text-error font-semibold"># Pitfall:</span> for i in range(len(arr) + 1)
                      <br />
                      <span className="text-secondary font-semibold"># Fix:</span> for i in range(len(arr))
                    </div>
                  </div>
                  {/* Primary Accent Action Button */}
                  <Link
                    className="w-full py-3 px-4 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-bold hover:bg-primary-container shadow-[0_4px_16px_rgba(91,75,219,0.2)] transition-all flex items-center justify-center gap-2 group"
                    to="/student/quiz"
                  >
                    <span className="">Start 10-Min Micro-Drill</span>
                    <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                      play_arrow
                    </span>
                  </Link>
                  <span className="text-center font-body-sm text-body-sm text-on-surface-variant">
                    Completing this drill will increase your{' '}
                    <span className="text-primary font-semibold">Loops &amp; Iteration</span> score to ~84%!
                  </span>
                </section>

                {/* Student Reflection Notes Widget */}
                <section className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-[0_4px_16px_rgba(91,75,219,0.06)] flex flex-col gap-space-md">
                  <div className="flex items-center justify-between pb-1">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-surface-container text-on-surface flex items-center justify-center">
                        <span className="material-symbols-outlined text-[16px]">edit_note</span>
                      </span>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">Miguel&apos;s Study Notes</h3>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Auto-saved</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Jot down personal reminders from AI diagnostic hints or bookmark review items before your upcoming
                    exam.
                  </p>
                  {/* Existing Saved Notes List */}
                  <div className="flex flex-col gap-2" id="notesList">
                    {notes.map((note) => (
                      <div
                        className="p-3 rounded-xl bg-surface-container-low flex items-start justify-between gap-2 group hover:bg-surface-container transition-all"
                        key={note.id}
                      >
                        <div className="flex items-start gap-2">
                          <span className={`material-symbols-outlined text-[16px] ${note.pinColor} mt-0.5`}>
                            push_pin
                          </span>
                          <div className="flex flex-col">
                            <span className="font-body-sm text-body-sm text-on-surface font-medium leading-snug">
                              {note.content || note.text}
                            </span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                              {note.meta}
                            </span>
                          </div>
                        </div>
                        <button
                          aria-label="Delete note"
                          className="text-on-surface-variant hover:text-error opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleDeleteNote(note.id)}
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>
                    ))}
                  </div>
                  {/* Add New Reflection Input */}
                  <div className="flex flex-col gap-2 pt-2">
                    <textarea
                      className="w-full p-3 bg-surface-container-low text-on-surface rounded-xl font-body-sm text-body-sm placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      id="newNoteInput"
                      onChange={(e) => setNewNoteText(e.target.value)}
                      placeholder="Write a new reflection note..."
                      rows={2}
                      value={newNoteText}
                    ></textarea>
                    <button
                      className="self-end px-3.5 py-1.5 rounded-xl bg-surface-container-highest text-primary font-label-sm text-label-sm font-bold hover:bg-primary hover:text-on-primary transition-all flex items-center gap-1"
                      id="addNoteBtn"
                      onClick={handleAddNote}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">bookmark_add</span>
                      <span className="">Pin Note</span>
                    </button>
                  </div>
                </section>
                {/* DepEd Curriculum Competency Checklist Card */}
              </div>
            </div>

            {/* Interactive Diagnostic Report Modal */}
            {reportModalTitle && (
              <div
                className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm flex items-center justify-center p-4"
                id="diagnosticReportModal"
              >
                <div className="bg-surface-container-lowest w-full max-w-2xl rounded-2xl p-space-lg shadow-[0_20px_40px_rgba(31,35,64,0.16)] flex flex-col gap-space-md max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between pb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-primary-container text-on-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-[18px]">psychology</span>
                      </div>
                      <div>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface" id="modalTitle">
                          {reportModalTitle}
                        </h3>
                        <span className="font-label-sm text-label-sm text-on-surface-variant" id="modalSubtitle">
                          Activity Comprehensive Breakdown
                        </span>
                      </div>
                    </div>
                    <button
                      className="w-8 h-8 rounded-xl bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors"
                      onClick={() => setReportModalTitle(null)}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                  </div>
                  {/* Modal Content Body */}
                  <div className="flex flex-col gap-space-md py-2">
                    <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-2">
                      <span className="font-label-md text-label-md text-primary font-bold">
                        1. Diagnosed Code Failure Location
                      </span>
                      <pre className="font-mono text-[12px] bg-inverse-surface text-inverse-on-surface p-3 rounded-lg overflow-x-auto">
                        <code>{`def find_maximum(arr):
    max_val = arr[0]
    for i in range(len(arr) + 1):  # <-- ERROR: IndexError when i == len(arr)
        if arr[i] > max_val:
            max_val = arr[i]
    return max_val`}</code>
                      </pre>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-label-md text-label-md text-on-surface font-bold">
                        2. Natural Language AI Explanation
                      </span>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        Python sequences use 0-based indexing. For a list of length 5, valid indices are 0 through 4.
                        Specifying{' '}
                        <code className="font-mono text-[12px] bg-surface-container px-1 rounded">
                          range(len(arr) + 1)
                        </code>{' '}
                        forces iteration to attempt index 5, triggering the runtime fault.
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-label-md text-label-md text-secondary font-bold">
                        3. Correction &amp; Best Practice
                      </span>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        Use standard indexing{' '}
                        <code className="font-mono text-[12px] bg-surface-container px-1 rounded">
                          for i in range(len(arr))
                        </code>{' '}
                        or directly iterate over elements via{' '}
                        <code className="font-mono text-[12px] bg-surface-container px-1 rounded">for val in arr:</code>
                        .
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-end gap-space-sm pt-2">
                    <button
                      className="px-4 py-2 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container-high transition-colors"
                      onClick={() => setReportModalTitle(null)}
                      type="button"
                    >
                      Close Report
                    </button>
                    <Link
                      className="px-4 py-2 rounded-xl bg-surface-container-high text-primary font-label-md text-label-md font-semibold hover:bg-surface-container-highest transition-colors"
                      onClick={() => setReportModalTitle(null)}
                      to="/student/feedback"
                    >
                      Open Full Report
                    </Link>
                    <Link
                      className="px-4 py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-primary-container transition-all"
                      onClick={() => setReportModalTitle(null)}
                      to="/student/quiz"
                    >
                      Bookmark &amp; Start Drill
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
