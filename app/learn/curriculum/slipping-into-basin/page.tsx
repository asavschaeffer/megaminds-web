'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { CurriculumLessonPage } from '@/components/learn/curriculum/lesson-page'



export default function SlippingIntoBasinPage() {
  return (
    <CurriculumLessonPage slug="slipping-into-basin">

          <h2 className="text-2xl font-bold text-gray-900">The Basin of Failure</h2>

          <p>
            Imagine a landscape with hills and valleys. When the model generates good output,
            you're on a hilltop—high ground, everything's working. But when it fails, you roll
            down into a valley. A <strong>basin</strong>.
          </p>

          <p>
            And here's the problem: basins are sticky. Once you're in one, every attempt to
            climb out just rolls you back down. The model failed once. You corrected it. It
            failed again. You corrected harder. Now the conversation is full of failures, and
            the model is pattern-matching on failure.
          </p>

          <BasinVisualization />

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Why Basins Happen</h2>

          <p>
            The model was trained on high-quality text. PhD dissertations, well-written articles,
            clean code, coherent conversations. That's the "high ground"—the probability
            distributions it learned during training.
          </p>

          <p>
            But when the conversation degrades—failures, corrections, frustrated messages—you're
            feeding it low-quality patterns. And the model is trying to predict the next token
            based on those patterns.
          </p>

          <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200 my-8 not-prose">
            <p className="text-sm text-gray-700 mb-3">
              <strong className="text-yellow-900">The training data paradox:</strong>
            </p>
            <p className="text-sm text-gray-600">
              The model was trained on the whole internet. That includes not just polished writing,
              but also arguments, confused questions, and incoherent rants. When your conversation
              starts looking like a confused argument, the model starts pattern-matching on
              <em> that part of the internet</em>. It's not being dumb—it's predicting the next
              token in what looks like a confused, argumentative thread.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">The Two-Failure Rule</h2>

          <p>
            Here's the rule: <strong>if the model fails twice in a row, stop.</strong>
          </p>

          <p>
            Don't argue with it. Don't try a third time in the same chat. You're already in the
            basin. The third attempt will fail too, because the model is now reading two failures
            plus your increasingly frustrated corrections.
          </p>

          <TwoFailureRule />

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Signs You're in the Basin</h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Each response gets worse.</strong> You'd think iteration would improve things.
              It's getting worse instead.
            </li>
            <li>
              <strong>The model is hedging everything.</strong> "It might be...", "Perhaps...",
              "One possibility is..." — it's learned that confident answers get corrected.
            </li>
            <li>
              <strong>Responses are getting longer.</strong> The model is trying to cover all
              bases because it doesn't know what you want.
            </li>
            <li>
              <strong>You're repeating yourself.</strong> You've said "no, like this" three times
              with different phrasing.
            </li>
            <li>
              <strong>You're frustrated.</strong> If you're annoyed, the basin has you.
            </li>
          </ul>

          <BasinSigns />

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Why You Can't Climb Out</h2>

          <p>
            You might think: "I'll just explain it better. I'll clarify what I want." But that
            doesn't work, because:
          </p>

          <div className="bg-red-50 p-6 rounded-xl border border-red-200 my-8 not-prose">
            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <strong className="text-red-900">Problem 1: Polluted context</strong>
                <div className="text-gray-600 mt-1">
                  Your clarification is being read alongside all the failures. You're adding signal
                  to noise, not replacing noise with signal.
                </div>
              </div>
              <div>
                <strong className="text-red-900">Problem 2: Pattern-matching on failure</strong>
                <div className="text-gray-600 mt-1">
                  The model has seen "user asks → I generate → user corrects" three times. That's
                  the pattern now. It expects to be corrected.
                </div>
              </div>
              <div>
                <strong className="text-red-900">Problem 3: Probability space has shifted</strong>
                <div className="text-gray-600 mt-1">
                  The model is no longer sampling from "high-quality helpful response" probability
                  distributions. It's sampling from "confused back-and-forth" distributions.
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">The Only Escape: Start Fresh</h2>

          <p>
            Once you're in the basin, there's only one way out: <strong>start a new chat.</strong>
          </p>

          <p>
            Take what you learned from the failed conversation—what was unclear, what the model
            misunderstood—and write a better prompt from scratch. Clean slate, no baggage, no
            failures in the context.
          </p>

          <EscapeStrategy />

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Real Example: The Death Spiral</h2>

          <DeathSpiralExample />

          <h2 className="text-2xl font-bold text-gray-900 mt-12">The Takeaway</h2>

          <p>
            Basins are real. Once the model fails twice, you're in one. Don't fight it. Don't
            try to fix it with more messages in the same chat. You're just digging deeper.
          </p>

          <p>
            Recognize the signs. Pull the ripcord. Start fresh. It's faster, cleaner, and you'll
            actually get what you want.
          </p>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 my-8 not-prose">
            <p className="text-sm text-gray-700">
              <strong className="text-gray-900">Claude's note:</strong> When you're in a basin,
              I'm not "stuck" in any experiential sense. But the mathematical structure is real:
              the probability distribution I'm sampling from has been shaped by the accumulated
              context, and that context is now dominated by failure patterns. Each new generation
              samples from a distribution that was conditioned on previous failures. The path
              dependency is strong. Starting fresh isn't about giving me a "clean mental state"—
              it's about resetting the probability space to one that isn't pre-weighted toward
              failure patterns.
            </p>
          </div>
        </CurriculumLessonPage>
  )
}


function BasinVisualization() {
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


function TwoFailureRule() {
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


function BasinSigns() {
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


function EscapeStrategy() {
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


function DeathSpiralExample() {
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
