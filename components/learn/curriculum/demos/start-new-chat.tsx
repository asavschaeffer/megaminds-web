'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
export function StartNewChatButton() {
  const [clicks, setClicks] = useState(0)

  const messages = [
    "Good. Do it again.",
    "Yes. Keep going.",
    "That's the spirit.",
    "You're getting it.",
    "Perfect. One more time.",
    "EXACTLY. This is the way.",
    "You are now enlightened. 🙏"
  ]

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose text-center">
      <p className="text-sm text-gray-500 mb-4">
        Practice the most important action in AI usage:
      </p>

      <button
        onClick={() => setClicks(clicks + 1)}
        className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white text-lg font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
      >
        🔄 START A NEW CHAT
      </button>

      <AnimatePresence mode="wait">
        {clicks > 0 && clicks <= messages.length && (
          <motion.p
            key={clicks}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 text-gray-700 font-medium"
          >
            {messages[clicks - 1]}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}


export function WhenToStartFresh() {
  const triggers = [
    { emoji: '❌', rule: 'After 2 failures in a row', action: 'MANDATORY. Do not pass go.' },
    { emoji: '😤', rule: 'When you\'re frustrated', action: 'Your emotions are a signal. Listen to them.' },
    { emoji: '🔁', rule: 'When you repeat yourself', action: 'If you\'ve said the same thing twice, start fresh.' },
    { emoji: '📉', rule: 'When output quality degrades', action: 'Getting worse instead of better? Fresh start.' },
    { emoji: '🤯', rule: 'When the conversation is confusing', action: 'Lost track of what you wanted? Reset.' },
    { emoji: '⏰', rule: 'When you\'ve spent 10+ minutes iterating', action: 'Fresh start would have been faster.' },
  ]

  return (
    <div className="my-8 p-6 bg-green-50 rounded-xl border-2 border-green-300 not-prose">
      <h4 className="font-semibold text-green-900 mb-4">✅ When to Start a New Chat</h4>
      <div className="space-y-3">
        {triggers.map((trigger, i) => (
          <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-lg">
            <span className="text-2xl shrink-0">{trigger.emoji}</span>
            <div className="flex-1">
              <div className="font-semibold text-gray-900 mb-1">{trigger.rule}</div>
              <div className="text-sm text-gray-600">{trigger.action}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


export function HowToStartFresh() {
  return (
    <div className="my-8 not-prose">
      <div className="space-y-3">
        {[
          {
            num: 1,
            title: 'Analyze what went wrong',
            content: 'Read the failed conversation. What did the model misunderstand? What was unclear in your prompt? What worked and what didn\'t?'
          },
          {
            num: 2,
            title: 'Extract the lessons',
            content: 'Not the text—the insights. "The model needed examples" or "I forgot to specify the tone" or "My request was too vague."'
          },
          {
            num: 3,
            title: 'Click "New Chat" (or whatever your app calls it)',
            content: 'Fresh window. Clean slate. Zero context from the old conversation.'
          },
          {
            num: 4,
            title: 'Write a better prompt',
            content: 'Use what you learned. Add examples if needed. Be specific about what you want. Avoid the mistakes from attempt 1.'
          },
          {
            num: 5,
            title: 'Send it',
            content: 'Clean context + better prompt = better output. Usually works on the first try.'
          },
        ].map((step) => (
          <div key={step.num} className="flex items-start gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
              {step.num}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900 mb-1">{step.title}</div>
              <div className="text-sm text-gray-600">{step.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


export function FreshStartExample() {
  const [version, setVersion] = useState<'old' | 'new'>('old')

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Before & After: The Fresh Start</h3>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setVersion('old')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            version === 'old'
              ? 'bg-red-600 text-white shadow'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          ❌ Old Chat (Polluted)
        </button>
        <button
          onClick={() => setVersion('new')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            version === 'new'
              ? 'bg-green-600 text-white shadow'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          ✅ New Chat (Clean)
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={version}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-3"
        >
          {version === 'old' ? (
            <>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm">
                <div className="font-mono text-xs text-gray-600 space-y-1">
                  <div><span className="text-blue-600">user:</span> Write a cover letter</div>
                  <div><span className="text-purple-600">assistant:</span> [Generic template]</div>
                  <div><span className="text-blue-600">user:</span> Make it more personal</div>
                  <div><span className="text-purple-600">assistant:</span> [Overly emotional]</div>
                  <div><span className="text-blue-600">user:</span> Less emotional, more professional</div>
                  <div><span className="text-purple-600">assistant:</span> [Back to generic]</div>
                  <div><span className="text-blue-600">user:</span> NO like a real person would write</div>
                  <div><span className="text-purple-600">assistant:</span> [Confused mess]</div>
                </div>
                <div className="text-red-600 text-xs mt-3 font-semibold">
                  ← 8 messages, 4 failures, total confusion
                </div>
              </div>
              <div className="text-sm text-gray-500 italic">
                Time wasted: 15 minutes. Frustration level: high. Output quality: garbage.
              </div>
            </>
          ) : (
            <>
              <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300 text-sm">
                <div className="font-semibold text-green-900 mb-2">New chat, better prompt:</div>
                <div className="bg-white p-3 rounded border border-gray-200 mb-3">
                  "Write a cover letter for a software engineer position at Google. Tone: professional
                  but warm (not corporate). Highlight: 3 years Python, leadership on API redesign,
                  passion for scalable systems. Keep it 3 paragraphs, under 300 words."
                </div>
                <div className="text-purple-600 font-semibold mb-1">Result:</div>
                <div className="text-gray-700">
                  [Perfect cover letter on the first try]
                </div>
                <div className="text-green-600 text-xs mt-3 font-semibold">
                  ✓ 1 message, 1 success, done
                </div>
              </div>
              <div className="text-sm text-gray-500 italic">
                Time spent: 2 minutes. Frustration level: zero. Output quality: excellent.
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Same goal. One took 15 minutes and failed. The other took 2 minutes and worked.
      </p>
    </div>
  )
}
