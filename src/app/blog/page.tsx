import Link from 'next/link'
import PostCard from '@/components/PostCard'
import { getAllPosts } from '@/lib/posts'

interface Props {
  searchParams: {
    category?: string
    tag?: string
  }
}

const categories = [
  'Research to Practice',
  'Debate',
  'Hot Takes',
  'Expert Lens',
  'Myth Buster',
  'Innovation Spotlight',
]

const topics = ['Foundations', 'Process', 'Conditions', 'AI']

export const metadata = {
  title: 'Blog',
  description:
    'All posts from Leading for Innovation, including research to practice pieces, debates, hot takes, expert lenses, myth busters, and innovation spotlights.',
}

export default function BlogPage({ searchParams }: Props) {
  const allPosts = getAllPosts()

  const activeCategory = searchParams.category || ''
  const activeTag = searchParams.tag || ''

  const filtered = allPosts.filter((post) => {
    if (
      activeCategory &&
      post.category.toLowerCase() !== activeCategory.toLowerCase()
    ) {
      return false
    }

    if (
      activeTag &&
      !post.tags.map((tag) => tag.toLowerCase()).includes(activeTag.toLowerCase())
    ) {
      return false
    }

    return true
  })

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <section className="border-b border-ink/10 bg-lfi-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-lfi-blue">
            The blog
          </p>

          <h1 className="mt-3 text-5xl font-semibold tracking-tight md:text-7xl">
            All posts
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-ink/70">
            Browse research to practice pieces, debates, hot takes, expert
            lenses, myth busters, and innovation spotlights on creativity,
            innovation, leadership, and teams.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:px-10 lg:grid-cols-[280px_1fr]">
        <aside className="self-start rounded-[1.5rem] border border-ink/10 bg-lfi-white p-5 shadow-sm">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink/55">
              Categories
            </p>

            <div className="mt-4 flex flex-wrap gap-2 lg:flex-col">
              <Link
                href="/blog"
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  !activeCategory && !activeTag
                    ? 'border border-lfi-yellow bg-lfi-yellow/45 text-ink shadow-sm'
                    : 'bg-canvas text-ink hover:bg-lfi-yellow/25'
                }`}
              >
                All posts ({allPosts.length})
              </Link>

              {categories.map((category) => {
                const count = allPosts.filter(
                  (post) =>
                    post.category.toLowerCase() === category.toLowerCase()
                ).length

                return (
                  <Link
                    key={category}
                    href={`/blog?category=${encodeURIComponent(category)}`}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      activeCategory.toLowerCase() === category.toLowerCase()
                        ? 'border border-lfi-yellow bg-lfi-yellow/45 text-ink shadow-sm'
                        : 'bg-canvas text-ink hover:bg-lfi-yellow/25'
                    }`}
                  >
                    {category} ({count})
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="mt-8 border-t border-ink/10 pt-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink/55">
              Topics
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {topics.map((topic) => (
                <Link
                  key={topic}
                  href={`/blog?tag=${encodeURIComponent(topic)}`}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    activeTag.toLowerCase() === topic.toLowerCase()
                      ? 'bg-lfi-yellow/45 text-ink ring-1 ring-lfi-yellow'
                      : 'bg-lfi-mint/30 text-ink hover:bg-lfi-yellow/25'
                  }`}
                >
                  {topic}
                </Link>
              ))}
            </div>
          </div>
        </aside>

        <div>
          <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold text-ink/60">
                {filtered.length} post{filtered.length !== 1 ? 's' : ''}
                {activeCategory ? ` in ${activeCategory}` : ''}
                {activeTag ? ` tagged ${activeTag}` : ''}
              </p>

              {(activeCategory || activeTag) && (
                <Link
                  href="/blog"
                  className="mt-2 inline-flex text-sm font-semibold text-lfi-blue hover:underline"
                >
                  Clear filters
                </Link>
              )}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-[1.5rem] border border-ink/10 bg-lfi-white p-8">
              <h2 className="text-2xl font-semibold">No posts found</h2>
              <p className="mt-3 text-ink/70">
                Try a different category or topic, or check back soon.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {filtered.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
