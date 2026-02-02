import Link from 'next/link'
import { ChefHat, MessageCircle, Mic, Camera, Brain, Shield, ExternalLink } from 'lucide-react'

export const metadata = {
    title: 'Heard Chef | Megaminds',
    description: 'Native iOS cooking assistant with AI, long-term memory, and hands-free voice mode for your kitchen.',
}

export default function HeardChefPage() {
    return (
        <div className="py-16 px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
                {/* Hero */}
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium mb-6">
                        <ChefHat className="w-4 h-4" />
                        iOS App
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900">Heard, Chef</h1>
                    <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                        AI cooking assistant that actually remembers your kitchen. Chat naturally,
                        cook hands-free, and never forget what&apos;s in your pantry again.
                    </p>
                </div>

                {/* Features */}
                <div className="mt-16 grid gap-8 md:grid-cols-3">
                    <Feature
                        icon={<MessageCircle className="w-6 h-6" />}
                        title="Natural Conversation"
                        description="Text your chef like a friend. Ask about ingredients, get recipe suggestions, and manage your shopping list effortlessly."
                    />
                    <Feature
                        icon={<Mic className="w-6 h-6" />}
                        title="Hands-Free Voice Mode"
                        description="Tap the microphone for live cooking assistance. A non-intrusive modal with animated avatar keeps you company while you cook."
                    />
                    <Feature
                        icon={<Camera className="w-6 h-6" />}
                        title="Visual Intelligence"
                        description="Snap photos of receipts to auto-add groceries or check if your onions are caramelized enough."
                    />
                </div>

                {/* CTA Section */}
                <div className="mt-16 p-8 bg-gray-50 rounded-2xl text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Cook Smarter</h2>
                    <p className="mt-2 text-gray-600">
                        Built for model independence with the custom &quot;Brain Protocol.&quot; Privacy-focused,
                        works offline, and remembers your allergies and preferences.
                    </p>
                    <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://apps.apple.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                        >
                            Coming to App Store
                            <ExternalLink className="w-4 h-4" />
                        </a>
                        <Link
                            href="/tools"
                            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Explore More Tools
                        </Link>
                    </div>
                </div>

                {/* How It Works */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 text-center">Key Features</h2>
                    <div className="mt-8 space-y-6">
                        <Step
                            number={1}
                            title="Personalized Memory"
                            description="The AI remembers your allergies, favorite recipes, and cooking preferences without you needing to manage prompt files."
                        />
                        <Step
                            number={2}
                            title="Active Tool Calling"
                            description="Instead of dumping your pantry in every prompt, the AI calls specific tools to retrieve data on demand for minimal latency."
                        />
                        <Step
                            number={3}
                            title="Fuzzy-to-Strict Bridge"
                            description="Natural language like &quot;I bought a bunch of cilantro&quot; gets normalized to strict database types (count: 1, category: produce)."
                        />
                        <Step
                            number={4}
                            title="Model Independence"
                            description="The Brain Protocol decouples the UI from AI providers. Swap between cloud models (Gemini 2.0 Flash) and local models seamlessly."
                        />
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 text-center">Built With</h2>
                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        <div className="p-4 bg-white border border-gray-200 rounded-lg">
                            <h3 className="font-semibold text-gray-900">Swift & SwiftData</h3>
                            <p className="mt-1 text-sm text-gray-600">Native iOS with local persistence</p>
                        </div>
                        <div className="p-4 bg-white border border-gray-200 rounded-lg">
                            <h3 className="font-semibold text-gray-900">Gemini Live API</h3>
                            <p className="mt-1 text-sm text-gray-600">Real-time multimodal streaming</p>
                        </div>
                        <div className="p-4 bg-white border border-gray-200 rounded-lg">
                            <h3 className="font-semibold text-gray-900">Brain Protocol</h3>
                            <p className="mt-1 text-sm text-gray-600">Model-agnostic intelligence layer</p>
                        </div>
                        <div className="p-4 bg-white border border-gray-200 rounded-lg">
                            <h3 className="font-semibold text-gray-900">PCM 16-bit Audio</h3>
                            <p className="mt-1 text-sm text-gray-600">Low-latency voice streaming at 16kHz</p>
                        </div>
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
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-700 mb-4">
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
            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-sm font-medium text-white shrink-0">
                {number}
            </div>
            <div>
                <h3 className="font-medium text-gray-900">{title}</h3>
                <p className="text-sm text-gray-600 mt-1">{description}</p>
            </div>
        </div>
    )
}
