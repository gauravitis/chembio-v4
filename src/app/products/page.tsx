'use client';

import { PageHeader } from '@/components/ui/page-header';
import { ProductCard } from '@/components/ui/product-card';
import { ProductSearch } from '@/components/ui/product-search';
import { ViewToggle } from '@/components/ui/view-toggle';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { db } from '@/lib/firebase';
import { collection, query, getDocs, orderBy, limit, startAfter, DocumentData } from 'firebase/firestore';
import { Product } from '@/types/product';

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastDoc, setLastDoc] = useState<DocumentData | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 12;

  // Intersection Observer for infinite scroll
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  });

  // Initial products fetch
  useEffect(() => {
    fetchProducts();
  }, []);

  // Load more when scrolling
  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMoreProducts();
    }
  }, [inView]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const productsRef = collection(db, 'products');
      const q = query(
        productsRef,
        orderBy('name'),
        limit(itemsPerPage)
      );
      const snapshot = await getDocs(q);
      
      const productsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];

      setProducts(productsData);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      setHasMore(snapshot.docs.length === itemsPerPage);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreProducts = async () => {
    if (!lastDoc || !hasMore || loading) return;

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
        id: doc.id,
        ...doc.data()
      })) as Product[];

      setProducts(prev => [...prev, ...newProducts]);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      setHasMore(snapshot.docs.length === itemsPerPage);
    } catch (error) {
      console.error('Error loading more products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.casNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-custom">
      <div className="relative">
        <PageHeader 
          title="Our Products" 
          subtitle="Discover our comprehensive range of laboratory essentials" 
        />

        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-[1fr,auto] gap-4 items-center bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <ProductSearch onSearch={setSearchTerm} />
              <ViewToggle view={view} onViewChange={setView} />
            </div>

            <motion.div
              layout
              className={`${
                view === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'flex flex-col gap-4'
              }`}
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id}
                    product={product} 
                    view={view}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {loading && (
              <div className="flex justify-center items-center py-8">
                <div className="w-8 h-8 border-4 border-accent-blue/30 border-t-accent-blue rounded-full animate-spin" />
              </div>
            )}

            {!loading && hasMore && (
              <div ref={ref} className="h-20" />
            )}

            {filteredProducts.length === 0 && !loading && (
              <div className="text-center py-12 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <p className="text-gray-300">
                  {searchTerm ? 'No products found matching your search criteria.' : 'No products available yet.'}
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
