import Link from 'next/link'
import { Users, Lightbulb, GitPullRequest, Trophy } from 'lucide-react'

export const metadata = {
  title: 'Community | Megaminds',
  description: 'Join our community and contribute to the AI knowledge base.',
}

export default function CommunityPage() {
  return (
    <div className="py-16 px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900">The Community</h1>
        <p className="mt-4 text-lg text-gray-600">
          Megaminds is built on community knowledge. The best prompts, the sharpest
          model insights, the most useful workflows—they come from real people doing real work.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <ContributeCard
            icon={<Lightbulb className="w-6 h-6" />}
            title="Submit Prompts"
            description="Share prompts that have worked well for you. If they meet our standards, they'll be added to the library with credit."
            href="/tools/submit"
            cta="Submit a prompt"
          />
          <ContributeCard
            icon={<GitPullRequest className="w-6 h-6" />}
            title="Improve Content"
            description="Found an error? Have a better explanation? Our curriculum and articles are open for suggestions."
            href="https://github.com/megaminds/megaminds-web"
            cta="View on GitHub"
            external
          />
        </div>

        {/* How It Works */}
        <div className="mt-16">
          <h2 className="text-xl font-semibold text-gray-900">How It Works</h2>
          <div className="mt-6 space-y-4">
            <Step
              number={1}
              title="Submit"
              description="Share your prompt, tool recommendation, or content suggestion through our forms."
            />
            <Step
              number={2}
              title="Review"
              description="Our team reviews submissions for quality, accuracy, and usefulness."
            />
            <Step
              number={3}
              title="Publish"
              description="Accepted contributions are added to the site with full credit to the contributor."
            />
          </div>
        </div>

        {/* Recognition */}
        <div className="mt-16 p-6 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-5 h-5 text-gray-700" />
            <h2 className="text-lg font-semibold text-gray-900">Top Contributors</h2>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Contributors with the most accepted submissions. Coming soon as we build the community.
          </p>
          <div className="text-sm text-gray-400">
            Leaderboard launching soon...
          </div>
        </div>

        {/* Community Guidelines */}
        <div className="mt-16">
          <h2 className="text-xl font-semibold text-gray-900">Community Guidelines</h2>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li className="flex gap-2">
              <span className="text-gray-400">•</span>
              <span><strong>Quality over quantity:</strong> One excellent prompt beats ten mediocre ones.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-gray-400">•</span>
              <span><strong>Test before submitting:</strong> Make sure your prompts work across the models you claim.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-gray-400">•</span>
              <span><strong>Be specific:</strong> "Use this for X" is more helpful than "general purpose prompt."</span>
            </li>
            <li className="flex gap-2">
              <span className="text-gray-400">•</span>
              <span><strong>Give credit:</strong> If you adapted someone else's work, acknowledge it.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function ContributeCard({
  icon,
  title,
  description,
  href,
  cta,
  external = false
}: {
  icon: React.ReactNode
  title: string
  description: string
  href: string
  cta: string
  external?: boolean
}) {
  const content = (
    <div className="h-full p-6 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all">
      <div className="text-gray-700 mb-4">{icon}</div>
      <h2 className="font-semibold text-gray-900">{title}</h2>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
      <p className="mt-4 text-sm font-medium text-gray-900">{cta} →</p>
    </div>
  )

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="group">
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className="group">
      {content}
    </Link>
  )
}

function Step({
  number,
  title,
  description
}: {
  number: number
  title: string
  description: string
}) {
  return (
    <div className="flex gap-4">
      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600 shrink-0">
        {number}
      </div>
      <div>
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  )
}
