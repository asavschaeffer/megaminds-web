import Link from 'next/link'
import { CheckCircle, Circle, Lock } from 'lucide-react'

export const metadata = {
  title: 'Curriculum | MegaMinds Learn',
  description: 'Structured learning path for understanding AI.',
}

const modules = [
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

  if (!isAvailable) {
    return (
      <div className="flex items-center gap-3 p-3 text-gray-400">
        <Lock className="w-4 h-4" />
        <span>{lesson.title}</span>
        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded ml-auto">Coming soon</span>
      </div>
    )
  }

  return (
    <Link
      href={`/learn/curriculum/${lesson.slug}`}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
    >
      <Circle className="w-4 h-4 text-gray-300 group-hover:text-gray-400" />
      <span className="text-gray-900 group-hover:text-gray-600">{lesson.title}</span>
    </Link>
  )
}
