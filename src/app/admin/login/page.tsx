'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/ui/page-header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

export default function AdminLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // Check if already logged in
  useEffect(() => {
    const adminToken = Cookies.get('admin_token');
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
        
        // Get the base domain (remove any subdomains)
        const domainParts = window.location.hostname.split('.');
        const baseDomain = domainParts.slice(-2).join('.');
        
        const cookieOptions = {
          path: '/',
          expires: 1, // 1 day
          sameSite: 'strict' as const,
          secure: isProduction,
          domain: isProduction ? baseDomain : undefined
        };
        
        console.log('Setting cookie with options:', JSON.stringify(cookieOptions));
        
        try {
          // First, clear any existing cookie
          Cookies.remove('admin_token', { path: '/' });
          
          // Set the new cookie
          Cookies.set('admin_token', ADMIN_TOKEN, cookieOptions);
          
          // Verify cookie was set
          const cookieSet = Cookies.get('admin_token');
          console.log('Cookie verification:', cookieSet ? 'Cookie found after setting' : 'Cookie not found after setting');
          
          if (!cookieSet) {
            throw new Error('Failed to set cookie');
          }
          
          toast.success('Login successful');
          console.log('Cookie set, redirecting...');

          // Use router.push for client-side navigation
          router.push('/admin/products');
        } catch (error) {
          console.error('Error setting cookie:', error);
          toast.error('Failed to set login cookie');
        }
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
    <main className="min-h-screen bg-gradient-custom">
      <PageHeader 
        title="Admin Login" 
        subtitle="Enter your credentials to access the admin panel" 
      />

      <div className="max-w-md mx-auto mt-8 p-6 bg-white/90 backdrop-blur-lg rounded-lg shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
          <div>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </div>
    </main>
  );
} 