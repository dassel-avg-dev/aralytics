import { useState } from 'react'
import { api } from '../../api/client'
import { useApiResource } from '../../api/useApiResource'
import { DataError, EmptyBlock, LoadingBlock } from '../../components/DataState'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'assigned', label: 'Assigned' },
  { value: 'remedial', label: 'Remedial' },
  { value: 'completed', label: 'Completed' },
]

const STATUS_META = {
  COMPLETED: {
    label: 'Graded • AI Feedback Available',
    tone: 'mastered',
  },
  REMEDIAL: {
    label: 'Needs Remedial Practice',
    tone: 'help',
  },
  PENDING: {
    label: 'Pending',
    tone: 'nudge',
  },
  ASSIGNED: {
    label: 'Assigned',
    tone: 'on-track',
  },
}

function formatDue(value) {
  if (!value) return 'No due date'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'No due date'
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function scoreLabel(score) {
  if (score === null || score === undefined) return null
  return `${Number(score).toFixed(1)}%`
}

export default function StudentMyActivities() {
  const [activeFilter, setActiveFilter] = useState('all')
  const activities = useApiResource(
    () => api.student.activities(activeFilter),
    [activeFilter]
  )

  const list = Array.isArray(activities.data) ? activities.data : []
  const completed = list.filter((activity) => activity.status === 'COMPLETED')
  const scores = completed
    .map((activity) => Number(activity.score))
    .filter((value) => Number.isFinite(value))
  const averageScore = scores.length
    ? scores.reduce((sum, value) => sum + value, 0) / scores.length
    : null

  return (
    <div className="max-w-7xl mx-auto px-gutter py-space-lg flex flex-col gap-space-lg">
      <Card className="p-space-lg flex flex-col md:flex-row md:items-end justify-between gap-space-md" variant="elevated">
        <div className="flex flex-col gap-space-xs">
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-extrabold">
            My Activities
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Everything your teacher has published, newest first.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-space-sm">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-container-low border border-outline-variant/60 min-h-[44px]">
            <span aria-hidden="true" className="material-symbols-outlined text-primary text-[20px]">
              assignment_turned_in
            </span>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant leading-none">
                Completion
              </span>
              <span className="font-label-lg text-label-lg font-bold text-on-surface tabular-nums">
                {completed.length} of {list.length} Done
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-status-ok-tint text-secondary min-h-[44px]">
            <span aria-hidden="true" className="material-symbols-outlined text-[20px]">
              insights
            </span>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm opacity-80 leading-none">
                Diagnostic Avg
              </span>
              <span className="font-label-lg text-label-lg font-bold tabular-nums">
                {averageScore === null ? '—' : `${averageScore.toFixed(1)}%`}
              </span>
            </div>
          </div>
        </div>
      </Card>

      <div
        aria-label="Filter activities"
        className="inline-flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-surface-container-low border border-outline-variant/60 w-fit max-w-full"
        role="tablist"
      >
        {FILTERS.map((filter) => {
          const active = activeFilter === filter.value
          return (
            <button
              key={filter.value}
              aria-selected={active}
              className={
                active
                  ? 'px-4 py-2 min-h-[44px] rounded-xl font-label-lg text-label-lg font-bold bg-surface-container-lowest text-primary shadow-sm transition-all shrink-0 cursor-pointer'
                  : 'px-4 py-2 min-h-[44px] rounded-xl font-label-lg text-label-lg font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all shrink-0 cursor-pointer'
              }
              onClick={() => setActiveFilter(filter.value)}
              role="tab"
              type="button"
            >
              {filter.label}
            </button>
          )
        })}
      </div>

      {activities.loading && <LoadingBlock label="Loading your activities…" />}
      {activities.error && (
        <DataError error={activities.error} onRetry={activities.reload} />
      )}
      {!activities.loading && !activities.error && list.length === 0 && (
        <div className="flex flex-col items-center gap-space-md">
          <EmptyBlock
            className="w-full"
            icon="assignment"
            title="No activities here yet"
            message={
              activeFilter === 'all'
                ? 'Your teacher has not published an activity yet.'
                : 'No activities match this filter.'
            }
          />
          {activeFilter !== 'all' && (
            <Button onClick={() => setActiveFilter('all')} variant="primary">
              Show all activities
            </Button>
          )}
        </div>
      )}
      {!activities.loading &&
        !activities.error &&
        list.map((activity) => {
          const meta = STATUS_META[activity.status] || STATUS_META.ASSIGNED
          const completedActivity = activity.status === 'COMPLETED'
          const link = completedActivity && activity.submissionId
            ? `/student/feedback?submissionId=${activity.submissionId}`
            : `/student/quiz?id=${activity.id}`
          return (
            <Card
              key={activity.id}
              className="p-space-lg hover:shadow-md transition-shadow flex flex-col gap-space-md"
              variant="elevated"
            >
              <div className="flex flex-wrap items-center justify-between gap-space-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone={meta.tone}>{meta.label}</Badge>
                  <span className="font-label-sm text-label-sm text-on-surface-variant tabular-nums">
                    Due {formatDue(activity.dueDate)}
                  </span>
                </div>
                {scoreLabel(activity.score) && (
                  <div className="flex items-center gap-1.5 font-label-md text-label-md text-secondary font-bold tabular-nums">
                    <span aria-hidden="true" className="material-symbols-outlined text-[16px]">
                      stars
                    </span>
                    Score: {scoreLabel(activity.score)}
                  </div>
                )}
              </div>
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-space-md">
                <div className="flex flex-col gap-1 max-w-xl">
                  <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    {activity.title}
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {activity.description || 'No description provided.'}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="px-2.5 py-1 rounded-lg bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm tabular-nums">
                      {activity.questionCount} Questions
                    </span>
                    {activity.topic && (
                      <span className="px-2.5 py-1 rounded-lg bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">
                        {activity.topic}
                      </span>
                    )}
                    {activity.className && (
                      <span className="px-2.5 py-1 rounded-lg bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">
                        {activity.className}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <Button
                    to={link}
                    variant={completedActivity ? 'secondary' : 'primary'}
                  >
                    <span>{completedActivity ? 'Review Feedback' : 'Start Activity'}</span>
                    <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
                      {completedActivity ? 'chat_bubble_outline' : 'play_arrow'}
                    </span>
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
    </div>
  )
}
