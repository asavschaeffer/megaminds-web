'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export function CanvasChatComparison() {
  const [mode, setMode] = useState<'chat' | 'canvas'>('chat')

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Chat vs. Canvas Mode</h3>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode('chat')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            mode === 'chat'
              ? 'bg-blue-600 text-white shadow'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          💬 Regular Chat
        </button>
        <button
          onClick={() => setMode('canvas')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            mode === 'canvas'
              ? 'bg-purple-600 text-white shadow'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          📄 Canvas Mode
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-gray-50 p-5 rounded-lg border border-gray-200"
        >
          {mode === 'chat' ? (
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="text-blue-600 font-semibold shrink-0">You:</div>
                <div className="text-gray-700">"Write a cover letter"</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-purple-600 font-semibold shrink-0">AI:</div>
                <div className="text-gray-700 bg-white p-3 rounded border border-gray-200">
                  [Entire cover letter displayed in chat]
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-blue-600 font-semibold shrink-0">You:</div>
                <div className="text-gray-700">"Make paragraph 2 shorter"</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-purple-600 font-semibold shrink-0">AI:</div>
                <div className="text-gray-700 bg-white p-3 rounded border border-gray-200">
                  [Entire cover letter again, with paragraph 2 edited]
                </div>
              </div>
              <div className="text-red-600 text-xs mt-3">
                ❌ The document is mixed with the conversation. Hard to track what changed.
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded border border-gray-200">
                <div className="text-xs text-gray-500 font-semibold mb-2">Conversation:</div>
                <div className="space-y-2 text-xs text-gray-700">
                  <div><span className="text-blue-600">You:</span> Write a cover letter</div>
                  <div><span className="text-purple-600">AI:</span> Created a cover letter</div>
                  <div><span className="text-blue-600">You:</span> Make paragraph 2 shorter</div>
                  <div><span className="text-purple-600">AI:</span> Updated paragraph 2</div>
                </div>
              </div>
              <div className="bg-white p-4 rounded border-2 border-purple-300">
                <div className="text-xs text-purple-700 font-semibold mb-2">📄 Canvas Document:</div>
                <div className="text-xs text-gray-700 bg-gray-50 p-2 rounded">
                  [The actual cover letter lives here. Updates in real-time.]
                </div>
              </div>
              <div className="col-span-2 text-green-600 text-xs">
                ✅ Conversation is separate from the document. Clean, organized, easy to iterate.
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}


export function ContextConsumptionDemo() {
  const [documentSize, setDocumentSize] = useState<'small' | 'medium' | 'large'>('small')

  const sizes = {
    small: { lines: 50, tokens: 400, color: 'bg-green-500' },
    medium: { lines: 200, tokens: 2000, color: 'bg-yellow-500' },
    large: { lines: 500, tokens: 6000, color: 'bg-red-500' },
  }

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Context Consumption: Document Size Matters</h3>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setDocumentSize('small')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            documentSize === 'small'
              ? 'bg-green-600 text-white shadow'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          📝 Small Doc (50 lines)
        </button>
        <button
          onClick={() => setDocumentSize('medium')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            documentSize === 'medium'
              ? 'bg-yellow-600 text-white shadow'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          📄 Medium Doc (200 lines)
        </button>
        <button
          onClick={() => setDocumentSize('large')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            documentSize === 'large'
              ? 'bg-red-600 text-white shadow'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          📚 Large Doc (500 lines)
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={documentSize}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-gray-50 p-5 rounded-lg border border-gray-200"
        >
          <div className="mb-3">
            <div className="text-sm text-gray-700 mb-2">
              <strong>Document:</strong> {sizes[documentSize].lines} lines (~{sizes[documentSize].tokens} tokens)
            </div>
            <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${sizes[documentSize].color}`}
                animate={{ width: `${(sizes[documentSize].tokens / 10000) * 100}%` }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{sizes[documentSize].tokens} tokens</span>
              <span>10,000 token budget</span>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            {documentSize === 'small' && '✅ This is fine. Plenty of room for conversation.'}
            {documentSize === 'medium' && '⚠️ Getting expensive. You have less room for conversation history.'}
            {documentSize === 'large' && '❌ This is burning through your context. Consider splitting the document or working outside the AI.'}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}


export function RealExamples() {
  const examples = [
    {
      task: 'Write a 5-page essay',
      recommendation: 'Canvas',
      why: 'Multiple paragraphs, lots of iteration ("expand section 2", "add a conclusion"). Canvas keeps it organized.'
    },
    {
      task: 'Build a Python script',
      recommendation: 'Canvas',
      why: 'You\'ll test it, find bugs, ask for changes. Canvas lets you see the code while chatting about fixes.'
    },
    {
      task: 'Create a budget spreadsheet',
      recommendation: 'Gemini → Google Sheets',
      why: 'Native Google Sheets support. Version controlled, collaborative, doesn\'t eat context.'
    },
    {
      task: 'Brainstorm startup ideas',
      recommendation: 'Regular Chat',
      why: 'Just a conversation. No document to iterate on. Chat is fine.'
    },
    {
      task: 'Explain quantum physics',
      recommendation: 'Regular Chat',
      why: 'Q&A, not document work. Chat is cleaner.'
    },
    {
      task: 'Write a resume',
      recommendation: 'Canvas',
      why: 'You\'ll tweak bullets, reorder sections, adjust formatting. Canvas gives you a live preview.'
    },
  ]

  return (
    <div className="my-8 space-y-3 not-prose">
      {examples.map((ex, i) => (
        <div key={i} className="bg-gray-50 p-5 rounded-xl border border-gray-200">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="font-semibold text-gray-900 mb-1">{ex.task}</div>
              <div className={`inline-block px-2 py-1 rounded text-xs font-semibold mb-2 ${
                ex.recommendation === 'Canvas' || ex.recommendation.includes('Google')
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-blue-100 text-blue-700'
              }`}>
                → {ex.recommendation}
              </div>
              <div className="text-sm text-gray-600">{ex.why}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}


export function BestPractices() {
  const practices = [
    {
      icon: '✂️',
      title: 'Keep documents focused',
      tip: 'Don\'t stuff 10 different sections into one canvas. One document = one purpose.'
    },
    {
      icon: '🔄',
      title: 'Export and restart when documents get huge',
      tip: 'If your document is 500+ lines, export it and start a new canvas for the next section.'
    },
    {
      icon: '📊',
      title: 'Use Gemini for spreadsheets',
      tip: 'Google Sheets integration is better than canvas for tabular data.'
    },
    {
      icon: '💬',
      title: 'Switch to chat when you\'re just discussing',
      tip: 'If you\'re asking questions about the document, not editing it, leave canvas and chat.'
    },
    {
      icon: '🌐',
      title: 'Consider webpages over documents',
      tip: 'For shareable content, ask for HTML/React. Host it. Way better than a static doc.'
    },
  ]

  return (
    <div className="my-8 space-y-3 not-prose">
      {practices.map((practice, i) => (
        <div key={i} className="bg-blue-50 p-5 rounded-xl border border-blue-200">
          <div className="flex items-start gap-4">
            <div className="text-3xl shrink-0">{practice.icon}</div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900 mb-1">{practice.title}</div>
              <div className="text-sm text-gray-700">{practice.tip}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
