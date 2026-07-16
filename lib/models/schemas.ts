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

// ——— analysis ———

export const AnalysisItemSchema = z.object({
  text: z.string(),
  detail: z.string().optional(),
  source: z.string().optional(),
})

export const ModelAnalysisSchema = z.object({
  strengths: z.array(z.union([z.string(), AnalysisItemSchema])),
  weaknesses: z.array(z.union([z.string(), AnalysisItemSchema])),
  unknowns: z.array(z.union([z.string(), AnalysisItemSchema])).optional(),
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
