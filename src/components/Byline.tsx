import Image from 'next/image'
import { getAuthor } from '@/lib/authors'

interface BylineProps {
  authorId?: string
  size?: 'sm' | 'md'
  /** If true, clicking opens the author's LinkedIn. Set false inside nested links (e.g. on PostCard). */
  linked?: boolean
}

export function Byline({ authorId, size = 'md', linked = true }: BylineProps) {
  const author = getAuthor(authorId)
  if (!author) return null

  const avatarSize = size === 'sm' ? 'w-6 h-6 text-[10px]' : 'w-9 h-9 text-xs'
  const nameSize = size === 'sm' ? 'text-xs' : 'text-sm'

  const content = (
    <span className="inline-flex items-center gap-2">
      <span
        className={`relative flex items-center justify-center rounded-full overflow-hidden shrink-0 ${avatarSize} ${author.color} text-white font-bold`}
      >
        {author.photo ? (
          <Image src={author.photo} alt={author.name} fill className="object-cover" sizes="40px" />
        ) : (
          author.initials
        )}
      </span>
      <span className={`font-semibold text-ink dark:text-white ${nameSize}`}>{author.name}</span>
    </span>
  )

  if (!linked) return content

  return (
    <a
      href={author.linkedInUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="group/byline inline-flex items-center hover:opacity-80 transition-opacity"
    >
      {content}
    </a>
  )
}
