import { Metadata } from 'next'
import { SliceZone } from '@prismicio/react'
import { Graph } from 'schema-dts'
import { createClient } from '@/prismicio'
import { components } from '@/slices'

export default async function Page() {
  const client = createClient()
  const page = await client.getSingle('homepage', {
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
  const settings = await client.getSingle('settings')

  const jsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        name: 'Lionsgate Garage Doors',
        description: `${settings.data.site_meta_description || "Lions Gate Garage Doors, Vancouver's trusted expert in garage door installation and repair, boasts a 5-star rating with 200+ reviews. For premium service, call (604) 243-1505."}`,
        image: `${settings.data.footer_logo.url}`,
        '@id': 'https://lionsgategaragedoors.com/',
        url: 'https://lionsgategaragedoors.com/',
        telephone: settings.data.phone_number || '+16042431505',
        priceRange: '$-$$$',
        address: {
          '@type': 'PostalAddress',
          '@id': `https://${settings.data.domain || `example.com`}/#address`,
          streetAddress: '#11 18777 68a Ave',
          addressLocality: 'Surrey',
          addressRegion: 'BC',
          postalCode: 'V4N 0Z7',
          addressCountry: 'CA',
        },

        geo: {
          '@type': 'GeoCoordinates',
          latitude: 49.1274905182408,
          longitude: -122.70193977308799,
        },
        sameAs: [
          'https://www.facebook.com/lionsgategaragedoors/',
          'https://www.instagram.com/lions_gate_garage_doors/',
          'https://www.linkedin.com/company/lions-gate-garage-doors-ltd/about/',
          'https://www.yelp.ca/biz/lions-gate-garage-doors-surrey/',
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5.0',
          ratingCount: '206',
        },
      },
      {
        '@type': 'WebPage',
        '@id': `https://${settings.data.domain || `example.com`}/#${page.uid}`,
        about: page.data.meta_description || undefined,
        accountablePerson: {
          '@id': `https://${settings.data.domain || `example.com`}/#alfredo`,
          givenName: 'Alfredo',
        },
        author: {
          '@id': `https://${settings.data.domain || `example.com`}/#alfredo`,
        },
        copyrightHolder: {
          '@id': `https://${settings.data.domain || `example.com`}/#alfredo`,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SliceZone slices={page.data.slices} components={components} />
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const page = await client.getSingle('homepage')
  const settings = await client.getSingle('settings')

  return {
    title: page.data.meta_title || settings.data.site_title,
    description:
      page.data.meta_description || settings.data.site_meta_description,
    openGraph: {
      images: [
        page.data.meta_image.url || settings.data.site_meta_image.url || '',
      ],
    },
  }
}
