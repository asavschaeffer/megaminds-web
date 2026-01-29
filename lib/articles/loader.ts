import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface ArticleMeta {
    slug: string
    title: string
    description: string
    date: string
    readTime: string
    tags: string[]
}

const ARTICLES_DIR = path.join(process.cwd(), 'content/learn/articles')

export function getAllArticleSlugs(): string[] {
    return fs.readdirSync(ARTICLES_DIR)
        .filter(f => f.endsWith('.mdx'))
        .map(f => f.replace('.mdx', ''))
}

export function getArticleBySlug(slug: string): { meta: ArticleMeta; content: string } | null {
    const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`)
    if (!fs.existsSync(filePath)) return null

    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)

    return {
        meta: { slug, ...data } as ArticleMeta,
        content,
    }
}

export function getAllArticles(): ArticleMeta[] {
    return getAllArticleSlugs()
        .map(slug => getArticleBySlug(slug)?.meta)
        .filter(Boolean) as ArticleMeta[]
}
