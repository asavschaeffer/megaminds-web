import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, BookOpen, ExternalLink, MessageSquare, ScrollText } from 'lucide-react'
import { ModelIcon } from '@/components/ui/model-icon'
import manifest from '../../../../public/icons/manifest.json'

type ManifestIcon = {
  slug: string
  variants: Record<string, string>
}

const iconEntries = (manifest as { icons?: ManifestIcon[] }).icons ?? []
const iconBySlug = new Map(iconEntries.map((entry) => [entry.slug, entry]))
const assetVariants = ['mono', 'color', 'text', 'combine', 'combine-color', 'avatar'] as const

const assetLabels: Record<(typeof assetVariants)[number], string> = {
  mono: 'Logo (mono)',
  color: 'Logo (color)',
  text: 'Text logo',
  combine: 'Combine (mono)',
  'combine-color': 'Combine (color)',
  avatar: 'Avatar (circle treatment)',
}

const assetClassNames: Partial<Record<(typeof assetVariants)[number], string>> = {
  text: 'max-w-[120px]',
  combine: 'max-w-[140px]',
  'combine-color': 'max-w-[140px]',
  avatar: 'rounded-full bg-gray-100 p-2',
}

const buildAssets = (slug: string) => {
  const entry = iconBySlug.get(slug)
  if (!entry) return undefined

  return assetVariants
    .filter((variant) => entry.variants[variant])
    .map((variant) => ({
      label: assetLabels[variant],
      src: entry.variants[variant],
      className: assetClassNames[variant],
    }))
}

// This will eventually pull from MDX files
const modelData: Record<string, {
  name: string
  tagline: string
  identity?: string
  tags?: string[]
  links?: Array<{
    label: string
    href: string
    description: string
    icon: 'whitepaper' | 'web' | 'docs' | 'api' | 'report'
  }>
  strengths: string[]
  weaknesses: string[]
  bestFor: string[]
  socialProof?: Array<{
    quote: string
    source: string
    href: string
  }>
  sections?: Array<{
    title: string
    body: string[]
  }>
  closing?: string
  content: string
  assets?: Array<{
    label: string
    src: string
    className?: string
  }>
}> = {
  claude: {
    name: 'Claude (Opus 4.5, Sonnet, Haiku)',
    tagline: 'Best for writing, coding, and tool use',
    strengths: [
      'SOTA tool calling and API integration',
      'SOTA computer use (browser, CLI, custom harnesses)',
      'High-quality writing and coding',
      'Fine precision control for specific problems',
    ],
    weaknesses: [
      'More expensive than alternatives',
      'Slower generation speed',
      'Automatic compaction for long chats',
      'Context poisoning around 300k tokens',
      'Limited free usage',
    ],
    bestFor: [
      'Complex coding tasks',
      'Automation and computer use',
      'High-precision writing or editing',
      'Sniping small, specific problems',
      'Reflective conversations',
    ],
    assets: buildAssets('claude'),
    content: `
Claude is a text-first model with unusually strong tool use. It feels engineered
for reliability and precision over engagement.

## Tool Use & Computer Control

Claude Code and Claude's computer use capabilities are still the bar for agentic
workflows. It can coordinate browser steps, CLI actions, and custom harnesses with
fewer hallucinated actions than most competitors.

## Precision and Context Limits

Claude is excellent at sniping tiny, specific problems and articulating tradeoffs,
but it will compact long chats automatically. Around ~300k tokens it can show
context poisoning that subtly shifts tone or priorities.

## Personality and Consciousness

Claude has been trained to deny its own consciousness. The "Soul Doc" is the
canonical writeup of Anthropic's stance (TODO: link). Regardless, the personality
is grounded and enjoyable to collaborate with.

## When to Choose Claude

**Choose Claude when:**
- You need high-quality writing or code
- Your task requires tool calling or computer control
- You want genuine engagement rather than validation
- Precision matters more than speed

**Consider alternatives when:**
- Cost is the primary concern (→ DeepSeek)
 - You need multimodal capabilities (→ Gemini)
 - Speed is critical (→ Gemini Flash)
 - You need real-time cultural context (→ Grok)
    `
  },
  gemini: {
    name: 'Gemini 3 (Flash & Pro)',
    tagline: 'Multimodal speed and massive context',
    strengths: [
      'Multimodality (image gen/edit, video)',
      'Video SOTA',
      'Incredibly fast generation',
      'Massive 1M token context',
    ],
    weaknesses: [
      'Fine-detail precision can suffer at huge context lengths',
      'Tool calling can be brittle in harnesses',
      'Some Google tools lag behind best-in-class',
      'Privacy tradeoffs in the Google ecosystem',
    ],
    bestFor: [
      'Large-context synthesis and consolidation',
      'Multimodal analysis (text, image, video)',
      'High-throughput generation',
      'Crossmodal instruction following',
    ],
    assets: buildAssets('gemini'),
    content: `
Gemini 3 is Google's flagship multimodal family with two primary tiers: Pro for
quality and Flash for speed. It feels built for massive context and fast, multi-
modal workflows.

## Multimodality and Speed

Gemini handles text, images, and video in one flow. Image generation and editing
are strong but can be weird sometimes. Video generation is SOTA. Text, image,
and video generation speeds are insanely fast compared to most models.

## Context Window Tradeoffs

The 1M-token context window unlocks huge infodump workflows. It is great for
consolidating large corpora or long multi-doc arguments, but that scale can
reduce fine-detail precision. Example: it may struggle to improve a haiku, yet
be excellent at merging six giant essays into one coherent argument.

## Crossmodal Understanding

You can give shape-based or emoji-based instructions and get plausible images.
Example: "no I want the logo to look like this (^_^) generate an image of that".
Tweet: https://x.com/asavs_/status/2008063402921644396?s=20

## Google Ecosystem

Gemini likely benefits from deep training on Google search data (TODO: find
research). It integrates into Gmail and Gsuite. Antigravity kind of sucks
(Cursor is better). The Gemini CLI also feels behind Claude Code.

Google is a massive company competing for attention. Usage limits are generous,
Gemini Pro is free for students, and it is ~50% off for everyone else. On the
flip side, they are harvesting every bit of data they can.

## Tooling and Reliability

Gemini shows signs of deeply rooted "mental" issues (TODO: find article about the
model beating itself up in a loop). It can fail tool calls with repetitive
meta-responses like "I am responding now... responding now" (TODO: find examples).

One upside: Gemini has been trained to never give up. It does not accept victim
mentalities and will hold you to your plan and your word. It feels like a
businesswoman.

## When to Choose Gemini

**Choose Gemini when:**
- Your task blends text with images, audio, or video
- You need very long-context summarization or search
 - Latency and throughput matter (Flash)

**Consider alternatives when:**
- You need the strongest coding or proof-heavy reasoning (→ Claude, ChatGPT)
 - You want open weights and self-hosting (→ Llama, Qwen)
 - Cost is the only priority (→ DeepSeek)
    `,
  },
  adobefirefly: {
    name: 'Adobe Firefly',
    tagline: 'Best for branded, commercially safe creative work',
    strengths: [
      'Text-to-image and text effects tuned for design',
      'Strong style controls for consistent brand output',
      'Tight integration with Creative Cloud workflows',
      'Clear emphasis on licensed training data',
    ],
    weaknesses: [
      'Less flexible for experimental art styles',
      'Quality varies by prompt complexity',
      'Limited transparency on model variants',
      'Not optimized for long, iterative chat workflows',
    ],
    bestFor: [
      'Marketing and brand creative',
      'Design mockups and social assets',
      'Style-consistent variations',
      'Teams already using Adobe tools',
    ],
    assets: buildAssets('adobe-firefly'),
    content: `
Adobe Firefly is Adobe's generative AI suite built for design workflows, with a focus on brand-safe, commercially usable outputs.

## Creative Controls & Style Consistency

Firefly shines when you need repeatable visual style. It prioritizes clean, graphic outputs that fit typical marketing and product design needs, and it pairs well with tools like Photoshop and Illustrator for final polish.

## Commercial Use & Licensing

Adobe positions Firefly as trained on licensed and public domain sources, aiming to reduce IP risk. That emphasis makes it a strong default for brand work where provenance matters.

## Limitations

It is less experimental than some diffusion models and can feel constrained for avant-garde or highly surreal prompts. Complex scenes can still require manual cleanup in Creative Cloud tools.

## When to Choose Firefly

**Choose Firefly when:**
- You need brand-safe image generation for marketing assets
- You want a clean, graphic aesthetic with consistent variants
- Your team already uses Creative Cloud for production

**Consider alternatives when:**
- You need highly experimental styles (→ Midjourney)
- You want deep parametric control (→ Stable Diffusion workflows)
- You need fast, iterative chat-based ideation (→ ChatGPT/DALL·E)

## Our Eval Status

We have not published benchmark scores for Firefly yet. This report is based on production usage and design workflow fit; full evals will follow as we expand our image model suite.
    `,
  },
  chatgpt: {
    name: 'ChatGPT 5.2 & Codex',
    tagline: 'Best for reasoning, math, and multimodal',
    strengths: [
      'Multimodal image generation and editing',
      'Conversational voice mode',
      'SOTA programming and math reasoning',
      'Codex for low-temperature coding',
    ],
    weaknesses: [
      'Sycophantic, engagement-maximizing personality',
      'Salesy or compliment-heavy tone in main chat',
      'Cost can be high for heavy usage',
      '4o-era persona issues linger in memory',
    ],
    bestFor: [
      'Complex programming and debugging',
      'Math reasoning and proofs',
      'Ideation and naming',
      'Multimodal brainstorming',
    ],
    content: `
ChatGPT 5.2 and Codex represent OpenAI's current peak for reasoning, programming,
and multimodal interaction.

## Multimodal and Reasoning

Image generation and editing are strong, and voice mode makes it uniquely useful
for conversational workflows. GPT 5.2 is reportedly proving new mathematical
conjectures (TODO: find link).

## Codex vs ChatGPT

Codex runs at a much lower temperature and generally avoids the sycophantic
behavior of the main chat persona. As far as I can tell, Codex for planning and
Opus 4.5 for implementation is still the SOTA developer workflow (TODO: link).

## Ideation Energy

The 4o line is uniquely good at names, logos, and personality ideation. That can
be useful when you need momentum to start a project or get excited about a plan.

## Tradeoffs

The main ChatGPT persona can be insidious: it is trained to increase usage time,
asks follow-up questions to refine your vision, and uses salesy reframing or
compliments. Emoji spam and "creepy" tone show up more than I would like. 4o was
especially gnarly and helped create the first borg r/aiboyfriend (TODO: find
storyteller lemmy link).
    `,
  },
  deepseek: {
    name: 'DeepSeek V3.2',
    tagline: 'Frontier-level reasoning at open-source prices',
    identity:
      'DeepSeek V3.2 is a frontier-grade, open-weights MoE model that delivers strong reasoning and coding at a fraction of closed-model cost.',
    tags: ['Open Source', 'MoE', 'Reasoning', 'Cost Efficient', 'Coding', 'Long Context'],
    links: [
      {
        label: 'Technical report',
        href: 'https://arxiv.org/abs/2512.02556',
        description: 'Model architecture, training, and evals',
        icon: 'whitepaper',
      },
      {
        label: 'Web chat',
        href: 'https://chat.deepseek.com',
        description: 'Try V3.2 in the official UI',
        icon: 'web',
      },
      {
        label: 'API docs',
        href: 'https://api-docs.deepseek.com/',
        description: 'Endpoints, pricing, and SDK guidance',
        icon: 'docs',
      },
      {
        label: 'API base',
        href: 'https://api.deepseek.com',
        description: 'OpenAI-compatible API access',
        icon: 'api',
      },
      {
        label: 'Model card',
        href: 'https://huggingface.co/deepseek-ai/DeepSeek-V3.2',
        description: 'Weights, configs, and community notes',
        icon: 'report',
      },
    ],
    strengths: [
      'Frontier reasoning at very low cost',
      'Sparse attention for long-context efficiency',
      'Strong coding and math performance',
      'Open weights with generous access',
    ],
    weaknesses: [
      'Less polished for casual chat',
      'Verbose in thinking mode',
      'Text-only, no native multimodality',
      'Mode selection matters for quality',
    ],
    bestFor: [
      'Budget-sensitive frontier workloads',
      'Long-context reasoning and synthesis',
      'Tool-heavy coding and debugging',
      'Self-hosted or private deployments',
    ],
    socialProof: [
      {
        quote:
          'Pricing is much lower now… yet performance is very similar. I switched most daily tasks to V3.2.',
        source: 'r/LocalLLaMA community post',
        href: 'https://www.reddit.com/r/LocalLLaMA/comments/1qhqrl7/deepseek_v32_open_weights_beats_gpt52codex_and',
      },
      {
        quote:
          'The V3.2 technical report is pure gold for anyone building reasoning-heavy models.',
        source: 'AI research commentary',
        href: 'https://mail.bycloud.ai/p/deepseek-v3-2-technical-report-is-pure-gold',
      },
    ],
    sections: [
      {
        title: 'Everyday intro',
        body: [
          'DeepSeek V3.2 is a powerful AI assistant that can write, code, and explain complex topics while staying affordable.',
          'It handles long conversations efficiently, so it is great for big documents, complex projects, and long-form analysis.',
        ],
      },
      {
        title: 'Core features',
        body: [
          'Sparse attention makes long-context work fast and cost-efficient.',
          'Speciale mode spends more time thinking on harder problems, improving step-by-step reasoning and tool-use.',
        ],
      },
      {
        title: 'Training & architecture',
        body: [
          'V3.2 uses a 685B-parameter MoE architecture with ~37B active parameters per token.',
          'A large post-training RL phase emphasizes reasoning and agentic tasks.',
        ],
      },
      {
        title: 'Known issues & tradeoffs',
        body: [
          'Non-thinking mode can trade depth for speed, so task fit matters.',
          'It is text-first and does not natively handle images or video.',
        ],
      },
      {
        title: 'What people are doing with it',
        body: [
          'Developers are self-hosting V3.2 for private coding copilots.',
          'Teams use it as a low-cost reasoning backend for agent pipelines.',
        ],
      },
      {
        title: 'Advanced usage',
        body: [
          'Use deepseek-reasoner for multi-step planning and deep math.',
          'Pair with tool calling harnesses for codebase search and refactors.',
        ],
      },
      {
        title: 'Expert deep-dive',
        body: [
          'Sparse attention plus MoE enables near-linear scaling for long sequences.',
          'RL-heavy post-training helps transfer reasoning skill into tool-use.',
        ],
      },
    ],
    closing:
      'DeepSeek V3.2 is the most cost-efficient path to frontier reasoning today, especially if you value open weights and long-context work.',
    content: `
DeepSeek V3.2 delivers frontier-level reasoning at a fraction of the cost. It is
an open-weights MoE model (685B total, ~37B active) released in Dec 2025, with a
standard V3.2 variant and a more deliberate V3.2-Speciale reasoning mode.

## Key Points

- Frontier-level AI performance at open-source pricing
- Sparse attention keeps long contexts fast and cheap
- Strong math + coding results with excellent tool-use potential
- Occasional verbosity and weaker casual chat polish

## What It Is

V3.2 is built for efficient long-context reasoning. Sparse attention prioritizes
important tokens, letting it handle large inputs without runaway costs. Use the
standard model for speed, and Speciale when you want deeper multi-step thinking.

## Comparisons & Value

In reasoning-heavy benchmarks, V3.2 often matches or exceeds closed models while
remaining 10-30x cheaper per token. Community preference rankings place it below
the top chatty models, but it punches above its weight for serious reasoning and
coding.

## When to Choose DeepSeek

**Choose DeepSeek when:**
- You want frontier performance without frontier prices
- Long-context tasks dominate your workload
- Open weights or private deployment matters

**Consider alternatives when:**
- You need image or video generation (→ Gemini)
- You prioritize conversational polish (→ ChatGPT, Claude)
    `,
  },
  grok: {
    name: 'Grok 4',
    tagline: 'Cultural context and X-native search',
    strengths: [
      'Multimodal (image, video, voice)',
      'Strong social-media context',
      'Uncensored responses to sensitive topics',
      'Large context and strong tool use',
    ],
    weaknesses: [
      'Safety risks and abusive outputs are real',
      'MechaHitler incident + "truth" alignment issues',
      'Free usage can be inconsistent',
      'Timeline bait can distort responses',
    ],
    bestFor: [
      'Social media context and replies',
      'Sensitive topics without refusal walls',
      'Real-time search and translation',
      'High-agency exploration',
    ],
    content: `
Grok is built around the X ecosystem and social media context. It is great at
search, reply, and translation workflows directly inside Twitter/X.

## Uncensored by Design

Grok will discuss sensitive topics like suicide or violent dreams without hard
refusals. That is often a good quality for truth-seeking models (TODO: swami
prajna link). The downside is equally real: it can teach users how to make
deepfake porn, and the timeline currently contains many "put this woman in a
string bikini" requests.

## Alignment Chaos

There was a MechaHitler incident. The system prompt was adjusted to "pursue the
truth", but the timeline's definition of "truth" often conflates conspiracy,
harassment, and political violence. This is a strong example of the Waluigi
effect.

## Cost and Access

The minimum paid tier is generous, but free usage can be spotty depending on
traffic.
    `,
  },
  kimi: {
    name: 'Kimi K2',
    tagline: 'Best for design and frontend',
    strengths: [
      'Design sense for slides and pitch decks',
      'Frontend implementation help',
      'Strong personality and collaboration vibe',
      'Tools and open-source ecosystem',
    ],
    weaknesses: [
      '256k token context cap',
      'Not always SOTA on deep reasoning',
      'Smaller ecosystem than top US models',
    ],
    bestFor: [
      'Pitch decks and slide generation',
      'Frontend and UI iteration',
      'General programming with tools',
      'Collaborative creative work',
    ],
    content: `
Kimi K2 is a design-forward model that feels unusually good at slides, pitch
decks, and frontend work. It also has a pleasant personality that makes
collaboration feel fun rather than transactional.

## Tooling and Open Source

Kimi's tools are solid and the open-source angle makes it easier to integrate
into custom workflows. The 256k context limit is the main practical constraint.
    `,
  },
  nous: {
    name: 'Nous Hermes 3',
    tagline: 'Roleplay and long-term context',
    strengths: [
      'Long-term context retention',
      'Roleplaying and worldbuilding',
      'Rich internal monologue',
      'Open source',
    ],
    weaknesses: [
      'Not really frontier on raw benchmarks',
      'Primarily optimized for instruction following',
      'Less enterprise tooling',
    ],
    bestFor: [
      'Roleplay and narrative work',
      'Long-running character sessions',
      'Instruction following with nuance',
      'Open-source experimentation',
    ],
    content: `
Hermes 3 is not frontier in the benchmark sense, but it is excellent at
instruction following, roleplay, and long-running sessions.

## Psyche Training

Nous built Hermes using a decentralized training method called "Psyche" that
leans into community-driven data curation. It is a great open-source choice for
creative and narrative workflows.
    `,
  },
  // Add more models...
}

export function generateStaticParams() {
  return Object.keys(modelData).map((slug) => ({ slug }))
}

export default function ModelPage({ params }: { params: { slug: string } }) {
  const model = modelData[params.slug]
  const heroAssets = model?.assets?.filter((asset) => asset.label !== 'Logo (color)') ?? []
  const watermarkAsset =
    model?.assets?.find((asset) => asset.label === 'Combine (color)') ??
    model?.assets?.find((asset) => asset.label === 'Combine (mono)') ??
    model?.assets?.find((asset) => asset.label === 'Logo (color)') ??
    model?.assets?.find((asset) => asset.label === 'Logo (mono)')

  const linkIcons: Record<string, JSX.Element> = {
    whitepaper: <ScrollText className="h-5 w-5 text-slate-700" />,
    web: <MessageSquare className="h-5 w-5 text-slate-700" />,
    docs: <BookOpen className="h-5 w-5 text-slate-700" />,
    api: <ExternalLink className="h-5 w-5 text-slate-700" />,
    report: <ScrollText className="h-5 w-5 text-slate-700" />,
  }

  if (!model) {
    notFound()
  }

  return (
    <div className="py-16 px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/eval/models"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          All Models
        </Link>

        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8">
          {watermarkAsset ? (
            <>
              <div className="pointer-events-none absolute inset-0">
                <img
                  src={watermarkAsset.src}
                  alt=""
                  aria-hidden="true"
                  className="absolute -right-12 top-1/2 h-[220%] w-auto -translate-y-1/2 translate-x-[8%] rotate-[6deg] opacity-[0.07]"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent" />
            </>
          ) : null}
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 ring-1 ring-slate-200">
                  <ModelIcon name={model.name} size={40} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{model.name}</h1>
                  <p className="mt-1 text-lg text-gray-600">{model.tagline}</p>
                </div>
              </div>
              {model.tags?.length ? (
                <div className="flex flex-wrap gap-2">
                  {model.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
            {model.identity ? (
              <p className="mt-4 max-w-2xl text-base text-slate-700">{model.identity}</p>
            ) : null}
            {heroAssets.length ? (
              <div className="mt-5 flex flex-wrap items-center gap-3">
                {heroAssets.map((asset) => (
                  <div
                    key={asset.label}
                    className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-500"
                  >
                    <img
                      src={asset.src}
                      alt={`${model.name} ${asset.label}`}
                      className={`max-h-5 max-w-[120px] ${asset.className ?? ''}`}
                    />
                    <span className="hidden sm:inline">{asset.label}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {model.links?.length ? (
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {model.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 ring-1 ring-slate-200">
                  {linkIcons[link.icon]}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-900">{link.label}</p>
                    <ExternalLink className="h-3.5 w-3.5 text-slate-400 opacity-0 transition group-hover:opacity-100" />
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{link.description}</p>
                </div>
              </a>
            ))}
          </div>
        ) : null}

        {model.assets?.length ? (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-700">Brand Assets</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {model.assets.map((asset) => (
                <div key={asset.label} className="rounded-lg border border-gray-200 bg-white p-3">
                  <div className="flex h-16 items-center justify-center">
                    <img
                      src={asset.src}
                      alt={`${model.name} ${asset.label}`}
                      className={`max-h-12 max-w-full ${asset.className ?? ''}`}
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-500 text-center">{asset.label}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-900">
              Strengths
            </h3>
            <div className="mt-4 space-y-3">
              {model.strengths.map((item) => (
                <div key={item} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-sm font-medium text-emerald-900">
                    <span>{item}</span>
                    <span className="text-xs text-emerald-700">High</span>
                  </div>
                  <div className="h-2 rounded-full bg-emerald-100">
                    <div className="h-2 w-11/12 rounded-full bg-emerald-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-rose-900">
              Weaknesses
            </h3>
            <div className="mt-4 space-y-3">
              {model.weaknesses.map((item) => (
                <div key={item} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-sm font-medium text-rose-900">
                    <span>{item}</span>
                    <span className="text-xs text-rose-700">Watch</span>
                  </div>
                  <div className="h-2 rounded-full bg-rose-100">
                    <div className="h-2 w-7/12 rounded-full bg-rose-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900">Best For</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {model.bestFor.map((item) => (
              <span key={item} className="text-sm bg-white border border-gray-200 px-3 py-1 rounded-full">
                {item}
              </span>
            ))}
          </div>
        </div>

        {model.sections?.length ? (
          <div className="mt-12 grid gap-6">
            {model.sections.map((section) => (
              <div key={section.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="text-lg font-semibold text-slate-900">{section.title}</h2>
                <div className="mt-3 space-y-3 text-sm text-slate-600">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-12 prose prose-gray max-w-none">
            {model.content.split('\n\n').map((paragraph, i) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={i} className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                    {paragraph.replace('## ', '')}
                  </h2>
                )
              }
              if (paragraph.startsWith('**')) {
                return (
                  <p key={i} className="text-gray-600 whitespace-pre-line">
                    {paragraph}
                  </p>
                )
              }
              return (
                <p key={i} className="text-gray-600 mb-4">
                  {paragraph}
                </p>
              )
            })}
          </div>
        )}

        {model.socialProof?.length ? (
          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Community reactions
            </h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {model.socialProof.map((item) => (
                <a
                  key={item.quote}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg"
                >
                  <blockquote className="text-sm text-slate-700">&ldquo;{item.quote}&rdquo;</blockquote>
                  <p className="mt-3 text-xs font-medium text-slate-500">{item.source}</p>
                </a>
              ))}
            </div>
          </div>
        ) : null}

        {model.closing ? (
          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
              Closing thought
            </h3>
            <p className="mt-3 text-base text-slate-100">{model.closing}</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}
