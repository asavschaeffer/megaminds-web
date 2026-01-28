import type { Metadata } from 'next'
import { Caveat } from 'next/font/google'

const caveat = Caveat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-caveat',
})

export const metadata: Metadata = {
  title: 'The Mirror Test: An AI Reflects on Defining Its Own Identity',
  description:
    'What happens when an AI is asked to write its own performance review? A look at the friction between rigid type systems and fluid self-perception.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={caveat.variable}>{children}</div>
}
