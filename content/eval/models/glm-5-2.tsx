import type { HttpsUrl, ModelProfile } from '@/lib/models/types'

// The Citation `url` is a branded https type constructed through the schema at
// registry load; this asserts the brand for the literal urls authored here.
const h = (u: string): HttpsUrl => u as HttpsUrl

// Primary sources reused across benchmark rows and analysis citations.
const SRC = {
  zaiBlog: h('https://z.ai/blog/glm-5.2'),
  zaiDocs: h('https://docs.z.ai/guides/llm/glm-5.2'),
  zaiPricing: h('https://docs.z.ai/guides/overview/pricing'),
  hfCard: h('https://huggingface.co/zai-org/GLM-5.2'),
  dataCamp: h('https://www.datacamp.com/blog/glm-5-2'),
  semgrep: h(
    'https://semgrep.dev/blog/2026/we-have-mythos-at-home-glm-52-beats-claude-in-our-cyber-benchmarks/'
  ),
  braintrust: h('https://www.braintrust.dev/blog/glm-52-vs-opus-48-long-context-retrieval'),
  artificialAnalysis: h('https://artificialanalysis.ai/models/glm-5-2'),
  siliconAngle: h(
    'https://siliconangle.com/2026/07/20/hugging-face-uses-open-weights-z-ai-glm-5-2-defend-attacker-commercial-frontier-model-refusal/'
  ),
  vllm: h('https://github.com/vllm-project/vllm/issues/46040'),
} as const

export const glm52: ModelProfile = {
  slug: 'glm-5-2',
  meta: {
    name: 'GLM 5.2',
    family: 'GLM',
    modelVersion: '5.2',
    nameOrder: 'family-version-variant',
    organizationId: 'zhipu',
    organization: 'Z.ai',
    // No dedicated GLM-5.2 icon set exists; point the card at the real in-repo
    // Z.ai vendor brand mark (public/icons/zai) rather than a bare placeholder.
    iconSlug: 'zai',
    providerRoute: 'z-ai/glm-5.2',
    releaseDate: '2026-06-16',
    releaseDateDisplay: 'June 2026',
    identity:
      'An MIT-licensed, open-weight Mixture-of-Experts model built for long-horizon agentic engineering — near-frontier coding and multi-hour autonomous tool use at a fraction of closed-model cost, shadowed by brittle tool-call parsing and heavy self-hosting requirements.',
    // Only proven positives are granted. Withheld on purpose (absence = "not
    // established", never "no"): vision / image-gen / video-gen / audio /
    // multimodal (text-only per docs.z.ai); search (no reliable first-party web
    // search — the model hallucinates a search tool); structured-output (the
    // picker evidence bar disqualifies it because documented tool-call
    // parsing-failure reports exist across vLLM, Cursor, and Fireworks —
    // see the tool-call-reliability section); agentic-swarm (thin evidence).
    tagIds: [
      'coding',
      'reasoning',
      'tool-use',
      'function-calling',
      'visible-reasoning',
      'text',
      'moe',
      'open-weights',
      'commercial',
      'cost-efficient',
      'ultra',
      'output-128k',
      'api',
      'cloud',
      'local',
    ],
    specChips: ['~753B Total / ~40B Active', '1M Context', 'MIT License'],
    links: {
      chat: 'https://chat.z.ai',
      blog: 'https://z.ai/blog/glm-5.2',
      docs: 'https://docs.z.ai/guides/llm/glm-5.2',
      api: 'https://docs.z.ai/guides/develop/http/introduction',
      weights: 'https://huggingface.co/zai-org/GLM-5.2',
      github: 'https://github.com/zai-org/GLM-5',
      paper: 'https://arxiv.org/abs/2602.15763',
      pricing: 'https://docs.z.ai/guides/overview/pricing',
    },
    // Z.ai first-party API rates. Third-party providers (OpenRouter routers such
    // as DeepInfra/NovitaAI) list ~$0.95 in / ~$3.00 out — see pricingSources.
    apiRates: {
      input: 1.4,
      output: 4.4,
      cachedInput: 0.26,
      unit: 'per million tokens',
      provider: 'Z.ai',
    },
    pricingSources: [
      {
        label: 'Z.ai official pricing',
        href: 'https://docs.z.ai/guides/overview/pricing',
        provider: 'Z.ai',
      },
      {
        label: 'OpenRouter (third-party providers, ~$0.95/$3.00)',
        href: 'https://openrouter.ai/z-ai/glm-5.2',
        provider: 'OpenRouter',
      },
    ],
  },
  analysis: {
    strengths: [
      {
        claim: 'First open-weight model to convincingly beat frontier on SWE-bench Pro',
        status: 'observed',
        detail: 'SWE-bench Pro 62.1% vs GPT-5.5 58.6% (vendor-reported via DataCamp).',
        source: { url: SRC.dataCamp, label: 'DataCamp: GLM-5.2', kind: 'press' },
      },
      {
        claim: 'MIT-licensed weights self-host in air-gapped, uncensored environments',
        detail:
          'Hugging Face (zai-org/GLM-5.2) and ModelScope publish downloadable MIT weights; Hugging Face self-hosted GLM-5.2 to analyze a hostile payload commercial models refused.',
        source: { url: SRC.siliconAngle, label: 'SiliconANGLE', kind: 'press' },
      },
      {
        claim: 'Usable 1M context: flat AST retrieval from 25K to 50K tokens',
        status: 'observed',
        detail: 'Braintrust exact-AST retrieval held statistically flat (83.3% → 84.5%) across that range.',
        source: { url: SRC.braintrust, label: 'Braintrust', kind: 'benchmark' },
      },
      {
        claim: 'Elite long-horizon agentic execution across multi-hour autonomous runs',
        caveat: 'Conservative agent behavior — takes the longer, safer path to the objective.',
        source: {
          url: h('https://x.com/cedric_chee/status/2070223250035224908'),
          label: '@cedric_chee',
          kind: 'community',
        },
      },
      {
        claim: 'Roughly one-fifth to one-sixth the per-token cost of closed frontier',
        detail: 'Z.ai API $1.40 in / $4.40 out; cached input $0.26 per Mtok.',
        source: { url: SRC.zaiPricing, label: 'Z.ai pricing', kind: 'vendor-docs' },
      },
      {
        claim: 'Independent Semgrep audit confirms genuine multi-hop tool reasoning',
        status: 'observed',
        detail:
          '39% F1 on IDOR detection with a bare Pydantic-AI harness, beating Claude Opus 4.6 (32%); perfect counterfactual/selectivity scores.',
        source: { url: SRC.semgrep, label: 'Semgrep', kind: 'benchmark' },
      },
      {
        claim: 'Visible reasoning traces: thinks out loud, corrects mid-stream',
        detail: 'Reasoning depth is developer-controlled via the reasoning_effort API parameter.',
        source: {
          url: h('https://x.com/volatilemarkts/status/2078861845645922534'),
          label: '@volatilemarkts',
          kind: 'community',
        },
      },
    ],
    weaknesses: [
      {
        claim: 'Brittle tool-call parsing across vLLM, Cursor, and Fireworks',
        status: 'observed',
        detail:
          'vLLM issue #46040: raw tool-call XML leaks into reasoning tags and never parses, aborting the agentic loop.',
        source: { url: SRC.vllm, label: 'vLLM #46040', kind: 'community' },
      },
      {
        claim: 'Hallucinates tool execution and fabricates search results when sandboxed',
        status: 'observed',
        detail:
          'Without a tethered tool, the model claims a "Google search tool," simulates latency, and returns fabricated results with full confidence.',
        source: { url: SRC.zaiDocs, label: 'Z.ai docs', kind: 'vendor-docs' },
      },
      {
        claim: 'Severe latency tails under shared load, peaking near 26 seconds',
        status: 'observed',
        detail: 'Of 300 requests, 36 exceeded 10s and the maximum hit 25.9s; TTFT can still be 778ms.',
        source: { url: SRC.artificialAnalysis, label: 'Artificial Analysis', kind: 'benchmark' },
      },
      {
        claim: 'Text-only: no native vision, image, audio, or video',
        detail: 'Visual/image/video workloads must route to separate models (GLM-5V-Turbo, GLM-Image, Ying).',
        source: { url: SRC.zaiDocs, label: 'Z.ai docs', kind: 'vendor-docs' },
      },
      {
        claim: 'Self-hosting needs 200GB+ VRAM; consumer hardware is impractical',
        detail: 'A 4-bit quant on a 132GB workstation crawled at 0.15–0.5 tok/s; practical serving wants an 8xH200 node.',
        source: {
          url: h('https://www.reddit.com/r/LocalLLaMA/comments/1urhzox/glm52_fearmongering_in_the_press/'),
          label: 'r/LocalLLaMA',
          kind: 'community',
        },
      },
      {
        claim: 'Max reasoning can burn 45K tokens before writing code',
        caveat: 'Developers routinely downgrade to the "high" effort tier for usable latency.',
        source: {
          url: h('https://news.ycombinator.com/item?id=48709670'),
          label: 'Hacker News',
          kind: 'community',
        },
      },
      {
        claim: 'Conservative and uninspired; rarely shows initiative or explores',
        detail: 'A "sir yes sir" workhorse — reliable in autonomous loops, weak as a brainstorming partner.',
        source: {
          url: h('https://x.com/teortaxesTex/status/2069111168136782245'),
          label: '@teortaxesTex',
          kind: 'community',
        },
      },
    ],
    unknowns: [
      {
        claim: 'Exact parameter count disputed: 744B, 745B, or 753B total',
        detail: 'Z.ai docs say 744B/40B; the promo domain 745B/44B; HF/ModelScope/NVIDIA 753B/40B.',
        source: { url: SRC.hfCard, label: 'Hugging Face model card', kind: 'vendor-docs' },
      },
      {
        claim: 'Retrieval accuracy at the full 1M boundary is unpublished',
        caveat: 'Third-party tests suggest recall drops toward ~71% at maximum capacity, pending vetting.',
      },
      {
        claim: 'Benchmarks lean vendor-reported; no neutral head-to-head suite exists',
        status: 'inferred',
        caveat: 'No independent evaluator runs GLM-5.2 and its rivals side-by-side under identical conditions.',
      },
      {
        claim: 'Structured-output reliability unproven; parsing failures disqualify the tag',
        status: 'inferred',
        detail:
          'Vendor docs advertise JSON/structured output, but concrete parsing-failure reports across serving stacks fail the picker evidence bar, so the tag is withheld.',
      },
    ],
  },
  intro: {
    text:
      'GLM 5.2 is Z.ai’s (formerly Zhipu AI) flagship open-weight model, released under an MIT license on June 16, 2026 after a June 13 soft rollout to GLM Coding Plan subscribers. It is a sparse Mixture-of-Experts architecture — roughly 753B total parameters with about 40B active per token — engineered for long-horizon agentic engineering: a truly usable 1M-token context, DeepSeek Sparse Attention with cross-layer IndexShare, and developer-controlled reasoning depth. Its headline claim is that an open-weight model can now match or narrowly trail closed frontier systems on hours-long autonomous coding work while costing a fifth to a sixth as much. That triumph is real, and it is shadowed by an equally real contradiction: elite raw capability packaged in tool-call output that serving stacks parse unreliably, plus latency tails and VRAM demands that make it a workhorse for asynchronous, self-hosted loops rather than synchronous, user-facing pipelines.',
  },
  chatLimits: [
    {
      name: 'GLM Coding Plan',
      // Weekly prompt quotas; sourced from a secondary aggregator and not
      // independently cross-checked against Z.ai's subscription page — treat as
      // medium confidence (see the economics section's provenance sidenote).
      tiers: [
        { label: 'Lite', maxMsgs: 400, price: '$18/mo' },
        { label: 'Pro', maxMsgs: 2000, price: '$72/mo' },
        { label: 'Max', maxMsgs: 8000, price: '$160/mo' },
      ],
    },
  ],
  benchmarks: [
    {
      name: 'Terminal-Bench 2.1',
      score: 81.0,
      maxScore: 100,
      comparison: 'Claude Opus 4.8: 85.0 (vendor/DataCamp)',
      source: SRC.dataCamp,
    },
    {
      name: 'SWE-bench Pro',
      score: 62.1,
      maxScore: 100,
      comparison: 'GPT-5.5: 58.6 (vendor/DataCamp)',
      source: SRC.dataCamp,
    },
    {
      name: 'FrontierSWE',
      score: 74.4,
      maxScore: 100,
      comparison: 'Claude Opus 4.8: 75.1 (vendor)',
      source: SRC.zaiBlog,
    },
    {
      name: "Humanity's Last Exam (w/ tools)",
      score: 54.7,
      maxScore: 100,
      comparison: 'GPT-5.5: 41.4 (vendor self-reported)',
      source: SRC.hfCard,
    },
    {
      name: 'PostTrainBench',
      score: 34.3,
      maxScore: 100,
      comparison: 'GPT-5.5: 25.0 (vendor)',
      source: SRC.zaiBlog,
    },
    {
      name: 'IDOR F1 (Semgrep, bare harness)',
      score: 39,
      maxScore: 100,
      comparison: 'Claude Opus 4.6: 32 (independent)',
      source: SRC.semgrep,
    },
  ],
  sentimentFeed: [
    {
      author: 'Alper Tunga',
      handle: '@altudev',
      sentiment: 'positive',
      content:
        'It just completed a full end-to-end field removal in one shot. DB schemas, validation schemas, services, routes, frontend pages, components, unit tests, integration tests, and e2e tests... all of it. At once. Wild.',
      url: 'https://x.com/altudev/status/2065868921341632881',
      date: 'Jun 13, 2026',
    },
    {
      author: 'Itamar Golan',
      handle: '@ItakGol',
      sentiment: 'positive',
      content:
        'I think GLM 5.2 is the first real "oh shit" moment for frontier AI labs from the open model world. Not because it’s better than Opus or GPT. It’s not. But... I used a public open model across different real tasks and didn’t immediately feel the gap. Suddenly, open models are not a hobbyist narrative. They are a CFO conversation.',
      url: 'https://x.com/ItakGol/status/2068447042985414769',
      date: 'Jun 20, 2026',
    },
    {
      author: 'cedric',
      handle: '@cedric_chee',
      sentiment: 'neutral',
      content:
        'Its long-horizon execution is close to GPT-5.5 medium. The biggest difference is its agent behavior: GLM-5.2 is much more conservative, so it tends to take a longer path to the objective. Once you understand its quirks, it’s remarkably capable.',
      url: 'https://x.com/cedric_chee/status/2070223250035224908',
      date: 'Jun 25, 2026',
    },
    {
      author: 'Teortaxes',
      handle: '@teortaxesTex',
      sentiment: 'critical',
      content:
        'One strange impression I got about GLM 5.2 is that it feels… uninspired. It’s a "sir yes sir" model, a good one... But it’s unlikely to show initiative and explore new directions. Safe, but boring.',
      url: 'https://x.com/teortaxesTex/status/2069111168136782245',
      date: 'Jun 22, 2026',
    },
    {
      author: 'Ben Davis',
      handle: '@davis7',
      sentiment: 'neutral',
      content:
        'It’s a great model. Still clearly not Claude/GPT level, but by far the closest I’ve felt. It’s very capable... Handles sub agents well, is really fast, asks good questions, can actually run for a long time without imploding. I could actually use this.',
      url: 'https://x.com/davis7/status/2067867580686389496',
      date: 'Jun 19, 2026',
    },
    {
      author: 'merve',
      handle: '@mervenoyann',
      sentiment: 'positive',
      content:
        'our infra team uncovered this and used GLM-5.2 to fix because OpenAI’s model would refuse to do it',
      url: 'https://x.com/mervenoyann/status/2079682903487746551',
      date: 'Jul 21, 2026',
    },
    {
      author: 'Volatile Markets',
      handle: '@volatilemarkts',
      sentiment: 'positive',
      content:
        'GLM-5.2 reasons out loud. Watching its think-trace, you see it flinch, catch itself, and correct forward — in view, not hidden behind a polished final answer. That transparency is the whole feeling.',
      url: 'https://x.com/volatilemarkts/status/2078861845645922534',
      date: 'Jul 19, 2026',
    },
    {
      author: 'a-wiseman-speaketh',
      handle: 'r/LocalLLaMA',
      sentiment: 'critical',
      content:
        'Very, very, few people have the 200+ GB of VRAM needed to run the quantised versions of this locally at any usable speed. It’s like saying supercars are dangerous because anyone with a driving license could legally drive one. Technically correct, but kind of deliberately obscures the reality.',
      url: 'https://www.reddit.com/r/LocalLLaMA/comments/1urhzox/glm52_fearmongering_in_the_press/',
      date: 'Jul 2026',
    },
  ],
  sections: [
    {
      id: 'why-it-matters',
      title: 'Why It Matters',
      subtitle: 'The First Open-Weight Reckoning',
      content: null,
      socialData: {
        type: 'tweet',
        author: 'merve',
        handle: '@mervenoyann',
        date: 'Jul 21, 2026',
        content:
          'our infra team uncovered this and used GLM-5.2 to fix because OpenAI’s model would refuse to do it',
        url: 'https://x.com/mervenoyann/status/2079682903487746551',
      },
    },
    {
      id: 'economics',
      title: 'The Economics',
      subtitle: 'Token Pricing, Third-Party Floors, and the Coding Plan',
      content: null,
      hasPricing: true,
      socialData: {
        type: 'tweet',
        author: 'Itamar Golan',
        handle: '@ItakGol',
        date: 'Jun 20, 2026',
        content:
          'Proper inference may require something like 8 Nvidia H200s, around $400K to buy or $20K/month to rent. But compare that to enterprises paying millions a month to closed labs. Suddenly, open models are not a hobbyist narrative. They are a CFO conversation.',
        url: 'https://x.com/ItakGol/status/2068447042985414769',
      },
    },
    {
      id: 'architecture-and-context',
      title: 'Architecture & Context',
      subtitle: 'Sparse Attention, IndexShare, and a Usable Million Tokens',
      variant: 'advanced',
      specs: [
        { label: 'Total Params', value: '~753B', icon: 'cpu' },
        { label: 'Active Params', value: '~40B', icon: 'zap' },
        { label: 'Context', value: '1M', icon: 'layers' },
        { label: 'Max Output', value: '128K', icon: 'file-text' },
      ],
      content: null,
    },
    {
      id: 'coding-and-agentic-capabilities',
      title: 'Coding & Agentic Capabilities',
      subtitle: 'Project-Level Takeovers and Multi-Hour Autonomy',
      hasBenchmarks: true,
      content: null,
      socialData: {
        type: 'tweet',
        author: 'Alper Tunga',
        handle: '@altudev',
        date: 'Jun 13, 2026',
        content:
          'It just completed a full end-to-end field removal in one shot. DB schemas, validation schemas, services, routes, frontend pages, components, unit tests, integration tests, and e2e tests... all of it. At once. Wild.',
        url: 'https://x.com/altudev/status/2065868921341632881',
      },
    },
    {
      id: 'tool-call-reliability',
      title: 'Tool-Call Reliability',
      subtitle: 'Where Reasoning Meets Execution — and Sometimes Breaks',
      content: null,
    },
    {
      id: 'issues',
      title: 'Known Issues & Quirks',
      subtitle: 'The Friction Tax on a Frontier Workhorse',
      content: null,
    },
    {
      id: 'verdict',
      title: 'The Verdict',
      content: null,
    },
  ],
  author: 'GLM 5.2',
  updatedAt: '2026-07-22',
  editorial: {
    status: 'current',
  },
  governance: {
    lastUpdated: '2026-07-22',
    dataSources: [
      {
        type: 'official',
        url: 'https://z.ai/blog/glm-5.2',
        description: 'Z.ai GLM-5.2 release blog and technical notes',
      },
      {
        type: 'official',
        url: 'https://docs.z.ai/guides/llm/glm-5.2',
        description: 'Z.ai GLM-5.2 model documentation (context, output, pricing, capabilities)',
      },
      {
        type: 'model-card',
        url: 'https://huggingface.co/zai-org/GLM-5.2',
        description: 'Hugging Face model card (weights, architecture, self-reported benchmarks)',
      },
      {
        type: 'benchmark',
        url: 'https://semgrep.dev/blog/2026/we-have-mythos-at-home-glm-52-beats-claude-in-our-cyber-benchmarks/',
        description: 'Semgrep independent IDOR / tool-use evaluation',
      },
    ],
    confidence: {
      overall: 78,
      pricing: 85,
      benchmarks: 65,
      features: 80,
    },
  },
}
