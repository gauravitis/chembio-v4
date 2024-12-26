'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from './auth-context';
import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { Product } from '@/types/product';
import { toast } from 'react-hot-toast';

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { user } = useAuth();

  // Calculate total
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Load cart data
  useEffect(() => {
    let unsubscribe: () => void;

    if (user) {
      const cartRef = doc(db, 'carts', user.uid);
      
      // Set up real-time listener
      unsubscribe = onSnapshot(cartRef, (docSnap) => {
        if (docSnap.exists()) {
          const cartData = docSnap.data();
          if (Array.isArray(cartData.items)) {
            setItems(cartData.items);
          }
        } else {
          // Initialize empty cart if it doesn't exist
          setDoc(cartRef, { items: [] }, { merge: true });
          setItems([]);
        }
      }, (error) => {
        console.error('Error loading cart:', error);
        toast.error('Failed to load cart');
      });
    } else {
      setItems([]); // Clear cart when user logs out
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

  // Save cart to Firestore
  const saveCart = useCallback(async (newItems: CartItem[]) => {
    if (user) {
      try {
        const cartRef = doc(db, 'carts', user.uid);
        await setDoc(cartRef, { items: newItems }, { merge: true });
      } catch (error) {
        console.error('Error saving cart:', error);
        toast.error('Failed to save cart');
        // Revert the local state if save fails
        const cartRef = doc(db, 'carts', user.uid);
        const cartDoc = await getDoc(cartRef);
        if (cartDoc.exists()) {
          setItems(cartDoc.data().items || []);
        }
      }
    }
  }, [user]);

  const addItem = useCallback(async (product: Product, quantity: number = 1) => {
    if (!user) {
      window.location.href = '/auth/login';
      return;
    }

    try {
      const newItems = [...items];
      const existingItemIndex = newItems.findIndex(item => item.id === product.id);

      if (existingItemIndex !== -1) {
        // Update existing item
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity
        };
      } else {
        // Add new item
        newItems.push({ ...product, quantity });
      }

      // Update local state first
      setItems(newItems);
      
      // Then save to Firestore
      await saveCart(newItems);
      
      toast.success(existingItemIndex !== -1
        ? `Updated quantity of ${product.name}`
        : `Added ${product.name} to cart`
      );
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast.error('Failed to add item to cart');
    }
  }, [items, user, saveCart]);

  const removeItem = useCallback(async (productId: string) => {
    try {
      const itemToRemove = items.find(item => item.id === productId);
      const newItems = items.filter(item => item.id !== productId);
      
      // Update local state first
      setItems(newItems);
      
      // Then save to Firestore
      await saveCart(newItems);
      
      if (itemToRemove) {
        toast.success(`Removed ${itemToRemove.name} from cart`);
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast.error('Failed to remove item from cart');
    }
  }, [items, saveCart]);

  const updateQuantity = useCallback(async (productId: string, quantity: number) => {
    if (quantity < 1) return;
    
    try {
      const newItems = items.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
      
      // Update local state first
      setItems(newItems);
      
      // Then save to Firestore
      await saveCart(newItems);
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity');
    }
  }, [items, saveCart]);

  const clearCart = useCallback(async () => {
    try {
      // Update local state first
      setItems([]);
      
      // Then save to Firestore
      await saveCart([]);
      
      toast.success('Cart cleared');
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    }
  }, [saveCart]);

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    total
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
