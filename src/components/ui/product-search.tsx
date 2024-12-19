import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductSearchProps {
  onSearch: (searchTerm: string) => void;
}

export function ProductSearch({ onSearch }: ProductSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
    inputRef.current?.focus();
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      // Escape to clear search when focused
      if (e.key === 'Escape' && document.activeElement === inputRef.current) {
        clearSearch();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="max-w-2xl w-full mx-auto mb-12">
      <motion.div 
        className={`relative group ${isFocused ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-background' : ''}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 transition-colors group-hover:text-gray-600" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search products (Ctrl + K)"
            value={searchTerm}
            onChange={handleSearch}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full pl-12 pr-12 py-6 text-lg bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 backdrop-blur-lg border-2 border-gray-200/30 rounded-2xl shadow-lg transition-all duration-300 placeholder:text-gray-500 focus:from-white focus:to-white focus:border-blue-500/50 focus:shadow-blue-500/10"
          />
          <AnimatePresence>
            {searchTerm && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full bg-white/80 hover:bg-gray-100 transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4 text-gray-600" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        <div className="absolute -bottom-6 left-4 text-sm text-gray-500/80">
          Search by catalogue ID, product name, or CAS number
        </div>
      </motion.div>
    </div>
  );
}
