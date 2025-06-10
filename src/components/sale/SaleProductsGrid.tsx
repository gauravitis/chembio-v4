'use client'

import { Product } from "@/types/product"
import { ProductCard } from "../products/ProductCard"
import { Tag } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, query, where, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"

export function SaleProductsGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSaleProducts = async () => {
      try {
        console.log('Fetching sale products...');
        const productsRef = collection(db, 'products');
        const q = query(productsRef, where('isOnSale', '==', true));
        const querySnapshot = await getDocs(q);
        
        console.log('Found sale products:', querySnapshot.size);
        
        const fetchedProducts = querySnapshot.docs.map(doc => {
          const data = doc.data();
          
          // Log detailed product data
          console.log('Product data:', { 
            id: doc.id, 
            isOnSale: data.isOnSale, 
            salePrice: data.salePrice,
            image: data.image,
            images: data.images,
            hasImage: !!data.image,
            hasImages: !!(data.images && data.images.length > 0)
          });
          
          // Ensure images array exists if only image field is present
          const processedData = { ...data };
          
          if (!processedData.images || !Array.isArray(processedData.images) || processedData.images.length === 0) {
            if (processedData.image) {
              console.log(`Converting image to images array for product ${doc.id}`);
              processedData.images = [processedData.image];
            } else {
              console.log(`No image found for product ${doc.id}, using empty array`);
              processedData.images = [];
            }
          }
          
          return {
            id: doc.id,
            ...processedData
          } as Product;
        });

        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching sale products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSaleProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showSaleTag
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-white/5 backdrop-blur-sm">
            <Tag className="w-8 h-8 text-purple-400" />
          </div>
          <h3 className="text-2xl font-semibold text-white mb-3 text-center">
            No special offers available
          </h3>
          <p className="text-gray-400 text-center max-w-md">
            Check back soon for new deals! We regularly update our special offers with amazing discounts.
          </p>
        </div>
      )}
    </>
  )
}