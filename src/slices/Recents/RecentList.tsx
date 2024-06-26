import { Button } from '@/components/ui/button'
import { createClient } from '@/prismicio'
import { asDate, asText } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import Link from 'next/link'
import React from 'react'

type RecentListProps = {
  type: 'blog_post' | 'portfolio'
}

const RecentList = async ({ type }: RecentListProps): Promise<JSX.Element> => {
  const client = createClient()
  const posts = await client.getByType(type, {
    page: 1,
    pageSize: 3,
    orderings: {
      field: 'my.portfolio.date_published',
      direction: 'desc',
    },
  })
  if (posts.results.length > 0) {
    return (
      <ul className="my-4 flex w-full flex-wrap justify-evenly gap-4 lg:my-8 lg:gap-8">
        {posts.results.map(post => {
          return (
            <li
              key={post.id}
              className="bg-muted hover:bg-background group flex min-w-[250px] max-w-sm flex-col rounded-lg shadow transition duration-200 ease-in-out hover:shadow-md"
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
                {asDate(post.data.date_published)?.toLocaleDateString('en-CA', {
                  weekday: 'long',
                  month: 'long',
                  day: '2-digit',
                  year: 'numeric',
                  timeZone: 'UTC',
                })}
              </p>
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
