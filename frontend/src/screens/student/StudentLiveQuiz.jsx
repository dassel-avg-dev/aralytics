import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { api } from '../../api/client'
import { useApiResource } from '../../api/useApiResource'
import { DataError, EmptyBlock, LoadingBlock } from '../../components/DataState'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'

function formatDue(value) {
  if (!value) return 'No due date'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'No due date'
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

function QuestionStem({ text }) {
  if (!text) return null
  const fenceMatch = text.match(/```(?:\w+)?\n([\s\S]*?)```/)
  if (fenceMatch) {
    const before = text.slice(0, fenceMatch.index).trim()
    const after = text.slice(fenceMatch.index + fenceMatch[0].length).trim()
    const prompt = [before, after].filter(Boolean).join(' ')
    return (
      <div className="flex flex-col gap-3">
        {prompt && (
          <h2 id="quiz-question-title" className="font-headline-sm text-headline-sm font-bold text-on-surface">
            {prompt}
          </h2>
        )}
        <pre className="p-4 rounded-xl bg-ink text-inverse-on-surface font-mono text-sm leading-relaxed overflow-x-auto">
          <code>{fenceMatch[1].trimEnd()}</code>
        </pre>
      </div>
    )
  }

  const lines = text.split('\n')
  if (lines.length > 1) {
    return (
      <div className="flex flex-col gap-3">
        <h2 id="quiz-question-title" className="font-headline-sm text-headline-sm font-bold text-on-surface">
          {lines[0]}
        </h2>
        <pre className="p-4 rounded-xl bg-ink text-inverse-on-surface font-mono text-sm leading-relaxed overflow-x-auto">
          <code>{lines.slice(1).join('\n').trimEnd()}</code>
        </pre>
      </div>
    )
  }

  return (
    <h2 id="quiz-question-title" className="font-headline-sm text-headline-sm font-bold text-on-surface">
      {text}
    </h2>
  )
}

export default function StudentLiveQuiz() {
  const [params] = useSearchParams()
  const quizId = params.get('id')
  const quiz = useApiResource(
    () => (quizId ? api.student.quiz(quizId) : Promise.resolve(null)),
    [quizId]
  )

  const [answers, setAnswers] = useState({})
  const [current, setCurrent] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [savingId, setSavingId] = useState(null)
  const [actionError, setActionError] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)

  const questions = Array.isArray(quiz.data?.questions) ? quiz.data.questions : []
  const question = questions[current] || null
  const answeredCount = questions.filter((item) => answers[item.id]).length

  useEffect(() => {
    if (quiz.data?.submitted) return undefined
    const interval = setInterval(() => setSeconds((value) => value + 1), 1000)
    return () => clearInterval(interval)
  }, [quiz.data?.submitted])

  useEffect(() => {
    if (!quiz.data?.questions) return
    const saved = {}
    quiz.data.questions.forEach((item) => {
      if (item.savedAnswer) saved[item.id] = item.savedAnswer
    })
    setAnswers(saved)
  }, [quiz.data])

  async function chooseOption(optionKey) {
    if (!question || quiz.data?.submitted || savingId) return
    const previous = answers[question.id]
    setAnswers((value) => ({ ...value, [question.id]: optionKey }))
    setSavingId(question.id)
    setActionError(null)
    try {
      await api.student.saveAnswer(quizId, {
        questionId: question.id,
        selectedOption: optionKey,
      })
    } catch (error) {
      setAnswers((value) => ({ ...value, [question.id]: previous }))
      setActionError(error)
    } finally {
      setSavingId(null)
    }
  }

  async function submit() {
    if (submitting) return
    setSubmitting(true)
    setActionError(null)
    try {
      const payload = questions
        .filter((item) => answers[item.id])
        .map((item) => ({ questionId: item.id, selectedOption: answers[item.id] }))
      const response = await api.student.submit(quizId, payload)
      setResult(response)
      quiz.reload()
    } catch (error) {
      setActionError(error)
    } finally {
      setSubmitting(false)
    }
  }

  const submitted = Boolean(quiz.data?.submitted) || Boolean(result)
  const feedbackHref = (result?.submissionId || quiz.data?.submissionId)
    ? `/student/feedback?submissionId=${result?.submissionId || quiz.data?.submissionId}`
    : '/student/progress'
  const minutes = Math.floor(seconds / 60)
  const secondsLabel = String(seconds % 60).padStart(2, '0')

  return (
    <div className="max-w-7xl mx-auto px-gutter py-space-lg flex flex-col gap-space-lg">
      {!quizId && (
        <div className="flex flex-col items-center gap-space-md">
          <EmptyBlock
            className="w-full"
            icon="quiz"
            title="Choose an activity first"
            message="Open an activity from My Activities to start a quiz."
          />
          <Button to="/student/activities" variant="primary">
            Browse My Activities
          </Button>
        </div>
      )}
      {quizId && quiz.loading && <LoadingBlock label="Loading your quiz…" />}
      {quizId && quiz.error && <DataError error={quiz.error} onRetry={quiz.reload} />}

      {quizId && quiz.data && (
        <>
          <Card className="p-space-lg flex flex-col md:flex-row md:items-center justify-between gap-space-md" variant="elevated">
            <div className="flex flex-col gap-1">
              <h1 className="font-headline-lg text-headline-lg text-on-surface font-extrabold">
                {quiz.data.title}
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {quiz.data.description || 'Answer every question, then submit.'}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {quiz.data.className && (
                <Badge dot={false} tone="on-track">
                  {quiz.data.className}
                </Badge>
              )}
              <Badge className="tabular-nums" dot={false} tone="neutral">
                Due {formatDue(quiz.data.dueDate)}
              </Badge>
              {!submitted && (
                <Badge aria-label="Elapsed time" className="tabular-nums" dot={false} tone="nudge">
                  <span aria-hidden="true" className="material-symbols-outlined text-[14px]">
                    schedule
                  </span>
                  {minutes}m {secondsLabel}s
                </Badge>
              )}
            </div>
          </Card>

          {submitted && (
            <Card className="p-space-lg bg-status-ok-tint border-status-ok/30 flex flex-col sm:flex-row sm:items-center justify-between gap-space-md" variant="subtle">
              <div>
                <h2 className="font-headline-sm text-headline-sm font-bold text-secondary">Submitted</h2>
                <p className="font-body-md text-body-md text-on-surface tabular-nums">
                  Score: {Number(result?.score ?? quiz.data.score ?? 0).toFixed(1)}% ·{' '}
                  Feedback: {result?.feedbackStatus || quiz.data.feedbackStatus || 'PENDING'}
                </p>
              </div>
              <Button to={feedbackHref} variant="primary">
                View AI Feedback
              </Button>
            </Card>
          )}

          {actionError && (
            <DataError error={actionError} onRetry={() => setActionError(null)} />
          )}

          {!submitted && questions.length > 0 && question && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
              <Card className="lg:col-span-8 p-space-lg flex flex-col gap-space-md" variant="elevated">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-label-md text-label-md text-on-surface-variant tabular-nums">
                    Question {current + 1} of {questions.length}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant tabular-nums">
                    {question.points} {question.points === 1 ? 'point' : 'points'}
                    {savingId === question.id && ' · Saving…'}
                  </span>
                </div>
                <QuestionStem text={question.text} />
                <div
                  aria-labelledby="quiz-question-title"
                  className="flex flex-col gap-2.5"
                  role="radiogroup"
                >
                  {question.options.map((option) => {
                    const selected = answers[question.id] === option.key
                    return (
                      <button
                        key={option.key}
                        aria-checked={selected}
                        className={
                          selected
                            ? 'flex items-center gap-3 text-left px-4 py-3 min-h-[44px] rounded-xl border-2 border-primary bg-primary-fixed/40 font-body-md text-body-md text-on-surface transition-all cursor-pointer'
                            : 'flex items-center gap-3 text-left px-4 py-3 min-h-[44px] rounded-xl border border-outline-variant/60 bg-surface-container-low hover:bg-surface-container font-body-md text-body-md text-on-surface transition-all cursor-pointer'
                        }
                        onClick={() => chooseOption(option.key)}
                        role="radio"
                        type="button"
                      >
                        <span
                          className={
                            selected
                              ? 'w-8 h-8 rounded-lg bg-primary text-on-primary font-mono text-sm font-bold flex items-center justify-center shrink-0'
                              : 'w-8 h-8 rounded-lg bg-surface-container-lowest border border-outline-variant/60 text-primary font-mono text-sm font-bold flex items-center justify-center shrink-0'
                          }
                        >
                          {option.key}
                        </span>
                        <span className="flex-1">{option.text}</span>
                      </button>
                    )
                  })}
                </div>
                {question.concepts?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {question.concepts.map((concept) => (
                      <Badge key={concept} dot={false} tone="neutral">
                        #{concept}
                      </Badge>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between gap-2 pt-2">
                  <Button
                    disabled={current === 0}
                    onClick={() => setCurrent((value) => Math.max(0, value - 1))}
                    variant="secondary"
                  >
                    Previous
                  </Button>
                  {current < questions.length - 1 ? (
                    <Button
                      onClick={() => setCurrent((value) => Math.min(questions.length - 1, value + 1))}
                      variant="primary"
                    >
                      Next Question
                    </Button>
                  ) : (
                    <Button
                      disabled={submitting || answeredCount === 0}
                      onClick={submit}
                      variant="primary"
                    >
                      {submitting ? 'Submitting…' : 'Submit Quiz'}
                    </Button>
                  )}
                </div>
              </Card>

              <Card className="lg:col-span-4 p-space-lg flex flex-col gap-space-md" variant="elevated">
                <div className="flex items-center justify-between">
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    Progress Navigator
                  </h3>
                  <span className="font-label-md text-label-md text-primary font-bold tabular-nums">
                    {answeredCount}/{questions.length}
                  </span>
                </div>
                <div
                  aria-label="Quiz completion progress"
                  aria-valuemax={questions.length}
                  aria-valuemin={0}
                  aria-valuenow={answeredCount}
                  className="w-full h-2 rounded-full bg-surface-container overflow-hidden"
                  role="progressbar"
                >
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${(answeredCount / questions.length) * 100}%` }}
                  />
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((item, index) => (
                    <button
                      key={item.id}
                      aria-current={index === current ? 'step' : undefined}
                      aria-label={`Question ${index + 1}${
                        index === current
                          ? ' (current)'
                          : answers[item.id]
                            ? ' (answered)'
                            : ' (unanswered)'
                      }`}
                      className={
                        index === current
                          ? 'h-11 rounded-xl bg-primary text-on-primary font-label-sm text-label-sm font-bold tabular-nums cursor-pointer'
                          : answers[item.id]
                            ? 'h-11 rounded-xl bg-status-ok-tint text-secondary font-label-sm text-label-sm font-bold tabular-nums cursor-pointer'
                            : 'h-11 rounded-xl bg-surface-container text-on-surface-variant font-label-sm text-label-sm tabular-nums cursor-pointer hover:bg-surface-container-high'
                      }
                      onClick={() => setCurrent(index)}
                      type="button"
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                <Button
                  className="w-full"
                  disabled={submitting || answeredCount === 0}
                  onClick={submit}
                  variant="primary"
                >
                  {submitting ? 'Submitting…' : `Submit ${answeredCount} Answer${answeredCount === 1 ? '' : 's'}`}
                </Button>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Answers save as you go. You can submit with unanswered questions, but they score zero.
                </p>
              </Card>
            </div>
          )}

          {!submitted && questions.length === 0 && (
            <div className="flex flex-col items-center gap-space-md">
              <EmptyBlock
                className="w-full"
                icon="quiz"
                title="This quiz has no questions"
                message="Ask your teacher to add questions and publish it again."
              />
              <Button to="/student/activities" variant="primary">
                Back to My Activities
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
