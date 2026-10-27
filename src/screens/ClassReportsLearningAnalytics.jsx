import { useState } from 'react';

export default function ClassReportsLearningAnalytics() {
  const [term, setTerm] = useState('Term: Fall 2024 / Q2');
  const [section, setSection] = useState('Section: CS 101-A');
  const [exporting, setExporting] = useState(null);

  const runExport = (key) => {
    setExporting(key);
    window.setTimeout(() => setExporting(null), 1800);
  };

  return (
    <div className="relative w-full max-w-[1120px] mx-auto px-space-lg py-space-xl">
      {/* Ambient background glows */}
      <div className="absolute -top-10 right-10 w-96 h-96 bg-primary-container/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-secondary-container/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      {/* Header Section */}
      <div className="flex flex-col gap-space-lg mb-space-xl">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-space-xs px-3 py-1 rounded-full bg-surface-container text-primary mb-space-xs">
              <span className="material-symbols-outlined text-[16px]">terminal</span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">Introductory Programming Curriculum</span>
            </div>
            <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight">Cohort Reports &amp; Learning Analytics</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-xs">
              Diagnostic telemetry, concept mastery trends, and AI intervention efficacy for <span className="font-semibold text-primary">CS 101 (Section A)</span>.
            </p>
          </div>
          {/* Primary Export Actions */}
          <div className="flex flex-wrap items-center gap-space-xs shrink-0">
            <button
              className="flex items-center gap-space-xs bg-surface-container hover:bg-surface-container-high text-on-surface px-4 py-2.5 rounded-xl font-label-lg text-label-lg shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99]"
              type="button"
              onClick={() => runExport('cohort-csv')}
              disabled={exporting === 'cohort-csv'}
            >
              <span className="material-symbols-outlined text-[18px] text-primary">{exporting === 'cohort-csv' ? 'progress_activity' : 'table_chart'}</span>
              <span className="">{exporting === 'cohort-csv' ? 'Exporting…' : 'Export Cohort CSV'}</span>
            </button>
            <button
              className="flex items-center gap-space-xs bg-primary-container text-on-primary hover:bg-primary px-4 py-2.5 rounded-xl font-label-lg text-label-lg shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99]"
              type="button"
              onClick={() => runExport('pdf-summary')}
              disabled={exporting === 'pdf-summary'}
            >
              <span className="material-symbols-outlined text-[18px]">{exporting === 'pdf-summary' ? 'progress_activity' : 'file_download'}</span>
              <span className="">{exporting === 'pdf-summary' ? 'Exporting…' : 'Download PDF Summary'}</span>
            </button>
          </div>
        </div>
        {/* Filter Controls Strip */}
        <div className="bg-surface-container-lowest p-space-sm rounded-2xl shadow-sm flex flex-wrap items-center justify-between gap-space-md">
          <div className="flex flex-wrap items-center gap-space-xs">
            {/* Term Selector */}
            <div className="relative">
              <select
                aria-label="Term Selector"
                className="appearance-none bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md pl-9 pr-8 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-container cursor-pointer transition-colors"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              >
                <option value="Term: Fall 2024 / Q2">Term: Fall 2024 / Q2</option>
                <option value="Term: Fall 2024 / Q1">Term: Fall 2024 / Q1</option>
                <option value="Term: Spring 2024">Term: Spring 2024</option>
              </select>
              <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-primary text-[18px] pointer-events-none">calendar_month</span>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] pointer-events-none">arrow_drop_down</span>
            </div>
            {/* Section Switcher */}
            <div className="relative">
              <select
                aria-label="Section Switcher"
                className="appearance-none bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md pl-9 pr-8 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-container cursor-pointer transition-colors"
                value={section}
                onChange={(e) => setSection(e.target.value)}
              >
                <option value="Section: CS 101-A">Section: CS 101-A</option>
                <option value="Section: CS 101-B">Section: CS 101-B</option>
                <option value="Section: CS 102 (Adv. Python)">Section: CS 102 (Adv. Python)</option>
              </select>
              <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-secondary text-[18px] pointer-events-none">group</span>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] pointer-events-none">arrow_drop_down</span>
            </div>
            {/* Date Range Pill Button */}
            <button className="flex items-center gap-space-xs bg-surface-container-low hover:bg-surface-container px-3.5 py-2 rounded-xl font-label-md text-label-md text-on-surface transition-colors" type="button">
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant">date_range</span>
              <span className="">Oct 14 - Dec 18, 2024</span>
            </button>
          </div>
          <div className="flex items-center gap-2 pr-2 text-on-surface-variant font-label-sm text-label-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-secondary"></span>
            <span className="font-medium text-secondary">AI Diagnostic Engine v1.2 Active</span>
          </div>
        </div>
      </div>
      {/* 4 High Impact Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-xl">
        {/* Class Mastery Rate */}
        <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">Class Mastery Rate</span>
            <span className="p-2 rounded-xl bg-primary-container/10 text-primary-container">
              <span className="material-symbols-outlined text-[20px]">school</span>
            </span>
          </div>
          <div className="mt-space-md">
            <div className="flex items-baseline gap-2">
              <span className="font-metric-number text-metric-number text-on-surface tracking-tight">83.4%</span>
              <span className="inline-flex items-center text-secondary font-label-md text-label-md">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                +4.2%
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">vs baseline diagnostic</p>
          </div>
          {/* Progress Bar Indicator */}
          <div className="w-full bg-surface-container h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-primary-container h-full rounded-full transition-all duration-700" style={{ width: '83.4%' }}></div>
          </div>
        </div>
        {/* AI Diagnostic Efficacy */}
        <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">AI Diagnostic Efficacy</span>
            <span className="p-2 rounded-xl bg-surface-variant text-primary">
              <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
            </span>
          </div>
          <div className="mt-space-md">
            <div className="flex items-baseline gap-2">
              <span className="font-metric-number text-metric-number text-on-surface tracking-tight">81%</span>
              <span className="inline-flex items-center text-secondary font-label-md text-label-md">
                <span className="material-symbols-outlined text-[14px]">thumb_up</span>
                34 / 42
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Resolved misconceptions after AI drills</p>
          </div>
          <div className="w-full bg-surface-container h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-secondary h-full rounded-full transition-all duration-700" style={{ width: '81%' }}></div>
          </div>
        </div>
        {/* Average Debugging / Activity Time */}
        <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">Avg. Debugging / Activity Time</span>
            <span className="p-2 rounded-xl bg-tertiary-fixed/30 text-tertiary">
              <span className="material-symbols-outlined text-[20px]">timer</span>
            </span>
          </div>
          <div className="mt-space-md">
            <div className="flex items-baseline gap-2">
              <span className="font-metric-number text-metric-number text-on-surface tracking-tight">8m 45s</span>
              <span className="inline-flex items-center text-on-surface-variant font-label-sm text-label-sm">Optimal</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">&lt;5s AI feedback latency</p>
          </div>
          <div className="w-full bg-surface-container h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-tertiary-fixed-dim h-full rounded-full transition-all duration-700" style={{ width: '70%' }}></div>
          </div>
        </div>
        {/* Remedial Intervention Queue */}
        <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">Remedial Intervention Queue</span>
            <span className="p-2 rounded-xl bg-surface-container-high text-on-surface">
              <span className="material-symbols-outlined text-[20px]">warning_amber</span>
            </span>
          </div>
          <div className="mt-space-md">
            <div className="flex items-baseline gap-2">
              <span className="font-metric-number text-metric-number text-on-surface tracking-tight">4 Students</span>
              <span className="inline-flex items-center text-error font-label-md text-label-md">
                <span className="material-symbols-outlined text-[14px]">flag</span>
                PRD US-07
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">&lt;70% passing threshold</p>
          </div>
          <div className="w-full bg-surface-container h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-[#ba1a1a] h-full rounded-full transition-all duration-700" style={{ width: '9.5%' }}></div>
          </div>
        </div>
      </div>
      {/* Section 1: CS Competency Breakdown & Misconception Gaps */}
      <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm mb-space-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md pb-space-md mb-space-md">
          <div>
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[22px]">integration_instructions</span>
              <h2 className="font-headline-md text-headline-md text-on-surface">Competency Breakdown &amp; Misconception Gaps</h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              Core Python curriculum progress mapping with diagnostic code telemetries and logic tracking.
            </p>
          </div>
          {/* Legend */}
          <div className="flex flex-wrap items-center gap-space-sm font-label-sm text-label-sm">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface-variant">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22A06B]"></span> Advanced (90-100%)
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface-variant">
              <span className="w-2.5 h-2.5 rounded-full bg-[#5B4BDB]"></span> Proficient (80-89%)
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface-variant">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFC93C]"></span> Approaching (&lt;80%)
            </span>
          </div>
        </div>
        {/* Competencies Stack */}
        <div className="flex flex-col gap-space-md">
          {/* Competency Item 1: CS Loops & List Comprehension (FLAGGED GAP) */}
          <div className="p-space-md rounded-xl bg-[#FFF9F0] hover:bg-[#FFF4E0] transition-colors relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-space-xs">
                <span className="font-label-md text-label-md px-2.5 py-1 rounded-lg bg-[#FFEFD1] text-[#B8740B] uppercase tracking-wider font-semibold">CS-PY-101</span>
                <span className="font-label-lg text-label-lg text-on-surface font-bold">Python Loops &amp; List Comprehension</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">(Core Concepts)</span>
              </div>
              <div className="flex items-center gap-space-sm">
                <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-[#FFEFD1] text-[#B8740B] font-label-sm text-label-sm font-bold">
                  <span className="material-symbols-outlined text-[14px]">warning</span>
                  Flagged Gap
                </span>
                <span className="font-headline-sm text-headline-sm text-[#B8740B] font-bold min-w-[50px] text-right">72%</span>
              </div>
            </div>
            <div className="w-full bg-surface-container-high h-3 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-[#F4BF32]" style={{ width: '72%' }}></div>
            </div>
            <div className="flex justify-between items-center text-on-surface-variant font-body-sm text-body-sm mt-1.5">
              <span className="">12 students struggling with off-by-one boundary errors and while-loop counter increments</span>
              <span className="text-[#B8740B] font-semibold">Priority Focus Area</span>
            </div>
          </div>
          {/* Competency Item 2: Functions & Return Values */}
          <div className="p-space-md rounded-xl bg-surface hover:bg-surface-container-low transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-space-xs">
                <span className="font-label-md text-label-md px-2.5 py-1 rounded-lg bg-primary-fixed text-on-primary-fixed uppercase tracking-wider font-semibold">CS-PY-102</span>
                <span className="font-label-lg text-label-lg text-on-surface font-semibold">Functions &amp; Return Values</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">(Modular Architecture)</span>
              </div>
              <div className="flex items-center gap-space-sm">
                <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-[#DDF5E8] text-[#22A06B] font-label-sm text-label-sm font-semibold">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  Proficient
                </span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold min-w-[50px] text-right">86%</span>
              </div>
            </div>
            <div className="w-full bg-surface-container h-3 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-primary-container" style={{ width: '86%' }}></div>
            </div>
            <div className="flex justify-between items-center text-on-surface-variant font-body-sm text-body-sm mt-1.5">
              <span className="">36 of 42 students mastering parameters vs return</span>
              <span className="">Target mastery achieved</span>
            </div>
          </div>
          {/* Competency Item 3: Conditionals & Boolean Logic */}
          <div className="p-space-md rounded-xl bg-surface hover:bg-surface-container-low transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-space-xs">
                <span className="font-label-md text-label-md px-2.5 py-1 rounded-lg bg-secondary-fixed text-on-secondary-fixed uppercase tracking-wider font-semibold">CS-PY-103</span>
                <span className="font-label-lg text-label-lg text-on-surface font-semibold">Conditionals &amp; Boolean Logic</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">(Control Flow)</span>
              </div>
              <div className="flex items-center gap-space-sm">
                <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-[#DDF5E8] text-[#22A06B] font-label-sm text-label-sm font-semibold">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  Advanced
                </span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold min-w-[50px] text-right">92%</span>
              </div>
            </div>
            <div className="w-full bg-surface-container h-3 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-[#22A06B]" style={{ width: '92%' }}></div>
            </div>
            <div className="flex justify-between items-center text-on-surface-variant font-body-sm text-body-sm mt-1.5">
              <span className="">Short-circuit evaluation solid across multiple condition chains</span>
              <span className="">Assessed Nov 24</span>
            </div>
          </div>
          {/* Competency Item 4: Data Structures: Lists & Dictionaries */}
          <div className="p-space-md rounded-xl bg-surface hover:bg-surface-container-low transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-space-xs">
                <span className="font-label-md text-label-md px-2.5 py-1 rounded-lg bg-surface-variant text-primary uppercase tracking-wider font-semibold">CS-PY-104</span>
                <span className="font-label-lg text-label-lg text-on-surface font-semibold">Data Structures: Lists &amp; Dictionaries</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">(Collections)</span>
              </div>
              <div className="flex items-center gap-space-sm">
                <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-[#DDF5E8] text-[#22A06B] font-label-sm text-label-sm font-semibold">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  Proficient
                </span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold min-w-[50px] text-right">88%</span>
              </div>
            </div>
            <div className="w-full bg-surface-container h-3 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-primary-container" style={{ width: '88%' }}></div>
            </div>
            <div className="flex justify-between items-center text-on-surface-variant font-body-sm text-body-sm mt-1.5">
              <span className="">37 students proficient in dict key lookups &amp; nested slicing</span>
              <span className="">Assessed Dec 10</span>
            </div>
          </div>
        </div>
        {/* Actionable AI Curriculum Recommendation Banner */}
        <div className="mt-space-lg p-space-md rounded-xl bg-surface-container-low flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md">
          <div className="flex items-start gap-space-sm">
            <div className="p-2.5 rounded-xl bg-primary-container text-on-primary shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[20px]">psychology</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-label-md text-label-md text-primary font-bold">Actionable AI Curriculum Recommendation</span>
                <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed">High Impact</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface mt-0.5">
                Suggested 15-minute review on <strong className="text-primary font-bold">while-loop termination &amp; boundary conditions</strong> before Quiz 4. 12 students will benefit from visual trace diagrams.
              </p>
            </div>
          </div>
          <button className="shrink-0 flex items-center gap-1.5 bg-primary hover:bg-primary-container text-on-primary px-4 py-2 rounded-xl font-label-md text-label-md shadow-sm transition-all hover:scale-[1.01]" type="button">
            <span className="">Generate Review Drill</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
      {/* Section 2: Intervention Tracking & Student Growth Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg mb-space-xl">
        {/* Left: Visual Comparison & Flagged Learner Trajectory (2 Cols) */}
        <div className="lg:col-span-2 bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-space-xs">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[22px]">show_chart</span>
                <h2 className="font-headline-md text-headline-md text-on-surface">Intervention Tracking &amp; Growth Matrix</h2>
              </div>
              <span className="font-label-sm text-label-sm px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-semibold">
                PRD US-07 Efficacy
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mb-space-lg">
              Direct outcome measurement for students scoring below the 70% threshold (PRD US-07).
            </p>
            {/* SVG Visual Chart comparing Baseline vs Post-Intervention */}
            <div className="bg-surface-container-low p-space-md rounded-xl mb-space-md">
              <div className="flex items-center justify-between mb-3 text-on-surface font-label-sm text-label-sm">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-outline-variant inline-block"></span> Baseline (Diagnostic)
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-primary-container inline-block"></span> Post-AI Feedback Drill
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-secondary inline-block"></span> Net Score Gain
                </span>
              </div>
              {/* Custom SVG Bar Chart */}
              <svg className="w-full h-44" preserveAspectRatio="none" viewBox="0 0 600 160">
                {/* Grid lines */}
                <line stroke="#DFE0FF" strokeDasharray="4,4" strokeWidth="1" x1="0" x2="600" y1="30" y2="30"></line>
                <line stroke="#DFE0FF" strokeDasharray="4,4" strokeWidth="1" x1="0" x2="600" y1="80" y2="80"></line>
                <line stroke="#DFE0FF" strokeDasharray="4,4" strokeWidth="1" x1="0" x2="600" y1="130" y2="130"></line>
                {/* Student 1: Miguel Santos */}
                <g transform="translate(40, 0)">
                  {/* Baseline Bar (48% -> height: 67) */}
                  <rect fill="#C8C4D7" height="67" rx="4" width="28" x="0" y="73"></rect>
                  {/* Post-intervention Bar (72% -> height: 101) */}
                  <rect fill="#5B4BDB" height="101" rx="4" width="28" x="34" y="39"></rect>
                  <text fill="#422EC2" fontSize="11" fontWeight="700" textAnchor="middle" x="31" y="31">+24%</text>
                  <text fill="#474554" fontSize="11" fontWeight="600" textAnchor="middle" x="31" y="152">Miguel S.</text>
                </g>
                {/* Student 2: Carlos Ramos */}
                <g transform="translate(160, 0)">
                  {/* Baseline Bar (52% -> height: 73) */}
                  <rect fill="#C8C4D7" height="73" rx="4" width="28" x="0" y="67"></rect>
                  {/* Post-intervention Bar (74% -> height: 104) */}
                  <rect fill="#5B4BDB" height="104" rx="4" width="28" x="34" y="36"></rect>
                  <text fill="#422EC2" fontSize="11" fontWeight="700" textAnchor="middle" x="31" y="28">+22%</text>
                  <text fill="#474554" fontSize="11" fontWeight="600" textAnchor="middle" x="31" y="152">Carlos R.</text>
                </g>
                {/* Student 3: Jasmine Cruz */}
                <g transform="translate(280, 0)">
                  {/* Baseline Bar (56% -> height: 78) */}
                  <rect fill="#C8C4D7" height="78" rx="4" width="28" x="0" y="62"></rect>
                  {/* Post-intervention Bar (78% -> height: 109) */}
                  <rect fill="#5B4BDB" height="109" rx="4" width="28" x="34" y="31"></rect>
                  <text fill="#422EC2" fontSize="11" fontWeight="700" textAnchor="middle" x="31" y="23">+22%</text>
                  <text fill="#474554" fontSize="11" fontWeight="600" textAnchor="middle" x="31" y="152">Jasmine C.</text>
                </g>
                {/* Student 4: Paolo Diaz */}
                <g transform="translate(400, 0)">
                  {/* Baseline Bar (60% -> height: 84) */}
                  <rect fill="#C8C4D7" height="84" rx="4" width="28" x="0" y="56"></rect>
                  {/* Post-intervention Bar (80% -> height: 112) */}
                  <rect fill="#5B4BDB" height="112" rx="4" width="28" x="34" y="28"></rect>
                  <text fill="#422EC2" fontSize="11" fontWeight="700" textAnchor="middle" x="31" y="20">+20%</text>
                  <text fill="#474554" fontSize="11" fontWeight="600" textAnchor="middle" x="31" y="152">Paolo D.</text>
                </g>
                {/* Student 5: Gabriel Tan */}
                <g transform="translate(510, 0)">
                  {/* Baseline Bar (64% -> height: 90) */}
                  <rect fill="#C8C4D7" height="90" rx="4" width="28" x="0" y="50"></rect>
                  {/* Post-intervention Bar (85% -> height: 119) */}
                  <rect fill="#5B4BDB" height="119" rx="4" width="28" x="34" y="21"></rect>
                  <text fill="#422EC2" fontSize="11" fontWeight="700" textAnchor="middle" x="31" y="13">+21%</text>
                  <text fill="#474554" fontSize="11" fontWeight="600" textAnchor="middle" x="31" y="152">Gabriel T.</text>
                </g>
              </svg>
            </div>
            {/* Quick Matrix Roster */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface">
                <div className="flex items-center gap-space-xs">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  <span className="font-label-md text-label-md text-on-surface">Miguel Santos</span>
                </div>
                <div className="font-label-md text-label-md text-on-surface">
                  <span className="text-on-surface-variant">48%</span> → <span className="text-secondary font-bold">72%</span> (+24%)
                </div>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface">
                <div className="flex items-center gap-space-xs">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  <span className="font-label-md text-label-md text-on-surface">Carlos Ramos</span>
                </div>
                <div className="font-label-md text-label-md text-on-surface">
                  <span className="text-on-surface-variant">52%</span> → <span className="text-secondary font-bold">74%</span> (+22%)
                </div>
              </div>
            </div>
          </div>
          <div className="mt-space-md pt-space-sm flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
            <span className="">Passing standard is 70% (PRD Section 5.1.5)</span>
            <button className="text-primary hover:text-primary-container font-label-md text-label-md flex items-center gap-1" type="button">
              <span className="">View All 4 Flagged Students</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>
        {/* Right: AI Diagnostic Engine Performance (PRD 5.1.4 & 6.6) */}
        <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-space-xs mb-space-md">
              <div className="p-2 rounded-xl bg-primary-container text-on-primary">
                <span className="material-symbols-outlined text-[20px]">smart_toy</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">AI Diagnostic Engine Telemetry</h3>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Aralytics-Code-7B (Fine-Tuned)</span>
              </div>
            </div>
            {/* Model Telemetry Card */}
            <div className="p-space-md rounded-2xl bg-surface-container-low mb-space-md flex items-center gap-space-md">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[28px]">model_training</span>
              </div>
              <div>
                <p className="font-label-lg text-label-lg text-on-surface">284 Socratic Hints Generated</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">&lt;2.8s avg delivery time on localized edge inference.</p>
              </div>
            </div>
            {/* Diagnostic Metrics List */}
            <div className="flex flex-col gap-space-sm">
              <div className="flex items-center justify-between p-space-sm rounded-xl bg-surface">
                <span className="font-body-sm text-body-sm text-on-surface">Remedial Drill Completion Rate</span>
                <span className="font-label-lg text-label-lg text-secondary font-bold">92.4%</span>
              </div>
              <div className="flex flex-col p-space-sm rounded-xl bg-surface gap-0.5">
                <span className="font-body-sm text-body-sm text-on-surface-variant">Top Diagnosed Misconception</span>
                <span className="font-label-md text-label-md text-error font-mono truncate">IndexError: list index out of range (off-by-one)</span>
              </div>
              <div className="flex items-center justify-between p-space-sm rounded-xl bg-surface">
                <span className="font-body-sm text-body-sm text-on-surface">Diagnostic Tone</span>
                <span className="font-label-sm text-label-sm text-primary font-semibold bg-primary-fixed px-2 py-0.5 rounded-full">Encouraging &amp; Socratic</span>
              </div>
            </div>
          </div>
          <div className="mt-space-lg p-space-sm rounded-xl bg-surface-container flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[18px]">lightbulb</span>
            <p className="font-body-sm text-body-sm text-on-surface">
              Students receiving instant diagnostic feedback showed <strong>2.6x faster</strong> error resolution on subsequent coding scenarios.
            </p>
          </div>
        </div>
      </div>
      {/* Section 3: Institutional Reports & Exports */}
      <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs mb-space-lg">
          <div>
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[22px]">output</span>
              <h2 className="font-headline-md text-headline-md text-on-surface">Institutional Reports &amp; Exports</h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              Download verified diagnostic data and progress summaries for teachers, administrators, and parents.
            </p>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant px-3 py-1 rounded-full bg-surface-container">
            Academic Year 2024-2025
          </span>
        </div>
        {/* Document Generation Cards (3 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          {/* Card 1: Cohort Concept Mastery Report */}
          <div className="p-space-lg rounded-2xl bg-surface hover:bg-surface-container-low transition-all shadow-xs hover:shadow-md flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary mb-space-md">
                <span className="material-symbols-outlined text-[26px]">analytics</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Cohort Concept Mastery</h3>
              <p className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider mt-0.5">Comprehensive Synthesis</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-sm">
                Comprehensive breakdown of class syntax and logic error rates across all coding units.
              </p>
            </div>
            <div className="mt-space-lg pt-space-md flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-secondary font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">task_alt</span> 42/42 Ready
              </span>
              <button
                className="flex items-center gap-1 bg-surface-container hover:bg-surface-container-high text-primary px-3.5 py-1.5 rounded-xl font-label-md text-label-md transition-colors"
                type="button"
                onClick={() => runExport('mastery-pdf')}
                disabled={exporting === 'mastery-pdf'}
              >
                <span className="material-symbols-outlined text-[16px]">{exporting === 'mastery-pdf' ? 'progress_activity' : 'download'}</span>
                <span className="">{exporting === 'mastery-pdf' ? 'Exporting…' : 'Export PDF'}</span>
              </button>
            </div>
          </div>
          {/* Card 2: Diagnostic Misconception Audit */}
          <div className="p-space-lg rounded-2xl bg-surface hover:bg-surface-container-low transition-all shadow-xs hover:shadow-md flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary mb-space-md">
                <span className="material-symbols-outlined text-[26px]">bug_report</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Diagnostic Misconception Audit</h3>
              <p className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider mt-0.5">Item-Analysis Matrix</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-sm">
                Full item-analysis CSV detailing common student answer paths and AI feedback logs.
              </p>
            </div>
            <div className="mt-space-lg pt-space-md flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">grid_on</span> CSV &amp; Excel
              </span>
              <button
                className="flex items-center gap-1 bg-surface-container hover:bg-surface-container-high text-primary px-3.5 py-1.5 rounded-xl font-label-md text-label-md transition-colors"
                type="button"
                onClick={() => runExport('audit-csv')}
                disabled={exporting === 'audit-csv'}
              >
                <span className="material-symbols-outlined text-[16px]">{exporting === 'audit-csv' ? 'progress_activity' : 'download'}</span>
                <span className="">{exporting === 'audit-csv' ? 'Exporting…' : 'Export CSV'}</span>
              </button>
            </div>
          </div>
          {/* Card 3: PTC Student Fact Sheets */}
          <div className="p-space-lg rounded-2xl bg-surface hover:bg-surface-container-low transition-all shadow-xs hover:shadow-md flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary mb-space-md">
                <span className="material-symbols-outlined text-[26px]">contact_page</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Student Progress Fact Sheets</h3>
              <p className="font-label-sm text-label-sm text-tertiary font-bold uppercase tracking-wider mt-0.5">Parent-Teacher Conference</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-sm">
                1-page summaries highlighting learner strengths, concept growth, and practice areas for parent-teacher conferences.
              </p>
            </div>
            <div className="mt-space-lg pt-space-md flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-primary font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">auto_awesome</span> One-click Batch
              </span>
              <button
                className="flex items-center gap-1 bg-primary-container text-on-primary hover:bg-primary px-3.5 py-1.5 rounded-xl font-label-md text-label-md shadow-xs transition-colors"
                type="button"
                onClick={() => runExport('fact-sheets')}
                disabled={exporting === 'fact-sheets'}
              >
                <span className="material-symbols-outlined text-[16px]">{exporting === 'fact-sheets' ? 'progress_activity' : 'print'}</span>
                <span className="">{exporting === 'fact-sheets' ? 'Printing…' : 'Batch Print'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
