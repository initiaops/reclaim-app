'use client'

import { useState, useEffect, useRef } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

type BusinessModel = 'B2C' | 'B2B' | 'BOTH' | ''

interface AuditAnswers {
  businessModel: BusinessModel
  businessType: string
  otherText: string
  templateAnswers: Record<string, string | string[]>
  meetingHours: number
  adminHours: number
  coreWorkHours: number
  marketingHours: number
  managementHours: number
  workOnBusiness: string
  hoursPerWeek: string
  hourlyRate: string
  monthlyRevenue: string
  teamSizeAnswer: string
  freeText: string
}

interface Question {
  id: string
  label: string
  type: 'single' | 'multi'
  options: string[]
}

interface Props {
  calendarConnected: boolean
  loading: boolean
  onComplete: (prompt: string) => void
  onSwitchToManual: () => void
}

// ─── Business type lists ──────────────────────────────────────────────────────

const B2C_TYPES = [
  { label: 'Retail store', sub: 'Clothing, liquor, hardware, gifts, specialty' },
  { label: 'Food & beverage', sub: 'Restaurant, café, bar, catering, food truck' },
  { label: 'Personal services', sub: 'Hair, fitness, cleaning, childcare, tutoring' },
  { label: 'Trades & home services', sub: 'Contractor, plumber, electrician, landscaper' },
  { label: 'Health & wellness', sub: 'Therapist, coach, chiropractor, personal trainer' },
  { label: 'Creative services', sub: 'Photographer, videographer, designer' },
  { label: 'Other B2C', sub: 'Something else — describe it below' },
]

const B2B_TYPES = [
  { label: 'Consulting', sub: 'Strategy, ops, finance, HR, legal — project based' },
  { label: 'Agency', sub: 'Marketing, design, PR, development, video' },
  { label: 'Technology / SaaS', sub: 'Software product sold to businesses' },
  { label: 'Professional services', sub: 'Accountant, lawyer, financial advisor' },
  { label: 'Trades & facilities', sub: 'Commercial contractor, IT support, maintenance' },
  { label: 'Staffing & recruiting', sub: 'Placement, staffing, executive search' },
  { label: 'Other B2B', sub: 'Something else — describe it below' },
]

const BOTH_TYPES = [
  { label: 'Wholesale / distribution', sub: 'Selling to both retailers and direct' },
  { label: 'Real estate', sub: 'Agent, property management, investor' },
  { label: 'Health & medical', sub: 'Clinic, dental, therapy — insurance + direct pay' },
  { label: 'Education', sub: 'Tutoring center, training company, e-learning' },
  { label: 'Other mixed model', sub: 'Something else — describe it below' },
]

// ─── Template questions ───────────────────────────────────────────────────────

const RETAIL_QUESTIONS: Question[] = [
  {
    id: 'pain_points',
    label: 'Which of these takes more of your time than it should right now?',
    type: 'multi',
    options: [
      'Managing supplier and vendor relationships',
      'Inventory counting and ordering',
      'Staff scheduling and no-shows',
      'Social media and marketing',
      'Bookkeeping and financial admin',
      'Handling customer complaints or returns',
      'Store layout and merchandising',
      'Chasing payments or invoices',
    ],
  },
  {
    id: 'inventory_management',
    label: 'How do you currently manage inventory?',
    type: 'single',
    options: [
      'I count manually and order from memory or feel',
      'I use a spreadsheet',
      'I have a POS system that tracks it',
      "Honestly — I'm never quite sure what I have",
    ],
  },
  {
    id: 'supplier_contact',
    label: 'How do your suppliers and vendors typically reach you?',
    type: 'single',
    options: [
      "They call me whenever — I'm always available",
      "I have set times but they don't always respect them",
      'I reach out to them on my schedule',
      "It's chaotic — calls come in all day",
    ],
  },
  {
    id: 'stock_outs',
    label: 'How often do you run out of something you should have in stock?',
    type: 'single',
    options: [
      'Rarely — I have a good handle on it',
      'Sometimes — maybe once or twice a month',
      "Often — it's a regular problem",
      'Constantly — it costs me sales',
    ],
  },
  {
    id: 'staff_scheduling',
    label: 'How do you handle staff scheduling?',
    type: 'single',
    options: [
      "I don't have staff — it's just me",
      'Text messages and phone calls',
      'Paper schedule on the wall',
      'Scheduling app or software',
      'It changes constantly and causes stress',
    ],
  },
  {
    id: 'growth_blockers',
    label: "What keeps getting pushed to 'when things calm down'?",
    type: 'multi',
    options: [
      'Building better supplier relationships',
      'Running promotions or events',
      'Improving store layout or merchandising',
      'Training staff',
      'Reviewing pricing and margins',
      'Marketing and social media strategy',
      'Getting my books properly organized',
    ],
  },
  {
    id: 'work_on_business',
    label: 'When was the last time you worked ON your business instead of IN it?',
    type: 'single',
    options: [
      'Regularly — I protect time for this',
      'This month',
      'A few months ago',
      "I honestly can't remember",
    ],
  },
]

const FOOD_QUESTIONS: Question[] = [
  {
    id: 'operation_type',
    label: 'What type of operation do you run?',
    type: 'single',
    options: [
      'Sit-down restaurant',
      'Fast casual or quick service',
      'Café or coffee shop',
      'Bar or brewery',
      'Catering business',
      'Food truck',
      'Multiple of the above',
    ],
  },
  {
    id: 'pain_points',
    label: 'Which of these takes more time than it should?',
    type: 'multi',
    options: [
      'Staff scheduling and last-minute no-shows',
      'Supplier and vendor orders',
      'Managing food waste and inventory',
      'Customer complaints and reviews',
      'Social media and marketing',
      'Bookkeeping and payroll',
      'Menu planning and costing',
      'Managing reservations and waitlists',
    ],
  },
  {
    id: 'staff_scheduling',
    label: 'How do you currently handle staff scheduling?',
    type: 'single',
    options: [
      'Paper schedule posted in the kitchen',
      'Group text or WhatsApp',
      'Scheduling app',
      "It's a constant fire drill",
    ],
  },
  {
    id: 'supplier_orders',
    label: 'How do you manage supplier orders?',
    type: 'single',
    options: [
      'I call or text each rep separately when I run low',
      'I have set order days for each supplier',
      'I use an ordering system',
      "It's reactive — I order when I'm almost out",
    ],
  },
  {
    id: 'biggest_headache',
    label: "What's your biggest operational headache right now?",
    type: 'single',
    options: [
      'Staff reliability and no-shows',
      'Food waste and over-ordering',
      'Inconsistent prep and quality control',
      'Supplier reliability and delivery issues',
      'Cash flow and margins',
      'All of the above honestly',
    ],
  },
  {
    id: 'growth_blockers',
    label: "What keeps getting pushed to 'when things calm down'?",
    type: 'multi',
    options: [
      'Menu development and costing',
      'Staff training and standards',
      'Marketing and social media',
      'Loyalty programs or events',
      'Reviewing supplier contracts and pricing',
      'Getting financial reporting organized',
    ],
  },
  {
    id: 'work_on_business',
    label: 'When was the last time you worked ON your business instead of IN it?',
    type: 'single',
    options: [
      'Regularly — I protect time for this',
      'This month',
      'A few months ago',
      "I honestly can't remember",
    ],
  },
]

const TRADES_QUESTIONS: Question[] = [
  {
    id: 'trade_type',
    label: 'What type of work do you do?',
    type: 'single',
    options: [
      'General contractor',
      'Plumber',
      'Electrician',
      'HVAC technician',
      'Landscaper or lawn care',
      'Cleaner or cleaning service',
      'Painter',
      'Handyman',
      'Other trades',
    ],
  },
  {
    id: 'crew_size',
    label: 'Do you work alone or do you have a crew?',
    type: 'single',
    options: [
      'Just me — solo operator',
      'Me plus 1-2 people',
      'Small crew of 3-5',
      'Larger crew of 6+',
    ],
  },
  {
    id: 'job_schedule',
    label: 'How do you currently manage your job schedule?',
    type: 'single',
    options: [
      "It's all in my head",
      'Paper calendar or notebook',
      'Phone calls and texts back and forth',
      'Spreadsheet',
      'Scheduling software',
    ],
  },
  {
    id: 'time_drains',
    label: 'Which of these takes more time than it should?',
    type: 'multi',
    options: [
      'Writing quotes and estimates',
      'Scheduling and rescheduling jobs',
      'Chasing customers for payment',
      'Buying and picking up materials',
      'Coordinating subcontractors',
      'Returning customer calls and messages',
      'Bookkeeping and invoicing',
      'Finding new customers',
    ],
  },
  {
    id: 'lead_time',
    label: 'How long from a customer inquiry to a confirmed booked job?',
    type: 'single',
    options: [
      'Same day — I respond fast',
      '1-3 days',
      'About a week',
      'Too long — I know I lose jobs because of it',
    ],
  },
  {
    id: 'invoicing',
    label: 'How do you currently handle invoicing and getting paid?',
    type: 'single',
    options: [
      'Cash or check on the day',
      'I send invoices but chasing payment takes time',
      'I use a payment app or software',
      'Getting paid is a constant headache',
    ],
  },
  {
    id: 'growth_blockers',
    label: "What keeps getting pushed to 'when things calm down'?",
    type: 'multi',
    options: [
      'Following up with past customers',
      'Getting better at quoting jobs accurately',
      'Marketing and getting more leads',
      'Building relationships with suppliers for better pricing',
      'Hiring or training better help',
      'Getting my finances properly organized',
    ],
  },
  {
    id: 'work_on_business',
    label: 'When was the last time you worked ON your business instead of IN it?',
    type: 'single',
    options: [
      'Regularly — I protect time for this',
      'This month',
      'A few months ago',
      "I honestly can't remember",
    ],
  },
]

const CONSULTING_QUESTIONS: Question[] = [
  {
    id: 'consulting_type',
    label: 'What type of consulting do you do?',
    type: 'single',
    options: [
      'Strategy and business consulting',
      'Operations and process improvement',
      'Finance and accounting advisory',
      'HR and people consulting',
      'IT and technology consulting',
      'Marketing and growth consulting',
      'Legal or compliance advisory',
      'Other consulting',
    ],
  },
  {
    id: 'operation_model',
    label: 'How do you operate?',
    type: 'single',
    options: [
      'Solo — just me',
      'Me plus a few contractors or freelancers',
      'Small team of full-time employees',
    ],
  },
  {
    id: 'active_clients',
    label: 'How many active client engagements do you have right now?',
    type: 'single',
    options: ['1-2 clients', '3-5 clients', '6-10 clients', 'More than 10'],
  },
  {
    id: 'time_drains',
    label: 'Which of these takes more time than it should?',
    type: 'multi',
    options: [
      'Writing proposals and scoping new work',
      'Client communication and status updates',
      'Project tracking and deliverable management',
      'Invoicing and chasing payment',
      'Business development and finding new clients',
      'Reporting and documentation',
      'Internal admin and bookkeeping',
      'Managing contractors or subcontractors',
    ],
  },
  {
    id: 'project_tracking',
    label: 'How do you currently track project progress and deliverables?',
    type: 'single',
    options: [
      'Email threads and memory',
      'Spreadsheet',
      'Project management tool',
      'It varies by client — no consistent system',
    ],
  },
  {
    id: 'billable_pct',
    label: 'What percentage of your week goes to billable work vs everything else?',
    type: 'single',
    options: [
      'More than 80% billable — very efficient',
      '60-80% billable',
      '40-60% billable',
      'Less than 40% billable — admin is eating my time',
    ],
  },
  {
    id: 'new_business',
    label: 'How do you currently win new business?',
    type: 'single',
    options: [
      'Almost entirely referrals',
      'Mix of referrals and outbound',
      'Mostly outbound and marketing',
      'New business development is a constant struggle',
    ],
  },
  {
    id: 'growth_blockers',
    label: "What keeps getting pushed to 'when things calm down'?",
    type: 'multi',
    options: [
      'Raising my rates',
      'Building a more repeatable sales process',
      'Creating thought leadership content',
      'Developing a productized service offering',
      'Hiring or bringing on support',
      'Getting my processes and templates organized',
    ],
  },
  {
    id: 'work_on_business',
    label: 'When was the last time you worked ON your business instead of IN it?',
    type: 'single',
    options: [
      'Regularly — I protect time for this',
      'This month',
      'A few months ago',
      "I honestly can't remember",
    ],
  },
]

const AGENCY_QUESTIONS: Question[] = [
  {
    id: 'agency_type',
    label: 'What type of agency are you?',
    type: 'single',
    options: [
      'Marketing agency',
      'Design or creative studio',
      'PR or communications agency',
      'Development or tech agency',
      'Video or content production',
      'Full-service agency',
      'Other',
    ],
  },
  {
    id: 'team_size_agency',
    label: 'How big is your team?',
    type: 'single',
    options: ['Just me — solo', '2-5 people', '6-15 people', '16-30 people', '30+ people'],
  },
  {
    id: 'active_accounts',
    label: 'How many active client accounts are you managing right now?',
    type: 'single',
    options: ['1-3 clients', '4-8 clients', '9-15 clients', 'More than 15'],
  },
  {
    id: 'time_drains',
    label: 'Which of these takes more time than it should?',
    type: 'multi',
    options: [
      'Client communication and status updates',
      'Reporting and analytics for clients',
      'Internal project management and handoffs',
      'Scope creep and change requests',
      'New business pitches and proposals',
      'Hiring and onboarding',
      'Internal meetings and team coordination',
      'Invoicing and finance',
    ],
  },
  {
    id: 'client_reporting',
    label: 'How do you handle client reporting?',
    type: 'single',
    options: [
      'Manual every time — built from scratch',
      "We have templates but it's still time-consuming",
      'Mostly automated',
      "Clients don't really ask — we're behind on this",
    ],
  },
  {
    id: 'biggest_pain',
    label: "What's your biggest operational pain right now?",
    type: 'single',
    options: [
      'Too many client touchpoints eating team time',
      "Team capacity — we're stretched too thin",
      'Inconsistent processes across accounts',
      'Scope creep destroying margins',
      'Difficulty scaling without quality dropping',
      'Cash flow and late payments',
    ],
  },
  {
    id: 'new_business',
    label: 'How do you currently win new business?',
    type: 'single',
    options: [
      'Almost entirely referrals',
      'Mix of referrals and outbound',
      'Active marketing and lead generation',
      'New business is a constant struggle',
    ],
  },
  {
    id: 'growth_blockers',
    label: "What keeps getting pushed to 'when things calm down'?",
    type: 'multi',
    options: [
      'Systematizing and documenting processes',
      'Building a stronger new business pipeline',
      'Improving team onboarding and training',
      'Developing better reporting systems',
      'Raising rates or restructuring pricing',
      'Hiring ahead of demand',
    ],
  },
  {
    id: 'work_on_business',
    label: 'When was the last time you worked ON your business instead of IN it?',
    type: 'single',
    options: [
      'Regularly — I protect time for this',
      'This month',
      'A few months ago',
      "I honestly can't remember",
    ],
  },
]

// ─── Template routing ─────────────────────────────────────────────────────────

function getTemplate(businessType: string): Question[] | null {
  if (businessType === 'Retail store') return RETAIL_QUESTIONS
  if (businessType === 'Food & beverage') return FOOD_QUESTIONS
  if (businessType === 'Trades & home services') return TRADES_QUESTIONS
  if (businessType === 'Consulting') return CONSULTING_QUESTIONS
  if (businessType === 'Agency') return AGENCY_QUESTIONS
  return null
}

function isOtherType(t: string) {
  return ['Other B2C', 'Other B2B', 'Other mixed model'].includes(t)
}

function needsCalendar(businessModel: BusinessModel, businessType: string) {
  if (businessModel === 'B2B' || businessModel === 'BOTH') return true
  const calendarTypes = ['Consulting', 'Agency', 'Technology / SaaS', 'Professional services']
  return calendarTypes.includes(businessType)
}

// ─── Prompt assembly ──────────────────────────────────────────────────────────

function assembleTemplateAnswers(
  businessType: string,
  answers: Record<string, string | string[]>
): string {
  const lines: string[] = []
  const fmt = (id: string, label: string) => {
    const v = answers[id]
    if (!v || (Array.isArray(v) && v.length === 0)) return
    lines.push(`${label}: ${Array.isArray(v) ? v.join(', ') : v}`)
  }

  if (businessType === 'Retail store') {
    fmt('pain_points', 'Biggest time drains')
    fmt('inventory_management', 'Inventory management approach')
    fmt('supplier_contact', 'How suppliers reach them')
    fmt('stock_outs', 'Stock-out frequency')
    fmt('staff_scheduling', 'Staff scheduling method')
    fmt('growth_blockers', 'What keeps getting deferred')
    fmt('work_on_business', 'Last time worked on (not in) business')
  } else if (businessType === 'Food & beverage') {
    fmt('operation_type', 'Operation type')
    fmt('pain_points', 'Biggest time drains')
    fmt('staff_scheduling', 'Staff scheduling method')
    fmt('supplier_orders', 'Supplier order management')
    fmt('biggest_headache', 'Biggest operational headache')
    fmt('growth_blockers', 'What keeps getting deferred')
    fmt('work_on_business', 'Last time worked on (not in) business')
  } else if (businessType === 'Trades & home services') {
    fmt('trade_type', 'Type of trade work')
    fmt('crew_size', 'Crew size')
    fmt('job_schedule', 'Job scheduling method')
    fmt('time_drains', 'Biggest time drains')
    fmt('lead_time', 'Inquiry to booked job time')
    fmt('invoicing', 'Invoicing and payment approach')
    fmt('growth_blockers', 'What keeps getting deferred')
    fmt('work_on_business', 'Last time worked on (not in) business')
  } else if (businessType === 'Consulting') {
    fmt('consulting_type', 'Type of consulting')
    fmt('operation_model', 'How they operate')
    fmt('active_clients', 'Active client engagements')
    fmt('time_drains', 'Biggest time drains')
    fmt('project_tracking', 'Project tracking approach')
    fmt('billable_pct', 'Billable vs non-billable split')
    fmt('new_business', 'How new business is won')
    fmt('growth_blockers', 'What keeps getting deferred')
    fmt('work_on_business', 'Last time worked on (not in) business')
  } else if (businessType === 'Agency') {
    fmt('agency_type', 'Agency type')
    fmt('team_size_agency', 'Team size')
    fmt('active_accounts', 'Active client accounts')
    fmt('time_drains', 'Biggest time drains')
    fmt('client_reporting', 'Client reporting approach')
    fmt('biggest_pain', 'Biggest operational pain')
    fmt('new_business', 'How new business is won')
    fmt('growth_blockers', 'What keeps getting deferred')
    fmt('work_on_business', 'Last time worked on (not in) business')
  }

  return lines.join('\n')
}

function assemblePrompt(answers: AuditAnswers, calendarConnected: boolean): string {
  const total =
    answers.meetingHours +
    answers.adminHours +
    answers.coreWorkHours +
    answers.marketingHours +
    answers.managementHours

  const hasTemplate = !!getTemplate(answers.businessType) && !isOtherType(answers.businessType)
  const templateSection = hasTemplate
    ? assembleTemplateAnswers(answers.businessType, answers.templateAnswers)
    : `Business description: ${answers.otherText || 'Not provided'}`

  return `BUSINESS CONTEXT:
Business model: ${answers.businessModel}
Business type: ${answers.businessType}
Team size: ${answers.teamSizeAnswer || 'Not specified'}
Monthly revenue: ${answers.monthlyRevenue || 'Not specified'}
Hours worked per week: ${answers.hoursPerWeek || 'Not specified'}
Hourly value: ${answers.hourlyRate || 'Not specified'}

WEEK BREAKDOWN (self-reported hours):
Meetings and calls: ${answers.meetingHours} hrs/week
Admin work: ${answers.adminHours} hrs/week
Core billable/revenue work: ${answers.coreWorkHours} hrs/week
Marketing and sales: ${answers.marketingHours} hrs/week
Management and coordination: ${answers.managementHours} hrs/week
Total: ${total} hrs/week

INDUSTRY-SPECIFIC ANSWERS:
${templateSection}

LAST TIME WORKED ON BUSINESS (not in it):
${answers.workOnBusiness || 'Not answered'}

ADDITIONAL CONTEXT:
${answers.freeText || 'None provided'}

${calendarConnected
  ? 'Google Calendar is connected — use calendar data in analysis.'
  : 'No calendar connected — use self-reported data only.'}

Using all of the above, generate a highly specific audit for this exact business type and situation. Every recommendation must reference their specific context. Every dollar figure must be calculated from their actual hourly rate and revenue figures above.`
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SingleSelect({
  question,
  value,
  onChange,
}: {
  question: Question
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-gray-800 mb-3">{question.label}</p>
      <div className="space-y-2">
        {question.options.map(opt => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
              value === opt
                ? 'border-purple-500 bg-purple-50 text-purple-900 font-semibold'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${
                  value === opt ? 'border-purple-500' : 'border-gray-300'
                }`}
              >
                {value === opt && <div className="w-2 h-2 rounded-full bg-purple-500" />}
              </div>
              {opt}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function MultiSelect({
  question,
  values,
  onChange,
}: {
  question: Question
  values: string[]
  onChange: (v: string[]) => void
}) {
  function toggle(opt: string) {
    onChange(values.includes(opt) ? values.filter(v => v !== opt) : [...values, opt])
  }
  return (
    <div>
      <p className="text-sm font-semibold text-gray-800 mb-1">{question.label}</p>
      <p className="text-xs text-gray-400 mb-3">Select all that apply</p>
      <div className="space-y-2">
        {question.options.map(opt => {
          const selected = values.includes(opt)
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                selected
                  ? 'border-purple-500 bg-purple-50 text-purple-900 font-semibold'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center ${
                    selected ? 'border-purple-500 bg-purple-500' : 'border-gray-300'
                  }`}
                >
                  {selected && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path
                        d="M1 4L3.5 6.5L9 1"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                {opt}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function HourInput({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (v: number) => void
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-gray-100 last:border-0">
      <label className="text-sm text-gray-700 flex-1">{label}</label>
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - 1))}
          className="w-8 h-8 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 flex items-center justify-center text-lg font-bold"
        >
          −
        </button>
        <span className="w-12 text-center text-sm font-bold text-gray-900">{value} hrs</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(40, value + 1))}
          className="w-8 h-8 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 flex items-center justify-center text-lg font-bold"
        >
          +
        </button>
      </div>
    </div>
  )
}

const LOADING_MESSAGES = [
  'Reading your business situation...',
  'Calculating your administrative tax...',
  'Identifying your biggest time drains...',
  'Building your recommendations...',
  'Almost ready...',
]

const SCREEN_NAMES = ['Business type', 'Your situation', 'Your week', 'Your numbers', 'Final details']

// ─── Main component ───────────────────────────────────────────────────────────

export default function AuditIntakeForm({
  calendarConnected,
  loading,
  onComplete,
  onSwitchToManual,
}: Props) {
  const [screen, setScreen] = useState(1)
  const [visible, setVisible] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const [msgIdx, setMsgIdx] = useState(0)
  const formRef = useRef<HTMLDivElement>(null)

  // Screen 1
  const [businessModel, setBusinessModel] = useState<BusinessModel>('')
  const [businessType, setBusinessType] = useState('')
  const [otherText, setOtherText] = useState('')

  // Screen 2
  const [templateAnswers, setTemplateAnswers] = useState<Record<string, string | string[]>>({})

  // Screen 3
  const [meetingHours, setMeetingHours] = useState(0)
  const [adminHours, setAdminHours] = useState(0)
  const [coreWorkHours, setCoreWorkHours] = useState(0)
  const [marketingHours, setMarketingHours] = useState(0)
  const [managementHours, setManagementHours] = useState(0)
  const [workOnBusiness, setWorkOnBusiness] = useState('')

  // Screen 4
  const [hoursPerWeek, setHoursPerWeek] = useState('')
  const [hourlyRate, setHourlyRate] = useState('')
  const [monthlyRevenue, setMonthlyRevenue] = useState('')
  const [teamSizeAnswer, setTeamSizeAnswer] = useState('')

  // Screen 5
  const [freeText, setFreeText] = useState('')

  // Cycle loading messages
  useEffect(() => {
    if (!loading) return
    const interval = setInterval(() => {
      setMsgIdx(i => (i + 1) % LOADING_MESSAGES.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [loading])

  function transition(toScreen: number) {
    setVisible(false)
    setTimeout(() => {
      setScreen(toScreen)
      setVisible(true)
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 200)
  }

  function setSingleAnswer(id: string, value: string) {
    setTemplateAnswers(prev => ({ ...prev, [id]: value }))
  }

  function setMultiAnswer(id: string, value: string[]) {
    setTemplateAnswers(prev => ({ ...prev, [id]: value }))
  }

  const totalHours = meetingHours + adminHours + coreWorkHours + marketingHours + managementHours

  const businessTypeOptions =
    businessModel === 'B2C' ? B2C_TYPES
    : businessModel === 'B2B' ? B2B_TYPES
    : businessModel === 'BOTH' ? BOTH_TYPES
    : []

  const template = businessType ? getTemplate(businessType) : null
  const isOther = isOtherType(businessType) || (businessType && !template && businessType !== '')
  const showCalendar = needsCalendar(businessModel, businessType)

  // Validation per screen
  const screen1Valid =
    !!businessModel &&
    !!businessType &&
    (!isOtherType(businessType) || otherText.trim().length > 0)

  const screen2Valid = (() => {
    if (!template) return otherText.trim().length > 10
    const answered = template.filter(q => {
      const v = templateAnswers[q.id]
      if (q.type === 'single') return typeof v === 'string' && v.length > 0
      return Array.isArray(v) && v.length > 0
    }).length
    return answered >= 3
  })()

  const screen3Valid = !!workOnBusiness

  const screen4Valid = !!hoursPerWeek && !!hourlyRate && !!teamSizeAnswer

  function handleGenerate() {
    const answers: AuditAnswers = {
      businessModel,
      businessType,
      otherText,
      templateAnswers,
      meetingHours,
      adminHours,
      coreWorkHours,
      marketingHours,
      managementHours,
      workOnBusiness,
      hoursPerWeek,
      hourlyRate,
      monthlyRevenue,
      teamSizeAnswer,
      freeText,
    }
    setSubmitted(true)
    onComplete(assemblePrompt(answers, calendarConnected))
  }

  const canAdvance = [true, screen1Valid, screen2Valid, screen3Valid, screen4Valid, true][screen]

  // ── Loading overlay ──────────────────────────────────────────────────────────
  if (loading && submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div
          className="w-10 h-10 rounded-full border-4 border-gray-200 border-t-purple-600 animate-spin mb-6"
        />
        <p className="text-sm font-semibold text-gray-700 mb-1 transition-all">
          {LOADING_MESSAGES[msgIdx]}
        </p>
        <p className="text-xs text-gray-400">Takes about 15 seconds</p>
      </div>
    )
  }

  // ── Progress bar ─────────────────────────────────────────────────────────────
  const progressBar = (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-gray-500">
          Step {screen} of 5 · {SCREEN_NAMES[screen - 1]}
        </span>
        <span className="text-xs text-gray-400">{Math.round((screen / 5) * 100)}%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-1.5">
        <div
          className="h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${(screen / 5) * 100}%`, backgroundColor: '#534AB7' }}
        />
      </div>
    </div>
  )

  // ── Nav buttons ──────────────────────────────────────────────────────────────
  const navButtons = (
    <div className="flex items-center gap-3 pt-2">
      {screen > 1 && (
        <button
          type="button"
          onClick={() => transition(screen - 1)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>
      )}
      {screen < 5 && (
        <button
          type="button"
          onClick={() => canAdvance && transition(screen + 1)}
          disabled={!canAdvance}
          className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
          style={{ backgroundColor: '#534AB7' }}
        >
          Continue →
        </button>
      )}
    </div>
  )

  // ── Screen 1 ─────────────────────────────────────────────────────────────────
  const screen1 = (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-black text-gray-900 mb-1">Let&apos;s understand your business</h2>
        <p className="text-sm text-gray-500">Two quick questions to make sure your audit is specific to your situation.</p>
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-800 mb-3">Who do you primarily sell to?</p>
        <div className="space-y-2">
          {([
            { value: 'B2C', label: 'Individual consumers', sub: 'Retail, food, services, trades' },
            { value: 'B2B', label: 'Other businesses', sub: 'Consulting, agencies, SaaS, B2B services' },
            { value: 'BOTH', label: 'Both — roughly equally', sub: 'Wholesale, real estate, mixed model' },
          ] as { value: BusinessModel; label: string; sub: string }[]).map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                setBusinessModel(opt.value)
                setBusinessType('')
                setOtherText('')
              }}
              className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm transition-all ${
                businessModel === opt.value
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-4 h-4 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center ${
                    businessModel === opt.value ? 'border-purple-500' : 'border-gray-300'
                  }`}
                >
                  {businessModel === opt.value && <div className="w-2 h-2 rounded-full bg-purple-500" />}
                </div>
                <div>
                  <p className={`font-semibold ${businessModel === opt.value ? 'text-purple-900' : 'text-gray-800'}`}>{opt.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{opt.sub}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {businessModel && (
        <div>
          <p className="text-sm font-semibold text-gray-800 mb-3">What best describes your business?</p>
          <div className="space-y-2">
            {businessTypeOptions.map(opt => (
              <button
                key={opt.label}
                type="button"
                onClick={() => {
                  setBusinessType(opt.label)
                  if (!isOtherType(opt.label)) setOtherText('')
                }}
                className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm transition-all ${
                  businessType === opt.label
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center ${
                      businessType === opt.label ? 'border-purple-500' : 'border-gray-300'
                    }`}
                  >
                    {businessType === opt.label && <div className="w-2 h-2 rounded-full bg-purple-500" />}
                  </div>
                  <div>
                    <p className={`font-semibold ${businessType === opt.label ? 'text-purple-900' : 'text-gray-800'}`}>{opt.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{opt.sub}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {isOtherType(businessType) && (
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tell us about your business in 2-3 sentences
              </label>
              <textarea
                value={otherText}
                onChange={e => setOtherText(e.target.value)}
                placeholder="E.g. I run a small bookkeeping firm serving 12 dental practices. I handle all client work myself plus one part-time contractor..."
                rows={3}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#534AB7' } as React.CSSProperties}
              />
            </div>
          )}
        </div>
      )}

      {navButtons}
    </div>
  )

  // ── Screen 2 ─────────────────────────────────────────────────────────────────
  const screen2 = (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-black text-gray-900 mb-1">Tell us about your {businessType}</h2>
        <p className="text-sm text-gray-500">Select everything that applies. No wrong answers.</p>
      </div>

      {template ? (
        <div className="space-y-6">
          {template.map(q => {
            const rawVal = templateAnswers[q.id]
            if (q.type === 'single') {
              return (
                <SingleSelect
                  key={q.id}
                  question={q}
                  value={typeof rawVal === 'string' ? rawVal : ''}
                  onChange={v => setSingleAnswer(q.id, v)}
                />
              )
            }
            return (
              <MultiSelect
                key={q.id}
                question={q}
                values={Array.isArray(rawVal) ? rawVal : []}
                onChange={v => setMultiAnswer(q.id, v)}
              />
            )
          })}
        </div>
      ) : (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Tell us about your business in 2-3 sentences. What do you do and who do you serve?
          </label>
          <textarea
            value={otherText}
            onChange={e => setOtherText(e.target.value)}
            placeholder="E.g. I run a small bookkeeping firm serving 12 dental practices. I handle all client work myself plus one part-time contractor..."
            rows={5}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2"
            style={{ '--tw-ring-color': '#534AB7' } as React.CSSProperties}
          />
          {!screen2Valid && otherText.length > 0 && otherText.length <= 10 && (
            <p className="text-xs text-amber-600 mt-2">Add a bit more detail for a better audit.</p>
          )}
        </div>
      )}

      {template && (
        <p className="text-xs text-gray-400">
          Answer at least 3 questions to continue.{' '}
          {(() => {
            const answered = template.filter(q => {
              const v = templateAnswers[q.id]
              if (q.type === 'single') return typeof v === 'string' && v.length > 0
              return Array.isArray(v) && v.length > 0
            }).length
            return answered < 3 ? `${answered} answered so far.` : null
          })()}
        </p>
      )}

      {navButtons}
    </div>
  )

  // ── Screen 3 ─────────────────────────────────────────────────────────────────
  const screen3 = (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-black text-gray-900 mb-1">What does your typical week look like?</h2>
        <p className="text-sm text-gray-500">Roughly estimate how your working hours break down. These don&apos;t need to add up perfectly.</p>
      </div>

      <div className="bg-gray-50 rounded-xl border border-gray-100 px-4">
        <HourInput label="Hours in meetings, calls, and check-ins" value={meetingHours} onChange={setMeetingHours} />
        <HourInput label="Hours on admin (emails, paperwork, scheduling, invoicing)" value={adminHours} onChange={setAdminHours} />
        <HourInput label="Hours doing the actual work you get paid for" value={coreWorkHours} onChange={setCoreWorkHours} />
        <HourInput label="Hours on marketing, sales, or finding new customers" value={marketingHours} onChange={setMarketingHours} />
        <HourInput label="Hours managing people, coordinating, or putting out fires" value={managementHours} onChange={setManagementHours} />
      </div>

      <div className={`rounded-xl px-4 py-3 text-sm font-semibold flex items-center justify-between ${
        totalHours > 70 ? 'bg-amber-50 border border-amber-200 text-amber-800'
        : totalHours < 20 && totalHours > 0 ? 'bg-blue-50 border border-blue-200 text-blue-800'
        : 'bg-gray-50 border border-gray-200 text-gray-700'
      }`}>
        <span>Total: {totalHours} hrs/week</span>
        {totalHours > 70 && (
          <span className="text-xs font-normal ml-2">That&apos;s a heavy week — RECLAIM will help you find where to cut.</span>
        )}
        {totalHours < 20 && totalHours > 0 && (
          <span className="text-xs font-normal ml-2">Make sure you&apos;ve counted everything — most owners work more than they realize.</span>
        )}
      </div>

      <div>
        <SingleSelect
          question={{
            id: 'work_on_business',
            label: 'When was the last time you spent a full morning working ON your business — strategy, growth, improvement — without getting pulled into day-to-day work?',
            type: 'single',
            options: [
              'Regularly — I protect time for this',
              'Within the last month',
              'A few months ago',
              "I genuinely can't remember the last time",
            ],
          }}
          value={workOnBusiness}
          onChange={setWorkOnBusiness}
        />
      </div>

      {navButtons}
    </div>
  )

  // ── Screen 4 ─────────────────────────────────────────────────────────────────
  const screen4 = (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-black text-gray-900 mb-1">A few quick numbers</h2>
        <p className="text-sm text-gray-500">These help us calculate the real dollar cost of your time drains. Estimates are fine.</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Roughly how many hours do you work per week?
        </label>
        <input
          type="number"
          min="1"
          max="100"
          value={hoursPerWeek}
          onChange={e => setHoursPerWeek(e.target.value)}
          placeholder="e.g. 50"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2"
          style={{ '--tw-ring-color': '#534AB7' } as React.CSSProperties}
        />
      </div>

      <SingleSelect
        question={{
          id: 'hourly_rate',
          label: "What's your approximate hourly value to the business? (What you charge clients, or what your time is worth)",
          type: 'single',
          options: [
            'Under $25/hour',
            '$25 – $50/hour',
            '$50 – $100/hour',
            '$100 – $150/hour',
            '$150 – $250/hour',
            '$250+/hour',
          ],
        }}
        value={hourlyRate}
        onChange={setHourlyRate}
      />

      <SingleSelect
        question={{
          id: 'monthly_revenue',
          label: "What's your monthly revenue roughly? (Optional)",
          type: 'single',
          options: [
            'Under $5,000/month',
            '$5,000 – $15,000/month',
            '$15,000 – $30,000/month',
            '$30,000 – $75,000/month',
            '$75,000 – $150,000/month',
            '$150,000+/month',
            "I'd rather not say",
          ],
        }}
        value={monthlyRevenue}
        onChange={setMonthlyRevenue}
      />

      <SingleSelect
        question={{
          id: 'team_size',
          label: 'How many people work in your business including yourself?',
          type: 'single',
          options: [
            'Just me',
            '2-3 people',
            '4-6 people',
            '7-15 people',
            '16-30 people',
            '30+ people',
          ],
        }}
        value={teamSizeAnswer}
        onChange={setTeamSizeAnswer}
      />

      {navButtons}
    </div>
  )

  // ── Screen 5 ─────────────────────────────────────────────────────────────────
  const screen5 = (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-black text-gray-900 mb-1">Almost done</h2>
        <p className="text-sm text-gray-500">One optional question, then hit generate.</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-1">
          Anything else we should know?
        </label>
        <p className="text-xs text-gray-400 mb-2">
          What&apos;s the thing that keeps you up at night about how your business runs? The more specific you are, the more specific your audit will be.
        </p>
        <textarea
          value={freeText}
          onChange={e => e.target.value.length <= 500 && setFreeText(e.target.value)}
          placeholder="Optional — skip this if you're good. But the more specific you are, the more specific your audit will be."
          rows={4}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2"
          style={{ '--tw-ring-color': '#534AB7' } as React.CSSProperties}
        />
        <p className="text-xs text-gray-400 text-right mt-1">{freeText.length}/500</p>
      </div>

      {showCalendar && (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-800 mb-1">Connect your calendar for a more precise analysis</p>
          <p className="text-xs text-gray-500 mb-3 leading-relaxed">
            Connecting Google Calendar lets RECLAIM read your actual meeting load and time patterns instead of relying on your estimates. Takes 30 seconds.
          </p>
          {calendarConnected ? (
            <div className="flex items-center gap-2 text-sm font-semibold text-green-700">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" fill="#D1FAE5" stroke="#059669" strokeWidth="1.5"/>
                <path d="M5 8L7 10L11 6" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Google Calendar connected — your meeting data will be included.
            </div>
          ) : (
            <div>
              <a
                href="/api/integrations/google/auth"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#534AB7' }}
              >
                Connect Google Calendar
              </a>
              <p className="text-xs text-gray-400 mt-2">Optional. We only read meeting titles and times — never email or message content.</p>
            </div>
          )}
        </div>
      )}

      {!showCalendar && (
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-center">
          <p className="text-sm text-gray-500">Your audit is ready. Hit the button below to generate your results.</p>
        </div>
      )}

      <div className="space-y-3">
        <button
          type="button"
          onClick={handleGenerate}
          className="w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
          style={{ backgroundColor: '#534AB7' }}
        >
          Generate my audit →
        </button>
        <p className="text-center text-xs text-gray-400">Takes about 15 seconds</p>
      </div>

      <div className="flex items-center gap-4 pt-1">
        {screen > 1 && (
          <button
            type="button"
            onClick={() => transition(screen - 1)}
            className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-gray-700"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>
        )}
        <button
          type="button"
          onClick={onSwitchToManual}
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors ml-auto"
        >
          I&apos;d rather describe my situation myself →
        </button>
      </div>
    </div>
  )

  const screens: Record<number, React.ReactNode> = {
    1: screen1,
    2: screen2,
    3: screen3,
    4: screen4,
    5: screen5,
  }

  return (
    <div ref={formRef}>
      {progressBar}
      <div
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
      >
        {screens[screen]}
      </div>
    </div>
  )
}
