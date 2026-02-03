import Link from 'next/link'
import { Mail, Sparkles, Clock, Shield, Download, ChevronDown, Github, MessageCircle } from 'lucide-react'
import Image from 'next/image'

export const metadata = {
    title: 'Inbox Cleanup | Megaminds',
    description: 'Fast email organization tool that helps declutter your inbox by grouping messages by sender.',
}

export default function InboxCleanupPage() {
    return (
        <main className="py-16 px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
                {/* Hero */}
                <header className="text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
                        <Mail className="w-4 h-4" />
                        Desktop Tool
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900">Inbox Cleanup</h1>
                    <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                        Lightning-fast email organization that actually works. Categorize, archive,
                        and declutter thousands of emails in minutes.
                    </p>
                    <div className="mt-8">
                        <a
                            href="#download"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                        >
                            <Download className="w-4 h-4" />
                            Download Now
                        </a>
                    </div>
                </header>

                <div className="flex flex-col">
                    {/* Demo */}
                    <section className="mt-16 lg:order-2" aria-label="Product demo">
                        <figure className="relative rounded-xl overflow-hidden border border-gray-200 shadow-lg">
                            <Image
                                src="https://github.com/asavschaeffer/email-assassin/releases/latest/download/demo.jpg"
                                alt="Inbox Cleanup tool interface showing email categorization"
                                width={1200}
                                height={675}
                                className="w-full h-auto"
                                priority
                            />
                        </figure>
                    </section>

                    {/* Features */}
                    <section className="mt-16 lg:order-1" aria-labelledby="features-heading">
                        <h2 id="features-heading" className="text-2xl font-bold text-gray-900 text-center mb-8 lg:sr-only">Features</h2>
                        <div className="grid gap-8 md:grid-cols-3">
                            <Feature
                                icon={<Sparkles className="w-6 h-6" />}
                                title="Smart Categorization"
                                description="Automatically groups your emails by sender contact for fast, efficient sorting."
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
                    </section>
                </div>

                {/* How It Works */}
                <section className="mt-16" aria-labelledby="how-it-works-heading">
                    <h2 id="how-it-works-heading" className="text-2xl font-bold text-gray-900 text-center">How It Works</h2>
                    <ol className="mt-8 space-y-6">
                        <Step
                            number={1}
                            title="Connect your email"
                            description="Authenticate with Gmail or Outlook using OAuth. We never see your password."
                        />
                        <Step
                            number={2}
                            title="Scan and categorize"
                            description="Scans your inbox and efficiently groups emails by sender contact."
                        />
                        <Step
                            number={3}
                            title="Review and act"
                            description="Browse categories, select what to keep, and batch-archive the rest."
                        />
                    </ol>
                </section>

                {/* FAQ */}
                <section className="mt-16" aria-labelledby="faq-heading">
                    <h2 id="faq-heading" className="text-2xl font-bold text-gray-900 text-center">Frequently Asked Questions</h2>
                    <div className="mt-8 space-y-4 max-w-2xl mx-auto">
                        <details className="group border border-gray-200 rounded-lg hover:border-gray-300 transition-all">
                            <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between p-4">
                                Which email providers are supported?
                                <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-200 group-open:rotate-180" />
                            </summary>
                            <p className="px-4 pb-4 pt-0 text-sm text-gray-600">
                                <span className="inline-flex items-center gap-1.5 align-middle">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" alt="Gmail" className="w-4 h-4" />
                                    <span>Gmail</span>
                                </span>
                                {' '}and{' '}<span className="inline-flex items-center gap-2 align-middle">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b3/Microsoft_Outlook_logo_%282024%E2%80%932025%29.svg" alt="Outlook" className="w-4 h-4" />
                                    <span>Outlook</span>
                                </span>{' '}via OAuth authentication.
                            </p>
                        </details>
                        <details className="group border border-gray-200 rounded-lg hover:border-gray-300 transition-all">
                            <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between p-4">
                                Do I need to create an account?
                                <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-200 group-open:rotate-180" />
                            </summary>
                            <p className="px-4 pb-4 pt-0 text-sm text-gray-600">No account needed. Just download and run the app.</p>
                        </details>
                        <details className="group border border-gray-200 rounded-lg hover:border-gray-300 transition-all">
                            <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between p-4">
                                Is my data shared or stored anywhere?
                                <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-200 group-open:rotate-180" />
                            </summary>
                            <p className="px-4 pb-4 pt-0 text-sm text-gray-600">No. The app runs entirely on your machine. Your emails never leave your computer.</p>
                        </details>
                        <details className="group border border-gray-200 rounded-lg hover:border-gray-300 transition-all">
                            <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between p-4">
                                What are the system requirements?
                                <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-200 group-open:rotate-180" />
                            </summary>
                            <p className="px-4 pb-4 pt-0 text-sm text-gray-600">Windows 10+, macOS 11+, or modern Linux distributions (Ubuntu 20.04+, Fedora 35+, etc.).</p>
                        </details>
                        <details className="group border border-gray-200 rounded-lg hover:border-gray-300 transition-all">
                            <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between p-4">
                                How much does it cost?
                                <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-200 group-open:rotate-180" />
                            </summary>
                            <p className="px-4 pb-4 pt-0 text-sm text-gray-600">Free and open source.</p>
                        </details>
                    </div>
                </section>

                {/* Download */}
                <section id="download" className="mt-16 p-8 bg-gray-50 rounded-2xl scroll-mt-8" aria-labelledby="download-heading">
                    <h2 id="download-heading" className="text-2xl font-bold text-gray-900 text-center">Get Started</h2>
                    <p className="mt-2 text-gray-600 text-center">
                        Choose your platform and take back control of your inbox.
                    </p>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <DownloadButton
                            platform="Windows"
                            icon="windows"
                            href="https://github.com/asavschaeffer/email-assassin/releases/latest/download/email-assassin.exe"
                        />
                        <DownloadButton
                            platform="macOS"
                            icon="apple"
href="https://github.com/asavschaeffer/email-assassin/releases/latest/download/email-assassin"
                        />
                        <DownloadButton
                            platform="Linux"
                            icon="linux"
                            href="https://github.com/asavschaeffer/email-assassin/releases/latest/download/email-assassin"
                        />
                    </div>
                    <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
                        <a
                            href="https://github.com/asavschaeffer/email-assassin"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <Github className="w-4 h-4" />
                            View on GitHub
                        </a>
                        <span className="hidden sm:inline text-gray-300">•</span>
                        <Link
                            href="/consulting/intake"
                            className="inline-flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            Need help setting up?
                            <MessageCircle className="w-4 h-4" />
                        </Link>
                    </div>
                </section>
            </div>
        </main>
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
        <article className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-700 mb-4">
                {icon}
            </div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="mt-2 text-sm text-gray-600">{description}</p>
        </article>
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
        <li className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-sm font-medium text-white shrink-0">
                {number}
            </div>
            <div>
                <h3 className="font-medium text-gray-900">{title}</h3>
                <p className="text-sm text-gray-600 mt-1">{description}</p>
            </div>
        </li>
    )
}

function DownloadButton({
    platform,
    icon,
    href
}: {
    platform: string
    icon: 'windows' | 'apple' | 'linux'
    href: string
}) {
    const iconConfig = {
        windows: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Windows_logo_-_2012.svg',
            alt: 'Windows logo'
        },
        apple: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
            alt: 'Apple logo'
        },
        linux: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg',
            alt: 'Linux logo'
        }
    }

    return (
        <a
            href={href}
            download
            className="flex flex-col items-center gap-3 p-6 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all group"
        >
            <img
                src={iconConfig[icon].url}
                alt={iconConfig[icon].alt}
                className="w-12 h-12 object-contain"
            />
            <div className="text-center">
                <div className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                    {platform}
                </div>
                <div className="text-xs text-gray-500 mt-1 flex items-center gap-1 justify-center">
                    <Download className="w-3 h-3" />
                    Download
                </div>
            </div>
        </a>
    )
}
