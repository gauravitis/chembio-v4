'use client';

import { cn } from "@/lib/utils";

interface PlaceholderImageProps {
  className?: string;
}

export function PlaceholderImage({ className }: PlaceholderImageProps) {
  return (
    <div className={cn(
      "w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center",
      className
    )}>
      <svg
        className="w-12 h-12 text-white/40"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </div>
  );
} 