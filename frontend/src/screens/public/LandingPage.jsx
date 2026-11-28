import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BrandLogo from '../../components/BrandLogo'
import Avatar from '../../components/ui/Avatar'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import { api } from '../../api/client'
import { describeApiError } from '../../components/DataState'

const CURRENT_YEAR = new Date().getFullYear()

const PREVIEW_OPTIONS = [
  {
    id: 'A',
    label: 'A) Prints 88, 92, 79, 95 then terminates',
    tag: 'Normal loop',
    tone: 'nudge',
    badgeLabel: 'Socratic Nudge',
    coachText:
      'Not quite, Miguel — check range(len(grades) + 1) carefully. Since len(grades) is 4, what is the final value of i, and does grades have an element at that index?',
    statusIcon: 'help',
    statusTitle: 'Check Boundary:',
    statusDesc: 'Compare len(grades) against valid 0-based indices',
    nextStep: 'Trace the loop variable i on its final iteration',
    mastery: '68%',
  },
  {
    id: 'B',
    label: 'B) Prints all 4 grades then throws IndexError',
    tag: 'Runtime boundary',
    tone: 'mastered',
    badgeLabel: 'Spot-On Diagnostic',
    coachText:
      'Spot-on diagnostic, Miguel! len(grades) is 4, so range(5) reaches index 4 where grades[4] raises an IndexError. Using range(len(grades)) or iterating directly with for grade in grades: keeps indices within 0 to 3.',
    statusIcon: 'check_circle',
    statusTitle: 'Mastered:',
    statusDesc: 'List Off-by-One Boundaries & Index Errors',
    nextStep: 'Nested list iteration and 2D arrays',
    mastery: '92%',
  },
  {
    id: 'C',
    label: 'C) SyntaxError on line 3',
    tag: 'Syntax check',
    tone: 'nudge',
    badgeLabel: 'Socratic Nudge',
    coachText:
      'Look again at line 3 — print(grades[i]) is valid Python syntax and properly indented. The bug happens at runtime on the last pass of the loop. What indices does range(len(grades) + 1) generate?',
    statusIcon: 'help',
    statusTitle: 'Check Runtime:',
    statusDesc: 'Distinguish syntax errors from runtime indexing bugs',
    nextStep: 'List the exact numbers produced by range(5)',
    mastery: '64%',
  },
]

const GUARDRAILS = [
  {
    metric: '<5s',
    color: 'text-tertiary-fixed',
    title: 'Diagnostic Target',
    subtitle: 'Immediate Socratic feedback',
  },
  {
    metric: '0',
    color: 'text-secondary-fixed',
    title: 'Answer Leaks',
    subtitle: 'Hints without code spoilers',
  },
  {
    metric: '70%',
    color: 'text-tertiary-fixed',
    title: 'Default Intervention Threshold',
    subtitle: 'Flags students needing a nudge',
  },
  {
    metric: 'RA 10173',
    color: 'text-on-primary',
    title: 'Philippine Data Privacy Act of 2012',
    subtitle: 'Institutional student data protection',
  },
]

export default function LandingPage() {
  const [demoOpen, setDemoOpen] = useState(false)
  const [productTab, setProductTab] = useState('students')
  const [selectedOption, setSelectedOption] = useState('A')
  const [pilotEmail, setPilotEmail] = useState('')
  const [pilotState, setPilotState] = useState('idle')
  const [pilotError, setPilotError] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!demoOpen) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setDemoOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [demoOpen])

  const activeDiagnosis =
    PREVIEW_OPTIONS.find((opt) => opt.id === selectedOption) || PREVIEW_OPTIONS[0]

  const handlePilotSubmit = async (event) => {
    event.preventDefault()
    if (pilotState === 'sending') return
    const trimmed = pilotEmail.trim()
    if (!trimmed || !trimmed.includes('@')) {
      setPilotState('error')
      setPilotError('Please enter a valid school or educator email address.')
      return
    }
    setPilotState('sending')
    setPilotError(null)
    try {
      await api.public.pilotInquiry({ email: trimmed })
      setPilotState('success')
      setPilotEmail('')
    } catch (error) {
      setPilotState('error')
      setPilotError(describeApiError(error)?.message || error.message)
    }
  }

  return (
    <div className="bg-background text-on-surface font-body-md text-body-md min-h-screen flex flex-col antialiased selection:bg-primary-fixed selection:text-on-primary-fixed">
      <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/50">
        <div className="h-20 max-w-[1120px] mx-auto px-4 lg:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <BrandLogo to="/" />
            <nav className="hidden lg:flex items-center gap-1" aria-label="Primary navigation">
              <a className="px-3 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-lg text-label-lg" href="#how-it-works">
                How It Works
              </a>
              <a
                className="px-3 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-lg text-label-lg"
                href="#ecosystem"
                onClick={() => setProductTab('students')}
              >
                For Students
              </a>
              <a
                className="px-3 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-lg text-label-lg"
                href="#ecosystem"
                onClick={() => setProductTab('teachers')}
              >
                For Teachers
              </a>
              <a className="px-3 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-lg text-label-lg" href="#topics">
                Topics
              </a>
              <a className="px-3 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-lg text-label-lg" href="#pilot-signup">
                Pilot
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Button className="hidden sm:inline-flex" to="/login" variant="ghost">
              Log In
            </Button>
            <a
              className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 min-h-[44px] rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-semibold shadow-sm hover:bg-primary-container transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              href="#pilot-signup"
            >
              Start Free Classroom Pilot
            </a>
            <button
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="lg:hidden min-w-[44px] min-h-[44px] w-11 h-11 rounded-xl bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors shrink-0 cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
              title="Menu"
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]">
                {menuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-outline-variant/50 bg-surface/95 backdrop-blur-xl px-4 py-4 flex flex-col gap-1">
            <a
              className="flex items-center justify-center min-h-[44px] px-3 py-2.5 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-semibold"
              href="#pilot-signup"
              onClick={() => setMenuOpen(false)}
            >
              Start Free Classroom Pilot
            </a>
            <Link
              className="flex items-center min-h-[44px] px-3 py-2.5 rounded-xl text-on-surface hover:bg-surface-container transition-colors font-label-lg text-label-lg"
              onClick={() => setMenuOpen(false)}
              to="/login"
            >
              Log In
            </Link>
            {[
              { label: 'How It Works', href: '#how-it-works' },
              { label: 'For Students', href: '#ecosystem', tab: 'students' },
              { label: 'For Teachers', href: '#ecosystem', tab: 'teachers' },
              { label: 'Topics', href: '#topics' },
              { label: 'Pilot Signup', href: '#pilot-signup' },
            ].map((item) => (
              <a
                className="flex items-center min-h-[44px] px-3 py-2.5 rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-lg text-label-lg"
                href={item.href}
                key={item.label}
                onClick={() => {
                  if (item.tab) setProductTab(item.tab)
                  setMenuOpen(false)
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </header>

      <main className="w-full pt-20 bg-background flex-1">
        <div className="flex flex-col w-full">
          {/* HERO SECTION */}
          <section className="relative w-full overflow-hidden pb-20 lg:pb-28 pt-8 lg:pt-14">
            <div className="relative max-w-[1120px] mx-auto px-4 lg:px-6 flex flex-col items-center">
              <Badge className="mb-6" tone="ai">
                AI Coding Diagnostics · Instant Socratic Feedback
              </Badge>
              <h1 className="font-display-lg text-display-lg-mobile lg:text-display-lg text-on-surface text-center max-w-4xl tracking-tight leading-tight mb-5 text-balance">
                Personalized AI Tutoring &amp; Instant Diagnostic Feedback for{' '}
                <span className="text-primary">Every Student Coder.</span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant text-center max-w-[65ch] mb-8 leading-relaxed">
                Aralytics empowers Computer Science teachers to spot programming misconceptions in seconds and guides
                student coders with instant, empathetic step-by-step Socratic hints on Python, loops, and logic errors.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mb-6">
                <a
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] rounded-2xl bg-primary text-on-primary font-label-lg text-label-lg font-semibold shadow-sm hover:bg-primary-container transition-all"
                  href="#pilot-signup"
                >
                  <span>Launch Free School Pilot</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </a>
                <Button onClick={() => setDemoOpen(true)} size="lg" variant="secondary">
                  <span className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                  </span>
                  <span>Watch 2-Min Classroom Demo</span>
                </Button>
              </div>

              {/* Hero helper row surfacing Activate School Key alongside demo note */}
              <div className="w-full max-w-2xl py-2.5 px-4 rounded-2xl bg-surface-container-low border border-outline-variant/50 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center mb-12">
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Have a school-issued key?{' '}
                  <Link className="text-primary font-semibold hover:underline" to="/register">
                    Activate School Key
                  </Link>
                </span>
                <span aria-hidden="true" className="text-outline-variant hidden sm:inline">•</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary text-[16px]">terminal</span>
                  <span>Interactive Python diagnostic preview below — click A, B, or C</span>
                </span>
              </div>

              {/* INTERACTIVE SAMPLE CLASSROOM PREVIEW */}
              <Card variant="elevated" className="w-full p-5 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-5 mb-6 border-b border-outline-variant/40">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                    <span className="font-label-md text-label-md text-on-surface font-semibold">
                      Intro to Python · Sample Classroom Preview
                    </span>
                  </div>
                  <Badge dot={false} tone="neutral">Module 3: For-Loops &amp; Indexing</Badge>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                  <div className="lg:col-span-6 flex flex-col justify-between bg-surface-container-low p-5 sm:p-6 rounded-2xl border border-outline-variant/40">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-primary font-label-sm text-label-sm font-bold tracking-wide uppercase">
                          Question 4 of 5 · Scenario
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">quiz</span> Interactive Check
                        </span>
                      </div>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface mb-2">
                        Predict the output and identify any runtime issue:
                      </h2>

                      <pre className="p-4 rounded-xl bg-ink text-surface text-left my-3 font-mono text-[13px] leading-relaxed overflow-x-auto">
                        <code>
                          <span className="text-primary-fixed-dim"># Iterate through student grades{'\n'}</span>
                          {'grades = [88, 92, 79, 95]\n'}
                          {'for i in range(len(grades) + 1):\n'}
                          {'    print(grades[i])'}
                        </code>
                      </pre>

                      <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
                        <em>Hint:</em> Check zero-based indexing boundaries in Python lists.
                      </p>

                      <div className="space-y-2.5" role="group" aria-label="Sample quiz options">
                        {PREVIEW_OPTIONS.map((opt) => {
                          const isSelected = selectedOption === opt.id
                          return (
                            <button
                              aria-pressed={isSelected}
                              className={`w-full min-h-[44px] p-3.5 rounded-xl bg-surface-container-lowest flex items-center justify-between gap-2 text-left transition-all cursor-pointer ${
                                isSelected
                                  ? 'border-2 border-primary shadow-xs'
                                  : 'border border-outline-variant/60 hover:border-primary/50'
                              }`}
                              key={opt.id}
                              onClick={() => setSelectedOption(opt.id)}
                              type="button"
                            >
                              <span
                                className={`font-body-md text-body-md ${
                                  isSelected ? 'font-semibold text-primary' : 'text-on-surface'
                                }`}
                              >
                                {opt.label}
                              </span>
                              <span className="text-xs text-on-surface-variant shrink-0">
                                {isSelected ? 'Selected' : opt.tag}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div className="pt-4 mt-5 border-t border-outline-variant/40 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                      <span>Sample Student View (Grade 10)</span>
                      <span>Click A, B, or C to test Aral Coach</span>
                    </div>
                  </div>

                  <div className="lg:col-span-6 flex flex-col justify-between bg-surface-container-lowest p-5 sm:p-6 rounded-2xl border border-outline-variant/50">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-5 pb-4 border-b border-outline-variant/40">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center font-bold">
                            <span className="material-symbols-outlined text-[24px]">smart_toy</span>
                          </div>
                          <div>
                            <div className="font-label-lg text-label-lg text-on-surface font-bold">Aral Coach AI</div>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">
                              Socratic code diagnostic feedback
                            </span>
                          </div>
                        </div>
                        <Badge tone={activeDiagnosis.tone}>{activeDiagnosis.badgeLabel}</Badge>
                      </div>

                      <div className="p-4 rounded-xl bg-surface-container-low mb-5" aria-live="polite">
                        <p className="font-body-md text-body-md text-on-surface leading-relaxed" id="aral-coach-response">
                          “{activeDiagnosis.coachText}”
                        </p>
                      </div>

                      <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-container-low/70 text-on-surface font-label-sm text-label-sm">
                          <span
                            className={`material-symbols-outlined text-[18px] ${
                              activeDiagnosis.tone === 'mastered' ? 'text-secondary' : 'text-warn'
                            }`}
                          >
                            {activeDiagnosis.statusIcon}
                          </span>
                          <span>
                            <strong>{activeDiagnosis.statusTitle}</strong> {activeDiagnosis.statusDesc}
                          </span>
                        </div>
                        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-container-low/70 text-on-surface font-label-sm text-label-sm">
                          <span className="material-symbols-outlined text-primary text-[18px]">lightbulb</span>
                          <span>
                            <strong>Next Step:</strong> {activeDiagnosis.nextStep}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-outline-variant/40 flex items-center justify-between gap-3">
                      <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                        Topic Mastery: <strong>{activeDiagnosis.mastery}</strong>
                      </span>
                      <Button size="sm" to="/student/quiz" variant="primary">
                        <span>Try Live Quiz</span>
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* KEY VALUE PILLARS (3-Column Grid) */}
          <section className="w-full py-20 bg-surface-container-low/40 scroll-mt-24" id="how-it-works">
            <div className="max-w-[1120px] mx-auto px-4 lg:px-6">
              <div className="text-center max-w-2xl mx-auto mb-14">
                <h2 className="font-headline-lg text-headline-lg text-on-surface text-balance">
                  Built to fix coding roadblocks before students give up.
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-3 leading-relaxed">
                  CS classrooms are full of silent frustration. Aralytics provides immediate AI feedback and automated
                  triage so teachers can rescue struggling coders early.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card variant="elevated" className="p-7 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary mb-5">
                      <span className="material-symbols-outlined text-[24px]">bolt</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2.5">
                      Instant AI Diagnostic Feedback
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Within seconds of code submission, students receive tailored diagnostic explanations identifying
                      syntax bugs, logic errors, and variable scope mistakes without spoiling solutions.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-outline-variant/40 flex items-center gap-2 text-primary font-label-sm text-label-sm font-semibold">
                    <span className="material-symbols-outlined text-[16px]">check</span>
                    <span>Eliminates debugger anxiety</span>
                  </div>
                </Card>

                <Card variant="elevated" className="p-7 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-status-ok-tint flex items-center justify-center text-secondary mb-5">
                      <span className="material-symbols-outlined text-[24px]">dashboard_customize</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2.5">
                      Teacher Remedial Triage
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Live cluster view flags students stuck on loops, conditions, or recursion. Teachers can
                      immediately dispatch focused remedial exercises or pair students with peer tutors.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-outline-variant/40 flex items-center gap-2 text-secondary font-label-sm text-label-sm font-semibold">
                    <span className="material-symbols-outlined text-[16px]">check</span>
                    <span>Instant lab section visibility</span>
                  </div>
                </Card>

                <Card variant="elevated" className="p-7 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-warn-tint flex items-center justify-center text-warn mb-5">
                      <span className="material-symbols-outlined text-[24px]">quiz</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2.5">
                      Scenario &amp; Logic Assessments
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Assess deep conceptual programming understanding with scenario questions, trace tables, and
                      bug-hunting drills aligned to fundamental computing standards.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-outline-variant/40 flex items-center gap-2 text-warn font-label-sm text-label-sm font-semibold">
                    <span className="material-symbols-outlined text-[16px]">check</span>
                    <span>Deep conceptual mastery</span>
                  </div>
                </Card>
              </div>
            </div>
          </section>

          {/* DUAL-TAB PRODUCT PREVIEW ('For Students' vs 'For Teachers') */}
          <section className="w-full py-20 lg:py-28 scroll-mt-24" id="ecosystem">
            <div className="max-w-[1120px] mx-auto px-4 lg:px-6">
              <div className="flex flex-col items-center text-center mb-12">
                <h2 className="font-headline-lg text-headline-lg text-on-surface text-balance">
                  Explore the Aralytics Ecosystem
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mt-3 leading-relaxed">
                  Toggle between the low-pressure learner feed and the command center built for CS educators.
                </p>
                <div
                  aria-label="Product perspective"
                  className="mt-7 inline-flex p-1 rounded-full bg-surface-container-low border border-outline-variant/60"
                  role="tablist"
                >
                  <button
                    aria-controls="tab-content-students"
                    aria-selected={productTab === 'students'}
                    className={`min-h-[44px] px-5 py-2 rounded-full ${
                      productTab === 'students'
                        ? 'bg-surface-container-lowest text-primary shadow-xs'
                        : 'text-on-surface-variant hover:text-on-surface'
                    } font-label-lg text-label-lg font-semibold transition-all flex items-center gap-2 cursor-pointer`}
                    id="tab-btn-students"
                    onClick={() => setProductTab('students')}
                    role="tab"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">backpack</span>
                    <span>Student Experience</span>
                  </button>
                  <button
                    aria-controls="tab-content-teachers"
                    aria-selected={productTab === 'teachers'}
                    className={`min-h-[44px] px-5 py-2 rounded-full ${
                      productTab === 'teachers'
                        ? 'bg-surface-container-lowest text-primary shadow-xs'
                        : 'text-on-surface-variant hover:text-on-surface'
                    } font-label-lg text-label-lg font-semibold transition-all flex items-center gap-2 cursor-pointer`}
                    id="tab-btn-teachers"
                    onClick={() => setProductTab('teachers')}
                    role="tab"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">co_present</span>
                    <span>Teacher &amp; Adviser Hub</span>
                  </button>
                </div>
              </div>

              <Card
                aria-labelledby="tab-btn-students"
                className={`p-6 sm:p-10 ${productTab === 'students' ? '' : 'hidden'}`}
                id="tab-content-students"
                role="tabpanel"
                variant="elevated"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-5 space-y-5">
                    <Badge dot={false} tone="neutral">Interactive Code Companion</Badge>
                    <h3 className="font-headline-md text-headline-md text-on-surface">
                      Focused micro-drills that turn coding intimidation into mastery.
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Beginner coders often hesitate to ask questions during lab. Aral Coach gives friendly step-by-step
                      guidance in English and Taglish, breaking down error logs into clear mental models.
                    </p>
                    <ul className="space-y-3 font-body-md text-body-md text-on-surface">
                      <li className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">check_circle</span>
                        <span><strong>Line-by-Line Diagnostics:</strong> Immediate explanations for SyntaxError, TypeError, and logic flaws.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">check_circle</span>
                        <span><strong>Mastery Streaks:</strong> Quick drills for functions, loops, lists, and OOP concepts.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">check_circle</span>
                        <span><strong>Low-Bandwidth Ready:</strong> Lightweight web interface built for school computer labs.</span>
                      </li>
                    </ul>
                    <div className="pt-1">
                      <Link
                        className="inline-flex items-center gap-2 text-primary font-label-lg text-label-lg font-bold hover:underline"
                        to="/student/dashboard"
                      >
                        <span>Preview Student Coding App</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                  <div className="lg:col-span-7 bg-surface-container-low rounded-2xl p-5 border border-outline-variant/40">
                    <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/40 space-y-4">
                      <div className="flex items-center justify-between pb-4 border-b border-outline-variant/40">
                        <div className="flex items-center gap-3">
                          <Avatar name="Miguel Santos" size="md" />
                          <div>
                            <h4 className="font-label-lg text-label-lg text-on-surface font-bold leading-none">
                              Kumusta, Miguel!
                            </h4>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">
                              Grade 10 · Python &amp; Algorithms
                            </span>
                          </div>
                        </div>
                        <Badge tone="on-track">450 XP</Badge>
                      </div>
                      <div className="p-4 rounded-xl bg-surface-container-low flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                          <span className="text-primary font-label-sm text-label-sm font-semibold uppercase tracking-wider">
                            Today&apos;s Coding Focus
                          </span>
                          <h4 className="font-headline-sm text-headline-sm text-on-surface mt-1">
                            Python List Comprehension &amp; Loops
                          </h4>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">
                            5 diagnostic coding challenges · 7 mins
                          </p>
                        </div>
                        <Button size="sm" to="/student/dashboard" variant="primary">
                          Simulan Na →
                        </Button>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="p-3.5 rounded-xl bg-surface-container-low text-center">
                          <span className="font-headline-md text-secondary font-bold">96%</span>
                          <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">For-Loops</p>
                        </div>
                        <div className="p-3.5 rounded-xl bg-surface-container-low text-center">
                          <span className="font-headline-md text-primary font-bold">88%</span>
                          <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Functions</p>
                        </div>
                        <div className="p-3.5 rounded-xl bg-surface-container-low text-center">
                          <span className="font-headline-md text-on-surface-variant font-bold">78%</span>
                          <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Recursion</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card
                aria-labelledby="tab-btn-teachers"
                className={`p-6 sm:p-10 ${productTab === 'teachers' ? '' : 'hidden'}`}
                id="tab-content-teachers"
                role="tabpanel"
                variant="elevated"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-5 space-y-5">
                    <Badge dot={false} tone="neutral">CS Teacher Command Center</Badge>
                    <h3 className="font-headline-md text-headline-md text-on-surface">
                      Identify students stuck on syntax or logic before project deadlines.
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Instead of running around crowded computer labs, Aralytics aggregates code misconceptions in real
                      time. Group students by error patterns and push automated remedial drills in two clicks.
                    </p>
                    <ul className="space-y-3 font-body-md text-body-md text-on-surface">
                      <li className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">analytics</span>
                        <span><strong>Real-Time Lab Triage:</strong> Detect students facing repeated IndexError or infinite loops.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">download_done</span>
                        <span><strong>Automated Mastery Reports:</strong> Export objective skill benchmarks for every student.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">sms</span>
                        <span><strong>Targeted Remedial Exercises:</strong> Push auto-generated 3-item debugging drills.</span>
                      </li>
                    </ul>
                    <div className="pt-1">
                      <Link
                        className="inline-flex items-center gap-2 text-primary font-label-lg text-label-lg font-bold hover:underline"
                        to="/teacher/dashboard"
                      >
                        <span>Open Teacher CS Hub</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                  <div className="lg:col-span-7 bg-surface-container-low rounded-2xl p-5 border border-outline-variant/40">
                    <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/40 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-outline-variant/40">
                        <div>
                          <h4 className="font-label-lg text-label-lg text-on-surface font-bold">
                            Section CS-101 · Python Programming
                          </h4>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            Sample Roster · Intervention threshold 70%
                          </span>
                        </div>
                        <Button size="sm" to="/teacher/dashboard" variant="primary">
                          <span className="material-symbols-outlined text-[14px]">send</span> Push Drill
                        </Button>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left font-body-sm text-body-sm">
                          <thead>
                            <tr className="text-on-surface-variant border-b border-outline-variant/50">
                              <th className="pb-2.5 font-semibold">Student Name</th>
                              <th className="pb-2.5 font-semibold">Topic: Loops</th>
                              <th className="pb-2.5 font-semibold">Status</th>
                              <th className="pb-2.5 font-semibold text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-outline-variant/30">
                            <tr>
                              <td className="py-3 font-medium text-on-surface">Miguel Santos</td>
                              <td className="py-3 text-secondary font-semibold">92%</td>
                              <td className="py-3"><Badge tone="mastered">Mastered</Badge></td>
                              <td className="py-3 text-right"><span className="text-primary font-semibold text-xs">Challenge Drill</span></td>
                            </tr>
                            <tr>
                              <td className="py-3 font-medium text-on-surface">Patricia Lim</td>
                              <td className="py-3 text-warn font-semibold">65%</td>
                              <td className="py-3"><Badge tone="nudge">Needs Nudge</Badge></td>
                              <td className="py-3 text-right"><span className="text-primary font-semibold text-xs">Send Loop Hint</span></td>
                            </tr>
                            <tr>
                              <td className="py-3 font-medium text-on-surface">Kevin Bautista</td>
                              <td className="py-3 text-error font-semibold">40%</td>
                              <td className="py-3"><Badge tone="help">IndexError Trap</Badge></td>
                              <td className="py-3 text-right"><span className="text-error font-semibold text-xs">1-on-1 Debug</span></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* CURRICULUM & TOPICS */}
          <section className="w-full py-20 bg-surface-container-low/40 scroll-mt-24" id="topics">
            <div className="max-w-[1120px] mx-auto px-4 lg:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-5 order-2 lg:order-1">
                  <Card variant="elevated" className="p-6 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-outline-variant/40">
                      <span className="font-headline-sm text-headline-sm text-on-surface">Coding Competencies Covered</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Core CS</span>
                    </div>
                    <div className="space-y-2.5">
                      {[
                        { icon: 'code', color: 'text-primary', title: 'Python Fundamentals', desc: 'Variables, Data Types, Conditionals, Loops' },
                        { icon: 'account_tree', color: 'text-secondary', title: 'Data Structures & Lists', desc: 'Zero-indexing, Slicing, Dictionaries, Sets' },
                        { icon: 'bug_report', color: 'text-warn', title: 'Debugging & Exception Handling', desc: 'IndexError, TypeError, Tracebacks, Logic Bugs' },
                        { icon: 'terminal', color: 'text-primary', title: 'Algorithmic Thinking', desc: 'Sorting, Searching, Nested Iteration' },
                      ].map((topic) => (
                        <div className="p-3.5 rounded-xl bg-surface-container-low flex items-center justify-between gap-3" key={topic.title}>
                          <div className="flex items-center gap-3">
                            <span className={`material-symbols-outlined ${topic.color} text-[20px]`}>{topic.icon}</span>
                            <div>
                              <h3 className="font-label-lg text-label-lg text-on-surface font-semibold">{topic.title}</h3>
                              <span className="font-body-sm text-body-sm text-on-surface-variant">{topic.desc}</span>
                            </div>
                          </div>
                          <Badge dot={false} tone="mastered">Mapped</Badge>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
                <div className="lg:col-span-7 order-1 lg:order-2 space-y-5">
                  <h2 className="font-headline-lg text-headline-lg text-on-surface text-balance">
                    Engineered specifically for computer science educators.
                  </h2>
                  <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[65ch] leading-relaxed">
                    Unlike generic chatbots that hand out copy-paste solutions, Aralytics uses Socratic hints and
                    diagnostic questions that encourage students to reason through their logic errors independently.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <Card variant="elevated" className="p-5">
                      <h3 className="font-headline-sm text-headline-sm text-on-surface text-base mb-1.5">
                        Socratic Hinting Engine
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        Pinpoints syntax and logic errors line by line without giving away the direct answer.
                      </p>
                    </Card>
                    <Card variant="elevated" className="p-5">
                      <h3 className="font-headline-sm text-headline-sm text-on-surface text-base mb-1.5">
                        Bilingual Taglish NLP Support
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        Explains complex computer science concepts in conversational, approachable language.
                      </p>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* TRUTHFUL 4-PILLAR CLASSROOM GUARDRAILS BAND */}
          <section aria-label="Classroom guardrails" className="w-full py-12 bg-primary text-on-primary">
            <div className="max-w-[1120px] mx-auto px-4 lg:px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:divide-x divide-primary-fixed/20">
                {GUARDRAILS.map((item) => (
                  <div className="p-3 flex flex-col items-center" key={item.title}>
                    <span className={`font-metric-number text-metric-number ${item.color} font-extrabold tracking-tight leading-none`}>
                      {item.metric}
                    </span>
                    <span className="font-label-lg text-label-lg text-on-primary font-semibold mt-2">
                      {item.title}
                    </span>
                    <span className="font-body-sm text-body-sm text-on-primary-container mt-0.5">
                      {item.subtitle}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* PILOT SIGNUP SECTION */}
          <section className="w-full py-20 bg-surface-container-low/40 scroll-mt-24" id="pilot-signup">
            <div className="max-w-[1120px] mx-auto px-4 lg:px-6">
              <Card variant="elevated" className="p-8 sm:p-12 lg:p-14 text-center max-w-3xl mx-auto space-y-5">
                <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-[28px]">terminal</span>
                </div>
                <h2 className="font-headline-lg text-headline-lg sm:text-[34px] text-on-surface font-bold tracking-tight leading-tight text-balance">
                  Ready to bring diagnostic-first coding feedback to your school?
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed max-w-xl mx-auto">
                  Request a sandbox for your computer science faculty.{' '}
                  <strong>Free 60-day pilot program for schools and coding academies.</strong>
                </p>

                {pilotState === 'success' ? (
                  <div
                    className="p-5 rounded-2xl bg-status-ok-tint border border-secondary/20 text-on-surface flex flex-col items-center gap-3 max-w-lg mx-auto"
                    id="pilot-success-msg"
                    role="status"
                  >
                    <div className="flex items-center gap-2 font-label-lg text-secondary font-semibold">
                      <span className="material-symbols-outlined text-[20px]">check_circle</span>
                      <span>Inquiry received!</span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Salamat! Our academic onboarding coordinator will email you within 24 hours with your coding lab
                      sandbox credentials.
                    </p>
                    <Button
                      onClick={() => {
                        setPilotState('idle')
                        setPilotError(null)
                      }}
                      size="sm"
                      variant="secondary"
                    >
                      Submit another inquiry
                    </Button>
                  </div>
                ) : (
                  <form className="flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto pt-2" noValidate onSubmit={handlePilotSubmit}>
                    <div className="relative w-full">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
                        <span className="material-symbols-outlined text-[20px]">mail</span>
                      </span>
                      <input
                        aria-label="School or educator email"
                        autoComplete="email"
                        className="w-full min-h-[48px] pl-10 pr-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/60 focus:ring-2 focus:ring-primary/25 focus:border-primary text-on-surface font-body-md text-body-md outline-none transition-all placeholder:text-on-surface-variant"
                        id="pilot-email"
                        name="email"
                        onChange={(event) => {
                          setPilotEmail(event.target.value)
                          if (pilotError || pilotState === 'error') {
                            setPilotError(null)
                            setPilotState('idle')
                          }
                        }}
                        placeholder="Enter your school or educator email..."
                        required
                        type="email"
                        value={pilotEmail}
                      />
                    </div>
                    <Button
                      className="w-full sm:w-auto whitespace-nowrap shrink-0"
                      disabled={pilotState === 'sending'}
                      size="lg"
                      type="submit"
                      variant="primary"
                    >
                      {pilotState === 'sending' ? 'Sending...' : 'Request Coding Pilot'}
                    </Button>
                  </form>
                )}

                {pilotState === 'error' && (
                  <div
                    className="p-3.5 rounded-xl bg-danger-tint border border-error/20 text-error font-label-md text-label-md max-w-lg mx-auto"
                    role="alert"
                  >
                    {pilotError || 'We could not send your request. Please try again.'}
                  </div>
                )}

                <div className="pt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-on-surface-variant font-label-sm text-label-sm">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-secondary text-[16px]">check</span>
                    No credit card required
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-secondary text-[16px]">check</span>
                    RA 10173 Compliant
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-secondary text-[16px]">check</span>
                    Instant Classroom Setup
                  </span>
                </div>
              </Card>
            </div>
          </section>

          {/* DEMO WALKTHROUGH MODAL */}
          <div
            aria-labelledby="demo-modal-title"
            aria-modal="true"
            className={`fixed inset-0 z-50 items-center justify-center p-4 bg-ink/60 backdrop-blur-sm ${
              demoOpen ? 'flex' : 'hidden'
            }`}
            id="demo-modal"
            onClick={(event) => {
              if (event.target === event.currentTarget) setDemoOpen(false)
            }}
            role="dialog"
          >
            <Card variant="elevated" className="relative w-full max-w-2xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/40">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">play_circle</span>
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface" id="demo-modal-title">
                    2-Minute Classroom Walkthrough
                  </span>
                </div>
                <button
                  aria-label="Close demo preview"
                  className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors cursor-pointer"
                  onClick={() => setDemoOpen(false)}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
              <div className="w-full aspect-video rounded-xl bg-gradient-to-br from-ink via-primary to-primary-container relative overflow-hidden flex flex-col items-center justify-center text-center p-6">
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-accent-yellow text-on-tertiary-fixed flex items-center justify-center shadow-lg mb-3">
                    <span className="material-symbols-outlined text-[36px]">play_arrow</span>
                  </div>
                  <span className="font-headline-sm text-headline-sm text-on-primary font-bold">
                    Watch: Running an Interactive Python Lab with Aralytics
                  </span>
                  <span className="font-label-sm text-label-sm text-on-primary-container mt-1">
                    Tagalog &amp; English Walkthrough · 2:14 mins
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Includes remedial triage &amp; Socratic feedback flow
                </span>
                <Button onClick={() => setDemoOpen(false)} size="sm" variant="secondary">
                  Close Preview
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <footer className="w-full bg-surface-container-low text-on-surface-variant border-t border-outline-variant/40 pt-12 pb-8">
        <div className="max-w-[1120px] mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-10">
            <div className="col-span-2 lg:col-span-2 flex flex-col gap-3 pr-6">
              <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
                AI-powered diagnostic and feedback platform for computer science education, debugging mastery, and
                personalized coding guidance.
              </p>
              <Badge className="w-fit" dot={false} tone="nudge">
                Empowering Filipino software builders
              </Badge>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="font-label-lg text-label-lg text-on-surface font-semibold">Platform</span>
              <a className="font-body-sm text-body-sm hover:text-primary transition-colors" href="#how-it-works">How It Works</a>
              <a className="font-body-sm text-body-sm hover:text-primary transition-colors" href="#topics">Coding Topics</a>
              <a className="font-body-sm text-body-sm hover:text-primary transition-colors" href="#pilot-signup">School Pilot Program</a>
              <Link className="font-body-sm text-body-sm hover:text-primary transition-colors" to="/register">Activate School Key</Link>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="font-label-lg text-label-lg text-on-surface font-semibold">Educators &amp; Youth</span>
              <Link className="font-body-sm text-body-sm hover:text-primary transition-colors" to="/teacher/dashboard">CS Teacher Hub</Link>
              <Link className="font-body-sm text-body-sm hover:text-primary transition-colors" to="/student/dashboard">Student Coding Feed</Link>
              <Link className="font-body-sm text-body-sm hover:text-primary transition-colors" to="/student/quiz">Python Exercises</Link>
              <Link className="font-body-sm text-body-sm hover:text-primary transition-colors" to="/login">Sign In</Link>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="font-label-lg text-label-lg text-on-surface font-semibold">Compliance &amp; Trust</span>
              <a className="font-body-sm text-body-sm hover:text-primary transition-colors" href="#pilot-signup">Data Privacy Act 2012</a>
              <a className="font-body-sm text-body-sm hover:text-primary transition-colors" href="#pilot-signup">AI Pedagogy Guardrails</a>
            </div>
          </div>
          <div className="pt-5 border-t border-outline-variant/40 flex flex-col sm:flex-row items-center justify-between gap-3 font-body-sm text-body-sm text-on-surface-variant">
            <p>© {CURRENT_YEAR} Aralytics EdTech Philippines Inc. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-secondary"></span> Coding Lab Ready
              </span>
              <span>Manila, Philippines</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
