import { getAllPosts, getAllCategories, getAllTags } from '@/lib/posts'
import { PostCard } from '@/components/PostCard'

interface Props {
  searchParams: { category?: string; tag?: string }
}

export const metadata = {
  title: 'Blog',
  description: 'All posts — research translated into frameworks and systems for real-world teams.',
}

export default function BlogPage({ searchParams }: Props) {
  const allPosts = getAllPosts()
  const categories = getAllCategories()
  const tags = getAllTags()

  const activeCategory = searchParams.category || ''
  const activeTag = searchParams.tag || ''

  const filtered = allPosts.filter((post) => {
    if (activeCategory && post.category.toLowerCase() !== activeCategory.toLowerCase()) return false
    if (activeTag && !post.tags.map((t) => t.toLowerCase()).includes(activeTag.toLowerCase())) return false
    return true
  })

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="section-title mb-2">The Archive</p>
        <h1 className="text-4xl font-black tracking-tight text-ink dark:text-white mb-4">
          All Posts
        </h1>
        <p className="text-ink-muted dark:text-gray-400 max-w-xl">
          Every piece of research translated, every framework built, every misconception challenged —
          all in one place.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar */}
        <aside className="lg:w-56 shrink-0">
          {/* Categories */}
          <div className="mb-8">
            <p className="section-title mb-3">Categories</p>
            <ul className="space-y-1">
              <li>
                <a
                  href="/blog"
                  className={`block text-sm px-3 py-1.5 rounded-lg transition-colors ${
                    !activeCategory
                      ? 'bg-ink dark:bg-white text-white dark:text-ink font-semibold'
                      : 'text-ink-muted dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  All ({allPosts.length})
                </a>
              </li>
              {categories.map((cat) => {
                const count = allPosts.filter((p) => p.category.toLowerCase() === cat.toLowerCase()).length
                return (
                  <li key={cat}>
                    <a
                      href={`/blog?category=${cat}`}
                      className={`block text-sm px-3 py-1.5 rounded-lg transition-colors ${
                        activeCategory.toLowerCase() === cat.toLowerCase()
                          ? 'bg-ink dark:bg-white text-white dark:text-ink font-semibold'
                          : 'text-ink-muted dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {cat} ({count})
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div>
              <p className="section-title mb-3">Topics</p>
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <a
                    key={tag}
                    href={`/blog?tag=${tag}`}
                    className={`tag-pill ${activeTag.toLowerCase() === tag.toLowerCase() ? 'bg-brand-500 !text-white border-brand-500' : ''}`}
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Posts grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-ink-muted dark:text-gray-500">
              <p className="text-4xl mb-4">🔍</p>
              <p className="text-lg font-semibold">No posts found</p>
              <p className="text-sm mt-1">Try a different filter or check back soon.</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-ink-subtle dark:text-gray-500 mb-5">
                {filtered.length} post{filtered.length !== 1 ? 's' : ''}
                {activeCategory ? ` in "${activeCategory}"` : ''}
                {activeTag ? ` tagged "${activeTag}"` : ''}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filtered.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
