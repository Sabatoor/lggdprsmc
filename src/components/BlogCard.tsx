import React, { ReactNode } from 'react'
import { cn } from '@/app/lib/cn'
import { BlogPostDocument, PortfolioDocument } from '../../prismicio-types'
import Link from 'next/link'
import { PrismicNextImage } from '@prismicio/next'
import { asText, isFilled } from '@prismicio/client'
import Heading from './Heading'
import { PrismicRichText } from './PrismicRichText'
import { Button } from './ui/button'

type BlogCardProps = {
  as?: React.ElementType
  className?: string
  blog_post: BlogPostDocument | PortfolioDocument
}

export default function BlogCard({
  as: Comp = 'li',
  blog_post,
  className,
  ...restProps
}: BlogCardProps) {
  return (
    <Comp className={cn('my-8 block lg:my-12', className)} {...restProps}>
      <article className="group">
        {isFilled.image(blog_post.data.featured_image) && (
          <Link
            href={`${blog_post.url}`}
            className="overflow-hidden focus:outline-none focus:ring-4 focus:ring-primary"
          >
            <PrismicNextImage
              field={blog_post.data.featured_image}
              className="w-full transform rounded-lg object-cover object-center shadow shadow-muted transition duration-700 ease-in-out group-hover:-translate-y-4"
              fallbackAlt=""
              title={`Read ${asText(blog_post.data.title)}`}
              width={576}
            />
          </Link>
        )}
        <div className="relative mx-auto -mt-4 max-w-lg rounded-lg bg-background p-4 shadow lg:-mt-16">
          <PrismicRichText
            field={blog_post.data.title}
            components={{
              heading1: ({ children }: { children: ReactNode }) => (
                <Heading as="h1" size="3xl" className="my-2 text-left">
                  {children}
                </Heading>
              ),
            }}
          />
          <p className="mb-4">{blog_post.data.excerpt}</p>
          <Button
            asChild
            variant="default"
            className="text-xs font-medium uppercase leading-normal text-neutral"
          >
            <Link href={`${blog_post.url}`}>
              {blog_post.type === 'blog_post'
                ? 'Continue Reading'
                : 'View Project'}
            </Link>
          </Button>
        </div>
      </article>
    </Comp>
  )
}
