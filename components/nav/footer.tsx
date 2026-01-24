import Link from 'next/link'

const footerLinks = {
  eval: {
    title: 'Eval',
    links: [
      { label: 'Model Arena', href: '/eval/arena' },
      { label: 'Benchmarks', href: '/eval/benchmarks' },
      { label: 'Model Reports', href: '/eval/models' },
    ]
  },
  tools: {
    title: 'Tools',
    links: [
      { label: 'Model Picker', href: '/tools/model-picker' },
      { label: 'Prompt Library', href: '/tools/prompts' },
      { label: 'Submit a Prompt', href: '/tools/submit' },
    ]
  },
  learn: {
    title: 'Learn',
    links: [
      { label: 'Curriculum', href: '/learn/curriculum' },
      { label: 'Articles', href: '/learn/articles' },
      { label: 'Videos', href: '/learn/videos' },
    ]
  },
  company: {
    title: 'Company',
    links: [
      { label: 'Consulting', href: '/consulting' },
      { label: 'Collective', href: '/collective' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/about/contact' },
    ]
  },
}

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="text-sm font-semibold text-gray-900">{section.title}</h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Megaminds. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="https://twitter.com/megamindsed"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Twitter
            </a>
            <a
              href="https://youtube.com/@megamindsed"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
