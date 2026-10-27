import { useState } from 'react';

const rowMeta = [
  { text: 'maria santos 109283-001', overall: 58, tags: ['struggling'] },
  { text: 'juan dela cruz 109283-002', overall: 62, tags: ['struggling'] },
  { text: 'angel reyes 109283-007', overall: 71, tags: [] },
  { text: 'paolo garcia 109283-014', overall: 73, tags: ['incomplete'] },
  { text: 'bea mendoza 109283-005', overall: 96, tags: ['high'] },
  { text: 'luis fernando 109283-022', overall: 92, tags: ['high'] },
  { text: 'jasmine catacutan 109283-031', overall: 88, tags: ['high'] },
  { text: 'sofia bautista 109283-019', overall: 81, tags: ['high'] },
  { text: 'elijah ramos 109283-040', overall: 64, tags: ['struggling', 'incomplete', 'inactive'] },
];

const pillActive = 'px-3 py-1.5 rounded-full bg-primary-container text-on-primary font-bold shadow-xs whitespace-nowrap';
const pillIdle = 'px-3 py-1.5 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors whitespace-nowrap flex items-center gap-1';

export default function StudentsMasteryRoster() {
  const [query, setQuery] = useState('');
  const [subject, setSubject] = useState('all');
  const [activeFilter, setActiveFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [note, setNote] = useState("Spoke with Maria after Period 3. She understands basic equivalent fractions but gets anxious when timed quizzes begin. Pair with Bea Mendoza during peer practice tomorrow.");
  const [savedLabel, setSavedLabel] = useState('Saved 10m ago');
  const [showToast, setShowToast] = useState(false);

  const rowVisible = (i) => {
    const row = rowMeta[i];
    const q = query.trim().toLowerCase();
    return (
      (activeFilter === 'all' || row.tags.includes(activeFilter)) &&
      (q === '' || row.text.includes(q))
    );
  };

  const handleBatchNudge = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="px-space-lg py-space-xl max-w-[1280px] w-full mx-auto flex flex-col gap-space-xl">
        {/* Top Context & Header Action Band */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
              <span className="text-primary font-bold">Classroom Central</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span>Learner Performance Diagnostics</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Students &amp; Mastery Tracking</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              42 enrolled students in <span className="text-primary font-semibold">Grade 8 - Sampaguita</span> · Quarter 2 Assessment Period
            </p>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-space-sm">
            <button className="flex items-center gap-space-xs px-space-md py-2.5 rounded-xl bg-surface-container-lowest text-on-surface hover:bg-surface-container-high transition-all shadow-sm font-label-md text-label-md" title="Download spreadsheet of student records" type="button">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">download</span>
              <span>Export Masterlist (CSV)</span>
            </button>
            <button className="flex items-center gap-space-xs px-space-md py-2.5 rounded-xl bg-surface-container text-primary hover:bg-surface-container-high transition-all font-label-md text-label-md" onClick={handleBatchNudge} title="Broadcast nudge to filtered group" type="button">
              <span className="material-symbols-outlined text-[18px]">forward_to_inbox</span>
              <span>Batch Nudge / Message</span>
            </button>
            <button className="flex items-center gap-space-xs px-space-md py-2.5 rounded-xl bg-primary-container text-on-primary hover:bg-primary transition-all shadow-md font-label-md text-label-md" title="Enroll new learner" type="button">
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              <span>+ Add Student</span>
            </button>
          </div>
        </div>
        {/* Overview Diagnostic KPI Ribbon (3 Cards with Visual Mastery Rings) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {/* High Performance / On Track */}
          <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex items-center justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="flex flex-col gap-space-xs z-10">
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-secondary"></span>
                <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">On Track</span>
              </div>
              <div className="flex items-baseline gap-space-xs mt-1">
                <span className="font-metric-number text-metric-number text-on-surface">29</span>
                <span className="font-label-md text-label-md text-on-surface-variant">students</span>
              </div>
              <div className="flex items-center gap-1 font-body-sm text-body-sm text-secondary font-medium">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
                <span>69% of class · Meets mastery</span>
              </div>
            </div>
            {/* Progress Ring Visual */}
            <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path className="text-surface-container" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5"></path>
                <path className="text-secondary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="69, 100" strokeLinecap="round" strokeWidth="3.5"></path>
              </svg>
              <span className="absolute font-headline-sm text-headline-sm text-on-surface">69%</span>
            </div>
          </div>
          {/* Needs a Nudge */}
          <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex items-center justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="flex flex-col gap-space-xs z-10">
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-tertiary-fixed-dim"></span>
                <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Needs a Nudge</span>
              </div>
              <div className="flex items-baseline gap-space-xs mt-1">
                <span className="font-metric-number text-metric-number text-on-surface">9</span>
                <span className="font-label-md text-label-md text-on-surface-variant">students</span>
              </div>
              <div className="flex items-center gap-1 font-body-sm text-body-sm text-tertiary font-medium">
                <span className="material-symbols-outlined text-[16px]">info</span>
                <span>21% of class · Borderline 70-75%</span>
              </div>
            </div>
            {/* Progress Ring Visual */}
            <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path className="text-surface-container" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5"></path>
                <path className="text-tertiary-fixed-dim" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="21, 100" strokeLinecap="round" strokeWidth="3.5"></path>
              </svg>
              <span className="absolute font-headline-sm text-headline-sm text-on-surface">21%</span>
            </div>
          </div>
          {/* Needs Immediate Intervention */}
          <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex items-center justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="flex flex-col gap-space-xs z-10">
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-error"></span>
                <span className="font-label-md text-label-md text-error uppercase tracking-wider font-bold">Needs Help</span>
              </div>
              <div className="flex items-baseline gap-space-xs mt-1">
                <span className="font-metric-number text-metric-number text-error">4</span>
                <span className="font-label-md text-label-md text-on-surface-variant">students</span>
              </div>
              <div className="flex items-center gap-1 font-body-sm text-body-sm text-error font-medium">
                <span className="material-symbols-outlined text-[16px]">priority_high</span>
                <span>10% of class · High priority remedial</span>
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
                  <input className="w-full bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm pl-10 pr-4 py-2.5 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-primary-container transition-all" placeholder="Filter by student name, LRN, or topic..." type="text" value={query} onChange={(e) => setQuery(e.target.value)}/>
                </div>
                {/* Subject selector dropdown */}
                <div className="w-full md:w-auto flex items-center gap-space-xs self-stretch md:self-auto">
                  <label className="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap" htmlFor="subjectSelect">Topic Focus:</label>
                  <select className="bg-surface-container-low text-on-surface font-label-md text-label-md px-3 py-2 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-primary-container w-full md:w-auto cursor-pointer" id="subjectSelect" value={subject} onChange={(e) => setSubject(e.target.value)}>
                    <option value="all">All Subjects (Holistic)</option>
                    <option value="math">Math · Fractions &amp; Decimals</option>
                    <option value="sci">Science · Photosynthesis &amp; Respiration</option>
                    <option value="fil">Filipino · Ibong Adarna &amp; Panitikan</option>
                    <option value="eng">English · Grammar &amp; Tenses</option>
                  </select>
                </div>
              </div>
              {/* Filter Pills Carousel */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-label-sm font-label-sm">
                <button className={activeFilter === 'all' ? pillActive : pillIdle} onClick={() => setActiveFilter('all')} type="button">
              All (42)
            </button>
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
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                      <th className="py-3 px-4">Student &amp; LRN</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3">Overall</th>
                      <th className="py-3 px-3 min-w-[140px]">Subject Mastery</th>
                      <th className="py-3 px-3">AI Diagnostic Intervention</th>
                      <th className="py-3 px-3 text-center">Mood</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container font-body-sm text-body-sm text-on-surface">
                    {/* Row 1: Maria Santos (Active / Focused) */}
                    <tr className={`${rowVisible(0) ? '' : 'hidden '}bg-surface-container-high/40 hover:bg-surface-container-high transition-colors cursor-pointer border-l-4 border-l-primary-container`}>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img className="w-9 h-9 rounded-full object-cover ring-2 ring-primary-container" data-alt="A portrait of Maria Santos, a 14-year-old Filipina junior high school student in a neat public school uniform with warm studio lighting, neutral background, natural friendly expression" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDD1zKqS0CWVGOiwni64RWTk0RUjmTpIwGPCOsGDFS9Pw1KXIFLh7rRwnpHb4bqM1h5m6lNxiPA_y0ce5_k2hDf6ONhTEF49cgBweFPZwx3xGZRkXLrEVfYGV9G1dbtgNXgB9XBK686Q2YJpFEYv4drHF1oDzrrHxToEITXv9W5VTlChiW47QWyrkorMvwjyNEgVvYR_jwhny-4sNnrfRRso3ELHiIeLAZmukaGbawszc_tpPXyuhFLUg" onError={(e) => (e.currentTarget.style.visibility = 'hidden')}/>
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-secondary ring-2 ring-surface-container-lowest" title="Active 15m ago"></span>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-label-lg text-label-lg text-primary font-bold truncate">Maria Santos</span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">LRN: 109283-001 · 15m ago</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-error-container text-on-error-container font-bold">
                      Needs Help
                    </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-1.5">
                          <span className="font-headline-sm text-headline-sm text-error font-extrabold">58%</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="flex flex-col gap-1 w-32">
                          <div className="flex items-center justify-between text-[10px] text-on-surface-variant">
                            <span>M: 42%</span>
                            <span>S: 65%</span>
                            <span>F: 70%</span>
                            <span>E: 55%</span>
                          </div>
                          <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden flex">
                            <div className="bg-error h-full" style={{ width: '42%' }} title="Math 42%"></div>
                            <div className="bg-tertiary-fixed-dim h-full" style={{ width: '23%' }} title="Science 65%"></div>
                            <div className="bg-secondary h-full" style={{ width: '25%' }} title="Filipino 70%"></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 max-w-[210px]">
                        <div className="flex items-start gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                          <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                      Struggling with <span className="font-semibold text-on-surface">Fractions (Unlike Denominators)</span>. Step-by-step visual scaffolding suggested.
                          </p>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-center text-lg" title="Confidence: Stressed / Low">
                        😟
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1.5 rounded-lg text-primary hover:bg-surface-container transition-colors" title="Assign Remedial Practice" type="button">
                            <span className="material-symbols-outlined text-[18px]">assignment_turned_in</span>
                          </button>
                          <button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" title="Send Encouragement Note" type="button">
                            <span className="material-symbols-outlined text-[18px]">send</span>
                          </button>
                          <button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" title="View Full Academic Profile" type="button">
                            <span className="material-symbols-outlined text-[18px]">visibility</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                    {/* Row 2: Juan Dela Cruz */}
                    <tr className={`${rowVisible(1) ? '' : 'hidden '}hover:bg-surface-container-low transition-colors cursor-pointer`}>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img className="w-9 h-9 rounded-full object-cover" data-alt="Portrait of Juan Dela Cruz, a 14-year-old Filipino boy student with short dark hair, smiling gently wearing white polo uniform in an edtech dashboard profile format" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEIrxnutiQBR1Ss1fG_EZomzfWNODsOaf8dbHnW0OwqQgLuMGu_dRcUDCwzO6zVEN3AdIdiNbCbFrJZDlRzYoBRW4s0CaRkp8xhLtRo0q6ebOtUcxAS35-z0TsWP0NIf2w3MDXfBUQUR5-ukqSzuqitf7NvPJq0ZRaHtvJsoTXAjhXFc7wPrNyJLIFxd-USTccXNVa1XGiOQn3AI5whBefG71sgL1y5Pj-1n1XohPUJzHrG6bidByUWA" onError={(e) => (e.currentTarget.style.visibility = 'hidden')}/>
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-surface-dim ring-2 ring-surface-container-lowest" title="Active 1h ago"></span>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-label-lg text-label-lg text-on-surface font-semibold truncate">Juan Dela Cruz</span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">LRN: 109283-002 · 1h ago</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-error-container text-on-error-container font-bold">
                      Needs Help
                    </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-1.5">
                          <span className="font-headline-sm text-headline-sm text-error font-extrabold">62%</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="flex flex-col gap-1 w-32">
                          <div className="flex items-between text-[10px] text-on-surface-variant justify-between">
                            <span>M: 68%</span>
                            <span>S: 70%</span>
                            <span>F: 65%</span>
                            <span>E: 45%</span>
                          </div>
                          <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden flex">
                            <div className="bg-secondary h-full" style={{ width: '50%' }}></div>
                            <div className="bg-error h-full" style={{ width: '30%' }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 max-w-[210px]">
                        <div className="flex items-start gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                          <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                      Flags in <span className="font-semibold text-on-surface">Grammar: Past vs. Present Perfect</span>. Missed 3 quiz items consecutively.
                          </p>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-center text-lg" title="Confidence: Uneasy">
                        😟
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1.5 rounded-lg text-primary hover:bg-surface-container transition-colors" type="button"><span className="material-symbols-outlined text-[18px]">assignment_turned_in</span></button>
                          <button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" type="button"><span className="material-symbols-outlined text-[18px]">send</span></button>
                          <button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" type="button"><span className="material-symbols-outlined text-[18px]">visibility</span></button>
                        </div>
                      </td>
                    </tr>
                    {/* Row 3: Angel Reyes */}
                    <tr className={`${rowVisible(2) ? '' : 'hidden '}hover:bg-surface-container-low transition-colors cursor-pointer`}>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img className="w-9 h-9 rounded-full object-cover" data-alt="Portrait of Angel Reyes, a studious young Filipina female student in Grade 8 with hair neatly tied in a ponytail, bright and thoughtful expression" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbmTtiIYwkNS0b2ue6zrkq2GIqiFpTZs2WReZuj_AmtlVMEudvZjLh7bstQj66DyAu5ExZjHKlT6gif_irHRfr7USaYGFFgaT_IZV0KQtmPcZHTc6q1fhgxJ10_P4RHHq_i3kCR3F3fmnN27aLCNZoHRDEKRaPklM-obL_leed9t2TuhwpAXoXy5Axjok8rkaO2TTOM6TXSzNkC4DDD-4ZGR7BGfEHZFCB000gABh0i5SOGYt1P0MHtQ" onError={(e) => (e.currentTarget.style.visibility = 'hidden')}/>
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-secondary ring-2 ring-surface-container-lowest" title="Active 3h ago"></span>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-label-lg text-label-lg text-on-surface font-semibold truncate">Angel Reyes</span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">LRN: 109283-007 · 3h ago</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-tertiary-fixed text-on-tertiary-fixed font-semibold">
                      Needs Nudge
                    </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-1.5">
                          <span className="font-headline-sm text-headline-sm text-tertiary font-bold">71%</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="flex flex-col gap-1 w-32">
                          <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                            <div className="bg-tertiary-fixed-dim h-full rounded-full" style={{ width: '71%' }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 max-w-[210px]">
                        <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                      Near mastery in Science. Needs quick review on <span className="font-medium text-on-surface">Photosynthesis light reactions</span>.
                        </p>
                      </td>
                      <td className="py-3.5 px-3 text-center text-lg" title="Confidence: Neutral">
                        😐
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1.5 rounded-lg text-primary hover:bg-surface-container transition-colors" type="button"><span className="material-symbols-outlined text-[18px]">assignment_turned_in</span></button>
                          <button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" type="button"><span className="material-symbols-outlined text-[18px]">send</span></button>
                          <button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" type="button"><span className="material-symbols-outlined text-[18px]">visibility</span></button>
                        </div>
                      </td>
                    </tr>
                    {/* Row 4: Paolo Garcia */}
                    <tr className={`${rowVisible(3) ? '' : 'hidden '}hover:bg-surface-container-low transition-colors cursor-pointer`}>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img className="w-9 h-9 rounded-full object-cover" data-alt="Portrait of Paolo Garcia, a Filipino Grade 8 student with spectacles and friendly smile, wearing high school badge" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAEu-Hjs-cV6Fgt43wjg2VfAnErUgduA7IupvIkDDNUvPNiU0HIyuiXBAaJ37YXJTdGABqCqteEXontvsfwE-SZPurtoeOEY8eKtyadEFYDPsnbyYktVjjSQ1HXDcXwzZ2E2VHXpoh4SQvfm0X-4xZRq9Z0S2ecTejz68UclQKk2mECvBItgeRHuas8OSY-rK2vZME-W52Bg8OK3hgGjrkaKBPpOiAxRvCPtpSS2bCaSCNdd6zMHiMMQ" onError={(e) => (e.currentTarget.style.visibility = 'hidden')}/>
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-secondary ring-2 ring-surface-container-lowest" title="Active 4h ago"></span>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-label-lg text-label-lg text-on-surface font-semibold truncate">Paolo Garcia</span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">LRN: 109283-014 · 4h ago</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-tertiary-fixed text-on-tertiary-fixed font-semibold">
                      Needs Nudge
                    </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="font-headline-sm text-headline-sm text-tertiary font-bold">73%</span>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden w-32">
                          <div className="bg-tertiary-fixed-dim h-full rounded-full" style={{ width: '73%' }}></div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 max-w-[210px]">
                        <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                      Pacing is slightly slow on Ibong Adarna Chapter 3 quiz; comprehension remains intact.
                        </p>
                      </td>
                      <td className="py-3.5 px-3 text-center text-lg">
                        😐
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1.5 rounded-lg text-primary hover:bg-surface-container transition-colors" type="button"><span className="material-symbols-outlined text-[18px]">assignment_turned_in</span></button>
                          <button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" type="button"><span className="material-symbols-outlined text-[18px]">send</span></button>
                          <button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" type="button"><span className="material-symbols-outlined text-[18px]">visibility</span></button>
                        </div>
                      </td>
                    </tr>
                    {/* Row 5: Bea Mendoza (Top Performer) */}
                    <tr className={`${rowVisible(4) ? '' : 'hidden '}hover:bg-surface-container-low transition-colors cursor-pointer bg-secondary-container/10`}>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img className="w-9 h-9 rounded-full object-cover ring-2 ring-secondary" data-alt="Portrait of Bea Mendoza, top junior high school honors student in the Philippines, confident smile, clean well-lit school background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4DxUqfi2bhs3GY8NcwKZgOtYZlhacdRrZJVlbWNoQMZQ96K0GMlM6kXnnhg7QPQWN6n2EWd6bqZzPPTnIGQfDUJEgoH0N5LFR1y5dIyH-drXL2f0-qywGyN4noBSq8V06WHCZBzMGfM8-N-HFT4B7E5M3K3bwERI5Trh8Ifuu5J0jbuP8262Fd2uL7wO7ixLvj1MtqqOPChjLIcB0DAhd9Hy3S6v0b4WQHLb-_KfIepkvgRwgS7dtow" onError={(e) => (e.currentTarget.style.visibility = 'hidden')}/>
                            <span className="absolute -top-1 -right-1 bg-tertiary-fixed-dim text-on-tertiary-fixed rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold" title="Class Top Scorer">★</span>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-label-lg text-label-lg text-on-surface font-bold truncate">Bea Mendoza</span>
                              <span className="bg-secondary/15 text-secondary text-[10px] px-1.5 py-0.2 rounded font-bold uppercase">Honor</span>
                            </div>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">LRN: 109283-005 · Active now</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-secondary-container text-on-secondary-container font-bold">
                      On Track
                    </span>
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
                      Advanced readiness unlocked: Ready for <span className="font-semibold text-primary">Grade 9 Quadratic Intro</span> enrichment module.
                        </p>
                      </td>
                      <td className="py-3.5 px-3 text-center text-lg">
                        😊
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1.5 rounded-lg text-primary hover:bg-surface-container transition-colors" title="Assign Enrichment Project" type="button"><span className="material-symbols-outlined text-[18px]">workspace_premium</span></button>
                          <button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" type="button"><span className="material-symbols-outlined text-[18px]">send</span></button>
                          <button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" type="button"><span className="material-symbols-outlined text-[18px]">visibility</span></button>
                        </div>
                      </td>
                    </tr>
                    {/* Row 6: Luis Fernando */}
                    <tr className={`${rowVisible(5) ? '' : 'hidden '}hover:bg-surface-container-low transition-colors cursor-pointer`}>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img className="w-9 h-9 rounded-full object-cover" data-alt="Portrait photo of Luis Fernando, a cheerful Filipino teenage student in school corridor, wearing blue neckerchief boy scout insignia on school uniform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAA5zxk7aGGB4gl_mi8_0zvhLuM9GgbrO21HfCMqqsBkhroE-3zwA_glrAzw-Q6YzgAG83M2EwT_IuCMef-lyQSnQe9E6cXL6jS3pBIu8LYpNuvJ__4KnCJeMtdM4tzLtDfwFgu6RTZ1sU6QY_b6rsRzNTs8fZyZq1SAkgPGs6lbKy317K1IsEh05y88CV-iHvDsXM9DrZEAKBn-WeagwlLzCoYsoyGcNqN3-paNoTbI5qCLTfZB9N_Cg" onError={(e) => (e.currentTarget.style.visibility = 'hidden')}/>
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-secondary ring-2 ring-surface-container-lowest"></span>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-label-lg text-label-lg text-on-surface font-semibold truncate">Luis Fernando</span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">LRN: 109283-022 · 25m ago</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-secondary-container text-on-secondary-container font-bold">
                      On Track
                    </span>
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
                      Mastered cell structures. Consistently completes practice sprints within 7 minutes.
                        </p>
                      </td>
                      <td className="py-3.5 px-3 text-center text-lg">
                        😊
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1.5 rounded-lg text-primary hover:bg-surface-container transition-colors" type="button"><span className="material-symbols-outlined text-[18px]">assignment_turned_in</span></button>
                          <button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" type="button"><span className="material-symbols-outlined text-[18px]">send</span></button>
                          <button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" type="button"><span className="material-symbols-outlined text-[18px]">visibility</span></button>
                        </div>
                      </td>
                    </tr>
                    {/* Row 7: Jasmine Catacutan */}
                    <tr className={`${rowVisible(6) ? '' : 'hidden '}hover:bg-surface-container-low transition-colors cursor-pointer`}>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img className="w-9 h-9 rounded-full object-cover" data-alt="Portrait of Jasmine Catacutan, an energetic Filipina secondary school student with a warm expressive smile against classroom backdrop" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs8ofhGXtw9VvxI9HfDaHununmam_Ijqn4JZWYXbMxZJD_qfjnoxlwK0ztogegLsNakAQCUduYZHRMsCfRpECV43pOjdDBOEjg9OSyGFM5xBKE6Q3BDy6rb2gMixQ8zMk7lhFE-2lEzyghIoGNBDVQfQXomAw5L1AWXpAGWLmw9c1tjtgtuYJWHSbzugLXdDolYgd7hYZLJwC1qV8hyBkQV2_d07TrJylebgpm1G3fswUyfHK_3QuvqQ" onError={(e) => (e.currentTarget.style.visibility = 'hidden')}/>
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-secondary ring-2 ring-surface-container-lowest"></span>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-label-lg text-label-lg text-on-surface font-semibold truncate">Jasmine Catacutan</span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">LRN: 109283-031 · 2h ago</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-secondary-container text-on-secondary-container font-bold">
                      On Track
                    </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="font-headline-sm text-headline-sm text-secondary font-bold">88%</span>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden w-32">
                          <div className="bg-secondary h-full rounded-full" style={{ width: '88%' }}></div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 max-w-[210px]">
                        <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                      Solid performance in Filipino literature and creative synthesis essays.
                        </p>
                      </td>
                      <td className="py-3.5 px-3 text-center text-lg">
                        😊
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1.5 rounded-lg text-primary hover:bg-surface-container transition-colors" type="button"><span className="material-symbols-outlined text-[18px]">assignment_turned_in</span></button>
                          <button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" type="button"><span className="material-symbols-outlined text-[18px]">send</span></button>
                          <button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" type="button"><span className="material-symbols-outlined text-[18px]">visibility</span></button>
                        </div>
                      </td>
                    </tr>
                    {/* Row 8: Sofia Bautista */}
                    <tr className={`${rowVisible(7) ? '' : 'hidden '}hover:bg-surface-container-low transition-colors cursor-pointer`}>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img className="w-9 h-9 rounded-full object-cover" data-alt="Portrait of Sofia Bautista, an eighth grade Philippine girl student with a cheerful demeanor, hair in pigtails, holding notebook in bright classroom" src="https://lh3.googleusercontent.com/aida-public/AB6AXuArrko1W6MHMhUzKTZbouCbvja3virC9V7BacfJGXA1KD3BpNoiUNxzLDER7_imkkwAeXX62yPkmZiHQ2KA-k05xQGBHonDHWruD_hIP7ppP4nKlT93GZvNAycnpZCsNIRCfP88-BCiUvZSOt4lpmRXCV-mKxsHw6M81W6ycup1mGFs-6ke0VregCSQwi9HZIetgurBZfkCC-4g1VnIsvzco7817Ms0jWbpRD6ivljSaMIzVfZV5qGFPQ" onError={(e) => (e.currentTarget.style.visibility = 'hidden')}/>
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-secondary ring-2 ring-surface-container-lowest"></span>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-label-lg text-label-lg text-on-surface font-semibold truncate">Sofia Bautista</span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">LRN: 109283-019 · 5h ago</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-secondary-container text-on-secondary-container font-bold">
                      On Track
                    </span>
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
                      Steadily improving in English vocabulary. Submitted 4 streak tasks this week.
                        </p>
                      </td>
                      <td className="py-3.5 px-3 text-center text-lg">
                        😊
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1.5 rounded-lg text-primary hover:bg-surface-container transition-colors" type="button"><span className="material-symbols-outlined text-[18px]">assignment_turned_in</span></button>
                          <button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" type="button"><span className="material-symbols-outlined text-[18px]">send</span></button>
                          <button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" type="button"><span className="material-symbols-outlined text-[18px]">visibility</span></button>
                        </div>
                      </td>
                    </tr>
                    {/* Row 9: Elijah Ramos */}
                    <tr className={`${rowVisible(8) ? '' : 'hidden '}hover:bg-surface-container-low transition-colors cursor-pointer`}>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img className="w-9 h-9 rounded-full object-cover" data-alt="Portrait of Elijah Ramos, a male Grade 8 student in Manila wearing white polo shirt school uniform with pen in pocket, calm attentive look" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsfro1v9aP5aeh724J-Hc4_qTti9gxIRjiMSn4fLrws8RnRmgbdTkXkOTW8I25BMPgXTkh1KGivF53lspYoBLDKtaSiZpDwYkdj8iExtFzNkShOGPq0tfQ5w9PiASeiKBYve5LSqqXrA455DBgajOSMhLYQ8Q9VUzom2TjtLYkxQ9deowXU1TQ7EnwFm29RNIbxqgJDnU0q0Yr-9CemeY2opDHXVrZ7JZ44m8CgewZNltqvwqPc8QjVw" onError={(e) => (e.currentTarget.style.visibility = 'hidden')}/>
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-error ring-2 ring-surface-container-lowest" title="Inactive >2 days"></span>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-label-lg text-label-lg text-on-surface font-semibold truncate">Elijah Ramos</span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">LRN: 109283-040 · 2d ago</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-error-container text-on-error-container font-bold">
                      Needs Help
                    </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="font-headline-sm text-headline-sm text-error font-extrabold">64%</span>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden w-32">
                          <div className="bg-error h-full rounded-full" style={{ width: '64%' }}></div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 max-w-[210px]">
                        <div className="flex items-start gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-error shrink-0 mt-0.5">warning</span>
                          <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                      Missed Science formative quiz #4. Homework submission overdue by 48h.
                          </p>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-center text-lg">
                        😟
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1.5 rounded-lg text-primary hover:bg-surface-container transition-colors" type="button"><span className="material-symbols-outlined text-[18px]">assignment_turned_in</span></button>
                          <button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" type="button"><span className="material-symbols-outlined text-[18px]">send</span></button>
                          <button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" type="button"><span className="material-symbols-outlined text-[18px]">visibility</span></button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Pagination / Masterlist Summary Bar */}
              <div className="p-space-md bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-sm text-on-surface-variant font-body-sm text-body-sm">
                <div className="flex items-center gap-space-sm">
                  <span>Showing <strong className="text-on-surface">1 - 9</strong> of 42 students</span>
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
            {/* Focused Student Card: Maria Santos */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-md relative overflow-hidden">
              {/* Card Header & Status */}
              <div className="flex items-start justify-between gap-space-sm">
                <div className="flex items-center gap-3">
                  <img className="w-14 h-14 rounded-2xl object-cover ring-2 ring-primary-container shadow-sm" data-alt="Portrait of Maria Santos, a 14-year-old Filipina student in neat white school uniform, soft studio edtech portrait style" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMvFriwST1KMmKonfzPLOa00_F1dwa1qhycOY75YxKf6sGdTvtNRIaCtK2WtU6rKRFnHOFSwGFvguUd4UOtQdSWttCnkoCUKawt2QiagTMytwOLg8ny2mj6cMTyuoo84bn8swRHz3IMzw_x9_Um5BfzTb1yNzyGsqHIuWgQUviQ2NXp-YLKLzuFacG40oj6DUyc8bZIZ9ECSv5jyo8WR8nGUBerfNIcrP0O8_5qgKlHmSeYIDAEUIJ7A" onError={(e) => (e.currentTarget.style.visibility = 'hidden')}/>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">Maria Santos</h3>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Grade 8 · Sampaguita</span>
                    <span className="font-label-sm text-label-sm text-primary font-semibold">LRN: 109283-001</span>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full font-label-sm text-label-sm bg-error-container text-on-error-container font-bold">
              Immediate Help
            </span>
              </div>
              {/* Mastery Breakdown Mini Grid */}
              <div className="grid grid-cols-2 gap-2 bg-surface-container-low p-space-sm rounded-xl">
                <div className="flex flex-col p-2 bg-surface-container-lowest rounded-lg">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Math (Fractions)</span>
                  <span className="font-headline-sm text-headline-sm text-error font-extrabold">42%</span>
                  <span className="text-[10px] text-error font-medium">↓ 8% from last unit</span>
                </div>
                <div className="flex flex-col p-2 bg-surface-container-lowest rounded-lg">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Science (Cell)</span>
                  <span className="font-headline-sm text-headline-sm text-tertiary font-bold">65%</span>
                  <span className="text-[10px] text-secondary font-medium">↑ 3% improving</span>
                </div>
                <div className="flex flex-col p-2 bg-surface-container-lowest rounded-lg">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Filipino (Panitikan)</span>
                  <span className="font-headline-sm text-headline-sm text-secondary font-bold">70%</span>
                  <span className="text-[10px] text-on-surface-variant">Stable</span>
                </div>
                <div className="flex flex-col p-2 bg-surface-container-lowest rounded-lg">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">English (Grammar)</span>
                  <span className="font-headline-sm text-headline-sm text-error font-bold">55%</span>
                  <span className="text-[10px] text-error font-medium">Needs review</span>
                </div>
              </div>
              {/* AI Feedback Snippet Box */}
              <div className="bg-primary-fixed/30 rounded-xl p-space-md flex flex-col gap-space-xs relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-primary font-label-sm text-label-sm font-bold">
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                    <span>Aralytics AI Diagnostic Summary</span>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Today, 2:15 PM</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface leading-relaxed italic bg-surface-container-lowest/80 p-2.5 rounded-lg">
              “Nice work on fractions, Maria! You got all the addition problems right, but you struggled when finding the Least Common Denominator (LCD) with 3 different fractions. Let's do a 5-minute visual block review!”
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-label-sm text-label-sm text-primary font-semibold">Recommended Intervention:</span>
                  <span className="font-label-sm text-label-sm text-secondary bg-secondary-container/40 px-2 py-0.5 rounded-full font-bold">Visual Math Sprint #3</span>
                </div>
              </div>
              {/* Direct Teacher Action Callout */}
              <div className="flex flex-col gap-2">
                <button className="w-full flex items-center justify-center gap-space-xs py-2.5 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed font-label-lg text-label-lg hover:bg-tertiary-fixed-dim transition-colors shadow-sm" type="button">
                  <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
                  <span>Assign Auto-Remedial Quiz (5 Qs)</span>
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center gap-1 py-2 rounded-xl bg-surface-container text-primary font-label-md text-label-md hover:bg-surface-container-high transition-colors" type="button">
                    <span className="material-symbols-outlined text-[16px]">chat_bubble_outline</span>
                    <span>Send Chat</span>
                  </button>
                  <button className="flex items-center justify-center gap-1 py-2 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors" type="button">
                    <span className="material-symbols-outlined text-[16px]">contact_phone</span>
                    <span>Parent Link</span>
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
                <textarea className="w-full bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm p-3 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-primary-container transition-all resize-none" placeholder="Add confidential notes on Maria's recitation, group participation, or home modular access..." rows={3} value={note} onChange={(e) => setNote(e.target.value)}></textarea>
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
              Remediation Progress (Week 6)
                </h4>
                <span className="font-label-sm text-label-sm text-on-surface-variant">12 / 16 Done</span>
              </div>
              <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                <div className="bg-secondary h-full rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
            75% of assigned targeted exercises have been completed by flagged students this cycle.
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
        <span className="material-symbols-outlined text-secondary-fixed text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>forward_to_inbox</span>
        <span className="font-label-md text-label-md">Batch nudge queued for the filtered student group!</span>
      </div>
    </div>
  );
}
