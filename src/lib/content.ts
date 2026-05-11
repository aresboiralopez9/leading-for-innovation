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
  positioningItems: PositioningItem[]
  featuredSectionLabel: string
  frameworksSectionLabel: string
  moreBlogSectionLabel: string
  latestSectionLabel: string
}

export function getHomePageData(): HomePageData {
  const { data } = readMd('content/pages/home.md')
  return {
    heroBadgeText: (data.heroBadgeText as string) ?? 'Research → Reality',
    heroHeadline: (data.heroHeadline as string) ?? 'The gap between what feels right and what actually works is where most teams get stuck.',
    heroHeadlineAccent: (data.heroHeadlineAccent as string) ?? 'We close it.',
    heroSubtext: (data.heroSubtext as string) ?? '',
    positioningItems: (data.positioningItems as PositioningItem[]) ?? [],
    featuredSectionLabel: (data.featuredSectionLabel as string) ?? "FEATURED THIS WEEK",
    frameworksSectionLabel: (data.frameworksSectionLabel as string) ?? 'OUR NAMED FRAMEWORKS',
    moreBlogSectionLabel: (data.secondlatestSectionLabel as string) ?? 'MORE FROM THE BLOG',
    latestSectionLabel: (data.latestSectionLabel as string) ?? 'SAME TOPIC · TWO ANGLES · THIS WEEK',
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
    seoTitle: (data.seoTitle as string) ?? 'About',
    seoDescription: (data.seoDescription as string) ?? '',
    sectionLabel: (data.sectionLabel as string) ?? 'Who We Are',
    headline: (data.headline as string) ?? 'Translators.',
    headlineAccent: (data.headlineAccent as string) ?? 'Not Curators.',
    intro: (data.intro as string) ?? '',
    primaryButtonText: (data.primaryButtonText as string) ?? 'Read the Blog →',
    primaryButtonHref: (data.primaryButtonHref as string) ?? '/blog',
    secondaryButtonText: (data.secondaryButtonText as string) ?? '',
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
  linkedInUrl1: string
  linkedInUrl2: string
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
    linkedInUrl1: (data.linkedInUrl1 as string) ?? 'https://www.linkedin.com/in/aresboiralopez/',
    linkedInUrl2: (data.linkedInUrl2 as string) ?? 'https://www.linkedin.com/in/samantha-england-phd-9a614b149/',
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
// FOOTER
// ─────────────────────────────────────────────────────────────────

export interface FooterData {
  brandTagline: string
  staySectionLabel: string
  staySectionText: string
  copyrightSuffix: string
  builtByLine: string
}

export function getFooterData(): FooterData {
  const { data } = readMd('content/globals/footer.md')
  return {
    brandTagline: (data.brandTagline as string) ?? 'Research → Reality.',
    staySectionLabel: (data.staySectionLabel as string) ?? 'Stay Sharp',
    staySectionText: (data.staySectionText as string) ?? '',
    copyrightSuffix: (data.copyrightSuffix as string) ?? 'LEADING FOR INNOVATION. All rights reserved.',
    builtByLine: (data.builtByLine as string) ?? '',
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
    badgeText: (data.badgeText as string) ?? 'Stay Sharp',
    headline: (data.headline as string) ?? 'Get new insights delivered weekly',
    subtext: (data.subtext as string) ?? 'Join our community of practitioners who care about impact.',
    emailPlaceholder: (data.emailPlaceholder as string) ?? 'Your email',
    buttonText: (data.buttonText as string) ?? 'Subscribe',
    successMessage: (data.successMessage as string) ?? 'Thanks for subscribing!',
    linkedInNudge: (data.linkedInNudge as string) ?? 'Or follow us on LinkedIn for daily insights',
  }
}
