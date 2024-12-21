import { RawProduct } from '../types';

export function extractPackSize(productName: string): string | undefined {
    // Common pack size patterns
    const patterns = [
        /(\d+(?:\.\d+)?\s*(?:ml|ML|mL|g|kg|mg|µg|L|pcs|pieces|pack|box))/i,
        /Capacity[,\s]+(\d+(?:\.\d+)?\s*(?:ml|ML|mL|g|kg|mg|µg|L))/i,
        /(\d+)\s*(?:per|Per)\s*(?:case|pack|box)/i
    ];

    for (const pattern of patterns) {
        const match = productName.match(pattern);
        if (match) {
            return match[1];
        }
    }

    return undefined;
}

export function validateProduct(product: RawProduct): boolean {
    return (
        !!product.companyName &&
        !!product.catalogNumber &&
        !!product.productName &&
        typeof product.companyName === 'string' &&
        typeof product.catalogNumber === 'string' &&
        typeof product.productName === 'string'
    );
}
