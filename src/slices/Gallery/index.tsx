import Section from '@/components/Section'
import { createClient } from '@/prismicio'
import { Content, asText } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { BlogPostDocument, PortfolioDocument } from '../../../prismicio-types'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import Link from 'next/link'
import Pagination from '@/components/Pagination'

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
  const items = await client.getByType('gallery_item', {
    orderings: {
      field: 'document.first_publication_date',
      direction: 'desc',
    },
    graphQuery: `
    {
      gallery_item {
        related_content {
          ...on portfolio {
            title
          }
        }
        gallery_image
      }
    }
    `,
    page: page,
    pageSize: 24,
  })
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      width="2xl"
      className="flex-col"
    >
      <ul className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
        {items.results &&
          items.results.map(item => {
            let relatedContent
            if (
              'type' in item.data.related_content &&
              item.data.related_content.type === 'portfolio'
            ) {
              relatedContent = item.data
                .related_content as unknown as PortfolioDocument
            } else if (
              'type' in item.data.related_content &&
              item.data.related_content.type === 'blog_post'
            ) {
              relatedContent = item.data
                .related_content as unknown as BlogPostDocument
            }

            return (
              <li key={item.id} className="relative">
                <Link
                  href={
                    relatedContent
                      ? (relatedContent.url as string)
                      : (item.data.gallery_image.url as string)
                  }
                >
                  <PrismicNextImage
                    field={item.data.gallery_image}
                    imgixParams={{ ar: '4:3', fit: 'crop' }}
                    title={
                      relatedContent
                        ? `${asText(relatedContent.data.title)}`
                        : item.data.gallery_image.alt
                          ? item.data.gallery_image.alt
                          : ''
                    }
                    className="shadow-neutral rounded-lg shadow-sm"
                  />
                </Link>
              </li>
            )
          })}
      </ul>
      {items.total_pages > 1 && (
        <div className="mt-6 lg:mt-8">
          <Pagination
            hasNextPage={items?.next_page !== null}
            hasPrevPage={items?.prev_page !== null}
            totalPages={items?.total_pages}
          />
        </div>
      )}
    </Section>
  )
}

export default Gallery
