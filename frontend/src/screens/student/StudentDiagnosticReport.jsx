import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import BrandLogo from '../../components/BrandLogo'

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/student/dashboard', dataPath: 'dashboard' },
  { label: 'My Activities', path: '/student/activities', dataPath: 'my-activities' },
  { label: 'Code Quiz & Exercises', path: '/student/quiz', dataPath: 'code-quiz-exercises' },
  { label: 'AI Feedback History', path: '/student/feedback', dataPath: 'ai-feedback-history' },
  { label: 'My Progress & Skills', path: '/student/progress', dataPath: 'my-progress-skills' },
]

const DRILL_OPTIONS = [
  { value: 'a', label: 'while i <= len(row):' },
  { value: 'b', label: 'while i < len(row):' },
  { value: 'c', label: 'while i <= len(row) - 0:' },
]

export default function StudentDiagnosticReport() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const [openQuestions, setOpenQuestions] = useState({
    q1: false,
    q2: false,
    q3: false,
    q4: false,
    q7: true,
    q10: false,
  })

  const [practiceModalOpen, setPracticeModalOpen] = useState(false)
  const [drillAnswer, setDrillAnswer] = useState('')
  const [drillFeedback, setDrillFeedback] = useState(null)
  const [drillSubmittedCorrect, setDrillSubmittedCorrect] = useState(false)

  const [pdfStatus1, setPdfStatus1] = useState('idle')
  const [pdfStatus2, setPdfStatus2] = useState('idle')
  const timersRef = useRef([])

  useEffect(() => {
    const timers = timersRef.current
    return () => {
      timers.forEach((id) => clearTimeout(id))
    }
  }, [])

  const toggleQuestion = (key) => {
    setOpenQuestions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const openPracticeModal = (e) => {
    if (e) e.preventDefault()
    setDrillAnswer('')
    setDrillFeedback(null)
    setDrillSubmittedCorrect(false)
    setPracticeModalOpen(true)
  }

  const closePracticeModal = () => {
    setPracticeModalOpen(false)
  }

  const handleSubmitDrill = () => {
    if (!drillAnswer) {
      setDrillFeedback('empty')
      return
    }
    if (drillAnswer === 'b') {
      setDrillFeedback('correct')
      setDrillSubmittedCorrect(true)
    } else {
      setDrillFeedback('incorrect')
    }
  }

  const triggerPdfDownload = (setter) => (e) => {
    e.preventDefault()
    setter('generating')
    const t1 = setTimeout(() => {
      setter('downloaded')
      const t2 = setTimeout(() => {
        setter('idle')
      }, 2500)
      timersRef.current.push(t2)
    }, 900)
    timersRef.current.push(t1)
  }

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
              {NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    aria-current={isActive ? 'page' : undefined}
                    className={
                      isActive
                        ? 'px-3.5 py-2 transition-all bg-surface-container-high text-primary font-label-lg font-bold rounded-xl'
                        : 'px-3.5 py-2 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all'
                    }
                    data-path={item.dataPath}
                    to={item.path}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>
          <div className="flex items-center gap-space-sm sm:gap-space-md">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md">
              <span className="material-symbols-outlined text-[18px] text-tertiary-container">local_fire_department</span>
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
            <div className="flex items-center gap-space-sm pl-1 sm:pl-2">
              <div className="flex items-center gap-2.5 bg-surface-container-low py-1.5 pl-2 pr-2 sm:pr-3.5 rounded-full">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
                </div>
                <div className="hidden md:flex flex-col text-left">
                  <span className="font-label-md text-label-md text-on-surface leading-tight font-semibold">Miguel Santos</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant leading-none">Grade 10 · CS 101</span>
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
                aria-expanded={mobileMenuOpen}
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
          <div className="xl:hidden border-t border-outline-variant/20 bg-surface px-gutter py-space-md shadow-md">
            <nav className="flex flex-col gap-space-xs">
              <Link
                className="px-3.5 py-2.5 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all"
                onClick={() => setMobileMenuOpen(false)}
                to="/student/dashboard"
              >
                Dashboard
              </Link>
              {NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    aria-current={isActive ? 'page' : undefined}
                    className={
                      isActive
                        ? 'px-3.5 py-2.5 transition-all bg-surface-container-high text-primary font-label-lg font-bold rounded-xl'
                        : 'px-3.5 py-2.5 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all'
                    }
                    onClick={() => setMobileMenuOpen(false)}
                    to={item.path}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        )}
      </header>

      <main className="w-full pt-20 bg-surface flex-1">
        <div className="max-w-7xl mx-auto px-gutter py-space-lg">
          <div className="flex flex-col w-full space-y-space-xl">
            {/* Submission Banner & Speed Metric */}
            <div className="relative overflow-hidden rounded-2xl bg-surface-container-high p-space-lg shadow-sm">
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-space-md">
                <div className="flex items-start md:items-center gap-space-md">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-on-secondary shadow-md shrink-0">
                    <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      task_alt
                    </span>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                        Submission Confirmed
                      </span>
                      <span className="inline-flex items-center gap-1 font-label-sm text-label-sm bg-surface-container-lowest text-primary px-2.5 py-0.5 rounded-full shadow-sm">
                        <span className="material-symbols-outlined text-[14px]">bolt</span>
                        Generated in 2.4s (SLA &lt;5.0s)
                      </span>
                    </div>
                    <h1 className="font-headline-lg text-headline-lg text-on-surface mt-1">
                      Python Loops &amp; List Comprehension Diagnostic
                    </h1>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      Student: <span className="font-semibold text-on-surface">Miguel Santos</span> • Submitted: Dec 18, 2024 at 4:18 PM • Section: Grade 10 - St. Jude
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-space-xs self-start md:self-auto shrink-0">
                  <button
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface-container-lowest text-primary hover:bg-surface-container transition-all font-label-lg text-label-lg shadow-sm"
                    id="downloadPdfBtn"
                    onClick={triggerPdfDownload(setPdfStatus1)}
                    type="button"
                  >
                    {pdfStatus1 === 'generating' && (
                      <>
                        <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                        <span>Generating...</span>
                      </>
                    )}
                    {pdfStatus1 === 'downloaded' && (
                      <>
                        <span className="material-symbols-outlined text-[18px]">check</span>
                        <span>Downloaded!</span>
                      </>
                    )}
                    {pdfStatus1 === 'idle' && (
                      <>
                        <span className="material-symbols-outlined text-[18px]">download</span>
                        <span className="">PDF Report</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Hero Scorecard & Key Diagnostic Findings */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
              {/* Score Gauge Card */}
              <div className="lg:col-span-4 bg-surface-container-lowest rounded-2xl p-space-lg shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                      Evaluation Score
                    </span>
                    <span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      Standard Met (≥70%)
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center my-6">
                    <div className="relative w-44 h-44 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                        <circle
                          className="stroke-surface-container text-surface-container"
                          cx="60"
                          cy="60"
                          fill="transparent"
                          r="50"
                          strokeWidth="10"
                        ></circle>
                        <circle
                          className="stroke-primary text-primary transition-all duration-1000 ease-out"
                          cx="60"
                          cy="60"
                          fill="transparent"
                          r="50"
                          strokeDasharray="314.159"
                          strokeDashoffset="62.83"
                          strokeLinecap="round"
                          strokeWidth="10"
                        ></circle>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="font-metric-number text-metric-number text-on-surface leading-none">80%</span>
                        <span className="font-label-md text-label-md text-on-surface-variant mt-1">8 / 10 Correct</span>
                      </div>
                    </div>
                    <span className="px-3.5 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-label-md font-semibold mt-2">
                      Proficient with Minor Misconceptions
                    </span>
                  </div>
                </div>
                <div className="bg-surface-container-low rounded-xl p-space-md mt-2">
                  <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm mb-1">
                    <span className="">Passing Threshold: 70%</span>
                    <span className="text-secondary font-bold">+10% Over Benchmark</span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div className="bg-secondary h-full rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>

              {/* Diagnostic Insights & Conceptual Finding Card */}
              <div className="lg:col-span-8 bg-surface-container-lowest rounded-2xl p-space-lg shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[20px]">psychology</span>
                      </div>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface">Key Diagnostic Findings</h2>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm">
                      DepEd CS 101 Track
                    </span>
                  </div>
                  <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                    Strong grasp of basic{' '}
                    <code className="px-1.5 py-0.5 rounded bg-surface-container text-primary font-mono text-body-sm">while</code>{' '}
                    loops and list comprehension syntax. Flagged{' '}
                    <strong className="text-on-surface font-semibold">1 specific conceptual trap</strong>: off-by-one boundary checks in zero-indexed lists.
                  </p>
                  {/* Metric breakdown grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md my-6">
                    <div className="p-space-md rounded-xl bg-surface-container-low">
                      <div className="flex items-center justify-between">
                        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Iteration Logic</span>
                        <span className="material-symbols-outlined text-secondary text-[20px]">verified</span>
                      </div>
                      <p className="font-headline-md text-headline-md text-on-surface mt-1">100%</p>
                      <p className="font-body-sm text-body-sm text-secondary font-medium">Mastery Confirmed</p>
                    </div>
                    <div className="p-space-md rounded-xl bg-surface-container-low">
                      <div className="flex items-center justify-between">
                        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Filtering Syntax</span>
                        <span className="material-symbols-outlined text-secondary text-[20px]">verified</span>
                      </div>
                      <p className="font-headline-md text-headline-md text-on-surface mt-1">100%</p>
                      <p className="font-body-sm text-body-sm text-secondary font-medium">Mastery Confirmed</p>
                    </div>
                    <div className="p-space-md rounded-xl bg-error-container/40">
                      <div className="flex items-center justify-between">
                        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Index Boundaries</span>
                        <span className="material-symbols-outlined text-error text-[20px]">flag</span>
                      </div>
                      <p className="font-headline-md text-headline-md text-error mt-1">50%</p>
                      <p className="font-body-sm text-body-sm text-error font-medium">Review Recommended</p>
                    </div>
                  </div>
                </div>
                {/* Quick Remediation prompt bar */}
                <div className="p-4 rounded-xl bg-primary-fixed/50 flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px]">sports_score</span>
                    </div>
                    <div>
                      <h4 className="font-label-lg text-label-lg text-on-surface font-bold">5-Minute Targeted Drill Ready</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Recommended by Mr. Reyes • 3 Quick Off-by-One Challenges
                      </p>
                    </div>
                  </div>
                  <button
                    className="px-5 py-2.5 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed font-label-lg text-label-lg font-bold hover:bg-tertiary-fixed-dim transition-all shadow-sm shrink-0 flex items-center justify-center gap-1.5"
                    id="launchPracticeTop"
                    onClick={openPracticeModal}
                    type="button"
                  >
                    <span className="">Start Drill (5m)</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Detailed AI Feedback & Diagnostic Deep-Dive (PRD 5.1.4) */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-space-md gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-on-primary shadow-sm">
                    <span className="material-symbols-outlined text-[22px]">smart_toy</span>
                  </div>
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">Aral Coach AI Diagnostic Breakdown</h2>
                    <span className="font-label-sm text-label-sm text-primary font-semibold">
                      Personalized Learning Analysis • Cognitive Model Engine
                    </span>
                  </div>
                </div>
                <span className="self-start md:self-auto px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">visibility</span>
                  Shared with Teacher Reyes
                </span>
              </div>
              {/* Personal Encouragement Callout */}
              <div className="mt-4 p-space-md rounded-xl bg-surface-container-low flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[24px] shrink-0 mt-0.5">
                  sentiment_very_satisfied
                </span>
                <div>
                  <p className="font-body-lg text-body-lg text-on-surface">
                    <strong className="font-semibold text-primary">Awesome effort, Miguel!</strong> You solved 8 out of 10 complex debugging scenarios correctly. Here is exactly why you missed Question 7 and how to master it:
                  </p>
                </div>
              </div>
              {/* Deep Dive on Question 7: Misconception Explainer */}
              <div className="mt-space-lg rounded-2xl bg-surface p-space-lg">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">
                      Question 7 Focus
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">
                      2D Matrix Traversal &amp; Boundary Conditions
                    </h3>
                  </div>
                  <span className="font-label-sm text-label-sm text-error font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">error</span>
                    IndexError: list index out of range
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg mt-4">
                  {/* What happened block */}
                  <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md uppercase mb-2">
                        <span className="material-symbols-outlined text-error text-[18px]">cancel</span>
                        What Happened in Your Submission
                      </div>
                      <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                        In your{' '}
                        <code className="px-1 py-0.5 rounded bg-surface-container text-primary font-mono text-body-sm">
                          while
                        </code>{' '}
                        loop for 2D matrix traversal, you evaluated:
                      </p>
                      <div className="mt-3 p-3 rounded-lg bg-surface-container-highest font-mono text-body-sm text-on-surface">
                        <code>matrix[row][col]</code> with condition <code>col &lt;= len(matrix[row])</code>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-3">
                        This evaluated the loop body once more after reaching the final item index, attempting to read element index 3 in a list of length 3.
                      </p>
                    </div>
                  </div>
                  {/* The AI explanation block */}
                  <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-primary font-label-md text-label-md uppercase mb-2">
                        <span className="material-symbols-outlined text-primary text-[18px]">lightbulb</span>
                        The AI Diagnostic Explanation
                      </div>
                      <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                        Remember that in Python, list indices run from{' '}
                        <code className="px-1.5 py-0.5 rounded bg-surface-container font-mono font-bold text-on-surface">0</code>{' '}
                        to{' '}
                        <code className="px-1.5 py-0.5 rounded bg-surface-container font-mono font-bold text-on-surface">
                          n - 1
                        </code>
                        .
                      </p>
                      <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
                        When <code className="font-mono text-on-surface font-semibold">col</code> reaches{' '}
                        <code className="font-mono text-on-surface font-semibold">len(matrix[row])</code>, Python raises an{' '}
                        <code className="text-error font-semibold font-mono">IndexError</code>. Setting the condition to strictly less than (
                        <code className="text-secondary font-mono font-bold">col &lt; len(...)</code>) ensures you never step past the last element.
                      </p>
                    </div>
                  </div>
                </div>
                {/* Side-by-Side Code Diff Snippet */}
                <div className="mt-space-lg">
                  <h4 className="font-label-lg text-label-lg text-on-surface mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-primary">difference</span>
                    Code Comparison: Submitted vs Correct Logic
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                    {/* Student Answer */}
                    <div className="rounded-xl overflow-hidden bg-inverse-surface text-inverse-on-surface font-mono text-body-sm shadow-inner">
                      <div className="px-4 py-2.5 bg-inverse-surface/80 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                        <span className="text-error flex items-center gap-1 font-bold">
                          <span className="material-symbols-outlined text-[14px]">close</span>
                          Your Answer (Question 7)
                        </span>
                        <span className="text-error font-mono">Bug on line 4</span>
                      </div>
                      <div className="p-4 leading-relaxed overflow-x-auto">
                        <div className="text-on-surface-variant">
                          1 &nbsp;<span className="text-primary-fixed">def</span>{' '}
                          <span className="text-secondary-fixed">traverse_row</span>(matrix, row):
                        </div>
                        <div className="text-on-surface-variant">2 &nbsp;&nbsp;&nbsp;&nbsp;col = 0</div>
                        <div className="text-on-surface-variant">3 &nbsp;&nbsp;&nbsp;&nbsp;result = []</div>
                        <div className="bg-error-container/20 px-2 -mx-2 rounded text-error-container font-bold">
                          4 &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-primary-fixed">while</span> col &lt;= len(matrix[row]):{' '}
                          <span className="text-error-container">// Trap &lt;=</span>
                        </div>
                        <div className="text-on-surface-variant">
                          5 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;result.append(matrix[row][col])
                        </div>
                        <div className="text-on-surface-variant">
                          6 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;col += 1
                        </div>
                        <div className="text-on-surface-variant">
                          7 &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-primary-fixed">return</span> result
                        </div>
                      </div>
                    </div>
                    {/* Corrected Logic */}
                    <div className="rounded-xl overflow-hidden bg-inverse-surface text-inverse-on-surface font-mono text-body-sm shadow-inner">
                      <div className="px-4 py-2.5 bg-inverse-surface/80 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                        <span className="text-secondary-fixed flex items-center gap-1 font-bold">
                          <span className="material-symbols-outlined text-[14px]">check</span>
                          Corrected Logic
                        </span>
                        <span className="text-secondary-fixed font-mono">Strict boundary (&lt;)</span>
                      </div>
                      <div className="p-4 leading-relaxed overflow-x-auto">
                        <div className="text-on-surface-variant">
                          1 &nbsp;<span className="text-primary-fixed">def</span>{' '}
                          <span className="text-secondary-fixed">traverse_row</span>(matrix, row):
                        </div>
                        <div className="text-on-surface-variant">2 &nbsp;&nbsp;&nbsp;&nbsp;col = 0</div>
                        <div className="text-on-surface-variant">3 &nbsp;&nbsp;&nbsp;&nbsp;result = []</div>
                        <div className="bg-secondary-container/20 px-2 -mx-2 rounded text-secondary-container font-bold">
                          4 &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-primary-fixed">while</span> col &lt; len(matrix[row]): &nbsp;
                          <span className="text-secondary-fixed">// Safe range</span>
                        </div>
                        <div className="text-on-surface-variant">
                          5 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;result.append(matrix[row][col])
                        </div>
                        <div className="text-on-surface-variant">
                          6 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;col += 1
                        </div>
                        <div className="text-on-surface-variant">
                          7 &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-primary-fixed">return</span> result
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Action Box for Practice */}
              </div>
            </div>

            {/* Question-by-Question Review Accordion List */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-md gap-3">
                <div>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">
                    Question-by-Question Diagnostic Review
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    Click any question to view code trace, execution path, and detailed assessment
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
                    <span className="material-symbols-outlined text-[14px]">check</span> 8 Correct
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">
                    <span className="material-symbols-outlined text-[14px]">close</span> 2 Flagged
                  </span>
                </div>
              </div>
              {/* Accordion Items */}
              <div className="space-y-space-sm mt-4">
                {/* Q1: Correct */}
                <div className="rounded-xl bg-surface overflow-hidden transition-all">
                  <button
                    className="w-full text-left p-space-md flex items-center justify-between gap-space-md hover:bg-surface-container-low transition-colors accordion-toggle max-sm:flex-wrap max-sm:gap-2 max-sm:[&>div]:w-full max-sm:[&>div:last-child]:justify-between"
                    data-target="q1-content"
                    onClick={() => toggleQuestion('q1')}
                    type="button"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold text-label-md shrink-0">
                        Q1
                      </div>
                      <div>
                        <p className="font-label-lg text-label-lg text-on-surface">Basic For Loop Iteration over Lists</p>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Core syntax • Time spent: 42s
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">
                        100% Correct
                      </span>
                      <span
                        className="material-symbols-outlined text-on-surface-variant text-[20px] transition-transform duration-200"
                        style={{ transform: openQuestions.q1 ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      >
                        expand_more
                      </span>
                    </div>
                  </button>
                  <div className={`${openQuestions.q1 ? '' : 'hidden '}px-space-md pb-space-md pt-2`} id="q1-content">
                    <div className="p-space-md rounded-xl bg-surface-container-lowest font-body-sm text-body-sm text-on-surface-variant">
                      <div className="flex items-center gap-2 text-secondary font-semibold mb-1">
                        <span className="material-symbols-outlined text-[16px]">check_circle</span> Prompt Mastered
                      </div>
                      <p className="">
                        Your code correctly used the{' '}
                        <code className="font-mono text-primary font-bold">for item in inventory:</code> accumulator pattern without maintaining an external indexing counter.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Q2: Correct */}
                <div className="rounded-xl bg-surface overflow-hidden transition-all">
                  <button
                    className="w-full text-left p-space-md flex items-center justify-between gap-space-md hover:bg-surface-container-low transition-colors accordion-toggle max-sm:flex-wrap max-sm:gap-2 max-sm:[&>div]:w-full max-sm:[&>div:last-child]:justify-between"
                    data-target="q2-content"
                    onClick={() => toggleQuestion('q2')}
                    type="button"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold text-label-md shrink-0">
                        Q2
                      </div>
                      <div>
                        <p className="font-label-lg text-label-lg text-on-surface">
                          List Comprehension with Filter Condition
                        </p>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Functional syntax • Time spent: 1m 15s
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">
                        100% Correct
                      </span>
                      <span
                        className="material-symbols-outlined text-on-surface-variant text-[20px] transition-transform duration-200"
                        style={{ transform: openQuestions.q2 ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      >
                        expand_more
                      </span>
                    </div>
                  </button>
                  <div className={`${openQuestions.q2 ? '' : 'hidden '}px-space-md pb-space-md pt-2`} id="q2-content">
                    <div className="p-space-md rounded-xl bg-surface-container-lowest font-body-sm text-body-sm text-on-surface-variant">
                      <div className="flex items-center gap-2 text-secondary font-semibold mb-1">
                        <span className="material-symbols-outlined text-[16px]">check_circle</span> Prompt Mastered
                      </div>
                      <p className="">
                        Clean single-line syntax:{' '}
                        <code className="font-mono text-primary">[x for x in scores if x &gt;= 75]</code>. AI evaluated O(n) algorithmic cleanliness with high score.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Q3: Correct */}
                <div className="rounded-xl bg-surface overflow-hidden transition-all">
                  <button
                    className="w-full text-left p-space-md flex items-center justify-between gap-space-md hover:bg-surface-container-low transition-colors accordion-toggle max-sm:flex-wrap max-sm:gap-2 max-sm:[&>div]:w-full max-sm:[&>div:last-child]:justify-between"
                    data-target="q3-content"
                    onClick={() => toggleQuestion('q3')}
                    type="button"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold text-label-md shrink-0">
                        Q3
                      </div>
                      <div>
                        <p className="font-label-lg text-label-lg text-on-surface">Break vs Continue in While Loops</p>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Control Flow • Time spent: 54s
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">
                        100% Correct
                      </span>
                      <span
                        className="material-symbols-outlined text-on-surface-variant text-[20px] transition-transform duration-200"
                        style={{ transform: openQuestions.q3 ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      >
                        expand_more
                      </span>
                    </div>
                  </button>
                  <div className={`${openQuestions.q3 ? '' : 'hidden '}px-space-md pb-space-md pt-2`} id="q3-content">
                    <div className="p-space-md rounded-xl bg-surface-container-lowest font-body-sm text-body-sm text-on-surface-variant">
                      <div className="flex items-center gap-2 text-secondary font-semibold mb-1">
                        <span className="material-symbols-outlined text-[16px]">check_circle</span> Prompt Mastered
                      </div>
                      <p className="">
                        Properly identified termination conditions vs skipping negative balance items without premature cycle breakage.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Q4: Correct */}
                <div className="rounded-xl bg-surface overflow-hidden transition-all">
                  <button
                    className="w-full text-left p-space-md flex items-center justify-between gap-space-md hover:bg-surface-container-low transition-colors accordion-toggle max-sm:flex-wrap max-sm:gap-2 max-sm:[&>div]:w-full max-sm:[&>div:last-child]:justify-between"
                    data-target="q4-content"
                    onClick={() => toggleQuestion('q4')}
                    type="button"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold text-label-md shrink-0">
                        Q4
                      </div>
                      <div>
                        <p className="font-label-lg text-label-lg text-on-surface">
                          Situational Bug Hunter: IndexError in Running Total
                        </p>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Debugging drill • Time spent: 1m 40s
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">
                        100% Correct
                      </span>
                      <span
                        className="material-symbols-outlined text-on-surface-variant text-[20px] transition-transform duration-200"
                        style={{ transform: openQuestions.q4 ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      >
                        expand_more
                      </span>
                    </div>
                  </button>
                  <div className={`${openQuestions.q4 ? '' : 'hidden '}px-space-md pb-space-md pt-2`} id="q4-content">
                    <div className="p-space-md rounded-xl bg-surface-container-lowest font-body-sm text-body-sm text-on-surface-variant">
                      <div className="flex items-center gap-2 text-secondary font-semibold mb-1">
                        <span className="material-symbols-outlined text-[16px]">check_circle</span> Prompt Mastered
                      </div>
                      <p className="">
                        Diagnosed loop bounds successfully on 1D list traversal. Excellent handling of edge cases for empty array inputs.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Q7: Incorrect (Flagged) */}
                <div className="rounded-xl bg-surface overflow-hidden transition-all">
                  <button
                    className="w-full text-left p-space-md flex items-center justify-between gap-space-md hover:bg-surface-container-low transition-colors accordion-toggle max-sm:flex-wrap max-sm:gap-2 max-sm:[&>div]:w-full max-sm:[&>div:last-child]:justify-between"
                    data-target="q7-content"
                    onClick={() => toggleQuestion('q7')}
                    type="button"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-error-container text-on-error-container flex items-center justify-center font-bold text-label-md shrink-0">
                        Q7
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-label-lg text-label-lg text-on-surface">Nested Loop Matrix Traversal</p>
                          <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">
                            Flagged
                          </span>
                        </div>
                        <span className="font-body-sm text-body-sm text-error font-medium">
                          Off-by-one boundary check error
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">
                        0% Correct
                      </span>
                      <span
                        className="material-symbols-outlined text-on-surface-variant text-[20px] transition-transform duration-200"
                        style={{ transform: openQuestions.q7 ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      >
                        expand_more
                      </span>
                    </div>
                  </button>
                  <div className={`${openQuestions.q7 ? '' : 'hidden '}px-space-md pb-space-md pt-2`} id="q7-content">
                    <div className="p-space-md rounded-xl bg-surface-container-lowest space-y-3">
                      <div className="flex items-center gap-2 text-error font-semibold font-label-md text-label-md">
                        <span className="material-symbols-outlined text-[18px]">error</span>
                        Detailed Diagnostics (Refer to AI Coach breakdown above)
                      </div>
                      <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                        When accessing <code className="font-mono text-primary">matrix[row][col]</code>, you utilized{' '}
                        <code className="font-mono text-error font-bold">col &lt;= len(matrix[row])</code>. In Python, an array of length 3 has valid indices 0, 1, and 2. Index 3 triggers{' '}
                        <code className="font-mono text-error">IndexError</code>.
                      </p>
                      <div className="p-3 bg-primary-fixed/30 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-body-sm">
                        <span className="text-primary font-medium">
                          Quick Concept: Always prefer <code className="font-mono text-on-surface">range(len(lst))</code> or strict inequality{' '}
                          <code className="font-mono text-on-surface">&lt;</code>.
                        </span>
                        <a
                          className="text-primary font-bold hover:underline font-label-sm text-label-sm shrink-0"
                          href="#launchPracticeBtn"
                          id="launchPracticeBtn"
                          onClick={openPracticeModal}
                        >
                          Practice Now →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Q10: Incorrect (Flagged) */}
                <div className="rounded-xl bg-surface overflow-hidden transition-all">
                  <button
                    className="w-full text-left p-space-md flex items-center justify-between gap-space-md hover:bg-surface-container-low transition-colors accordion-toggle max-sm:flex-wrap max-sm:gap-2 max-sm:[&>div]:w-full max-sm:[&>div:last-child]:justify-between"
                    data-target="q10-content"
                    onClick={() => toggleQuestion('q10')}
                    type="button"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-error-container text-on-error-container flex items-center justify-center font-bold text-label-md shrink-0">
                        Q10
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-label-lg text-label-lg text-on-surface">
                            Infinite Loop Detection with Sentinel Values
                          </p>
                          <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">
                            Flagged
                          </span>
                        </div>
                        <span className="font-body-sm text-body-sm text-error font-medium">
                          Missing step increment before continue keyword
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">
                        0% Correct
                      </span>
                      <span
                        className="material-symbols-outlined text-on-surface-variant text-[20px] transition-transform duration-200"
                        style={{ transform: openQuestions.q10 ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      >
                        expand_more
                      </span>
                    </div>
                  </button>
                  <div className={`${openQuestions.q10 ? '' : 'hidden '}px-space-md pb-space-md pt-2`} id="q10-content">
                    <div className="p-space-md rounded-xl bg-surface-container-lowest space-y-2">
                      <div className="flex items-center gap-2 text-error font-semibold font-label-md text-label-md">
                        <span className="material-symbols-outlined text-[18px]">error</span>
                        Diagnosis: Unreachable Increment Statement
                      </div>
                      <p className="font-body-md text-body-md text-on-surface">
                        Placing <code className="font-mono text-primary">continue</code> prior to updating{' '}
                        <code className="font-mono text-primary">i += 1</code> caused the loop condition to evaluate infinitely without reaching next iteration index.
                      </p>
                      <div className="p-2.5 rounded bg-surface-container text-on-surface-variant font-mono text-body-sm">
                        Fix: Increment <code className="text-secondary font-bold">i += 1</code> before calling{' '}
                        <code className="text-primary font-bold">continue</code> inside a while loop.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Remedial Prompt Card & Action Modal Hook */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-container to-primary p-space-xl text-on-primary shadow-xl">
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-space-lg">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold mb-3">
                    <span className="material-symbols-outlined text-[16px]">celebration</span>
                    Immediate Recovery Opportunity
                  </div>
                  <h3 className="font-headline-lg text-headline-lg font-bold text-on-primary">
                    Ready to reach 100% mastery, Miguel?
                  </h3>
                  <p className="font-body-lg text-body-lg text-on-primary-container mt-2 leading-relaxed">
                    Take the 3-minute mini-quiz curated specifically around 0-indexed while loops. Your updated score will reflect immediately in your DepEd competence dashboard.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-space-sm shrink-0">
                  <button
                    className="px-6 py-3 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed font-label-lg text-label-lg font-bold hover:bg-tertiary-fixed-dim transition-all shadow-md flex items-center justify-center gap-2"
                    id="modalLaunchBtn"
                    onClick={openPracticeModal}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">play_arrow</span>
                    <span className="">Launch Practice Drill (5 mins)</span>
                  </button>
                  <button
                    className="px-5 py-3 rounded-xl bg-primary-fixed/20 text-on-primary hover:bg-primary-fixed/30 transition-all font-label-lg text-label-lg font-semibold flex items-center justify-center gap-2"
                    id="downloadPdfBtn2"
                    onClick={triggerPdfDownload(setPdfStatus2)}
                    type="button"
                  >
                    {pdfStatus2 === 'generating' && (
                      <>
                        <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                        <span>Generating...</span>
                      </>
                    )}
                    {pdfStatus2 === 'downloaded' && (
                      <>
                        <span className="material-symbols-outlined text-[18px]">check</span>
                        <span>Downloaded!</span>
                      </>
                    )}
                    {pdfStatus2 === 'idle' && (
                      <>
                        <span className="material-symbols-outlined text-[18px]">file_download</span>
                        <span className="">Diagnostic PDF</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Navigation & Feedback History CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md pt-space-sm pb-space-lg">
              <Link
                className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label-lg text-label-lg"
                data-path="my-activities"
                to="/student/activities"
              >
                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                <span className="">Return to My Activities</span>
              </Link>
              <div className="flex items-center gap-space-md">
                <Link
                  className="inline-flex items-center gap-1.5 text-primary hover:text-primary-container transition-colors font-label-lg text-label-lg font-semibold"
                  data-path="ai-feedback-history"
                  to="/student/progress"
                >
                  <span className="">View Complete AI Feedback History</span>
                  <span className="material-symbols-outlined text-[18px]">history_edu</span>
                </Link>
              </div>
            </div>

            {/* Interactive Remedial Practice Modal */}
            <div
              className={`fixed inset-0 z-50 ${practiceModalOpen ? 'flex' : 'hidden'} bg-inverse-surface/60 backdrop-blur-sm items-center justify-center p-4`}
              id="practiceModal"
            >
              <div className="w-full max-w-xl bg-surface-container-lowest rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-space-lg bg-surface-container-high flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary">
                      <span className="material-symbols-outlined text-[22px]">fitness_center</span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">Off-by-One Mini Drill</h3>
                      <span className="font-label-sm text-label-sm text-primary">3 Quick Practice Questions • Untimed</span>
                    </div>
                  </div>
                  <button
                    className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
                    id="closeModalBtn"
                    onClick={closePracticeModal}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </button>
                </div>
                <div className="p-space-lg space-y-space-md">
                  <div className="p-space-md rounded-xl bg-surface-container-low">
                    <span className="font-label-sm text-label-sm text-primary font-bold uppercase">
                      Mini Challenge 1 of 3
                    </span>
                    <p className="font-body-md text-body-md text-on-surface mt-2 font-medium">
                      Given a matrix with 4 columns:{' '}
                      <code className="font-mono text-primary font-bold">row = [&apos;A&apos;, &apos;B&apos;, &apos;C&apos;, &apos;D&apos;]</code>. Which condition iterates safely through every item without throwing an IndexError?
                    </p>
                  </div>
                  <div className="space-y-2" id="drillOptions">
                    {DRILL_OPTIONS.map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-3 p-3.5 rounded-xl bg-surface hover:bg-surface-container cursor-pointer transition-colors"
                      >
                        <input
                          checked={drillAnswer === option.value}
                          className="w-4 h-4 text-primary"
                          name="drill_answer"
                          onChange={(e) => setDrillAnswer(e.target.value)}
                          type="radio"
                          value={option.value}
                        />
                        <span className="font-mono text-body-sm text-on-surface">{option.label}</span>
                      </label>
                    ))}
                  </div>
                  {drillFeedback === 'empty' && (
                    <div
                      className="p-3 rounded-xl font-body-sm text-body-sm bg-error-container text-on-error-container block"
                      id="drillFeedback"
                    >
                      Please choose one of the options to check your diagnostic response.
                    </div>
                  )}
                  {drillFeedback === 'correct' && (
                    <div
                      className="p-3 rounded-xl font-body-sm text-body-sm bg-secondary-container text-on-secondary-container block"
                      id="drillFeedback"
                    >
                      <strong>Spot on, Miguel!</strong> <code>while i &lt; len(row):</code> checks 0 to 3 for 4 elements, stopping safely before index 4!
                    </div>
                  )}
                  {drillFeedback === 'incorrect' && (
                    <div
                      className="p-3 rounded-xl font-body-sm text-body-sm bg-error-container text-on-error-container block"
                      id="drillFeedback"
                    >
                      <strong>Not quite!</strong> That condition allows <code>i == 4</code>, which causes Python to throw{' '}
                      <code>IndexError: list index out of range</code>.
                    </div>
                  )}
                </div>
                <div className="p-space-lg bg-surface flex items-center justify-end gap-space-sm">
                  <button
                    className="px-4 py-2.5 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container transition-colors"
                    id="closeModalSecondary"
                    onClick={closePracticeModal}
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-semibold hover:bg-primary-container transition-all shadow-sm"
                    id="submitDrillBtn"
                    onClick={handleSubmitDrill}
                    type="button"
                  >
                    {drillSubmittedCorrect ? 'Continue Drill (2/3) →' : 'Check Answer'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full bg-surface-container-lowest shadow-[0_-1px_8px_rgba(91,75,219,0.03)] py-space-lg mt-auto"></footer>
    </div>
  )
}
