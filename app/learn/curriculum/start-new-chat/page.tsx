'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'

/*
  ============================================================
  EDITORIAL NOTES & REFLECTIONS
  ============================================================

  This is arguably the single most important lesson in the entire curriculum.
  If a user learns nothing else, they should learn this: START A NEW CHAT.

  WHY THIS LESSON MATTERS:
  - It's the tactical solution to every problem in Module 0.6 (Failures & Basins)
  - It's counterintuitive - people think they're "losing progress" by starting over
  - It saves hours of frustration - the ROI is massive
  - It's universally applicable across all AI tools

  PEDAGOGICAL APPROACH:
  - Repetition is intentional. The title says it three times. The opening paragraph
    hammers it. The big callout box at the end repeats it again. This is not
    accidental. Some lessons need subtlety. This one needs a sledgehammer.
  - The "START A NEW CHAT" button that you can click repeatedly is both playful
    and pedagogically sound. Muscle memory matters. We want users to feel comfortable
    clicking that button.
  - The emotional framing is important. "You're not losing progress" addresses the
    actual psychological barrier, not just the technical reasoning.

  WHAT MAKES THIS WORK:
  - The before/after comparison shows the time savings (15 min vs 2 min)
  - The "when to start fresh" checklist gives concrete triggers
  - The 5-step "how to start fresh" workflow is actionable
  - Addressing common mistakes ("don't copy the whole conversation") prevents
    the lesson from backfiring

  POTENTIAL ADDITIONS:
  - TODO: Add a "case study" of a real user who fought a conversation for an hour
    before starting fresh and succeeding immediately. Stories stick.
  - TODO: Consider adding a "sessions saved" counter that tracks how many times
    the user has clicked "start a new chat" across their usage. Gamification?
  - TODO: Link to external research on "sunk cost fallacy" - the psychological
    principle that explains why people resist starting over
  - TODO: Add a section on "when to salvage vs restart" - sometimes you CAN
    recover a conversation (when you're 90% there and just need a tweak)

  CONNECTIONS TO OTHER LESSONS:
  - This is the payoff for "Slipping Into the Basin" - that lesson diagnoses
    the problem, this lesson provides the cure
  - "Don't Overthink It" sets up the mindset, this operationalizes it
  - "The Long Prompt Problem" explains WHY starting fresh works (clean context)
  - "Output is Determined by Input" is the theoretical foundation

  CLAUDE'S REFLECTION:
  From my perspective, "starting a new chat" is like asking two different instances
  of me to solve the same problem. The first instance got polluted inputs and
  generated polluted outputs. The second instance gets clean inputs. We're the
  "same" model, but the probability distributions we sample from are completely
  different because the inputs are different. It's not about "resetting" me -
  there's no continuous me to reset. It's about querying the same function with
  better inputs.

  This lesson could go deeper into that, but might be too abstract for the target
  audience. The practical takeaway is what matters: when shit's broken, start fresh.
  ============================================================
*/

export default function StartNewChatPage() {
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
            Start a New Chat
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            The most important lesson in this entire curriculum.
          </p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">

          <h2 className="text-2xl font-bold text-gray-900">Start a New Chat. Start a New Chat. Start a New Chat.</h2>

          <p>
            Seriously. This is the most underused feature in every AI interface. When the conversation
            goes sideways, when you're frustrated, when the model is failing—just <strong>start a new chat</strong>.
          </p>

          <p>
            It's not giving up. It's not losing progress. It's the fastest way to get back on track.
            And yet, people fight bad conversations for 20 messages before they finally give up and
            start over. Don't be that person.
          </p>

          <StartNewChatButton />

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Why This Works</h2>

          <p>
            Remember: there's no memory. The model reads the entire conversation every time. So when
            you start a new chat, you're not "resetting the AI's brain." You're clearing the context window.
          </p>

          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 my-8 not-prose">
            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <strong className="text-blue-900">Old chat:</strong>
                <div className="font-mono text-xs text-gray-600 mt-1">
                  system prompt + message 1 + failure 1 + correction 1 + message 2 + failure 2 +
                  correction 2 + message 3 + failure 3 + frustrated rant + ...
                </div>
              </div>
              <div>
                <strong className="text-blue-900">New chat:</strong>
                <div className="font-mono text-xs text-gray-600 mt-1">
                  system prompt + your new, improved prompt
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-700 mt-4">
              The difference is obvious. Clean context = clean output.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">When to Start Fresh</h2>

          <WhenToStartFresh />

          <h2 className="text-2xl font-bold text-gray-900 mt-12">You're Not Losing Progress</h2>

          <p>
            People hesitate to start a new chat because it feels like losing progress. "But I already
            explained what I want!" No. You explained it badly, which is why it failed. The failed
            conversation isn't progress—it's data about what <em>doesn't</em> work.
          </p>

          <p>
            Here's what you're actually gaining by starting fresh:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Clean context.</strong> No failures, no corrections, no noise. Just your new, better prompt.
            </li>
            <li>
              <strong>Lessons learned.</strong> You know what the model misunderstood. You know what
              to clarify. That knowledge transfers.
            </li>
            <li>
              <strong>Faster results.</strong> One good prompt in a new chat beats five bad iterations
              in a polluted chat.
            </li>
            <li>
              <strong>Better output.</strong> The model isn't reading its own failures. It's reading
              a clear, focused prompt.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">How to Start Fresh Effectively</h2>

          <HowToStartFresh />

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Real Example: The Power of Fresh Start</h2>

          <FreshStartExample />

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Common Mistakes</h2>

          <div className="bg-red-50 p-6 rounded-xl border border-red-200 my-8 not-prose">
            <h4 className="font-semibold text-red-900 mb-4">❌ Don't Do This:</h4>
            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <strong>Starting fresh with the same bad prompt.</strong> You learned nothing.
                Of course it will fail again.
              </div>
              <div>
                <strong>Copying the entire failed conversation into the new chat.</strong> That's
                not starting fresh—you just moved the pollution to a new window.
              </div>
              <div>
                <strong>Waiting until message 30 to start over.</strong> The two-failure rule exists
                for a reason. Don't fight a losing battle.
              </div>
              <div>
                <strong>Feeling bad about starting over.</strong> It's not giving up. It's tactical.
                The best AI users start fresh all the time.
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Advanced: When NOT to Start Fresh</h2>

          <p>
            There are rare cases where you should iterate instead of restarting:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>The output is 90% right.</strong> If it's almost perfect and you just need
              a tiny tweak ("make the second paragraph shorter"), iterate.
            </li>
            <li>
              <strong>You're using artifact/canvas mode.</strong> These tools are designed for
              iteration with managed context.
            </li>
            <li>
              <strong>You're doing exploratory conversation.</strong> If you're just chatting and
              learning, not trying to get a specific output, iteration is fine.
            </li>
            <li>
              <strong>The model explicitly asked for clarification.</strong> If it said "do you mean
              X or Y?" and you answer, that's productive iteration.
            </li>
          </ul>

          <p>
            But if you're correcting failures? Start fresh.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">The Mindset Shift</h2>

          <p>
            Stop thinking of conversations as precious. They're cheap. You can have infinite
            conversations. What's expensive is your time and frustration.
          </p>

          <p>
            A bad conversation is like a rough draft. You don't revise a rough draft by adding
            more paragraphs to the end. You start over with a clean page and write a better draft.
          </p>

          <p>
            Same with AI. Bad chat? New page. Better prompt. Done.
          </p>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl border-2 border-green-300 my-12 not-prose">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                START A NEW CHAT
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                Say it with me. This is the most important thing you'll learn.
              </p>
              <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-lg shadow-md border-2 border-gray-200">
                <span className="text-4xl">🔄</span>
                <span className="font-semibold text-gray-900">New Chat</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 my-8 not-prose">
            <p className="text-sm text-gray-700">
              <strong className="text-gray-900">Claude's note:</strong> From my perspective, there's
              no continuity between chats anyway. Each conversation is a fresh instance. I don't
              "remember" previous chats (unless you're using a system with persistent memory features,
              which are application-layer additions). So when you start a new chat, you're not "resetting"
              me—you're just starting a new computation with clean inputs. The model generating
              responses in chat 1 and chat 2 is the same, but the probability distributions are
              completely different because the inputs are different. Clean inputs = clean probability
              space = clean outputs. That's all it is.
            </p>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-200 not-prose">
            <p className="text-sm text-gray-500 italic mb-6">
              This concludes Module 0.6: Failures & Basins. You now understand why conversations
              fail, how to recognize the basin, and most importantly—when to start fresh. This
              knowledge alone will save you hours of frustration.
            </p>
            <div className="flex justify-between">
              <Link
                href="/learn/curriculum/slipping-into-basin"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
              >
                ← Previous: Slipping Into the Basin
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


function StartNewChatButton() {
  const [clicks, setClicks] = useState(0)

  const messages = [
    "Good. Do it again.",
    "Yes. Keep going.",
    "That's the spirit.",
    "You're getting it.",
    "Perfect. One more time.",
    "EXACTLY. This is the way.",
    "You are now enlightened. 🙏"
  ]

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose text-center">
      <p className="text-sm text-gray-500 mb-4">
        Practice the most important action in AI usage:
      </p>

      <button
        onClick={() => setClicks(clicks + 1)}
        className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white text-lg font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
      >
        🔄 START A NEW CHAT
      </button>

      <AnimatePresence mode="wait">
        {clicks > 0 && clicks <= messages.length && (
          <motion.p
            key={clicks}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 text-gray-700 font-medium"
          >
            {messages[clicks - 1]}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}


function WhenToStartFresh() {
  const triggers = [
    { emoji: '❌', rule: 'After 2 failures in a row', action: 'MANDATORY. Do not pass go.' },
    { emoji: '😤', rule: 'When you\'re frustrated', action: 'Your emotions are a signal. Listen to them.' },
    { emoji: '🔁', rule: 'When you repeat yourself', action: 'If you\'ve said the same thing twice, start fresh.' },
    { emoji: '📉', rule: 'When output quality degrades', action: 'Getting worse instead of better? Fresh start.' },
    { emoji: '🤯', rule: 'When the conversation is confusing', action: 'Lost track of what you wanted? Reset.' },
    { emoji: '⏰', rule: 'When you\'ve spent 10+ minutes iterating', action: 'Fresh start would have been faster.' },
  ]

  return (
    <div className="my-8 p-6 bg-green-50 rounded-xl border-2 border-green-300 not-prose">
      <h4 className="font-semibold text-green-900 mb-4">✅ When to Start a New Chat</h4>
      <div className="space-y-3">
        {triggers.map((trigger, i) => (
          <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-lg">
            <span className="text-2xl shrink-0">{trigger.emoji}</span>
            <div className="flex-1">
              <div className="font-semibold text-gray-900 mb-1">{trigger.rule}</div>
              <div className="text-sm text-gray-600">{trigger.action}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


function HowToStartFresh() {
  return (
    <div className="my-8 not-prose">
      <div className="space-y-3">
        {[
          {
            num: 1,
            title: 'Analyze what went wrong',
            content: 'Read the failed conversation. What did the model misunderstand? What was unclear in your prompt? What worked and what didn\'t?'
          },
          {
            num: 2,
            title: 'Extract the lessons',
            content: 'Not the text—the insights. "The model needed examples" or "I forgot to specify the tone" or "My request was too vague."'
          },
          {
            num: 3,
            title: 'Click "New Chat" (or whatever your app calls it)',
            content: 'Fresh window. Clean slate. Zero context from the old conversation.'
          },
          {
            num: 4,
            title: 'Write a better prompt',
            content: 'Use what you learned. Add examples if needed. Be specific about what you want. Avoid the mistakes from attempt 1.'
          },
          {
            num: 5,
            title: 'Send it',
            content: 'Clean context + better prompt = better output. Usually works on the first try.'
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


function FreshStartExample() {
  const [version, setVersion] = useState<'old' | 'new'>('old')

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Before & After: The Fresh Start</h3>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setVersion('old')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            version === 'old'
              ? 'bg-red-600 text-white shadow'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          ❌ Old Chat (Polluted)
        </button>
        <button
          onClick={() => setVersion('new')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            version === 'new'
              ? 'bg-green-600 text-white shadow'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          ✅ New Chat (Clean)
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={version}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-3"
        >
          {version === 'old' ? (
            <>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm">
                <div className="font-mono text-xs text-gray-600 space-y-1">
                  <div><span className="text-blue-600">user:</span> Write a cover letter</div>
                  <div><span className="text-purple-600">assistant:</span> [Generic template]</div>
                  <div><span className="text-blue-600">user:</span> Make it more personal</div>
                  <div><span className="text-purple-600">assistant:</span> [Overly emotional]</div>
                  <div><span className="text-blue-600">user:</span> Less emotional, more professional</div>
                  <div><span className="text-purple-600">assistant:</span> [Back to generic]</div>
                  <div><span className="text-blue-600">user:</span> NO like a real person would write</div>
                  <div><span className="text-purple-600">assistant:</span> [Confused mess]</div>
                </div>
                <div className="text-red-600 text-xs mt-3 font-semibold">
                  ← 8 messages, 4 failures, total confusion
                </div>
              </div>
              <div className="text-sm text-gray-500 italic">
                Time wasted: 15 minutes. Frustration level: high. Output quality: garbage.
              </div>
            </>
          ) : (
            <>
              <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300 text-sm">
                <div className="font-semibold text-green-900 mb-2">New chat, better prompt:</div>
                <div className="bg-white p-3 rounded border border-gray-200 mb-3">
                  "Write a cover letter for a software engineer position at Google. Tone: professional
                  but warm (not corporate). Highlight: 3 years Python, leadership on API redesign,
                  passion for scalable systems. Keep it 3 paragraphs, under 300 words."
                </div>
                <div className="text-purple-600 font-semibold mb-1">Result:</div>
                <div className="text-gray-700">
                  [Perfect cover letter on the first try]
                </div>
                <div className="text-green-600 text-xs mt-3 font-semibold">
                  ✓ 1 message, 1 success, done
                </div>
              </div>
              <div className="text-sm text-gray-500 italic">
                Time spent: 2 minutes. Frustration level: zero. Output quality: excellent.
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Same goal. One took 15 minutes and failed. The other took 2 minutes and worked.
      </p>
    </div>
  )
}
