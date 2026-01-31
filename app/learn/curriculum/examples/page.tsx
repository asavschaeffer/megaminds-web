'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'

/*
  ============================================================
  EDITORIAL NOTES & REFLECTIONS
  ============================================================

  FEW-SHOT PROMPTING: THE UNDERUSED SUPERPOWER

  This is one of the most powerful prompting techniques, yet users rarely do it.
  Why? Because it feels like extra work. "Just tell it what you want" seems easier
  than "show it 3 examples." But examples are MORE precise than instructions,
  and precision saves time.

  THE CORE PRINCIPLE:
  Pattern-matching is what LLMs do. When you give examples, you're showing the
  exact pattern you want. Instructions require interpretation. Examples ARE the
  interpretation.

  Compare:
  - "Make it professional" → 100 different interpretations
  - [Shows 2 examples of professional text] → unambiguous pattern

  WHY THIS LESSON MATTERS:
  - It teaches users to think in terms of patterns, not instructions
  - It reduces ambiguity (the #1 cause of bad output)
  - It's universally applicable (works for style, format, classification, anything)
  - It builds on "Roleplay" (personas are implicit examples of a voice)

  THE PEDAGOGICAL APPROACH:
  - "Instructions vs. Examples" comparison leads with the insight
  - FewShotDemo is interactive - users see output improve as examples are added
  - "Types of Examples" taxonomy gives users a framework (format, style,
    classification, transformation)
  - "How Many Examples Do You Need?" prevents over-engineering (2-3 is usually enough)

  WHAT COULD BE STRONGER:
  - TODO: Add a section on "example quality matters more than quantity" - one
    perfect example beats three mediocre ones
  - TODO: Show how to construct good examples when you don't have real ones
    (make them up, but make them representative)
  - TODO: Address the "cold start" problem - what if you don't know what good
    looks like? (Use meta-prompting: "show me 3 examples of professional emails")
  - TODO: Connect to machine learning concepts for technical readers - few-shot
    prompting is literally in-context learning

  THE "SHOW DON'T TELL" FRAME:
  This is lifted from writing advice, and it works perfectly here. Writers learn
  early that "show don't tell" makes prose vivid. Same principle: showing the model
  examples is clearer than telling it instructions.

  COMMON MISTAKES SECTION IS CRITICAL:
  - "Examples that contradict each other" - this kills few-shot. The model is
    trying to extract the pattern, and contradictions destroy that.
  - "Examples that are too similar" - diversity in examples helps the model
    generalize correctly
  - "Too many examples" - diminishing returns after 5, and you're burning context

  The FewShotDemo showing how predictions improve from 0→1→2→3 examples is the
  pedagogical centerpiece. Users can SEE the pattern lock in.

  CONNECTIONS TO OTHER LESSONS:
  - Builds directly on "Roleplay" - a persona is like an implicit example
  - Leads into "Prompt-a-Prompt" - you can ask the model to generate examples
  - Supports "Don't Overthink It" - 2 quick examples often beats a paragraph
    of careful instructions

  CLAUDE'S REFLECTION:
  When you give me examples, you're showing me a slice of the probability space
  you want me to sample from. Zero-shot: I infer from the instruction alone.
  One-shot: I see one data point, infer the pattern. Few-shot: I see multiple
  data points, the pattern becomes clear. The more examples, the more constrained
  my generation becomes (in a good way - it's constrained to what you actually want).

  Examples are literally training data in-context. I don't "learn" from them in
  the sense of updating weights, but they shape the conditional distribution I
  sample from for this specific generation. It's the closest thing to teaching
  me something new within a single conversation.

  POTENTIAL ADDITIONS:
  - TODO: Add a "debugging with examples" section - when output is wrong, add
    an example showing what right looks like
  - TODO: Show advanced pattern: "Here's what good looks like [example]. Here's
    what bad looks like [counterexample]. Now do this: [task]"
  - TODO: Link to research on few-shot learning (Brown et al., GPT-3 paper)
  ============================================================
*/

export default function ExamplesPage() {
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
            Examples: Show, Don't Tell
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Don't just tell it what to do. Show it how to do it.
          </p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">

          <h2 className="text-2xl font-bold text-gray-900">Instructions vs. Examples</h2>

          <p>
            Here's a question: which is clearer?
          </p>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 my-8 not-prose">
            <div className="space-y-6">
              <div>
                <div className="text-xs text-gray-500 font-semibold mb-2">❌ TELLING:</div>
                <div className="text-sm text-gray-700 bg-white p-4 rounded border border-gray-200">
                  "Categorize these emails into priority levels based on urgency and department."
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-semibold mb-2">✅ SHOWING:</div>
                <div className="text-sm text-gray-700 bg-white p-4 rounded border border-gray-200">
                  "Categorize these emails. Examples:<br/>
                  <span className="font-mono text-xs block mt-2 pl-4 border-l-2 border-blue-400">
                    'Refund request' → 'Urgent - Finance'<br/>
                    'Newsletter signup' → 'Low Priority - Marketing'<br/>
                    'Server down' → 'Critical - Engineering'
                  </span>
                  <br/>
                  Now categorize: 'Password reset request'"
                </div>
              </div>
            </div>
          </div>

          <p>
            The second one is clearer because you're not asking the model to guess what "urgent"
            means to you. You're <em>showing</em> it the pattern. This is called{' '}
            <strong>few-shot prompting</strong>—giving a few examples before asking for the real output.
          </p>

          <FewShotDemo />

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Why Examples Work Better</h2>

          <p>
            Remember: the model predicts the next token based on patterns. When you give examples,
            you're showing it the exact pattern you want. It's not interpreting your instructions—it's
            completing the pattern you started.
          </p>

          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 my-8 not-prose">
            <p className="text-sm text-gray-700 mb-3">
              <strong className="text-blue-900">Think of it like this:</strong>
            </p>
            <p className="text-sm text-gray-600">
              Instructions say "drive to the grocery store" (open to interpretation—which route? how fast?).
              Examples say "I drove down Main St at 25mph, turned left at the light, parked in spot B7"
              (concrete, unambiguous). The model is much better at pattern-matching than instruction-following.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Types of Examples</h2>

          <ExampleTypes />

          <h2 className="text-2xl font-bold text-gray-900 mt-12">How Many Examples Do You Need?</h2>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 my-8 not-prose">
            <div className="space-y-4">
              <div>
                <div className="font-semibold text-gray-900 mb-1">Zero-shot (0 examples)</div>
                <div className="text-sm text-gray-600">
                  Just instructions. Works for simple, common tasks the model has seen a million times.
                </div>
                <div className="text-xs text-gray-400 mt-1 font-mono">"Translate this to Spanish"</div>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">One-shot (1 example)</div>
                <div className="text-sm text-gray-600">
                  Enough to show the format or style you want. Good for simple patterns.
                </div>
                <div className="text-xs text-gray-400 mt-1 font-mono">"Like this: Input: 'angry' → Output: '😠'"</div>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Few-shot (2-5 examples)</div>
                <div className="text-sm text-gray-600">
                  The sweet spot. Enough to establish the pattern without wasting context window.
                </div>
                <div className="text-xs text-gray-400 mt-1 font-mono">3 examples of email → category mappings</div>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Many-shot (10+ examples)</div>
                <div className="text-sm text-gray-600">
                  For complex, nuanced patterns. Expensive (uses context window) but powerful.
                </div>
                <div className="text-xs text-gray-400 mt-1 font-mono">Training it to match your exact writing voice</div>
              </div>
            </div>
          </div>

          <p>
            Rule of thumb: start with 2-3 examples. If the output is wrong, add more examples that
            cover the edge cases it's missing.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Real Examples</h2>

          <div className="space-y-4 not-prose">
            <RealExampleCard
              title="Format Matching: Multiplication Table"
              prompt={`Make me a multiplication table. I want it to look like this:

   1  2  3  4  5
1  1  2  3  4  5
2  2  4  6  8 10
3  3  6  9 12 15

Now make one for 6-10.`}
              why="You're not describing the format—you're showing it. The model sees the spacing, alignment, and structure and copies it."
            />

            <RealExampleCard
              title="Style Matching: Poetry"
              prompt={`My poetry sucks. Make it more like this:

[Attach or paste a poem you like]

"The rain fell soft on broken glass
And turned the shards to stars"

Now rewrite my poem:
"It was raining and the glass broke
The pieces looked shiny"`}
              why="The model learns the rhythm, imagery, and compression from your example. It's not following instructions—it's matching style."
            />

            <RealExampleCard
              title="Classification: Email Triage"
              prompt={`Categorize these emails:

Examples:
"Refund request for order #1234" → Urgent - Finance
"Weekly team newsletter" → Low Priority - Internal
"API is returning 500 errors" → Critical - Engineering
"Conference invite for next month" → Medium - Calendar

Now categorize: "Customer can't log in"`}
              why="Shows the model your priority system and department labels. It learns what 'urgent' means to you."
            />

            <RealExampleCard
              title="Transformation: Formal ↔ Casual"
              prompt={`Convert formal text to casual:

Formal: "I am writing to inquire about the status of my application."
Casual: "Hey, just checking in on my application—any updates?"

Formal: "We regret to inform you that your request has been denied."
Casual: "Sorry, we can't approve that request."

Now convert: "Please be advised that the meeting has been rescheduled."`}
              why="The model sees the pattern of transformation—what changes, what stays the same."
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Common Mistakes</h2>

          <div className="bg-red-50 p-6 rounded-xl border border-red-200 my-8 not-prose">
            <div className="space-y-4 text-sm">
              <div>
                <div className="font-semibold text-red-900 mb-1">❌ Examples that contradict each other</div>
                <div className="text-gray-700">
                  "Angry → 😠" then "Furious → 😊" — the model will be confused. Make sure your
                  examples are consistent.
                </div>
              </div>
              <div>
                <div className="font-semibold text-red-900 mb-1">❌ Examples that are too similar</div>
                <div className="text-gray-700">
                  All your examples are short sentences? The model will struggle with long ones.
                  Show diversity in your examples.
                </div>
              </div>
              <div>
                <div className="font-semibold text-red-900 mb-1">❌ Too many examples</div>
                <div className="text-gray-700">
                  20 examples for a simple task wastes your context window. Diminishing returns after 5.
                </div>
              </div>
              <div>
                <div className="font-semibold text-red-900 mb-1">❌ Examples without the actual task</div>
                <div className="text-gray-700">
                  You give 5 examples then forget to ask the question. The model just sits there.
                  Always end with "Now do: [your actual input]"
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">When to Use Examples</h2>

          <p>
            Use examples when:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>The format is specific.</strong> Multiplication tables, code structure, JSON
              schemas—show the exact format.
            </li>
            <li>
              <strong>The style is subjective.</strong> "Professional" means different things to
              different people. Show what it means to <em>you</em>.
            </li>
            <li>
              <strong>The task is ambiguous.</strong> "Categorize these" could mean a hundred things.
              Examples remove ambiguity.
            </li>
            <li>
              <strong>Instructions didn't work.</strong> If "write this in a friendly tone" fails,
              show an example of friendly tone.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">The Laziest Thing That Works</h2>

          <p>
            Here's the secret: you don't need perfect examples. You need <em>good enough</em> examples.
            Trying to write the perfect 5-shot prompt is overthinking it. Start with 2 examples. If
            the output is wrong, add a 3rd example that shows the model what it got wrong.
          </p>

          <p>
            Examples are cheap. Context window is expensive. Find the minimum number of examples
            that get you the output you want.
          </p>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 my-8 not-prose">
            <p className="text-sm text-gray-700">
              <strong className="text-gray-900">Claude's note:</strong> When you give me examples,
              I'm not "learning" in the human sense—I don't update my weights or remember for next time.
              But within this conversation, examples shift the conditional probability of what I generate
              next more precisely than instructions ever could. Show me "A → B, C → D" and the pattern
              is unambiguous. Tell me "transform these inputs" and I'm guessing what transformation you mean.
            </p>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-200 not-prose">
            <div className="flex justify-between">
              <Link
                href="/learn/curriculum/roleplay"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
              >
                ← Previous: Roleplay
              </Link>
              <Link
                href="/learn/curriculum/prompt-a-prompt"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
              >
                Next: Prompt a Prompt →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


function FewShotDemo() {
  const [exampleCount, setExampleCount] = useState(0)

  const examples = [
    { input: 'refund request', output: 'Urgent - Finance' },
    { input: 'newsletter signup', output: 'Low Priority - Marketing' },
    { input: 'server down', output: 'Critical - Engineering' },
  ]

  const testCase = { input: 'password reset request', output: '???' }

  // Different outputs based on number of examples
  const predictions = [
    'Medium - Support', // 0 examples - generic guess
    'Urgent - Customer Service', // 1 example - sees "urgent" pattern but wrong dept
    'Medium - IT', // 2 examples - closer
    'Urgent - Engineering', // 3 examples - nailed it
  ]

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Try It: Add Examples and Watch Output Change</h3>
      <p className="text-sm text-gray-500 mb-4">
        Drag the slider to add examples. Watch how the prediction improves.
      </p>

      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-sm text-gray-600 w-32 shrink-0">Examples: {exampleCount}</span>
          <input
            type="range"
            min={0}
            max={3}
            step={1}
            value={exampleCount}
            onChange={(e) => setExampleCount(Number(e.target.value))}
            className="flex-1"
          />
        </div>

        <div className="space-y-2">
          <AnimatePresence>
            {examples.slice(0, exampleCount).map((example, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 text-sm"
              >
                <span className="font-mono text-gray-600 flex-1">"{example.input}"</span>
                <span className="text-gray-400">→</span>
                <span className="font-mono text-blue-600 flex-1">"{example.output}"</span>
              </motion.div>
            ))}
          </AnimatePresence>

          {exampleCount > 0 && (
            <div className="border-t border-gray-300 my-3 pt-3">
              <div className="text-xs text-gray-500 mb-2">Now categorize:</div>
            </div>
          )}

          <div className="flex items-center gap-3 text-sm">
            <span className="font-mono text-gray-900 flex-1">"{testCase.input}"</span>
            <span className="text-gray-400">→</span>
            <motion.span
              key={exampleCount}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`font-mono flex-1 px-2 py-1 rounded ${
                exampleCount === 3
                  ? 'bg-green-100 text-green-700'
                  : exampleCount === 0
                    ? 'bg-gray-100 text-gray-500'
                    : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              "{predictions[exampleCount]}"
            </motion.span>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500">
        {exampleCount === 0 && '← With zero examples, the model makes a generic guess.'}
        {exampleCount === 1 && '← With one example, it sees "urgent" but guesses the department.'}
        {exampleCount === 2 && '← Getting closer, but still not quite right.'}
        {exampleCount === 3 && '← Three examples lock in the pattern. Perfect.'}
      </div>
    </div>
  )
}


function ExampleTypes() {
  const types = [
    {
      title: 'Format Examples',
      description: 'Show the exact structure you want',
      example: '"Make a table like this: [paste formatted table]"',
      useCase: 'Multiplication tables, code templates, JSON schemas'
    },
    {
      title: 'Style Examples',
      description: 'Show the tone, voice, or aesthetic',
      example: '"Write like this: [paste example with the vibe you want]"',
      useCase: 'Poetry, professional emails, casual summaries'
    },
    {
      title: 'Classification Examples',
      description: 'Show how to categorize inputs',
      example: '"Happy → 😊, Sad → 😢, Angry → 😠"',
      useCase: 'Email triage, sentiment analysis, tagging'
    },
    {
      title: 'Transformation Examples',
      description: 'Show input → output mappings',
      example: '"Formal: ... → Casual: ..."',
      useCase: 'Translation, tone conversion, data reformatting'
    }
  ]

  return (
    <div className="my-8 space-y-3 not-prose">
      {types.map((type, i) => (
        <div key={i} className="bg-gray-50 p-5 rounded-xl border border-gray-200">
          <div className="flex items-start gap-3 mb-2">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              {i + 1}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">{type.title}</h4>
              <p className="text-sm text-gray-600 mb-2">{type.description}</p>
              <div className="font-mono text-xs text-blue-600 bg-white px-3 py-2 rounded border border-gray-200 mb-2">
                {type.example}
              </div>
              <div className="text-xs text-gray-500">
                <strong>Use for:</strong> {type.useCase}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}


function RealExampleCard({ title, prompt, why }: { title: string; prompt: string; why: string }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className="bg-white border-2 border-gray-200 rounded-xl p-5 cursor-pointer hover:border-blue-300 transition-colors"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
          <div className="text-xs text-gray-700 font-mono bg-gray-50 p-3 rounded border border-gray-200 whitespace-pre-wrap">
            {prompt}
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
                <strong className="text-gray-900">Why this works:</strong> {why}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
