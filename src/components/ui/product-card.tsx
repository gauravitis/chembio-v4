import { Product } from '@/data/products';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, ShoppingCart } from 'lucide-react';
import { QuickView } from './quick-view';
import { useCart } from '@/contexts/cart-context';
import { useAuth } from '@/contexts/auth-context';

interface ProductCardProps {
  product: Product;
  view: 'grid' | 'list';
}

// Function to format price in Indian Rupees
function formatIndianPrice(price: number) {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatter.format(price);
}

// Function to clean image URL
function getCleanImageUrl(url: string) {
  if (url.startsWith('/https:')) {
    return url.substring(1);
  }
  return url;
}

export function ProductCard({ product, view }: ProductCardProps) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const { addItem } = useCart();
  const { user } = useAuth();

  const handleAddToCart = () => {
    if (!user) {
      window.location.href = '/auth/login';
      return;
    }
    addItem(product);
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-accent-blue/10 transition-all duration-300 ${
          view === 'list' ? 'grid grid-cols-1 md:grid-cols-4 gap-4' : ''
        }`}
      >
        {/* Product Image Container */}
        <div className={`relative ${view === 'list' ? 'h-48 md:h-full' : 'aspect-square'}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Image
            src={getCleanImageUrl(product.image)}
            alt={product.name}
            fill
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            sizes={view === 'list' ? '(max-width: 768px) 100vw, 25vw' : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
          />
          
          {/* Quick Actions Overlay */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => setIsQuickViewOpen(true)}
              className="p-3 rounded-full bg-white/10 backdrop-blur-sm shadow-lg transform hover:scale-110 transition-all duration-300"
              title="Quick View"
            >
              <Eye className="w-5 h-5 text-accent-blue" />
            </button>
            <button
              onClick={handleAddToCart}
              className="p-3 rounded-full bg-white/10 backdrop-blur-sm shadow-lg transform hover:scale-110 transition-all duration-300"
              title="Add to Cart"
            >
              <ShoppingCart className="w-5 h-5 text-accent-purple" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className={`p-4 space-y-3 ${view === 'list' ? 'md:col-span-3' : ''}`}>
          {/* Catalogue ID and Price */}
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-xs px-2 py-1 bg-gradient-to-r from-accent-blue/10 to-accent-purple/10 rounded-full text-accent-blue font-medium">
                {product.id}
              </span>
              {product.packSize && (
                <div className="text-xs text-gray-400">
                  Pack Size: {product.packSize}
                </div>
              )}
            </div>
            <span className="text-accent-purple font-semibold">
              {formatIndianPrice(product.price)}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="font-medium text-gray-100 group-hover:text-accent-blue transition-colors duration-300 line-clamp-2">
            {product.name}
          </h3>

          {/* CAS Number and Description */}
          <div className={view === 'list' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : ''}>
            {product.casNumber && (
              <p className="text-sm text-gray-400">
                CAS: {product.casNumber}
              </p>
            )}
            {view === 'list' && (
              <p className="text-sm text-gray-300 line-clamp-2">
                {product.description}
              </p>
            )}
          </div>
        </div>
      </motion.div>

      <QuickView
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
}
