/**
 * Model system types.
 *
 * Data shapes are inferred from the canonical Zod schemas in ./schemas.ts —
 * nothing here redefines a persisted shape. What lives natively in this file
 * is only what Zod has no business knowing about: view models computed at
 * render time, the MDX loader's intermediate shapes, and component props.
 */

import type { ReactNode } from 'react'
import type { z } from 'zod'
import type { ModelTagId } from './tags'
import type {
  AnalysisItemSchema,
  ApiPricingSchema,
  BenchmarkScoreSchema,
  ChatProviderSchema,
  ChatTierSchema,
  ContentSectionSchema,
  DataSourceSchema,
  DefinitionSchema,
  EditorialSchema,
  EditorialStatusSchema,
  ExpandableBlockSchema,
  GlossarySchema,
  GovernanceSchema,
  ModelAnalysisSchema,
  ModelLinksSchema,
  ModelMetaSchema,
  ModelProfileSchema,
  NameOrderSchema,
  SectionVariantSchema,
  SentimentItemSchema,
  SentimentSchema,
  SocialEmbedDataSchema,
  TechSpecSchema,
} from './schemas'

// ——— inferred from the canonical schemas ———

export type Sentiment = z.infer<typeof SentimentSchema>
export type SectionVariant = z.infer<typeof SectionVariantSchema>
export type NameOrder = z.infer<typeof NameOrderSchema>
export type EditorialStatus = z.infer<typeof EditorialStatusSchema>

export type AnalysisItem = z.infer<typeof AnalysisItemSchema>
export type ModelAnalysis = z.infer<typeof ModelAnalysisSchema>
export type ApiPricing = z.infer<typeof ApiPricingSchema>
export type ChatTier = z.infer<typeof ChatTierSchema>
export type ChatProvider = z.infer<typeof ChatProviderSchema>
export type BenchmarkScore = z.infer<typeof BenchmarkScoreSchema>
export type SentimentItem = z.infer<typeof SentimentItemSchema>
export type SocialEmbedData = z.infer<typeof SocialEmbedDataSchema>
export type ExpandableBlock = z.infer<typeof ExpandableBlockSchema>
export type TechSpec = z.infer<typeof TechSpecSchema>
export type ContentSection = z.infer<typeof ContentSectionSchema>
export type Definition = z.infer<typeof DefinitionSchema>
export type Glossary = z.infer<typeof GlossarySchema>
export type DataSource = z.infer<typeof DataSourceSchema>
export type Governance = z.infer<typeof GovernanceSchema>
export type Editorial = z.infer<typeof EditorialSchema>
export type ModelLinks = z.infer<typeof ModelLinksSchema>
export type ModelMeta = z.infer<typeof ModelMetaSchema>
export type ModelProfile = z.infer<typeof ModelProfileSchema>

export type ModelSlug = ModelProfile['slug']

/** Open vocabulary — every id in use is cataloged in ./section-catalog.ts */
export type SectionId = ContentSection['id']

// ——— view models (computed at render time, never persisted) ———

/**
 * The pricing-comparison widget's data: the model's own rates as baseModel,
 * competitors computed from registry neighbors by buildPricingData.
 */
export interface PricingData {
  baseModel: {
    name: string
    input: number
    output: number
    provider?: string
  }
  competitors: {
    name: string
    input: number
    output: number
    provider?: string
  }[]
}

// ——— MDX loader intermediates ———

export interface MdxExpandableBlock {
  id: string
  title: string
  preview: string
  content: string
}

export type MdxSectionMap = Record<string, {
  content: string
  expandables: MdxExpandableBlock[]
}>

// ——— component props ———

export interface ModelHeaderProps {
  name: string
  family?: string
  variant?: string
  modelVersion?: string
  nameOrder?: NameOrder
  organization?: string
  releaseDate?: string
  releaseDateDisplay?: string
  identity?: string
  tagIds?: ModelTagId[]
  specChips?: string[]
  links?: ModelLinks
}

export interface StrengthsWeaknessesProps {
  strengths?: (string | AnalysisItem)[]
  weaknesses?: (string | AnalysisItem)[]
  unknowns?: (string | AnalysisItem)[]
}

export interface BenchmarkChartProps {
  benchmarks: BenchmarkScore[]
}

export interface PricingCalculatorProps {
  apiData: PricingData
  chatData: ChatProvider[]
  pricingSources?: ModelMeta['pricingSources']
}

export interface SentimentMarqueeProps {
  items: SentimentItem[]
}

export interface SocialEmbedProps extends SocialEmbedData { }

export interface ExpandableSectionProps {
  title: string
  preview: string
  children: ReactNode
  defaultExpanded?: boolean
}

export interface ContentSectionProps {
  title?: string
  subtitle?: ReactNode
  children: ReactNode
  id?: string
  specs?: TechSpec[]
}
