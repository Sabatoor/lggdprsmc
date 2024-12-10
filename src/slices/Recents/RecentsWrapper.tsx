import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { createClient } from '@/prismicio'
import * as prismic from '@prismicio/client'
import { asDate, asText } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import Link from 'next/link'
import RecentsList from './RecentsList'

type RecentWrapperProps = {
  type: 'blog_post' | 'portfolio'
  location?:
    | 'Burnaby'
    | 'Coquitlam'
    | 'Delta'
    | 'Langley'
    | 'Maple Ridge'
    | 'New Westminster'
    | 'North Vancouver'
    | 'Pitt Meadows'
    | 'Richmond'
    | 'Surrey'
    | 'Vancouver'
    | 'White Rock'
    | undefined
    | null
  service?: 'All' | 'Installation' | 'Repair' | undefined | null
}

const RecentsWrapper = async ({
  type,
  location,
  service,
}: RecentWrapperProps): Promise<JSX.Element> => {
  const client = createClient()

  let posts
  if (!location) {
    posts = await client.getByType(type, {
      page: 1,
      pageSize: 3,
      orderings: {
        field: 'my.portfolio.date_published',
        direction: 'desc',
      },
    })
  } else {
    let tags = []
    if (location !== undefined && location !== null) {
      tags.push(location)
    }
    service !== 'All' &&
      service !== null &&
      service !== undefined &&
      tags.push(service)
    posts = await client.getByType(type, {
      page: 1,
      pageSize: 3,
      orderings: {
        field: 'my.portfolio.date_published',
        direction: 'desc',
      },
      filters: [prismic.filter.at('document.tags', tags)],
    })
  }
  if (posts.results.length > 0) {
    return <RecentsList posts={posts.results} />
  } else {
    return <div>No Posts to Show</div>
  }
}

export default RecentsWrapper
