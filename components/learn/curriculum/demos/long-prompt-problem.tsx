'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
export function ContextPollutionDemo() {
  const [round, setRound] = useState(1)

  const conversation = [
    { round: 1, user: 'Write a professional email', ai: 'Dear Sir/Madam, I hope this correspondence finds you...', feedback: '❌ Too formal' },
    { round: 2, user: 'Less formal', ai: 'Hey! So I was thinking...', feedback: '❌ Too casual' },
    { round: 3, user: 'More professional but warm', ai: 'Hello, I wanted to reach out regarding...', feedback: '❌ Still not quite right' },
    { round: 4, user: 'Make it shorter', ai: 'Hi, Quick note about...', feedback: '❌ Too brief now' },
    { round: 5, user: 'Just make it like a normal email!', ai: 'Subject: Following Up...', feedback: '😤 Giving up' },
  ]

  const currentConversation = conversation.slice(0, round)

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Watch: Context Pollution in Action</h3>
      <p className="text-sm text-gray-500 mb-4">
        Step through each round. Notice how the context grows with each failed attempt.
      </p>

      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((r) => (
          <button
            key={r}
            onClick={() => setRound(r)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              round === r
                ? 'bg-red-600 text-white shadow'
                : round > r
                  ? 'bg-red-100 text-red-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Round {r}
          </button>
        ))}
      </div>

      <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs max-h-80 overflow-y-auto">
        <div className="text-gray-500 mb-2">{"// The model reads ALL of this:"}</div>
        <div className="text-yellow-400 mb-2 pb-2 border-b border-gray-700">
          <span className="text-gray-500">system:</span> You are a helpful assistant...
        </div>
        <AnimatePresence>
          {currentConversation.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ delay: i * 0.05 }}
              className="mb-3 pb-3 border-b border-gray-700"
            >
              <div className="text-blue-400 mb-1">
                user: <span className="text-gray-300">{item.user}</span>
              </div>
              <div className="text-purple-400 mb-1">
                assistant: <span className="text-gray-300">{item.ai}</span>
              </div>
              <div className="text-red-400 text-xs">
                {item.feedback}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {round === 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-xs"
          >
            ← 5 failed attempts + 5 corrections = polluted context
          </motion.div>
        )}
      </div>

      <p className="text-xs text-gray-500 mt-3 text-center">
        By round 5, the model is reading 10+ messages of conflicting instructions and failures.
      </p>
    </div>
  )
}


export function PayloadGrowthVisualization() {
  const [messageCount, setMessageCount] = useState(4)

  const tokenCounts = [
    { messages: 2, tokens: 150, color: 'bg-green-500' },
    { messages: 4, tokens: 400, color: 'bg-yellow-500' },
    { messages: 8, tokens: 1000, color: 'bg-orange-500' },
    { messages: 16, tokens: 2400, color: 'bg-red-500' },
    { messages: 32, tokens: 5000, color: 'bg-red-700' },
  ]

  const current = tokenCounts.find(t => t.messages === messageCount) || tokenCounts[0]

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">The Payload Grows With Each Round</h3>
      <p className="text-sm text-gray-500 mb-4">
        Drag to see how the payload size explodes with back-and-forth.
      </p>

      <div className="flex items-center gap-4 mb-4">
        <span className="text-sm text-gray-600 w-40 shrink-0">
          Messages: {messageCount}
        </span>
        <input
          type="range"
          min={2}
          max={32}
          step={1}
          value={messageCount}
          onChange={(e) => {
            const val = Number(e.target.value)
            const closest = tokenCounts.reduce((prev, curr) =>
              Math.abs(curr.messages - val) < Math.abs(prev.messages - val) ? curr : prev
            )
            setMessageCount(closest.messages)
          }}
          className="flex-1"
        />
      </div>

      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden mb-3">
          <motion.div
            className={`h-full rounded-full ${current.color}`}
            animate={{ width: `${(current.tokens / 5000) * 100}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>

        <div className="flex justify-between text-xs text-gray-500 mb-4">
          <span>~{current.tokens} tokens</span>
          <span>{messageCount} messages</span>
        </div>

        {messageCount >= 16 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-red-600 font-medium"
          >
            ⚠️ Context is heavily polluted. The model is reading thousands of tokens of
            back-and-forth. Start a new chat.
          </motion.p>
        )}

        {messageCount >= 8 && messageCount < 16 && (
          <p className="text-sm text-orange-600">
            Getting messy. Consider starting fresh if the next attempt fails.
          </p>
        )}
      </div>
    </div>
  )
}


export function WhatToDoInstead() {
  const strategies = [
    {
      title: 'Edit, don\'t add',
      description: 'Instead of saying "no, do it like this" in a new message, go back and EDIT your original message to be clearer. Then regenerate.',
      icon: '✏️'
    },
    {
      title: 'Start fresh after 3 failures',
      description: 'If it failed twice, the third attempt is unlikely to work. Start a new chat with a better prompt based on what you learned.',
      icon: '🔄'
    },
    {
      title: 'Use examples instead of corrections',
      description: 'Instead of "more professional," show an example: "Like this: [paste example]"',
      icon: '📋'
    },
    {
      title: 'Ask yourself: is my prompt clear?',
      description: 'If the model keeps failing, your instructions are probably ambiguous. Clarify the prompt, don\'t iterate on failures.',
      icon: '🤔'
    },
  ]

  return (
    <div className="my-8 space-y-3 not-prose">
      {strategies.map((strategy, i) => (
        <div key={i} className="bg-green-50 p-5 rounded-xl border-2 border-green-200">
          <div className="flex items-start gap-4">
            <div className="text-3xl shrink-0">{strategy.icon}</div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">{strategy.title}</h4>
              <p className="text-sm text-gray-700">{strategy.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
