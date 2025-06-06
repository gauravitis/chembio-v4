'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const adminToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('admin_token='));

      if (!adminToken && pathname !== '/admin/login') {
        router.push('/admin/login');
        return;
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [pathname, router]);

  if (pathname === '/admin/login') {
    return children;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-custom">
      {/* Admin Navigation */}
      <nav className="bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/admin/products">
                <Button
                  variant={pathname === '/admin/products' ? 'default' : 'ghost'}
                  className="px-3 py-2"
                >
                  Products
                </Button>
              </Link>
              <Link href="/admin/special-offers">
                <Button
                  variant={pathname === '/admin/special-offers' ? 'default' : 'ghost'}
                  className="px-3 py-2"
                >
                  Special Offers
                </Button>
              </Link>
            </div>
            <div className="flex items-center">
              <Button
                variant="ghost"
                className="text-red-500"
                onClick={() => {
                  document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                  router.push('/admin/login');
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}