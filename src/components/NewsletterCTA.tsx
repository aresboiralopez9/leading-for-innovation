'use client'

import { useState } from 'react'

export function NewsletterCTA() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: wire up to email provider (ConvertKit, Beehiiv, etc.)
    setSubmitted(true)
  }

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 dark:from-brand-700 dark:to-brand-900 px-6 py-12 sm:px-12 sm:py-16 my-16">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10" aria-hidden>
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative max-w-2xl">
        <span className="inline-block mb-4 text-xs font-bold uppercase tracking-[0.15em] text-brand-200">
          Stay sharp
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
          Get the translation, not the textbook.
        </h2>
        <p className="text-brand-100 text-base sm:text-lg mb-8 leading-relaxed">
          Join practitioners getting concrete frameworks, research breakdowns, and
          actionable systems — delivered without the academic fluff.
        </p>

        {submitted ? (
          <div className="flex items-center gap-3 bg-white/10 rounded-2xl p-4 w-fit">
            <CheckCircleIcon />
            <p className="text-white font-semibold">You&apos;re in! Check your inbox.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-brand-200 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-white text-brand-700 font-bold text-sm hover:bg-brand-50 transition-colors whitespace-nowrap"
            >
              Subscribe →
            </button>
          </form>
        )}

        <p className="mt-4 text-xs text-brand-200">
          Also follow on{' '}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white transition-colors"
          >
            LinkedIn
          </a>{' '}
          for daily sharp takes.
        </p>
      </div>
    </section>
  )
}

function CheckCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}
