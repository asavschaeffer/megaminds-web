import Link from 'next/link'
import { ChefHat, Video, Shield, BookOpen, Github, ChevronDown } from 'lucide-react'
import Image from 'next/image'

export const metadata = {
    title: 'Heard, Chef | Megaminds',
    description: 'Native iOS cooking assistant with Gemini AI. iMessage-style interface with voice mode, recipe management, and smart pantry tracking.',
}

export default function HeardChefPage() {
    return (
        <main className="py-16 px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
                {/* Hero */}
                <header className="text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-sm font-medium mb-6">
                        <ChefHat className="w-4 h-4" />
                        iOS App
                    </div>
                    <div className="mb-6">
                        <Image
                            src="https://raw.githubusercontent.com/asavschaeffer/heard-iOS/master/assets/app-icon.png"
                            alt="Heard Chef app icon"
                            width={120}
                            height={120}
                            className="rounded-[26.67%] shadow-lg mx-auto"
                        />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900">Heard, Chef!</h1>
                    <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                        Your AI cooking assistant powered by Gemini. Chat like iMessage, cook hands-free with voice mode, and manage your recipes, fridge, and pantry—all on your phone.
                    </p>
                    <div className="mt-8">
                        <a
                            href="https://github.com/asavschaeffer/heard-iOS"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                        >
                            <Github className="w-4 h-4" />
                            View on GitHub
                        </a>
                    </div>
                </header>

                <div className="flex flex-col">
                    {/* Demo */}
                    <section className="mt-16 lg:order-2" aria-label="Product demo">
                        <figure className="relative rounded-xl overflow-hidden border border-gray-200 shadow-lg">
                            <Image
                                src="https://raw.githubusercontent.com/asavschaeffer/heard-iOS/master/assets/mockups/imessage-esque-chat.png"
                                alt="Heard Chef app interface showing iMessage-style chat with cooking assistant"
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
                                icon={<Video className="w-6 h-6" />}
                                title="Truly Multimodal"
                                description="Text, call, dictate, or stream video—just like FaceTime. Hands-free voice mode with live video streaming and an animated chef avatar lets you cook while you chat."
                            />
                            <Feature
                                icon={<BookOpen className="w-6 h-6" />}
                                title="Knows Your Kitchen"
                                description="Maintains a complete record of your available ingredients, references your saved recipes, and remembers your allergies and preferences."
                            />
                            <Feature
                                icon={<Shield className="w-6 h-6" />}
                                title="Privacy First"
                                description="All your recipe, fridge, and pantry data stays on your phone with SwiftData. Only chat messages are sent to Gemini for AI processing."
                            />
                        </div>
                    </section>
                </div>

                {/* How It Works */}
                <section className="mt-16" aria-labelledby="how-it-works-heading">
                    <h2 id="how-it-works-heading" className="text-2xl font-bold text-gray-900 text-center">How It Works</h2>
                    <div className="mt-8 space-y-8">
                        <DetailedStep
                            number={1}
                            title="Ask about your kitchen"
                            scenario='"Do I have enough eggs for carbonara?"'
                            technical="The AI calls get_ingredient and list_ingredients tools to query your SwiftData inventory. You'll see a live status chip: 'Checking Inventory...' followed by 'Found: 6 eggs'. It then searches your recipe book and suggests matching dishes."
                        />
                        <DetailedStep
                            number={2}
                            title="Cook with voice guidance"
                            scenario='"How do I know when these onions are caramelized?"'
                            technical="Switch to hands-free voice mode with live video streaming. The AI streams responses via Gemini's multimodal live API using PCM 16-bit audio at 16kHz. An animated chef avatar reacts to your voice. Stream video of your pan or snap a photo mid-cooking for instant visual analysis."
                        />
                        <DetailedStep
                            number={3}
                            title="Manage inventory effortlessly"
                            scenario="Snap a photo of your grocery receipt"
                            technical="The AI parses items using vision, normalizes quantities ('a bunch of cilantro' → count: 1, category: produce), and calls add_ingredient for each item. All data saves locally to SwiftData—never leaving your phone."
                        />
                        <DetailedStep
                            number={4}
                            title="Build your recipe collection"
                            scenario='"Save this recipe for shakshuka"'
                            technical="The AI calls create_recipe with ingredients and steps, tags it appropriately, and adds missing items to your shopping list. Later, ask 'What can I make tonight?' and it'll call search_recipes and check_recipe_availability to suggest meals based on what you have."
                        />
                    </div>
                </section>

                {/* FAQ */}
                <section className="mt-16" aria-labelledby="faq-heading">
                    <h2 id="faq-heading" className="text-2xl font-bold text-gray-900 text-center">Frequently Asked Questions</h2>
                    <div className="mt-8 space-y-4 max-w-2xl mx-auto">
                        <details className="group border border-gray-200 rounded-lg hover:border-gray-300 transition-all">
                            <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between p-4">
                                What are the requirements?
                                <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-200 group-open:rotate-180" />
                            </summary>
                            <p className="px-4 pb-4 pt-0 text-sm text-gray-600">
                                iOS 17.0+, Xcode 15.0+, and a Google Gemini API key with multimodal live access capabilities.
                            </p>
                        </details>
                        <details className="group border border-gray-200 rounded-lg hover:border-gray-300 transition-all">
                            <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between p-4">
                                Is it available on the App Store?
                                <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-200 group-open:rotate-180" />
                            </summary>
                            <p className="px-4 pb-4 pt-0 text-sm text-gray-600">
                                Currently in development. You can build and run it yourself from the GitHub repository. Free and open source under AGPL-3.0 with Commons Clause.
                            </p>
                        </details>
                        <details className="group border border-gray-200 rounded-lg hover:border-gray-300 transition-all">
                            <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between p-4">
                                Will local models be supported?
                                <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-200 group-open:rotate-180" />
                            </summary>
                            <p className="px-4 pb-4 pt-0 text-sm text-gray-600">
                                Potentially in the future if Google releases local model capabilities. The architecture is designed to be flexible for different AI providers.
                            </p>
                        </details>
                    </div>
                </section>

                {/* Tech Stack */}
                <section className="mt-16" aria-labelledby="tech-heading">
                    <h2 id="tech-heading" className="text-2xl font-bold text-gray-900 text-center">Built With</h2>
                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        <div className="p-4 bg-white border border-gray-200 rounded-lg">
                            <h3 className="font-semibold text-gray-900">Swift & SwiftData</h3>
                            <p className="mt-1 text-sm text-gray-600">Native iOS with local-first data storage</p>
                        </div>
                        <div className="p-4 bg-white border border-gray-200 rounded-lg">
                            <h3 className="font-semibold text-gray-900">Gemini 2.0 Flash</h3>
                            <p className="mt-1 text-sm text-gray-600">Real-time multimodal AI streaming</p>
                        </div>
                        <div className="p-4 bg-white border border-gray-200 rounded-lg">
                            <h3 className="font-semibold text-gray-900">PCM 16-bit Audio</h3>
                            <p className="mt-1 text-sm text-gray-600">Low-latency voice streaming at 16kHz</p>
                        </div>
                        <div className="p-4 bg-white border border-gray-200 rounded-lg">
                            <h3 className="font-semibold text-gray-900">Tool Calling</h3>
                            <p className="mt-1 text-sm text-gray-600">AI manages recipes, fridge, and pantry data</p>
                        </div>
                    </div>
                </section>

                {/* Get Started */}
                <section className="mt-16 p-8 bg-amber-50 rounded-2xl" aria-labelledby="get-started-heading">
                    <h2 id="get-started-heading" className="text-2xl font-bold text-gray-900 text-center">Get Started</h2>
                    <p className="mt-2 text-gray-600 text-center">
                        Free and open source. Build it yourself or follow along with development.
                    </p>
                    <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="https://github.com/asavschaeffer/heard-iOS"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                        >
                            <Github className="w-4 h-4" />
                            View on GitHub
                        </a>
                        <Link
                            href="/tools"
                            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Explore More Tools
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
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-700 mb-4">
                {icon}
            </div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="mt-2 text-sm text-gray-600">{description}</p>
        </article>
    )
}

function DetailedStep({
    number,
    title,
    scenario,
    technical
}: {
    number: number
    title: string
    scenario: string
    technical: string
}) {
    return (
        <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-sm font-medium text-white shrink-0 mt-1">
                {number}
            </div>
            <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-lg">{title}</h3>
                <p className="mt-2 text-amber-700 italic">{scenario}</p>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{technical}</p>
            </div>
        </div>
    )
}
