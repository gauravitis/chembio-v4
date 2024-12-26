'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';

export default function CleanProductsPage() {
  const [analyzing, setAnalyzing] = useState(false);
  const [cleaning, setCleaning] = useState(false);
  const [results, setResults] = useState<any>(null);

  const analyzeProducts = async () => {
    try {
      setAnalyzing(true);
      const response = await fetch('/api/admin/clean-products');
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error);
      
      setResults(data);
      toast.success('Analysis completed successfully');
    } catch (error) {
      console.error('Error analyzing products:', error);
      toast.error('Failed to analyze products');
    } finally {
      setAnalyzing(false);
    }
  };

  const cleanProducts = async () => {
    try {
      setCleaning(true);
      const response = await fetch('/api/admin/clean-products', {
        method: 'POST'
      });
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error);
      
      setResults(data);
      toast.success(data.message || 'Products cleaned successfully');
    } catch (error) {
      console.error('Error cleaning products:', error);
      toast.error('Failed to clean products');
    } finally {
      setCleaning(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Clean Products Database</h1>
      
      <div className="space-y-8">
        <div className="space-y-4">
          <Button 
            onClick={analyzeProducts} 
            disabled={analyzing}
            variant="outline"
          >
            {analyzing ? 'Analyzing...' : 'Analyze Products'}
          </Button>
          
          {results && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p>Total Products: {results.totalProducts}</p>
                  <p>Valid Products: {results.validProducts}</p>
                  <p>Unique Products: {results.uniqueProducts}</p>
                  <p>Duplicate Products: {results.duplicates}</p>
                  <p>Products to Delete: {results.productsToDelete?.length || 0}</p>
                </div>
                
                {results.productsToDelete?.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Products to be Removed:</h3>
                    <div className="max-h-60 overflow-y-auto space-y-2">
                      {results.productsToDelete.map((product: any) => (
                        <div key={product.id} className="text-sm">
                          {product.name} (CAS: {product.casNumber || 'No CAS'})
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {results.productsToDelete?.length > 0 && (
                <Button
                  onClick={cleanProducts}
                  disabled={cleaning}
                  variant="destructive"
                  className="mt-4"
                >
                  {cleaning ? 'Cleaning...' : 'Clean Database'}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
