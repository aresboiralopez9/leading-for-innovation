import Link from 'next/link'
import type { PostMeta } from '@/lib/posts'

interface PostCardProps {
  post: PostMeta
  featured?: boolean
}

function formatDate(date: string): string {
  if (!date) return ''

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-ink/10 bg-lfi-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
        featured ? 'md:rounded-[2rem]' : ''
      }`}
    >
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-lfi-yellow px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-ink">
            {post.category}
          </span>

          {post.featured && (
            <span className="rounded-full bg-lfi-mint px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-ink">
              Featured
            </span>
          )}
        </div>

        <Link href={`/blog/${post.slug}`} className="block">
          <h2
            className={`font-serif font-bold leading-tight text-ink transition group-hover:text-lfi-blue ${
              featured ? 'text-3xl' : 'text-2xl'
            }`}
          >
            {post.title}
          </h2>
        </Link>

        {post.excerpt && (
          <p className="mt-4 flex-1 text-sm leading-7 text-ink/70">
            {post.excerpt}
          </p>
        )}

        {post.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-lfi-mint/35 px-3 py-1 text-xs font-semibold text-ink/75"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-5">
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/55">
            {formatDate(post.date)}
            {post.readingTime ? ` · ${post.readingTime} min read` : ''}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/blog/${post.slug}`}
              className="rounded-full bg-ink px-4 py-2 text-xs font-bold text-lfi-white transition hover:bg-lfi-blue"
            >
              Read post
            </Link>

            {post.linkedInUrl && (
              <a
                href={post.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-lfi-blue px-4 py-2 text-xs font-bold text-lfi-white transition hover:bg-lfi-green"
              >
                LinkedIn version
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
