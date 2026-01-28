import { Cpu, Zap } from 'lucide-react'
import type { ContentSectionProps } from '@/lib/models/types'

const SPEC_ICONS: Record<string, typeof Cpu> = {
  cpu: Cpu,
  zap: Zap,
}

export const ContentSection = ({ title, subtitle, children, id, specs = [] }: ContentSectionProps) => {
  return (
    <section
      id={id}
      className="py-8 scroll-mt-24 border-t border-neutral-100 dark:border-neutral-800 first:border-t-0 first:pt-0"
      aria-labelledby={title && id ? `${id}-heading` : undefined}
    >
      {title && (
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <hgroup>
            <h2 id={id ? `${id}-heading` : undefined} className="text-2xl font-bold mb-1 text-neutral-900 dark:text-neutral-100">
              {title}
            </h2>
            {subtitle && <p className="text-sm text-neutral-500 dark:text-neutral-400">{subtitle}</p>}
          </hgroup>
          {specs.length > 0 && (
            <dl className="flex flex-wrap gap-3">
              {specs.map((spec, idx) => (
                <div
                  key={idx}
                  className="flex flex-col px-4 py-2 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 min-w-[120px]"
                >
                  <dt className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 mb-1">
                    {spec.icon && SPEC_ICONS[spec.icon]
                      ? (() => {
                        const Icon = SPEC_ICONS[spec.icon]
                        return <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                      })()
                      : null}
                    <span className="text-[10px] font-semibold uppercase tracking-wider">{spec.label}</span>
                  </dt>
                  <dd className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                    <data value={spec.value}>{spec.value}</data>
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </header>
      )}
      <div className="prose prose-lg dark:prose-invert prose-neutral max-w-none prose-p:text-neutral-600 dark:prose-p:text-neutral-300 prose-p:leading-relaxed prose-headings:text-neutral-900 dark:prose-headings:text-neutral-100 prose-strong:text-neutral-800 dark:prose-strong:text-neutral-200 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-code:text-neutral-800 dark:prose-code:text-neutral-200 prose-code:bg-neutral-100 dark:prose-code:bg-neutral-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none">
        {children}
      </div>
    </section>
  )
}

export default ContentSection
