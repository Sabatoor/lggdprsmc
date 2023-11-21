import { createClient } from '@/prismicio'
import { asDate } from '@prismicio/client'
export default async function sitemap() {
  const client = createClient()
  const settings = await client.getSingle('settings')
  const pages = await client.getAllByType('page')
  const sitemapPages = pages.map(page => ({
    url: `https://${settings.data.domain || `example.com`}${page.url}`,
    lastModified: asDate(page.last_publication_date),
  }))
  const homepage = await client.getSingle('homepage')
  const sitemapHomepage = {
    url: `https://${settings.data.domain || `example.com`}${homepage.url}`,
    lastModified: asDate(homepage.last_publication_date),
  }
  const posts = await client.getAllByType('blog_post')
  const sitemapPosts = posts.map(post => ({
    url: `https://${settings.data.domain || `example.com`}${post.url}`,
    lastModified: asDate(post.last_publication_date),
  }))
  const portfolios = await client.getAllByType('portfolio')
  const sitemapPortfolios = portfolios.map(portfolio => ({
    url: `https://${settings.data.domain || `example.com`}${portfolio.url}`,
    lastModified: asDate(portfolio.last_publication_date),
  }))
  const products = await client.getAllByType('product')
  const sitemapProducts = products.map(product => ({
    url: `https://${settings.data.domain || `example.com`}${product.url}`,
    lastModified: asDate(product.last_publication_date),
  }))
  const brands = await client.getAllByType('brand')
  const sitemapBrands = brands.map(brand => ({
    url: `https://${settings.data.domain || `example.com`}${brand.url}`,
    lastModified: asDate(brand.last_publication_date),
  }))
  const productTypes = await client.getAllByType('product_type')
  const sitemapProductTypes = productTypes.map(product_type => ({
    url: `https://${settings.data.domain || `example.com`}${product_type.url}`,
    lastModified: asDate(product_type.last_publication_date),
  }))
  return [
    sitemapHomepage,
    ...sitemapPages,
    ...sitemapPosts,
    ...sitemapPortfolios,
    ...sitemapProducts,
    ...sitemapBrands,
    ...sitemapProductTypes,
  ]
}
