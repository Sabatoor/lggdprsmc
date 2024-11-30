import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SliceZone } from '@prismicio/react'
import * as prismic from '@prismicio/client'
import { createClient } from '@/prismicio'
import { components } from '@/slices'
import { Graph } from 'schema-dts'
import Heading from '@/components/Heading'

type Params = { uid: string }

export default async function Page(props: { params: Promise<Params> }) {
  const params = await props.params;
  const client = createClient()
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

  const jsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `https://${settings.data.domain || `example.com`}/#${page.uid}`,
        about: page.data.meta_description || undefined,
        accountablePerson: {
          '@id': `https://${settings.data.domain || `example.com`}/#`,
        },
        author: {
          '@id': `https://${settings.data.domain || `example.com`}/#`,
        },
        copyrightHolder: {
          '@id': `https://${settings.data.domain || `example.com`}/#`,
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
      {page.data.slices[0]?.slice_type !== 'hero' ? (
        <Heading as="h1" size="5xl" className="my-6 lg:my-8 lg:text-center">
          {prismic.asText(page.data.title)}
        </Heading>
      ) : null}
      <SliceZone slices={page.data.slices} components={components} />
    </>
  )
}

export async function generateMetadata(
  props: {
    params: Promise<Params>
  }
): Promise<Metadata> {
  const params = await props.params;
  const client = createClient()
  const page = await client
    .getByUID('service', params.uid)
    .catch(() => notFound())
  const settings = await client.getSingle('settings')

  return {
    title: `${prismic.asText(page.data.title) || page.data.meta_title} • ${
      settings.data.site_title
    }`,
    description:
      page.data.meta_description || settings.data.site_meta_description,
    openGraph: {
      images: [
        page.data.meta_image.url || settings.data.site_meta_image.url || '',
      ],
    },
    alternates: {
      canonical: page.url,
    },
  }
}

export async function generateStaticParams() {
  const client = createClient()
  const pages = await client.getAllByType('service')

  return pages.map(page => {
    return { uid: page.uid }
  })
}
