import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SliceZone } from '@prismicio/react'

import { createClient } from '@/prismicio'
import { components } from '@/slices'
import { asText, isFilled } from '@prismicio/client'
import Section from '@/app/components/Section'
import { PrismicRichText } from '@/app/components/PrismicRichText'
import { PrismicNextImage } from '@prismicio/next'
import { FaFilePdf } from 'react-icons/fa6'
import Link from 'next/link'
import Heading from '@/app/components/Heading'
import bytesToMegabytes from '@/app/lib/bytesToMegabytes'

type Params = { product: string }
type File = {
  link_type: 'Media'
  name: string
  kind: 'all'
  url: string
  size: number
}

export default async function Page({ params }: { params: Params }) {
  const client = createClient()
  const page = await client
    .getByUID('product', params.product, {
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

  return (
    <>
      <Section width="lg" className="flex-col">
        <div className="prose flex flex-col lg:prose-lg xl:prose-xl prose-h2:mt-2 prose-a:text-skin-primary">
          <PrismicNextImage
            field={page.data.featured_image}
            className="place-self-center"
          />
          <PrismicRichText field={page.data.title} />
          <PrismicRichText field={page.data.description} />
        </div>
        <div className="min-w-[350px] max-w-screen-sm overflow-hidden rounded bg-skin-white shadow-lg">
          <header className="relative flex h-8 items-center justify-center bg-neutral-300 shadow-sm">
            <div className="absolute left-2 top-2 flex gap-x-2">
              <div className="h-3 w-3 rounded-full bg-red-600" />
              <div className="h-3 w-3 rounded-full bg-skin-fill" />
              <div className="h-3 w-3 rounded-full bg-amber-400" />
            </div>
            <Heading as="h2" size="xl" className="font-light text-skin-neutral">
              Documents to Download
            </Heading>
          </header>
          <div className="grid place-items-center p-6">
            {isFilled.linkToMedia(page.data.files[0]?.file) && (
              <ul className="flex flex-wrap">
                {page.data.files.map((item, i) => {
                  const file = item.file as File
                  return (
                    <li key={i}>
                      <Link
                        href={file.url}
                        className="group grid place-items-center gap-4 rounded p-2 outline-none ring-skin-primary focus:ring-2"
                      >
                        <FaFilePdf className="h-16 w-16 transform text-skin-primary transition duration-500 ease-in-out group-hover:-translate-y-1 group-hover:scale-105" />
                        <p className="text-sm">{file.name}</p>
                        <p className="text-xs">
                          {bytesToMegabytes(file.size)} MB
                        </p>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
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
    alternates: {
      canonical: page.url,
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
