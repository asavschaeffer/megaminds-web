'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
export function MultimodelingDemo() {
  const [step, setStep] = useState<'initial' | 'confusing' | 'newchat' | 'clarified'>('initial')

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Watch: Multimodeling in Action</h3>

      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          { key: 'initial', label: '1. Ask ChatGPT' },
          { key: 'confusing', label: '2. Confusing Answer' },
          { key: 'newchat', label: '3. Ask Claude' },
          { key: 'clarified', label: '4. Clear Answer' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setStep(key as typeof step)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              step === key
                ? 'bg-blue-600 text-white shadow'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-gray-50 rounded-lg p-5 border border-gray-200"
        >
          {step === 'initial' && (
            <div className="space-y-3">
              <div className="text-xs text-gray-500 font-semibold mb-2">Chat with ChatGPT:</div>
              <div className="flex items-start gap-3">
                <div className="text-blue-600 font-semibold text-sm shrink-0">You:</div>
                <div className="text-gray-700 text-sm">"What is quantum entanglement?"</div>
              </div>
            </div>
          )}

          {step === 'confusing' && (
            <div className="space-y-3">
              <div className="text-xs text-gray-500 font-semibold mb-2">Chat with ChatGPT:</div>
              <div className="flex items-start gap-3">
                <div className="text-green-600 font-semibold text-sm shrink-0">ChatGPT:</div>
                <div className="text-gray-700 text-sm">
                  "Quantum entanglement is a phenomenon where pairs of particles become correlated
                  such that the quantum state of one particle cannot be described independently of
                  the state of the other, even when separated by large distances. This non-local
                  correlation is a fundamental feature of quantum mechanics..."
                  <div className="text-red-600 italic mt-2 text-xs">← You read this 3 times. Still confused.</div>
                </div>
              </div>
            </div>
          )}

          {step === 'newchat' && (
            <div className="space-y-4">
              <div className="text-xs text-gray-500 font-semibold">New chat with Claude:</div>
              <div className="flex items-start gap-3">
                <div className="text-blue-600 font-semibold text-sm shrink-0">You:</div>
                <div className="text-gray-700 text-sm">
                  "Explain this to me like I'm 12: [paste ChatGPT's response]"
                </div>
              </div>
              <div className="text-xs text-gray-500 italic">
                ↑ Fresh chat. Claude has zero context from your ChatGPT conversation.
              </div>
            </div>
          )}

          {step === 'clarified' && (
            <div className="space-y-3">
              <div className="text-xs text-gray-500 font-semibold mb-2">Chat with Claude:</div>
              <div className="flex items-start gap-3">
                <div className="text-purple-600 font-semibold text-sm shrink-0">Claude:</div>
                <div className="text-gray-700 text-sm">
                  "Imagine you have two magic coins. When you flip one and it lands on heads, the
                  other coin—no matter how far away—instantly lands on tails. They're linked in a
                  spooky way. That's basically quantum entanglement. The particles are 'connected'
                  so measuring one instantly affects the other."
                  <div className="text-green-600 italic mt-2 text-xs">✓ Oh! Now you get it.</div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Same concept, different framing. The second model used analogies you could understand.
      </p>
    </div>
  )
}


export function UseCases() {
  const cases = [
    {
      icon: '🤔',
      title: 'Clarification',
      description: 'Model A\'s response is too complex or uses jargon you don\'t know',
      action: 'Paste into Model B → "Explain this simply"'
    },
    {
      icon: '✅',
      title: 'Verification',
      description: 'Model A said something that seems wrong or you want to fact-check',
      action: 'Paste into Model B → "Is this accurate?"'
    },
    {
      icon: '🔄',
      title: 'Alternative Framing',
      description: 'Model A\'s explanation didn\'t click for you',
      action: 'Paste into Model B → "Explain this a different way"'
    },
    {
      icon: '🚀',
      title: 'Model Switching',
      description: 'Your prompt works in Claude but not ChatGPT (or vice versa)',
      action: 'Just try the same prompt in different models until one works'
    },
    {
      icon: '💡',
      title: 'Learning',
      description: 'You want to deeply understand a concept',
      action: 'Read explanations from 2-3 different models to build a complete mental model'
    }
  ]

  return (
    <div className="my-8 space-y-3 not-prose">
      {cases.map((useCase, i) => (
        <div key={i} className="bg-gray-50 p-5 rounded-xl border border-gray-200">
          <div className="flex items-start gap-4">
            <div className="text-3xl shrink-0">{useCase.icon}</div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">{useCase.title}</h4>
              <p className="text-sm text-gray-600 mb-2">{useCase.description}</p>
              <div className="text-xs font-mono text-blue-600 bg-white px-3 py-2 rounded border border-gray-200">
                {useCase.action}
              </div>
            </div>
          </div>
        </div>
      ))}
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
            title: 'Get a confusing response from Model A',
            content: 'You asked ChatGPT something, the answer makes no sense'
          },
          {
            num: 2,
            title: 'Copy the confusing response',
            content: 'Ctrl+C the whole thing'
          },
          {
            num: 3,
            title: 'Open Model B (or new chat)',
            content: 'Different model, or just a fresh chat in the same model'
          },
          {
            num: 4,
            title: 'Ask for clarification',
            content: '"Explain this to me: [paste]" or "Is this correct? [paste]"'
          },
          {
            num: 5,
            title: 'Get a clearer answer',
            content: 'Fresh perspective, different framing. Now you understand.'
          },
          {
            num: 6,
            title: 'Go back to Model A with better questions',
            content: 'Now that you understand, you can ask Model A more specific follow-ups'
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


export function ExampleCard({ scenario, action, result }: { scenario: string; action: string; result: string }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className="bg-white border-2 border-gray-200 rounded-xl p-5 cursor-pointer hover:border-blue-300 transition-colors"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-2">{scenario}</h4>
          <div className="text-sm text-gray-600">
            <strong>Action:</strong>
          </div>
          <div className="text-xs text-gray-700 bg-gray-50 p-3 rounded border border-gray-200 mt-1">
            {action}
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
                <strong className="text-green-700">Result:</strong> {result}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
