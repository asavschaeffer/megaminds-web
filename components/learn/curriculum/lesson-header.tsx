import Link from 'next/link'

type LessonHeaderProps = {
  moduleLabel: string
  moduleTitle: string
  title: string
  description: string
}

export function LessonHeader({ moduleLabel, moduleTitle, title, description }: LessonHeaderProps) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <Link href="/learn/curriculum" className="hover:text-gray-700">
          {moduleLabel}
        </Link>
        <span aria-hidden="true">&middot;</span>
        <span>{moduleTitle}</span>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-6">{title}</h1>
      <p className="text-xl text-gray-600 leading-relaxed">{description}</p>
    </div>
  )
}

