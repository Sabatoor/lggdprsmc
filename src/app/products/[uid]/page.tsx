import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SliceZone } from '@prismicio/react'

import * as prismic from '@prismicio/client'
import { createClient } from '@/prismicio'
import { components } from '@/slices'
import Section from '@/app/components/Section'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText } from '@/app/components/PrismicRichText'
import Heading from '@/app/components/Heading'
import { asText } from '@prismicio/client'
import Link from 'next/link'
type Params = {
  uid: string
}

export default async function Page({ params }: { params: Params }) {
  const client = createClient()

  const page = await client
    .getByUID('product_type', params.uid)
    .catch(
      async () =>
        await client.getByUID('brand', params.uid).catch(() => notFound()),
    )
  if (page.type === 'brand') {
    const products = await client.getAllByType('product', {
      graphQuery: `
        {
          product {
            brand
            title
            featured_image
          }
        }
      `,
      filters: [prismic.filter.at('my.product.brand', page.id)],
    })
    return (
      <Section as="div" width="xl" className="flex flex-col items-center">
        <PrismicNextImage field={page.data.logo} />
        <Heading as="h1" size="4xl" className="my-4">
          Products by {asText(page.data.title)}
        </Heading>
        <SliceZone slices={page.data.slices} components={components} />
        {products.length > 0 ? (
          <ul className="flex flex-wrap justify-center gap-4">
            {products.map(product => {
              return (
                <li key={product.id} className="max-w-[400px]">
                  <Link href={product.url || '#'}>
                    <PrismicNextImage field={product.data.featured_image} />
                    <p className="relative mx-auto -mt-8 max-w-sm rounded-lg bg-skin-base p-4 text-center shadow-sm shadow-skin-neutral">
                      {asText(product.data.title)}
                    </p>
                  </Link>
                </li>
              )
            })}
          </ul>
        ) : null}
      </Section>
    )
  } else {
    return (
      <Section as="div" width="lg" className="flex flex-col items-center">
        <PrismicNextImage field={page.data.featured_image} />
        <SliceZone slices={page.data.slices} components={components} />
      </Section>
    )
  }
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const client = createClient()
  const settings = await client.getSingle('settings')
  const page = await client
    .getByUID('product_type', params.uid)
    .catch(
      async () =>
        await client.getByUID('brand', params.uid).catch(() => notFound()),
    )

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
  }
}

export async function generateStaticParams() {
  const client = createClient()
  const product_types = await client.getAllByType('product_type')
  const brands = await client.getAllByType('brand')
  const pages = [...product_types, ...brands]
  return pages.map(page => {
    return { uid: page.uid }
  })
}
