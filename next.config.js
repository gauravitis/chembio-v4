/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Sigma Aldrich
      {
        protocol: 'https',
        hostname: 'www.sigmaaldrich.com',
      },
      {
        protocol: 'https',
        hostname: 'media.sigmaaldrich.com',
      },
      {
        protocol: 'https',
        hostname: 'wscpimg.sial.com',
      },
      // SRL
      {
        protocol: 'https',
        hostname: 'www.srlchem.com',
      },
      {
        protocol: 'https',
        hostname: 'www.srlchemicals.com',
      },
      // Himedia
      {
        protocol: 'https',
        hostname: 'www.himedialabs.com',
      },
      {
        protocol: 'https',
        hostname: 'himedialabs.com',
      },
      // Honeywell
      {
        protocol: 'https',
        hostname: 'lab.honeywell.com',
        pathname: '/shop/media/catalog/product/**',
      },
      // Merck
      {
        protocol: 'https',
        hostname: 'www.merckmillipore.com',
      },
      {
        protocol: 'https',
        hostname: 'www.merck.com',
      },
      // Thermo Fisher
      {
        protocol: 'https',
        hostname: 'www.thermofisher.com',
      },
      // Brand
      {
        protocol: 'https',
        hostname: 'shop.brand.co.in',
        pathname: '/media/catalog/product/**',
      },
      // Cloudinary
      {
        protocol: 'https',
        hostname: '*.cloudinary.com',
        pathname: '/**',
      },
      // Firebase Storage
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/**',
      },
    ],
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
  },
  poweredByHeader: false,
  reactStrictMode: true,
}

module.exports = nextConfig
