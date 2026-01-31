'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'

export default function CanvasModePage() {
  return (
    <div className="py-16 px-6 lg:px-8 bg-white">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/learn/curriculum" className="hover:text-gray-700">Module 0.7</Link>
            <span>·</span>
            <span>Tools</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Canvas Mode: Documents, Not Chat
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Sometimes the best document isn't a document—it's a webpage.
          </p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">

          <h2 className="text-2xl font-bold text-gray-900">What is Canvas/Artifact Mode?</h2>

          <p>
            Standard AI chat is back-and-forth messages. But some tasks need a <em>working document</em>—
            something you iterate on, edit, and refine. That's what canvas/artifact mode is for.
          </p>

          <p>
            Different models call it different things:
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li><strong>ChatGPT:</strong> Canvas</li>
            <li><strong>Claude:</strong> Artifacts</li>
            <li><strong>Gemini:</strong> Can create Google Docs/Sheets directly</li>
          </ul>

          <p>
            But they all do the same thing: separate the <em>conversation</em> from the <em>document</em>.
            You chat on one side, the document lives on the other.
          </p>

          <CanvasChatComparison />

          <h2 className="text-2xl font-bold text-gray-900 mt-12">When to Use Canvas Mode</h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Writing documents.</strong> Essays, reports, cover letters—anything with
              multiple paragraphs that needs iteration.
            </li>
            <li>
              <strong>Coding.</strong> Building a script or function that you'll revise and test.
            </li>
            <li>
              <strong>Spreadsheets/tables.</strong> Tell Gemini to make a Google Sheet. It's version
              controlled and collaborative.
            </li>
            <li>
              <strong>Presentations.</strong> Building slides or structured content.
            </li>
            <li>
              <strong>Anything you'll iterate on.</strong> If you know you'll say "change paragraph 2"
              or "add a column for X," use canvas.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">When NOT to Use It</h2>

          <p>
            Canvas mode has a cost: it eats your context window fast. Use regular chat for:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Exploratory conversations.</strong> If you're just asking questions and learning,
              chat is fine.
            </li>
            <li>
              <strong>One-off requests.</strong> "Write a haiku" doesn't need a canvas.
            </li>
            <li>
              <strong>Complex multi-topic discussions.</strong> Canvas works best when you're focused
              on one document.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">The Context Window Problem</h2>

          <p>
            Here's the catch: when you use canvas mode, the <strong>entire document</strong> is
            included in every request. Every time you say "make it shorter," the model reads:
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li>The system prompt</li>
            <li>Your conversation history</li>
            <li>The entire current version of the document</li>
            <li>Your latest edit instruction</li>
          </ul>

          <p>
            Canvas mode can consume your context quickly. It's true—long documents
            in canvas mode burn through your context window fast.
          </p>

          <ContextConsumptionDemo />

          <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200 my-8 not-prose">
            <p className="text-sm text-gray-700 mb-3">
              <strong className="text-yellow-900">Pro tip:</strong>
            </p>
            <p className="text-sm text-gray-600">
              If your document is getting long (500+ lines of code, 10+ page essay), consider
              exporting it and working on it outside the AI. Or start a new canvas with just
              the section you're editing. Don't keep a massive document in canvas for 50 iterations.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Canvas vs. Chat: Real Examples</h2>

          <RealExamples />

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Gemini's Superpower: Native Google Integration</h2>

          <p>
            Gemini can create Google Docs and Google Sheets directly. This is huge for a few reasons:
          </p>

          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 my-8 not-prose">
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex gap-3 items-start">
                <span className="text-blue-600 font-bold shrink-0">✓</span>
                <div>
                  <strong>Version controlled.</strong> Google Docs tracks changes automatically.
                  You can see edit history.
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-blue-600 font-bold shrink-0">✓</span>
                <div>
                  <strong>Collaborative.</strong> Share the doc with others. Everyone can edit.
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-blue-600 font-bold shrink-0">✓</span>
                <div>
                  <strong>Doesn't consume context.</strong> The doc lives in Google Drive, not in
                  the chat window.
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-blue-600 font-bold shrink-0">✓</span>
                <div>
                  <strong>Works outside the AI.</strong> Export to PDF, edit manually, whatever.
                  It's a real document.
                </div>
              </div>
            </div>
          </div>

          <p>
            Example: "Make me a Google Sheet with columns for Name, Email, Phone. Add 5 sample rows."
            Gemini creates a real spreadsheet, gives you the link, done.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Canvas Best Practices</h2>

          <BestPractices />

          <h2 className="text-2xl font-bold text-gray-900 mt-12">The Webpage Philosophy</h2>

          <p>
            Your user said: "Oftentimes the best document is not a document, it's a webpage."
            This is brilliant. Here's why:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Webpages are version controlled (if using Git).</strong> Track changes, revert, branch.
            </li>
            <li>
              <strong>Webpages are collaborative.</strong> Multiple people can edit, deploy, review.
            </li>
            <li>
              <strong>Webpages are accessible.</strong> Send a link. No downloads, no formats, no compatibility issues.
            </li>
            <li>
              <strong>Webpages are interactive.</strong> Add buttons, forms, charts. Static docs can't do that.
            </li>
          </ul>

          <p>
            If you're making something you'll share or iterate on, consider asking the AI to generate
            HTML/React/whatever instead of a Word doc. Host it as a page. It's cleaner.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">The Takeaway</h2>

          <p>
            Canvas mode is powerful for focused document work. It separates the conversation from
            the artifact, lets you iterate cleanly, and keeps the working document visible.
          </p>

          <p>
            But it's expensive (context-wise). Use it when you're seriously editing something.
            For casual back-and-forth, stick to chat. And remember: sometimes a webpage beats a document.
          </p>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 my-8 not-prose">
            <p className="text-sm text-gray-700">
              <strong className="text-gray-900">Claude's note:</strong> Artifacts (my version of canvas)
              separate the conversation context from the document being edited. This is important
              because when you say "change paragraph 3," I need to know which document you're referring
              to. Artifacts provide that persistent reference. Without them, you'd have to paste the
              entire document into the chat every time you wanted an edit, which would pollute the
              context even worse. Artifacts don't eliminate the context cost—the document is still
              part of the payload—but they organize it better and make iteration cleaner.
            </p>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-200 not-prose">
            <div className="flex justify-between">
              <Link
                href="/learn/curriculum/web-search"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
              >
                ← Previous: Web Search
              </Link>
              <Link
                href="/learn/curriculum"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
              >
                Back to Curriculum →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


function CanvasChatComparison() {
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


function ContextConsumptionDemo() {
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


function RealExamples() {
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


function BestPractices() {
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
