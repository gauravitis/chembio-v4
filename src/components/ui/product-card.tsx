import { Product } from '@/types/product';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, ShoppingCart } from 'lucide-react';
import { QuickView } from './quick-view';
import { useCart } from '@/contexts/cart-context';
import { useAuth } from '@/contexts/auth-context';
import { toast } from 'react-hot-toast';
import { forwardRef } from 'react';

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

export const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(
  ({ product, view }, ref) => {
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
    const { addItem } = useCart();
    const { user } = useAuth();

    const handleAddToCart = async () => {
      if (!user) {
        window.location.href = '/auth/login';
        return;
      }
      try {
        await addItem(product, 1);
      } catch (error) {
        console.error('Error adding to cart:', error);
        toast.error('Failed to add item to cart');
      }
    };

    return (
      <>
        <motion.div
          ref={ref}
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
              priority={true}
              onError={(e: any) => {
                e.target.src = '/placeholder-product.png';
              }}
            />
            
            {/* Quick Actions Overlay */}
            <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => setIsQuickViewOpen(true)}
                className="p-3 rounded-full bg-white shadow-lg transform hover:scale-110 transition-all duration-300 hover:bg-accent-blue hover:text-white text-accent-blue"
                title="Quick View"
              >
                <Eye className="w-5 h-5" />
              </button>
              <button
                onClick={handleAddToCart}
                className="p-3 rounded-full bg-white shadow-lg transform hover:scale-110 transition-all duration-300 hover:bg-accent-purple hover:text-white text-accent-purple"
                title="Add to Cart"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className={`p-4 space-y-3 ${view === 'list' ? 'md:col-span-3' : ''}`}>
            {/* Price */}
            <div className="text-right">
              <div className="text-lg font-semibold text-accent-purple">
                {formatIndianPrice(product.price)}
              </div>
              {product.mrp && product.mrp > product.price && (
                <div className="text-sm text-gray-500 line-through">
                  {formatIndianPrice(product.mrp)}
                </div>
              )}
            </div>

            {/* Product Name and Description */}
            <div>
              <h3 className="font-medium text-accent-blue transition-colors duration-300">
                {product.name}
              </h3>
              {product.make && (
                <div className="mt-1 text-sm font-medium text-amber-700">
                  by {product.make}
                </div>
              )}
              {view === 'list' && product.description && (
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{product.description}</p>
              )}
            </div>

            {/* Additional Info */}
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700">
                {product.category}
              </span>
              {product.catalogueId && (
                <span className="text-xs px-2 py-1 bg-gradient-to-r from-accent-blue/10 to-accent-purple/10 rounded-full text-accent-blue font-medium">
                  ID: {product.catalogueId}
                </span>
              )}
              {product.hsnCode && (
                <span className="text-xs px-2 py-1 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full text-emerald-700 font-medium">
                  HSN: {product.hsnCode}
                </span>
              )}
              {product.casNumber && (
                <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700">
                  CAS: {product.casNumber}
                </span>
              )}
              {product.packSize && (
                <span className="text-xs px-2 py-1 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-purple-700 font-medium">
                  {product.packSize}
                </span>
              )}
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
);
