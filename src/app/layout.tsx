import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'
import { getSiteSettings, getFooterData } from '@/lib/content'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSiteSettings()
  return {
    title: {
      default: settings.siteMetaTitle,
      template: `%s | ${settings.siteName}`,
    },
    description: settings.siteMetaDescription,
    keywords: ['organizational design', 'innovation', 'leadership', 'frameworks', 'management', 'creativity'],
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: settings.siteName,
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = getSiteSettings()
  const footer = getFooterData()

  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Header settings={settings} />
            <main className="flex-1">{children}</main>
            <Footer footer={footer} settings={settings} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
