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
      },
      {
        protocol: 'https',
        hostname: 'wscpimg.sial.com',
        pathname: '/**',
      },
    ],
    unoptimized: true,
    domains: ['firebasestorage.googleapis.com', 'wscpimg.sial.com'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      }
    }
    
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ['@firebase/auth', 'undici']
  }
}

export default nextConfig
