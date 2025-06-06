'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, Tag, Settings, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutGrid
  },
  {
    name: 'Products',
    href: '/admin/products',
    icon: Package
  },
  {
    name: 'Special Offers',
    href: '/admin/special-offers',
    icon: Tag
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings
  }
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gradient-custom">
      {/* Navigation Header */}
      <nav className="border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="container-centered">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/admin" className="text-xl font-semibold text-white">
                Admin Panel
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
                View Site
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container-centered py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 shrink-0">
            <nav className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                      isActive
                        ? 'bg-white/10 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 