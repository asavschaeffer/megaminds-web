import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content')

export type PromptMeta = {
  slug: string
  title: string
  description: string
  category: string
  models: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  successRate: number
  date: string
  submitter: 'megaminds' | 'community'
}

export type PromptContent = PromptMeta & {
  content: string
}

export type ArticleMeta = {
  slug: string
  title: string
  description: string
  date: string
  readTime: string
  tags: string[]
}

// Get all prompts in a category
export function getPromptsByCategory(category: string): PromptContent[] {
  const categoryPath = path.join(contentDirectory, 'prompts', category)

  if (!fs.existsSync(categoryPath)) {
    return []
  }

  const files = fs.readdirSync(categoryPath).filter(f => f.endsWith('.mdx'))

  return files.map(file => {
    const filePath = path.join(categoryPath, file)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug: file.replace('.mdx', ''),
      content,
      ...data,
    } as PromptContent
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Get all prompt categories
export function getPromptCategories(): { slug: string; name: string; count: number }[] {
  const promptsPath = path.join(contentDirectory, 'prompts')

  if (!fs.existsSync(promptsPath)) {
    return []
  }

  const categories = fs.readdirSync(promptsPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => {
      const categoryPath = path.join(promptsPath, dirent.name)
      const files = fs.readdirSync(categoryPath).filter(f => f.endsWith('.mdx'))
      return {
        slug: dirent.name,
        name: dirent.name.charAt(0).toUpperCase() + dirent.name.slice(1),
        count: files.length,
      }
    })

  return categories
}

// Get all articles
export function getArticles(): ArticleMeta[] {
  const articlesPath = path.join(contentDirectory, 'learn', 'articles')

  if (!fs.existsSync(articlesPath)) {
    return []
  }

  const files = fs.readdirSync(articlesPath).filter(f => f.endsWith('.mdx'))

  return files.map(file => {
    const filePath = path.join(articlesPath, file)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContents)

    return {
      slug: file.replace('.mdx', ''),
      ...data,
    } as ArticleMeta
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Get single article content
export function getArticle(slug: string): { meta: ArticleMeta; content: string } | null {
  const filePath = path.join(contentDirectory, 'learn', 'articles', `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    meta: { slug, ...data } as ArticleMeta,
    content,
  }
}
