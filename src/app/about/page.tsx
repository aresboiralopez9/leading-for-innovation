import type { Metadata } from 'next'
import Link from 'next/link'
import { NewsletterCTA } from '@/components/NewsletterCTA'

export const metadata: Metadata = {
  title: 'About & Manifesto',
  description: 'Who we are, what we believe, and why the gap between research and reality needs to close.',
}

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <p className="section-title mb-3">Who We Are</p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-ink dark:text-white leading-[1.1] mb-6">
            Translators.<br />
            <span className="text-brand-500">Not Curators.</span>
          </h1>
          <p className="text-xl text-ink-muted dark:text-gray-400 leading-relaxed">
            We sit at the intersection of creativity and innovation — and we're done watching
            great research die in journals while organizations keep making the same avoidable mistakes.
          </p>
        </div>

        {/* Manifesto */}
        <div className="prose prose-lg dark:prose-dark max-w-none mb-14
          prose-headings:font-black prose-headings:tracking-tight
          prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
          prose-p:leading-relaxed prose-p:text-ink-muted dark:prose-p:text-gray-300
          prose-li:text-ink-muted dark:prose-li:text-gray-300
          prose-blockquote:border-l-4 prose-blockquote:border-brand-500 prose-blockquote:pl-5 prose-blockquote:not-italic prose-blockquote:font-semibold
          prose-strong:text-ink dark:prose-strong:text-white">

          <h2>The Problem We're Solving</h2>
          <p>
            There's a massive gap between what researchers understand about human behavior,
            organizations, creativity, and innovation — and what practitioners actually do.
            That gap costs companies billions in lost productivity, bad decisions, and wasted talent.
          </p>
          <p>
            The problem isn't that the research doesn't exist. <strong>The problem is that nobody
            translates it into something a manager can use on Monday morning.</strong>
          </p>

          <blockquote>
            "Most people don't fail because they lack information. They fail because
            they can't bridge from information to action."
          </blockquote>

          <h2>What We Do Differently</h2>
          <p>
            We don't summarize research. Summaries are still just information.
            We <strong>translate</strong> it — meaning we take the finding, identify what it
            actually implies for your organization, challenge the common misreading of it,
            and give you a concrete prescription.
          </p>
          <p>
            Our output has three properties every time:
          </p>
          <ul>
            <li><strong>Opinionated.</strong> We take a position. We don't give you "it depends" without telling you what it depends on.</li>
            <li><strong>Immediately usable.</strong> If you can't do something with it in the next 30 days, it's not done.</li>
            <li><strong>Grounded.</strong> Every claim connects to something real — research, case evidence, or direct practitioner experience.</li>
          </ul>

          <h2>Our Positioning</h2>
          <p>
            We build at the intersection of creativity and innovation. That means we care
            about how organizations generate new ideas, how teams sustain creative output
            under pressure, how leadership either enables or destroys innovation, and how
            systems and structures shape the quality of thinking at every level.
          </p>
          <p>
            We are <strong>not</strong> thought leaders in the performative sense.
            We are practitioners who happen to read a lot and have high standards for
            what passes as advice.
          </p>

          <h2>How This Works</h2>
          <p>
            <strong>LinkedIn</strong> is where we test ideas and distribute sharp,
            high-signal insights in short form. Follow us there for daily thinking.
          </p>
          <p>
            <strong>This blog</strong> is the deep-dive home base. When a LinkedIn post
            hits and demands more, we build it out here — into full frameworks,
            operating systems, and extended analysis. Our best thinking lives here,
            structured and consolidated.
          </p>
          <p>
            Over time, the work compounds into recognizable, <strong>named frameworks</strong> —
            repeatable approaches that bridge the gap between theory and the messy
            reality of organizations. That credibility is the foundation for the consulting
            demand we're building toward.
          </p>

          <h2>Who We Write For</h2>
          <p>
            We write for people with real organizational responsibility who are done
            with platitudes. Specifically:
          </p>
          <ul>
            <li><strong>Employees</strong> trying to do better creative work inside systems that weren't designed for it</li>
            <li><strong>Managers</strong> trying to unlock their team's potential without MBA jargon</li>
            <li><strong>Organizations</strong> trying to build genuine innovation capability — not just the aesthetics of it</li>
          </ul>
          <p>
            If you're looking for validation of what you already believe, we're probably
            not for you. If you're looking for a challenge to think more clearly and act
            more effectively, you're in the right place.
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-4 mb-16">
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

      <NewsletterCTA />
    </div>
  )
}
