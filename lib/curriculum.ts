export type LessonStatus = 'available' | 'coming'

export type CurriculumLesson = {
  title: string
  listingTitle?: string
  slug: string
  status: LessonStatus
  description?: string
  bullets?: string[]
}

export type CurriculumModule = {
  id: number
  title: string
  description: string
  lessons: CurriculumLesson[]
}

export const curriculumModules = [
  {
    id: 0,
    title: 'What the Hell is Going On?',
    description: 'The basics you actually need to know',
    lessons: [
      {
        title: 'LLMs Understand Language via Machine Learning',
        slug: 'llms-machine-learning',
        status: 'available',
        description: "You don't need to understand the math. You just need the mental model.",
      },
      {
        title: 'Pretrained on the Whole Internet',
        slug: 'pretraining-basics',
        status: 'available',
        description: 'Where the knowledge comes from, and what "knowing" means for a machine.',
      },
      {
        title: 'Fine-Tuned to Be a Helpful Assistant',
        slug: 'finetuning-basics',
        status: 'available',
        description: "How a text predictor learns to act like the thing you're talking to right now.",
      },
      {
        title: 'There Is No Memory',
        slug: 'no-memory',
        status: 'available',
        description: "It's just one long prompt. Every single time.",
      },
    ],
  },
  {
    id: 0.5,
    title: 'Prompting',
    description: 'How to actually talk to these things',
    lessons: [
      {
        title: 'Your Prompt is the Entire Input',
        slug: 'prompt-is-everything',
        status: 'available',
        description: "Now that you know there's no memory, let's talk about what that means for how you use these things.",
        bullets: [
          'there is no memory, so your prompt is everything the model sees',
          'every message in the chat is sent every time',
          'this is why prompting well matters so much',
        ],
      },
      {
        title: 'Roleplay: Give It a Hat to Wear',
        listingTitle: 'Roleplay',
        slug: 'roleplay',
        status: 'available',
        description: 'The same question, asked by different personas, gets completely different answers.',
        bullets: [
          'you are an expert turbotax accountant who focuses on getting every dime',
          'you are a software engineer with 30 years of experience who hates inefficient code',
          'in the style of Picasso..',
        ],
      },
      {
        title: "Examples: Show, Don't Tell",
        listingTitle: 'Examples',
        slug: 'examples',
        status: 'available',
        description: "Don't just tell it what to do. Show it how to do it.",
        bullets: [
          'make me a multiplication table like in school i want it to look like this:',
          'my poetry sucks can you make it more like this [attached file]',
        ],
      },
      {
        title: 'Prompt-a-Prompt: Let It Write Its Own Instructions',
        listingTitle: 'Prompt a Prompt',
        slug: 'prompt-a-prompt',
        status: 'available',
        description: 'The AI knows what information it needs better than you do.',
        bullets: [
          '1) here is my goal what information did i forget I need?',
          '2) with this information who are the people i need to ask?',
          '3) give me a prompt to ask this person this information',
          '4) "you are a ... provide answers to ..."',
        ],
      },
      {
        title: "Don't Overthink It",
        slug: 'dont-overthink',
        status: 'available',
        description: "Just do the easiest, laziest thing. It'll probably work.",
        bullets: [
          'just do the easiest laziest thing',
          "it'll probably work",
          "at the very least u can read the llms thoughts and improve your prompt from noticing how it doesn't read your mind",
          'you can always edit your prompt and gaslight the llm into thinking you never said it',
        ],
      },
      {
        title: 'Multimodeling: Use Multiple Chats to Clarify',
        listingTitle: 'Multimodeling',
        slug: 'multimodeling',
        status: 'available',
        description: 'When one model confuses you, ask another to explain.',
        bullets: [
          "take a model's response that you don't understand, make a new chat, get a better understanding, formulate a better prompt",
        ],
      },
    ],
  },
  {
    id: 0.6,
    title: 'Failures & Basins',
    description: 'Why your chat goes off the rails and what to do about it',
    lessons: [
      {
        title: 'Output is Determined by Input',
        slug: 'output-determined-by-input',
        status: 'available',
        description: "The model isn't having a bad day. Your prompt is bad.",
        bullets: [
          'llm is a machine learning algorithm - its output is determined by the input',
        ],
      },
      {
        title: 'The Long Prompt Problem',
        slug: 'long-prompt-problem',
        status: 'available',
        description: 'Every time you say "no, do it like this," you are adding that failure to the input.',
        bullets: [
          'the input is your prompt, but remember there is no such thing as memory its all one long prompt',
          'every time you get a bad response and you say no i dont like that do it like this, you are adding to the actual payload the llm is receiving',
          'diagram idea: show a long series of failures and a model reading through those failures to infer what you want',
          'exceptions to this is gemini flash image mode, designed to iterate',
        ],
      },
      {
        title: 'Slipping Into the Basin',
        slug: 'slipping-into-basin',
        status: 'available',
        description: 'Once the model fails twice, the third attempt is already doomed.',
        bullets: [
          'its trained on the whole internet remember? so its fine tuned to think like a PhD, but every time it gets something wrong and you get mad, it slips towards the basin of',
        ],
      },
      {
        title: 'Start a New Chat',
        slug: 'start-new-chat',
        status: 'available',
        description: 'The most important lesson in this entire curriculum.',
        bullets: [
          'start a new chat start a new chat start a new chat start a new chat',
        ],
      },
    ],
  },
  {
    id: 0.7,
    title: 'Tools',
    description: 'Built-in capabilities beyond chat',
    lessons: [
      {
        title: 'Web Search: Facts vs. Concepts',
        listingTitle: 'Web Search',
        slug: 'web-search',
        status: 'available',
        description: 'Know when the model needs to look things up.',
      },
      {
        title: 'Canvas Mode: Documents, Not Chat',
        listingTitle: 'Canvas Mode',
        slug: 'canvas-mode',
        status: 'available',
        description: "Sometimes the best document isn't a document, it's a webpage.",
        bullets: [
          'are you making a spreadsheet? tell gemini to make a google sheet',
          'oftentimes the best document is not a document its a webpage',
          'its version controlled',
          'it consumes your context',
        ],
      },
      { title: 'Imagen', slug: 'imagen', status: 'coming' },
      { title: 'Deep Search', slug: 'deep-search', status: 'coming' },
    ],
  },
  {
    id: 0.8,
    title: 'Different Models',
    description: 'Knowing which model to use when',
    lessons: [
      {
        title: 'Multimodeling v2',
        slug: 'multimodeling-v2',
        status: 'coming',
        bullets: [
          "use copilot to explain opus's answer because you don't care as much if you get rate limited on copilot",
        ],
      },
      { title: 'Gemini', slug: 'gemini', status: 'coming' },
      { title: 'ChatGPT', slug: 'chatgpt', status: 'coming' },
      { title: 'Claude', slug: 'claude', status: 'coming' },
      { title: 'Kimi K2.5', slug: 'kimi-k25', status: 'coming' },
      { title: 'Grok 4.1', slug: 'grok-41', status: 'coming' },
    ],
  },
  {
    id: 0.9,
    title: 'Web vs API vs Local',
    description: 'Different ways to access AI',
    lessons: [
      { title: 'Closed vs Open Source Models', slug: 'closed-vs-open', status: 'coming' },
      { title: 'I/O Costs', slug: 'io-costs', status: 'coming' },
      { title: 'Chiyna Namba 1', slug: 'china-models', status: 'coming' },
      {
        title: 'Computer Use Hallelujah',
        slug: 'computer-use',
        status: 'coming',
        bullets: [
          'organize your desktop',
          'rename your photos',
          'make storage space',
          'draft and ship your emails',
          'personalized software',
        ],
      },
    ],
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
    ],
  },
  {
    id: 2,
    title: 'The Latent Space',
    description: 'Understanding how AI represents meaning',
    lessons: [
      { title: 'Tokens and Embeddings', slug: 'tokens-embeddings', status: 'available' },
      { title: 'Vector Relationships', slug: 'vector-relationships', status: 'available' },
      {
        title: 'How LLMs Actually Work',
        listingTitle: 'How Information Flows Through Transformers',
        slug: 'how-llms-work',
        status: 'available',
        description: 'Most transformer explainers get lost in the math. This visualizes how information flows through the network end to end.',
      },
      { title: 'Latent Space Cartography', slug: 'latent-space', status: 'available' },
      { title: 'The Waluigi Effect', slug: 'waluigi', status: 'available' },
    ],
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
    ],
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
    ],
  },
] satisfies CurriculumModule[]

// WARNING: This set acts as a second source of truth alongside `status: 'available'`
// in the module definitions. If a new module 0.x lesson is added as available,
// it MUST be added to this set. Otherwise, `getCurriculumLessonNeighbors` will throw
// at runtime.
// TODO: Consider replacing this set with a computed filter (e.g., a `published: true`
// flag on the lesson type) or adding a check to `check-curriculum-pages.js`.
const publishedCurriculumLessonSlugs = new Set([
  'llms-machine-learning',
  'pretraining-basics',
  'finetuning-basics',
  'no-memory',
  'prompt-is-everything',
  'roleplay',
  'examples',
  'prompt-a-prompt',
  'dont-overthink',
  'multimodeling',
  'output-determined-by-input',
  'long-prompt-problem',
  'slipping-into-basin',
  'start-new-chat',
  'web-search',
  'canvas-mode',
])

export type CurriculumLessonWithModule = CurriculumLesson & {
  module: CurriculumModule
  moduleLabel: string
}

export function getCurriculumLesson(slug: string): CurriculumLessonWithModule {
  for (const curriculumModule of curriculumModules) {
    const lesson = curriculumModule.lessons.find((candidate) => candidate.slug === slug)

    if (lesson) {
      return {
        ...lesson,
        module: curriculumModule,
        moduleLabel: `Module ${curriculumModule.id}`,
      }
    }
  }

  throw new Error(`Unknown curriculum lesson: ${slug}`)
}

export function getAvailableCurriculumLessons() {
  return curriculumModules.flatMap((curriculumModule) =>
    curriculumModule.lessons
      .filter((lesson) => lesson.status === 'available')
      .map((lesson) => ({
        ...lesson,
        module: curriculumModule,
        moduleLabel: `Module ${curriculumModule.id}`,
      })),
  )
}

export function getCurriculumLessonNeighbors(slug: string) {
  const availableLessons = getAvailableCurriculumLessons().filter((lesson) =>
    publishedCurriculumLessonSlugs.has(lesson.slug),
  )
  const index = availableLessons.findIndex((lesson) => lesson.slug === slug)

  if (index === -1) {
    throw new Error(`Unknown available curriculum lesson: ${slug}`)
  }

  return {
    previous: availableLessons[index - 1],
    next: availableLessons[index + 1],
  }
}
