'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import type { SiteSettingsData } from '@/lib/content'

interface HeaderProps {
  settings: SiteSettingsData
}

export function Header({ settings }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const { betaBadge, navItems, linkedInUrl1, linkedInUrl2 } = settings

  const primaryButtonClass =
    'rounded-full bg-lfi-blue px-4 py-2 text-sm font-semibold text-lfi-white shadow-sm transition-colors hover:bg-lfi-green'

  const mobilePrimaryButtonClass =
    'rounded-full bg-lfi-blue px-4 py-2 text-center text-sm font-semibold text-lfi-white transition-colors hover:bg-lfi-green'

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-lfi-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 md:px-10">
        <Link href="/" className="flex items-center" aria-label="Leading for Innovation home">
          <Image
            src="/lfi-horizontal-logo.png"
            alt="Leading for Innovation"
            width={285}
            height={78}
            priority
            className="h-14 w-auto md:h-16"
          />
        </Link>

        <div className="hidden items-center gap-5 md:flex">
          {betaBadge && (
            <span className="rounded-full bg-lfi-yellow/35 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-ink/70">
              Beta
            </span>
          )}

          <nav className="flex items-center gap-5">
            {navItems.map((item) => (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                className="text-sm font-semibold text-ink/70 transition-colors hover:text-lfi-blue"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href={linkedInUrl1} className={primaryButtonClass}>
              Ares
            </Link>

            <Link href={linkedInUrl2} className={primaryButtonClass}>
              Sam
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
            className="rounded-full border border-ink/10 p-2 text-ink/70 transition-colors hover:bg-lfi-mint/40"
          >
            {menuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-ink/10 bg-lfi-white px-6 py-5 shadow-lg md:hidden">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={`${item.label}-${item.href}-mobile`}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-semibold text-ink/75 transition-colors hover:text-lfi-blue"
              >
                {item.label}
              </Link>
            ))}

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link
                href={linkedInUrl1}
                onClick={() => setMenuOpen(false)}
                className={mobilePrimaryButtonClass}
              >
                Ares
              </Link>

              <Link
                href={linkedInUrl2}
                onClick={() => setMenuOpen(false)}
                className={mobilePrimaryButtonClass}
              >
                Sam
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

function MenuIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </svg>
  )
}
