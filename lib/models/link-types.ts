import type { LucideIcon } from 'lucide-react'
import {
  MessageCircle,
  Play,
  BookOpen,
  FileText,
  Download,
  ExternalLink,
  Users,
  Code,
  Globe,
  Newspaper,
  Video,
  Sparkles,
  DollarSign,
} from 'lucide-react'

export interface ModelLinkType {
  id: string
  label: string
  description: string
  icon: LucideIcon
  category: 'try' | 'build' | 'learn' | 'community'
  primary?: boolean
}

export type ModelLinkTypeId =
  | 'chat'
  | 'playground'
  | 'api'
  | 'docs'
  | 'paper'
  | 'weights'
  | 'github'
  | 'community'
  | 'blog'
  | 'demo'
  | 'pricing'
  | 'changelog'
  | 'tutorials'

export const MODEL_LINK_TYPES: Record<ModelLinkTypeId, ModelLinkType> = {
  chat: {
    id: 'chat',
    label: 'Chat',
    description: 'Try in browser',
    icon: MessageCircle,
    category: 'try',
    primary: true,
  },
  playground: {
    id: 'playground',
    label: 'Playground',
    description: 'Interactive sandbox',
    icon: Play,
    category: 'try',
    primary: true,
  },
  api: {
    id: 'api',
    label: 'API',
    description: 'Endpoints & SDKs',
    icon: Code,
    category: 'build',
  },
  docs: {
    id: 'docs',
    label: 'Docs',
    description: 'Guides & pricing',
    icon: BookOpen,
    category: 'build',
  },
  paper: {
    id: 'paper',
    label: 'Paper',
    description: 'Technical report',
    icon: FileText,
    category: 'learn',
  },
  weights: {
    id: 'weights',
    label: 'Weights',
    description: 'Download model',
    icon: Download,
    category: 'learn',
  },
  github: {
    id: 'github',
    label: 'GitHub',
    description: 'Source & examples',
    icon: ExternalLink,
    category: 'learn',
  },
  community: {
    id: 'community',
    label: 'Community',
    description: 'Discord & forums',
    icon: Users,
    category: 'community',
  },
  blog: {
    id: 'blog',
    label: 'Blog',
    description: 'Announcements & updates',
    icon: Newspaper,
    category: 'learn',
  },
  demo: {
    id: 'demo',
    label: 'Demo',
    description: 'Video walkthrough',
    icon: Video,
    category: 'try',
  },
  pricing: {
    id: 'pricing',
    label: 'Pricing',
    description: 'Plans & costs',
    icon: DollarSign,
    category: 'build',
  },
  changelog: {
    id: 'changelog',
    label: 'Changelog',
    description: 'Version history',
    icon: FileText,
    category: 'learn',
  },
  tutorials: {
    id: 'tutorials',
    label: 'Tutorials',
    description: 'Step-by-step guides',
    icon: BookOpen,
    category: 'learn',
  },
}

export function getLinkType(id: ModelLinkTypeId): ModelLinkType {
  return MODEL_LINK_TYPES[id]
}

export function isValidLinkTypeId(id: string): id is ModelLinkTypeId {
  return id in MODEL_LINK_TYPES
}

export function getLinkTypesByCategory(category: ModelLinkType['category']): ModelLinkType[] {
  return Object.values(MODEL_LINK_TYPES).filter((link) => link.category === category)
}

export function getPrimaryLinkTypes(): ModelLinkType[] {
  return Object.values(MODEL_LINK_TYPES).filter((link) => link.primary)
}

export function getLinkIcon(id: ModelLinkTypeId): LucideIcon {
  return MODEL_LINK_TYPES[id]?.icon ?? Globe
}
