import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <p className="text-lg font-black tracking-tight text-ink dark:text-white mb-2">
              LEADING FOR INNOVATION
            </p>
            <p className="text-sm text-ink-muted dark:text-gray-400 max-w-xs leading-relaxed">
              Research → Reality. We filter what matters, challenge misconceptions,
              and prescribe concrete action for real-world teams.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="section-title mb-4">Navigate</p>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/blog', label: 'All Posts' },
                { href: '/about', label: 'About & Manifesto' },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-ink-muted dark:text-gray-400 hover:text-ink dark:hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <p className="section-title mb-4">Stay Sharp</p>
            <p className="text-sm text-ink-muted dark:text-gray-400 mb-4">
              Get high-signal insights directly from LinkedIn — no noise, no newsletters.
            </p>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-brand-500 text-white hover:bg-brand-600 transition-colors"
            >
              <LinkedInIcon />
              Follow on LinkedIn
            </a>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-ink-subtle dark:text-gray-500">
            © {new Date().getFullYear()} LEADING FOR INNOVATION. All rights reserved.
          </p>
          <p className="text-xs text-ink-subtle dark:text-gray-500">
            Built for practitioners, by practitioners.
          </p>
        </div>
      </div>
    </footer>
  )
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}
