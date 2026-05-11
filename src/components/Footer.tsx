import Link from 'next/link'
import type { FooterData, SiteSettingsData } from '@/lib/content'

interface FooterProps {
  footer: FooterData
  settings: SiteSettingsData
}

export function Footer({ footer, settings }: FooterProps) {
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'All Posts' },
    { href: '/about', label: 'About' },
  ]

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Brand */}
          <div>
            <p className="text-lg font-black tracking-tight text-ink dark:text-white mb-2">
              {settings.siteName}
            </p>
            <p className="text-sm text-ink-muted dark:text-gray-400 max-w-xs leading-relaxed">
              {footer.brandTagline}
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="section-title mb-4">Navigate</p>
            <ul className="space-y-2">
              {navItems.map((l) => (
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
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
          <p className="text-xs text-ink-subtle dark:text-gray-500 text-center">
            © {new Date().getFullYear()} {footer.copyrightSuffix}
          </p>
        </div>
      </div>
    </footer>
  )
}
