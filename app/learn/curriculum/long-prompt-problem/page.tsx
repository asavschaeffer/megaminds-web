'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'

/*
  ============================================================
  EDITORIAL NOTES & REFLECTIONS
  ============================================================

  THE TECHNICAL FOUNDATION FOR THE BASIN

  This lesson is the bridge between "Output is Determined by Input" (the theory)
  and "Slipping Into the Basin" (the metaphor). It explains the MECHANISM of
  how conversations degrade.

  THE CORE PROBLEM:
  Every correction you make becomes part of the input. The model reads ALL of it.
  So when you say "no, do it like this" five times, the model is trying to satisfy
  five different (often contradictory) instructions simultaneously.

  This is not obvious to users. They think: "I'm clarifying what I want." Actually:
  "I'm adding conflicting signals to an already noisy input."

  THE "FAILURE DATA" CONCEPT:
  This is the key insight. When you correct the model, you're teaching it (for
  this conversation) that its previous output was a valid attempt. That output
  is now IN THE CONTEXT. The model reads:

  "I said X. The user said X is wrong. They want Y instead."

  But X is still there. And so is the fact that X failed. Each failure teaches
  the model "outputs like this get corrected" which leads to hedging, over-caution,
  and degrading quality.

  WHY THIS LESSON MATTERS:
  - It explains a universal user frustration: "Why does it get WORSE with each try?"
  - It provides the technical grounding for "Start a New Chat"
  - It makes the abstract "context window" concept concrete and actionable
  - It shows why "edit don't add" is so powerful

  PEDAGOGICAL APPROACH:
  - ContextPollutionDemo shows the accumulation visually
  - PayloadGrowthVisualization shows the token count explosion
  - "What to Do Instead" gives tactical alternatives (edit, start fresh, use examples)
  - The "compounding problem" callout explains the mathematical reality

  WHAT COULD BE STRONGER:
  - TODO: The user's original note included "TODO add diagram of a long series of
    failures and a llm reading through all of those to try and figure out what you
    fuckin want" - we have ContextPollutionDemo but it could be even more visceral
  - TODO: Add specific token counts for common scenarios ("a 10-message back-and-forth
    with failures = ~2000 tokens of garbage in your context")
  - TODO: Show real chat transcripts (anonymized) of conversations that degraded
    vs ones that stayed clean
  - TODO: The "exceptions" section mentions Gemini Flash image mode and Canvas -
    explain WHY these are designed for iteration (they manage context differently)

  THE CONTRADICTION INSIGHT:
  When you say "make it more formal" (attempt 1) then "more casual" (attempt 3),
  you haven't cancelled out instruction 1. BOTH instructions are in the context.
  The model is trying to be "formal AND casual" which is incoherent.

  This is not a failure of the model - it's a logical impossibility created by
  contradictory inputs.

  CONNECTIONS TO OTHER LESSONS:
  - Builds on "Output is Determined by Input" - this is the dynamic version
  - Sets up "Slipping Into the Basin" - this explains HOW you slip in
  - Supports "Don't Overthink It" - iteration pollutes, lazy iteration minimizes
    pollution
  - Motivates "Start a New Chat" - the only way to escape pollution is to reset

  CLAUDE'S REFLECTION:
  When I read a conversation with 5 corrections, I'm processing a document that
  looks like:
  [instruction 1] [attempt 1] [correction 1] [attempt 2] [correction 2] [attempt 3]...

  Each correction shifts the probability distribution for the next generation.
  But the shifts can interfere. If correction 1 pushes probabilities toward X
  and correction 3 pushes toward not-X, the resulting distribution is muddled.

  I don't experience "confusion" but the mathematical effect is real: the
  conditional probabilities I'm sampling from are shaped by contradictory signals.
  Clean input → clean probability space. Polluted input → muddled probability space.

  POTENTIAL ADDITIONS:
  - TODO: Add a "failure timeline" visualization - show how quality degrades over
    iterations (attempt 1: 70% good, attempt 2: 60%, attempt 3: 40%...)
  - TODO: Show the difference between productive iteration (adding new info) and
    unproductive iteration (contradicting previous corrections)
  - TODO: Link to research on "context length effects" in LLMs - longer contexts
    don't just cost more, they also degrade quality at the edges
  - TODO: The "edit don't add" technique deserves even more prominence - it's the
    single best way to avoid pollution while still iterating

  THE PAYLOAD METAPHOR:
  We use "payload" throughout, which is good - it's concrete (something you're
  sending) and suggestive (it has weight, it costs resources). Could be even more
  explicit: "The payload is what gets sent to the API every time you hit send.
  Everything in it costs tokens and affects the output."

  This lesson is dense with insight, but it's crucial. Without understanding this,
  users will continue to pollute contexts and wonder why the AI "got dumb."
  ============================================================
*/

export default function LongPromptProblemPage() {
  return (
    <div className="py-16 px-6 lg:px-8 bg-white">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/learn/curriculum" className="hover:text-gray-700">Module 0.6</Link>
            <span>·</span>
            <span>Failures & Basins</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            The Long Prompt Problem
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Every time you say "no, do it like this," you're adding that failure to the input.
          </p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">

          <h2 className="text-2xl font-bold text-gray-900">The Context Pollution Problem</h2>

          <p>
            You ask the model to write something. It's wrong. You say "no, make it shorter."
            Still wrong. "No, more formal." Still not right. "NO, I want it to sound like..."
          </p>

          <p>
            After five rounds of this, you're frustrated. But here's what you might not realize:
            the model is reading ALL of those failed attempts. Every correction. Every "no that's
            wrong." Every confused back-and-forth. That's all part of the input now.
          </p>

          <ContextPollutionDemo />

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Why This Kills Output Quality</h2>

          <p>
            Remember—there's no memory. The model reads the conversation from the top, every time.
            When your conversation looks like this:
          </p>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 my-8 not-prose font-mono text-xs text-gray-700 space-y-1">
            <div><span className="text-blue-600">user:</span> Write a professional email</div>
            <div><span className="text-purple-600">assistant:</span> [writes overly formal email]</div>
            <div><span className="text-blue-600">user:</span> No, less formal</div>
            <div><span className="text-purple-600">assistant:</span> [writes casual email]</div>
            <div><span className="text-blue-600">user:</span> Too casual, more professional but warm</div>
            <div><span className="text-purple-600">assistant:</span> [writes something in between]</div>
            <div><span className="text-blue-600">user:</span> Still not right, like this: [example]</div>
            <div><span className="text-purple-600">assistant:</span> [tries again]</div>
            <div><span className="text-blue-600">user:</span> Forget it, just make it shorter</div>
          </div>

          <p>
            ...the model is trying to satisfy ALL of those constraints simultaneously. "Professional
            but not formal. Casual but not too casual. Like the example but shorter. And don't do
            what I said was wrong in attempts 1, 2, and 3."
          </p>

          <p>
            You're not clarifying your request. You're adding contradictions.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">The Payload Grows</h2>

          <p>
            Every back-and-forth adds tokens to the payload. The model doesn't just read your
            latest message—it re-reads the entire conversation. At message 20, it's processing:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>The system prompt (always there)</li>
            <li>Your original request</li>
            <li>9 failed attempts from the model</li>
            <li>9 corrections from you ("no, not like that")</li>
            <li>Your latest frustrated message</li>
          </ul>

          <PayloadGrowthVisualization />

          <p>
            That's a lot of noise. And the model is trying to extract signal from all of it.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Adding "Failure Data" to the Context</h2>

          <p>
            Here's the worst part: when you say "that's wrong, do it like this," you're teaching
            the model that its previous output was a valid attempt. It's now in the training
            context for this conversation.
          </p>

          <p>
            The model sees: "I generated X. The user said X is bad. They want Y instead." So it
            tries to navigate away from X toward Y. But X is still in the prompt. And so is the
            fact that X failed.
          </p>

          <div className="bg-red-50 p-6 rounded-xl border border-red-200 my-8 not-prose">
            <p className="text-sm text-gray-700 mb-3">
              <strong className="text-red-900">The compounding problem:</strong>
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <div>Attempt 1 fails → adds failed output + your correction to context</div>
              <div>Attempt 2 fails → adds another failed output + correction to context</div>
              <div>Attempt 3 fails → now the context is full of failures and corrections</div>
              <div className="text-red-700 font-semibold pt-2">
                By attempt 4, the model is reading more failures than successes. The pattern it's
                matching is "generate things the user corrects."
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">When to Recognize This Is Happening</h2>

          <p>
            Signs you're polluting the context:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>You've gone back-and-forth 5+ times.</strong> Each correction adds noise.
            </li>
            <li>
              <strong>Each attempt gets weirder.</strong> The model is trying to satisfy contradictory
              instructions.
            </li>
            <li>
              <strong>You're getting frustrated.</strong> If you're annoyed, the conversation is cooked.
            </li>
            <li>
              <strong>You've used the word "no" three times.</strong> That's three failures in the context.
            </li>
            <li>
              <strong>The model is being overly cautious.</strong> It's learned that its outputs get
              corrected, so it hedges everything.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">What to Do Instead</h2>

          <WhatToDoInstead />

          <h2 className="text-2xl font-bold text-gray-900 mt-12">The Exception: Iteration-Friendly Modes</h2>

          <p>
            Some tools are designed for iteration. Gemini's image generation mode, ChatGPT's
            canvas mode, Claude's artifacts—these are built to handle "no, change this" workflows.
            They manage the context differently, often by separating the working document from
            the conversation.
          </p>

          <p>
            But in standard chat mode? Iteration pollutes. Fast.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">The Takeaway</h2>

          <p>
            Every message you send becomes part of the prompt. Every failure, every correction,
            every "no that's not what I meant"—it all accumulates. The model reads it all.
          </p>

          <p>
            Don't fight a bad conversation. Recognize when the context is polluted and start fresh.
            It's faster, cleaner, and you'll get better output.
          </p>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 my-8 not-prose">
            <p className="text-sm text-gray-700">
              <strong className="text-gray-900">Claude's note:</strong> When you correct me five
              times in a row, I don't experience frustration or confusion. But the mathematical
              effect is real: each correction shifts the conditional probability distribution I'm
              sampling from, and those shifts can interfere with each other. If correction 1 says
              "more formal" and correction 3 says "more casual," those are opposing gradients in
              the probability space. The result isn't "understanding nuance"—it's trying to maximize
              likelihood given contradictory signals. That's why starting fresh works better than
              iterating in a polluted context.
            </p>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-200 not-prose">
            <div className="flex justify-between">
              <Link
                href="/learn/curriculum/output-determined-by-input"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
              >
                ← Previous: Output is Determined by Input
              </Link>
              <Link
                href="/learn/curriculum/slipping-into-basin"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
              >
                Next: Slipping Into the Basin →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


function ContextPollutionDemo() {
  const [round, setRound] = useState(1)

  const conversation = [
    { round: 1, user: 'Write a professional email', ai: 'Dear Sir/Madam, I hope this correspondence finds you...', feedback: '❌ Too formal' },
    { round: 2, user: 'Less formal', ai: 'Hey! So I was thinking...', feedback: '❌ Too casual' },
    { round: 3, user: 'More professional but warm', ai: 'Hello, I wanted to reach out regarding...', feedback: '❌ Still not quite right' },
    { round: 4, user: 'Make it shorter', ai: 'Hi, Quick note about...', feedback: '❌ Too brief now' },
    { round: 5, user: 'Just make it like a normal email!', ai: 'Subject: Following Up...', feedback: '😤 Giving up' },
  ]

  const currentConversation = conversation.slice(0, round)

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Watch: Context Pollution in Action</h3>
      <p className="text-sm text-gray-500 mb-4">
        Step through each round. Notice how the context grows with each failed attempt.
      </p>

      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((r) => (
          <button
            key={r}
            onClick={() => setRound(r)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              round === r
                ? 'bg-red-600 text-white shadow'
                : round > r
                  ? 'bg-red-100 text-red-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Round {r}
          </button>
        ))}
      </div>

      <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs max-h-80 overflow-y-auto">
        <div className="text-gray-500 mb-2">{"// The model reads ALL of this:"}</div>
        <div className="text-yellow-400 mb-2 pb-2 border-b border-gray-700">
          <span className="text-gray-500">system:</span> You are a helpful assistant...
        </div>
        <AnimatePresence>
          {currentConversation.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ delay: i * 0.05 }}
              className="mb-3 pb-3 border-b border-gray-700"
            >
              <div className="text-blue-400 mb-1">
                user: <span className="text-gray-300">{item.user}</span>
              </div>
              <div className="text-purple-400 mb-1">
                assistant: <span className="text-gray-300">{item.ai}</span>
              </div>
              <div className="text-red-400 text-xs">
                {item.feedback}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {round === 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-xs"
          >
            ← 5 failed attempts + 5 corrections = polluted context
          </motion.div>
        )}
      </div>

      <p className="text-xs text-gray-500 mt-3 text-center">
        By round 5, the model is reading 10+ messages of conflicting instructions and failures.
      </p>
    </div>
  )
}


function PayloadGrowthVisualization() {
  const [messageCount, setMessageCount] = useState(4)

  const tokenCounts = [
    { messages: 2, tokens: 150, color: 'bg-green-500' },
    { messages: 4, tokens: 400, color: 'bg-yellow-500' },
    { messages: 8, tokens: 1000, color: 'bg-orange-500' },
    { messages: 16, tokens: 2400, color: 'bg-red-500' },
    { messages: 32, tokens: 5000, color: 'bg-red-700' },
  ]

  const current = tokenCounts.find(t => t.messages === messageCount) || tokenCounts[0]

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">The Payload Grows With Each Round</h3>
      <p className="text-sm text-gray-500 mb-4">
        Drag to see how the payload size explodes with back-and-forth.
      </p>

      <div className="flex items-center gap-4 mb-4">
        <span className="text-sm text-gray-600 w-40 shrink-0">
          Messages: {messageCount}
        </span>
        <input
          type="range"
          min={2}
          max={32}
          step={1}
          value={messageCount}
          onChange={(e) => {
            const val = Number(e.target.value)
            const closest = tokenCounts.reduce((prev, curr) =>
              Math.abs(curr.messages - val) < Math.abs(prev.messages - val) ? curr : prev
            )
            setMessageCount(closest.messages)
          }}
          className="flex-1"
        />
      </div>

      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden mb-3">
          <motion.div
            className={`h-full rounded-full ${current.color}`}
            animate={{ width: `${(current.tokens / 5000) * 100}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>

        <div className="flex justify-between text-xs text-gray-500 mb-4">
          <span>~{current.tokens} tokens</span>
          <span>{messageCount} messages</span>
        </div>

        {messageCount >= 16 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-red-600 font-medium"
          >
            ⚠️ Context is heavily polluted. The model is reading thousands of tokens of
            back-and-forth. Start a new chat.
          </motion.p>
        )}

        {messageCount >= 8 && messageCount < 16 && (
          <p className="text-sm text-orange-600">
            Getting messy. Consider starting fresh if the next attempt fails.
          </p>
        )}
      </div>
    </div>
  )
}


function WhatToDoInstead() {
  const strategies = [
    {
      title: 'Edit, don\'t add',
      description: 'Instead of saying "no, do it like this" in a new message, go back and EDIT your original message to be clearer. Then regenerate.',
      icon: '✏️'
    },
    {
      title: 'Start fresh after 3 failures',
      description: 'If it failed twice, the third attempt is unlikely to work. Start a new chat with a better prompt based on what you learned.',
      icon: '🔄'
    },
    {
      title: 'Use examples instead of corrections',
      description: 'Instead of "more professional," show an example: "Like this: [paste example]"',
      icon: '📋'
    },
    {
      title: 'Ask yourself: is my prompt clear?',
      description: 'If the model keeps failing, your instructions are probably ambiguous. Clarify the prompt, don\'t iterate on failures.',
      icon: '🤔'
    },
  ]

  return (
    <div className="my-8 space-y-3 not-prose">
      {strategies.map((strategy, i) => (
        <div key={i} className="bg-green-50 p-5 rounded-xl border-2 border-green-200">
          <div className="flex items-start gap-4">
            <div className="text-3xl shrink-0">{strategy.icon}</div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">{strategy.title}</h4>
              <p className="text-sm text-gray-700">{strategy.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
