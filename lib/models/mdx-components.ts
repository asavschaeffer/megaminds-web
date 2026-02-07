import { AbbrSidenote, GlossarySidenote } from '@/components/shared/sidenote'

/**
 * Component map for MDX rendering in model pages.
 * These components are available in .mdx files without explicit imports.
 */
export const modelMdxComponents = {
  AbbrSidenote,
  GlossarySidenote,
  // <data> element passes through as a native HTML element
  data: 'data' as unknown as React.ComponentType,
  // <q> element passes through as a native HTML element
  q: 'q' as unknown as React.ComponentType,
  // <dfn> element passes through as a native HTML element
  dfn: 'dfn' as unknown as React.ComponentType,
}
