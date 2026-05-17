import { getArticle, getArticles, type ArticleMeta } from '@/lib/content'

export type { ArticleMeta }

export function getAllArticleSlugs(): string[] {
  return getArticles().map((article) => article.slug)
}

export function getArticleBySlug(slug: string): { meta: ArticleMeta; content: string } | null {
  return getArticle(slug)
}

export function getAllArticles(): ArticleMeta[] {
  return getArticles()
}
