import { useEffect, useRef, useState } from 'react'
import { api, getStoredClasses, saveBlob } from '../../api/client'
import { useApiResource } from '../../api/useApiResource'
import { DataError, EmptyBlock, LoadingBlock } from '../../components/DataState'
import Avatar from '../../components/ui/Avatar'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'

const pillActive = 'min-h-[44px] px-3.5 py-1.5 rounded-full bg-primary text-on-primary font-bold shadow-xs whitespace-nowrap flex items-center gap-1'
const pillIdle = 'min-h-[44px] px-3.5 py-1.5 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors whitespace-nowrap flex items-center gap-1'
const rowActionBtn = 'min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-lg hover:bg-surface-container transition-colors'
const iconFill = { fontVariationSettings: "'FILL' 1" }

const ROSTER_PAGE_SIZE = 7
const DEFAULT_THRESHOLD = 70

const STATUS_META = {
  high: {
    label: 'High Mastery',
    tone: 'mastered',
    text: 'text-status-ok',
    dot: 'bg-status-ok',
    icon: 'check_circle',
  },
  practice: {
    label: 'Needs Practice',
    tone: 'nudge',
    text: 'text-warn',
    dot: 'bg-accent-yellow',
    icon: 'schedule',
  },
  struggling: {
    label: 'Needs Help',
    tone: 'help',
    text: 'text-error',
    dot: 'bg-error',
    icon: 'warning',
  },
}

function clampPercent(value) {
  const numeric = Number(value)
  if (!Number.isFinite(numeric)) return 0
  return Math.max(0, Math.min(100, Math.round(numeric)))
}

function initialsFor(name) {
  return (name || '?')
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function abbreviateConcept(name) {
  const words = (name || '?').split(/\s+/).filter(Boolean)
  if (words.length === 1) return words[0].slice(0, 3).toUpperCase()
  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}

function formatWhen(value) {
  if (!value) return 'No activity yet'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'No activity yet'
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

function masteryBarClass(pct) {
  if (pct >= 85) return 'bg-status-ok'
  if (pct >= 70) return 'bg-accent-yellow'
  return 'bg-error'
}

function masteryTextClass(pct) {
  if (pct >= 85) return 'text-status-ok font-bold'
  if (pct >= 70) return 'text-warn font-bold'
  return 'text-error font-bold'
}

function normalizeStudent(item, threshold) {
  const score = clampPercent(item.averageScore)
  const mastery = (Array.isArray(item.mastery) ? item.mastery : [])
    .map((entry) => ({
      ...entry,
      pct: clampPercent(entry.masteryLevel),
    }))
    .sort((a, b) => b.pct - a.pct)
  const status = item.belowThreshold ? 'struggling' : score >= 85 ? 'high' : score < threshold ? 'struggling' : 'practice'
  const latestMastery = mastery
    .map((entry) => entry.lastUpdated)
    .filter(Boolean)
    .sort()
    .at(-1)
  const weakest = mastery.slice().sort((a, b) => a.pct - b.pct).slice(0, 2)

  return {
    ...item,
    score,
    mastery,
    weakest,
    status,
    statusMeta: STATUS_META[status],
    initials: initialsFor(item.fullName),
    lastActive: formatWhen(latestMastery),
  }
}

export default function StudentsMasteryRoster() {
  const [query, setQuery] = useState('')
  const [subject, setSubject] = useState('all')
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedId, setSelectedId] = useState(null)
  const [page, setPage] = useState(1)
  const [note, setNote] = useState('')
  const [savedLabel, setSavedLabel] = useState('Not synced in this version')
  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)

  const roster = useApiResource(
    () =>
      api.teacher.students({
        search: query.trim() || undefined,
        topic: subject === 'all' ? undefined : subject,
        status: activeFilter === 'all' ? undefined : activeFilter,
        page,
        size: ROSTER_PAGE_SIZE,
      }),
    [query, subject, activeFilter, page]
  )
  const dashboard = useApiResource(() => api.teacher.dashboard(), [])
  const threshold = dashboard.data?.threshold ?? DEFAULT_THRESHOLD
  const classLabel = getStoredClasses()[0]?.name || 'CS 101: Intro to Python (Section A)'

  const students = (Array.isArray(roster.data?.items) ? roster.data.items : []).map((item) =>
    normalizeStudent(item, threshold)
  )

  const conceptOptions = Array.from(
    new Set(
      (Array.isArray(dashboard.data?.classConceptMastery)
        ? dashboard.data.classConceptMastery
        : []
      ).map((entry) => entry.concept)
    )
  ).sort()

  // Cohort-wide counts from the dashboard aggregate; the roster itself is paginated.
  const counts = {
    all: dashboard.data?.studentCount ?? 0,
    high: dashboard.data?.highMasteryCount ?? 0,
    practice: dashboard.data?.practiceCount ?? 0,
    struggling: dashboard.data?.strugglingCount ?? 0,
  }

  const totalStudents = roster.data?.totalItems ?? 0
  const totalPages = Math.max(1, roster.data?.totalPages ?? 1)
  const currentPage = Math.min(page, totalPages)
  const pagedStudents = students
  const showingFrom = totalStudents === 0 ? 0 : (currentPage - 1) * ROSTER_PAGE_SIZE + 1
  const showingTo = Math.min(currentPage * ROSTER_PAGE_SIZE, totalStudents)
  const pageNumbers = []
  const firstPageInWindow = Math.max(1, Math.min(currentPage - 1, totalPages - 2))
  for (let index = firstPageInWindow; index <= Math.min(totalPages, firstPageInWindow + 2); index += 1) {
    pageNumbers.push(index)
  }

  useEffect(() => {
    setPage(1)
  }, [query, subject, activeFilter])

  useEffect(() => {
    if (selectedId === null && students.length > 0) {
      setSelectedId(students[0].studentId)
    }
  }, [selectedId, students])

  useEffect(() => () => clearTimeout(toastTimer.current), [])

  const selectedStudent =
    students.find((student) => student.studentId === selectedId) || students[0] || null

  const detail = useApiResource(
    () => (selectedStudent ? api.teacher.student(selectedStudent.studentId) : Promise.resolve(null)),
    [selectedStudent?.studentId]
  )

  const detailMastery = (Array.isArray(detail.data?.mastery) ? detail.data.mastery : [])
    .map((entry) => ({ ...entry, pct: clampPercent(entry.masteryLevel) }))
    .sort((a, b) => b.pct - a.pct)
  const panelMastery = detailMastery.length ? detailMastery : selectedStudent?.mastery || []
  const latestFeedback = Array.isArray(detail.data?.feedback) ? detail.data.feedback[0] : null
  const weakestConcepts = panelMastery
    .slice()
    .sort((a, b) => a.pct - b.pct)
    .slice(0, 2)
  const aiSummary =
    latestFeedback?.content?.trim() ||
    (weakestConcepts.length
      ? `Focus areas: ${weakestConcepts
          .map((entry) => `${entry.concept} (${entry.pct}%)`)
          .join(', ')}. ${selectedStudent?.completedCount ?? 0} published ${
          (selectedStudent?.completedCount ?? 0) === 1 ? 'activity' : 'activities'
        } completed so far.`
      : 'No diagnostic feedback has been generated for this student yet. Publish a quiz and submit an attempt to populate mastery insights.')
  const recommendedIntervention = weakestConcepts.length
    ? `Assign a targeted ${weakestConcepts[0].concept} drill (${Math.max(
        1,
        Math.round((100 - weakestConcepts[0].pct) / 20)
      )} questions)`
    : 'Assign a diagnostic quiz to collect mastery data'

  const activeLearners = dashboard.data?.activeStudentCount ?? 0
  const activePercent = counts.all ? Math.round((activeLearners / counts.all) * 100) : 0

  function notify(message) {
    setToast(message)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 3500)
  }

  async function handleExportCsv() {
    if (students.length === 0) {
      notify('There are no learner rows to export yet.')
      return
    }
    try {
      const { blob, filename } = await api.teacher.exportCsv({
        topic: subject === 'all' ? undefined : subject,
      })
      saveBlob(blob, filename || 'aralytics-student-masterlist.csv')
      notify(`Exported ${totalStudents} learner rows from the backend.`)
    } catch (error) {
      notify(error.message || 'Could not export the masterlist.')
    }
  }

  return (
    <div className="flex flex-col w-full">
      <div className="px-space-lg py-space-xl max-w-[1280px] w-full mx-auto flex flex-col gap-space-xl">
        {/* Top Context & Header Action Band */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Students &amp; Coding Mastery Roster</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              <span className="tabular-nums">{counts.all}</span> enrolled {counts.all === 1 ? 'student' : 'students'} in <span className="text-primary font-semibold">{classLabel}</span> · Spring Cohort Assessment Period
            </p>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-space-sm">
            <Button onClick={handleExportCsv} title="Download spreadsheet of student records" variant="secondary">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">download</span>
              <span>Export Masterlist (CSV)</span>
            </Button>
            <Button onClick={() => notify('Batch nudge is not available in this version.')} title="Broadcast nudge to filtered group" variant="secondary">
              <span className="material-symbols-outlined text-[18px] text-primary">forward_to_inbox</span>
              <span>Batch Nudge / Message</span>
            </Button>
            <Button onClick={() => notify('Student enrollment is not available in this version.')} title="Enroll new learner" variant="primary">
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              <span>+ Add Student</span>
            </Button>
          </div>
        </div>

        {(roster.loading || dashboard.loading) && (
          <LoadingBlock label="Loading roster and diagnostics from the backend…" />
        )}
        {(roster.error || dashboard.error) && (
          <DataError
            error={roster.error || dashboard.error}
            onRetry={() => {
              roster.reload()
              dashboard.reload()
            }}
          />
        )}

        {/* Overview Diagnostic KPI Ribbon (3 Cards with Visual Mastery Rings) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-space-lg">
          {/* High Performance / On Track */}
          <Card className="p-space-lg flex items-center justify-between relative overflow-hidden group hover:shadow-md transition-shadow" variant="elevated">
            <div className="flex flex-col gap-space-xs z-10">
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-status-ok"></span>
                <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">High Mastery</span>
              </div>
              <div className="flex items-baseline gap-space-xs mt-1">
                <span className="font-metric-number text-metric-number text-on-surface tabular-nums">{counts.high}</span>
                <span className="font-label-md text-label-md text-on-surface-variant">students</span>
              </div>
              <div className="flex items-center gap-1 font-body-sm text-body-sm text-status-ok font-medium">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
                <span className="tabular-nums">{counts.all ? Math.round((counts.high / counts.all) * 100) : 0}% of class · ≥85% mastery</span>
              </div>
            </div>
            {/* Progress Ring Visual */}
            <div aria-hidden="true" className="relative w-20 h-20 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path className="text-surface-container" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5"></path>
                <path className="text-status-ok" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={`${counts.all ? Math.round((counts.high / counts.all) * 100) : 0}, 100`} strokeLinecap="round" strokeWidth="3.5"></path>
              </svg>
              <span className="absolute font-headline-sm text-headline-sm text-on-surface tabular-nums">{counts.all ? Math.round((counts.high / counts.all) * 100) : 0}%</span>
            </div>
          </Card>
          {/* Needs a Nudge */}
          <Card className="p-space-lg flex items-center justify-between relative overflow-hidden group hover:shadow-md transition-shadow" variant="elevated">
            <div className="flex flex-col gap-space-xs z-10">
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-accent-yellow"></span>
                <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Needs Practice</span>
              </div>
              <div className="flex items-baseline gap-space-xs mt-1">
                <span className="font-metric-number text-metric-number text-on-surface tabular-nums">{counts.practice}</span>
                <span className="font-label-md text-label-md text-on-surface-variant">students</span>
              </div>
              <div className="flex items-center gap-1 font-body-sm text-body-sm text-warn font-medium">
                <span className="material-symbols-outlined text-[16px]">info</span>
                <span className="tabular-nums">{counts.all ? Math.round((counts.practice / counts.all) * 100) : 0}% of class · Approaching the {threshold}% threshold</span>
              </div>
            </div>
            {/* Progress Ring Visual */}
            <div aria-hidden="true" className="relative w-20 h-20 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path className="text-surface-container" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5"></path>
                <path className="text-accent-yellow" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={`${counts.all ? Math.round((counts.practice / counts.all) * 100) : 0}, 100`} strokeLinecap="round" strokeWidth="3.5"></path>
              </svg>
              <span className="absolute font-headline-sm text-headline-sm text-on-surface tabular-nums">{counts.all ? Math.round((counts.practice / counts.all) * 100) : 0}%</span>
            </div>
          </Card>
          {/* Needs Immediate Intervention */}
          <Card className="p-space-lg flex items-center justify-between relative overflow-hidden group hover:shadow-md transition-shadow" variant="elevated">
            <div className="flex flex-col gap-space-xs z-10">
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-error"></span>
                <span className="font-label-md text-label-md text-error uppercase tracking-wider font-bold">Needs Intervention</span>
              </div>
              <div className="flex items-baseline gap-space-xs mt-1">
                <span className="font-metric-number text-metric-number text-error tabular-nums">{counts.struggling}</span>
                <span className="font-label-md text-label-md text-on-surface-variant">students</span>
              </div>
              <div className="flex items-center gap-1 font-body-sm text-body-sm text-error font-medium">
                <span className="material-symbols-outlined text-[16px]">priority_high</span>
                <span className="tabular-nums">{counts.all ? Math.round((counts.struggling / counts.all) * 100) : 0}% of class · Below {threshold}% threshold</span>
              </div>
            </div>
            {/* Progress Ring Visual */}
            <div aria-hidden="true" className="relative w-20 h-20 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path className="text-surface-container" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5"></path>
                <path className="text-error" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={`${counts.all ? Math.round((counts.struggling / counts.all) * 100) : 0}, 100`} strokeLinecap="round" strokeWidth="3.5"></path>
              </svg>
              <span className="absolute font-headline-sm text-headline-sm text-error tabular-nums">{counts.all ? Math.round((counts.struggling / counts.all) * 100) : 0}%</span>
            </div>
          </Card>
        </div>

        {/* Main Workspace: Left Matrix (70%) + Right Focus Drawer (30%) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
          {/* Student Roster & Matrix Table Area (xl:col-span-8) */}
          <div className="xl:col-span-8 flex flex-col gap-space-md">
            {/* Filter and Search Bar Control Tray */}
            <Card className="p-space-md flex flex-col gap-space-md" variant="elevated">
              <div className="flex flex-col md:flex-row gap-space-sm items-center justify-between">
                <div className="relative w-full md:max-w-md">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
                  <input aria-label="Filter students by name, email, or topic" className="min-h-[44px] w-full bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/60 focus:outline-none focus:ring-2 focus:ring-primary transition-all" placeholder="Filter by student name, email, or topic..." type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>
                {/* Subject selector dropdown */}
                <div className="w-full md:w-auto flex items-center gap-space-xs self-stretch md:self-auto">
                  <label className="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap" htmlFor="subjectSelect">Topic Focus:</label>
                  <select className="min-h-[44px] bg-surface-container-low text-on-surface font-label-md text-label-md px-3 py-2 rounded-xl border border-outline-variant/60 focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-auto cursor-pointer" id="subjectSelect" value={subject} onChange={(e) => setSubject(e.target.value)}>
                    <option value="all">All Coding Units (Holistic)</option>
                    {conceptOptions.map((concept) => (
                      <option key={concept} value={concept}>{concept}</option>
                    ))}
                  </select>
                </div>
              </div>
              {/* Filter Pills Carousel */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-label-sm font-label-sm" role="group" aria-label="Filter roster by mastery status">
                <button aria-pressed={activeFilter === 'all'} className={activeFilter === 'all' ? pillActive : pillIdle} onClick={() => setActiveFilter('all')} type="button">All ({counts.all})</button>
                <button aria-pressed={activeFilter === 'high'} className={activeFilter === 'high' ? pillActive : pillIdle} onClick={() => setActiveFilter('high')} type="button">
                  <span className="w-2 h-2 rounded-full bg-status-ok"></span>
                  High Mastery ({counts.high})
                </button>
                <button aria-pressed={activeFilter === 'practice'} className={activeFilter === 'practice' ? pillActive : pillIdle} onClick={() => setActiveFilter('practice')} type="button">
                  <span className="w-2 h-2 rounded-full bg-accent-yellow"></span>
                  Needs Practice ({counts.practice})
                </button>
                <button aria-pressed={activeFilter === 'struggling'} className={activeFilter === 'struggling' ? pillActive : pillIdle} onClick={() => setActiveFilter('struggling')} type="button">
                  <span className="w-2 h-2 rounded-full bg-error"></span>
                  Struggling ({counts.struggling})
                </button>
              </div>
            </Card>

            {/* Roster Matrix Table Card */}
            <Card className="overflow-hidden flex flex-col" variant="elevated">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                      <th className="py-3 px-4" scope="col">Student &amp; ID</th>
                      <th className="py-3 px-3" scope="col">Status</th>
                      <th className="py-3 px-3" scope="col">Overall</th>
                      <th className="py-3 px-3 min-w-[140px]" scope="col">Coding Topic Mastery</th>
                      <th className="py-3 px-3" scope="col">AI Diagnostic Intervention</th>
                      <th className="py-3 px-3 text-center" scope="col">Signal</th>
                      <th className="py-3 px-4 text-right" scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container font-body-sm text-body-sm text-on-surface">
                    {pagedStudents.map((student) => {
                      const isSelected = selectedStudent?.studentId === student.studentId
                      const meta = student.statusMeta
                      const topTopics = student.mastery.slice(0, 4)
                      return (
                        <tr
                          className={`${isSelected ? 'bg-surface-container-high/40 border-l-4 border-l-primary-container ' : ''}hover:bg-surface-container-high transition-colors cursor-pointer`}
                          key={student.studentId}
                          onClick={() => setSelectedId(student.studentId)}
                        >
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <Avatar
                                  className={isSelected ? 'ring-2 ring-primary' : ''}
                                  name={student.fullName}
                                  size="md"
                                />
                                <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ${meta.dot} ring-2 ring-surface-container-lowest`} />
                              </div>
                              <div className="flex flex-col min-w-0">
                                <span className={`font-label-lg text-label-lg truncate ${isSelected ? 'text-primary font-bold' : 'text-on-surface font-semibold'}`}>{student.fullName}</span>
                                <span className="font-label-sm text-label-sm text-on-surface-variant tabular-nums">ID: STU-{student.studentId} · {student.lastActive}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-3 whitespace-nowrap">
                            <Badge tone={meta.tone}>{meta.label}</Badge>
                          </td>
                          <td className="py-3.5 px-3">
                            <span className={`font-headline-sm text-headline-sm font-extrabold tabular-nums ${meta.text}`}>{student.score}%</span>
                          </td>
                          <td className="py-3.5 px-3">
                            {topTopics.length ? (
                              <div className="flex flex-col gap-1 w-32">
                                <div className="flex items-center justify-between text-[10px] text-on-surface-variant gap-1 tabular-nums">
                                  {topTopics.map((topic) => (
                                    <span key={topic.conceptId ?? topic.concept} title={`${topic.concept}: ${topic.pct}%`}>
                                      {abbreviateConcept(topic.concept)}: {topic.pct}%
                                    </span>
                                  ))}
                                </div>
                                <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden flex">
                                  {topTopics.map((topic) => (
                                    <div
                                      className={`${masteryBarClass(topic.pct)} h-full`}
                                      key={topic.conceptId ?? topic.concept}
                                      style={{ width: `${100 / topTopics.length}%` }}
                                      title={`${topic.concept}: ${topic.pct}%`}
                                    />
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <span className="text-[10px] text-on-surface-variant">No mastery data</span>
                            )}
                          </td>
                          <td className="py-3.5 px-3 max-w-[210px]">
                            <div className="flex items-start gap-1.5">
                              <span className="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5" style={iconFill}>auto_awesome</span>
                              <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                                {student.weakest.length ? (
                                  <>
                                    Focus on <span className="font-semibold text-on-surface">{student.weakest[0].concept}</span> ({student.weakest[0].pct}%). {student.completedCount} completed.
                                  </>
                                ) : (
                                  'No diagnostic mastery records yet. Publish an activity to collect evidence.'
                                )}
                              </p>
                            </div>
                          </td>
                          <td className="py-3.5 px-3 text-center" title={meta.label}>
                            <span aria-label={meta.label} className={`material-symbols-outlined text-[20px] ${meta.text}`}>
                              {meta.icon}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1">
                              <button aria-label={`Assign remedial practice to ${student.fullName}`} className={`${rowActionBtn} text-primary`} onClick={(event) => { event.stopPropagation(); notify('Remedial assignment is not available in this version.') }} title="Assign Remedial Practice" type="button">
                                <span className="material-symbols-outlined text-[18px]">assignment_turned_in</span>
                              </button>
                              <button aria-label={`Send coding hint to ${student.fullName}`} className={`${rowActionBtn} text-on-surface-variant`} onClick={(event) => { event.stopPropagation(); notify('Direct messaging is not available in this version.') }} title="Send Coding Hint" type="button">
                                <span className="material-symbols-outlined text-[18px]">send</span>
                              </button>
                              <button aria-label={`View details for ${student.fullName}`} className={`${rowActionBtn} text-on-surface-variant`} onClick={(event) => { event.stopPropagation(); setSelectedId(student.studentId) }} title="View student details" type="button">
                                <span className="material-symbols-outlined text-[18px]">visibility</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                    {pagedStudents.length === 0 && (
                      <tr>
                        <td className="py-10 px-4 text-center text-on-surface-variant" colSpan={7}>
                          {roster.loading
                            ? 'Loading learners from the backend…'
                            : roster.error
                              ? 'Learner data is unavailable. Check that the backend is running, then retry.'
                              : counts.all === 0
                                ? 'No learners are enrolled in this cohort yet.'
                                : 'No learners match this filter or search.'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {/* Pagination / Masterlist Summary Bar */}
              <div className="p-space-md bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-sm text-on-surface-variant font-body-sm text-body-sm">
                <div className="flex items-center gap-space-sm">
                  <span className="tabular-nums">Showing <strong className="text-on-surface">{totalStudents ? `${showingFrom} - ${showingTo}` : '0'}</strong> of {totalStudents} students</span>
                  <span className="text-outline-variant">·</span>
                  <span className="text-xs tabular-nums">{counts.struggling} learners below the {threshold}% intervention threshold</span>
                </div>
                <div className="flex items-center gap-1 font-label-md text-label-md">
                  <button className="min-h-[44px] px-3 py-1 rounded-lg bg-surface-container text-on-surface-variant disabled:opacity-50" disabled={currentPage === 1} onClick={() => setPage((value) => Math.max(1, value - 1))} type="button">Previous</button>
                  {pageNumbers.map((pageNumber) => (
                    <button key={pageNumber} aria-current={pageNumber === currentPage ? 'page' : undefined} className={pageNumber === currentPage ? 'min-w-[44px] min-h-[44px] px-3 py-1 rounded-lg bg-primary text-on-primary font-bold tabular-nums' : 'min-w-[44px] min-h-[44px] px-3 py-1 rounded-lg hover:bg-surface-container text-on-surface tabular-nums'} onClick={() => setPage(pageNumber)} type="button">{pageNumber}</button>
                  ))}
                  <button className="min-h-[44px] px-3 py-1 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors disabled:opacity-50" disabled={currentPage === totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))} type="button">Next</button>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Focus Drawer / Student Deep-Dive Panel (xl:col-span-4) */}
          <div className="xl:col-span-4 flex flex-col gap-space-md">
            {selectedStudent ? (
              <Card className="p-space-lg flex flex-col gap-space-md relative overflow-hidden" variant="elevated">
                {/* Card Header & Status */}
                <div className="flex items-start justify-between gap-space-sm">
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar name={selectedStudent.fullName} size="lg" />
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-headline-sm text-headline-sm text-on-surface truncate">{selectedStudent.fullName}</h3>
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant truncate">{selectedStudent.completedCount} completed · {selectedStudent.email}</span>
                      <span className="font-label-sm text-label-sm text-primary font-semibold">ID: STU-{selectedStudent.studentId}</span>
                    </div>
                  </div>
                  <Badge tone={selectedStudent.statusMeta.tone}>{selectedStudent.statusMeta.label}</Badge>
                </div>

                {detail.loading && <LoadingBlock label="Loading student diagnostic…" />}
                {detail.error && <DataError error={detail.error} onRetry={detail.reload} />}

                {/* Mastery Breakdown Mini Grid */}
                {panelMastery.length ? (
                  <div className="grid grid-cols-2 gap-2 bg-surface-container-low p-space-sm rounded-xl">
                    {panelMastery.slice(0, 4).map((topic) => (
                      <div key={topic.conceptId ?? topic.concept} className="flex flex-col p-2 bg-surface-container-lowest rounded-lg">
                        <span className="font-label-sm text-label-sm text-on-surface-variant truncate" title={topic.concept}>{topic.concept}</span>
                        <span className={`font-headline-sm text-headline-sm tabular-nums ${masteryTextClass(topic.pct)}`}>{topic.pct}%</span>
                        <span className="text-[10px] text-on-surface-variant">Updated {formatWhen(topic.lastUpdated)}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyBlock icon="insights" title="No mastery data yet" message="Mastery appears here after the student submits a published activity." />
                )}

                {/* AI Feedback Snippet Box */}
                <div className="bg-primary-fixed/30 rounded-xl p-space-md flex flex-col gap-space-xs relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-primary font-label-sm text-label-sm font-bold">
                      <span className="material-symbols-outlined text-[16px]" style={iconFill}>psychology</span>
                      <span className="">Aralytics Diagnostic Summary</span>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      {latestFeedback?.generatedAt ? formatWhen(latestFeedback.generatedAt) : 'Live from mastery data'}
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface leading-relaxed bg-surface-container-lowest/80 p-2.5 rounded-lg">
                    {aiSummary}
                  </p>
                  <div className="flex flex-col gap-1 pt-1">
                    <span className="font-label-sm text-label-sm text-primary font-semibold">Recommended Intervention:</span>
                    <span className="font-label-sm text-label-sm text-secondary bg-secondary-container/40 px-2.5 py-1 rounded-lg font-bold">{recommendedIntervention}</span>
                  </div>
                </div>

                {/* Direct Teacher Action Callout */}
                <div className="flex flex-col gap-2">
                  <Button className="w-full" onClick={() => notify('Remedial quiz assignment is not available in this version.')} variant="accent">
                    <span className="material-symbols-outlined text-[18px]">code</span>
                    <span>Assign Remedial Coding Quiz</span>
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button onClick={() => notify('Student chat is not available in this version.')} variant="secondary">
                      <span className="material-symbols-outlined text-[16px] text-primary">chat_bubble_outline</span>
                      <span>Student Chat</span>
                    </Button>
                    <Button onClick={() => notify('The coding sandbox is not available in this version.')} variant="secondary">
                      <span className="material-symbols-outlined text-[16px]">terminal</span>
                      <span>Open Sandbox</span>
                    </Button>
                  </div>
                </div>

                {/* Teacher Private Observation Notes */}
                <div className="flex flex-col gap-space-xs pt-space-xs">
                  <div className="flex items-center justify-between">
                    <label className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1" htmlFor="teacherPrivateNote">
                      <span className="material-symbols-outlined text-[16px] text-on-surface-variant">edit_note</span>
                      Teacher Log (Private)
                    </label>
                    <span className="text-[11px] text-on-surface-variant font-label-sm">Local only</span>
                  </div>
                  <textarea className="w-full bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm p-3 rounded-xl border border-outline-variant/60 focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none" id="teacherPrivateNote" placeholder="Confidential observations on code trace capability, debug sessions..." rows={3} value={note} onChange={(e) => setNote(e.target.value)}></textarea>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">sync_problem</span>
                      {savedLabel}
                    </span>
                    <Button onClick={() => { setSavedLabel('Saved locally — not synced'); notify('Private notes are not persisted by the 40% backend.') }} variant="primary">
                      Save Note
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <EmptyBlock icon="person_search" title="Select a learner" message="Choose a row in the roster to open the diagnostic deep-dive." />
            )}

            {/* Weekly Intervention Tracker Widget */}
            <Card className="p-space-md flex flex-col gap-space-sm" variant="elevated">
              <div className="flex items-center justify-between">
                <h4 className="font-label-lg text-label-lg text-on-surface font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-secondary">checklist</span>
                  Remediation Activity (Current Cycle)
                </h4>
                <span className="font-label-sm text-label-sm text-on-surface-variant">{activeLearners} / {counts.all} Active</span>
              </div>
              <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                <div className="bg-status-ok h-full rounded-full" style={{ width: `${activePercent}%` }}></div>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {activePercent}% of enrolled learners have completed at least one published activity this cycle.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Floating Toast Confirmation */}
      <div
        aria-live="polite"
        className={
          'fixed bottom-6 right-6 z-50 transform transition-all duration-300 flex items-center gap-space-sm bg-inverse-surface text-inverse-on-surface px-space-lg py-3 rounded-xl shadow-xl max-w-md ' +
          (toast ? '' : 'translate-y-24 opacity-0 pointer-events-none')
        }
        role="status"
      >
        <span className="material-symbols-outlined text-secondary-fixed text-[20px]" style={iconFill}>info</span>
        <span className="font-label-md text-label-md">{toast}</span>
      </div>
    </div>
  )
}
