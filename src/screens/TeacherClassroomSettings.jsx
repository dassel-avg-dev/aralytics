import { useState } from 'react';

const TONE_GREETINGS = {
  socratic:
    "“Hi Miguel! Looks like your while loop ran into an off-by-one condition on line 4. Let's trace your loop counter together! 💡”",
  concise:
    "“Pagsusuri: IndexError sa line 4 — off-by-one ang while loop counter. I-review ang range condition at PEP 8 naming conventions bago i-run ulit.”",
  challenging:
    "“Halos nakuha mo na, Miguel! I-stress-test ang loop sa edge cases — kaya mo bang gawing O(n) ang fix at isama ang unit test? 🔥”"
};

const TABS = [
  { id: 'profile', label: 'Profile & Account' },
  { id: 'classroom', label: 'Classroom & Grading' },
  { id: 'aral', label: 'AI Diagnostic Model & Tone' },
  { id: 'localization', label: 'Language & Localization' },
  { id: 'notifications', label: 'Notifications & Nudges' }
];

const DEFAULTS = {
  tone: 'socratic',
  threshold: 70,
  englishExplanations: true,
  bilingualScaffolding: false,
  quizNudge: '24h',
  failureCount: '2',
  weeklyDigest: true
};

const TONE_OPTIONS = [
  {
    id: 'socratic',
    title: 'Encouraging & Socratic',
    desc: 'Identifies cognitive root cause, asks guiding tracing questions, and scaffolds debugging without revealing the code answer.',
    badge: 'Active'
  },
  {
    id: 'concise',
    title: 'Direct & Technical',
    desc: 'Concise runtime stack trace annotations, PEP 8 linting feedback, and algorithmic complexity notes.',
    badge: 'Selected'
  },
  {
    id: 'challenging',
    title: 'Challenging & Edge-Case Oriented',
    desc: 'Encourages stress-testing with boundary cases, time-complexity constraints, and automated unit test authoring.',
    badge: 'Selected'
  }
];

export default function TeacherClassroomSettings() {
  const [activeTab, setActiveTab] = useState('aral');
  const [tone, setTone] = useState(DEFAULTS.tone);
  const [threshold, setThreshold] = useState(DEFAULTS.threshold);
  const [englishExplanations, setEnglishExplanations] = useState(DEFAULTS.englishExplanations);
  const [bilingualScaffolding, setBilingualScaffolding] = useState(DEFAULTS.bilingualScaffolding);
  const [quizNudge, setQuizNudge] = useState(DEFAULTS.quizNudge);
  const [failureCount, setFailureCount] = useState(DEFAULTS.failureCount);
  const [weeklyDigest, setWeeklyDigest] = useState(DEFAULTS.weeklyDigest);
  const [greetingFading, setGreetingFading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [dirty, setDirty] = useState(false);

  const showLeft = activeTab === 'aral' || activeTab === 'notifications';
  const showRight = activeTab === 'profile' || activeTab === 'classroom' || activeTab === 'localization';

  const selectTone = (id) => {
    if (id === tone) return;
    setTone(id);
    setDirty(true);
    setGreetingFading(true);
    setTimeout(() => setGreetingFading(false), 150);
  };

  const handleSave = () => {
    setDirty(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  const handleDiscard = () => {
    if (window.confirm('I-discard ang mga binagong settings? Hindi mai-save ang pinakabagong pagbabago.')) {
      setTone(DEFAULTS.tone);
      setThreshold(DEFAULTS.threshold);
      setEnglishExplanations(DEFAULTS.englishExplanations);
      setBilingualScaffolding(DEFAULTS.bilingualScaffolding);
      setQuizNudge(DEFAULTS.quizNudge);
      setFailureCount(DEFAULTS.failureCount);
      setWeeklyDigest(DEFAULTS.weeklyDigest);
      setDirty(false);
    }
  };

  return (
    <>
      {/* Main Canvas Container (Max 1120px) */}
      <div className="w-full max-w-[1120px] mx-auto px-space-md lg:px-space-xl py-space-lg flex flex-col gap-space-xl">
        {/* Top Sticky Header Bar with Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">COMPUTER SCIENCE DEPARTMENT · DIAGNOSTIC CONFIGURATION</span>
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">CS 101 · SY 2024–2025</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface">Platform &amp; Classroom Settings</h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
              Configure teacher profile, coding cohorts, AI diagnostic model parameters, and alert notifications.
            </p>
          </div>
          {/* Action Buttons */}
          <div className="flex items-center gap-space-sm shrink-0">
            {dirty && (
              <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-bold">Unsaved changes</span>
            )}
            <button className="px-space-md py-2.5 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high transition-colors" onClick={handleDiscard} type="button">
              Discard Changes
            </button>
            <button className="flex items-center gap-space-xs bg-primary-container hover:bg-primary text-on-primary px-space-lg py-2.5 rounded-xl font-label-lg text-label-lg shadow-[0_4px_16px_rgba(91,75,219,0.24)] transition-all transform active:scale-95" disabled={!dirty} onClick={handleSave} type="button">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>save</span>
              <span>Save Settings</span>
            </button>
          </div>
        </div>
        {/* Horizontal Settings Navigation Pills */}
        <div className="flex items-center gap-space-xs overflow-x-auto pb-1 -mx-space-md px-space-md md:mx-0 md:px-0">
          {TABS.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                className={
                  'px-space-md py-2 rounded-full font-label-md text-label-md transition-all shrink-0 ' +
                  (active
                    ? 'bg-primary-container text-on-primary shadow-sm font-bold '
                    : 'bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant ') +
                  (tab.id === 'aral' ? 'flex items-center gap-1.5' : '')
                }
                onClick={() => setActiveTab(tab.id)}
                type="button"
              >
                {tab.id === 'aral' && <span className="material-symbols-outlined text-[16px]">auto_awesome</span>}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
        {/* MAIN GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          {/* LEFT / PRIMARY COLUMN (7 Cols) */}
          {showLeft && (
            <div className="lg:col-span-7 flex flex-col gap-space-lg">
              {activeTab === 'aral' && (
                <div className="flex flex-col gap-space-lg">
                  {/* 1. AI TUTOR 'ARAL' PERSONA & FEEDBACK (Hero EdTech Card) */}
                  <section className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-[0_4px_20px_rgba(91,75,219,0.08)] relative overflow-hidden flex flex-col gap-space-md">
                    {/* Ambient decorative light glow inside card */}
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="flex items-center justify-between gap-space-sm relative z-10">
                      <div className="flex items-center gap-space-sm">
                        <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shadow-sm">
                          <span className="material-symbols-outlined text-[24px]">terminal</span>
                        </div>
                        <div>
                          <h2 className="font-headline-sm text-headline-sm text-on-surface">Aralytics Diagnostic AI Model Configuration</h2>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">Aralytics-Code-7B v1.2 (Locally Hosted) · Calibrate diagnostic feedback warmth, Socratic guidance, and intervention triggers</p>
                        </div>
                      </div>
                      <span className="bg-primary-fixed text-primary px-3 py-1 rounded-full font-label-sm text-label-sm font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">bolt</span> Local Model Active
                      </span>
                    </div>
                    {/* Aral Interactive Assistant Preview Card */}
                    <div className="bg-surface-container-low rounded-xl p-space-md relative overflow-hidden flex flex-col sm:flex-row items-center gap-space-md">
                      <div className="relative shrink-0">
                        <img
                          alt="Aralytics Coding Diagnostic Assistant Avatar"
                          className="w-20 h-20 rounded-2xl object-cover bg-surface-container-highest shadow-sm"
                          onError={(e) => (e.currentTarget.style.visibility = 'hidden')}
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBN2FzBDlJ7anvoWg3lXb8o35kF3AZc3oLvY8OtCmw6bXuBl9nE_3knVVtvtSrdk_rA5R8hjFTrKOWQmQ0xmISJzJ2S8DWBXNC_IQ2LCqtgjuopeevkhaIsyIjQY0YdZ3ImhN_PXysIGZ5Omxlt0pduOVAzuqspS4qEBukAk5AUsgY4N-FPAXP2tGdzNx21Byud-MnGOhPVXbc9qFGHTbfMNEKSuchgBJ0dIUtuHUNUXt7AeWCBYVuNfw"
                        />
                        <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-secondary text-on-secondary rounded-full flex items-center justify-center">
                          <span className="material-symbols-outlined text-[12px]">check</span>
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 w-full min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-label-md text-label-md text-primary font-bold">Preview: Real-time Socratic Diagnostic Feedback</span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">Python Runtime Analyzer</span>
                        </div>
                        <p
                          className="font-body-sm text-body-sm text-on-surface bg-surface-container-lowest p-space-sm rounded-lg shadow-xs transition-opacity duration-200 italic"
                          style={{ opacity: greetingFading ? 0 : 1 }}
                        >
                          {TONE_GREETINGS[tone]}
                        </p>
                      </div>
                    </div>
                    {/* Feedback Tone Selector */}
                    <div className="flex flex-col gap-space-xs">
                      <label className="font-label-lg text-label-lg text-on-surface">Instructional &amp; Diagnostic Feedback Tone</label>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Controls how the diagnostic agent explains root causes without providing direct solution code (PRD US-06 &amp; US-07).</p>
                      <div className="grid grid-cols-1 gap-space-xs mt-1">
                        {TONE_OPTIONS.map((option) => {
                          const selected = tone === option.id;
                          return (
                            <div
                              key={option.id}
                              className={
                                'tone-card cursor-pointer p-space-md rounded-xl transition-all flex items-start justify-between gap-space-sm ' +
                                (selected ? 'bg-surface-container-high shadow-md' : 'bg-surface-container-low hover:bg-surface-container-high')
                              }
                              onClick={() => selectTone(option.id)}
                            >
                              <div className="flex items-start gap-space-sm">
                                <span className={'material-symbols-outlined tone-radio-icon text-[22px] shrink-0 mt-0.5 ' + (selected ? 'text-primary' : 'text-outline')}>
                                  {selected ? 'radio_button_checked' : 'radio_button_unchecked'}
                                </span>
                                <div className="flex flex-col">
                                  <span className="font-label-lg text-label-lg text-on-surface font-bold">{option.title}</span>
                                  <span className="font-body-sm text-body-sm text-on-surface-variant">{option.desc}</span>
                                </div>
                              </div>
                              <span className={(selected ? '' : 'hidden ') + 'tone-badge bg-secondary-container text-on-secondary-container px-2.5 py-0.5 rounded-full font-label-sm text-label-sm shrink-0'}>
                                {option.badge}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    {/* AI Remedial Threshold Slider */}
                    <div className="flex flex-col gap-space-xs bg-surface-container-low p-space-md rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="font-label-lg text-label-lg text-on-surface block" htmlFor="remedial-slider">AI Remedial Intervention Threshold (PRD US-07)</label>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">Flag students and recommend remedial coding exercises when module score dips below threshold</span>
                        </div>
                        <span className="font-headline-sm text-headline-sm text-primary font-bold bg-surface-container-lowest px-3 py-1 rounded-lg shadow-xs">{threshold}%</span>
                      </div>
                      {/* Custom Styled Visual Slider Track */}
                      <div className="relative w-full py-2">
                        <div className="w-full h-2.5 bg-surface-container-highest rounded-full overflow-hidden relative">
                          <div className="h-full bg-primary-container rounded-full transition-all duration-150" style={{ width: threshold + '%' }}></div>
                        </div>
                        <input
                          className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
                          id="remedial-slider"
                          max="85"
                          min="50"
                          onChange={(e) => {
                            setThreshold(Number(e.target.value));
                            setDirty(true);
                          }}
                          step="1"
                          type="range"
                          value={threshold}
                        />
                      </div>
                      <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                        <span>50% (Permissive)</span>
                        <span className="font-semibold text-primary">Standard Diagnostic Benchmark (70%)</span>
                        <span>85% (Strict Mastery)</span>
                      </div>
                    </div>
                    {/* Language & Code Syntax Adaptation Toggle Cards */}
                    <div className="flex flex-col gap-space-sm pt-space-xs">
                      <span className="font-label-lg text-label-lg text-on-surface">Language &amp; Code Syntax Adaptation</span>
                      <div className="space-y-space-xs">
                        <label className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors">
                          <div className="flex items-center gap-space-sm pr-space-md">
                            <div className="w-9 h-9 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0">
                              <span className="material-symbols-outlined text-[20px] text-primary">code</span>
                            </div>
                            <div>
                              <span className="font-label-md text-label-md text-on-surface block">English Diagnostic Explanations (Default)</span>
                              <span className="font-body-sm text-body-sm text-on-surface-variant">Standard programming terminology, Python documentation references, and clean code conventions.</span>
                            </div>
                          </div>
                          <input
                            checked={englishExplanations}
                            className="w-5 h-5 rounded-md accent-primary shrink-0 cursor-pointer"
                            onChange={(e) => {
                              setEnglishExplanations(e.target.checked);
                              setDirty(true);
                            }}
                            type="checkbox"
                          />
                        </label>
                        <label className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors">
                          <div className="flex items-center gap-space-sm pr-space-md">
                            <div className="w-9 h-9 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0">
                              <span className="material-symbols-outlined text-[20px] text-secondary">translate</span>
                            </div>
                            <div>
                              <span className="font-label-md text-label-md text-on-surface block">Bilingual Filipino Scaffolding Support</span>
                              <span className="font-body-sm text-body-sm text-on-surface-variant">Enable conversational Taglish explanations when students struggle with abstract logic concepts.</span>
                            </div>
                          </div>
                          <input
                            checked={bilingualScaffolding}
                            className="w-5 h-5 rounded-md accent-primary shrink-0 cursor-pointer"
                            onChange={(e) => {
                              setBilingualScaffolding(e.target.checked);
                              setDirty(true);
                            }}
                            type="checkbox"
                          />
                        </label>
                      </div>
                    </div>
                  </section>
                </div>
              )}
              {activeTab === 'notifications' && (
                <div className="flex flex-col gap-space-lg">
                  {/* 2. AUTOMATED CODING ALERTS & NUDGES */}
                  <section className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-[0_4px_20px_rgba(91,75,219,0.08)] flex flex-col gap-space-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-space-sm">
                        <div className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-sm">
                          <span className="material-symbols-outlined text-[24px]">notifications_active</span>
                        </div>
                        <div>
                          <h2 className="font-headline-sm text-headline-sm text-on-surface">Automated Coding Alerts &amp; Nudges</h2>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">Configure automated reminders, inactivity triggers, and instructor intervention flags (PRD US-09)</p>
                        </div>
                      </div>
                      <span className="bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-full font-label-sm text-label-sm">Cohort Automated</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                      {/* Quiz Due Date Nudge */}
                      <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-space-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-label-md text-label-md text-on-surface font-bold">Quiz Due Date Nudge</span>
                          <span className="material-symbols-outlined text-primary text-[18px]">schedule</span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">Send push notification to students before coding activity deadline</p>
                        <div className="mt-2 flex items-center justify-between bg-surface-container-lowest px-3 py-2 rounded-lg">
                          <span className="font-label-md text-label-md text-on-surface">Send Nudge</span>
                          <select
                            className="bg-surface-container-low font-label-md text-label-md text-primary font-bold px-2 py-1 rounded-md focus:outline-none cursor-pointer"
                            onChange={(e) => {
                              setQuizNudge(e.target.value);
                              setDirty(true);
                            }}
                            value={quizNudge}
                          >
                            <option value="24h">24 hours before deadline</option>
                            <option value="12h">12 hours before deadline</option>
                            <option value="6h">6 hours before deadline</option>
                          </select>
                        </div>
                      </div>
                      {/* Consecutive Failure Alert */}
                      <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-space-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-label-md text-label-md text-on-surface font-bold">Consecutive Failure Alert</span>
                          <span className="material-symbols-outlined text-error text-[18px]">person_alert</span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">Flag student on teacher dashboard when diagnostic score fails consecutively (PRD US-07)</p>
                        <div className="mt-2 flex items-center justify-between bg-surface-container-lowest px-3 py-2 rounded-lg">
                          <span className="font-label-md text-label-md text-on-surface">Trigger Alert after</span>
                          <select
                            className="bg-surface-container-low font-label-md text-label-md text-primary font-bold px-2 py-1 rounded-md focus:outline-none cursor-pointer"
                            onChange={(e) => {
                              setFailureCount(e.target.value);
                              setDirty(true);
                            }}
                            value={failureCount}
                          >
                            <option value="2">2 failed quizzes (&lt; 70%)</option>
                            <option value="3">3 failed quizzes (&lt; 70%)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    {/* Weekly Progress & Diagnostic Digest Banner */}
                    <div className="p-space-md rounded-xl bg-surface-container-high flex items-center justify-between gap-space-md">
                      <div className="flex items-center gap-space-sm">
                        <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shrink-0 shadow-xs">
                          <span className="material-symbols-outlined text-[20px]">mark_email_unread</span>
                        </div>
                        <div>
                          <span className="font-label-md text-label-md text-on-surface font-bold block">Weekly Progress &amp; Diagnostic Digest</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">Send automated weekly summary of cohort mastery and remedial completion to instructor</span>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer shrink-0">
                        <input
                          checked={weeklyDigest}
                          className="sr-only peer"
                          onChange={(e) => {
                            setWeeklyDigest(e.target.checked);
                            setDirty(true);
                          }}
                          type="checkbox"
                        />
                        <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
                      </label>
                    </div>
                  </section>
                </div>
              )}
            </div>
          )}
          {/* RIGHT / SECONDARY COLUMN (5 Cols) */}
          {showRight && (
            <div className="lg:col-span-5 flex flex-col gap-space-lg">
              {activeTab === 'profile' && (
                <div className="flex flex-col gap-space-lg">
                  {/* 3. TEACHER PROFILE & ADVISING ASSIGNMENT */}
                  <section className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-[0_4px_20px_rgba(91,75,219,0.08)] flex flex-col gap-space-md">
                    <div className="flex items-center justify-between">
                      <h2 className="font-headline-sm text-headline-sm text-on-surface">Teacher Profile &amp; Cohorts</h2>
                      <button className="text-primary hover:text-primary-container font-label-md text-label-md" type="button">Edit Info</button>
                    </div>
                    {/* Profile Badge Card */}
                    <div className="flex items-center gap-space-md p-space-md rounded-xl bg-surface-container-low">
                      <div className="relative shrink-0">
                        <img
                          alt="Mr. Ronald Reyes"
                          className="w-16 h-16 rounded-full object-cover shadow-sm"
                          onError={(e) => (e.currentTarget.style.visibility = 'hidden')}
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuChrfifem-pX-5-2ww20HzrO-M3nr7zLtmPi9Ix5-PCHl7pi5uQZlXPj6xHOAyG6JWBzxOozhXH5fuP6gRofSlFOKpUzMOpRg73l4PI5TaIX7ObErToVfnbzhJy2ghX0wDrjK6Lj3QfAiVzzaEcBSb7jWbHlaU0lIU4nC-1cCexq0ACsLAItVy1LwoUNeA06eShYWT0UaFkkl2Fbh-zjihrqjqhdUFLP2Zuz78Kyv-Wx6wEB5ZpfYTQrQ"
                        />
                        <span className="absolute bottom-0 right-0 w-4 h-4 bg-secondary rounded-full border-2 border-surface-container-lowest"></span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-headline-sm text-headline-sm text-on-surface truncate">Mr. Ronald Reyes</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant truncate">r.reyes@school.edu.ph</span>
                        <span className="font-label-sm text-label-sm text-primary font-bold mt-0.5">Computer Science Instructor · Lead</span>
                      </div>
                    </div>
                    {/* Institutional Metadata */}
                    <div className="space-y-space-sm">
                      <div className="flex flex-col gap-1">
                        <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Institution / Campus Assignment</span>
                        <div className="flex items-center gap-2 text-on-surface font-body-md text-body-md bg-surface-container-low px-3 py-2 rounded-xl">
                          <span className="material-symbols-outlined text-[18px] text-primary">school</span>
                          <span className="truncate">Metro Manila High School · Private Academy</span>
                        </div>
                      </div>
                      {/* Assigned Coding Cohorts Roster */}
                      <div className="flex flex-col gap-1">
                        <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Active Coding Cohorts</span>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
                              <span className="font-label-md text-label-md text-on-surface">CS 101 - Intro to Python</span>
                            </div>
                            <span className="bg-primary-fixed text-primary px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-semibold">Section A (42 Students)</span>
                          </div>
                          <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                              <span className="font-label-md text-label-md text-on-surface">CS 201 - Data Structures</span>
                            </div>
                            <span className="bg-surface-container-high text-on-surface-variant px-2.5 py-0.5 rounded-full font-label-sm text-label-sm">Section B (36 Students)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-space-xs">
                      <button className="w-full py-2 bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-md text-label-md rounded-xl transition-colors flex items-center justify-center gap-1.5" type="button">
                        <span className="material-symbols-outlined text-[18px]">library_add</span>
                        <span>Manage Cohorts &amp; Roster Sync</span>
                      </button>
                    </div>
                  </section>
                </div>
              )}
              {activeTab === 'classroom' && (
                <div className="flex flex-col gap-space-lg">
                  {/* 4. DIAGNOSTIC & ACTIVITY WEIGHTING */}
                  <section className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-[0_4px_20px_rgba(91,75,219,0.08)] flex flex-col gap-space-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="font-headline-sm text-headline-sm text-on-surface">Diagnostic &amp; Activity Weighting</h2>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">PRD Standard Assessment Framework</span>
                      </div>
                      <span className="bg-secondary-container text-on-secondary-container px-2.5 py-1 rounded-full font-label-sm text-label-sm font-bold">Coding Standard</span>
                    </div>
                    {/* Weight Distribution Summary Bar */}
                    <div className="flex flex-col gap-2">
                      <div className="w-full h-3 rounded-full bg-surface-container flex overflow-hidden">
                        <div className="bg-primary-container h-full transition-all" style={{ width: '40%' }} title="Conceptual MCQs: 40%"></div>
                        <div className="bg-secondary h-full transition-all" style={{ width: '60%' }} title="Code Debugging &amp; Scenario: 60%"></div>
                      </div>
                      {/* Breakdown Legend Rows */}
                      <div className="grid grid-cols-2 gap-2 text-center pt-1">
                        <div className="bg-surface-container-low p-2 rounded-xl">
                          <span className="font-metric-number text-headline-sm text-primary block">40%</span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">Conceptual MCQs</span>
                        </div>
                        <div className="bg-surface-container-low p-2 rounded-xl">
                          <span className="font-metric-number text-headline-sm text-secondary block">60%</span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">Scenario / Debugging</span>
                        </div>
                      </div>
                    </div>
                    {/* Remedial Intervention Benchmark Metric */}
                    <div className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-low">
                      <div className="flex items-center gap-space-sm">
                        <span className="material-symbols-outlined text-primary text-[22px]">flag</span>
                        <div>
                          <span className="font-label-md text-label-md text-on-surface font-bold block">Remedial Intervention Benchmark</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">Students below 70% automatically flagged for practice</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-surface-container-lowest px-3 py-1.5 rounded-lg shadow-xs">
                        <span className="font-headline-sm text-headline-sm text-primary font-bold">70.0%</span>
                      </div>
                    </div>
                    {/* Export Rubric Configuration Button */}
                    <button className="text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm flex items-center justify-center gap-1 transition-colors" type="button">
                      <span className="material-symbols-outlined text-[16px]">file_download</span>
                      <span>Export Diagnostic Rubric &amp; Test Suite Config</span>
                    </button>
                  </section>
                </div>
              )}
              {activeTab === 'localization' && (
                <div className="flex flex-col gap-space-lg">
                  {/* Contextual Help / Guidance Widget */}
                  <div className="bg-surface-container-high rounded-2xl p-space-md flex items-start gap-space-sm">
                    <span className="material-symbols-outlined text-primary text-[22px] shrink-0 mt-0.5">help_outline</span>
                    <div className="flex flex-col gap-1">
                      <span className="font-label-md text-label-md text-on-surface font-bold">Need help configuring AI diagnostics?</span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Read the Aralytics CS Teacher Handbook or connect your LMS repository via Webhook integration.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        {/* Floating Toast Confirmation on Save */}
        <div
          className={
            'fixed bottom-6 right-6 z-50 transform transition-all duration-300 flex items-center gap-space-sm bg-inverse-surface text-inverse-on-surface px-space-lg py-3 rounded-xl shadow-xl ' +
            (showToast ? '' : 'translate-y-24 opacity-0 pointer-events-none')
          }
        >
          <span className="material-symbols-outlined text-secondary-fixed text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          <span className="font-label-md text-label-md">Settings successfully updated for CS 101 Diagnostic Model &amp; Cohorts!</span>
        </div>
      </div>
    </>
  );
}
