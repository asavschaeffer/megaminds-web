'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
export function BasinVisualization() {
  const [attempt, setAttempt] = useState(1)

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">The Basin: A Visual Metaphor</h3>

      <div className="relative bg-gradient-to-b from-blue-100 to-red-100 rounded-lg p-8 mb-4" style={{ height: '300px' }}>
        <svg width="100%" height="100%" viewBox="0 0 400 250" className="absolute inset-0">
          {/* Hill (success) on left */}
          <path
            d="M 0 200 Q 50 100, 100 200"
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
          />
          <text x="50" y="90" textAnchor="middle" className="text-xs fill-green-700 font-semibold">
            Success
          </text>

          {/* Valley (basin) in middle */}
          <path
            d="M 100 200 Q 200 240, 300 200"
            fill="none"
            stroke="#ef4444"
            strokeWidth="3"
          />
          <text x="200" y="260" textAnchor="middle" className="text-xs fill-red-700 font-semibold">
            Basin of Failure
          </text>

          {/* Ball showing position */}
          <motion.circle
            animate={{
              cx: attempt === 1 ? 50 : attempt === 2 ? 150 : attempt === 3 ? 200 : 210,
              cy: attempt === 1 ? 150 : attempt === 2 ? 220 : attempt === 3 ? 235 : 238
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            r="10"
            fill="#3b82f6"
            stroke="#1e40af"
            strokeWidth="2"
          />

          {/* Arrows showing attempts to escape */}
          {attempt >= 3 && (
            <>
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                d="M 200 235 L 180 215"
                stroke="#9ca3af"
                strokeWidth="2"
                strokeDasharray="4"
                markerEnd="url(#arrowgray)"
              />
              <defs>
                <marker id="arrowgray" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#9ca3af" />
                </marker>
              </defs>
            </>
          )}
        </svg>
      </div>

      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4].map((a) => (
          <button
            key={a}
            onClick={() => setAttempt(a)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              attempt === a
                ? 'bg-blue-600 text-white shadow'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Attempt {a}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={attempt}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-200"
        >
          {attempt === 1 && "✅ First attempt succeeds. You're on the hilltop (success)."}
          {attempt === 2 && "❌ First failure. You roll down into the valley (basin)."}
          {attempt === 3 && "❌ Second failure. You're deeper in the basin. Trying to climb out just rolls you back."}
          {attempt === 4 && "❌ Third failure. You're stuck. The basin has you. Only way out: start fresh."}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}


export function TwoFailureRule() {
  return (
    <div className="my-8 p-6 bg-red-50 rounded-xl border-2 border-red-300 not-prose">
      <h4 className="text-lg font-semibold text-red-900 mb-4">The Two-Failure Rule</h4>
      <div className="space-y-3 text-sm">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold shrink-0">
            1
          </div>
          <div className="flex-1 text-gray-700">
            <strong>First attempt fails:</strong> Okay, maybe your prompt was unclear. Try editing
            it and regenerating.
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold shrink-0">
            2
          </div>
          <div className="flex-1 text-gray-700">
            <strong>Second attempt fails:</strong> Warning sign. The context is getting polluted.
            Consider starting fresh.
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold shrink-0">
            3
          </div>
          <div className="flex-1 text-gray-700">
            <strong>Third attempt?</strong> <span className="font-bold text-red-700">STOP. START A NEW CHAT.</span> You're in the basin. Adding more failures won't help.
          </div>
        </div>
      </div>
    </div>
  )
}


export function BasinSigns() {
  const signs = [
    { emoji: '📉', text: 'Each response gets worse instead of better' },
    { emoji: '🤔', text: 'The model hedges every statement ("perhaps", "it might be")' },
    { emoji: '📝', text: 'Responses are getting unnecessarily long' },
    { emoji: '🔁', text: 'You\'re repeating the same correction in different words' },
    { emoji: '😤', text: 'You\'re frustrated or annoyed' },
    { emoji: '❓', text: 'The model asks clarifying questions instead of just answering' },
  ]

  return (
    <div className="my-8 p-6 bg-orange-50 rounded-xl border border-orange-200 not-prose">
      <h4 className="font-semibold text-orange-900 mb-4">⚠️ Signs You\'re in the Basin</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {signs.map((sign, i) => (
          <div key={i} className="flex items-center gap-3 text-sm text-gray-700 bg-white p-3 rounded-lg">
            <span className="text-2xl">{sign.emoji}</span>
            <span>{sign.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}


export function EscapeStrategy() {
  return (
    <div className="my-8 p-6 bg-green-50 rounded-xl border-2 border-green-300 not-prose">
      <h4 className="text-lg font-semibold text-green-900 mb-4">✅ How to Escape the Basin</h4>
      <div className="space-y-3 text-sm text-gray-700">
        <div className="flex items-start gap-3">
          <div className="font-bold text-green-700 w-6 shrink-0">1.</div>
          <div>
            <strong>Stop adding to the conversation.</strong> Don't send another message in the
            same chat. You're done here.
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="font-bold text-green-700 w-6 shrink-0">2.</div>
          <div>
            <strong>Analyze what went wrong.</strong> Read the failures. What did the model
            misunderstand? What was unclear in your prompt?
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="font-bold text-green-700 w-6 shrink-0">3.</div>
          <div>
            <strong>Start a new chat.</strong> Fresh context, zero failures, clean slate.
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="font-bold text-green-700 w-6 shrink-0">4.</div>
          <div>
            <strong>Write a better prompt.</strong> Based on what you learned, write a clearer,
            more specific prompt. Add examples if needed.
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="font-bold text-green-700 w-6 shrink-0">5.</div>
          <div>
            <strong>Try again.</strong> Clean context = clean output.
          </div>
        </div>
      </div>
    </div>
  )
}


export function DeathSpiralExample() {
  return (
    <div className="my-8 p-6 bg-gradient-to-br from-gray-50 to-red-50 rounded-xl border-2 border-gray-200 not-prose">
      <h4 className="font-semibold text-gray-900 mb-4">Example: The Death Spiral</h4>

      <div className="space-y-3 text-sm">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-blue-600 font-semibold mb-2">You: "Write a product description"</div>
          <div className="text-purple-600 font-semibold mb-1">AI:</div>
          <div className="text-gray-700">[Generic marketing copy]</div>
          <div className="text-red-600 text-xs mt-2">❌ "Too generic"</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-blue-600 font-semibold mb-2">You: "More specific, mention the features"</div>
          <div className="text-purple-600 font-semibold mb-1">AI:</div>
          <div className="text-gray-700">[Lists features but reads like a spec sheet]</div>
          <div className="text-red-600 text-xs mt-2">❌ "Too technical"</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-blue-600 font-semibold mb-2">You: "Less technical, more emotional"</div>
          <div className="text-purple-600 font-semibold mb-1">AI:</div>
          <div className="text-gray-700">[Vague emotional language, no substance]</div>
          <div className="text-red-600 text-xs mt-2">❌ "Now it's too vague"</div>
        </div>

        <div className="bg-red-100 p-4 rounded-lg border-2 border-red-300">
          <div className="text-red-900 font-semibold mb-2">← You're in the basin</div>
          <div className="text-gray-700 text-xs">
            The model has seen: "generic is bad", "technical is bad", "vague is bad". It's trying
            to be not-generic, not-technical, and not-vague simultaneously. That's contradictory.
          </div>
        </div>

        <div className="bg-green-100 p-4 rounded-lg border-2 border-green-300">
          <div className="text-green-900 font-semibold mb-2">✅ What you should do:</div>
          <div className="text-gray-700 text-xs">
            Start a new chat. Prompt: "Write a product description that balances features with
            benefits. Like this: [paste example]. Now write one for: [product]"
          </div>
        </div>
      </div>
    </div>
  )
}
