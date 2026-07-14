import Link from 'next/link'
import type { PostMeta } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import { Byline } from '@/components/Byline'

interface PostCardProps {
  post: PostMeta
  featured?: boolean
}

export function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <article
      className={`group flex h-full flex-col rounded-2xl border border-ink/10 bg-lfi-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
        featured ? 'md:p-8' : ''
      }`}
    >
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-lfi-yellow/45 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-ink">
          {post.category}
        </span>
      </div>

      <h2
        className={`font-black leading-tight tracking-tight text-ink transition-colors group-hover:text-lfi-green ${
          featured ? 'text-3xl' : 'text-2xl'
        }`}
      >
        <Link href={`/blog/${post.slug}`}>
          {post.title}
        </Link>
      </h2>

      <p className="mt-4 text-base leading-7 text-ink/70">
        {post.excerpt}
      </p>

      {post.author && (
        <div className="mt-5">
          <Byline authorId={post.author} />
        </div>
      )}

      <div className="mt-6 border-t border-ink/10 pt-5">
        <div className="mb-5 flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-lfi-green/20 bg-lfi-mint/30 px-3 py-1 text-xs font-semibold text-lfi-green"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-ink/55">
          <div className="flex flex-wrap items-center gap-3">
            <span>{post.readingTime} min read</span>
            <span>{formatDate(post.date)}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/blog/${post.slug}`}
              className="font-semibold text-lfi-blue hover:underline"
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
