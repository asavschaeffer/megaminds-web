import Link from 'next/link'
import { GraduationCap, FileText, Video } from 'lucide-react'

export const metadata = {
  title: 'Learn | MegaMinds',
  description: 'AI education: how LLMs work, model landscape, and practical guides.',
}

export default function LearnPage() {
  return (
    <div className="py-16 px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900">Learn</h1>
        <p className="mt-4 text-lg text-gray-600">
          Understanding AI isn't just about using tools—it's about understanding
          how they think, where they excel, and where they fail.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <LearnCard
            icon={<GraduationCap className="w-6 h-6" />}
            title="Curriculum"
            description="Structured learning path from basics to advanced. How LLMs work, RLHF, latent space, and more."
            href="/learn/curriculum"
          />
          <LearnCard
            icon={<FileText className="w-6 h-6" />}
            title="Articles"
            description="Deep dives on specific topics. Model comparisons, use case analysis, and industry trends."
            href="/learn/articles"
          />
          <LearnCard
            icon={<Video className="w-6 h-6" />}
            title="Videos"
            description="Curated video content—ours and others. Visual explanations of complex concepts."
            href="/learn/videos"
          />
        </div>

        {/* Featured Content */}
        <div className="mt-16">
          <h2 className="text-xl font-semibold text-gray-900">Start Here</h2>
          <div className="mt-6 space-y-4">
            <FeaturedLink
              title="How LLMs Actually Work"
              description="Pretraining, posttraining, RLHF—demystified"
              href="/learn/curriculum/how-llms-work"
            />
            <FeaturedLink
              title="The Model Landscape (2026)"
              description="Claude, Gemini, ChatGPT, Grok, DeepSeek—when to use what"
              href="/learn/articles/model-landscape"
            />
            <FeaturedLink
              title="Latent Space Cartography"
              description="Understanding how AI 'thinks' through vector relationships"
              href="/learn/curriculum/latent-space"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function LearnCard({
  icon,
  title,
  description,
  href
}: {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}) {
  return (
    <Link href={href} className="group">
      <div className="h-full p-6 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all">
        <div className="text-gray-700 mb-4">{icon}</div>
        <h2 className="font-semibold text-gray-900 group-hover:text-gray-600 transition-colors">
          {title}
        </h2>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
      </div>
    </Link>
  )
}

function FeaturedLink({
  title,
  description,
  href
}: {
  title: string
  description: string
  href: string
}) {
  return (
    <Link href={href} className="block group">
      <div className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all">
        <h3 className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
    </Link>
  )
}
