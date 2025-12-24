import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SliceZone } from '@prismicio/react'
import * as prismic from '@prismicio/client'
import { createClient } from '@/prismicio'
import { components } from '@/slices'
import { Graph } from 'schema-dts'
import Heading from '@/components/Heading'

type Params = { uid: string }

// --- 1. Generate Metadata (SEO) ---
export async function generateMetadata(props: {
  params: Promise<Params>
}): Promise<Metadata> {
  const params = await props.params
  const client = createClient()
  const page = await client
    .getByUID('service', params.uid)
    .catch(() => notFound())
  const settings = await client.getSingle('settings')

  // Logic: Use Manual Meta Title if exists, otherwise fallback to "Page Title • Site Title"
  const manualMetaTitle = page.data.meta_title
  const cmsPageTitle = prismic.asText(page.data.title)
  const siteTitle = settings.data.site_title
  const seoTitle = manualMetaTitle || `${cmsPageTitle} • ${siteTitle}`

  const seoDescription =
    page.data.meta_description || settings.data.site_meta_description
  const seoImage =
    page.data.meta_image.url || settings.data.site_meta_image.url || ''

  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: {
      images: [seoImage],
      // Title and Description are inherited automatically
    },
    alternates: {
      canonical: page.url,
    },
  }
}

// --- 2. Page Component ---
export default async function Page(props: { params: Promise<Params> }) {
  const params = await props.params
  const client = createClient()

  // Fetch Page Data with extra links for Slices
  const page = await client
    .getByUID('service', params.uid, {
      fetchLinks: [
        'brand.description',
        'brand.logo',
        'brand.title',
        'product_type.title',
        'product_type.description',
        'product_type.featured_image',
        'service.title',
        'service.excerpt',
      ],
    })
    .catch(() => notFound())

  const settings = await client.getSingle('settings')

  // --- 3. Construct Optimized JSON-LD ---
  const domain = settings.data.domain || 'example.com' // Fallback if domain is missing in settings
  const baseUrl = `https://${domain}`
  const pageUrl = `${baseUrl}/services/${params.uid}`
  const businessId = `${baseUrl}/#identity`
  const serviceType =
    page.data.schema_service_type || prismic.asText(page.data.title)

  const jsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [
      // Node A: The Service Area Business (SAB)
      {
        '@type': 'HomeAndConstructionBusiness',
        '@id': businessId,
        name: settings.data.site_title || 'Lions Gate Garage Doors',
        url: baseUrl,
        image: settings.data.site_meta_image.url || undefined,
        telephone: settings.data.phone_number || undefined,

        // 1. SAB STRATEGY: Minimal Address
        // We list City/Region to establish "Home Base" for local SEO authority,
        // but we STRICTLY OMIT 'streetAddress'.
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Vancouver',
          addressRegion: 'BC',
          addressCountry: 'CA',
        },

        // 2. SAB STRATEGY: Define the Service Area
        // This tells Google: "Don't send people to my office; I go to these places."
        // You can list multiple cities or a general area.
        areaServed: [
          { '@type': 'City', name: 'Vancouver' },
          { '@type': 'City', name: 'North Vancouver' },
          { '@type': 'City', name: 'West Vancouver' },
          { '@type': 'City', name: 'Burnaby' },
          { '@type': 'City', name: 'Coquitlam' },
          { '@type': 'City', name: 'Richmond' },
          { '@type': 'City', name: 'Surrey' },
          { '@type': 'City', name: 'Delta' },
          { '@type': 'City', name: 'Langley' },
          { '@type': 'City', name: 'Maple Ridge' },
          { '@type': 'City', name: 'New Westminster' },
          { '@type': 'City', name: 'Pitt Meadows' },
          { '@type': 'City', name: 'White Rock' },
        ],
      },

      // Node B: The Specific Service
      {
        '@type': 'Service', // The standard type
        '@id': `${pageUrl}/#service`,
        name: serviceType, // Pulls from your new Prismic field
        serviceType: serviceType, // "Garage Door Repair" or "Installation"
        description: page.data.meta_description || undefined,
        provider: {
          '@id': businessId,
        },
        // MAGIC TOGGLE: If it's an emergency page, we add specific availability
        ...(page.data.is_emergency_service && {
          hoursAvailable: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
            opens: '00:00',
            closes: '23:59',
          },
        }),
      },

      // Node C: The WebPage
      {
        '@type': 'WebPage',
        '@id': pageUrl,
        url: pageUrl,
        name: page.data.meta_title || prismic.asText(page.data.title),
        description: page.data.meta_description || undefined,
        isPartOf: {
          '@id': `${baseUrl}/#website`,
        },
        about: {
          '@id': `${pageUrl}/#service`,
        },
        datePublished: page.first_publication_date,
        dateModified: page.last_publication_date,
        image:
          page.data.meta_image.url ||
          settings.data.site_meta_image.url ||
          undefined,
      },
    ],
  }

  return (
    <>
      {/* Inject Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Fallback H1 if Hero Slice is missing */}
      {page.data.slices[0]?.slice_type !== 'hero' ? (
        <Heading as="h1" size="5xl" className="my-6 lg:my-8 lg:text-center">
          {prismic.asText(page.data.title)}
        </Heading>
      ) : null}

      {/* Render Slices */}
      <SliceZone slices={page.data.slices} components={components} />
    </>
  )
}

// --- 3. Static Params Generation ---
export async function generateStaticParams() {
  const client = createClient()
  const pages = await client.getAllByType('service')

  return pages.map(page => {
    return { uid: page.uid }
  })
}
