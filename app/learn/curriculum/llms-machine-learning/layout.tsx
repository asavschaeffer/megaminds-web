import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LLMs Understand Language via Machine Learning | Megaminds Learn',
  description: 'How language models learn the rules of language by predicting the next word.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
