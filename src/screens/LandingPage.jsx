import { useState } from 'react';
import { Link } from 'react-router-dom';

const CURRENT_YEAR = new Date().getFullYear();

export default function LandingPage() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [productTab, setProductTab] = useState('students');
  const [pilotSubmitted, setPilotSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-background text-on-surface font-body-md text-body-md min-h-screen flex flex-col antialiased selection:bg-primary-fixed selection:text-on-primary-fixed">
      <header className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(91,75,219,0.06)]">
        <div className="h-20 max-w-[1120px] mx-auto px-margin-mobile lg:px-margin flex items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-lg">
            <Link className="flex items-center gap-space-sm group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl" to="/home">
              <div className="relative w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_4px_16px_rgba(91,75,219,0.2)] transition-transform duration-200 group-hover:scale-105">
                <span className="material-symbols-outlined text-tertiary-fixed text-[26px] select-none">school</span>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-tertiary-fixed border-2 border-surface"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm tracking-tight text-on-surface leading-none">Aralytics</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant leading-none mt-1">Pilipinas AI</span>
              </div>
            </Link>
            <nav className="hidden lg:flex items-center gap-1" data-active-classes="bg-surface-container-high text-primary font-label-lg rounded-xl">
              <a className="px-3 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-lg text-label-lg" data-path="features" href="#">Features</a>
              <a className="px-3 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-lg text-label-lg" data-path="for-students" href="#">For Students</a>
              <a className="px-3 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-lg text-label-lg" data-path="for-teachers" href="#">For Teachers</a>
              <a className="px-3 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-lg text-label-lg" data-path="deped-alignment" href="#">DepEd Alignment</a>
              <a className="px-3 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-lg text-label-lg" data-path="pricing-pilot" href="#">Pricing / Pilot</a>
            </nav>
            <button
              aria-expanded={menuOpen}
              aria-label="Open navigation menu"
              className="lg:hidden w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors shrink-0"
              onClick={() => setMenuOpen(!menuOpen)}
              title="Menu"
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                {menuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
          <div className="flex items-center gap-space-sm lg:gap-space-md">
            <div className="flex items-center bg-surface-container-low p-1 rounded-full text-on-surface-variant font-label-sm text-label-sm">
              <button className="px-2.5 py-1 rounded-full bg-surface-container-lowest text-primary shadow-[0_1px_4px_rgba(91,75,219,0.08)] font-label-sm text-label-sm font-semibold transition-all" type="button">EN</button>
              <span className="text-outline-variant px-0.5">|</span>
              <button className="px-2.5 py-1 rounded-full hover:text-on-surface font-label-sm text-label-sm transition-colors" type="button">FIL</button>
            </div>
            <a className="hidden sm:inline-flex px-3.5 py-2 rounded-xl text-on-surface font-label-lg text-label-lg hover:bg-surface-container transition-colors" data-path="login" href="#">Log In</a>
            <a className="hidden lg:inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg shadow-[0_4px_16px_rgba(91,75,219,0.18)] hover:bg-primary-container hover:text-on-primary-container transition-all focus:outline-none focus:ring-4 focus:ring-primary-fixed" data-path="pricing-pilot" href="#">Start Free Classroom Pilot</a>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </div>
          </div>
        </div>
        {/* Mobile nav dropdown */}
        {menuOpen && (
          <div className="lg:hidden border-t border-lavender-ash bg-surface/95 backdrop-blur-xl px-margin-mobile py-space-md flex flex-col gap-1">
            <a
              className="flex items-center justify-center px-3 py-2.5 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-semibold"
              data-path="pricing-pilot"
              href="#"
              key="cta"
              onClick={() => setMenuOpen(false)}
            >
              Start Free Classroom Pilot
            </a>
            {['Features', 'For Students', 'For Teachers', 'DepEd Alignment', 'Pricing / Pilot'].map(
              (label) => (
                <a
                  className="flex items-center px-3 py-2.5 rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-lg text-label-lg"
                  data-path={label.toLowerCase().replace(/[^a-z]+/g, '-')}
                  href="#"
                  key={label}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              ),
            )}
          </div>
        )}
      </header>
      <main className="w-full pt-20 bg-background flex-1">
        <div className="flex flex-col w-full">
          <section className="relative w-full overflow-hidden pb-16 lg:pb-24 pt-4 lg:pt-8">
            <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[980px] h-[480px] bg-gradient-to-br from-primary-fixed/30 via-tertiary-fixed/20 to-transparent blur-3xl opacity-60 rounded-full"></div>
            <div className="pointer-events-none absolute top-48 -right-20 w-80 h-80 bg-secondary-container/20 blur-2xl rounded-full"></div>
            <div className="relative max-w-[1120px] mx-auto px-margin-mobile lg:px-margin flex flex-col items-center">
              <div className="inline-flex items-center gap-space-xs px-4 py-1.5 rounded-full bg-surface-container shadow-sm border-0 mb-6 group cursor-default transition-transform hover:scale-[1.02]">
                <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim animate-pulse"></span>
                <span className="font-label-md text-label-md text-primary font-semibold tracking-wide">
                  ✨ Bagong K-12 MATATAG Aligned · Built for Filipino Classrooms
                </span>
              </div>
              <h1 className="font-display-lg text-display-lg-mobile lg:text-display-lg text-on-surface text-center max-w-4xl tracking-tight leading-tight mb-5">
                Personalized AI Tutoring &amp; Instant Diagnostic Feedback for <span className="text-primary relative inline-block">Every Filipino Learner.<svg className="absolute -bottom-1 left-0 w-full h-2.5 text-tertiary-fixed" preserveAspectRatio="none" viewBox="0 0 100 20"><path d="M0 15 Q 50 0 100 12" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="6" /></svg></span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant text-center max-w-2xl mb-8 leading-relaxed">
                Aralytics empowers teachers to spot learning gaps in seconds and provides students with encouraging, step-by-step AI guidance in English and Tagalog. Zero grade anxiety, 100% mastery.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-space-md w-full sm:w-auto mb-10">
                <a className="w-full sm:w-auto inline-flex items-center justify-center gap-space-sm px-6 py-3.5 rounded-[14px] bg-primary text-on-primary font-label-lg text-label-lg shadow-[0_8px_20px_rgba(91,75,219,0.22)] hover:bg-primary-container transition-all hover:-translate-y-0.5 active:translate-y-0" href="#pilot-signup">
                  <span>Launch Free School Pilot</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </a>
                <button className="w-full sm:w-auto inline-flex items-center justify-center gap-space-sm px-6 py-3.5 rounded-[14px] bg-surface-container-lowest text-on-surface font-label-lg text-label-lg shadow-[0_4px_16px_rgba(91,75,219,0.06)] hover:bg-surface-container-low transition-all" onClick={() => setDemoOpen(true)} type="button">
                  <span className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                  </span>
                  <span>Watch 2-Min Classroom Demo</span>
                </button>
              </div>
              <div className="w-full max-w-2xl py-3 px-4 rounded-xl bg-surface-container-low/80 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center mb-12 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1.5 overflow-hidden">
                    <div className="w-6 h-6 rounded-full bg-primary-fixed text-primary text-[10px] font-bold flex items-center justify-center">QC</div>
                    <div className="w-6 h-6 rounded-full bg-secondary-fixed text-secondary text-[10px] font-bold flex items-center justify-center">PSG</div>
                    <div className="w-6 h-6 rounded-full bg-tertiary-fixed text-tertiary text-[10px] font-bold flex items-center justify-center">LAG</div>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                    Trusted by <strong className="text-on-surface font-bold">45+ public &amp; private schools</strong> across SDO Pasig, QC, &amp; Laguna
                  </span>
                </div>
                <span className="text-outline-variant hidden sm:inline">•</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-secondary text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  <strong className="text-on-surface font-semibold">48,000+</strong> quizzes submitted this school year
                </span>
              </div>
              <div className="w-full rounded-[24px] bg-surface-container-lowest p-4 sm:p-6 lg:p-8 shadow-[0_16px_40px_rgba(91,75,219,0.1)] relative">
                <div className="flex items-center justify-between pb-4 sm:pb-6 mb-4 sm:mb-6 border-b border-surface-container-high/60">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-error/70"></div>
                    <div className="w-3 h-3 rounded-full bg-tertiary-fixed-dim"></div>
                    <div className="w-3 h-3 rounded-full bg-secondary"></div>
                    <span className="ml-2 font-label-sm text-label-sm text-on-surface-variant font-semibold">Aralytics Live Diagnostic Classroom · Section 8-Mabini</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-secondary/10 text-secondary font-label-sm text-label-sm font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span> Live Session
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-surface-container-high font-label-sm text-label-sm text-on-surface-variant">DepEd Math 8 · Q1 MELC #3</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-stretch">
                  <div className="lg:col-span-6 flex flex-col justify-between bg-surface-container-low p-5 sm:p-6 rounded-[20px]">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-1 rounded-full bg-surface-container-highest text-primary font-label-sm text-label-sm font-bold">Question 4 of 5</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">timer</span> 45s avg speed
                        </span>
                      </div>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface mb-2">
                        Find the sum of the rational numbers:
                      </h2>
                      <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm text-center my-3">
                        <span className="font-metric-number text-headline-lg text-primary tracking-wide">
                          <sup>3</sup>/<sub>4</sub> + <sup>2</sup>/<sub>5</sub> = ?
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
                        <em>Paalala:</em> Find the least common denominator bago pagsamahin ang numerators.
                      </p>
                      <div className="space-y-2">
                        <div className="w-full p-3 rounded-xl bg-surface-container-lowest flex items-center justify-between opacity-60">
                          <span className="font-body-md text-body-md font-medium text-on-surface">A) 5/9</span>
                          <span className="text-xs text-on-surface-variant">Direct add</span>
                        </div>
                        <div className="w-full p-3.5 rounded-xl bg-surface-container-lowest ring-2 ring-primary flex items-center justify-between shadow-sm">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs">✓</span>
                            <span className="font-body-md text-body-md font-bold text-primary">B) 23/20 (or 1 3/20)</span>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm font-semibold">Submitted</span>
                        </div>
                        <div className="w-full p-3 rounded-xl bg-surface-container-lowest flex items-center justify-between opacity-60">
                          <span className="font-body-md text-body-md font-medium text-on-surface">C) 6/20</span>
                          <span className="text-xs text-on-surface-variant">Multiplied</span>
                        </div>
                      </div>
                    </div>
                    <div className="pt-4 mt-4 border-t border-surface-container-high/60 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                      <span>Student: <strong>Maria Clara De Leon</strong></span>
                      <span>Learner Reference No. (LRN): 136482991024</span>
                    </div>
                  </div>
                  <div className="lg:col-span-6 flex flex-col justify-between bg-gradient-to-br from-surface-container-lowest via-surface-container to-surface-container-high p-5 sm:p-6 rounded-[20px] shadow-[0_8px_24px_rgba(91,75,219,0.08)] relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-tertiary-fixed/30 rounded-full blur-xl pointer-events-none"></div>
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center shadow-md">
                            <span className="material-symbols-outlined text-[30px] text-tertiary-fixed">smart_toy</span>
                            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-secondary-fixed border-2 border-surface-container-lowest flex items-center justify-center text-[9px] font-black text-secondary">★</span>
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-headline-sm text-headline-sm text-on-surface font-bold">Aral Coach AI</span>
                              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm font-semibold">Instant Feedback</span>
                            </div>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">Your personal diagnostic coach · 10s ago</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold flex items-center gap-1 shadow-sm">
                            <span>+50 XP</span>
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-surface-container-lowest text-on-surface font-label-sm text-label-sm font-semibold flex items-center gap-1 shadow-xs">
                            <span>🔥 5-Day Streak</span>
                          </span>
                        </div>
                      </div>
                      <div className="p-4 rounded-2xl bg-surface-container-lowest shadow-sm mb-4">
                        <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                          “Nice work on finding the common denominator (<strong>20</strong>), Maria! You converted <sup>3</sup>/<sub>4</sub> to <sup>15</sup>/<sub>20</sub> and <sup>2</sup>/<sub>5</sub> to <sup>8</sup>/<sub>20</sub> correctly bago nagsama. Keep this momentum kapag nag-solve na tayo ng mixed fractions bukas!”
                        </p>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-secondary-container/30 text-on-secondary-container font-label-sm text-label-sm">
                          <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                          <span className="font-semibold">What went well:</span>
                          <span>Finding LCD &amp; Equivalent Numerators (100% Mastery)</span>
                        </div>
                        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-tertiary-fixed/40 text-on-tertiary-fixed-variant font-label-sm text-label-sm">
                          <span className="material-symbols-outlined text-tertiary text-[18px]">lightbulb</span>
                          <span className="font-semibold">Try this next:</span>
                          <span>Simplifying improper fraction <sup>23</sup>/<sub>20</sub> to 1 <sup>3</sup>/<sub>20</sub></span>
                        </div>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-surface-container-high/60 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 rounded-full bg-surface-container-highest overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: '85%' }}></div>
                        </div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">Q1 Competency 85%</span>
                      </div>
                      <button className="px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-semibold hover:bg-primary-container transition-all flex items-center gap-1" type="button">
                        <span>Next Drill</span>
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-16 bg-surface-container-low/40">
            <div className="max-w-[1120px] mx-auto px-margin-mobile lg:px-margin">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-bold uppercase tracking-wider">
                  Why Aralytics Works
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface mt-3">
                  Designed specifically for 50-student Philippine public classrooms.
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                  Empowering dedicated Filipino educators while giving every student a non-judgmental, patient learning companion.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
                <div className="rounded-[20px] bg-surface-container-lowest p-space-lg shadow-[0_4px_16px_rgba(91,75,219,0.06)] hover:shadow-[0_10px_24px_rgba(91,75,219,0.12)] transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-primary-fixed flex items-center justify-center text-primary mb-5 shadow-xs">
                      <span className="material-symbols-outlined text-[28px]">psychology_alt</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">
                      Instant Personalized AI Feedback (Aral Coach)
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      No more waiting 2 weeks for test papers to be returned. Within 10 seconds of quiz submission, students receive empathetic, step-by-step Taglish hints that demystify tough STEM and Humanities concepts.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-surface-container-high/50 flex items-center gap-2 text-primary font-label-sm text-label-sm font-semibold">
                    <span>Reduces learner quiz anxiety</span>
                    <span className="material-symbols-outlined text-[16px]">sentiment_satisfied</span>
                  </div>
                </div>
                <div className="rounded-[20px] bg-surface-container-lowest p-space-lg shadow-[0_4px_16px_rgba(91,75,219,0.06)] hover:shadow-[0_10px_24px_rgba(91,75,219,0.12)] transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-secondary-fixed flex items-center justify-center text-secondary mb-5 shadow-xs">
                      <span className="material-symbols-outlined text-[28px]">group_work</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">
                      Real-Time Class Triage for Teachers
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Automatically identify which 4 out of 45 learners need urgent scaffolding before periodic exams. Group students into peer tutoring squads and save 8+ hours a week on manual checking and remedial paperwork.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-surface-container-high/50 flex items-center gap-2 text-secondary font-label-sm text-label-sm font-semibold">
                    <span>Automated remedial clustering</span>
                    <span className="material-symbols-outlined text-[16px]">bolt</span>
                  </div>
                </div>
                <div className="rounded-[20px] bg-surface-container-lowest p-space-lg shadow-[0_4px_16px_rgba(91,75,219,0.06)] hover:shadow-[0_10px_24px_rgba(91,75,219,0.12)] transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-tertiary-fixed flex items-center justify-center text-tertiary mb-5 shadow-xs">
                      <span className="material-symbols-outlined text-[28px]">description</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">
                      Automated DepEd SF9 &amp; SF10 Compliance
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Generate DepEd-ready School Form 9 (Learner Progress Report Card) and SF10 competency audits in a single click. Print bilingual Parent-Teacher Conference (PTC) summary sheets with concrete mastery curves.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-surface-container-high/50 flex items-center gap-2 text-tertiary font-label-sm text-label-sm font-semibold">
                    <span>Compliant with DepEd DO 8, s. 2015</span>
                    <span className="material-symbols-outlined text-[16px]">verified_user</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-16 lg:py-24">
            <div className="max-w-[1120px] mx-auto px-margin-mobile lg:px-margin">
              <div className="flex flex-col items-center text-center mb-10">
                <span className="px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-bold uppercase tracking-wider">
                  Two Perspectives · One Seamless Loop
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface mt-3">
                  Explore the Aralytics Ecosystem
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mt-2">
                  Toggle between the gamified, low-pressure learner feed and the command center built for DepEd Master Teachers.
                </p>
                <div className="mt-6 inline-flex p-1.5 rounded-full bg-surface-container shadow-inner">
                  <button className={`px-6 py-2 rounded-full ${productTab === 'students' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'} font-label-lg text-label-lg font-semibold transition-all flex items-center gap-2`} id="tab-btn-students" onClick={() => setProductTab('students')} type="button">
                    <span className="material-symbols-outlined text-[18px]">backpack</span>
                    <span>Student Experience</span>
                  </button>
                  <button className={`px-6 py-2 rounded-full ${productTab === 'teachers' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'} font-label-lg text-label-lg font-semibold transition-all flex items-center gap-2`} id="tab-btn-teachers" onClick={() => setProductTab('teachers')} type="button">
                    <span className="material-symbols-outlined text-[18px]">co_present</span>
                    <span>Teacher &amp; Adviser Hub</span>
                  </button>
                </div>
              </div>
              <div className={`rounded-[24px] bg-surface-container-lowest p-6 lg:p-8 shadow-[0_8px_32px_rgba(91,75,219,0.08)] transition-all ${productTab === 'students' ? '' : 'hidden'}`} id="tab-content-students">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
                  <div className="lg:col-span-5 space-y-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm font-bold">
                      <span>Low-Data &amp; Free Basics Compatible</span>
                    </div>
                    <h3 className="font-headline-lg text-headline-md text-on-surface">
                      Daily 8-minute micro-drills that turn homework panic into confidence.
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Filipino students often hesitate to raise their hands in crowded classrooms. With Aral Coach, learners ask questions in conversational Taglish, review concepts without embarrassment, and receive encouraging badges.
                    </p>
                    <ul className="space-y-3 font-body-md text-body-md text-on-surface">
                      <li className="flex items-start gap-2.5">
                        <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">check_circle</span>
                        <span><strong>Bilingual Code-Switching:</strong> Tap any concept to view explanations in Filipino or English.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">check_circle</span>
                        <span><strong>Bite-Sized Remedial:</strong> 5-question adaptive quizzes that target the student's exact misconception.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">check_circle</span>
                        <span><strong>Offline Mode Sync:</strong> Complete exercises offline; progress automatically uploads upon reconnecting.</span>
                      </li>
                    </ul>
                    <div className="pt-2">
                      <a className="inline-flex items-center gap-2 text-primary font-label-lg text-label-lg font-bold hover:underline" href="#pilot-signup">
                        <span>Preview Student Mobile App</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </a>
                    </div>
                  </div>
                  <div className="lg:col-span-7 bg-surface-container-low rounded-[20px] p-5 sm:p-6 shadow-inner">
                    <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-surface-container-high/60">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold text-sm">
                            MC
                          </div>
                          <div>
                            <h4 className="font-label-lg text-label-lg text-on-surface font-bold leading-none">Kumusta, Maria! 👋</h4>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">Grade 8 - SDO Pasig · Science &amp; Math</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
                          <span>⚡ 320 XP</span>
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-gradient-to-r from-primary-fixed/40 to-surface-container-low flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                          <span className="px-2 py-0.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-semibold">Today's Focus</span>
                          <h4 className="font-headline-sm text-headline-sm text-on-surface mt-1.5">Mendelian Genetics: Punnett Square Drill</h4>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">5 interactive questions · Estimated time: 6 mins</p>
                        </div>
                        <button className="px-4 py-2 rounded-xl bg-tertiary-fixed-dim text-on-tertiary-fixed font-label-md text-label-md font-bold hover:bg-tertiary-fixed shadow-sm shrink-0" type="button">
                          Simulan Na →
                        </button>
                      </div>
                      <div className="grid grid-cols-3 gap-3 pt-1">
                        <div className="p-3 rounded-xl bg-surface-container-low text-center">
                          <span className="font-metric-number text-headline-md text-secondary">94%</span>
                          <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">Algebraic Expressions</p>
                        </div>
                        <div className="p-3 rounded-xl bg-surface-container-low text-center">
                          <span className="font-metric-number text-headline-md text-primary">88%</span>
                          <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">Cellular Structure</p>
                        </div>
                        <div className="p-3 rounded-xl bg-surface-container-low text-center">
                          <span className="font-metric-number text-headline-md text-tertiary">72%</span>
                          <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">Rational Equations</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`hidden rounded-[24px] bg-surface-container-lowest p-6 lg:p-8 shadow-[0_8px_32px_rgba(91,75,219,0.08)] transition-all ${productTab === 'teachers' ? 'block' : 'hidden'}`} id="tab-content-teachers">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
                  <div className="lg:col-span-5 space-y-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm font-bold">
                      <span>Teacher Diagnostic Dashboard</span>
                    </div>
                    <h3 className="font-headline-lg text-headline-md text-on-surface">
                      Identify struggling learners before the quarterly exam, not after.
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      No more manual rubric computation. Aralytics aggregates quiz items across your section into intuitive mastery clusters. Spot exactly which questions triggered errors and push auto-differentiated homework in 2 clicks.
                    </p>
                    <ul className="space-y-3 font-body-md text-body-md text-on-surface">
                      <li className="flex items-start gap-2.5">
                        <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">analytics</span>
                        <span><strong>Instant Class Triage:</strong> Learners partitioned into 'Mastered', 'Needs a Nudge', and 'Urgent Intervention'.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">download_done</span>
                        <span><strong>1-Click SF9 Export:</strong> Quarterly grades pre-formatted according to DepEd Order 8 transmuted grading tables.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">sms</span>
                        <span><strong>Automated Parent SMS Summaries:</strong> Send encouraging Tagalog learning reports directly to parents.</span>
                      </li>
                    </ul>
                    <div className="pt-2">
                      <a className="inline-flex items-center gap-2 text-primary font-label-lg text-label-lg font-bold hover:underline" href="#pilot-signup">
                        <span>Request DepEd Teacher Sandbox</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </a>
                    </div>
                  </div>
                  <div className="lg:col-span-7 bg-surface-container-low rounded-[20px] p-5 sm:p-6 shadow-inner">
                    <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-surface-container-high/60">
                        <div>
                          <h4 className="font-label-lg text-label-lg text-on-surface font-bold">G8 - Mabini · Mathematics (Diagnostic)</h4>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">Teacher: Bb. Elena Santos · 42 Enrolled</span>
                        </div>
                        <button className="px-3 py-1 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-semibold flex items-center gap-1" type="button">
                          <span className="material-symbols-outlined text-[14px]">send</span> Push 5-Q Remedial
                        </button>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left font-body-sm text-body-sm">
                          <thead>
                            <tr className="text-on-surface-variant border-b border-surface-container-high">
                              <th className="pb-2 font-semibold">Student Name</th>
                              <th className="pb-2 font-semibold">MELC 3.1</th>
                              <th className="pb-2 font-semibold">Status</th>
                              <th className="pb-2 font-semibold text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-surface-container-high/40">
                            <tr>
                              <td className="py-2.5 font-medium text-on-surface">Maria Clara De Leon</td>
                              <td className="py-2.5 text-secondary font-semibold">88%</td>
                              <td className="py-2.5"><span className="px-2 py-0.5 rounded-full bg-secondary-container/50 text-secondary font-label-sm text-label-sm font-semibold">On Track</span></td>
                              <td className="py-2.5 text-right"><span className="text-primary hover:underline cursor-pointer font-semibold text-xs">Praise</span></td>
                            </tr>
                            <tr>
                              <td className="py-2.5 font-medium text-on-surface">Juan Bautista Cruz</td>
                              <td className="py-2.5 text-tertiary font-semibold">64%</td>
                              <td className="py-2.5"><span className="px-2 py-0.5 rounded-full bg-tertiary-fixed/60 text-on-tertiary-fixed-variant font-label-sm text-label-sm font-semibold">Needs Nudge</span></td>
                              <td className="py-2.5 text-right"><span className="text-primary hover:underline cursor-pointer font-semibold text-xs">Send Hint</span></td>
                            </tr>
                            <tr>
                              <td className="py-2.5 font-medium text-on-surface">Carlos Joshua Reyes</td>
                              <td className="py-2.5 text-error font-semibold">42%</td>
                              <td className="py-2.5"><span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">Needs Help</span></td>
                              <td className="py-2.5 text-right"><span className="text-error hover:underline cursor-pointer font-semibold text-xs">1-on-1 Peer</span></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="pt-3 border-t border-surface-container-high/60 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                        <span>34 Mastered · 5 Nudge · 3 Urgent Help</span>
                        <span className="text-secondary font-semibold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">check</span> SF9 Ready
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-16 bg-surface-container-high/30">
            <div className="max-w-[1120px] mx-auto px-margin-mobile lg:px-margin">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
                <div className="lg:col-span-5 order-2 lg:order-1">
                  <div className="rounded-[20px] bg-surface-container-lowest p-6 shadow-[0_8px_24px_rgba(91,75,219,0.06)] space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-headline-sm text-headline-sm text-on-surface">DepEd Competencies Covered</span>
                      <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm font-bold">2024-2025</span>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3.5 rounded-xl bg-surface-container-low flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                            <span className="material-symbols-outlined text-[20px]">calculate</span>
                          </div>
                          <div>
                            <h4 className="font-label-lg text-label-lg text-on-surface font-bold">Mathematics 7 - 10</h4>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">MELCs: Patterns, Algebra, Geometry, Stats</span>
                          </div>
                        </div>
                        <span className="font-label-sm text-label-sm text-secondary font-bold">100% Mapped</span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-surface-container-low flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center font-bold">
                            <span className="material-symbols-outlined text-[20px]">science</span>
                          </div>
                          <div>
                            <h4 className="font-label-lg text-label-lg text-on-surface font-bold">Science &amp; Inquiry</h4>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">Living Things, Earth &amp; Space, Physics</span>
                          </div>
                        </div>
                        <span className="font-label-sm text-label-sm text-secondary font-bold">100% Mapped</span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-surface-container-low flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-tertiary/10 text-tertiary flex items-center justify-center font-bold">
                            <span className="material-symbols-outlined text-[20px]">menu_book</span>
                          </div>
                          <div>
                            <h4 className="font-label-lg text-label-lg text-on-surface font-bold">Filipino (Panitikan &amp; Balarila)</h4>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">Ibong Adarna, Florante at Laura, Noli Me Tangere</span>
                          </div>
                        </div>
                        <span className="font-label-sm text-label-sm text-secondary font-bold">100% Mapped</span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-surface-container-low flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-bold">
                            <span className="material-symbols-outlined text-[20px]">translate</span>
                          </div>
                          <div>
                            <h4 className="font-label-lg text-label-lg text-on-surface font-bold">English Communication</h4>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">Grammar, Reading Comprehension, Critical Text</span>
                          </div>
                        </div>
                        <span className="font-label-sm text-label-sm text-secondary font-bold">100% Mapped</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-secondary-container/20 flex items-center gap-2.5 text-on-secondary-container font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-secondary text-[20px]">signal_cellular_alt</span>
                      <span>Ultra-optimized for 3G/4G prepaid mobile data in rural division schools.</span>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
                  <span className="px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold uppercase tracking-wider">
                    Standardized &amp; Grounded
                  </span>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface">
                    Fully aligned with the Philippine Department of Education standards.
                  </h2>
                  <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                    We didn't just port Western curriculums. Aralytics was engineered from the ground up to support the MATATAG curriculum framework and DepEd's Most Essential Learning Competencies (MELCs).
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md pt-2">
                    <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm">
                      <div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-primary mb-2">
                        <span className="material-symbols-outlined text-[18px]">gavel</span>
                      </div>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface text-base">DO 8, s. 2015 Transmuted Scores</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Automatic conversion of raw quiz diagnostic data into official DepEd transmuted grades.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm">
                      <div className="w-8 h-8 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary mb-2">
                        <span className="material-symbols-outlined text-[18px]">forum</span>
                      </div>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface text-base">Culturally Aware Taglish NLP</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">AI trained on natural Filipino high school dialogue to ensure relatable, encouraging guidance.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-16 lg:py-24">
            <div className="max-w-[1120px] mx-auto px-margin-mobile lg:px-margin">
              <div className="text-center max-w-2xl mx-auto mb-14">
                <span className="px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-bold uppercase tracking-wider">
                  Voices from the Classroom
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface mt-3">
                  Loved by teachers, advisers, and learners across the islands.
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                  Real stories of transformation, reduced educator burnout, and newfound student confidence.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
                <div className="rounded-[20px] bg-surface-container-lowest p-space-lg shadow-[0_4px_16px_rgba(91,75,219,0.06)] flex flex-col justify-between relative overflow-hidden">
                  <div className="space-y-4">
                    <div className="flex items-center text-tertiary-fixed-dim">
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface italic leading-relaxed">
                      “Dati inaabot ako ng hatinggabi kakacheck ng diagnostic tests para sa apat kong sections. Sa Aralytics, nakikita ko agad kung saan nagkamali si Maria at Juan sa fractions, at may handa nang 5-item remedial drill kinabukasan.”
                    </p>
                  </div>
                  <div className="pt-6 mt-4 border-t border-surface-container-high/60 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-primary-fixed text-primary font-bold flex items-center justify-center shrink-0">
                      ES
                    </div>
                    <div>
                      <h4 className="font-label-lg text-label-lg text-on-surface font-bold">Bb. Elena Santos, LPT</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Grade 8 Adviser, Pasig National High School</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-[20px] bg-surface-container-lowest p-space-lg shadow-[0_4px_16px_rgba(91,75,219,0.06)] flex flex-col justify-between relative overflow-hidden">
                  <div className="space-y-4">
                    <div className="flex items-center text-tertiary-fixed-dim">
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface italic leading-relaxed">
                      “Hindi na nakakatakot magkamali sa math kasi si Aral parang mabait na tutor na nagpapaliwanag nang dahan-dahan sa Tagalog. Sobrang saya mag-streak tuwing gabi bago matulog!”
                    </p>
                  </div>
                  <div className="pt-6 mt-4 border-t border-surface-container-high/60 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-secondary-fixed text-secondary font-bold flex items-center justify-center shrink-0">
                      MD
                    </div>
                    <div>
                      <h4 className="font-label-lg text-label-lg text-on-surface font-bold">Maria Clara D.</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Grade 8 Learner, SDO Pasig</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-[20px] bg-surface-container-lowest p-space-lg shadow-[0_4px_16px_rgba(91,75,219,0.06)] flex flex-col justify-between relative overflow-hidden">
                  <div className="space-y-4">
                    <div className="flex items-center text-tertiary-fixed-dim">
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface italic leading-relaxed">
                      “Our quarterly passing rates in Math and Science improved by 23% in the pilot quarter because interventions happen daily, not during finals week panic. Aralytics gives school leaders crystal clarity.”
                    </p>
                  </div>
                  <div className="pt-6 mt-4 border-t border-surface-container-high/60 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-tertiary-fixed text-tertiary font-bold flex items-center justify-center shrink-0">
                      RG
                    </div>
                    <div>
                      <h4 className="font-label-lg text-label-lg text-on-surface font-bold">Mr. Roberto Gomez</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Principal II, Division of City Schools</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 bg-primary text-on-primary shadow-inner">
            <div className="max-w-[1120px] mx-auto px-margin-mobile lg:px-margin">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-space-lg text-center divide-y md:divide-y-0 md:divide-x divide-primary-fixed/20">
                <div className="p-4 flex flex-col items-center">
                  <span className="font-metric-number text-metric-number text-tertiary-fixed font-black tracking-tight leading-none">
                    4.2x
                  </span>
                  <span className="font-label-lg text-label-lg text-on-primary-container font-semibold mt-2">
                    Faster Remediation Delivery
                  </span>
                  <span className="font-body-sm text-body-sm text-on-primary-container/80 mt-0.5">
                    10-second diagnostic feedback
                  </span>
                </div>
                <div className="p-4 flex flex-col items-center pt-6 md:pt-4">
                  <span className="font-metric-number text-metric-number text-secondary-fixed font-black tracking-tight leading-none">
                    92.8%
                  </span>
                  <span className="font-label-lg text-label-lg text-on-primary-container font-semibold mt-2">
                    Quiz Completion Rate
                  </span>
                  <span className="font-body-sm text-body-sm text-on-primary-container/80 mt-0.5">
                    Across low-bandwidth regions
                  </span>
                </div>
                <div className="p-4 flex flex-col items-center pt-6 md:pt-4">
                  <span className="font-metric-number text-metric-number text-tertiary-fixed font-black tracking-tight leading-none">
                    8+ Hours
                  </span>
                  <span className="font-label-lg text-label-lg text-on-primary-container font-semibold mt-2">
                    Saved Per Teacher / Week
                  </span>
                  <span className="font-body-sm text-body-sm text-on-primary-container/80 mt-0.5">
                    Automated grading &amp; SF9 audit
                  </span>
                </div>
                <div className="p-4 flex flex-col items-center pt-6 md:pt-4">
                  <span className="font-metric-number text-metric-number text-on-primary font-black tracking-tight leading-none">
                    100%
                  </span>
                  <span className="font-label-lg text-label-lg text-on-primary-container font-semibold mt-2">
                    DepEd DO 8, s. 2015 Compliant
                  </span>
                  <span className="font-body-sm text-body-sm text-on-primary-container/80 mt-0.5">
                    Transmuted rubric formulas
                  </span>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-16 lg:py-24 bg-surface-container-low/50" id="pilot-signup">
            <div className="max-w-[1120px] mx-auto px-margin-mobile lg:px-margin">
              <div className="relative rounded-[28px] bg-gradient-to-br from-surface-container-lowest via-surface-container to-surface-container-high p-8 lg:p-14 shadow-[0_16px_40px_rgba(91,75,219,0.12)] overflow-hidden">
                <div className="absolute -top-12 -right-12 w-64 h-64 bg-tertiary-fixed/40 rounded-full blur-2xl pointer-events-none"></div>
                <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-primary-fixed/40 rounded-full blur-3xl pointer-events-none"></div>
                <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
                  <div className="inline-flex w-16 h-16 rounded-2xl bg-primary text-on-primary items-center justify-center shadow-lg mx-auto">
                    <span className="material-symbols-outlined text-[36px] text-tertiary-fixed">school</span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg sm:text-[36px] text-on-surface font-extrabold tracking-tight">
                    Ready to bring personalized learning to your school?
                  </h2>
                  <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                    Join over 45 Philippine public and private high schools pioneering AI-assisted mastery learning. <strong>Free 60-day pilot program for public high schools.</strong>
                  </p>
                  <form className="flex flex-col sm:flex-row items-center gap-space-sm max-w-lg mx-auto pt-2" onSubmit={(e) => { e.preventDefault(); setPilotSubmitted(true); e.currentTarget.reset(); }}>
                    <div className="relative w-full">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
                        <span className="material-symbols-outlined text-[20px]">mail</span>
                      </span>
                      <input className="w-full pl-10 pr-4 py-3.5 rounded-[14px] bg-surface-container-lowest border-0 ring-1 ring-outline-variant focus:ring-2 focus:ring-primary text-on-surface font-body-md text-body-md shadow-sm outline-none transition-all placeholder:text-outline" placeholder="Enter your DepEd or school email..." required type="email" />
                    </div>
                    <button className="w-full sm:w-auto px-6 py-3.5 rounded-[14px] bg-primary text-on-primary font-label-lg text-label-lg font-bold shadow-[0_4px_16px_rgba(91,75,219,0.2)] hover:bg-primary-container transition-all whitespace-nowrap shrink-0" type="submit">
                      Request School Pilot
                    </button>
                  </form>
                  <div className={`p-4 rounded-xl bg-secondary-container/40 text-on-secondary-container font-label-md text-label-md ${pilotSubmitted ? '' : 'hidden'}`} id="pilot-success-msg">
                    🎉 Salamat po! Our DepEd division onboarding coordinator will email you within 24 hours with sandbox credentials.
                  </div>
                  <div className="pt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-on-surface-variant font-label-sm text-label-sm">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-secondary text-[16px]">check_circle</span>
                      No credit card required
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-secondary text-[16px]">lock</span>
                      PH Data Privacy Act of 2012 Certified
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-secondary text-[16px]">cloud_done</span>
                      DepEd LMS &amp; LRN Ready
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/60 backdrop-blur-sm ${demoOpen ? '' : 'hidden'}`} id="demo-modal">
            <div className="relative w-full max-w-2xl bg-surface-container-lowest rounded-[24px] p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">play_circle</span>
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface">2-Minute Classroom Walkthrough</span>
                </div>
                <button className="w-8 h-8 rounded-full hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors" onClick={() => setDemoOpen(false)} type="button">
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
              <div className="w-full aspect-video rounded-xl bg-surface-container-high relative overflow-hidden flex flex-col items-center justify-center text-center p-6">
                <div className="absolute inset-0 w-full h-full bg-cover bg-center" data-alt="A bright high school classroom in the Philippines where an energetic Filipino teacher in formal DepEd uniform assists smiling Grade 8 students with tablet computers running diagnostic quizzes with colorful animated illustrations, soft warm natural sunlight" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuByAQQyWkiR8GmHKMaeGMXcq90qiOv15v4SHzx-saXMEsQTWJ5LSYKpRI9OG-5mZjpEI-C4RKBkfnydgmZknTsNg6MGxDBU5jOETzgrM4Mu-6DB_KOJg5aXAF4-cYmE2Rk64IfG8eD_TqQpkWYWTbebm6dOUBWNAskZNCfOyHoyOClPv_ca-knaAXWiSSl2LDaTkSQvM_La4j3NPEjaLOlzK-O4Anb9Qpw6iAr9wqMS92BW2RuAEpm0BQ')" }}></div>
                <div className="absolute inset-0 bg-primary/60 backdrop-blur-xs"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shadow-lg mb-3">
                    <span className="material-symbols-outlined text-[36px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                  </div>
                  <span className="font-headline-sm text-headline-sm text-on-primary font-bold">Watch: How Teacher Elena Uses Aralytics in Pasig NHS</span>
                  <span className="font-label-sm text-label-sm text-on-primary-container mt-1">Tagalog &amp; English Audio · 2:14 mins</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="font-body-sm text-body-sm text-on-surface-variant">Includes MATATAG SF9 grading demo</span>
                <button className="px-4 py-2 rounded-xl bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container-highest" onClick={() => setDemoOpen(false)} type="button">
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full bg-surface-container-low text-on-surface-variant pt-space-xl pb-space-lg shadow-[0_-1px_12px_rgba(91,75,219,0.03)]">
        <div className="max-w-[1120px] mx-auto px-margin-mobile lg:px-margin">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-space-lg pb-space-xl">
            <div className="col-span-2 lg:col-span-2 flex flex-col gap-space-sm pr-space-lg">
              <div className="flex items-center gap-space-sm">
                <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-tertiary-fixed text-[22px]">school</span></div>
                <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight">Aralytics</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mt-1">Pinag-isang AI analytics platform para sa real-time diagnostics, personalized remediation, at data-backed DepEd academic governance.</p>
              <div className="mt-space-sm inline-flex items-center gap-space-xs px-3 py-1.5 rounded-full bg-tertiary-fixed/30 text-tertiary font-label-sm text-label-sm w-fit">
                <span className="material-symbols-outlined text-tertiary text-[18px]">favorite</span><span>Gawa nang may malasakit para sa kabataang Pilipino</span>
              </div>
            </div>
            <div className="flex flex-col gap-space-sm">
              <span className="font-label-lg text-label-lg text-on-surface font-semibold">Institutional</span>
              <a className="font-body-sm text-body-sm hover:text-primary transition-colors" data-path="school-districts" href="#">School Districts</a>
              <a className="font-body-sm text-body-sm hover:text-primary transition-colors" data-path="deped-alignment" href="#">DepEd Division Partners</a>
              <a className="font-body-sm text-body-sm hover:text-primary transition-colors" data-path="pricing-pilot" href="#">Division Pilot Program</a>
              <a className="font-body-sm text-body-sm hover:text-primary transition-colors" data-path="system-benchmarks" href="#">National Benchmarks</a>
            </div>
            <div className="flex flex-col gap-space-sm">
              <span className="font-label-lg text-label-lg text-on-surface font-semibold">Educators &amp; Youth</span>
              <a className="font-body-sm text-body-sm hover:text-primary transition-colors" data-path="for-teachers" href="#">Teachers Roster</a>
              <a className="font-body-sm text-body-sm hover:text-primary transition-colors" data-path="for-students" href="#">Student Resources</a>
              <a className="font-body-sm text-body-sm hover:text-primary transition-colors" data-path="parent-portal" href="#">Parents Portal</a>
              <a className="font-body-sm text-body-sm hover:text-primary transition-colors" data-path="intervention-hub" href="#">Remediation Hub</a>
            </div>
            <div className="flex flex-col gap-space-sm">
              <span className="font-label-lg text-label-lg text-on-surface font-semibold">Compliance &amp; Trust</span>
              <a className="font-body-sm text-body-sm hover:text-primary transition-colors" data-path="privacy-policy" href="#">Data Privacy Act 2012</a>
              <a className="font-body-sm text-body-sm hover:text-primary transition-colors" data-path="terms-of-service" href="#">Terms of Service</a>
              <a className="font-body-sm text-body-sm hover:text-primary transition-colors" data-path="security-standards" href="#">Student Data Security</a>
              <a className="font-body-sm text-body-sm hover:text-primary transition-colors" data-path="deped-compliance" href="#">MATATAG Alignment</a>
            </div>
          </div>
          <div className="pt-space-md flex flex-col sm:flex-row items-center justify-between gap-space-sm font-body-sm text-body-sm text-on-surface-variant">
            <p>© {CURRENT_YEAR} Aralytics EdTech Philippines Inc. Nakalaan ang lahat ng karapatan.</p>
            <div className="flex items-center gap-space-md">
              <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-secondary"></span> DepEd LMS Ready</span>
              <span>Lungsod Quezon, Pilipinas</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
