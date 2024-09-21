import { createClient } from '@/prismicio'
import * as prismic from '@prismicio/client'
import React from 'react'
import Pagination from '@/components/Pagination'
import { PrismicNextImage } from '@prismicio/next'
import Link from 'next/link'

type GalleryListProps = {
  page?: number
}

const GalleryList = async ({
  page = 1,
}: GalleryListProps): Promise<JSX.Element> => {
  const client = createClient()
  const gallery_items = await client.getByType('portfolio', {
    page: page,
    pageSize: 12,
    orderings: {
      field: 'document.first_publication_date',
      direction: 'desc',
    },
  })
  const PrismicImages = gallery_items.results.map(
    item => item.data.featured_image,
  ) as prismic.FilledImageFieldImage[]
  return (
    <>
      {PrismicImages.length > 0 && (
        <ul className="grid gap-4 pb-4 md:grid-cols-2 md:gap-6 md:pb-6 lg:grid-cols-3 lg:gap-8 lg:pb-8 xl:grid-cols-4">
          {gallery_items.results.map((item, index) => {
            return (
              <li
                key={item.id}
                className="group relative h-64 overflow-hidden rounded-lg bg-secondary"
              >
                <Link href={item.url || '#'}>
                  <PrismicNextImage
                    field={item.data.featured_image}
                    quality={75}
                    width={341}
                    height={261}
                    imgixParams={{ ar: '4:3', fit: 'crop', q: 75 }}
                    title={item.data.featured_image.alt || 'decorative image'}
                    className="rounded-lg shadow-sm shadow-neutral"
                    priority={index < 2}
                  />
                </Link>
              </li>
            )
          })}
        </ul>
      )}
      {gallery_items.total_pages > 1 && (
        <Pagination
          hasNextPage={gallery_items?.next_page !== null}
          hasPrevPage={gallery_items?.prev_page !== null}
          totalPages={gallery_items?.total_pages}
        />
      )}
    </>
  )
}

export default GalleryList
