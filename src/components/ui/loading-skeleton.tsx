'use client';

import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'card' | 'text' | 'image';
}

export function LoadingSkeleton({ className, variant = 'card' }: LoadingSkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-white/5 rounded-xl',
        {
          'h-[200px] w-full': variant === 'card',
          'h-4 w-3/4': variant === 'text',
          'aspect-square w-full': variant === 'image',
        },
        className
      )}
    />
  );
}
