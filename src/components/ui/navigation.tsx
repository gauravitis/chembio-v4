'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShoppingCart, User } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { useCart } from '@/contexts/cart-context';

const links = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
  { href: '/team', label: 'Our Team' },
  { href: '/contact', label: 'Contact' },
];

export function Navigation() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { items } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/30">
      <nav className="container-centered flex items-center justify-between h-16">
        <Link href="/" className="font-bold text-xl text-blue-600">
          ChemBio
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {label}
                {isActive && (
                  <motion.div
                    layoutId="bubble"
                    className="absolute inset-0 bg-blue-100 rounded-lg -z-10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <Link 
            href="/cart" 
            className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>

          {/* Profile/Auth Button */}
          {user ? (
            <Link
              href="/profile"
              className="flex items-center gap-2 p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <User className="w-6 h-6" />
              <span className="text-sm font-medium hidden sm:block">
                {user.displayName || user.email?.split('@')[0]}
              </span>
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
