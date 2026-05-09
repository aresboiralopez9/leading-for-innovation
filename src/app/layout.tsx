import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Leading for Innovation | Research → Reality',
    template: '%s | Leading for Innovation',
  },
  description:
    'We transform dense academic research into clear, opinionated, and immediately usable systems for real-world teams. Sharp insights. Concrete frameworks. Zero fluff.',
  keywords: ['organizational design', 'innovation', 'leadership', 'frameworks', 'management', 'creativity'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Leading for Innovation',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
