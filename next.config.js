/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lab.honeywell.com',
        pathname: '/shop/media/catalog/product/**',
      },
    ],
  },
  // Improve build performance
  swcMinify: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // Optimize output
  output: 'standalone',
}

module.exports = nextConfig
