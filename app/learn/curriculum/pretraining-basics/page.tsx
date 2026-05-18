'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { AbbrSidenoteProvider, AbbrSidenote, resetSidenotes } from '@/components/shared/sidenote'
import { CurriculumLessonPage } from '@/components/learn/curriculum/lesson-page'



export default function PretrainingBasicsPage() {
  resetSidenotes()
  return (
    <AbbrSidenoteProvider>
    <CurriculumLessonPage slug="pretraining-basics">

          <h2 className="text-2xl font-bold text-gray-900">It Downloaded Everything</h2>

          <p>
            In the{' '}
            <Link href="/learn/curriculum/llms-machine-learning" className="text-blue-600 hover:text-blue-800">
              previous lesson
            </Link>
            , we said training is "compressing the internet." Let's unpack what that actually means.
          </p>

          {/* TODO: Mention that training data IS curated — CommonCrawl, C4, The Pile, etc.
              Readers shouldn't think it's literally random web scraping. Different models
              use different datasets, which partly explains different "personalities." */}
          <p>
            Researchers crawled the web—Wikipedia, Reddit, news sites, forums,
            academic papers, books, code repositories, recipe blogs, legal documents, fan fiction,
            government filings—basically everything humans have ever written down and
            put online. Roughly <strong>10 terabytes</strong> of text.
          </p>

          <p>
            Then they fed all of it through the model, one sentence at a time, asking:
            "given everything before this word, predict the next word." Every time the
            model got it wrong, it adjusted its parameters slightly. Trillions of
            adjustments later, the patterns of human language are baked into those numbers.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">The Wikipedia Thought Experiment</h2>

          <p>
            Here's a useful way to think about what the model "experiences" during training.
          </p>

          <p>
            Imagine you opened Wikipedia and searched for a single word—say, "justice."
            You'd find that word appearing in articles about law, philosophy, comic books,
            criminal justice reform, social movements, Supreme Court cases, and a hundred
            other contexts. By looking at <em>which words tend to appear near "justice"</em> and
            which don't, you'd start to build an intuition for what the word means—not
            from a dictionary definition, but from usage.
          </p>

          {/* TODO: Consider expanding GrepDiagram word list — "money" and "freedom"
              would show interesting context diversity. Also consider adding a
              "what the model learns" summary panel showing the emergent vector clusters. */}
          <GrepDiagram />

          <p>
            Now imagine doing that for <em>every word</em>, across the entire internet, simultaneously.
            That's roughly what happens during pretraining. The model builds a massive web of
            relationships between words—not by understanding meaning, but by mapping
            co-occurrence patterns across billions of contexts.
          </p>

          <p>
            But here's the thing—the internet contains <em>everything</em>. Helpful and harmful.
            The model absorbs patterns for being a{' '}
            <AbbrSidenote
              title="The Assistant Axis"
              definition={`Anthropic researchers discovered that LLMs organize personas along a spectrum from "Assistant-like" (helpful, professional) to anti-assistant (deceptive, harmful). This axis already exists in pretrained models before any fine-tuning—the model learned both archetypes from the training data. Think of it like yin and yang: you can't download everything humanity has written without getting both sides.`}
              contentMaxWidth={320}
            >
              thoughtful assistant and for being its opposite
            </AbbrSidenote>
            . Anthropic's research calls this the{' '}
            <a
              href="https://www.anthropic.com/research/assistant-axis"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              "Assistant Axis"
            </a>
            —a spectrum baked into the model from pretraining, before anyone tries to make it safe.
            We'll explore the implications of this further in{' '}
            <Link href="/learn/curriculum/waluigi" className="text-blue-600 hover:text-blue-800">
              The Waluigi Effect
            </Link>
            .
          </p>

          <p className="text-sm text-gray-500 italic">
            "This is what LLMs experience during training" —{' '}
            <a
              href="https://x.com/repligate/status/1945245561394790496"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              @repligate
            </a>
          </p>

          {/* TODO: Consider adding a side-by-side diagram: baby language acquisition
              timeline (years) vs LLM training timeline (weeks). Makes the scale tangible.
              Also the Grok 3 "MechaHitler" incident from user's notes would fit well
              somewhere in this lesson — shows how pretraining data shapes behavior in
              unexpected ways when "tell the truth" activates conspiracy-adjacent clusters. */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12">The Baby Analogy</h2>

          <p>
            Think about how a baby learns language. Nobody sits a one-year-old down and
            explains grammar. The baby just listens—to the family talking, to the TV, to the
            dog being yelled at—and eventually starts producing language that follows the rules.
            The rules were never taught. They were <em>absorbed</em>.
          </p>

          <p>
            LLM pretraining is like this, but instead of one family over a few years, it's
            all of humanity over a few weeks of compute. The model "listens" to everything
            we've ever written and absorbs the patterns.
          </p>

          <p>
            Another way to think about it: humanity spent ~100,000 years accumulating knowledge,
            writing it down, arguing about it, refining it. Pretraining compresses that entire
            arc into a single artifact.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">What Comes Out: Stochastic Parrots</h2>

          <p>
            The model that comes out of pretraining is <em>not</em> an assistant. It's a
            <strong> text predictor</strong>. You give it a sequence of words and it continues
            the sequence in a way that's statistically plausible given everything it's read.
          </p>

          {/* TODO: Cite Bender et al. 2021 "On the Dangers of Stochastic Parrots" —
              the actual paper that coined the term. Important for academic rigor. */}
          <p>
            This is why researchers sometimes call pretrained models "stochastic parrots"—they
            produce language that sounds right without (arguably) understanding what they're saying.
            Whether that's fair is genuinely debated, but it's a useful mental model for now.
          </p>

          <StochasticParrotDiagram />

          <p>
            Andrej Karpathy demonstrated this beautifully with a{' '}
            <a
              href="https://karpathy.ai/zero-to-hero.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              mini GPT trained on nothing but Shakespeare
            </a>
            . The output is clearly not Shakespeare—but it's unmistakably <em>Shakespearean</em>.
            It picked up the rhythm, the vocabulary, the structure. It "sounds right"
            without knowing what any of it means.
          </p>

          {/* TODO: This Shakespeare output is fabricated for illustration. Should either
              use actual output from Karpathy's char-RNN/GPT demo, or clearly mark as
              "illustrative recreation." Current disclaimer at the bottom is good but could
              be more prominent. */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 my-8 not-prose">
            <h3 className="font-semibold text-gray-900 mb-3">Shakespeare GPT output:</h3>
            <div className="font-mono text-sm text-gray-600 leading-relaxed italic">
              <p>DUKE VINCENTIO:</p>
              <p>Well, your wit is in the wane; and your</p>
              <p>cheek is full too gentle a morsel</p>
              <p>for the way of starving.</p>
              <p className="mt-2">LUCIO:</p>
              <p>I would the duke were returned again:</p>
              <p>this ungenitured agent will unpeople the province.</p>
            </div>
            <p className="text-xs text-gray-400 mt-4">
              Not real Shakespeare. Generated by a tiny model trained only on Shakespeare's works.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">But Is It Just Parroting?</h2>

          <p>
            Here's where it gets interesting. When you look at how information actually flows
            through the transformer architecture, the picture is more complex than "fancy autocomplete."
          </p>

          <p>
            The model doesn't just match patterns—it processes information through two distinct
            highways (a vertical "residual stream" and a horizontal "key/value stream") with an
            astronomically large number of possible paths between any two points. The number of
            paths grows combinatorially—exceeding the number of atoms in the visible universe
            for even modest-sized models.
          </p>

          <p>
            Whether this constitutes something like understanding or experience is an open question.
            We're agnostic about it here—but the machinery for something beyond simple pattern
            matching is architecturally present.
          </p>

          <p>
            For the full interactive exploration of this, see{' '}
            <Link href="/learn/curriculum/how-llms-work" className="text-blue-600 hover:text-blue-800">
              How Information Flows Through Transformers
            </Link>{' '}
            in Module 2.
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
                  Andrej Karpathy — Neural Networks: Zero to Hero (Shakespeare GPT)
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/repligate/status/1945245561394790496"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  @repligate — "This is what LLMs experience during training"
                </a>
              </li>
              <li>
                <a
                  href="https://www.anthropic.com/research/assistant-axis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Anthropic Research — The Assistant Axis
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
            </ul>
          </div>
        </CurriculumLessonPage>
    </AbbrSidenoteProvider>
  )
}


function GrepDiagram() {
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


function StochasticParrotDiagram() {
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
