import Link from 'next/link'
import { getAllAuthors } from '@/lib/authors'
import { getAllPosts } from '@/lib/posts'

const postTypes = [
  {
    label: 'Research to Practice',
    href: '/blog?category=Research%20to%20Practice',
    description: 'What the research says and what teams can actually do with it.',
    className: 'border-lfi-yellow bg-lfi-yellow/25',
  },
  {
    label: 'Debate',
    href: '/blog?category=Debate',
    description: 'Two sided takes on the ideas people often oversimplify.',
    className: 'border-lfi-blue bg-lfi-blue/10',
  },
  {
    label: 'Hot Takes',
    href: '/blog?category=Hot%20Takes',
    description: 'Sharp arguments that challenge familiar innovation advice.',
    className: 'border-lfi-green bg-lfi-green/10',
  },
  {
    label: 'Expert Lens',
    href: '/blog?category=Expert%20Lens',
    description: 'Deeper reads on creativity, innovation, leadership, and evidence.',
    className: 'border-lfi-mint bg-lfi-mint/20',
  },
  {
    label: 'Myth Buster',
    href: '/blog?category=Myth%20Buster',
    description: 'Common beliefs about creativity and innovation put to the test.',
    className: 'border-lfi-yellow bg-lfi-yellow/20',
  },
  {
    label: 'Innovation Spotlight',
    href: '/blog?category=Innovation%20Spotlight',
    description: 'Concrete examples of innovation in action and what they teach us.',
    className: 'border-lfi-blue bg-lfi-blue/10',
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
        <div className="absolute left-6 top-6 h-24 w-24 rounded-full bg-lfi-yellow/60 blur-2xl" />
        <div className="absolute right-10 top-14 h-32 w-32 rounded-full bg-lfi-blue/25 blur-3xl" />
        <div className="absolute bottom-0 right-1/3 h-24 w-24 rounded-full bg-lfi-green/25 blur-2xl" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 pb-12 pt-8 md:grid-cols-[1.12fr_0.88fr] md:px-10 lg:pb-16 lg:pt-10">
          <div>
            <div className="mb-4 inline-flex rounded-full border border-ink/10 bg-lfi-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-ink/70 shadow-sm">
              Research to Reality
            </div>

            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.02] tracking-tight text-ink md:text-5xl lg:text-6xl">
              The gap between what feels right and what actually works is where most teams get stuck.
              <span className="block text-lfi-blue">We close it.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-ink/75 md:text-lg">
              Good innovation practice rarely feels natural. We take the research seriously, challenge what intuition gets backwards, and turn the findings into clear ideas teams can actually use.
            </p>

            <div className="mt-7 flex flex-wrap gap-4">
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

          <div className="self-start rounded-[2rem] border border-ink/10 bg-lfi-white p-4 shadow-xl">
            <div className="rounded-[1.5rem] bg-lfi-yellow/30 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-ink/60">
                Start here
              </p>

              <h2 className="mt-3 text-xl font-semibold leading-tight text-ink md:text-2xl">
                Smart takes on creativity, innovation, and how teams actually work.
              </h2>

              <div className="mt-5 grid gap-3">
                <div className="rounded-2xl bg-lfi-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-lfi-blue">Research to Practice</p>
                  <p className="mt-1 text-sm text-ink/70">
                    Turn evidence into usable ideas.
                  </p>
                </div>

                <div className="rounded-2xl bg-lfi-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-lfi-green">Myth Busters</p>
                  <p className="mt-1 text-sm text-ink/70">
                    Challenge what sounds right but often fails.
                  </p>
                </div>

                <div className="rounded-2xl bg-lfi-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-lfi-blue">Debates and Hot Takes</p>
                  <p className="mt-1 text-sm text-ink/70">
                    Make familiar innovation questions sharper.
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
                Featured posts
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Start with these
              </h2>
            </div>

            <Link href="/blog" className="text-sm font-semibold text-lfi-blue hover:underline">
              View all posts
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {featuredPosts.map((post, index) => {
              const readingTimeLabel = `${post.readingTime} min read`

              return (
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
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>{readingTimeLabel}</span>
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
                    {post.excerpt}
                  </p>

                  <div className="mt-6 text-sm font-semibold text-lfi-blue group-hover:underline">
                    Read article
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      <section className="border-y border-ink/10 bg-lfi-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-lfi-green">
              Browse by type
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Choose the kind of post you want to read
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {postTypes.map((type) => (
              <Link
                key={type.label}
                href={type.href}
                className={`rounded-[1.5rem] border p-5 transition hover:translate-y-[-2px] hover:shadow-lg ${type.className}`}
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

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:px-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-lfi-blue">
            The founders
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Meet the people behind the blog
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-ink/70">
            Leading for Innovation is built by two creativity and innovation researchers who care about making academic evidence useful for real teams, managers, and organizations.
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

              <p className="mt-4 text-sm leading-6 text-ink/70">
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
                Recent posts
              </h2>

              <p className="mt-5 text-base leading-7 text-lfi-white/70">
                New research to practice pieces, debates, hot takes, expert lenses, myth busters, and innovation spotlights.
              </p>
            </div>

            <div className="grid gap-4">
              {latestPosts.map((post) => {
                const readingTimeLabel = `${post.readingTime} min read`

                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="rounded-[1.25rem] border border-lfi-white/10 bg-lfi-white/5 p-5 transition hover:bg-lfi-white/10"
                  >
                    <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-lfi-yellow">
                      <span>{post.category}</span>
                      <span>•</span>
                      <span>{readingTimeLabel}</span>
                    </div>

                    <h3 className="mt-3 text-xl font-semibold">{post.title}</h3>

                    <p className="mt-2 text-sm leading-6 text-lfi-white/65">
                      {post.excerpt}
                    </p>
                  </Link>
                )
              })}
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
                Short takes on LinkedIn. Deeper posts on the blog.
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-7 text-ink/70">
                We share timely ideas in short form, then develop the strongest ones here into fuller posts.
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
