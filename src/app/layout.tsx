import type { Metadata } from 'next'
import { createClient, repositoryName } from '@/prismicio'
import { Suspense } from 'react'
import { PrismicPreview } from '@prismicio/next'
import { cn } from '@/app/lib/cn'
import { Oswald, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Analytics from '@/components/Analytics'
import Consent from '../components/Consent'

/**
 * Heading & Body fonts
 */
const heading = Oswald({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})
const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

/**
 * fetch and generate Metadata
 */

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const settings = await client.getSingle('settings')
  return {
    metadataBase: new URL(`https://${settings.data.domain || `example.com`}`),
    title: settings.data.site_title || 'Prismic Foundation',
    description:
      settings.data.site_meta_description ||
      `This is the fallback site meta description`,
    openGraph: {
      images: [settings.data.site_meta_image.url || ''],
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const client = createClient()
  const settings = await client.getSingle('settings')
  const {
    data: { navigation },
  } = settings
  return (
    <html lang="en-CA">
      <body
        className={cn(
          'font-body text-neutral bg-muted flex min-h-screen flex-col justify-between',
          body.variable,
          heading.variable,
        )}
      >
        <Suspense>
          <Analytics />
        </Suspense>
        <Navbar
          navigation={navigation}
          logo={settings.data.logo}
          title={settings.data.site_title}
          phoneNumber={settings.data.phone_number}
          call_to_action={settings.data.call_to_action}
        />
        <main id="content">{children}</main>
        <Footer />
        <Consent />
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  )
}
