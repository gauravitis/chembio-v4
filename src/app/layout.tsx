import type { Metadata } from 'next';
import { RootLayout } from '@/components/root-layout';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ChemBio',
  description: 'Your trusted partner in laboratory chemicals and equipment',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RootLayout>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <Toaster position="bottom-right" />
          <Analytics />
        </body>
      </html>
    </RootLayout>
  );
}
