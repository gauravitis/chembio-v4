'use client';

import { Product } from '@/types/product';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ProductModal } from './product-modal';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  product: Product;
  view?: 'grid' | 'list';
}

export function ProductCard({ product, view = 'grid' }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleRequestQuote = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push('/contact?product=' + encodeURIComponent(product.name));
  };

  if (view === 'list') {
    return (
      <>
        <motion.div
          layout
          onClick={() => setIsModalOpen(true)}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-accent-blue/50 transition-all duration-300 cursor-pointer"
        >
          <div className="flex flex-col md:flex-row gap-6 p-6">
            <div className="w-full md:w-48 h-48 relative rounded-lg overflow-hidden bg-white/5">
              <Image
                src={product.image || '/images/product-placeholder.png'}
                alt={product.name}
                fill
                className="object-contain p-4"
              />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-100">{product.name}</h3>
                {product.make && (
                  <p className="text-sm text-gray-400 mt-1">Brand: {product.make}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Catalogue ID</p>
                  <p className="text-gray-200">{product.catalogueId}</p>
                </div>
                {product.casNumber && (
                  <div>
                    <p className="text-sm text-gray-400">CAS Number</p>
                    <p className="text-gray-200">{product.casNumber}</p>
                  </div>
                )}
                {product.hsnCode && (
                  <div>
                    <p className="text-sm text-gray-400">HSN Code</p>
                    <p className="text-gray-200">{product.hsnCode}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-400">Pack Size</p>
                  <p className="text-gray-200">{product.packSize}</p>
                </div>
              </div>
              {product.description && (
                <p className="text-gray-300 text-sm line-clamp-2">{product.description}</p>
              )}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleRequestQuote}
                  className="px-6 py-2 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/90 transition-colors"
                >
                  Request Quote
                </button>
              </div>
            </div>
          </div>
        </motion.div>
        <ProductModal
          product={product}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </>
    );
  }

  return (
    <>
      <motion.div
        layout
        onClick={() => setIsModalOpen(true)}
        className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-accent-blue/50 transition-all duration-300 cursor-pointer"
      >
        <div className="aspect-square relative bg-white/5">
          <Image
            src={product.image || '/images/product-placeholder.png'}
            alt={product.name}
            fill
            className="object-contain p-4"
          />
        </div>
        <div className="p-4 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-100 line-clamp-2">{product.name}</h3>
            {product.make && (
              <p className="text-sm text-gray-400 mt-1">Brand: {product.make}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-gray-400">Catalogue ID</p>
              <p className="text-gray-200">{product.catalogueId}</p>
            </div>
            {product.casNumber && (
              <div>
                <p className="text-gray-400">CAS Number</p>
                <p className="text-gray-200">{product.casNumber}</p>
              </div>
            )}
            {product.hsnCode && (
              <div>
                <p className="text-gray-400">HSN Code</p>
                <p className="text-gray-200">{product.hsnCode}</p>
              </div>
            )}
            <div>
              <p className="text-gray-400">Pack Size</p>
              <p className="text-gray-200">{product.packSize}</p>
            </div>
          </div>
          <button
            onClick={handleRequestQuote}
            className="w-full px-4 py-2 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/90 transition-colors"
          >
            Request Quote
          </button>
        </div>
      </motion.div>
      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
