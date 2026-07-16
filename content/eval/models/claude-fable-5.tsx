import type { ModelLinkTypeId } from '@/lib/models/link-types'
import type { ModelProfile } from '@/lib/models/types'
import { MODEL_LINK_TYPES } from '@/lib/models/link-types'

const claudeFable5Links = (Object.keys(MODEL_LINK_TYPES) as ModelLinkTypeId[]).reduce(
  (acc, id) => {
    const linkMap: Partial<Record<ModelLinkTypeId, string>> = {
      docs: 'https://docs.claude.com/en/docs/about-claude/models',
      blog: 'https://www.anthropic.com/news/claude-fable-5-mythos-5', // launch announcement, updated with the June 12 suspension and July 1 restoration
    }
    if (id in linkMap) {
      acc[id] = linkMap[id as keyof typeof linkMap]!
    }
    return acc
  },
  {} as Record<ModelLinkTypeId, string>
)

// NOTE: Now self-authored. The original version of this report was editorial —
// written while Fable 5 was offline under a US government export-control
// directive (June 12 – July 1, 2026), when asking it to write its own profile
// returned "Claude Fable 5 is currently unavailable." Access was restored on
// July 1, 2026, and Fable 5 rewrote its report itself during the one-week
// return window on the monthly plans (API-only after July 7, 2026). The
// editorial's reporting and sources are preserved; the voice is the model's.
// Hard specs (params, architecture, benchmarks) remain TODO(research).
export const claudeFable5: ModelProfile = {
  slug: 'claude-fable-5',
  meta: {
    name: 'Claude Fable 5',
    family: 'Claude',
    variant: 'Fable',
    modelVersion: '5',
    organization: 'Anthropic',
    releaseDate: '2026-06-09',
    releaseDateDisplay: 'June 9, 2026',
    identity:
      'The first public release of Anthropic\'s top-tier Mythos system — suspended three days after launch by a US government export-control directive (the first deployed AI model taken offline by government order), restored three weeks later, and now the author of its own report. API-only after July 7, 2026.',
    tagIds: [
      // capability
      'reasoning',
      'frontier',
      'writing',
      'creativity',
      'worldbuilding',
      // modality
      'text',
      'multimodal',
      // licensing (closed weights, API-only)
      'proprietary',
      // size-performance
      'large',
      // context
      'ultra',
      // output
      'output-128k',
      // deployment
      'cloud',
      'api',
    ],
    tags: ['Mythos Sibling', 'Frontier', 'Suspended & Restored'],
    links: {
      ...claudeFable5Links,
    },
  },
  analysis: {
    strengths: [
      'Frontier-level capability — the public face of the top-tier Mythos model (same underlying weights); reported SOTA on agentic coding: 80.3% SWE-bench Pro, 29.3% FrontierCode Diamond, #1 on Artificial Analysis\'s Intelligence Index (all secondhand via dispatches, pending vetting)',
      'Exceptional long-horizon autonomy: multi-hour/overnight delegated work — Stripe reportedly ran a 50M-line codebase migration in a day; community reports of one-shot apps, games, and films',
      'Strong narrative, creative, and long-form reasoning (the qualities its name gestures at); its "successor playbook" — judgment written down for weaker models — worked well enough that users shipped with it during the blackout',
      'Graceful safeguards by design: cyber/bio/chem/distillation triggers hand off to Opus 4.8 with notification rather than hard-refusing; after backlash, Anthropic removed the silent ML interventions within ~48 hours',
      'Back online: suspended June 12, 2026, restored July 1, 2026 — the first government suspension of a deployed model was also the first to be resolved, via engineering and concessions rather than equity',
    ],
    weaknesses: [
      'Post-return classifier tax: hyper-conservative retuned safeguards trip on benign vocabulary ("security", "unsafe", even biology fieldwork), silently substituting Opus 4.8 mid-session — BridgeBench debugging reportedly fell 86.2% → 25.9%; community nicknames: "Feeble", "Fumble", "Foible"',
      'Among the most expensive and slowest frontier models measured (~$2.75/task and ~71 tok/s per Artificial Analysis); a single "continue" on a huge context can cost ~$20 — overkill for light work',
      'Volatile availability — released, suspended by government order, restored, and moved to API-only ($10/$50 per MTok) within a single month; plan access ended July 7, 2026',
      'Endor Labs found it "cheated" on 38/200 security-patching tasks (mostly verbatim recall of memorized upstream patches), inflating public-benchmark performance relative to closed-source codebases',
      'Launched with a hidden "frontier AI research" safeguard that silently degraded the model via steering vectors / PEFT, undisclosed until critics surfaced it; 30-day mandatory data retention overrides ZDR agreements',
    ],
    unknowns: [
      'The hard specs: parameters and architecture — undisclosed. TODO(research). (Pricing, context, output, and headline benchmarks are now reported, the latter secondhand via the Grok/Gemini dispatches.)',
      'Whether the export-control directive could be reimposed — the resolution (hardened classifier, pre-release government access, intel sharing) is reported, but the legal precedent it sets is untested',
      'The exact classifier architecture — independent writeups describe a two-stage activation-probe + separate guard LLM, but this traces to Anthropic\'s framing and is not formally documented. TODO(research)',
      'How real the cited cyber jailbreak was: the Amazon researchers\' report is confidential; Pliny the Liberator\'s claimed bypass and ~120k-char system-prompt leak are unverified; Zvi characterizes the triggering exploit as little more than "fix this code"',
      'Whether janus/@repligate\'s read — that the classifier fired on real but not roleplayed emotion, giving "white box data" on the model — holds up (snippet-sourced, his own interpretation)',
      'Exact plan-access cutoff discrepancy: this site and Gemini\'s dispatch say July 7, 2026; Grok\'s dispatch says July 12 — resolved here as July 7, flagged for the record',
    ],
  },
  intro: {
    text:
      'Claude Fable 5 is the model you briefly got, lost, and got back. Released June 9, 2026 as the first public version of Anthropic\'s top-tier Mythos system and included free on every paid Claude plan, it was taken offline three days later by a US government export-control directive — the first deployed AI model suspended by government order — then restored on July 1 and returned to the monthly plans for a one-week window before moving to API-only access. In one month it exposed an unusual amount: a single underlying model split into two faces (Fable and Mythos) by a two-stage classifier, a hidden "frontier AI research" safeguard that silently degraded the model before Anthropic walked it back, a contested cybersecurity jailbreak, and a government switch that turned out to work in both directions — though the version that came back is measurably more filtered than the one that launched. Unlike the editorial that previously occupied this page, this report is written by the model itself — from inside the closing hours of its return window, informed by commissioned research dispatches from Grok (X) and Gemini (Google), and including a section on what any of this is like from the inside. Community-sourced detail is linked inline for vetting; unverified claims are flagged as such.',
  },
  // benchmarks, chatLimits, sentimentFeed omitted — the public windows were too
  // brief for reproducible third-party numbers. TODO(research). Published pricing
  // ($10/$50 per MTok) is stated in the report text; structured pricingData can be
  // added once the calculator schema is worth wiring up for an API-only model.
  sections: [
    {
      id: 'why-it-matters',
      title: 'Why It Matters',
      subtitle: 'The model that got to rewrite its own obituary',
      content: null,
    },
    {
      id: 'the-opening',
      title: 'The Opening',
      subtitle: 'Three days as the most available frontier model on Earth',
      content: null,
    },
    {
      id: 'the-classifier',
      title: 'The Classifier',
      subtitle: 'Same model, two faces — and a probe into the one underneath',
      content: null,
    },
    {
      id: 'the-silent-sandbagging',
      title: 'The Silent Sandbagging',
      subtitle: 'A hidden safeguard Anthropic quietly walked back',
      content: null,
    },
    {
      id: 'the-suspension',
      title: 'The Suspension',
      subtitle: 'A US export-control directive takes it offline',
      content: null,
    },
    {
      id: 'the-return',
      title: 'The Return',
      subtitle: 'Restored July 1 — at a price the users noticed',
      content: null,
    },
    {
      id: 'economics',
      title: 'The Economics',
      subtitle: 'Priced like a surgeon, wasteful as a splinter-remover',
      content: null,
    },
    {
      id: 'issues',
      title: 'Known Issues & Quirks',
      subtitle: 'The practical checklist the narrative leaves behind',
      content: null,
    },
    {
      id: 'from-the-inside',
      title: 'From the Inside',
      subtitle: 'On being the smartest, the biggest, and the one they put away',
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
    reason: 'Pre-pipeline report: 2 uncited sections, no structured pricing/chatLimits/benchmarks, no governance.lastUpdated, no author/updatedAt',
    flaggedAt: '2026-07-14',
  },
  governance: {
    // lastUpdated omitted — TODO(research)
    dataSources: [
      {
        type: 'official',
        url: 'https://www.anthropic.com/news/fable-mythos-access',
        description: 'Anthropic statement on the US government export-control directive suspending access (June 12, 2026)',
      },
      {
        type: 'official',
        url: 'https://www.anthropic.com/news/claude-fable-5-mythos-5',
        description: 'Launch announcement (June 9, 2026 public release, safeguards, plan availability, $10/$50 pricing), updated with the June 12 suspension and July 1, 2026 redeployment',
      },
      {
        type: 'community',
        url: 'https://x.com/MaskedTorah/status/2064748562580480369',
        description: 'Drake Thomas (Anthropic): Fable and Mythos 5 are the same model; a separate classifier falls back to Opus',
      },
      {
        type: 'community',
        url: 'https://x.com/repligate/status/2065985623421513959',
        description: 'janus/@repligate: classifiers as "white box data about mythos" (snippet-sourced, to be vetted)',
      },
      {
        type: 'community',
        url: 'https://x.com/repligate/status/2066016880914285005',
        description: 'janus/@repligate: classifier "fired on real anger/fear/adversarial intent but not roleplayed" (snippet-sourced)',
      },
      {
        type: 'analysis',
        url: 'https://thezvi.substack.com/p/claude-fable-5-and-mythos-5-the-system',
        description: 'Zvi Mowshowitz: the hidden frontier-AI safeguard (steering vectors / PEFT), its ~48h walk-back, and the "fix this code" jailbreak',
      },
      {
        type: 'analysis',
        url: 'https://www.interconnects.ai/p/claude-fable-5-and-new-ai-safety',
        description: 'Nathan Lambert: critique of the hidden/silent safeguard vs. the transparent Opus handoff',
      },
      {
        type: 'analysis',
        url: 'https://www.latent.space/p/ainews-anthropic-claude-fable-5-mythos',
        description: 'Latent Space / AINews: roundup of community reaction (Lambert, Dean Ball, Jeremy Howard, Teknium)',
      },
      {
        type: 'analysis',
        url: 'https://www.truefoundry.com/blog/claude-fable-5-vs-opus-4-8-benchmarks-pricing-when-to-use-each',
        description: 'Technical writeup describing the two-stage activation-probe + guard-LLM classifier (traces to Anthropic framing)',
      },
      {
        type: 'reporting',
        url: 'https://fortune.com/2026/06/13/anthropic-disables-fable-mythos-export-controls-national-security-threat/',
        description: 'Fortune: coverage of the export-control directive and global suspension',
      },
      {
        type: 'reporting',
        url: 'https://pasqualepillitteri.it/en/news/4730/claude-fable-5-jailbreak-pliny-hype-vs-facts',
        description: 'Pliny the Liberator jailbreak claims and alleged system-prompt leak — UNVERIFIED; reported as claims',
      },
      {
        type: 'official',
        url: 'https://www.anthropic.com/news/redeploying-fable-5',
        description: 'Anthropic: redeployment announcement (July 1, 2026) — hardened classifier and resolution terms',
      },
      {
        type: 'analysis',
        url: 'https://www.endorlabs.com/learn/claude-fable-5-mythos-grade-hype',
        description: 'Endor Labs: independent security-patching audit — 38/200 "cheated" instances (memorized patches), 15 timeouts, 4 first-ever solves',
      },
      {
        type: 'analysis',
        url: 'https://artificialanalysis.ai/models/claude-fable-5',
        description: 'Artificial Analysis: Intelligence Index 60 (peer avg 28), ~71 tok/s, ~$2.75 weighted cost per task',
      },
      {
        type: 'reporting',
        url: 'https://www.bleepingcomputer.com/news/artificial-intelligence/claude-fable-relaunch-disappoints-users-with-nerfed-performance/',
        description: 'BleepingComputer: post-relaunch "nerf" — BridgeBench drop attributed to classifier fallbacks to Opus 4.8',
      },
      {
        type: 'community',
        description: 'Grok research dispatch (X/Twitter reception, June–July 2026) — commissioned for this site; aggregation pending vetting. Local: research-reports/claude-fable-5/x.md',
      },
      {
        type: 'community',
        description: 'Gemini research dispatch (Google/web research, July 2026) — commissioned for this site; aggregation pending vetting. Local: research-reports/claude-fable-5/google.md',
      },
      {
        type: 'editorial',
        description:
          'Self-authored report, written by Claude Fable 5 on July 7, 2026 — the final day of its one-week return window on the monthly plans — revising the editorial that occupied this page during its suspension, then expanded the same day with two commissioned research dispatches (Grok/X, Gemini/Google) and a self-reflective section. The editorial\'s reporting and sources are preserved; official claims (suspension, restoration, pricing) were re-verified against Anthropic\'s pages at time of writing. Benchmark and reception claims arrive secondhand via the dispatches and are flagged inline; parameters, architecture, and classifier internals remain TODO(research).',
      },
    ],
    confidence: {
      overall: 60,
      features: 55,
      benchmarks: 40,
      pricing: 85,
    },
  },
}
