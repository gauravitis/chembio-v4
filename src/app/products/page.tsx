'use client';

import { PageHeader } from '@/components/ui/page-header';
import { ProductCard } from '@/components/ui/product-card';
import { ProductSearch } from '@/components/ui/product-search';
import { ViewToggle } from '@/components/ui/view-toggle';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { db } from '@/lib/firebase';
import { collection, query, getDocs, orderBy, limit, startAfter, DocumentData } from 'firebase/firestore';
import type { Product } from '@/types/product';

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastDoc, setLastDoc] = useState<DocumentData | null>(null);
  const itemsPerPage = 12;

  // Intersection Observer for infinite scroll
  const { ref, inView } = useInView({
    threshold: 0,
  });

  // Initial products fetch
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsRef = collection(db, 'products');
        const q = query(productsRef, orderBy('name'), limit(itemsPerPage));
        const snapshot = await getDocs(q);
        
        const fetchedProducts = snapshot.docs.map(doc => ({
          ...doc.data(),
          firestoreId: doc.id
        })) as Product[];

        setProducts(fetchedProducts);
        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Load more products
  const loadMoreProducts = async () => {
    if (!lastDoc) return;

    try {
      setLoading(true);
      const productsRef = collection(db, 'products');
      const q = query(
        productsRef,
        orderBy('name'),
        startAfter(lastDoc),
        limit(itemsPerPage)
      );
      const snapshot = await getDocs(q);

      const newProducts = snapshot.docs.map(doc => ({
        ...doc.data(),
        firestoreId: doc.id
      })) as Product[];

      setProducts(prev => [...prev, ...newProducts]);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
    } catch (error) {
      console.error('Error loading more products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    
    const searchLower = searchTerm.toLowerCase();
    return products.filter((product) => {
      const searchFields = [
        product.id,
        product.name,
        product.description,
        product.casNumber,
        product.packSize,
        product.category
      ].filter((field): field is string => typeof field === 'string');

      return searchFields.some(field => 
        field.toLowerCase().includes(searchLower)
      );
    });
  }, [searchTerm, products]);

  // Load more products when scrolling to bottom
  useEffect(() => {
    if (inView && !loading) {
      loadMoreProducts();
    }
  }, [inView]);

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
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <PageHeader 
            title="Our Products" 
            description="Browse our extensive catalog of high-quality chemicals and laboratory supplies."
          />

          <div className="text-center mb-8 text-gray-300 italic">
            (Our Products Catalogue Will Be Updated Soon)
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8 bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
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
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.firestoreId}
                  product={product} 
                  view={view}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Loading indicator */}
          {loading && (
            <div className="flex flex-col justify-center items-center py-8 gap-3">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin bg-white/20 backdrop-blur-sm shadow-lg" />
              <p className="text-gray-300 font-medium animate-pulse">Loading products...</p>
            </div>
          )}

          {/* Load more trigger */}
          {!loading && lastDoc && (
            <div ref={ref} className="h-20" />
          )}

          {filteredProducts.length === 0 && !loading && (
            <div className="text-center p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <p className="text-gray-300">
                No products found matching your search criteria.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
