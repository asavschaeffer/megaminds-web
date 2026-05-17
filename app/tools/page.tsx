import Link from 'next/link'
import { Compass, Mail, ChefHat, Image as ImageIcon } from 'lucide-react'

export const metadata = {
  title: 'Tools | Megaminds',
  description: 'AI-powered apps we built to manage your inbox, kitchen, and photo library.',
}

export default function ToolsPage() {
  return (
    <div className="py-16 px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900">Tools</h1>
        <p className="mt-4 text-lg text-gray-600">
          Apps we built to solve real problems. Try them out—and if you want
          something custom, <Link href="/consulting" className="text-gray-900 underline hover:no-underline">let's talk</Link>.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <ToolCard
            icon={<Compass className="w-6 h-6" />}
            title="Model Picker"
            description="Answer a few questions about your task and get a model recommendation backed by our eval data."
            href="/tools/model-picker"
          />
          <ToolCard
            icon={<Mail className="w-6 h-6" />}
            title="Inbox Cleanup"
            description="Lightning-fast, privacy-first email triage. Categorize and batch-archive thousands of emails."
            href="/tools/inbox-cleanup"
          />
          <ToolCard
            icon={<ChefHat className="w-6 h-6" />}
            title="Heard Chef"
            description="FaceTime AI for your pantry & recipes. Call, text, or video chat while you cook."
            href="/tools/heard-chef"
          />
          <ToolCard
            icon={<ImageIcon className="w-6 h-6" />}
            title="Photo Organizer"
            description="Rename, organize, dedupe, and remove objects from your photos with AI assistance."
            href="/tools/photo-organizer"
          />
        </div>
      </div>
    </div>
  )
}

function ToolCard({
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
