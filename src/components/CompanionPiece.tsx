import Link from 'next/link'
import { getPostMeta } from '@/lib/posts'
import { getAuthor } from '@/lib/authors'

interface CompanionPieceProps {
  slug: string
}

export function CompanionPiece({ slug }: CompanionPieceProps) {
  const post = getPostMeta(slug)
  if (!post) return null
  const author = getAuthor(post.author)

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group not-prose block my-10 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#111114] p-6 hover:border-brand-500 dark:hover:border-brand-400 transition-colors no-underline"
    >
      <p className="section-title mb-3">The Companion Piece</p>
      <h3 className="text-lg font-bold text-ink dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
        {post.title}
      </h3>
      <p className="text-sm text-ink-muted dark:text-gray-400 leading-relaxed mb-4 line-clamp-2">
        {post.excerpt}
      </p>
      <div className="flex items-center justify-between gap-3">
        {author && (
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-ink dark:text-white">
            <span
              className={`flex items-center justify-center w-5 h-5 rounded-full ${author.color} text-white text-[9px] font-bold shrink-0`}
            >
              {author.initials}
            </span>
            {author.name}&rsquo;s take
          </span>
        )}
        <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 whitespace-nowrap">
          Read it →
        </span>
      </div>
    </Link>
  )
}
