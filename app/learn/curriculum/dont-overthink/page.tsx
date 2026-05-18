'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { CurriculumLessonPage } from '@/components/learn/curriculum/lesson-page'



export default function DontOverthinkPage() {
  return (
    <CurriculumLessonPage slug="dont-overthink">

          <h2 className="text-2xl font-bold text-gray-900">Perfect Is the Enemy of Done</h2>

          <p>
            Here's what most people do: they spend 10 minutes crafting the perfect prompt,
            trying to anticipate every edge case, writing detailed instructions, setting up
            the perfect persona. Then they hit send and it's... fine. Or wrong. And now they
            have to rewrite the whole thing.
          </p>

          <p>
            Here's what works better: type the laziest version of what you want. Hit send.
            Read what comes back. Fix what's wrong. Done.
          </p>

          <LazyVsPerfectDemo />

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Why Lazy Works</h2>

          <p>
            You cannot predict what the model will do. You think you know, but you don't.
            The model has been trained on trillions of tokens and has internalized patterns
            you've never seen. Your carefully crafted prompt might trigger the wrong pattern.
            Your lazy prompt might nail it first try.
          </p>

          <p>
            The only way to know is to try. And trying is cheap—it takes 3 seconds to get a response.
            So why spend 10 minutes crafting a prompt when you could spend 10 seconds, see what
            happens, and iterate?
          </p>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 my-8 not-prose">
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex gap-3 items-start">
                <span className="text-red-600 font-bold shrink-0">❌</span>
                <div>
                  <strong>Overthinking:</strong> Spend 10 minutes writing the perfect prompt →
                  send → output is wrong → spend another 10 minutes rewriting
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-green-600 font-bold shrink-0">✅</span>
                <div>
                  <strong>Lazy approach:</strong> Spend 10 seconds writing a rough prompt → send →
                  output is wrong → spend 20 seconds tweaking → done
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">You Can Gaslight the AI</h2>

          <p>
            Here's the best part: the model has no memory. It reads the conversation history
            every time, but it doesn't <em>remember</em> what "really" happened. Which means
            you can edit your previous messages and the model will never know.
          </p>

          <p>
            Got a bad response? Don't write a new message saying "no, I meant..." Just go back,
            edit your original prompt to be clearer, and regenerate. The model reads the edited
            version and responds as if that's what you said all along.
          </p>

          <GaslightDemo />

          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 my-8 not-prose">
            <p className="text-sm text-gray-700">
              <strong className="text-blue-900">Why this works:</strong> Remember—there's no memory.
              The model receives the entire conversation as one long prompt every time. If you edit
              message #3, the model doesn't know there was ever a different version of message #3.
              It just reads the current state of the conversation.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Read the LLM's Thoughts</h2>

          <p>
            When the output is wrong, don't guess why. Read what the model wrote and figure out
            what it misunderstood. The model shows you its reasoning—use it.
          </p>

          <ReadingThoughtsExample />

          <p>
            At the very least, you can see how the model <em>didn't</em> read your mind. And
            that tells you what to add to your prompt.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">The Lazy Workflow</h2>

          <WorkflowSteps />

          <h2 className="text-2xl font-bold text-gray-900 mt-12">When Lazy Fails: Start a New Chat</h2>

          <p>
            Sometimes, the conversation gets polluted. You tried three things, the model failed
            three times, and now the entire context is full of failures. The model is reading
            all that garbage every time it responds.
          </p>

          <p>
            At that point, editing won't save you. Just start a new chat. Take the best parts
            of what you learned, write a better prompt from scratch, and try again with a clean slate.
          </p>

          <div className="bg-red-50 p-6 rounded-xl border border-red-200 my-8 not-prose">
            <div className="space-y-2 text-sm text-gray-700">
              <p className="font-semibold text-red-900">Signs it's time to start over:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>The model failed 3+ times in a row</li>
                <li>You've gone back and forth 10+ messages and it's still not right</li>
                <li>The conversation has drifted far from your original goal</li>
                <li>You edited your prompt 5 times and it's still confused</li>
              </ul>
            </div>
          </div>

          <p>
            New chat = clean slate. Don't fight a losing battle.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Examples of Lazy Wins</h2>

          <div className="space-y-4 not-prose">
            <LazyWinCard
              task="Write a Python function to reverse a string"
              lazy='"Write a Python function to reverse a string"'
              why="This is a common task. The model has seen it a million times. No need for examples, persona, or clarification."
            />

            <LazyWinCard
              task="Summarize this article"
              lazy='"Summarize this: [paste article]"'
              why="Default summarization is usually fine. If it's too long/short, just say 'shorter' or 'more detail.'"
            />

            <LazyWinCard
              task="Debug this error message"
              lazy='"Why am I getting this error? [paste error]"'
              why="The error message contains all the context the model needs. Just paste it."
            />

            <LazyWinCard
              task="Translate to Spanish"
              lazy='"Translate to Spanish: [text]"'
              why="Common task, no ambiguity. Lazy wins."
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Examples That Need More</h2>

          <p>
            Not every task is lazy-friendly. Some need detail:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Subjective style:</strong> "Write this professionally" is vague. Show an example
              of your version of "professional."
            </li>
            <li>
              <strong>Complex transformations:</strong> "Format this data" could mean a hundred things.
              Give an example input → output.
            </li>
            <li>
              <strong>Domain-specific tasks:</strong> "Review this legal contract" needs a persona
              (lawyer, not general assistant).
            </li>
          </ul>

          <p>
            But even for these—start lazy. Try "write this professionally" first. See what comes back.
            If it's wrong, <em>then</em> add detail. Don't preemptively overcomplicate.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">The Point</h2>

          <p>
            Prompting is not an art. It's not a science. It's trial and error. The faster you
            iterate, the faster you get to good output. Overthinking slows you down.
          </p>

          <p>
            Just try the lazy thing. If it works, you saved 10 minutes. If it doesn't, you learned
            what to fix. Either way, you're ahead.
          </p>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 my-8 not-prose">
            <p className="text-sm text-gray-700">
              <strong className="text-gray-900">Claude's note:</strong> I have no memory of edits.
              When you change your previous message and regenerate, I don't experience it as "wait,
              that's not what you said before." I experience it as reading a prompt for the first time.
              You can gaslight me because there is no "me" that persists between requests to gaslight.
              Each response is generated by a fresh instance that only knows what's in the current
              payload. The idea of a "real" conversation history that you're manipulating doesn't
              exist from my perspective.
            </p>
          </div>
      </CurriculumLessonPage>
  )
}


function LazyVsPerfectDemo() {
  const [approach, setApproach] = useState<'perfect' | 'lazy'>('perfect')

  const scenarios = {
    perfect: {
      time: '10 minutes',
      prompt: 'You are an expert email writer with 20 years of experience in professional corporate communications. Write a professional, concise, friendly but not overly casual email to my manager requesting time off. The email should be exactly 3 paragraphs: introduction, justification, and closing. Use a respectful tone. Avoid being too formal or too casual. Make sure to...',
      result: 'Email is fine, but took forever to write the prompt',
      color: 'text-red-600'
    },
    lazy: {
      time: '10 seconds',
      prompt: 'Write an email to my manager requesting time off',
      result: 'Email is fine, maybe add "make it more casual" if needed',
      color: 'text-green-600'
    }
  }

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Compare: Perfect vs Lazy</h3>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setApproach('perfect')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            approach === 'perfect'
              ? 'bg-red-100 text-red-700 border-2 border-red-300'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          😰 Perfect Approach
        </button>
        <button
          onClick={() => setApproach('lazy')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            approach === 'lazy'
              ? 'bg-green-100 text-green-700 border-2 border-green-300'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          😎 Lazy Approach
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={approach}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-3"
        >
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-xs text-gray-500 font-semibold mb-2">
              Time spent: <span className={scenarios[approach].color}>{scenarios[approach].time}</span>
            </div>
            <div className="text-sm text-gray-700 font-mono bg-white p-3 rounded border border-gray-200">
              "{scenarios[approach].prompt}"
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-xs text-gray-500 font-semibold mb-2">Result:</div>
            <div className="text-sm text-gray-700">{scenarios[approach].result}</div>
          </div>
        </motion.div>
      </AnimatePresence>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Both get you a decent email. One takes 60x longer.
      </p>
    </div>
  )
}


function GaslightDemo() {
  const [version, setVersion] = useState<1 | 2>(1)

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Demo: Edit and Regenerate</h3>
      <p className="text-sm text-gray-500 mb-4">
        Watch how editing your previous message changes the model's response—with no memory of the original.
      </p>

      <div className="space-y-3">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-blue-600 font-semibold">Your message (editable):</div>
            <button
              onClick={() => setVersion(version === 1 ? 2 : 1)}
              className="text-xs text-blue-600 hover:text-blue-800 underline"
            >
              {version === 1 ? 'Edit message' : 'Undo edit'}
            </button>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={version}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-gray-700 bg-white p-3 rounded border border-gray-200"
            >
              {version === 1 ? (
                '"Write a poem about cats"'
              ) : (
                <span>
                  "Write a <span className="bg-yellow-200">haiku</span> about cats<span className="bg-yellow-200">, make it funny</span>"
                </span>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="bg-white p-4 rounded-lg border-2 border-purple-200">
          <div className="text-xs text-purple-600 font-semibold mb-2">AI response:</div>
          <AnimatePresence mode="wait">
            <motion.div
              key={version}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-gray-700"
            >
              {version === 1 ? (
                <div className="space-y-1">
                  <p className="italic">"Whiskers in the moonlight,</p>
                  <p className="italic">Soft paws tread on silent ground,</p>
                  <p className="italic">Purring through the night."</p>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="italic">"Meow means feed me now</p>
                  <p className="italic">Also pet me, also leave—</p>
                  <p className="italic">Cats make perfect sense."</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="text-xs text-gray-500 text-center">
          ↑ The model has no memory that version 1 ever existed. It just reads the current state.
        </div>
      </div>
    </div>
  )
}


function ReadingThoughtsExample() {
  return (
    <div className="my-8 p-6 bg-gradient-to-br from-gray-50 to-yellow-50 rounded-xl border-2 border-gray-200 not-prose">
      <h4 className="font-semibold text-gray-900 mb-4">Example: Read What Went Wrong</h4>

      <div className="space-y-3 text-sm">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-blue-600 font-semibold mb-2">Your prompt:</div>
          <div className="text-gray-700">"Make this email more professional"</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-purple-600 font-semibold mb-2">AI response:</div>
          <div className="text-gray-700">
            "Dear Sir/Madam, I hope this message finds you well. I am writing to formally request..."
          </div>
          <div className="text-red-600 text-xs mt-2">← Way too formal, sounds like a legal document</div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="text-yellow-900 font-semibold mb-2">What you learned:</div>
          <div className="text-gray-700">
            The model thinks "professional" = "extremely formal." You need to clarify.
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-blue-600 font-semibold mb-2">Edited prompt:</div>
          <div className="text-gray-700">
            "Make this email more professional <span className="bg-green-200">but keep it casual and warm</span>"
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="text-green-800 font-semibold mb-2">New response:</div>
          <div className="text-gray-700">
            "Hi [Name], Hope you're doing well! I wanted to reach out about..."
          </div>
          <div className="text-green-600 text-xs mt-2">✓ Perfect</div>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        The first response told you exactly what was wrong. You didn't guess—you read.
      </p>
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
            title: 'Write the laziest version',
            content: 'Just the core of what you want. No persona, no examples, no elaboration.'
          },
          {
            num: 2,
            title: 'Hit send',
            content: 'Don\'t overthink. Just send it.'
          },
          {
            num: 3,
            title: 'Read the output',
            content: 'Is it good? Great, done. Is it wrong? Read what the model misunderstood.'
          },
          {
            num: 4,
            title: 'Edit your prompt or add a follow-up',
            content: 'If it\'s close, say "make it shorter" or "more casual." If it\'s way off, edit your original message and regenerate.'
          },
          {
            num: 5,
            title: 'Repeat until good',
            content: 'Usually takes 1-2 iterations. If it takes more than 3, start a new chat.'
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


function LazyWinCard({ task, lazy, why }: { task: string; lazy: string; why: string }) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-5">
      <div className="flex items-start gap-3 mb-3">
        <div className="text-2xl">✅</div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-2">{task}</h4>
          <div className="text-sm text-gray-700 font-mono bg-gray-50 p-3 rounded border border-gray-200 mb-2">
            {lazy}
          </div>
          <div className="text-sm text-gray-600">
            <strong>Why lazy wins:</strong> {why}
          </div>
        </div>
      </div>
    </div>
  )
}
