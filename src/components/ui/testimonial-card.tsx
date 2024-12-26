'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  image: string;
  testimonial: string;
}

export function TestimonialCard({ name, role, company, image, testimonial }: TestimonialCardProps) {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={cn(
        "p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:-translate-y-1 section-fade-in",
        isVisible && "visible"
      )}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent-blue/20">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white">{name}</h4>
          <p className="text-sm text-gray-400">{role}</p>
          <p className="text-sm text-accent-blue">{company}</p>
        </div>
      </div>
      <div className="relative">
        <div className="absolute -top-4 -left-2 text-4xl text-accent-blue opacity-20">
          "
        </div>
        <p className="text-gray-300 text-sm leading-relaxed italic">
          {testimonial}
        </p>
        <div className="absolute -bottom-4 -right-2 text-4xl text-accent-blue opacity-20">
          "
        </div>
      </div>
    </div>
  );
}
