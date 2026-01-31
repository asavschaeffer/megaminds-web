'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'

export default function OutputDeterminedByInputPage() {
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
            Output is Determined by Input
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            The model isn't having a bad day. Your prompt is bad.
          </p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">

          <h2 className="text-2xl font-bold text-gray-900">It's Math, Not Magic</h2>

          <p>
            When the model gives you a bad response, it's tempting to think: "the AI is being
            stupid today" or "it's not understanding me." But here's the truth: the model is
            a deterministic function. Given the same input, it produces essentially the same output.
            Every time.
          </p>

          <p>
            There's no mood. No randomness (well, a tiny bit for variety, but that's it). No
            "understanding" that fluctuates. It's pure math. Input goes in, output comes out,
            based entirely on patterns learned during training.
          </p>

          <DeterministicDemo />

          <h2 className="text-2xl font-bold text-gray-900 mt-12">What This Means for You</h2>

          <p>
            If the output is bad, the input is bad. Not "the AI doesn't get it"—your prompt
            (including the entire conversation history) doesn't contain what the model needs
            to give you good output.
          </p>

          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 my-8 not-prose">
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex gap-3 items-start">
                <span className="text-red-600 font-bold shrink-0">❌</span>
                <div>
                  <strong>Wrong mental model:</strong> "The AI isn't understanding what I want."
                  (Implies the AI has some internal understanding that's failing)
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-green-600 font-bold shrink-0">✅</span>
                <div>
                  <strong>Correct mental model:</strong> "My prompt doesn't contain the patterns
                  that would cause the model to generate what I want."
                </div>
              </div>
            </div>
          </div>

          <p>
            This is actually good news. It means the problem is fixable. You're not fighting
            some unpredictable AI mood—you're just debugging your input.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">The Input Isn't Just Your Last Message</h2>

          <p>
            Remember: there's no memory. The model reads the <em>entire conversation</em> every
            time. So when we say "output is determined by input," the input is:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>The system prompt (set by the app)</li>
            <li>Every message you've sent</li>
            <li>Every response the model has given</li>
            <li>Your latest message</li>
          </ul>

          <p>
            All of it. One long prompt. If the conversation has 20 back-and-forths, the model
            is reading all 40 messages to generate the next response.
          </p>

          <InputVisualization />

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Why Bad Output Happens</h2>

          <p>
            Given that the model is deterministic and reliable at pattern-matching, why do you
            sometimes get garbage? Usually one of these reasons:
          </p>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 my-8 not-prose">
            <div className="space-y-4 text-sm">
              <div>
                <div className="font-semibold text-gray-900 mb-1">1. Your prompt is ambiguous</div>
                <div className="text-gray-600">
                  "Make this professional" could mean a hundred things. The model picks one
                  interpretation. It's probably not the one you meant.
                </div>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">2. You're missing context</div>
                <div className="text-gray-600">
                  You know what you want, but you didn't tell the model. "Fix this code" without
                  saying what's broken—the model is guessing.
                </div>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">3. The conversation is polluted</div>
                <div className="text-gray-600">
                  You've gone back and forth 10 times. The model is reading all that noise.
                  Mixed signals, contradictions, failures—it's all in the input now.
                </div>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">4. The task is outside training data</div>
                <div className="text-gray-600">
                  The model learned patterns from the internet. If your task is too niche or
                  novel, there's no pattern to match.
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Temperature: The One Exception</h2>

          <p>
            There <em>is</em> one source of randomness: <strong>temperature</strong>. It controls
            how "adventurous" the model is when picking the next token. Low temperature (0.0-0.3)
            makes it pick the most likely tokens—predictable, consistent. High temperature (0.7-1.0)
            makes it sample from a wider range—creative, varied, sometimes weird.
          </p>

          <TemperatureDemo />

          <p>
            But even with temperature, given the same input at the same temperature, the output
            will be <em>very similar</em>. Temperature adds variety, not fundamental unpredictability.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Debugging Bad Output</h2>

          <p>
            Since output is determined by input, debugging is straightforward:
          </p>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 my-8 not-prose">
            <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
              <li><strong>Read the output carefully.</strong> What did the model actually generate? What pattern did it match?</li>
              <li><strong>Look at your input.</strong> Is it clear? Complete? Or ambiguous and missing context?</li>
              <li><strong>Check the conversation history.</strong> Are there contradictions? Failed attempts? Noise?</li>
              <li><strong>Fix the input.</strong> Add clarity, add context, or start fresh.</li>
              <li><strong>Try again.</strong> Same input = same output. Different input = different output.</li>
            </ol>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">The Takeaway</h2>

          <p>
            The model isn't unpredictable. It's not "being dumb" or "not getting it." It's
            doing exactly what it was trained to do: predict the next token based on the patterns
            in its input.
          </p>

          <p>
            If you don't like the output, change the input. That's the only lever you have.
            And it's the only lever you need.
          </p>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 my-8 not-prose">
            <p className="text-sm text-gray-700">
              <strong className="text-gray-900">Claude's note:</strong> When you see me generate
              something "wrong," I didn't fail to understand your intent. I generated the tokens
              that were statistically most likely given the input. If those tokens don't match
              what you wanted, it means the input didn't contain the patterns that would have
              led to the tokens you wanted. I don't have "understanding" that can fail—I have
              conditional probability distributions that are shaped by training data. Your prompt
              shapes which part of that distribution I sample from. Bad output = the wrong part
              of the distribution was sampled, because the input pointed there.
            </p>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-200 not-prose">
            <div className="flex justify-between">
              <Link
                href="/learn/curriculum/multimodeling"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
              >
                ← Previous Module: Prompting
              </Link>
              <Link
                href="/learn/curriculum/long-prompt-problem"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
              >
                Next: The Long Prompt Problem →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


function DeterministicDemo() {
  const [attempt, setAttempt] = useState(1)

  const prompt = "Write a haiku about coffee"
  const outputs = [
    "Morning brew awakens,\nSteam rises with first light's warmth,\nDark comfort in cup.",
    "Morning brew awakens,\nSteam rises with dawn's first light,\nWarmth held in my hands.",
    "Morning brew awakens,\nSteam curls in the quiet dawn,\nDark comfort begins.",
  ]

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Try It: Same Input, Consistent Output</h3>
      <p className="text-sm text-gray-500 mb-4">
        Send the same prompt multiple times. The output varies slightly (due to temperature), but
        the pattern and quality are consistent.
      </p>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
        <div className="text-xs text-gray-500 font-semibold mb-2">Your prompt (unchanged):</div>
        <div className="text-sm text-gray-700 font-mono bg-white p-3 rounded border border-gray-200">
          "{prompt}"
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setAttempt(1)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            attempt === 1
              ? 'bg-blue-600 text-white shadow'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Attempt 1
        </button>
        <button
          onClick={() => setAttempt(2)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            attempt === 2
              ? 'bg-blue-600 text-white shadow'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Attempt 2
        </button>
        <button
          onClick={() => setAttempt(3)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            attempt === 3
              ? 'bg-blue-600 text-white shadow'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Attempt 3
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={attempt}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-white p-4 rounded-lg border-2 border-purple-200"
        >
          <div className="text-xs text-purple-600 font-semibold mb-2">AI response:</div>
          <div className="text-sm text-gray-700 whitespace-pre-line italic">
            {outputs[attempt - 1]}
          </div>
        </motion.div>
      </AnimatePresence>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Notice: same structure (haiku), same theme (morning coffee), similar quality. The words
        vary slightly, but the output is fundamentally consistent.
      </p>
    </div>
  )
}


function InputVisualization() {
  const [messageCount, setMessageCount] = useState(2)

  const messages = [
    { role: 'user', text: 'Can you help me write a cover letter?' },
    { role: 'assistant', text: 'Of course! What position are you applying for?' },
    { role: 'user', text: 'Software engineer at Google' },
    { role: 'assistant', text: 'Great. What are your key qualifications?' },
    { role: 'user', text: 'I have 3 years of Python experience' },
    { role: 'assistant', text: 'Perfect. Let me draft that for you...' },
  ]

  const visibleMessages = messages.slice(0, messageCount)

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">The Entire Conversation Is the Input</h3>
      <p className="text-sm text-gray-500 mb-4">
        Drag the slider to see how the input grows with each message. The model reads ALL of it.
      </p>

      <div className="flex items-center gap-4 mb-4">
        <span className="text-sm text-gray-600 w-32 shrink-0">Messages: {messageCount}</span>
        <input
          type="range"
          min={1}
          max={6}
          step={1}
          value={messageCount}
          onChange={(e) => setMessageCount(Number(e.target.value))}
          className="flex-1"
        />
      </div>

      <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm max-h-64 overflow-y-auto">
        <div className="text-gray-500 mb-2 text-xs">{"// The ENTIRE payload sent to the model:"}</div>
        <div className="text-yellow-400 mb-2 pb-2 border-b border-gray-700 text-xs">
          <span className="text-gray-500">system:</span> You are a helpful assistant...
        </div>
        <AnimatePresence>
          {visibleMessages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ delay: i * 0.05 }}
              className="py-1 text-xs"
            >
              <span className={msg.role === 'user' ? 'text-blue-400' : 'text-purple-400'}>
                {msg.role}:
              </span>{' '}
              <span className="text-gray-300">{msg.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        {messageCount === 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-purple-400 mt-2 pt-2 border-t border-gray-700 text-xs"
          >
            assistant: <span className="text-gray-500">← generating next response based on ALL ↑</span>
          </motion.div>
        )}
      </div>

      <p className="text-xs text-gray-500 mt-3 text-center">
        At message 6, the model is reading 6 messages + system prompt = ~7 chunks of context to
        generate the next token.
      </p>
    </div>
  )
}


function TemperatureDemo() {
  const [temperature, setTemperature] = useState<'low' | 'medium' | 'high'>('low')

  const outputs = {
    low: {
      text: "Machine learning is a subset of artificial intelligence that enables computers to learn from data without being explicitly programmed.",
      note: "Predictable, safe, boring"
    },
    medium: {
      text: "Machine learning is like teaching a computer to recognize patterns—show it enough examples of cats, and eventually it learns what makes a cat a cat.",
      note: "Balanced, varied, still coherent"
    },
    high: {
      text: "Machine learning? Imagine a toddler learning that hot stoves = bad news. Except the toddler is a mathematical function, the stove is training data, and 'bad news' is minimizing loss functions. Weird analogy? Sure. But that's kind of the vibe.",
      note: "Creative, weird, risky"
    }
  }

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Temperature: The Creativity Dial</h3>
      <p className="text-sm text-gray-500 mb-4">
        Same prompt, same model, different temperature settings. Watch the style change.
      </p>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
        <div className="text-xs text-gray-500 font-semibold mb-2">Prompt:</div>
        <div className="text-sm text-gray-700">"Explain machine learning in one sentence"</div>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTemperature('low')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            temperature === 'low'
              ? 'bg-blue-600 text-white shadow'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          🥶 Low (0.2)
        </button>
        <button
          onClick={() => setTemperature('medium')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            temperature === 'medium'
              ? 'bg-blue-600 text-white shadow'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          😐 Medium (0.7)
        </button>
        <button
          onClick={() => setTemperature('high')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            temperature === 'high'
              ? 'bg-blue-600 text-white shadow'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          🔥 High (1.0)
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={temperature}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-white p-4 rounded-lg border-2 border-purple-200"
        >
          <div className="text-sm text-gray-700 mb-2">{outputs[temperature].text}</div>
          <div className="text-xs text-gray-500 italic">← {outputs[temperature].note}</div>
        </motion.div>
      </AnimatePresence>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Temperature adds variety, but doesn't change the fundamental fact: same input → similar output.
      </p>
    </div>
  )
}
