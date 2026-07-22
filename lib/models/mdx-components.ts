import { AbbrSidenote, GlossarySidenote, Sidenote } from '@/components/shared/sidenote'
import { ProbeGallery } from '@/components/eval/model-page/probe-gallery'

/**
 * Component map for MDX rendering in model pages.
 * These components are available in .mdx files without explicit imports.
 */
export const modelMdxComponents = {
  AbbrSidenote,
  GlossarySidenote,
  // Free-form margin note (Gwern-style sidenote in the right column on wide
  // viewports, tap-to-reveal popover on narrow ones). Usage in MDX:
  //   <Sidenote label="trigger text">the note that floats to the margin</Sidenote>
  Sidenote,
  // `Aside` is an ergonomic alias for the same component.
  Aside: Sidenote,
  // Random-sample viewer for the poem / ASCII-art probes (3 samples per
  // model). See components/eval/model-page/probe-gallery.tsx for usage.
  ProbeGallery,
  // <data> element passes through as a native HTML element
  data: 'data' as unknown as React.ComponentType,
  // <q> element passes through as a native HTML element
  q: 'q' as unknown as React.ComponentType,
  // <dfn> element passes through as a native HTML element
  dfn: 'dfn' as unknown as React.ComponentType,
}
