import { useEffect, useRef, useState } from 'react'

const FILTER_TAB_ACTIVE =
  'px-3 py-1 rounded-lg bg-surface-container-lowest text-primary font-label-sm text-label-sm font-bold shadow-xs transition-all'
const FILTER_TAB_IDLE =
  'px-3 py-1 rounded-lg text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-all'

const ROSTER_FILTERS = [
  { value: 'all', label: 'All (42)' },
  { value: 'on-track', label: 'On Track (29)' },
  { value: 'needs-nudge', label: 'Needs Nudge (9)' },
  { value: 'needs-help', label: 'Needs Help (4)' },
]

const NEEDS_ATTENTION_STUDENTS = [
  {
    initials: 'MS',
    name: 'Maria Santos',
    scoreLabel: '58% · Fractions',
    scoreColor: 'text-error',
    detail: 'Struggled with common denominators on Q4 & Q7',
    mailTitle: 'Send Tip',
    status: 'Needs Help',
    score: '58%',
    observation:
      'Struggled with common denominators on questions 4 & 7. Missed 2 practice check-ins.',
  },
  {
    initials: 'JD',
    name: 'Juan Dela Cruz',
    scoreLabel: '62% · Grammar',
    scoreColor: 'text-error',
    detail: 'Missed 2 consecutive quizzes; submitted late',
    mailTitle: 'Send Nudge',
    status: 'Needs Help',
    score: '62%',
    observation:
      'Late submissions on verb tenses. Shows high offline participation.',
  },
  {
    initials: 'AR',
    name: 'Angel Reyes',
    scoreLabel: '71% · Science',
    scoreColor: 'text-tertiary',
    detail: 'Confidence low on terms; hesitant on timer',
    mailTitle: 'Send Tip',
    status: 'Needs a Nudge',
    score: '71%',
    observation:
      'Hesitant on vocabulary matching. Suggest visual diagram practice.',
  },
  {
    initials: 'PG',
    name: 'Paolo Garcia',
    scoreLabel: '73% · Fractions',
    scoreColor: 'text-tertiary',
    detail: 'Completion time was fast (<3 min), rushed guesses',
    mailTitle: 'Send Encouragement',
    status: 'Needs a Nudge',
    score: '73%',
    observation:
      'Speed was abnormally quick. Remind to utilize scratchpad.',
  },
]

const ROSTER_STUDENTS = [
  {
    initials: 'MS',
    id: '109283-001',
    name: 'Maria Santos',
    score: 58,
    scoreColor: 'text-error',
    barColor: 'bg-error',
    trend: '-6%',
    trendColor: 'text-error',
    statusValue: 'needs-help',
    statusLabel: 'Needs Help',
    statusColor: 'text-error',
    statusDot: 'bg-error',
    lastActive: '15 mins ago',
    modalStatus: 'Needs Help',
    observation:
      'Struggled with common denominators on questions 4 & 7. Missed 2 practice check-ins.',
  },
  {
    initials: 'JD',
    id: '109283-002',
    name: 'Juan Dela Cruz',
    score: 62,
    scoreColor: 'text-error',
    barColor: 'bg-error',
    trend: '-4%',
    trendColor: 'text-error',
    statusValue: 'needs-help',
    statusLabel: 'Needs Help',
    statusColor: 'text-error',
    statusDot: 'bg-error',
    lastActive: '1 hour ago',
    modalStatus: 'Needs Help',
    observation:
      'Late submissions on verb tenses. Shows high offline participation.',
  },
  {
    initials: 'AR',
    id: '109283-003',
    name: 'Angel Reyes',
    score: 71,
    scoreColor: 'text-tertiary',
    barColor: 'bg-tertiary-fixed-dim',
    trend: '+2%',
    trendColor: 'text-[#22A06B]',
    statusValue: 'needs-nudge',
    statusLabel: 'Needs Nudge',
    statusColor: 'text-tertiary',
    statusDot: 'bg-[#F4BF32]',
    lastActive: '3 hours ago',
    modalStatus: 'Needs a Nudge',
    observation:
      'Hesitant on vocabulary matching. Suggest visual diagram practice.',
  },
  {
    initials: 'PG',
    id: '109283-004',
    name: 'Paolo Garcia',
    score: 73,
    scoreColor: 'text-tertiary',
    barColor: 'bg-tertiary-fixed-dim',
    trend: '+3%',
    trendColor: 'text-[#22A06B]',
    statusValue: 'needs-nudge',
    statusLabel: 'Needs Nudge',
    statusColor: 'text-tertiary',
    statusDot: 'bg-[#F4BF32]',
    lastActive: 'Yesterday',
    modalStatus: 'Needs a Nudge',
    observation:
      'Speed was abnormally quick. Remind to utilize scratchpad.',
  },
  {
    initials: 'BM',
    id: '109283-005',
    name: 'Bea Mendoza',
    score: 96,
    scoreColor: 'text-[#22A06B]',
    barColor: 'bg-[#22A06B]',
    trend: '+4%',
    trendColor: 'text-[#22A06B]',
    statusValue: 'on-track',
    statusLabel: 'On Track',
    statusColor: 'text-[#22A06B]',
    statusDot: 'bg-[#22A06B]',
    lastActive: 'Today, 8:15 AM',
    modalStatus: 'On Track',
    observation:
      'Consistently excellent comprehension. Star learner on photosynthesis.',
  },
  {
    initials: 'LF',
    id: '109283-006',
    name: 'Luis Fernando',
    score: 92,
    scoreColor: 'text-[#22A06B]',
    barColor: 'bg-[#22A06B]',
    trend: '+5%',
    trendColor: 'text-[#22A06B]',
    statusValue: 'on-track',
    statusLabel: 'On Track',
    statusColor: 'text-[#22A06B]',
    statusDot: 'bg-[#22A06B]',
    lastActive: 'Today, 9:00 AM',
    modalStatus: 'On Track',
    observation:
      'Strong analytical work in math problem solving.',
  },
  {
    initials: 'JC',
    id: '109283-007',
    name: 'Jasmine Catacutan',
    score: 88,
    scoreColor: 'text-[#22A06B]',
    barColor: 'bg-[#22A06B]',
    trend: '0%',
    trendColor: 'text-on-surface-variant',
    statusValue: 'on-track',
    statusLabel: 'On Track',
    statusColor: 'text-[#22A06B]',
    statusDot: 'bg-[#22A06B]',
    lastActive: 'Yesterday',
    modalStatus: 'On Track',
    observation:
      'Steady progress across all subjects.',
  },
]

const TOPIC_SCORES = [
  {
    emoji: '📖',
    emojiColor: 'text-primary',
    name: 'Pagbasa at Panitikan (Ibong Adarna)',
    pct: 91,
    pctColor: 'text-[#22A06B]',
    barColor: 'bg-[#22A06B]',
  },
  {
    emoji: '🌱',
    emojiColor: 'text-secondary',
    name: 'Photosynthesis & Plant Cells',
    pct: 88,
    pctColor: 'text-[#22A06B]',
    barColor: 'bg-[#22A06B]',
  },
  {
    emoji: '📐',
    emojiColor: 'text-primary',
    name: 'Fractions: Unlike Denominators',
    pct: 78,
    pctColor: 'text-primary',
    barColor: 'bg-primary-container',
  },
  {
    emoji: '✍️',
    emojiColor: 'text-tertiary',
    name: 'English Grammar: Verb Tenses',
    pct: 74,
    pctColor: 'text-tertiary',
    barColor: 'bg-tertiary-fixed-dim',
  },
]

export default function TeacherDashboard() {
  const [chartMode, setChartMode] = useState('chart')
  const [rosterFilter, setRosterFilter] = useState('all')
  const [studentSearch, setStudentSearch] = useState('')
  const [modalStudent, setModalStudent] = useState(null)
  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)

  useEffect(() => () => clearTimeout(toastTimer.current), [])

  function showToast(message) {
    setToast(message)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 3000)
  }

  function openStudentModal(student) {
    setModalStudent({ ...student, lang: 'en' })
  }

  function closeStudentModal() {
    setModalStudent(null)
  }

  function sendTeacherNote() {
    const name = modalStudent.name
    closeStudentModal()
    showToast(`Encouragement sent to ${name} & parents portal! 🚀`)
  }

  function toggleModalLang(lang) {
    setModalStudent((s) => ({ ...s, lang }))
  }

  const visibleStudents = ROSTER_STUDENTS.filter(
    (s) =>
      (rosterFilter === 'all' || s.statusValue === rosterFilter) &&
      s.name.toLowerCase().includes(studentSearch.toLowerCase().trim())
  )

  return (
    <div className="max-w-[1120px] mx-auto p-margin">
      <div className="flex flex-col w-full">
        {/* Top Greeting & Action Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-md mb-space-lg">
          <div className="flex flex-col">
            <div className="flex items-center gap-space-xs mb-1">
              <span className="font-headline-lg text-headline-lg text-on-surface">Magandang araw, Bb. Santos!</span>
              <span className="text-2xl animate-bounce">👋</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">Here is your class performance overview for <span className="font-semibold text-on-surface">Grade 8 - Sampaguita</span>. <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-error-container/50 text-error font-label-sm text-label-sm font-medium">4 students need attention</span></p>
          </div>
          {/* Quick Controls */}
          <div className="flex flex-wrap items-center gap-space-xs">
            <div className="relative inline-flex items-center bg-surface-container-lowest px-space-md py-2 rounded-xl shadow-sm text-on-surface cursor-pointer hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined text-primary text-[18px] mr-1.5">calendar_today</span>
              <span className="font-label-md text-label-md">Q2, Week 6 (Oct 14 - 20)</span>
              <span className="material-symbols-outlined text-[18px] ml-1 text-on-surface-variant">expand_more</span>
            </div>
            <button className="inline-flex items-center gap-1.5 bg-surface-container-lowest px-space-md py-2 rounded-xl shadow-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors" type="button">
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span className="font-label-md text-label-md">Export CSV</span>
            </button>
            <button
              className="inline-flex items-center gap-1.5 bg-primary-container text-on-primary px-space-md py-2 rounded-xl shadow-md hover:bg-primary transition-all"
              onClick={() => showToast('Generating AI Class Summary report for Grade 8 - Sampaguita ✨')}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
              <span className="font-label-md text-label-md">Run AI Summary</span>
            </button>
          </div>
        </div>
        {/* ROW 1: 4 Key Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-lg">{/* Stat 1: Class Average */}
          <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-xs flex flex-col justify-between hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-space-xs">
              <span className="font-label-md text-label-md text-on-surface-variant">Class Average</span>
              <div className="w-7 h-7 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[16px]">analytics</span>
              </div>
            </div>
            <div className="flex items-baseline gap-space-xs mb-space-xs">
              <span className="font-metric-number text-metric-number text-on-surface tracking-tight">84.6%</span>
            </div>
            <div className="flex items-center gap-1.5 text-body-sm">
              <span className="inline-flex items-center font-label-sm text-[#22A06B] font-semibold">
                <span className="material-symbols-outlined text-[14px] mr-0.5">trending_up</span>+3.2%
              </span>
              <span className="text-on-surface-variant font-body-sm">vs last week</span>
            </div>
          </div>
          {/* Stat 2: Quiz Completion Rate */}
          <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-xs flex flex-col justify-between hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-space-xs">
              <span className="font-label-md text-label-md text-on-surface-variant">Quiz Completion</span>
              <div className="w-7 h-7 rounded-full bg-surface-container-low flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[16px]">task_alt</span>
              </div>
            </div>
            <div className="flex items-baseline gap-space-xs mb-space-xs">
              <span className="font-metric-number text-metric-number text-on-surface tracking-tight">92.8%</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">(39/42)</span>
            </div>
            <div className="flex items-center gap-1.5 text-body-sm">
              <span className="inline-flex items-center font-label-sm text-[#22A06B] font-semibold">
                <span className="material-symbols-outlined text-[14px] mr-0.5">trending_up</span>+5.0%
              </span>
              <span className="text-on-surface-variant font-body-sm truncate">Fractions &amp; Photosynthesis</span>
            </div>
          </div>
          {/* Stat 3: Students Needing Help */}
          <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-xs flex flex-col justify-between hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-space-xs">
              <span className="font-label-md text-label-md text-on-surface-variant">Needs Immediate Help</span>
              <div className="w-7 h-7 rounded-full bg-surface-container-low flex items-center justify-center text-error">
                <span className="material-symbols-outlined text-[16px]">flag</span>
              </div>
            </div>
            <div className="flex items-baseline gap-space-xs mb-space-xs">
              <span className="font-metric-number text-metric-number text-error tracking-tight">4</span>
              <span className="font-body-md text-body-md text-on-surface-variant">students</span>
            </div>
            <div className="flex items-center justify-between text-body-sm">
              <span className="text-on-surface-variant">Scoring &lt;65%</span>
              <a className="font-label-sm text-label-sm text-primary font-semibold hover:underline inline-flex items-center gap-0.5" href="#needs-attention-section">
                Triage <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </a>
            </div>
          </div>
          {/* Stat 4: Active Learners & Streak */}
          <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-xs flex flex-col justify-between hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-space-xs">
              <span className="font-label-md text-label-md text-on-surface-variant">Weekly Engagement</span>
              <div className="w-7 h-7 rounded-full bg-surface-container-low flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
              </div>
            </div>
            <div className="flex items-baseline gap-space-xs mb-space-xs">
              <span className="font-metric-number text-metric-number text-on-surface tracking-tight">38</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">/ 42 active</span>
            </div>
            <div className="flex items-center justify-between text-body-sm text-on-surface-variant">
              <span className="truncate max-w-[130px]">Top streak: Juan D.</span>
              <span className="font-label-sm text-label-sm text-tertiary font-semibold">7d streak</span>
            </div>
          </div>
        </div>
        {/* ROW 2: Class Trajectory & Risk Distribution (8 cols + 4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg mb-space-lg">
          {/* Left: Score Trajectory Chart (8 cols) */}
          <div className="lg:col-span-8 bg-surface-container-lowest rounded-[20px] p-space-lg shadow-[0_4px_16px_rgba(91,75,219,0.08)] flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-md">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Class Average Score Over Time</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Weekly performance trajectory across Q2 curriculum</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="inline-flex p-1 bg-surface-container rounded-xl">
                    <button
                      className={chartMode === 'chart' ? FILTER_TAB_ACTIVE : FILTER_TAB_IDLE}
                      onClick={() => setChartMode('chart')}
                      type="button"
                    >
                      Line Chart
                    </button>
                    <button
                      className={chartMode === 'table' ? FILTER_TAB_ACTIVE : FILTER_TAB_IDLE}
                      onClick={() => setChartMode('table')}
                      type="button"
                    >
                      Table View
                    </button>
                  </div>
                </div>
              </div>
              {/* SVG Line Chart Canvas */}
              <div className={chartMode === 'chart' ? 'w-full h-64 relative mt-2' : 'hidden w-full h-64 relative mt-2'}>
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 650 220">
                  <defs>
                    <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#5B4BDB" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="#5B4BDB" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* Horizontal Gridlines & Y-Axis values */}
                  <line stroke="#EDECFF" strokeWidth="1" x1="40" x2="630" y1="30" y2="30" />
                  <text fill="#787586" fontFamily="Inter" fontSize="10" textAnchor="end" x="30" y="34">90%</text>
                  <line stroke="#006B5F" strokeDasharray="4 4" strokeOpacity="0.35" strokeWidth="1" x1="40" x2="630" y1="80" y2="80" />
                  <text fill="#006B5F" fontFamily="Inter" fontSize="10" fontWeight="500" textAnchor="end" x="30" y="84">80%</text>
                  <line stroke="#EDECFF" strokeWidth="1" x1="40" x2="630" y1="130" y2="130" />
                  <text fill="#787586" fontFamily="Inter" fontSize="10" textAnchor="end" x="30" y="134">70%</text>
                  <line stroke="#EDECFF" strokeWidth="1" x1="40" x2="630" y1="180" y2="180" />
                  <text fill="#787586" fontFamily="Inter" fontSize="10" textAnchor="end" x="30" y="184">60%</text>
                  {/* Area Fill */}
                  <polygon fill="url(#areaGradient)" points="60,120 170,105 280,85 390,90 500,70 610,57 610,185 60,185" />
                  {/* Trajectory Line */}
                  <polyline fill="none" points="60,120 170,105 280,85 390,90 500,70 610,57" stroke="#5B4BDB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                  {/* Data Point Circles */}
                  <circle className="cursor-pointer transition-transform hover:scale-150" cx="60" cy="120" fill="#FFFFFF" r="4" stroke="#5B4BDB" strokeWidth="2.5" />
                  <text fill="#787586" fontFamily="Inter" fontSize="11" textAnchor="middle" x="60" y="202">W1</text>
                  <circle className="cursor-pointer transition-transform hover:scale-150" cx="170" cy="105" fill="#FFFFFF" r="4" stroke="#5B4BDB" strokeWidth="2.5" />
                  <text fill="#787586" fontFamily="Inter" fontSize="11" textAnchor="middle" x="170" y="202">W2</text>
                  <circle className="cursor-pointer transition-transform hover:scale-150" cx="280" cy="85" fill="#FFFFFF" r="4" stroke="#5B4BDB" strokeWidth="2.5" />
                  <text fill="#787586" fontFamily="Inter" fontSize="11" textAnchor="middle" x="280" y="202">W3</text>
                  <circle className="cursor-pointer transition-transform hover:scale-150" cx="390" cy="90" fill="#FFFFFF" r="4" stroke="#5B4BDB" strokeWidth="2.5" />
                  <text fill="#787586" fontFamily="Inter" fontSize="11" textAnchor="middle" x="390" y="202">W4</text>
                  <circle className="cursor-pointer transition-transform hover:scale-150" cx="500" cy="70" fill="#FFFFFF" r="4" stroke="#5B4BDB" strokeWidth="2.5" />
                  <text fill="#787586" fontFamily="Inter" fontSize="11" textAnchor="middle" x="500" y="202">W5</text>
                  {/* Week 6 Current Highlight */}
                  <circle cx="610" cy="57" fill="#5B4BDB" r="5" stroke="#FFFFFF" strokeWidth="2" />
                  <text fill="#151936" fontFamily="Inter" fontSize="11" fontWeight="600" textAnchor="middle" x="610" y="202">W6</text>
                  <text fill="#422EC2" fontFamily="Nunito Sans" fontSize="11" fontWeight="700" textAnchor="middle" x="610" y="46">84.6%</text>
                </svg>
              </div>
              {/* Table View representation (hidden by default) */}
              <div className={chartMode === 'table' ? 'w-full overflow-x-auto mt-2' : 'hidden w-full overflow-x-auto mt-2'}>
                <table className="w-full text-left font-body-sm text-body-sm">
                  <thead>
                    <tr className="text-on-surface-variant bg-surface-container-low">
                      <th className="py-2 px-3 rounded-l-lg">Curriculum Week</th>
                      <th className="py-2 px-3">Primary Assessment</th>
                      <th className="py-2 px-3">Average Score</th>
                      <th className="py-2 px-3 rounded-r-lg">Standard Delta</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-0 text-on-surface">
                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="py-2.5 px-3 font-semibold">Week 1</td>
                      <td className="py-2.5 px-3">Diagnostics &amp; Scientific Method</td>
                      <td className="py-2.5 px-3 font-bold">72.0%</td>
                      <td className="py-2.5 px-3 text-error">-8.0%</td>
                    </tr>
                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="py-2.5 px-3 font-semibold">Week 2</td>
                      <td className="py-2.5 px-3">Fractions: Addition &amp; Subtraction</td>
                      <td className="py-2.5 px-3 font-bold">75.0%</td>
                      <td className="py-2.5 px-3 text-error">-5.0%</td>
                    </tr>
                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="py-2.5 px-3 font-semibold">Week 3</td>
                      <td className="py-2.5 px-3">Photosynthesis Basics</td>
                      <td className="py-2.5 px-3 font-bold">79.0%</td>
                      <td className="py-2.5 px-3 text-on-surface-variant">-1.0%</td>
                    </tr>
                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="py-2.5 px-3 font-semibold">Week 4</td>
                      <td className="py-2.5 px-3">Pagbasa: Ibong Adarna Ch. 1</td>
                      <td className="py-2.5 px-3 font-bold">78.0%</td>
                      <td className="py-2.5 px-3 text-on-surface-variant">-2.0%</td>
                    </tr>
                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="py-2.5 px-3 font-semibold">Week 5</td>
                      <td className="py-2.5 px-3">Grammar &amp; Verb Tenses</td>
                      <td className="py-2.5 px-3 font-bold">82.0%</td>
                      <td className="py-2.5 px-3 text-[#22A06B] font-bold">+2.0%</td>
                    </tr>
                    <tr className="bg-primary-fixed/30 hover:bg-primary-fixed/50 transition-colors">
                      <td className="py-2.5 px-3 font-bold text-primary">Week 6 (Current)</td>
                      <td className="py-2.5 px-3">Fractions Review &amp; Photosynthesis II</td>
                      <td className="py-2.5 px-3 font-bold text-primary">84.6%</td>
                      <td className="py-2.5 px-3 text-[#22A06B] font-bold">+4.6%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* Chart Legend & Benchmark indicators */}
            <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-sm mt-space-sm">
              <div className="flex items-center gap-space-md">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-primary-container" />
                  <span className="font-label-sm text-label-sm text-on-surface">Actual Class Average</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-1 border-t-2 border-dashed border-[#006B5F]" />
                  <span className="font-label-sm text-label-sm text-secondary">Target Standard (80%)</span>
                </div>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant">✨ Consistent weekly growth since Week 1</span>
            </div>
          </div>
          {/* Right: Class Status Distribution Donut (4 cols) */}
          <div className="lg:col-span-4 bg-surface-container-lowest rounded-[20px] p-space-lg shadow-[0_4px_16px_rgba(91,75,219,0.08)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-space-xs">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Status Distribution</h3>
                <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">42 Learners</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">Real-time risk triage breakdown</p>
              {/* SVG Donut Chart with Centered Total */}
              <div className="relative flex items-center justify-center my-2">
                <svg className="w-44 h-44 -rotate-90" viewBox="0 0 100 100">
                  {/* Background circle ring */}
                  <circle cx="50" cy="50" fill="none" r="38" stroke="#EDECFF" strokeWidth="12" />
                  {/* Segment 1: On Track (69% -> stroke-dasharray 164.7, 238.7) */}
                  <circle cx="50" cy="50" fill="none" r="38" stroke="#22A06B" strokeDasharray="164.7 238.7" strokeDashoffset="0" strokeLinecap="round" strokeWidth="12" />
                  {/* Segment 2: Needs a Nudge (21% -> 50.1) offset 164.7 */}
                  <circle cx="50" cy="50" fill="none" r="38" stroke="#F4BF32" strokeDasharray="50.1 238.7" strokeDashoffset="-164.7" strokeLinecap="round" strokeWidth="12" />
                  {/* Segment 3: Needs Help (10% -> 23.9) offset 214.8 */}
                  <circle cx="50" cy="50" fill="none" r="38" stroke="#BA1A1A" strokeDasharray="23.9 238.7" strokeDashoffset="-214.8" strokeLinecap="round" strokeWidth="12" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                  <span className="font-headline-lg text-headline-lg text-on-surface font-black leading-none">42</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">Enrolled</span>
                </div>
              </div>
              {/* Distribution Triage Legend */}
              <div className="flex flex-col gap-2 mt-space-md">
                <div className="flex items-center justify-between py-1.5 px-2.5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#22A06B]" />
                    <span className="font-label-md text-label-md text-on-surface">On Track</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-label-md text-label-md text-on-surface">
                    <span className="font-semibold">29</span>
                    <span className="text-on-surface-variant font-normal">(69%)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-1.5 px-2.5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F4BF32]" />
                    <span className="font-label-md text-label-md text-on-surface">Needs a Nudge</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-label-md text-label-md text-on-surface">
                    <span className="font-semibold">9</span>
                    <span className="text-on-surface-variant font-normal">(21%)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-1.5 px-2.5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-error" />
                    <span className="font-label-md text-label-md text-on-surface">Needs Help</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-label-md text-label-md text-on-surface">
                    <span className="font-semibold text-error">4</span>
                    <span className="text-on-surface-variant font-normal">(10%)</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Quick AI Diagnostic Highlight */}
            <div className="mt-space-md p-3 rounded-xl bg-primary-fixed/30 flex items-start gap-2">
              <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">lightbulb</span>
              <p className="font-body-sm text-body-sm text-on-surface">
                <span className="font-bold text-primary">AI Insight:</span> Denominator factoring was the common tripping point for 3 of the 4 struggling students.
              </p>
            </div>
          </div>
        </div>
        {/* ROW 3: Topic Mastery & Needs Attention Grid (6 cols + 6 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg mb-space-lg" id="needs-attention-section">
          {/* Left: Topic Mastery (6 cols) */}
          <div className="lg:col-span-6 bg-surface-container-lowest rounded-[20px] p-space-lg shadow-[0_4px_16px_rgba(91,75,219,0.08)] flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-space-md">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Average Score by Topic</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Class comprehension across Quarter 2 units</p>
                </div>
                <div className="flex items-center gap-1 overflow-x-auto pb-1">
                  <button className="px-2.5 py-1 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-bold" type="button">All</button>
                  <button className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm" type="button">Math</button>
                  <button className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm" type="button">Science</button>
                  <button className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm" type="button">Filipino</button>
                </div>
              </div>
              {/* Topic Mastery Progress Bars */}
              <div className="flex flex-col gap-space-md mt-space-sm">
                {TOPIC_SCORES.map((topic) => (
                  <div key={topic.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-lg bg-surface-container flex items-center justify-center ${topic.emojiColor} text-[14px]`}>{topic.emoji}</span>
                        <span className="font-label-md text-label-md text-on-surface">{topic.name}</span>
                      </div>
                      <span className={`font-label-md text-label-md ${topic.pctColor} font-bold`}>{topic.pct}%</span>
                    </div>
                    <div className="w-full h-3 bg-surface-container-low rounded-full overflow-hidden">
                      <div className={`h-full ${topic.barColor} rounded-full transition-all duration-500`} style={{ width: `${topic.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-space-lg pt-space-sm flex items-center justify-between bg-surface-container-low p-3 rounded-xl">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Recommended next module:</span>
              <button className="inline-flex items-center gap-1 font-label-sm text-label-sm text-primary font-bold hover:underline" type="button">
                <span className="material-symbols-outlined text-[16px]">add_circle</span> Assign 10m Denominator Drill
              </button>
            </div>
          </div>
          {/* Right: Needs Attention (4 Flagged Students) (6 cols) */}
          <div className="lg:col-span-6 bg-surface-container-lowest rounded-[20px] p-space-lg shadow-[0_4px_16px_rgba(91,75,219,0.08)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-space-xs">
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-error animate-ping" />
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Needs Attention</h3>
                </div>
                <span className="font-label-sm text-label-sm text-on-error-container bg-error-container px-2.5 py-0.5 rounded-full font-bold">4 Flagged</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">AI-identified learning barriers from latest submissions</p>
              {/* 4 Student Alert Cards */}
              <div className="flex flex-col gap-space-sm">
                {NEEDS_ATTENTION_STUDENTS.map((student) => (
                  <div className="p-space-sm rounded-xl bg-surface-container-low/60 hover:bg-surface-container-low transition-colors flex items-center justify-between gap-2" key={student.name}>
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center font-bold text-on-surface text-xs shrink-0">{student.initials}</div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-label-md text-label-md text-on-surface font-semibold truncate">{student.name}</span>
                          <span className={`font-label-sm ${student.scoreColor} text-xs font-medium`}>{student.scoreLabel}</span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant text-xs truncate max-w-xs">
                          {student.detail}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        className="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-lowest transition-colors"
                        onClick={() => showToast(`Nudge sent to ${student.name} ✉️`)}
                        title={student.mailTitle}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">mail</span>
                      </button>
                      <button
                        className="px-2.5 py-1 rounded-lg text-primary hover:bg-surface-container-lowest font-label-sm text-label-sm font-semibold transition-colors"
                        onClick={() => openStudentModal(student)}
                        type="button"
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* ROW 4: Student Directory & Comprehensive Roster (Full 12 cols) */}
        <div className="bg-surface-container-lowest rounded-[20px] p-space-lg shadow-[0_4px_16px_rgba(91,75,219,0.08)] mb-space-lg">
          {/* Header with Search & Filter Tabs */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md mb-space-md pb-space-sm">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Student Directory &amp; Progress</h3>
                <span className="font-label-sm text-label-sm bg-surface-container px-2 py-0.5 rounded-full text-on-surface-variant">42 learners</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Quarter 2 continuous assessment records</p>
            </div>
            <div className="flex flex-wrap items-center gap-space-xs">
              {/* Search bar inside table header */}
              <div className="relative min-w-[220px]">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
                <input
                  className="w-full bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm pl-9 pr-3 py-1.5 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-primary-container"
                  onChange={(e) => setStudentSearch(e.target.value)}
                  placeholder="Filter by student name..."
                  type="text"
                  value={studentSearch}
                />
              </div>
              {/* Filter Pill Tabs */}
              <div className="flex items-center bg-surface-container p-1 rounded-xl">
                {ROSTER_FILTERS.map((f) => (
                  <button
                    className={rosterFilter === f.value ? FILTER_TAB_ACTIVE : FILTER_TAB_IDLE}
                    key={f.value}
                    onClick={() => setRosterFilter(f.value)}
                    type="button"
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <button className="inline-flex items-center gap-1 bg-surface-container-low px-3 py-1.5 rounded-xl text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm" type="button">
                <span className="material-symbols-outlined text-[16px]">file_download</span> Export
              </button>
            </div>
          </div>
          {/* Table Container */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left font-body-sm text-body-sm">
              <thead>
                <tr className="text-on-surface-variant bg-surface-container-low text-[12px] uppercase tracking-wider font-semibold">
                  <th className="py-3 px-4 rounded-l-xl">Learner Name &amp; ID</th>
                  <th className="py-3 px-3">Section</th>
                  <th className="py-3 px-4">Latest Score</th>
                  <th className="py-3 px-3">Trend</th>
                  <th className="py-3 px-4">Mastery Status</th>
                  <th className="py-3 px-3">Last Active</th>
                  <th className="py-3 px-4 rounded-r-xl text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y-0 text-on-surface">
                {visibleStudents.map((s) => (
                  <tr className="hover:bg-surface-container-low/50 transition-colors" key={s.id}>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-surface-container text-on-surface flex items-center justify-center font-bold text-xs shrink-0">{s.initials}</div>
                        <div>
                          <span className="font-label-md text-label-md text-on-surface font-semibold block">{s.name}</span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">{s.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-on-surface-variant">Sampaguita</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold ${s.scoreColor} w-8`}>{s.score}%</span>
                        <div className="w-16 h-1.5 bg-surface-container rounded-full overflow-hidden">
                          <div className={`h-full ${s.barColor} rounded-full`} style={{ width: `${s.score}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className={`py-3.5 px-3 ${s.trendColor} font-medium font-label-sm text-label-sm`}>
                      {s.trend}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1.5 font-label-sm text-label-sm ${s.statusColor} font-medium`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${s.statusDot}`} /> {s.statusLabel}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-on-surface-variant font-label-sm text-label-sm">{s.lastActive}</td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          className="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
                          onClick={() => showToast(`Nudge sent to ${s.name} ✉️`)}
                          title="Send Message"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">mail</span>
                        </button>
                        <button
                          className="px-2.5 py-1 rounded-lg text-primary hover:bg-surface-container font-label-sm text-label-sm font-semibold transition-colors"
                          onClick={() => openStudentModal(s)}
                          type="button"
                        >
                          Profile
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-space-sm pt-space-md mt-space-sm">
            <span className="font-body-sm text-body-sm text-on-surface-variant">Showing 1 to 7 of 42 students</span>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface disabled:opacity-50" disabled type="button">
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <button className="w-8 h-8 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm font-bold" type="button">1</button>
              <button className="w-8 h-8 rounded-lg text-on-surface-variant hover:bg-surface-container font-label-sm text-label-sm" type="button">2</button>
              <button className="w-8 h-8 rounded-lg text-on-surface-variant hover:bg-surface-container font-label-sm text-label-sm" type="button">3</button>
              <span className="px-1 text-on-surface-variant text-xs">...</span>
              <button className="w-8 h-8 rounded-lg text-on-surface-variant hover:bg-surface-container font-label-sm text-label-sm" type="button">6</button>
              <button className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-on-surface hover:text-primary" type="button">
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* INTERACTIVE MODAL / DETAIL PREVIEW: Student Diagnostic Drilldown */}
      {modalStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/40 backdrop-blur-sm transition-opacity duration-200">
          <div className="bg-surface-container-lowest rounded-[24px] max-w-lg w-full p-space-lg shadow-[0_20px_40px_rgba(31,35,64,0.16)] flex flex-col gap-space-md relative transform transition-transform duration-200 scale-100">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-space-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-base shadow-sm">
                  {modalStudent.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">{modalStudent.name}</h3>
                    <span className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm font-bold ${modalStudent.status.includes('Help') ? 'bg-[#FDE4E5] text-[#E5484D]' : modalStudent.status.includes('Nudge') ? 'bg-[#FFEFD1] text-[#B8740B]' : 'bg-[#DDF5E8] text-[#22A06B]'}`}>{modalStudent.status}</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Grade 8 - Sampaguita · LRN: 109283-001</p>
                </div>
              </div>
              <button className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface" onClick={closeStudentModal} type="button">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            {/* Language Toggle for Diagnostic Notes */}
            <div className="flex items-center justify-between bg-surface-container-low p-2 rounded-xl">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">Teacher Note Language:</span>
              <div className="flex items-center bg-surface-container-lowest p-0.5 rounded-lg">
                <button className={modalStudent.lang === 'en' ? 'px-2.5 py-0.5 rounded-md bg-primary-container text-on-primary font-label-sm text-label-sm font-bold' : 'px-2.5 py-0.5 rounded-md text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm'} onClick={() => toggleModalLang('en')} type="button">EN</button>
                <button className={modalStudent.lang === 'fil' ? 'px-2.5 py-0.5 rounded-md bg-primary-container text-on-primary font-label-sm text-label-sm font-bold' : 'px-2.5 py-0.5 rounded-md text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm'} onClick={() => toggleModalLang('fil')} type="button">FIL</button>
              </div>
            </div>
            {/* AI Feedback Summary */}
            <div className="p-space-md rounded-xl bg-primary-fixed/25 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-primary">
                <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                <span className="font-label-md text-label-md font-bold">Aralytics AI Diagnostic</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                {modalStudent.lang === 'fil'
                  ? `Nakakitaan si ${modalStudent.name} ng magandang pagkaunawa sa parehong denominators. Ang hamon ay nasa pagkuha ng Least Common Multiple (LCM) sa mga numero 4 at 7.`
                  : `"${modalStudent.observation}"`}
              </p>
            </div>
            {/* Performance Metrics Breakdown */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 bg-surface-container rounded-xl">
                <span className="font-label-sm text-label-sm text-on-surface-variant block">Recent Score</span>
                <span className={`font-headline-sm text-headline-sm ${modalStudent.status.includes('Help') ? 'text-error' : modalStudent.status.includes('Nudge') ? 'text-tertiary' : 'text-[#22A06B]'} font-bold`}>{modalStudent.score}</span>
              </div>
              <div className="p-2.5 bg-surface-container rounded-xl">
                <span className="font-label-sm text-label-sm text-on-surface-variant block">Avg Duration</span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">14m 20s</span>
              </div>
              <div className="p-2.5 bg-surface-container rounded-xl">
                <span className="font-label-sm text-label-sm text-on-surface-variant block">Attendance</span>
                <span className="font-headline-sm text-headline-sm text-[#22A06B] font-bold">94%</span>
              </div>
            </div>
            {/* Quick Action / Encouragement Message Field */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-sm text-label-sm text-on-surface font-semibold" htmlFor="teacherQuickNote">Send Personalized Support Note to Student &amp; Parent Portal:</label>
              <textarea
                className="w-full bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm p-3 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-primary-container"
                id="teacherQuickNote"
                placeholder="e.g. Mahusay ang simula mo sa addition! Tingnan natin ulit ang common denominators bukas pagkatapos ng klase..."
                rows={2}
              />
            </div>
            {/* Modal Footer Controls */}
            <div className="flex items-center justify-end gap-space-xs pt-space-xs">
              <button className="px-space-md py-2 rounded-xl text-on-surface-variant hover:bg-surface-container font-label-md text-label-md font-semibold transition-colors" onClick={closeStudentModal} type="button">
                Cancel
              </button>
              <button className="inline-flex items-center gap-1.5 px-space-md py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold hover:bg-primary-container transition-colors shadow-sm" onClick={sendTeacherNote} type="button">
                <span className="material-symbols-outlined text-[18px]">send</span>
                <span>Send Encouragement</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Notification Toast (for quick interactions) */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 transform translate-y-0 opacity-100 transition-all duration-300 pointer-events-none">
          <div className="bg-inverse-surface text-inverse-on-surface px-space-md py-3 rounded-xl shadow-xl flex items-center gap-2">
            <span className="material-symbols-outlined text-[#71F8E4] text-[20px]">check_circle</span>
            <span className="font-label-md text-label-md">{toast}</span>
          </div>
        </div>
      )}
    </div>
  )
}
