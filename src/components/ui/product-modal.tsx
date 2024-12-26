'use client';

import { Product } from '@/types/product';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Image from 'next/image';
import { X, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/cart-context';
import { useAuth } from '@/contexts/auth-context';
import { toast } from 'react-hot-toast';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const { user } = useAuth();

  const handleRequestQuote = () => {
    router.push('/contact?product=' + encodeURIComponent(product.name));
    onClose();
  };

  const handleAddToCart = async () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    try {
      await addItem(product, 1);
      toast.success('Added to cart');
      onClose();
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-2xl transform rounded-2xl bg-gradient-custom p-6 shadow-xl transition-all">
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6 text-gray-300" />
                </button>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="aspect-square relative bg-white/5 rounded-xl overflow-hidden">
                    <Image
                      src={product.image || '/images/product-placeholder.png'}
                      alt={product.name}
                      fill
                      className="object-contain p-4"
                    />
                  </div>

                  <div className="space-y-6">
                    <div>
                      <Dialog.Title className="text-2xl font-semibold text-gray-100">
                        {product.name}
                      </Dialog.Title>
                      {product.make && (
                        <p className="text-gray-400 mt-1">Brand: {product.make}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Catalogue ID</p>
                        <p className="text-gray-200">{product.catalogueId}</p>
                      </div>
                      {product.casNumber && (
                        <div>
                          <p className="text-sm text-gray-400">CAS Number</p>
                          <p className="text-gray-200">{product.casNumber}</p>
                        </div>
                      )}
                      {product.hsnCode && (
                        <div>
                          <p className="text-sm text-gray-400">HSN Code</p>
                          <p className="text-gray-200">{product.hsnCode}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-gray-400">Pack Size</p>
                        <p className="text-gray-200">{product.packSize}</p>
                      </div>
                    </div>

                    {product.description && (
                      <div>
                        <p className="text-sm text-gray-400">Description</p>
                        <p className="text-gray-200 mt-1">{product.description}</p>
                      </div>
                    )}

                    {product.specifications && (
                      <div>
                        <p className="text-sm text-gray-400">Specifications</p>
                        <p className="text-gray-200 mt-1">{product.specifications}</p>
                      </div>
                    )}

                    <div className="flex gap-4 pt-4">
                      <button
                        onClick={handleRequestQuote}
                        className="flex-1 px-6 py-3 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/90 transition-colors"
                      >
                        Request Quote
                      </button>
                      <button
                        onClick={handleAddToCart}
                        className="flex-1 px-6 py-3 bg-accent-purple text-white rounded-lg hover:bg-accent-purple/90 transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
