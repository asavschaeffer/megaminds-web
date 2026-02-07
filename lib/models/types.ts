/**
 * Core type definitions for Model Report Templating
 */

import type { ComponentType, ReactNode } from 'react'
import type { ModelTagId } from './tags'
import type { ModelLinkTypeId } from './link-types'
import type { OrganizationId } from './organizations'
import type { BrandStyle } from './branding'

export type NameOrder = 'family-version-variant' | 'family-variant-version'

export type ModelSlug = string

export type SectionId =
  | 'why-it-matters'
  | 'social-proof'
  | 'core-features'
  | 'economics'
  | 'training'
  | 'issues'
  | 'in-the-wild'
  | 'advanced'
  | 'verdict'
  | string

export type SectionVariant = 'default' | 'technical' | 'advanced' | 'social'

export interface AnalysisItem {
  text: string
  detail?: string
  source?: string
}

export interface ModelAnalysis {
  strengths: (string | AnalysisItem)[]
  weaknesses: (string | AnalysisItem)[]
  unknowns?: (string | AnalysisItem)[]
}

export interface ApiPricing {
  input: number
  output: number
  cachedInput?: number
  currency?: string
  unit?: string
  provider?: string
}

export interface ChatTier {
  label: string
  maxMsgs: number
  price: string
}

export interface ChatProvider {
  name: string
  tiers: ChatTier[]
}

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

export interface BenchmarkScore {
  name: string
  score: number
  maxScore: number
  comparison?: string
  source?: string
}

export type Sentiment = 'positive' | 'neutral' | 'critical'

export interface SentimentItem {
  author: string
  handle?: string
  content: string
  sentiment: Sentiment
  url?: string
  date?: string
  dateDisplay?: string
}

export interface SocialEmbedData {
  type: 'tweet' | 'quote'
  author: string
  handle?: string
  content: string
  date?: string
  dateDisplay?: string
  url?: string
}

export interface ExpandableBlock {
  title: string
  preview: string
  content: string | ReactNode
  contentSource?: 'mdx' | 'inline'
}

export interface TechSpec {
  label: string
  value: string
  icon?: string
}

export interface ContentSection {
  id: SectionId
  title?: string
  subtitle?: ReactNode
  variant?: SectionVariant
  content: string | ReactNode | null
  contentSource?: 'mdx' | 'inline'
  specs?: TechSpec[]
  hasBenchmarks?: boolean
  hasPricing?: boolean
  expandable?: ExpandableBlock
  expandables?: ExpandableBlock[]
  socialData?: SocialEmbedData
}

export interface Definition {
  term: string
  definition: string
  furtherReading?: {
    label: string
    href: string
  }[]
}

export type Glossary = Record<string, Definition>

export interface DataSource {
  type: string
  url?: string
  description?: string
}

export interface ConfidenceScores {
  overall?: number
  pricing?: number
  benchmarks?: number
  features?: number
}

export interface Governance {
  lastUpdated?: string
  dataSources?: DataSource[]
  confidence?: ConfidenceScores
}

export interface ModelLinks {
  chat?: string
  playground?: string
  api?: string
  docs?: string
  paper?: string
  weights?: string
  github?: string
  community?: string
  [key: string]: string | undefined
}

export interface ModelMeta {
  name: string
  family?: string
  variant?: string
  modelVersion?: string
  nameOrder?: NameOrder
  organizationId?: OrganizationId
  organization?: string
  releaseDate?: string
  releaseDateDisplay?: string
  identity: string
  tagIds?: ModelTagId[]
  tags?: string[]
  links: ModelLinks
  subscriptionPlans?: string[]
  apiRates?: ApiPricing
  branding?: BrandStyle
  pricingSources?: Array<{
    label: string
    href: string
    provider?: string
  }>
  chatLimits?: {
    free?: number
    plans?: Array<{
      name: string
      messages: number
      price: string
    }>
  }
}

export interface ModelProfile {
  slug: ModelSlug
  meta: ModelMeta
  analysis: ModelAnalysis
  intro: {
    text: string
  }
  pricingData?: PricingData
  chatLimits?: ChatProvider[]
  benchmarks?: BenchmarkScore[]
  sentimentFeed?: SentimentItem[]
  sections: ContentSection[]
  glossary?: Glossary
  updatedAt?: string
  author?: string
  governance?: Governance
}

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
  tags?: string[]
  links?: ModelLinks
  subscriptionPlans?: string[]
  apiRates?: ApiPricing
  chatLimits?: {
    free?: number
    plans?: Array<{
      name: string
      messages: number
      price: string
    }>
  }
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
  pricingSources?: Array<{
    label: string
    href: string
    provider?: string
  }>
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

export type SectionRenderer = (section: ContentSection, profile: ModelProfile) => ReactNode

export interface SectionRegistryEntry {
  id: SectionId | RegExp
  required?: boolean
  order?: number
  renderer?: SectionRenderer
}

export type SectionRegistry = SectionRegistryEntry[]

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
