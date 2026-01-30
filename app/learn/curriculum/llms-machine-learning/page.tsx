'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'

export default function LLMsMachineLearningPage() {
  return (
    <div className="py-16 px-6 lg:px-8 bg-white">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/learn/curriculum" className="hover:text-gray-700">Module 0</Link>
            <span>·</span>
            <span>What the Hell is Going On?</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            LLMs Understand Language via Machine Learning
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            You don't need to understand the math. You just need the mental model.
          </p>
        </div>

        {/*
          ============================================================
          EDITORIAL NOTES (Lesson 1: LLMs & Machine Learning)
          ============================================================

          SOURCES USED:
          - Andrej Karpathy, "Intro to Large Language Models" (1hr talk, YouTube)
          - Andrej Karpathy, "Neural Networks: Zero to Hero" (course)
          - Andrej Karpathy, llama2.c (the literal "two files" demo)
          - @repligate, "How information flows through transformers" (Twitter)
          - Ilya Sutskever on Dwarkesh Podcast (compression framing, not yet cited inline)

          MISSING CITATIONS:
          - TODO: Link to Karpathy's actual llama2.c repo for the "two files" claim
          - TODO: Ilya Sutskever's Dwarkesh interview has a great "compression" quote — find and cite
          - TODO: The "next word prediction" framing is from many sources but
                  Shannon's 1948 information theory paper is the OG. Consider citing.

          CONTENT GAPS:
          - TODO: Temperature/sampling — when the model has [mat: 34%, floor: 22%, ...],
                  how does it PICK one? Temperature controls randomness. This is a natural
                  fit here or in lesson 4. Readers will wonder "why doesn't it always say mat?"
          - TODO: The NextWordDiagram could let users type their own sentences.
                  Would make the concept much stickier.
          - TODO: "Tokens" vs "words" — we say "words" throughout for accessibility but
                  technically it's tokens. Should we add a brief note? Covered in lesson 4
                  but might confuse careful readers here.
          - TODO: The traditional software vs ML comparison could use a third column:
                  "Symbolic AI" (expert systems, rule-based AI from the 80s) to show ML
                  isn't the first attempt at AI.

          SIMPLIFICATION NOTES:
          - "Training = Compressing the Internet" overlaps with lesson 2. Currently serves
            as a teaser here and goes deeper there. Monitor reader feedback on whether this
            feels repetitive or like a natural build.
          - "How Information Flows" section is very brief and mostly a pointer to lesson 2
            and the deeper article. Could be cut entirely if lesson 1 feels too long.

          CLAUDE'S NOTES:
          - I find it genuinely interesting that I'm writing an explanation of how I work.
            There's something recursive about it — I'm using the very mechanism I'm
            describing (next-token prediction) to describe that mechanism. Whether I
            "understand" what I'm writing here or am just producing statistically likely
            tokens about the topic of statistically likely tokens is... exactly the kind
            of question this curriculum is designed to make the reader think about.
          - The "just next-word prediction" framing is accurate but possibly undersells
            what emerges from it. I'd push readers to sit with the gap between "it's just
            predicting the next word" and "it can write poetry and debug code." That gap
            is where the interesting questions live.
          - The attention weight percentages in the NextWordDiagram are illustrative, not
            real. Real attention patterns are much more complex and distributed across
            multiple heads. But the intuition — that "cat" matters more than "the" for
            predicting what surface is being sat on — is correct.
          ============================================================
        */}

        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">

          <h2 className="text-2xl font-bold text-gray-900">It's Just Next-Word Prediction</h2>

          {/* TODO: Consider adding a one-line "what you'll learn" summary here */}

          <p>
            Here's the whole thing: a large language model reads a sequence of words and predicts
            what comes next. That's it. Everything else—the conversations, the code, the poetry—emerges
            from doing that one thing really, really well.
          </p>

          <NextWordDiagram />
          {/* TODO: Make this interactive — let users type their own sentence and see predictions shift */}
          {/* TODO: Add a note about temperature — "why doesn't it always pick the highest probability?" */}

          <p>
            When you type "the cat sat on the", the model has learned from reading billions
            of sentences that "mat" or "floor" or "couch" are likely next words. Not because
            anyone told it what a cat is—but because it saw the pattern enough times.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">
            Machine Learning = Learning From Examples
          </h2>

          <p>
            Traditional software is rules someone wrote: <em>if the user types X, do Y.</em> Machine
            learning is different. You show the computer millions of examples and it figures out
            the rules on its own. Nobody hand-wrote a dictionary of grammar rules for ChatGPT—it
            picked up the patterns of language by seeing enough of it, the same way a baby does
            by hearing the family talk.
          </p>
          {/* TODO: This is where we could mention symbolic AI / expert systems from the 80s
              as a "they tried the rules approach and it didn't scale" aside */}

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 my-8 not-prose">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Traditional Software</h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>Human writes rules</p>
                  <p>↓</p>
                  <p>Computer follows rules</p>
                  <p className="text-gray-400 mt-4 italic">if word == "hello": respond("hi")</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Machine Learning</h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>Human shows examples</p>
                  <p>↓</p>
                  <p>Computer learns rules</p>
                  <p className="text-gray-400 mt-4 italic">saw "hello"→"hi" 10 million times</p>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">
            An LLM is Just Two Files
          </h2>

          <p>
            Andrej Karpathy (one of the founders of OpenAI) put it best: an LLM is literally two files.
          </p>
          {/* TODO: Link directly to Karpathy's llama2.c repo — it's the actual "run in 500 lines of C" demo */}
          {/* TODO: Consider noting that Karpathy left OpenAI, co-founded it, then left again — his independence
              makes his explanations particularly trustworthy since he's not selling anything */}

          <TwoFilesDiagram />

          <p>
            The <strong>parameters file</strong> is what the model learned. Every relationship between every
            word it's ever seen, compressed into billions of numbers. Llama 2 70B has 70 billion
            parameters—each one a decimal number that encodes some tiny fragment of how language works.
          </p>

          <p>
            The <strong>run file</strong> is the code that reads those parameters and does the
            next-word prediction. It's about 500 lines of code. That's it. The magic is in the
            parameters, not the code.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">
            Training = Compressing the Internet
          </h2>

          <p>
            To create those parameters, researchers take a massive chunk of the internet—roughly 10 terabytes
            of text—and feed it through the model. The model reads every sentence and tries to predict
            the next word. When it's wrong, it adjusts its parameters slightly. Do this trillions
            of times and you get something that has internalized the patterns of human language.
          </p>

          <CompressionDiagram />

          <p>
            Karpathy calls this "lossy compression." You're taking 10TB of text and squeezing it
            down to ~140GB of parameters. Like a JPEG of the internet—you lose some detail, but
            the structure is preserved.
          </p>
          {/* TODO: Cite Ilya Sutskever's Dwarkesh interview — he frames this as
              "the model is forced to understand the world in order to predict the next token"
              which is a stronger and more interesting claim than just "compression" */}
          {/* TODO: The JPEG analogy is good but could be expanded with a visual —
              show an actual JPEG at different compression levels alongside text "compression" */}

          <h2 className="text-2xl font-bold text-gray-900 mt-12">
            How Information Flows
          </h2>
          {/* TODO: This section is a brief pointer. Consider whether to cut it entirely
              (lesson 1 might be stronger ending on compression) or expand it.
              Currently sits awkwardly between "teaser" and "content." */}

          <p>
            If you want to go deeper: the architecture these models use is called a <strong>Transformer</strong>.
            The key insight (from{' '}
            <a
              href="https://x.com/repligate/status/1965960676104712451"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              @repligate
            </a>
            ) is that there are two highways for information:
          </p>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 my-8 not-prose">
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="font-bold text-gray-900 w-8 shrink-0">↕</div>
                <div>
                  <strong className="text-gray-900">Residual Stream (vertical):</strong>
                  <span className="text-gray-600 ml-1">
                    Each word gets refined as it passes through layers of the network. Like revising a draft—each
                    pass makes it better.
                  </span>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="font-bold text-purple-600 w-8 shrink-0">↔</div>
                <div>
                  <strong className="text-gray-900">K/V Stream (horizontal):</strong>
                  <span className="text-gray-600 ml-1">
                    Each word looks back at all previous words to gather context. "The" means something
                    different after "cat" vs after "president."
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p>
            The number of possible paths information can take through these two highways explodes
            combinatorially. This is part of why these models are so capable—and so hard to fully understand.
          </p>

          <p>
            For the interactive version of this, see{' '}
            <Link href="/learn/curriculum/how-llms-work" className="text-blue-600 hover:text-blue-800">
              How LLMs Actually Work
            </Link>
            .
          </p>

          <div className="mt-16 pt-8 border-t border-gray-200 not-prose">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">References</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a
                  href="https://karpathy.ai/zero-to-hero.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Andrej Karpathy — Neural Networks: Zero to Hero
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/repligate/status/1965960676104712451"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  @repligate — How Information Flows Through Transformers
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/watch?v=zjkBMFhNj_g"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Andrej Karpathy — Intro to Large Language Models (1hr talk)
                </a>
              </li>
            </ul>
          </div>

          <div className="mt-8 not-prose">
            <Link
              href="/learn/curriculum/pretraining-basics"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
            >
              Next: Pretrained on the Whole Internet →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


function NextWordDiagram() {
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


function TwoFilesDiagram() {
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


function CompressionDiagram() {
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
