export interface RawProduct {
    companyName: string;
    catalogNumber: string;
    productName: string;
}

export interface EnrichedProduct {
    id: string;            // Generated unique ID
    name: string;          // Original name
    description: string;   // Scraped description
    casNumber?: string;    // Scraped CAS number if available
    manufacturer: string;  // Original company name
    catalogNumber: string; // Original catalog number
    packSize?: string;     // Derived from product name if available
    category?: string;     // Derived from description/manufacturer
    price?: string;        // If available
    purity?: string;      // If available
    imageUrl?: string;    // If available
}

export interface ScrapingResult {
    success: boolean;
    product?: EnrichedProduct;
    error?: string;
}

export interface ApiResponse {
    success: boolean;
    results: ScrapingResult[];
    stats: {
        total: number;
        successful: number;
        successRate: string;
    };
    error?: string;
}
