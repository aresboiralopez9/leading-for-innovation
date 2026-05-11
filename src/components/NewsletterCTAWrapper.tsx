/**
 * NewsletterCTAWrapper
 *
 * Server component that reads CMS data and passes it to the
 * client-side <NewsletterCTA> component.  Import THIS wrapper
 * in all pages instead of importing NewsletterCTA directly.
 */
import { getNewsletterCTAData, getSiteSettings } from '@/lib/content'
import { NewsletterCTA } from './NewsletterCTA'

export function NewsletterCTAWrapper() {
  const data = getNewsletterCTAData()
  const settings = getSiteSettings()
  return <NewsletterCTA data={data} linkedInUrl={settings.linkedInUrl1} />
}
