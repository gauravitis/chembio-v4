'use client';

import { PageHeader } from '@/components/ui/page-header';
import { ProductCard } from '@/components/ui/product-card';
import { ProductSearch } from '@/components/ui/product-search';
import { ViewToggle } from '@/components/ui/view-toggle';
import { UpdateBanner } from '@/components/ui/update-banner';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
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

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    
    const searchLower = searchTerm.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(searchLower) ||
      product.catalogueId.toLowerCase().includes(searchLower) ||
      (product.casNumber && product.casNumber.toLowerCase().includes(searchLower))
    );
  }, [searchTerm, products]);

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
      const q = query(productsRef, orderBy('createdAt', 'desc'), limit(itemsPerPage));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      const fetchedProducts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];

      setProducts(fetchedProducts);
      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const loadMoreProducts = async () => {
    if (!lastDoc || !hasMore) return;

    try {
      setLoading(true);
      const productsRef = collection(db, 'products');
      const q = query(
        productsRef,
        orderBy('createdAt', 'desc'),
        startAfter(lastDoc),
        limit(itemsPerPage)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      const newProducts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];

      setProducts(prev => [...prev, ...newProducts]);
      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setLoading(false);
    } catch (error) {
      console.error('Error loading more products:', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-custom">
      <div className="relative">
        <PageHeader
          title="Our Products"
          subtitle="Browse our extensive collection of high-quality chemicals and laboratory equipment"
        />

        <UpdateBanner />

        <section className="py-12">
          <div className="container-centered space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-[1fr,auto] gap-4 items-center bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <ProductSearch value={searchTerm} onChange={setSearchTerm} />
              <ViewToggle view={view} onChange={setView} />
            </div>

            <AnimatePresence mode="wait">
              <div className={`grid gap-6 ${view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <ProductCard product={product} view={view} />
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>

            {loading && (
              <div className="flex justify-center items-center py-8">
                <div className="w-8 h-8 border-4 border-accent-blue/30 border-t-accent-blue rounded-full animate-spin" />
              </div>
            )}

            {!loading && hasMore && (
              <div ref={ref} className="h-20" />
            )}

            {!hasMore && filteredProducts.length > 0 && (
              <p className="text-center text-gray-400 py-4">No more products to load.</p>
            )}

            {!loading && filteredProducts.length === 0 && (
              <div className="text-center py-12 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <p className="text-gray-300">
                  {searchTerm ? 'No products found matching your search criteria.' : 'No products available yet.'}
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
