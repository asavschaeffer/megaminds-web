import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'From Scratch Notes to Ship-Ready Reports: A TypeScript + LLM Content Pipeline | Megaminds',
  description:
    'How we turned messy notepad observations into structured, type-safe model reports using TypeScript templates and Claude Opus 4.5 — and what that workflow reveals about the future of content engineering.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
