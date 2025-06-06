'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { PageHeader } from '@/components/ui/page-header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tag, Search, Percent } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function SpecialOffersManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data.products);
        setFilteredProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search
  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  // Toggle sale status for a product
  const toggleSale = async (product: Product) => {
    try {
      const isOnSale = !product.isOnSale;
      const salePrice = isOnSale ? 
        (product.salePrice || Math.round(product.price * 0.9)) : // 10% discount by default
        null;

      const response = await fetch(`/api/products/${product.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isOnSale,
          salePrice,
        }),
      });

      if (!response.ok) throw new Error('Failed to update product');

      // Update local state
      setProducts(products.map(p => 
        p.id === product.id 
          ? { ...p, isOnSale, salePrice } 
          : p
      ));

      toast.success(isOnSale ? 'Added to special offers' : 'Removed from special offers');
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    }
  };

  // Update sale price
  const updateSalePrice = async (product: Product, newSalePrice: number) => {
    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          salePrice: newSalePrice,
        }),
      });

      if (!response.ok) throw new Error('Failed to update price');

      // Update local state
      setProducts(products.map(p => 
        p.id === product.id 
          ? { ...p, salePrice: newSalePrice } 
          : p
      ));

      toast.success('Sale price updated');
    } catch (error) {
      console.error('Error updating price:', error);
      toast.error('Failed to update price');
    }
  };

  return (
    <div className="container py-8 space-y-8">
      <PageHeader
        title="Special Offers Management"
        description="Manage product discounts and special offers"
      />

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder="Search products by name or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Products Grid */}
      <div className="grid gap-6">
        {loading ? (
          <div className="text-center py-12">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">No products found</div>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"
            >
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 relative rounded-md overflow-hidden">
                  <img
                    src={product.images?.[0] || '/placeholder-product.png'}
                    alt={product.name}
                    className="object-cover h-full w-full"
                  />
                  {product.isOnSale && (
                    <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 py-0.5">
                      SALE
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{product.name}</h3>
                  <p className="text-sm text-gray-400">{product.category}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-white">₹{product.price}</span>
                    {product.isOnSale && product.salePrice && (
                      <>
                        <span className="text-red-500">→</span>
                        <span className="text-red-500">₹{product.salePrice}</span>
                        <span className="text-xs text-red-500">
                          ({Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF)
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {product.isOnSale && (
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={product.salePrice || ''}
                      onChange={(e) => updateSalePrice(product, Number(e.target.value))}
                      className="w-24"
                      min={0}
                      max={product.price}
                    />
                    <Percent className="h-4 w-4 text-gray-400" />
                  </div>
                )}
                <Button
                  onClick={() => toggleSale(product)}
                  variant={product.isOnSale ? "destructive" : "default"}
                >
                  {product.isOnSale ? 'Remove from Sale' : 'Add to Sale'}
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 