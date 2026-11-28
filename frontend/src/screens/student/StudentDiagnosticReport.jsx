import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { api } from '../../api/client'
import { useApiResource } from '../../api/useApiResource'
import { DataError, EmptyBlock, LoadingBlock } from '../../components/DataState'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'

function formatDate(value) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export default function StudentDiagnosticReport() {
  const [params] = useSearchParams()
  const submissionId = params.get('submissionId')
  const feedback = useApiResource(
    () => (submissionId ? api.student.feedback(submissionId) : Promise.resolve(null)),
    [submissionId]
  )

  const [drill, setDrill] = useState(null)
  const [drillLoading, setDrillLoading] = useState(false)
  const [drillError, setDrillError] = useState(null)
  const [retrying, setRetrying] = useState(false)

  const view = feedback.data
  const pending = view?.status === 'PENDING'

  async function retry() {
    setRetrying(true)
    try {
      const updated = await api.student.retryFeedback(submissionId)
      if (updated?.status === 'READY') feedback.reload()
    } catch {
      feedback.reload()
    } finally {
      setRetrying(false)
    }
  }

  async function startDrill() {
    setDrillLoading(true)
    setDrillError(null)
    try {
      setDrill(await api.student.practiceDrill(submissionId))
    } catch (error) {
      setDrillError(error)
    } finally {
      setDrillLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-gutter py-space-lg flex flex-col gap-space-lg">
      {!submissionId && (
        <div className="flex flex-col items-center gap-space-md">
          <EmptyBlock
            className="w-full"
            icon="psychology"
            title="Pick an attempt"
            message="Open a completed activity or your feedback history to view its diagnostic report."
          />
          <Button to="/student/progress" variant="primary">
            View Progress &amp; Feedback History
          </Button>
        </div>
      )}
      {submissionId && feedback.loading && <LoadingBlock label="Loading your diagnostic feedback…" />}
      {submissionId && feedback.error && (
        <DataError error={feedback.error} onRetry={feedback.reload} />
      )}

      {submissionId && view && (
        <>
          <Card className="p-space-lg" variant="tinted">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
              <div className="flex items-start gap-space-md">
                <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm">
                  <span aria-hidden="true" className="material-symbols-outlined text-[28px]">
                    psychology
                  </span>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="font-headline-lg text-headline-lg text-on-surface font-extrabold">
                      {view.quizTitle}
                    </h1>
                    <Badge tone={pending ? 'nudge' : 'mastered'}>{view.status}</Badge>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 tabular-nums">
                    Submission #{view.submissionId} · Generated {formatDate(view.generatedAt)}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                {pending && (
                  <Button disabled={retrying} onClick={retry} variant="accent">
                    {retrying ? 'Retrying…' : 'Retry Feedback'}
                  </Button>
                )}
                <Button to={`/student/quiz?id=${view.quizId}`} variant="secondary">
                  View Quiz
                </Button>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
            <Card className="lg:col-span-8 p-space-lg flex flex-col gap-space-md" variant="elevated">
              <div className="flex items-center gap-2 pb-3 border-b border-outline-variant/60">
                <span aria-hidden="true" className="material-symbols-outlined text-primary text-[22px]">
                  smart_toy
                </span>
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                  Aral Coach Breakdown
                </h2>
              </div>
              {pending ? (
                <div className="rounded-xl bg-warn-tint border border-warn/20 p-space-md">
                  <p className="font-body-md text-body-md text-warn max-w-[65ch]">
                    Feedback is still being generated. This screen refreshes when you reload, or you
                    can retry now.
                  </p>
                </div>
              ) : (
                <p className="font-body-lg text-body-lg text-on-surface leading-relaxed whitespace-pre-line max-w-[65ch]">
                  {view.content || 'No diagnostic text was generated for this attempt.'}
                </p>
              )}
            </Card>

            <aside className="lg:col-span-4 flex flex-col gap-space-lg">
              <Card className="p-space-lg flex flex-col gap-space-md" variant="elevated">
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Concept Mastery
                </h2>
                {view.concepts?.length ? (
                  view.concepts.map((concept) => {
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
                  })
                ) : (
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    No concept tags on this activity yet.
                  </p>
                )}
              </Card>

              <Card className="p-space-lg flex flex-col gap-space-md" variant="elevated">
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Practice Drill
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Three questions drawn from your published activities on the concepts you missed.
                </p>
                <Button
                  className="w-full"
                  disabled={drillLoading || pending}
                  onClick={startDrill}
                  variant="accent"
                >
                  {drillLoading ? 'Building drill…' : pending ? 'Available once feedback is ready' : 'Start Practice Drill'}
                </Button>
                {drillError && <DataError error={drillError} onRetry={startDrill} />}
                {drill && (
                  <div className="flex flex-col gap-space-md">
                    {drill.questions.length === 0 ? (
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        No matching questions were found yet. Ask your teacher to tag more activities
                        with these concepts.
                      </p>
                    ) : (
                      drill.questions.map((question, index) => (
                        <div key={question.id} className="rounded-xl bg-surface-container-low p-space-md flex flex-col gap-2">
                          <span className="font-label-sm text-label-sm text-primary font-bold">
                            Drill {index + 1} · {question.points} pts
                          </span>
                          <p className="font-body-md text-body-md text-on-surface">{question.text}</p>
                          <ul className="flex flex-col gap-1">
                            {question.options.map((option) => (
                              <li
                                key={option.key}
                                className="font-body-sm text-body-sm text-on-surface-variant"
                              >
                                <span className="font-bold text-on-surface">{option.key}.</span>{' '}
                                {option.text}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </Card>
            </aside>
          </div>
        </>
      )}
    </div>
  )
}
