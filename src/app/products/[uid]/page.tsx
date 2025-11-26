import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SliceZone } from '@prismicio/react'

import * as prismic from '@prismicio/client'
import { createClient } from '@/prismicio'
import { components } from '@/slices'
import Section from '@/components/Section'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText } from '@/components/PrismicRichText'
import Heading from '@/components/Heading'
import { asText } from '@prismicio/client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ReactNode } from 'react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/app/lib/cn'
type Params = {
  uid: string
}

export default async function Page(props: { params: Promise<Params> }) {
  const params = await props.params
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
            excerpt
            status
          }
        }
      `,
      filters: [
        prismic.filter.at('my.product.brand', page.id),
        prismic.filter.not('my.product.status', 'discontinued'),
      ],
      orderings: {
        field: 'my.product.title',
        direction: 'asc',
      },
    })
    return (
      <Section as="div" width="xl" className="flex flex-col items-center">
        <PrismicNextImage field={page.data.logo} />
        <Heading as="h1" size="4xl" className="my-6 lg:my-8">
          Products by {asText(page.data.title)}
        </Heading>
        <SliceZone slices={page.data.slices} components={components} />
        {products.length > 0 ? (
          <ul className="flex flex-wrap justify-center gap-4">
            {products.map(product => {
              return (
                <li
                  key={product.id}
                  className="relative max-w-[400px] rounded-lg border-2 border-primary p-4"
                >
                  <Link
                    href={product.url || '#'}
                    aria-labelledby={`#${product.uid}`}
                  >
                    {prismic.isFilled.select(product.data.status) &&
                      product.data.status !== 'no status' && (
                        <Badge
                          variant={
                            product.data.status === 'in stock'
                              ? 'default'
                              : 'destructive'
                          }
                          className={cn('absolute top-4 right-4', {
                            'text-foreground':
                              product.data.status === 'in stock',
                          })}
                        >
                          {product.data.status}
                        </Badge>
                      )}
                    <PrismicNextImage
                      field={product.data.featured_image}
                      className="rounded-lg"
                      alt=""
                    />
                    <div className="relative mx-auto flex max-w-sm flex-col lg:text-center">
                      <PrismicRichText
                        field={product.data.title}
                        components={{
                          heading1: ({ children }: { children: ReactNode }) => (
                            <Heading
                              as="h2"
                              size="3xl"
                              className="lg:text-center"
                              id={product.uid || '#'}
                            >
                              {children}
                            </Heading>
                          ),
                        }}
                      />
                      {prismic.isFilled.richText(product.data.excerpt) && (
                        <PrismicRichText field={product.data.excerpt} />
                      )}
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        ) : null}
      </Section>
    )
  } else {
    const products = await client.getAllByType('product', {
      graphQuery: `
        {
          product {
            product_type
            title
            featured_image
            excerpt
            status
          }
        }
      `,
      filters: [
        prismic.filter.at('my.product.product_type', page.id),
        prismic.filter.not('my.product.status', 'discontinued'),
      ],
      orderings: {
        field: 'my.product.title',
        direction: 'asc',
      },
    })
    return (
      <Section as="div" width="xl" className="flex flex-col items-center">
        <PrismicNextImage field={page.data.featured_image} />
        <Heading as="h1" size="4xl" className="my-6 lg:my-8">
          {asText(page.data.title)}
        </Heading>
        <SliceZone slices={page.data.slices} components={components} />
        {products.length > 0 ? (
          <ul className="flex flex-wrap justify-center gap-4">
            {products.map(product => {
              return (
                <li key={product.id} className="max-w-[400px]">
                  <Link
                    href={product.url || '#'}
                    className="block ring-primary outline-hidden transition duration-300 ease-in-out focus:ring-2"
                  >
                    <PrismicNextImage
                      field={product.data.featured_image}
                      className="rounded-lg"
                    />
                  </Link>
                  <div className="relative mx-auto -mt-8 flex max-w-sm flex-col rounded-lg bg-background p-4 shadow-lg lg:text-center">
                    {prismic.isFilled.select(product.data.status) &&
                      product.data.status !== 'no status' && (
                        <Badge
                          variant={
                            product.data.status === 'in stock'
                              ? 'default'
                              : 'destructive'
                          }
                          className={cn('absolute -top-3 right-2 capitalize', {
                            'text-foreground':
                              product.data.status === 'in stock',
                          })}
                        >
                          {product.data.status}
                        </Badge>
                      )}
                    <PrismicRichText
                      field={product.data.title}
                      components={{
                        heading1: ({ children }: { children: ReactNode }) => (
                          <Heading
                            as="h2"
                            size="2xl"
                            className="lg:text-center"
                          >
                            {children}
                          </Heading>
                        ),
                      }}
                    />
                    <PrismicRichText field={product.data.excerpt} />
                    <Button
                      asChild
                      variant="secondary"
                      size="lg"
                      className="font-bold text-neutral lg:text-lg"
                    >
                      <Link href={product.url || '#'}>
                        Learn More{' '}
                        <span className="sr-only">{` about ${asText(
                          product.data.title,
                        )}`}</span>
                      </Link>
                    </Button>
                  </div>
                </li>
              )
            })}
          </ul>
        ) : null}
      </Section>
    )
  }
}

export async function generateMetadata(props: {
  params: Promise<Params>
}): Promise<Metadata> {
  const params = await props.params
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
    alternates: {
      canonical: page.url,
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
