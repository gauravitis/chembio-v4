import { Browser, chromium } from 'playwright';
import asyncRetry from 'async-retry';
import winston from 'winston';

// Configure logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'scraper-error.log', level: 'error' }),
    new winston.transports.File({ filename: 'scraper.log' })
  ]
});

export interface ScraperConfig {
  baseUrl: string;
  searchUrl: string;
  selectors: {
    productName: string;
    description?: string;
    packSize?: string;
    casNumber?: string;
    price?: string;
    [key: string]: string | undefined;
  };
  catalogPattern: RegExp;
  rateLimit?: number; // requests per minute
}

export interface ProductData {
  name: string;
  description?: string;
  packSize?: string;
  casNumber?: string;
  price?: string;
  manufacturer: string;
  catalogNumber: string;
  url?: string;
  [key: string]: any;
}

export abstract class BaseScraper {
  protected browser: Browser | null = null;
  protected lastRequestTime: number = 0;
  protected readonly rateLimit: number;

  constructor(
    protected readonly config: ScraperConfig,
    protected readonly manufacturer: string
  ) {
    this.rateLimit = config.rateLimit || 60; // default to 60 requests per minute
  }

  protected async initialize() {
    if (!this.browser) {
      this.browser = await chromium.launch({
        headless: true,
      });
    }
  }

  protected async rateLimitDelay() {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    const minDelay = (60 * 1000) / this.rateLimit;

    if (timeSinceLastRequest < minDelay) {
      await new Promise(resolve => setTimeout(resolve, minDelay - timeSinceLastRequest));
    }
    this.lastRequestTime = Date.now();
  }

  protected async withRetry<T>(operation: () => Promise<T>): Promise<T> {
    return asyncRetry(
      async (bail) => {
        try {
          await this.rateLimitDelay();
          return await operation();
        } catch (error: any) {
          logger.error('Scraping error', {
            manufacturer: this.manufacturer,
            error: error.message,
            stack: error.stack,
          });
          throw error;
        }
      },
      {
        retries: 3,
        factor: 2,
        minTimeout: 1000,
        maxTimeout: 5000,
      }
    );
  }

  abstract scrapeProduct(catalogNumber: string): Promise<ProductData>;

  protected async cleanup() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  protected validateProductData(data: ProductData): boolean {
    if (!data.name || !data.catalogNumber) {
      logger.warn('Invalid product data', {
        manufacturer: this.manufacturer,
        data,
      });
      return false;
    }
    return true;
  }

  public async scrapeProducts(catalogNumbers: string[]): Promise<ProductData[]> {
    await this.initialize();
    const results: ProductData[] = [];
    const batchSize = 5; // Process 5 products at a time

    for (let i = 0; i < catalogNumbers.length; i += batchSize) {
      const batch = catalogNumbers.slice(i, i + batchSize);
      const batchPromises = batch.map(async (catalogNumber) => {
        try {
          return await this.scrapeProduct(catalogNumber);
        } catch (error: any) {
          logger.error('Failed to scrape product', {
            manufacturer: this.manufacturer,
            catalogNumber,
            error: error.message,
          });
          return null;
        }
      });

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults.filter((result): result is ProductData => result !== null));
    }

    await this.cleanup();
    return results;
  }
}
