import Link from 'next/link'
import { Search } from 'lucide-react'

export const metadata = {
  title: 'Prompt Library | Megaminds',
  description: 'Curated AI prompts organized by category.',
}

const categories = [
  {
    slug: 'finance',
    name: 'Finance',
    description: 'Portfolio analysis, financial planning, investing strategies',
    count: 12,
  },
  {
    slug: 'travel',
    name: 'Travel',
    description: 'Trip planning, travel hacks, destination research',
    count: 8,
  },
  {
    slug: 'health',
    name: 'Health',
    description: 'Workout planning, meal prep, supplement research',
    count: 10,
  },
  {
    slug: 'business',
    name: 'Business',
    description: 'Business planning, research, tools comparison',
    count: 15,
  },
  {
    slug: 'productivity',
    name: 'Productivity',
    description: 'Organization, time management, note-taking',
    count: 9,
  },
  {
    slug: 'education',
    name: 'Education',
    description: 'Study skills, homework help, research papers',
    count: 11,
  },
]

export default function PromptsPage() {
  return (
    <div className="py-16 px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Prompt Library</h1>
            <p className="mt-2 text-gray-600">
              Curated prompts that actually work. Tested across models.
            </p>
          </div>
          <Link
            href="/community/submit"
            className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 transition-colors"
          >
            Submit a prompt
          </Link>
        </div>

        {/* Search - placeholder for now */}
        <div className="mt-8 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search prompts..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>

        {/* Categories */}
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {categories.map((category) => (
            <Link key={category.slug} href={`/tools/prompts/${category.slug}`} className="group">
              <div className="p-5 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-gray-900 group-hover:text-gray-600 transition-colors">
                    {category.name}
                  </h2>
                  <span className="text-sm text-gray-500">{category.count} prompts</span>
                </div>
                <p className="mt-1 text-sm text-gray-600">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
