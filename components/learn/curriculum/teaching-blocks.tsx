import type { ReactNode } from 'react'

type TeachingBlockProps = {
  children: ReactNode
  className?: string
  title?: string
}

export function DemoFrame({ children, className = '', title }: TeachingBlockProps) {
  return (
    <div className={`my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm not-prose ${className}`}>
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
      {children}
    </div>
  )
}

export function ConceptCard({ children, className = '', title }: TeachingBlockProps) {
  return (
    <div className={`bg-gray-50 p-6 rounded-xl border border-gray-200 my-8 not-prose ${className}`}>
      {title && <h3 className="font-semibold text-gray-900 mb-3">{title}</h3>}
      {children}
    </div>
  )
}

export function ExampleCard({ children, className = '', title }: TeachingBlockProps) {
  return (
    <div className={`bg-white p-5 rounded-lg border border-gray-200 shadow-sm not-prose ${className}`}>
      {title && <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>}
      {children}
    </div>
  )
}

type ComparisonGridProps = {
  children: ReactNode
  columns?: 2 | 3
  className?: string
}

export function ComparisonGrid({ children, columns = 2, className = '' }: ComparisonGridProps) {
  const columnClass = columns === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'

  return (
    <div className={`grid grid-cols-1 ${columnClass} gap-6 ${className}`}>
      {children}
    </div>
  )
}

type WorkflowStepsProps = {
  steps: string[]
}

export function WorkflowSteps({ steps }: WorkflowStepsProps) {
  return (
    <ol className="space-y-3 not-prose">
      {steps.map((step, index) => (
        <li key={step} className="flex gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
            {index + 1}
          </span>
          <span className="pt-0.5 text-gray-700">{step}</span>
        </li>
      ))}
    </ol>
  )
}

export function Callout({ children, className = '', title }: TeachingBlockProps) {
  return (
    <aside className={`my-8 rounded-xl border border-amber-200 bg-amber-50 p-5 not-prose ${className}`}>
      {title && <h3 className="font-semibold text-amber-950 mb-2">{title}</h3>}
      <div className="text-sm text-amber-900">{children}</div>
    </aside>
  )
}

export function LessonRecap({ children, className = '', title = 'Recap' }: TeachingBlockProps) {
  return (
    <section className={`mt-12 rounded-xl border border-gray-200 bg-gray-50 p-6 not-prose ${className}`}>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">{title}</h3>
      <div className="text-gray-700">{children}</div>
    </section>
  )
}

