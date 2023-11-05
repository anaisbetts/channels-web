/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'image.tmdb.org' },
      { protocol: 'http', hostname: 'fanc.tmsimg.com' },
      { protocol: 'https', hostname: 'image.tmdb.org' },
      { protocol: 'https', hostname: 'tmsimg.fancybits.co' },
      { protocol: 'http', hostname: '192.168.4.10', port: '8089' },
    ],
  },
  swcMinify: true,
  output: 'standalone',
}

module.exports = nextConfig
