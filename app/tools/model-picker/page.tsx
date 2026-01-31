'use client'

import { useState } from 'react'
import { ArrowRight, ArrowLeft, RotateCcw, Check, FileText, Image, Video, Globe, Search, Code, Calculator, PenTool, Lightbulb, BookOpen, Microscope, Bot, Zap, DollarSign, Award, ScrollText, Lock, Eye, X } from 'lucide-react'
import { ModelIconClient } from '@/components/ui/model-icon-client'

type Question = {
  id: string
  question: string
  subtitle?: string
  options: { label: string; value: string; icon?: React.ReactNode; tags: string[] }[]
  maxSelections?: number
}

const questions: Question[] = [
  {
    id: 'output',
    question: 'What do you need to create?',
    subtitle: 'Select all that apply',
    options: [
      { label: 'Text / Writing', value: 'text', icon: <FileText className="w-5 h-5" />, tags: ['text', 'writing'] },
      { label: 'Generate Images', value: 'image-gen', icon: <Image className="w-5 h-5" />, tags: ['image-gen', 'multimodal'] },
      { label: 'Generate Video', value: 'video-gen', icon: <Video className="w-5 h-5" />, tags: ['video-gen', 'multimodal'] },
      { label: 'Search the Web', value: 'search', icon: <Globe className="w-5 h-5" />, tags: ['search'] },
      { label: 'Analyze Images/Docs', value: 'vision', icon: <Search className="w-5 h-5" />, tags: ['vision', 'multimodal'] },
    ]
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
    ]
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
    ]
  },
  {
    id: 'special',
    question: 'Any special requirements?',
    subtitle: 'Select all that apply (optional)',
    options: [
      { label: 'Massive Context (books, codebases)', value: 'ultra', icon: <ScrollText className="w-5 h-5" />, tags: ['ultra', 'long'] },
      { label: 'Must be Open Source', value: 'open-source', icon: <Lock className="w-5 h-5" />, tags: ['open-source'] },
      { label: 'Visible Reasoning (see how it thinks)', value: 'visible-reasoning', icon: <Eye className="w-5 h-5" />, tags: ['reasoning'] },
    ]
  },
]

type ModelProfile = {
  slug: string
  name: string
  tags: string[]
  reason: string
  strengths: string[]
  weaknesses?: string[]
}

// Calculate which models are eliminated based on required tags
type ModelStatus = {
  model: ModelProfile
  score: number
  eliminated: boolean
  reason?: string
}

function calculateModelStatuses(
  modelProfiles: ModelProfile[],
  selectedTags: string[],
  answers: Record<string, string[]>
): ModelStatus[] {
  return modelProfiles.map(model => {
    let score = 0
    let eliminated = false
    let reason = ''

    // Check for hard requirements that eliminate models
    
    // Video generation requirement
    if (selectedTags.includes('video-gen') && !model.tags.includes('video-gen')) {
      eliminated = true
      reason = 'No video generation'
    }
    
    // Image generation requirement  
    if (!eliminated && selectedTags.includes('image-gen') && !model.tags.includes('image-gen')) {
      eliminated = true
      reason = 'No image generation'
    }
    
    // Search requirement
    if (!eliminated && selectedTags.includes('search') && !model.tags.includes('search')) {
      eliminated = true
      reason = 'No web search'
    }
    
    // Open source requirement
    if (!eliminated && selectedTags.includes('open-source') && !model.tags.includes('open-source')) {
      eliminated = true
      reason = 'Not open source'
    }
    
    // Visible reasoning requirement (only DeepSeek R1 has this)
    if (!eliminated && selectedTags.includes('visible-reasoning') && model.slug !== 'deepseek-r1') {
      eliminated = true
      reason = 'No visible reasoning'
    }
    
    // Massive context requirement
    if (!eliminated && selectedTags.includes('ultra') && !model.tags.includes('ultra') && !model.tags.includes('long')) {
      eliminated = true
      reason = 'Context too small'
    }
    
    // TASK-SPECIFIC ELIMINATIONS - make questions actually filter models
    
    // Worldbuilding/Roleplay - only models specifically tuned for this
    if (!eliminated && selectedTags.includes('worldbuilding')) {
      if (!model.tags.includes('worldbuilding') && !model.tags.includes('roleplay')) {
        eliminated = true
        reason = 'Not tuned for fiction/roleplay'
      }
    }
    
    // Coding requirement - eliminate models weak at coding
    if (!eliminated && selectedTags.includes('coding')) {
      if (!model.tags.includes('coding')) {
        eliminated = true
        reason = 'Weak coding capability'
      }
    }
    
    // Writing requirement - eliminate models weak at writing
    if (!eliminated && selectedTags.includes('writing')) {
      if (!model.tags.includes('writing')) {
        eliminated = true
        reason = 'Weak writing capability'
      }
    }
    
    // Autonomous tasks - require tool-use capabilities
    if (!eliminated && selectedTags.includes('tool-use')) {
      if (!model.tags.includes('tool-use') && !model.tags.includes('agentic-swarm')) {
        eliminated = true
        reason = 'No tool/agent capabilities'
      }
    }
    
    // Math/Reasoning - eliminate models without reasoning capabilities  
    if (!eliminated && selectedTags.includes('math')) {
      if (!model.tags.includes('math') && !model.tags.includes('reasoning')) {
        eliminated = true
        reason = 'Weak math/reasoning'
      }
    }
    
    // Research/Analysis - requires analysis tag or frontier capability
    if (!eliminated && selectedTags.includes('analysis')) {
      if (!model.tags.includes('analysis') && !model.tags.includes('frontier')) {
        eliminated = true
        reason = 'Not suited for research'
      }
    }
    
    // Ideation/Creativity - require frontier models for best results
    if (!eliminated && selectedTags.includes('ideation')) {
      if (!model.tags.includes('frontier') && !model.tags.includes('creativity')) {
        eliminated = true
        reason = 'Not creative enough'
      }
    }

    // Score calculation for non-eliminated models
    if (!eliminated) {
      for (const tag of selectedTags) {
        if (model.tags.includes(tag)) {
          score += 10
        }
      }
      
      // Priority bonuses
      if (selectedTags.includes('speed') && model.tags.includes('speed')) score += 5
      if (selectedTags.includes('cost-efficient') && model.tags.includes('cost-efficient')) score += 5
      if (selectedTags.includes('precision') && model.tags.includes('frontier')) score += 5
    }

    return { model, score, eliminated, reason }
  })
}

const modelProfiles: ModelProfile[] = [
  {
    slug: 'gemini-3-pro',
    name: 'Gemini 3 Pro',
    tags: ['text', 'vision', 'image-gen', 'video-gen', 'multimodal', 'search', 'reasoning', 'coding', 'writing', 'long', 'frontier', 'precision'],
    reason: 'Best-in-class multimodal with video generation and massive context',
    strengths: ['Video generation', 'Image generation', '2M context window', 'Speed'],
  },
  {
    slug: 'gemini-3-flash',
    name: 'Gemini 3 Flash',
    tags: ['text', 'vision', 'image-gen', 'multimodal', 'search', 'speed', 'cost-efficient', 'long'],
    reason: 'Fast and cheap multimodal workhorse',
    strengths: ['Very fast', 'Very cheap', 'Good enough quality'],
    weaknesses: ['Complex reasoning', 'Precise instruction following'],
  },
  {
    slug: 'chatgpt',
    name: 'ChatGPT 5.2',
    tags: ['text', 'vision', 'image-gen', 'multimodal', 'search', 'coding', 'reasoning', 'ideation', 'math', 'tool-use', 'frontier', 'precision'],
    reason: 'Top-tier for coding, math, planning, and agentic tasks',
    strengths: ['Coding', 'Math', 'Planning', 'Tool use', 'Brainstorming', 'Image generation'],
    weaknesses: ['Can be overly agreeable', 'Expensive'],
  },
  {
    slug: 'claude-opus',
    name: 'Claude Opus 4.5',
    tags: ['text', 'vision', 'search', 'coding', 'reasoning', 'writing', 'tool-use', 'instruction', 'long', 'frontier', 'precision'],
    reason: 'Best code reasoning, writing quality, and nuanced conversation',
    strengths: ['Code editing', 'Writing nuance', 'Computer use', 'Instruction following', 'Therapeutic conversation'],
    weaknesses: ['Slow', 'Expensive', 'No video/image gen'],
  },
  {
    slug: 'claude-sonnet',
    name: 'Claude Sonnet 4.5',
    tags: ['text', 'vision', 'search', 'coding', 'reasoning', 'writing', 'tool-use', 'long', 'frontier'],
    reason: 'Best all-around balance when you need quality without Opus cost',
    strengths: ['Balanced quality/speed/cost', 'Good at most tasks'],
    weaknesses: ['Not best at anything specific'],
  },
  {
    slug: 'kimi-k2-5',
    name: 'Kimi K2.5',
    tags: ['text', 'vision', 'search', 'coding', 'writing', 'long', 'design', 'frontier', 'agentic-swarm'],
    reason: '262K context with coding, search, and agent swarm capabilities',
    strengths: ['Agent swarm (100 sub-agents)', 'Coding with vision', 'Web search', 'UI mockups', 'Long context'],
    weaknesses: ['No image/video generation'],
  },
  {
    slug: 'qwen3-max',
    name: 'Qwen 3 Max',
    tags: ['text', 'vision', 'search', 'coding', 'analysis', 'writing', 'reasoning', 'translation', 'long', 'frontier'],
    reason: 'Strong research, coding, and technical writing with web search',
    strengths: ['Research', 'Coding (SWE-Bench 69.6%)', 'Web search', 'Technical writing', 'Translation'],
    weaknesses: ['Not for creative writing'],
  },
  {
    slug: 'perplexity-sonar',
    name: 'Perplexity Sonar',
    tags: ['text', 'search', 'analysis', 'reasoning'],
    reason: 'Built for search with live web access and citations',
    strengths: ['Live search', 'Citations', 'Research', 'Speed'],
    weaknesses: ['Not for generation tasks', 'Limited creativity'],
  },
  {
    slug: 'grok',
    name: 'Grok 4',
    tags: ['text', 'vision', 'audio', 'image-gen', 'multimodal', 'search', 'long', 'frontier'],
    reason: 'Uncensored model with X/Twitter access, image gen, and voice input',
    strengths: ['Uncensored/unfiltered', 'X/Twitter search', 'Image generation', 'Voice input', 'Large context'],
    weaknesses: ['No video generation', 'Inconsistent availability', 'Safety concerns'],
  },
  {
    slug: 'deepseek-r1',
    name: 'DeepSeek R1',
    tags: ['text', 'reasoning', 'coding', 'math', 'long', 'cost-efficient', 'open-source'],
    reason: 'Cheapest frontier model with visible chain-of-thought reasoning',
    strengths: ['Visible reasoning', 'Very cheap', 'Excellent at math/coding', 'Open source', '128K context'],
    weaknesses: ['No vision/multimodal', 'Text only'],
  },
  {
    slug: 'hermes',
    name: 'Hermes 3',
    tags: ['text', 'worldbuilding', 'roleplay', 'long', 'open-source'],
    reason: 'Open source model tuned for roleplay and long-form narrative',
    strengths: ['Roleplay', 'Worldbuilding', 'Long context', 'Open source'],
    weaknesses: ['Not frontier SOTA', 'Text only'],
  },
  {
    slug: 'manus',
    name: 'Manus',
    tags: ['text', 'tool-use', 'agentic-swarm', 'coding', 'analysis'],
    reason: 'Autonomous agent that performs multi-step workflows',
    strengths: ['Computer use', 'Autonomous execution', 'Multi-step tasks', 'Browsing'],
    weaknesses: ['Early stage', 'Limited availability'],
  },
]

// Component to render the cage of model balls
function ModelCage({ 
  modelStatuses
}: { 
  modelStatuses: ModelStatus[]
}) {
  return (
    <div className="mb-8">
      <div className="mb-3">
        <h3 className="text-sm font-medium text-gray-700">Model Cage</h3>
      </div>
      
      {/* Cage container */}
      <div className="relative bg-gray-100 rounded-xl p-4 border-2 border-gray-200">
        {/* Grid of model balls */}
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
              {/* Ball */}
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
              
              {/* Tooltip on hover */}
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
              
              {/* Eliminated X mark */}
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

function scoreModel(model: ModelProfile, selectedTags: string[]): number {
  let score = 0
  
  // Score based on tag matches
  for (const tag of selectedTags) {
    if (model.tags.includes(tag)) {
      score += 10
    }
  }
  
  // Bonus for being a frontier model if quality is priority
  if (selectedTags.includes('precision') && model.tags.includes('frontier')) {
    score += 5
  }
  
  // Bonus for visible reasoning specifically
  if (selectedTags.includes('visible-reasoning') && model.slug === 'deepseek-r1') {
    score += 20
  }
  
  // Bonus for search capabilities
  if (selectedTags.includes('search')) {
    if (model.tags.includes('search')) score += 15
  }
  
  // Bonus for video generation
  if (selectedTags.includes('video-gen')) {
    if (model.tags.includes('video-gen')) score += 15
  }
  
  // Penalty for weaknesses
  if (model.weaknesses) {
    for (const weakness of model.weaknesses) {
      if (selectedTags.some(tag => weakness.toLowerCase().includes(tag))) {
        score -= 5
      }
    }
  }
  
  return score
}

function getRecommendations(selectedTags: string[]): ModelProfile[] {
  // Score all models
  const scored = modelProfiles.map(model => ({
    model,
    score: scoreModel(model, selectedTags)
  }))
  
  // Sort by score descending
  scored.sort((a, b) => b.score - a.score)
  
  // Return top 3 (or fewer if scores are low)
  return scored
    .filter(s => s.score > 0)
    .slice(0, 3)
    .map(s => s.model)
}

export default function ModelPickerPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string[]>>({
    output: [],
    task: [],
    priorities: [],
    special: []
  })
  const [showResult, setShowResult] = useState(false)

  const currentQ = questions[currentQuestion]

  // Calculate selected tags based on current answers
  const selectedTags = (() => {
    const tags: string[] = []
    for (const [questionId, selectedValues] of Object.entries(answers)) {
      const question = questions.find(q => q.id === questionId)
      if (question) {
        for (const value of selectedValues) {
          const option = question.options.find(o => o.value === value)
          if (option) {
            tags.push(...option.tags)
          }
        }
      }
    }
    return Array.from(new Set(tags))
  })()

  // Calculate model statuses for the cage
  const modelStatuses = calculateModelStatuses(modelProfiles, selectedTags, answers)

  const handleToggle = (value: string) => {
    const currentValues = answers[currentQ.id] || []
    const isSelected = currentValues.includes(value)
    
    let newValues: string[]
    if (isSelected) {
      newValues = currentValues.filter(v => v !== value)
    } else {
      if (currentQ.maxSelections && currentValues.length >= currentQ.maxSelections) {
        return
      }
      newValues = [...currentValues, value]
    }
    
    setAnswers({ ...answers, [currentQ.id]: newValues })
  }

  const canProceed = currentQ.id === 'special' 
    ? true // Special requirements are optional
    : answers[currentQ.id]?.length > 0

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
    setAnswers({ output: [], task: [], priorities: [], special: [] })
    setShowResult(false)
  }

  if (showResult) {
    const recommendations = getRecommendations(selectedTags)
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
                {primary.strengths.map(strength => (
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
                      {alt.strengths.slice(0, 3).map(strength => (
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
