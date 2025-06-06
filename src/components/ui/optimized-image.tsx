'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { LoadingSkeleton } from './loading-skeleton';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  quality?: number;
  onLoad?: () => void;
  sizes?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className,
  quality = 75,
  onLoad,
  sizes,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cn('relative', className)}>
      {isLoading && (
        <LoadingSkeleton
          variant="image"
          className={cn('absolute inset-0 z-10', className)}
        />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        quality={quality}
        priority={priority}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        onLoad={() => {
          setIsLoading(false);
          onLoad?.();
        }}
      />
    </div>
  );
}
