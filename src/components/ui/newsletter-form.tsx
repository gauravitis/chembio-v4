'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { Send } from 'lucide-react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { elementRef, isVisible } = useIntersectionObserver();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // TODO: Implement newsletter subscription logic
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={cn(
        "p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 section-fade-in",
        isVisible && "visible"
      )}
    >
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-2xl font-semibold text-gradient mb-4">
          Stay Updated
        </h3>
        <p className="text-gray-400 mb-8">
          Subscribe to our newsletter for the latest product updates, industry news, and exclusive offers.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:border-accent-blue/50"
              required
            />
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary flex items-center justify-center gap-2 min-w-[160px]"
          >
            {status === 'loading' ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Subscribe
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
        {status === 'success' && (
          <p className="mt-4 text-sm text-green-400">
            Thank you for subscribing! We'll keep you updated.
          </p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-sm text-red-400">
            Something went wrong. Please try again later.
          </p>
        )}
      </div>
    </div>
  );
}
