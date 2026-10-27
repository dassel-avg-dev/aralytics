import StatCard from '../components/ui/StatCard'
import MasteryRing from '../components/ui/MasteryRing'

const PRIORITY_NUDGES = [
  {
    name: 'M. Reyes',
    reason: 'Scored 48% on Simulations Quiz 3 – two attempts below the class median.',
    action: 'Send Nudge',
    chip: 'bg-danger-tint text-danger',
    chipLabel: 'Needs Help',
    avatarBg: 'bg-primary-container',
  },
  {
    name: 'A. Dela Cruz',
    reason: 'No activity logged for 5 days – weekly streak at risk of breaking.',
    action: 'Message',
    chip: 'bg-warn-tint text-warn',
    chipLabel: 'Needs Nudge',
    avatarBg: 'bg-secondary',
  },
  {
    name: 'J. Lim',
    reason: 'Improving fast +12% since last week – may be ready for enrichment set.',
    action: 'Advance',
    chip: 'bg-status-ok-tint text-status-ok',
    chipLabel: 'On Track',
    avatarBg: 'bg-tertiary-container',
  },
]

const UPCOMING = [
  { title: 'Simulations Quiz 3', meta: 'Friday · 42 assigned · auto-graded', icon: 'quiz' },
  { title: 'Genetics Unit Diagnostic', meta: 'Next Monday · unlocks remedial pathway', icon: 'science' },
  { title: 'Q2 Progress Reports to Parents', meta: 'Auto-generated from mastery data', icon: 'family_link' },
]

function initials(name) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
}

function Avatar({ name, bgClass }) {
  return (
    <div
      className={`w-9 h-9 shrink-0 rounded-full ${bgClass} text-on-primary font-label-md text-label-md flex items-center justify-center uppercase`}
    >
      {initials(name)}
    </div>
  )
}

export default function TeacherDashboard() {
  return (
    <div className="flex flex-col w-full">
      <div className="px-space-lg py-space-xl max-w-[1280px] w-full mx-auto flex flex-col gap-space-xl">
        {/* Top Context & Header Action Band */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
              <span className="text-primary font-bold">Classroom Central</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span>Today at a Glance</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Good morning, Bb. Santos!
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Here is how <span className="text-primary font-semibold">Grade 8 - Sampaguita</span>{' '}
              is progressing – Quarter 2 Assessment Period.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-space-sm">
            <button
              className="flex items-center gap-space-xs px-space-md py-2.5 rounded-xl bg-surface-container-lowest text-on-surface hover:bg-surface-container-high transition-all shadow-sm font-label-md text-label-md"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">download</span>
              <span>Weekly Summary (PDF)</span>
            </button>
            <button
              className="flex items-center gap-space-xs px-space-md py-2.5 rounded-xl bg-surface-container text-primary hover:bg-surface-container-high transition-all font-label-md text-label-md"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">forward_to_inbox</span>
              <span>Nudge 3 Students</span>
            </button>
            <button
              className="flex items-center gap-space-xs px-space-md py-2.5 rounded-xl bg-primary-container text-on-primary hover:bg-primary transition-all shadow-md font-label-md text-label-md"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>New Activity</span>
            </button>
          </div>
        </div>

        {/* Overview Diagnostic KPI Ribbon */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          <StatCard
            count={29}
            dotClass="bg-secondary"
            label="On Track"
            ring={69}
            ringChildren="69%"
            ringColorClass="text-secondary"
            trendClass="text-secondary"
            trendIcon="trending_up"
            trendText="69% of class – Meets mastery"
            unit="students"
          />
          <StatCard
            count={10}
            dotClass="bg-warn"
            label="Needs a Nudge"
            ring={24}
            ringChildren="24%"
            ringColorClass="text-warn"
            trendClass="text-warn"
            trendIcon="trending_flat"
            trendText="24% of class – Slipping pace"
            unit="students"
          />
          <StatCard
            count={3}
            dotClass="bg-danger"
            label="Urgent Intervention"
            ring={7}
            ringChildren="7%"
            ringColorClass="text-danger"
            trendClass="text-danger"
            trendIcon="trending_down"
            trendText="7% of class – Flagged by AI"
            unit="students"
          />
        </div>

        {/* Trend + Priority Nudges */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-space-lg">
          {/* Class Mastery Trend Chart */}
          <div className="lg:col-span-3 bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">Class Mastery Trend</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Average mastery across topics – last 6 weeks
                </p>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="px-3 py-1 rounded-full bg-status-ok-tint text-status-ok font-label-md text-label-md">
                  +8.2% this month
                </span>
              </div>
            </div>
            <div className="relative w-full h-[220px]">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 560 220">
                {[0, 55, 110, 165, 220].map((y) => (
                  <line
                    className="stroke-lavender-ash"
                    key={y}
                    strokeWidth="1"
                    x1={0}
                    x2={560}
                    y1={y}
                    y2={y}
                  />
                ))}
                {[
                  'M0,165 C60,150 110,158 160,140 C210,122 260,130 310,105 C360,86 410,92 460,66 C500,50 530,45 560,38',
                ].map((d) => (
                  <path
                    className="text-primary-container"
                    d={d}
                    fill="none"
                    key="trend"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="3"
                  />
                ))}
                {[0, 112, 224, 336, 448, 560].map((x, i) => (
                  <circle
                    className={(i % 2 === 0 ? 'fill-surface-container-lowest' : 'fill-primary-container') + ' stroke-primary-container'}
                    cx={x}
                    cy={[165, 140, 105, 92, 66, 38][i]}
                    fill={i === 5 ? '#5b4bdb' : '#fbf8ff'}
                    key={x}
                    r="5"
                    stroke="#5b4bdb"
                    strokeWidth="2.5"
                  />
                ))}
              </svg>
            </div>
            <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant">
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span>Week 4</span>
              <span>Week 5</span>
              <span>Week 6</span>
            </div>
          </div>

          {/* Priority Nudges */}
          <div className="lg:col-span-2 bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Today's Nudges</h2>
              <span className="px-3 py-1 rounded-full bg-coral/10 text-coral font-label-md text-label-md">
                AI Ranked
              </span>
            </div>
            <div className="flex flex-col">
              {PRIORITY_NUDGES.map((n) => (
                <div
                  className="flex items-start gap-space-sm py-space-md border-b border-lavender-ash last:border-0"
                  key={n.name}
                >
                  <Avatar bgClass={n.avatarBg} name={n.name} />
                  <div className="flex flex-col gap-space-xs min-w-0">
                    <div className="flex items-center justify-between gap-space-sm">
                      <span className="font-label-lg text-label-lg text-on-surface">{n.name}</span>
                      <span className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm ${n.chip}`}>
                        {n.chipLabel}
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{n.reason}</p>
                    <button
                      className="self-start flex items-center gap-1 text-primary font-label-md text-label-md hover:underline"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">forward_to_inbox</span>
                      {n.action}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming + Mastery Snapshot */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-space-lg">
          <div className="lg:col-span-2 bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Upcoming</h2>
              <span className="font-label-md text-label-md text-primary hover:underline cursor-pointer">
                View all
              </span>
            </div>
            {UPCOMING.map((u) => (
              <div
                className="flex items-start gap-space-md p-space-md rounded-xl bg-surface-container-low border border-lavender-ash"
                key={u.title}
              >
                <span className="material-symbols-outlined text-[22px] text-primary p-space-xs bg-primary-fixed rounded-lg">
                  {u.icon}
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="font-label-lg text-label-lg text-on-surface">{u.title}</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">{u.meta}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Topic Mastery Snapshot */}
          <div className="lg:col-span-3 bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm">
            <div className="flex items-center justify-between mb-space-md">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Topic Mastery Snapshot</h2>
              <span className="font-label-md text-label-md text-primary hover:underline cursor-pointer">
                Full breakdown
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-space-lg items-end">
              {[
                { topic: 'Photosynthesis', pct: 84, cls: 'text-status-ok' },
                { topic: 'Genetics', pct: 61, cls: 'text-primary-container' },
                { topic: 'Chem Reactions', pct: 45, cls: 'text-warn' },
                { topic: 'Ecosystems', pct: 72, cls: 'text-primary-container' },
              ].map((t) => (
                <div className="flex flex-col items-center gap-space-sm" key={t.topic}>
                  <MasteryRing colorClass={t.cls} size="w-24 h-24" value={t.pct} />
                  <span className="font-label-md text-label-md text-on-surface text-center">
                    {t.topic}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
