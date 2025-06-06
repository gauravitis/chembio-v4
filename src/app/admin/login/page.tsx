'use client';

import { useState, useEffect } from 'react';
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

  // Check if already logged in
  useEffect(() => {
    const adminToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('admin_token='));

    if (adminToken) {
      router.push('/admin/products');
    }
  }, [router]);

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
        
        // Set admin token cookie with proper attributes for both development and production
        const isProduction = window.location.hostname !== 'localhost';
        console.log('Environment:', isProduction ? 'Production' : 'Development');
        console.log('Hostname:', window.location.hostname);
        
        const cookieOptions = [
          `admin_token=${ADMIN_TOKEN}`,
          'path=/',
          'max-age=86400',
          'SameSite=Lax',
          // Don't set domain in production - let the browser use the current domain
          isProduction ? 'secure' : ''
        ].filter(Boolean).join('; ');
        
        console.log('Setting cookie with options:', cookieOptions);
        document.cookie = cookieOptions;
        
        // Verify cookie was set
        const cookieSet = document.cookie
          .split('; ')
          .some(row => row.startsWith('admin_token='));
        console.log('Cookie verification:', cookieSet ? 'Cookie found after setting' : 'Cookie not found after setting');
        
        toast.success('Login successful');
        console.log('Cookie set, redirecting...');

        // Use both methods to ensure redirection works
        router.push('/admin/products');
        setTimeout(() => {
          window.location.href = '/admin/products';
        }, 500);
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
              autoComplete="username"
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
              autoComplete="current-password"
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