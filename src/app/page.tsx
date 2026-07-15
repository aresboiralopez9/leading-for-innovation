import Link from 'next/link'
import { getAllAuthors } from '@/lib/authors'
import { getHomePageData, getSiteSettings } from '@/lib/content'
import { getAllPosts } from '@/lib/posts'

export default function HomePage() {
  const cms = getHomePageData()
  const settings = getSiteSettings()
  const posts = getAllPosts()
  const authors = getAllAuthors()

  const featuredPosts = posts.slice(0, 2)
  const latestPosts = posts.slice(2, 5)

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <section className="relative overflow-hidden border-b border-ink/10">
        <div className="absolute left-6 top-6 h-24 w-24 rounded-full bg-lfi-yellow/60 blur-2xl" />
        <div className="absolute right-10 top-14 h-32 w-32 rounded-full bg-lfi-blue/25 blur-3xl" />
        <div className="absolute bottom-0 right-1/3 h-24 w-24 rounded-full bg-lfi-green/25 blur-2xl" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 pb-12 pt-8 md:grid-cols-[1.12fr_0.88fr] md:px-10 lg:pb-16 lg:pt-10">
          <div>
            <div className="mb-4 inline-flex rounded-full border border-ink/10 bg-lfi-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-ink/70 shadow-sm">
              {cms.heroBadgeText}
            </div>

            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.02] tracking-tight text-ink md:text-5xl lg:text-6xl">
              {cms.heroHeadline}
              <span className="block text-lfi-blue">{cms.heroHeadlineAccent}</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-ink/75 md:text-lg">
              {cms.heroSubtext}
            </p>

            <div className="mt-7 flex flex-wrap gap-4">
              {cms.heroPrimaryButtonText && cms.heroPrimaryButtonHref && (
                <Link
                  href={cms.heroPrimaryButtonHref}
                  className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-lfi-white transition hover:translate-y-[-1px] hover:shadow-lg"
                >
                  {cms.heroPrimaryButtonText}
                </Link>
              )}

              {cms.heroSecondaryButtonText && cms.heroSecondaryButtonHref && (
                <Link
                  href={cms.heroSecondaryButtonHref}
                  className="rounded-full border border-ink/15 bg-lfi-white px-6 py-3 text-sm font-semibold text-ink transition hover:translate-y-[-1px] hover:border-lfi-yellow hover:shadow-lg"
                >
                  {cms.heroSecondaryButtonText}
                </Link>
              )}
            </div>
          </div>

          <div className="self-start rounded-[2rem] border border-ink/10 bg-lfi-white p-4 shadow-xl">
            <div className="rounded-[1.5rem] bg-lfi-yellow/30 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-ink/60">
                {cms.startHereLabel}
              </p>

              <h2 className="mt-3 text-xl font-semibold leading-tight text-ink md:text-2xl">
                {cms.startHereHeading}
              </h2>

              <div className="mt-5 grid gap-3">
                {cms.startHereCards.map((card) => (
                  <Link
                    key={`${card.label}-${card.href}`}
                    href={card.href}
                    className="block rounded-2xl bg-lfi-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <p className={`text-sm font-semibold ${card.colorClass || 'text-lfi-blue'}`}>
                      {card.label}
                    </p>
                    <p className="mt-1 text-sm text-ink/70">{card.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {featuredPosts.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-14 md:px-10">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-lfi-blue">
                {cms.featuredSectionLabel}
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                {cms.featuredSectionHeading}
              </h2>
            </div>

            <Link href="/blog" className="text-sm font-semibold text-lfi-blue hover:underline">
              View all posts
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {featuredPosts.map((post, index) => {
              const readingTimeLabel = `${post.readingTime} min read`

              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className={`group flex min-h-[360px] flex-col rounded-[1.75rem] border p-7 shadow-sm transition hover:translate-y-[-3px] hover:shadow-xl ${
                    index === 0
                      ? 'border-lfi-yellow bg-lfi-yellow/25'
                      : 'border-ink/10 bg-lfi-white'
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink/55">
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>{readingTimeLabel}</span>
                  </div>

                  <h3 className="mt-6 text-3xl font-semibold tracking-tight">
                    {post.title}
                  </h3>

                  <p className="mt-5 text-base leading-8 text-ink/70">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto pt-8 text-sm font-semibold text-lfi-blue group-hover:underline">
                    Read article
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      <section className="border-y border-ink/10 bg-lfi-white">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-10">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-lfi-green">
              {cms.postTypesSectionLabel}
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              {cms.postTypesSectionHeading}
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cms.postTypeCards.map((type) => (
              <Link
                key={`${type.label}-${type.href}`}
                href={type.href}
                className={`rounded-[1.5rem] border p-5 transition hover:translate-y-[-2px] hover:shadow-lg ${type.className || 'border-ink/10 bg-lfi-white'}`}
              >
                <h3 className="text-xl font-semibold">{type.label}</h3>
                <p className="mt-3 text-sm leading-6 text-ink/70">
                  {type.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-14 md:px-10 lg:grid-cols-[0.52fr_1.48fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-lfi-blue">
            {cms.foundersSectionLabel}
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            {cms.foundersSectionHeading}
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-ink/70">
            {cms.foundersSectionText}
          </p>

          {cms.foundersButtonText && cms.foundersButtonHref && (
            <Link
              href={cms.foundersButtonHref}
              className="mt-7 inline-flex rounded-full border border-ink/15 bg-lfi-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-lfi-yellow hover:shadow-md"
            >
              {cms.foundersButtonText}
            </Link>
          )}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {authors.map((author) => (
            <Link
              key={author.id}
              href={`/about/${author.id}`}
              className="group rounded-[1.75rem] border border-ink/10 bg-lfi-white p-7 shadow-sm transition hover:translate-y-[-3px] hover:shadow-xl"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-full ${author.color} text-lg font-bold text-lfi-white`}
              >
                {author.initials}
              </div>

              <h3 className="mt-5 text-2xl font-semibold">{author.name}</h3>

              <p className="mt-1 text-sm font-semibold text-ink/55">
                {author.role}
              </p>

              <p className="mt-4 text-sm leading-7 text-ink/70">
                {author.bio}
              </p>

              <div className="mt-5 text-sm font-semibold text-lfi-blue group-hover:underline">
                View profile
              </div>
            </Link>
          ))}
        </div>
      </section>

      {latestPosts.length > 0 && (
        <section className="bg-lfi-green text-lfi-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:px-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-lfi-yellow">
                {cms.latestSectionLabel}
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                {cms.latestSectionHeading}
              </h2>

              <p className="mt-5 text-base leading-7 text-lfi-white/80">
                {cms.latestSectionText}
              </p>
            </div>

            <div className="grid gap-4">
              {latestPosts.map((post) => {
                const readingTimeLabel = `${post.readingTime} min read`

                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="rounded-[1.25rem] border border-lfi-white/15 bg-lfi-white/10 p-5 transition hover:bg-lfi-white/15"
                  >
                    <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-lfi-yellow">
                      <span>{post.category}</span>
                      <span>•</span>
                      <span>{readingTimeLabel}</span>
                    </div>

                    <h3 className="mt-3 text-xl font-semibold">{post.title}</h3>

                    <p className="mt-2 text-sm leading-6 text-lfi-white/75">
                      {post.excerpt}
                    </p>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 pb-8 pt-10 md:px-10">
        <div className="rounded-[2rem] border border-lfi-yellow bg-lfi-yellow/25 p-8 md:p-10">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-ink/60">
                {cms.followSectionLabel}
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                {cms.followSectionHeading}
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-7 text-ink/70">
                {cms.followSectionText}
              </p>
            </div>

            <Link
              href={settings.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-lfi-white transition hover:translate-y-[-1px] hover:shadow-lg"
            >
              {cms.followButtonText}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
