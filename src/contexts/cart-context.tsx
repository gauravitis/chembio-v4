'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './auth-context';
import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { Product } from '@/data/products';
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

  // Sync with Firestore when user is logged in
  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        const cartRef = doc(db, 'carts', user.uid);
        const cartDoc = await getDoc(cartRef);
        if (cartDoc.exists()) {
          setItems(cartDoc.data().items || []);
        }
      }
    };
    loadCart();
  }, [user]);

  // Save cart to Firestore whenever it changes
  useEffect(() => {
    const saveCart = async () => {
      if (user) {
        const cartRef = doc(db, 'carts', user.uid);
        await setDoc(cartRef, { items }, { merge: true });
      }
    };
    if (items.length > 0) {
      saveCart();
    }
  }, [items, user]);

  const addItem = (product: Product, quantity: number = 1) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id);
      let newItems;
      
      if (existingItem) {
        newItems = currentItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        toast.success(`Updated quantity of ${product.name}`);
      } else {
        newItems = [...currentItems, { ...product, quantity }];
        toast.success(`Added ${product.name} to cart`);
      }
      
      return newItems;
    });
  };

  const removeItem = (productId: string) => {
    setItems(currentItems => {
      const item = currentItems.find(item => item.id === productId);
      if (item) {
        toast.success(`Removed ${item.name} from cart`);
      }
      return currentItems.filter(item => item.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast.success('Cart cleared');
  };

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      total,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
