import { MessageCircle, Twitter } from 'lucide-react'
import type { SocialEmbedProps } from '@/lib/models/types'

export const SocialEmbed = ({ type = 'quote', author, handle, content, date, dateDisplay, url }: SocialEmbedProps) => {
  return (
    <figure className="my-8 p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center" aria-hidden="true">
          {type === 'tweet' ? (
            <Twitter className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
          ) : (
            <MessageCircle className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <figcaption className="flex items-center gap-2 mb-2 flex-wrap">
            <cite className="font-semibold text-sm not-italic">{author}</cite>
            {handle && <span className="text-sm text-neutral-500 dark:text-neutral-400">{handle}</span>}
            {date && (
              <>
                <span className="text-neutral-400 dark:text-neutral-600" aria-hidden="true">
                  ·
                </span>
                <time dateTime={date} className="text-sm text-neutral-500 dark:text-neutral-400">
                  {dateDisplay || date}
                </time>
              </>
            )}
          </figcaption>
          <blockquote className="text-neutral-800 dark:text-neutral-200 leading-relaxed whitespace-pre-wrap">
            <p>{content}</p>
          </blockquote>
          {url && url !== '#' && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              View original <span aria-hidden="true">→</span>
            </a>
          )}
        </div>
      </div>
    </figure>
  )
}

export default SocialEmbed
