import type { Metadata } from 'next';
import { RootLayout } from '@/components/root-layout';
import './globals.css';

export const metadata: Metadata = {
  title: 'Chembio Lifesciences',
  description: 'Enhancing Online Presence and Product Showcase',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootLayout>{children}</RootLayout>;
}
