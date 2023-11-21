import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SliceZone } from '@prismicio/react'

import { createClient } from '@/prismicio'
import { components } from '@/slices'
import { asText } from '@prismicio/client'
import Section from '@/app/components/Section'
import { PrismicRichText } from '@/app/components/PrismicRichText'
import { PrismicNextImage } from '@prismicio/next'

type Params = { product: string }

export default async function Page({ params }: { params: Params }) {
  const client = createClient()
  const page = await client
    .getByUID('product', params.product)
    .catch(() => notFound())

  return (
    <>
      <Section width="lg">
        <div className="prose flex flex-col lg:prose-lg xl:prose-xl prose-h2:mt-2 prose-a:text-skin-primary">
          <PrismicNextImage
            field={page.data.featured_image}
            className="place-self-center"
          />
          <PrismicRichText field={page.data.title} />
          <PrismicRichText field={page.data.description} />
        </div>
      </Section>
      <SliceZone slices={page.data.slices} components={components} />
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const client = createClient()
  const settings = await client.getSingle('settings')
  const page = await client
    .getByUID('product', params.product)
    .catch(() => notFound())

  return {
    title: `${asText(page.data.title) || page.data.meta_title} • ${
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
  const pages = await client.getAllByType('product')

  return pages.map(page => {
    return { product: page.uid }
  })
}
