import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAboutPageData } from '@/lib/content'
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
  const authors = getAllAuthors()

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <section className="relative mb-12 overflow-hidden rounded-[2rem] border border-lfi-yellow/70 bg-lfi-yellow/20 p-8 shadow-sm sm:p-10">
            <div className="absolute right-8 top-8 h-28 w-28 rounded-full bg-lfi-yellow/50 blur-3xl" />

            <div className="relative">
              <p className="section-title mb-3">{cms.sectionLabel}</p>

              <h1 className="mb-6 text-4xl font-black leading-[1.05] tracking-tight text-ink sm:text-5xl">
                {cms.headline}
                <br />
                <span className="text-lfi-green">{cms.headlineAccent}</span>
              </h1>

              <p className="text-xl leading-relaxed text-ink/75">
                {cms.intro}
              </p>

              <div className="mt-8 rounded-2xl border border-lfi-yellow bg-lfi-white/80 p-5">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-ink/55">
                  {cms.pointOfViewLabel}
                </p>
                <p className="mt-3 text-lg font-semibold leading-7 text-ink">
                  {cms.pointOfViewText}
                </p>
              </div>
            </div>
          </section>

          <div
            className="prose prose-lg mb-14 max-w-none
            prose-headings:font-black prose-headings:tracking-tight
            prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-2xl
            prose-p:leading-relaxed prose-p:text-ink/70
            prose-li:text-ink/70
            prose-blockquote:border-l-4 prose-blockquote:border-lfi-yellow prose-blockquote:bg-lfi-yellow/20 prose-blockquote:px-5 prose-blockquote:py-4 prose-blockquote:not-italic prose-blockquote:font-semibold
            prose-strong:text-ink"
            dangerouslySetInnerHTML={{ __html: cms.bodyHtml }}
          />

          {(cms.primaryButtonText || cms.secondaryButtonText) && (
            <div className="mb-14 flex flex-wrap gap-4">
              {cms.primaryButtonText && (
                <Link
                  href={cms.primaryButtonHref}
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-lfi-white transition-opacity hover:opacity-80"
                >
                  {cms.primaryButtonText}
                </Link>
              )}

              {cms.secondaryButtonText && (
                <a
                  href="https://www.linkedin.com/company/leading-for-innovation/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-lfi-yellow bg-lfi-yellow/30 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-lfi-yellow/45"
                >
                  {cms.secondaryButtonText}
                </a>
              )}
            </div>
          )}
        </div>

        <section className="mx-auto max-w-5xl border-t border-ink/10 pt-12">
          <p className="section-title mb-3">{cms.peopleSectionLabel}</p>

          <h2 className="mb-8 text-2xl font-black tracking-tight text-ink sm:text-3xl">
            {cms.peopleSectionHeading}
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {authors.map((author) => (
              <Link
                key={author.id}
                href={`/about/${author.id}`}
                className="group block rounded-2xl border border-ink/10 bg-lfi-white p-6 shadow-sm transition hover:translate-y-[-2px] hover:shadow-lg"
              >
                <span
                  className={`relative mb-5 flex h-40 w-40 items-center justify-center overflow-hidden rounded-2xl ${author.color} text-3xl font-bold text-lfi-white`}
                >
                  {author.photo ? (
                    <Image
                      src={author.photo}
                      alt={author.name}
                      fill
                      className="object-cover object-top"
                      sizes="160px"
                    />
                  ) : (
                    author.initials
                  )}
                </span>

                <h3 className="mb-1 text-lg font-bold text-ink transition-colors group-hover:text-lfi-blue">
                  {author.name}
                </h3>

                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink/55">
                  {author.role}
                </p>

                <p className="mb-4 text-sm leading-relaxed text-ink/70">
                  {author.bio}
                </p>

                <span className="text-xs font-semibold text-lfi-blue">
                  Read {author.name}&rsquo;s posts →
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
