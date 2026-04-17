'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

const BRAND = '#534AB7'

// ── Types ────────────────────────────────────────────────────────────────

interface StepOption {
  label: string
  value: number | string
  sub?: string
}

interface StepQuestion {
  id: string
  label: string
  options: StepOption[]
}

interface StepConfig {
  label: string
  title: string
  sub: string
  questions: StepQuestion[]
}

type AnswerMap = Record<string, number | string | null>

interface CalcResults {
  adminTaxPct: number
  grade: string
  gradeColor: 'green' | 'amber' | 'red'
  gradeDesc: string
  weeklyAdminHours: number
  monthlyCost: number
  annualCost: number
  meetingVal: number
  adminVal: number
  mismatchVal: number
  reactiveVal: number
}

// ── Step configuration ────────────────────────────────────────────────────

const STEPS: StepConfig[] = [
  {
    label: 'Team basics',
    title: 'Tell us about your team',
    sub: 'We use this to calculate the real dollar cost of your administrative overhead.',
    questions: [
      {
        id: 'teamSize',
        label: 'How many people are on your team (including yourself)?',
        options: [
          { label: 'Just me', value: 1 },
          { label: '2–5 people', value: 3 },
          { label: '6–15 people', value: 8 },
          { label: '16–50 people', value: 25 },
          { label: '50+ people', value: 75 },
        ],
      },
      {
        id: 'annualSalary',
        label: 'What is the average annual salary across your team?',
        options: [
          { label: 'Under $40K', value: 35000, sub: '~$17/hr' },
          { label: '$40K – $70K', value: 55000, sub: '~$26/hr' },
          { label: '$70K – $100K', value: 85000, sub: '~$41/hr' },
          { label: '$100K – $150K', value: 125000, sub: '~$60/hr' },
          { label: '$150K+', value: 175000, sub: '~$84/hr' },
        ],
      },
    ],
  },
  {
    label: 'Meeting load',
    title: 'How much time goes to meetings?',
    sub: 'Meetings are often the biggest driver of administrative overhead — especially recurring ones with unclear value.',
    questions: [
      {
        id: 'meetingTax',
        label: 'How many hours per week does your team spend in meetings?',
        options: [
          { label: 'Less than 5 hours', value: 10 },
          { label: '5–10 hours', value: 20 },
          { label: '10–20 hours', value: 35 },
          { label: 'More than 20 hours', value: 55 },
        ],
      },
      {
        id: 'asyncTax',
        label: 'What percentage of those meetings could be an email or async update?',
        options: [
          { label: 'Less than 10% — most are necessary', value: 5 },
          { label: 'About 25% — some are unnecessary', value: 12 },
          { label: 'About 50% — many could be cut', value: 20 },
          { label: 'More than 50% — meetings are a real problem', value: 28 },
        ],
      },
    ],
  },
  {
    label: 'Administrative work',
    title: 'How much manual admin work exists?',
    sub: 'Recurring manual tasks are where capacity gets quietly drained — often without anyone noticing.',
    questions: [
      {
        id: 'adminTax',
        label: 'How many hours per week does your team spend on status updates, reporting, and data entry?',
        options: [
          { label: 'Less than 2 hours', value: 5 },
          { label: '2–5 hours', value: 12 },
          { label: '5–10 hours', value: 22 },
          { label: 'More than 10 hours', value: 32 },
        ],
      },
      {
        id: 'processTax',
        label: "How many manual processes does your team repeat more than once a week that haven't been automated?",
        options: [
          { label: '1–2 processes', value: 5 },
          { label: '3–5 processes', value: 10 },
          { label: '5–10 processes', value: 18 },
          { label: "More than 10 — it's pervasive", value: 28 },
        ],
      },
    ],
  },
  {
    label: 'Capacity signals',
    title: "How is your team's capacity being used?",
    sub: "These questions identify misalignment between where time goes and where it creates the most value.",
    questions: [
      {
        id: 'mismatchTax',
        label: 'Are your most senior people regularly doing work that could be done by someone more junior?',
        options: [
          { label: 'Rarely — roles are well-matched', value: 2 },
          { label: 'Sometimes — it happens occasionally', value: 10 },
          { label: 'Often — senior people pulled into low-value work', value: 20 },
          { label: 'Constantly — this is a known problem', value: 30 },
        ],
      },
      {
        id: 'strategicTax',
        label: "How often does strategic work get pushed to 'when we have time'?",
        options: [
          { label: 'Rarely — strategic work gets protected time', value: 3 },
          { label: 'Sometimes — a few things slip', value: 10 },
          { label: 'Often — strategic work regularly deprioritized', value: 20 },
          { label: "Always — we're always in reactive mode", value: 30 },
        ],
      },
    ],
  },
  {
    label: 'Context',
    title: 'One last question',
    sub: 'This helps us give you more relevant recommendations.',
    questions: [
      {
        id: 'userType',
        label: 'Which best describes your situation?',
        options: [
          { label: 'I run or own a small business', value: 'smb' },
          { label: 'I lead an ops or BizOps team', value: 'bizops' },
          { label: "I'm a founder or startup operator", value: 'founder' },
          { label: "I'm a consultant or advisor", value: 'consultant' },
        ],
      },
    ],
  },
]

// ── Pure helpers ──────────────────────────────────────────────────────────

function n(answers: AnswerMap, key: string): number {
  return (answers[key] as number) ?? 0
}

function fmtDollar(num: number): string {
  return '$' + num.toLocaleString()
}

function calculate(answers: AnswerMap): CalcResults {
  const rawTax =
    n(answers, 'meetingTax') +
    n(answers, 'asyncTax') +
    n(answers, 'adminTax') +
    n(answers, 'processTax') +
    n(answers, 'mismatchTax') +
    n(answers, 'strategicTax')

  const adminTaxPct = Math.min(Math.round(rawTax * 0.55), 85)
  const hourlyRate = n(answers, 'annualSalary') / 2080
  const weeklyAdminHours = Math.round(40 * (adminTaxPct / 100) * n(answers, 'teamSize'))
  const monthlyCost = Math.round(weeklyAdminHours * 4 * hourlyRate)
  const annualCost = monthlyCost * 12

  let grade: string
  let gradeColor: 'green' | 'amber' | 'red'
  let gradeDesc: string

  if (adminTaxPct < 25) {
    grade = 'Healthy'
    gradeColor = 'green'
    gradeDesc = 'Your team has a relatively low administrative burden. Focus on maintaining this as you scale.'
  } else if (adminTaxPct < 45) {
    grade = 'Moderate overhead'
    gradeColor = 'amber'
    gradeDesc = 'There is meaningful capacity being lost to administrative work. Targeted improvements could reclaim significant time.'
  } else if (adminTaxPct < 65) {
    grade = 'High overhead'
    gradeColor = 'red'
    gradeDesc = "A significant portion of your team's capacity is going to low-ROI work. This is costing you real money every month."
  } else {
    grade = 'Critical overhead'
    gradeColor = 'red'
    gradeDesc = 'Your team is spending the majority of its time on administrative work. This requires immediate attention.'
  }

  return {
    adminTaxPct,
    grade,
    gradeColor,
    gradeDesc,
    weeklyAdminHours,
    monthlyCost,
    annualCost,
    meetingVal: Math.round((n(answers, 'meetingTax') + n(answers, 'asyncTax')) * 0.55),
    adminVal: Math.round((n(answers, 'adminTax') + n(answers, 'processTax')) * 0.55),
    mismatchVal: Math.round(n(answers, 'mismatchTax') * 0.55),
    reactiveVal: Math.round(n(answers, 'strategicTax') * 0.55),
  }
}

function getSignals(answers: AnswerMap) {
  const signals: { severity: 'HIGH' | 'MEDIUM'; title: string; body: string }[] = []
  if ((n(answers, 'meetingTax') + n(answers, 'asyncTax')) * 0.55 > 20) {
    signals.push({
      severity: 'HIGH',
      title: 'Meeting overload detected',
      body: "Your team is spending more than 20% of capacity in meetings, many of which could be handled asynchronously.",
    })
  }
  if ((n(answers, 'adminTax') + n(answers, 'processTax')) * 0.55 > 15) {
    signals.push({
      severity: 'HIGH',
      title: 'Manual process bottleneck',
      body: 'Recurring manual processes are draining capacity that should go to higher-value work.',
    })
  }
  if (n(answers, 'mismatchTax') * 0.55 > 15) {
    signals.push({
      severity: 'MEDIUM',
      title: 'Role-to-work misalignment',
      body: "Senior people are regularly pulled into work that doesn't match their value level.",
    })
  }
  if (n(answers, 'strategicTax') * 0.55 > 15) {
    signals.push({
      severity: 'MEDIUM',
      title: 'Strategic work consistently deprioritized',
      body: 'Your team is stuck in reactive mode, unable to protect time for high-ROI work.',
    })
  }
  return signals.slice(0, 3)
}

function getRecs(answers: AnswerMap) {
  const meetingOverload = (n(answers, 'meetingTax') + n(answers, 'asyncTax')) * 0.55 > 20
  const manualProcess = (n(answers, 'adminTax') + n(answers, 'processTax')) * 0.55 > 15
  const mismatch = n(answers, 'mismatchTax') * 0.55 > 15

  const recs: { badge: string; badgeClass: string; title: string; body: string }[] = []

  if (meetingOverload) {
    recs.push({
      badge: 'Do this week',
      badgeClass: 'bg-purple-100 text-purple-700',
      title: 'Audit your recurring meetings',
      body: "Cancel or convert to async any recurring meeting that doesn't require real-time discussion. Start with the ones that happen most frequently.",
    })
  }
  if (manualProcess) {
    recs.push({
      badge: 'This month',
      badgeClass: 'bg-amber-100 text-amber-700',
      title: 'Map and eliminate your top 3 manual processes',
      body: 'List every process your team repeats weekly. Pick the 3 that take the most time and automate, delegate, or eliminate them.',
    })
  }
  if (mismatch) {
    recs.push({
      badge: 'This quarter',
      badgeClass: 'bg-green-100 text-green-700',
      title: 'Audit role-to-work alignment',
      body: "For each team member, map what they actually do vs what their role is designed for. Redistribute work that doesn't match.",
    })
  }
  if (recs.length < 3) {
    recs.push({
      badge: 'Ongoing',
      badgeClass: 'bg-gray-100 text-gray-600',
      title: 'Protect strategic work with time blocks',
      body: "Dedicate at least 20% of each team member's week to strategic, uninterrupted work. Make it non-negotiable on the calendar.",
    })
  }
  return recs.slice(0, 3)
}

async function saveResults(answers: AnswerMap, results: CalcResults) {
  try {
    await fetch('/api/calculator/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        teamSize: answers.teamSize,
        annualSalary: answers.annualSalary,
        adminTaxPct: results.adminTaxPct,
        monthlyCost: results.monthlyCost,
        annualCost: results.annualCost,
        userType: answers.userType,
      }),
    })
  } catch {
    // Fail silently — never block UX
  }
}

// ── Option row component ──────────────────────────────────────────────────

function OptionRow({
  label,
  sublabel,
  selected,
  onSelect,
}: {
  label: string
  sublabel?: string
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all text-left cursor-pointer ${
        selected
          ? 'border-purple-500 bg-purple-50'
          : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50/30'
      }`}
    >
      <div
        className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
          selected ? 'border-purple-500 bg-purple-500' : 'border-gray-300'
        }`}
      >
        {selected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
      </div>
      <span className="flex-1 text-sm font-medium text-gray-900">{label}</span>
      {sublabel && <span className="text-xs text-gray-400 shrink-0">{sublabel}</span>}
    </button>
  )
}

// ── Main component ────────────────────────────────────────────────────────

export default function CalculatorClient() {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<AnswerMap>({
    teamSize: null,
    annualSalary: null,
    meetingTax: null,
    asyncTax: null,
    adminTax: null,
    processTax: null,
    mismatchTax: null,
    strategicTax: null,
    userType: null,
  })
  const [results, setResults] = useState<CalcResults | null>(null)
  const [copied, setCopied] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  const currentStep = STEPS[step - 1]
  const isStepComplete = currentStep.questions.every(q => answers[q.id] !== null)

  function setAnswer(id: string, value: number | string) {
    setAnswers(prev => ({ ...prev, [id]: value }))
  }

  function handleNext() {
    if (step < 5) setStep(s => s + 1)
  }

  function handleBack() {
    if (step > 1) setStep(s => s - 1)
  }

  function handleSubmit() {
    const r = calculate(answers)
    setResults(r)
    saveResults(answers, r)
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  async function handleCopy() {
    await navigator.clipboard.writeText('https://www.getreclaimapp.com/calculator')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Derived result values (safe to compute even before results exist)
  const signals = results ? getSignals(answers) : []
  const recs = results ? getRecs(answers) : []
  const bars = results
    ? [
        { label: 'Meeting overhead', val: results.meetingVal },
        { label: 'Manual admin work', val: results.adminVal },
        { label: 'Role misalignment', val: results.mismatchVal },
        { label: 'Reactive mode', val: results.reactiveVal },
      ].filter(b => b.val > 0)
    : []
  const maxBarVal = bars.length > 0 ? Math.max(...bars.map(b => b.val)) : 1

  return (
    <div>
      {/* ── FORM CARD ─────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

        {/* Progress bar */}
        <div className="h-1.5 bg-gray-100">
          <div
            className="h-full transition-all duration-500 ease-out"
            style={{ width: `${((step - 1) / 5) * 100}%`, backgroundColor: BRAND }}
          />
        </div>

        <div className="p-8">
          {/* Step dots */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {STEPS.map((_, i) => {
              const isDone = step > i + 1
              const isActive = step === i + 1
              return (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isDone ? 'w-4 bg-purple-600' : isActive ? 'w-8 bg-purple-600' : 'w-4 bg-gray-200'
                  }`}
                />
              )
            })}
          </div>

          {/* Step label */}
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: BRAND }}>
            Step {step} of 5 — {currentStep.label}
          </p>
          <h2 className="text-2xl font-black text-gray-900 mb-2">{currentStep.title}</h2>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed">{currentStep.sub}</p>

          {/* Questions */}
          <div className="space-y-8">
            {currentStep.questions.map(q => (
              <div key={q.id}>
                <p className="text-sm font-semibold text-gray-900 mb-3">{q.label}</p>
                <div className="space-y-2">
                  {q.options.map(opt => (
                    <OptionRow
                      key={String(opt.value)}
                      label={opt.label}
                      sublabel={opt.sub}
                      selected={answers[q.id] === opt.value}
                      onSelect={() => setAnswer(q.id, opt.value)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex gap-3 mt-10">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-sm hover:border-gray-300 transition-colors"
              >
                Back
              </button>
            )}
            {step < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!isStepComplete}
                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
                  isStepComplete
                    ? 'text-white hover:opacity-90'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                style={isStepComplete ? { backgroundColor: BRAND } : {}}
              >
                Next →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isStepComplete}
                className={`flex-1 py-3.5 rounded-xl font-black text-sm transition-all ${
                  isStepComplete
                    ? 'text-white hover:opacity-90'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                style={isStepComplete ? { backgroundColor: BRAND } : {}}
              >
                See my results →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── RESULTS ───────────────────────────────────────────────────── */}
      {results && (
        <div ref={resultsRef} className="mt-10 space-y-5 scroll-mt-8">

          {/* BLOCK 1 — Score hero */}
          <div className="rounded-2xl p-10 text-center" style={{ backgroundColor: '#EEEDFE' }}>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
              Your administrative tax score
            </p>
            <p
              className="font-black leading-none mb-4"
              style={{ fontSize: 80, color: BRAND }}
            >
              {results.adminTaxPct}%
            </p>
            <span
              className={`inline-block text-xs font-black px-4 py-2 rounded-full uppercase tracking-wider mb-5 ${
                results.gradeColor === 'green'
                  ? 'bg-green-100 text-green-700'
                  : results.gradeColor === 'amber'
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {results.grade}
            </span>
            <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">
              {results.gradeDesc}
            </p>
          </div>

          {/* BLOCK 2 — Three metric cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { value: fmtDollar(results.monthlyCost), label: 'Monthly cost of admin overhead' },
              { value: `${results.weeklyAdminHours} hrs`, label: 'Hours lost per week' },
              { value: fmtDollar(results.annualCost), label: 'Annual capacity cost' },
            ].map(({ value, label }) => (
              <div key={label} className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100">
                <p className="text-3xl font-black text-gray-900 mb-1">{value}</p>
                <p className="text-xs text-gray-400 leading-snug">{label}</p>
              </div>
            ))}
          </div>

          {/* BLOCK 3 — Breakdown bars */}
          {bars.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 p-7">
              <h3 className="font-black text-gray-900 mb-6">
                Where your administrative tax comes from
              </h3>
              <div className="space-y-4">
                {bars.map(({ label, val }) => (
                  <div key={label} className="flex items-center gap-4">
                    <p className="text-sm text-gray-600 w-36 shrink-0">{label}</p>
                    <div className="flex-1 bg-gray-100 rounded-full h-3">
                      <div
                        className="h-3 rounded-full transition-all duration-700"
                        style={{
                          width: `${(val / maxBarVal) * 100}%`,
                          backgroundColor: BRAND,
                        }}
                      />
                    </div>
                    <p className="text-sm font-bold w-9 text-right shrink-0" style={{ color: BRAND }}>
                      {val}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BLOCK 4 — Risk signals */}
          <div className="bg-white rounded-2xl border border-gray-200 p-7">
            <h3 className="font-black text-gray-900 mb-5">Risk signals detected</h3>
            {signals.length === 0 ? (
              <div className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 mt-1 shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">No critical risks detected</p>
                  <p className="text-gray-500 text-sm mt-1">
                    Your team appears well-structured. Monitor as you scale.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                {signals.map(signal => (
                  <div key={signal.title} className="flex items-start gap-3">
                    <div
                      className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${
                        signal.severity === 'HIGH' ? 'bg-red-500' : 'bg-amber-500'
                      }`}
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="font-semibold text-gray-900 text-sm">{signal.title}</p>
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                            signal.severity === 'HIGH'
                              ? 'bg-red-100 text-red-600'
                              : 'bg-amber-100 text-amber-600'
                          }`}
                        >
                          {signal.severity}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed">{signal.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* BLOCK 5 — Recommendations */}
          <div className="bg-white rounded-2xl border border-gray-200 p-7">
            <h3 className="font-black text-gray-900 mb-5">Top recommendations</h3>
            <div className="space-y-0">
              {recs.map((rec, i) => (
                <div
                  key={rec.title}
                  className={`py-5 ${i > 0 ? 'border-t border-gray-100' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full shrink-0 mt-0.5 whitespace-nowrap ${rec.badgeClass}`}
                    >
                      {rec.badge}
                    </span>
                    <div>
                      <p className="font-bold text-gray-900 text-sm mb-1">{rec.title}</p>
                      <p className="text-gray-500 text-sm leading-relaxed">{rec.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BLOCK 6 — Upsell */}
          <div className="rounded-2xl p-8 text-center" style={{ backgroundColor: '#26215C' }}>
            <h3 className="text-xl font-black text-white mb-3">
              Want a deeper analysis in 60 seconds?
            </h3>
            <p className="text-sm mb-8 max-w-md mx-auto leading-relaxed" style={{ color: '#A9A4E0' }}>
              The AI-powered capacity audit goes further — using your real Google Calendar data to
              produce a precise, personalized audit and a leadership-ready weekly ops brief.
              Free to start.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center font-black px-6 py-3.5 rounded-xl transition-all hover:opacity-90"
                style={{ backgroundColor: '#EEEDFE', color: BRAND }}
              >
                Run AI audit — free
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center font-semibold px-6 py-3.5 rounded-xl border transition-all hover:bg-white/10"
                style={{ borderColor: '#7B72D6', color: '#A9A4E0' }}
              >
                Book a consultation
              </Link>
            </div>
            <p className="text-xs" style={{ color: '#7B72D6' }}>
              Already using RECLAIM?{' '}
              <Link
                href="/login"
                className="underline underline-offset-2 hover:text-white transition-colors"
              >
                Log in to run your AI audit →
              </Link>
            </p>
          </div>

          {/* BLOCK 7 — Share */}
          <div className="bg-white rounded-2xl border border-gray-200 p-7">
            <h3 className="font-bold text-gray-900 mb-4 text-sm">Share this calculator</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fwww.getreclaimapp.com%2Fcalculator"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 font-semibold px-5 py-3 rounded-xl border-2 border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50 transition-all text-sm"
              >
                <span className="font-black text-blue-700 text-xs bg-blue-100 px-1.5 py-0.5 rounded">
                  in
                </span>
                Share on LinkedIn
              </a>
              <button
                type="button"
                onClick={handleCopy}
                className="flex-1 flex items-center justify-center gap-2 font-semibold px-5 py-3 rounded-xl border-2 border-gray-200 text-gray-700 hover:border-purple-300 hover:bg-purple-50 transition-all text-sm"
              >
                {copied ? '✓ Copied!' : 'Copy link'}
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  )
}
