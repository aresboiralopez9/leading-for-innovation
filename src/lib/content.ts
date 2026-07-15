/**
 * Server-side helpers that read TinaCMS-managed content files directly from
 * the file system. Tina saves into these files, and Vercel reads them at build time.
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const root = process.cwd()

function readMd(relativePath: string): { data: Record<string, unknown>; content: string } {
  const filePath = path.join(root, relativePath)

  if (!fs.existsSync(filePath)) {
    return { data: {}, content: '' }
  }

  const raw = fs.readFileSync(filePath, 'utf8')
  const parsed = matter(raw)

  return { data: parsed.data as Record<string, unknown>, content: parsed.content }
}

async function mdToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}

function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback
}

function asBoolean(value: unknown, fallback = false): boolean {
  return typeof value === 'boolean' ? value : fallback
}

function asArray<T>(value: unknown, fallback: T[]): T[] {
  return Array.isArray(value) ? (value as T[]) : fallback
}

export interface HomeCard {
  label: string
  description: string
  href: string
  colorClass?: string
  className?: string
}

export interface HomePageData {
  heroBadgeText: string
  heroHeadline: string
  heroHeadlineAccent: string
  heroSubtext: string
  heroPrimaryButtonText: string
  heroPrimaryButtonHref: string
  heroSecondaryButtonText: string
  heroSecondaryButtonHref: string
  startHereLabel: string
  startHereHeading: string
  startHereCards: HomeCard[]
  featuredSectionLabel: string
  featuredSectionHeading: string
  postTypesSectionLabel: string
  postTypesSectionHeading: string
  postTypeCards: HomeCard[]
  foundersSectionLabel: string
  foundersSectionHeading: string
  foundersSectionText: string
  foundersButtonText: string
  foundersButtonHref: string
  latestSectionLabel: string
  latestSectionHeading: string
  latestSectionText: string
  followSectionLabel: string
  followSectionHeading: string
  followSectionText: string
  followButtonText: string
}

const defaultStartHereCards: HomeCard[] = [
  {
    label: 'Research to Practice',
    description: 'Turn evidence into usable ideas.',
    href: '/blog?category=Research%20to%20Practice',
    colorClass: 'text-lfi-blue',
  },
  {
    label: 'Myth Busters',
    description: 'Challenge what sounds right but often fails.',
    href: '/blog?category=Myth%20Buster',
    colorClass: 'text-lfi-green',
  },
  {
    label: 'Debates and Hot Takes',
    description: 'Make familiar innovation questions sharper.',
    href: '/blog?category=Debate',
    colorClass: 'text-lfi-blue',
  },
]

const defaultPostTypeCards: HomeCard[] = [
  {
    label: 'Research to Practice',
    href: '/blog?category=Research%20to%20Practice',
    description: 'What the research says and what teams can actually do with it.',
    className: 'border-lfi-yellow bg-lfi-yellow/25',
  },
  {
    label: 'Debate',
    href: '/blog?category=Debate',
    description: 'Two-sided takes on the ideas people often oversimplify.',
    className: 'border-lfi-blue bg-lfi-blue/10',
  },
  {
    label: 'Hot Takes',
    href: '/blog?category=Hot%20Takes',
    description: 'Sharp arguments that challenge familiar innovation advice.',
    className: 'border-lfi-green bg-lfi-green/10',
  },
  {
    label: 'Expert Lens',
    href: '/blog?category=Expert%20Lens',
    description: 'Deeper reads on creativity, innovation, leadership, and evidence.',
    className: 'border-lfi-mint bg-lfi-mint/20',
  },
  {
    label: 'Myth Buster',
    href: '/blog?category=Myth%20Buster',
    description: 'Common beliefs about creativity and innovation put to the test.',
    className: 'border-lfi-yellow bg-lfi-yellow/20',
  },
  {
    label: 'Innovation Spotlight',
    href: '/blog?category=Innovation%20Spotlight',
    description: 'Concrete examples of innovation in action and what they teach us.',
    className: 'border-lfi-blue bg-lfi-blue/10',
  },
]

export function getHomePageData(): HomePageData {
  const { data } = readMd('content/pages/home.md')

  return {
    heroBadgeText: asString(data.heroBadgeText, 'Research to Reality'),
    heroHeadline: asString(
      data.heroHeadline,
      'The gap between what feels right and what actually works is where most teams get stuck.'
    ),
    heroHeadlineAccent: asString(data.heroHeadlineAccent, 'We close it.'),
    heroSubtext: asString(
      data.heroSubtext,
      'Good innovation practice rarely feels natural. We take the research seriously, challenge what intuition gets backwards, and turn the findings into clear ideas teams can actually use.'
    ),
    heroPrimaryButtonText: asString(data.heroPrimaryButtonText, 'Read the blog'),
    heroPrimaryButtonHref: asString(data.heroPrimaryButtonHref, '/blog'),
    heroSecondaryButtonText: asString(data.heroSecondaryButtonText, 'Meet the founders'),
    heroSecondaryButtonHref: asString(data.heroSecondaryButtonHref, '/about'),
    startHereLabel: asString(data.startHereLabel, 'Start here'),
    startHereHeading: asString(
      data.startHereHeading,
      'Smart takes on creativity, innovation, and how teams actually work.'
    ),
    startHereCards: asArray<HomeCard>(data.startHereCards, defaultStartHereCards),
    featuredSectionLabel: asString(data.featuredSectionLabel, 'Featured posts'),
    featuredSectionHeading: asString(data.featuredSectionHeading, 'Start with these'),
    postTypesSectionLabel: asString(data.postTypesSectionLabel, 'Browse by type'),
    postTypesSectionHeading: asString(data.postTypesSectionHeading, 'Choose the kind of post you want to read'),
    postTypeCards: asArray<HomeCard>(data.postTypeCards, defaultPostTypeCards),
    foundersSectionLabel: asString(data.foundersSectionLabel, 'The founders'),
    foundersSectionHeading: asString(data.foundersSectionHeading, 'Meet the people behind the blog'),
    foundersSectionText: asString(
      data.foundersSectionText,
      'Leading for Innovation is built by two creativity and innovation researchers who care about making academic evidence useful for real teams, managers, and organizations.'
    ),
    foundersButtonText: asString(data.foundersButtonText, 'Read about the blog'),
    foundersButtonHref: asString(data.foundersButtonHref, '/about'),
    latestSectionLabel: asString(data.latestSectionLabel, 'Latest'),
    latestSectionHeading: asString(data.latestSectionHeading, 'Recent posts'),
    latestSectionText: asString(
      data.latestSectionText,
      'New research to practice pieces, debates, hot takes, expert lenses, myth busters, and innovation spotlights.'
    ),
    followSectionLabel: asString(data.followSectionLabel, 'Follow the work'),
    followSectionHeading: asString(data.followSectionHeading, 'Short takes on LinkedIn. Deeper posts on the blog.'),
    followSectionText: asString(
      data.followSectionText,
      'We share timely ideas in short form, then develop the strongest ones here into fuller posts.'
    ),
    followButtonText: asString(data.followButtonText, 'Follow on LinkedIn'),
  }
}

export interface AboutPageData {
  seoTitle: string
  seoDescription: string
  sectionLabel: string
  headline: string
  headlineAccent: string
  intro: string
  pointOfViewLabel: string
  pointOfViewText: string
  primaryButtonText: string
  primaryButtonHref: string
  secondaryButtonText: string
  peopleSectionLabel: string
  peopleSectionHeading: string
  bodyHtml: string
}

export async function getAboutPageData(): Promise<AboutPageData> {
  const { data, content } = readMd('content/pages/about.md')
  const bodyHtml = await mdToHtml(content)

  return {
    seoTitle: asString(data.seoTitle, 'About'),
    seoDescription: asString(data.seoDescription),
    sectionLabel: asString(data.sectionLabel, 'Who We Are'),
    headline: asString(data.headline, 'Translators.'),
    headlineAccent: asString(data.headlineAccent, 'Not Curators.'),
    intro: asString(data.intro),
    pointOfViewLabel: asString(data.pointOfViewLabel, 'Our point of view'),
    pointOfViewText: asString(
      data.pointOfViewText,
      'Useful research should not stay trapped in journals, slide decks, or vague advice. It should help people make better decisions at work.'
    ),
    primaryButtonText: asString(data.primaryButtonText, 'Read the Blog'),
    primaryButtonHref: asString(data.primaryButtonHref, '/blog'),
    secondaryButtonText: asString(data.secondaryButtonText),
    peopleSectionLabel: asString(data.peopleSectionLabel, 'The People'),
    peopleSectionHeading: asString(data.peopleSectionHeading, 'Two voices, one system'),
    bodyHtml,
  }
}

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
    siteName: asString(data.siteName, 'LEADING FOR INNOVATION'),
    siteTagline: asString(data.siteTagline, 'Research to Reality'),
    linkedInUrl: asString(
      data.linkedInUrl,
      'https://www.linkedin.com/company/leading-for-innovation/'
    ),
    betaBadge: asBoolean(data.betaBadge, false),
    navItems: asArray<NavItem>(data.navItems, [
      { label: 'All Posts', href: '/blog' },
      { label: 'About', href: '/about' },
    ]),
    siteMetaTitle: asString(data.siteMetaTitle, 'Leading for Innovation | Research to Reality'),
    siteMetaDescription: asString(data.siteMetaDescription),
  }
}

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
    brandTagline: asString(data.brandTagline, 'Research to Reality.'),
    staySectionLabel: asString(data.staySectionLabel, 'Stay Sharp'),
    staySectionText: asString(data.staySectionText),
    linkedInButtonText: asString(data.linkedInButtonText, 'Follow on LinkedIn'),
    copyrightSuffix: asString(data.copyrightSuffix, 'LEADING FOR INNOVATION. All rights reserved.'),
    builtByLine: asString(data.builtByLine),
  }
}

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
    badgeText: asString(data.badgeText, 'Stay Sharp'),
    headline: asString(data.headline, 'Get new insights delivered weekly'),
    subtext: asString(data.subtext, 'Join our community of practitioners who care about impact.'),
    emailPlaceholder: asString(data.emailPlaceholder, 'Your email'),
    buttonText: asString(data.buttonText, 'Subscribe'),
    successMessage: asString(data.successMessage, 'Thanks for subscribing!'),
    linkedInNudge: asString(data.linkedInNudge, 'Or follow us on LinkedIn for daily insights'),
  }
}
