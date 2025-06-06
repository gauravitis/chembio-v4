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
      {
        protocol: 'https',
        hostname: 'assets.thermofisher.com',
      },
      // Fisher Scientific
      {
        protocol: 'https',
        hostname: 'www.fishersci.com',
      },
      {
        protocol: 'https',
        hostname: 'www.fishersci.co.uk',
      },
      // VWR
      {
        protocol: 'https',
        hostname: 'www.vwr.com',
      },
      // TCI
      {
        protocol: 'https',
        hostname: 'www.tcichemicals.com',
      },
      // Alfa Aesar
      {
        protocol: 'https',
        hostname: 'www.alfa.com',
      },
      // Avantor
      {
        protocol: 'https',
        hostname: 'www.avantorsciences.com',
      },
      // Common image hosting
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  // Remove serverActions as it's available by default in Next.js 14
  env: {
    // Server-side Firebase Admin variables
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,

    // Client-side Firebase variables
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,

    // Razorpay variables
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
  },
}

module.exports = nextConfig
