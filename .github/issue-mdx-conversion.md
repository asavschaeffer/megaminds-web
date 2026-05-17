## Overview
Convert content-heavy pages from .tsx to .mdx format for better separation of concerns and easier content editing.

## Current State
We have ~5,500 lines of content mixed with React components in .tsx files. This makes editing difficult and creates ESLint noise (unescaped quotes in educational text).

## Proposed Architecture

### Before (Current)
```
app/learn/curriculum/[module]/
└── page.tsx          # 500-800 lines: Content + components mixed
```

### After (Proposed)
```
app/learn/curriculum/[module]/
├── page.tsx          # ~30 lines: Layout wrapper only
├── content.mdx       # ~100 lines: Article content in Markdown
└── components/       # Interactive diagrams
    ├── NextWordDiagram.tsx
    ├── TwoFilesDiagram.tsx
    └── CompressionDiagram.tsx
```

## Files to Convert (High Priority)

### Curriculum Modules (6 files, ~3,900 lines)
- [ ] `app/learn/curriculum/how-llms-work/page.tsx` - 786 lines
- [ ] `app/learn/curriculum/no-memory/page.tsx` - 792 lines
- [ ] `app/learn/curriculum/llms-machine-learning/page.tsx` - 649 lines
- [ ] `app/learn/curriculum/finetuning-basics/page.tsx` - 633 lines
- [ ] `app/learn/curriculum/pretraining-basics/page.tsx` - 546 lines
- [ ] `app/learn/curriculum/prompt-is-everything/page.tsx` - 496 lines

### Articles (2 files, ~1,550 lines)
- [ ] `app/learn/articles/typescript-llm-pipeline/page.tsx` - 1,109 lines
- [ ] `app/learn/articles/self-reflection/page.tsx` - 440 lines

## Implementation Steps

For each file:
1. Create `components/` subdirectory
2. Extract interactive components into separate .tsx files
3. Create `content.mdx` with Markdown + component imports
4. Simplify `page.tsx` to just import MDX and wrap in layout
5. Update any imports/paths as needed
6. Test build passes
7. Update EDITORS.md with new conventions

## Example

See discussion with @opencode for detailed example of `llms-machine-learning` conversion.

## Benefits
- Smaller, focused files (~50-100 lines vs 500-800)
- Content writers can edit without touching code
- Better separation: Content | Layout | Interactivity
- No more ESLint unescaped-entity errors in text
- Easier to review diffs (Markdown vs JSX)

## Notes
- Keep dynamic routes (e.g., `[slug]/page.tsx`) as .tsx - they're loaders, not content
- Keep listing/index pages as .tsx
- This is a refactoring - only move code, don't change functionality
- Wait until content stabilizes before converting (rough drafts should finish first)

## References
- [MDX Documentation](https://mdxjs.com/)
- Next.js [MDX support](https://nextjs.org/docs/app/building-your-application/configuring/mdx)
