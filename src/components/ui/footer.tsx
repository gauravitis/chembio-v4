'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative bg-gradient-custom border-t border-white/10">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
      <div className="relative max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#7BA4F4] to-[#B490F5] text-transparent bg-clip-text">
              ChemBio Lifesciences
            </h3>
            <p className="text-gray-400">
              Your trusted partner in scientific research, providing high-quality chemicals
              and laboratory equipment for research institutions worldwide.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#7BA4F4] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#7BA4F4] transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#7BA4F4] transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#7BA4F4] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
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
              <Link href="/privacy" className="block text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-gray-400 hover:text-white transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/refunds" className="block text-gray-400 hover:text-white transition-colors">
                Cancellation and Refunds
              </Link>
              <Link href="/shipping" className="block text-gray-400 hover:text-white transition-colors">
                Shipping and Delivery
              </Link>
            </nav>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Products</h4>
            <nav className="space-y-2">
              <Link href="/products?category=chemicals" className="block text-gray-400 hover:text-white transition-colors">
                Chemical Reagents
              </Link>
              <Link href="/products?category=equipment" className="block text-gray-400 hover:text-white transition-colors">
                Lab Equipment
              </Link>
              <Link href="/products?category=diagnostic" className="block text-gray-400 hover:text-white transition-colors">
                Diagnostic Tools
              </Link>
              <Link href="/products?category=consumables" className="block text-gray-400 hover:text-white transition-colors">
                Research Consumables
              </Link>
              <Link href="/products?category=safety" className="block text-gray-400 hover:text-white transition-colors">
                Safety Equipment
              </Link>
              <Link href="/products?category=glassware" className="block text-gray-400 hover:text-white transition-colors">
                Laboratory Glassware
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#7BA4F4] mt-1" />
                <p className="text-gray-400">
                  L-10 Himalya Tower, Gyankhand 2,<br />
                  Indirapuram, Ghaziabad<br />
                  U.P, India - 201014
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#7BA4F4]" />
                <a href="tel:+91-120-4909400" className="text-gray-400 hover:text-white transition-colors">
                  +91 120 4909400
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#7BA4F4]" />
                <a href="mailto:sales.chembio@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                  sales.chembio@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-center md:text-left">
              {new Date().getFullYear()} ChemBio Lifesciences. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-gray-500 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-gray-500 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-gray-500 hover:text-white text-sm transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
