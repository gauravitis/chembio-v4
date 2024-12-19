import { Product } from '@/data/products';
import Image from 'next/image';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuickViewProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickView({ product, isOpen, onClose }: QuickViewProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[100]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-[90%] max-w-3xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl"
          >
            <div className="sticky top-0 right-0 z-10 flex justify-end p-4 bg-gradient-to-b from-white/80 to-white/0">
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/80 hover:bg-gray-100 transition-colors"
              >
                <X className="h-4 w-4 text-gray-600" />
              </button>
            </div>
            
            <div className="px-6 pb-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Product Image */}
                <div className="aspect-square relative bg-white rounded-xl overflow-hidden">
                  <Image
                    src={product.image.startsWith('/https:') ? product.image.substring(1) : product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Product Details */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        {product.id}
                      </span>
                      {product.casNumber && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                          CAS: {product.casNumber}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {product.name}
                    </h3>
                    <p className="text-gray-600">{product.description}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="text-lg font-semibold text-blue-600">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-700">Key Features:</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>High purity standards</li>
                        <li>Quality tested</li>
                        <li>Fast shipping</li>
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => {
                        window.location.href = `/contact?product=${product.id}`;
                      }}
                      className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300"
                    >
                      Request Quote
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
