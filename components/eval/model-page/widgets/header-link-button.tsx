import type { ComponentType } from 'react'

export const HeaderLinkButton = ({
  href,
  icon: Icon,
  label,
  description,
  primary = false,
}: {
  href: string
  icon: ComponentType<{ className?: string }>
  label: string
  description?: string
  primary?: boolean
}) => {
  const baseClasses = primary
    ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200'
    : 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100'

  const descClasses = primary ? 'text-white/70 dark:text-black/60' : 'text-neutral-500 dark:text-neutral-400'

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${baseClasses}`}
    >
      <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
      <span className="flex flex-col items-start leading-tight">
        <span>{label}</span>
        {description && (
          <span className={`hidden md:block text-[10px] font-normal leading-tight ${descClasses}`}>
            {description}
          </span>
        )}
      </span>
    </a>
  )
}

export default HeaderLinkButton
