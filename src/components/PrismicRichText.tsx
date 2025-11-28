import {
  PrismicRichText as BasePrismicRichText,
  JSXMapSerializer,
  PrismicRichTextProps as BasePrismicRichTextProps,
} from '@prismicio/react'
import * as prismic from '@prismicio/client'
import Heading from '@/components/Heading'
import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

const defaultComponents: JSXMapSerializer = {
  heading1: ({ children }: { children: ReactNode }) => {
    return (
      <Heading as="h1" size="6xl">
        {children}
      </Heading>
    )
  },
  heading2: ({ children }: { children: ReactNode }) => {
    return (
      <Heading as="h2" size="5xl">
        {children}
      </Heading>
    )
  },
  heading3: ({ children }: { children: ReactNode }) => {
    return (
      <Heading as="h3" size="4xl">
        {children}
      </Heading>
    )
  },
  heading4: ({ children }: { children: ReactNode }) => {
    return (
      <Heading as="h4" size="3xl">
        {children}
      </Heading>
    )
  },
  heading5: ({ children }: { children: ReactNode }) => {
    return (
      <Heading as="h5" size="2xl">
        {children}
      </Heading>
    )
  },
  heading6: ({ children }: { children: ReactNode }) => {
    return (
      <Heading as="h6" size="xl">
        {children}
      </Heading>
    )
  },
  paragraph: ({ children }: { children: ReactNode }) => {
    return (
      <p className="mx-auto my-4 self-start text-inherit lg:my-6">{children}</p>
    )
  },
  embed: ({ node }) => {
    return (
      <div className="mx-auto max-w-(--breakpoint-sm) overflow-hidden rounded shadow-xl">
        <div
          className="aspect-video w-full [&>iframe]:h-full [&>iframe]:w-full [&>iframe]:border-0"
          dangerouslySetInnerHTML={{ __html: node.oembed.html || '' }}
        />
      </div>
    )
  },
  image: ({ node }) => {
    if (node.linkTo) {
      return (
        <div className="flex justify-center">
          <Link href={node.linkTo.url || '#'} target="_blank">
            <Image
              src={node.url}
              alt={node.alt || ''}
              width={node.dimensions.width}
              height={node.dimensions.height}
              className="my-4 rounded-lg shadow-sm md:my-6 lg:my-8 xl:my-10"
              title={node.alt || ''}
            />
          </Link>
        </div>
      )
    } else {
      return (
        <div className="flex justify-center">
          <Link href={node.url} target="_blank">
            <Image
              src={node.url}
              alt={node.alt || ''}
              width={node.dimensions.width}
              height={node.dimensions.height}
              className="my-4 rounded-lg shadow-sm md:my-6 lg:my-8 xl:my-10"
              title={node.alt || ''}
            />
          </Link>
        </div>
      )
    }
  },
  list: ({ children }: { children: ReactNode }) => {
    return <ul className="mx-auto list-disc">{children}</ul>
  },
  listItem: ({ children }: { children: ReactNode }) => {
    return <li className="ml-4 md:ml-6 lg:ml-8 xl:ml-10">{children}</li>
  },
}

// Define PrismicRichTextProps as a generic type
interface PrismicRichTextProps<
  LinkResolverFunction extends prismic.LinkResolverFunction =
    prismic.LinkResolverFunction,
> extends BasePrismicRichTextProps {
  components?: Record<string, React.ComponentType<any>>
  // Add other props as needed
}

export const PrismicRichText = function PrismicRichText<
  LinkResolverFunction extends prismic.LinkResolverFunction<any> =
    prismic.LinkResolverFunction,
>({ components, ...props }: PrismicRichTextProps<LinkResolverFunction>) {
  return (
    <BasePrismicRichText
      components={{ ...defaultComponents, ...components }}
      {...props}
    />
  )
}
