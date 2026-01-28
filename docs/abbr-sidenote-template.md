# Learn Article Template

Use this as a starting point for new learn articles. Glossary-backed sidenotes are required for technical terms. Only the first appearance of an abbreviated term should use a sidenote; later mentions should be plain text. The sidenote helper enforces this automatically per page.

## Import helpers

```
import { GlossarySidenote, AbbrSidenote } from '@/components/shared/sidenote'
```

## Glossary-backed sidenote (preferred)

Use `GlossarySidenote` for shared terms that live in `lib/glossary.ts`.

```
We used a <GlossarySidenote term="LLM" /> to draft the first pass.
```

## Custom abbreviation (when a term is not in the glossary)

If the term is new or domain-specific, add it to the glossary. If you need a one-off definition, use `AbbrSidenote`.

```
The model used <AbbrSidenote title="Retrieval-Augmented Generation" definition="Models fetch relevant documents before answering to improve accuracy">RAG</AbbrSidenote> to reduce hallucinations.
```

## Thorough example (recommended pattern)

```
import { GlossarySidenote, AbbrSidenote } from '@/components/shared/sidenote'

We built a small demo in a <GlossarySidenote term="framework" /> and asked an{' '}
<GlossarySidenote term="LLM" /> to generate the first draft. For rendering, we used
<GlossarySidenote term="TypeScript" /> types so the content stays structured and
reviewable.

For a domain-specific term not yet in the glossary, use a one-off abbreviation:
<AbbrSidenote title="Retrieval-Augmented Generation" definition="Models fetch relevant documents before answering to improve accuracy">RAG</AbbrSidenote>.

If a term will appear multiple times across the site, add it to `lib/glossary.ts`
and use <GlossarySidenote term="API" /> or similar everywhere.
```

## Checklist

- Prefer `GlossarySidenote` for any term that should be standardized.
- Add missing terms to `lib/glossary.ts` before using them.
- Avoid raw `<abbr>` tags in article content.
