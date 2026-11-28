import { useEffect, useRef, useState } from 'react'
import { api, getStoredClasses, getStoredUser, saveBlob } from '../../api/client'
import { useApiResource } from '../../api/useApiResource'
import { DataError, LoadingBlock } from '../../components/DataState'
import Avatar from '../../components/ui/Avatar'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'

const FILTER_TAB_ACTIVE =
  'min-h-[44px] px-3 py-1.5 rounded-lg bg-surface-container-lowest text-primary font-label-sm text-label-sm font-bold shadow-xs transition-all'
const FILTER_TAB_IDLE =
  'min-h-[44px] px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-all'

const MASTERY_PILL_ACTIVE =
  'min-h-[44px] px-3.5 py-1.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-bold'
const MASTERY_PILL_IDLE =
  'min-h-[44px] px-3.5 py-1.5 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm'

const MASTERY_FILTERS = [
  { value: 'All', label: 'All' },
  { value: 'Syntax', label: 'Syntax' },
  { value: 'Logic', label: 'Logic' },
  { value: 'Functions', label: 'Functions' },
]

const ROSTER_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'on-track', label: 'On Track' },
  { value: 'needs-nudge', label: 'Needs Nudge' },
  { value: 'needs-help', label: 'Needs Help' },
]

const STATUS_META = {
  'on-track': {
    label: 'On Track (≥70%)',
    modal: 'On Track',
    tone: 'mastered',
    color: 'text-status-ok',
    dot: 'bg-status-ok',
    bar: 'bg-status-ok',
  },
  'needs-nudge': {
    label: 'Needs Nudge (<75%)',
    modal: 'Needs a Nudge',
    tone: 'nudge',
    color: 'text-warn',
    dot: 'bg-accent-yellow',
    bar: 'bg-accent-yellow',
  },
  'needs-help': {
    label: 'Needs Help (<70%)',
    modal: 'Needs Help',
    tone: 'help',
    color: 'text-error',
    dot: 'bg-error',
    bar: 'bg-error',
  },
}

function conceptVisual(concept, index) {
  const name = concept?.concept || `Concept ${index + 1}`
  const key = name.toLowerCase()
  const pct = Math.max(0, Math.min(100, Math.round(Number(concept?.masteryLevel) || 0)))

  let icon = 'menu_book'
  let category = 'Syntax'
  let iconColor = 'text-primary'
  let barColor = 'bg-primary-container'

  if (/loop|iterat|while|for /.test(key)) {
    icon = 'repeat'
    category = 'Logic'
  } else if (/condition|boolean|branch|if /.test(key)) {
    icon = 'alt_route'
    category = 'Logic'
  } else if (/function|scope|return/.test(key)) {
    icon = 'functions'
    category = 'Functions'
    iconColor = 'text-secondary'
  } else if (/syntax|error|debug|variable|data type/.test(key)) {
    icon = 'bug_report'
    category = 'Syntax'
    iconColor = 'text-warn'
  }

  if (pct >= 80) {
    barColor = 'bg-status-ok'
  } else if (pct < 70) {
    iconColor = 'text-warn'
    barColor = 'bg-accent-yellow'
  }

  return {
    icon,
    iconColor,
    name,
    category,
    pct,
    pctColor: pct >= 80 ? 'text-status-ok' : pct >= 70 ? 'text-primary' : 'text-warn',
    barColor,
  }
}

function statusForScore(score, threshold) {
  if (score < threshold) return 'needs-help'
  if (score < threshold + 5) return 'needs-nudge'
  return 'on-track'
}

function formatDate(value) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

function mapRosterItem(item, threshold, section) {
  const score = item.averageScore == null ? 0 : Math.round(Number(item.averageScore))
  const statusValue = statusForScore(score, threshold)
  const status = STATUS_META[statusValue]
  const mastery = Array.isArray(item.mastery) ? item.mastery : []
  const latest = mastery
    .map((entry) => entry.lastUpdated)
    .filter(Boolean)
    .sort()
    .at(-1)
  const focus = mastery
    .slice()
    .sort((a, b) => (a.masteryLevel ?? 0) - (b.masteryLevel ?? 0))
    .slice(0, 2)
    .map((entry) => `${entry.concept} ${Math.round(Number(entry.masteryLevel) || 0)}%`)
    .join(' · ')

  return {
    raw: item,
    id: `STU-${item.studentId}`,
    studentId: item.studentId,
    initials: (item.fullName || '?')
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase(),
    name: item.fullName || item.username || `Student ${item.studentId}`,
    section: section || '—',
    score,
    scoreColor: status.color,
    barColor: status.bar,
    trend: 'Stable',
    trendColor: 'text-on-surface-variant',
    statusValue,
    statusTone: status.tone,
    statusLabel: status.label,
    statusColor: status.color,
    statusDot: status.dot,
    lastActive: formatDate(latest),
    mailTitle: statusValue === 'on-track' ? 'Send Praise' : 'Send Hint',
    modalStatus: status.modal,
    observation: focus
      ? `Current mastery focus: ${focus}.`
      : 'No diagnostic mastery records have been generated for this student yet.',
  }
}

export default function TeacherDashboard() {
  const [masteryFilter, setMasteryFilter] = useState('All')
  const [rosterFilter, setRosterFilter] = useState('all')
  const [studentSearch, setStudentSearch] = useState('')
  const [modalStudent, setModalStudent] = useState(null)
  const [exporting, setExporting] = useState(null)
  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)

  // Live cohort data. Both endpoints are part of the 40% milestone.
  const dashboard = useApiResource(() => api.teacher.dashboard(), [])
  const [page, setPage] = useState(1)
  const pageSize = 6
  const roster = useApiResource(
    () =>
      api.teacher.students({
        search: studentSearch.trim() || undefined,
        status: rosterFilter === 'all' ? undefined : rosterFilter,
        page,
        size: pageSize,
      }),
    [studentSearch, rosterFilter, page]
  )
  const user = getStoredUser()
  const classLabel = getStoredClasses()[0]?.name || 'Your class'
  const threshold = dashboard.data?.threshold ?? 70

  const rosterStudents = (Array.isArray(roster.data?.items) ? roster.data.items : []).map((item) =>
    mapRosterItem(item, threshold, classLabel)
  )
  // Counts come from the dashboard aggregate so they cover the whole cohort, not one page.
  const statusCounts = {
    all: dashboard.data?.studentCount ?? 0,
    'on-track': dashboard.data?.onTrackCount ?? 0,
    'needs-nudge': dashboard.data?.needsNudgeCount ?? 0,
    'needs-help': dashboard.data?.strugglingCount ?? 0,
  }
  const rosterFilters = ROSTER_FILTERS.map((filter) => ({
    ...filter,
    label: `${filter.label} (${statusCounts[filter.value]})`,
  }))

  const totalStudents = roster.data?.totalItems ?? 0
  const totalPages = Math.max(1, roster.data?.totalPages ?? 1)
  const currentPage = Math.min(page, totalPages)
  const pagedStudents = rosterStudents
  const showingFrom = totalStudents === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const showingTo = Math.min(currentPage * pageSize, totalStudents)
  const firstPageInWindow = Math.max(1, Math.min(currentPage - 2, totalPages - 4))
  const pageNumbers = []
  for (let p = firstPageInWindow; p <= Math.min(totalPages, firstPageInWindow + 4); p += 1) {
    pageNumbers.push(p)
  }

  useEffect(() => {
    setPage(1)
  }, [rosterFilter, studentSearch])

  useEffect(() => () => clearTimeout(toastTimer.current), [])

  useEffect(() => {
    if (!modalStudent) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeStudentModal()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [modalStudent])

  function showToast(message) {
    setToast(message)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 3000)
  }

  function openStudentModal(student) {
    setModalStudent({
      ...student,
      status: student.status || student.modalStatus || 'On Track',
      score: typeof student.score === 'number' ? `${student.score}%` : student.score,
    })
  }

  function closeStudentModal() {
    setModalStudent(null)
  }

  function sendTeacherNote() {
    const name = modalStudent.name
    closeStudentModal()
    showToast(`Encouragement sent to ${name} & parents portal.`)
  }

  function sendCodeHint(name) {
    showToast(`Code hint sent to ${name}.`)
  }

  async function runExport(kind) {
    if (exporting) return
    setExporting(kind)
    try {
      const query = { topic: masteryFilter === 'All' ? undefined : masteryFilter }
      const { blob, filename } =
        kind === 'pdf' ? await api.teacher.exportPdf(query) : await api.teacher.exportCsv(query)
      saveBlob(blob, filename || `aralytics-cohort.${kind}`)
      showToast(`Cohort ${kind.toUpperCase()} exported.`)
    } catch (error) {
      showToast(error.message || `Could not export the ${kind.toUpperCase()}.`)
    } finally {
      setExporting(null)
    }
  }

  const apiConcepts = (Array.isArray(dashboard.data?.classConceptMastery)
    ? dashboard.data.classConceptMastery
    : []
  ).map(conceptVisual)
  const visibleConcepts = apiConcepts.filter(
    (concept) => masteryFilter === 'All' || concept.category === masteryFilter
  )

  const statusDistribution = [
    { value: 'on-track', strokeClass: 'stroke-status-ok', dotClass: 'bg-status-ok', label: 'On Track' },
    { value: 'needs-nudge', strokeClass: 'stroke-accent-yellow', dotClass: 'bg-accent-yellow', label: 'Needs a Nudge' },
    { value: 'needs-help', strokeClass: 'stroke-error', dotClass: 'bg-error', label: 'Needs Help' },
  ]
  const distributionTotal = statusCounts.all
  const distributionCircumference = 2 * Math.PI * 38
  const percentOfCohort = (count) =>
    distributionTotal ? Math.round((count / distributionTotal) * 100) : 0

  let distributionOffset = 0
  const distributionSegments = statusDistribution.map((segment) => {
    const count = statusCounts[segment.value] || 0
    const pct = percentOfCohort(count)
    const dash = (pct / 100) * distributionCircumference
    const circle = {
      ...segment,
      count,
      pct,
      dasharray: `${dash} ${distributionCircumference}`,
      dashoffset: -distributionOffset,
    }
    distributionOffset += dash
    return circle
  })

  const formatMetric = (value, suffix = '%') =>
    value === null || value === undefined ? '—' : `${Number(value).toFixed(1)}${suffix}`
  const studentCount = dashboard.data?.studentCount ?? statusCounts.all
  const belowThresholdCount = dashboard.data?.belowThresholdCount ?? statusCounts['needs-help']
  const firstName = user?.fullName?.split(' ')[0] || 'Teacher'

  return (
    <div className="max-w-[1120px] mx-auto p-margin">
      <div className="flex flex-col w-full">
        {/* Top Greeting & Action Header */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-space-md mb-space-lg">
          <div className="flex flex-col">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mb-1">
              Welcome back, {firstName}!
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Here is your coding cohort analytics for <span className="font-semibold text-on-surface">{classLabel}</span>. <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-error-container/50 text-error font-label-sm text-label-sm font-medium tabular-nums">{belowThresholdCount} students flagged (&lt;{threshold}% threshold)</span></p>
          </div>
          {/* Quick Controls */}
          <div className="flex flex-wrap items-center gap-space-xs">
            <div className="inline-flex items-center bg-surface-container-low px-space-md py-2 rounded-xl text-on-surface">
              <span className="material-symbols-outlined text-primary text-[18px] mr-1.5">calendar_today</span>
              <span className="font-label-md text-label-md">Unit 4: Loops &amp; Functions (Week 6)</span>
            </div>
            <Button
              disabled={Boolean(exporting)}
              onClick={() => runExport('csv')}
              variant="secondary"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>{exporting === 'csv' ? 'Exporting…' : 'Export Lab CSV'}</span>
            </Button>
            <Button
              disabled={Boolean(exporting)}
              onClick={() => runExport('pdf')}
              variant="secondary"
            >
              <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
              <span>{exporting === 'pdf' ? 'Exporting…' : 'Export PDF'}</span>
            </Button>
            <Button
              onClick={() => showToast(`Generating AI code diagnostics for ${classLabel}.`)}
              variant="primary"
            >
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
              <span>Run AI Code Diagnostics</span>
            </Button>
          </div>
        </div>
        {(dashboard.loading || roster.loading) && (
          <LoadingBlock className="mb-space-lg" label="Loading cohort analytics from the backend…" />
        )}
        {(dashboard.error || roster.error) && (
          <DataError
            className="mb-space-lg"
            error={dashboard.error || roster.error}
            onRetry={() => {
              dashboard.reload()
              roster.reload()
            }}
          />
        )}
        {/* ROW 1: 4 Key Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md mb-space-lg">{/* Stat 1: Cohort Test Pass Rate */}
          <Card className="p-space-md flex flex-col justify-between hover:shadow-sm transition-shadow" variant="elevated">
            <div className="flex items-center justify-between mb-space-xs">
              <span className="font-label-md text-label-md text-on-surface-variant">Cohort Test Pass Rate</span>
              <div className="w-7 h-7 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[16px]">terminal</span>
              </div>
            </div>
            <div className="flex items-baseline gap-space-xs mb-space-xs">
              <span className="font-metric-number text-metric-number text-on-surface tracking-tight tabular-nums">{formatMetric(dashboard.data?.classAverage)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-body-sm">
              <span className="inline-flex items-center font-label-sm text-status-ok font-semibold">
                <span className="material-symbols-outlined text-[14px] mr-0.5">groups</span>{studentCount}
              </span>
              <span className="text-on-surface-variant font-body-sm">learners in this cohort</span>
            </div>
          </Card>
          {/* Stat 2: Lab Submissions */}
          <Card className="p-space-md flex flex-col justify-between hover:shadow-sm transition-shadow" variant="elevated">
            <div className="flex items-center justify-between mb-space-xs">
              <span className="font-label-md text-label-md text-on-surface-variant">Lab Submissions</span>
              <div className="w-7 h-7 rounded-full bg-surface-container-low flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[16px]">code</span>
              </div>
            </div>
            <div className="flex items-baseline gap-space-xs mb-space-xs">
              <span className="font-metric-number text-metric-number text-on-surface tracking-tight tabular-nums">{formatMetric(dashboard.data?.completionRate)}</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant tabular-nums">({studentCount} learners)</span>
            </div>
            <div className="flex items-center gap-1.5 text-body-sm">
              <span className="inline-flex items-center font-label-sm text-status-ok font-semibold">
                <span className="material-symbols-outlined text-[14px] mr-0.5">check_circle</span>Submitted
              </span>
              <span className="text-on-surface-variant font-body-sm truncate">published activity completion</span>
            </div>
          </Card>
          {/* Stat 3: Flagged for Intervention */}
          <Card className="p-space-md flex flex-col justify-between hover:shadow-sm transition-shadow" variant="elevated">
            <div className="flex items-center justify-between mb-space-xs">
              <span className="font-label-md text-label-md text-on-surface-variant">Flagged for Intervention</span>
              <div className="w-7 h-7 rounded-full bg-surface-container-low flex items-center justify-center text-error">
                <span className="material-symbols-outlined text-[16px]">bug_report</span>
              </div>
            </div>
            <div className="flex items-baseline gap-space-xs mb-space-xs">
              <span className="font-metric-number text-metric-number text-error tracking-tight tabular-nums">{belowThresholdCount}</span>
              <span className="font-body-md text-body-md text-on-surface-variant">students</span>
            </div>
            <div className="flex items-center justify-between text-body-sm">
              <span className="text-on-surface-variant">Scored &lt;{threshold}% threshold</span>
              <a className="font-label-sm text-label-sm text-primary font-semibold hover:underline inline-flex items-center gap-0.5" href="#needs-attention-section">
                Review Bugs <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </a>
            </div>
          </Card>
          {/* Stat 4: Active Coding Time & Streak */}
          <Card className="p-space-md flex flex-col justify-between hover:shadow-sm transition-shadow" variant="elevated">
            <div className="flex items-center justify-between mb-space-xs">
              <span className="font-label-md text-label-md text-on-surface-variant">Cohort Learners</span>
              <div className="w-7 h-7 rounded-full bg-surface-container-low flex items-center justify-center text-warn">
                <span className="material-symbols-outlined text-[16px]">timer</span>
              </div>
            </div>
            <div className="flex items-baseline gap-space-xs mb-space-xs">
              <span className="font-metric-number text-metric-number text-on-surface tracking-tight tabular-nums">{studentCount}</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">enrolled</span>
            </div>
            <div className="flex items-center justify-between text-body-sm text-on-surface-variant">
              <span className="truncate max-w-[130px]">{statusCounts['on-track']} on track</span>
              <span className="font-label-sm text-label-sm text-warn font-semibold">{statusCounts['needs-help']} flagged</span>
            </div>
          </Card>
        </div>
        {/* ROW 2: Class Trajectory & Risk Distribution (8 cols + 4 cols) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg mb-space-lg">
          {/* Left: Score Trajectory (8 cols) — no benchmark series endpoint exists yet */}
          <Card className="xl:col-span-8 p-space-lg flex flex-col justify-between" variant="elevated">
            <div>
              <div className="mb-space-md">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Coding Benchmark Scores Over Time</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Weekly test suite pass rates across the curriculum</p>
              </div>
              <div className="p-space-lg rounded-xl bg-surface-container-low text-center">
                <span className="material-symbols-outlined text-[28px] text-on-surface-variant">show_chart</span>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  No weekly benchmark data is available yet. Scores will appear here once the backend exposes an
                  assessment series.
                </p>
              </div>
            </div>
          </Card>
          {/* Right: Class Status Distribution Donut (4 cols) */}
          <Card className="xl:col-span-4 p-space-lg flex flex-col justify-between" variant="elevated">
            <div>
              <div className="flex items-center justify-between mb-space-xs">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Status Distribution</h3>
                <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">{studentCount} Learners</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">Real-time risk triage breakdown</p>
              {/* SVG Donut Chart with Centered Total */}
              <div className="relative flex items-center justify-center my-2">
                <svg aria-label={`Cohort status distribution: ${studentCount} learners`} className="w-44 h-44 -rotate-90" role="img" viewBox="0 0 100 100">
                  {/* Background circle ring */}
                  <circle className="stroke-surface-container" cx="50" cy="50" fill="none" r="38" strokeWidth="12" />
                  {/* Live risk segments derived from /api/teacher/students */}
                  {distributionSegments.map((segment) => (
                    <circle
                      key={segment.value}
                      className={segment.strokeClass}
                      cx="50"
                      cy="50"
                      fill="none"
                      r="38"
                      strokeDasharray={segment.dasharray}
                      strokeDashoffset={segment.dashoffset}
                      strokeLinecap="round"
                      strokeWidth="12"
                    />
                  ))}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                  <span className="font-headline-lg text-headline-lg text-on-surface font-black leading-none tabular-nums">{studentCount}</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">Enrolled</span>
                </div>
              </div>
              {/* Distribution Triage Legend (derived from live roster) */}
              <div className="flex flex-col gap-2 mt-space-md">
                {distributionSegments.map((segment) => (
                  <div
                    className="flex items-center justify-between py-1.5 px-2.5 rounded-lg"
                    key={segment.value}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${segment.dotClass}`} />
                      <span className="font-label-md text-label-md text-on-surface">
                        {segment.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 font-label-md text-label-md text-on-surface tabular-nums">
                      <span className={segment.value === 'needs-help' ? 'font-semibold text-error' : 'font-semibold'}>
                        {segment.count}
                      </span>
                      <span className="text-on-surface-variant font-normal">({segment.pct}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Quick AI Diagnostic Highlight */}
            <div className="mt-space-md p-3 rounded-xl bg-primary-fixed/30 flex items-start gap-2">
              <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">lightbulb</span>
              <p className="font-body-sm text-body-sm text-on-surface">
                <span className="font-bold text-primary">AI Code Insight:</span> Off-by-one errors in nested <code className="bg-primary-fixed/50 px-1 py-0.5 rounded text-xs">range(len(...))</code> and variable shadowing were the common root causes for 3 of the 4 flagged students.
              </p>
            </div>
          </Card>
        </div>
        {/* ROW 3: Topic Mastery */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg mb-space-lg" id="needs-attention-section">
          {/* Left: CS Concept Mastery (12 cols) */}
          <Card className="xl:col-span-12 p-space-lg flex flex-col justify-between" variant="elevated">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-space-md">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Mastery by CS Concept</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Class pass rate across Python fundamentals</p>
                </div>
                <div className="flex items-center gap-1 overflow-x-auto pb-1" role="group" aria-label="Filter concepts by category">
                  {MASTERY_FILTERS.map((f) => (
                    <button
                      aria-pressed={masteryFilter === f.value}
                      className={masteryFilter === f.value ? MASTERY_PILL_ACTIVE : MASTERY_PILL_IDLE}
                      key={f.value}
                      onClick={() => setMasteryFilter(f.value)}
                      type="button"
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
              {/* CS Concept Mastery Progress Bars */}
              <div className="flex flex-col gap-space-md mt-space-sm">
                {visibleConcepts.map((topic) => (
                  <div key={topic.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-lg bg-surface-container flex items-center justify-center ${topic.iconColor}`}>
                          <span className="material-symbols-outlined text-[16px]">{topic.icon}</span>
                        </span>
                        <span className="font-label-md text-label-md text-on-surface">{topic.name}</span>
                      </div>
                      <span className={`font-label-md text-label-md ${topic.pctColor} font-bold tabular-nums`}>{topic.pct}%</span>
                    </div>
                    <div className="w-full h-3 bg-surface-container-low rounded-full overflow-hidden">
                      <div className={`h-full ${topic.barColor} rounded-full transition-all duration-500`} style={{ width: `${topic.pct}%` }} />
                    </div>
                  </div>
                ))}
                {visibleConcepts.length === 0 && (
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    No concept mastery records yet. They appear after students submit their first activity.
                  </p>
                )}
              </div>
            </div>
            <div className="mt-space-lg pt-space-sm flex items-center justify-between bg-surface-container-low p-3 rounded-xl">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Recommended practice assignment:</span>
              <button className="inline-flex items-center gap-1 font-label-sm text-label-sm text-primary font-bold hover:underline" type="button">
                <span className="material-symbols-outlined text-[16px]">add_circle</span> Assign 15m Loop &amp; Indexing Drill
              </button>
            </div>
          </Card>
          {/* Right: Needs Attention (4 Flagged Students) (6 cols) */}
        </div>
        {/* ROW 4: Student Directory & Comprehensive Roster (Full 12 cols) */}
        <Card className="p-space-lg mb-space-lg" variant="elevated">
          {/* Header with Search & Filter Tabs */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md mb-space-md pb-space-sm">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Student Directory &amp; Progress</h3>
                <span className="font-label-sm text-label-sm bg-surface-container px-2 py-0.5 rounded-full text-on-surface-variant">{statusCounts.all} learners</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{classLabel} · Continuous Automated Lab Evaluations</p>
            </div>
            <div className="flex flex-wrap items-center gap-space-xs">
              {/* Search bar inside table header */}
              <div className="relative min-w-[220px]">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
                <input
                  aria-label="Filter students by name"
                  className="min-h-[44px] w-full bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm pl-9 pr-3 py-1.5 rounded-xl border border-outline-variant/60 focus:outline-none focus:ring-2 focus:ring-primary"
                  onChange={(e) => setStudentSearch(e.target.value)}
                  placeholder="Filter by student name..."
                  type="text"
                  value={studentSearch}
                />
              </div>
              {/* Filter Pill Tabs */}
              <div className="flex items-center bg-surface-container p-1 rounded-xl overflow-x-auto max-w-full" role="group" aria-label="Filter directory by mastery status">
                {rosterFilters.map((f) => (
                  <button
                    aria-pressed={rosterFilter === f.value}
                    className={rosterFilter === f.value ? FILTER_TAB_ACTIVE : FILTER_TAB_IDLE}
                    key={f.value}
                    onClick={() => setRosterFilter(f.value)}
                    type="button"
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <Button
                className="min-h-[44px]"
                onClick={() => runExport('csv')}
                size="sm"
                variant="secondary"
              >
                <span className="material-symbols-outlined text-[16px]">file_download</span> Export
              </Button>
            </div>
          </div>
          {/* Table Container */}
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[760px] text-left font-body-sm text-body-sm">
              <thead>
                <tr className="text-on-surface-variant bg-surface-container-low text-[12px] uppercase tracking-wider font-semibold">
                  <th className="py-3 px-4 rounded-l-xl" scope="col">Learner Name &amp; ID</th>
                  <th className="py-3 px-3" scope="col">Section</th>
                  <th className="py-3 px-4" scope="col">Latest Score</th>
                  <th className="py-3 px-3" scope="col">Trend</th>
                  <th className="py-3 px-4" scope="col">Mastery Status</th>
                  <th className="py-3 px-3" scope="col">Last Active</th>
                  <th className="py-3 px-4 rounded-r-xl text-right" scope="col">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container text-on-surface">
                {pagedStudents.map((s) => (
                  <tr className="hover:bg-surface-container-low/50 transition-colors" key={s.id}>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={s.name} size="sm" />
                        <div>
                          <span className="font-label-md text-label-md text-on-surface font-semibold block">{s.name}</span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant tabular-nums">{s.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-on-surface-variant">{s.section}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold tabular-nums ${s.scoreColor} w-8`}>{s.score}%</span>
                        <div className="w-16 h-1.5 bg-surface-container rounded-full overflow-hidden">
                          <div className={`h-full ${s.barColor} rounded-full`} style={{ width: `${s.score}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className={`py-3.5 px-3 ${s.trendColor} font-medium font-label-sm text-label-sm`}>
                      {s.trend}
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge tone={s.statusTone}>{s.statusLabel}</Badge>
                    </td>
                    <td className="py-3.5 px-3 text-on-surface-variant font-label-sm text-label-sm tabular-nums">{s.lastActive}</td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          aria-label={`${s.mailTitle} to ${s.name}`}
                          className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
                          onClick={() => sendCodeHint(s.name)}
                          title={s.mailTitle}
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">mail</span>
                        </button>
                        <button
                          className="min-h-[44px] px-3 py-1 rounded-lg text-primary hover:bg-surface-container font-label-sm text-label-sm font-semibold transition-colors"
                          onClick={() => openStudentModal(s)}
                          type="button"
                        >
                          Profile
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {pagedStudents.length === 0 && (
                  <tr>
                    <td className="py-8 px-4 text-center text-on-surface-variant font-body-sm" colSpan={7}>
                      {roster.loading
                        ? 'Loading learners from the backend…'
                        : roster.error
                          ? 'Learner data is unavailable. Check that the backend is running, then retry.'
                          : statusCounts.all === 0
                            ? 'No learners are enrolled in this cohort yet.'
                            : 'No learners match this filter or search.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-space-sm pt-space-md mt-space-sm">
            <span className="font-body-sm text-body-sm text-on-surface-variant tabular-nums">
              {totalStudents === 0
                ? 'Showing 0 students'
                : `Showing ${showingFrom} to ${showingTo} of ${totalStudents} students`}
            </span>
            <div className="flex items-center gap-1">
              <button
                aria-label="Previous page"
                className="min-w-[44px] min-h-[44px] rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface disabled:opacity-50"
                disabled={currentPage <= 1}
                onClick={() => setPage((value) => Math.max(1, value - 1))}
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              {pageNumbers.map((pageNumber) => (
                <button
                  aria-current={pageNumber === currentPage ? 'page' : undefined}
                  className={
                    pageNumber === currentPage
                      ? 'min-w-[44px] min-h-[44px] rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-bold tabular-nums'
                      : 'min-w-[44px] min-h-[44px] rounded-lg text-on-surface-variant hover:bg-surface-container font-label-sm text-label-sm tabular-nums'
                  }
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  type="button"
                >
                  {pageNumber}
                </button>
              ))}
              <button
                aria-label="Next page"
                className="min-w-[44px] min-h-[44px] rounded-lg bg-surface-container flex items-center justify-center text-on-surface hover:text-primary disabled:opacity-50 disabled:hover:text-on-surface"
                disabled={currentPage >= totalPages}
                onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        </Card>
      </div>
      {/* INTERACTIVE MODAL / DETAIL PREVIEW: Student Diagnostic Drilldown */}
      {modalStudent && (
        <div
          aria-labelledby="student-modal-title"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/40 backdrop-blur-sm transition-opacity duration-200"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeStudentModal()
          }}
          role="dialog"
        >
          <div className="bg-surface-container-lowest rounded-[24px] border border-outline-variant/60 max-w-lg w-full p-space-lg shadow-[0_20px_40px_rgba(31,35,64,0.16)] flex flex-col gap-space-md relative transform transition-transform duration-200 scale-100">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-space-sm">
              <div className="flex items-center gap-3">
                <Avatar name={modalStudent.name} size="lg" />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface" id="student-modal-title">{modalStudent.name}</h3>
                    <Badge tone={modalStudent.status.includes('Help') ? 'help' : modalStudent.status.includes('Nudge') ? 'nudge' : 'mastered'}>
                      {modalStudent.status}
                    </Badge>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{classLabel} · Student ID: {modalStudent.id}</p>
                </div>
              </div>
              <button aria-label="Close modal" className="min-w-[44px] min-h-[44px] rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface" onClick={closeStudentModal} type="button">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            {/* AI Feedback Summary */}
            <div className="p-space-md rounded-xl bg-primary-fixed/25 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-primary">
                <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                <span className="font-label-md text-label-md font-bold">Aralytics AI Diagnostic</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                {`"${modalStudent.observation}"`}
              </p>
            </div>
            {/* Performance Metrics Breakdown */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 bg-surface-container rounded-xl">
                <span className="font-label-sm text-label-sm text-on-surface-variant block">Recent Score</span>
                <span className={`font-headline-sm text-headline-sm tabular-nums ${modalStudent.status.includes('Help') ? 'text-error' : modalStudent.status.includes('Nudge') ? 'text-warn' : 'text-status-ok'} font-bold`}>{modalStudent.score}</span>
              </div>
              <div className="p-2.5 bg-surface-container rounded-xl">
                <span className="font-label-sm text-label-sm text-on-surface-variant block">Avg Duration</span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">—</span>
              </div>
              <div className="p-2.5 bg-surface-container rounded-xl">
                <span className="font-label-sm text-label-sm text-on-surface-variant block">Attendance</span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">—</span>
              </div>
            </div>
            {/* Quick Action / Encouragement Message Field */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-sm text-label-sm text-on-surface font-semibold" htmlFor="teacherQuickNote">Send Code Hint / Feedback to Student Lab Console:</label>
              <textarea
                className="w-full bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm p-3 rounded-xl border border-outline-variant/60 focus:outline-none focus:ring-2 focus:ring-primary"
                id="teacherQuickNote"
                placeholder="e.g. Remember that range(start, stop) stops before reaching 'stop'! Try printing your loop variable inside each iteration..."
                rows={2}
              />
            </div>
            {/* Modal Footer Controls */}
            <div className="flex items-center justify-end gap-space-xs pt-space-xs">
              <Button onClick={closeStudentModal} variant="secondary">
                Cancel
              </Button>
              <Button onClick={sendTeacherNote} variant="primary">
                <span className="material-symbols-outlined text-[18px]">send</span>
                <span>Send Encouragement</span>
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Notification Toast (for quick interactions) */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 transform translate-y-0 opacity-100 transition-all duration-300 pointer-events-none" role="status" aria-live="polite">
          <div className="bg-inverse-surface text-inverse-on-surface px-space-md py-3 rounded-xl shadow-xl flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary-fixed text-[20px]">check_circle</span>
            <span className="font-label-md text-label-md">{toast}</span>
          </div>
        </div>
      )}
    </div>
  )
}
