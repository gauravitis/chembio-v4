'use client';

import { useState, useEffect } from 'react';
import { ProductFilter } from '@/types/product';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useDebounce } from '@/hooks/useDebounce';

interface ProductFilterProps {
  onFilterChange: (filter: ProductFilter) => void;
  categories: string[];
  manufacturers: string[];
  maxPrice: number;
}

export function ProductFilter({ onFilterChange, categories, manufacturers, maxPrice }: ProductFilterProps) {
  const [filter, setFilter] = useState<ProductFilter>({
    categories: [],
    manufacturers: [],
    priceRange: { min: 0, max: maxPrice },
    inStock: false,
    rating: 0,
    sortBy: 'newest',
    sortOrder: 'desc'
  });

  const [isOpen, setIsOpen] = useState(false);
  const debouncedFilter = useDebounce(filter, 500);

  useEffect(() => {
    onFilterChange(debouncedFilter);
  }, [debouncedFilter, onFilterChange]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    setFilter(prev => ({
      ...prev,
      categories: checked
        ? [...(prev.categories || []), category]
        : (prev.categories || []).filter(c => c !== category)
    }));
  };

  const handleManufacturerChange = (manufacturer: string, checked: boolean) => {
    setFilter(prev => ({
      ...prev,
      manufacturers: checked
        ? [...(prev.manufacturers || []), manufacturer]
        : (prev.manufacturers || []).filter(m => m !== manufacturer)
    }));
  };

  const handlePriceChange = (value: [number, number]) => {
    setFilter(prev => ({
      ...prev,
      priceRange: { min: value[0], max: value[1] }
    }));
  };

  const handleSortChange = (sortBy: ProductFilter['sortBy']) => {
    setFilter(prev => ({
      ...prev,
      sortBy,
      sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc'
    }));
  };

  const clearFilters = () => {
    setFilter({
      categories: [],
      manufacturers: [],
      priceRange: { min: 0, max: maxPrice },
      inStock: false,
      rating: 0,
      sortBy: 'newest',
      sortOrder: 'desc'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
        >
          {isOpen ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>

      <AnimatePresence>
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className={`space-y-6 ${isOpen ? 'block' : 'hidden md:block'}`}
        >
          {/* Categories */}
          <div>
            <h4 className="font-medium mb-2">Categories</h4>
            <div className="space-y-2">
              {categories.map(category => (
                <div key={category} className="flex items-center">
                  <Checkbox
                    id={`category-${category}`}
                    checked={filter.categories?.includes(category)}
                    onCheckedChange={(checked) => 
                      handleCategoryChange(category, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={`category-${category}`}
                    className="ml-2 text-sm"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Manufacturers */}
          <div>
            <h4 className="font-medium mb-2">Manufacturers</h4>
            <div className="space-y-2">
              {manufacturers.map(manufacturer => (
                <div key={manufacturer} className="flex items-center">
                  <Checkbox
                    id={`manufacturer-${manufacturer}`}
                    checked={filter.manufacturers?.includes(manufacturer)}
                    onCheckedChange={(checked) => 
                      handleManufacturerChange(manufacturer, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={`manufacturer-${manufacturer}`}
                    className="ml-2 text-sm"
                  >
                    {manufacturer}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="font-medium mb-2">Price Range</h4>
            <Slider
              defaultValue={[filter.priceRange?.min || 0, filter.priceRange?.max || maxPrice]}
              max={maxPrice}
              step={100}
              onValueChange={handlePriceChange}
            />
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>₹{filter.priceRange?.min}</span>
              <span>₹{filter.priceRange?.max}</span>
            </div>
          </div>

          {/* Stock Status */}
          <div className="flex items-center">
            <Checkbox
              id="inStock"
              checked={filter.inStock}
              onCheckedChange={(checked) => 
                setFilter(prev => ({ ...prev, inStock: checked as boolean }))
              }
            />
            <label htmlFor="inStock" className="ml-2 text-sm">
              In Stock Only
            </label>
          </div>

          {/* Sort Options */}
          <div>
            <h4 className="font-medium mb-2">Sort By</h4>
            <div className="grid grid-cols-2 gap-2">
              {['newest', 'price', 'name', 'rating'].map((sortOption) => (
                <Button
                  key={sortOption}
                  variant={filter.sortBy === sortOption ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleSortChange(sortOption as ProductFilter['sortBy'])}
                >
                  {sortOption.charAt(0).toUpperCase() + sortOption.slice(1)}
                  {filter.sortBy === sortOption && (
                    <span className="ml-1">
                      {filter.sortOrder === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="w-full"
          >
            Clear All Filters
          </Button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
