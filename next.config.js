/** @type {import('next').NextConfig} */
const nextConfig = {
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
  },
  poweredByHeader: false,
  reactStrictMode: true,
  output: 'standalone',
};

export default nextConfig;
