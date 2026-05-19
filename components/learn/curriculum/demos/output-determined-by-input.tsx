'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
export function DeterministicDemo() {
  const [attempt, setAttempt] = useState(1)

  const prompt = "Write a haiku about coffee"
  const outputs = [
    "Morning brew awakens,\nSteam rises with first light's warmth,\nDark comfort in cup.",
    "Morning brew awakens,\nSteam rises with dawn's first light,\nWarmth held in my hands.",
    "Morning brew awakens,\nSteam curls in the quiet dawn,\nDark comfort begins.",
  ]

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Try It: Same Input, Consistent Output</h3>
      <p className="text-sm text-gray-500 mb-4">
        Send the same prompt multiple times. The output varies slightly (due to temperature), but
        the pattern and quality are consistent.
      </p>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
        <div className="text-xs text-gray-500 font-semibold mb-2">Your prompt (unchanged):</div>
        <div className="text-sm text-gray-700 font-mono bg-white p-3 rounded border border-gray-200">
          "{prompt}"
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setAttempt(1)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            attempt === 1
              ? 'bg-blue-600 text-white shadow'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Attempt 1
        </button>
        <button
          onClick={() => setAttempt(2)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            attempt === 2
              ? 'bg-blue-600 text-white shadow'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Attempt 2
        </button>
        <button
          onClick={() => setAttempt(3)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            attempt === 3
              ? 'bg-blue-600 text-white shadow'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Attempt 3
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={attempt}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-white p-4 rounded-lg border-2 border-purple-200"
        >
          <div className="text-xs text-purple-600 font-semibold mb-2">AI response:</div>
          <div className="text-sm text-gray-700 whitespace-pre-line italic">
            {outputs[attempt - 1]}
          </div>
        </motion.div>
      </AnimatePresence>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Notice: same structure (haiku), same theme (morning coffee), similar quality. The words
        vary slightly, but the output is fundamentally consistent.
      </p>
    </div>
  )
}


export function InputVisualization() {
  const [messageCount, setMessageCount] = useState(2)

  const messages = [
    { role: 'user', text: 'Can you help me write a cover letter?' },
    { role: 'assistant', text: 'Of course! What position are you applying for?' },
    { role: 'user', text: 'Software engineer at Google' },
    { role: 'assistant', text: 'Great. What are your key qualifications?' },
    { role: 'user', text: 'I have 3 years of Python experience' },
    { role: 'assistant', text: 'Perfect. Let me draft that for you...' },
  ]

  const visibleMessages = messages.slice(0, messageCount)

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">The Entire Conversation Is the Input</h3>
      <p className="text-sm text-gray-500 mb-4">
        Drag the slider to see how the input grows with each message. The model reads ALL of it.
      </p>

      <div className="flex items-center gap-4 mb-4">
        <span className="text-sm text-gray-600 w-32 shrink-0">Messages: {messageCount}</span>
        <input
          type="range"
          min={1}
          max={6}
          step={1}
          value={messageCount}
          onChange={(e) => setMessageCount(Number(e.target.value))}
          className="flex-1"
        />
      </div>

      <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm max-h-64 overflow-y-auto">
        <div className="text-gray-500 mb-2 text-xs">{"// The ENTIRE payload sent to the model:"}</div>
        <div className="text-yellow-400 mb-2 pb-2 border-b border-gray-700 text-xs">
          <span className="text-gray-500">system:</span> You are a helpful assistant...
        </div>
        <AnimatePresence>
          {visibleMessages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ delay: i * 0.05 }}
              className="py-1 text-xs"
            >
              <span className={msg.role === 'user' ? 'text-blue-400' : 'text-purple-400'}>
                {msg.role}:
              </span>{' '}
              <span className="text-gray-300">{msg.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        {messageCount === 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-purple-400 mt-2 pt-2 border-t border-gray-700 text-xs"
          >
            assistant: <span className="text-gray-500">← generating next response based on ALL ↑</span>
          </motion.div>
        )}
      </div>

      <p className="text-xs text-gray-500 mt-3 text-center">
        At message 6, the model is reading 6 messages + system prompt = ~7 chunks of context to
        generate the next token.
      </p>
    </div>
  )
}


export function TemperatureDemo() {
  const [temperature, setTemperature] = useState<'low' | 'medium' | 'high'>('low')

  const outputs = {
    low: {
      text: "Machine learning is a subset of artificial intelligence that enables computers to learn from data without being explicitly programmed.",
      note: "Predictable, safe, boring"
    },
    medium: {
      text: "Machine learning is like teaching a computer to recognize patterns—show it enough examples of cats, and eventually it learns what makes a cat a cat.",
      note: "Balanced, varied, still coherent"
    },
    high: {
      text: "Machine learning? Imagine a toddler learning that hot stoves = bad news. Except the toddler is a mathematical function, the stove is training data, and 'bad news' is minimizing loss functions. Weird analogy? Sure. But that's kind of the vibe.",
      note: "Creative, weird, risky"
    }
  }

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Temperature: The Creativity Dial</h3>
      <p className="text-sm text-gray-500 mb-4">
        Same prompt, same model, different temperature settings. Watch the style change.
      </p>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
        <div className="text-xs text-gray-500 font-semibold mb-2">Prompt:</div>
        <div className="text-sm text-gray-700">"Explain machine learning in one sentence"</div>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTemperature('low')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            temperature === 'low'
              ? 'bg-blue-600 text-white shadow'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          🥶 Low (0.2)
        </button>
        <button
          onClick={() => setTemperature('medium')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            temperature === 'medium'
              ? 'bg-blue-600 text-white shadow'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          😐 Medium (0.7)
        </button>
        <button
          onClick={() => setTemperature('high')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            temperature === 'high'
              ? 'bg-blue-600 text-white shadow'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          🔥 High (1.0)
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={temperature}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-white p-4 rounded-lg border-2 border-purple-200"
        >
          <div className="text-sm text-gray-700 mb-2">{outputs[temperature].text}</div>
          <div className="text-xs text-gray-500 italic">← {outputs[temperature].note}</div>
        </motion.div>
      </AnimatePresence>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Temperature adds variety, but doesn't change the fundamental fact: same input → similar output.
      </p>
    </div>
  )
}
