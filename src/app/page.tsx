import Link from 'next/link'
import { getAllPosts, getFeaturedPosts, getFrameworkPosts } from '@/lib/posts'
import { PostCard } from '@/components/PostCard'
import { NewsletterCTA } from '@/components/NewsletterCTA'

export default function HomePage() {
  const featured = getFeaturedPosts().slice(0, 3)
  const frameworks = getFrameworkPosts().slice(0, 3)
  const latest = getAllPosts().slice(0, 6)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">

      {/* ── Hero ── */}
      <section className="pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-900/30 border border-brand-100 dark:border-brand-800">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            <span className="text-xs font-semibold text-brand-700 dark:text-brand-300 uppercase tracking-wider">
              Research → Reality
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-ink dark:text-white leading-[1.05] mb-6">
            We translate research
            <br />
            <span className="text-brand-500">into systems that work.</span>
          </h1>

          <p className="text-lg sm:text-xl text-ink-muted dark:text-gray-400 leading-relaxed max-w-2xl mb-10">
            Dense academic research. Clear, opinionated, immediately usable frameworks.
            No summaries. No curation. We filter what actually matters, challenge
            common misconceptions, and prescribe concrete actions for employees,
            managers, and organizations.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink dark:bg-white text-white dark:text-ink font-bold text-sm hover:opacity-80 transition-opacity"
            >
              Read the Blog →
            </Link>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 dark:border-gray-700 text-ink dark:text-white font-semibold text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Follow on LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* ── Our Positioning Strip ── */}
      <section className="border-y border-gray-200 dark:border-gray-800 py-8 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: '🔬', label: 'Translate', desc: 'Academic research → practitioner language' },
            { icon: '⚡', label: 'Prescribe', desc: 'Not "here\'s what the data says" — here\'s what to do' },
            { icon: '🏗️', label: 'Build', desc: 'Frameworks, systems, and methods you can actually use' },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="font-bold text-ink dark:text-white text-sm">{item.label}</p>
                <p className="text-sm text-ink-muted dark:text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Posts ── */}
      {featured.length > 0 && (
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="section-title mb-1">Editor's Pick</p>
              <h2 className="text-2xl font-black tracking-tight text-ink dark:text-white">
                Essential Reading
              </h2>
            </div>
            <Link href="/blog" className="text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline">
              All posts →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featured.map((post, i) => (
              <PostCard key={post.slug} post={post} featured={i === 0} />
            ))}
          </div>
        </section>
      )}

      {/* ── Frameworks Section ── */}
      {frameworks.length > 0 && (
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="section-title mb-1">Named Frameworks</p>
              <h2 className="text-2xl font-black tracking-tight text-ink dark:text-white">
                Our Signature Systems
              </h2>
            </div>
            <Link href="/blog?category=frameworks" className="text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline">
              All frameworks →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {frameworks.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* ── Newsletter CTA ── */}
      <NewsletterCTA />

      {/* ── Latest Posts ── */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="section-title mb-1">Fresh Off the Press</p>
            <h2 className="text-2xl font-black tracking-tight text-ink dark:text-white">
              Latest Thinking
            </h2>
          </div>
          <Link href="/blog" className="text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline">
            View all →
          </Link>
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
