import type { ComponentProps } from 'react'
import type { MDXRemoteProps } from 'next-mdx-remote/rsc'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getCurriculumMdx } from '@/lib/curriculum-mdx'
import { CurriculumLessonPage } from './lesson-page'

export type CurriculumMdxComponents = NonNullable<MDXRemoteProps['components']>

type CurriculumMdxPageProps = Omit<
  ComponentProps<typeof CurriculumLessonPage>,
  'children'
> & {
  components?: CurriculumMdxComponents
}

export function CurriculumMdxPage({
  components,
  slug,
  ...lessonPageProps
}: CurriculumMdxPageProps) {
  const content = getCurriculumMdx(slug)

  return (
    <CurriculumLessonPage slug={slug} {...lessonPageProps}>
      <MDXRemote source={content} components={components} />
    </CurriculumLessonPage>
  )
}
