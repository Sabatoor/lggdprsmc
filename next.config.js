/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.prismic.io' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'prismic-io.s3.amazonaws.com' },
      { protocol: 'https', hostname: 'seal-mbc.bbb.org' },
    ],
  },
}

module.exports = nextConfig
