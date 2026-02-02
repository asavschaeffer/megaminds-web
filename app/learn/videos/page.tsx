import { ExternalLink, Play } from 'lucide-react'

export const metadata = {
  title: 'Videos | Megaminds Learn',
  description: 'Curated video content on AI.',
}

const videos = {
  ours: [
    // {
    //   title: 'Introduction to Megaminds',
    //   description: 'Who we are, what we do, and why AI evaluation matters.',
    //   thumbnail: '/images/video-placeholder.jpg',
    //   duration: '5:00',
    //   href: '#',
    // },
  ],
  curated: [
    {
      title: 'Let\'s Build GPT from Scratch',
      description: 'Andrej Karpathy walks through building a transformer from scratch.',
      source: 'Andrej Karpathy',
      href: 'https://www.youtube.com/watch?v=kCc8FmEb1nY',
      category: 'foundations',
    },
    {
      title: 'Ilya Sutskever on AGI',
      description: 'Deep discussion on where AI is heading and what it means.',
      source: 'Dwarkesh Podcast',
      href: 'https://www.youtube.com/watch?v=Yf1o0TQzry8',
      category: 'foundations',
    },
    {
      title: 'Attention Is All You Need - Explained',
      description: 'Visual breakdown of the transformer architecture.',
      source: '3Blue1Brown',
      href: 'https://www.youtube.com/watch?v=wjZofJX0v4M',
      category: 'foundations',
    },
  ]
}

export default function VideosPage() {
  return (
    <div className="py-16 px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900">Videos</h1>
        <p className="mt-4 text-gray-600">
          Visual explanations of complex concepts—our content and curated picks from across the internet.
        </p>

        {/* Our Videos */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900">Megaminds Content</h2>
          <p className="text-sm text-gray-500 mt-1">Coming soon</p>
          {/*
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {videos.ours.map((video) => (
              <VideoCard key={video.title} video={video} />
            ))}
          </div>
          */}
        </section>

        {/* Curated */}
        <section className="mt-16">
          <h2 className="text-xl font-semibold text-gray-900">Curated Recommendations</h2>
          <p className="text-sm text-gray-500 mt-1">
            The best explanations we've found on the internet
          </p>
          <div className="mt-6 space-y-4">
            {videos.curated.map((video) => (
              <a
                key={video.title}
                href={video.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors flex items-center gap-2">
                        {video.title}
                        <ExternalLink className="w-3 h-3 text-gray-400" />
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{video.description}</p>
                      <p className="text-xs text-gray-400 mt-2">{video.source}</p>
                    </div>
                    <div className="p-2 bg-gray-100 rounded-full text-gray-500 group-hover:bg-gray-200 transition-colors">
                      <Play className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
