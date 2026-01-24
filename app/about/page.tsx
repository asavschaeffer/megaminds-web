import Link from 'next/link'
import { Mail, Twitter, Youtube } from 'lucide-react'

export const metadata = {
  title: 'About | MegaMinds',
  description: 'Who we are and what we do.',
}

export default function AboutPage() {
  return (
    <div className="py-16 px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900">About MegaMinds</h1>

        <div className="mt-8 prose prose-gray max-w-none">
          <p className="text-lg text-gray-600">
            We're building the bridge between humans and AI systems. Not through hype,
            but through rigorous evaluation, practical tools, and genuine education.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-12">What We Do</h2>
          <p className="text-gray-600">
            MegaMinds operates at the intersection of AI evaluation, education, and consulting.
            We believe that using AI effectively requires understanding how it actually works—not
            just which buttons to press, but the underlying mechanics, failure modes, and
            strengths of different systems.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">Our Philosophy</h2>
          <p className="text-gray-600">
            <strong>Make the invisible visible.</strong> AI systems are black boxes by default.
            We build tools and interfaces that expose the reasoning, show the work, and make
            complex systems feel intuitive and trustworthy.
          </p>
          <p className="text-gray-600">
            <strong>Match minds to models.</strong> Not every task needs GPT-4. Different models
            have different personalities, strengths, and costs. We help people find the right
            tool for their specific needs.
          </p>
          <p className="text-gray-600">
            <strong>Augment, don't replace.</strong> The goal isn't to replace human judgment
            with AI. It's to free up cognitive resources for the work that matters most.
          </p>
        </div>

        {/* Team */}
        <div className="mt-16">
          <h2 className="text-xl font-semibold text-gray-900">The Team</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <TeamMember
              name="Val"
              role="Co-founder"
              bio="Background in business strategy and operations. Focused on making AI accessible to professionals and organizations."
            />
            <TeamMember
              name="Asa"
              role="Co-founder"
              bio="Cognitive Systems degree from UBC. Focused on AI evaluation, human-AI interaction design, and building tools that make the complex familiar."
            />
          </div>
        </div>

        {/* Contact */}
        <div className="mt-16">
          <h2 className="text-xl font-semibold text-gray-900">Get in Touch</h2>
          <div className="mt-6 space-y-4">
            <a
              href="mailto:hello@megaminds.com"
              className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Mail className="w-5 h-5" />
              hello@megaminds.com
            </a>
            <a
              href="https://twitter.com/megamindsed"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Twitter className="w-5 h-5" />
              @megamindsed
            </a>
            <a
              href="https://youtube.com/@megamindsed"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Youtube className="w-5 h-5" />
              MegaMinds on YouTube
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 p-6 bg-gray-50 rounded-lg">
          <h2 className="font-semibold text-gray-900">Want to work with us?</h2>
          <p className="text-sm text-gray-600 mt-2">
            Whether you're an individual looking to level up your AI skills or an organization
            seeking strategic guidance, we'd love to hear from you.
          </p>
          <Link
            href="/consulting/intake"
            className="mt-4 inline-block rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 transition-colors"
          >
            Start a conversation
          </Link>
        </div>
      </div>
    </div>
  )
}

function TeamMember({
  name,
  role,
  bio
}: {
  name: string
  role: string
  bio: string
}) {
  return (
    <div className="p-5 border border-gray-200 rounded-lg">
      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-lg font-semibold text-gray-600">
        {name[0]}
      </div>
      <h3 className="mt-4 font-semibold text-gray-900">{name}</h3>
      <p className="text-sm text-gray-500">{role}</p>
      <p className="mt-2 text-sm text-gray-600">{bio}</p>
    </div>
  )
}
