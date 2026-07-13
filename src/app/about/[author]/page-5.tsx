import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getAuthor, authors } from '@/lib/authors'
import { getAllPosts } from '@/lib/posts'
import { PostCard } from '@/components/PostCard'

interface Props {
  params: { author: string }
}

export function generateStaticParams() {
  return Object.keys(authors).map((author) => ({ author }))
}

export function generateMetadata({ params }: Props): Metadata {
  const author = getAuthor(params.author)
  if (!author) return {}
  return {
    title: author.name,
    description: author.bio,
  }
}

export default function AuthorPage({ params }: Props) {
  const author = getAuthor(params.author)
  if (!author) notFound()

  const posts = getAllPosts().filter((p) => p.author === author.id)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <div className="max-w-2xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-ink-subtle dark:text-gray-500 mb-10">
          <Link href="/" className="hover:text-ink dark:hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/about" className="hover:text-ink dark:hover:text-white transition-colors">About</Link>
          <span>/</span>
          <span className="text-ink-muted dark:text-gray-400">{author.name}</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <span
            className={`relative flex items-center justify-center rounded-2xl overflow-hidden w-52 h-52 mb-6 ${author.color} text-white font-bold text-4xl`}
          >
            {author.photo ? (
              <Image src={author.photo} alt={author.name} fill className="object-contain" sizes="208px" />
            ) : (
              author.initials
            )}
          </span>

          <p className="section-title mb-2">{author.role}</p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-ink dark:text-white leading-[1.1] mb-6">
            {author.name}
          </h1>
          <p className="text-lg text-ink-muted dark:text-gray-400 leading-relaxed mb-6">
            {author.longBio || author.bio}
          </p>

          <a
            href={author.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-lfi-blue text-white font-semibold text-sm hover:bg-lfi-green transition-colors"
          >
            {author.name} on LinkedIn
          </a>
        </div>
      </div>

      {/* Posts by this author */}
      <div className="max-w-4xl mx-auto border-t border-gray-200 dark:border-gray-800 pt-14">
        <p className="section-title mb-3">Written by {author.name}</p>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-ink dark:text-white mb-8">
          {posts.length} post{posts.length !== 1 ? 's' : ''}
        </h2>

        {posts.length === 0 ? (
          <p className="text-ink-muted dark:text-gray-400">No posts published yet — check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
