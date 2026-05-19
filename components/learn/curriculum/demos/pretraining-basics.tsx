'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
export function GrepDiagram() {
  const [searchTerm, setSearchTerm] = useState('justice')
  const terms = ['justice', 'love', 'python', 'war']

  const contexts: Record<string, { source: string; snippet: string; neighbors: string[] }[]> = {
    justice: [
      { source: 'Philosophy', snippet: '...Plato argued that ___ is the harmony of the soul...', neighbors: ['virtue', 'harmony', 'soul', 'republic'] },
      { source: 'Law', snippet: '...the Department of ___ filed charges against...', neighbors: ['court', 'charges', 'federal', 'criminal'] },
      { source: 'Comics', snippet: '...the ___ League assembled to face the threat...', neighbors: ['league', 'hero', 'Batman', 'assembled'] },
      { source: 'Social', snippet: '...racial ___ movements gained momentum in...', neighbors: ['racial', 'equality', 'movement', 'protest'] },
    ],
    love: [
      { source: 'Poetry', snippet: '...shall I compare thee to a summer\'s day? ___ is...', neighbors: ['beauty', 'eternal', 'heart', 'summer'] },
      { source: 'Psychology', snippet: '...attachment theory describes ___ as a biological...', neighbors: ['attachment', 'bond', 'secure', 'biological'] },
      { source: 'Tennis', snippet: '...the score was forty-___ in the final set...', neighbors: ['forty', 'score', 'set', 'match'] },
      { source: 'Religion', snippet: '...God is ___, and whoever abides in ___ abides...', neighbors: ['God', 'faith', 'abide', 'grace'] },
    ],
    python: [
      { source: 'Programming', snippet: '...import numpy as np. ___ is widely used for...', neighbors: ['import', 'library', 'code', 'function'] },
      { source: 'Biology', snippet: '...the Burmese ___ can grow up to 23 feet...', neighbors: ['snake', 'species', 'reptile', 'habitat'] },
      { source: 'Comedy', snippet: '...Monty ___ and the Holy Grail remains a...', neighbors: ['Monty', 'comedy', 'British', 'Grail'] },
      { source: 'Mythology', snippet: '...Apollo slew the great ___ at Delphi...', neighbors: ['Apollo', 'serpent', 'oracle', 'slew'] },
    ],
    war: [
      { source: 'History', snippet: '...World ___ II ended in 1945 when...', neighbors: ['world', 'ended', 'allies', 'victory'] },
      { source: 'Strategy', snippet: '...Sun Tzu wrote that ___ is deception...', neighbors: ['strategy', 'deception', 'enemy', 'battle'] },
      { source: 'Film', snippet: '...Star ___: A New Hope revolutionized...', neighbors: ['Star', 'film', 'Lucas', 'space'] },
      { source: 'Politics', snippet: '...the ___ on drugs has cost billions...', neighbors: ['drugs', 'policy', 'failed', 'billion'] },
    ],
  }

  const currentContexts = contexts[searchTerm] || contexts.justice

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">The Wikipedia Grep</h3>
      <p className="text-sm text-gray-500 mb-4">
        Search for a word and see how its meaning shifts by context. This is how the model learns what words "mean."
      </p>

      <div className="flex gap-2 mb-6">
        {terms.map((term) => (
          <button
            key={term}
            onClick={() => setSearchTerm(term)}
            className={`px-3 py-1.5 rounded-md text-sm font-mono font-medium transition-all ${
              searchTerm === term
                ? 'bg-blue-600 text-white shadow'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {term}
          </button>
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-3 bg-gray-100 border-b border-gray-200 font-mono text-sm text-gray-600">
          grep "{searchTerm}" /wikipedia/*
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={searchTerm}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="divide-y divide-gray-200"
          >
            {currentContexts.map((ctx, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">{ctx.source}</span>
                </div>
                <p className="text-sm text-gray-700 font-mono mb-2">
                  {ctx.snippet.split('___').map((part, j, arr) => (
                    <span key={j}>
                      {part}
                      {j < arr.length - 1 && (
                        <span className="bg-yellow-200 text-yellow-900 px-1 rounded font-bold">{searchTerm}</span>
                      )}
                    </span>
                  ))}
                </p>
                <div className="flex flex-wrap gap-1">
                  {ctx.neighbors.map((n) => (
                    <span key={n} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                      {n}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        The blue tags show <strong>neighboring words</strong>. The model learns meaning from these patterns—"justice"
        near "court" means something different than "justice" near "league."
      </p>
    </div>
  )
}


export function StochasticParrotDiagram() {
  const [mode, setMode] = useState<'pretrained' | 'assistant'>('pretrained')

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Pretrained vs. Assistant</h3>
      <p className="text-sm text-gray-500 mb-4">
        A pretrained model just continues text. It takes posttraining to make it act like an assistant.
      </p>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode('pretrained')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            mode === 'pretrained' ? 'bg-amber-500 text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Pretrained (base model)
        </button>
        <button
          onClick={() => setMode('assistant')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            mode === 'assistant' ? 'bg-green-600 text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          After posttraining
        </button>
      </div>

      <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
        <div className="mb-3 font-mono text-sm">
          <span className="text-gray-400">Input:</span>{' '}
          <span className="text-gray-700">What is the capital of France?</span>
        </div>

        <div className="border-t border-gray-200 pt-3">
          <span className="text-gray-400 font-mono text-sm">Output:</span>
          <AnimatePresence mode="wait">
            {mode === 'pretrained' ? (
              <motion.div
                key="pretrained"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-2 font-mono text-sm text-amber-800 bg-amber-50 p-3 rounded"
              >
                <p>What is the capital of Germany? What is the capital of Spain? What is the</p>
                <p className="text-xs text-amber-500 mt-2">
                  ↑ It's completing a pattern (a list of quiz questions), not answering.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="assistant"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-2 font-mono text-sm text-green-800 bg-green-50 p-3 rounded"
              >
                <p>The capital of France is Paris. It has been the capital since the 10th century and is the</p>
                <p className="text-xs text-green-500 mt-2">
                  ↑ Trained to recognize questions and provide answers. (Next lesson!)
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
