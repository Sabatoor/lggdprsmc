import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SliceZone } from '@prismicio/react'
import * as prismic from '@prismicio/client'
import { createClient } from '@/prismicio'
import { components } from '@/slices'
import { Graph } from 'schema-dts'
import { PrismicNextImage } from '@prismicio/next'
import { cn } from '@/app/lib/cn'
import { PrismicRichText } from '@/components/PrismicRichText'
import Heading from '@/components/Heading'
import Section from '@/components/Section'
import { ReactNode } from 'react'

type Params = { uid: string }

export default async function Page(props: { params: Promise<Params> }) {
  const params = await props.params
  const client = createClient()
  const page = await client
    .getByUID('location', params.uid, {
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
        '@type': 'WebSite',
        '@id': `https://${settings.data.domain || `example.com`}/#site`,
        name: settings.data.site_title || '',
        url: `https://${settings.data.domain || `example.com`}/`,
      },
      {
        '@type': 'BlogPosting',
        '@id': `https://${settings.data.domain || `example.com`}${
          page.url
        }/#post`,
        headline: prismic.asText(page.data.title),
        description: page.data.meta_description || undefined,
        mainEntityOfPage: `https://${settings.data.domain || `example.com`}${
          page.url
        }`,
        datePublished: page.first_publication_date,
        dateModified: page.last_publication_date || undefined,
        image: page.data.meta_image.url || undefined,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className={cn('relative mb-8')}>
        {prismic.isFilled.image(page.data.featured_image) && (
          <div className="relative h-[300px] lg:h-[400px] xl:h-[500px] 2xl:h-[600px]">
            <PrismicNextImage
              field={page.data.featured_image}
              loading='eager'
              fetchPriority='high'
              fallbackAlt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        )}
        <div className="mx-auto flex max-w-(--breakpoint-lg) flex-col px-4 py-4 lg:py-8">
          <PrismicRichText
            field={page.data.title}
            components={{
              heading1: ({ children }: { children: ReactNode }) => (
                <Heading
                  as="h1"
                  size="7xl"
                  className="text-neutral lg:text-center"
                >
                  {children}
                </Heading>
              ),
            }}
          />
        </div>
      </div>
      <SliceZone slices={page.data.slices} components={components} />
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<Params>
}): Promise<Metadata> {
  const params = await props.params
  const client = createClient()
  const page = await client
    .getByUID('location', params.uid)
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
  const pages = await client.getAllByType('location')
  return pages.map(page => {
    return { uid: page.uid }
  })
}
