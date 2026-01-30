import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pretrained on the Whole Internet | Megaminds Learn',
  description: 'What it means that LLMs downloaded the internet and learned from it.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
