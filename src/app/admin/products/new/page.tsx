'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/ui/page-header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'react-hot-toast';

export default function NewProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    sku: '',
    stock: '',
    images: [''], // Array for multiple images
    specifications: {} as Record<string, string>,
    features: [] as string[],
    catalogueId: '', // Added required field
    packSize: '', // Added required field
    make: '', // Added required field
    casNumber: '', // Added optional field
    hsnCode: '', // Added optional field
    isOnSale: false, // Added sale status
    salePrice: '', // Added sale price
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      const requiredFields = ['name', 'description', 'category', 'price', 'catalogueId', 'packSize', 'make'];
      const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
      
      if (missingFields.length > 0) {
        toast.error(`Missing required fields: ${missingFields.join(', ')}`);
        setLoading(false);
        return;
      }

      const productData = {
        ...formData,
        price: Number(formData.price),
        stockQuantity: Number(formData.stock) || 0,
      };

      console.log('Sending product data:', productData);

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Response text:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse response as JSON:', e);
        throw new Error('Server returned invalid response');
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create product');
      }

      toast.success('Product created successfully');
      router.push('/admin/products');
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Add New Product"
        description="Create a new product in your catalog"
      />

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Name</label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Product name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Category</label>
            <Input
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              placeholder="Product category"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Price</label>
            <Input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              placeholder="Product price"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Catalogue ID</label>
            <Input
              name="catalogueId"
              value={formData.catalogueId}
              onChange={handleChange}
              required
              placeholder="e.g., 438073-500ML"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Pack Size</label>
            <Input
              name="packSize"
              value={formData.packSize}
              onChange={handleChange}
              required
              placeholder="e.g., 500ML, 1KG"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Make/Brand</label>
            <Input
              name="make"
              value={formData.make}
              onChange={handleChange}
              required
              placeholder="e.g., Merck, Fisher Scientific"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">CAS Number (Optional)</label>
            <Input
              name="casNumber"
              value={formData.casNumber}
              onChange={handleChange}
              placeholder="e.g., 7732-18-5 or mixture"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">HSN Code (Optional)</label>
            <Input
              name="hsnCode"
              value={formData.hsnCode}
              onChange={handleChange}
              placeholder="e.g., 28045000"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Stock</label>
            <Input
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              required
              min="0"
              placeholder="Stock quantity"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Image URL</label>
            <Input
              name="images"
              value={formData.images[0]}
              onChange={(e) => setFormData(prev => ({ ...prev, images: [e.target.value] }))}
              placeholder="Product image URL"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Description</label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Product description"
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Sale Price (Optional)</label>
            <Input
              name="salePrice"
              type="number"
              value={formData.salePrice}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="Sale price (if on sale)"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-200">
              <input
                type="checkbox"
                name="isOnSale"
                checked={formData.isOnSale}
                onChange={(e) => setFormData(prev => ({ ...prev, isOnSale: e.target.checked }))}
                className="rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-purple-500"
              />
              <span>Put on Sale</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Product'}
          </Button>
        </div>
      </form>
    </div>
  );
} 