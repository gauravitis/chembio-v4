'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/ui/page-header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';

export default function AdminLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Temporary hardcoded credentials
      const ADMIN_USERNAME = 'admin@chembiolifesciences.com';
      const ADMIN_PASSWORD = 'Chembio@2024';
      const ADMIN_TOKEN = 'cb_admin_token';

      console.log('Attempting login with:', formData.username);
      
      if (
        formData.username === ADMIN_USERNAME &&
        formData.password === ADMIN_PASSWORD
      ) {
        console.log('Login successful, setting cookie...');
        // Set admin token cookie with proper attributes
        document.cookie = `admin_token=${ADMIN_TOKEN}; path=/; max-age=86400; SameSite=Strict`;
        
        toast.success('Login successful');
        console.log('Cookie set, redirecting...');
        
        // Use both methods to ensure redirection works
        router.push('/admin/products');
        setTimeout(() => {
          window.location.href = '/admin/products';
        }, 100);
      } else {
        console.log('Invalid credentials');
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-custom flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8 bg-white/5 backdrop-blur-sm rounded-lg">
        <PageHeader
          title="Admin Login"
          description="Enter your credentials to access the admin panel"
        />

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Username</label>
            <Input
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter your username"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Password</label>
            <Input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </div>
    </div>
  );
} 