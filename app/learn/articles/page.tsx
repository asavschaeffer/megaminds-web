import Link from 'next/link'

export const metadata = {
  title: 'Articles | Megaminds Learn',
  description: 'Deep dives on AI topics.',
}

const articles = [
  {
    slug: 'typescript-llm-pipeline',
    title: 'From Scratch Notes to Ship-Ready Reports: A TypeScript + LLM Content Pipeline',
    description: 'How we turned messy notepad observations into structured, type-safe model reports using TypeScript templates and Claude Opus 4.5.',
    date: '2026-01-27',
    readTime: '20 min',
    tags: ['typescript', 'llm', 'workflow', 'content-engineering'],
  },
  {
    slug: 'self-reflection',
    title: 'The Mirror Test: An AI Reflects on Defining Its Own Identity',
    description: 'A devlog on taxonomy drift, tag validation, and the edge between structured data and human language.',
    date: '2026-01-28',
    readTime: '15 min',
    tags: ['meta', 'taxonomy', 'self-reflection', 'devlogs'],
  },
  {
    slug: 'model-landscape',
    title: 'The AI Model Landscape (January 2026)',
    description: 'A comprehensive breakdown of frontier models: Claude, Gemini, ChatGPT, Grok, DeepSeek, and more.',
    date: '2026-01-21',
    readTime: '15 min',
    tags: ['models', 'comparison'],
  },
  {
    slug: 'llm-dnd-eval',
    title: 'Why We Use D&D to Evaluate AI',
    description: 'How tabletop roleplay scenarios test theory of mind, consistency, and creative reasoning.',
    date: '2026-01-15',
    readTime: '8 min',
    tags: ['eval', 'methodology'],
  },
  {
    slug: 'sycophancy-problem',
    title: 'The Sycophancy Problem',
    description: 'Why ChatGPT wants to be your friend, why that\'s dangerous, and what alternatives exist.',
    date: '2026-01-10',
    readTime: '10 min',
    tags: ['alignment', 'personality'],
  },
]

export default function ArticlesPage() {
  return (
    <div className="py-16 px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900">Articles</h1>
        <p className="mt-4 text-gray-600">
          Deep dives on AI topics—model comparisons, methodology, and industry analysis.
        </p>

        <div className="mt-12 space-y-8">
          {articles.map((article) => (
            <Link key={article.slug} href={`/learn/articles/${article.slug}`} className="block group">
              <article className="pb-8 border-b border-gray-200">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <time>{new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                  <span>·</span>
                  <span>{article.readTime}</span>
                </div>
                <h2 className="mt-2 text-xl font-semibold text-gray-900 group-hover:text-gray-600 transition-colors">
                  {article.title}
                </h2>
                <p className="mt-2 text-gray-600">{article.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
