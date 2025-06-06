import { Product } from "@/types/product"
import { ProductCard } from "../products/ProductCard"
import { Tag } from "lucide-react"
import { db } from "@/lib/firebase-admin"

const getSaleProducts = async (): Promise<Product[]> => {
  try {
    console.log('Fetching sale products...');
    const productsRef = db.collection('products');
    const q = productsRef.where('isOnSale', '==', true);
    const querySnapshot = await q.get();
    
    console.log('Found sale products:', querySnapshot.size);
    
    const products = querySnapshot.docs.map(doc => {
      const data = doc.data();
      console.log('Product data:', { id: doc.id, isOnSale: data.isOnSale, salePrice: data.salePrice });
      return {
        id: doc.id,
        ...data
      };
    }) as Product[];

    return products;
  } catch (error) {
    console.error('Error fetching sale products:', error);
    return [];
  }
}

export async function SaleProductsGrid() {
  const products = await getSaleProducts()

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