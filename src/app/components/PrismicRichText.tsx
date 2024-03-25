import {
  PrismicRichText as BasePrismicRichText,
  JSXMapSerializer,
  PrismicRichTextProps,
} from '@prismicio/react'
import * as prismic from '@prismicio/client'
import Heading from '@/app/components/Heading'
import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const defaultComponents: JSXMapSerializer = {
  heading1: ({ children }) => {
    return (
      <Heading as="h1" size="6xl">
        {children}
      </Heading>
    )
  },
  heading2: ({ children }) => {
    return (
      <Heading as="h2" size="5xl">
        {children}
      </Heading>
    )
  },
  heading3: ({ children }) => {
    return (
      <Heading as="h3" size="4xl">
        {children}
      </Heading>
    )
  },
  heading4: ({ children }) => {
    return (
      <Heading as="h4" size="3xl">
        {children}
      </Heading>
    )
  },
  heading5: ({ children }) => {
    return (
      <Heading as="h5" size="2xl">
        {children}
      </Heading>
    )
  },
  heading6: ({ children }) => {
    return (
      <Heading as="h6" size="xl">
        {children}
      </Heading>
    )
  },
  paragraph: ({ children }) => {
    return (
      <p className="prose mx-auto my-4 self-start text-inherit lg:prose-lg xl:prose-xl lg:my-2">
        {children}
      </p>
    )
  },
  embed: ({ node }) => {
    return (
      <div className="mx-auto my-4 max-w-screen-sm overflow-hidden rounded-lg shadow-md shadow-skin-neutral lg:my-8">
        <div
          className="aspect-h-9 aspect-w-16"
          dangerouslySetInnerHTML={{ __html: node.oembed.html || '' }}
        />
      </div>
    )
  },
  image: ({ node }) => {
    return (
      <Link href={node.url} target="_blank">
        <Image
          src={node.url}
          alt={node.alt || ''}
          width={node.dimensions.width}
          height={node.dimensions.height}
          className="my-4 rounded-lg shadow-md shadow-skin-neutral md:my-6 lg:my-8 xl:my-10"
          title={node.alt || ''}
        />
      </Link>
    )
  },
  list: ({ children }) => {
    return (
      <ul className="prose list-disc lg:prose-lg xl:prose-xl">{children}</ul>
    )
  },
  listItem: ({ children }) => {
    return <li className="ml-4 md:ml-6 lg:ml-8 xl:ml-10">{children}</li>
  },
}

export const PrismicRichText = function PrismicRichText<
  LinkResolverFunction extends
    prismic.LinkResolverFunction<any> = prismic.LinkResolverFunction,
>({ components, ...props }: PrismicRichTextProps<LinkResolverFunction>) {
  return (
    <BasePrismicRichText
      components={{ ...defaultComponents, ...components }}
      {...props}
    />
  )
}
