import Link from 'next/link'
import { Mail, Sparkles, Clock, Shield, ExternalLink } from 'lucide-react'

export const metadata = {
    title: 'Inbox Cleanup | Megaminds',
    description: 'AI-powered email organization tool that helps declutter your inbox using smart categorization.',
}

export default function InboxCleanupPage() {
    return (
        <div className="py-16 px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
                {/* Hero */}
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
                        <Mail className="w-4 h-4" />
                        Desktop Tool
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900">Inbox Cleanup</h1>
                    <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                        AI-powered email organization that actually works. Categorize, archive,
                        and declutter thousands of emails in minutes.
                    </p>
                </div>

                {/* Features */}
                <div className="mt-16 grid gap-8 md:grid-cols-3">
                    <Feature
                        icon={<Sparkles className="w-6 h-6" />}
                        title="Smart Categorization"
                        description="AI analyzes your emails and groups them by sender, topic, and importance."
                    />
                    <Feature
                        icon={<Clock className="w-6 h-6" />}
                        title="Batch Actions"
                        description="Archive, delete, or organize hundreds of emails with a single click."
                    />
                    <Feature
                        icon={<Shield className="w-6 h-6" />}
                        title="Privacy First"
                        description="Runs locally on your machine. Your emails never leave your computer."
                    />
                </div>

                {/* CTA Section */}
                <div className="mt-16 p-8 bg-gray-50 rounded-2xl text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Get Started</h2>
                    <p className="mt-2 text-gray-600">
                        Download the tool and take back control of your inbox.
                    </p>
                    <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://github.com/asavschaeffer/email-assassin/releases/tag/v1.0.0"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                        >
                            Download from GitHub
                            <ExternalLink className="w-4 h-4" />
                        </a>
                        <Link
                            href="/consulting/intake"
                            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Need help setting up?
                        </Link>
                    </div>
                </div>

                {/* How It Works */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 text-center">How It Works</h2>
                    <div className="mt-8 space-y-6">
                        <Step
                            number={1}
                            title="Connect your email"
                            description="Authenticate with Gmail or Outlook using OAuth. We never see your password."
                        />
                        <Step
                            number={2}
                            title="Scan and categorize"
                            description="The AI scans your inbox and groups emails by patterns it detects."
                        />
                        <Step
                            number={3}
                            title="Review and act"
                            description="Browse categories, select what to keep, and batch-archive the rest."
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

function Feature({
    icon,
    title,
    description
}: {
    icon: React.ReactNode
    title: string
    description: string
}) {
    return (
        <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-700 mb-4">
                {icon}
            </div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="mt-2 text-sm text-gray-600">{description}</p>
        </div>
    )
}

function Step({
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
            <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-sm font-medium text-white shrink-0">
                {number}
            </div>
            <div>
                <h3 className="font-medium text-gray-900">{title}</h3>
                <p className="text-sm text-gray-600 mt-1">{description}</p>
            </div>
        </div>
    )
}
