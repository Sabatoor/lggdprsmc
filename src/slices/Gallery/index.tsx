import Pagination from '@/components/Pagination'
import Section from '@/components/Section'
import { createClient } from '@/prismicio'
import { Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { SliceComponentProps } from '@prismicio/react'
import Link from 'next/link'

/**
 * Props for `Gallery`.
 */
export type GalleryProps = SliceComponentProps<Content.GallerySlice>

type contextProps = {
  page?: number
}

/**
 * Component for "Gallery" Slices.
 */
const Gallery = async ({
  slice,
  context,
}: GalleryProps): Promise<JSX.Element> => {
  const { page } = context as contextProps
  const client = createClient()

  const portfolios = await client.getByType('portfolio', {
    orderings: {
      field: 'document.first_publication_date',
      direction: 'desc',
    },
    graphQuery: `
    {
      portfolio {
        featured_image
        title
      }
    }
    `,
    page: page,
    pageSize: 12,
  })
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      width="2xl"
      className="flex-col"
    >
      <ul className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
        {portfolios.results &&
          portfolios.results.map(item => {
            return (
              <li key={item.id} className="relative">
                <Link href={item.url || '#'}>
                  <PrismicNextImage
                    field={item.data.featured_image}
                    imgixParams={{ ar: '4:3', fit: 'crop' }}
                    title={item.data.featured_image.alt || 'decorative image'}
                    className="rounded-lg shadow-sm shadow-neutral"
                  />
                </Link>
              </li>
            )
          })}
      </ul>
      {portfolios.total_pages > 1 && (
        <div className="mt-6 lg:mt-8">
          <Pagination
            hasNextPage={portfolios?.next_page !== null}
            hasPrevPage={portfolios?.prev_page !== null}
            totalPages={portfolios?.total_pages}
          />
        </div>
      )}
    </Section>
  )
}

export default Gallery
