import Link from 'next/link'
import { ArrowRight, Building2, User } from 'lucide-react'

export const metadata = {
  title: 'Consulting | Megaminds',
  description: 'Cognitive architecture consulting for individuals and organizations.',
}

export default function ConsultingPage() {
  return (
    <div className="py-16 px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900">Consulting</h1>
        <p className="mt-4 text-lg text-gray-600">
          We help you match minds to models to workflows to outcomes.
          Whether you're an individual looking to integrate AI into your work,
          or an organization seeking cognitive architecture guidance.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Link href="/consulting/intake?type=personal" className="block">
            <ServiceCard
              icon={<User className="w-6 h-6" />}
              title="Personal"
              description="One-on-one guidance on integrating AI into your professional workflow. Model selection, prompt development, and workflow optimization."
              features={[
                'Workflow analysis',
                'Model matching',
                'Custom prompt development',
                'Ongoing support',
              ]}
            />
          </Link>
          <Link href="/consulting/intake?type=business" className="block">
            <ServiceCard
              icon={<Building2 className="w-6 h-6" />}
              title="Business"
              description="Team training and organizational AI strategy. From executive education to hands-on workshops for entire departments."
              features={[
                'Team workshops',
                'Executive briefings',
                'Workflow audits',
                'Implementation support',
              ]}
            />
          </Link>
        </div>

        {/* Approach */}
        <div className="mt-16">
          <h2 className="text-xl font-semibold text-gray-900">Our Approach</h2>
          <div className="mt-6 space-y-6">
            <ApproachStep
              number={1}
              title="Cognitive Mapping"
              description="We analyze your current workflows to identify where AI can reduce friction, save time, or improve quality."
            />
            <ApproachStep
              number={2}
              title="Model Matching"
              description="Based on your specific needs, we recommend the right models. Not every task needs GPT-4—sometimes Haiku or DeepSeek is the better choice."
            />
            <ApproachStep
              number={3}
              title="Workflow Design"
              description="We design AI-augmented workflows that feel natural, not forced. The goal is augmentation, not replacement."
            />
            <ApproachStep
              number={4}
              title="Training & Support"
              description="We teach your team not just how to use tools, but how to think about AI. Epistemic literacy matters."
            />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 bg-gray-900 rounded-lg text-white">
          <h2 className="text-xl font-semibold">Ready to get started?</h2>
          <p className="mt-2 text-gray-300">
            Fill out our intake questionnaire and we'll get back to you with a tailored proposal.
          </p>
          <Link
            href="/consulting/intake"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-colors"
          >
            Start intake questionnaire
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

function ServiceCard({
  icon,
  title,
  description,
  features
}: {
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
}) {
  return (
    <div className="p-6 border border-gray-200 rounded-lg h-full hover:border-gray-400 transition-colors">
      <div className="text-gray-700 mb-4">{icon}</div>
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
      <ul className="mt-4 space-y-2">
        {features.map((feature) => (
          <li key={feature} className="text-sm text-gray-600 flex items-center gap-2">
            <span className="w-1 h-1 bg-gray-400 rounded-full" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}

function ApproachStep({
  number,
  title,
  description
}: {
  number: number
  title: string
  description: string
}) {
  return (
    <div className="flex gap-4">
      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600 shrink-0">
        {number}
      </div>
      <div>
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  )
}
