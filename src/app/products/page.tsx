'use client';

import { PageHeader } from '@/components/ui/page-header';
import { ProductCard } from '@/components/ui/product-card';
import { ProductSearch } from '@/components/ui/product-search';
import { ViewToggle } from '@/components/ui/view-toggle';
import { QuickViewModal } from '@/components/products/QuickViewModal';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { db } from '@/lib/firebase';
import { collection, query, getDocs, orderBy, limit, startAfter, DocumentData, where } from 'firebase/firestore';
import type { Product } from '@/types/product';
import { useDebounce } from '@/hooks/useDebounce';

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastDoc, setLastDoc] = useState<DocumentData | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const itemsPerPage = 12;

  const debouncedSearch = useDebounce(searchTerm, 500);

  // Intersection Observer for infinite scroll
  const { ref, inView } = useInView({
    threshold: 0,
  });

  // Build query
  const buildQuery = () => {
    let q = collection(db, 'products');

    if (debouncedSearch) {
      q = query(
        q,
        where('name', '>=', debouncedSearch),
        where('name', '<=', debouncedSearch + '\uf8ff'),
        orderBy('name'),
        orderBy('id'), // Add a secondary sort to ensure consistent ordering
        limit(itemsPerPage)
      );
    } else {
      q = query(
        q,
        orderBy('createdAt', 'desc'),
        orderBy('id'), // Add a secondary sort to ensure consistent ordering
        limit(itemsPerPage)
      );
    }

    return q;
  };

  // Fetch products
  const fetchProducts = async (isInitial = false) => {
    try {
      setLoading(true);
      let q = buildQuery();
      
      if (!isInitial && lastDoc) {
        q = query(q, startAfter(lastDoc));
      }

      const snapshot = await getDocs(q);
      const newProducts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];

      // Filter out any duplicate products based on id
      if (!isInitial) {
        const existingIds = new Set(products.map(p => p.id));
        const uniqueNewProducts = newProducts.filter(p => !existingIds.has(p.id));
        setProducts(prev => [...prev, ...uniqueNewProducts]);
      } else {
        setProducts(newProducts);
      }

      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and search changes
  useEffect(() => {
    fetchProducts(true);
  }, [debouncedSearch]);

  // Infinite scroll
  useEffect(() => {
    if (inView && !loading && lastDoc) {
      fetchProducts();
    }
  }, [inView]);

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-custom py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <PageHeader
          title="Our Products"
          description="Browse our extensive collection of high-quality chemicals and lab equipment"
        />

        <div className="mt-8">
          {/* Search and View Toggle */}
          <div className="mb-6 flex justify-between items-center">
            <ProductSearch
              value={searchTerm}
              onChange={setSearchTerm}
            />
            <ViewToggle value={view} onChange={setView} />
          </div>

          {/* Products Grid/List */}
          <AnimatePresence mode="wait">
            {loading && products.length === 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white/10 animate-pulse rounded-lg h-72"
                  />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={
                  view === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {products.map((product) => {
                  // Create a unique key using multiple fields
                  const uniqueKey = `${product.id}-${product.manufacturer || ''}-${product.casNumber || ''}-${product.packSize || ''}`;
                  return (
                    <ProductCard
                      key={uniqueKey}
                      product={product}
                      view={view}
                      onQuickView={() => handleQuickView(product)}
                    />
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* No Results Message */}
          {!loading && products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                No products found. Try adjusting your search.
              </p>
            </div>
          )}

          {/* Loading More Indicator */}
          {loading && products.length > 0 && (
            <div className="text-center py-4">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
            </div>
          )}

          {/* Infinite scroll trigger */}
          <div ref={ref} className="h-10" />
        </div>

        {/* Quick View Modal */}
        <QuickViewModal
          product={selectedProduct}
          isOpen={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
        />
      </div>
    </div>
  );
}
