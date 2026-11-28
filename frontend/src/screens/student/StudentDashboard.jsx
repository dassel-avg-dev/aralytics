import { Link } from 'react-router-dom'
import { api, getStoredUser } from '../../api/client'
import { useApiResource } from '../../api/useApiResource'
import { DataError, EmptyBlock, LoadingBlock } from '../../components/DataState'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'

const CURRENT_YEAR = new Date().getFullYear()

function clampPercent(value) {
  const numeric = Number(value)
  if (!Number.isFinite(numeric)) return 0
  return Math.max(0, Math.min(100, Math.round(numeric)))
}

function formatDue(value) {
  if (!value) return 'No due date'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'No due date'
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

function formatRelative(value) {
  if (!value) return 'No attempts yet'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'No attempts yet'
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

function masteryMeta(pct) {
  if (pct >= 85) {
    return { pill: 'Mastered', tone: 'mastered', bar: 'bg-status-ok', text: 'text-secondary' }
  }
  if (pct >= 70) {
    return { pill: 'On Track', tone: 'on-track', bar: 'bg-primary', text: 'text-primary' }
  }
  return { pill: 'Needs Nudge', tone: 'nudge', bar: 'bg-accent-yellow', text: 'text-warn' }
}

function conceptIcon(concept) {
  const key = (concept || '').toLowerCase()
  if (/loop|iterat/.test(key)) return 'sync'
  if (/list|dict|data structure|array/.test(key)) return 'dataset'
  if (/condition|branch|boolean|logic/.test(key)) return 'alt_route'
  if (/function|scope|class|oop/.test(key)) return 'code'
  if (/syntax|debug|error|variable/.test(key)) return 'bug_report'
  return 'school'
}

function conceptCategory(concept) {
  const key = (concept || '').toLowerCase()
  if (/loop|condition|branch|logic/.test(key)) return 'Algorithms'
  if (/list|dict|data structure|array/.test(key)) return 'Data Structures'
  if (/function|scope|class|oop/.test(key)) return 'OOP Fundamentals'
  return 'Python Fundamentals'
}

export default function StudentDashboard() {
  const dashboard = useApiResource(() => api.student.dashboard(), [])
  const activities = useApiResource(() => api.student.activities(), [])

  const user = getStoredUser()
  const firstName = user?.fullName?.split(' ')[0] || 'there'

  const streakDays = dashboard.data?.streak?.activeDaysLast7 ?? 0
  const conceptMastery = (Array.isArray(dashboard.data?.conceptMastery)
    ? dashboard.data.conceptMastery
    : []
  )
    .map((concept) => ({ ...concept, pct: clampPercent(concept.masteryLevel) }))
    .sort((a, b) => b.pct - a.pct)

  const activityList = Array.isArray(activities.data) ? activities.data : []
  const pendingActivities = activityList.filter((activity) => activity.status !== 'COMPLETED')
  const priorityActivity =
    activityList.find((activity) => activity.status === 'REMEDIAL') ||
    pendingActivities[0] ||
    activityList[0] ||
    null
  const recentScore = Array.isArray(dashboard.data?.recentScores)
    ? dashboard.data.recentScores[0]
    : null
  const completedCount = dashboard.data?.completedCount ?? 0
  const assignedCount = dashboard.data?.assignedCount ?? activityList.length
  const strongestConcept = conceptMastery[0] || null
  const weakestConcept = conceptMastery.length
    ? conceptMastery[conceptMastery.length - 1]
    : null

  const isInitialLoading =
    (dashboard.loading && !dashboard.data) || (activities.loading && !activities.data)

  return (
    <div className="max-w-7xl mx-auto px-gutter py-space-lg flex flex-col gap-space-lg">
      {(dashboard.loading || activities.loading) && (
        <LoadingBlock label="Loading your dashboard from Aralytics…" />
      )}
      {(dashboard.error || activities.error) && (
        <DataError
          error={dashboard.error || activities.error}
          onRetry={() => {
            dashboard.reload()
            activities.reload()
          }}
        />
      )}
      {!isInitialLoading && (
        <>
          {/* Greeting Header & Compact Metric Pills */}
          <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-extrabold">
                Kumusta, {firstName}!
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">
                Ready for your next coding drill? You have{' '}
                <span className="font-bold text-on-surface tabular-nums">
                  {pendingActivities.length}
                </span>{' '}
                assigned {pendingActivities.length === 1 ? 'activity' : 'activities'} waiting.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 bg-surface-container-lowest border border-outline-variant/60 px-3.5 py-2 rounded-xl min-h-[44px]">
                <span aria-hidden="true" className="material-symbols-outlined text-[18px] text-primary">
                  assignment_turned_in
                </span>
                <span className="font-label-md text-label-md text-on-surface font-semibold tabular-nums">
                  {completedCount}/{assignedCount} Completed
                </span>
              </div>
              <div className="inline-flex items-center gap-2 bg-warn-tint border border-warn/20 px-3.5 py-2 rounded-xl min-h-[44px]">
                <span aria-hidden="true" className="material-symbols-outlined text-[18px] text-warn">
                  local_fire_department
                </span>
                <span className="font-label-md text-label-md text-warn font-semibold tabular-nums">
                  {streakDays} {streakDays === 1 ? 'Day' : 'Days'} Streak
                </span>
              </div>
              <Button
                size="md"
                to={priorityActivity ? `/student/quiz?id=${priorityActivity.id}` : '/student/activities'}
                variant="primary"
              >
                <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
                  play_circle
                </span>
                <span>Quick Drill</span>
              </Button>
            </div>
          </section>

          {/* Main 8/4 Bento Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
            <Card className="lg:col-span-7 xl:col-span-8 p-6 flex flex-col justify-between" variant="elevated">
              <div>
                {priorityActivity ? (
                  <>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge tone={priorityActivity.status === 'REMEDIAL' ? 'help' : 'on-track'}>
                          {priorityActivity.status === 'REMEDIAL' ? 'Remedial Drill' : 'Assigned Activity'}
                        </Badge>
                        <span className="text-on-surface-variant font-label-md text-label-md font-semibold">
                          {priorityActivity.topic || priorityActivity.className || 'Python Programming'}
                        </span>
                      </div>
                      <span className="text-on-surface-variant font-label-sm text-label-sm tabular-nums">
                        Due {formatDue(priorityActivity.dueDate)}
                      </span>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="font-headline-md text-headline-md text-on-surface font-extrabold tracking-tight">
                        {priorityActivity.title}
                      </h2>
                      <div className="w-11 h-11 rounded-xl bg-surface-container text-primary flex items-center justify-center shrink-0">
                        <span aria-hidden="true" className="material-symbols-outlined text-[24px]">
                          data_object
                        </span>
                      </div>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed max-w-2xl">
                      {priorityActivity.description ||
                        `${priorityActivity.className || 'Your class'} has assigned this ${priorityActivity.questionCount}-question activity. Open it to review the questions and track your progress.`}
                    </p>
                    <div className="flex flex-wrap items-center gap-6 my-5 pt-1">
                      <div className="flex items-center gap-2 text-on-surface">
                        <span aria-hidden="true" className="material-symbols-outlined text-[18px] text-on-surface-variant">
                          quiz
                        </span>
                        <span className="font-body-sm text-body-sm font-medium tabular-nums">
                          {priorityActivity.questionCount} Questions
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-on-surface">
                        <span aria-hidden="true" className="material-symbols-outlined text-[18px] text-on-surface-variant">
                          schedule
                        </span>
                        <span className="font-body-sm text-body-sm font-medium tabular-nums">
                          ~{Math.max(5, priorityActivity.questionCount * 2)} Minutes
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-on-surface">
                        <span aria-hidden="true" className="material-symbols-outlined text-[18px] text-on-surface-variant">
                          target
                        </span>
                        <span className="font-body-sm text-body-sm font-medium tabular-nums">
                          {priorityActivity.score != null
                            ? `${Math.round(Number(priorityActivity.score))}% scored`
                            : '80% Mastery Goal'}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col gap-2">
                    <h2 className="font-headline-md text-headline-md text-on-surface font-extrabold tracking-tight">
                      No activities assigned yet
                    </h2>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Your teacher has not published an activity for this class yet. Check back soon.
                    </p>
                  </div>
                )}
              </div>
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <Button
                  size="md"
                  to={priorityActivity ? `/student/quiz?id=${priorityActivity.id}` : '/student/activities'}
                  variant="primary"
                >
                  <span>{priorityActivity ? 'Start Quiz Now' : 'View Activities'}</span>
                  <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                </Button>
                <Button size="md" to="/student/activities" variant="secondary">
                  <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
                    info
                  </span>
                  <span>Preview Details</span>
                </Button>
              </div>
            </Card>

            <Card className="lg:col-span-5 xl:col-span-4 p-6 flex flex-col justify-between" variant="elevated">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
                      <span aria-hidden="true" className="material-symbols-outlined text-[20px]">
                        smart_toy
                      </span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                        Aral Coach AI
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        {recentScore ? `Latest: ${recentScore.quizTitle}` : 'Live mastery summary'}
                      </p>
                    </div>
                  </div>
                  <Badge tone="ai">Diagnostic</Badge>
                </div>
                <div className="p-3.5 rounded-xl bg-surface-container-low mt-2">
                  <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                    {recentScore
                      ? `Your latest score was ${Math.round(Number(recentScore.score))}% on “${recentScore.quizTitle}” (${formatRelative(recentScore.submittedAt)}). `
                      : 'Complete an activity to unlock personalized coaching. '}
                    {weakestConcept
                      ? `Focus next on ${weakestConcept.concept}, currently at ${weakestConcept.pct}% mastery.`
                      : 'Your concept mastery will appear here after your first submission.'}
                  </p>
                </div>
                <div className="space-y-2 mt-3">
                  <div className="p-2.5 rounded-xl bg-surface-container flex items-center gap-2">
                    <span aria-hidden="true" className="material-symbols-outlined text-status-ok text-[16px]">
                      check_circle
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface">
                      {strongestConcept
                        ? `Strongest: ${strongestConcept.concept} (${strongestConcept.pct}%)`
                        : 'No mastery evidence yet'}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-surface-container flex items-center gap-2">
                    <span aria-hidden="true" className="material-symbols-outlined text-warn text-[16px]">
                      lightbulb
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface">
                      {weakestConcept ? `Focus next: ${weakestConcept.concept}` : 'Take a quiz to reveal focus areas'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-2 flex flex-col gap-2">
                <Button
                  className="w-full"
                  size="md"
                  to={priorityActivity ? `/student/quiz?id=${priorityActivity.id}` : '/student/activities'}
                  variant="secondary"
                >
                  <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
                    terminal
                  </span>
                  <span>
                    {weakestConcept ? `Practice ${weakestConcept.concept}` : 'Find a practice activity'}
                  </span>
                </Button>
                <Button className="w-full" size="sm" to="/student/feedback" variant="ghost">
                  View All Feedback
                </Button>
              </div>
            </Card>
          </section>

          {/* Concept Mastery Grid */}
          <section className="mt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <h2 className="font-headline-md text-headline-md text-on-surface font-extrabold tracking-tight">
                    Concept Mastery Breakdown
                  </h2>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Real-time adaptive assessment scores mapped to Computer Science competencies
                </p>
              </div>
              <Link
                className="inline-flex items-center gap-1 font-label-lg text-label-lg text-primary hover:text-primary-container transition-colors font-bold self-start sm:self-auto min-h-[44px]"
                to="/student/progress"
              >
                <span>View CS Skill Matrix</span>
                <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
                  chevron_right
                </span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {conceptMastery.slice(0, 4).map((concept) => {
                const meta = masteryMeta(concept.pct)
                const iconColor =
                  concept.pct >= 85 ? 'text-secondary' : concept.pct >= 70 ? 'text-primary' : 'text-warn'
                return (
                  <Card
                    key={concept.conceptId ?? concept.concept}
                    className="p-5 flex flex-col justify-between"
                    variant="elevated"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className={`w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center ${iconColor}`}>
                          <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
                            {conceptIcon(concept.concept)}
                          </span>
                        </div>
                        <Badge tone={meta.tone}>{meta.pill}</Badge>
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        {conceptCategory(concept.concept)}
                      </span>
                      <h3 className="font-label-lg text-label-lg text-on-surface font-bold mt-0.5">
                        {concept.concept}
                      </h3>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-baseline justify-between mb-1.5">
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Mastery
                        </span>
                        <span className={`font-label-lg text-label-lg font-bold tabular-nums ${meta.text}`}>
                          {concept.pct}%
                        </span>
                      </div>
                      <div
                        aria-label={`${concept.concept} mastery`}
                        aria-valuemax={100}
                        aria-valuemin={0}
                        aria-valuenow={concept.pct}
                        className="w-full h-2 rounded-full bg-surface-container overflow-hidden"
                        role="progressbar"
                      >
                        <div className={`h-full rounded-full ${meta.bar}`} style={{ width: `${concept.pct}%` }} />
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                        Updated {formatRelative(concept.lastUpdated)}
                      </p>
                    </div>
                  </Card>
                )
              })}
              {conceptMastery.length === 0 && (
                <div className="md:col-span-2 lg:col-span-4">
                  <EmptyBlock
                    icon="insights"
                    title="No mastery data yet"
                    message="Concept mastery appears here after you submit a published activity."
                  />
                </div>
              )}
            </div>
          </section>

          {/* Recent Activities & Milestones */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
            <Card className="lg:col-span-6 p-6 flex flex-col justify-between" variant="elevated">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-outline-variant/60 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
                      <span aria-hidden="true" className="material-symbols-outlined text-[20px]">
                        calendar_month
                      </span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-extrabold">
                        Recent Activities
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Upcoming coding drills assigned by your mentors
                      </p>
                    </div>
                  </div>
                  <Badge tone="on-track">{pendingActivities.length} Assigned</Badge>
                </div>
                <div className="space-y-3.5">
                  {pendingActivities.slice(0, 2).map((activity, index) => (
                    <div
                      key={activity.id}
                      className="p-4 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                            index === 0 ? 'bg-status-ok-tint text-secondary' : 'bg-primary-fixed text-primary'
                          }`}
                        >
                          <span aria-hidden="true" className="material-symbols-outlined text-[20px]">
                            {index === 0 ? 'terminal' : 'data_object'}
                          </span>
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`font-label-sm text-label-sm font-bold ${
                                index === 0 ? 'text-secondary' : 'text-primary'
                              }`}
                            >
                              {activity.topic || activity.className || 'Python 101'}
                            </span>
                            <span className="text-on-surface-variant text-[11px]">•</span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                              {activity.status === 'REMEDIAL'
                                ? 'Remedial Drill'
                                : activity.status === 'OVERDUE'
                                  ? 'Overdue'
                                  : 'Assigned Activity'}
                            </span>
                          </div>
                          <h4 className="font-label-lg text-label-lg text-on-surface font-extrabold mt-0.5">
                            {activity.title}
                          </h4>
                          <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm mt-1 tabular-nums">
                            <span aria-hidden="true" className="material-symbols-outlined text-[14px]">
                              schedule
                            </span>
                            <span>Due {formatDue(activity.dueDate)}</span>
                            <span>•</span>
                            <span>{activity.questionCount} questions</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        className="self-start sm:self-auto shrink-0"
                        size="md"
                        to={`/student/quiz?id=${activity.id}`}
                        variant="secondary"
                      >
                        <span>Start</span>
                        <span aria-hidden="true" className="material-symbols-outlined text-[16px]">
                          chevron_right
                        </span>
                      </Button>
                    </div>
                  ))}
                  {pendingActivities.length === 0 && (
                    <div className="p-4 rounded-2xl bg-surface-container-low text-on-surface-variant font-body-sm text-body-sm">
                      You are all caught up — no assigned activities are waiting. Check My Activities for completed work.
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-outline-variant/60 flex items-center justify-between gap-2">
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Looking for older activities?
                </span>
                <Link
                  className="inline-flex items-center font-label-md text-label-md text-primary font-bold hover:underline min-h-[44px]"
                  to="/student/activities"
                >
                  View All Completed Drills →
                </Link>
              </div>
            </Card>

            <Card className="lg:col-span-6 p-6 flex flex-col justify-between" variant="elevated">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span aria-hidden="true" className="material-symbols-outlined text-primary text-[20px]">
                      emoji_events
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                      Milestones
                    </h3>
                  </div>
                  <Badge tone="neutral" dot={false}>
                    Week 14
                  </Badge>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-low flex items-center gap-4">
                  <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                    <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 72 72">
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
                        strokeDashoffset={
                          188.4 * (1 - (assignedCount ? Math.min(completedCount, assignedCount) / assignedCount : 0))
                        }
                        strokeLinecap="round"
                        strokeWidth="6"
                      />
                    </svg>
                    <span className="absolute font-label-md text-label-md text-on-surface font-bold tabular-nums">
                      {Math.min(completedCount, assignedCount)}/{assignedCount}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-label-md text-label-md text-on-surface font-bold">
                      Activity Completion Goal
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      {assignedCount > 0 && completedCount >= assignedCount
                        ? 'All assigned activities are complete. Nice work!'
                        : `Complete ${Math.max(0, assignedCount - completedCount)} more ${
                            assignedCount - completedCount === 1 ? 'activity' : 'activities'
                          } to finish this cycle.`}
                    </p>
                  </div>
                </div>
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-label-md text-label-md text-on-surface font-semibold">
                      Recent Badges
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      12 total
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-surface-container-low flex flex-col items-center text-center">
                      <span aria-hidden="true" className="material-symbols-outlined text-warn text-[22px] mb-1">
                        local_fire_department
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface font-semibold leading-tight">
                        3-Day Streak
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-surface-container-low flex flex-col items-center text-center">
                      <span aria-hidden="true" className="material-symbols-outlined text-primary text-[22px] mb-1">
                        bug_report
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface font-semibold leading-tight">
                        Debug Ace
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-surface-container-low flex flex-col items-center text-center">
                      <span aria-hidden="true" className="material-symbols-outlined text-secondary text-[22px] mb-1">
                        bolt
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface font-semibold leading-tight">
                        Speed Coder
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 pt-3 border-t border-outline-variant/60 flex items-center justify-between gap-2">
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Next: Python Master II
                </span>
                <Link
                  className="inline-flex items-center font-label-sm text-label-sm text-primary font-bold hover:underline min-h-[44px]"
                  to="/student/progress"
                >
                  All Badges →
                </Link>
              </div>
            </Card>
          </section>

          <footer className="pt-6 border-t border-outline-variant/60 flex flex-col md:flex-row items-center justify-between gap-space-md text-center md:text-left">
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Pagsulong sa Karunungan
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              © {CURRENT_YEAR} Aralytics Learning Platform. All rights reserved.
            </p>
          </footer>
        </>
      )}
    </div>
  )
}
