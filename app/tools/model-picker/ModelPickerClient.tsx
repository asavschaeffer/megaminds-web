'use client'

import { useState } from 'react'
import {
  ArrowRight, ArrowLeft, RotateCcw, Check, FileText, Image as ImageIcon, Video, Globe,
  Search, Code, Calculator, PenTool, Lightbulb, BookOpen, Microscope, Bot, Zap, DollarSign,
  Award, ScrollText, Lock, Eye, X, Ban, Coins, Gem, Braces, FileCode, Boxes,
} from 'lucide-react'
import { ModelIconClient } from '@/components/ui/model-icon-client'
import type { ModelTagId } from '@/lib/models/tags'
import type { PickerModel } from '@/lib/models/picker'

// ── Question model ──────────────────────────────────────────────────────────
// Options that map to model capabilities carry typed `tags: ModelTagId[]`.
// Constraint questions (pay, code usage, structured output) carry no tags; their
// selected `value` is read directly to drive the hard-constraint eliminations.

type QuestionOption = {
  label: string
  value: string
  icon?: React.ReactNode
  tags?: ModelTagId[]
}

type Question = {
  id: string
  question: string
  subtitle?: string
  options: QuestionOption[]
  maxSelections?: number
}

const questions: Question[] = [
  {
    id: 'output',
    question: 'What do you need to create?',
    subtitle: 'Select all that apply',
    options: [
      { label: 'Text / Writing', value: 'text', icon: <FileText className="w-5 h-5" />, tags: ['text', 'writing'] },
      { label: 'Generate Images', value: 'image-gen', icon: <ImageIcon className="w-5 h-5" />, tags: ['image-gen', 'multimodal'] },
      { label: 'Generate Video', value: 'video-gen', icon: <Video className="w-5 h-5" />, tags: ['video-gen', 'multimodal'] },
      { label: 'Search the Web', value: 'search', icon: <Globe className="w-5 h-5" />, tags: ['search'] },
      { label: 'Analyze Images/Docs', value: 'vision', icon: <Search className="w-5 h-5" />, tags: ['vision', 'multimodal'] },
    ],
  },
  {
    id: 'task',
    question: "What's the main task?",
    subtitle: 'Select your primary use case',
    options: [
      { label: 'Code / Debug / Review', value: 'coding', icon: <Code className="w-5 h-5" />, tags: ['coding'] },
      { label: 'Math / Logic / Reasoning', value: 'reasoning', icon: <Calculator className="w-5 h-5" />, tags: ['reasoning', 'math'] },
      { label: 'Write / Edit Content', value: 'writing', icon: <PenTool className="w-5 h-5" />, tags: ['writing'] },
      { label: 'Brainstorm Ideas', value: 'ideation', icon: <Lightbulb className="w-5 h-5" />, tags: ['ideation', 'creativity'] },
      { label: 'Fiction / Worldbuilding', value: 'worldbuilding', icon: <BookOpen className="w-5 h-5" />, tags: ['worldbuilding', 'roleplay'] },
      { label: 'Research / Analysis', value: 'analysis', icon: <Microscope className="w-5 h-5" />, tags: ['analysis', 'research'] },
      { label: 'Autonomous Tasks', value: 'agentic', icon: <Bot className="w-5 h-5" />, tags: ['tool-use', 'agentic-swarm'] },
    ],
  },
  {
    id: 'code-usage',
    question: 'How will you use it for code?',
    subtitle: 'Only matters if you picked a coding task',
    maxSelections: 1,
    options: [
      { label: 'Single file / script', value: 'script', icon: <FileCode className="w-5 h-5" /> },
      { label: 'Agentic project (multi-file, tools)', value: 'agentic-code', icon: <Boxes className="w-5 h-5" /> },
    ],
  },
  {
    id: 'priorities',
    question: 'Pick your top 2',
    subtitle: 'Choose exactly 2 priorities',
    maxSelections: 2,
    options: [
      { label: 'Speed', value: 'speed', icon: <Zap className="w-5 h-5" />, tags: ['speed'] },
      { label: 'Low Cost', value: 'cost-efficient', icon: <DollarSign className="w-5 h-5" />, tags: ['cost-efficient'] },
      { label: 'Best Quality', value: 'precision', icon: <Award className="w-5 h-5" />, tags: ['precision', 'frontier'] },
    ],
  },
  {
    id: 'pay',
    question: 'Willing to pay?',
    subtitle: 'How much budget do you have for this model?',
    maxSelections: 1,
    options: [
      { label: 'No — free only', value: 'pay-none', icon: <Ban className="w-5 h-5" /> },
      { label: 'A little', value: 'pay-little', icon: <Coins className="w-5 h-5" /> },
      { label: 'A lot', value: 'pay-lot', icon: <Gem className="w-5 h-5" /> },
    ],
  },
  {
    id: 'structured',
    question: 'Structured output?',
    subtitle: 'Does the model need to return JSON your program consumes?',
    maxSelections: 1,
    options: [
      { label: 'Yes — JSON / schema-constrained', value: 'need-structured', icon: <Braces className="w-5 h-5" /> },
      { label: 'No', value: 'no-structured', icon: <FileText className="w-5 h-5" /> },
    ],
  },
  {
    id: 'special',
    question: 'Any special requirements?',
    subtitle: 'Select all that apply (optional)',
    options: [
      { label: 'Massive Context (books, codebases)', value: 'ultra', icon: <ScrollText className="w-5 h-5" />, tags: ['ultra', 'long'] },
      { label: 'Must be Open Source', value: 'open-source', icon: <Lock className="w-5 h-5" />, tags: ['open-source'] },
      { label: 'Visible Reasoning (see how it thinks)', value: 'visible-reasoning', icon: <Eye className="w-5 h-5" />, tags: ['reasoning', 'visible-reasoning'] },
    ],
  },
]

// Questions the user may skip without picking anything.
const OPTIONAL_QUESTIONS = new Set(['code-usage', 'structured', 'special'])

type Answers = Record<string, string[]>

// ── Aggregated selection state ──────────────────────────────────────────────
// Everything downstream (eliminations + scoring) reads from this one struct.

type Selection = {
  tags: Set<ModelTagId>
  pay: 'none' | 'little' | 'lot' | null
  codeUse: 'script' | 'agentic' | null
  needsStructured: boolean
}

function buildSelection(answers: Answers): Selection {
  const tags = new Set<ModelTagId>()
  for (const question of questions) {
    for (const value of answers[question.id] ?? []) {
      const option = question.options.find((o) => o.value === value)
      option?.tags?.forEach((tag) => tags.add(tag))
    }
  }

  const payValue = answers.pay?.[0]
  const pay: Selection['pay'] =
    payValue === 'pay-none' ? 'none' : payValue === 'pay-little' ? 'little' : payValue === 'pay-lot' ? 'lot' : null

  const codeValue = answers['code-usage']?.[0]
  const codeUse: Selection['codeUse'] =
    codeValue === 'script' ? 'script' : codeValue === 'agentic-code' ? 'agentic' : null

  return {
    tags,
    pay,
    codeUse,
    needsStructured: (answers.structured ?? []).includes('need-structured'),
  }
}

// ── Hard-constraint eliminations (data-driven) ──────────────────────────────
// Eliminations exist ONLY for genuine hard constraints. Reasons describe a
// missing capability the user explicitly required — never "weak at X" inferred
// from a tag being absent. Everything soft (task fit, priorities) is scoring.

type Elimination = {
  id: string
  appliesWhen: (selection: Selection) => boolean
  predicate: (model: PickerModel) => boolean
  reason: string
}

const ELIMINATIONS: Elimination[] = [
  {
    id: 'image-gen',
    appliesWhen: (s) => s.tags.has('image-gen'),
    predicate: (m) => !m.tags.includes('image-gen'),
    reason: 'No image generation',
  },
  {
    id: 'video-gen',
    appliesWhen: (s) => s.tags.has('video-gen'),
    predicate: (m) => !m.tags.includes('video-gen'),
    reason: 'No video generation',
  },
  {
    id: 'search',
    appliesWhen: (s) => s.tags.has('search'),
    predicate: (m) => !m.tags.includes('search'),
    reason: 'No web search',
  },
  {
    id: 'open-source',
    appliesWhen: (s) => s.tags.has('open-source'),
    predicate: (m) => !m.tags.includes('open-source') && !m.tags.includes('open-weights'),
    reason: 'Not open source',
  },
  {
    id: 'visible-reasoning',
    appliesWhen: (s) => s.tags.has('visible-reasoning'),
    predicate: (m) => !m.tags.includes('visible-reasoning'),
    reason: 'No visible reasoning',
  },
  {
    id: 'ultra-context',
    appliesWhen: (s) => s.tags.has('ultra'),
    predicate: (m) => !m.tags.includes('ultra') && !m.tags.includes('long'),
    reason: 'Context too small',
  },
  {
    id: 'structured-output',
    appliesWhen: (s) => s.needsStructured,
    predicate: (m) => !m.tags.includes('structured-output'),
    reason: 'No structured output support',
  },
  {
    id: 'agentic-code',
    appliesWhen: (s) => s.codeUse === 'agentic',
    predicate: (m) => !m.tags.includes('tool-use') && !m.tags.includes('agentic-swarm'),
    reason: 'No agentic tool use',
  },
  {
    id: 'pay-none',
    appliesWhen: (s) => s.pay === 'none',
    predicate: (m) => !m.hasFreeAccess,
    reason: 'No free access path',
  },
  {
    id: 'pay-little',
    appliesWhen: (s) => s.pay === 'little',
    predicate: (m) => m.priceBand === 'premium',
    reason: 'Above your budget',
  },
]

// ── Single scoring function used everywhere ─────────────────────────────────

function scoreModel(model: PickerModel, selection: Selection): number {
  let score = 0

  selection.tags.forEach((tag) => {
    if (model.tags.includes(tag)) score += 10
  })

  // Priority boosts (priorities question).
  if (selection.tags.has('speed') && model.tags.includes('speed')) score += 5
  if (selection.tags.has('cost-efficient') && model.tags.includes('cost-efficient')) score += 5
  if (selection.tags.has('precision') && model.tags.includes('precision')) score += 5
  if (selection.tags.has('frontier') && model.tags.includes('frontier')) score += 5

  // Willing to pay "a lot" → nudge toward frontier/precision models.
  if (selection.pay === 'lot') {
    if (model.tags.includes('frontier')) score += 5
    if (model.tags.includes('precision')) score += 5
  }

  // Single-file/script coding → favor fast, cost-efficient models.
  if (selection.codeUse === 'script') {
    if (model.tags.includes('speed')) score += 5
    if (model.tags.includes('cost-efficient')) score += 5
  }

  return score
}

type ModelStatus = {
  model: PickerModel
  score: number
  eliminated: boolean
  reason?: string
}

function calculateModelStatuses(models: PickerModel[], selection: Selection): ModelStatus[] {
  return models.map((model) => {
    const elimination = ELIMINATIONS.find(
      (rule) => rule.appliesWhen(selection) && rule.predicate(model)
    )
    if (elimination) {
      return { model, score: 0, eliminated: true, reason: elimination.reason }
    }
    return { model, score: scoreModel(model, selection), eliminated: false }
  })
}

function getRecommendations(statuses: ModelStatus[]): PickerModel[] {
  return statuses
    .filter((status) => !status.eliminated && status.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((status) => status.model)
}

// ── Model cage (unchanged UX: gray palette, hover tooltips, fade-out) ───────

function ModelCage({ modelStatuses }: { modelStatuses: ModelStatus[] }) {
  return (
    <div className="mb-8">
      <div className="mb-3">
        <h3 className="text-sm font-medium text-gray-700">Model Cage</h3>
      </div>

      <div className="relative bg-gray-100 rounded-xl p-4 border-2 border-gray-200">
        <div className="flex flex-wrap gap-3 justify-center">
          {modelStatuses.map((status) => (
            <div
              key={status.model.slug}
              className={`
                relative group transition-all duration-500 ease-out
                ${status.eliminated
                  ? 'opacity-20 scale-75 grayscale'
                  : 'opacity-100 scale-100 hover:scale-110'
                }
              `}
            >
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center
                transition-all duration-300
                ${status.eliminated
                  ? 'bg-gray-300'
                  : 'bg-white shadow-md border-2 border-gray-200 hover:border-gray-400'
                }
              `}>
                <ModelIconClient name={status.model.name} size={28} />
              </div>

              <div className={`
                absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                px-2 py-1 bg-gray-900 text-white text-xs rounded
                whitespace-nowrap opacity-0 group-hover:opacity-100
                transition-opacity pointer-events-none z-10
              `}>
                {status.model.name}
                {status.eliminated && status.reason && (
                  <span className="block text-gray-400">{status.reason}</span>
                )}
              </div>

              {status.eliminated && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <X className="w-6 h-6 text-gray-500" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

type ModelPickerClientProps = {
  modelProfiles: PickerModel[]
}

const emptyAnswers = (): Answers =>
  questions.reduce<Answers>((acc, question) => {
    acc[question.id] = []
    return acc
  }, {})

export default function ModelPickerClient({ modelProfiles }: ModelPickerClientProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Answers>(emptyAnswers)
  const [showResult, setShowResult] = useState(false)

  const currentQ = questions[currentQuestion]

  const selection = buildSelection(answers)
  const modelStatuses = calculateModelStatuses(modelProfiles, selection)

  const handleToggle = (value: string) => {
    const currentValues = answers[currentQ.id] || []
    const isSelected = currentValues.includes(value)

    let newValues: string[]
    if (isSelected) {
      newValues = currentValues.filter((v) => v !== value)
    } else if (currentQ.maxSelections === 1) {
      // Radio-style: replace whatever was picked.
      newValues = [value]
    } else if (currentQ.maxSelections && currentValues.length >= currentQ.maxSelections) {
      return
    } else {
      newValues = [...currentValues, value]
    }

    setAnswers({ ...answers, [currentQ.id]: newValues })
  }

  const canProceed = OPTIONAL_QUESTIONS.has(currentQ.id)
    ? true
    : (answers[currentQ.id]?.length ?? 0) > 0

  const handleNext = () => {
    if (!canProceed) return
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleReset = () => {
    setCurrentQuestion(0)
    setAnswers(emptyAnswers())
    setShowResult(false)
  }

  if (showResult) {
    const recommendations = getRecommendations(modelStatuses)
    const primary = recommendations[0]
    const alternatives = recommendations.slice(1)

    return (
      <div className="py-16 px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-900">Our Recommendation</h1>

          {primary ? (
            <div className="mt-8 p-6 bg-gray-900 text-white rounded-lg">
              <p className="text-sm text-gray-400">Best match for your task</p>
              <div className="flex items-center gap-3 mt-1">
                <ModelIconClient name={primary.name} size={32} />
                <h2 className="text-2xl font-bold">{primary.name}</h2>
              </div>
              <p className="mt-2 text-gray-300">{primary.reason}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {primary.strengths.map((strength) => (
                  <span key={strength} className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300">
                    {strength}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-8 p-6 bg-gray-100 rounded-lg">
              <p className="text-gray-600">No perfect match found. Try adjusting your requirements.</p>
            </div>
          )}

          {alternatives.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-gray-900">Alternatives to consider</h3>
              <div className="mt-3 space-y-3">
                {alternatives.map((alt) => (
                  <div key={alt.slug} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <ModelIconClient name={alt.name} size={20} />
                      <p className="font-medium text-gray-900">{alt.name}</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{alt.reason}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {alt.strengths.slice(0, 3).map((strength) => (
                        <span key={strength} className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-500">
                          {strength}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleReset}
            className="mt-8 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
          >
            <RotateCcw className="w-4 h-4" />
            Start over
          </button>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="py-16 px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Model Picker</h1>
          <span className="text-sm text-gray-500">
            {currentQuestion + 1} / {questions.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-1 mb-8">
          <div
            className="bg-gray-900 h-1 rounded-full transition-all"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Model Cage - shows eliminated models */}
        <ModelCage modelStatuses={modelStatuses} />

        <div className="mb-2">
          <h2 className="text-xl font-semibold text-gray-900">{question.question}</h2>
          {question.subtitle && (
            <p className="text-sm text-gray-500 mt-1">{question.subtitle}</p>
          )}
        </div>

        <div className="mt-6 space-y-3">
          {question.options.map((option) => {
            const isSelected = (answers[question.id] || []).includes(option.value)
            return (
              <button
                key={option.value}
                onClick={() => handleToggle(option.value)}
                className={`w-full text-left p-4 border rounded-lg transition-all flex items-center justify-between group ${
                  isSelected
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  {option.icon && <span className="text-gray-600">{option.icon}</span>}
                  <span className="text-gray-900">{option.label}</span>
                </div>
                <div className={`w-5 h-5 rounded flex items-center justify-center ${
                  isSelected ? 'bg-gray-900' : 'border-2 border-gray-300'
                }`}>
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </div>
              </button>
            )
          })}
        </div>

        <div className="mt-8 flex items-center justify-between">
          {currentQuestion > 0 ? (
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={handleNext}
            disabled={!canProceed}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              canProceed
                ? 'bg-gray-900 text-white hover:bg-gray-800'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {currentQuestion === questions.length - 1 ? 'Get Recommendation' : 'Continue'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
