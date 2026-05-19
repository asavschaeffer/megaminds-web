'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
export function NextWordDiagram() {
  const [hoveredToken, setHoveredToken] = useState<number | null>(null)
  const [selectedPrediction, setSelectedPrediction] = useState<string | null>(null)

  const words = ['The', 'cat', 'sat', 'on', 'the']

  // Attention weights: how much the ??? token attends to each previous token
  // Higher = more influence on the prediction
  const attentionWeights = [0.08, 0.45, 0.25, 0.12, 0.10]

  // Different predictions depending on which context token is "highlighted"
  const defaultPredictions = [
    { word: 'mat', prob: 0.34 },
    { word: 'floor', prob: 0.22 },
    { word: 'couch', prob: 0.15 },
    { word: 'table', prob: 0.08 },
  ]

  // When you hover a token, show how it shifts probabilities
  const tokenInfluence: Record<number, { word: string; prob: number }[]> = {
    0: [ // "The" — weak, just grammar
      { word: 'mat', prob: 0.20 },
      { word: 'floor', prob: 0.18 },
      { word: 'table', prob: 0.16 },
      { word: 'couch', prob: 0.14 },
    ],
    1: [ // "cat" — strong pull toward cat-related surfaces
      { word: 'mat', prob: 0.42 },
      { word: 'couch', prob: 0.22 },
      { word: 'bed', prob: 0.12 },
      { word: 'floor', prob: 0.10 },
    ],
    2: [ // "sat" — pulls toward surfaces you sit on
      { word: 'mat', prob: 0.28 },
      { word: 'floor', prob: 0.25 },
      { word: 'couch', prob: 0.20 },
      { word: 'chair', prob: 0.12 },
    ],
    3: [ // "on" — preposition, confirms surface
      { word: 'mat', prob: 0.30 },
      { word: 'floor', prob: 0.24 },
      { word: 'table', prob: 0.15 },
      { word: 'couch', prob: 0.12 },
    ],
    4: [ // "the" — article, expects noun
      { word: 'mat', prob: 0.32 },
      { word: 'floor', prob: 0.22 },
      { word: 'couch', prob: 0.14 },
      { word: 'table', prob: 0.10 },
    ],
  }

  const predictions = hoveredToken !== null ? tokenInfluence[hoveredToken] : defaultPredictions

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Next-Word Prediction</h3>
      <p className="text-sm text-gray-500 mb-4">
        Hover over each word to see how much it influences the prediction. The lines show attention—thicker
        means more influence.
      </p>

      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        {/* SVG overlay for attention lines */}
        <div className="relative">
          <div className="flex flex-wrap items-center gap-2 mb-2" id="token-row">
            {words.map((word, i) => {
              const weight = attentionWeights[i]
              const isHovered = hoveredToken === i
              return (
                <motion.span
                  key={i}
                  onMouseEnter={() => setHoveredToken(i)}
                  onMouseLeave={() => setHoveredToken(null)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: isHovered ? 1.05 : 1,
                  }}
                  transition={{ delay: i * 0.15 }}
                  className={`px-3 py-1.5 rounded-md font-mono text-sm cursor-pointer transition-colors relative ${
                    isHovered
                      ? 'bg-blue-100 border-2 border-blue-400 text-blue-900'
                      : hoveredToken !== null
                        ? 'bg-white border border-gray-200 text-gray-400'
                        : 'bg-white border border-gray-300 text-gray-700'
                  }`}
                >
                  {word}
                  {/* Attention weight indicator */}
                  <span
                    className={`absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs transition-opacity ${
                      hoveredToken === null ? 'opacity-60' : isHovered ? 'opacity-100' : 'opacity-20'
                    }`}
                    style={{ color: `rgba(59, 130, 246, ${weight + 0.3})` }}
                  >
                    {(weight * 100).toFixed(0)}%
                  </span>
                </motion.span>
              )
            })}

            {/* Arrow indicators */}
            <div className="flex items-center gap-1 mx-1">
              {hoveredToken !== null ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center"
                >
                  <svg width="40" height="20" viewBox="0 0 40 20">
                    <motion.path
                      d="M 0 10 L 30 10"
                      stroke="#3b82f6"
                      strokeWidth={2 + attentionWeights[hoveredToken] * 4}
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <polygon points="30,5 40,10 30,15" fill="#3b82f6" />
                  </svg>
                </motion.div>
              ) : (
                <span className="text-gray-300 text-lg">→</span>
              )}
            </div>

            <motion.span
              animate={{
                borderColor: hoveredToken !== null ? '#3b82f6' : '#93c5fd',
                backgroundColor: hoveredToken !== null ? '#eff6ff' : '#eff6ff',
              }}
              className="px-3 py-1.5 border-2 border-dashed rounded-md font-mono text-sm text-blue-600"
            >
              ???
            </motion.span>
          </div>

          {/* Attention bar visualization */}
          <div className="mt-8 mb-4">
            <div className="flex gap-1 items-end h-12">
              {words.map((word, i) => {
                const weight = attentionWeights[i]
                const isHovered = hoveredToken === i
                return (
                  <motion.div
                    key={i}
                    className="flex-1 flex flex-col items-center gap-1"
                    onMouseEnter={() => setHoveredToken(i)}
                    onMouseLeave={() => setHoveredToken(null)}
                  >
                    <motion.div
                      className={`w-full rounded-t cursor-pointer ${
                        isHovered ? 'bg-blue-500' : hoveredToken !== null ? 'bg-blue-200' : 'bg-blue-400'
                      }`}
                      animate={{ height: `${weight * 48}px` }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    />
                    <span className="text-xs text-gray-400 font-mono">{word}</span>
                  </motion.div>
                )
              })}
            </div>
            <p className="text-xs text-gray-400 text-center mt-1">
              ↑ attention weight (how much each token influences the prediction)
            </p>
          </div>
        </div>

        {/* Predictions */}
        <div className="space-y-2 mt-4 pt-4 border-t border-gray-200">
          <AnimatePresence mode="wait">
            <motion.div
              key={hoveredToken ?? 'default'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="space-y-2"
            >
              {predictions.map((pred, i) => (
                <div key={pred.word} className="flex items-center gap-3">
                  <span className="font-mono text-sm w-12 text-right text-gray-500">
                    {(pred.prob * 100).toFixed(0)}%
                  </span>
                  <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pred.prob * 100}%` }}
                      transition={{ duration: 0.3 }}
                      className="h-full bg-blue-500 rounded-full"
                    />
                  </div>
                  <span className="font-mono text-sm w-16 text-gray-700">{pred.word}</span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {hoveredToken !== null && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 text-xs text-blue-600"
          >
            "{words[hoveredToken]}" has {(attentionWeights[hoveredToken] * 100).toFixed(0)}% attention weight.
            {hoveredToken === 1 && ' "cat" has the most influence — it tells the model what kind of thing is doing the sitting.'}
            {hoveredToken === 2 && ' "sat" pulls toward surfaces — things you sit on.'}
            {hoveredToken === 0 && ' "The" mostly just signals grammar — a noun is coming.'}
            {hoveredToken === 3 && ' "on" confirms a surface is expected.'}
            {hoveredToken === 4 && ' The second "the" signals a specific noun follows.'}
          </motion.p>
        )}
      </div>

      <p className="mt-4 text-sm text-gray-500">
        The model doesn't "know" what a cat is. But it's seen "cat sat on the" followed by
        "mat" enough times that "cat" pulls hard toward that prediction. Every token
        votes on what comes next.
      </p>
    </div>
  )
}


export function TwoFilesDiagram() {
  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">An LLM is Two Files</h3>

      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-5 rounded-lg border-2 border-gray-300"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm">
                1
              </div>
              <span className="font-semibold text-gray-900">parameters.bin</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              ~140 GB of floating point numbers
            </p>
            <div className="font-mono text-xs text-gray-400 bg-gray-50 p-2 rounded overflow-hidden">
              0.0012, -0.3421, 0.8891,<br />
              1.2003, -0.0042, 0.5517,<br />
              -0.7782, 0.1193, 0.3344,<br />
              <span className="text-gray-300">... 70 billion more</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-5 rounded-lg border-2 border-gray-300"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                2
              </div>
              <span className="font-semibold text-gray-900">run.c</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              ~500 lines of code
            </p>
            <div className="font-mono text-xs text-gray-400 bg-gray-50 p-2 rounded overflow-hidden">
              for each token:<br />
              &nbsp;&nbsp;compute attention<br />
              &nbsp;&nbsp;apply feed-forward<br />
              &nbsp;&nbsp;predict next token<br />
              <span className="text-gray-300">... that's basically it</span>
            </div>
          </motion.div>
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Via{' '}
        <a
          href="https://karpathy.ai/zero-to-hero.html"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
        >
          Andrej Karpathy
        </a>
        . The magic is in the parameters—the code is almost trivially simple.
      </p>
    </div>
  )
}


export function CompressionDiagram() {
  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Training = Compression</h3>

      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="w-32 h-32 bg-red-100 border-2 border-red-300 rounded-lg flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-red-700">10 TB</span>
              <span className="text-xs text-red-500 mt-1">internet text</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-2xl text-gray-400">→</span>
            <span className="text-xs text-gray-400 font-medium">~100x</span>
            <span className="text-xs text-gray-400">compression</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-green-100 border-2 border-green-300 rounded-lg flex flex-col items-center justify-center">
              <span className="text-lg font-bold text-green-700">140 GB</span>
              <span className="text-xs text-green-500 mt-1">parameters</span>
            </div>
          </motion.div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          Like a JPEG of the internet. Lossy, but the structure is preserved.
        </p>
      </div>
    </div>
  )
}
