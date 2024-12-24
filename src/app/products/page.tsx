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
import { Product } from '@/data/products';

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
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsRef = collection(db, 'products');
        const q = query(
          productsRef, 
          orderBy('name'), 
          limit(itemsPerPage * 2) // Fetch more items since we'll filter some out
        );
        const snapshot = await getDocs(q);
        
        const fetchedProducts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];

        // Filter products to only include those with CAS numbers and ensure uniqueness
        const uniqueProducts = new Map();
        fetchedProducts
          .filter(product => product.casNumber && product.casNumber.trim() !== '')
          .forEach(product => {
            if (!uniqueProducts.has(product.casNumber)) {
              uniqueProducts.set(product.casNumber, product);
            }
          });

        const validProducts = Array.from(uniqueProducts.values());
        setProducts(validProducts);
        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
        setHasMore(validProducts.length >= itemsPerPage);
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
    if (!lastDoc || !hasMore || loading) return;

    try {
      setLoading(true);
      const productsRef = collection(db, 'products');
      const q = query(
        productsRef,
        orderBy('name'),
        startAfter(lastDoc),
        limit(itemsPerPage * 2) // Fetch more items since we'll filter some out
      );
      const snapshot = await getDocs(q);

      const newProducts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];

      // Create a Map of existing products using CAS number as key
      const existingProducts = new Map(
        products.map(p => [p.casNumber, p])
      );
      
      // Add only unique new products with CAS numbers
      newProducts
        .filter(product => product.casNumber && product.casNumber.trim() !== '')
        .forEach(product => {
          if (!existingProducts.has(product.casNumber)) {
            existingProducts.set(product.casNumber, product);
          }
        });

      const allUniqueProducts = Array.from(existingProducts.values());
      
      if (allUniqueProducts.length > products.length) {
        setProducts(allUniqueProducts);
        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
        setHasMore(snapshot.docs.length === itemsPerPage * 2); // Adjust hasMore check
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading more products:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // Load more products when scrolling to bottom
  useEffect(() => {
    if (inView && hasMore && !loading && lastDoc) {
      loadMoreProducts();
    }
  }, [inView, hasMore, loading, lastDoc]);

  // Generate unique key for product
  const generateProductKey = (product: Product) => {
    return product.id; // Using just the ID since it's guaranteed to be unique
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
        product.casNumber
      ].filter((field): field is string => typeof field === 'string');

      return searchFields.some(field => 
        field.toLowerCase().includes(searchLower)
      );
    });
  }, [searchTerm, products]);

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
                    key={generateProductKey(product)}
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
                  No products found matching your search criteria.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
