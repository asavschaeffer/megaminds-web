'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
export function PromptIsRealityDiagram() {
  // Pretraining knowledge — fragments of the internet visible in the background
  const pretrainingFragments = [
    'The mitochondria is the powerhouse of the cell',
    'SELECT * FROM users WHERE',
    'In 1969, Apollo 11 landed on',
    'function fibonacci(n) { return',
    'Freud interpreted dreams as',
    'border-radius: 50%; display: flex',
    'The capital of France is Paris',
    'import numpy as np',
    'Shakespeare wrote 37 plays',
    'E = mc²',
    'The Great Wall of China spans',
    'def __init__(self, *args)',
    'Photosynthesis converts light',
    'Cogito ergo sum — Descartes',
    'TCP/IP protocol stack consists',
    'The unconscious mind contains',
    'Array.prototype.map()',
    'Kant\'s categorical imperative',
    'Mix flour, sugar, and eggs',
    'The speed of light is 299,792',
    'Gandhi led the Salt March in',
    'margin: 0 auto; max-width:',
    'Jungian archetypes include the',
    'git commit -m "fix: resolve',
    'DNA is a double helix structure',
    'Supply and demand curves',
    'The Treaty of Westphalia 1648',
    'async function fetchData() {',
    'Maslow\'s hierarchy of needs',
    'H₂O consists of two hydrogen',
    'The Silk Road connected East',
    'chmod 755 /usr/local/bin',
    'Aristotle distinguished between',
    'The human genome contains ~3B',
    'POST /api/v1/chat/completions',
    'Picasso\'s Blue Period began',
    'Schrödinger\'s cat is both',
    'npm install --save-dev',
    'The Rosetta Stone was found in',
    'Bayesian inference updates',
  ]

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">The Model's Entire Universe</h3>

      <div className="bg-gray-900 rounded-lg border border-gray-700 relative overflow-hidden" style={{ minHeight: '320px' }}>

        {/* Background: pretraining knowledge — the vast ocean */}
        <div className="absolute inset-0 overflow-hidden select-none pointer-events-none">
          {pretrainingFragments.map((fragment, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.12, 0.08, 0.12, 0] }}
              transition={{
                duration: 8 + (i % 5) * 2,
                delay: (i * 0.7) % 6,
                repeat: Infinity,
                repeatDelay: (i * 1.3) % 8,
              }}
              className="absolute font-mono text-gray-500 whitespace-nowrap"
              style={{
                fontSize: `${9 + (i % 3) * 2}px`,
                top: `${(i * 37) % 95}%`,
                left: `${(i * 53) % 90}%`,
                transform: `rotate(${(i % 7 - 3) * 2}deg)`,
              }}
            >
              {fragment}
            </motion.div>
          ))}

          {/* Gradient overlay so background text fades at edges */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-transparent to-gray-900/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-transparent to-gray-900/80" />
        </div>

        {/* Label for the background */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute top-3 right-4 z-10"
        >
          <span className="text-[10px] text-gray-600 font-mono bg-gray-900/80 px-2 py-1 rounded">
            ← pretraining knowledge (10TB compressed)
          </span>
        </motion.div>

        {/* Foreground: the prompt — the focused window */}
        <div className="relative z-10 p-6">
          <div className="text-xs text-gray-500 mb-3 font-mono">{"// Everything the model knows about YOU:"}</div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="border-2 border-green-500/50 bg-gray-900/95 rounded-lg p-4 shadow-lg shadow-green-500/5 backdrop-blur-sm"
          >
            <div className="text-yellow-400 text-sm font-mono mb-2">
              system: You are a helpful assistant.
            </div>
            <div className="text-blue-400 text-sm font-mono mb-2">
              user: Help me plan a birthday party for 20 people
            </div>
            <div className="text-purple-400 text-sm font-mono">
              assistant: <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="text-green-400"
              >▊</motion.span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-3 text-center"
          >
            <span className="text-xs text-gray-400 font-mono">
              ↑ This is all it knows about your situation. Everything else comes from pretraining. ↑
            </span>
          </motion.div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-xs font-medium text-red-800 mb-1">Doesn't know about you:</p>
          <ul className="text-xs text-red-600 space-y-0.5">
            <li>• Your budget</li>
            <li>• That it's for your mom</li>
            <li>• That you hate balloons</li>
            <li>• Your previous chats</li>
          </ul>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-xs font-medium text-green-800 mb-1">Knows from the prompt:</p>
          <ul className="text-xs text-green-600 space-y-0.5">
            <li>• It should be helpful</li>
            <li>• It's a birthday party</li>
            <li>• 20 people</li>
          </ul>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs font-medium text-blue-800 mb-1">Knows from pretraining:</p>
          <ul className="text-xs text-blue-600 space-y-0.5">
            <li>• What birthday parties are</li>
            <li>• Venue types, catering, decor</li>
            <li>• Event planning best practices</li>
            <li>• ...and everything else online</li>
          </ul>
        </div>
      </div>
    </div>
  )
}


export function WhatTheModelKnowsDiagram() {
  const [promptText, setPromptText] = useState('Help me plan a birthday party')

  const prompts = [
    {
      text: 'Help me plan a birthday party',
      response: "Here are some general birthday party ideas:\n1. Choose a venue\n2. Pick a theme\n3. Send invitations...",
      quality: 'generic',
    },
    {
      text: "Help me plan a birthday party for my mom's 60th. Budget is $500. 20 guests. She loves gardening and hates surprises. Outdoor venue preferred.",
      response: "For a 60th garden-themed celebration with 20 guests on a $500 budget:\n• Rent a botanical garden pavilion (~$150)\n• Potted herb centerpieces guests take home (~$80)\n• Catering: afternoon tea service (~$200)...",
      quality: 'specific',
    },
  ]

  const [selectedPrompt, setSelectedPrompt] = useState(0)
  const current = prompts[selectedPrompt]

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">More Context = Better Output</h3>
      <p className="text-sm text-gray-500 mb-4">
        Toggle between a vague prompt and a specific one. Same model, wildly different results.
      </p>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setSelectedPrompt(0)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            selectedPrompt === 0 ? 'bg-gray-900 text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Vague prompt
        </button>
        <button
          onClick={() => setSelectedPrompt(1)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            selectedPrompt === 1 ? 'bg-gray-900 text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Specific prompt
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedPrompt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
            <div className={`p-4 border-b-2 ${
              current.quality === 'generic' ? 'border-amber-300 bg-amber-50' : 'border-green-300 bg-green-50'
            }`}>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Your prompt</span>
              <p className="mt-1 text-sm text-gray-800 font-mono">{current.text}</p>
            </div>
            <div className="p-4">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Model response</span>
              <pre className="mt-1 text-sm text-gray-700 whitespace-pre-wrap font-mono">{current.response}</pre>
            </div>
          </div>

          <p className={`mt-3 text-sm font-medium ${
            current.quality === 'generic' ? 'text-amber-600' : 'text-green-600'
          }`}>
            {current.quality === 'generic'
              ? '↑ Generic prompt → generic output. The model filled in the blanks with the most average answer.'
              : '↑ Specific context → specific, useful output. Same model, but now it has something to work with.'
            }
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}


export function PromptAnatomyDiagram() {
  const [activeSection, setActiveSection] = useState<number | null>(null)

  const sections = [
    {
      label: 'Role',
      color: 'bg-purple-100 border-purple-300 text-purple-900',
      tagColor: 'bg-purple-200 text-purple-800',
      example: 'You are a senior software engineer who values clean, readable code.',
      description: 'Tell the model who to be. This shapes its vocabulary, tone, priorities, and what it considers "good."',
    },
    {
      label: 'Task',
      color: 'bg-blue-100 border-blue-300 text-blue-900',
      tagColor: 'bg-blue-200 text-blue-800',
      example: 'Review this function and suggest improvements for readability.',
      description: 'What you want it to do. Be specific about the output you want — a list? A rewrite? An explanation?',
    },
    {
      label: 'Context / Examples',
      color: 'bg-green-100 border-green-300 text-green-900',
      tagColor: 'bg-green-200 text-green-800',
      example: 'Here\'s the function:\n```\nfunction x(a,b){return a.filter(i=>b.includes(i))}\n```\nI want the review to look like: "Line X: [issue]. Suggestion: [fix]"',
      description: 'Give it the material to work with and show it what good output looks like. The more concrete, the better.',
    },
  ]

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Three Parts of a Good Prompt</h3>

      <div className="space-y-2">
        {sections.map((section, i) => (
          <motion.div
            key={i}
            className={`rounded-lg border-2 cursor-pointer transition-all ${section.color} ${
              activeSection === i ? 'shadow-md' : 'hover:shadow-sm'
            }`}
            onClick={() => setActiveSection(activeSection === i ? null : i)}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold opacity-30">{i + 1}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${section.tagColor}`}>
                    {section.label}
                  </span>
                </div>
                <motion.span
                  animate={{ rotate: activeSection === i ? 180 : 0 }}
                  className="text-gray-400 text-sm"
                >
                  ▼
                </motion.span>
              </div>
              <pre className="font-mono text-xs whitespace-pre-wrap opacity-80">{section.example}</pre>
            </div>
            <AnimatePresence>
              {activeSection === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 pt-2 border-t border-gray-200/50">
                    <p className="text-sm">{section.description}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <p className="mt-4 text-sm text-gray-500">
        You don't always need all three. Sometimes "fix this bug" is enough. But when
        output isn't what you want, one of these three is usually what's missing.
      </p>
    </div>
  )
}
