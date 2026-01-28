import { ModelIconClient } from '@/components/ui/model-icon-client'
import type { ModelHeaderProps } from '@/lib/models/types'
import type { ModelLinkTypeId } from '@/lib/models/link-types'
import { getLinkType, isValidLinkTypeId } from '@/lib/models/link-types'
import { composeModelName } from '@/lib/models/names'
import { getTag, isValidTagId } from '@/lib/models/tags'
import { HeaderLinkButton } from './header-link-button'
import { Tag } from './tag'

type LinkEntry = ReturnType<typeof getLinkType> & { href: string }

const buildLinks = (links?: ModelHeaderProps['links']): LinkEntry[] => {
  if (!links) return []
  return Object.entries(links)
    .filter(([key, href]) => Boolean(href) && isValidLinkTypeId(key))
    .map(([key, href]) => ({ ...getLinkType(key as ModelLinkTypeId), href: href as string }))
}

export const ModelHeader = ({
  name,
  family,
  variant,
  modelVersion,
  nameOrder,
  organization,
  releaseDate,
  releaseDateDisplay,
  identity,
  tagIds = [],
  tags = [],
  links = {},
}: ModelHeaderProps) => {
  const displayName = composeModelName({ name, family, variant, modelVersion, nameOrder })
  const hasLinks = Object.values(links).some(Boolean)
  const typedLinks = buildLinks(links)
  const primaryLinks = typedLinks.filter((link) => link.primary)
  const secondaryLinks = typedLinks.filter((link) => !link.primary && link.category === 'build')
  const tertiaryLinks = typedLinks.filter((link) => !link.primary && link.category !== 'build')
  const iconMatchName = organization || name
  const safeTagIds = tagIds.filter(isValidTagId)
  const hasTags = safeTagIds.length > 0 || tags.length > 0

  return (
    <header className="space-y-6">
      <hgroup className="space-y-2">
        <div className="flex items-center gap-4 flex-wrap">
          <ModelIconClient name={iconMatchName} size={48} className="shrink-0" />
          <div className="flex items-center gap-6 flex-wrap">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              {displayName}
            </h1>
            {(organization || releaseDate) && (
              <p className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                {organization && <span className="font-semibold text-neutral-700 dark:text-neutral-300">{organization}</span>}
                {organization && releaseDate && <span aria-hidden="true">·</span>}
                {releaseDate && <time dateTime={releaseDate}>{releaseDateDisplay || releaseDate}</time>}
              </p>
            )}
          </div>
        </div>
      </hgroup>

      {hasTags && (
        <ul className="flex flex-wrap gap-2 list-none" role="list" aria-label="Model characteristics">
          {safeTagIds.map((tagId) => (
            <li key={tagId}>
              <a
                href={`/eval/models?tag=${encodeURIComponent(tagId)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <Tag className="transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-700">
                  {getTag(tagId).label}
                </Tag>
              </a>
            </li>
          ))}
          {tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
      )}

      {identity && <p className="text-lg leading-relaxed text-neutral-700 dark:text-neutral-300 max-w-2xl">{identity}</p>}

      {hasLinks && (
        <nav aria-label="Model resources and links" className="flex gap-3 flex-wrap pt-2">
          {primaryLinks.map((link) => (
            <HeaderLinkButton key={link.id} {...link} primary />
          ))}
          {secondaryLinks.map((link) => (
            <HeaderLinkButton key={link.id} {...link} />
          ))}
          {tertiaryLinks.map((link) => (
            <HeaderLinkButton key={link.id} {...link} />
          ))}
        </nav>
      )}
    </header>
  )
}

export default ModelHeader
