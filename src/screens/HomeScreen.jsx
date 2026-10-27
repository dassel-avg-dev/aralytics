import { useState } from 'react';
import { Link } from 'react-router-dom';

const CURRENT_YEAR = new Date().getFullYear();

export default function HomeScreen() {
  const [lang, setLang] = useState('EN');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-background font-body-md text-on-surface min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(91,75,219,0.06)]">
        <div className="h-20 max-w-[1120px] mx-auto px-gutter flex items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-lg">
            <Link
              className="flex items-center gap-space-sm text-decoration-none focus:outline-none"
              data-path="home"
              to="/home"
            >
              <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary shadow-[0_2px_8px_rgba(91,75,219,0.12)]">
                <span className="material-symbols-outlined text-[24px]">school</span>
              </div>
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight font-extrabold">
                Aralytics
              </span>
            </Link>
            <nav
              className="hidden xl:flex items-center gap-space-xs"
              data-active-classes="bg-primary-container text-on-primary font-label-lg text-label-lg rounded-full px-space-md py-space-xs shadow-[0_2px_8px_rgba(91,75,219,0.15)]"
            >
              <Link
                aria-current="page"
                className="transition-colors bg-primary-container text-on-primary font-label-lg text-label-lg rounded-full px-space-md py-space-xs shadow-[0_2px_8px_rgba(91,75,219,0.15)]"
                data-path="home"
                to="/home"
              >
                Home
              </Link>
              <Link
                className="px-space-md py-space-xs rounded-full font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
                data-path="my-quizzes-activities"
                to="/activities"
              >
                My Quizzes &amp; Activities
              </Link>
              <Link
                className="px-space-md py-space-xs rounded-full font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
                data-path="my-progress-badges"
                to="/reports"
              >
                My Progress &amp; Badges
              </Link>
              <a
                className="px-space-md py-space-xs rounded-full font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
                data-path="aral-ai-feedback"
                href="#"
              >
                Aral AI Feedback
              </a>
            </nav>
            <button
              aria-expanded={menuOpen}
              aria-label="Open navigation menu"
              className="xl:hidden w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors shrink-0"
              onClick={() => setMenuOpen(!menuOpen)}
              title="Menu"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">
                {menuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
          <div className="flex items-center gap-space-sm">
            <div className="flex items-center p-0.5 bg-surface-container rounded-full">
              <button
                className={
                  lang === 'EN'
                    ? 'px-2.5 py-1 rounded-full font-label-md text-label-md bg-surface-container-lowest text-primary font-bold shadow-sm'
                    : 'px-2.5 py-1 rounded-full font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors'
                }
                onClick={() => setLang('EN')}
                type="button"
              >
                EN
              </button>
              <button
                className={
                  lang === 'FIL'
                    ? 'px-2.5 py-1 rounded-full font-label-md text-label-md bg-surface-container-lowest text-primary font-bold shadow-sm'
                    : 'px-2.5 py-1 rounded-full font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors'
                }
                onClick={() => setLang('FIL')}
                type="button"
              >
                FIL
              </button>
            </div>
            <div className="hidden sm:flex items-center gap-space-xs bg-surface-container px-3 py-1.5 rounded-full">
              <span className="material-symbols-outlined text-[18px] text-tertiary-container">
                local_fire_department
              </span>
              <span className="font-label-md text-label-md font-bold text-on-surface">5 Days</span>
            </div>
            <div className="hidden md:flex items-center gap-space-xs bg-secondary-fixed/50 px-3 py-1.5 rounded-full">
              <span className="material-symbols-outlined text-[18px] text-secondary">bolt</span>
              <span className="font-label-md text-label-md font-bold text-secondary">320 XP</span>
            </div>
            <button
              aria-label="Notifications"
              className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors relative"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-error"></span>
            </button>
            <div className="flex items-center gap-space-sm pl-space-xs">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary">
                <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
              </div>
              <div className="hidden lg:flex flex-col text-left">
                <span className="font-label-md text-label-md text-on-surface leading-tight font-bold">
                  Maria Santos
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant leading-tight">
                  Gr. 8 - Sampaguita
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile nav dropdown */}
        {menuOpen && (
          <div className="xl:hidden border-t border-lavender-ash bg-surface-container-lowest/95 backdrop-blur-xl px-gutter py-space-md flex flex-col gap-1">
            <Link
              className="flex items-center px-space-md py-2.5 rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg font-bold"
              onClick={() => setMenuOpen(false)}
              to="/home"
            >
              Home
            </Link>
            <Link
              className="flex items-center px-space-md py-2.5 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container transition-colors"
              onClick={() => setMenuOpen(false)}
              to="/activities"
            >
              My Quizzes &amp; Activities
            </Link>
            <Link
              className="flex items-center px-space-md py-2.5 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container transition-colors"
              onClick={() => setMenuOpen(false)}
              to="/reports"
            >
              My Progress &amp; Badges
            </Link>
            <a
              className="flex items-center px-space-md py-2.5 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container transition-colors"
              data-path="aral-ai-feedback"
              href="#"
              onClick={() => setMenuOpen(false)}
            >
              Aral AI Feedback
            </a>
          </div>
        )}
      </header>
      <main className="w-full pt-20 bg-background max-w-[1120px] mx-auto px-gutter">
        <div className="flex flex-col w-full pb-16">
          {/* Top Greeting &amp; Motivation Banner Section */}
          <section className="w-full pt-6 pb-4">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
              <div>
                <div className="inline-flex items-center gap-space-xs px-3 py-1 rounded-full bg-surface-container text-primary font-label-md text-label-md mb-2">
                  <span className="material-symbols-outlined text-[16px]">school</span>
                  <span>Pasig National High School • Section 8-Sampaguita</span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-extrabold flex items-center gap-2">
                  Magandang araw, Maria!{' '}
                  <span className="inline-block hover:rotate-12 transition-transform cursor-pointer">
                    👋
                  </span>
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">
                  Ready for your 8-minute daily drill today? Your adviser{' '}
                  <span className="font-bold text-on-surface">Bb. Elena Santos, LPT</span> posted new
                  feedback.
                </p>
              </div>
              {/* Quick Student Metric Badges */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-2 bg-surface-container-lowest px-3.5 py-2 rounded-2xl shadow-[0_4px_16px_rgba(91,75,219,0.06)]">
                  <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[18px]">military_tech</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Badge Tier
                    </span>
                    <span className="font-label-lg text-label-lg text-on-surface font-bold">
                      Lvl 4 Explorer
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-surface-container-lowest px-3.5 py-2 rounded-2xl shadow-[0_4px_16px_rgba(91,75,219,0.06)]">
                  <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[18px]">leaderboard</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Class Standing
                    </span>
                    <span className="font-label-lg text-label-lg text-on-surface font-bold">
                      Rank #3
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-surface-container-lowest px-3.5 py-2 rounded-2xl shadow-[0_4px_16px_rgba(91,75,219,0.06)]">
                  <div className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary">
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      local_fire_department
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Current Streak
                    </span>
                    <span className="font-label-lg text-label-lg text-on-surface font-bold">
                      5 Days 🔥
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Coral Streak Urgency Banner */}
            <div className="mt-5 w-full bg-surface-container-lowest rounded-2xl p-4 sm:p-5 shadow-[0_4px_16px_rgba(91,75,219,0.08)] relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-error"></div>
              <div className="flex items-center gap-3.5 pl-1.5">
                <div className="w-11 h-11 rounded-2xl bg-error-container text-error flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">crisis_alert</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-label-md text-label-md text-error font-bold uppercase tracking-wider">
                      Streak at Risk!
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Resets at 11:59 PM tonight
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface font-medium mt-0.5">
                    Complete at least 1 micro-quiz today to safeguard your{' '}
                    <span className="font-bold text-on-surface">5-day streak</span> and earn +25
                    bonus XP!
                  </p>
                </div>
              </div>
              <button
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[14px] bg-primary text-on-primary font-label-lg text-label-lg font-bold hover:bg-primary-container transition-all shadow-[0_4px_12px_rgba(66,46,194,0.25)] shrink-0 self-start sm:self-auto"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                <span>Start Quick Drill</span>
              </button>
            </div>
          </section>
          {/* Main Bento Grid (Hero Priority Drill 8 cols + Aral AI Coach 4 cols) */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg mt-3">
            {/* Hero Priority Activity Card (8 cols) */}
            <div className="lg:col-span-7 xl:col-span-8 bg-surface-container-lowest rounded-[20px] p-6 lg:p-7 shadow-[0_4px_16px_rgba(91,75,219,0.08)] flex flex-col justify-between relative overflow-hidden">
              {/* Decorative background accent glow */}
              <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary-fixed/30 blur-3xl pointer-events-none"></div>
              <div className="flex-1 flex flex-col">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-semibold">
                      <span className="material-symbols-outlined text-[14px]">assignment_ind</span>
                      Assigned by Bb. Santos
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-fixed/50 text-secondary font-label-sm text-label-sm font-bold">
                      <span className="material-symbols-outlined text-[14px]">stars</span>
                      +50 XP Bonus
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-error font-label-md text-label-md font-semibold">
                    <span className="material-symbols-outlined text-[16px]">timer</span>
                    Due Today, 5:00 PM
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
                  <div>
                    <div className="flex items-center gap-2 text-primary font-label-md text-label-md font-bold uppercase tracking-wider mb-1">
                      <span className="material-symbols-outlined text-[16px]">calculate</span>
                      Mathematics 8 • Quarter 2 Diagnostic
                    </div>
                    <h2 className="font-headline-md text-headline-md text-on-surface font-extrabold tracking-tight">
                      Fractions &amp; Mixed Numbers Diagnostic
                    </h2>
                  </div>
                  <div className="shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-fixed text-primary shadow-[0_2px_8px_rgba(91,75,219,0.12)]">
                    <span className="material-symbols-outlined text-[32px]">functions</span>
                  </div>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mt-3 max-w-2xl leading-relaxed">
                  Focus: Unlike denominators, common denominators (LCM), and real-world word problem
                  simplification. Designed to help diagnose areas where step-by-step factoring needs
                  practice.
                </p>
                {/* Metadata Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-5">
                  <div className="p-3 rounded-xl bg-surface-container-low flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-primary text-[20px]">quiz</span>
                    <div>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">
                        Question Count
                      </p>
                      <p className="font-label-lg text-label-lg text-on-surface font-bold">
                        10 Interactive
                      </p>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-container-low flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      hourglass_top
                    </span>
                    <div>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">
                        Est. Duration
                      </p>
                      <p className="font-label-lg text-label-lg text-on-surface font-bold">
                        ~8 Minutes
                      </p>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-container-low flex items-center gap-2.5 col-span-2 sm:col-span-1">
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      target
                    </span>
                    <div>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">
                        Target Score
                      </p>
                      <p className="font-label-lg text-label-lg text-on-surface font-bold">
                        80% to Master
                      </p>
                    </div>
                  </div>
                </div>
                {/* Warm-up Preview */}
                <div className="mt-5 flex-1 flex flex-col">
                  <div className="p-4 rounded-2xl border border-lavender-ash bg-cream/60 flex-1 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-label-md text-on-surface font-bold flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-primary">
                          lightbulb
                        </span>
                        Warm-up preview
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm font-semibold shrink-0">
                        3 skills
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {['Unlike denominators', 'Finding the LCM', 'Real-world word problems'].map(
                        (skill) => (
                          <span
                            className="px-2.5 py-1 rounded-full bg-surface-container-lowest text-on-surface-variant border border-lavender-ash font-label-sm text-label-sm"
                            key={skill}
                          >
                            {skill}
                          </span>
                        ),
                      )}
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Suggested pace: ~45 seconds per question · Aral Coach steps in after 2 misses.
                    </p>
                  </div>
                </div>
              </div>
              {/* Action Row */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[14px] bg-tertiary-fixed text-on-tertiary-fixed font-headline-sm text-headline-sm font-extrabold hover:bg-tertiary-fixed-dim transition-all shadow-[0_4px_16px_rgba(244,191,50,0.35)]"
                  type="button"
                >
                  <span>Start Quiz Now</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
                <button
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[14px] bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors font-label-lg text-label-lg"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">info</span>
                  <span>Preview Competency Details</span>
                </button>
              </div>
            </div>
            {/* Signature Aral Coach AI Personal Feedback Hub (4 cols) */}
            <div className="lg:col-span-5 xl:col-span-4 bg-surface-container-lowest rounded-[20px] p-6 shadow-[0_4px_16px_rgba(91,75,219,0.08)] flex flex-col justify-between relative">
              <div>
                {/* AI Hub Header */}
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-surface-container-high">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-primary-fixed flex items-center justify-center text-primary relative shadow-sm">
                      <span
                        className="material-symbols-outlined text-[28px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        smart_toy
                      </span>
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-secondary-container border-2 border-surface-container-lowest"></span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-headline-sm text-headline-sm text-on-surface font-extrabold">
                          Aral Coach AI
                        </h3>
                        <span className="material-symbols-outlined text-primary text-[16px]">
                          verified
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Personalized Study Nudge • 10m ago
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center justify-center shrink-0 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-bold text-center">
                    Just In
                  </span>
                </div>
                {/* Mascot Speech Bubble */}
                <div className="mt-4 p-4 rounded-2xl bg-surface-container-low relative">
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-tertiary-container text-[20px] shrink-0 mt-0.5">
                      auto_awesome
                    </span>
                    <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                      “Nice work on fractions, Maria! You got all the addition problems right.
                      Subtraction with different denominators tripped you up, so try finding the
                      common denominator first. You've got this! ✨”
                    </p>
                  </div>
                </div>
                {/* Feedback Highlights */}
                <div className="space-y-2.5 mt-4">
                  <div className="p-3 rounded-xl bg-surface-container flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                    </div>
                    <div className="flex-1">
                      <span className="font-label-sm text-label-sm text-secondary font-bold block uppercase tracking-wide">
                        What went well
                      </span>
                      <p className="font-body-sm text-body-sm text-on-surface font-medium">
                        Addition with like denominators (100% accuracy)
                      </p>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-container flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[14px] font-bold">
                        lightbulb
                      </span>
                    </div>
                    <div className="flex-1">
                      <span className="font-label-sm text-label-sm text-tertiary font-bold block uppercase tracking-wide">
                        Try this next
                      </span>
                      <p className="font-body-sm text-body-sm text-on-surface font-medium">
                        Lowest Common Multiple (LCM) step
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* AI Actions */}
              <div className="mt-6 pt-3 flex flex-col gap-2">
                <button
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-[14px] bg-primary-container text-on-primary font-label-lg text-label-lg font-bold hover:bg-primary transition-all shadow-[0_2px_8px_rgba(91,75,219,0.15)]"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">psychology</span>
                  <span>Practice Weak Topic (5 min)</span>
                </button>
                <button
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 text-on-surface-variant hover:text-primary font-label-md text-label-md font-semibold transition-colors"
                  type="button"
                >
                  <span>View All Past Feedback (4)</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </section>
          {/* Subject Mastery &amp; Progress Overview Section */}
          <section className="mt-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                  <h2 className="font-headline-md text-headline-md text-on-surface font-extrabold tracking-tight">
                    Subject Mastery Breakdown
                  </h2>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Real-time adaptive assessment scores mapped to DepEd Grade 8 competencies
                </p>
              </div>
              <a
                className="inline-flex items-center gap-1 font-label-lg text-label-lg text-primary hover:text-primary-container transition-colors font-bold self-start sm:self-auto"
                href="#"
              >
                <span>View Curriculum Matrix</span>
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </a>
            </div>
            {/* 4 Mastery Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Subject 1: Math */}
              <div className="bg-surface-container-lowest rounded-[20px] p-5 shadow-[0_4px_16px_rgba(91,75,219,0.08)] flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[22px]">calculate</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
                      Needs Nudge
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
                    Mathematics
                  </span>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface font-extrabold mt-0.5 leading-snug">
                    Fractions &amp; Mixed Numbers
                  </h4>
                </div>
                <div className="mt-5">
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Mastery Index
                    </span>
                    <span className="font-metric-number text-headline-sm text-tertiary font-extrabold">
                      71%
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-surface-container overflow-hidden">
                    <div
                      className="h-full rounded-full bg-tertiary-fixed-dim"
                      style={{ width: '71%' }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-2 text-on-surface-variant font-body-sm text-body-sm">
                    <span>Last drill: Yesterday</span>
                    <span className="material-symbols-outlined text-[16px] text-tertiary">
                      trending_up
                    </span>
                  </div>
                </div>
              </div>
              {/* Subject 2: Science */}
              <div className="bg-surface-container-lowest rounded-[20px] p-5 shadow-[0_4px_16px_rgba(91,75,219,0.08)] flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary-fixed/50 flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined text-[22px]">eco</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">
                      Mastered
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
                    Science
                  </span>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface font-extrabold mt-0.5 leading-snug">
                    Plant Biology &amp; Photosynthesis
                  </h4>
                </div>
                <div className="mt-5">
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Mastery Index
                    </span>
                    <span className="font-metric-number text-headline-sm text-secondary font-extrabold">
                      92%
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-surface-container overflow-hidden">
                    <div
                      className="h-full rounded-full bg-secondary"
                      style={{ width: '92%' }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-2 text-on-surface-variant font-body-sm text-body-sm">
                    <span>Last drill: 3 days ago</span>
                    <span className="material-symbols-outlined text-[16px] text-secondary">
                      verified
                    </span>
                  </div>
                </div>
              </div>
              {/* Subject 3: Filipino */}
              <div className="bg-surface-container-lowest rounded-[20px] p-5 shadow-[0_4px_16px_rgba(91,75,219,0.08)] flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[22px]">menu_book</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">
                      Mastered
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
                    Filipino
                  </span>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface font-extrabold mt-0.5 leading-snug">
                    Panitikan: Ibong Adarna
                  </h4>
                </div>
                <div className="mt-5">
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Mastery Index
                    </span>
                    <span className="font-metric-number text-headline-sm text-secondary font-extrabold">
                      94%
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-surface-container overflow-hidden">
                    <div
                      className="h-full rounded-full bg-secondary"
                      style={{ width: '94%' }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-2 text-on-surface-variant font-body-sm text-body-sm">
                    <span>Last drill: Dec 12</span>
                    <span className="material-symbols-outlined text-[16px] text-secondary">
                      verified
                    </span>
                  </div>
                </div>
              </div>
              {/* Subject 4: English */}
              <div className="bg-surface-container-lowest rounded-[20px] p-5 shadow-[0_4px_16px_rgba(91,75,219,0.08)] flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[22px]">spellcheck</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-bold">
                      On Track
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
                    English
                  </span>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface font-extrabold mt-0.5 leading-snug">
                    Verb Tenses &amp; Structures
                  </h4>
                </div>
                <div className="mt-5">
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Mastery Index
                    </span>
                    <span className="font-metric-number text-headline-sm text-primary font-extrabold">
                      74%
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-surface-container overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: '74%' }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-2 text-on-surface-variant font-body-sm text-body-sm">
                    <span>Last drill: 5 days ago</span>
                    <span className="material-symbols-outlined text-[16px] text-primary">
                      trending_flat
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Two-Column Bottom Section (Learning Path &amp; Gamification) */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg mt-10">
            {/* Left Column: Learning Path &amp; Upcoming Quizzes (6 cols) */}
            <div className="lg:col-span-6 bg-surface-container-lowest rounded-[20px] p-6 shadow-[0_4px_16px_rgba(91,75,219,0.08)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-surface-container-high mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[20px]">
                        calendar_month
                      </span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-extrabold">
                        Your Learning Path
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Upcoming micro-quizzes assigned by your teachers
                      </p>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm text-primary font-bold bg-surface-container px-2.5 py-1 rounded-full">
                    2 Due This Week
                  </span>
                </div>
                <div className="space-y-3.5">
                  {/* Quiz Item 1 */}
                  <div className="p-4 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-secondary-fixed/40 text-secondary flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[20px]">science</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-label-sm text-label-sm text-secondary font-bold">
                            Science 8
                          </span>
                          <span className="text-on-surface-variant text-[11px]">•</span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                            Moderate Difficulty
                          </span>
                        </div>
                        <h4 className="font-label-lg text-label-lg text-on-surface font-extrabold mt-0.5">
                          Photosynthesis Unit Review
                        </h4>
                        <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm mt-1">
                          <span className="material-symbols-outlined text-[14px]">schedule</span>
                          <span>Due Tomorrow, 5:00 PM</span>
                          <span>•</span>
                          <span>15 questions</span>
                        </div>
                      </div>
                    </div>
                    <button
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-surface-container-lowest text-primary font-label-md text-label-md font-bold shadow-sm hover:bg-primary hover:text-on-primary transition-all self-start sm:self-auto shrink-0"
                      type="button"
                    >
                      <span>Start</span>
                      <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    </button>
                  </div>
                  {/* Quiz Item 2 */}
                  <div className="p-4 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[20px]">
                          auto_stories
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-label-sm text-label-sm text-primary font-bold">
                            Filipino 8
                          </span>
                          <span className="text-on-surface-variant text-[11px]">•</span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                            Standard Drill
                          </span>
                        </div>
                        <h4 className="font-label-lg text-label-lg text-on-surface font-extrabold mt-0.5">
                          Ibong Adarna: Kabanata 6-10 Drill
                        </h4>
                        <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm mt-1">
                          <span className="material-symbols-outlined text-[14px]">schedule</span>
                          <span>Due Friday, Dec 20</span>
                          <span>•</span>
                          <span>10 questions</span>
                        </div>
                      </div>
                    </div>
                    <button
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-surface-container-lowest text-primary font-label-md text-label-md font-bold shadow-sm hover:bg-primary hover:text-on-primary transition-all self-start sm:self-auto shrink-0"
                      type="button"
                    >
                      <span>Start</span>
                      <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-surface-container-high flex items-center justify-between">
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Looking for older activities?
                </span>
                <a
                  className="font-label-md text-label-md text-primary font-bold hover:underline"
                  href="#"
                >
                  View All Completed Quizzes →
                </a>
              </div>
            </div>
            {/* Right Column: Gamification &amp; Weekly Milestones (6 cols) */}
            <div className="lg:col-span-6 bg-surface-container-lowest rounded-[20px] p-6 shadow-[0_4px_16px_rgba(91,75,219,0.08)] flex flex-col justify-between">
              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between pb-4 border-b border-surface-container-high mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary">
                      <span className="material-symbols-outlined text-[20px]">emoji_events</span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-extrabold">
                        Gamification &amp; Milestones
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Track your habits, badges, and weekly targets
                      </p>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm text-tertiary font-bold bg-tertiary-fixed/50 px-2.5 py-1 rounded-full">
                    Week 14 Active
                  </span>
                </div>
                {/* Daily Drill Goal &amp; Mascot Quote Banner */}
                <div className="p-4 rounded-2xl bg-surface-container-low flex flex-col sm:flex-row items-center gap-4">
                  {/* Circular Progress Ring (Inline SVG) */}
                  <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 72 72">
                      <circle
                        className="text-surface-container"
                        cx="36"
                        cy="36"
                        fill="none"
                        r="30"
                        stroke="currentColor"
                        strokeWidth="6"
                      />
                      <circle
                        className="text-primary"
                        cx="36"
                        cy="36"
                        fill="none"
                        r="30"
                        stroke="currentColor"
                        strokeDasharray="188.4"
                        strokeDashoffset="94.2"
                        strokeLinecap="round"
                        strokeWidth="6"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-extrabold leading-none">
                        1/2
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant text-[9px] mt-0.5">
                        DRILLS
                      </span>
                    </div>
                  </div>
                  {/* Motivational Mascot Speech */}
                  <div className="text-center sm:text-left flex-1">
                    <div className="inline-flex items-center gap-1 text-primary font-label-sm text-label-sm font-bold uppercase tracking-wide">
                      <span className="material-symbols-outlined text-[14px]">psychology</span>
                      Aral Reminder
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface font-semibold mt-0.5 italic">
                      “Kaya mo 'yan, Maria! Aral is always here to help you learn step by step.”
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      Complete your second micro-quiz to hit today's daily 100% goal.
                    </p>
                  </div>
                </div>
                {/* Recent Badges Earned Mosaic */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-label-md text-label-md text-on-surface font-bold">
                      Recent Badges Unlocked
                    </span>
                    <span className="font-label-sm text-label-sm text-primary font-bold">
                      12 Total Badges
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {/* Badge 1 */}
                    <div className="p-3 rounded-xl bg-surface-container flex flex-col items-center text-center group hover:bg-surface-container-high transition-colors">
                      <div className="w-11 h-11 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary shadow-sm mb-1.5 group-hover:scale-110 transition-transform">
                        <span
                          className="material-symbols-outlined text-[24px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          local_fire_department
                        </span>
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface font-bold leading-tight">
                        3-Day Streak
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant text-[11px] mt-0.5">
                        Unlocked 2d ago
                      </span>
                    </div>
                    {/* Badge 2 */}
                    <div className="p-3 rounded-xl bg-surface-container flex flex-col items-center text-center group hover:bg-surface-container-high transition-colors">
                      <div className="w-11 h-11 rounded-full bg-primary-fixed flex items-center justify-center text-primary shadow-sm mb-1.5 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-[24px]">pie_chart</span>
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface font-bold leading-tight">
                        Fraction Fighter
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant text-[11px] mt-0.5">
                        Unlocked Dec 10
                      </span>
                    </div>
                    {/* Badge 3 */}
                    <div className="p-3 rounded-xl bg-surface-container flex flex-col items-center text-center group hover:bg-surface-container-high transition-colors">
                      <div className="w-11 h-11 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary shadow-sm mb-1.5 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-[24px]">bolt</span>
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface font-bold leading-tight">
                        Speedy Thinker
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant text-[11px] mt-0.5">
                        Under 5 mins drill
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Footer CTA to Badges Gallery */}
              <div className="mt-5 pt-4 border-t border-surface-container-high flex items-center justify-between">
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Next reward: “Math Wizard II” (35 XP to go)
                </span>
                <a
                  className="font-label-md text-label-md text-primary font-bold hover:underline"
                  href="#"
                >
                  View All Badges →
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
      <footer className="w-full bg-surface-container-lowest mt-space-xl py-space-lg shadow-[0_-1px_8px_rgba(91,75,219,0.04)]">
        <div className="max-w-[1120px] mx-auto px-gutter flex flex-col md:flex-row items-center justify-between gap-space-md text-center md:text-left">
          <div className="flex items-center gap-space-xs">
            <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[14px]">school</span>
            </div>
            <span className="font-headline-sm text-headline-sm text-on-surface">Aralytics</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant ml-space-xs">
              • Pagsulong sa Karunungan
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            © {CURRENT_YEAR} Aralytics Learning Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
