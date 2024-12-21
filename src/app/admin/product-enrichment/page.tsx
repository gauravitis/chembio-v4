'use client';

import { useState } from 'react';
import { ApiResponse, EnrichedProduct } from './types';

export default function ProductEnrichmentPage() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [results, setResults] = useState<ApiResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            setIsProcessing(true);
            setError(null);

            // Create FormData and append file
            const formData = new FormData();
            formData.append('file', file);

            console.log('Uploading file:', file.name);

            // Send file to API endpoint
            const response = await fetch('/api/product-enrichment', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            console.log('API Response:', result);

            if (!response.ok) {
                throw new Error(result.error || 'Failed to process file');
            }

            setResults(result);
        } catch (error) {
            console.error('Error processing products:', error);
            setError(error instanceof Error ? error.message : 'An error occurred');
        } finally {
            setIsProcessing(false);
        }
    };

    // Helper function to get successful products
    const getSuccessfulProducts = () => {
        if (!results) return [];
        return results.results.filter(r => r.success && r.product);
    };

    // Helper function to get failed products
    const getFailedProducts = () => {
        if (!results) return [];
        return results.results.filter(r => !r.success);
    };

    return (
        <div className="min-h-screen bg-gradient-custom py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-xl">
                    <h1 className="text-3xl font-bold text-white mb-8">
                        Product Enrichment System
                    </h1>
                    
                    <div className="space-y-8">
                        {/* File Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Upload Products CSV
                            </label>
                            <input
                                type="file"
                                accept=".csv"
                                onChange={handleFileUpload}
                                disabled={isProcessing}
                                className="block w-full text-sm text-gray-300
                                           file:mr-4 file:py-2 file:px-4
                                           file:rounded-full file:border-0
                                           file:text-sm file:font-semibold
                                           file:bg-blue-50 file:text-blue-700
                                           hover:file:bg-blue-100
                                           disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-900/20 p-4 rounded-lg">
                                <p className="text-red-400">{error}</p>
                            </div>
                        )}

                        {/* Loading State */}
                        {isProcessing && (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                <p className="text-sm text-gray-300">Processing file...</p>
                            </div>
                        )}

                        {/* Results */}
                        {results && (
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-white">Results</h2>
                                
                                {/* Stats */}
                                <div className="bg-blue-900/20 p-4 rounded-lg mb-4">
                                    <h3 className="text-lg font-medium text-blue-400 mb-2">
                                        Statistics
                                    </h3>
                                    <div className="text-sm text-gray-300">
                                        <p>Total Products: {results.stats.total}</p>
                                        <p>Successfully Enriched: {results.stats.successful}</p>
                                        <p>Success Rate: {results.stats.successRate}%</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Successful Products */}
                                    <div className="bg-green-900/20 p-4 rounded-lg">
                                        <h3 className="text-lg font-medium text-green-400 mb-2">
                                            Successfully Enriched ({getSuccessfulProducts().length})
                                        </h3>
                                        <div className="max-h-60 overflow-y-auto">
                                            {getSuccessfulProducts().map((result, index) => (
                                                <div
                                                    key={index}
                                                    className="text-sm text-gray-300 py-1 hover:bg-white/5 rounded px-2"
                                                >
                                                    <div className="font-medium">
                                                        {result.product?.catalogNumber} - {result.product?.name}
                                                    </div>
                                                    <div className="text-xs text-gray-400 mt-1">
                                                        {result.product?.description}
                                                    </div>
                                                    {result.product?.url && (
                                                        <a
                                                            href={result.product.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-xs text-blue-400 hover:text-blue-300 mt-1 block"
                                                        >
                                                            View on Abdos →
                                                        </a>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Failed Products */}
                                    <div className="bg-red-900/20 p-4 rounded-lg">
                                        <h3 className="text-lg font-medium text-red-400 mb-2">
                                            Failed to Enrich ({getFailedProducts().length})
                                        </h3>
                                        <div className="max-h-60 overflow-y-auto">
                                            {getFailedProducts().map((result, index) => (
                                                <div
                                                    key={index}
                                                    className="text-sm text-gray-300 py-1 hover:bg-white/5 rounded px-2"
                                                >
                                                    <div className="font-medium text-red-300">
                                                        Error: {result.error}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
