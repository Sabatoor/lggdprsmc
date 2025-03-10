import {
  createClient as baseCreateClient,
  type ClientConfig,
  type Route,
} from '@prismicio/client'
import { enableAutoPreviews } from '@prismicio/next'
import config from '../slicemachine.config.json'

/**
 * The project's Prismic repository name.
 */
export const repositoryName = config.repositoryName

/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 */
// TODO: Update the routes array to match your project's route structure.
const routes: Route[] = [
  {
    type: 'homepage',
    path: '/',
  },
  {
    type: 'location',
    path: '/locations/:uid',
  },
  {
    type: 'brand',
    path: '/products/:uid',
  },
  {
    type: 'page',
    path: '/:uid',
  },
  {
    type: 'product_type',
    path: '/products/:uid',
  },
  {
    type: 'product',
    resolvers: {
      type: 'product_type',
    },
    path: '/products/:type/:uid',
  },
  {
    type: 'product',
    resolvers: {
      brand: 'brand',
    },
    path: '/products/:brand/:uid',
  },
  {
    type: 'blog_post',
    path: '/blog/:uid',
  },
  {
    type: 'portfolio',
    path: '/portfolio/:uid',
  },
  {
    type: 'service',
    path: '/services/:uid',
  },
]

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (config: ClientConfig = {}) => {
  const client = baseCreateClient(repositoryName, {
    routes,
    fetchOptions:
      process.env.NODE_ENV === 'production'
        ? { next: { tags: ['prismic'] }, cache: 'force-cache' }
        : { next: { revalidate: 5 } },
    ...config,
  })

  enableAutoPreviews({
    client,
  })

  return client
}
