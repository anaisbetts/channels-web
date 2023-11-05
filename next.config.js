/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'image.tmdb.org' },
      { protocol: 'http', hostname: 'fanc.tmsimg.com' },
      { protocol: 'https', hostname: 'image.tmdb.org' },
      { protocol: 'https', hostname: 'tmsimg.fancybits.co' },
    ],
  },
  swcMinify: true,
  output: 'standalone',
}

module.exports = nextConfig
