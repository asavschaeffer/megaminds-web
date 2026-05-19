'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
export function PersonaSwitcher() {
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


export function RoleplayPatterns() {
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


export function ExampleCard({ title, prompt, why }: { title: string; prompt: string; why: string }) {
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
