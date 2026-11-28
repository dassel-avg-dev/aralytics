import { useState } from 'react'
import { api } from '../../api/client'
import { useApiResource } from '../../api/useApiResource'
import { DataError, EmptyBlock, LoadingBlock } from '../../components/DataState'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'

function average(concepts) {
  if (!concepts?.length) return null
  const total = concepts.reduce((sum, concept) => sum + Number(concept.masteryLevel || 0), 0)
  return Math.round(total / concepts.length)
}

function formatDate(value) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function StudentProgressHistory() {
  const [input, setInput] = useState('')
  const [search, setSearch] = useState('')
  const history = useApiResource(() => api.student.history(search || undefined), [search])

  const items = Array.isArray(history.data?.items) ? history.data.items : []
  const concepts = Array.isArray(history.data?.concepts) ? history.data.concepts : []
  const overall = average(concepts)
  const sorted = [...concepts].sort(
    (left, right) => Number(right.masteryLevel) - Number(left.masteryLevel)
  )
  const strongest = sorted[0] || null
  const weakest = sorted[sorted.length - 1] || null
  const pendingCount = items.filter((item) => item.feedbackStatus !== 'READY').length
  const scored = items.filter((item) => item.score !== null && item.score !== undefined)
  const averageScore = scored.length
    ? scored.reduce((sum, item) => sum + Number(item.score), 0) / scored.length
    : null

  return (
    <div className="max-w-7xl mx-auto px-gutter py-space-lg flex flex-col gap-space-lg">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
        <div className="flex flex-col gap-space-xs max-w-2xl">
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-extrabold">
            My Learning Progress &amp; Feedback History
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Track mastery across concepts and revisit every past attempt.
          </p>
        </div>
        <form
          className="flex flex-wrap items-center gap-2"
          onSubmit={(event) => {
            event.preventDefault()
            setSearch(input.trim())
          }}
        >
          <div className="relative">
            <span
              aria-hidden="true"
              className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]"
            >
              search
            </span>
            <input
              aria-label="Search activities by title"
              className="min-h-[44px] bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/60 focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={(event) => setInput(event.target.value)}
              placeholder="Search by activity title…"
              type="search"
              value={input}
            />
          </div>
          <Button type="submit" variant="primary">
            Search
          </Button>
          {search && (
            <Button
              onClick={() => {
                setInput('')
                setSearch('')
              }}
              variant="secondary"
            >
              Clear
            </Button>
          )}
        </form>
      </div>

      {history.loading && <LoadingBlock label="Loading your progress…" />}
      {history.error && <DataError error={history.error} onRetry={history.reload} />}

      {!history.loading && !history.error && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            <StatCard
              bar={overall}
              hint={`${concepts.length} tracked concepts`}
              icon="verified"
              label="Overall Concept Mastery"
              value={overall === null ? '—' : `${overall}%`}
            />
            <StatCard
              hint={`${pendingCount} awaiting feedback`}
              icon="assignment_turned_in"
              label="Activities Completed"
              value={items.length}
            />
            <StatCard
              hint={strongest ? `Strongest: ${strongest.concept}` : 'No attempts yet'}
              icon="trending_up"
              label="Average Score"
              value={averageScore === null ? '—' : `${averageScore.toFixed(1)}%`}
            />
            <StatCard
              hint={weakest ? weakest.concept : 'Take an activity to see gaps'}
              icon="flag"
              label="Focus Area"
              value={weakest ? `${Math.round(Number(weakest.masteryLevel))}%` : '—'}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
            <Card className="lg:col-span-5 p-space-lg flex flex-col gap-space-md" variant="elevated">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Concept Mastery
                </h2>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Updated from every submission
                </span>
              </div>
              {concepts.length === 0 ? (
                <EmptyBlock
                  icon="school"
                  title="No mastery data yet"
                  message="Submit a published activity to start building your concept profile."
                />
              ) : (
                <div className="flex flex-col gap-space-md">
                  {sorted.map((concept) => {
                    const pct = Math.max(0, Math.min(100, Math.round(concept.masteryLevel)))
                    return (
                      <div key={concept.conceptId ?? concept.concept} className="flex flex-col gap-1">
                        <div className="flex items-center justify-between font-label-md text-label-md">
                          <span className="text-on-surface">{concept.concept}</span>
                          <span
                            className={`tabular-nums font-bold ${
                              pct >= 70 ? 'text-secondary' : 'text-warn'
                            }`}
                          >
                            {pct}%
                          </span>
                        </div>
                        <div
                          aria-label={`${concept.concept} mastery`}
                          aria-valuemax={100}
                          aria-valuemin={0}
                          aria-valuenow={pct}
                          className="w-full h-2 rounded-full bg-surface-container overflow-hidden"
                          role="progressbar"
                        >
                          <div
                            className={`h-full rounded-full ${pct >= 70 ? 'bg-status-ok' : 'bg-accent-yellow'}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </Card>

            <Card className="lg:col-span-7 p-space-lg flex flex-col gap-space-md" variant="elevated">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Feedback History
                </h2>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  {search ? `Filtered by “${search}”` : 'All attempts'}
                </span>
              </div>
              {items.length === 0 ? (
                <div className="flex flex-col items-center gap-space-md">
                  <EmptyBlock
                    className="w-full"
                    icon="history"
                    title={search ? 'No matching attempts' : 'No attempts yet'}
                    message={
                      search
                        ? 'Try a different activity title.'
                        : 'Your submitted activities and their AI feedback will appear here.'
                    }
                  />
                  {search && (
                    <Button
                      onClick={() => {
                        setInput('')
                        setSearch('')
                      }}
                      variant="primary"
                    >
                      Clear search
                    </Button>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-space-sm">
                  {items.map((item) => (
                    <div
                      key={item.submissionId}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm p-space-md rounded-xl bg-surface-container-low"
                    >
                      <div className="flex flex-col gap-1 min-w-0">
                        <span className="font-label-lg text-label-lg font-bold text-on-surface truncate">
                          {item.quizTitle}
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant tabular-nums">
                          Submitted {formatDate(item.submittedAt)} ·{' '}
                          {item.feedbackStatus === 'READY' ? 'Feedback ready' : 'Feedback pending'}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                        {item.score !== null && item.score !== undefined && (
                          <span className="font-headline-sm text-headline-sm font-bold text-primary tabular-nums">
                            {Number(item.score).toFixed(1)}%
                          </span>
                        )}
                        <Badge tone={item.feedbackStatus === 'READY' ? 'mastered' : 'nudge'}>
                          {item.feedbackStatus}
                        </Badge>
                        <Button
                          className="min-h-[44px]"
                          size="sm"
                          to={`/student/feedback?submissionId=${item.submissionId}`}
                          variant="secondary"
                        >
                          View Report
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </>
      )}
    </div>
  )
}

function StatCard({ icon, label, value, hint, bar }) {
  return (
    <Card className="relative overflow-hidden p-space-lg flex flex-col justify-between gap-space-sm" variant="elevated">
      <div className="flex items-start justify-between">
        <span className="font-label-md text-label-md text-on-surface-variant font-medium">{label}</span>
        <span className="w-8 h-8 rounded-lg bg-primary-fixed text-primary flex items-center justify-center">
          <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
            {icon}
          </span>
        </span>
      </div>
      <span className="font-metric-number text-metric-number text-primary tabular-nums">{value}</span>
      <span className="font-body-sm text-body-sm text-on-surface-variant">{hint}</span>
      {typeof bar === 'number' && (
        <div
          aria-label={`${label} progress`}
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={bar}
          className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden"
          role="progressbar"
        >
          <div className="bg-primary h-full rounded-full" style={{ width: `${bar}%` }} />
        </div>
      )}
    </Card>
  )
}
