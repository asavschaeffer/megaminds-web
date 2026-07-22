/**
 * The canonical model data model.
 *
 * Every persisted shape in the model system is defined here exactly once, as
 * a Zod schema. The TypeScript types in ./types.ts are inferred from these
 * schemas, and the registry validates every profile against them at load —
 * so static typing and runtime validation cannot drift apart.
 *
 * Vocabulary fields (tag ids, link-type ids, organization ids) validate
 * against their runtime catalogs via z.custom, keeping those modules the
 * single source of truth for their own id spaces.
 */

import { z } from 'zod'
import type { ReactNode } from 'react'
import { isValidTagId, type ModelTagId } from './tags'
import { isValidLinkTypeId, type ModelLinkTypeId } from './link-types'
import { isValidOrganizationId, type OrganizationId } from './organizations'
import type { BrandStyle } from './branding'

// ——— enums ———

export const SentimentSchema = z.enum(['positive', 'neutral', 'critical'])
export const SectionVariantSchema = z.enum(['default', 'technical', 'advanced', 'social'])
export const NameOrderSchema = z.enum(['family-version-variant', 'family-variant-version'])
export const SocialEmbedTypeSchema = z.enum(['tweet', 'quote'])
export const EditorialStatusSchema = z.enum(['current', 'flagged-for-rewrite'])
export const ContentSourceSchema = z.enum(['mdx', 'inline'])

// ——— vocabulary ids (validated against their runtime catalogs) ———

export const ModelTagIdSchema = z.custom<ModelTagId>(
  (value) => typeof value === 'string' && isValidTagId(value),
  'unknown tag id (see lib/models/tags.ts)'
)

export const ModelLinkTypeIdSchema = z.custom<ModelLinkTypeId>(
  (value) => typeof value === 'string' && isValidLinkTypeId(value),
  'unknown link type id (see lib/models/link-types.ts)'
)

export const OrganizationIdSchema = z.custom<OrganizationId>(
  (value) => typeof value === 'string' && isValidOrganizationId(value),
  'unknown organization id (see lib/models/organizations.ts)'
)

// React content and brand styling pass through typed but unvalidated.
const ReactNodeSchema = z.custom<ReactNode>()
const BrandStyleSchema = z.custom<BrandStyle>()

// ——— norm-critical primitive brands ———
//
// Two atoms the editorial constitution cares about, branded so a raw string
// can't stand in for a validated one anywhere downstream — construction is
// forced through the schema. These are the ONLY brands in the model system;
// brand proliferation is ceremony.

/** ISO calendar date (YYYY-MM-DD). Display formatting happens at render time. */
export const IsoDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Dates are ISO YYYY-MM-DD; format for display at render time, do not store display strings')
  .brand<'IsoDate'>()

/** An https URL. The site cites primary sources; http and bare labels are not citations. */
export const HttpsUrlSchema = z
  .url()
  .refine((u) => u.startsWith('https://'), 'Citations must be https URLs')
  .brand<'HttpsUrl'>()

// ——— citations (provenance as a first-class type) ———
//
// "Never invent a number" compiles to: no external fact enters the registry
// without a URL. A citation is a structured source, not a bare string.

export const CitationSchema = z.strictObject({
  url: HttpsUrlSchema,
  /** Human label; derive from hostname when absent. */
  label: z.string().max(80).optional(),
  kind: z.enum(['primary', 'vendor-docs', 'benchmark', 'press', 'community']).optional(),
  accessed: IsoDateSchema.optional(),
})

// ——— analysis (the scannable ✓/✗/? index) ———
//
// The container is shaped so the right behavior is the path of least
// resistance. `claim` is the ONLY required field and is capped at one
// scannable line, so a short claim is the low-friction default. Everything
// that used to bloat the claim now has a typed home to be SORTED into —
// models sort well; the earlier schema asked them to COMPRESS, which is
// high-friction and, for honest self-assessment, impossible without lying.
//   - status  the claim's epistemic provenance (drains "…but I can't verify this")
//   - caveat  a co-equal honest qualification (drains the hedge without subordinating it)
//   - detail  longer elaboration, shown on demand
//   - source  a primary citation
// The cap is pressure to sort, not punishment for length. See the add-model
// skill (Phase 2) and section-catalog for the editorial rationale.

const MAX_CLAIM_WORDS = 15
const claimWordCount = (s: string) => s.trim().split(/\s+/).filter(Boolean).length

/**
 * Epistemic provenance of a claim. `self-reported` is the load-bearing value:
 * it collapses a whole "self-reports may be confabulated, check primary
 * sources" hedge-essay into one tag, and tells the reader to weigh the item as
 * first-person testimony rather than external fact.
 */
export const AnalysisStatusSchema = z.enum(['observed', 'inferred', 'self-reported'])

export const AnalysisItemSchema = z.strictObject({
  claim: z
    .string()
    .trim()
    .min(1)
    .max(140, 'Claim too long — this is a checklist line, not a sentence. Move elaboration into `detail`.')
    .refine((s) => claimWordCount(s) <= MAX_CLAIM_WORDS, {
      message: `Analysis claims are checklist lines: one claim, ≤${MAX_CLAIM_WORDS} words. Put the hedge in \`caveat\`, provenance in \`status\`, elaboration in \`detail\` — don't compress, sort.`,
    }),
  status: AnalysisStatusSchema.optional(),
  caveat: z.string().trim().max(200).optional(),
  detail: z.string().trim().max(600).optional(),
  source: CitationSchema.optional(),
})

export const ModelAnalysisSchema = z.strictObject({
  strengths: z.array(AnalysisItemSchema).min(1).max(8),
  weaknesses: z.array(AnalysisItemSchema).min(1).max(8),
  unknowns: z.array(AnalysisItemSchema).min(1).max(6).optional(),
})

// ——— pricing (the profile's own sourced rates; comparisons are computed) ———

export const ApiPricingSchema = z.object({
  input: z.number().nonnegative(),
  output: z.number().nonnegative(),
  cachedInput: z.number().nonnegative().optional(),
  currency: z.string().optional(),
  unit: z.string().optional(),
  provider: z.string().optional(),
})

export const PricingSourceSchema = z.object({
  label: z.string(),
  href: z.url(),
  provider: z.string().optional(),
})

export const ChatTierSchema = z.object({
  label: z.string(),
  maxMsgs: z.number().int().nonnegative(),
  price: z.string(),
})

export const ChatProviderSchema = z.object({
  name: z.string(),
  tiers: z.array(ChatTierSchema),
})

// ——— evidence modules ———

export const BenchmarkScoreSchema = z.object({
  name: z.string(),
  score: z.number(),
  maxScore: z.number(),
  comparison: z.string().optional(),
  source: z.string().optional(),
})

export const SentimentItemSchema = z.object({
  author: z.string(),
  handle: z.string().optional(),
  content: z.string(),
  sentiment: SentimentSchema,
  url: z.string().optional(),
  date: z.string().optional(),
  dateDisplay: z.string().optional(),
})

export const SocialEmbedDataSchema = z.object({
  type: SocialEmbedTypeSchema,
  author: z.string(),
  handle: z.string().optional(),
  content: z.string(),
  date: z.string().optional(),
  dateDisplay: z.string().optional(),
  url: z.string().optional(),
})

// ——— sections ———

export const ExpandableBlockSchema = z.object({
  title: z.string(),
  preview: z.string(),
  content: ReactNodeSchema,
  contentSource: ContentSourceSchema.optional(),
})

export const TechSpecSchema = z.object({
  label: z.string(),
  value: z.string(),
  icon: z.string().optional(),
})

export const ContentSectionSchema = z.object({
  /** Open vocabulary — every id in use is cataloged in ./section-catalog.ts */
  id: z.string(),
  title: z.string().optional(),
  subtitle: ReactNodeSchema.optional(),
  variant: SectionVariantSchema.optional(),
  content: ReactNodeSchema,
  contentSource: ContentSourceSchema.optional(),
  specs: z.array(TechSpecSchema).optional(),
  hasBenchmarks: z.boolean().optional(),
  hasPricing: z.boolean().optional(),
  expandable: ExpandableBlockSchema.optional(),
  expandables: z.array(ExpandableBlockSchema).optional(),
  socialData: SocialEmbedDataSchema.optional(),
})

// ——— glossary ———

export const DefinitionSchema = z.object({
  term: z.string(),
  definition: z.string(),
  furtherReading: z
    .array(
      z.object({
        label: z.string(),
        href: z.string(),
      })
    )
    .optional(),
})

export const GlossarySchema = z.record(z.string(), DefinitionSchema)

// ——— governance & editorial ———

export const DataSourceSchema = z.object({
  type: z.string(),
  url: z.url().optional(),
  description: z.string().optional(),
})

const confidenceScore = z.number().min(0).max(100).optional()

export const ConfidenceScoresSchema = z.object({
  overall: confidenceScore,
  pricing: confidenceScore,
  benchmarks: confidenceScore,
  features: confidenceScore,
})

export const GovernanceSchema = z.object({
  lastUpdated: z.string().optional(),
  dataSources: z.array(DataSourceSchema).optional(),
  confidence: ConfidenceScoresSchema.optional(),
})

export const EditorialSchema = z.object({
  status: EditorialStatusSchema,
  reason: z.string().optional(),
  flaggedAt: z.string().optional(),
})

// ——— meta ———

export const ModelLinksSchema = z.partialRecord(ModelLinkTypeIdSchema, z.string())

export const ChatLimitsSchema = z.object({
  free: z.number().int().nonnegative().optional(),
  plans: z
    .array(
      z.object({
        name: z.string(),
        messages: z.number().int().nonnegative(),
        price: z.string(),
      })
    )
    .optional(),
})

export const ModelMetaSchema = z.object({
  name: z.string(),
  family: z.string().optional(),
  variant: z.string().optional(),
  modelVersion: z.string().optional(),
  nameOrder: NameOrderSchema.optional(),
  organizationId: OrganizationIdSchema.optional(),
  organization: z.string().optional(),
  /**
   * The subject's canonical OpenRouter model id, copied verbatim from
   * openrouter.ai — e.g. "z-ai/glm-5.2". Recorded here once a model is authored
   * so re-runs and any display can reach it; the research/author scripts take it
   * as a --route arg at commission time (before the model is registered). The
   * vendor prefix picks the author backend: anthropic/ → Claude Code, openai/ →
   * Codex, everything else → OpenRouter passthrough.
   */
  providerRoute: z.string().optional(),
  releaseDate: z.string().optional(),
  releaseDateDisplay: z.string().optional(),
  identity: z.string(),
  tagIds: z.array(ModelTagIdSchema).optional(),
  /** Free-text spec chips for display ("1T Parameters", "256K Context") — not registry tags. */
  specChips: z.array(z.string()).optional(),
  /** Icon-manifest slug override when family/name don't resolve one (see model-cards). */
  iconSlug: z.string().optional(),
  links: ModelLinksSchema,
  subscriptionPlans: z.array(z.string()).optional(),
  apiRates: ApiPricingSchema.optional(),
  branding: BrandStyleSchema.optional(),
  pricingSources: z.array(PricingSourceSchema).optional(),
  chatLimits: ChatLimitsSchema.optional(),
})

// ——— the profile ———

export const ModelProfileSchema = z.object({
  slug: z.string(),
  meta: ModelMetaSchema,
  analysis: ModelAnalysisSchema,
  intro: z.object({
    text: z.string(),
  }),
  chatLimits: z.array(ChatProviderSchema).optional(),
  benchmarks: z.array(BenchmarkScoreSchema).optional(),
  sentimentFeed: z.array(SentimentItemSchema).optional(),
  sections: z.array(ContentSectionSchema),
  glossary: GlossarySchema.optional(),
  updatedAt: z.string().optional(),
  author: z.string().optional(),
  governance: GovernanceSchema.optional(),
  editorial: EditorialSchema.optional(),
})

export function validateModelProfile(data: unknown) {
  return ModelProfileSchema.safeParse(data)
}

export default ModelProfileSchema
