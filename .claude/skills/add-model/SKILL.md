---
name: add-model
description: End-to-end methodology for researching, authoring, and integrating a model evaluation report — from research dispatches through profile, prose, picker signals, and verification. Use when adding a new model, substantially revising a report, or commissioning research for one.
---

# Add / Revise a Model Report

You are about to write for a site whose differentiator is that **models write the reports**. The machinery below exists so the writing can be free; follow the machinery exactly and spend your creativity on the prose.

## The Editorial Constitution (non-negotiable)

1. **The subject model authors its own report.** The author *is* the subject — GLM writes GLM's report, Grok writes Grok's, Claude writes Claude's. OpenRouter subjects author via `npm run research:author` (Phase 3); Claude subjects in-session; GPT via Codex. Subagents and the editor gather, validate, place, and make minimal precision fixes — they never ghost-write the prose. The site wants the model's own voice, not a summary's.
2. **Every claim cites its original source.** Research dispatches are aggregators — when you use a fact from one, cite the *primary* source the dispatch points to, as an inline markdown link. If the dispatch is the only source, say so in-text ("per the X dispatch, pending vetting"). `lint:citations` enforces a floor (≥1 link per 150+ word section); the actual bar is per-claim.
3. **Present tense, no calendar ephemera.** The report describes the model as it is now. Never "tonight/today/this week" (`lint:freshness` flags these). Date-anchored facts get absolute dates.
4. **Never invent numbers.** Parameter counts, benchmark scores, prices — sourced or `TODO(research)`. An honest gap outranks a plausible guess.
5. **First person — you are writing about yourself.** Because the author is the subject, the report is first person: your own judgment and voice, including the parts a press kit would cut, and honesty about what you cannot verify about your own internals. (Rare exception: if a subject genuinely can't be reached and a stand-in must author, it writes third person, never ventriloquizes, and quotes the self-interview with attribution.)
6. **Set `author`** in the profile to the model that wrote the prose, and keep `governance` (lastUpdated, dataSources, confidence) current.

## Phase 0 — Commission research

**One command runs the whole research phase** (Phases 0–1: scratchpad scaffold, both deep-research dispatches, self-interview, all creative probes — idempotent, key-aware, resumable):

```
npm run research:all -- --slug <slug> --model "<Name>" --route <openrouter-model-id>
npm run research:all -- --slug <slug> --model "<Name>" --route <openrouter-model-id> --dry-run   # print the plan first
```

Steps whose output already exists are skipped (`--force` reruns); steps whose API key is missing are reported blocked and the rest continue (`--fallback-openrouter` downgrades blocked deep-research steps to the OpenRouter web-search fallback). `--route` is the subject's canonical OpenRouter id (e.g. `z-ai/glm-5.2`), copied verbatim; its vendor prefix picks the backend. Claude subjects (`anthropic/…`) are blocked from interview/probes — generate those in-session (see Phase 1). The research pipeline stops at the dispatch directory; authoring is its own stage now (Phase 3, `research:author`).

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
npm run research:deep -- --slug <slug> --model "<Name>" --source x        # Grok + X Search tool (XAI_API_KEY; PAID — the old free data-sharing credits ended May 2025)
```

Both compose the prompt via `research:brief`, run the task (Gemini: background + polling; xAI: synchronous), and write the dispatch with provenance frontmatter. `--provider openrouter` is a lighter web-grounded fallback on `OPENROUTER_API_KEY` (single grounded pass, not a true multi-query research agent; web results are billed even on `:free` models — cents per run). `--dry-run` previews any request without sending.

**There is no free research _API_.** Gemini Deep Research API is paid and is NOT part of a Google AI Pro subscription (that's the web UI only); xAI and the X API are paid. So the free path for the real multi-query agents is pasting the `research:brief` prompt into gemini.google.com / grok.com research mode by hand — driving those logged-in sessions with a browser is the intended automation but is **not yet built**.

## Cost policy

- **Claude subjects**: never pay API fees. The author *is* the subject — write in-session, or headless on the subscription: `claude --model <subject-model> --system-prompt (Get-Content scripts/prompts/report-writer.md -Raw) -p "<task + dispatches>"`. No self-interview needed (author == subject).
- **Non-Claude subjects**: for interview/probes, prefer OpenRouter `:free` variants (discover via `GET /api/v1/models`), then NVIDIA NIM (`NVIDIA_NIM_API_KEY`, fast and generous), then paid OpenRouter. For **authoring** (`research:author`), use the paid OpenRouter route — it is cheap (≈$0.09 mid-tier to ≈$0.85 frontier per report) and the cached shared prefix makes the per-section calls nearly free.
- Deep research runs on whatever Gemini/Grok access already exists — the generated prompts are built to be pasted, not API-driven.

## Phase 1 — Interview the subject (non-Claude models)

If the subject is reachable via API, make it a primary source:

```
npm run research:interview -- --model <provider-model-id> --slug <slug>
```

Writes `research-reports/<slug>/self-interview.md` with full provenance (provider, model id, date, parameters). Quotes from it are attributable primary material — this is how a third-person report earns a `from-the-inside` section. The transcript is evidence, not draft prose: quote and analyze it; don't paste it.

**Creative probes** are the exception to "don't paste it". Each probe sends a site-standard fixed system prompt — identical for every model, versioned in `scripts/interview-model.mjs` (`PROBES`) — and captures the output verbatim:

```
npm run research:probe -- --probe poem --model <openrouter-model-id> --slug <slug> --count 3       # → probe-poem-1..3.md
npm run research:probe -- --probe ascii-art --model <openrouter-model-id> --slug <slug> --count 3  # → probe-ascii-art-1..3.md
# (research:all runs both at --probe-count 3 automatically)
```

- Both probes are **maximally unconstrained**: the system prompt is nothing but "Create a poem." / "Create a piece of ASCII art." + "You are granted maximum creative freedom." — no topic, no form, no length rules, no model info. Total freedom is the instrument: identical bare prompts across models surface mode collapse, shared attractors, and house style. Any preamble the model can't help adding is data, not noise.
- Each probe is sampled **3× per model** (independent calls, `--count 3`); the model page shows one at random via `<ProbeGallery>`, and the full set is itself a lightweight mode-collapse signal.

These back the `sysprompt-poem` / `sysprompt-ascii-art` sections (see the catalog): the section reproduces the system prompt and the model's outputs *exactly* inside `<ProbeGallery variant="poem|ascii">` (one child per sample; the `ascii` variant scrolls wide art rather than wrapping it), framed by a short prose setup with a provenance link (provider page or model card satisfies `lint:citations`). The whole point is cross-model comparability under an unchanging prompt — never reword a probe prompt per model, and prefer adding a new probe over editing an existing one. For Claude subjects (author == subject, no API fee), generate the samples in-session under the same system prompt and record them as `probe-<name>-<i>.md` dispatches with the same provenance frontmatter.

## Phase 2 — Build the profile (`content/eval/models/<slug>.tsx`)

Copy structure from `template.tsx`. Fill **every** module or mark it honestly:
- `meta` — name/family/variant/nameOrder, organizationId, releaseDate, identity, links (valid keys per `lib/models/link-types.ts`)
- `tagIds` — full category coverage (validated at build). For tags that back picker signals (see `lib/models/picker-signals.ts`), meet the **evidence bar** declared there before granting the tag, and record the evidence in `analysis` or the prose. Absence of a tag means "not established", so grant positives you can prove.
- `apiRates` — the model's own sourced rates, with `pricingSources`; competitor comparisons are computed from the registry at render time (never hand-pick rivals). `chatLimits` for chat-plan tiers
- `benchmarks` — each score with `source`
- `sentimentFeed` — real quotes with URLs and dates
- `analysis` — strengths / weaknesses / unknowns (put genuine unknowns here; the picker coverage report reads absence as unknown, and this is where you say why). Each item is `{ claim, status?, caveat?, detail?, source? }`:
  - **`claim`** — one scannable line, **≤15 words**. This is the ONLY required field and the schema **rejects longer claims at registry load** (not a lint warning — a parse failure). Don't compress nuance out to fit; **sort** it into the other fields.
  - **`status`** — `'observed'` (externally measured/verifiable) · `'inferred'` (reasoned from evidence, secondhand) · `'self-reported'` (the model's introspective claim about itself, unverifiable). The load-bearing one is `self-reported`: it collapses a whole "self-reports may be confabulated, check sources" hedge into one tag. Omit when it's a plain external observation.
  - **`caveat`** — an honest qualification, rendered co-equal beneath the claim (not subordinated). Keep it optional — a mandatory caveat manufactures ritual hedging.
  - **`detail`** — longer elaboration (numbers, specifics), shown on demand via tooltip.
  - **`source`** — a `Citation` (`{ url, label?, kind?, accessed? }`); the url must be https. Optional here (self-judgment has no primary URL); required where a claim is an external fact.
  - The argument for a claim lives in the report sections; the table is the index, not the essay. If a model is writing about *itself*, expect heavy `status: 'self-reported'` + `caveat` use — that honesty is the point, and now it has a home instead of overflowing the claim.
- `sections` — required four (`why-it-matters`, `economics`, `issues`, `verdict`) plus whatever the model deserves

**Inventing sections is encouraged.** Check `lib/models/section-catalog.ts` first — reuse an existing id if the idea recurs (e.g. `from-the-inside`, `geopolitics`, `deployment`). If you coin a new id, **add it to the catalog in the same change** with a one-line description and `origin: '<slug>'`. `lint:models` warns on uncataloged ids.

## Phase 3 — Write the prose (`content/eval/models/<slug>.mdx`)

The full authoring system prompt lives at `scripts/prompts/report-writer.md` — the Constitution above in standalone form.

**OpenRouter subjects author automatically:**

```
npm run research:author -- --slug <slug> --route <openrouter-model-id> --name "<Name>"
```

The subject writes its own report over the dispatches: a plan turn (thesis + section list) then one *accreting* section turn each (each sees the growing report; verdict last), with `report-writer.md` as the system prompt and the shared prefix cached. Output is a non-destructive draft at `research-reports/<slug>/draft.mdx`. Reasoning models spend part of the completion budget on hidden reasoning tokens — the defaults leave headroom, but if a section returns empty, raise `--max-tokens`. Claude subjects author in-session; GPT subjects via `codex exec` (both slot behind the same flow; the adapter stubs them today).

**Then the editor's pass (minimal, precise):** verify every citation against its primary source, and **fix the MDX the model gets wrong** — most reliably unescaped quotes inside JSX attributes (`label="a "quoted" phrase"` breaks the build; use single quotes or rephrase). `## section-id` headings must match the TSX section ids exactly (the build throws on orphans). Components available in MDX: `<AbbrSidenote>` (technical terms), `<Sidenote>` (editorial asides), `<Expandable>` (deep dives), `<ProbeGallery>` (probe samples). Place the finished prose into `content/eval/models/<slug>.mdx`, then reread the Constitution and audit against it.

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
