'use client'
import React from 'react'
import { BlogPostDocument, PortfolioDocument } from '../../../prismicio-types'
import { PrismicNextImage } from '@prismicio/next'
import { asDate, asText } from '@prismicio/client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import WhileInView from '@/components/WhileInView'

interface RecentsListProps {
  posts: Array<BlogPostDocument | PortfolioDocument>
}
const RecentsList: React.FC<RecentsListProps> = ({ posts }) => {
  return (
    <div>
      <ul className="my-4 flex w-full flex-wrap justify-evenly gap-4 lg:my-8 lg:gap-8">
        {posts.length > 0 &&
          posts.map(post => {
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
              <WhileInView key={post.id} direction="up">
                <li className="group flex min-w-[250px] max-w-sm flex-col rounded-lg bg-muted shadow transition duration-200 ease-in-out hover:bg-background hover:shadow-md">
                  <div className="relative h-24 overflow-hidden rounded-t-lg">
                    <PrismicNextImage
                      field={post.data.featured_image}
                      fill
                      className="object-cover transition duration-200 ease-in-out group-hover:opacity-75"
                      sizes="(min-width: 460px) 384px, calc(82.86vw + 19px)"
                    />
                  </div>
                  <p className="p-3 text-center text-xs font-bold text-neutral">
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
                      <Badge className="cursor-default bg-neutral hover:bg-neutral">
                        {postTags[serviceTagIndex]}
                      </Badge>
                    </div>
                  )}
                  <p className="prose p-3">{post.data.excerpt}</p>
                  <div className="mt-auto flex justify-center pb-3 lg:pb-6">
                    <Button
                      asChild
                      className="font-bold text-neutral"
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
              </WhileInView>
            )
          })}
      </ul>
    </div>
  )
}

export default RecentsList
