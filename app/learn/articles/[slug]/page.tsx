import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllArticleSlugs, getArticleBySlug } from '@/lib/articles/loader'
import { GlossarySidenote } from '@/components/shared/sidenote'

// MDX components available in articles
const components = {
    GlossarySidenote,
}

export function generateStaticParams() {
    return getAllArticleSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const article = getArticleBySlug(slug)
    if (!article) return {}

    return {
        title: `${article.meta.title} | Megaminds Learn`,
        description: article.meta.description,
    }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const article = getArticleBySlug(slug)
    if (!article) notFound()

    return (
        <article className="py-16 px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
                <header className="mb-12">
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                        <time>{new Date(article.meta.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                        <span>·</span>
                        <span>{article.meta.readTime}</span>
                    </div>
                    <h1 className="mt-4 text-3xl font-bold text-gray-900">{article.meta.title}</h1>
                    <p className="mt-4 text-lg text-gray-600">{article.meta.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {article.meta.tags.map((tag) => (
                            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                {tag}
                            </span>
                        ))}
                    </div>
                </header>
                <div className="prose prose-gray max-w-none">
                    <MDXRemote source={article.content} components={components} />
                </div>
            </div>
        </article>
    )
}
