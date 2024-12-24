/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lab.honeywell.com',
        pathname: '/shop/media/catalog/product/**',
      },
      {
        protocol: 'https',
        hostname: 'shop.brand.co.in',
        pathname: '/media/catalog/product/**',
      },
      {
        protocol: 'https',
        hostname: '*.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/**',
      }
    ],
    unoptimized: true,
    domains: ['firebasestorage.googleapis.com'],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  output: 'export',
}
