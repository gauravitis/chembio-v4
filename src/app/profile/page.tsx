'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { PageHeader } from '@/components/ui/page-header';
import { useCart } from '@/contexts/cart-context';
import { motion } from 'framer-motion';
import { Package, User, LogOut, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toast } from 'react-hot-toast';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('profile');

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  const tabs = [
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      content: (
        <div className="space-y-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Account Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Email</label>
                <p className="mt-1">{user?.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Name</label>
                <p className="mt-1">{user?.displayName || 'Not set'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Account Created</label>
                <p className="mt-1">{user?.metadata.creationTime}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Account Actions</h3>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      ),
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: Package,
      content: (
        <div className="space-y-4">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">Order #{order.id}</h3>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {order.status}
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-gray-600">Total: ₹{order.total}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
              <p className="text-gray-500 mb-4">When you make your first purchase, it will appear here.</p>
              <Link
                href="/products"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-custom">
      <PageHeader
        title="My Account"
        subtitle="Manage your profile and view your orders"
      />

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                    activeTab === tab.id
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-blue-100 rounded-lg -z-10"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {tabs.find((tab) => tab.id === activeTab)?.content}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
