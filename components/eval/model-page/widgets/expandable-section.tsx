import type { ExpandableSectionProps } from '@/lib/models/types'

export const ExpandableSection = ({ title, preview, children, defaultExpanded = false }: ExpandableSectionProps) => {
  return (
    <details open={defaultExpanded} className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden my-6 group">
      <summary className="cursor-pointer px-6 py-4 flex items-start justify-between gap-4 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors list-none [&::-webkit-details-marker]:hidden">
        <div className="text-left flex-1">
          <span className="block font-semibold mb-1 text-neutral-900 dark:text-neutral-100">{title}</span>
          <span className="block text-sm text-neutral-600 dark:text-neutral-400">{preview}</span>
        </div>
        <span className="transform transition-transform duration-200 group-open:rotate-180" aria-hidden="true">
          <svg className="w-5 h-5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </summary>
      <div className="px-6 py-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
        <div className="prose dark:prose-invert prose-neutral max-w-none prose-sm">{children}</div>
      </div>
    </details>
  )
}

export default ExpandableSection
