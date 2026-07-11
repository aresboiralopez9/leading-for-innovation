'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from './ThemeProvider'
import { useState } from 'react'
import type { SiteSettingsData } from '@/lib/content'

interface HeaderProps {
  settings: SiteSettingsData
}

const LINKEDIN_URL = 'https://www.linkedin.com/in/leadingforinnovation/'

export function Header({ settings }: HeaderProps) {
  const { theme, toggle } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  const { betaBadge, navItems } = settings

  const primaryButtonClass =
    'text-sm font-semibold px-4 py-2 rounded-full bg-lfi-blue text-white hover:bg-lfi-green transition-colors shadow-sm'

  const mobilePrimaryButtonClass =
    'text-sm font-semibold px-4 py-2 rounded-full bg-lfi-blue text-white text-center hover:bg-lfi-green transition-colors'

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-lfi-white/90 dark:bg-[#0c0c0e]/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group" aria-label="Leading for Innovation home">
          <Image
            src="/lfi-horizontal-logo.png"
            alt="Leading for Innovation"
            width={1943}
            height={647}
            priority
            className="hidden sm:block h-14 w-auto"
          />

          <Image
            src="/lfi-icon.png"
            alt="Leading for Innovation"
            width={56}
            height={56}
            priority
            className="sm:hidden h-12 w-12 rounded-md"
          />

          {betaBadge && (
            <span className="hidden lg:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-lfi-yellow text-black">
              Beta
            </span>
          )}
        </Link>

        <nav className="hidden md:flex items-center gap-5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-lfi-blue dark:hover:text-lfi-yellow transition-colors"
            >
              {item.label}
            </Link>
          ))}

          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={primaryButtonClass}
          >
            LinkedIn
          </a>

          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-lfi-mint/40 dark:hover:bg-gray-800 transition-colors"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </nav>

        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-lfi-mint/40 dark:hover:bg-gray-800 transition-colors"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-lfi-mint/40 dark:hover:bg-gray-800 transition-colors"
          >
            {menuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-lfi-white dark:bg-[#0c0c0e]">
          <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-lfi-blue dark:hover:text-lfi-yellow"
              >
                {item.label}
              </Link>
            ))}

            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className={mobilePrimaryButtonClass}
            >
              LinkedIn
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
