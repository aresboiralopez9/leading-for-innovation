import Link from 'next/link'
import { getAllAuthors } from '@/lib/authors'
import { getAllPosts } from '@/lib/posts'

const themes = [
  {
    label: 'Creativity',
    href: '/blog',
    description: 'Better ways to generate, protect, and evaluate original ideas.',
    className: 'border-lfi-yellow bg-lfi-yellow/25',
  },
  {
    label: 'Innovation',
    href: '/blog',
    description: 'How teams turn insight into durable organizational capability.',
    className: 'border-lfi-blue bg-lfi-blue/10',
  },
  {
    label: 'Leadership',
    href: '/blog',
    description: 'What leaders actually need to do to make creativity possible.',
    className: 'border-lfi-green bg-lfi-green/10',
  },
  {
    label: 'Frameworks',
    href: '/blog',
    description: 'Reusable systems for translating research into action.',
    className: 'border-lfi-mint bg-lfi-mint/20',
  },
]

export default function HomePage() {
  const posts = getAllPosts()
  const authors = getAllAuthors()

  const featuredPosts = posts.slice(0, 3)
  const latestPosts = posts.slice(3, 7)

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <section className="relative overflow-hidden border-b border-ink/10">
        <div className="absolute left-6 top-8 h-24 w-24 rounded-full bg-lfi-yellow/60 blur-2xl" />
        <div className="absolute right-10 top-20 h-32 w-32 rounded-full bg-lfi-blue/25 blur-3xl" />
        <div className="absolute bottom-0 right-1/3 h-24 w-24 rounded-full bg-lfi-green/25 blur-2xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-[1.15fr_0.85fr] md:px-10 lg:py-28">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-ink/10 bg-lfi-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-ink/70 shadow-sm">
              Research to Reality
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-ink md:text-7xl">
              The gap between what feels right and what actually works is where most teams get stuck.
              <span className="block text-lfi-blue">We close it.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-ink/75 md:text-xl">
              Good innovation practice rarely feels natural. We take the research seriously, challenge what intuition gets backwards, and turn the findings into methods you can actually use.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/blog"
                className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-lfi-white transition hover:translate-y-[-1px] hover:shadow-lg"
              >
                Read the blog
              </Link>

              <Link
                href="/about"
                className="rounded-full border border-ink/15 bg-lfi-white px-6 py-3 text-sm font-semibold text-ink transition hover:translate-y-[-1px] hover:border-lfi-yellow hover:shadow-lg"
              >
                Meet the founders
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-ink/10 bg-lfi-white p-6 shadow-xl">
            <div className="rounded-[1.5rem] bg-lfi-yellow/30 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-ink/60">
                Start here
              </p>

              <h2 className="mt-4 text-2xl font-semibold text-ink">
                Sharp insights. Concrete frameworks. Zero fluff.
              </h2>

              <div className="mt-6 grid gap-3">
                <div className="rounded-2xl bg-lfi-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-lfi-blue">Translate</p>
                  <p className="mt-1 text-sm text-ink/70">
                    Academic research into practitioner language.
                  </p>
                </div>

                <div className="rounded-2xl bg-lfi-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-lfi-green">Prescribe</p>
                  <p className="mt-1 text-sm text-ink/70">
                    Not just what the data says, but what to do.
                  </p>
                </div>

                <div className="rounded-2xl bg-lfi-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-lfi-blue">Build</p>
                  <p className="mt-1 text-sm text-ink/70">
                    Frameworks, systems, and methods teams can reuse.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {featuredPosts.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-lfi-blue">
                Featured thinking
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                The pieces to read first
              </h2>
            </div>

            <Link href="/blog" className="text-sm font-semibold text-lfi-blue hover:underline">
              View all posts
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {featuredPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`group rounded-[1.75rem] border p-6 shadow-sm transition hover:translate-y-[-3px] hover:shadow-xl ${
                  index === 0
                    ? 'border-lfi-yellow bg-lfi-yellow/25 lg:col-span-2'
                    : 'border-ink/10 bg-lfi-white'
                }`}
              >
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink/55">
                  {post.category && <span>{post.category}</span>}
                  {post.readingTime && <span>•</span>}
                  {post.readingTime && <span>{post.readingTime}</span>}
                </div>

                <h3
                  className={
                    index === 0
                      ? 'mt-5 text-3xl font-semibold tracking-tight'
                      : 'mt-5 text-2xl font-semibold tracking-tight'
                  }
                >
                  {post.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-ink/70">
                  {post.description}
                </p>

                <div className="mt-6 text-sm font-semibold text-lfi-blue group-hover:underline">
                  Read article
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="border-y border-ink/10 bg-lfi-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-lfi-green">
              Browse by need
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              What are you trying to improve?
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {themes.map((theme) => (
              <Link
                key={theme.label}
                href={theme.href}
                className={`rounded-[1.5rem] border p-5 transition hover:translate-y-[-2px] hover:shadow-lg ${theme.className}`}
              >
                <h3 className="text-xl font-semibold">{theme.label}</h3>
                <p className="mt-3 text-sm leading-6 text-ink/70">
                  {theme.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:px-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-lfi-blue">
            The founders
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Meet the people translating the research
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-ink/70">
            Leading for Innovation is built by two creativity and innovation researchers who care about making academic evidence usable for real teams, managers, and organizations.
          </p>

          <Link
            href="/about"
            className="mt-7 inline-flex rounded-full border border-ink/15 bg-lfi-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-lfi-yellow hover:shadow-md"
          >
            Read about the blog
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {authors.map((author) => (
            <Link
              key={author.id}
              href={`/about/${author.id}`}
              className="group rounded-[1.75rem] border border-ink/10 bg-lfi-white p-6 shadow-sm transition hover:translate-y-[-3px] hover:shadow-xl"
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

              <p className="mt-4 line-clamp-5 text-sm leading-6 text-ink/70">
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
        <section className="bg-ink text-lfi-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:px-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-lfi-yellow">
                Latest
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Recent articles
              </h2>

              <p className="mt-5 text-base leading-7 text-lfi-white/70">
                New frameworks, research translations, and practical challenges to common innovation advice.
              </p>
            </div>

            <div className="grid gap-4">
              {latestPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="rounded-[1.25rem] border border-lfi-white/10 bg-lfi-white/5 p-5 transition hover:bg-lfi-white/10"
                >
                  <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-lfi-yellow">
                    {post.category && <span>{post.category}</span>}
                    {post.readingTime && <span>•</span>}
                    {post.readingTime && <span>{post.readingTime}</span>}
                  </div>

                  <h3 className="mt-3 text-xl font-semibold">{post.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-lfi-white/65">
                    {post.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="rounded-[2rem] border border-lfi-yellow bg-lfi-yellow/25 p-8 md:p-10">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-ink/60">
                Follow the work
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                LinkedIn for sharp takes. The blog for the full system.
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-7 text-ink/70">
                We test ideas in short form, then expand the strongest ones here into frameworks, methods, and practical guidance.
              </p>
            </div>

            <Link
              href="/about"
              className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-lfi-white transition hover:translate-y-[-1px] hover:shadow-lg"
            >
              Meet Ares and Sam
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
