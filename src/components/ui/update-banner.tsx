'use client';

import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

export function UpdateBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="relative isolate flex items-center gap-x-6 overflow-hidden bg-white/10 backdrop-blur-sm px-6 py-2.5 sm:px-3.5 sm:before:flex-1 rounded-lg mx-4 my-6 border border-white/20"
    >
      <div 
        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10" 
        style={{ mixBlendMode: 'overlay' }} 
      />
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <Info className="h-5 w-5 text-blue-400" />
        <p className="text-sm leading-6 text-white">
          <strong className="font-semibold text-white">Product Updates</strong>
          <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
            <circle cx={1} cy={1} r={1} />
          </svg>
          We're expanding our product catalog! More items will be available soon.
        </p>
      </div>
      <div className="flex flex-1 justify-end">
        <div className="w-16 bg-gradient-to-l from-black/10 to-transparent absolute right-0 inset-y-0" />
      </div>
    </motion.div>
  );
}
