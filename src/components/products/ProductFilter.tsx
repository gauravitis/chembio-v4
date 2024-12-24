'use client';

import { useState, useEffect } from 'react';
import type { ProductFilter as ProductFilterType } from '@/types/product';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ProductFilterProps {
  onFilterChange: (filter: ProductFilterType) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductFilter({ onFilterChange, isOpen, onClose }: ProductFilterProps) {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [categories, setCategories] = useState<string[]>([]);
  const [manufacturers, setManufacturers] = useState<string[]>([]);
  const [inStock, setInStock] = useState(false);

  useEffect(() => {
    const filter: ProductFilterType = {
      priceRange: {
        min: priceRange[0],
        max: priceRange[1]
      },
      categories: categories.length > 0 ? categories : undefined,
      manufacturers: manufacturers.length > 0 ? manufacturers : undefined,
      inStock: inStock || undefined
    };

    onFilterChange(filter);
  }, [priceRange, categories, manufacturers, inStock]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 20 }}
          className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-6 overflow-y-auto z-50"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Filters</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-gray-100 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Price Range */}
            <div>
              <h4 className="font-medium mb-3">Price Range</h4>
              <Slider
                defaultValue={[0, 1000]}
                max={1000}
                step={10}
                onValueChange={setPriceRange}
              />
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-medium mb-3">Categories</h4>
              <div className="space-y-2">
                {['Chemicals', 'Lab Equipment', 'Safety', 'Glassware'].map((category) => (
                  <div key={category} className="flex items-center">
                    <Checkbox
                      id={category}
                      checked={categories.includes(category)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setCategories([...categories, category]);
                        } else {
                          setCategories(categories.filter((c) => c !== category));
                        }
                      }}
                    />
                    <label
                      htmlFor={category}
                      className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Manufacturers */}
            <div>
              <h4 className="font-medium mb-3">Manufacturers</h4>
              <div className="space-y-2">
                {['Sigma-Aldrich', 'Merck', 'Fisher Scientific', 'VWR'].map((manufacturer) => (
                  <div key={manufacturer} className="flex items-center">
                    <Checkbox
                      id={manufacturer}
                      checked={manufacturers.includes(manufacturer)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setManufacturers([...manufacturers, manufacturer]);
                        } else {
                          setManufacturers(manufacturers.filter((m) => m !== manufacturer));
                        }
                      }}
                    />
                    <label
                      htmlFor={manufacturer}
                      className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {manufacturer}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* In Stock */}
            <div className="flex items-center">
              <Checkbox
                id="inStock"
                checked={inStock}
                onCheckedChange={(checked) => setInStock(checked as boolean)}
              />
              <label
                htmlFor="inStock"
                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                In Stock Only
              </label>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
