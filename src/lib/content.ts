/**
 * content.ts
 *
 * Server-side helpers that read the TinaCMS-managed content files
 * (content/pages/*.md and content/globals/*.md) directly from the
 * file-system.  This works both locally and on Vercel at build time.
 *
 * TinaCMS writes to these same files when you save in the editor,
 * so every save triggers a Vercel redeploy with the latest content.
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const root = process.cwd()

function readMd(relativePath: string): { data: Record<string, unknown>; content: string } {
  const filePath = path.join(root, relativePath)
  if (!fs.existsSync(filePath)) return { data: {}, content: '' }
  const raw = fs.readFileSync(filePath, 'utf8')
  const parsed = matter(raw)
  return { data: parsed.data as Record<string, unknown>, content: parsed.content }
}

async function mdToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}

// ─────────────────────────────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────────────────────────────

export interface PositioningItem {
  icon: string
  label: string
  desc: string
}

export interface HomePageData {
  heroBadgeText: string
  heroHeadline: string
  heroHeadlineAccent: string
  heroSubtext: string
  heroPrimaryButtonText: string
  heroPrimaryButtonHref: string
  heroSecondaryButtonText: string
  positioningItems: PositioningItem[]
  featuredSectionLabel: string
  featuredSectionHeading: string
  frameworksSectionLabel: string
  frameworksSectionHeading: string
  latestSectionLabel: string
  latestSectionHeading: string
}

export function getHomePageData(): HomePageData {
  const { data } = readMd('content/pages/home.md')
  return {
    heroBadgeText: (data.heroBadgeText as string) ?? 'Research → Reality',
    heroHeadline: (data.heroHeadline as string) ?? 'We translate research',
    heroHeadlineAccent: (data.heroHeadlineAccent as string) ?? 'into systems that work.',
    heroSubtext: (data.heroSubtext as string) ?? '',
    heroPrimaryButtonText: (data.heroPrimaryButtonText as string) ?? 'Read the Blog →',
    heroPrimaryButtonHref: (data.heroPrimaryButtonHref as string) ?? '/blog',
    heroSecondaryButtonText: (data.heroSecondaryButtonText as string) ?? 'Follow on LinkedIn',
    positioningItems: (data.positioningItems as PositioningItem[]) ?? [],
    featuredSectionLabel: (data.featuredSectionLabel as string) ?? "Editor's Pick",
    featuredSectionHeading: (data.featuredSectionHeading as string) ?? 'Essential Reading',
    frameworksSectionLabel: (data.frameworksSectionLabel as string) ?? 'Named Frameworks',
    frameworksSectionHeading: (data.frameworksSectionHeading as string) ?? 'Our Signature Systems',
    latestSectionLabel: (data.latestSectionLabel as string) ?? 'Fresh Off the Press',
    latestSectionHeading: (data.latestSectionHeading as string) ?? 'Latest Thinking',
  }
}

// ─────────────────────────────────────────────────────────────────
// ABOUT PAGE
// ─────────────────────────────────────────────────────────────────

export interface AboutPageData {
  seoTitle: string
  seoDescription: string
  sectionLabel: string
  headline: string
  headlineAccent: string
  intro: string
  primaryButtonText: string
  primaryButtonHref: string
  secondaryButtonText: string
  bodyHtml: string
}

export async function getAboutPageData(): Promise<AboutPageData> {
  const { data, content } = readMd('content/pages/about.md')
  const bodyHtml = await mdToHtml(content)
  return {
    seoTitle: (data.seoTitle as string) ?? 'About & Manifesto',
    seoDescription: (data.seoDescription as string) ?? '',
    sectionLabel: (data.sectionLabel as string) ?? 'Who We Are',
    headline: (data.headline as string) ?? 'Translators.',
    headlineAccent: (data.headlineAccent as string) ?? 'Not Curators.',
    intro: (data.intro as string) ?? '',
    primaryButtonText: (data.primaryButtonText as string) ?? 'Read the Blog →',
    primaryButtonHref: (data.primaryButtonHref as string) ?? '/blog',
    secondaryButtonText: (data.secondaryButtonText as string) ?? 'Follow on LinkedIn',
    bodyHtml,
  }
}

// ─────────────────────────────────────────────────────────────────
// SITE SETTINGS
// ─────────────────────────────────────────────────────────────────

export interface NavItem {
  label: string
  href: string
}

export interface SiteSettingsData {
  siteName: string
  siteTagline: string
  linkedInUrl: string
  betaBadge: boolean
  navItems: NavItem[]
  siteMetaTitle: string
  siteMetaDescription: string
}

export function getSiteSettings(): SiteSettingsData {
  const { data } = readMd('content/globals/settings.md')
  return {
    siteName: (data.siteName as string) ?? 'LEADING FOR INNOVATION',
    siteTagline: (data.siteTagline as string) ?? 'Research → Reality',
    linkedInUrl: (data.linkedInUrl as string) ?? 'https://linkedin.com',
    betaBadge: (data.betaBadge as boolean) ?? true,
    navItems: (data.navItems as NavItem[]) ?? [
      { label: 'All Posts', href: '/blog' },
      { label: 'Frameworks', href: '/blog?category=frameworks' },
      { label: 'About', href: '/about' },
    ],
    siteMetaTitle: (data.siteMetaTitle as string) ?? 'Leading for Innovation | Research → Reality',
    siteMetaDescription: (data.siteMetaDescription as string) ?? '',
  }
}

// ─────────────────────────────────────────────────────────────────
// NEWSLETTER CTA
// ─────────────────────────────────────────────────────────────────

export interface NewsletterCTAData {
  badgeText: string
  headline: string
  subtext: string
  emailPlaceholder: string
  buttonText: string
  successMessage: string
  linkedInNudge: string
}

export function getNewsletterCTAData(): NewsletterCTAData {
  const { data } = readMd('content/globals/newsletter.md')
  return {
    badgeText: (data.badgeText as string) ?? 'Stay sharp',
    headline: (data.headline as string) ?? 'Get the translation, not the textbook.',
    subtext: (data.subtext as string) ?? '',
    emailPlaceholder: (data.emailPlaceholder as string) ?? 'your@email.com',
    buttonText: (data.buttonText as string) ?? 'Subscribe →',
    successMessage: (data.successMessage as string) ?? "You're in! Check your inbox.",
    linkedInNudge: (data.linkedInNudge as string) ?? 'Also follow on LinkedIn for daily sharp takes.',
  }
}

// ─────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────

export interface FooterData {
  brandTagline: string
  staySectionLabel: string
  staySectionText: string
  linkedInButtonText: string
  copyrightSuffix: string
  builtByLine: string
}

export function getFooterData(): FooterData {
  const { data } = readMd('content/globals/footer.md')
  return {
    brandTagline: (data.brandTagline as string) ?? 'Research → Reality.',
    staySectionLabel: (data.staySectionLabel as string) ?? 'Stay Sharp',
    staySectionText: (data.staySectionText as string) ?? '',
    linkedInButtonText: (data.linkedInButtonText as string) ?? 'Follow on LinkedIn',
    copyrightSuffix: (data.copyrightSuffix as string) ?? 'LEADING FOR INNOVATION. All rights reserved.',
    builtByLine: (data.builtByLine as string) ?? 'Built for practitioners, by practitioners.',
  }
}
