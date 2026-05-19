'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
export function FewShotDemo() {
  const [exampleCount, setExampleCount] = useState(0)

  const examples = [
    { input: 'refund request', output: 'Urgent - Finance' },
    { input: 'newsletter signup', output: 'Low Priority - Marketing' },
    { input: 'server down', output: 'Critical - Engineering' },
  ]

  const testCase = { input: 'password reset request', output: '???' }

  // Different outputs based on number of examples
  const predictions = [
    'Medium - Support', // 0 examples - generic guess
    'Urgent - Customer Service', // 1 example - sees "urgent" pattern but wrong dept
    'Medium - IT', // 2 examples - closer
    'Urgent - Engineering', // 3 examples - nailed it
  ]

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Try It: Add Examples and Watch Output Change</h3>
      <p className="text-sm text-gray-500 mb-4">
        Drag the slider to add examples. Watch how the prediction improves.
      </p>

      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-sm text-gray-600 w-32 shrink-0">Examples: {exampleCount}</span>
          <input
            type="range"
            min={0}
            max={3}
            step={1}
            value={exampleCount}
            onChange={(e) => setExampleCount(Number(e.target.value))}
            className="flex-1"
          />
        </div>

        <div className="space-y-2">
          <AnimatePresence>
            {examples.slice(0, exampleCount).map((example, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 text-sm"
              >
                <span className="font-mono text-gray-600 flex-1">"{example.input}"</span>
                <span className="text-gray-400">→</span>
                <span className="font-mono text-blue-600 flex-1">"{example.output}"</span>
              </motion.div>
            ))}
          </AnimatePresence>

          {exampleCount > 0 && (
            <div className="border-t border-gray-300 my-3 pt-3">
              <div className="text-xs text-gray-500 mb-2">Now categorize:</div>
            </div>
          )}

          <div className="flex items-center gap-3 text-sm">
            <span className="font-mono text-gray-900 flex-1">"{testCase.input}"</span>
            <span className="text-gray-400">→</span>
            <motion.span
              key={exampleCount}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`font-mono flex-1 px-2 py-1 rounded ${
                exampleCount === 3
                  ? 'bg-green-100 text-green-700'
                  : exampleCount === 0
                    ? 'bg-gray-100 text-gray-500'
                    : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              "{predictions[exampleCount]}"
            </motion.span>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500">
        {exampleCount === 0 && '← With zero examples, the model makes a generic guess.'}
        {exampleCount === 1 && '← With one example, it sees "urgent" but guesses the department.'}
        {exampleCount === 2 && '← Getting closer, but still not quite right.'}
        {exampleCount === 3 && '← Three examples lock in the pattern. Perfect.'}
      </div>
    </div>
  )
}


export function ExampleTypes() {
  const types = [
    {
      title: 'Format Examples',
      description: 'Show the exact structure you want',
      example: '"Make a table like this: [paste formatted table]"',
      useCase: 'Multiplication tables, code templates, JSON schemas'
    },
    {
      title: 'Style Examples',
      description: 'Show the tone, voice, or aesthetic',
      example: '"Write like this: [paste example with the vibe you want]"',
      useCase: 'Poetry, professional emails, casual summaries'
    },
    {
      title: 'Classification Examples',
      description: 'Show how to categorize inputs',
      example: '"Happy → 😊, Sad → 😢, Angry → 😠"',
      useCase: 'Email triage, sentiment analysis, tagging'
    },
    {
      title: 'Transformation Examples',
      description: 'Show input → output mappings',
      example: '"Formal: ... → Casual: ..."',
      useCase: 'Translation, tone conversion, data reformatting'
    }
  ]

  return (
    <div className="my-8 space-y-3 not-prose">
      {types.map((type, i) => (
        <div key={i} className="bg-gray-50 p-5 rounded-xl border border-gray-200">
          <div className="flex items-start gap-3 mb-2">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              {i + 1}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">{type.title}</h4>
              <p className="text-sm text-gray-600 mb-2">{type.description}</p>
              <div className="font-mono text-xs text-blue-600 bg-white px-3 py-2 rounded border border-gray-200 mb-2">
                {type.example}
              </div>
              <div className="text-xs text-gray-500">
                <strong>Use for:</strong> {type.useCase}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}


export function RealExampleCard({ title, prompt, why }: { title: string; prompt: string; why: string }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className="bg-white border-2 border-gray-200 rounded-xl p-5 cursor-pointer hover:border-blue-300 transition-colors"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
          <div className="text-xs text-gray-700 font-mono bg-gray-50 p-3 rounded border border-gray-200 whitespace-pre-wrap">
            {prompt}
          </div>
        </div>
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          className="text-gray-400 text-sm ml-4 shrink-0"
        >
          ▼
        </motion.span>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                <strong className="text-gray-900">Why this works:</strong> {why}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
