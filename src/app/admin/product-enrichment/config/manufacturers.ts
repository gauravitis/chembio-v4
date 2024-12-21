export interface ManufacturerConfig {
    name: string;
    baseUrl: string;
    searchUrl: string;
    productUrlPattern?: string;
    catalogPattern?: RegExp;
    selectors?: {
        name?: string;
        description?: string;
        price?: string;
        packSize?: string;
        purity?: string;
        casNumber?: string;
        imageUrl?: string;
    };
}

export interface Manufacturer {
  name: string;
  baseUrl: string;
  searchUrl: string;
  catalogPattern: RegExp;
  selectors: {
    productName: string;
    description?: string;
    packSize?: string;
    casNumber?: string;
    price?: string;
  };
}

export const manufacturers: { [key: string]: ManufacturerConfig } & Manufacturer[] = {
    'MERCK': {
        name: 'Merck',
        baseUrl: 'https://www.sigmaaldrich.com',
        searchUrl: 'https://www.sigmaaldrich.com/IN/en/product/',
        catalogPattern: /^(\d{6}|\d{5}|\d{4})-\d+[A-Z]*|\d+\.\d+\.\d+/i,
        selectors: {
            name: '.product-detail h1',
            description: '.product-detail__short-description',
            packSize: '.product-detail__pack-size',
            casNumber: '[data-testid="cas-number"]',
            imageUrl: '.product-detail__image img'
        }
    },
    'SRL': {
        name: 'SRL',
        baseUrl: 'https://www.srlchem.com',
        searchUrl: 'https://www.srlchem.com/products/search?search=',
        catalogPattern: /^(CLS|GRM|MB|PHC|SM|MS|SLF?G|[A-Z]+)\d+/i,
        selectors: {
            name: '.product-title',
            description: '.product-description',
            packSize: '.pack-size',
            casNumber: '.cas-number'
        }
    },
    'TARSONS': {
        name: 'Tarsons',
        baseUrl: 'https://www.tarsons.com',
        searchUrl: 'https://www.tarsons.com/product/',
        catalogPattern: /^(T-|SCT-|MCT-)/i,
        selectors: {
            name: '.product_title',
            description: '.woocommerce-product-details__short-description',
            packSize: '.pack-size'
        }
    },
    'ABDOS': {
        name: 'Abdos',
        baseUrl: 'https://www.abdoslifesciences.com',
        searchUrl: 'https://www.abdoslifesciences.com/search?q={catalogNumber}',
        catalogPattern: /^[PE]/i,
        selectors: {
            name: '.product-title',
            description: '.product-description',
            packSize: '.pack-size',
            casNumber: '.cas-number',
            price: '.price'
        }
    }
};

export function identifyManufacturer(catalogNumber: string, companyName: string): ManufacturerConfig | null {
    // First try to match by company name
    const normalizedCompanyName = companyName.trim().toUpperCase();
    if (manufacturers[normalizedCompanyName]) {
        return manufacturers[normalizedCompanyName];
    }

    // If company name doesn't match, try to match by catalog number pattern
    for (const manufacturer of Object.values(manufacturers)) {
        if (manufacturer.catalogPattern && manufacturer.catalogPattern.test(catalogNumber)) {
            return manufacturer;
        }
    }

    return null;
}

export function formatProductUrl(manufacturer: ManufacturerConfig, catalogNumber: string): string {
    switch (manufacturer.name) {
        case 'Merck':
            return `${manufacturer.searchUrl}${catalogNumber}`;
        case 'SRL':
            return `${manufacturer.searchUrl}${encodeURIComponent(catalogNumber)}`;
        case 'Abdos':
            // Remove any special characters and spaces from catalog number
            const cleanCatalog = catalogNumber.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
            return `${manufacturer.searchUrl}${cleanCatalog}`;
        case 'Tarsons':
            return `${manufacturer.searchUrl}${encodeURIComponent(catalogNumber)}`;
        default:
            return `${manufacturer.searchUrl}${encodeURIComponent(catalogNumber)}`;
    }
}
