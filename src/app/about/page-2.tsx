import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAboutPageData, getSiteSettings } from '@/lib/content'
import { getAllAuthors } from '@/lib/authors'

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getAboutPageData()
  return {
    title: cms.seoTitle,
    description: cms.seoDescription,
  }
}

export default async function AboutPage() {
  const cms = await getAboutPageData()
  const settings = getSiteSettings()
  const authors = getAllAuthors()

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <p className="section-title mb-3">{cms.sectionLabel}</p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-ink dark:text-white leading-[1.1] mb-6">
            {cms.headline}<br />
            <span className="text-brand-500">{cms.headlineAccent}</span>
          </h1>
          <p className="text-xl text-ink-muted dark:text-gray-400 leading-relaxed">
            {cms.intro}
          </p>
        </div>

        {/* Manifesto body rendered from Markdown */}
        <div
          className="prose prose-lg dark:prose-dark max-w-none mb-14
            prose-headings:font-black prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-p:leading-relaxed prose-p:text-ink-muted dark:prose-p:text-gray-300
            prose-li:text-ink-muted dark:prose-li:text-gray-300
            prose-blockquote:border-l-4 prose-blockquote:border-brand-500 prose-blockquote:pl-5 prose-blockquote:not-italic prose-blockquote:font-semibold
            prose-strong:text-ink dark:prose-strong:text-white"
          dangerouslySetInnerHTML={{ __html: cms.bodyHtml }}
        />

        {/* CTA buttons */}
        {(cms.primaryButtonText || cms.secondaryButtonText) && (
          <div className="flex flex-wrap gap-4 mb-16">
            {cms.primaryButtonText && (
              <Link
                href={cms.primaryButtonHref}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink dark:bg-white text-white dark:text-ink font-bold text-sm hover:opacity-80 transition-opacity"
              >
                {cms.primaryButtonText}
              </Link>
            )}
            {cms.secondaryButtonText && (
              <a
                href={settings.linkedInUrl1}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 dark:border-gray-700 text-ink dark:text-white font-semibold text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                {cms.secondaryButtonText}
              </a>
            )}
          </div>
        )}
      </div>

      {/* Who's behind it */}
      <div className="max-w-4xl mx-auto border-t border-gray-200 dark:border-gray-800 pt-14">
        <p className="section-title mb-3">The People</p>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-ink dark:text-white mb-8">
          Two voices, one system
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {authors.map((author) => (
            <Link
              key={author.id}
              href={`/about/${author.id}`}
              className="group block bg-white dark:bg-[#111114] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 card-hover"
            >
              <span
                className={`relative flex items-center justify-center rounded-full overflow-hidden w-28 h-28 mb-5 ${author.color} text-white font-bold text-3xl`}
              >
                {author.photo ? (
                  <Image src={author.photo} alt={author.name} fill className="object-cover" sizes="112px" />
                ) : (
                  author.initials
                )}
              </span>
              <h3 className="text-lg font-bold text-ink dark:text-white mb-1 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                {author.name}
              </h3>
              <p className="text-xs font-semibold text-ink-subtle dark:text-gray-500 uppercase tracking-wide mb-3">
                {author.role}
              </p>
              <p className="text-sm text-ink-muted dark:text-gray-400 leading-relaxed mb-4">
                {author.bio}
              </p>
              <span className="text-xs font-semibold text-brand-600 dark:text-brand-400">
                Read {author.name}&rsquo;s posts →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
