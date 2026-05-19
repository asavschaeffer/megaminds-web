'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export function KnowledgeCutoffDemo() {
  const [questionType, setQuestionType] = useState<'timeless' | 'recent'>('timeless')

  const questions = {
    timeless: {
      q: 'How does photosynthesis work?',
      answer: 'Photosynthesis is the process by which plants convert light energy into chemical energy...',
      note: '✅ The model knows this. It was in the training data and hasn\'t changed.'
    },
    recent: {
      q: 'Who won the 2026 Super Bowl?',
      answer: 'I don\'t have information about the 2026 Super Bowl, as my training data only goes up to early 2025.',
      note: '❌ Outside the knowledge cutoff. The model needs to search or admit it doesn\'t know.'
    }
  }

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Knowledge Cutoff in Action</h3>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setQuestionType('timeless')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            questionType === 'timeless'
              ? 'bg-green-600 text-white shadow'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          ✅ Timeless Knowledge
        </button>
        <button
          onClick={() => setQuestionType('recent')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            questionType === 'recent'
              ? 'bg-red-600 text-white shadow'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          ❌ Recent Event
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={questionType}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-3"
        >
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-blue-600 font-semibold text-sm mb-2">You:</div>
            <div className="text-gray-700 text-sm">"{questions[questionType].q}"</div>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-purple-200">
            <div className="text-purple-600 font-semibold text-sm mb-2">AI (without search):</div>
            <div className="text-gray-700 text-sm mb-2">{questions[questionType].answer}</div>
            <div className={`text-xs mt-2 ${questionType === 'timeless' ? 'text-green-600' : 'text-red-600'}`}>
              {questions[questionType].note}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}


export function FactsVsConceptsComparison() {
  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Facts vs. Concepts: When to Search</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 p-5 rounded-xl border-2 border-green-200">
          <h4 className="font-semibold text-green-900 mb-3">✅ Use Search (Facts)</h4>
          <div className="space-y-2 text-sm text-gray-700">
            <div>• "Current price of Bitcoin"</div>
            <div>• "Latest iPhone specs"</div>
            <div>• "Who won the election in 2026?"</div>
            <div>• "Stock price of AAPL"</div>
            <div>• "Weather forecast for NYC"</div>
            <div>• "Latest news on AI regulation"</div>
          </div>
          <p className="text-xs text-green-700 mt-3 italic">
            These require current, verifiable information.
          </p>
        </div>

        <div className="bg-blue-50 p-5 rounded-xl border-2 border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-3">✅ No Search Needed (Concepts)</h4>
          <div className="space-y-2 text-sm text-gray-700">
            <div>• "How does a blockchain work?"</div>
            <div>• "Explain quantum computing"</div>
            <div>• "Write a Python function"</div>
            <div>• "What is photosynthesis?"</div>
            <div>• "Explain the French Revolution"</div>
            <div>• "Brainstorm startup ideas"</div>
          </div>
          <p className="text-xs text-blue-700 mt-3 italic">
            These are timeless concepts in the training data.
          </p>
        </div>
      </div>
    </div>
  )
}


export function SearchWorkflow() {
  const [step, setStep] = useState(1)

  const steps = [
    { num: 1, title: 'You ask a question', content: '"What\'s the current price of Bitcoin?"' },
    { num: 2, title: 'Model detects need for search', content: 'Realizes this is recent, factual data' },
    { num: 3, title: 'Formulates search query', content: '"Bitcoin price USD" → sends to search engine' },
    { num: 4, title: 'Reads search results', content: 'Top 3-5 results from Google/Bing' },
    { num: 5, title: 'Synthesizes answer', content: 'Combines search data with reasoning' },
    { num: 6, title: 'Cites sources', content: 'Shows you where it got the information' },
  ]

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">How Web Search Works</h3>

      <div className="space-y-2 mb-4">
        {steps.map((s) => (
          <div
            key={s.num}
            onClick={() => setStep(s.num)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              step === s.num
                ? 'bg-blue-50 border-blue-400 shadow'
                : step > s.num
                  ? 'bg-green-50 border-green-300'
                  : 'bg-gray-50 border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                step === s.num ? 'bg-blue-600 text-white' :
                step > s.num ? 'bg-green-600 text-white' :
                'bg-gray-300 text-gray-600'
              }`}>
                {s.num}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 text-sm">{s.title}</div>
                <AnimatePresence>
                  {step === s.num && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-gray-600 mt-1"
                    >
                      {s.content}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


export function ModelSearchFeatures() {
  const models = [
    {
      name: 'ChatGPT',
      feature: 'Automatic web browsing',
      details: 'Detects when it needs current info and searches automatically. Shows sources.'
    },
    {
      name: 'Gemini',
      feature: 'Google Search integration',
      details: 'Deep integration with Google Search. Great for fact-checking and current events.'
    },
    {
      name: 'Claude',
      feature: 'No built-in search (as of 2025)',
      details: 'Relies on training data. Can\'t search the web directly. Use other models for current info.'
    },
    {
      name: 'Perplexity',
      feature: 'Search-first design',
      details: 'Built specifically for search. Cites every claim. Best for research.'
    },
  ]

  return (
    <div className="my-8 space-y-3 not-prose">
      {models.map((model, i) => (
        <div key={i} className="bg-gray-50 p-5 rounded-xl border border-gray-200">
          <div className="flex items-start gap-3">
            <div className="font-semibold text-gray-900 min-w-24">{model.name}</div>
            <div className="flex-1">
              <div className="text-sm font-medium text-blue-600 mb-1">{model.feature}</div>
              <div className="text-sm text-gray-600">{model.details}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
