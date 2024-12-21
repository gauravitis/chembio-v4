'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistStore {
  items: string[]; // Product IDs
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addToWishlist: (productId: string) => {
        const currentItems = get().items;
        if (!currentItems.includes(productId)) {
          set({ items: [...currentItems, productId] });
        }
      },
      removeFromWishlist: (productId: string) => {
        set({
          items: get().items.filter(id => id !== productId)
        });
      },
      isInWishlist: (productId: string) => {
        return get().items.includes(productId);
      },
      clearWishlist: () => set({ items: [] })
    }),
    {
      name: 'wishlist-storage'
    }
  )
);
