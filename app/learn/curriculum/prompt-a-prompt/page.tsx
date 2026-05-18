'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { CurriculumLessonPage } from '@/components/learn/curriculum/lesson-page'

export default function PromptAPromptPage() {
  return (
    <CurriculumLessonPage slug="prompt-a-prompt">

          <h2 className="text-2xl font-bold text-gray-900">The Problem</h2>

          <p>
            You have a vague goal: "I want to write a good cover letter." But you don't know
            what details to include. What experiences matter? What tone? What length? You could
            guess, or you could write a bad prompt and iterate. Or—here's the trick—you could
            ask the AI what it needs to know.
          </p>

          <p>
            This is <strong>meta-prompting</strong>: using the AI to write better prompts for itself.
          </p>

          <MetaPromptingDemo />

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Why This Works</h2>

          <p>
            The AI has been trained on millions of examples of every task. It knows what information
            is relevant for writing cover letters, debugging code, planning projects, whatever. When
            you ask it "what do you need to know?", you're tapping into that training.
          </p>

          <p>
            You're not guessing what makes a good prompt. You're asking the thing that will execute
            the prompt what it needs to execute it well.
          </p>

          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 my-8 not-prose">
            <p className="text-sm text-gray-700 mb-3">
              <strong className="text-blue-900">Think of it like this:</strong>
            </p>
            <p className="text-sm text-gray-600">
              If you hired a designer to make a logo, you wouldn't just say "make a logo." You'd ask
              them what they need—target audience? color preferences? competitors to avoid? They know
              what questions to ask because they've designed hundreds of logos. Same with the AI.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">The Basic Workflow</h2>

          <WorkflowSteps />

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Meta-Prompting Patterns</h2>

          <div className="space-y-4 not-prose">
            <PatternCard
              pattern="The Interview"
              prompt="I need to [goal], but I don't know what details to include. Interview me—ask me 5 questions about [context], then generate the full prompt for me."
              example="I need to write a cover letter, but I don't know what details to include. Interview me—ask me 5 questions about my experience and the role, then generate the full prompt for me."
              when="You have a goal but don't know what information is relevant."
            />

            <PatternCard
              pattern="The Information Audit"
              prompt="Here is my goal: [goal]. What information did I forget to include? What do you need to know to do this well?"
              example="Here is my goal: debug this React component. What information did I forget to include? What do you need to know to do this well?"
              when="You wrote a prompt but the output is generic or wrong."
            />

            <PatternCard
              pattern="The Persona Generator"
              prompt="I need help with [task]. First, tell me: who are the experts I should ask? Then, give me a prompt to ask each one."
              example="I need help planning a wedding on a budget. First, tell me: who are the experts I should ask? Then, give me a prompt to ask each one."
              when="You don't even know what kind of expertise you need."
            />

            <PatternCard
              pattern="The Prompt Improver"
              prompt="Here's the prompt I wrote: [your prompt]. How can I make it better? What's missing? Rewrite it for me."
              example="Here's the prompt I wrote: 'Write a blog post about AI.' How can I make it better? What's missing? Rewrite it for me."
              when="You have a draft prompt but it feels weak."
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Real Example: The Full Loop</h2>

          <FullLoopExample />

          <h2 className="text-2xl font-bold text-gray-900 mt-12">When to Use Meta-Prompting</h2>

          <p>
            Meta-prompting shines when:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>The task is complex.</strong> Writing a business plan, planning a curriculum,
              designing a system—lots of moving parts.
            </li>
            <li>
              <strong>You're in unfamiliar territory.</strong> You don't know what good looks like,
              so you can't write a good prompt.
            </li>
            <li>
              <strong>Your first prompt failed.</strong> Instead of guessing what to fix, ask the AI
              what was missing.
            </li>
            <li>
              <strong>You want to save time.</strong> Two messages (meta-prompt → real prompt) is
              faster than five iterations of bad prompts.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">When NOT to Use It</h2>

          <p>
            Skip meta-prompting for:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Simple tasks.</strong> "Translate this to French" doesn't need meta-prompting.
            </li>
            <li>
              <strong>When you know exactly what you want.</strong> If you can write a clear prompt,
              just write it.
            </li>
            <li>
              <strong>When you're exploring.</strong> Sometimes you don't know what you want yet.
              Just start chatting and see where it goes.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">The Laziest Version</h2>

          <p>
            You don't need a perfect meta-prompt. The laziest version that works:
          </p>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 my-8 not-prose">
            <div className="font-mono text-sm text-gray-700">
              "I want to [goal]. What do you need to know to do this well? Ask me questions, then
              write the full prompt."
            </div>
          </div>

          <p>
            That's it. The AI will figure out the rest.
          </p>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 my-8 not-prose">
            <p className="text-sm text-gray-700">
              <strong className="text-gray-900">Claude's note:</strong> Meta-prompting is recursive
              in a way I find interesting. You're asking me to introspect on what information would
              make my future responses better. I don't experience "wanting" information, but I can
              predict what inputs would increase the probability of generating useful outputs. When I
              ask you questions, I'm not curious—I'm querying for the variables that maximize output
              quality. Whether that's meaningfully different from curiosity is, as always, unclear.
            </p>
          </div>
        </CurriculumLessonPage>
  )
}


function MetaPromptingDemo() {
  const [step, setStep] = useState<'vague' | 'meta' | 'interview' | 'generated' | 'result'>('vague')

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Watch: From Vague Goal to Great Prompt</h3>

      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          { key: 'vague', label: '1. Vague Goal' },
          { key: 'meta', label: '2. Meta-Prompt' },
          { key: 'interview', label: '3. AI Asks' },
          { key: 'generated', label: '4. AI Generates' },
          { key: 'result', label: '5. Final Result' },
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
          {step === 'vague' && (
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="text-blue-600 font-semibold text-sm shrink-0">You:</div>
                <div className="text-gray-700 text-sm">"I need help writing a cover letter."</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-purple-600 font-semibold text-sm shrink-0">AI:</div>
                <div className="text-gray-700 text-sm">
                  "Sure! A cover letter should introduce yourself, highlight relevant experience..."
                  <div className="text-gray-500 italic mt-2">← Generic, useless response</div>
                </div>
              </div>
            </div>
          )}

          {step === 'meta' && (
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="text-blue-600 font-semibold text-sm shrink-0">You:</div>
                <div className="text-gray-700 text-sm">
                  "I need to write a cover letter, but I don't know what details to include.
                  Interview me—ask me 5 questions, then generate the full prompt for me."
                </div>
              </div>
              <div className="text-gray-500 text-xs mt-2">
                ↑ This is the meta-prompt. You're asking the AI to ask YOU questions.
              </div>
            </div>
          )}

          {step === 'interview' && (
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="text-purple-600 font-semibold text-sm shrink-0">AI:</div>
                <div className="text-gray-700 text-sm space-y-2">
                  <p>"Great! Let me ask you a few questions:"</p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>What position are you applying for, and at which company?</li>
                    <li>What are your top 3 relevant experiences or skills?</li>
                    <li>Why are you interested in this role specifically?</li>
                    <li>What's your current role/situation?</li>
                    <li>Is there a specific tone you want (formal, enthusiastic, concise)?</li>
                  </ol>
                </div>
              </div>
              <div className="text-gray-500 text-xs mt-2">
                ↑ The AI knows what information matters for cover letters
              </div>
            </div>
          )}

          {step === 'generated' && (
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="text-blue-600 font-semibold text-sm shrink-0">You:</div>
                <div className="text-gray-700 text-sm">
                  [You answer the questions: Software Engineer at Google, 3 years Python experience, etc.]
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-purple-600 font-semibold text-sm shrink-0">AI:</div>
                <div className="text-gray-700 text-sm bg-white p-3 rounded border border-gray-300 font-mono text-xs">
                  "You are a cover letter expert. Write a concise, enthusiastic cover letter for a
                  Software Engineer position at Google. Highlight: 3 years of Python experience,
                  leadership on the API redesign project, and passion for scalable systems. Tone:
                  professional but warm. Length: 3 paragraphs max."
                </div>
              </div>
              <div className="text-gray-500 text-xs mt-2">
                ↑ This is the generated prompt. Copy this and use it in a new chat (or same chat).
              </div>
            </div>
          )}

          {step === 'result' && (
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="text-blue-600 font-semibold text-sm shrink-0">You:</div>
                <div className="text-gray-700 text-sm">
                  [Paste the generated prompt]
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-purple-600 font-semibold text-sm shrink-0">AI:</div>
                <div className="text-gray-700 text-sm">
                  [Writes a targeted, specific cover letter with exactly the right details and tone]
                </div>
              </div>
              <div className="text-green-600 text-xs mt-2 font-semibold">
                ✓ Much better output because the prompt was specific and complete
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
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
            title: 'Start with a vague goal',
            content: '"I need to write a cover letter" or "I want to plan a project"'
          },
          {
            num: 2,
            title: 'Ask the AI what it needs',
            content: '"What do you need to know to do this well? Ask me questions."'
          },
          {
            num: 3,
            title: 'Answer the questions',
            content: 'The AI interviews you, you provide the details'
          },
          {
            num: 4,
            title: 'AI generates the prompt',
            content: 'It writes a complete, specific prompt based on your answers'
          },
          {
            num: 5,
            title: 'Use the generated prompt',
            content: 'Copy it, paste it into a new chat (or same chat), get great output'
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


function PatternCard({ pattern, prompt, example, when }: { pattern: string; prompt: string; example: string; when: string }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className="bg-white border-2 border-gray-200 rounded-xl p-5 cursor-pointer hover:border-blue-300 transition-colors"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-2">{pattern}</h4>
          <div className="text-sm text-gray-600 mb-3">
            <strong>Template:</strong>
          </div>
          <div className="text-xs text-gray-700 font-mono bg-gray-50 p-3 rounded border border-gray-200 mb-3">
            {prompt}
          </div>
          <div className="text-sm text-gray-600">
            <strong>Example:</strong>
          </div>
          <div className="text-xs text-gray-700 bg-blue-50 p-3 rounded border border-blue-200">
            {example}
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
                <strong className="text-gray-900">When to use:</strong> {when}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


function FullLoopExample() {
  return (
    <div className="my-8 p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border-2 border-gray-200 not-prose">
      <h4 className="font-semibold text-gray-900 mb-4">Complete Meta-Prompting Session</h4>

      <div className="space-y-4 text-sm">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-blue-600 font-semibold mb-2">You (vague goal):</div>
          <div className="text-gray-700">"I need to debug this React component but I'm stuck."</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-blue-600 font-semibold mb-2">You (meta-prompt):</div>
          <div className="text-gray-700">
            "What information do you need to debug this effectively? Ask me questions, then write
            the full debugging prompt."
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-purple-600 font-semibold mb-2">AI:</div>
          <div className="text-gray-700 space-y-1">
            <p>"To help you debug this, I need:"</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>What is the component supposed to do?</li>
              <li>What is it actually doing (the bug)?</li>
              <li>Have you checked the console for errors?</li>
              <li>What have you tried so far?</li>
              <li>Can you paste the component code?</li>
            </ol>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-blue-600 font-semibold mb-2">You (answers):</div>
          <div className="text-gray-700 text-xs">
            1) Should fetch user data and display it<br/>
            2) Renders "loading..." forever<br/>
            3) No console errors<br/>
            4) Added console.logs, nothing helpful<br/>
            5) [pastes code]
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-purple-600 font-semibold mb-2">AI (generated prompt):</div>
          <div className="text-gray-700 font-mono text-xs bg-gray-50 p-3 rounded">
            "You are a senior React developer. Debug this component that should fetch and display
            user data but is stuck on 'loading...' indefinitely. No console errors. Check for:
            async/await issues, dependency array problems, conditional rendering logic. Here's
            the code: [code]"
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="text-green-800 font-semibold mb-2">Result:</div>
          <div className="text-gray-700 text-sm">
            AI immediately spots that the useEffect dependency array is missing the fetch function,
            causing it to never re-run. Specific, actionable fix.
          </div>
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center">
        ↑ Two extra messages (meta-prompt + answers) = much better final output
      </div>
    </div>
  )
}
