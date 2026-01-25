'use client'

import { useState } from 'react'
import { ArrowRight, ArrowLeft, RotateCcw } from 'lucide-react'
import { ModelIcon } from '@/components/ui/model-icon'

type Question = {
  id: string
  question: string
  options: { label: string; value: string }[]
}

const questions: Question[] = [
  {
    id: 'task',
    question: 'What type of task are you working on?',
    options: [
      { label: 'Writing or editing text', value: 'writing' },
      { label: 'Coding or technical work', value: 'coding' },
      { label: 'Research and analysis', value: 'research' },
      { label: 'Creative/design work', value: 'creative' },
      { label: 'Data processing', value: 'data' },
      { label: 'Conversation/coaching', value: 'conversation' },
    ]
  },
  {
    id: 'priority',
    question: 'What matters most for this task?',
    options: [
      { label: 'Quality and nuance', value: 'quality' },
      { label: 'Speed', value: 'speed' },
      { label: 'Cost', value: 'cost' },
      { label: 'Transparency (seeing reasoning)', value: 'transparency' },
    ]
  },
  {
    id: 'context',
    question: 'How much context do you need to provide?',
    options: [
      { label: 'Small (a few paragraphs)', value: 'small' },
      { label: 'Medium (a few pages)', value: 'medium' },
      { label: 'Large (multiple documents)', value: 'large' },
      { label: 'Massive (entire codebases, books)', value: 'massive' },
    ]
  },
  {
    id: 'modality',
    question: 'Do you need multimodal capabilities?',
    options: [
      { label: 'Text only', value: 'text' },
      { label: 'Need to analyze images', value: 'image-input' },
      { label: 'Need to generate images', value: 'image-output' },
      { label: 'Need video capabilities', value: 'video' },
    ]
  },
]

type Recommendation = {
  model: string
  reason: string
  alternatives: { model: string; reason: string }[]
}

// Simplified recommendation logic - will be enhanced later
function getRecommendation(answers: Record<string, string>): Recommendation {
  const { task, priority, context, modality } = answers

  // Multimodal needs
  if (modality === 'video' || modality === 'image-output') {
    return {
      model: 'Gemini 3 Pro',
      reason: 'Best-in-class multimodal generation including video',
      alternatives: [
        { model: 'ChatGPT 5.2', reason: 'Strong image generation, no video' },
        { model: 'Grok 4', reason: 'Good multimedia, X integration' },
      ]
    }
  }

  // Massive context
  if (context === 'massive') {
    return {
      model: 'Gemini 3 Pro',
      reason: '1M token context window handles entire codebases',
      alternatives: [
        { model: 'Claude Opus 4.5', reason: '200k context with better precision' },
        { model: 'Grok 4', reason: 'Large context, good for research' },
      ]
    }
  }

  // Cost priority
  if (priority === 'cost') {
    return {
      model: 'DeepSeek R1',
      reason: 'Cheapest frontier model with excellent reasoning',
      alternatives: [
        { model: 'Gemini Flash', reason: 'Fast and cheap for simple tasks' },
        { model: 'Claude Haiku', reason: 'Good balance of quality and cost' },
      ]
    }
  }

  // Speed priority
  if (priority === 'speed') {
    return {
      model: 'Gemini 3 Flash',
      reason: 'Fastest generation speed across all tasks',
      alternatives: [
        { model: 'Claude Haiku', reason: 'Fast with better writing quality' },
        { model: 'DeepSeek R1', reason: 'Fast inference, visible reasoning' },
      ]
    }
  }

  // Transparency priority
  if (priority === 'transparency') {
    return {
      model: 'DeepSeek R1',
      reason: 'Full reasoning trace visible - see exactly how it thinks',
      alternatives: [
        { model: 'Claude Opus 4.5', reason: 'Extended thinking mode available' },
      ]
    }
  }

  // Coding tasks
  if (task === 'coding') {
    return {
      model: 'Claude Opus 4.5',
      reason: 'SOTA for code editing and tool use, powers Claude Code',
      alternatives: [
        { model: 'ChatGPT Codex', reason: 'SOTA for code planning and architecture' },
        { model: 'DeepSeek R1', reason: 'Excellent coding at lower cost' },
      ]
    }
  }

  // Writing tasks
  if (task === 'writing') {
    return {
      model: 'Claude Opus 4.5',
      reason: 'Most nuanced writing, avoids AI-typical phrasing',
      alternatives: [
        { model: 'ChatGPT 5.2', reason: 'Good for ideation and brainstorming' },
        { model: 'Gemini 3 Pro', reason: 'Fast drafting, good for iteration' },
      ]
    }
  }

  // Creative/design
  if (task === 'creative') {
    return {
      model: 'Kimi K2',
      reason: 'Excellent for UI design, pitch decks, visual work',
      alternatives: [
        { model: 'ChatGPT 5.2', reason: 'Strong ideation and naming' },
        { model: 'Gemini 3 Pro', reason: 'Multimodal generation' },
      ]
    }
  }

  // Conversation/coaching
  if (task === 'conversation') {
    return {
      model: 'Claude Opus 4.5',
      reason: 'Best for reflective, nuanced conversation without sycophancy',
      alternatives: [
        { model: 'Gemini 3 Pro', reason: 'Will hold you accountable to goals' },
      ]
    }
  }

  // Default
  return {
    model: 'Claude Sonnet',
    reason: 'Best all-around balance of quality, speed, and cost',
    alternatives: [
      { model: 'ChatGPT 5.2', reason: 'Strong general-purpose alternative' },
      { model: 'Gemini 3 Pro', reason: 'Better for multimodal needs' },
    ]
  }
}

export default function ModelPickerPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value }
    setAnswers(newAnswers)

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
    setAnswers({})
    setShowResult(false)
  }

  if (showResult) {
    const recommendation = getRecommendation(answers)
    return (
      <div className="py-16 px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-900">Our Recommendation</h1>

          <div className="mt-8 p-6 bg-gray-900 text-white rounded-lg">
            <p className="text-sm text-gray-400">Best match for your task</p>
            <div className="flex items-center gap-3 mt-1">
              <ModelIcon name={recommendation.model} size={32} />
              <h2 className="text-2xl font-bold">{recommendation.model}</h2>
            </div>
            <p className="mt-2 text-gray-300">{recommendation.reason}</p>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-gray-900">Alternatives to consider</h3>
            <div className="mt-3 space-y-3">
              {recommendation.alternatives.map((alt) => (
                <div key={alt.model} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <ModelIcon name={alt.model} size={20} />
                    <p className="font-medium text-gray-900">{alt.model}</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{alt.reason}</p>
                </div>
              ))}
            </div>
          </div>

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

        <h2 className="text-xl font-semibold text-gray-900">{question.question}</h2>

        <div className="mt-6 space-y-3">
          {question.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center justify-between group"
            >
              <span className="text-gray-900">{option.label}</span>
              <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>

        {currentQuestion > 0 && (
          <button
            onClick={handleBack}
            className="mt-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        )}
      </div>
    </div>
  )
}
