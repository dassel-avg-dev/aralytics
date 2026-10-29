import { useEffect, useRef, useState } from 'react'

// Row + student-detail data rebuilt from the Stitch export
// (screens/stitch/aralytics_students_mastery_roster/code.html — CS 101: Intro to Python).
const rowMeta = [
  {
    text: 'miguel ramos 109283-01',
    overall: 58,
    tags: ['struggling'],
    name: 'Miguel Ramos',
    id: 'STU-109283-01',
    subtitle: '16 yrs old · CS 101 (Section A)',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsfro1v9aP5aeh724J-Hc4_qTti9gxIRjiMSn4fLrws8RnRmgbdTkXkOTW8I25BMPgXTkh1KGivF53lspYoBLDKtaSiZpDwYkdj8iExtFzNkShOGPq0tfQ5w9PiASeiKBYve5LSqqXrA455DBgajOSMhLYQ8Q9VUzom2TjtLYkxQ9deowXU1TQ7EnwFm29RNIbxqgJDnU0q0Yr-9CemeY2opDHXVrZ7JZ44m8CgewZNltqvwqPc8QjVw',
    badge: 'Needs Intervention',
    badgeClass: 'bg-error-container text-on-error-container font-bold',
    topics: [
      { name: 'Loops & Iteration', pct: 42, pctClass: 'text-error font-extrabold', trend: '↓ 8% off-by-one errors', trendClass: 'text-error font-medium' },
      { name: 'Conditionals', pct: 65, pctClass: 'text-tertiary font-bold', trend: '↑ 3% improving', trendClass: 'text-secondary font-medium' },
      { name: 'Data Structures', pct: 70, pctClass: 'text-secondary font-bold', trend: 'Stable', trendClass: 'text-on-surface-variant' },
      { name: 'Functions & Scope', pct: 55, pctClass: 'text-error font-bold', trend: 'Needs review', trendClass: 'text-error font-medium' },
    ],
    aiSummary: '“Struggles with off-by-one errors in while loops and list boundary indexing. Correctly understands boolean expressions and basic variables.”',
    intervention: 'Assign Targeted While-Loop & Indexing Drill (5 Qs)',
  },
  {
    text: 'carlos reyes 109283-02',
    overall: 62,
    tags: ['struggling'],
    name: 'Carlos Reyes',
    id: 'STU-109283-02',
    subtitle: '16 yrs old · CS 101 (Section A)',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEIrxnutiQBR1Ss1fG_EZomzfWNODsOaf8dbHnW0OwqQgLuMGu_dRcUDCwzO6zVEN3AdIdiNbCbFrJZDlRzYoBRW4s0CaRkp8xhLtRo0q6ebOtUcxAS35-z0TsWP0NIf2w3MDXfBUQUR5-ukqSzuqitf7NvPJq0ZRaHtvJsoTXAjhXFc7wPrNyJLIFxd-USTccXNVa1XGiOQn3AI5whBefG71sgL1y5Pj-1n1XohPUJzHrG6bidByUWA',
    badge: 'Needs Intervention',
    badgeClass: 'bg-error-container text-on-error-container font-bold',
    topics: [
      { name: 'Loops & Iteration', pct: 65, pctClass: 'text-tertiary font-bold', trend: 'Stable', trendClass: 'text-on-surface-variant' },
      { name: 'Conditionals', pct: 68, pctClass: 'text-secondary font-bold', trend: '↑ 2% improving', trendClass: 'text-secondary font-medium' },
      { name: 'Data Structures', pct: 70, pctClass: 'text-secondary font-bold', trend: 'Stable', trendClass: 'text-on-surface-variant' },
      { name: 'Functions & Scope', pct: 50, pctClass: 'text-error font-bold', trend: 'Needs review', trendClass: 'text-error font-medium' },
    ],
    aiSummary: '“Flags in variable scope and return values. Several functions return None unintentionally due to missing return statements.”',
    intervention: 'Assign Scope & Return-Value Drill (5 Qs)',
  },
  {
    text: 'jasmine tan 109283-03',
    overall: 65,
    tags: ['struggling'],
    name: 'Jasmine Tan',
    id: 'STU-109283-03',
    subtitle: '16 yrs old · CS 101 (Section A)',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDs8ofhGXtw9VvxI9HfDaHununmam_Ijqn4JZWYXbMxZJD_qfjnoxlwK0ztogegLsNakAQCUduYZHRMsCfRpECV43pOjdDBOEjg9OSyGFM5xBKE6Q3BDy6rb2gMixQ8zMk7lhFE-2lEzyghIoGNBDVQfQXomAw5L1AWXpAGWLmw9c1tjtgtuYJWHSbzugLXdDolYgd7hYZLJwC1qV8hyBkQV2_d07TrJylebgpm1G3fswUyfHK_3QuvqQ',
    badge: 'Needs Intervention',
    badgeClass: 'bg-error-container text-on-error-container font-bold',
    topics: [
      { name: 'Loops & Iteration', pct: 68, pctClass: 'text-tertiary font-bold', trend: 'Stable', trendClass: 'text-on-surface-variant' },
      { name: 'Conditionals', pct: 55, pctClass: 'text-error font-bold', trend: '↓ 4% IndentationError', trendClass: 'text-error font-medium' },
      { name: 'Data Structures', pct: 70, pctClass: 'text-secondary font-bold', trend: '↑ 2% improving', trendClass: 'text-secondary font-medium' },
      { name: 'Functions & Scope', pct: 66, pctClass: 'text-tertiary font-bold', trend: 'Stable', trendClass: 'text-on-surface-variant' },
    ],
    aiSummary: '“Repeated IndentationError from mixing tabs and spaces in nested conditionals. Conceptual understanding remains solid.”',
    intervention: 'Assign Indentation & Nested Conditional Drill (5 Qs)',
  },
  {
    text: 'paolo garcia 109283-04',
    overall: 68,
    tags: ['struggling'],
    name: 'Paolo Garcia',
    id: 'STU-109283-04',
    subtitle: '17 yrs old · CS 101 (Section A)',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAEu-Hjs-cV6Fgt43wjg2VfAnErUgduA7IupvIkDDNUvPNiU0HIyuiXBAaJ37YXJTdGABqCqteEXontvsfwE-SZPurtoeOEY8eKtyadEFYDPsnbyYktVjjSQ1HXDcXwzZ2E2VHXpoh4SQvfm0X-4xZRq9Z0S2ecTejz68UclQKk2mECvBItgeRHuas8OSY-rK2vZME-W52Bg8OK3hgGjrkaKBPpOiAxRvCPtpSS2bCaSCNdd6zMHiMMQ',
    badge: 'Needs Intervention',
    badgeClass: 'bg-error-container text-on-error-container font-bold',
    topics: [
      { name: 'Loops & Iteration', pct: 70, pctClass: 'text-tertiary font-bold', trend: 'Stable', trendClass: 'text-on-surface-variant' },
      { name: 'Conditionals', pct: 72, pctClass: 'text-secondary font-bold', trend: '↑ 1% improving', trendClass: 'text-secondary font-medium' },
      { name: 'Data Structures', pct: 58, pctClass: 'text-error font-bold', trend: '↓ 3% slicing errors', trendClass: 'text-error font-medium' },
      { name: 'Functions & Scope', pct: 71, pctClass: 'text-secondary font-bold', trend: 'Stable', trendClass: 'text-on-surface-variant' },
    ],
    aiSummary: '“Struggles with list slicing boundaries and negative indices. Overall command of sequence types is improving steadily.”',
    intervention: 'Assign List Slicing Drill (5 Qs)',
  },
  {
    text: 'bea mendoza 109283-05',
    overall: 96,
    tags: ['high'],
    name: 'Bea Mendoza',
    id: 'STU-109283-05',
    subtitle: '17 yrs old · CS 101 (Section A)',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4DxUqfi2bhs3GY8NcwKZgOtYZlhacdRrZJVlbWNoQMZQ96K0GMlM6kXnnhg7QPQWN6n2EWd6bqZzPPTnIGQfDUJEgoH0N5LFR1y5dIyH-drXL2f0-qywGyN4noBSq8V06WHCZBzMGfM8-N-HFT4B7E5M3K3bwERI5Trh8Ifuu5J0jbuP8262Fd2uL7wO7ixLvj1MtqqOPChjLIcB0DAhd9Hy3S6v0b4WQHLb-_KfIepkvgRwgS7dtow',
    badge: 'On Track',
    badgeClass: 'bg-secondary-container text-on-secondary-container font-bold',
    topics: [
      { name: 'Loops & Iteration', pct: 95, pctClass: 'text-secondary font-bold', trend: 'Stable', trendClass: 'text-on-surface-variant' },
      { name: 'Conditionals', pct: 96, pctClass: 'text-secondary font-bold', trend: '↑ 1% improving', trendClass: 'text-secondary font-medium' },
      { name: 'Data Structures', pct: 97, pctClass: 'text-secondary font-bold', trend: 'Stable', trendClass: 'text-on-surface-variant' },
      { name: 'Functions & Scope', pct: 94, pctClass: 'text-secondary font-bold', trend: 'Mastered', trendClass: 'text-secondary font-medium' },
    ],
    aiSummary: '“Advanced Python comprehension. Consistently reaches beyond the syllabus — ready for OOP enrichment.”',
    intervention: 'Assign OOP Enrichment Module',
  },
  {
    text: 'luis fernando 109283-06',
    overall: 92,
    tags: ['high'],
    name: 'Luis Fernando',
    id: 'STU-109283-06',
    subtitle: '16 yrs old · CS 101 (Section A)',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAA5zxk7aGGB4gl_mi8_0zvhLuM9GgbrO21HfCMqqsBkhroE-3zwA_glrAzw-Q6YzgAG83M2EwT_IuCMef-lyQSnQe9E6cXL6jS3pBIu8LYpNuvJ__4KnCJeMtdM4tzLtDfwFgu6RTZ1sU6QY_b6rsRzNTs8fZyZq1SAkgPGs6lbKy317K1IsEh05y88CV-iHvDsXM9DrZEAKBn-WeagwlLzCoYsoyGcNqN3-paNoTbI5qCLTfZB9N_Cg',
    badge: 'On Track',
    badgeClass: 'bg-secondary-container text-on-secondary-container font-bold',
    topics: [
      { name: 'Loops & Iteration', pct: 90, pctClass: 'text-secondary font-bold', trend: 'Stable', trendClass: 'text-on-surface-variant' },
      { name: 'Conditionals', pct: 88, pctClass: 'text-secondary font-bold', trend: '↑ 2% improving', trendClass: 'text-secondary font-medium' },
      { name: 'Data Structures', pct: 96, pctClass: 'text-secondary font-bold', trend: 'Mastered', trendClass: 'text-secondary font-medium' },
      { name: 'Functions & Scope', pct: 90, pctClass: 'text-secondary font-bold', trend: 'Stable', trendClass: 'text-on-surface-variant' },
    ],
    aiSummary: '“Mastered dictionary lookups, key iteration, and hash sets. High problem solving speed across drills.”',
    intervention: 'Assign Advanced Data Structures Sprint',
  },
  {
    text: 'sofia bautista 109283-07',
    overall: 81,
    tags: ['high'],
    name: 'Sofia Bautista',
    id: 'STU-109283-07',
    subtitle: '16 yrs old · CS 101 (Section A)',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArrko1W6MHMhUzKTZbouCbvja3virC9V7BacfJGXA1KD3BpNoiUNxzLDER7_imkkwAeXX62yPkmZiHQ2KA-k05xQGBHonDHWruD_hIP7ppP4nKlT93GZvNAycnpZCsNIRCfP88-BCiUvZSOt4lpmRXCV-mKxsHw6M81W6ycup1mGFs-6ke0VregCSQwi9HZIetgurBZfkCC-4g1VnIsvzco7817Ms0jWbpRD6ivljSaMIzVfZV5qGFPQ',
    badge: 'On Track',
    badgeClass: 'bg-secondary-container text-on-secondary-container font-bold',
    topics: [
      { name: 'Loops & Iteration', pct: 78, pctClass: 'text-tertiary font-bold', trend: 'Stable', trendClass: 'text-on-surface-variant' },
      { name: 'Conditionals', pct: 80, pctClass: 'text-secondary font-bold', trend: '↑ 3% improving', trendClass: 'text-secondary font-medium' },
      { name: 'Data Structures', pct: 84, pctClass: 'text-secondary font-bold', trend: 'Stable', trendClass: 'text-on-surface-variant' },
      { name: 'Functions & Scope', pct: 82, pctClass: 'text-secondary font-bold', trend: 'Strong', trendClass: 'text-secondary font-medium' },
    ],
    aiSummary: '“Strong function decomposition. Writes clean docstrings and modular helper functions.”',
    intervention: 'Assign Function Design Sprint',
  },
]

const pillActive = 'px-3 py-1.5 rounded-full bg-primary-container text-on-primary font-bold shadow-xs whitespace-nowrap'
const pillIdle = 'px-3 py-1.5 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors whitespace-nowrap flex items-center gap-1'
const rowActionBtn = 'p-1.5 rounded-lg hover:bg-surface-container transition-colors'
const iconFill = { fontVariationSettings: "'FILL' 1" }
const imgFallback = (e) => (e.currentTarget.style.visibility = 'hidden')

export default function StudentsMasteryRoster() {
  const [query, setQuery] = useState('')
  const [subject, setSubject] = useState('all')
  const [activeFilter, setActiveFilter] = useState('all')
  const [selected, setSelected] = useState(0)
  const [page, setPage] = useState(1)
  const [note, setNote] = useState('Spoke with Miguel. He confuses 0-indexed lists with 1-based counting. Paired with peer mentor and assigned loop tracer.')
  const [savedLabel, setSavedLabel] = useState('Saved 10m ago')
  const [showToast, setShowToast] = useState(false)
  const toastTimer = useRef(null)

  useEffect(() => () => clearTimeout(toastTimer.current), [])

  const sel = rowMeta[selected]

  const rowVisible = (i) => {
    const row = rowMeta[i]
    const q = query.trim().toLowerCase()
    return (
      (activeFilter === 'all' || row.tags.includes(activeFilter)) &&
      (q === '' || row.text.includes(q))
    )
  }

  const rowClass = (i, base) =>
    `${rowVisible(i) ? '' : 'hidden '}${selected === i ? 'bg-surface-container-high/40 border-l-4 border-l-primary-container ' : ''}${base}`

  const handleBatchNudge = () => {
    setShowToast(true)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setShowToast(false), 3500)
  }

  return (
    <div className="flex flex-col w-full">
      <div className="px-space-lg py-space-xl max-w-[1280px] w-full mx-auto flex flex-col gap-space-xl">
        {/* Top Context & Header Action Band */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
              <span className="text-primary font-bold">Classroom Central</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="">Learner Performance Diagnostics</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Students &amp; Coding Mastery Roster</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              42 enrolled students in <span className="text-primary font-semibold">CS 101: Intro to Python (Section A)</span> · Spring Cohort Assessment Period
            </p>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-space-sm">
            <button className="flex items-center gap-space-xs px-space-md py-2.5 rounded-xl bg-surface-container-lowest text-on-surface hover:bg-surface-container-high transition-all shadow-sm font-label-md text-label-md" title="Download spreadsheet of student records" type="button">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">download</span>
              <span className="">Export Masterlist (CSV)</span>
            </button>
            <button className="flex items-center gap-space-xs px-space-md py-2.5 rounded-xl bg-surface-container text-primary hover:bg-surface-container-high transition-all font-label-md text-label-md" onClick={handleBatchNudge} title="Broadcast nudge to filtered group" type="button">
              <span className="material-symbols-outlined text-[18px]">forward_to_inbox</span>
              <span className="">Batch Nudge / Message</span>
            </button>
            <button className="flex items-center gap-space-xs px-space-md py-2.5 rounded-xl bg-primary-container text-on-primary hover:bg-primary transition-all shadow-md font-label-md text-label-md" title="Enroll new learner" type="button">
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              <span className="">+ Add Student</span>
            </button>
          </div>
        </div>
        {/* Overview Diagnostic KPI Ribbon (3 Cards with Visual Mastery Rings) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-space-lg">
          {/* High Performance / On Track */}
          <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex items-center justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="flex flex-col gap-space-xs z-10">
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-secondary"></span>
                <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">On Track</span>
              </div>
              <div className="flex items-baseline gap-space-xs mt-1">
                <span className="font-metric-number text-metric-number text-on-surface">30</span>
                <span className="font-label-md text-label-md text-on-surface-variant">students</span>
              </div>
              <div className="flex items-center gap-1 font-body-sm text-body-sm text-secondary font-medium">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
                <span className="">71% of class · Meets mastery</span>
              </div>
            </div>
            {/* Progress Ring Visual */}
            <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path className="text-surface-container" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5"></path>
                <path className="text-secondary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="71, 100" strokeLinecap="round" strokeWidth="3.5"></path>
              </svg>
              <span className="absolute font-headline-sm text-headline-sm text-on-surface">71%</span>
            </div>
          </div>
          {/* Needs a Nudge */}
          <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex items-center justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="flex flex-col gap-space-xs z-10">
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-tertiary-fixed-dim"></span>
                <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Needs Practice</span>
              </div>
              <div className="flex items-baseline gap-space-xs mt-1">
                <span className="font-metric-number text-metric-number text-on-surface">8</span>
                <span className="font-label-md text-label-md text-on-surface-variant">students</span>
              </div>
              <div className="flex items-center gap-1 font-body-sm text-body-sm text-tertiary font-medium">
                <span className="material-symbols-outlined text-[16px]">info</span>
                <span className="">19% of class · Borderline 70-75%</span>
              </div>
            </div>
            {/* Progress Ring Visual */}
            <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path className="text-surface-container" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5"></path>
                <path className="text-tertiary-fixed-dim" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="19, 100" strokeLinecap="round" strokeWidth="3.5"></path>
              </svg>
              <span className="absolute font-headline-sm text-headline-sm text-on-surface">19%</span>
            </div>
          </div>
          {/* Needs Immediate Intervention */}
          <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex items-center justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="flex flex-col gap-space-xs z-10">
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-error"></span>
                <span className="font-label-md text-label-md text-error uppercase tracking-wider font-bold">Needs Intervention</span>
              </div>
              <div className="flex items-baseline gap-space-xs mt-1">
                <span className="font-metric-number text-metric-number text-error">4</span>
                <span className="font-label-md text-label-md text-on-surface-variant">students</span>
              </div>
              <div className="flex items-center gap-1 font-body-sm text-body-sm text-error font-medium">
                <span className="material-symbols-outlined text-[16px]">priority_high</span>
                <span className="">10% of class · Below 70% threshold</span>
              </div>
            </div>
            {/* Progress Ring Visual */}
            <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path className="text-surface-container" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5"></path>
                <path className="text-error" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="10, 100" strokeLinecap="round" strokeWidth="3.5"></path>
              </svg>
              <span className="absolute font-headline-sm text-headline-sm text-error">10%</span>
            </div>
          </div>
        </div>
        {/* Main Workspace: Left Matrix (70%) + Right Focus Drawer (30%) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
          {/* Student Roster & Matrix Table Area (xl:col-span-8) */}
          <div className="xl:col-span-8 flex flex-col gap-space-md">
            {/* Filter and Search Bar Control Tray */}
            <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col gap-space-md">
              <div className="flex flex-col md:flex-row gap-space-sm items-center justify-between">
                <div className="relative w-full md:max-w-md">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
                  <input className="w-full bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm pl-10 pr-4 py-2.5 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-primary-container transition-all" placeholder="Filter by student name, LRN, or topic..." type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>
                {/* Subject selector dropdown */}
                <div className="w-full md:w-auto flex items-center gap-space-xs self-stretch md:self-auto">
                  <label className="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap" htmlFor="subjectSelect">Topic Focus:</label>
                  <select className="bg-surface-container-low text-on-surface font-label-md text-label-md px-3 py-2 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-primary-container w-full md:w-auto cursor-pointer" id="subjectSelect" value={subject} onChange={(e) => setSubject(e.target.value)}>
                    <option value="all">All Coding Units (Holistic)</option>
                    <option value="loops">Loops &amp; Iteration</option>
                    <option value="conditionals">Conditionals &amp; Booleans</option>
                    <option value="structures">Data Structures (Lists &amp; Dicts)</option>
                    <option value="functions">Functions &amp; Scope</option>
                  </select>
                </div>
              </div>
              {/* Filter Pills Carousel */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-label-sm font-label-sm">
                <button className={activeFilter === 'all' ? pillActive : pillIdle} onClick={() => setActiveFilter('all')} type="button">All (42)</button>
                <button className={activeFilter === 'high' ? pillActive : pillIdle} onClick={() => setActiveFilter('high')} type="button">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  {'High Mastery (>85%)'}
                </button>
                <button className={activeFilter === 'struggling' ? pillActive : pillIdle} onClick={() => setActiveFilter('struggling')} type="button">
                  <span className="w-2 h-2 rounded-full bg-error"></span>
                  {'Struggling (<65%)'}
                </button>
                <button className={activeFilter === 'incomplete' ? pillActive : pillIdle} onClick={() => setActiveFilter('incomplete')} type="button">
                  <span className="material-symbols-outlined text-[14px]">pending_actions</span>
                  Incomplete Tasks (6)
                </button>
                <button className={activeFilter === 'inactive' ? pillActive : pillIdle} onClick={() => setActiveFilter('inactive')} type="button">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  {'Inactive >3 days (2)'}
                </button>
              </div>
            </div>
            {/* Roster Matrix Table Card */}
            <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden flex flex-col">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                      <th className="py-3 px-4">Student &amp; ID</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3">Overall</th>
                      <th className="py-3 px-3 min-w-[140px]">Coding Topic Mastery</th>
                      <th className="py-3 px-3">AI Diagnostic Intervention</th>
                      <th className="py-3 px-3 text-center">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container font-body-sm text-body-sm text-on-surface">
                    {/* Row 1: Miguel Ramos (Selected / Focused) */}
                    <tr className={rowClass(0, 'hover:bg-surface-container-high transition-colors cursor-pointer')} onClick={() => setSelected(0)}>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img className="w-9 h-9 rounded-full object-cover ring-2 ring-primary-container" alt="Miguel Ramos" src={rowMeta[0].img} onError={imgFallback} />
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-secondary ring-2 ring-surface-container-lowest" title="Active 15m ago"></span>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-label-lg text-label-lg text-primary font-bold truncate">Miguel Ramos</span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">ID: STU-109283-01 · 15m ago</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-error-container text-on-error-container font-bold">Needs Help</span>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-1.5">
                          <span className="font-headline-sm text-headline-sm text-error font-extrabold">58%</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="flex flex-col gap-1 w-32">
                          <div className="flex items-center justify-between text-[10px] text-on-surface-variant">
                            <span className="">L: 42%</span>
                            <span className="">C: 65%</span>
                            <span className="">D: 70%</span>
                            <span className="">F: 55%</span>
                          </div>
                          <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden flex">
                            <div className="bg-error h-full" style={{ width: '42%' }} title="Loops 42%"></div>
                            <div className="bg-tertiary-fixed-dim h-full" style={{ width: '23%' }} title="Conditionals 65%"></div>
                            <div className="bg-secondary h-full" style={{ width: '25%' }} title="Data Structures 70%"></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 max-w-[210px]">
                        <div className="flex items-start gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5" style={iconFill}>auto_awesome</span>
                          <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                            Struggles with <span className="font-semibold text-on-surface">Off-by-one errors in while loops</span> and list boundary indexing.
                          </p>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-center text-lg" title="Status: Flagged">
                        ⚠️
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button className={`${rowActionBtn} text-primary`} title="Assign Remedial Practice" type="button">
                            <span className="material-symbols-outlined text-[18px]">assignment_turned_in</span>
                          </button>
                          <button className={`${rowActionBtn} text-on-surface-variant`} title="Send Coding Hint" type="button">
                            <span className="material-symbols-outlined text-[18px]">send</span>
                          </button>
                          <button className={`${rowActionBtn} text-on-surface-variant`} title="View Code Submissions" type="button">
                            <span className="material-symbols-outlined text-[18px]">visibility</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                    {/* Row 2: Carlos Reyes */}
                    <tr className={rowClass(1, 'hover:bg-surface-container-low transition-colors cursor-pointer')} onClick={() => setSelected(1)}>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img className="w-9 h-9 rounded-full object-cover" alt="Carlos Reyes" src={rowMeta[1].img} onError={imgFallback} />
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-surface-dim ring-2 ring-surface-container-lowest"></span>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-label-lg text-label-lg text-on-surface font-semibold truncate">Carlos Reyes</span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">ID: STU-109283-02 · 1h ago</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-error-container text-on-error-container font-bold">Needs Help</span>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-1.5">
                          <span className="font-headline-sm text-headline-sm text-error font-extrabold">62%</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="flex flex-col gap-1 w-32">
                          <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden flex">
                            <div className="bg-secondary h-full" style={{ width: '50%' }}></div>
                            <div className="bg-error h-full" style={{ width: '30%' }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 max-w-[210px]">
                        <div className="flex items-start gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5" style={iconFill}>auto_awesome</span>
                          <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                            Flags in <span className="font-semibold text-on-surface">Variable Scope &amp; Return Values</span>. Returns None accidentally.
                          </p>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-center text-lg">
                        ⚠️
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button className={`${rowActionBtn} text-primary`} type="button"><span className="material-symbols-outlined text-[18px]">assignment_turned_in</span></button>
                          <button className={`${rowActionBtn} text-on-surface-variant`} type="button"><span className="material-symbols-outlined text-[18px]">send</span></button>
                          <button className={`${rowActionBtn} text-on-surface-variant`} type="button"><span className="material-symbols-outlined text-[18px]">visibility</span></button>
                        </div>
                      </td>
                    </tr>
                    {/* Row 3: Jasmine Tan */}
                    <tr className={rowClass(2, 'hover:bg-surface-container-low transition-colors cursor-pointer')} onClick={() => setSelected(2)}>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img className="w-9 h-9 rounded-full object-cover" alt="Jasmine Tan" src={rowMeta[2].img} onError={imgFallback} />
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-secondary ring-2 ring-surface-container-lowest"></span>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-label-lg text-label-lg text-on-surface font-semibold truncate">Jasmine Tan</span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">ID: STU-109283-03 · 2h ago</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-error-container text-on-error-container font-bold">Needs Help</span>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="font-headline-sm text-headline-sm text-error font-extrabold">65%</span>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden w-32">
                          <div className="bg-error h-full rounded-full" style={{ width: '65%' }}></div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 max-w-[210px]">
                        <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                          Needs support with <span className="font-semibold text-on-surface">Indentation &amp; nested conditionals</span>. Python IndentationError triggers.
                        </p>
                      </td>
                      <td className="py-3.5 px-3 text-center text-lg">
                        ⚠️
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button className={`${rowActionBtn} text-primary`} type="button"><span className="material-symbols-outlined text-[18px]">assignment_turned_in</span></button>
                          <button className={`${rowActionBtn} text-on-surface-variant`} type="button"><span className="material-symbols-outlined text-[18px]">send</span></button>
                          <button className={`${rowActionBtn} text-on-surface-variant`} type="button"><span className="material-symbols-outlined text-[18px]">visibility</span></button>
                        </div>
                      </td>
                    </tr>
                    {/* Row 4: Paolo Garcia */}
                    <tr className={rowClass(3, 'hover:bg-surface-container-low transition-colors cursor-pointer')} onClick={() => setSelected(3)}>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img className="w-9 h-9 rounded-full object-cover" alt="Paolo Garcia" src={rowMeta[3].img} onError={imgFallback} />
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-secondary ring-2 ring-surface-container-lowest"></span>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-label-lg text-label-lg text-on-surface font-semibold truncate">Paolo Garcia</span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">ID: STU-109283-04 · 4h ago</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-error-container text-on-error-container font-bold">Needs Help</span>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="font-headline-sm text-headline-sm text-error font-extrabold">68%</span>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden w-32">
                          <div className="bg-error h-full rounded-full" style={{ width: '68%' }}></div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 max-w-[210px]">
                        <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                          Struggles with <span className="font-semibold text-on-surface">List slicing boundaries [start:stop:step]</span> and negative indices.
                        </p>
                      </td>
                      <td className="py-3.5 px-3 text-center text-lg">
                        ⚠️
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button className={`${rowActionBtn} text-primary`} type="button"><span className="material-symbols-outlined text-[18px]">assignment_turned_in</span></button>
                          <button className={`${rowActionBtn} text-on-surface-variant`} type="button"><span className="material-symbols-outlined text-[18px]">send</span></button>
                          <button className={`${rowActionBtn} text-on-surface-variant`} type="button"><span className="material-symbols-outlined text-[18px]">visibility</span></button>
                        </div>
                      </td>
                    </tr>
                    {/* Row 5: Bea Mendoza (Top Performer) */}
                    <tr className={rowClass(4, 'hover:bg-surface-container-low transition-colors cursor-pointer bg-secondary-container/10')} onClick={() => setSelected(4)}>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img className="w-9 h-9 rounded-full object-cover ring-2 ring-secondary" alt="Bea Mendoza" src={rowMeta[4].img} onError={imgFallback} />
                            <span className="absolute -top-1 -right-1 bg-tertiary-fixed-dim text-on-tertiary-fixed rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">★</span>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-label-lg text-label-lg text-on-surface font-bold truncate">Bea Mendoza</span>
                              <span className="bg-secondary/15 text-secondary text-[10px] px-1.5 py-0.2 rounded font-bold uppercase">Honor</span>
                            </div>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">ID: STU-109283-05 · Active now</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-secondary-container text-on-secondary-container font-bold">On Track</span>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="font-headline-sm text-headline-sm text-secondary font-extrabold">96%</span>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden w-32">
                          <div className="bg-secondary h-full rounded-full" style={{ width: '96%' }}></div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 max-w-[210px]">
                        <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                          Advanced Python comprehension: Ready for <span className="font-semibold text-primary">Object-Oriented Programming &amp; Classes</span>.
                        </p>
                      </td>
                      <td className="py-3.5 px-3 text-center text-lg">
                        ✅
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button className={`${rowActionBtn} text-primary`} title="Assign Enrichment Project" type="button"><span className="material-symbols-outlined text-[18px]">workspace_premium</span></button>
                          <button className={`${rowActionBtn} text-on-surface-variant`} type="button"><span className="material-symbols-outlined text-[18px]">send</span></button>
                          <button className={`${rowActionBtn} text-on-surface-variant`} type="button"><span className="material-symbols-outlined text-[18px]">visibility</span></button>
                        </div>
                      </td>
                    </tr>
                    {/* Row 6: Luis Fernando */}
                    <tr className={rowClass(5, 'hover:bg-surface-container-low transition-colors cursor-pointer')} onClick={() => setSelected(5)}>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img className="w-9 h-9 rounded-full object-cover" alt="Luis Fernando" src={rowMeta[5].img} onError={imgFallback} />
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-secondary ring-2 ring-surface-container-lowest"></span>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-label-lg text-label-lg text-on-surface font-semibold truncate">Luis Fernando</span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">ID: STU-109283-06 · 25m ago</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-secondary-container text-on-secondary-container font-bold">On Track</span>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="font-headline-sm text-headline-sm text-secondary font-bold">92%</span>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden w-32">
                          <div className="bg-secondary h-full rounded-full" style={{ width: '92%' }}></div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 max-w-[210px]">
                        <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                          Mastered dictionary lookups, key iteration, and hash sets. High problem solving speed.
                        </p>
                      </td>
                      <td className="py-3.5 px-3 text-center text-lg">
                        ✅
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button className={`${rowActionBtn} text-primary`} type="button"><span className="material-symbols-outlined text-[18px]">assignment_turned_in</span></button>
                          <button className={`${rowActionBtn} text-on-surface-variant`} type="button"><span className="material-symbols-outlined text-[18px]">send</span></button>
                          <button className={`${rowActionBtn} text-on-surface-variant`} type="button"><span className="material-symbols-outlined text-[18px]">visibility</span></button>
                        </div>
                      </td>
                    </tr>
                    {/* Row 7: Sofia Bautista */}
                    <tr className={rowClass(6, 'hover:bg-surface-container-low transition-colors cursor-pointer')} onClick={() => setSelected(6)}>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img className="w-9 h-9 rounded-full object-cover" alt="Sofia Bautista" src={rowMeta[6].img} onError={imgFallback} />
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-secondary ring-2 ring-surface-container-lowest"></span>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-label-lg text-label-lg text-on-surface font-semibold truncate">Sofia Bautista</span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">ID: STU-109283-07 · 5h ago</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-secondary-container text-on-secondary-container font-bold">On Track</span>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="font-headline-sm text-headline-sm text-secondary font-bold">81%</span>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden w-32">
                          <div className="bg-secondary h-full rounded-full" style={{ width: '81%' }}></div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 max-w-[210px]">
                        <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                          Strong function decomposition. Writes clean docstrings and modular helper functions.
                        </p>
                      </td>
                      <td className="py-3.5 px-3 text-center text-lg">
                        ✅
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button className={`${rowActionBtn} text-primary`} type="button"><span className="material-symbols-outlined text-[18px]">assignment_turned_in</span></button>
                          <button className={`${rowActionBtn} text-on-surface-variant`} type="button"><span className="material-symbols-outlined text-[18px]">send</span></button>
                          <button className={`${rowActionBtn} text-on-surface-variant`} type="button"><span className="material-symbols-outlined text-[18px]">visibility</span></button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Pagination / Masterlist Summary Bar */}
              <div className="p-space-md bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-sm text-on-surface-variant font-body-sm text-body-sm">
                <div className="flex items-center gap-space-sm">
                  <span className="">Showing <strong className="text-on-surface">1 - 9</strong> of 42 students</span>
                  <span className="text-outline-variant">·</span>
                  <span className="text-xs">3 students currently have unassigned remedial packets</span>
                </div>
                <div className="flex items-center gap-1 font-label-md text-label-md">
                  <button className="px-2.5 py-1 rounded-lg bg-surface-container text-on-surface-variant disabled:opacity-50" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} type="button">Previous</button>
                  {[1, 2, 3, 4].map((n) => (
                    <button key={n} className={n === page ? 'px-3 py-1 rounded-lg bg-primary-container text-on-primary font-bold' : 'px-3 py-1 rounded-lg hover:bg-surface-container text-on-surface'} onClick={() => setPage(n)} type="button">{n}</button>
                  ))}
                  <button className="px-2.5 py-1 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors" disabled={page === 4} onClick={() => setPage((p) => Math.min(4, p + 1))} type="button">Next</button>
                </div>
              </div>
            </div>
          </div>
          {/* Right Focus Drawer / Student Deep-Dive Panel (xl:col-span-4) */}
          <div className="xl:col-span-4 flex flex-col gap-space-md">
            {/* Focused Student Card: selected row (defaults to Miguel Ramos) */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-md relative overflow-hidden">
              {/* Card Header & Status */}
              <div className="flex items-start justify-between gap-space-sm">
                <div className="flex items-center gap-3">
                  <img className="w-14 h-14 rounded-2xl object-cover ring-2 ring-primary-container shadow-sm" alt={`Portrait of ${sel.name}`} src={sel.img} onError={imgFallback} />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">{sel.name}</h3>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">{sel.subtitle}</span>
                    <span className="font-label-sm text-label-sm text-primary font-semibold">ID: {sel.id}</span>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full font-label-sm text-label-sm ${sel.badgeClass}`}>{sel.badge}</span>
              </div>
              {/* Mastery Breakdown Mini Grid */}
              <div className="grid grid-cols-2 gap-2 bg-surface-container-low p-space-sm rounded-xl">
                {sel.topics.map((t) => (
                  <div key={t.name} className="flex flex-col p-2 bg-surface-container-lowest rounded-lg">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">{t.name}</span>
                    <span className={`font-headline-sm text-headline-sm ${t.pctClass}`}>{t.pct}%</span>
                    <span className={`text-[10px] ${t.trendClass}`}>{t.trend}</span>
                  </div>
                ))}
              </div>
              {/* AI Feedback Snippet Box */}
              <div className="bg-primary-fixed/30 rounded-xl p-space-md flex flex-col gap-space-xs relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-primary font-label-sm text-label-sm font-bold">
                    <span className="material-symbols-outlined text-[16px]" style={iconFill}>psychology</span>
                    <span className="">Aralytics AI Diagnostic Summary</span>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Today, 2:15 PM</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface leading-relaxed italic bg-surface-container-lowest/80 p-2.5 rounded-lg">
                  {sel.aiSummary}
                </p>
                <div className="flex flex-col gap-1 pt-1">
                  <span className="font-label-sm text-label-sm text-primary font-semibold">Recommended Intervention:</span>
                  <span className="font-label-sm text-label-sm text-secondary bg-secondary-container/40 px-2.5 py-1 rounded-lg font-bold">{sel.intervention}</span>
                </div>
              </div>
              {/* Direct Teacher Action Callout */}
              <div className="flex flex-col gap-2">
                <button className="w-full flex items-center justify-center gap-space-xs py-2.5 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed font-label-lg text-label-lg hover:bg-tertiary-fixed-dim transition-colors shadow-sm" type="button">
                  <span className="material-symbols-outlined text-[18px]">code</span>
                  <span className="">Assign Remedial Coding Quiz</span>
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center gap-1 py-2 rounded-xl bg-surface-container text-primary font-label-md text-label-md hover:bg-surface-container-high transition-colors" type="button">
                    <span className="material-symbols-outlined text-[16px]">chat_bubble_outline</span>
                    <span className="">Student Chat</span>
                  </button>
                  <button className="flex items-center justify-center gap-1 py-2 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors" type="button">
                    <span className="material-symbols-outlined text-[16px]">terminal</span>
                    <span className="">Open Sandbox</span>
                  </button>
                </div>
              </div>
              {/* Teacher Private Observation Notes */}
              <div className="flex flex-col gap-space-xs pt-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant">edit_note</span>
                    Teacher Log (Private)
                  </span>
                  <span className="text-[11px] text-on-surface-variant font-label-sm">Autosaves</span>
                </div>
                <textarea className="w-full bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm p-3 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-primary-container transition-all resize-none" placeholder="Confidential observations on code trace capability, debug sessions..." rows={3} value={note} onChange={(e) => setNote(e.target.value)}></textarea>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-label-sm text-label-sm text-secondary flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    {savedLabel}
                  </span>
                  <button className="px-3 py-1.5 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm hover:bg-primary transition-colors shadow-xs" onClick={() => setSavedLabel('Saved just now')} type="button">
                    Save Note
                  </button>
                </div>
              </div>
            </div>
            {/* Weekly Intervention Tracker Widget */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-space-sm">
              <div className="flex items-center justify-between">
                <h4 className="font-label-lg text-label-lg text-on-surface font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-secondary">checklist</span>
                  Remediation Progress (Sprint 6)
                </h4>
                <span className="font-label-sm text-label-sm text-on-surface-variant">12 / 16 Done</span>
              </div>
              <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                <div className="bg-secondary h-full rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                75% of assigned targeted coding drills and loop exercises have been completed by flagged students this cycle.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Floating Toast Confirmation on Batch Nudge */}
      <div
        className={
          'fixed bottom-6 right-6 z-50 transform transition-all duration-300 flex items-center gap-space-sm bg-inverse-surface text-inverse-on-surface px-space-lg py-3 rounded-xl shadow-xl ' +
          (showToast ? '' : 'translate-y-24 opacity-0 pointer-events-none')
        }
      >
        <span className="material-symbols-outlined text-secondary-fixed text-[20px]" style={iconFill}>forward_to_inbox</span>
        <span className="font-label-md text-label-md">Batch nudge queued for the filtered student group!</span>
      </div>
    </div>
  )
}
