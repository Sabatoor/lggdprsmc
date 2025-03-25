import { Button } from '@/components/ui/button'
import { createClient } from '@/prismicio'
import { asDate, asText } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import Link from 'next/link'
import React from 'react'
import * as prismic from '@prismicio/client'
import { Badge } from '@/components/ui/badge'

type RecentListProps = {
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
    | 'West Vancouver'
    | 'White Rock'
    | undefined
    | null
  service?: 'All' | 'Installation' | 'Repair' | undefined | null
}

const RecentList = async ({
  type,
  location,
  service,
}: RecentListProps): Promise<React.JSX.Element> => {
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
    return (
      <ul className="my-4 flex w-full flex-wrap justify-evenly gap-4 lg:my-8 lg:gap-8">
        {posts.results.length > 0 &&
          posts.results.map(post => {
            let postTags = post.tags
            let hasServiceTag =
              postTags.indexOf('Installation') > -1 ||
              postTags.indexOf('Repair') > -1
            let serviceTagIndex
            if (postTags.indexOf('Installation') > -1) {
              serviceTagIndex = postTags.indexOf('Installation')
            } else {
              serviceTagIndex = postTags.indexOf('Repair')
            }
            return (
              <li
                key={post.id}
                className="group bg-muted hover:bg-background flex max-w-sm min-w-[250px] flex-col rounded-lg shadow-sm transition duration-200 ease-in-out hover:shadow-md"
              >
                <div className="relative h-24 overflow-hidden rounded-t-lg">
                  <PrismicNextImage
                    field={post.data.featured_image}
                    fill
                    className="object-cover transition duration-200 ease-in-out group-hover:opacity-75"
                    sizes="(min-width: 460px) 384px, calc(82.86vw + 19px)"
                  />
                </div>
                <p className="text-neutral p-3 text-center text-xs font-bold">
                  {asDate(post.data.date_published)?.toLocaleDateString(
                    'en-CA',
                    {
                      weekday: 'long',
                      month: 'long',
                      day: '2-digit',
                      year: 'numeric',
                      timeZone: 'UTC',
                    },
                  )}
                </p>
                {hasServiceTag && (
                  <div className="flex justify-center">
                    <Badge className="bg-neutral hover:bg-neutral cursor-default">
                      {postTags[serviceTagIndex]}
                    </Badge>
                  </div>
                )}
                <p className="prose p-3">{post.data.excerpt}</p>
                <div className="mt-auto flex justify-center pb-3 lg:pb-6">
                  <Button
                    asChild
                    className="text-neutral font-bold"
                    variant="default"
                  >
                    <Link href={post.url || '/'}>
                      Read More{' '}
                      <span className="sr-only">
                        about {asText(post.data.title)}
                      </span>
                    </Link>
                  </Button>
                </div>
              </li>
            )
          })}
      </ul>
    )
  } else {
    return <div>No Posts to Show</div>
  }
}

export default RecentList
