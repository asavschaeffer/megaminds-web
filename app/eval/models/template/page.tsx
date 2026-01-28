'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
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
  ChevronLeft,
  ChevronRight,
  Cpu,
  Calculator,
  BarChart3,
  ArrowRight,
  Play,
  BookOpen,
  Download,
  Users,
} from 'lucide-react'
import { ModelIconClient } from '@/components/ui/model-icon-client'

/**
 * ------------------------------------------------------------------
 * CONTENT CONFIGURATION (TEMPLATE DATA)
 * Edit this object to change the content of the article.
 * ------------------------------------------------------------------
 */
const MODEL_DATA = {
  meta: {
    name: 'DeepSeek-R1',
    family: 'R1 Series',
    organization: 'DeepSeek',
    releaseDate: '2025-01',
    releaseDateDisplay: 'January 2025',
    identity:
      'The cheapest reasoning frontier model with transparent chain-of-thought. DeepSeek-R1 brings o1-level performance at a fraction of the cost, with full visibility into its thinking process.',
    tags: [
      'Reasoning',
      'Open Source',
      'API Available',
      '670B Parameters',
      '128K Context',
      'Chain-of-Thought',
    ],
    links: {
      chat: 'https://chat.deepseek.com',
      api: 'https://api.deepseek.com',
      docs: 'https://api-docs.deepseek.com',
      paper: 'https://arxiv.org/abs/2501.12948',
      weights: 'https://huggingface.co/deepseek-ai/DeepSeek-R1',
      github: 'https://github.com/deepseek-ai/DeepSeek-R1',
    },
  },
  analysis: {
    strengths: [
      'Exceptional value — 95% cheaper than o1',
      'Transparent reasoning traces',
      'Strong math and code performance',
      'Open weights available',
      'Long context support (128K)',
    ],
    weaknesses: [
      'Slower inference due to reasoning',
      'Occasional verbose thinking',
      'Less polished UX than competitors',
      'Limited multimodal capabilities',
    ],
    unknowns: ['True dataset composition', 'Real-world safety behavior at scale'],
  },
  intro: {
    text:
      "DeepSeek-R1 landed in January 2025 like a pricing nuke. While OpenAI's o1 dominated reasoning tasks at $15/million tokens, DeepSeek offered comparable performance for $0.55. That's not a typo. The model uses reinforcement learning to generate visible chain-of-thought reasoning, meaning you can actually watch it think. For developers building agents, math tutors, or code assistants, R1 became the obvious choice overnight. It's not perfect — the reasoning can get chatty, and it lacks vision — but it fundamentally reset expectations for what \"expensive\" means in AI.",
  },
  pricingData: {
    baseModel: { name: 'DeepSeek-R1', input: 0.55, output: 2.19 },
    competitors: [
      { name: 'OpenAI o1', input: 15.0, output: 60.0 },
      { name: 'GPT-4o', input: 2.5, output: 10.0 },
      { name: 'Claude 3.5 Sonnet', input: 3.0, output: 15.0 },
    ],
  },
  chatLimits: [
    {
      name: 'DeepSeek',
      tiers: [{ label: 'Free', maxMsgs: 50, price: '$0' }],
    },
    {
      name: 'ChatGPT',
      tiers: [
        { label: 'Free', maxMsgs: 16, price: '$0' },
        { label: 'Plus', maxMsgs: 80, price: '$20/mo' },
        { label: 'Pro', maxMsgs: 300, price: '$200/mo' },
      ],
    },
    {
      name: 'Claude',
      tiers: [
        { label: 'Free', maxMsgs: 10, price: '$0' },
        { label: 'Pro', maxMsgs: 75, price: '$20/mo' },
        { label: 'Max 5x', maxMsgs: 150, price: '$100/mo' },
        { label: 'Max 20x', maxMsgs: 300, price: '$200/mo' },
      ],
    },
  ],
  benchmarks: [
    { name: 'AIME 2024', score: 79.8, maxScore: 100, comparison: 'o1: 83.3' },
    { name: 'MATH-500', score: 97.3, maxScore: 100, comparison: 'o1: 96.4' },
    { name: 'Codeforces', score: 96.3, maxScore: 100, comparison: 'o1: 96.6' },
    { name: 'GPQA Diamond', score: 71.5, maxScore: 100, comparison: 'o1: 78.0' },
    { name: 'MMLU', score: 90.8, maxScore: 100, comparison: 'GPT-4o: 88.7' },
    { name: 'LiveCodeBench', score: 65.9, maxScore: 100, comparison: 'o1: 63.4' },
  ],
  sentimentFeed: [
    {
      author: 'Andrej Karpathy',
      handle: '@karpathy',
      content:
        'DeepSeek R1 is legitimately impressive. The chain of thought is a massive UX win for debugging.',
      sentiment: 'positive' as const,
    },
    {
      author: 'ML Engineer',
      handle: '@ml_eng',
      content:
        'Switched our eval pipeline to R1. Costs went from $40/day to $1.50. Quality is indistinguishable.',
      sentiment: 'positive' as const,
    },
    {
      author: 'Ethan Mollick',
      handle: '@emollick',
      content:
        "We are seeing the commoditization of reasoning in real-time. R1 proves you don't need a trillion dollars to compete.",
      sentiment: 'positive' as const,
    },
    {
      author: 'Skeptical Dev',
      handle: '@dev_skeptic',
      content:
        "The reasoning traces are cool but sometimes it overthinks a simple question for 500 tokens. That's wasted latency.",
      sentiment: 'critical' as const,
    },
    {
      author: 'AI Researcher',
      handle: '@ai_research',
      content:
        'Open weights are the real story here. We can actually study how reasoning emerges in MoE architectures.',
      sentiment: 'positive' as const,
    },
    {
      author: 'Startup CTO',
      handle: '@startup_cto',
      content:
        'No vision, no audio, no image gen. For a multimodal world, R1 is a one-trick pony. A very good trick, though.',
      sentiment: 'neutral' as const,
    },
    {
      author: 'Safety Researcher',
      handle: '@safety_lab',
      content:
        "Transparent reasoning is a double-edged sword. You can see when it's wrong, but users may over-trust visible chains of thought.",
      sentiment: 'neutral' as const,
    },
    {
      author: 'Indie Hacker',
      handle: '@indie_build',
      content:
        'Built an entire AI tutor product on R1 for $12/month in API costs. This was not possible 6 months ago.',
      sentiment: 'positive' as const,
    },
  ],
  sections: [
    {
      id: 'why-it-matters',
      title: 'Why It Matters',
      subtitle: 'For everyday people and power users',
      content: (
        <>
          <p className="mb-4">
            Most <abbr title="Large Language Models">LLMs</abbr> give you an answer. DeepSeek-R1 shows you the work. If you've ever used ChatGPT and
            gotten a confident but wrong answer, you'll appreciate this: R1 exposes its reasoning
            process in real time. You can see it second-guessing itself, working through edge cases,
            and correcting mistakes.
          </p>
          <p>
            This matters for three reasons: <strong>trust</strong> (you can verify the logic),{' '}
            <strong>learning</strong> (watching the model think teaches you problem-solving), and{' '}
            <strong>debugging</strong> (when it's wrong, you know why). Plus, at <data value="0.55">$0.55</data> per million
            tokens, you can run it at scale without selling a kidney.
          </p>
        </>
      ),
    },
    {
      id: 'social-proof',
      variant: 'social',
      content: null,
      socialData: {
        type: 'tweet',
        author: 'Andrej Karpathy',
        handle: '@karpathy',
        date: '2025-01-20',
        dateDisplay: 'Jan 20, 2025',
        content:
          "DeepSeek R1 is legitimately impressive. The fact that you can see the chain of thought is a massive UX win for debugging. And the pricing is... I mean, come on.",
        url: '#',
      },
    },
    {
      id: 'core-features',
      title: 'Core Features',
      subtitle: 'What makes it tick',
      variant: 'technical',
      hasBenchmarks: true,
      content: (
        <>
          <h3 className="text-xl font-semibold mt-6 mb-3">Visible Reasoning</h3>
          <p className="mb-4">
            Unlike GPT-4 or Claude, which hide their thinking, DeepSeek-R1 shows you a{' '}
            <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-sm">
              &lt;think&gt;
            </code>{' '}
            block before every answer. This isn't just for show — the model genuinely uses this space
            to work through problems, test hypotheses, and refine its approach. It's like having a
            study partner who talks through the problem out loud.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Cost Efficiency</h3>
          <p className="mb-4">
            At <data value="0.55">$0.55</data> per million input tokens and <data value="2.19">$2.19</data> per million output tokens, R1 is roughly
            20-30x cheaper than GPT-4o and 95% cheaper than o1. This isn't a budget model — it's
            frontier performance at commodity pricing. For context, running 1,000 complex reasoning
            queries costs about <data value="5">$5</data>.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Open Weights</h3>
          <p className="mb-4">
            The full <data value="671000000000">671B</data> parameter model is available on HuggingFace. Yes, you can run it locally if
            you have the hardware (good luck). More realistically, this means researchers can study
            the architecture, fine-tune it, or distill it into smaller models.
          </p>
        </>
      ),
      socialData: {
        type: 'quote',
        author: 'AI Researcher',
        content:
          'Open weights are the real story. We can actually study how reasoning emerges in MoE architectures now.',
        date: '2025-01',
        dateDisplay: 'Jan 2025',
      },
    },
    {
      id: 'economics',
      title: 'The Economics',
      subtitle: 'API pricing and chat usage compared',
      content: (
        <p className="mb-2">
          R1&apos;s most disruptive feature isn&apos;t technical — it&apos;s the price tag. Compare costs
          across providers for <abbr title="Application Programming Interface">API</abbr> usage and daily chat limits.
        </p>
      ),
      hasPricing: true,
      socialData: {
        type: 'tweet',
        author: 'Indie Hacker',
        handle: '@indie_build',
        content:
          'Built an entire AI tutor product on R1 for $12/month in API costs. This was not possible 6 months ago.',
        date: '2025-02',
        dateDisplay: 'Feb 2025',
      },
    },
    {
      id: 'training',
      title: 'Training & Architecture',
      subtitle: 'For the technically curious',
      variant: 'advanced',
      specs: [
        { label: 'Total Params', value: '671B', icon: Cpu },
        { label: 'Active Params', value: '37B', icon: Zap },
      ],
      content: (
        <>
          <p className="mb-4">
            DeepSeek trained R1 using a multi-stage <abbr title="Reinforcement Learning">RL</abbr> approach similar to OpenAI's o1, but with some
            clever shortcuts. Instead of relying purely on human feedback, they used a combination of:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>
              <strong>Self-play</strong>: The model generated reasoning traces and scored them against
              ground truth
            </li>
            <li>
              <strong>Process supervision</strong>: Reward models evaluated intermediate steps, not
              just final answers
            </li>
            <li>
              <strong>Rejection sampling</strong>: Generated multiple reasoning paths and kept the best
              ones
            </li>
          </ul>
          <p className="mb-6">
            The base model is a <dfn><abbr title="Mixture of Experts">MoE</abbr></dfn> (Mixture of Experts) architecture with <data value="671000000000">671B</data> total parameters, but
            only ~<data value="37000000000">37B</data> active per token. This sparse activation is how they keep inference costs down —
            you're not running the full model for every word.
          </p>
        </>
      ),
      expandable: {
        title: 'MoE Architecture Details',
        preview: 'Deep dive into the mixture-of-experts routing and expert specialization patterns',
        content: (
          <>
            <p className="mb-4">
              The model uses a 2-expert-per-token routing strategy with learned gating functions. Each
              expert is a standard feedforward block, but the router learns to send tokens to
              specialized experts based on task type. Early analysis suggests some experts specialize
              in math, others in code, and others in general reasoning.
            </p>
            <p>
              Interestingly, the routing behavior changes during the reasoning phase. When generating
              the{' '}
              <code className="bg-neutral-200 dark:bg-neutral-700 px-1 rounded">&lt;think&gt;</code>{' '}
              block, the model activates different experts than when generating the final answer. This
              suggests the training process learned to separate "internal cognition" from "user-facing
              output" at the architectural level.
            </p>
          </>
        ),
      },
    },
    {
      id: 'issues',
      title: 'Known Issues & Quirks',
      content: (
        <>
          <h3 className="text-xl font-semibold mt-6 mb-3">Verbose Reasoning</h3>
          <p className="mb-4">
            Sometimes R1 overthinks simple questions. Ask it <q>What is 2+2?</q> and you might get a 200-word
            reasoning trace about the properties of addition. This is funny once and annoying by the
            tenth time. You can mitigate this by adjusting the system prompt to encourage brevity.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Limited Multimodal Support</h3>
          <p className="mb-4">
            R1 is text-only. If you need vision, audio, or image generation, you'll need to use a
            different model. DeepSeek has hinted at a multimodal version, but no timeline yet.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Occasional Hallucination in Reasoning</h3>
          <p className="mb-4">
            Because you can see the thinking, you can also see when it goes off the rails. Sometimes
            the model will confidently reason its way to the wrong answer, complete with
            convincing-sounding logic. The transparency helps you catch this, but it's still a risk.
          </p>
        </>
      ),
    },
    {
      id: 'in-the-wild',
      title: 'In the Wild',
      subtitle: 'Real-world usage and community reactions',
      content: (
        <>
          <p className="mb-4">
            Within weeks of launch, developers started using R1 for use cases that were previously too
            expensive:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>
              <strong>AI tutors</strong> that show students step-by-step reasoning
            </li>
            <li>
              <strong>Code review agents</strong> that explain why they flagged an issue
            </li>
            <li>
              <strong>Math problem solvers</strong> for competitive programming
            </li>
            <li>
              <strong>Research assistants</strong> that synthesize papers and show their logic
            </li>
          </ul>
        </>
      ),
      socialData: {
        type: 'quote',
        author: 'Developer feedback',
        content:
          "I switched our entire QA pipeline to R1 and cut costs by 80%. The reasoning traces also helped us debug edge cases we didn't know existed.",
        date: '2025-02',
        dateDisplay: 'Feb 2025',
      },
    },
    {
      id: 'advanced',
      title: 'For ML Engineers',
      subtitle: 'Implementation details and gotchas',
      variant: 'advanced',
      expandables: [
        {
          title: 'Fine-tuning R1',
          preview: 'How to adapt the model for domain-specific reasoning tasks',
          content: (
            <>
              <p className="mb-4">
                Because the weights are open, you can fine-tune R1 on your own data. The most effective
                approach is to continue the <abbr title="Reinforcement Learning">RL</abbr> training with domain-specific reward models. For
                example, if you're building a medical reasoning system, you'd:
              </p>
              <ol className="list-decimal pl-6 mb-4 space-y-2">
                <li>Collect domain-specific reasoning traces (<abbr title="example">e.g.</abbr>, medical case studies)</li>
                <li>Train a reward model to score medical reasoning quality</li>
                <li>Use <abbr title="Proximal Policy Optimization">PPO</abbr> or <abbr title="Group Relative Policy Optimization">GRPO</abbr> to fine-tune R1's reasoning on your domain</li>
              </ol>
              <p>
                This is expensive (requires <abbr title="Graphics Processing Units">GPUs</abbr> and expertise), but the results can be dramatic for
                specialized tasks.
              </p>
            </>
          ),
        },
        {
          title: 'Inference Optimization',
          preview: 'Making reasoning faster without sacrificing quality',
          content: (
            <>
              <p className="mb-4">
                R1's reasoning traces can get long (1000+ tokens), which slows inference. Here are three
                strategies to speed things up:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Speculative decoding</strong>: Use a smaller draft model to predict reasoning
                  steps, then verify with R1
                </li>
                <li>
                  <strong>Early stopping</strong>: Monitor the reasoning trace and stop generation once
                  the model reaches high confidence
                </li>
                <li>
                  <strong>Reasoning distillation</strong>: Train a smaller model to mimic R1's reasoning
                  for specific task categories
                </li>
              </ul>
            </>
          ),
        },
      ],
    },
    {
      id: 'verdict',
      title: 'The Verdict',
      content: (
        <>
          <p className="mb-4">
            DeepSeek-R1 isn't just a good model — it's a market-shaping event. By offering frontier
            reasoning at sub-$1 pricing, it forced every competitor to rethink their economics. For
            developers, it's a no-brainer for any task that benefits from visible reasoning: math,
            code, planning, research, tutoring.
          </p>
          <p className="mb-4">
            It's not for everything. If you need multimodal support, lightning-fast responses, or
            ultra-polished <abbr title="User Experience">UX</abbr>, look elsewhere. But for reasoning tasks at scale? R1 is the new
            baseline.
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 italic">
            Want to try it? The <abbr title="Application Programming Interface">API</abbr> is live at platform.deepseek.com, and the open weights are on
            HuggingFace. Start with the playground to see the reasoning in action.
          </p>
        </>
      ),
    },
  ],
}

/**
 * ------------------------------------------------------------------
 * SUB-COMPONENTS
 * Reusable UI components with semantic HTML throughout.
 * ------------------------------------------------------------------
 */

/** Semantic tag/badge using <mark> for highlighted metadata */
const Tag = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <mark
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 ${className}`}
  >
    {children}
  </mark>
)

/** Social quote/testimonial using semantic <figure>, <blockquote>, <figcaption>, <cite>, <time> */
const SocialEmbed = ({
  type = 'quote',
  author,
  handle,
  content,
  date,
  dateDisplay,
  url,
}: {
  type?: 'quote' | 'tweet'
  author: string
  handle?: string
  content: string
  date?: string
  dateDisplay?: string
  url?: string
}) => {
  return (
    <figure className="my-8 p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center" aria-hidden="true">
          {type === 'tweet' ? (
            <Twitter className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
          ) : (
            <MessageCircle className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <figcaption className="flex items-center gap-2 mb-2 flex-wrap">
            <cite className="font-semibold text-sm not-italic">{author}</cite>
            {handle && <span className="text-sm text-neutral-500 dark:text-neutral-400">{handle}</span>}
            {date && (
              <>
                <span className="text-neutral-400 dark:text-neutral-600" aria-hidden="true">·</span>
                <time dateTime={date} className="text-sm text-neutral-500 dark:text-neutral-400">
                  {dateDisplay || date}
                </time>
              </>
            )}
          </figcaption>
          <blockquote className="text-neutral-800 dark:text-neutral-200 leading-relaxed whitespace-pre-wrap">
            <p>{content}</p>
          </blockquote>
          {url && url !== '#' && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              View original <span aria-hidden="true">→</span>
            </a>
          )}
        </div>
      </div>
    </figure>
  )
}

/** Sentiment marquee as <aside> with semantic <figure>/<blockquote> cards */
const SentimentMarquee = ({
  items,
}: {
  items: { author: string; handle?: string; content: string; sentiment: 'positive' | 'neutral' | 'critical' }[]
}) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    updateScrollState()
    el.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)
    return () => {
      el.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [updateScrollState])

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = 340
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  const sentimentLabel = {
    positive: 'Positive sentiment',
    neutral: 'Neutral sentiment',
    critical: 'Critical sentiment',
  }

  const sentimentDot = {
    positive: 'bg-green-400',
    neutral: 'bg-amber-400',
    critical: 'bg-red-400',
  }

  return (
    <aside aria-label="Community reactions and testimonials" className="relative group">
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-neutral-50 dark:hover:bg-neutral-700"
          aria-label="Scroll testimonials left"
        >
          <ChevronLeft className="w-4 h-4 text-neutral-600 dark:text-neutral-300" aria-hidden="true" />
        </button>
      )}

      <div ref={scrollRef} className="overflow-x-auto py-10 scrollbar-hide scroll-smooth" role="region" aria-label="Scrollable testimonials">
        <ul className="flex gap-5 px-6 md:px-12 w-max list-none" role="list">
          {items.map((item, idx) => (
            <li key={idx} className="flex-shrink-0 w-80">
              <figure
                className="h-full p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors snap-start"
              >
                <blockquote className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4 line-clamp-3">
                  <p>&ldquo;{item.content}&rdquo;</p>
                </blockquote>
                <figcaption className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <cite className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 truncate not-italic">
                      {item.author}
                    </cite>
                    {item.handle && (
                      <span className="text-xs text-neutral-400 dark:text-neutral-500 truncate">
                        {item.handle}
                      </span>
                    )}
                  </div>
                  <span
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${sentimentDot[item.sentiment]}`}
                    title={sentimentLabel[item.sentiment]}
                    aria-label={sentimentLabel[item.sentiment]}
                  />
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-neutral-50 dark:hover:bg-neutral-700"
          aria-label="Scroll testimonials right"
        >
          <ChevronRight className="w-4 h-4 text-neutral-600 dark:text-neutral-300" aria-hidden="true" />
        </button>
      )}
    </aside>
  )
}

/** Expandable section using native <details>/<summary> for semantic disclosure */
const ExpandableSection = ({
  title,
  preview,
  children,
  defaultExpanded = false,
}: {
  title: string
  preview: string
  children: React.ReactNode
  defaultExpanded?: boolean
}) => {
  return (
    <details
      open={defaultExpanded}
      className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden my-6 group"
    >
      <summary className="cursor-pointer px-6 py-4 flex items-start justify-between gap-4 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors list-none [&::-webkit-details-marker]:hidden">
        <div className="text-left flex-1">
          <span className="block font-semibold mb-1 text-neutral-900 dark:text-neutral-100">{title}</span>
          <span className="block text-sm text-neutral-600 dark:text-neutral-400">{preview}</span>
        </div>
        <span className="transform transition-transform duration-200 group-open:rotate-180" aria-hidden="true">
          <svg className="w-5 h-5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </summary>
      <div className="px-6 py-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
        <div className="prose dark:prose-invert prose-neutral max-w-none prose-sm">{children}</div>
      </div>
    </details>
  )
}

/** Pricing calculator as <figure> with interactive controls and full keyboard support */
const PricingCalculator = ({
  apiData,
  chatData,
}: {
  apiData: {
    baseModel: { name: string; input: number; output: number }
    competitors: { name: string; input: number; output: number }[]
  }
  chatData: { name: string; tiers: { label: string; maxMsgs: number; price: string }[] }[]
}) => {
  const [activeTab, setActiveTab] = useState<'api' | 'chat'>('api')
  const [tokens, setTokens] = useState(1)
  const [msgsPerDay, setMsgsPerDay] = useState(5)
  const apiTabRef = useRef<HTMLButtonElement>(null)
  const chatTabRef = useRef<HTMLButtonElement>(null)

  const baseCost = (apiData.baseModel.input + apiData.baseModel.output) * tokens

  const getChatStatus = (provider: (typeof chatData)[0], msgs: number) => {
    for (const tier of provider.tiers) {
      if (msgs <= tier.maxMsgs) {
        const color = tier.price === '$0' ? ('green' as const) : ('blue' as const)
        return { label: tier.label, color, cost: tier.price }
      }
    }
    return { label: 'Limit reached', color: 'red' as const, cost: '—' }
  }

  // Keyboard navigation for tabs (arrow keys)
  const handleTabKeyDown = (e: React.KeyboardEvent, currentTab: 'api' | 'chat') => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault()
      const newTab = currentTab === 'api' ? 'chat' : 'api'
      setActiveTab(newTab)
      // Focus the new tab
      if (newTab === 'api') {
        apiTabRef.current?.focus()
      } else {
        chatTabRef.current?.focus()
      }
    }
  }

  const tabClass = (active: boolean) =>
    `flex-1 px-4 py-3 text-sm font-medium transition-colors ${active
      ? 'text-neutral-900 dark:text-neutral-100 border-b-2 border-neutral-900 dark:border-neutral-100'
      : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
    }`

  const statusColors = {
    green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
    red: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
  }

  const statusDot = {
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    red: 'bg-red-400',
  }

  const apiTabId = 'pricing-tab-api'
  const chatTabId = 'pricing-tab-chat'
  const apiPanelId = 'pricing-panel-api'
  const chatPanelId = 'pricing-panel-chat'

  return (
    <figure className="rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden my-8">
      <div className="flex border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900" role="tablist" aria-label="Pricing comparison tabs">
        <button
          ref={apiTabRef}
          id={apiTabId}
          role="tab"
          tabIndex={activeTab === 'api' ? 0 : -1}
          aria-selected={activeTab === 'api'}
          aria-controls={apiPanelId}
          onClick={() => setActiveTab('api')}
          onKeyDown={(e) => handleTabKeyDown(e, 'api')}
          className={tabClass(activeTab === 'api')}
        >
          <span className="flex items-center justify-center gap-2">
            <Calculator className="w-4 h-4" aria-hidden="true" />
            <abbr title="Application Programming Interface">API</abbr> Costs
          </span>
        </button>
        <button
          ref={chatTabRef}
          id={chatTabId}
          role="tab"
          tabIndex={activeTab === 'chat' ? 0 : -1}
          aria-selected={activeTab === 'chat'}
          aria-controls={chatPanelId}
          onClick={() => setActiveTab('chat')}
          onKeyDown={(e) => handleTabKeyDown(e, 'chat')}
          className={tabClass(activeTab === 'chat')}
        >
          <span className="flex items-center justify-center gap-2">
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            Chat Usage
          </span>
        </button>
      </div>

      <div className="p-6">
        {activeTab === 'api' ? (
          <div id={apiPanelId} role="tabpanel" aria-labelledby={apiTabId} aria-live="polite">
            <label htmlFor="token-slider" className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
              Monthly volume:{' '}
              <output className="text-neutral-900 dark:text-neutral-100 font-bold">
                {tokens < 1 ? `${(tokens * 1000).toFixed(0)}K` : `${tokens}M`} tokens
              </output>
            </label>
            <input
              id="token-slider"
              type="range"
              min="0.1"
              max="50"
              step="0.1"
              value={tokens}
              onChange={(e) => setTokens(parseFloat(e.target.value))}
              className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-blue-600 mb-1"
            />
            <div className="flex justify-between text-xs text-neutral-400 mb-6" aria-hidden="true">
              <span>100K</span>
              <span>50M</span>
            </div>

            <table className="w-full">
              <caption className="sr-only">API cost comparison by provider</caption>
              <thead className="sr-only">
                <tr>
                  <th scope="col">Provider</th>
                  <th scope="col">Cost</th>
                  <th scope="col">Savings</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                  <td className="font-medium text-blue-900 dark:text-blue-100">
                    {apiData.baseModel.name}
                  </td>
                  <td className="font-bold text-blue-700 dark:text-blue-300 tabular-nums">
                    <output>${baseCost.toFixed(2)}</output>
                  </td>
                </tr>

                {apiData.competitors.map((comp, idx) => {
                  const cost = (comp.input + comp.output) * tokens
                  const savingsPercent = ((cost - baseCost) / cost * 100).toFixed(0)
                  return (
                    <tr
                      key={idx}
                      className="flex items-center justify-between p-3 border-b border-neutral-100 dark:border-neutral-800 last:border-0"
                    >
                      <td className="text-neutral-600 dark:text-neutral-400">{comp.name}</td>
                      <td className="text-right">
                        <output className="font-medium text-neutral-900 dark:text-neutral-100 tabular-nums">
                          ${cost.toFixed(2)}
                        </output>
                        <span className="ml-3 text-xs text-green-600 dark:text-green-400">
                          {savingsPercent}% more
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div id={chatPanelId} role="tabpanel" aria-labelledby={chatTabId} aria-live="polite">
            <label htmlFor="msgs-slider" className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
              Messages per day:{' '}
              <output className="text-neutral-900 dark:text-neutral-100 font-bold">{msgsPerDay}</output>
            </label>
            <input
              id="msgs-slider"
              type="range"
              min="1"
              max="200"
              step="1"
              value={msgsPerDay}
              onChange={(e) => setMsgsPerDay(parseInt(e.target.value))}
              className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-blue-600 mb-1"
            />
            <div className="flex justify-between text-xs text-neutral-400 mb-6" aria-hidden="true">
              <span>1</span>
              <span>200</span>
            </div>

            <ul className="space-y-3 list-none" role="list">
              {chatData.map((provider, idx) => {
                const status = getChatStatus(provider, msgsPerDay)
                return (
                  <li
                    key={idx}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-colors duration-300 ${statusColors[status.color]}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-2 h-2 rounded-full ${statusDot[status.color]} transition-colors duration-300`} aria-hidden="true" />
                      <span className="font-medium">{provider.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold uppercase tracking-wide opacity-80">
                        {status.label}
                      </span>
                      <output className="text-sm font-medium tabular-nums">{status.cost}</output>
                    </div>
                  </li>
                )
              })}
            </ul>

            <p className="mt-4 text-xs text-neutral-400 dark:text-neutral-500">
              <small>Approximate daily limits. Free tiers may vary by region and model selection.</small>
            </p>
          </div>
        )}
      </div>
      <figcaption className="sr-only">Interactive pricing calculator comparing API costs and chat usage limits across providers</figcaption>
    </figure>
  )
}

/** Content section using semantic <section> with proper heading hierarchy */
const ContentSection = ({
  title,
  subtitle,
  children,
  id,
  specs = [],
}: {
  title?: string
  subtitle?: string
  children: React.ReactNode
  id?: string
  specs?: { label: string; value: string; icon?: React.ComponentType<{ className?: string }> }[]
}) => {
  return (
    <section 
      id={id} 
      className="py-8 scroll-mt-24 border-t border-neutral-100 dark:border-neutral-800 first:border-t-0 first:pt-0" 
      aria-labelledby={title ? `${id}-heading` : undefined}
    >
      {title && (
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <hgroup>
            <h2 id={`${id}-heading`} className="text-2xl font-bold mb-1 text-neutral-900 dark:text-neutral-100">{title}</h2>
            {subtitle && <p className="text-sm text-neutral-500 dark:text-neutral-400">{subtitle}</p>}
          </hgroup>
          {specs.length > 0 && (
            <dl className="flex flex-wrap gap-3">
              {specs.map((spec, idx) => (
                <div
                  key={idx}
                  className="flex flex-col px-4 py-2 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 min-w-[120px]"
                >
                  <dt className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 mb-1">
                    {spec.icon && <spec.icon className="w-3.5 h-3.5" aria-hidden="true" />}
                    <span className="text-[10px] font-semibold uppercase tracking-wider">{spec.label}</span>
                  </dt>
                  <dd className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                    <data value={spec.value}>{spec.value}</data>
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </header>
      )}
      <div className="prose prose-lg dark:prose-invert prose-neutral max-w-none prose-p:text-neutral-600 dark:prose-p:text-neutral-300 prose-p:leading-relaxed prose-headings:text-neutral-900 dark:prose-headings:text-neutral-100 prose-strong:text-neutral-800 dark:prose-strong:text-neutral-200 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-code:text-neutral-800 dark:prose-code:text-neutral-200 prose-code:bg-neutral-100 dark:prose-code:bg-neutral-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none">
        {children}
      </div>
    </section>
  )
}

/** Strengths/Weaknesses/Unknowns using semantic <dl> definition lists */
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
        <dl className="space-y-2">
          <dt className="flex items-center gap-2 text-sm font-semibold text-green-700 dark:text-green-400">
            <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
            <span>Strengths</span>
          </dt>
          {strengths.map((strength, idx) => (
            <dd key={idx} className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300">
              <span className="text-green-500 dark:text-green-400 mt-0.5 shrink-0" aria-hidden="true">✓</span>
              <span>{strength}</span>
            </dd>
          ))}
        </dl>
      )}

      {weaknesses.length > 0 && (
        <dl className="space-y-2">
          <dt className="flex items-center gap-2 text-sm font-semibold text-red-700 dark:text-red-400">
            <XCircle className="w-4 h-4" aria-hidden="true" />
            <span>Weaknesses</span>
          </dt>
          {weaknesses.map((weakness, idx) => (
            <dd key={idx} className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300">
              <span className="text-red-500 dark:text-red-400 mt-0.5 shrink-0" aria-hidden="true">✗</span>
              <span>{weakness}</span>
            </dd>
          ))}
        </dl>
      )}

      {unknowns.length > 0 && (
        <dl className="space-y-2 md:col-span-2">
          <dt className="flex items-center gap-2 text-sm font-semibold text-amber-700 dark:text-amber-400">
            <HelpCircle className="w-4 h-4" aria-hidden="true" />
            <span>Unknowns</span>
          </dt>
          <div className="flex flex-wrap gap-3">
            {unknowns.map((unknown, idx) => (
              <dd key={idx} className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                <span className="text-amber-500 dark:text-amber-400 shrink-0" aria-hidden="true">?</span>
                <span>{unknown}</span>
              </dd>
            ))}
          </div>
        </dl>
      )}
    </div>
  )
}

/** Header link button for external resources */
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
      <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
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

/** Model header using semantic <header> with <hgroup> */
const ModelHeader = ({
  name,
  family,
  organization,
  releaseDate,
  releaseDateDisplay,
  identity,
  tags = [],
  links = {},
}: {
  name: string
  family?: string
  organization?: string
  releaseDate?: string
  releaseDateDisplay?: string
  identity?: string
  tags?: string[]
  links?: {
    chat?: string
    playground?: string
    api?: string
    docs?: string
    paper?: string
    weights?: string
    github?: string
    community?: string
  }
}) => {
  const hasLinks = Object.values(links).some(Boolean)

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

  const iconMatchName = organization || name

  return (
    <header className="space-y-6">
      <hgroup className="space-y-2">
        <div className="flex items-center gap-4 flex-wrap">
          <ModelIconClient name={iconMatchName} size={48} className="shrink-0" />
          <div className="flex items-baseline gap-3 flex-wrap">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              {name}
            </h1>
            {family && <span className="text-xl text-neutral-500 dark:text-neutral-400 font-light">{family}</span>}
          </div>
        </div>
        <p className="flex gap-4 text-sm text-neutral-600 dark:text-neutral-400">
          {organization && <span className="font-semibold text-neutral-800 dark:text-neutral-200">{organization}</span>}
          {organization && releaseDate && <span aria-hidden="true">·</span>}
          {releaseDate && <time dateTime={releaseDate}>{releaseDateDisplay || releaseDate}</time>}
        </p>
      </hgroup>

      {tags.length > 0 && (
        <ul className="flex flex-wrap gap-2 list-none" role="list" aria-label="Model characteristics">
          {tags.map((tag) => (
            <li key={tag}><Tag>{tag}</Tag></li>
          ))}
        </ul>
      )}

      {identity && (
        <p className="text-lg leading-relaxed text-neutral-700 dark:text-neutral-300 max-w-2xl">{identity}</p>
      )}

      {hasLinks && (
        <nav aria-label="Model resources and links" className="flex gap-3 flex-wrap pt-2">
          {tryItLinks.map((link) => (
            <HeaderLinkButton key={link.label} {...link} primary />
          ))}
          {buildLinks.map((link) => (
            <HeaderLinkButton key={link.label} {...link} />
          ))}
          {learnMoreLinks.map((link) => (
            <HeaderLinkButton key={link.label} {...link} />
          ))}
        </nav>
      )}
    </header>
  )
}

/** Hero background logo - decorative */
const HeroLogoBackground = ({ name }: { name: string }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="opacity-[0.04] dark:opacity-[0.03]">
          <ModelIconClient name={name} size={700} className="w-[450px] h-[450px] md:w-[700px] md:h-[700px]" />
        </div>
      </div>
    </div>
  )
}

/** Benchmark chart using <figure> with semantic <meter> elements */
const BenchmarkChart = ({
  benchmarks,
}: {
  benchmarks: { name: string; score: number; maxScore: number; comparison?: string }[]
}) => {
  return (
    <figure className="my-8 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
      <figcaption className="flex items-center gap-2 px-6 py-4 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <BarChart3 className="w-4 h-4 text-neutral-500" aria-hidden="true" />
        <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Benchmark Performance</span>
      </figcaption>
      <div className="p-6 space-y-4">
        {benchmarks.map((b, idx) => {
          const pct = (b.score / b.maxScore) * 100
          return (
            <div key={idx}>
              <div className="flex items-baseline justify-between mb-1.5">
                <label htmlFor={`benchmark-${idx}`} className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{b.name}</label>
                <div className="flex items-baseline gap-2">
                  <output className="text-sm font-bold tabular-nums text-neutral-900 dark:text-neutral-100">
                    {b.score}
                  </output>
                  {b.comparison && (
                    <span className="text-xs text-neutral-400 dark:text-neutral-500 tabular-nums">
                      <small>{b.comparison}</small>
                    </span>
                  )}
                </div>
              </div>
              <div className="relative h-2.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                <meter
                  id={`benchmark-${idx}`}
                  value={b.score}
                  min={0}
                  max={b.maxScore}
                  low={50}
                  high={70}
                  optimum={90}
                  className="sr-only"
                >
                  {b.score} out of {b.maxScore}
                </meter>
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${pct}%`,
                    background:
                      pct >= 90
                        ? 'linear-gradient(90deg, #22c55e, #16a34a)'
                        : pct >= 70
                          ? 'linear-gradient(90deg, #3b82f6, #2563eb)'
                          : 'linear-gradient(90deg, #f59e0b, #d97706)',
                  }}
                  role="presentation"
                  aria-hidden="true"
                />
              </div>
            </div>
          )
        })}
      </div>
    </figure>
  )
}

/** CTA Cards as <nav> with external resource links */
const CTACards = ({
  links,
}: {
  links: { chat?: string; playground?: string; api?: string; docs?: string; paper?: string; weights?: string; github?: string; community?: string }
}) => {
  const cards = [
    links.chat && {
      icon: MessageCircle,
      title: 'Try it Free',
      description: 'Chat with the model directly in your browser.',
      href: links.chat,
    },
    links.playground && {
      icon: Play,
      title: 'Playground',
      description: 'Interactive sandbox for testing prompts and parameters.',
      href: links.playground,
    },
    links.api && {
      icon: Code,
      title: 'API Access',
      description: 'Integrate into your app with a few lines of code.',
      href: links.api,
    },
    links.docs && {
      icon: BookOpen,
      title: 'Documentation',
      description: 'Guides, pricing, SDK references, and examples.',
      href: links.docs,
    },
    links.paper && {
      icon: FileText,
      title: 'Research Paper',
      description: 'Technical report on architecture, training, and benchmarks.',
      href: links.paper,
    },
    links.weights && {
      icon: Download,
      title: 'Download Weights',
      description: 'Open weights on HuggingFace for local deployment.',
      href: links.weights,
    },
    links.github && {
      icon: ExternalLink,
      title: 'GitHub',
      description: 'Source code, examples, and community contributions.',
      href: links.github,
    },
    links.community && {
      icon: Users,
      title: 'Community',
      description: 'Join Discord or forums for help and discussion.',
      href: links.community,
    },
  ].filter(Boolean) as { icon: React.ComponentType<{ className?: string }>; title: string; description: string; href: string }[]

  if (cards.length === 0) return null

  const gridCols = cards.length === 1
    ? ''
    : cards.length === 2
      ? 'sm:grid-cols-2'
      : cards.length <= 4
        ? 'sm:grid-cols-2 lg:grid-cols-4'
        : 'sm:grid-cols-2 md:grid-cols-3'

  return (
    <nav aria-label="External resources and quick links" className="max-w-5xl mx-auto px-6 md:px-8 py-12">
      <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-6">Resources</h2>
      <ul className={`grid gap-4 ${gridCols} list-none`} role="list">
        {cards.map((card) => (
          <li key={card.title}>
            <a
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col h-full p-5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/50 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-600 transition-all duration-200"
            >
              <ArrowRight className="absolute top-4 right-4 w-3.5 h-3.5 text-neutral-300 dark:text-neutral-600 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
              <div className="w-9 h-9 rounded-lg bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center mb-3 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                <card.icon className="w-4 h-4 text-neutral-500 dark:text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 mb-1">{card.title}</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 flex-1 line-clamp-2">{card.description}</p>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/** Hook to track active section for TOC highlighting */
function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    )

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [sectionIds])

  return activeId
}

/** Floating table of contents as semantic <nav> */
const FloatingTOC = ({
  sections,
  activeId,
  show,
}: {
  sections: { id: string; title?: string }[]
  activeId: string
  show: boolean
}) => {
  const titled = sections.filter((s) => s.title)

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav
      aria-label="Table of contents"
      className={`hidden xl:block fixed left-6 top-1/2 -translate-y-1/2 z-40 max-w-[180px] transition-opacity duration-200 ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
    >
      <ul className="space-y-1 list-none" role="list">
        {titled.map((s) => {
          const isActive = activeId === s.id
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={(e) => handleClick(e, s.id)}
                aria-current={isActive ? 'location' : undefined}
                className={`block text-xs py-1.5 pl-3 border-l-2 transition-all duration-200 ${isActive
                  ? 'border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100 font-medium'
                  : 'border-transparent text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-600'
                  }`}
              >
                {s.title}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

/**
 * ------------------------------------------------------------------
 * MAIN LAYOUT COMPONENT
 * Assembles the template with full semantic structure.
 * ------------------------------------------------------------------
 */
export default function TemplateModelPage() {
  const { meta, analysis, intro, sections, pricingData, chatLimits, sentimentFeed, benchmarks } = MODEL_DATA
  const sectionIds = sections.map((s) => s.id).filter(Boolean)
  const activeSection = useActiveSection(sectionIds)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const [showToc, setShowToc] = useState(false)

  useEffect(() => {
    const updateVisibility = () => {
      const marqueeEl = marqueeRef.current
      if (!marqueeEl) return
      const marqueeTop = marqueeEl.getBoundingClientRect().top
      const shouldShow = marqueeTop <= 80
      setShowToc((prev) => (prev === shouldShow ? prev : shouldShow))
    }

    updateVisibility()
    window.addEventListener('scroll', updateVisibility, { passive: true })
    window.addEventListener('resize', updateVisibility)
    return () => {
      window.removeEventListener('scroll', updateVisibility)
      window.removeEventListener('resize', updateVisibility)
    }
  }, [])

  return (
    <article
      className="relative min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans selection:bg-blue-100 dark:selection:bg-blue-900"
      aria-labelledby="model-title"
    >
      {/* Skip link for keyboard/screen reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-neutral-900 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Skip to main content
      </a>

      <div className="relative z-10">
        {/* Hero section - full bleed with white background */}
        <header className="relative min-h-[90vh] flex flex-col justify-center px-6 py-12 md:px-12 max-w-7xl mx-auto bg-white dark:bg-neutral-900 md:rounded-b-3xl md:shadow-sm">
          <HeroLogoBackground name={meta.organization} />
          <div className="relative z-10 grid lg:grid-cols-[1fr,400px] gap-12 flex-1 items-center">
            <div className="flex flex-col justify-center">
              <ModelHeader
                name={meta.name}
                family={meta.family}
                organization={meta.organization}
                releaseDate={meta.releaseDate}
                releaseDateDisplay={meta.releaseDateDisplay}
                identity={meta.identity}
                tags={meta.tags}
                links={meta.links}
              />
            </div>

            <aside className="flex flex-col justify-center bg-neutral-50/80 dark:bg-neutral-900/80 backdrop-blur-sm rounded-2xl p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm" aria-label="Model analysis summary">
              <StrengthsWeaknesses
                strengths={analysis.strengths}
                weaknesses={analysis.weaknesses}
                unknowns={analysis.unknowns}
              />
            </aside>
          </div>

          <div className="mt-16 max-w-3xl relative z-10">
            <p className="text-lg md:text-xl leading-relaxed text-neutral-600 dark:text-neutral-300 font-light first-letter:text-4xl first-letter:font-bold first-letter:text-neutral-900 dark:first-letter:text-neutral-100 first-letter:mr-1 first-letter:float-left first-letter:leading-none">
              {intro.text}
            </p>
          </div>
        </header>

        {/* Community sentiment - bridges hero and content */}
        <div ref={marqueeRef} className="py-8 md:py-12">
          <SentimentMarquee items={sentimentFeed} />
        </div>

        {/* Table of contents */}
        <FloatingTOC sections={sections} activeId={activeSection} show={showToc} />

        {/* Main content sections - elevated paper effect */}
        <main 
          id="main-content" 
          className="max-w-4xl mx-auto px-6 py-10 md:px-12 md:py-14 space-y-4 bg-white dark:bg-neutral-900 md:rounded-2xl md:shadow-sm md:border border-neutral-200 dark:border-neutral-800 mb-12" 
          tabIndex={-1}
        >
          {sections.map((section, idx) => (
            <React.Fragment key={section.id ?? idx}>
              <ContentSection id={section.id} title={section.title} subtitle={section.subtitle} specs={section.specs}>
                {section.content}

                {section.hasBenchmarks && benchmarks && (
                  <BenchmarkChart benchmarks={benchmarks} />
                )}

                {section.hasPricing && (
                  <PricingCalculator apiData={pricingData} chatData={chatLimits} />
                )}

                {section.expandable && (
                  <ExpandableSection title={section.expandable.title} preview={section.expandable.preview}>
                    {section.expandable.content}
                  </ExpandableSection>
                )}
                {section.expandables && (
                  <div className="space-y-4">
                    {section.expandables.map((exp, i) => (
                      <ExpandableSection key={i} title={exp.title} preview={exp.preview}>
                        {exp.content}
                      </ExpandableSection>
                    ))}
                  </div>
                )}
              </ContentSection>

              {section.socialData && (
                <SocialEmbed
                  {...(section.socialData as {
                    type?: 'tweet' | 'quote'
                    author: string
                    handle?: string
                    content: string
                    date?: string
                    dateDisplay?: string
                    url?: string
                  })}
                />
              )}
            </React.Fragment>
          ))}
        </main>

        {/* Resource links - full width section */}
        <div className="bg-white dark:bg-neutral-900 pt-4">
          <CTACards links={meta.links} />
        </div>

        {/* Footer */}
        <footer className="bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800 py-10 text-center">
          <p className="text-sm text-neutral-400 dark:text-neutral-500">
            <small>© <time dateTime={new Date().getFullYear().toString()}>{new Date().getFullYear()}</time> Model Analysis. All rights reserved.</small>
          </p>
        </footer>
      </div>
    </article>
  )
}
