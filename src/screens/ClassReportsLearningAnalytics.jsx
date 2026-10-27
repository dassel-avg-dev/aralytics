import { useState } from 'react';

export default function ClassReportsLearningAnalytics() {
  const [quarter, setQuarter] = useState('Quarter 2 (2024-2025)');
  const [section, setSection] = useState('Section: Sampaguita (Advisory)');
  const [exporting, setExporting] = useState(null);

  const runExport = (key) => {
    setExporting(key);
    window.setTimeout(() => setExporting(null), 1800);
  };

  return (
    <div className="relative w-full max-w-[1120px] mx-auto px-space-lg py-space-xl">
      {/* Subtle decorative ambient background glows (strictly relative/contained) */}
      <div className="absolute -top-10 right-10 w-96 h-96 bg-primary-container/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-secondary-container/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      {/* Header Section with Distinct Visual Scale and Context Controls */}
      <div className="flex flex-col gap-space-lg mb-space-xl">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-space-xs px-3 py-1 rounded-full bg-surface-container text-primary mb-space-xs">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider">DepEd K to 12 MATATAG Aligned</span>
            </div>
            <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight">Class Analytics &amp; DepEd Compliance Reports</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-xs">
              Comprehensive mastery analytics, intervention efficacy, and quarterly grading summaries for <span className="font-semibold text-primary">Grade 8 - Sampaguita</span>.
            </p>
          </div>
          {/* Primary Export Actions */}
          <div className="flex flex-wrap items-center gap-space-xs shrink-0">
            <button className="flex items-center gap-space-xs bg-surface-container hover:bg-surface-container-high text-on-surface px-4 py-2.5 rounded-xl font-label-lg text-label-lg shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99]" type="button" onClick={() => runExport('sf9')} disabled={exporting === 'sf9'}>
              <span className="material-symbols-outlined text-[18px] text-primary">description</span>
              <span>{exporting === 'sf9' ? 'Preparing SF9…' : 'SF9 / Form 137'}</span>
            </button>
            <button className="flex items-center gap-space-xs bg-primary-container text-on-primary hover:bg-primary px-4 py-2.5 rounded-xl font-label-lg text-label-lg shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99]" type="button" onClick={() => runExport('full')} disabled={exporting === 'full'}>
              <span className="material-symbols-outlined text-[18px]">{exporting === 'full' ? 'progress_activity' : 'file_download'}</span>
              <span>{exporting === 'full' ? 'Exporting…' : 'Export Full Analytics'}</span>
            </button>
          </div>
        </div>
        {/* Filter Controls Strip */}
        <div className="bg-surface-container-lowest p-space-sm rounded-2xl shadow-sm flex flex-wrap items-center justify-between gap-space-md">
          <div className="flex flex-wrap items-center gap-space-xs">
            {/* Quarter Selector */}
            <div className="relative">
              <select
                aria-label="Quarter Selector"
                className="appearance-none bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md pl-9 pr-8 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-container cursor-pointer transition-colors"
                value={quarter}
                onChange={(e) => setQuarter(e.target.value)}
              >
                <option value="Quarter 2 (2024-2025)">Quarter 2 (2024-2025)</option>
                <option value="Quarter 1 (2024-2025)">Quarter 1 (2024-2025)</option>
                <option value="Quarter 4 (2023-2024)">Quarter 4 (2023-2024)</option>
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
                <option value="Section: Sampaguita (Advisory)">Section: Sampaguita (Advisory)</option>
                <option value="Section: Rosal (Math 8)">Section: Rosal (Math 8)</option>
                <option value="Section: Camia (Science 8)">Section: Camia (Science 8)</option>
              </select>
              <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-secondary text-[18px] pointer-events-none">groups</span>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] pointer-events-none">arrow_drop_down</span>
            </div>
            {/* Date Range Pill Button */}
            <button className="flex items-center gap-space-xs bg-surface-container-low hover:bg-surface-container px-3.5 py-2 rounded-xl font-label-md text-label-md text-on-surface transition-colors" type="button">
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant">date_range</span>
              <span>Oct 14, 2024 - Dec 18, 2024</span>
            </button>
          </div>
          <div className="flex items-center gap-2 pr-2 text-on-surface-variant font-label-sm text-label-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-secondary"></span>
            <span>DepEd LIS Synced 2 hours ago</span>
          </div>
        </div>
      </div>
      {/* 4 High Impact Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-xl">
        {/* Overall Class Mastery */}
        <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">Class Mastery</span>
            <span className="p-2 rounded-xl bg-primary-container/10 text-primary-container">
              <span className="material-symbols-outlined text-[20px]">school</span>
            </span>
          </div>
          <div className="mt-space-md">
            <div className="flex items-baseline gap-2">
              <span className="font-metric-number text-metric-number text-on-surface tracking-tight">84.6%</span>
              <span className="inline-flex items-center text-secondary font-label-md text-label-md">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                +4.1%
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">vs Q1 baseline (80.5%)</p>
          </div>
          {/* Progress Bar Indicator */}
          <div className="w-full bg-surface-container h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-primary-container h-full rounded-full transition-all duration-700" style={{ width: '84.6%' }}></div>
          </div>
        </div>
        {/* AI Intervention Success Rate */}
        <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">AI Intervention Efficacy</span>
            <span className="p-2 rounded-xl bg-surface-variant text-primary">
              <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
            </span>
          </div>
          <div className="mt-space-md">
            <div className="flex items-baseline gap-2">
              <span className="font-metric-number text-metric-number text-on-surface tracking-tight">78%</span>
              <span className="inline-flex items-center text-secondary font-label-md text-label-md">
                <span className="material-symbols-outlined text-[14px]">thumb_up</span>
                29 / 37
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Improved after Aral drills</p>
          </div>
          <div className="w-full bg-surface-container h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-secondary h-full rounded-full transition-all duration-700" style={{ width: '78%' }}></div>
          </div>
        </div>
        {/* Average Time Spent / Quiz */}
        <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">Avg. Time / Activity</span>
            <span className="p-2 rounded-xl bg-tertiary-fixed/30 text-tertiary">
              <span className="material-symbols-outlined text-[20px]">timer</span>
            </span>
          </div>
          <div className="mt-space-md">
            <div className="flex items-baseline gap-2">
              <span className="font-metric-number text-metric-number text-on-surface tracking-tight">7m 45s</span>
              <span className="inline-flex items-center text-on-surface-variant font-label-sm text-label-sm">Optimal</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Healthy pacing, low guessing rate</p>
          </div>
          <div className="w-full bg-surface-container h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-tertiary-fixed-dim h-full rounded-full transition-all duration-700" style={{ width: '65%' }}></div>
          </div>
        </div>
        {/* Parent Engagement */}
        <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">Parent Nudge Rate</span>
            <span className="p-2 rounded-xl bg-surface-container-high text-on-surface">
              <span className="material-symbols-outlined text-[20px]">notifications_active</span>
            </span>
          </div>
          <div className="mt-space-md">
            <div className="flex items-baseline gap-2">
              <span className="font-metric-number text-metric-number text-on-surface tracking-tight">86%</span>
              <span className="inline-flex items-center text-secondary font-label-md text-label-md">
                <span className="material-symbols-outlined text-[14px]">done_all</span>
                36 parents
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">SMS &amp; app summaries opened</p>
          </div>
          <div className="w-full bg-surface-container h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-primary-container h-full rounded-full transition-all duration-700" style={{ width: '86%' }}></div>
          </div>
        </div>
      </div>
      {/* Section 1: DepEd Most Essential Learning Competencies (MELCs) & Learning Gaps */}
      <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm mb-space-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md pb-space-md mb-space-md">
          <div>
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[22px]">target</span>
              <h2 className="font-headline-md text-headline-md text-on-surface">Competency Breakdown &amp; Learning Gaps</h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              DepEd MELCs progress mapping with real-time class readiness telemetry.
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
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFC93C]"></span> Approaching (60-79%)
            </span>
          </div>
        </div>
        {/* Competencies Stack */}
        <div className="flex flex-col gap-space-md">
          {/* Competency Item 1: Math Algebra */}
          <div className="p-space-md rounded-xl bg-surface hover:bg-surface-container-low transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-space-xs">
                <span className="font-label-md text-label-md px-2.5 py-1 rounded-lg bg-primary-fixed text-on-primary-fixed uppercase tracking-wider">M8NS-IIa-1</span>
                <span className="font-label-lg text-label-lg text-on-surface">Algebraic expressions &amp; polynomials</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">(Mathematics 8)</span>
              </div>
              <div className="flex items-center gap-space-sm">
                <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-[#DDF5E8] text-[#22A06B] font-label-sm text-label-sm font-semibold">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  Proficient
                </span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold min-w-[50px] text-right">89%</span>
              </div>
            </div>
            <div className="w-full bg-surface-container h-3 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-primary-container" style={{ width: '89%' }}></div>
            </div>
            <div className="flex justify-between items-center text-on-surface-variant font-body-sm text-body-sm mt-1.5">
              <span>37 of 42 learners proficient</span>
              <span>Target completion: Nov 28</span>
            </div>
          </div>
          {/* Competency Item 2: Math Fractions (FLAGGED GAP) */}
          <div className="p-space-md rounded-xl bg-[#FFF9F0] hover:bg-[#FFF4E0] transition-colors relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-space-xs">
                <span className="font-label-md text-label-md px-2.5 py-1 rounded-lg bg-[#FFEFD1] text-[#B8740B] uppercase tracking-wider">M8NS-IIc-2</span>
                <span className="font-label-lg text-label-lg text-on-surface font-bold">Fractions with unlike denominators</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">(Mathematics 8)</span>
              </div>
              <div className="flex items-center gap-space-sm">
                <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-[#FFEFD1] text-[#B8740B] font-label-sm text-label-sm font-bold">
                  <span className="material-symbols-outlined text-[14px]">warning</span>
                  Flagged Gap
                </span>
                <span className="font-headline-sm text-headline-sm text-[#B8740B] font-bold min-w-[50px] text-right">71%</span>
              </div>
            </div>
            <div className="w-full bg-surface-container-high h-3 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-[#F4BF32]" style={{ width: '71%' }}></div>
            </div>
            <div className="flex justify-between items-center text-on-surface-variant font-body-sm text-body-sm mt-1.5">
              <span>12 students struggle with Lowest Common Multiple (LCM) step</span>
              <span className="text-[#B8740B] font-semibold">Priority Focus Area</span>
            </div>
          </div>
          {/* Competency Item 3: Science Photosynthesis */}
          <div className="p-space-md rounded-xl bg-surface hover:bg-surface-container-low transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-space-xs">
                <span className="font-label-md text-label-md px-2.5 py-1 rounded-lg bg-secondary-fixed text-on-secondary-fixed uppercase tracking-wider">S8LT-IVa-1</span>
                <span className="font-label-lg text-label-lg text-on-surface">Plant biology &amp; photosynthesis</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">(Science 8)</span>
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
              <span>39 of 42 learners mastered key concept questions</span>
              <span>Completed Dec 5</span>
            </div>
          </div>
          {/* Competency Item 4: Filipino Ibong Adarna */}
          <div className="p-space-md rounded-xl bg-surface hover:bg-surface-container-low transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-space-xs">
                <span className="font-label-md text-label-md px-2.5 py-1 rounded-lg bg-surface-variant text-primary uppercase tracking-wider">F8PB-Ia-c-1</span>
                <span className="font-label-lg text-label-lg text-on-surface">Nailalahad ang sariling pananaw sa Ibong Adarna</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">(Filipino 8)</span>
              </div>
              <div className="flex items-center gap-space-sm">
                <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-[#DDF5E8] text-[#22A06B] font-label-sm text-label-sm font-semibold">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  Advanced
                </span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold min-w-[50px] text-right">94%</span>
              </div>
            </div>
            <div className="w-full bg-surface-container h-3 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-[#22A06B]" style={{ width: '94%' }}></div>
            </div>
            <div className="flex justify-between items-center text-on-surface-variant font-body-sm text-body-sm mt-1.5">
              <span>High reflective essay scores across all quartiles</span>
              <span>Completed Dec 12</span>
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
                Suggested 15-minute synchronous review on <strong className="text-primary font-bold">denominator LCM</strong> before Quarter 2 finals. 12 learners will benefit from visual fraction bar manipulatives.
              </p>
            </div>
          </div>
          <button className="shrink-0 flex items-center gap-1.5 bg-primary hover:bg-primary-container text-on-primary px-4 py-2 rounded-xl font-label-md text-label-md shadow-sm transition-all hover:scale-[1.01]" type="button">
            <span>Generate Lesson Plan</span>
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
                Pre vs. Post AI Drill
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mb-space-lg">
              Direct outcome measurement for learners flagged during diagnostic screening.
            </p>
            {/* SVG Visual Chart comparing Baseline vs Post-Intervention */}
            <div className="bg-surface-container-low p-space-md rounded-xl mb-space-md">
              <div className="flex items-center justify-between mb-3 text-on-surface font-label-sm text-label-sm">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-outline-variant inline-block"></span> Baseline (Diagnostic)
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-primary-container inline-block"></span> Post-AI Remedial Drill
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
                {/* Student 1: Maria Santos */}
                <g transform="translate(40, 0)">
                  {/* Baseline Bar (48% -> height: 67) */}
                  <rect fill="#C8C4D7" height="67" rx="4" width="28" x="0" y="73"></rect>
                  {/* Post-intervention Bar (62% -> height: 87) */}
                  <rect fill="#5B4BDB" height="87" rx="4" width="28" x="34" y="53"></rect>
                  <text fill="#422EC2" fontSize="11" fontWeight="700" textAnchor="middle" x="31" y="45">+14%</text>
                  <text fill="#474554" fontSize="11" fontWeight="600" textAnchor="middle" x="31" y="152">Maria S.</text>
                </g>
                {/* Student 2: Juan Dela Cruz */}
                <g transform="translate(160, 0)">
                  {/* Baseline Bar (52% -> height: 73) */}
                  <rect fill="#C8C4D7" height="73" rx="4" width="28" x="0" y="67"></rect>
                  {/* Post-intervention Bar (68% -> height: 95) */}
                  <rect fill="#5B4BDB" height="95" rx="4" width="28" x="34" y="45"></rect>
                  <text fill="#422EC2" fontSize="11" fontWeight="700" textAnchor="middle" x="31" y="37">+16%</text>
                  <text fill="#474554" fontSize="11" fontWeight="600" textAnchor="middle" x="31" y="152">Juan D.C.</text>
                </g>
                {/* Student 3: Carlos Ramos */}
                <g transform="translate(280, 0)">
                  {/* Baseline Bar (44% -> height: 62) */}
                  <rect fill="#C8C4D7" height="62" rx="4" width="28" x="0" y="78"></rect>
                  {/* Post-intervention Bar (65% -> height: 91) */}
                  <rect fill="#5B4BDB" height="91" rx="4" width="28" x="34" y="49"></rect>
                  <text fill="#422EC2" fontSize="11" fontWeight="700" textAnchor="middle" x="31" y="41">+21%</text>
                  <text fill="#474554" fontSize="11" fontWeight="600" textAnchor="middle" x="31" y="152">Carlos R.</text>
                </g>
                {/* Student 4: Angelica Reyes */}
                <g transform="translate(400, 0)">
                  {/* Baseline Bar (58% -> height: 81) */}
                  <rect fill="#C8C4D7" height="81" rx="4" width="28" x="0" y="59"></rect>
                  {/* Post-intervention Bar (74% -> height: 104) */}
                  <rect fill="#5B4BDB" height="104" rx="4" width="28" x="34" y="36"></rect>
                  <text fill="#422EC2" fontSize="11" fontWeight="700" textAnchor="middle" x="31" y="28">+16%</text>
                  <text fill="#474554" fontSize="11" fontWeight="600" textAnchor="middle" x="31" y="152">Angelica R.</text>
                </g>
                {/* Student 5: Gabriel Tan */}
                <g transform="translate(510, 0)">
                  {/* Baseline Bar (55% -> height: 77) */}
                  <rect fill="#C8C4D7" height="77" rx="4" width="28" x="0" y="63"></rect>
                  {/* Post-intervention Bar (79% -> height: 111) */}
                  <rect fill="#5B4BDB" height="111" rx="4" width="28" x="34" y="29"></rect>
                  <text fill="#422EC2" fontSize="11" fontWeight="700" textAnchor="middle" x="31" y="21">+24%</text>
                  <text fill="#474554" fontSize="11" fontWeight="600" textAnchor="middle" x="31" y="152">Gabriel T.</text>
                </g>
              </svg>
            </div>
            {/* Quick Matrix Roster */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface">
                <div className="flex items-center gap-space-xs">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  <span className="font-label-md text-label-md text-on-surface">Maria Santos</span>
                </div>
                <div className="font-label-md text-label-md text-on-surface">
                  <span className="text-on-surface-variant">48%</span> → <span className="text-secondary font-bold">62%</span> (+14%)
                </div>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface">
                <div className="flex items-center gap-space-xs">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  <span className="font-label-md text-label-md text-on-surface">Juan Dela Cruz</span>
                </div>
                <div className="font-label-md text-label-md text-on-surface">
                  <span className="text-on-surface-variant">52%</span> → <span className="text-secondary font-bold">68%</span> (+16%)
                </div>
              </div>
            </div>
          </div>
          <div className="mt-space-md pt-space-sm flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
            <span>Target benchmark: Passing standard is 60%</span>
            <button className="text-primary hover:text-primary-container font-label-md text-label-md flex items-center gap-1" type="button">
              <span>View All 14 Flagged Learners</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>
        {/* Right: AI Tutor 'Aral' Efficacy & Cultural Pedagogical Insights (1 Col) */}
        <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-space-xs mb-space-md">
              <div className="p-2 rounded-xl bg-primary-container text-on-primary">
                <span className="material-symbols-outlined text-[20px]">psychology_alt</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">AI Tutor 'Aral' Summary</h3>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Gamified Remedial Impact</span>
              </div>
            </div>
            {/* Visual Illustration / Persona Card */}
            <div className="p-space-md rounded-2xl bg-surface-container-low mb-space-md flex items-center gap-space-md">
              <img
                className="w-16 h-16 rounded-2xl object-cover shrink-0 shadow-sm"
                data-alt="A warm, cheerful Filipino female teacher avatar named Bb. Santos with glasses wearing traditional modern Filipiniana elements, smiling warmly in a bright classroom illustration with soft ambient purple and golden light, digital edtech art."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQxu7-Lv7mF-_HZ_c_kFn65AiXWUgmqM9GrjyJlHZTbEyyDIXkFZ4FijLwpOt5R7VrZjodYt5fVUzXOLuY2yg-R4bzu_JzuB5x8yax8-w7p4epgOZdn03ZGQc_2CePEjdIa8nhzPxo1_rPHhQ4FEj9zmZRNl4L_s7p7tbTLfaQJ5shwlap2LCnwOrNBL6wrd07o9YRBDJE6ZQZY2NbPsSZi3Xg234Lrht-xAd0HXihjNS4-OARRYwddQ"
                onError={(e) => (e.currentTarget.style.visibility = 'hidden')}
              />
              <div>
                <p className="font-label-lg text-label-lg text-on-surface">312 'Kaya Mo Yan!' Nudges</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Dispatched when students spent &gt;90 seconds on a single math item.</p>
              </div>
            </div>
            {/* Diagnostic Metrics List */}
            <div className="flex flex-col gap-space-sm">
              <div className="flex items-center justify-between p-space-sm rounded-xl bg-surface">
                <span className="font-body-sm text-body-sm text-on-surface">Retake Completion Rate</span>
                <span className="font-label-lg text-label-lg text-secondary">91.4%</span>
              </div>
              <div className="flex items-center justify-between p-space-sm rounded-xl bg-surface">
                <span className="font-body-sm text-body-sm text-on-surface">Confidence Score Shift</span>
                <span className="font-label-lg text-label-lg text-primary">+2.4 / 5.0</span>
              </div>
              <div className="flex items-center justify-between p-space-sm rounded-xl bg-surface">
                <span className="font-body-sm text-body-sm text-on-surface">Language Preference</span>
                <span className="font-label-lg text-label-lg text-on-surface">Taglish (68%)</span>
              </div>
            </div>
          </div>
          <div className="mt-space-lg p-space-sm rounded-xl bg-surface-container flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[18px]">lightbulb</span>
            <p className="font-body-sm text-body-sm text-on-surface">
              Bilingual step-by-step hints increased task completion by <strong>34%</strong> vs English-only prompts.
            </p>
          </div>
        </div>
      </div>
      {/* Section 3: Official Export & DepEd Print Center */}
      <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs mb-space-lg">
          <div>
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[22px]">print</span>
              <h2 className="font-headline-md text-headline-md text-on-surface">DepEd Export &amp; Print Center</h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              One-click verified generation for standard public school compliance documentation.
            </p>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant px-3 py-1 rounded-full bg-surface-container">
            School Year 2024-2025
          </span>
        </div>
        {/* Document Generation Cards (3 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          {/* Card 1: School Form 9 (SF9) */}
          <div className="p-space-lg rounded-2xl bg-surface hover:bg-surface-container-low transition-all shadow-xs hover:shadow-md flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary mb-space-md">
                <span className="material-symbols-outlined text-[26px]">badge</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">DepEd School Form 9</h3>
              <p className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider mt-0.5">Learner Progress Report Card</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-sm">
                Standardized quarter grades, core values assessment, and attendance metrics pre-populated for all 42 learners.
              </p>
            </div>
            <div className="mt-space-lg pt-space-md flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-secondary font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">task_alt</span> 42/42 Ready
              </span>
              <button className="flex items-center gap-1 bg-surface-container hover:bg-surface-container-high text-primary px-3.5 py-1.5 rounded-xl font-label-md text-label-md transition-colors" type="button">
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>Generate PDF</span>
              </button>
            </div>
          </div>
          {/* Card 2: Competency Assessment SF2/SF10 */}
          <div className="p-space-lg rounded-2xl bg-surface hover:bg-surface-container-low transition-all shadow-xs hover:shadow-md flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary mb-space-md">
                <span className="material-symbols-outlined text-[26px]">assessment</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Learning Competencies Audit</h3>
              <p className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider mt-0.5">SF2 / SF10 Summary Matrix</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-sm">
                Aggregated rubric for DepEd Division Supervisors displaying MELCs mastery percentages and remedial interventions.
              </p>
            </div>
            <div className="mt-space-lg pt-space-md flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">grid_on</span> Excel &amp; PDF
              </span>
              <button className="flex items-center gap-1 bg-surface-container hover:bg-surface-container-high text-primary px-3.5 py-1.5 rounded-xl font-label-md text-label-md transition-colors" type="button">
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>Export Sheet</span>
              </button>
            </div>
          </div>
          {/* Card 3: PTC Student Fact Sheets */}
          <div className="p-space-lg rounded-2xl bg-surface hover:bg-surface-container-low transition-all shadow-xs hover:shadow-md flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary mb-space-md">
                <span className="material-symbols-outlined text-[26px]">family_restroom</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">PTC Student Fact Sheets</h3>
              <p className="font-label-sm text-label-sm text-tertiary font-bold uppercase tracking-wider mt-0.5">Parent-Teacher Conference</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-sm">
                Bilingual individual tear-off sheets highlighting strengths, attendance, and specific tips for home tutoring.
              </p>
            </div>
            <div className="mt-space-lg pt-space-md flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-primary font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">auto_awesome</span> One-click Batch
              </span>
              <button className="flex items-center gap-1 bg-primary-container text-on-primary hover:bg-primary px-3.5 py-1.5 rounded-xl font-label-md text-label-md shadow-xs transition-colors" type="button">
                <span className="material-symbols-outlined text-[16px]">print</span>
                <span>Batch Print</span>
              </button>
            </div>
          </div>
        </div>
        {/* Quick Action Floating Notification/Toast simulator */}
        <div className="mt-space-lg p-space-md rounded-xl bg-surface flex flex-wrap items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-sm">
            <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface">
              DepEd Form 137 batch is watermarked with Division of City Schools, Region IV-A seal. Ready for digital signature.
            </p>
          </div>
          <div className="flex items-center gap-space-xs">
            <button className="font-label-sm text-label-sm text-primary hover:underline px-2 py-1" type="button">View Audit Trail</button>
            <button className="font-label-sm text-label-sm bg-surface-container hover:bg-surface-container-high text-on-surface px-3 py-1.5 rounded-lg transition-colors" type="button">Digital Sign</button>
          </div>
        </div>
      </div>
    </div>
  );
}
