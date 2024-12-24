'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Star } from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, selectedQuantity);
  };

  const handleAddToWishlist = () => {
    addToWishlist(product.id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Product Image */}
          <div className="relative aspect-square">
            <Image
              src={product.image || '/placeholder-product.png'}
              alt={product.name}
              fill
              className="object-contain rounded-lg"
              onError={(e: any) => {
                e.target.src = '/placeholder-product.png';
              }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            {/* Price and Rating */}
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">₹{product.price}</div>
              {product.rating && (
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-1">{product.rating}</span>
                  {product.reviewCount && (
                    <span className="text-sm text-gray-500 ml-1">
                      ({product.reviewCount} reviews)
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Specifications */}
            <div className="space-y-2">
              {product.casNumber && (
                <Badge variant="outline">CAS: {product.casNumber}</Badge>
              )}
              {product.packSize && (
                <Badge variant="outline">Pack Size: {product.packSize}</Badge>
              )}
              {product.manufacturer && (
                <Badge variant="outline">
                  Manufacturer: {product.manufacturer}
                </Badge>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600">{product.description}</p>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  product.stockQuantity && product.stockQuantity > 0
                    ? 'bg-green-500'
                    : 'bg-red-500'
                }`}
              />
              <span className="text-sm">
                {product.stockQuantity && product.stockQuantity > 0
                  ? 'In Stock'
                  : 'Out of Stock'}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-2">
              <label htmlFor="quantity" className="text-sm font-medium">
                Quantity:
              </label>
              <select
                id="quantity"
                value={selectedQuantity}
                onChange={(e) => setSelectedQuantity(Number(e.target.value))}
                className="border rounded-md px-2 py-1"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button
                onClick={handleAddToCart}
                disabled={!product.stockQuantity || product.stockQuantity <= 0}
                className="flex-1"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                onClick={handleAddToWishlist}
                className={isInWishlist(product.id) ? 'text-red-500' : ''}
              >
                <Heart
                  className={`w-4 h-4 ${
                    isInWishlist(product.id) ? 'fill-current' : ''
                  }`}
                />
              </Button>
            </div>

            {/* Additional Information */}
            {product.specifications && (
              <div className="border-t pt-4 mt-4">
                <h4 className="font-medium mb-2">Specifications</h4>
                <dl className="grid grid-cols-2 gap-2 text-sm">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key}>
                      <dt className="font-medium">{key}:</dt>
                      <dd className="text-gray-600">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
