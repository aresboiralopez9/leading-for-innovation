'use client'

import Link from 'next/link'
import { useTheme } from './ThemeProvider'
import { useState } from 'react'

export function Header() {
  const { theme, toggle } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  const nav = [
    { href: '/blog', label: 'All Posts' },
    { href: '/blog?category=frameworks', label: 'Frameworks' },
    { href: '/about', label: 'About' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-canvas/80 dark:bg-[#0c0c0e]/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl font-black tracking-tight text-ink dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
            LEADING FOR INNOVATION
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-brand-500 text-white">
            Beta
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-muted dark:text-gray-400 hover:text-ink dark:hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold px-4 py-2 rounded-full bg-brand-500 text-white hover:bg-brand-600 transition-colors"
          >
            Follow on LinkedIn
          </a>
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="p-2 rounded-lg text-ink-muted dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {theme === 'dark' ? (
              <SunIcon />
            ) : (
              <MoonIcon />
            )}
          </button>
        </nav>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <button onClick={toggle} className="p-2 rounded-lg text-ink-muted dark:text-gray-400">
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg text-ink-muted dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {menuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-canvas dark:bg-[#0c0c0e]">
          <nav className="max-w-5xl mx-auto px-4 py-4 flex flex-col gap-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-ink-muted dark:text-gray-400 hover:text-ink dark:hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold px-4 py-2 rounded-full bg-brand-500 text-white text-center"
            >
              Follow on LinkedIn
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}
