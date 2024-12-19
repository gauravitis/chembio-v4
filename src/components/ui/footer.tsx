'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-black/80 backdrop-blur-lg text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-400 text-transparent bg-clip-text mb-4">
              ChemBio Lifesciences
            </h3>
            <p className="text-gray-400 max-w-md">
              Your trusted partner in scientific research, providing high-quality chemicals
              and laboratory equipment for research institutions worldwide.
            </p>
            <div className="mt-4">
              <p className="text-gray-400">
                L-10 Himalya Tower, Gyankhand 2,<br />
                Indirapuram, Ghaziabad<br />
                U.P, India - 201014
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:text-right">
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <nav className="space-y-2">
              <Link href="/about" className="block text-gray-400 hover:text-white transition-colors">
                About Us
              </Link>
              <Link href="/products" className="block text-gray-400 hover:text-white transition-colors">
                Products
              </Link>
              <Link href="/team" className="block text-gray-400 hover:text-white transition-colors">
                Our Team
              </Link>
              <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} ChemBio Lifesciences. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
