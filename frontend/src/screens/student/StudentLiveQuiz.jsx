import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import BrandLogo from '../../components/BrandLogo'

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/student/dashboard', dataPath: 'dashboard' },
  { label: 'My Activities', path: '/student/activities', dataPath: 'my-activities' },
  { label: 'Code Quiz & Exercises', path: '/student/quiz', dataPath: 'code-quiz-exercises' },
  { label: 'AI Feedback History', path: '/student/feedback', dataPath: 'ai-feedback-history' },
  { label: 'My Progress & Skills', path: '/student/progress', dataPath: 'my-progress-skills' },
]

const CODE_SNIPPET = `def calculate_total(quiz_scores):
    total = 0
    i = 0
    while i <= len(quiz_scores):  # ⚠️ Line 4: Check boundary condition
        total += quiz_scores[i]
        i += 1
    return total
# Calling function:
calculate_total([18, 20, 15, 22])`

const ANSWERED_QUESTIONS = new Set([1, 2, 3])

export default function StudentLiveQuiz() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [totalSeconds, setTotalSeconds] = useState(12 * 60 + 8)
  const [currentQuestion, setCurrentQuestion] = useState(4)
  const [selectedOption, setSelectedOption] = useState('A')
  const [copied, setCopied] = useState(false)
  const copyTimeoutRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalSeconds((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current)
      }
    }
  }, [])

  const mins = Math.floor(totalSeconds / 60)
  const secs = totalSeconds % 60
  const formattedElapsed = `${mins}m ${secs < 10 ? '0' : ''}${secs}s elapsed`

  const handleCopyCode = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(CODE_SNIPPET)
      }
    } catch {
      // Clipboard fallback ignored if blocked
    }
    setCopied(true)
    if (copyTimeoutRef.current) {
      clearTimeout(copyTimeoutRef.current)
    }
    copyTimeoutRef.current = setTimeout(() => {
      setCopied(false)
    }, 1500)
  }

  const goToPrevious = () => {
    setCurrentQuestion((prev) => Math.max(1, prev - 1))
  }

  const goToNext = () => {
    setCurrentQuestion((prev) => Math.min(10, prev + 1))
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
                    to={item.path}
                    data-path={item.dataPath}
                    className={
                      isActive
                        ? 'px-3.5 py-2 bg-surface-container-high text-primary font-label-lg text-label-lg font-bold rounded-xl transition-all'
                        : 'px-3.5 py-2 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all'
                    }
                  >
                    {item.label}
                  </Link>
                )
              })}
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
            <div className="flex items-center gap-space-sm pl-1 sm:pl-2">
              <div className="hidden sm:flex items-center gap-2.5 bg-surface-container-low py-1.5 pl-2 pr-3.5 rounded-full">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
                </div>
                <div className="flex flex-col text-left">
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
                to="/login"
                title="Sign out"
              >
                <span className="material-symbols-outlined text-[20px]">logout</span>
              </Link>
              <button
                type="button"
                aria-label="Toggle navigation menu"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="xl:hidden w-10 h-10 rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-all"
              >
                <span className="material-symbols-outlined text-[22px]">
                  {mobileMenuOpen ? 'close' : 'menu'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-outline-variant/30 bg-surface/95 backdrop-blur-xl px-gutter py-3">
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={
                      isActive
                        ? 'px-3.5 py-2.5 bg-surface-container-high text-primary font-label-lg text-label-lg font-bold rounded-xl transition-all'
                        : 'px-3.5 py-2.5 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all'
                    }
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
          <div className="flex flex-col w-full gap-space-lg">
            {/* Top Quiz Header & Live Metric Bar */}
            <div className="w-full bg-surface-container-lowest rounded-2xl p-space-lg shadow-[0_4px_20px_rgba(91,75,219,0.06)] flex flex-col gap-space-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
                {/* Breadcrumb & Topic Meta */}
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm flex-wrap">
                    <Link to="/student/dashboard" className="hover:text-primary transition-colors cursor-pointer">
                      CS 101
                    </Link>
                    <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                    <Link
                      to="/student/activities"
                      className="hover:text-primary transition-colors cursor-pointer truncate"
                    >
                      Python Loops &amp; List Comprehension Diagnostic
                    </Link>
                    <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                    <span className="text-primary font-semibold">Question {currentQuestion} of 10</span>
                  </div>
                  <div className="flex items-center gap-space-sm flex-wrap">
                    <span className="font-headline-sm text-headline-sm text-on-surface">
                      Situational Code Debugging
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">psychology</span> Diagnostic Mode
                    </span>
                  </div>
                </div>
                {/* Action Cluster */}
                <div className="flex items-center gap-space-sm self-start md:self-auto flex-wrap">
                  {/* Live Autosave Status */}
                  <div
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low text-secondary font-label-sm text-label-sm"
                    id="autosave-badge"
                  >
                    <span className="material-symbols-outlined text-[16px] text-secondary">cloud_done</span>
                    <span className="">Saved to cloud 10s ago</span>
                  </div>
                  {/* Timer Pill */}
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md">
                    <span className="material-symbols-outlined text-[16px] text-tertiary-container">schedule</span>
                    <span id="elapsed-timer" className="">
                      {formattedElapsed}
                    </span>
                  </div>
                  <Link
                    to="/student/activities"
                    className="px-4 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-all flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[18px]">bookmark_border</span>
                    <span className="">Save &amp; Exit</span>
                  </Link>
                  <Link
                    to="/student/feedback"
                    className="px-5 py-2 rounded-xl bg-tertiary-fixed-dim hover:bg-tertiary-fixed text-on-tertiary-fixed font-label-lg text-label-lg font-bold transition-all shadow-[0_2px_8px_rgba(244,191,50,0.35)] flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[18px]">assignment_turned_in</span>
                    <span className="">Submit Quiz</span>
                  </Link>
                </div>
              </div>
              {/* Progress Bar with Track Indicator */}
              <div className="flex flex-col gap-1.5 pt-1">
                <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm flex-wrap gap-2">
                  <span className="flex items-center gap-1 font-semibold text-primary">
                    <span className="material-symbols-outlined text-[16px]">trending_up</span> 40% Completed (4 of 10
                    Answered)
                  </span>
                  <span className="text-on-surface-variant">Target Pace: ~1.5 min / question</span>
                </div>
                <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                    style={{ width: '40%' }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Main Question Arena & Diagnostic Workspace (Asymmetric Layout) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
              {/* Left Column: Scenario, Syntax Viewer & Options (8 cols) */}
              <div className="lg:col-span-8 flex flex-col gap-space-lg">
                {/* Scenario Context & Problem Header */}
                <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-[0_4px_20px_rgba(91,75,219,0.06)] flex flex-col gap-space-md">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-primary text-on-primary font-headline-sm text-headline-sm flex items-center justify-center text-sm font-bold shadow-sm">
                        {currentQuestion}
                      </span>
                      <span className="font-headline-sm text-headline-sm text-on-surface">
                        Scenario: Off-by-One Boundary Condition in List Accumulation
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">bug_report</span> IndexError: Index out
                      of range
                    </span>
                  </div>
                  <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                    Miguel is writing a function to calculate the running sum of all student scores in{' '}
                    <code className="px-2 py-0.5 rounded-md bg-surface-container font-mono text-sm text-primary font-semibold">
                      quiz_scores = [18, 20, 15, 22]
                    </code>
                    . However, when executing the script below, the Python interpreter terminates abruptly with an
                    unhandled{' '}
                    <code className="px-2 py-0.5 rounded-md bg-error-container text-on-error-container font-mono text-sm font-bold">
                      IndexError
                    </code>{' '}
                    on the final loop iteration.
                  </p>
                  {/* Syntax Highlighted Code Viewer (Dark Terminal Card) */}
                  <div className="rounded-xl overflow-hidden shadow-lg bg-inverse-surface flex flex-col">
                    {/* Terminal Tab Bar */}
                    <div className="px-4 py-2.5 bg-on-background flex items-center justify-between text-surface-container-high">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <span className="w-3 h-3 rounded-full bg-error opacity-80 inline-block"></span>
                          <span className="w-3 h-3 rounded-full bg-tertiary-fixed-dim opacity-80 inline-block"></span>
                          <span className="w-3 h-3 rounded-full bg-secondary opacity-80 inline-block"></span>
                        </div>
                        <span className="ml-2 font-mono text-xs tracking-wider text-outline-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">code</span> accumulator_bug.py
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-label-sm text-label-sm text-outline-variant uppercase">Python 3.11</span>
                        <button
                          onClick={handleCopyCode}
                          className="text-outline-variant hover:text-surface flex items-center gap-1 text-xs transition-colors"
                          title="Copy code"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[15px]">
                            {copied ? 'check' : 'content_copy'}
                          </span>
                          {copied && <span className="font-label-sm text-label-sm">Copied</span>}
                        </button>
                      </div>
                    </div>
                    {/* Code Content with Line Numbers & Bug Highlight */}
                    <div className="p-4 font-mono text-xs md:text-sm leading-6 overflow-x-auto text-surface-container-lowest">
                      <div className="flex items-center gap-4 group">
                        <span className="text-outline select-none w-6 text-right font-mono opacity-60">1</span>
                        <span>
                          <span className="text-secondary-fixed">def</span>{' '}
                          <span className="text-tertiary-fixed font-bold">calculate_total</span>
                          <span className="text-surface-container-high">(quiz_scores):</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-4 group">
                        <span className="text-outline select-none w-6 text-right font-mono opacity-60">2</span>
                        <span className="pl-4 text-surface-container-highest">
                          total = <span className="text-secondary-fixed-dim">0</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-4 group">
                        <span className="text-outline select-none w-6 text-right font-mono opacity-60">3</span>
                        <span className="pl-4 text-surface-container-highest">
                          i = <span className="text-secondary-fixed-dim">0</span>
                        </span>
                      </div>
                      {/* Faulty Line Highlighted */}
                      <div className="flex items-center gap-4 bg-error/20 -mx-4 px-4 py-0.5 rounded transition-colors group">
                        <span className="text-error select-none w-6 text-right font-mono font-bold">4</span>
                        <span className="pl-4 text-surface-container-highest">
                          <span className="text-secondary-fixed">while</span> i &lt;={' '}
                          <span className="text-tertiary-fixed">len</span>(quiz_scores):{' '}
                          <span className="text-tertiary-fixed-dim font-sans text-xs italic ml-2">
                            # ⚠️ Line 4: Check boundary condition
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center gap-4 group">
                        <span className="text-outline select-none w-6 text-right font-mono opacity-60">5</span>
                        <span className="pl-8 text-surface-container-highest">total += quiz_scores[i]</span>
                      </div>
                      <div className="flex items-center gap-4 group">
                        <span className="text-outline select-none w-6 text-right font-mono opacity-60">6</span>
                        <span className="pl-8 text-surface-container-highest">
                          i += <span className="text-secondary-fixed-dim">1</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-4 group">
                        <span className="text-outline select-none w-6 text-right font-mono opacity-60">7</span>
                        <span>
                          <span className="pl-4 text-secondary-fixed">return</span>{' '}
                          <span className="text-surface-container-highest">total</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-4 group">
                        <span className="text-outline select-none w-6 text-right font-mono opacity-60">8</span>
                        <span className="text-outline select-none italic text-xs"># Calling function:</span>
                      </div>
                      <div className="flex items-center gap-4 group">
                        <span className="text-outline select-none w-6 text-right font-mono opacity-60">9</span>
                        <span className="text-surface-container-highest">
                          calculate_total([<span className="text-secondary-fixed-dim">18</span>,{' '}
                          <span className="text-secondary-fixed-dim">20</span>,{' '}
                          <span className="text-secondary-fixed-dim">15</span>,{' '}
                          <span className="text-secondary-fixed-dim">22</span>])
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Terminal Output Trace preview */}
                  <div className="p-3.5 rounded-xl bg-surface-container-low flex items-start gap-3">
                    <span className="material-symbols-outlined text-error text-[20px] flex-shrink-0 mt-0.5">
                      terminal
                    </span>
                    <div className="flex flex-col gap-0.5 font-mono text-xs">
                      <span className="text-error font-bold">Traceback (most recent call last):</span>
                      <span className="text-on-surface-variant">
                        File &quot;accumulator_bug.py&quot;, line 5, in calculate_total
                      </span>
                      <span className="text-error">IndexError: list index out of range (i = 4, len = 4)</span>
                    </div>
                  </div>
                </div>

                {/* Multiple Choice Options Arena */}
                <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-[0_4px_20px_rgba(91,75,219,0.06)] flex flex-col gap-space-md">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
                        Diagnostic Selection
                      </span>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">
                        Identify the root cause &amp; select the appropriate fix:
                      </h3>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-full">
                      Single Choice
                    </span>
                  </div>
                  {/* Option Cards Group */}
                  <div aria-label="Fix Options" className="flex flex-col gap-space-sm" role="radiogroup">
                    {/* Option A */}
                    <label
                      onClick={() => setSelectedOption('A')}
                      className={`relative flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all group ${
                        selectedOption === 'A'
                          ? 'bg-surface-container-low shadow-[0_2px_12px_rgba(91,75,219,0.08)] hover:bg-surface-container'
                          : 'bg-surface-container-lowest hover:bg-surface-container-low'
                      }`}
                    >
                      <div className="pt-0.5 flex-shrink-0">
                        <input
                          checked={selectedOption === 'A'}
                          onChange={() => setSelectedOption('A')}
                          className="sr-only peer"
                          name="debug-option"
                          type="radio"
                          value="A"
                        />
                        {selectedOption === 'A' ? (
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-sm ring-4 ring-primary-fixed peer-checked:bg-primary">
                            <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:bg-surface-container-high transition-colors">
                            <span className="font-label-sm text-label-sm font-bold">A</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-label-md text-label-md ${
                              selectedOption === 'A' ? 'text-primary font-bold' : 'text-on-surface font-semibold'
                            }`}
                          >
                            Option A
                          </span>
                          <span className="px-2 py-0.2 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
                            Recommended fix
                          </span>
                        </div>
                        <p
                          className={`font-body-md text-body-md leading-snug ${
                            selectedOption === 'A' ? 'text-on-surface' : 'text-on-surface-variant'
                          }`}
                        >
                          Change{' '}
                          <code className="px-1.5 py-0.5 rounded bg-surface-container font-mono text-xs text-primary font-semibold">
                            while i &lt;= len(quiz_scores):
                          </code>{' '}
                          to{' '}
                          <code className="px-1.5 py-0.5 rounded bg-surface-container font-mono text-xs text-primary font-semibold">
                            while i &lt; len(quiz_scores):
                          </code>{' '}
                          because Python lists are 0-indexed and the last valid element resides at{' '}
                          <code className="px-1.5 py-0.5 rounded bg-surface-container font-mono text-xs text-primary font-semibold">
                            len - 1
                          </code>
                          .
                        </p>
                      </div>
                    </label>

                    {/* Option B */}
                    <label
                      onClick={() => setSelectedOption('B')}
                      className={`relative flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all group ${
                        selectedOption === 'B'
                          ? 'bg-surface-container-low shadow-[0_2px_12px_rgba(91,75,219,0.08)] hover:bg-surface-container'
                          : 'bg-surface-container-lowest hover:bg-surface-container-low'
                      }`}
                    >
                      <div className="pt-0.5 flex-shrink-0">
                        <input
                          checked={selectedOption === 'B'}
                          onChange={() => setSelectedOption('B')}
                          className="sr-only peer"
                          name="debug-option"
                          type="radio"
                          value="B"
                        />
                        {selectedOption === 'B' ? (
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-sm ring-4 ring-primary-fixed peer-checked:bg-primary">
                            <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:bg-surface-container-high transition-colors">
                            <span className="font-label-sm text-label-sm font-bold">B</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 min-w-0 flex-1">
                        <span
                          className={`font-label-md text-label-md ${
                            selectedOption === 'B' ? 'text-primary font-bold' : 'text-on-surface font-semibold'
                          }`}
                        >
                          Option B
                        </span>
                        <p
                          className={`font-body-md text-body-md leading-snug ${
                            selectedOption === 'B' ? 'text-on-surface' : 'text-on-surface-variant'
                          }`}
                        >
                          Initialize{' '}
                          <code className="px-1.5 py-0.5 rounded bg-surface-container font-mono text-xs">
                            total = None
                          </code>{' '}
                          instead of{' '}
                          <code className="px-1.5 py-0.5 rounded bg-surface-container font-mono text-xs">
                            total = 0
                          </code>{' '}
                          at line 2 to allow the accumulator to handle dynamic type assignment.
                        </p>
                      </div>
                    </label>

                    {/* Option C */}
                    <label
                      onClick={() => setSelectedOption('C')}
                      className={`relative flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all group ${
                        selectedOption === 'C'
                          ? 'bg-surface-container-low shadow-[0_2px_12px_rgba(91,75,219,0.08)] hover:bg-surface-container'
                          : 'bg-surface-container-lowest hover:bg-surface-container-low'
                      }`}
                    >
                      <div className="pt-0.5 flex-shrink-0">
                        <input
                          checked={selectedOption === 'C'}
                          onChange={() => setSelectedOption('C')}
                          className="sr-only peer"
                          name="debug-option"
                          type="radio"
                          value="C"
                        />
                        {selectedOption === 'C' ? (
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-sm ring-4 ring-primary-fixed peer-checked:bg-primary">
                            <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:bg-surface-container-high transition-colors">
                            <span className="font-label-sm text-label-sm font-bold">C</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 min-w-0 flex-1">
                        <span
                          className={`font-label-md text-label-md ${
                            selectedOption === 'C' ? 'text-primary font-bold' : 'text-on-surface font-semibold'
                          }`}
                        >
                          Option C
                        </span>
                        <p
                          className={`font-body-md text-body-md leading-snug ${
                            selectedOption === 'C' ? 'text-on-surface' : 'text-on-surface-variant'
                          }`}
                        >
                          Increment the counter at the beginning of the loop body before adding{' '}
                          <code className="px-1.5 py-0.5 rounded bg-surface-container font-mono text-xs">
                            quiz_scores[i]
                          </code>{' '}
                          so line 4 reaches the ceiling index safely.
                        </p>
                      </div>
                    </label>

                    {/* Option D */}
                    <label
                      onClick={() => setSelectedOption('D')}
                      className={`relative flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all group ${
                        selectedOption === 'D'
                          ? 'bg-surface-container-low shadow-[0_2px_12px_rgba(91,75,219,0.08)] hover:bg-surface-container'
                          : 'bg-surface-container-lowest hover:bg-surface-container-low'
                      }`}
                    >
                      <div className="pt-0.5 flex-shrink-0">
                        <input
                          checked={selectedOption === 'D'}
                          onChange={() => setSelectedOption('D')}
                          className="sr-only peer"
                          name="debug-option"
                          type="radio"
                          value="D"
                        />
                        {selectedOption === 'D' ? (
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-sm ring-4 ring-primary-fixed peer-checked:bg-primary">
                            <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:bg-surface-container-high transition-colors">
                            <span className="font-label-sm text-label-sm font-bold">D</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 min-w-0 flex-1">
                        <span
                          className={`font-label-md text-label-md ${
                            selectedOption === 'D' ? 'text-primary font-bold' : 'text-on-surface font-semibold'
                          }`}
                        >
                          Option D
                        </span>
                        <p
                          className={`font-body-md text-body-md leading-snug ${
                            selectedOption === 'D' ? 'text-on-surface' : 'text-on-surface-variant'
                          }`}
                        >
                          Replace the while loop construct with{' '}
                          <code className="px-1.5 py-0.5 rounded bg-surface-container font-mono text-xs">
                            for i in quiz_scores:
                          </code>{' '}
                          and evaluate item references using{' '}
                          <code className="px-1.5 py-0.5 rounded bg-surface-container font-mono text-xs">
                            quiz_scores[total]
                          </code>
                          .
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column: Question Navigator Matrix & Aral Coach Diagnostic Card (4 cols) */}
              <div className="lg:col-span-4 flex flex-col gap-space-lg sticky top-24">
                {/* Question Navigation Grid Matrix Card */}
                <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-[0_4px_20px_rgba(91,75,219,0.06)] flex flex-col gap-space-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[20px]">grid_view</span>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface">Question Matrix</h4>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                      10 Questions Total
                    </span>
                  </div>
                  {/* 10 Item Chip Grid */}
                  <div className="grid grid-cols-5 gap-2.5">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                      const isCurrent = currentQuestion === num
                      const isAnswered = ANSWERED_QUESTIONS.has(num)

                      if (isCurrent) {
                        return (
                          <button
                            key={num}
                            onClick={() => setCurrentQuestion(num)}
                            className="h-11 rounded-xl bg-primary text-on-primary font-bold shadow-[0_4px_12px_rgba(91,75,219,0.35)] flex flex-col items-center justify-center font-label-md text-label-md ring-4 ring-primary-fixed"
                            title={`Question ${num} (Current Active)`}
                            type="button"
                          >
                            <span className="leading-none text-base">{num}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed mt-0.5"></span>
                          </button>
                        )
                      }

                      if (isAnswered) {
                        return (
                          <button
                            key={num}
                            onClick={() => setCurrentQuestion(num)}
                            className="h-11 rounded-xl bg-surface-container-high text-primary hover:bg-primary-fixed transition-all flex flex-col items-center justify-center font-label-md text-label-md relative"
                            title={`Question ${num} (Answered)`}
                            type="button"
                          >
                            <span className="leading-none">{num}</span>
                            <span className="material-symbols-outlined text-[13px] text-secondary leading-none">
                              check
                            </span>
                          </button>
                        )
                      }

                      return (
                        <button
                          key={num}
                          onClick={() => setCurrentQuestion(num)}
                          className="h-11 rounded-xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all flex items-center justify-center font-label-md text-label-md"
                          title={`Question ${num} (Unanswered)`}
                          type="button"
                        >
                          {num}
                        </button>
                      )
                    })}
                  </div>
                  {/* Matrix Legend */}
                  <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm pt-2 bg-surface-container-low/50 p-2.5 rounded-xl">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                      <span className="">Answered (3)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                      <span className="">Current (1)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-outline-variant"></span>
                      <span className="">Remaining (6)</span>
                    </div>
                  </div>
                </div>

                {/* Socratic AI Diagnostic Coach Policy Callout */}
                <div className="bg-gradient-to-br from-surface-container to-surface-container-low rounded-2xl p-space-lg shadow-[0_4px_16px_rgba(91,75,219,0.06)] flex flex-col gap-space-sm relative overflow-hidden">
                  <div className="flex items-center gap-2 text-primary font-headline-sm text-headline-sm">
                    <span className="w-8 h-8 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shadow-sm">
                      <span className="material-symbols-outlined text-[18px]">psychology_alt</span>
                    </span>
                    <span className="">Aral Coach Diagnostic</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Submit your solution to receive instant personalized Socratic explanation from Aral Coach within 5
                    seconds.
                  </p>
                  <div className="flex items-center gap-2 pt-1 font-label-sm text-label-sm text-secondary font-semibold">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    <span className="">DepEd CS-Diagnostic Rubric Activated</span>
                  </div>
                  {/* Student Motivation Stat Bubble */}
                  <div className="mt-2 p-3 rounded-xl bg-surface-container-lowest flex items-center gap-3 shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed font-bold flex-shrink-0">
                      <span className="material-symbols-outlined text-[18px]">tips_and_updates</span>
                    </div>
                    <div className="flex flex-col text-xs leading-tight">
                      <span className="font-bold text-on-surface">Bug-Hunter Mastery</span>
                      <span className="text-on-surface-variant">
                        You solved 2 out of 3 loop logic scenarios correctly!
                      </span>
                    </div>
                  </div>
                </div>

                {/* Primary Action Flow: Previous / Next Navigation Buttons */}
                <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-[0_4px_16px_rgba(91,75,219,0.06)] flex items-center justify-between gap-space-sm">
                  <button
                    onClick={goToPrevious}
                    disabled={currentQuestion <= 1}
                    className="flex-1 py-3 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high disabled:opacity-50 text-on-surface font-label-lg text-label-lg transition-all flex items-center justify-center gap-1.5"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                    <span className="">Previous</span>
                  </button>
                  <button
                    onClick={goToNext}
                    disabled={currentQuestion >= 10}
                    className="flex-1 py-3 px-4 rounded-xl bg-primary hover:bg-primary-container disabled:opacity-50 text-on-primary font-label-lg text-label-lg font-bold transition-all shadow-[0_4px_14px_rgba(91,75,219,0.3)] flex items-center justify-center gap-1.5 group"
                    type="button"
                  >
                    <span className="">Next</span>
                    <span className="material-symbols-outlined text-[20px] group-hover:translate-x-0.5 transition-transform">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
