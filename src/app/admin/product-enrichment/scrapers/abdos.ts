import { RawProduct, ScrapingResult } from '../types';
import puppeteer from 'puppeteer';

export class AbdosScraper {
  private browser: any = null;

  async initialize() {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
    }
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async scrapeAbdosProduct(product: RawProduct): Promise<ScrapingResult> {
    try {
      await this.initialize();
      const page = await this.browser.newPage();

      // Set a longer timeout
      await page.setDefaultNavigationTimeout(30000);

      // Enable request interception
      await page.setRequestInterception(true);
      page.on('request', (request) => {
        if (['image', 'stylesheet', 'font'].includes(request.resourceType())) {
          request.abort();
        } else {
          request.continue();
        }
      });

      console.log('Processing product:', {
        catalogNumber: product.catalogNumber,
        name: product.productName
      });

      // First try the main website search
      await page.goto('https://www.abdoslifesciences.com', { waitUntil: 'networkidle0' });
      await this.delay(2000); // Wait for page to stabilize

      // Try to find and click search button
      const searchButton = await page.$('button[aria-label="Search"], .search-button, [class*="search"]');
      if (searchButton) {
        await searchButton.click();
        await this.delay(1000);
      }

      // Try to find search input
      const searchInput = await page.$('input[type="search"], input[placeholder*="search"], input[class*="search"]');
      if (searchInput) {
        await searchInput.type(product.catalogNumber);
        await page.keyboard.press('Enter');
        await this.delay(2000);
      }

      // Wait for search results
      await page.waitForSelector('.products-grid, .product-grid, .search-results', { timeout: 10000 })
        .catch(() => console.log('No search results container found'));

      // Extract all product links
      const productLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a'));
        return links
          .filter(link => {
            const text = link.textContent?.toLowerCase() || '';
            const href = link.href.toLowerCase();
            return (
              href.includes('/product/') ||
              href.includes('/products/') ||
              text.includes('product')
            );
          })
          .map(link => ({
            href: link.href,
            text: link.textContent?.trim() || ''
          }));
      });

      console.log('Found product links:', productLinks);

      // Try to find matching product
      let productFound = false;
      for (const link of productLinks) {
        if (
          link.text.toLowerCase().includes(product.catalogNumber.toLowerCase()) ||
          link.text.toLowerCase().includes(product.productName.toLowerCase())
        ) {
          await page.goto(link.href, { waitUntil: 'networkidle0' });
          productFound = true;
          break;
        }
      }

      // If not found, try category pages
      if (!productFound) {
        const categoryUrls = [
          'https://www.abdoslifesciences.com/categories/lab-supplies',
          'https://www.abdoslifesciences.com/categories/lab-equipment',
          'https://www.abdoslifesciences.com/categories/chemicals'
        ];

        for (const url of categoryUrls) {
          if (productFound) break;

          await page.goto(url, { waitUntil: 'networkidle0' });
          await this.delay(2000);

          const categoryProducts = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.product-item, .product-card, [class*="product"]'))
              .map(item => ({
                title: item.textContent?.trim() || '',
                link: (item.querySelector('a')?.href || '').trim()
              }));
          });

          for (const item of categoryProducts) {
            if (
              item.title.toLowerCase().includes(product.catalogNumber.toLowerCase()) ||
              item.title.toLowerCase().includes(product.productName.toLowerCase())
            ) {
              await page.goto(item.link, { waitUntil: 'networkidle0' });
              productFound = true;
              break;
            }
          }
        }
      }

      if (!productFound) {
        await page.close();
        return {
          success: false,
          error: 'Product not found on Abdos website'
        };
      }

      // Extract product information
      const productInfo = await page.evaluate(() => {
        const getTextContent = (selector: string): string => {
          const element = document.querySelector(selector);
          return element ? element.textContent?.trim() || '' : '';
        };

        return {
          name: getTextContent('h1, .product-title, .title'),
          description: getTextContent('.product-description, .description, [class*="description"]'),
          packSize: getTextContent('.pack-size, [class*="pack"], [class*="volume"]'),
          casNumber: getTextContent('.cas-number, [class*="cas"]'),
          url: window.location.href
        };
      });

      await page.close();

      // Try to extract pack size from text if not found
      if (!productInfo.packSize) {
        const packSizeMatch = (productInfo.description || productInfo.name || product.productName)
          .match(/(\d+(?:\.\d+)?\s*(?:ml|ML|mL|g|kg|mg|µg|L|pcs|pieces|pack|box))/i);
        if (packSizeMatch) {
          productInfo.packSize = packSizeMatch[1];
        }
      }

      return {
        success: true,
        product: {
          id: `abdos-${product.catalogNumber}`,
          name: productInfo.name || product.productName,
          description: productInfo.description || product.productName,
          manufacturer: 'Abdos',
          catalogNumber: product.catalogNumber,
          packSize: productInfo.packSize || undefined,
          casNumber: productInfo.casNumber || undefined,
          category: 'Lab Supplies',
          url: productInfo.url
        }
      };

    } catch (error) {
      console.error('Scraping error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to scrape product'
      };
    } finally {
      await this.cleanup();
    }
  }
}
