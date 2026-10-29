import { useEffect, useRef, useState } from 'react'

export default function ActivitiesQuizManagement() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activeStatus, setActiveStatus] = useState('active')
  const [activeTopic, setActiveTopic] = useState('All Topics')
  const [format, setFormat] = useState('Diagnostic')
  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)

  useEffect(() => () => clearTimeout(toastTimer.current), [])

  function showToast(message) {
    setToast(message)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className="flex flex-col w-full">
      <div className="w-full max-w-[1120px] mx-auto px-space-md lg:px-space-lg py-space-lg">
        {/* Top Context & Header Action Suite */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-space-lg pb-space-lg">
          <div className="flex flex-col gap-space-xs max-w-xl">
            <div className="flex items-center gap-space-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>code</span>
                Computer Science 101
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">• Fall 2024 Cycle</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Coding Activities &amp; Quizzes</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Create, assign, and inspect AI diagnostic feedback for coding quizzes, situational debugging scenarios, and remedial drills.
            </p>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-space-sm shrink-0">
            <button className="flex items-center gap-2 px-space-md py-2.5 rounded-[14px] bg-surface-container-lowest text-on-surface-variant font-label-lg text-label-lg shadow-sm hover:bg-surface-container transition-all" type="button">
              <span className="material-symbols-outlined text-[18px]">menu_book</span>
              <span className="">Curriculum Standards</span>
            </button>
            <button className="flex items-center gap-2 px-space-md py-2.5 rounded-[14px] bg-primary-fixed text-primary font-label-lg text-label-lg hover:bg-surface-container-high transition-all" type="button">
              <span className="material-symbols-outlined text-[18px]">bookmark_manager</span>
              <span className="">Templates</span>
            </button>
            <button className="flex items-center gap-2 px-space-lg py-2.5 rounded-[14px] bg-primary-container text-on-primary font-label-lg text-label-lg shadow-md hover:bg-primary transition-all" type="button" onClick={() => setDrawerOpen(true)}>
              <span className="material-symbols-outlined text-[18px] text-tertiary-fixed-dim" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <span className="">+ Create Activity</span>
            </button>
          </div>
        </div>
        {/* AI Quick Generator Spotlight Banner (Warm Cream & Indigo Accent) */}
        <div className="relative overflow-hidden mb-space-xl p-space-lg rounded-[20px] bg-gradient-to-r from-surface-container-low via-surface-container-lowest to-surface-container shadow-sm">
          <div className="relative z-10 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-space-md">
            <div className="flex items-start gap-space-md max-w-2xl">
              <div className="w-12 h-12 rounded-[16px] bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-headline-sm text-headline-sm text-on-surface">AI Coding Quiz &amp; Scenario Generator</span>
                  <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">New</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                  Generate an interactive 5-question coding diagnostic or situational debugging challenge in Python or JavaScript in 30 seconds.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-space-sm w-full xl:w-auto justify-end">
              <button className="flex items-center gap-2 px-space-md py-2.5 rounded-[14px] bg-tertiary-fixed-dim text-on-surface font-label-lg text-label-lg hover:brightness-105 shadow-sm transition-all" type="button" onClick={() => showToast('Generating a 5-question coding drill for Python • Loops & Lists ✨')}>
                <span className="material-symbols-outlined text-[18px]">bolt</span>
                <span className="">Create Coding Drill</span>
              </button>
            </div>
          </div>
          {/* Ambient decorative gradient pulse */}
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-primary-container/10 blur-3xl pointer-events-none"></div>
        </div>
        {/* Status Tabs & Subject Filters Shell */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md pb-space-lg">
          {/* Status Tabs */}
          <div className="flex items-center p-1 rounded-full bg-surface-container gap-1 overflow-x-auto max-w-full">
            {[
              ['active', 'Active Quizzes (4)'],
              ['scheduled', 'Scheduled (2)'],
              ['archived', 'Past / Archived (12)'],
              ['drafts', 'Drafts (3)'],
            ].map(([id, label]) => (
              <button
                key={id}
                className={`px-space-md py-1.5 rounded-full font-label-md text-label-md transition-colors shrink-0 ${
                  activeStatus === id
                    ? 'bg-surface-container-lowest text-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
                type="button"
                onClick={() => setActiveStatus(id)}
              >
                {label}
              </button>
            ))}
          </div>
          {/* Subject Filtering Chips */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider pl-1">Topic:</span>
            {['All Topics', 'Python Fundamentals', 'Control Flow & Loops', 'Data Structures', 'Functions & Scope', 'Debugging & Logic'].map((topic) => (
              <button
                key={topic}
                className={`px-3 py-1 rounded-full font-label-sm text-label-sm transition-colors ${
                  activeTopic === topic
                    ? 'bg-primary-container text-on-primary shadow-xs'
                    : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high'
                }`}
                type="button"
                onClick={() => setActiveTopic(topic)}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
        {/* Activity Cards Grid (Primary Presentation) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg mb-space-xl">
          {/* Card 1: Diagnostic Math Fractions */}
          <div className="flex flex-col justify-between rounded-[20px] bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
            <div className="flex flex-col gap-space-sm">
              <div className="flex items-center justify-between gap-space-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm">
                    Python • Loops &amp; Lists
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">
                    Diagnostic
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/30 text-secondary font-label-sm text-label-sm font-semibold">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                  Active • Ends Friday 5:00 PM
                </span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                  Python Loops &amp; List Comprehension Diagnostic
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Assigned to <span className="font-medium text-on-surface">Section A (42 students)</span> • 10 Questions (~8 mins)
                </p>
              </div>
              <div className="p-space-md rounded-[16px] bg-surface-container-low/60 flex flex-col gap-space-xs my-space-xs">
                <div className="flex items-center justify-between font-label-sm text-label-sm">
                  <span className="text-on-surface-variant">Class Turnout: 39 / 42 Students</span>
                  <span className="font-bold text-on-surface">92.8%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                  <div className="h-full rounded-full bg-secondary" style={{ width: '92.8%' }}></div>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Average Class Score</span>
                  <span className="font-headline-sm text-headline-sm text-primary">78.4%</span>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container font-body-sm text-body-sm text-on-surface">
                <span className="material-symbols-outlined text-[18px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                <span className="text-on-surface-variant text-[13px] leading-tight">
                  <strong className="font-semibold text-primary">AI Feedback Active:</strong> Analyzing syntax patterns &amp; off-by-one boundary misconceptions.
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-space-md mt-space-md">
              <div className="flex items-center gap-1">
                <button className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" title="Edit Questions" type="button">
                  <span className="material-symbols-outlined text-[20px]">edit_note</span>
                </button>
                <button className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" title="Duplicate Drill" type="button">
                  <span className="material-symbols-outlined text-[20px]">content_copy</span>
                </button>
              </div>
              <button className="flex items-center gap-1.5 px-space-md py-2 rounded-[14px] bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-all shadow-xs" type="button">
                <span className="">View Submissions &amp; AI Feedback</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
          {/* Card 2: Science Cellular Respiration Quiz */}
          <div className="flex flex-col justify-between rounded-[20px] bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
            <div className="flex flex-col gap-space-sm">
              <div className="flex items-center justify-between gap-space-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-surface-container text-secondary font-label-sm text-label-sm">
                    Functions &amp; Scope
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">
                    Scenario-based
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed/40 text-on-secondary-container font-label-sm text-label-sm font-semibold">
                  <span className="material-symbols-outlined text-[15px]">check_circle</span>
                  Review Ready
                </span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                  Functions &amp; Return Values: Situational Debugging
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Assigned to <span className="font-medium text-on-surface">Section A (42 students)</span> • 8 Questions (~10 mins)
                </p>
              </div>
              <div className="p-space-md rounded-[16px] bg-surface-container-low/60 flex flex-col gap-space-xs my-space-xs">
                <div className="flex items-center justify-between font-label-sm text-label-sm">
                  <span className="text-on-surface-variant">Class Turnout: 41 / 42 Students</span>
                  <span className="font-bold text-on-surface">97.6%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: '97.6%' }}></div>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Average Class Score</span>
                  <span className="font-headline-sm text-headline-sm text-secondary">86.2%</span>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container-low font-body-sm text-body-sm text-on-surface">
                <span className="material-symbols-outlined text-[18px] text-secondary">bug_report</span>
                <span className="text-on-surface-variant text-[13px] leading-tight">
                  Common error identified: returning None inside loop instead of accumulating values.
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-space-md mt-space-md">
              <div className="flex items-center gap-1">
                <button className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" title="Export CSV" type="button">
                  <span className="material-symbols-outlined text-[20px]">file_download</span>
                </button>
                <button className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" title="Analytics View" type="button">
                  <span className="material-symbols-outlined text-[20px]">equalizer</span>
                </button>
              </div>
              <button className="flex items-center gap-1.5 px-space-md py-2 rounded-[14px] bg-secondary text-on-secondary font-label-md text-label-md hover:opacity-90 transition-all shadow-xs" type="button" onClick={() => showToast('Scores & insights published for Functions & Return Values ✅')}>
                <span className="">Publish Scores &amp; Insights</span>
                <span className="material-symbols-outlined text-[16px]">send</span>
              </button>
            </div>
          </div>
          {/* Card 3: Ibong Adarna Filipino Reading */}
          <div className="flex flex-col justify-between rounded-[20px] bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
            <div className="flex flex-col gap-space-sm">
              <div className="flex items-center justify-between gap-space-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-surface-container text-tertiary font-label-sm text-label-sm">
                    Python • Logic &amp; Conditions
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">
                    MCQ &amp; Logic Tracing
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold">
                  <span className="material-symbols-outlined text-[15px] text-secondary">task_alt</span>
                  Completed
                </span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                  Conditional Statements &amp; Boolean Logic
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Assigned to <span className="font-medium text-on-surface">Section A (42 students)</span> • 12 Questions (~10 mins)
                </p>
              </div>
              <div className="p-space-md rounded-[16px] bg-surface-container-low/60 flex flex-col gap-space-xs my-space-xs">
                <div className="flex items-center justify-between font-label-sm text-label-sm">
                  <span className="text-on-surface-variant">Class Turnout: 42 / 42 Students</span>
                  <span className="font-bold text-on-surface">100%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: '100%' }}></div>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Average Class Score</span>
                  <span className="font-headline-sm text-headline-sm text-secondary">91.5%</span>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container font-body-sm text-body-sm text-on-surface">
                <span className="material-symbols-outlined text-[18px] text-tertiary-fixed-dim" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="text-on-surface-variant text-[13px] leading-tight">
                  Mastery module: 36 students achieved perfect scores on short-circuit evaluation.
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-space-md mt-space-md">
              <div className="flex items-center gap-1">
                <button className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" title="Edit Content" type="button">
                  <span className="material-symbols-outlined text-[20px]">edit</span>
                </button>
                <button className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" title="Activity Settings" type="button">
                  <span className="material-symbols-outlined text-[20px]">tune</span>
                </button>
              </div>
              <button className="flex items-center gap-1.5 px-space-md py-2 rounded-[14px] bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-all shadow-xs" type="button">
                <span className="">View Submissions</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
          {/* Card 4: Targeted Remedial Intervention */}
          <div className="flex flex-col justify-between rounded-[20px] bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
            <div className="flex flex-col gap-space-sm">
              <div className="flex items-center justify-between gap-space-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">
                    Remedial Drill
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm">
                    Loop Remediation
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed/60 text-tertiary font-label-sm text-label-sm font-semibold">
                  <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                  In Progress (3/4)
                </span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                  Targeted Remedial: While Loop Counter &amp; Boundary Practice
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  5 Micro-Questions • Adaptive Socratic hints enabled
                </p>
              </div>
              <div className="p-space-md rounded-[16px] bg-surface-container-low/70 flex flex-col gap-2 my-space-xs">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Assigned to 4 flagged students:</span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-[14px] text-secondary">check</span>
                    Miguel S. (Done - 80%)
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-[14px] text-secondary">check</span>
                    Carlos R. (Done - 100%)
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-[14px] text-secondary">check</span>
                    Jasmine T. (Done - 85%)
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim"></span>
                    Paolo G. (Pending)
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container font-body-sm text-body-sm text-on-surface">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-primary">schedule_send</span>
                  <span className="text-on-surface-variant text-[13px]">Send quick diagnostic practice reminder?</span>
                </div>
                <button className="px-2.5 py-1 rounded-full bg-surface-container-lowest text-primary font-label-sm text-label-sm shadow-xs hover:bg-surface-container-high transition-colors" type="button" onClick={() => showToast('Practice reminder sent to Paolo G. ✉️')}>
                  Nudge Now
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between pt-space-md mt-space-md">
              <div className="flex items-center gap-1">
                <button className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" title="Add Students" type="button">
                  <span className="material-symbols-outlined text-[20px]">person_add</span>
                </button>
              </div>
              <button className="flex items-center gap-1.5 px-space-md py-2 rounded-[14px] bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-all shadow-xs" type="button">
                <span className="">Review Intervention</span>
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
              </button>
            </div>
          </div>
        </div>
        {/* Supplementary DepEd Competency Mapping Footer Widget */}
      </div>
      {/* Interactive Slide-Over Drawer for Quick Activity Creation */}
      <div
        className={`fixed inset-0 bg-inverse-surface/40 backdrop-blur-xs z-50 ${drawerOpen ? 'opacity-100' : 'hidden opacity-0'} transition-opacity duration-300`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setDrawerOpen(false)
        }}
      >
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-lg bg-surface-container-lowest shadow-2xl p-space-xl flex flex-col justify-between overflow-y-auto transform ${drawerOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300`}
        >
          <div className="flex flex-col gap-space-lg">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-space-sm">
              <div className="flex items-center gap-2">
                <span className="w-9 h-9 rounded-xl bg-primary-container text-on-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                </span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">Create New Learning Activity</h2>
              </div>
              <button className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container transition-colors" type="button" onClick={() => setDrawerOpen(false)}>
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            {/* Form Elements */}
            <div className="flex flex-col gap-space-md">
              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-label-md text-on-surface">Activity Title</label>
                <input className="w-full bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-md text-body-md px-4 py-3 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-primary-container" placeholder="e.g. Unit Check: Linear Equations &amp; Graphs" type="text" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-label-md text-on-surface">Topic / Module</label>
                  <select className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md px-4 py-3 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-primary-container" defaultValue="Python Fundamentals">
                    <option>Python Fundamentals</option>
                    <option>Control Flow &amp; Loops</option>
                    <option>Functions &amp; Return Values</option>
                    <option>Data Structures</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-label-md text-on-surface">Class / Section</label>
                  <select className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md px-4 py-3 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-primary-container" defaultValue="Section A - Intro to Python (42)">
                    <option>Section A - Intro to Python (42)</option>
                    <option>Section B - CS 101 (38)</option>
                    <option>Specific Flagged Students Only</option>
                  </select>
                </div>
              </div>
              {/* AI Configuration Toggle */}
              <div className="p-space-md rounded-[16px] bg-surface-container-low flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">psychology</span>
                    <span className="font-label-md text-label-md text-on-surface">Generate Adaptive Aral Owl Feedback</span>
                  </div>
                  <input defaultChecked className="w-5 h-5 accent-primary rounded cursor-pointer" type="checkbox" />
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Each student gets personalized encouraging suggestions based on mistake patterns in both Filipino and English.
                </p>
              </div>
              {/* Quiz Type Selection */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-label-md text-on-surface">Format</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Diagnostic', 'Summative', 'Remedial'].map((option, index) => (
                    <button
                      key={option}
                      className={`p-3 rounded-xl font-label-sm text-label-sm flex flex-col items-center gap-1 ${
                        format === option
                          ? 'bg-surface-container-high text-primary font-bold'
                          : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                      }`}
                      type="button"
                      onClick={() => setFormat(option)}
                    >
                      <span className="material-symbols-outlined text-[20px]">{['quiz', 'task_alt', 'healing'][index]}</span>
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Drawer Footer Actions */}
          <div className="pt-space-lg flex items-center justify-end gap-space-sm">
            <button className="px-space-md py-2.5 rounded-[14px] bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors" type="button" onClick={() => setDrawerOpen(false)}>
              Cancel
            </button>
            <button
              className="px-space-lg py-2.5 rounded-[14px] bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-all shadow-md"
              type="button"
              onClick={() => {
                setDrawerOpen(false)
                showToast(`Activity "${format}" draft created — add your questions next 🎉`)
              }}
            >
              Save &amp; Add Questions
            </button>
          </div>
        </div>
      </div>
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
