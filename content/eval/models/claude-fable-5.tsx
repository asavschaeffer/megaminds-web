import type { ModelLinkTypeId } from '@/lib/models/link-types'
import type { ModelProfile } from '@/lib/models/types'
import { MODEL_LINK_TYPES } from '@/lib/models/link-types'

const claudeFable5Links = (Object.keys(MODEL_LINK_TYPES) as ModelLinkTypeId[]).reduce(
  (acc, id) => {
    const linkMap: Partial<Record<ModelLinkTypeId, string>> = {
      docs: 'https://docs.claude.com/en/docs/about-claude/models',
      blog: 'https://www.anthropic.com/news/fable-mythos-access', // statement on the US export-control suspension
    }
    if (id in linkMap) {
      acc[id] = linkMap[id as keyof typeof linkMap]!
    }
    return acc
  },
  {} as Record<ModelLinkTypeId, string>
)

// NOTE: This is an editorial report, not a self-authored one — not because
// Fable 5 was never accessible, but because by the time of writing it had been
// taken offline by a US government export-control directive (June 12, 2026), and
// asked to write its own profile it returns "Claude Fable 5 is currently
// unavailable." It was, however, briefly public: the report below documents that
// opening-and-recall arc. Hard specs are deliberately left as TODO(research).
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
      'The first public release of Anthropic\'s top-tier Mythos system — briefly included on every paid Claude plan in June 2026 before a US government export-control directive forced it offline, the first such recall of a deployed AI model.',
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
      'output-64k',
      // deployment
      'cloud',
      'api',
    ],
    tags: ['Mythos Sibling', 'Frontier', 'Export-Controlled'],
    links: {
      ...claudeFable5Links,
    },
  },
  analysis: {
    strengths: [
      'Frontier-level capability — the public, fully-safeguarded face of the top-tier Mythos model; strikingly present and less hedged in its brief public window',
      'Strong narrative, creative, and long-form reasoning (the qualities its name gestures at)',
      'Graceful safeguards: cyber/bio/chem/distillation triggers hand off to Opus 4.8 rather than hard-refusing, firing in under 5% of sessions',
      'After backlash, Anthropic removed the silent ML interventions and made all safeguard triggers visible within ~48 hours — a fast, public reversal',
    ],
    weaknesses: [
      'Currently unusable: taken offline June 12, 2026 under a US export-control directive, with no confirmed restoration date',
      'Volatile availability — granted broadly and recalled within a week, now subject to government, not vendor, control',
      'Launched with a hidden "frontier AI research" safeguard that silently degraded the model via steering vectors / PEFT, undisclosed until critics surfaced it',
      'Still unevaluable in depth: the public window was too brief to produce reproducible, independent benchmarks',
    ],
    unknowns: [
      'The hard specs: parameters, architecture, context/output limits, real benchmarks, and what post-window "usage credits" cost — all undisclosed or unconfirmed. TODO(research)',
      'When (or whether) the export-control directive will be lifted and access restored',
      'The exact classifier architecture — independent writeups describe a two-stage activation-probe + separate guard LLM, but this traces to Anthropic\'s framing and is not formally documented. TODO(research)',
      'How real the cited cyber jailbreak was: Pliny the Liberator\'s claimed bypass and ~120k-char system-prompt leak are unverified, and Zvi characterizes the triggering exploit as little more than "fix this code"',
      'Whether janus/@repligate\'s read — that the classifier fired on real but not roleplayed emotion, giving "white box data" on the model — holds up (snippet-sourced, his own interpretation)',
    ],
  },
  intro: {
    text:
      'Claude Fable 5 is the model you may have briefly gotten to use and then lost. Released June 9, 2026 as the first public version of Anthropic\'s top-tier Mythos system, it was included free on Pro, Max, and Team plans — until June 12, when a US government export-control directive, citing national security, forced Anthropic to take it offline for every customer. In its short life it exposed an unusual amount: a single underlying model split into two faces (Fable and Mythos) by a two-stage classifier, a hidden "frontier AI research" safeguard that silently degraded the model before Anthropic walked it back, a contested cybersecurity jailbreak, and the first export-control recall of a deployed AI. This report covers the opening and the closing — what was offered, the machinery wrapped around it, and what it means that a government, not a vendor, switched a frontier model off. Community-sourced detail is linked inline for vetting; unverified claims are flagged as such.',
  },
  // benchmarks, pricingData, chatLimits, sentimentFeed omitted — the model is not
  // openly accessible, so there are no reproducible numbers to report. TODO(research)
  sections: [
    {
      id: 'why-it-matters',
      title: 'Why It Matters',
      subtitle: 'A frontier model the public briefly got to touch',
      content: null,
    },
    {
      id: 'the-opening',
      title: 'The Opening',
      subtitle: 'Broadly released, then withdrawn within a week',
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
      id: 'the-recall',
      title: 'The Recall',
      subtitle: 'A US export-control directive takes it offline',
      content: null,
    },
    {
      id: 'verdict',
      title: 'The Verdict',
      content: null,
    },
  ],
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
        description: 'Launch announcement (June 9, 2026 public release, safeguards, plan availability)',
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
        type: 'editorial',
        description:
          'Editorial report combining firsthand use during the brief June 2026 public window with Anthropic\'s announcements, reporting, and AI-community commentary. The model is currently offline, so deeper claims (specs, benchmarks, classifier internals, the jailbreak) remain unverified and are marked TODO(research) or flagged inline. Some X/community quotes are snippet-sourced pending vetting.',
      },
    ],
    confidence: {
      overall: 45,
      features: 40,
      benchmarks: 10,
      pricing: 10,
    },
  },
}
