import type { Metadata } from 'next'
import Link from 'next/link'
import { NewsletterCTAWrapper } from '@/components/NewsletterCTAWrapper'
import { getAboutPageData, getSiteSettings } from '@/lib/content'

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
        <div className="flex flex-wrap gap-4 mb-16">
          <Link
            href={cms.primaryButtonHref}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink dark:bg-white text-white dark:text-ink font-bold text-sm hover:opacity-80 transition-opacity"
          >
            {cms.primaryButtonText}
          </Link>
          <a
            href={settings.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 dark:border-gray-700 text-ink dark:text-white font-semibold text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            {cms.secondaryButtonText}
          </a>
        </div>

      </div>

      <NewsletterCTAWrapper />
    </div>
  )
}
