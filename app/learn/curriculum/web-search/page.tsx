'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'

export default function WebSearchPage() {
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
            Web Search: Facts vs. Concepts
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Know when the model needs to look things up.
          </p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">

          <h2 className="text-2xl font-bold text-gray-900">The Model's Knowledge Has a Cutoff</h2>

          <p>
            LLMs are trained on data up to a specific date—their <strong>knowledge cutoff</strong>.
            For most models in 2026, that's somewhere in 2024 or 2025. Anything that happened after
            that date? The model has never seen it.
          </p>

          <p>
            This means: "Who won the 2026 Super Bowl?" → the model has no idea. It will guess,
            hallucinate, or tell you it doesn't know (depending on how it's trained). But it
            doesn't have the information.
          </p>

          <KnowledgeCutoffDemo />

          <h2 className="text-2xl font-bold text-gray-900 mt-12">When to Use Web Search</h2>

          <p>
            Most AI chat interfaces now have a "search the web" button or automatically detect
            when they need to search. Use it when you need:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Recent events.</strong> News, stock prices, sports scores, anything time-sensitive.
            </li>
            <li>
              <strong>Specific facts that change.</strong> "What's the population of Tokyo?" (changes
              over time), "What's the current price of Bitcoin?" (changes constantly).
            </li>
            <li>
              <strong>Niche or obscure information.</strong> The model's training data is broad but
              not comprehensive. Obscure topics might not be well-represented.
            </li>
            <li>
              <strong>Verification.</strong> The model said something that sounds wrong? Search to
              fact-check it.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">When NOT to Use Web Search</h2>

          <p>
            Web search is slower and often unnecessary. Skip it for:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Concepts and explanations.</strong> "How does photosynthesis work?" — the model
              knows this. No need to search.
            </li>
            <li>
              <strong>General knowledge.</strong> Historical facts, scientific principles, common
              knowledge—all in the training data.
            </li>
            <li>
              <strong>Creative or subjective tasks.</strong> "Write a poem" or "brainstorm business
              names" don't benefit from search.
            </li>
            <li>
              <strong>Code or technical explanations.</strong> The model was trained on tons of code.
              It knows how to write Python.
            </li>
          </ul>

          <FactsVsConceptsComparison />

          <h2 className="text-2xl font-bold text-gray-900 mt-12">How Search Actually Works</h2>

          <p>
            When you ask a question and the model searches the web:
          </p>

          <ol className="list-decimal pl-6 space-y-2">
            <li>The model formulates a search query based on your question</li>
            <li>It sends that query to a search engine (Google, Bing, etc.)</li>
            <li>It reads the top search results</li>
            <li>It synthesizes an answer based on those results + its training</li>
            <li>It (usually) cites the sources it used</li>
          </ol>

          <p>
            This means: <strong>search is only as good as the search results.</strong> If the top
            results are wrong or misleading, the model's answer will be too.
          </p>

          <SearchWorkflow />

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Common Pitfalls</h2>

          <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200 my-8 not-prose">
            <h4 className="font-semibold text-yellow-900 mb-4">⚠️ Watch Out For:</h4>
            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <strong>Hallucinating even with search enabled.</strong> The model might not actually
                search if it thinks it knows the answer. Double-check important facts.
              </div>
              <div>
                <strong>Outdated search results.</strong> Even search can return old cached pages.
                For rapidly changing info (stock prices, breaking news), check the timestamp.
              </div>
              <div>
                <strong>Conflicting sources.</strong> If search results disagree, the model might
                synthesize a "middle ground" answer that's actually wrong.
              </div>
              <div>
                <strong>Over-relying on search.</strong> Don't search for everything. "What is
                machine learning?" doesn't need search—the model knows.
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Model-Specific Search Features</h2>

          <ModelSearchFeatures />

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Pro Tips</h2>

          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 my-8 not-prose">
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex gap-3 items-start">
                <span className="text-blue-600 font-bold shrink-0">💡</span>
                <div>
                  <strong>Be explicit when you want search.</strong> "Search the web for the latest
                  news on X" is clearer than hoping the model auto-detects.
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-blue-600 font-bold shrink-0">💡</span>
                <div>
                  <strong>Check the sources.</strong> Models that cite sources let you verify the
                  information yourself.
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-blue-600 font-bold shrink-0">💡</span>
                <div>
                  <strong>Use search for verification.</strong> Model gave an answer that seems
                  questionable? "Search and verify: [claim]"
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-blue-600 font-bold shrink-0">💡</span>
                <div>
                  <strong>Combine search + reasoning.</strong> "Search for the current GDP of France,
                  then compare it to Germany's and explain the difference."
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">The Takeaway</h2>

          <p>
            Web search extends the model's knowledge beyond its training cutoff. Use it for facts
            that are recent, specific, or verifiable. Don't use it for concepts, explanations, or
            creative work—the model already knows that stuff.
          </p>

          <p>
            When in doubt: if the answer might have changed in the last year, search. If it's
            timeless knowledge, don't.
          </p>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 my-8 not-prose">
            <p className="text-sm text-gray-700">
              <strong className="text-gray-900">Claude's note:</strong> I have a knowledge cutoff
              of early 2025. Anything after that is outside my training data. When you ask me about
              recent events, I'm genuinely uncertain—I don't have the information. Search tools
              give me access to current information by fetching and reading web pages in real-time.
              Without search, I can only work with what was in my training data. With search, I can
              answer "what happened yesterday." The difference is massive for time-sensitive queries.
            </p>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-200 not-prose">
            <div className="flex justify-between">
              <Link
                href="/learn/curriculum/start-new-chat"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
              >
                ← Previous Module: Failures & Basins
              </Link>
              <Link
                href="/learn/curriculum/canvas-mode"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
              >
                Next: Canvas Mode →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


function KnowledgeCutoffDemo() {
  const [questionType, setQuestionType] = useState<'timeless' | 'recent'>('timeless')

  const questions = {
    timeless: {
      q: 'How does photosynthesis work?',
      answer: 'Photosynthesis is the process by which plants convert light energy into chemical energy...',
      note: '✅ The model knows this. It was in the training data and hasn\'t changed.'
    },
    recent: {
      q: 'Who won the 2026 Super Bowl?',
      answer: 'I don\'t have information about the 2026 Super Bowl, as my training data only goes up to early 2025.',
      note: '❌ Outside the knowledge cutoff. The model needs to search or admit it doesn\'t know.'
    }
  }

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Knowledge Cutoff in Action</h3>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setQuestionType('timeless')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            questionType === 'timeless'
              ? 'bg-green-600 text-white shadow'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          ✅ Timeless Knowledge
        </button>
        <button
          onClick={() => setQuestionType('recent')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            questionType === 'recent'
              ? 'bg-red-600 text-white shadow'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          ❌ Recent Event
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={questionType}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-3"
        >
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-blue-600 font-semibold text-sm mb-2">You:</div>
            <div className="text-gray-700 text-sm">"{questions[questionType].q}"</div>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-purple-200">
            <div className="text-purple-600 font-semibold text-sm mb-2">AI (without search):</div>
            <div className="text-gray-700 text-sm mb-2">{questions[questionType].answer}</div>
            <div className={`text-xs mt-2 ${questionType === 'timeless' ? 'text-green-600' : 'text-red-600'}`}>
              {questions[questionType].note}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}


function FactsVsConceptsComparison() {
  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Facts vs. Concepts: When to Search</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 p-5 rounded-xl border-2 border-green-200">
          <h4 className="font-semibold text-green-900 mb-3">✅ Use Search (Facts)</h4>
          <div className="space-y-2 text-sm text-gray-700">
            <div>• "Current price of Bitcoin"</div>
            <div>• "Latest iPhone specs"</div>
            <div>• "Who won the election in 2026?"</div>
            <div>• "Stock price of AAPL"</div>
            <div>• "Weather forecast for NYC"</div>
            <div>• "Latest news on AI regulation"</div>
          </div>
          <p className="text-xs text-green-700 mt-3 italic">
            These require current, verifiable information.
          </p>
        </div>

        <div className="bg-blue-50 p-5 rounded-xl border-2 border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-3">✅ No Search Needed (Concepts)</h4>
          <div className="space-y-2 text-sm text-gray-700">
            <div>• "How does a blockchain work?"</div>
            <div>• "Explain quantum computing"</div>
            <div>• "Write a Python function"</div>
            <div>• "What is photosynthesis?"</div>
            <div>• "Explain the French Revolution"</div>
            <div>• "Brainstorm startup ideas"</div>
          </div>
          <p className="text-xs text-blue-700 mt-3 italic">
            These are timeless concepts in the training data.
          </p>
        </div>
      </div>
    </div>
  )
}


function SearchWorkflow() {
  const [step, setStep] = useState(1)

  const steps = [
    { num: 1, title: 'You ask a question', content: '"What\'s the current price of Bitcoin?"' },
    { num: 2, title: 'Model detects need for search', content: 'Realizes this is recent, factual data' },
    { num: 3, title: 'Formulates search query', content: '"Bitcoin price USD" → sends to search engine' },
    { num: 4, title: 'Reads search results', content: 'Top 3-5 results from Google/Bing' },
    { num: 5, title: 'Synthesizes answer', content: 'Combines search data with reasoning' },
    { num: 6, title: 'Cites sources', content: 'Shows you where it got the information' },
  ]

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">How Web Search Works</h3>

      <div className="space-y-2 mb-4">
        {steps.map((s) => (
          <div
            key={s.num}
            onClick={() => setStep(s.num)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              step === s.num
                ? 'bg-blue-50 border-blue-400 shadow'
                : step > s.num
                  ? 'bg-green-50 border-green-300'
                  : 'bg-gray-50 border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                step === s.num ? 'bg-blue-600 text-white' :
                step > s.num ? 'bg-green-600 text-white' :
                'bg-gray-300 text-gray-600'
              }`}>
                {s.num}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 text-sm">{s.title}</div>
                <AnimatePresence>
                  {step === s.num && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-gray-600 mt-1"
                    >
                      {s.content}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


function ModelSearchFeatures() {
  const models = [
    {
      name: 'ChatGPT',
      feature: 'Automatic web browsing',
      details: 'Detects when it needs current info and searches automatically. Shows sources.'
    },
    {
      name: 'Gemini',
      feature: 'Google Search integration',
      details: 'Deep integration with Google Search. Great for fact-checking and current events.'
    },
    {
      name: 'Claude',
      feature: 'No built-in search (as of 2025)',
      details: 'Relies on training data. Can\'t search the web directly. Use other models for current info.'
    },
    {
      name: 'Perplexity',
      feature: 'Search-first design',
      details: 'Built specifically for search. Cites every claim. Best for research.'
    },
  ]

  return (
    <div className="my-8 space-y-3 not-prose">
      {models.map((model, i) => (
        <div key={i} className="bg-gray-50 p-5 rounded-xl border border-gray-200">
          <div className="flex items-start gap-3">
            <div className="font-semibold text-gray-900 min-w-24">{model.name}</div>
            <div className="flex-1">
              <div className="text-sm font-medium text-blue-600 mb-1">{model.feature}</div>
              <div className="text-sm text-gray-600">{model.details}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
