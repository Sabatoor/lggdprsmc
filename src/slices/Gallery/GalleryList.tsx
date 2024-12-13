import Pagination from '@/components/Pagination'
import { Badge } from '@/components/ui/badge'
import { getPostLocationTag, getTypeValue, locations } from '@/lib/utils'
import { createClient } from '@/prismicio'
import * as prismic from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import Link from 'next/link'

type GalleryListProps = {
  page?: number
  type: 'Installation' | 'Repair' | undefined | null
}

const GalleryList = async ({
  page = 1,
  type,
}: GalleryListProps): Promise<JSX.Element> => {
  const client = createClient()
  let gallery_items
  if (!type) {
    gallery_items = await client.getByType('portfolio', {
      page: page,
      pageSize: 12,
      orderings: {
        field: 'my.portfolio.date_published',
        direction: 'desc',
      },
    })
  } else {
    gallery_items = await client.getByType('portfolio', {
      page: page,
      pageSize: 12,
      filters: [prismic.filter.at('document.tags', [type])],
      orderings: {
        field: 'my.portfolio.date_published',
        direction: 'desc',
      },
    })
  }
  const PrismicImages = gallery_items.results.map(
    item => item.data.featured_image,
  ) as prismic.FilledImageFieldImage[]
  return (
    <>
      {PrismicImages.length > 0 && (
        <ul className="grid gap-4 pb-8 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8 lg:pb-10 xl:grid-cols-4">
          {gallery_items.results.map((item, index) => {
            let workType = getTypeValue(item.tags, 'Installation')
            if (!workType) {
              workType = getTypeValue(item.tags, 'Repair')
            }
            const workLocation = getPostLocationTag(item.tags, locations)

            return (
              <li key={item.id} className="relative rounded-lg bg-secondary">
                {workType && (
                  <Badge className="absolute left-4 top-4 cursor-default text-emerald-950">
                    {workType}
                  </Badge>
                )}
                {workLocation && (
                  <Badge
                    className="absolute right-4 top-4 cursor-default"
                    variant={'secondary'}
                  >
                    {workLocation}
                  </Badge>
                )}
                <Link href={item.url || '#'}>
                  <PrismicNextImage
                    field={item.data.featured_image}
                    quality={75}
                    width={341}
                    height={261}
                    imgixParams={{ ar: '4:3', fit: 'crop', q: 75 }}
                    title={item.data.featured_image.alt || 'decorative image'}
                    className="rounded-lg shadow-sm shadow-neutral-500"
                    priority={index < 2}
                    fallbackAlt=""
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
