'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Cookies from 'js-cookie';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const adminToken = Cookies.get('admin_token');

      if (!adminToken && pathname !== '/admin/login') {
        console.log('No admin token found, redirecting to login');
        router.push('/admin/login');
        return;
      }

      if (adminToken) {
        console.log('Admin token found, user is authenticated');
        setIsAuthenticated(true);
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, [pathname, router]);

  // If on login page and authenticated, redirect to admin products
  useEffect(() => {
    if (isAuthenticated && pathname === '/admin/login') {
      console.log('Already authenticated, redirecting to admin products');
      router.push('/admin/products');
    }
  }, [isAuthenticated, pathname, router]);

  // Show login page without layout
  if (pathname === '/admin/login' && !isAuthenticated) {
    return children;
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  // Show admin layout only if authenticated
  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    Cookies.remove('admin_token', { path: '/' });
    setIsAuthenticated(false);
    router.push('/admin/login');
  };

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
                onClick={handleLogout}
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