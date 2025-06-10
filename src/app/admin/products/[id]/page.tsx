// Server Component
import { Metadata } from 'next';
import { Product } from '@/types/product';

// For static export, we need to provide a list of product IDs
// In a real-world scenario, you would generate this list from your CMS or database
// before the build process and save it to a JSON file or environment variable
export async function generateStaticParams() {
  // This is a simplified approach for static export
  // In production, you would fetch this data during the build process
  // and not rely on client-side Firebase SDK which can't be used during static build
  
  // Return a hardcoded list of product IDs or an empty array
  // You can replace this with actual product IDs if known at build time
  return [
    { id: 'placeholder-product' },
    { id: 'new' }, // Include 'new' for the create product page
    // Add more product IDs as needed
  ];
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  return {
    title: params.id === 'new' ? 'Add New Product' : `Edit Product ${params.id}`,
    description: params.id === 'new' ? 'Add a new product to the catalog' : `Edit product ${params.id} details`,
  };
}

// Import the client component
import ProductPageClient from './client';

export default function ProductPage({ params }: { params: { id: string } }) {
  return <ProductPageClient params={params} />;
}
