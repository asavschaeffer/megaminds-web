import Link from 'next/link'
import { Circle, Lock } from 'lucide-react'
import { curriculumModules, type CurriculumLesson } from '@/lib/curriculum'

export const metadata = {
  title: 'Curriculum | Megaminds Learn',
  description: 'Structured learning path for understanding AI.',
}

export default function CurriculumPage() {
  return (
    <div className="py-16 px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900">AI Curriculum</h1>
        <p className="mt-4 text-gray-600">
          A structured path from fundamentals to applied practice. Go from "what is AI?" to using it confidently.
        </p>

        <div className="mt-12 space-y-12">
          {curriculumModules.map((module) => (
            <div key={module.id}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-medium text-gray-400">Module {module.id}</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">{module.title}</h2>
              <p className="text-gray-600 mt-1">{module.description}</p>

              <div className="mt-4 space-y-2">
                {module.lessons.map((lesson) => (
                  <LessonRow key={lesson.slug} lesson={lesson} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function LessonRow({ lesson }: { lesson: CurriculumLesson }) {
  const isAvailable = lesson.status === 'available'
  const title = lesson.listingTitle ?? lesson.title

  if (!isAvailable) {
    return (
      <div className="p-3 text-gray-400">
        <div className="flex items-center gap-3">
          <Lock className="w-4 h-4 flex-shrink-0" />
          <span>{title}</span>
          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded ml-auto">Coming soon</span>
        </div>
        {lesson.bullets && (
          <ul className="mt-2 ml-7 space-y-1 text-sm text-gray-400">
            {lesson.bullets.map((bullet) => (
              <li key={bullet} className="list-disc list-inside">{bullet}</li>
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
        <span className="text-gray-900 group-hover:text-gray-600">{title}</span>
        {lesson.navigation === 'supplemental' && (
          <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded ml-auto">Optional</span>
        )}
      </div>
      {lesson.bullets && (
        <ul className="mt-2 ml-7 space-y-1 text-sm text-gray-500">
          {lesson.bullets.map((bullet) => (
            <li key={bullet} className="list-disc list-inside">{bullet}</li>
          ))}
        </ul>
      )}
    </Link>
  )
}

