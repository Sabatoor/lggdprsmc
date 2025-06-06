import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SliceZone } from '@prismicio/react'
import * as prismic from '@prismicio/client'
import { createClient } from '@/prismicio'
import { components } from '@/slices'
import { Graph } from 'schema-dts'
import Section from '@/components/Section'
import BlogCard from '@/components/BlogCard'
import Pagination from '@/components/Pagination'
import Heading from '@/components/Heading'

type Params = { uid: string }
type SearchParams = {
  [key: string]: string | string[] | undefined
}

export default async function Page(props: {
  params: Promise<Params>
  searchParams: Promise<SearchParams>
}) {
  const searchParams = await props.searchParams
  const params = await props.params
  const client = createClient()
  const pageNumber = { page: Number(searchParams['page']) || 1 }
  const type = { type: searchParams['type'] }
  const page = await client
    .getByUID('page', params.uid, {
      fetchLinks: [
        'brand.description',
        'brand.logo',
        'brand.title',
        'product.featured_image',
        'product_type.title',
        'product_type.description',
        'product_type.featured_image',
        'service.title',
        'service.excerpt',
        'location.title',
        'location.featured_image',
        'location.meta_description',
      ],
    })
    .catch(() => notFound())
  let posts
  if (page.uid === 'blog') {
    posts = await client.getByType('blog_post', {
      orderings: {
        field: 'document.first_publication_date',
        direction: 'desc',
      },
      page: pageNumber.page,
      pageSize: 5,
    })
  } else if (page.uid === 'portfolio') {
    posts = await client.getByType('portfolio', {
      orderings: {
        field: 'my.portfolio.date_published',
        direction: 'desc',
      },
      page: pageNumber.page,
      pageSize: 5,
    })
  }
  const settings = await client.getSingle('settings')

  const jsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `https://${settings.data.domain || `example.com`}/#${page.uid}`,
        about: page.data.meta_description || undefined,
        accountablePerson: {
          '@id': `https://${settings.data.domain || `example.com`}/#lggd`,
        },
        author: {
          '@id': `https://${settings.data.domain || `example.com`}/#lggd`,
        },
        copyrightHolder: {
          '@id': `https://${settings.data.domain || `example.com`}/#lggd`,
        },
        datePublished: page.first_publication_date,
        dateModified: page.last_publication_date,
        image:
          page.data.meta_image.url ||
          settings.data.site_meta_image.url ||
          undefined,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {page.data.slices[0]?.slice_type !== 'hero' ? (
        <Heading as="h1" size="5xl" className="my-6 lg:my-8 lg:text-center">
          {prismic.asText(page.data.title)}
        </Heading>
      ) : null}
      <SliceZone
        slices={page.data.slices}
        components={components}
        context={{ pageNumber, type }}
      />
      {/* CODE FOR BLOG PAGE ONLY */}
      {(page.uid === 'blog' || page.uid === 'portfolio') && (
        <Section width="md" className="flex-col">
          {posts && posts.results.length > 0 ? (
            <ul className="px-4 lg:px-0">
              {posts.results.map(post => {
                return (
                  <BlogCard
                    key={post.id}
                    blog_post={post}
                    className="mx-auto max-w-xl"
                  />
                )
              })}
            </ul>
          ) : (
            <p className="prose lg:prose-lg xl:prose-xl mx-auto">
              No posts have been published yet. Please check back again soon!
            </p>
          )}
          {(posts?.next_page !== null || posts?.prev_page !== null) && (
            <Pagination
              hasNextPage={posts?.next_page !== null}
              hasPrevPage={posts?.prev_page !== null}
              totalPages={Number(posts?.total_pages)}
            />
          )}
        </Section>
      )}
      {/* END BLOG PAGE CODE */}
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<Params>
}): Promise<Metadata> {
  const params = await props.params
  const client = createClient()
  const page = await client.getByUID('page', params.uid).catch(() => notFound())
  const settings = await client.getSingle('settings')

  return {
    title: `${prismic.asText(page.data.title) || page.data.meta_title} • ${
      settings.data.site_title
    }`,
    description:
      page.data.meta_description || settings.data.site_meta_description,
    openGraph: {
      images: [
        page.data.meta_image.url || settings.data.site_meta_image.url || '',
      ],
    },
    alternates: {
      canonical: page.url,
    },
    robots: {
      index: !page.data.index ? false : true,
      googleBot: {
        index: !page.data.index ? false : true,
      },
    },
  }
}

export async function generateStaticParams() {
  const client = createClient()
  const pages = await client.getAllByType('page')

  return pages.map(page => {
    return { uid: page.uid }
  })
}
