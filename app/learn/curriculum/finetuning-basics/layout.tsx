import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fine-Tuned to Be a Helpful Assistant | Megaminds Learn',
  description: 'How posttraining turns a text predictor into ChatGPT.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
