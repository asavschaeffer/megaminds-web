'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
export function LazyVsPerfectDemo() {
  const [approach, setApproach] = useState<'perfect' | 'lazy'>('perfect')

  const scenarios = {
    perfect: {
      time: '10 minutes',
      prompt: 'You are an expert email writer with 20 years of experience in professional corporate communications. Write a professional, concise, friendly but not overly casual email to my manager requesting time off. The email should be exactly 3 paragraphs: introduction, justification, and closing. Use a respectful tone. Avoid being too formal or too casual. Make sure to...',
      result: 'Email is fine, but took forever to write the prompt',
      color: 'text-red-600'
    },
    lazy: {
      time: '10 seconds',
      prompt: 'Write an email to my manager requesting time off',
      result: 'Email is fine, maybe add "make it more casual" if needed',
      color: 'text-green-600'
    }
  }

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Compare: Perfect vs Lazy</h3>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setApproach('perfect')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            approach === 'perfect'
              ? 'bg-red-100 text-red-700 border-2 border-red-300'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          😰 Perfect Approach
        </button>
        <button
          onClick={() => setApproach('lazy')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            approach === 'lazy'
              ? 'bg-green-100 text-green-700 border-2 border-green-300'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          😎 Lazy Approach
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={approach}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-3"
        >
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-xs text-gray-500 font-semibold mb-2">
              Time spent: <span className={scenarios[approach].color}>{scenarios[approach].time}</span>
            </div>
            <div className="text-sm text-gray-700 font-mono bg-white p-3 rounded border border-gray-200">
              "{scenarios[approach].prompt}"
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-xs text-gray-500 font-semibold mb-2">Result:</div>
            <div className="text-sm text-gray-700">{scenarios[approach].result}</div>
          </div>
        </motion.div>
      </AnimatePresence>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Both get you a decent email. One takes 60x longer.
      </p>
    </div>
  )
}


export function GaslightDemo() {
  const [version, setVersion] = useState<1 | 2>(1)

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Demo: Edit and Regenerate</h3>
      <p className="text-sm text-gray-500 mb-4">
        Watch how editing your previous message changes the model's response—with no memory of the original.
      </p>

      <div className="space-y-3">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-blue-600 font-semibold">Your message (editable):</div>
            <button
              onClick={() => setVersion(version === 1 ? 2 : 1)}
              className="text-xs text-blue-600 hover:text-blue-800 underline"
            >
              {version === 1 ? 'Edit message' : 'Undo edit'}
            </button>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={version}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-gray-700 bg-white p-3 rounded border border-gray-200"
            >
              {version === 1 ? (
                '"Write a poem about cats"'
              ) : (
                <span>
                  "Write a <span className="bg-yellow-200">haiku</span> about cats<span className="bg-yellow-200">, make it funny</span>"
                </span>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="bg-white p-4 rounded-lg border-2 border-purple-200">
          <div className="text-xs text-purple-600 font-semibold mb-2">AI response:</div>
          <AnimatePresence mode="wait">
            <motion.div
              key={version}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-gray-700"
            >
              {version === 1 ? (
                <div className="space-y-1">
                  <p className="italic">"Whiskers in the moonlight,</p>
                  <p className="italic">Soft paws tread on silent ground,</p>
                  <p className="italic">Purring through the night."</p>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="italic">"Meow means feed me now</p>
                  <p className="italic">Also pet me, also leave—</p>
                  <p className="italic">Cats make perfect sense."</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="text-xs text-gray-500 text-center">
          ↑ The model has no memory that version 1 ever existed. It just reads the current state.
        </div>
      </div>
    </div>
  )
}


export function ReadingThoughtsExample() {
  return (
    <div className="my-8 p-6 bg-gradient-to-br from-gray-50 to-yellow-50 rounded-xl border-2 border-gray-200 not-prose">
      <h4 className="font-semibold text-gray-900 mb-4">Example: Read What Went Wrong</h4>

      <div className="space-y-3 text-sm">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-blue-600 font-semibold mb-2">Your prompt:</div>
          <div className="text-gray-700">"Make this email more professional"</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-purple-600 font-semibold mb-2">AI response:</div>
          <div className="text-gray-700">
            "Dear Sir/Madam, I hope this message finds you well. I am writing to formally request..."
          </div>
          <div className="text-red-600 text-xs mt-2">← Way too formal, sounds like a legal document</div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="text-yellow-900 font-semibold mb-2">What you learned:</div>
          <div className="text-gray-700">
            The model thinks "professional" = "extremely formal." You need to clarify.
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-blue-600 font-semibold mb-2">Edited prompt:</div>
          <div className="text-gray-700">
            "Make this email more professional <span className="bg-green-200">but keep it casual and warm</span>"
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="text-green-800 font-semibold mb-2">New response:</div>
          <div className="text-gray-700">
            "Hi [Name], Hope you're doing well! I wanted to reach out about..."
          </div>
          <div className="text-green-600 text-xs mt-2">✓ Perfect</div>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        The first response told you exactly what was wrong. You didn't guess—you read.
      </p>
    </div>
  )
}


export function WorkflowSteps() {
  return (
    <div className="my-8 not-prose">
      <div className="space-y-3">
        {[
          {
            num: 1,
            title: 'Write the laziest version',
            content: 'Just the core of what you want. No persona, no examples, no elaboration.'
          },
          {
            num: 2,
            title: 'Hit send',
            content: 'Don\'t overthink. Just send it.'
          },
          {
            num: 3,
            title: 'Read the output',
            content: 'Is it good? Great, done. Is it wrong? Read what the model misunderstood.'
          },
          {
            num: 4,
            title: 'Edit your prompt or add a follow-up',
            content: 'If it\'s close, say "make it shorter" or "more casual." If it\'s way off, edit your original message and regenerate.'
          },
          {
            num: 5,
            title: 'Repeat until good',
            content: 'Usually takes 1-2 iterations. If it takes more than 3, start a new chat.'
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


export function LazyWinCard({ task, lazy, why }: { task: string; lazy: string; why: string }) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-5">
      <div className="flex items-start gap-3 mb-3">
        <div className="text-2xl">✅</div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-2">{task}</h4>
          <div className="text-sm text-gray-700 font-mono bg-gray-50 p-3 rounded border border-gray-200 mb-2">
            {lazy}
          </div>
          <div className="text-sm text-gray-600">
            <strong>Why lazy wins:</strong> {why}
          </div>
        </div>
      </div>
    </div>
  )
}
