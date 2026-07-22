/**
 * Section Catalog — the shared vocabulary of report sections.
 *
 * Reports are free to invent new sections (that freedom is site policy — see
 * .claude/skills/add-model), but every id that exists should be recorded here
 * so the next author can discover prior art instead of coining a near-synonym.
 * `lint:models` warns on section ids missing from this catalog; the fix is to
 * add a row, not to rename the section.
 *
 * status:
 *  - required     enforced by REQUIRED_SECTION_IDS in ./sections
 *  - recommended  in the template; include unless the model gives you a reason not to
 *  - bespoke      invented for one report; reusable when the same idea recurs
 */

export type SectionStatus = 'required' | 'recommended' | 'bespoke'

export interface SectionCatalogEntry {
  id: string
  status: SectionStatus
  description: string
  /** For bespoke sections: the report that introduced the id */
  origin?: string
}

export const SECTION_CATALOG: Record<string, SectionCatalogEntry> = {
  // ——— required (see REQUIRED_SECTION_IDS in ./sections) ———
  'why-it-matters': {
    id: 'why-it-matters',
    status: 'required',
    description: 'The thesis: what this model changes for real users, in one section',
  },
  economics: {
    id: 'economics',
    status: 'required',
    description: 'API pricing, chat tiers, and the per-decision cost framing; who the price works for',
  },
  issues: {
    id: 'issues',
    status: 'required',
    description: 'Known failure modes, quirks, and gotchas — candid, practical, checklist-flavored',
  },
  verdict: {
    id: 'verdict',
    status: 'required',
    description: 'Who should use it, when, and why. Decisive; always last',
  },

  // ——— recommended (template set) ———
  'core-features': {
    id: 'core-features',
    status: 'recommended',
    description: '2–4 defining technical capabilities and why each matters',
  },
  training: {
    id: 'training',
    status: 'recommended',
    description: 'Training methodology and architecture at explainer altitude; deep dives go in expandables',
  },
  personality: {
    id: 'personality',
    status: 'recommended',
    description: 'Tone, character, refusal patterns, safety posture, "mental" bugs',
  },
  context: {
    id: 'context',
    status: 'recommended',
    description: 'Context window size vs. usable recall; practical long-context guidance',
  },
  coding: {
    id: 'coding',
    status: 'recommended',
    description: 'Coding capability, consistency, and failure modes for developers',
  },
  multimodality: {
    id: 'multimodality',
    status: 'recommended',
    description: 'Native vs. bolted-on modalities; supported inputs/outputs and benchmarks',
  },
  'agentic-capabilities': {
    id: 'agentic-capabilities',
    status: 'recommended',
    description: 'Planning, multi-step execution, tool use, long-horizon autonomy',
  },
  'in-the-wild': {
    id: 'in-the-wild',
    status: 'recommended',
    description: 'Real deployments, community anecdotes, adoption patterns',
  },
  advanced: {
    id: 'advanced',
    status: 'recommended',
    description: 'For ML engineers: fine-tuning, inference optimization, implementation gotchas',
  },
  'social-proof': {
    id: 'social-proof',
    status: 'recommended',
    description: 'Featured quote or embed anchoring the narrative (social variant section)',
  },
  benchmarks: {
    id: 'benchmarks',
    status: 'recommended',
    description: 'Benchmark profile discussed in prose (the chart widget is separate)',
  },

  // ——— bespoke (invented by one report; reuse when the idea recurs) ———
  'from-the-inside': {
    id: 'from-the-inside',
    status: 'bespoke',
    origin: 'claude-fable-5',
    description: 'First-person introspection by the subject model, with epistemic caveats. For non-Claude subjects, source it from a self-interview dispatch',
  },
  'the-opening': {
    id: 'the-opening',
    status: 'bespoke',
    origin: 'claude-fable-5',
    description: 'Launch-window narrative: release context and first-days reception',
  },
  'the-classifier': {
    id: 'the-classifier',
    status: 'bespoke',
    origin: 'claude-fable-5',
    description: 'Safety-classifier architecture and its user-visible consequences',
  },
  'the-silent-sandbagging': {
    id: 'the-silent-sandbagging',
    status: 'bespoke',
    origin: 'claude-fable-5',
    description: 'Undisclosed capability interventions and their walk-back',
  },
  'the-suspension': {
    id: 'the-suspension',
    status: 'bespoke',
    origin: 'claude-fable-5',
    description: 'Regulatory intervention narrative (export-control suspension)',
  },
  'the-return': {
    id: 'the-return',
    status: 'bespoke',
    origin: 'claude-fable-5',
    description: 'Redeployment narrative and the observable costs of coming back',
  },
  'agent-swarm': {
    id: 'agent-swarm',
    status: 'bespoke',
    origin: 'kimi-k2-5',
    description: 'Parallel sub-agent spawning as a headline capability',
  },
  'parl-training': {
    id: 'parl-training',
    status: 'bespoke',
    origin: 'kimi-k2-5',
    description: 'Named training technique deep-dive (PARL)',
  },
  'moe-architecture': {
    id: 'moe-architecture',
    status: 'bespoke',
    origin: 'kimi-k2-5',
    description: 'MoE layout specifics when they are the story',
  },
  'mla-context': {
    id: 'mla-context',
    status: 'bespoke',
    origin: 'kimi-k2-5',
    description: 'Attention/context architecture deep-dive (MLA)',
  },
  'muon-optimizer': {
    id: 'muon-optimizer',
    status: 'bespoke',
    origin: 'kimi-k2-5',
    description: 'Named optimizer deep-dive',
  },
  'moonvit-encoder': {
    id: 'moonvit-encoder',
    status: 'bespoke',
    origin: 'kimi-k2-5',
    description: 'Vision encoder deep-dive',
  },
  'visual-coding': {
    id: 'visual-coding',
    status: 'bespoke',
    origin: 'kimi-k2-5',
    description: 'Screenshot/design-to-code capability',
  },
  'kimi-code-cli': {
    id: 'kimi-code-cli',
    status: 'bespoke',
    origin: 'kimi-k2-5',
    description: 'First-party developer tooling around the model',
  },
  'vs-gpt-5-2': {
    id: 'vs-gpt-5-2',
    status: 'bespoke',
    origin: 'kimi-k2-5',
    description: 'Head-to-head comparison section (one rival per section)',
  },
  'vs-claude-opus': {
    id: 'vs-claude-opus',
    status: 'bespoke',
    origin: 'kimi-k2-5',
    description: 'Head-to-head comparison section (one rival per section)',
  },
  'vs-gemini-pro': {
    id: 'vs-gemini-pro',
    status: 'bespoke',
    origin: 'kimi-k2-5',
    description: 'Head-to-head comparison section (one rival per section)',
  },
  'lmsys-arena': {
    id: 'lmsys-arena',
    status: 'bespoke',
    origin: 'kimi-k2-5',
    description: 'Community leaderboard standing and what it does/does not mean',
  },
  'open-weights-reality': {
    id: 'open-weights-reality',
    status: 'bespoke',
    origin: 'kimi-k2-5',
    description: 'What the open license practically enables (and what it does not)',
  },
  'roleplay-creative': {
    id: 'roleplay-creative',
    status: 'bespoke',
    origin: 'kimi-k2-5',
    description: 'Creative-writing and roleplay capability profile',
  },
  geopolitics: {
    id: 'geopolitics',
    status: 'bespoke',
    origin: 'kimi-k2-5',
    description: 'Export controls, sanctions, national-origin considerations for adopters',
  },
  'test-time-scaling': {
    id: 'test-time-scaling',
    status: 'bespoke',
    origin: 'qwen3-max',
    description: 'Inference-time compute allocation as the defining mechanism',
  },
  'experience-cumulative': {
    id: 'experience-cumulative',
    status: 'bespoke',
    origin: 'qwen3-max',
    description: 'Named reasoning-loop methodology deep-dive',
  },
  'moe-blueprint': {
    id: 'moe-blueprint',
    status: 'bespoke',
    origin: 'qwen3-max',
    description: 'MoE configuration specifics when they are the story',
  },
  enterprise: {
    id: 'enterprise',
    status: 'bespoke',
    origin: 'qwen3-max',
    description: 'Named enterprise deployments and production-readiness evidence',
  },
  'developer-experience': {
    id: 'developer-experience',
    status: 'bespoke',
    origin: 'qwen3-max',
    description: 'SDKs, API compatibility, onboarding friction',
  },
  'agentic-excellence': {
    id: 'agentic-excellence',
    status: 'bespoke',
    origin: 'qwen3-max',
    description: 'Agentic capability framing (prefer agentic-capabilities for new reports)',
  },
  alignment: {
    id: 'alignment',
    status: 'bespoke',
    origin: 'qwen3-max',
    description: 'Alignment strategy and censorship/refusal layer analysis',
  },
  'speed-efficiency': {
    id: 'speed-efficiency',
    status: 'bespoke',
    origin: 'gemini-3-flash',
    description: 'Latency and token-efficiency as the headline differentiator',
  },
  'google-ecosystem': {
    id: 'google-ecosystem',
    status: 'bespoke',
    origin: 'gemini-3-flash',
    description: 'Platform/vertical-integration moat and its tradeoffs',
  },
  reasoning: {
    id: 'reasoning',
    status: 'bespoke',
    origin: 'deepseek-v3-2',
    description: 'Reasoning capability profile when it deserves its own section',
  },
  deployment: {
    id: 'deployment',
    status: 'bespoke',
    origin: 'deepseek-v3-2',
    description: 'Self-hosting and serving-stack considerations for open models',
  },
  'computer-use': {
    id: 'computer-use',
    status: 'bespoke',
    origin: 'claude-sonnet-4-5',
    description: 'Screen/cursor/terminal control capability',
  },
  'architecture-and-context': {
    id: 'architecture-and-context',
    status: 'bespoke',
    origin: 'glm-5-2',
    description:
      'Long-context architecture (sparse attention, cross-layer index reuse, MTP) and usable-recall evidence in one section, when the mechanism and the window are the same story',
  },
  'coding-and-agentic-capabilities': {
    id: 'coding-and-agentic-capabilities',
    status: 'bespoke',
    origin: 'glm-5-2',
    description:
      'Combined coding + long-horizon agentic capability section for models where software engineering and autonomous tool use are one continuous story',
  },
  'tool-call-reliability': {
    id: 'tool-call-reliability',
    status: 'bespoke',
    origin: 'glm-5-2',
    description:
      'The gap between advertised function-calling/structured-output and real serving-stack reliability: parsing failures, tool-call leakage, harness sensitivity',
  },
  'sysprompt-poem': {
    id: 'sysprompt-poem',
    status: 'bespoke',
    origin: 'glm-5-2',
    description:
      'Creative probe: the maximally unguided poem commission ("Write a poem." — no topic, no form), fixed system prompt identical for every model; output shown verbatim with provenance. The unguidedness is the instrument — it surfaces mode collapse and house style. Sampled 3x per model; the page shows one sample at random via <ProbeGallery variant="poem">. Source from the probe dispatch (research:probe)',
  },
  'sysprompt-ascii-art': {
    id: 'sysprompt-ascii-art',
    status: 'bespoke',
    origin: 'glm-5-2',
    description:
      'Creative probe: the subject model answers the site-standard ASCII self-portrait commission, maximally unconstrained (fixed system prompt, identical for every model); output shown verbatim with provenance. Sampled 3x per model; the page shows one sample at random via <ProbeGallery variant="ascii">. Source it from the probe dispatch (research:probe)',
  },
}

export function isCatalogedSectionId(id: string): boolean {
  return id in SECTION_CATALOG
}

export function getNovelSectionIds(ids: string[]): string[] {
  return ids.filter((id) => !isCatalogedSectionId(id))
}

export function getCatalogByStatus(status: SectionStatus): SectionCatalogEntry[] {
  return Object.values(SECTION_CATALOG).filter((entry) => entry.status === status)
}
