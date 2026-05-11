import Link from 'next/link'
import { getAllPosts, getFeaturedPosts, getFrameworkPosts } from '@/lib/posts'
import { getHomePageData } from '@/lib/content'
import { PostCard } from '@/components/PostCard'

export default async function HomePage() {
  const featured = getFeaturedPosts().slice(0, 3)
  const frameworks = getFrameworkPosts().slice(0, 3)
  const latest = getAllPosts().slice(0, 6)
  const cms = getHomePageData()

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">

      {/* Hero */}
      <section className="pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-900/30 border border-brand-100 dark:border-brand-800">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            <span className="text-xs font-semibold text-brand-700 dark:text-brand-300 uppercase tracking-wider">
              {cms.heroBadgeText}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-ink dark:text-white leading-[1.05] mb-6">
            {cms.heroHeadline}
            <br />
            <span className="text-brand-500">{cms.heroHeadlineAccent}</span>
          </h1>

          <p className="text-lg sm:text-xl text-ink-muted dark:text-gray-400 leading-relaxed max-w-2xl mb-10">
            {cms.heroSubtext}
          </p>

          {/* Only show button if text is provided */}
          {(cms.heroPrimaryButtonText || cms.heroSecondaryButtonText) && (
            <div className="flex flex-wrap gap-4">
              {cms.heroPrimaryButtonText && (
                <Link
                  href={cms.heroPrimaryButtonHref}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink dark:bg-white text-white dark:text-ink font-bold text-sm hover:opacity-80 transition-opacity"
                >
                  {cms.heroPrimaryButtonText}
                </Link>
              )}
              {cms.heroSecondaryButtonText && (
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 dark:border-gray-700 text-ink dark:text-white font-semibold text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  {cms.heroSecondaryButtonText}
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Positioning Strip - Enlarged */}
      {cms.positioningItems.length > 0 && (
        <section className="border-y border-gray-200 dark:border-gray-800 py-12 mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {cms.positioningItems.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <p className="font-bold text-ink dark:text-white text-base mb-1">{item.label}</p>
                  <p className="text-base text-ink-muted dark:text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Featured Posts */}
      {featured.length > 0 && (
        <section className="mb-20">
          <div className="mb-8">
            <p className="section-title">{cms.featuredSectionLabel}</p>
            {cms.featuredSectionHeading && (
              <h2 className="text-2xl font-black tracking-tight text-ink dark:text-white mt-1">
                {cms.featuredSectionHeading}
              </h2>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featured.map((post, i) => (
              <PostCard key={post.slug} post={post} featured={i === 0} />
            ))}
          </div>
        </section>
      )}

      {/* Frameworks Section */}
      {frameworks.length > 0 && (
        <section className="mb-20">
          <div className="mb-8">
            <p className="section-title">{cms.frameworksSectionLabel}</p>
            {cms.frameworksSectionHeading && (
              <h2 className="text-2xl font-black tracking-tight text-ink dark:text-white mt-1">
                {cms.frameworksSectionHeading}
              </h2>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {frameworks.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Latest Posts */}
      <section className="mb-20">
        <div className="mb-8">
          <p className="section-title">{cms.latestSectionLabel}</p>
          {cms.latestSectionHeading && (
            <h2 className="text-2xl font-black tracking-tight text-ink dark:text-white mt-1">
              {cms.latestSectionHeading}
            </h2>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {latest.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

    </div>
  )
}
