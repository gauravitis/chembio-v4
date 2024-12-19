'use client';

import { PageHeader } from '@/components/ui/page-header';
import { ProductCard } from '@/components/ui/product-card';
import { ProductSearch } from '@/components/ui/product-search';
import { ViewToggle } from '@/components/ui/view-toggle';
import { products } from '@/data/products';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  // Intersection Observer for infinite scroll
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    
    const searchLower = searchTerm.toLowerCase();
    return products.filter((product) => 
      product.id?.toLowerCase().includes(searchLower) ||
      product.name.toLowerCase().includes(searchLower) ||
      product.casNumber?.toLowerCase().includes(searchLower)
    );
  }, [searchTerm]);

  // Calculate paginated products
  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(0, page * itemsPerPage);
  }, [filteredProducts, page]);

  // Load more products when scrolling to bottom
  useEffect(() => {
    if (inView && paginatedProducts.length < filteredProducts.length) {
      setPage((prev) => prev + 1);
    }
  }, [inView, paginatedProducts.length, filteredProducts.length]);

  // Container variants for grid/list animation
  const containerVariants = {
    grid: {
      transition: { staggerChildren: 0.05 }
    },
    list: {
      transition: { staggerChildren: 0.05 }
    }
  };

  return (
    <main className="min-h-screen bg-gradient-custom">
      <PageHeader 
        title="Our Products" 
        subtitle="Discover our comprehensive range of laboratory essentials" 
      />

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
            <ProductSearch onSearch={setSearchTerm} />
            <ViewToggle view={view} onViewChange={setView} />
          </div>
          
          <motion.div
            variants={containerVariants}
            initial={false}
            animate={view}
            className={`${
              view === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'flex flex-col gap-4'
            }`}
          >
            <AnimatePresence mode="popLayout">
              {paginatedProducts.map((product, index) => (
                <ProductCard 
                  key={`${product.id}-${index}`} 
                  product={product} 
                  view={view}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Loading indicator */}
          {paginatedProducts.length < filteredProducts.length && (
            <div
              ref={ref}
              className="flex flex-col justify-center items-center py-8 gap-3"
            >
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin bg-white/20 backdrop-blur-sm shadow-lg" />
              <p className="text-gray-600 font-medium animate-pulse">Loading more products...</p>
            </div>
          )}

          {filteredProducts.length === 0 && (
            <p className="text-center text-gray-500 mt-8">
              No products found matching your search criteria.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
