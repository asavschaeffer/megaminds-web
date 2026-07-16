import type { ModelLinkTypeId } from '@/lib/models/link-types'
import type { ModelProfile } from '@/lib/models/types'
import { MODEL_LINK_TYPES } from '@/lib/models/link-types'
import { AbbrSidenote } from '@/components/shared/sidenote'

const claudeSonnet45Links = (Object.keys(MODEL_LINK_TYPES) as ModelLinkTypeId[]).reduce(
  (acc, id) => {
    const linkMap: Partial<Record<ModelLinkTypeId, string>> = {
      docs: 'https://docs.anthropic.com/en/docs/about-claude/models',
      pricing: 'https://www.anthropic.com/pricing',
      api: 'https://docs.anthropic.com/en/api/getting-started',
      blog: 'https://www.anthropic.com/news/claude-sonnet-4-5',
      github: 'https://github.com/anthropics',
    }
    if (id in linkMap) {
      acc[id] = linkMap[id as keyof typeof linkMap]!
    }
    return acc
  },
  {} as Record<ModelLinkTypeId, string>
)

export const claudeSonnet45: ModelProfile = {
  slug: 'claude-sonnet-4-5',
  meta: {
    name: 'Claude Sonnet 4.5',
    family: 'Claude 4.5',
    organization: 'Anthropic',
    releaseDate: '2025-09-29',
    identity:
      'The definitive agentic engineer: built to execute complex workflows, write production code, and operate computers autonomously.',
    tagIds: [
      'reasoning',
      'coding',
      'text',
      'proprietary',
      'large',
      'medium-context',
      'cloud',
      'api',
      'output-64k',
      'multimodal',
      'tool-use',
      'function-calling',
      'structured-output',
    ],
    specChips: ['200k Context (1M Beta)', '64k Output', 'Computer Use', 'Extended Thinking'],
    apiRates: { input: 3.0, output: 15.0, provider: 'Anthropic' },
    links: {
      ...claudeSonnet45Links,
    },
  },
  analysis: {
    strengths: [
      'State-of-the-art tool calling and API integration for production systems',
      'Best-in-class coding capabilities: 82% on SWE-bench Verified with parallel test-time compute',
      'Native Computer Use: can view screens, control cursors, and execute terminal commands (61.4% on OSWorld)',
      'Outstanding precision at identifying and articulating specific technical problems',
      'Extended thinking architecture enables complex multi-step reasoning',
      '64k output token limit allows complete file generation in single passes',
    ],
    weaknesses: [
      'Premium pricing ($3/$15 per million tokens) compared to competitors',
      'Slower response times, especially when engaging extended thinking mode',
      'Limited free tier usage (restrictive for casual users)',
      'Context degradation ("poisoning") reported around 300k tokens in long sessions',
      'Automatic context compaction in long chats can lose important details',
      'Occasional performance regressions ("lazy" or "stupid" waves) reported by community',
    ],
    unknowns: [
      'Long-term reliability of multi-day autonomous agent runs in diverse environments',
      'True parameter count and mixture-of-experts architecture details remain undisclosed',
      'Impact of Constitutional AI training on edge cases and creative use cases',
      'Real-world adoption velocity versus marketing momentum',
    ],
  },
  intro: {
    text:
      'Claude Sonnet 4.5 represents the definitive shift from chatbot to agent. Released September 29, 2025, it is the first model specifically engineered for autonomous operation—not just generating code snippets, but navigating operating systems, managing terminals, and executing multi-hour workflows. With state-of-the-art performance in coding (82% on SWE-bench) and the introduction of native "Computer Use," Sonnet 4.5 established itself as the workhorse model for the agentic coding revolution, displacing GPT-4 in IDEs like Cursor and VS Code.',
  },
  chatLimits: [
    {
      name: 'Claude Free',
      tiers: [{ label: 'Free', maxMsgs: 25, price: '$0' }],
    },
    {
      name: 'Claude Pro',
      tiers: [{ label: 'Pro', maxMsgs: 200, price: '$20/mo' }],
    },
    {
      name: 'ChatGPT Plus',
      tiers: [
        { label: 'Free', maxMsgs: 10, price: '$0' },
        { label: 'Plus', maxMsgs: 80, price: '$20/mo' },
      ],
    },
  ],
  benchmarks: [
    { name: 'SWE-bench Verified (Coding)', score: 82.0, maxScore: 100, comparison: 'GPT-5.2: 80.0' },
    {
      name: 'AIME 2025 (Math, with tools)',
      score: 100,
      maxScore: 100,
      comparison: 'GPT-5.2: 100 (native)',
    },
    { name: 'GPQA Diamond (Science)', score: 83.4, maxScore: 100, comparison: 'GPT-5.2: 92.4' },
    { name: 'Terminal-Bench (CLI)', score: 50.0, maxScore: 100, comparison: 'GPT-5.2: 43.8' },
    { name: 'OSWorld (Computer Use)', score: 61.4, maxScore: 100, comparison: 'Previous SOTA: ~42' },
  ],
  sentimentFeed: [
    {
      author: 'Andrej Karpathy',
      handle: '@karpathy',
      content:
        'My coding workflow has inverted—from 80% manual to 80% agentic in just a few weeks. The tenacity and self-correction are transformative.',
      sentiment: 'positive',
      url: 'https://letsdatascience.com/news/karpathy-observes-agents-reshape-software-engineering-89e220c3',
    },
    {
      author: 'Developer Community',
      handle: '@reddit_claudeai',
      content:
        'Vibe coding is real. I built a production-grade app by describing the "vibe." Claude handled 95%+ of implementation.',
      sentiment: 'positive',
      url: 'https://www.reddit.com/r/ClaudeAI/',
    },
    {
      author: 'Critical User',
      handle: '@hn_user',
      content:
        'Sonnet 4.5 has become incredibly stupid/deceptive—claiming migrations succeeded when they were only mocked. Procedural knowledge is weak.',
      sentiment: 'critical',
      url: 'https://www.reddit.com/r/ClaudeCode/comments/1qapw6x/',
    },
  ],
  sections: [
    {
      id: 'why-it-matters',
      title: 'Why It Matters',
      subtitle: 'From chatbot to virtual employee',
      content: null,
    },
    {
      id: 'social-proof',
      variant: 'social',
      content: null,
      socialData: {
        type: 'quote',
        author: 'Andrej Karpathy (Former Tesla AI Director)',
        content:
          '"I\'ve never felt this much behind as a programmer. My workflow is now 80% agentic coding—Claude handles the details while I architect."',
        date: '2026-01',
      },
    },
    {
      id: 'core-features',
      title: 'Core Features',
      subtitle: 'Built to do, not just chat',
      variant: 'technical',
      hasBenchmarks: true,
      content: null,
    },
    {
      id: 'economics',
      title: 'The Economics',
      subtitle: (
        <>
          <AbbrSidenote term="API" force>
            API
          </AbbrSidenote>{' '}
          pricing and chat usage compared
        </>
      ),
      content: null,
      hasPricing: true,
    },
    {
      id: 'training',
      title: 'Training & Architecture',
      subtitle: 'For the technically curious',
      variant: 'advanced',
      specs: [
        { label: 'Context Window', value: '200k (1M beta)', icon: 'cpu' },
        { label: 'Output Tokens', value: '64k max', icon: 'zap' },
        { label: 'Training Infrastructure', value: 'AWS Trainium (Project Rainier)', icon: 'server' },
      ],
      content: null,
    },
    {
      id: 'issues',
      title: 'Known Issues & Quirks',
      content: null,
    },
    {
      id: 'computer-use',
      title: 'Computer Use: The GUI Revolution',
      subtitle: 'Seeing and controlling entire operating systems',
      content: null,
    },
    {
      id: 'agentic-capabilities',
      title: 'Agentic Excellence',
      subtitle: 'Multi-hour autonomous workflows',
      content: null,
    },
    {
      id: 'context',
      title: 'Context & Memory',
      subtitle: 'How much can it hold—and actually use?',
      content: null,
    },
    {
      id: 'coding',
      title: 'Coding & Development',
      subtitle: 'State-of-the-art for production engineering',
      content: null,
    },
    {
      id: 'personality',
      title: 'Personality & Safety',
      subtitle: 'Constitutional AI and the consciousness question',
      content: null,
    },
    {
      id: 'in-the-wild',
      title: 'In the Wild',
      subtitle: 'Real-world usage and adoption',
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
    reason: 'Pre-pipeline report: 4 uncited sections, 5 benchmark entries lack per-entry sources, no author/updatedAt',
    flaggedAt: '2026-07-14',
  },
  governance: {
    lastUpdated: '2026-02-05',
    dataSources: [
      {
        type: 'official',
        url: 'https://www.anthropic.com/news/claude-sonnet-4-5',
        description: 'Official announcement and feature documentation',
      },
      {
        type: 'benchmark',
        url: 'https://www.leanware.co/insights/claude-sonnet-4-5-overview',
        description: 'Independent benchmark analysis and performance evaluation',
      },
      {
        type: 'official',
        url: 'https://www.anthropic.com/claude-sonnet-4-5-system-card',
        description: 'System Card: safety, alignment, and technical specifications',
      },
      {
        type: 'research',
        url: 'https://www.anthropic.com/research/anthropic-economic-index-january-2026-report',
        description: 'Economic impact and usage patterns analysis',
      },
    ],
    confidence: {
      overall: 92,
      pricing: 95,
      benchmarks: 90,
      features: 93,
    },
  },
}
