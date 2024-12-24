/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lab.honeywell.com'],
  },
  experimental: {
    serverActions: true,
  },
  env: {
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
  },
}

module.exports = nextConfig
