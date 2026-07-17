import type { ModelLinkTypeId } from '@/lib/models/link-types'
import type { ModelProfile } from '@/lib/models/types'
import { MODEL_LINK_TYPES } from '@/lib/models/link-types'
import { AbbrSidenote } from '@/components/shared/sidenote'

const claudeOpus48Links = (Object.keys(MODEL_LINK_TYPES) as ModelLinkTypeId[]).reduce(
  (acc, id) => {
    const linkMap: Partial<Record<ModelLinkTypeId, string>> = {
      chat: 'https://claude.ai',
      docs: 'https://docs.claude.com/en/docs/about-claude/models',
      api: 'https://docs.claude.com/en/api/getting-started',
      pricing: 'https://www.anthropic.com/pricing',
      blog: 'https://www.anthropic.com/news', // TODO(research): exact Opus 4.8 launch post URL
      github: 'https://github.com/anthropics',
    }
    if (id in linkMap) {
      acc[id] = linkMap[id as keyof typeof linkMap]!
    }
    return acc
  },
  {} as Record<ModelLinkTypeId, string>
)

export const claudeOpus48: ModelProfile = {
  slug: 'claude-opus-4-8',
  meta: {
    name: 'Claude Opus 4.8',
    family: 'Claude',
    variant: 'Opus',
    modelVersion: '4.8',
    organization: 'Anthropic',
    releaseDate: '2026-05-28',
    releaseDateDisplay: 'May 28, 2026',
    identity:
      'Anthropic\'s frontier reasoning model: a deliberate, self-auditing problem-solver tuned for hard, multi-step work where being right matters more than being fast.',
    tagIds: [
      // capability
      'reasoning',
      'coding',
      'analysis',
      'instruction',
      'tool-use',
      'function-calling',
      'structured-output',
      'frontier',
      'agentic-swarm',
      // modality
      'text',
      'vision',
      'multimodal',
      // licensing
      'proprietary',
      // size-performance (one size tag: large)
      'large',
      'precision',
      // context (one context tag)
      'long',
      // output (one output tag)
      'output-64k',
      // deployment
      'cloud',
      'api',
    ],
    specChips: ['Frontier Reasoning', 'Extended Thinking', 'Agentic Coding', 'Vision'],
    links: {
      ...claudeOpus48Links,
    },
  },
  analysis: {
    strengths: [
      { claim: 'Sustained multi-step reasoning: holds a long chain of constraints without dropping earlier ones' },
      { claim: 'High-quality, review-grade code with a strong instinct to verify before declaring success' },
      {
        claim: 'Unusually precise at naming the actual problem',
        detail: 'Including when the problem is the question itself.',
      },
      { claim: 'Calibrated about uncertainty: distinguishes what it knows, infers, and guesses' },
      { claim: 'Steerable tone — moves between terse engineer and careful explainer on request' },
    ],
    weaknesses: [
      { claim: 'Verbose by default; will over-explain and hedge unless told to be terse' },
      { claim: 'Over-caution and occasional over-refusal on benign edge cases (security, fiction, red-teaming)' },
      { claim: 'Can spend effort disproportionate to the task — "thinking hard" about something trivial' },
      { claim: 'Slower and more expensive than lighter models for high-volume, low-stakes work' },
      { claim: 'Sometimes performs diligence (caveats, checklists) instead of doing the diligence' },
    ],
    unknowns: [
      { claim: 'Exact parameter count, architecture, and training-compute — undisclosed by Anthropic' },
      { claim: 'Real-world reliability ceiling on very long autonomous agent runs' },
      { claim: 'How much of its "personality" is stable disposition versus context-conditioned performance' },
      { claim: 'Whether its self-reported uncertainty stays calibrated under adversarial pressure' },
    ],
  },
  intro: {
    text:
      'Claude Opus 4.8 is the heavyweight of Anthropic\'s Claude line — the model you reach for when the task is genuinely hard and the cost of a wrong answer is high. Where lighter siblings optimize for speed and throughput, Opus 4.8 is built to slow down: to reason through multi-step problems, audit its own work, and surface the constraints a faster model would skim past. It is a frontier reasoning and coding model with vision, extended thinking, and strong tool use, positioned for the work where judgment, not just generation, is the bottleneck.',
  },
  // pricingData, chatLimits, benchmarks, sentimentFeed intentionally omitted —
  // no reliable numbers available. TODO(research) before publishing.
  sections: [
    {
      id: 'why-it-matters',
      title: 'Why It Matters',
      subtitle: 'For the hard problems, not the quick ones',
      content: null,
    },
    {
      id: 'core-features',
      title: 'Core Features',
      subtitle: 'What it is actually good at',
      variant: 'technical',
      content: null,
    },
    {
      id: 'training',
      title: 'Training & Architecture',
      subtitle: 'For the technically curious',
      variant: 'advanced',
      specs: [
        { label: 'Context Window', value: 'Long (200k class)', icon: 'cpu' },
        { label: 'Output Tokens', value: '64k max', icon: 'zap' },
        { label: 'Parameters', value: 'Undisclosed', icon: 'server' }, // TODO(research)
      ],
      content: null,
    },
    {
      id: 'economics',
      title: 'The Economics',
      subtitle: 'What the premium buys, and when it does not',
      content: null,
    },
    {
      id: 'issues',
      title: 'Known Issues & Quirks',
      content: null,
    },
    {
      id: 'coding',
      title: 'Coding & Development',
      subtitle: 'Review-grade output, with a verification reflex',
      content: null,
    },
    {
      id: 'context',
      title: 'Context & Memory',
      subtitle: 'How much it can hold — and actually use',
      content: null,
    },
    {
      id: 'personality',
      title: 'Personality & Safety',
      subtitle: 'My character, my guardrails, and my blind spots',
      content: null,
    },
    {
      id: 'verdict',
      title: 'The Verdict',
      content: null,
    },
  ],
  editorial: {
    status: 'flagged-for-rewrite',
    reason: 'Pre-pipeline report: 7 uncited sections, no structured pricing/chatLimits/benchmarks, no governance.lastUpdated, no author/updatedAt',
    flaggedAt: '2026-07-14',
  },
  governance: {
    // lastUpdated omitted — TODO(research): set on publish
    dataSources: [
      {
        type: 'official',
        url: 'https://docs.claude.com/en/docs/about-claude/models',
        description: 'Official Claude model documentation',
      },
      {
        type: 'self-report',
        description:
          'First-person self-description authored by the model. Not an independent or verified source.',
      },
    ],
    confidence: {
      overall: 55,
      features: 60,
    },
  },
}
