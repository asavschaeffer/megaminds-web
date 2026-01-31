/**
 * Zod validation schemas for ModelProfile
 * Runtime type safety for model data
 */

import { z } from 'zod'
import type { ModelTagId } from './tags'
import type { ModelLinkTypeId } from './link-types'
import type { OrganizationId } from './organizations'

export const SentimentEnum = z.enum(['positive', 'neutral', 'critical'])
export type Sentiment = z.infer<typeof SentimentEnum>

export const SectionVariantEnum = z.enum(['default', 'technical', 'advanced', 'social'])
export type SectionVariant = z.infer<typeof SectionVariantEnum>

export const NameOrderEnum = z.enum(['family-version-variant', 'family-variant-version'])
export type NameOrder = z.infer<typeof NameOrderEnum>

export const SocialEmbedTypeEnum = z.enum(['tweet', 'quote'])
export type SocialEmbedType = z.infer<typeof SocialEmbedTypeEnum>

const AnalysisItemSchema = z.object({
  text: z.string(),
  detail: z.string().optional(),
  source: z.string().optional(),
})

const ModelAnalysisSchema = z.object({
  strengths: z.array(z.union([z.string(), AnalysisItemSchema])),
  weaknesses: z.array(z.union([z.string(), AnalysisItemSchema])),
  unknowns: z.array(z.union([z.string(), AnalysisItemSchema])).optional(),
})

const ApiPricingSchema = z.object({
  input: z.number().nonnegative(),
  output: z.number().nonnegative(),
  cachedInput: z.number().nonnegative().optional(),
  currency: z.string().default('USD'),
  unit: z.string().default('per million tokens'),
  provider: z.string().optional(),
})

const ChatTierSchema = z.object({
  label: z.string(),
  maxMsgs: z.number().int().nonnegative(),
  price: z.string(),
})

const ChatProviderSchema = z.object({
  name: z.string(),
  tiers: z.array(ChatTierSchema),
})

const BenchmarkScoreSchema = z.object({
  name: z.string(),
  score: z.number(),
  maxScore: z.number(),
  comparison: z.string().optional(),
  source: z.string().optional(),
})

const SentimentItemSchema = z.object({
  author: z.string(),
  handle: z.string().optional(),
  content: z.string(),
  sentiment: SentimentEnum,
  url: z.string().optional(),
  date: z.string().optional(),
  dateDisplay: z.string().optional(),
})

const SocialEmbedDataSchema = z.object({
  type: SocialEmbedTypeEnum,
  author: z.string(),
  handle: z.string().optional(),
  content: z.string(),
  date: z.string().optional(),
  dateDisplay: z.string().optional(),
  url: z.string().optional(),
})

const ExpandableBlockSchema = z.object({
  title: z.string(),
  preview: z.string(),
  content: z.union([z.string(), z.any()]),
})

const TechSpecSchema = z.object({
  label: z.string(),
  value: z.string(),
  icon: z.string().optional(),
})

const ContentSectionSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  subtitle: z.any().optional(),
  variant: SectionVariantEnum.optional(),
  content: z.any(),
  specs: z.array(TechSpecSchema).optional(),
  hasBenchmarks: z.boolean().optional(),
  hasPricing: z.boolean().optional(),
  expandable: ExpandableBlockSchema.optional(),
  expandables: z.array(ExpandableBlockSchema).optional(),
  socialData: SocialEmbedDataSchema.optional(),
})

const ModelLinksSchema = z.object({
  chat: z.string().optional(),
  playground: z.string().optional(),
  api: z.string().optional(),
  docs: z.string().optional(),
  paper: z.string().optional(),
  weights: z.string().optional(),
  github: z.string().optional(),
  community: z.string().optional(),
  blog: z.string().optional(),
  demo: z.string().optional(),
  pricing: z.string().optional(),
  changelog: z.string().optional(),
  tutorials: z.string().optional(),
})

const PricingSourceSchema = z.object({
  label: z.string(),
  href: z.string().url(),
  provider: z.string().optional(),
})

const GovernanceSchema = z.object({
  lastUpdated: z.string().optional(),
  dataSources: z.array(
    z.object({
      type: z.string(),
      url: z.string().url().optional(),
      description: z.string().optional(),
    })
  ).optional(),
  confidence: z.object({
    overall: z.number().min(0).max(100).optional(),
    pricing: z.number().min(0).max(100).optional(),
    benchmarks: z.number().min(0).max(100).optional(),
    features: z.number().min(0).max(100).optional(),
  }).optional(),
})

const ModelMetaSchema = z.object({
  name: z.string(),
  family: z.string().optional(),
  variant: z.string().optional(),
  modelVersion: z.string().optional(),
  nameOrder: NameOrderEnum.optional(),
  organizationId: z.string().optional(),
  organization: z.string().optional(),
  releaseDate: z.string().optional(),
  releaseDateDisplay: z.string().optional(),
  identity: z.string(),
  tagIds: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  links: ModelLinksSchema,
  subscriptionPlans: z.array(z.string()).optional(),
  apiRates: ApiPricingSchema.optional(),
  pricingSources: z.array(PricingSourceSchema).optional(),
  chatLimits: z.object({
    free: z.number().int().nonnegative().optional(),
    plans: z.array(
      z.object({
        name: z.string(),
        messages: z.number().int().nonnegative(),
        price: z.string(),
      })
    ).optional(),
  }).optional(),
})

const PricingDataSchema = z.object({
  baseModel: z.object({
    name: z.string(),
    input: z.number().nonnegative(),
    output: z.number().nonnegative(),
    provider: z.string().optional(),
  }),
  competitors: z.array(
    z.object({
      name: z.string(),
      input: z.number().nonnegative(),
      output: z.number().nonnegative(),
      provider: z.string().optional(),
    })
  ).optional(),
})

const ModelProfileSchema = z.object({
  slug: z.string(),
  meta: ModelMetaSchema,
  analysis: ModelAnalysisSchema,
  intro: z.object({
    text: z.string(),
  }),
  pricingData: PricingDataSchema.optional(),
  chatLimits: z.array(ChatProviderSchema).optional(),
  benchmarks: z.array(BenchmarkScoreSchema).optional(),
  sentimentFeed: z.array(SentimentItemSchema).optional(),
  sections: z.array(ContentSectionSchema),
  glossary: z.any().optional(),
  updatedAt: z.string().optional(),
  author: z.string().optional(),
  governance: GovernanceSchema.optional(),
})

export function validateModelProfile(data: unknown) {
  return ModelProfileSchema.safeParse(data)
}

export function validateModelProfileStrict(data: unknown) {
  return ModelProfileSchema.parse(data)
}

export type ModelProfileInput = z.input<typeof ModelProfileSchema>
export type ModelProfileOutput = z.output<typeof ModelProfileSchema>

export default ModelProfileSchema
