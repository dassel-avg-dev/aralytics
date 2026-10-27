import { useState } from 'react';

const TONE_GREETINGS = {
  gentle: "“Magandang araw, Carlo! Napansin kong medyo nahirapan ka sa Polynomials kanina. Ayos lang 'yan, subukan natin ulit nang dahan-dahan! 🌟”",
  academic: "“Pagsusuri: Ang katumpakan sa Factoring Polynomials ay 54%. Inirerekomenda ang pagsasanay sa Module 3 bago ang Quarterly Exam.”",
  challenging: "“Halos nakuha mo na, Carlo! Kaya mo pang itaas sa 85% ang score mo kung muling susuriin ang Signs sa Quadratic Formula. Handa ka na ba?”"
};

const TABS = [
  { id: 'profile', label: 'Profile & Account' },
  { id: 'classroom', label: 'Classroom & Grading' },
  { id: 'aral', label: 'AI Tutor (Aral) Preferences' },
  { id: 'localization', label: 'Language & Localization' },
  { id: 'notifications', label: 'Notifications & Nudges' }
];

const DEFAULTS = {
  tone: 'gentle',
  threshold: 65,
  bilingualFeedback: true,
  strictLanguage: false,
  quizTime: '16:30',
  inactivityCount: '3',
  parentDigest: true
};

export default function TeacherClassroomSettings() {
  const [activeTab, setActiveTab] = useState('aral');
  const [tone, setTone] = useState(DEFAULTS.tone);
  const [threshold, setThreshold] = useState(DEFAULTS.threshold);
  const [bilingualFeedback, setBilingualFeedback] = useState(DEFAULTS.bilingualFeedback);
  const [strictLanguage, setStrictLanguage] = useState(DEFAULTS.strictLanguage);
  const [quizTime, setQuizTime] = useState(DEFAULTS.quizTime);
  const [inactivityCount, setInactivityCount] = useState(DEFAULTS.inactivityCount);
  const [parentDigest, setParentDigest] = useState(DEFAULTS.parentDigest);
  const [greetingFading, setGreetingFading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [dirty, setDirty] = useState(false);

  const toneOptions = [
    {
      id: 'gentle',
      title: 'Encouraging & Gentle',
      desc: 'Praises persistence, empathetic phrasing, scaffolds step-by-step without pressure. Best for confidence-building.',
      badge: 'Default'
    },
    {
      id: 'academic',
      title: 'Academic & Concise',
      desc: 'Direct mathematical terminology, DepEd standard rubrics, compact explanations for fast-track learners.',
      badge: 'Selected'
    },
    {
      id: 'challenging',
      title: 'Challenging & Proactive',
      desc: 'High-order thinking questions (HOTS), pushes for mastery extension and competitive exam readiness.',
      badge: 'Selected'
    }
  ];

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
      setBilingualFeedback(DEFAULTS.bilingualFeedback);
      setStrictLanguage(DEFAULTS.strictLanguage);
      setQuizTime(DEFAULTS.quizTime);
      setInactivityCount(DEFAULTS.inactivityCount);
      setParentDigest(DEFAULTS.parentDigest);
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
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">DepEd SDO Pasig · System Configuration</span>
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">SY 2024–2025</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface">Platform &amp; Classroom Settings</h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
              Configure teacher profile, classroom sections, AI tutor behavior, and automated notifications for Grade 8 Sampaguita &amp; Molave.
            </p>
          </div>
          {/* Action Buttons */}
          <div className="flex items-center gap-space-sm shrink-0">
            {dirty && (
              <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-bold">Unsaved changes</span>
            )}
            <button className="px-space-md py-2.5 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high transition-colors" id="discard-settings-btn" onClick={handleDiscard} type="button">
              Discard Changes
            </button>
            <button className="flex items-center gap-space-xs bg-primary-container hover:bg-primary text-on-primary px-space-lg py-2.5 rounded-xl font-label-lg text-label-lg shadow-[0_4px_16px_rgba(91,75,219,0.24)] transition-all transform active:scale-95" id="save-settings-btn" onClick={handleSave} type="button">
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
                          <span className="material-symbols-outlined text-[24px]">smart_toy</span>
                        </div>
                        <div>
                          <h2 className="font-headline-sm text-headline-sm text-on-surface">AI Tutor “Aral” Persona &amp; Feedback</h2>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">Calibrate student interaction warmth, remedial intervention bars, and language agility</p>
                        </div>
                      </div>
                      <span className="bg-primary-fixed text-primary px-3 py-1 rounded-full font-label-sm text-label-sm font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">bolt</span> Active AI
                      </span>
                    </div>
                    {/* Aral Interactive Mascot Preview Card */}
                    <div className="bg-surface-container-low rounded-xl p-space-md relative overflow-hidden flex flex-col sm:flex-row items-center gap-space-md">
                      <div className="relative shrink-0">
                        <img
                          alt="Aral mascot"
                          className="w-20 h-20 rounded-2xl object-cover bg-surface-container-highest shadow-sm"
                          data-alt="Friendly 3D rendered student robot tutor mascot named Aral, wearing a Philippine barong collar accent, smiling warm big eyes, rounded cheerful geometry in soft violet and sunny yellow highlights on white background studio lighting"
                          onError={(e) => (e.currentTarget.style.visibility = 'hidden')}
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBN2FzBDlJ7anvoWg3lXb8o35kF3AZc3oLvY8OtCmw6bXuBl9nE_3knVVtvtSrdk_rA5R8hjFTrKOWQmQ0xmISJzJ2S8DWBXNC_IQ2LCqtgjuopeevkhaIsyIjQY0YdZ3ImhN_PXysIGZ5Omxlt0pduOVAzuqspS4qEBukAk5AUsgY4N-FPAXP2tGdzNx21Byud-MnGOhPVXbc9qFGHTbfMNEKSuchgBJ0dIUtuHUNUXt7AeWCBYVuNfw"
                        />
                        <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-secondary text-on-secondary rounded-full flex items-center justify-center">
                          <span className="material-symbols-outlined text-[12px]">check</span>
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 w-full min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-label-md text-label-md text-primary font-bold">Preview: Live Student Intervention Greeting</span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">Taglish Dynamic Mode</span>
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
                      <label className="font-label-lg text-label-lg text-on-surface">Instructional &amp; Feedback Tone</label>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Determines how Aral frames practice prompts, hints, and error corrections.</p>
                      <div className="grid grid-cols-1 gap-space-xs mt-1">
                        {toneOptions.map((option) => {
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
                          <label className="font-label-lg text-label-lg text-on-surface block" htmlFor="remedial-slider">AI Remedial Recommendation Threshold</label>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">Trigger intervention exercises when formative score dips below threshold</span>
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
                        <span>50% (Lenient)</span>
                        <span className="font-semibold text-primary">Standard Benchmark (65%)</span>
                        <span>85% (Strict HOTS)</span>
                      </div>
                    </div>
                    {/* Bilingual Behavior Toggle Card */}
                    <div className="flex flex-col gap-space-sm pt-space-xs">
                      <span className="font-label-lg text-label-lg text-on-surface">Language Adaptation Behavior</span>
                      <div className="space-y-space-xs">
                        <label className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors">
                          <div className="flex items-center gap-space-sm pr-space-md">
                            <div className="w-9 h-9 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0">
                              <span className="material-symbols-outlined text-[20px] text-primary">translate</span>
                            </div>
                            <div>
                              <span className="font-label-md text-label-md text-on-surface block">Automatic Bilingual Feedback</span>
                              <span className="font-body-sm text-body-sm text-on-surface-variant">Seamlessly switch between Filipino and English depending on student prompt patterns and comprehension ease.</span>
                            </div>
                          </div>
                          <input
                            checked={bilingualFeedback}
                            className="w-5 h-5 rounded-md accent-primary shrink-0 cursor-pointer"
                            onChange={(e) => {
                              setBilingualFeedback(e.target.checked);
                              setDirty(true);
                            }}
                            type="checkbox"
                          />
                        </label>
                        <label className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors">
                          <div className="flex items-center gap-space-sm pr-space-md">
                            <div className="w-9 h-9 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0">
                              <span className="material-symbols-outlined text-[20px] text-secondary">menu_book</span>
                            </div>
                            <div>
                              <span className="font-label-md text-label-md text-on-surface block">Match Subject Language Strictly</span>
                              <span className="font-body-sm text-body-sm text-on-surface-variant">Strict Filipino for Panitikan &amp; AP; Technical English with Filipino scaffolding for Math &amp; Science.</span>
                            </div>
                          </div>
                          <input
                            checked={strictLanguage}
                            className="w-5 h-5 rounded-md accent-primary shrink-0 cursor-pointer"
                            onChange={(e) => {
                              setStrictLanguage(e.target.checked);
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
                  {/* 2. AUTOMATED STUDENT NUDGES & REMINDERS */}
                  <section className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-[0_4px_20px_rgba(91,75,219,0.08)] flex flex-col gap-space-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-space-sm">
                        <div className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-sm">
                          <span className="material-symbols-outlined text-[24px]">notifications_active</span>
                        </div>
                        <div>
                          <h2 className="font-headline-sm text-headline-sm text-on-surface">Automated Student Nudges &amp; Reminders</h2>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">Set triggers for push nudges, low-data SMS digests, and teacher alert thresholds</p>
                        </div>
                      </div>
                      <span className="bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-full font-label-sm text-label-sm">Classroom Automated</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                      {/* Daily Quiz Reminder Time */}
                      <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-space-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-label-md text-label-md text-on-surface font-bold">Daily Quiz Reminder</span>
                          <span className="material-symbols-outlined text-primary text-[18px]">schedule</span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">Broadcast reminder sent to student devices for pending homework</p>
                        <div className="mt-2 flex items-center gap-space-xs bg-surface-container-lowest p-2 rounded-lg">
                          <input
                            className="w-full bg-transparent font-label-lg text-label-lg text-on-surface focus:outline-none"
                            onChange={(e) => {
                              setQuizTime(e.target.value);
                              setDirty(true);
                            }}
                            type="time"
                            value={quizTime}
                          />
                          <span className="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap">After Class Hours</span>
                        </div>
                      </div>
                      {/* Inactivity Alert Threshold */}
                      <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-space-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-label-md text-label-md text-on-surface font-bold">Teacher Inactivity Alert</span>
                          <span className="material-symbols-outlined text-error text-[18px]">person_alert</span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">Flag student in adviser feed when consecutive submissions lapse</p>
                        <div className="mt-2 flex items-center justify-between bg-surface-container-lowest px-3 py-2 rounded-lg">
                          <span className="font-label-md text-label-md text-on-surface">Notify after</span>
                          <select
                            className="bg-surface-container-low font-label-md text-label-md text-primary font-bold px-2 py-1 rounded-md focus:outline-none cursor-pointer"
                            onChange={(e) => {
                              setInactivityCount(e.target.value);
                              setDirty(true);
                            }}
                            value={inactivityCount}
                          >
                            <option value="2">2 quizzes</option>
                            <option value="3">3 quizzes</option>
                            <option value="5">5 quizzes</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    {/* Parent SMS / App Digest Banner */}
                    <div className="p-space-md rounded-xl bg-surface-container-high flex items-center justify-between gap-space-md">
                      <div className="flex items-center gap-space-sm">
                        <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shrink-0 shadow-xs">
                          <span className="material-symbols-outlined text-[20px]">sms</span>
                        </div>
                        <div>
                          <span className="font-label-md text-label-md text-on-surface font-bold block">Parent/Guardian SMS &amp; Portal Digest</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">Scheduled for every Friday at 6:00 PM (Filipino &amp; English bilingual summary)</span>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer shrink-0">
                        <input
                          checked={parentDigest}
                          className="sr-only peer"
                          onChange={(e) => {
                            setParentDigest(e.target.checked);
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
                      <h2 className="font-headline-sm text-headline-sm text-on-surface">Teacher Profile &amp; Advising</h2>
                      <button className="text-primary hover:text-primary-container font-label-md text-label-md" type="button">Edit Info</button>
                    </div>
                    {/* Profile Badge Card */}
                    <div className="flex items-center gap-space-md p-space-md rounded-xl bg-surface-container-low">
                      <div className="relative shrink-0">
                        <img
                          alt="Elena Santos"
                          className="w-16 h-16 rounded-full object-cover shadow-sm"
                          onError={(e) => (e.currentTarget.style.visibility = 'hidden')}
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuChrfifem-pX-5-2ww20HzrO-M3nr7zLtmPi9Ix5-PCHl7pi5uQZlXPj6xHOAyG6JWBzxOozhXH5fuP6gRofSlFOKpUzMOpRg73l4PI5TaIX7ObErToVfnbzhJy2ghX0wDrjK6Lj3QfAiVzzaEcBSb7jWbHlaU0lIU4nC-1cCexq0ACsLAItVy1LwoUNeA06eShYWT0UaFkkl2Fbh-zjihrqjqhdUFLP2Zuz78Kyv-Wx6wEB5ZpfYTQrQ"
                        />
                        <span className="absolute bottom-0 right-0 w-4 h-4 bg-secondary rounded-full border-2 border-surface-container-lowest"></span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-headline-sm text-headline-sm text-on-surface truncate">Bb. Elena Santos, LPT</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant truncate">e.santos@deped.gov.ph</span>
                        <span className="font-label-sm text-label-sm text-primary font-bold mt-0.5">Teacher III · Mathematics</span>
                      </div>
                    </div>
                    {/* Institutional Metadata */}
                    <div className="space-y-space-sm">
                      <div className="flex flex-col gap-1">
                        <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Station / School Assignment</span>
                        <div className="flex items-center gap-2 text-on-surface font-body-md text-body-md bg-surface-container-low px-3 py-2 rounded-xl">
                          <span className="material-symbols-outlined text-[18px] text-primary">school</span>
                          <span className="truncate">Pasig National High School · Division of City Schools</span>
                        </div>
                      </div>
                      {/* Assigned Classes Pill Roster */}
                      <div className="flex flex-col gap-1">
                        <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Active Class Sections</span>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
                              <span className="font-label-md text-label-md text-on-surface">Grade 8 - Sampaguita</span>
                            </div>
                            <span className="bg-primary-fixed text-primary px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-semibold">Adviser (42 Students)</span>
                          </div>
                          <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                              <span className="font-label-md text-label-md text-on-surface">Grade 8 - Molave</span>
                            </div>
                            <span className="bg-surface-container-high text-on-surface-variant px-2.5 py-0.5 rounded-full font-label-sm text-label-sm">Math Teacher (38 Students)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-space-xs">
                      <button className="w-full py-2 bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-md text-label-md rounded-xl transition-colors flex items-center justify-center gap-1.5" type="button">
                        <span className="material-symbols-outlined text-[18px]">domain_add</span>
                        <span>Request Section Transfer / Reassignment</span>
                      </button>
                    </div>
                  </section>
                </div>
              )}
              {activeTab === 'classroom' && (
                <div className="flex flex-col gap-space-lg">
                  {/* 4. GRADING CRITERIA & DEPED WEIGHTING */}
                  <section className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-[0_4px_20px_rgba(91,75,219,0.08)] flex flex-col gap-space-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="font-headline-sm text-headline-sm text-on-surface">DepEd Grading Weighting</h2>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">DepEd Order No. 8, s. 2015 Compliant</span>
                      </div>
                      <span className="bg-secondary-container text-on-secondary-container px-2.5 py-1 rounded-full font-label-sm text-label-sm font-bold">Standard Formula</span>
                    </div>
                    {/* Interactive Donut / Weight Distribution Summary Bar */}
                    <div className="flex flex-col gap-2">
                      <div className="w-full h-3 rounded-full bg-surface-container flex overflow-hidden">
                        <div className="bg-primary-container h-full transition-all" style={{ width: '40%' }} title="Written Works: 40%"></div>
                        <div className="bg-secondary h-full transition-all" style={{ width: '40%' }} title="Performance Tasks: 40%"></div>
                        <div className="bg-tertiary-fixed-dim h-full transition-all" style={{ width: '20%' }} title="Quarterly Assessment: 20%"></div>
                      </div>
                      {/* Breakdown Legend Rows */}
                      <div className="grid grid-cols-3 gap-2 text-center pt-1">
                        <div className="bg-surface-container-low p-2 rounded-xl">
                          <span className="font-metric-number text-headline-sm text-primary block">40%</span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">Written Works</span>
                        </div>
                        <div className="bg-surface-container-low p-2 rounded-xl">
                          <span className="font-metric-number text-headline-sm text-secondary block">40%</span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">Performance</span>
                        </div>
                        <div className="bg-surface-container-low p-2 rounded-xl">
                          <span className="font-metric-number text-headline-sm text-tertiary block">20%</span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">Quarterly Exam</span>
                        </div>
                      </div>
                    </div>
                    {/* Passing Benchmark Metric */}
                    <div className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-low">
                      <div className="flex items-center gap-space-sm">
                        <span className="material-symbols-outlined text-primary text-[22px]">verified</span>
                        <div>
                          <span className="font-label-md text-label-md text-on-surface font-bold block">Passing Threshold Benchmark</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">Transmuted grade requirement for promotion</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-surface-container-lowest px-3 py-1.5 rounded-lg shadow-xs">
                        <span className="font-headline-sm text-headline-sm text-on-surface font-bold">75.0%</span>
                      </div>
                    </div>
                    {/* Export Rubric Configuration Button */}
                    <button className="text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm flex items-center justify-center gap-1 transition-colors" type="button">
                      <span className="material-symbols-outlined text-[16px]">download</span>
                      <span>Export DepEd Form 137 / SF9 Format Spec</span>
                    </button>
                  </section>
                </div>
              )}
              {activeTab === 'localization' && (
                <div className="flex flex-col gap-space-lg">
                  {/* Contextual Help / Guidance Widget */}
                  <div className="bg-surface-container-high rounded-2xl p-space-md flex items-start gap-space-sm">
                    <span className="material-symbols-outlined text-primary text-[22px] shrink-0 mt-0.5">contact_support</span>
                    <div className="flex flex-col gap-1">
                      <span className="font-label-md text-label-md text-on-surface font-bold">Kailangan ng tulong sa configuration?</span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Maaari kang makipag-ugnayan sa Division IT Coordinator o magbasa sa DepEd LMS Portal Knowledgebase.
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
          <span className="font-label-md text-label-md">Nai-save na ang mga pagbabago sa Settings para sa Aral &amp; Grade 8!</span>
        </div>
      </div>
    </>
  );
}
