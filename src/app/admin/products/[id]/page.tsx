'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProductService } from '@/services/product-service';
import { toast } from 'react-hot-toast';

interface Props {
  params: {
    id: string;
  };
}

const categories = [
  'Chemicals',
  'Lab Equipment',
  'Safety Equipment',
  'Glassware',
  'Instruments',
  'Other'
];

const defaultProduct: Partial<Product> = {
  name: '',
  description: '',
  price: 0,
  image: '',
  category: '',
  casNumber: '',
  catalogueId: '',  
  packSize: '',
  hsnCode: '',
  manufacturer: '',
  specifications: {},
  make: '',
};

export default function ProductPage({ params }: Props) {
  const router = useRouter();
  const isNew = params.id === 'new';
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [product, setProduct] = useState<Partial<Product>>(defaultProduct);

  useEffect(() => {
    if (!isNew) {
      fetchProduct();
    } else {
      setLoading(false);
    }
  }, [isNew, params.id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const fetchedProduct = await ProductService.getProduct(params.id);
      
      if (fetchedProduct) {
        setProduct(fetchedProduct);
      } else {
        toast.error('Product not found');
        router.push('/admin/products');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Error loading product');
      router.push('/admin/products');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      
      // Validate HSN code format
      if (product.hsnCode && !/^\d{4,8}$/.test(product.hsnCode)) {
        toast.error('HSN code must be 4-8 digits');
        return;
      }
      
      // If editing, include the ID
      const productToSave = isNew ? product : { ...product, id: params.id };
      
      await ProductService.saveProduct(productToSave);
      toast.success(isNew ? 'Product created successfully' : 'Product updated successfully');
      router.push('/admin/products');
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (
    field: keyof Product,
    value: string | number
  ) => {
    setProduct(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">
        {isNew ? 'Add New Product' : 'Edit Product'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={product.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="make">Make/Brand</Label>
            <Input
              id="make"
              value={product.make || ''}
              onChange={(e) => handleInputChange('make', e.target.value)}
              required
              placeholder="e.g., Merck, Fisher Scientific, Borosil"
            />
            <p className="text-sm text-gray-500 mt-1">
              Enter the manufacturer or brand name of the product
            </p>
          </div>

          <div>
            <Label htmlFor="casNumber">CAS Number</Label>
            <Input
              id="casNumber"
              value={product.casNumber || ''}
              onChange={(e) => handleInputChange('casNumber', e.target.value)}
              required={product.category === 'Chemicals'}
              placeholder="e.g., 7732-18-5 or mixture"
              title="Enter a valid CAS number (e.g., 7732-18-5) or 'mixture' for chemical mixtures"
            />
            <p className="text-sm text-gray-500 mt-1">
              {product.category === 'Chemicals' 
                ? 'Required for chemical products. Enter a valid CAS number or "mixture" for mixtures'
                : 'Optional for non-chemical products'}
            </p>
          </div>

          <div>
            <Label htmlFor="catalogueId">Catalogue ID</Label>
            <Input
              id="catalogueId"
              value={product.catalogueId}
              onChange={(e) => handleInputChange('catalogueId', e.target.value)}
              required
              placeholder="e.g., 438073-500ML"
            />
          </div>

          <div>
            <Label htmlFor="hsnCode">HSN Code (Optional)</Label>
            <Input
              id="hsnCode"
              value={product.hsnCode || ''}
              onChange={(e) => handleInputChange('hsnCode', e.target.value)}
              placeholder="e.g., 28045000"
              pattern="\d{4,8}"
              title="HSN code must be 4-8 digits if provided"
            />
            <p className="text-sm text-gray-500 mt-1">
              Enter a valid HSN code if available (4-8 digits)
            </p>
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={product.category}
              onValueChange={(value) => handleInputChange('category', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="price">Price (₹)</Label>
            <Input
              id="price"
              type="number"
              value={product.price}
              onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
              required
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={product.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="packSize">Pack Size</Label>
            <Input
              id="packSize"
              value={product.packSize}
              onChange={(e) => handleInputChange('packSize', e.target.value)}
              required
              placeholder="e.g., 500ML, 1KG"
            />
          </div>

          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={product.image}
              onChange={(e) => handleInputChange('image', e.target.value)}
              placeholder="Enter image URL"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/products')}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving...' : isNew ? 'Create Product' : 'Update Product'}
          </Button>
        </div>
      </form>
    </div>
  );
}
