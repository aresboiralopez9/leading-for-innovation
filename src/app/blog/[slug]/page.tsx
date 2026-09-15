import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getPost, getAllPostSlugs } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import { NewsletterCTAWrapper } from '@/components/NewsletterCTAWrapper'
import { Byline } from '@/components/Byline'
import { CompanionPiece } from '@/components/CompanionPiece'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

type Language = 'en' | 'es' | 'ca'

function getLanguageFromSlug(slug: string): Language {
  if (slug.endsWith('-es')) return 'es'
  if (slug.endsWith('-ca')) return 'ca'
  return 'en'
}

function getBaseSlug(slug: string): string {
  if (slug.endsWith('-es') || slug.endsWith('-ca')) {
    return slug.slice(0, -3)
  }

  return slug
}

function getTranslationSlug(slug: string, language: Language): string {
  const baseSlug = getBaseSlug(slug)

  if (language === 'en') return baseSlug

  return `${baseSlug}-${language}`
}

function LanguageToggle({ slug }: { slug: string }) {
  const currentLanguage = getLanguageFromSlug(slug)

  const languages = [
    { key: 'en' as const, label: 'English' },
    { key: 'es' as const, label: 'Español' },
    { key: 'ca' as const, label: 'Català' },
  ]

  return (
    <div className="flex items-center gap-1 text-sm">
      {languages.map((language, index) => {
        const translationSlug = getTranslationSlug(slug, language.key)
        const isCurrent = language.key === currentLanguage

        return (
          <div key={language.key} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-gray-300 dark:text-gray-700">
                |
              </span>
            )}

            {isCurrent ? (
              <span className="font-semibold text-lfi-green">
                {language.label}
              </span>
            ) : (
              <Link
                href={`/blog/${translationSlug}`}
                className="text-ink-muted dark:text-gray-500 hover:text-lfi-green dark:hover:text-lfi-green transition-colors"
              >
                {language.label}
              </Link>
            )}
          </div>
        )
      })}
    </div>
  )
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug)

  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug)

  if (!post) notFound()

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="max-w-2xl mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-ink-subtle dark:text-gray-500 mb-10">
          <Link
            href="/"
            className="hover:text-ink dark:hover:text-white transition-colors"
          >
            Home
          </Link>
          <span>/</span>
          <Link
            href="/blog"
            className="hover:text-ink dark:hover:text-white transition-colors"
          >
            Blog
          </Link>
          <span>/</span>
          <span className="text-ink-muted dark:text-gray-400 truncate">
            {post.title}
          </span>
        </nav>

        {/* Post header */}
        <header className="mb-10">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="category-badge">{post.category}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-ink dark:text-white leading-[1.1] mb-5">
            {post.title}
          </h1>

          <p className="text-lg text-ink-muted dark:text-gray-400 leading-relaxed mb-6">
            {post.excerpt}
          </p>

          {/* Byline */}
          {post.author && (
            <div className="mb-6">
              <Byline authorId={post.author} size="md" />
            </div>
          )}

          {/* Language Toggle */}
          <div className="mb-6">
            <LanguageToggle slug={params.slug} />
          </div>

          {/* Meta bar */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 py-4 border-y border-gray-200 dark:border-gray-800 text-sm text-ink-muted dark:text-gray-400">
            <div className="flex items-center gap-1.5">
              <CalendarIcon />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>

            <div className="flex items-center gap-1.5">
              <ClockIcon />
              <span>{post.readingTime} min read</span>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-1">
              {post.tags.map((tag) => (
                <span key={tag} className="tag-pill">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Featured image */}
        {post.featuredImage && (
          <div className="mb-12 overflow-hidden rounded-2xl">
            <div className="relative aspect-[16/8.5] w-full">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-lg dark:prose-dark max-w-none
            prose-headings:font-black prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:leading-relaxed prose-p:text-ink-muted dark:prose-p:text-gray-300
            prose-li:text-ink-muted dark:prose-li:text-gray-300
            prose-blockquote:border-l-4 prose-blockquote:border-brand-500 prose-blockquote:pl-5 prose-blockquote:not-italic
            prose-strong:text-ink dark:prose-strong:text-white
            prose-code:text-brand-600 dark:prose-code:text-brand-300
            prose-a:text-brand-600 dark:prose-a:text-brand-400"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* Companion piece */}
        {post.companionSlug && (
          <CompanionPiece slug={post.companionSlug} />
        )}

        {/* Share / CTA strip */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div>
            <p className="text-sm font-semibold text-ink dark:text-white mb-1">
              Found this useful?
            </p>
            <p className="text-xs text-ink-muted dark:text-gray-400">
              Share it with your team or follow for more.
            </p>
          </div>

          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
              `https://leadingforinnovation.com/blog/${post.slug}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-lfi-blue text-white text-sm font-semibold hover:bg-lfi-green transition-colors"
          >
            Share on LinkedIn
          </a>
        </div>
      </div>

      {/* Newsletter CTA */}
      <NewsletterCTAWrapper />
    </div>
  )
}

function CalendarIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
