import type { ReactNode } from 'react'

export const Tag = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <mark
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 ${className}`}
  >
    {children}
  </mark>
)

export default Tag
