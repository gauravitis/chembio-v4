import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'react-hot-toast';
import { Navigation } from '@/components/ui/navigation';
import { Providers } from '@/components/providers';
import { siteConfig } from './metadata';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: 'Welcome to Chembio Lifesciences - Your trusted partner in scientific research. We provide high-quality chemicals, laboratory equipment, and research supplies.',
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: 'Chembio Lifesciences - Scientific Research Supplies & Equipment',
    description: 'Leading supplier of laboratory chemicals, research equipment, and diagnostic tools. Discover our comprehensive range of high-quality scientific supplies.',
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@chembiolife',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
            <Navigation />
            <main className="flex-1 w-full">
              {children}
            </main>
          </div>
          <Toaster position="bottom-right" />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
