import { useState, useEffect, useRef, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function ProductSearch({ value, onChange, className = '' }: ProductSearchProps) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={value}
          onChange={handleSearch}
          placeholder="Search products by name, CAS number, or ID..."
          className="w-full bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg py-3 pl-10 pr-4 
                   text-gray-100 placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue/50
                   transition-all duration-300"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
