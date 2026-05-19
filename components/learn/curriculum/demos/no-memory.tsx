'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
export function WhatYouSeeVsWhatItSees() {
  const [view, setView] = useState<'chat' | 'payload'>('chat')

  const messages = [
    { role: 'user', text: 'Can you help me write a cover letter?' },
    { role: 'assistant', text: 'Of course! What position are you applying for?' },
    { role: 'user', text: 'Software engineer at Google' },
    { role: 'assistant', text: 'Great. What are your key qualifications?' },
    { role: 'user', text: 'I have 3 years of Python experience' },
  ]

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">What You See vs. What the Model Sees</h3>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setView('chat')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            view === 'chat' ? 'bg-gray-900 text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          What you see
        </button>
        <button
          onClick={() => setView('payload')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            view === 'payload' ? 'bg-gray-900 text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          What the model sees
        </button>
      </div>

      <AnimatePresence mode="wait">
        {view === 'chat' ? (
          <motion.div
            key="chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-gray-50 rounded-lg border border-gray-200 p-4 space-y-3"
          >
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-md'
                      : 'bg-white border border-gray-200 text-gray-700 rounded-bl-md'
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
            <p className="text-xs text-gray-400 text-center pt-2">
              Looks like a conversation with memory, right?
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="payload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-gray-900 rounded-lg border border-gray-700 p-4 font-mono text-sm overflow-auto"
          >
            <div className="text-gray-500 mb-2">{"// The ENTIRE payload sent for message #5:"}</div>
            <div className="text-yellow-400 mb-3 border-b border-gray-700 pb-3">
              <span className="text-gray-500">system:</span> You are a helpful assistant...
            </div>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`py-1 ${i === messages.length - 1 ? 'text-green-400' : 'text-gray-300'}`}
              >
                <span className={msg.role === 'user' ? 'text-blue-400' : 'text-purple-400'}>
                  {msg.role}:
                </span>{' '}
                {msg.text}
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
              className="text-purple-400 mt-2 pt-2 border-t border-gray-700"
            >
              assistant: <span className="text-gray-500">▊ predicting next token...</span>
            </motion.div>
            <p className="text-xs text-gray-500 mt-4">
              All 5 messages + system prompt sent as ONE request. Every. Single. Time.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


export function AnatomyDiagram() {
  const [expandedSection, setExpandedSection] = useState<number | null>(null)

  const sections = [
    {
      label: 'System Prompt',
      color: 'bg-yellow-50 border-yellow-300',
      tagColor: 'bg-yellow-100 text-yellow-800',
      preview: '"You are a helpful assistant. Be concise..."',
      detail: 'Set by the app (ChatGPT, Claude, etc). You usually don\'t see this. It defines the model\'s personality, rules, and constraints. It\'s the first thing the model reads every time.',
    },
    {
      label: 'Message History',
      color: 'bg-blue-50 border-blue-300',
      tagColor: 'bg-blue-100 text-blue-800',
      preview: 'user: Can you help me...\nassistant: Of course!...\nuser: I need...',
      detail: 'Every single message from the conversation. All of them. The model\'s previous responses are included too—it reads its own output as if someone else wrote it.',
    },
    {
      label: 'Your Latest Message',
      color: 'bg-green-50 border-green-300',
      tagColor: 'bg-green-100 text-green-800',
      preview: 'user: I have 3 years of Python experience',
      detail: 'The thing you just typed. To the model, this is just the last line of a long document. It has no special status—it\'s weighted the same as everything above it.',
    },
    {
      label: 'Model\'s Response',
      color: 'bg-purple-50 border-purple-300',
      tagColor: 'bg-purple-100 text-purple-800',
      preview: 'assistant: ▊ (generating token by token...)',
      detail: 'The model writes this one token at a time. Each new token becomes part of the input for predicting the next token. The response builds on everything above.',
    },
  ]

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Anatomy of a Request</h3>
      <p className="text-sm text-gray-500 mb-4">Click each section to see what it does.</p>

      <div className="space-y-2">
        {sections.map((section, i) => (
          <motion.div
            key={i}
            layout
            className={`rounded-lg border-2 cursor-pointer transition-colors ${section.color} ${
              expandedSection === i ? 'shadow-md' : ''
            }`}
            onClick={() => setExpandedSection(expandedSection === i ? null : i)}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-medium px-2 py-0.5 rounded ${section.tagColor}`}>
                  {section.label}
                </span>
                <motion.span
                  animate={{ rotate: expandedSection === i ? 180 : 0 }}
                  className="text-gray-400 text-sm"
                >
                  ▼
                </motion.span>
              </div>
              <pre className="font-mono text-xs text-gray-600 whitespace-pre-wrap">{section.preview}</pre>
            </div>
            <AnimatePresence>
              {expandedSection === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 pt-2 border-t border-gray-200">
                    <p className="text-sm text-gray-700">{section.detail}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-gray-100 rounded-lg">
        <p className="text-xs text-gray-500 text-center">
          ↑ This entire stack is sent to the model for every single response. Nothing is cached
          between requests. The model starts from zero each time.
        </p>
      </div>
    </div>
  )
}


export function ContextWindowDiagram() {
  const [messageCount, setMessageCount] = useState(5)

  const maxTokens = 128000
  const systemTokens = 500
  const tokensPerMessage = 150

  const usedTokens = systemTokens + messageCount * tokensPerMessage * 2 // user + assistant
  const percentUsed = Math.min((usedTokens / maxTokens) * 100, 100)
  const isFull = usedTokens >= maxTokens

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Context Window Filling Up</h3>
      <p className="text-sm text-gray-500 mb-4">
        Drag the slider to add messages and watch the context window fill.
      </p>

      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-sm text-gray-600 w-24 shrink-0">Messages: {messageCount}</span>
          <input
            type="range"
            min={1}
            max={400}
            value={messageCount}
            onChange={(e) => setMessageCount(Number(e.target.value))}
            className="flex-1"
          />
        </div>

        <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden mb-3">
          <motion.div
            className={`h-full rounded-full ${
              isFull ? 'bg-red-500' : percentUsed > 70 ? 'bg-amber-500' : 'bg-blue-500'
            }`}
            animate={{ width: `${percentUsed}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>

        <div className="flex justify-between text-xs text-gray-500">
          <span>~{usedTokens.toLocaleString()} tokens used</span>
          <span>{maxTokens.toLocaleString()} token limit</span>
        </div>

        {isFull && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 text-sm text-red-600 font-medium"
          >
            Context window full. Oldest messages are being dropped. The model no
            longer knows how the conversation started.
          </motion.p>
        )}

        {!isFull && messageCount > 50 && (
          <p className="mt-3 text-sm text-amber-600">
            At {messageCount} back-and-forths, the model is re-reading ~{(messageCount * 2).toLocaleString()} messages
            every time you hit send.
          </p>
        )}
      </div>
    </div>
  )
}


export function InferenceDiagram() {
  const [step, setStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hoveredGenToken, setHoveredGenToken] = useState<number | null>(null)

  const contextTokens = [
    { text: 'system:', color: 'text-yellow-400', type: 'label' },
    { text: ' You are a helpful assistant...', color: 'text-yellow-400/70', type: 'system' },
    { text: 'user:', color: 'text-blue-400', type: 'label' },
    { text: ' Write me a cover letter.', color: 'text-blue-400/70', type: 'user' },
    { text: ' I have 3 years Python.', color: 'text-blue-400/70', type: 'user' },
  ]

  const genTokens = ['Based', ' on', ' your', ' experience', ',', ' here', "'s", ' a', ' draft', ':']

  const displayedTokens = genTokens.slice(0, step)

  // Simulated attention: which context tokens matter most for each generated token
  // Values are relative attention weights for [system, user-msg-1, user-msg-2]
  const attentionPatterns: number[][] = [
    [0.3, 0.2, 0.5],   // "Based" — user request + system
    [0.1, 0.3, 0.6],   // " on" — user details
    [0.1, 0.2, 0.7],   // " your" — user's experience
    [0.05, 0.15, 0.8],  // " experience" — strongly from "3 years Python"
    [0.1, 0.3, 0.6],   // "," — structural
    [0.4, 0.3, 0.3],   // " here" — system prompt (be helpful)
    [0.3, 0.3, 0.4],   // "'s" — structural
    [0.2, 0.5, 0.3],   // " a" — cover letter request
    [0.1, 0.7, 0.2],   // " draft" — from "cover letter"
    [0.2, 0.4, 0.4],   // ":" — structural
  ]

  const activeAttention = hoveredGenToken !== null ? attentionPatterns[hoveredGenToken] : null

  const play = () => {
    setStep(0)
    setHoveredGenToken(null)
    setIsPlaying(true)
    let current = 0
    const interval = setInterval(() => {
      current++
      setStep(current)
      if (current >= genTokens.length) {
        clearInterval(interval)
        setIsPlaying(false)
      }
    }, 500)
  }

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Token-by-Token Generation</h3>
      <p className="text-sm text-gray-500 mb-4">
        Hit generate, then hover over any generated token to see which parts of the
        input it's paying attention to. Brighter = more influence.
      </p>

      <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm mb-4">
        {/* Context / payload */}
        <div className="text-gray-500 mb-2 text-xs">{"// Full payload sent with each token:"}</div>

        {/* System prompt line */}
        <div className={`text-xs mb-1 py-0.5 px-1 rounded transition-all duration-200 ${
          activeAttention ? `bg-yellow-400/${Math.round(activeAttention[0] * 30 + 5)}` : ''
        }`}>
          <span className="text-yellow-400">system:</span>
          <span className={`transition-all duration-200 ${
            activeAttention
              ? `text-yellow-${activeAttention[0] > 0.3 ? '300' : '400/50'}`
              : 'text-yellow-400/70'
          }`}> You are a helpful assistant...</span>
          {activeAttention && (
            <span className="text-yellow-500/80 text-xs ml-2">
              ← {(activeAttention[0] * 100).toFixed(0)}%
            </span>
          )}
        </div>

        {/* User message line 1 */}
        <div className={`text-xs mb-1 py-0.5 px-1 rounded transition-all duration-200 ${
          activeAttention ? `bg-blue-400/${Math.round(activeAttention[1] * 30 + 5)}` : ''
        }`}>
          <span className="text-blue-400">user:</span>
          <span className={`transition-all duration-200 ${
            activeAttention
              ? `text-blue-${activeAttention[1] > 0.3 ? '300' : '400/50'}`
              : 'text-blue-400/70'
          }`}> Write me a cover letter.</span>
          {activeAttention && (
            <span className="text-blue-500/80 text-xs ml-2">
              ← {(activeAttention[1] * 100).toFixed(0)}%
            </span>
          )}
        </div>

        {/* User message line 2 */}
        <div className={`text-xs mb-1 py-0.5 px-1 rounded transition-all duration-200 ${
          activeAttention ? `bg-blue-400/${Math.round(activeAttention[2] * 30 + 5)}` : ''
        }`}>
          <span className={`transition-all duration-200 ${
            activeAttention
              ? `text-blue-${activeAttention[2] > 0.5 ? '200 font-medium' : '400/50'}`
              : 'text-blue-400/70'
          }`}> I have 3 years of Python experience.</span>
          {activeAttention && (
            <span className="text-blue-500/80 text-xs ml-2">
              ← {(activeAttention[2] * 100).toFixed(0)}%
            </span>
          )}
        </div>

        {/* Generated response */}
        <div className="text-purple-400 mt-2 pt-2 border-t border-gray-700">
          assistant:{' '}
          {displayedTokens.map((token, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, backgroundColor: 'rgba(34, 197, 94, 0.4)' }}
              animate={{ opacity: 1, backgroundColor: 'rgba(34, 197, 94, 0)' }}
              transition={{ duration: 0.6 }}
              className={`cursor-pointer transition-all duration-150 ${
                hoveredGenToken === i
                  ? 'text-green-300 bg-green-400/20 rounded px-0.5'
                  : 'text-green-400'
              }`}
              onMouseEnter={() => !isPlaying && setHoveredGenToken(i)}
              onMouseLeave={() => setHoveredGenToken(null)}
            >
              {token}
            </motion.span>
          ))}
          {step < genTokens.length && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="text-green-500"
            >
              ▊
            </motion.span>
          )}
        </div>

        {/* Attention explanation */}
        {hoveredGenToken !== null && !isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 pt-2 border-t border-gray-700 text-xs text-gray-400"
          >
            To generate "<span className="text-green-400">{genTokens[hoveredGenToken]}</span>",
            the model attended most to{' '}
            <span className={
              activeAttention && activeAttention[2] > activeAttention[1] && activeAttention[2] > activeAttention[0]
                ? 'text-blue-300' : activeAttention && activeAttention[1] > activeAttention[0]
                  ? 'text-blue-300' : 'text-yellow-300'
            }>
              {activeAttention && activeAttention[2] > activeAttention[1] && activeAttention[2] > activeAttention[0]
                ? '"3 years of Python"'
                : activeAttention && activeAttention[1] > activeAttention[0]
                  ? '"Write me a cover letter"'
                  : '"You are a helpful assistant"'
              }
            </span>
            {hoveredGenToken > 0 && (
              <span> + the {hoveredGenToken} previously generated token{hoveredGenToken > 1 ? 's' : ''}</span>
            )}.
          </motion.div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={play}
          disabled={isPlaying}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            isPlaying
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-900 text-white hover:bg-gray-700'
          }`}
        >
          {isPlaying ? 'Generating...' : step > 0 ? 'Replay' : 'Generate'}
        </button>
        {step > 0 && !isPlaying && (
          <span className="text-xs text-gray-500">
            {step} tokens generated. Hover each one to see what it attended to.
          </span>
        )}
      </div>
    </div>
  )
}
