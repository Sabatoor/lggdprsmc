import { createClient } from '@/prismicio'
import { asDate, isFilled } from '@prismicio/client'

export default async function sitemap() {
  const client = createClient()

  // Fetch all data in parallel
  const [
    settings,
    homepage,
    pages,
    posts,
    portfolios,
    products,
    brands,
    productTypes,
    locations,
  ] = await Promise.all([
    client.getSingle('settings'),
    client.getSingle('homepage'),
    client.getAllByType('page'),
    client.getAllByType('blog_post'),
    client.getAllByType('portfolio'),
    client.getAllByType('product'),
    client.getAllByType('brand'),
    client.getAllByType('product_type'),
    client.getAllByType('location'),
  ])

  const domain = settings.data.domain || 'example.com'

  const sitemapHomepage = {
    url: `https://${domain}${homepage.url}`,
    lastModified: asDate(homepage.last_publication_date),
  }

  // Generic function to map documents to sitemap entries
  const mapToSitemapEntries = (docs: any[]) => {
    return docs.map(doc => ({
      url: `https://${domain}${doc.url}`,
      lastModified: asDate(doc.last_publication_date),
    }))
  }

  const sitemapPages = pages
    .filter(page => page.data.index !== false)
    .map(page => ({
      url: `https://${domain}${page.url}`,
      lastModified: asDate(page.last_publication_date),
    }))

  const sitemapPosts = mapToSitemapEntries(posts)
  const sitemapPortfolios = mapToSitemapEntries(portfolios)
  const sitemapProducts = mapToSitemapEntries(products)
  const sitemapBrands = mapToSitemapEntries(brands)
  const sitemapProductTypes = mapToSitemapEntries(productTypes)
  const sitemapLocations = mapToSitemapEntries(locations)

  return [
    sitemapHomepage,
    ...sitemapPages,
    ...sitemapPosts,
    ...sitemapPortfolios,
    ...sitemapProducts,
    ...sitemapBrands,
    ...sitemapProductTypes,
    ...sitemapLocations,
  ]
}
