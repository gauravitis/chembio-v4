import { Product } from '@/data/products';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Send, ShoppingCart } from 'lucide-react';
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

// Animation variants
const cardVariants = {
  grid: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3
    }
  },
  list: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2
    }
  }
};

export function ProductCard({ product, view }: ProductCardProps) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const { addItem } = useCart();
  const { user } = useAuth();

  const handleAddToCart = () => {
    if (!user) {
      // Show login modal or redirect to login
      window.location.href = '/auth/login';
      return;
    }
    addItem(product);
  };

  return (
    <>
      <motion.div
        layout
        variants={cardVariants}
        initial="exit"
        animate={view}
        exit="exit"
        whileHover={{ y: -5 }}
        className={`group relative bg-white/90 backdrop-blur-lg rounded-xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200/30 ${
          view === 'list' ? 'grid grid-cols-1 md:grid-cols-4 gap-4' : ''
        }`}
      >
        {/* Product Image Container */}
        <div className={`relative ${view === 'list' ? 'h-48 md:h-full' : 'aspect-square'}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
              className="p-3 rounded-full bg-white/90 hover:bg-white shadow-lg transform hover:scale-110 transition-all duration-300"
              title="Quick View"
            >
              <Eye className="w-5 h-5 text-blue-600" />
            </button>
            <button
              onClick={handleAddToCart}
              className="p-3 rounded-full bg-white/90 hover:bg-white shadow-lg transform hover:scale-110 transition-all duration-300"
              title="Add to Cart"
            >
              <ShoppingCart className="w-5 h-5 text-purple-600" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className={`p-4 space-y-3 ${view === 'list' ? 'md:col-span-3' : ''}`}>
          {/* Catalogue ID and Price */}
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-xs px-2 py-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full text-blue-700 font-medium">
                {product.id}
              </span>
              {product.packSize && (
                <div className="text-xs text-gray-600">
                  Pack Size: {product.packSize}
                </div>
              )}
            </div>
            <span className="text-purple-600 font-semibold">
              {formatIndianPrice(product.price)}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
            {product.name}
          </h3>

          {/* CAS Number and Description */}
          <div className={view === 'list' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : ''}>
            {product.casNumber && (
              <p className="text-sm text-gray-500">
                CAS: {product.casNumber}
              </p>
            )}
            {view === 'list' && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {product.description}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 ${
                view === 'grid' ? 'opacity-0 group-hover:opacity-100' : ''
              }`}
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                window.location.href = `/contact?product=${product.id}`;
              }}
              className={`flex-1 py-2 px-4 border border-blue-500 text-blue-500 hover:bg-blue-50 font-medium rounded-lg transition-all duration-300 ${
                view === 'grid' ? 'opacity-0 group-hover:opacity-100' : ''
              }`}
            >
              Request Quote
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick View Modal */}
      <QuickView
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
}
