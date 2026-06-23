import Link from 'next/link'
import { Twitter, Youtube } from 'lucide-react'

const footerLinks = {
  eval: {
    title: 'Eval',
    links: [
      { label: 'Model Picker', href: '/tools/model-picker' },
      { label: 'Benchmarks', href: '/eval/benchmarks' },
      { label: 'Model Reports', href: '/eval/models' },
      { label: 'LLM D&D', href: 'https://llmdnd.net' },
    ]
  },
  tools: {
    title: 'Tools',
    links: [
      { label: 'Inbox Cleanup', href: '/tools/inbox-cleanup' },
      { label: 'Heard Chef', href: '/tools/heard-chef' },
      { label: 'Photo Organizer', href: '/tools/photo-organizer' },
    ]
  },
  learn: {
    title: 'Learn',
    links: [
      { label: 'Curriculum', href: '/learn/curriculum' },
      { label: 'Articles', href: '/learn/articles' },
      { label: 'Prompt Library', href: '/tools/prompts' },
    ]
  },
  company: {
    title: 'Company',
    links: [
      { label: 'Consulting', href: '/consulting' },
      { label: 'Community', href: '/community' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
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
          <div className="flex gap-x-6 gap-y-4 flex-wrap justify-center items-center">
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-700">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-700">
              Terms of Service
            </Link>
            <a
              href="https://twitter.com/megamindsed"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://youtube.com/@megamindsed"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
