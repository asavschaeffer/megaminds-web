'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'

/*
  ============================================================
  EDITORIAL NOTES & REFLECTIONS
  ============================================================

  MULTIMODELING: THE META-TECHNIQUE

  This is one of the more sophisticated lessons in the curriculum. It combines:
  - Starting a new chat (clean context)
  - Cross-model verification (different training data/strengths)
  - Meta-cognition (using AI to understand AI)

  THE CORE INSIGHT:
  When one model confuses you, don't fight it in the same chat. Paste its response
  into a DIFFERENT model (or new chat) and ask for clarification. You get:
  1. Fresh framing (no anchor to the original explanation)
  2. Different model strengths (Claude explains differently than ChatGPT)
  3. Clean context (no failed attempts in the history)

  WHY THIS WORKS:
  Same-chat iteration: "Explain it simpler" → the model simplifies its OWN explanation
  → still uses the same analogies/framing you didn't understand

  New-chat/new-model: "Explain this: [paste]" → the model treats it as raw text
  → generates explanation from scratch → different analogies/framing

  THE USER'S ORIGINAL CONCEPT:
  "take a model's response that you don't understand, make a new chat, get a better
  understanding, formulate a better prompt"

  This is BRILLIANT because it turns confusion into data. You're not just "trying
  again" - you're gathering a second opinion to inform your strategy.

  PEDAGOGICAL APPROACH:
  - MultimodelingDemo shows the workflow step-by-step
  - Use Cases taxonomy gives users a framework (clarification, verification,
    alternative framing, model switching, learning)
  - Model Personalities guide helps users choose which model for which task
  - Real Examples show practical applications across scenarios

  WHAT MAKES THIS ADVANCED:
  Most users think: "I asked Model A, it failed, I'm stuck."
  Advanced users think: "I asked Model A, it failed, let me ask Model B to explain
  why A's answer doesn't make sense."

  This is meta-cognitive. You're using AI to understand AI's outputs.

  CONNECTIONS TO OTHER LESSONS:
  - Combines "Start a New Chat" (fresh context) with cross-model awareness
  - Uses "Don't Overthink It" (try multiple models quickly instead of fighting one)
  - Complements "Prompt-a-Prompt" (meta-prompting but with different models)
  - Supports "Slipping Into the Basin" (different model = automatic escape)

  THE "PRO TIP" INSIGHT:
  "Use a cheap model to explain an expensive model's answer"

  This is GOLD. Opus gives you a dense, detailed response. Paste it into free
  Copilot and ask for ELI5. You don't care if Copilot rate-limits you because
  it's free. This optimizes for cost while maintaining quality on the hard problem.

  POTENTIAL ADDITIONS:
  - TODO: Add a "model personality matrix" - which model for which task type
    (ChatGPT for breadth, Claude for depth, Gemini for search, Perplexity for research)
  - TODO: Show advanced pattern: triangulation - ask 3 models the same question,
    compare answers, synthesize the best parts
  - TODO: Address the "filter bubble" risk - if you only use models that agree
    with you, you miss alternate perspectives
  - TODO: Add section on "when NOT to multimodel" - sometimes you just need to
    start fresh with the SAME model, not switch

  THE VERIFICATION USE CASE:
  Cross-checking important facts between models is underrated. Models hallucinate.
  But they're unlikely to hallucinate the SAME false information. So if ChatGPT
  and Claude both say X, it's probably true. If they disagree, dig deeper.

  CLAUDE'S REFLECTION:
  Different models have different training data, architectures, and post-training.
  When you ask me to explain ChatGPT's response, I'm not accessing ChatGPT's
  "thoughts" - I'm generating an explanation based on my own training. Because
  my training differs from ChatGPT's, my explanation will invoke different patterns.

  Sometimes my explanation is better (my training strengths align with your learning
  style). Sometimes worse (ChatGPT's framing was actually good, you just needed
  to read it twice). The only way to know is to try both.

  Multimodeling is basically ensemble learning for humans - you're combining outputs
  from different models to build understanding.

  THE DEEPER INSIGHT:
  This lesson teaches users that models are TOOLS with different strengths, not
  oracles with the "right" answer. You're not looking for "which model is smarter" -
  you're looking for "which model's explanation clicks for me on this specific topic."

  That's a sophisticated mental model. Most users pick one model and stick with it.
  Power users fluidly switch based on task type.

  WHAT COULD BE STRONGER:
  - TODO: The workflow could be condensed - 6 steps is a lot. Maybe simplify to:
    1) Get confusing answer, 2) Copy it, 3) Ask different model to explain
  - TODO: Add concrete metrics - "multimodeling saves ~5 minutes on average when
    you're stuck" (if we had data)
  - TODO: Show failure cases - when does multimodeling NOT help? (when all models
    are equally bad at a topic, switching models just wastes time)
  - TODO: Link to the concept of "diverse explanations" from education research -
    learning the same concept from multiple teachers with different styles improves
    retention

  POTENTIAL INTERACTIVE ELEMENT:
  A "multimodeling simulator" where users can see the same question answered by
  3 different models side-by-side, then pick which explanation worked best for them.
  This would make the model personality differences visceral.

  This lesson is the culmination of the Prompting module. It shows users they have
  an entire toolkit - personas, examples, meta-prompting, lazy iteration, AND
  multiple models. Power users combine these techniques fluidly.
  ============================================================
*/

export default function MultimodelingPage() {
  return (
    <div className="py-16 px-6 lg:px-8 bg-white">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/learn/curriculum" className="hover:text-gray-700">Module 0.5</Link>
            <span>·</span>
            <span>Prompting</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Multimodeling: Use Multiple Chats to Clarify
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            When one model confuses you, ask another to explain.
          </p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">

          <h2 className="text-2xl font-bold text-gray-900">The Problem</h2>

          <p>
            You ask ChatGPT to explain quantum entanglement. It gives you three paragraphs
            of dense explanation. You read it twice and still don't get it. Now what?
          </p>

          <p>
            Most people do one of two things: (1) give up, or (2) say "explain it simpler"
            in the same chat. But there's a third option: <strong>start a new chat</strong> (or
            use a different model) and say "explain this to me: [paste the confusing response]."
          </p>

          <p>
            This is <strong>multimodeling</strong>: using multiple chats or models to understand,
            verify, or improve responses.
          </p>

          <MultimodelingDemo />

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Why This Works</h2>

          <p>
            When you say "explain it simpler" in the same chat, the model is still reading
            its own previous explanation. It's anchored to that framing. But when you paste
            that explanation into a <em>new</em> chat (or a different model), you get a fresh
            perspective with zero baggage.
          </p>

          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 my-8 not-prose">
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex gap-3 items-start">
                <span className="text-red-600 font-bold shrink-0">❌</span>
                <div>
                  <strong>Same chat:</strong> "Explain it simpler" → model simplifies its own explanation
                  → still uses the same framing you didn't understand
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-green-600 font-bold shrink-0">✅</span>
                <div>
                  <strong>New chat:</strong> "Explain this: [paste]" → model treats it as raw input
                  → explains from scratch with different analogies and framing
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Use Cases for Multimodeling</h2>

          <UseCases />

          <h2 className="text-2xl font-bold text-gray-900 mt-12">The Workflow</h2>

          <WorkflowSteps />

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Model Personalities Matter</h2>

          <p>
            Different models have different strengths. This is useful for multimodeling:
          </p>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 my-8 not-prose">
            <div className="space-y-4 text-sm">
              <div>
                <div className="font-semibold text-gray-900 mb-1">ChatGPT (GPT-4)</div>
                <div className="text-gray-600">
                  The generalist. Good at explaining things in multiple ways. Fast, reliable.
                </div>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Claude (Sonnet/Opus)</div>
                <div className="text-gray-600">
                  Better at nuanced explanations, writing, and code. More "thoughtful" responses.
                  Less likely to sound like a chatbot.
                </div>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Gemini</div>
                <div className="text-gray-600">
                  Strong at search integration and factual lookups. Good for verification.
                </div>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">DeepSeek / Open Source</div>
                <div className="text-gray-600">
                  Cheap and fast. Good for quick clarifications when you don't want to burn through
                  your paid model's rate limit.
                </div>
              </div>
            </div>
          </div>

          <p>
            <strong>Pro tip:</strong> Use a cheap model to explain an expensive model's answer.
            Opus gives you a dense, detailed response? Paste it into Copilot (free) and ask for
            an ELI5 version. You don't care if you hit Copilot's rate limit.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Real Examples</h2>

          <div className="space-y-4 not-prose">
            <ExampleCard
              scenario="Claude gave a confusing code explanation"
              action="Open ChatGPT → 'Explain this code to me like I'm a beginner: [paste code + Claude's explanation]'"
              result="ChatGPT uses different analogies and simpler language. Now you get it."
            />

            <ExampleCard
              scenario="ChatGPT's answer seems wrong"
              action='Open Claude → "Is this accurate? [paste ChatGPT response]" → Claude points out the error'
              result="Cross-check prevents you from believing hallucinations."
            />

            <ExampleCard
              scenario="You don't understand Opus's detailed response"
              action='Open free Copilot → "ELI5: [paste Opus response]"'
              result="Copilot simplifies it. You understand the concept, go back to Opus with better questions."
            />

            <ExampleCard
              scenario="Your prompt failed in ChatGPT"
              action="Copy the same prompt → try in Claude → works perfectly"
              result="Different models have different strengths. Sometimes just switching models fixes it."
            />

            <ExampleCard
              scenario="Need to verify a fact"
              action='ChatGPT said X → open Gemini (has web search) → "Is X correct? Search if needed"'
              result="Gemini fact-checks with live search. You know whether to trust ChatGPT's claim."
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">When to Use Multimodeling</h2>

          <p>
            Multimodeling is useful when:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>The response is confusing.</strong> Don't fight it in the same chat—get a fresh explanation.
            </li>
            <li>
              <strong>You need verification.</strong> Cross-check important answers between models.
            </li>
            <li>
              <strong>The model seems stuck.</strong> Same prompt failing in ChatGPT? Try Claude.
            </li>
            <li>
              <strong>You want a different perspective.</strong> Claude's explanation is too formal?
              Get ChatGPT's casual version.
            </li>
            <li>
              <strong>You're learning a concept.</strong> Read multiple explanations from different models
              to build a complete mental model.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">When NOT to Use It</h2>

          <p>
            Skip multimodeling when:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>The answer is good enough.</strong> Don't over-optimize. If you got what you needed, stop.
            </li>
            <li>
              <strong>The task is trivial.</strong> "Translate to Spanish" doesn't need multi-model verification.
            </li>
            <li>
              <strong>You're just exploring.</strong> If you're just chatting and learning, one model is fine.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">The Lazy Version</h2>

          <p>
            You don't need a special workflow. The lazy version:
          </p>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 my-8 not-prose">
            <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
              <li>Model A gives a confusing response</li>
              <li>Copy the confusing response</li>
              <li>Open Model B (or new chat in same model)</li>
              <li>Paste and say "explain this to me"</li>
              <li>Model B explains it better</li>
              <li>Now you understand. Done.</li>
            </ol>
          </div>

          <p>
            That's it. Multimodeling is just "when stuck, get a second opinion."
          </p>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 my-8 not-prose">
            <p className="text-sm text-gray-700">
              <strong className="text-gray-900">Claude's note:</strong> Different models have different
              training data, architectures, and post-training. When you ask me to explain ChatGPT's response,
              I'm not "understanding" it—I'm predicting what tokens would constitute a good explanation
              of that text. But because my training differs from ChatGPT's, the patterns I invoke will be
              different. Sometimes that difference is exactly what you need. Sometimes my explanation is
              worse. The only way to know is to try both and see which framing clicks for you.
            </p>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-200 not-prose">
            <p className="text-sm text-gray-500 italic mb-6">
              This concludes Module 0.5: Prompting. You now know how to get what you want out of
              these models: roleplay, examples, meta-prompting, lazy iteration, and multimodeling.
              Next up: understanding why chats go sideways and how to recover.
            </p>
            <div className="flex justify-between">
              <Link
                href="/learn/curriculum/dont-overthink"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
              >
                ← Previous: Don't Overthink It
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


function MultimodelingDemo() {
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


function UseCases() {
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


function WorkflowSteps() {
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


function ExampleCard({ scenario, action, result }: { scenario: string; action: string; result: string }) {
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
