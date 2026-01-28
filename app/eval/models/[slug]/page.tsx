'use client'

import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import {
  Zap,
  Code,
  FileText,
  ExternalLink,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Twitter,
  MessageCircle,
  Play,
  Download,
  Users,
  BookOpen,
} from 'lucide-react'
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
  intro?: string
  facts?: Array<{
    label: string
    value: string
  }>
  links?: Array<{
    label: string
    href: string
    description: string
    icon: 'chat' | 'playground' | 'api' | 'docs' | 'paper' | 'weights' | 'github' | 'community'
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
    intro:
      'DeepSeek V3.2 feels like a frontier model that got a price cut. It is fast on long contexts, strong on reasoning, and widely accessible.',
    facts: [
      { label: 'Family', value: 'DeepSeek V3.2' },
      { label: 'Org', value: 'DeepSeek-AI' },
      { label: 'Release', value: 'Dec 2025' },
      { label: 'Context', value: '128k' },
      { label: 'Modes', value: 'Chat / Speciale' },
      { label: 'Modalities', value: 'Text' },
    ],
    links: [
      // Try it
      {
        label: 'Web chat',
        href: 'https://chat.deepseek.com',
        description: 'Try V3.2 in the official UI',
        icon: 'chat',
      },
      // Build with it
      {
        label: 'API',
        href: 'https://api.deepseek.com',
        description: 'OpenAI-compatible API access',
        icon: 'api',
      },
      {
        label: 'Docs',
        href: 'https://api-docs.deepseek.com/',
        description: 'Endpoints, pricing, and SDK guidance',
        icon: 'docs',
      },
      // Learn more
      {
        label: 'Paper',
        href: 'https://arxiv.org/abs/2512.02556',
        description: 'Model architecture, training, and evals',
        icon: 'paper',
      },
      {
        label: 'Weights',
        href: 'https://huggingface.co/deepseek-ai/DeepSeek-V3.2',
        description: 'Download from HuggingFace',
        icon: 'weights',
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

  if (!model) {
    notFound()
  }

  const getFact = (label: string) => model.facts?.find((fact) => fact.label === label)?.value
  const family = getFact('Family')
  const organization = getFact('Org')
  const releaseDate = getFact('Release')
  const identity = model.identity ?? model.tagline
  const intro = model.intro ?? model.tagline

  const linksByIcon = new Map(model.links?.map((link) => [link.icon, link]) ?? [])
  const headerLinks = {
    // Try it
    chat: linksByIcon.get('chat')?.href,
    playground: linksByIcon.get('playground')?.href,
    // Build with it
    api: linksByIcon.get('api')?.href,
    docs: linksByIcon.get('docs')?.href,
    // Learn more
    paper: linksByIcon.get('paper')?.href,
    weights: linksByIcon.get('weights')?.href,
    github: linksByIcon.get('github')?.href,
    community: linksByIcon.get('community')?.href,
  }

  const contentSections: Array<{
    id?: string
    title?: string
    subtitle?: string
    content?: ReactNode
  }> = []

  if (model.bestFor?.length) {
    contentSections.push({
      title: 'Best for',
      content: (
        <div className="flex flex-wrap gap-2 not-prose">
          {model.bestFor.map((item) => (
            <span
              key={item}
              className="rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-1 text-xs font-medium text-neutral-700 dark:text-neutral-200"
            >
              {item}
            </span>
          ))}
        </div>
      ),
    })
  }

  if (model.assets?.length) {
    contentSections.push({
      title: 'Brand assets',
      content: (
        <div className="grid gap-3 sm:grid-cols-3 not-prose">
          {model.assets.map((asset) => (
            <div
              key={asset.label}
              className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-3"
            >
              <div className="flex h-16 items-center justify-center">
                <img
                  src={asset.src}
                  alt={`${model.name} ${asset.label}`}
                  className={`max-h-12 max-w-full ${asset.className ?? ''}`}
                />
              </div>
              <p className="mt-2 text-xs text-neutral-500 text-center">{asset.label}</p>
            </div>
          ))}
        </div>
      ),
    })
  }

  if (model.sections?.length) {
    model.sections.forEach((section) => {
      contentSections.push({
        id: section.title.toLowerCase().replace(/\s+/g, '-'),
        title: section.title,
        content: (
          <>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </>
        ),
      })
    })
  } else {
    contentSections.push({
      content: (
        <>
          {model.content.split('\n\n').map((paragraph, i) => {
            if (paragraph.startsWith('## ')) {
              return (
                <h2 key={i} className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mt-8 mb-4">
                  {paragraph.replace('## ', '')}
                </h2>
              )
            }
            if (paragraph.startsWith('**')) {
              return (
                <p key={i} className="whitespace-pre-line">
                  {paragraph}
                </p>
              )
            }
            return <p key={i}>{paragraph}</p>
          })}
        </>
      ),
    })
  }

  if (model.closing) {
    contentSections.push({
      title: 'Closing thought',
      content: <p className="text-sm italic text-neutral-600 dark:text-neutral-400">{model.closing}</p>,
    })
  }

  return (
    <div className="relative min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans selection:bg-blue-100 dark:selection:bg-blue-900">
      <CompanyWatermark text={model.name} />

      <div className="relative z-10">
        <div className="min-h-[90vh] flex flex-col justify-center px-6 py-12 md:px-12 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr,400px] gap-12 flex-1 items-center">
            <div className="flex flex-col justify-center">
              <ModelHeader
                name={model.name}
                family={family}
                organization={organization}
                releaseDate={releaseDate}
                identity={identity}
                tags={model.tags ?? []}
                links={headerLinks}
              />
            </div>

            <div className="flex flex-col justify-center bg-neutral-50/80 dark:bg-neutral-900/80 backdrop-blur-sm rounded-2xl p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <StrengthsWeaknesses strengths={model.strengths} weaknesses={model.weaknesses} />
            </div>
          </div>

          {intro ? (
            <div className="mt-16 max-w-3xl">
              <p className="text-xl leading-relaxed text-neutral-700 dark:text-neutral-300 font-light">
                {intro}
              </p>
            </div>
          ) : null}
        </div>

        <div className="max-w-4xl mx-auto px-6 md:px-8 pb-32 space-y-16">
          {contentSections.map((section, idx) => (
            <ContentSection key={section.id ?? idx} id={section.id} title={section.title} subtitle={section.subtitle}>
              {section.content}
            </ContentSection>
          ))}

          {model.socialProof?.length ? (
            <div className="space-y-8">
              {model.socialProof.map((item) => (
                <div key={item.quote} className="max-w-3xl mx-auto">
                  <SocialEmbed type="quote" author={item.source} content={item.quote} url={item.href} />
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <footer className="border-t border-neutral-200 dark:border-neutral-800 py-12 text-center text-sm text-neutral-500 dark:text-neutral-500">
          <p>© {new Date().getFullYear()} Model Analysis Template. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

const Badge = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <span
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 ${className}`}
  >
    {children}
  </span>
)

const SocialEmbed = ({
  type = 'quote',
  author,
  handle,
  content,
  date,
  url,
}: {
  type?: 'quote' | 'tweet'
  author: string
  handle?: string
  content: string
  date?: string
  url?: string
}) => {
  return (
    <div className="my-8 p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
          {type === 'tweet' ? (
            <Twitter className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
          ) : (
            <MessageCircle className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="font-semibold text-sm">{author}</span>
            {handle && <span className="text-sm text-neutral-500 dark:text-neutral-400">{handle}</span>}
            {date && (
              <>
                <span className="text-neutral-400 dark:text-neutral-600">·</span>
                <span className="text-sm text-neutral-500 dark:text-neutral-400">{date}</span>
              </>
            )}
          </div>
          <p className="text-neutral-800 dark:text-neutral-200 leading-relaxed whitespace-pre-wrap">
            {content}
          </p>
          {url && url !== '#' && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              View original →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

const ContentSection = ({
  title,
  subtitle,
  children,
  id,
}: {
  title?: string
  subtitle?: string
  children: ReactNode
  id?: string
}) => {
  return (
    <section id={id} className="py-2 scroll-mt-24">
      {title && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-1 text-neutral-900 dark:text-neutral-100">{title}</h2>
          {subtitle && <p className="text-sm text-neutral-600 dark:text-neutral-400">{subtitle}</p>}
        </div>
      )}
      <div className="prose dark:prose-invert prose-neutral max-w-none text-neutral-700 dark:text-neutral-300 leading-relaxed">
        {children}
      </div>
    </section>
  )
}

const StrengthsWeaknesses = ({
  strengths = [],
  weaknesses = [],
  unknowns = [],
}: {
  strengths?: string[]
  weaknesses?: string[]
  unknowns?: string[]
}) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {strengths.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-green-700 dark:text-green-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Strengths</span>
          </div>
          <ul className="space-y-2 text-sm">
            {strengths.map((strength) => (
              <li key={strength} className="flex items-start gap-2 text-neutral-700 dark:text-neutral-300">
                <span className="text-green-500 dark:text-green-400 mt-0.5 shrink-0">✓</span>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {weaknesses.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-red-700 dark:text-red-400">
            <XCircle className="w-4 h-4" />
            <span>Weaknesses</span>
          </div>
          <ul className="space-y-2 text-sm">
            {weaknesses.map((weakness) => (
              <li key={weakness} className="flex items-start gap-2 text-neutral-700 dark:text-neutral-300">
                <span className="text-red-500 dark:text-red-400 mt-0.5 shrink-0">✗</span>
                <span>{weakness}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {unknowns.length > 0 && (
        <div className="space-y-2 md:col-span-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-700 dark:text-amber-400">
            <HelpCircle className="w-4 h-4" />
            <span>Unknowns</span>
          </div>
          <ul className="flex flex-wrap gap-3 text-sm">
            {unknowns.map((unknown) => (
              <li key={unknown} className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                <span className="text-amber-500 dark:text-amber-400 mt-0.5 shrink-0">?</span>
                <span>{unknown}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

/**
 * Link organization:
 * - Primary: Try it (chat, playground)
 * - Secondary: Build with it (API, docs - which includes pricing)
 * - Tertiary: Learn more (paper, weights, GitHub, community)
 * 
 * Styling is intentionally similar across tiers - this is organizational, not visual hierarchy.
 */
const HeaderLinkButton = ({
  href,
  icon: Icon,
  label,
  description,
  primary = false,
}: {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  description?: string
  primary?: boolean
}) => {
  const baseClasses = primary
    ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200'
    : 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100'

  const descClasses = primary
    ? 'text-white/70 dark:text-black/60'
    : 'text-neutral-500 dark:text-neutral-400'

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${baseClasses}`}
    >
      <Icon className="w-4 h-4 shrink-0" />
      <span className="flex flex-col items-start leading-tight">
        <span>{label}</span>
        {description && (
          <span className={`hidden md:block text-[10px] font-normal leading-tight ${descClasses}`}>
            {description}
          </span>
        )}
      </span>
    </a>
  )
}

const ModelHeader = ({
  name,
  family,
  organization,
  releaseDate,
  identity,
  tags = [],
  links = {},
}: {
  name: string
  family?: string
  organization?: string
  releaseDate?: string
  identity?: string
  tags?: string[]
  links?: {
    // Try it
    chat?: string
    playground?: string
    // Build with it
    api?: string
    docs?: string  // includes pricing as a sub-page
    // Learn more
    paper?: string      // technical/research paper (arXiv, etc.)
    weights?: string    // open weights (HuggingFace, etc.)
    github?: string
    community?: string
  }
}) => {
  const hasLinks = Object.values(links).some(Boolean)

  // Standard icon mapping:
  // chat: MessageCircle, playground: Play, api: Code, docs: BookOpen
  // paper: FileText, weights: Download, github: ExternalLink, community: Users
  const tryItLinks = [
    links.chat && { href: links.chat, icon: MessageCircle, label: 'Chat free', description: 'Try in browser' },
    links.playground && { href: links.playground, icon: Play, label: 'Playground', description: 'Interactive sandbox' },
  ].filter(Boolean) as Array<{ href: string; icon: typeof MessageCircle; label: string; description: string }>

  const buildLinks = [
    links.api && { href: links.api, icon: Code, label: 'API', description: 'Endpoints & SDKs' },
    links.docs && { href: links.docs, icon: BookOpen, label: 'Docs', description: 'Guides & pricing' },
  ].filter(Boolean) as Array<{ href: string; icon: typeof Code; label: string; description: string }>

  const learnMoreLinks = [
    links.paper && { href: links.paper, icon: FileText, label: 'Paper', description: 'Technical report' },
    links.weights && { href: links.weights, icon: Download, label: 'Weights', description: 'Download model' },
    links.github && { href: links.github, icon: ExternalLink, label: 'GitHub', description: 'Source & examples' },
    links.community && { href: links.community, icon: Users, label: 'Community', description: 'Discord & forums' },
  ].filter(Boolean) as Array<{ href: string; icon: typeof FileText; label: string; description: string }>

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-baseline gap-3 flex-wrap">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            {name}
          </h1>
          {family && <span className="text-xl text-neutral-500 dark:text-neutral-400 font-light">{family}</span>}
        </div>
        <div className="flex gap-4 text-sm text-neutral-600 dark:text-neutral-400">
          {organization && <span className="font-semibold text-neutral-800 dark:text-neutral-200">{organization}</span>}
          {organization && releaseDate && <span>·</span>}
          {releaseDate && <span>{releaseDate}</span>}
        </div>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      )}

      {identity && (
        <p className="text-lg leading-relaxed text-neutral-700 dark:text-neutral-300 max-w-2xl">{identity}</p>
      )}

      {hasLinks && (
        <div className="flex gap-3 flex-wrap pt-2">
          {tryItLinks.map((link) => (
            <HeaderLinkButton key={link.label} {...link} primary />
          ))}
          {buildLinks.map((link) => (
            <HeaderLinkButton key={link.label} {...link} />
          ))}
          {learnMoreLinks.map((link) => (
            <HeaderLinkButton key={link.label} {...link} />
          ))}
        </div>
      )}
    </div>
  )
}

const CompanyWatermark = ({ text }: { text: string }) => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <span
          className="text-[15rem] md:text-[20rem] font-bold opacity-[0.03] dark:opacity-[0.02] select-none whitespace-nowrap text-neutral-900 dark:text-neutral-100"
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          {text}
        </span>
      </div>
    </div>
  )
}
