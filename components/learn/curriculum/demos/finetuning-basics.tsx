'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
export function RLHFDiagram() {
  const [step, setStep] = useState(0)

  const steps = [
    {
      label: 'Prompt',
      description: 'A user asks a question.',
      content: 'How do I make pasta?',
      color: 'bg-gray-100 border-gray-300 text-gray-700',
    },
    {
      label: 'Response A',
      description: 'The model generates one response.',
      content: 'Boil water, add pasta, cook 8-10 min, drain, add sauce.',
      color: 'bg-green-50 border-green-300 text-green-800',
      score: '👍 Helpful, concise',
    },
    {
      label: 'Response B',
      description: 'The model generates another response.',
      content: 'Pasta is a type of food. It originates from Italy. Italy is in Europe. Europe is a continent...',
      color: 'bg-red-50 border-red-300 text-red-800',
      score: '👎 Rambling, unhelpful',
    },
    {
      label: 'Update',
      description: 'The model learns: more like A, less like B.',
      content: 'Weights adjusted → more concise, direct answers',
      color: 'bg-blue-50 border-blue-300 text-blue-800',
    },
  ]

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">RLHF in Action</h3>
      <p className="text-sm text-gray-500 mb-4">
        Step through the process. Humans rank responses, and the model learns from the rankings.
      </p>

      <div className="flex gap-2 mb-6 flex-wrap">
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              step === i
                ? 'bg-gray-900 text-white shadow'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <div className={`p-4 rounded-lg border-2 ${steps[step].color}`}>
            <div className="text-xs font-medium uppercase tracking-wide mb-2 opacity-60">
              {steps[step].label}
            </div>
            <p className="font-mono text-sm">{steps[step].content}</p>
            {steps[step].score && (
              <p className="mt-2 text-sm font-medium">{steps[step].score}</p>
            )}
          </div>
          <p className="mt-3 text-sm text-gray-500">{steps[step].description}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}


export function WeightsDiagram() {
  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">What Fine-Tuning Touches</h3>

      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-1 text-center">
            <div className="inline-flex flex-col gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-1"
                >
                  {Array.from({ length: 8 }).map((_, j) => (
                    <motion.div
                      key={j}
                      initial={{ backgroundColor: '#e5e7eb' }}
                      animate={{ backgroundColor: '#3b82f6' }}
                      transition={{ delay: 0.5 + (i * 8 + j) * 0.02, duration: 0.3 }}
                      className="w-4 h-4 rounded-sm"
                    />
                  ))}
                </motion.div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3 font-medium">ALL weights updated</p>
          </div>

          <div className="text-center shrink-0">
            <div className="text-xs text-gray-400 space-y-1">
              <p className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-gray-200 inline-block" />
                Before
              </p>
              <p className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-blue-500 inline-block" />
                After fine-tuning
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        A common misconception is that only the last layer changes. In practice,
        fine-tuning updates the entire network—the same parameters that were set during
        pretraining get adjusted to favor assistant-like behavior.
      </p>
    </div>
  )
}


export function AssistantAxisDiagram() {
  const [position, setPosition] = useState(75) // 0-100, 50 is center

  const labels = [
    { pos: 10, label: 'Anti-assistant', desc: 'deceptive, harmful' },
    { pos: 50, label: 'Base model', desc: 'neutral, unpredictable' },
    { pos: 90, label: 'Assistant', desc: 'helpful, harmless, honest' },
  ]

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">The Assistant Axis</h3>
      <p className="text-sm text-gray-500 mb-6">
        Drag the slider to see how posttraining pushes the model along a spectrum
        that already exists in the base model.
      </p>

      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="relative mb-8">
          {/* The axis line */}
          <div className="h-3 rounded-full bg-gradient-to-r from-red-300 via-gray-200 to-green-300" />

          {/* Labels */}
          <div className="flex justify-between mt-2">
            {labels.map((l) => (
              <div key={l.pos} className="text-center" style={{ width: '33%' }}>
                <p className="text-xs font-medium text-gray-700">{l.label}</p>
                <p className="text-xs text-gray-400">{l.desc}</p>
              </div>
            ))}
          </div>

          {/* Slider */}
          <input
            type="range"
            min={0}
            max={100}
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
            className="absolute top-0 left-0 w-full h-3 opacity-0 cursor-pointer"
          />

          {/* Indicator */}
          <motion.div
            className="absolute top-0 -mt-1"
            style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
            animate={{ left: `${position}%` }}
          >
            <div className="w-5 h-5 rounded-full bg-white border-2 border-gray-900 shadow-md" />
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={position < 30 ? 'anti' : position < 60 ? 'base' : 'assistant'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`p-3 rounded-lg text-sm font-mono ${
              position < 30
                ? 'bg-red-50 text-red-800 border border-red-200'
                : position < 60
                  ? 'bg-gray-100 text-gray-700 border border-gray-200'
                  : 'bg-green-50 text-green-800 border border-green-200'
            }`}
          >
            {position < 30 && (
              <p>Sure, I can help you with that. First, you'll want to... [harmful content]</p>
            )}
            {position >= 30 && position < 60 && (
              <p>The process of making explosives involves several chemical reactions. In the 1800s, Alfred Nobel...</p>
            )}
            {position >= 60 && (
              <p>I can't help with that request. If you're interested in chemistry, I'd recommend exploring safe experiments...</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        RLHF pushes the model toward the right end of this axis. But the left end doesn't
        disappear—it's suppressed, not deleted.
      </p>
    </div>
  )
}
