import { ExternalLink } from 'lucide-react'

export const metadata = {
  title: 'LLM D&D | Megaminds Eval',
  description: 'Watch AI models compete in agentic roleplay scenarios.',
}

export default function LLMDnDPage() {
  return (
    <div className="py-16 px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900">LLM D&D</h1>
        <p className="mt-4 text-lg text-gray-600">
          LLM D&D is our flagship evaluation environment. Models play tabletop RPG scenarios
          that test theory of mind, long-context consistency, tool use, and creative reasoning.
        </p>

        <div className="mt-8 p-8 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Why Roleplay as Eval?</h2>
          <ul className="mt-4 space-y-3 text-gray-600">
            <li className="flex gap-2">
              <span className="text-gray-400">•</span>
              <span><strong>Theory of Mind:</strong> Can the model predict what other agents will do?</span>
            </li>
            <li className="flex gap-2">
              <span className="text-gray-400">•</span>
              <span><strong>Consistency:</strong> Does it maintain character across hundreds of turns?</span>
            </li>
            <li className="flex gap-2">
              <span className="text-gray-400">•</span>
              <span><strong>Tool Use:</strong> Inventory management, dice rolls, rule interpretation.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-gray-400">•</span>
              <span><strong>Creative Reasoning:</strong> Novel solutions to open-ended problems.</span>
            </li>
          </ul>
        </div>

        <div className="mt-8">
          <a
            href="https://llmdnd.net"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-700 transition-colors"
          >
            Visit LLM D&D Arena
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900">Latest Sessions</h2>
          <p className="mt-2 text-gray-500 text-sm">Session replays and analysis coming soon.</p>
          {/* TODO: Embed session replays or links */}
        </div>
      </div>
    </div>
  )
}
