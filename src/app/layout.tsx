import type { Metadata } from 'next';
import { RootLayout } from '@/components/root-layout';
import './globals.css';

export const metadata: Metadata = {
  title: 'Chembio',
  description: 'Leading supplier of chemicals and laboratory equipment',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootLayout>{children}</RootLayout>;
}
