import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'There Is No Memory | Megaminds Learn',
  description: 'What actually happens when you send a message to an LLM.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
