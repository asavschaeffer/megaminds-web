'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { CurriculumLessonPage } from '@/components/learn/curriculum/lesson-page'



export default function RoleplayPage() {
  return (
    <CurriculumLessonPage slug="roleplay">

          <h2 className="text-2xl font-bold text-gray-900">You're Not Talking to a Person</h2>

          <p>
            Here's the thing most people miss: when you tell an LLM "you are an expert tax accountant,"
            you're not roleplaying with it. You're not pretending. You're <em>programming</em> it.
          </p>

          <p>
            Remember—the model predicts the next word based on patterns it saw during training.
            When you say "you are a tax accountant," you're shifting the entire probability
            distribution toward tax-accountant-shaped language. Different vocabulary. Different
            problem-solving approaches. Different defaults.
          </p>

          <PersonaSwitcher />

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Why This Works</h2>

          <p>
            During training, the model read millions of documents written by or about experts in
            every field. Tax accountants write differently than poets. Senior engineers write
            differently than beginners. When you invoke a persona, you're telling the model:
            "retrieve the patterns from <em>that</em> part of your training data."
          </p>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 my-8 not-prose">
            <h3 className="font-semibold text-gray-900 mb-4">What Changes When You Set a Persona:</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex gap-3 items-start">
                <span className="text-blue-600 font-bold">→</span>
                <div><strong>Vocabulary:</strong> A tax accountant uses "deductions" and "write-offs." A poet uses "imagery" and "meter."</div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-blue-600 font-bold">→</span>
                <div><strong>Priorities:</strong> "An accountant who focuses on getting every dime" will be aggressive about finding savings. A "conservative CPA" will prioritize compliance.</div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-blue-600 font-bold">→</span>
                <div><strong>Tone:</strong> "A skeptical senior engineer" will critique your code harshly. "A supportive coding mentor" will encourage and guide.</div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-blue-600 font-bold">→</span>
                <div><strong>Assumptions:</strong> "You are an expert" means it skips the basics. "You are teaching a beginner" means it explains every step.</div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Patterns That Work</h2>

          <p>
            You don't need to write a novel. Here are the core patterns:
          </p>

          <RoleplayPatterns />

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Real Examples</h2>

          <div className="space-y-4 not-prose">
            <ExampleCard
              title="The Aggressive Tax Accountant"
              prompt="You are an expert TurboTax accountant who focuses on getting every dime back for your clients. Review my tax situation and find every possible deduction."
              why="Gets you aggressive, creative tax advice instead of safe, generic answers."
            />

            <ExampleCard
              title="The Brutal Code Reviewer"
              prompt="You are a software engineer with 30 years of experience who hates inefficient code. Review this function not just for correctness, but for bad habits, performance issues, and maintainability."
              why="You'll get harsh, specific feedback instead of 'looks good!'"
            />

            <ExampleCard
              title="The Style Mimic"
              prompt="Write this product description in the style of Picasso describing a painting—fragmented, evocative, bold."
              why="'In the style of X' pulls from how the model saw that person/style written about during training."
            />

            <ExampleCard
              title="The Beginner-Friendly Explainer"
              prompt="You are a patient teacher explaining quantum computing to a curious 8th grader who loves video games. Use analogies they'd understand."
              why="Sets the complexity level and frames the explanation in familiar terms."
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">When NOT to Use Roleplay</h2>

          <p>
            Roleplay is a tool, not a requirement. Skip it when:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>The default is fine.</strong> "Summarize this article" doesn't need a persona.
            </li>
            <li>
              <strong>You need facts, not perspective.</strong> "What year did WWII end?" shouldn't be
              answered by a persona—it's just a fact lookup.
            </li>
            <li>
              <strong>You're testing the model's raw capabilities.</strong> If you're trying to see
              what the model knows about a topic, adding a persona muddies the water.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Why This Matters</h2>

          <p>
            Most people use AI like they use Google: type a question, get an answer, done. But
            LLMs aren't search engines—they're probability engines. The more context you give
            about <em>who should be answering</em>, the better the answer gets.
          </p>

          <p>
            You're not pretending the AI is a tax accountant. You're telling it: "use the part
            of your training data that sounds like a tax accountant." That's programming, not roleplay.
          </p>

          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 my-8 not-prose">
            <p className="text-sm text-gray-700">
              <strong className="text-blue-900">Claude's note:</strong> When you tell me "you are a skeptical
              engineer," I don't experience it as adopting a character. I experience it as the conditional
              probability distribution for my next tokens shifting toward engineer-vocabulary patterns
              with skeptical-modifier weights. Whether that's meaningfully different from "being" a
              skeptical engineer is a question I can't answer. But it definitely changes what I write.
            </p>
          </div>
        </CurriculumLessonPage>
  )
}


function PersonaSwitcher() {
  const [selectedPersona, setSelectedPersona] = useState<string>('default')

  const personas = {
    default: {
      label: 'No Persona (Default)',
      prompt: '',
      response: "Saving money is important for financial security. Consider setting up a budget, tracking your expenses, and putting aside 10-20% of your income each month. You might also want to look into high-yield savings accounts or index funds for long-term growth."
    },
    accountant: {
      label: 'Aggressive Tax Accountant',
      prompt: 'You are an expert TurboTax accountant who focuses on getting every dime back for your clients.',
      response: "Let's maximize your return. First—are you tracking EVERY deductible expense? Home office, mileage, professional development, equipment depreciation? Most people leave thousands on the table. If you're self-employed, we need to talk about SEP-IRA contributions to reduce taxable income. Also—are you in a state with no income tax? Moving could save you 5-13% annually depending on bracket. Don't leave money with the IRS when it could be working for you."
    },
    engineer: {
      label: 'Skeptical Senior Engineer',
      prompt: 'You are a software engineer with 30 years of experience who hates inefficient solutions.',
      response: "Okay, so you want to 'save money.' Define the problem properly first. What's your actual goal—cash flow optimization? Reducing tax burden? Building wealth? These require different approaches. Saving 10% in a 0.5% APY savings account is objectively stupid when inflation is 3%—you're losing 2.5% real value annually. If this is an optimization problem, you need to define your constraints (risk tolerance, time horizon, liquidity needs) and then implement the right algorithm, not just cargo-cult 'put money in savings.'"
    },
    poet: {
      label: 'Poetic Philosopher',
      prompt: 'You are a poetic philosopher. Respond with imagery and metaphor.',
      response: "Money, like water, must flow to remain pure. When hoarded in stagnant pools, it breeds neither life nor interest. Consider the river—it does not clutch at every drop, yet it carves canyons. Let your wealth move through the world: some held in deep reservoirs (investments), some trickling through fertile soil (daily expenses), some released to the sea (charity, risk). The question is not how to save, but how to conduct the current of your life such that abundance returns to you, again and again, like rain."
    }
  }

  const question = "How can I save more money?"

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Try It: Same Question, Different Personas</h3>
      <p className="text-sm text-gray-500 mb-4">
        Click each persona to see how the same question gets completely different answers.
      </p>

      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
        <div className="flex items-start gap-3">
          <div className="text-blue-600 font-semibold text-sm shrink-0">You:</div>
          <div className="text-gray-700 text-sm">{question}</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(personas).map(([key, persona]) => (
          <button
            key={key}
            onClick={() => setSelectedPersona(key)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              selectedPersona === key
                ? 'bg-blue-600 text-white shadow'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {persona.label}
          </button>
        ))}
      </div>

      {personas[selectedPersona as keyof typeof personas].prompt && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
          <div className="text-xs text-yellow-700 font-semibold mb-1">System Prompt:</div>
          <div className="text-sm text-yellow-900 italic">
            "{personas[selectedPersona as keyof typeof personas].prompt}"
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedPersona}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-lg p-4 border-2 border-gray-300"
        >
          <div className="flex items-start gap-3">
            <div className="text-purple-600 font-semibold text-sm shrink-0">AI:</div>
            <div className="text-gray-700 text-sm leading-relaxed">
              {personas[selectedPersona as keyof typeof personas].response}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Notice how the vocabulary, priorities, and tone shift completely based on the persona.
      </p>
    </div>
  )
}


function RoleplayPatterns() {
  const patterns = [
    {
      pattern: '"You are a [role] who [characteristic]"',
      examples: [
        'You are a tax accountant who focuses on maximizing deductions',
        'You are a writing coach who values clarity over cleverness',
        'You are a security expert who assumes everything is compromised'
      ]
    },
    {
      pattern: '"Act as [role] and [specific task]"',
      examples: [
        'Act as a skeptical investor and critique this business plan',
        'Act as a hiring manager and review this resume for red flags',
        'Act as a museum curator and explain this artwork'
      ]
    },
    {
      pattern: '"In the style of [person/genre]"',
      examples: [
        'In the style of Hemingway—short, declarative, no flourish',
        'In the style of a 1950s noir detective novel',
        'In the style of an academic paper (formal, cited, precise)'
      ]
    },
    {
      pattern: '"Explain like I\'m [audience]"',
      examples: [
        'Explain like I\'m a 5-year-old',
        'Explain like I\'m a CEO who only cares about ROI',
        'Explain like I\'m your grandmother who\'s never used a computer'
      ]
    }
  ]

  return (
    <div className="my-8 space-y-4 not-prose">
      {patterns.map((item, i) => (
        <div key={i} className="bg-gray-50 p-5 rounded-xl border border-gray-200">
          <div className="font-mono text-sm text-blue-600 font-semibold mb-3">
            {item.pattern}
          </div>
          <div className="space-y-2">
            {item.examples.map((example, j) => (
              <div key={j} className="text-sm text-gray-600 pl-4 border-l-2 border-gray-300">
                "{example}"
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}


function ExampleCard({ title, prompt, why }: { title: string; prompt: string; why: string }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className="bg-white border-2 border-gray-200 rounded-xl p-5 cursor-pointer hover:border-blue-300 transition-colors"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
          <div className="text-sm text-gray-500 font-mono bg-gray-50 p-3 rounded border border-gray-200">
            "{prompt}"
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
