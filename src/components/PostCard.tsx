import Link from 'next/link'
import type { PostMeta } from '@/lib/posts'
import { formatDate } from '@/lib/utils'

interface PostCardProps {
  post: PostMeta
  featured?: boolean
}

export function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <article
      className={`group bg-white dark:bg-[#111114] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden card-hover ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      <Link href={`/blog/${post.slug}`} className="block p-6 h-full">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="category-badge">{post.category}</span>
          {post.framework && post.frameworkName && (
            <span className="framework-badge">
              <FrameworkIcon />
              {post.frameworkName}
            </span>
          )}
        </div>

        {/* Title */}
        <h2
          className={`font-bold tracking-tight text-ink dark:text-white mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-tight ${
            featured ? 'text-2xl sm:text-3xl' : 'text-xl'
          }`}
        >
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-ink-muted dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-ink-subtle dark:text-gray-500 whitespace-nowrap ml-2">
            <ClockIcon />
            {post.readingTime} min
          </div>
        </div>

        <div className="mt-3 text-xs text-ink-subtle dark:text-gray-500">
          {formatDate(post.date)}
        </div>
      </Link>
    </article>
  )
}

function FrameworkIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
