import Link from 'next/link'
import { CheckCircle, Circle, Lock } from 'lucide-react'

export const metadata = {
  title: 'Curriculum | Megaminds Learn',
  description: 'Structured learning path for understanding AI.',
}

const modules = [
  {
    id: 0,
    title: 'What the Hell is Going On?',
    description: 'The basics you actually need to know',
    lessons: [
      { title: 'LLMs Understand Language via Machine Learning', slug: 'llms-machine-learning', status: 'coming' },
      { title: 'Pretrained on the Whole Internet', slug: 'pretraining-basics', status: 'coming' },
      { title: 'Fine-Tuned to Be a Helpful Assistant', slug: 'finetuning-basics', status: 'coming' },
      { title: 'There Is No Memory (Just One Long Prompt)', slug: 'no-memory', status: 'coming' },
    ]
  },
  {
    id: 0.5,
    title: 'Prompting',
    description: 'How to actually talk to these things',
    lessons: [
      { title: 'Roleplay', slug: 'roleplay', status: 'coming', bullets: [
        'you are an expert turbotax accountant who focuses on getting every dime',
        'you are a software engineer with 30 years of experience who hates inefficient code',
        'in the style of Picasso..',
      ]},
      { title: 'Examples', slug: 'examples', status: 'coming', bullets: [
        'make me a multiplication table like in school i want it to look like this:',
        'my poetry sucks can you make it more like this [attached file]',
      ]},
      { title: 'Prompt a Prompt', slug: 'prompt-a-prompt', status: 'coming', bullets: [
        '1) here is my goal what information did i forget I need?',
        '2) with this information who are the people i need to ask?',
        '3) give me a prompt to ask this person this information',
        '4) "you are a ... provide answers to ..."',
      ]},
      { title: "Don't Overthink It", slug: 'dont-overthink', status: 'coming', bullets: [
        'just do the easiest laziest thing',
        "it'll probably work",
        "at the very least u can read the llms thoughts and improve your prompt from noticing how it doesn't read your mind",
        'you can always edit your prompt and gaslight the llm into thinking you never said it',
      ]},
      { title: 'Multimodeling', slug: 'multimodeling', status: 'coming', bullets: [
        "take a model's response that you don't understand, make a new chat, get a better understanding, formulate a better prompt",
      ]},
    ]
  },
  {
    id: 0.6,
    title: 'Failures & Basins',
    description: 'Why your chat goes off the rails and what to do about it',
    lessons: [
      { title: 'Output is Determined by Input', slug: 'output-determined-by-input', status: 'coming', bullets: [
        'llm is a machine learning algorithm - its output is determined by the input',
      ]},
      { title: 'The Long Prompt Problem', slug: 'long-prompt-problem', status: 'coming', bullets: [
        'the input is your prompt, but remember there is no such thing as memory its all one long prompt',
        'every time you get a bad response and you say no i dont like that do it like this, you are adding to the actual payload the llm is receiving',
        'TODO add diagram of a long series of failures and a llm reading through all of those to try and figure out what you fuckin want',
        'exceptions to this is gemini flash image mode, designed to iterate',
      ]},
      { title: 'Slipping Into the Basin', slug: 'slipping-into-basin', status: 'coming', bullets: [
        'its trained on the whole internet remember? so its fine tuned to think like a PhD, but every time it gets something wrong and you get mad, it slips towards the basin of',
      ]},
      { title: 'Start a New Chat', slug: 'start-new-chat', status: 'coming', bullets: [
        'start a new chat start a new chat start a new chat start a new chat',
      ]},
    ]
  },
  {
    id: 0.7,
    title: 'Tools',
    description: 'Built-in capabilities beyond chat',
    lessons: [
      { title: 'Web Search', slug: 'web-search', status: 'coming' },
      { title: 'Canvas Mode', slug: 'canvas-mode', status: 'coming', bullets: [
        'are you making a spreadsheet? tell gemini to make a google sheet',
        'oftentimes the best document is not a document its a webpage',
        'its version controlled',
        'it rapes your context',
      ]},
      { title: 'Imagen', slug: 'imagen', status: 'coming' },
      { title: 'Deep Search', slug: 'deep-search', status: 'coming' },
    ]
  },
  {
    id: 0.8,
    title: 'Different Models',
    description: 'Knowing which model to use when',
    lessons: [
      { title: 'Multimodeling v2', slug: 'multimodeling-v2', status: 'coming', bullets: [
        "use copilot to explain opus's answer because you don't care as much if you get rate limited on copilot",
      ]},
      { title: 'Gemini', slug: 'gemini', status: 'coming' },
      { title: 'ChatGPT', slug: 'chatgpt', status: 'coming' },
      { title: 'Claude', slug: 'claude', status: 'coming' },
      { title: 'Kimi K2.5', slug: 'kimi-k25', status: 'coming' },
      { title: 'Grok 4.1', slug: 'grok-41', status: 'coming' },
    ]
  },
  {
    id: 0.9,
    title: 'Web vs API vs Local',
    description: 'Different ways to access AI',
    lessons: [
      { title: 'Closed vs Open Source Models', slug: 'closed-vs-open', status: 'coming' },
      { title: 'I/O Costs', slug: 'io-costs', status: 'coming' },
      { title: 'Chiyna Namba 1', slug: 'china-models', status: 'coming' },
      { title: 'Computer Use Hallelujah', slug: 'computer-use', status: 'coming', bullets: [
        'organize your desktop',
        'rename your photos',
        'make storage space',
        'draft and ship your emails',
        'personalized software',
      ]},
    ]
  },
  {
    id: 1,
    title: 'Foundations',
    description: 'How language models actually work',
    lessons: [
      { title: 'What is a Language Model?', slug: 'what-is-llm', status: 'available' },
      { title: 'Pretraining: Learning from the Internet', slug: 'pretraining', status: 'available' },
      { title: 'Posttraining: Becoming an Assistant', slug: 'posttraining', status: 'available' },
      { title: 'RLHF and Alignment', slug: 'rlhf', status: 'available' },
    ]
  },
  {
    id: 2,
    title: 'The Latent Space',
    description: 'Understanding how AI represents meaning',
    lessons: [
      { title: 'Tokens and Embeddings', slug: 'tokens-embeddings', status: 'available' },
      { title: 'Vector Relationships', slug: 'vector-relationships', status: 'available' },
      { title: 'Latent Space Cartography', slug: 'latent-space', status: 'available' },
      { title: 'The Waluigi Effect', slug: 'waluigi', status: 'available' },
    ]
  },
  {
    id: 3,
    title: 'Model Landscape',
    description: 'Knowing which model to use when',
    lessons: [
      { title: 'The Frontier Models (2026)', slug: 'frontier-models', status: 'available' },
      { title: 'Model Personalities', slug: 'model-personalities', status: 'available' },
      { title: 'Strengths and Weaknesses', slug: 'strengths-weaknesses', status: 'available' },
      { title: 'Cost vs Quality Tradeoffs', slug: 'cost-quality', status: 'coming' },
    ]
  },
  {
    id: 4,
    title: 'Applied AI',
    description: 'Using AI effectively in practice',
    lessons: [
      { title: 'Prompt Engineering Basics', slug: 'prompt-basics', status: 'coming' },
      { title: 'Advanced Prompting Techniques', slug: 'advanced-prompts', status: 'coming' },
      { title: 'Tool Use and Agents', slug: 'tool-use', status: 'coming' },
      { title: 'Building AI Workflows', slug: 'workflows', status: 'coming' },
    ]
  },
]

export default function CurriculumPage() {
  return (
    <div className="py-16 px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900">AI Curriculum</h1>
        <p className="mt-4 text-gray-600">
          A structured path from fundamentals to applied practice. No prerequisites—
          just curiosity about how these systems actually work.
        </p>

        <div className="mt-12 space-y-12">
          {modules.map((module) => (
            <div key={module.id}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-medium text-gray-400">Module {module.id}</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">{module.title}</h2>
              <p className="text-gray-600 mt-1">{module.description}</p>

              <div className="mt-4 space-y-2">
                {module.lessons.map((lesson) => (
                  <LessonRow key={lesson.slug} lesson={lesson} moduleId={module.id} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function LessonRow({ lesson, moduleId }: { lesson: typeof modules[0]['lessons'][0], moduleId: number }) {
  const isAvailable = lesson.status === 'available'
  const bullets = 'bullets' in lesson ? (lesson as any).bullets as string[] : undefined

  if (!isAvailable) {
    return (
      <div className="p-3 text-gray-400">
        <div className="flex items-center gap-3">
          <Lock className="w-4 h-4 flex-shrink-0" />
          <span>{lesson.title}</span>
          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded ml-auto">Coming soon</span>
        </div>
        {bullets && (
          <ul className="mt-2 ml-7 space-y-1 text-sm text-gray-400">
            {bullets.map((bullet, i) => (
              <li key={i} className="list-disc list-inside">{bullet}</li>
            ))}
          </ul>
        )}
      </div>
    )
  }

  return (
    <Link
      href={`/learn/curriculum/${lesson.slug}`}
      className="block p-3 rounded-lg hover:bg-gray-50 transition-colors group"
    >
      <div className="flex items-center gap-3">
        <Circle className="w-4 h-4 text-gray-300 group-hover:text-gray-400 flex-shrink-0" />
        <span className="text-gray-900 group-hover:text-gray-600">{lesson.title}</span>
      </div>
      {bullets && (
        <ul className="mt-2 ml-7 space-y-1 text-sm text-gray-500">
          {bullets.map((bullet, i) => (
            <li key={i} className="list-disc list-inside">{bullet}</li>
          ))}
        </ul>
      )}
    </Link>
  )
}
