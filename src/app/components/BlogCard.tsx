import React from 'react'
import { cn } from '@/app/lib/cn'
import { BlogPostDocument } from '../../../prismicio-types'
import Link from 'next/link'
import { PrismicNextImage } from '@prismicio/next'
import { asText, isFilled } from '@prismicio/client'
import Heading from './Heading'
import { PrismicRichText } from './PrismicRichText'

type BlogCardProps = {
  as?: React.ElementType
  className?: string
  blog_post: BlogPostDocument
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
            className="overflow-hidden focus:outline-none focus:ring-4 focus:ring-blue-600"
          >
            <PrismicNextImage
              field={blog_post.data.featured_image}
              className="w-full transform rounded-lg object-cover object-center 
              shadow shadow-skin-muted transition duration-700 ease-in-out group-hover:-translate-y-4"
              fallbackAlt=""
              title={`Read ${asText(blog_post.data.title)}`}
            />
          </Link>
        )}
        <div className="relative mx-auto -mt-4 max-w-lg rounded-lg bg-skin-base p-4 shadow-md shadow-skin-secondary lg:-mt-16">
          <PrismicRichText
            field={blog_post.data.title}
            components={{
              heading1: ({ children }) => (
                <Heading as="h1" size="3xl" className="my-2 text-left">
                  {children}
                </Heading>
              ),
            }}
          />
          <p className="mb-4">{blog_post.data.excerpt}</p>
          <Link
            href={`${blog_post.url}`}
            className="hover:text-color-neutral hover:shadow-color-accent inline-block rounded bg-skin-button-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-skin-base transition duration-150 ease-in hover:bg-skin-button-primary-hover hover:shadow"
          >
            Continue Reading
          </Link>
        </div>
      </article>
    </Comp>
  )
}
