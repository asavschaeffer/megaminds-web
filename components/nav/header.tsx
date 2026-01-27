'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown, Menu, X, ExternalLink, ChevronUp } from 'lucide-react'

interface NavItem {
  label: string
  href: string
  description: string
  external?: boolean
}

interface NavSection {
  label: string
  items: NavItem[]
}

const navigation: Record<string, NavSection> = {
  eval: {
    label: 'Eval',
    items: [
      { label: 'Model Arena', href: '/eval/arena', description: 'Watch models compete in agentic scenarios' },
      { label: 'Benchmarks', href: '/eval/benchmarks', description: 'Our evaluation methodology and results' },
      { label: 'Model Reports', href: '/eval/models', description: 'Deep dives on individual models' },
    ]
  },
  tools: {
    label: 'Tools',
    items: [
      { label: 'Model Picker', href: '/tools/model-picker', description: 'Find the right model for your task' },
      { label: 'Prompt Library', href: '/tools/prompts', description: 'Curated prompts by category' },
      { label: 'Submit a Prompt', href: '/tools/submit', description: 'Contribute to the library' },
    ]
  },
  build: {
    label: 'Build',
    items: [
      { label: 'LLM D&D', href: 'https://llmdnd.net', external: true, description: 'Agentic roleplay arena' },
      { label: 'Yes Chef', href: '/build/yes-chef', description: 'AI cooking assistant' },
      { label: 'Photo Organizer', href: '/build/photo-organizer', description: 'AI-powered photo management' },
    ]
  },
  learn: {
    label: 'Learn',
    items: [
      { label: 'Curriculum', href: '/learn/curriculum', description: 'How LLMs work, from basics to advanced' },
      { label: 'Articles', href: '/learn/articles', description: 'Deep dives and analysis' },
      { label: 'Videos', href: '/learn/videos', description: 'Curated video content' },
    ]
  },
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Global">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <img
                src="/images/megaminds-logo-2007.gif"
                alt="Megaminds Logo"
                width={150}
                height={40}
              />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-8">
            {Object.entries(navigation).map(([key, section]) => (
              <Dropdown key={key} section={section} />
            ))}
            <Link
              href="/consulting"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors py-2"
            >
              Consulting
            </Link>
            <Link
              href="/community"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors py-2"
            >
              Community
            </Link>
          </div>

          {/* CTA */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              href="/consulting/intake"
              className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 transition-colors"
            >
              Work with us
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  )
}

function Dropdown({ section }: { section: NavSection }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors py-2"
      >
        {section.label}
        <ChevronUp className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full">
          <div className="mt-2 w-72 rounded-lg bg-white shadow-lg ring-1 ring-gray-200 p-2">
            {section.items.map((item) => (
              <DropdownItem key={item.href} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function DropdownItem({ item }: { item: NavItem }) {
  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-md px-3 py-2 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium text-gray-900">{item.label}</span>
          <ExternalLink className="w-3 h-3 text-gray-400" />
        </div>
        <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
      </a>
    )
  }

  return (
    <Link
      href={item.href}
      className="block rounded-md px-3 py-2 hover:bg-gray-50 transition-colors"
    >
      <span className="text-sm font-medium text-gray-900">{item.label}</span>
      <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
    </Link>
  )
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null

  return (
    <div className="lg:hidden">
      <div className="fixed inset-0 z-50 bg-black/20" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white px-6 py-6 shadow-xl">
        <div className="flex items-center justify-between">
          <Link href="/" className="-m-1.5 p-1.5" onClick={onClose}>
            <img
              src="/images/megaminds-logo-2007.gif"
              alt="Megaminds Logo"
              width={150}
              height={40}
            />
          </Link>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={onClose}
          >
            <span className="sr-only">Close menu</span>
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-200">
            <div className="space-y-2 py-6">
              {Object.entries(navigation).map(([key, section]) => (
                <div key={key}>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    {section.label}
                  </p>
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block py-2 text-sm text-gray-700 hover:text-gray-900"
                      onClick={onClose}
                    >
                      {item.label}
                      {item.external && <ExternalLink className="inline w-3 h-3 ml-1" />}
                    </Link>
                  ))}
                </div>
              ))}
              <Link
                href="/consulting"
                className="block py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                onClick={onClose}
              >
                Consulting
              </Link>
              <Link
                href="/community"
                className="block py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                onClick={onClose}
              >
                Community
              </Link>
            </div>
            <div className="py-6">
              <Link
                href="/consulting/intake"
                className="block w-full rounded-md bg-gray-900 px-4 py-2.5 text-center text-sm font-medium text-white"
                onClick={onClose}
              >
                Work with us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
