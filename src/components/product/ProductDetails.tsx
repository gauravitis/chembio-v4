'use client';

import { useEffect, useState } from 'react';
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types/product";
import { getProductById } from "@/lib/firebase/products";

interface ProductDetailsProps {
  productId: string;
}

export default function ProductDetails({ productId }: ProductDetailsProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(productId);
        if (!productData) {
          setError('Product not found');
          return;
        }
        setProduct(productData);
      } catch (err) {
        setError('Error loading product');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center text-red-500">{error || 'Product not found'}</div>
      </div>
    );
  }

  // Calculate display price (sale price or regular price)
  const displayPrice = product.salePrice ?? product.price;
  const isOnSale = product.isOnSale === true || (product.salePrice !== null && product.salePrice !== undefined && product.salePrice < product.price);
  
  // Clean the image URL by removing any leading forward slashes before https://
  const cleanUrl = (url: string) => url.replace(/^\/+(https?:\/\/)/, '$1');
  
  // Get the image URL
  let imageUrl = '/images/product-placeholder.png';
  
  if (!imageError) {
    if (product.image && typeof product.image === 'string' && product.image.trim() !== '') {
      imageUrl = cleanUrl(product.image);
    } else if (product.images && Array.isArray(product.images) && product.images.length > 0 && product.images[0]) {
      imageUrl = cleanUrl(product.images[0]);
    }
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative aspect-square rounded-lg overflow-hidden bg-white/5">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            onError={() => setImageError(true)}
          />
        </div>
        
        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-white">{product.name}</h1>
          
          <div className="flex items-baseline gap-3">
            <span className={`text-2xl font-bold ${isOnSale ? 'text-purple-400' : 'text-white'}`}>
              {formatPrice(displayPrice)}
            </span>
            
            {isOnSale && (
              <span className="text-xl text-gray-400 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          
          {product.description && (
            <div className="prose prose-invert max-w-none">
              <h2 className="text-xl font-semibold">Description</h2>
              <p>{product.description}</p>
            </div>
          )}
          
          {/* Product Specifications */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Specifications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Category</p>
                  <p className="font-medium text-white">{product.category}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Manufacturer</p>
                  <p className="font-medium text-white">{product.make}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">SKU</p>
                  <p className="font-medium text-white">{product.sku || product.catalogueId}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Pack Size</p>
                  <p className="font-medium text-white">{product.packSize}</p>
                </div>
                {product.casNumber && (
                  <div className="bg-white/5 p-4 rounded-lg">
                    <p className="text-sm text-gray-400">CAS Number</p>
                    <p className="font-medium text-white">{product.casNumber}</p>
                  </div>
                )}
                {product.hsnCode && (
                  <div className="bg-white/5 p-4 rounded-lg">
                    <p className="text-sm text-gray-400">HSN Code</p>
                    <p className="font-medium text-white">{product.hsnCode}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stock Status */}
          <div className="bg-white/5 p-4 rounded-lg">
            <p className="text-sm text-gray-400">Status</p>
            <p className="font-medium text-white">
              {product.stockQuantity && product.stockQuantity > 0 ? (
                <span className="text-green-400">In Stock</span>
              ) : (
                <span className="text-red-400">Out of Stock</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 