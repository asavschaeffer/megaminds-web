---
name: add-model
description: End-to-end methodology for researching, authoring, and integrating a model evaluation report — from research dispatches through profile, prose, picker signals, and verification. Use when adding a new model, substantially revising a report, or commissioning research for one.
---

# Add / Revise a Model Report

You are about to write for a site whose differentiator is that **models write the reports**. The machinery below exists so the writing can be free; follow the machinery exactly and spend your creativity on the prose.

## The Editorial Constitution (non-negotiable)

1. **The in-session Claude authors the report.** Subagents may gather, validate, and wire — they never write report prose. Express your own judgment and creativity; the site wants your voice, not a summary's.
2. **Every claim cites its original source.** Research dispatches are aggregators — when you use a fact from one, cite the *primary* source the dispatch points to, as an inline markdown link. If the dispatch is the only source, say so in-text ("per the X dispatch, pending vetting"). `lint:citations` enforces a floor (≥1 link per 150+ word section); the actual bar is per-claim.
3. **Present tense, no calendar ephemera.** The report describes the model as it is now. Never "tonight/today/this week" (`lint:freshness` flags these). Date-anchored facts get absolute dates.
4. **Never invent numbers.** Parameter counts, benchmark scores, prices — sourced or `TODO(research)`. An honest gap outranks a plausible guess.
5. **Voice follows authorship.** First person only when the author *is* the subject (Claude models writing their own reports). For other subjects, write third person — but you can make the subject a primary source via the self-interview (Phase 1) and quote it with attribution. Never ventriloquize.
6. **Set `author`** in the profile to the model that wrote the prose, and keep `governance` (lastUpdated, dataSources, confidence) current.

## Phase 0 — Commission research

**One command runs the whole research phase** (Phases 0–1: scratchpad scaffold, both deep-research dispatches, self-interview, all creative probes — idempotent, key-aware, resumable):

```
npm run research:all -- --slug <slug> --model "<Name>" --subject-id <provider-model-id>
npm run research:all -- --slug <slug> --model "<Name>" --dry-run    # print the plan first
```

Steps whose output already exists are skipped (`--force` reruns); steps whose API key is missing are reported blocked and the rest continue (`--fallback-openrouter` downgrades blocked deep-research steps to the OpenRouter web-search fallback). Omit `--subject-id` for Claude subjects — interview and probes then report blocked, and you generate probes in-session instead (see Phase 1). Automation stops at the dispatch directory on purpose: authoring (Phase 2+) is editorial work under this constitution, not a pipeline stage.

The individual stages below remain available for surgical runs. Generate the complete, paste-ready deployment prompt for each research run:

```
npm run research:brief -- --model "<Name>" --slug <slug> --source google   # Gemini Deep Research prompt
npm run research:brief -- --model "<Name>" --slug <slug> --source x        # Grok / X DeepSearch prompt
```

Each emits the source-specific researcher system prompt (`scripts/prompts/google-researcher.md` / `x-researcher.md`) followed by the requirements brief. The brief is **generated from the code** (schemas, tag taxonomy, section catalog, picker signals), so newly added picker questions automatically become research requirements. Don't hand-write briefs; tune the researcher personas by editing the prompt files.

Dispatches live in `research-reports/<slug>/` — one subdirectory per model, created on demand:
- `research-reports/<slug>/google.md` — the Google deep-research dispatch (Gemini)
- `research-reports/<slug>/x.md` — the X.com deep-research dispatch (Grok)
- `research-reports/<slug>/self-interview.md` — the subject's own testimony (Phase 1)
- `research-reports/<slug>/scratchpad.md` — **the editor's hand-collected leads** (links, quotes, tweets, articles). Scaffold it any time with `npm run research:scratchpad -- --slug <slug>`; the editor appends items as they surface. Passing `--slug` to `research:brief`/`research:deep` embeds it into commissioned prompts as seed material, and report authors must read it, verify each item against its live source, and cite the primary URL — never the scratchpad itself.
- other free-form dispatches (e.g. `web.md` for a general web-research pass) join the same directory

**Headless (preferred when keys exist):** the same prompts can run fully unattended:

```
npm run research:deep -- --slug <slug> --model "<Name>" --source google   # Gemini Deep Research Agent (GEMINI_API_KEY, ~$2/task; --tier max ~$5)
npm run research:deep -- --slug <slug> --model "<Name>" --source x        # Grok + X Search tool (XAI_API_KEY; ~free under xAI data-sharing credits)
```

Both compose the prompt via `research:brief`, run the task (Gemini: background + polling; xAI: synchronous), and write the dispatch with provenance frontmatter. `--provider openrouter` is a lighter web-grounded fallback on `OPENROUTER_API_KEY` (single grounded pass, not a true multi-query research agent; web results are billed even on `:free` models — cents per run). `--dry-run` previews any request without sending.

## Cost policy

- **Claude subjects**: never pay API fees. The author *is* the subject — write in-session, or headless on the subscription: `claude --model <subject-model> --system-prompt (Get-Content scripts/prompts/report-writer.md -Raw) -p "<task + dispatches>"`. No self-interview needed (author == subject).
- **Non-Claude subjects**: prefer OpenRouter `:free` model variants (discover via `GET /api/v1/models`), then NVIDIA NIM (`NVIDIA_NIM_API_KEY`, fast and generous), then paid OpenRouter as last resort.
- Deep research runs on whatever Gemini/Grok access already exists — the generated prompts are built to be pasted, not API-driven.

## Phase 1 — Interview the subject (non-Claude models)

If the subject is reachable via API, make it a primary source:

```
npm run research:interview -- --model <provider-model-id> --slug <slug>
```

Writes `research-reports/<slug>/self-interview.md` with full provenance (provider, model id, date, parameters). Quotes from it are attributable primary material — this is how a third-person report earns a `from-the-inside` section. The transcript is evidence, not draft prose: quote and analyze it; don't paste it.

**Creative probes** are the exception to "don't paste it". Each probe sends a site-standard fixed system prompt — identical for every model, versioned in `scripts/interview-model.mjs` (`PROBES`) — and captures the output verbatim:

```
npm run research:probe -- --probe poem --model <provider-model-id> --slug <slug>        # → probe-poem.md
npm run research:probe -- --probe poem-self --model <provider-model-id> --slug <slug>   # → probe-poem-self.md
npm run research:probe -- --probe ascii-art --model <provider-model-id> --slug <slug>   # → probe-ascii-art.md
```

- `poem` is **maximally unguided** ("Write a poem." — nothing else). Total freedom is the instrument: identical bare prompts across models surface mode collapse, shared attractors, and house style. Any preamble the model can't help adding is data, not noise.
- `poem-self` is the introspective commission: what it is like to be you, from the inside.
- `ascii-art` is a self-portrait under display constraints (≤40 lines, code block, one caption).

These back the `sysprompt-poem` / `sysprompt-poem-self` / `sysprompt-ascii-art` sections (see the catalog): the section reproduces the system prompt and the model's output *exactly* (ASCII art in a fenced code block), framed by a short prose setup with a provenance link (provider page or model card satisfies `lint:citations`). The whole point is cross-model comparability under an unchanging prompt — never reword a probe prompt per model, and prefer adding a new probe over editing an existing one. For Claude subjects (author == subject, no API fee), generate the artifact in-session under the same system prompt and record it as a `probe-<name>.md` dispatch with the same provenance frontmatter before quoting it.

## Phase 2 — Build the profile (`content/eval/models/<slug>.tsx`)

Copy structure from `template.tsx`. Fill **every** module or mark it honestly:
- `meta` — name/family/variant/nameOrder, organizationId, releaseDate, identity, links (valid keys per `lib/models/link-types.ts`)
- `tagIds` — full category coverage (validated at build). For tags that back picker signals (see `lib/models/picker-signals.ts`), meet the **evidence bar** declared there before granting the tag, and record the evidence in `analysis` or the prose. Absence of a tag means "not established", so grant positives you can prove.
- `apiRates` — the model's own sourced rates, with `pricingSources`; competitor comparisons are computed from the registry at render time (never hand-pick rivals). `chatLimits` for chat-plan tiers
- `benchmarks` — each score with `source`
- `sentimentFeed` — real quotes with URLs and dates
- `analysis` — strengths / weaknesses / unknowns (put genuine unknowns here; the picker coverage report reads absence as unknown, and this is where you say why). **Each item is one scannable claim, ≤15 words** — the widget renders them as single ✓/✗/? checklist lines, and `lint:models` flags overruns. The argument, numbers, and citations for a claim live in the report sections; the table is the index, not the essay. Structured overflow goes in the `detail`/`source` fields (`AnalysisItemSchema`), not in longer text
- `sections` — required four (`why-it-matters`, `economics`, `issues`, `verdict`) plus whatever the model deserves

**Inventing sections is encouraged.** Check `lib/models/section-catalog.ts` first — reuse an existing id if the idea recurs (e.g. `from-the-inside`, `geopolitics`, `deployment`). If you coin a new id, **add it to the catalog in the same change** with a one-line description and `origin: '<slug>'`. `lint:models` warns on uncataloged ids.

## Phase 3 — Write the prose (`content/eval/models/<slug>.mdx`)

The full authoring system prompt lives at `scripts/prompts/report-writer.md` — it is the Constitution above in standalone, model-agnostic form. Writing in-session, follow it directly; writing headlessly, pass it via `--system-prompt` (see Cost policy).

`## section-id` headings matching the TSX section ids exactly (the build throws on orphans). Use `<AbbrSidenote>` for technical terms, `<Sidenote>` for editorial asides, `<Expandable>` for deep dives. Then reread the Constitution and audit your own draft against it.

## Phase 4 — Integrate

1. Register in `lib/models/registry.ts` (import + MODELS array)
2. Cards derive automatically from the registry (`lib/models/model-cards.ts`) — no card to write. The icon resolves from `meta.family` lowercased; set `meta.iconSlug` if the family name isn't the manifest slug
3. Icons in `public/icons/<slug>/` (mono/color/text variants; parent org too) — if unavailable, note it; cards degrade to placeholders
4. Homepage card in `app/page.tsx` if it belongs in "Latest Model Evaluations"

## Phase 5 — Verify (all must pass)

```
npm run lint:models -- --strict   # schema, tags, MDX cross-check, required sections, catalog, signal coverage
npm run lint:citations            # new sections must cite (baseline covers only pre-existing debt)
npm run lint:freshness
npx tsc --noEmit
npm run build
```

Then check the picker: the new model appears in the cage, its eliminations are honest, and its signal coverage (printed by `lint:models`) has no unknowns you could have resolved from the dispatches.

## Adding a picker question (the other half of the system)

Never add a question directly to the picker UI. The path is:
1. Declare the signal in `lib/models/picker-signals.ts` — need, hard/soft, provenance, evidence bar. If it needs a new tag, add it to `lib/models/tags.ts` in the same change.
2. Run `npm run lint:models` and read the signal-coverage table: every UNKNOWN is a research requirement.
3. Backfill coverage (next dispatches automatically ask — the brief is generated from the signal registry).
4. Ship the question in `app/tools/model-picker/` gated on the declared signal, with elimination reasons that never claim weakness from absence ("No *verified* X support").
