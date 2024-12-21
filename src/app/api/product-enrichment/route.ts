import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'csv-parse/sync';
import { RawProduct, ScrapingResult } from '@/app/admin/product-enrichment/types';
import { AbdosScraper } from '@/app/admin/product-enrichment/scrapers/abdos';
import { validateProduct } from '@/app/admin/product-enrichment/utils/csv-parser';

export const maxDuration = 300; // Set max duration to 300 seconds
export const dynamic = 'force-dynamic'; // Disable static optimization

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ 
        success: false, 
        error: 'No file uploaded' 
      }, { status: 400 });
    }

    // Parse CSV file
    const csvContent = await file.text();
    console.log('CSV content first 100 chars:', csvContent.substring(0, 100));

    let records;
    try {
      records = parse(csvContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true
      });
    } catch (error) {
      console.error('CSV parsing error:', error);
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to parse CSV file',
        details: error instanceof Error ? error.message : 'Unknown parsing error'
      }, { status: 400 });
    }

    if (!Array.isArray(records) || records.length === 0) {
      return NextResponse.json({ 
        success: false, 
        error: 'No valid records found in CSV' 
      }, { status: 400 });
    }

    console.log('First record:', records[0]);

    // Convert records to RawProduct objects
    const products: RawProduct[] = records
      .map((record: any) => ({
        companyName: record["Company's Name"] || '',
        catalogNumber: record["Cat. No"] || '',
        productName: record["Product Name"] || ''
      }))
      .filter(validateProduct);

    console.log(`Found ${products.length} valid products`);

    if (products.length === 0) {
      return NextResponse.json({ 
        success: false, 
        error: 'No valid products found in CSV',
        details: 'Please check column names: "Company\'s Name", "Cat. No", "Product Name"'
      }, { status: 400 });
    }

    // Filter Abdos products
    const abdosProducts = products.filter(p => 
      p.companyName.toLowerCase().trim() === 'abdos'
    );

    console.log(`Found ${abdosProducts.length} Abdos products`);

    if (abdosProducts.length === 0) {
      return NextResponse.json({
        success: true,
        results: [],
        stats: {
          total: 0,
          successful: 0,
          successRate: "0.00"
        },
        message: "No Abdos products found in CSV"
      });
    }

    // Initialize scraper and process products
    const abdosScraper = new AbdosScraper();
    const results: ScrapingResult[] = [];

    // Process products one at a time
    for (const product of abdosProducts) {
      try {
        console.log(`Processing product: ${product.catalogNumber}`);
        const result = await abdosScraper.scrapeAbdosProduct(product);
        results.push(result);
      } catch (error) {
        console.error(`Error processing product ${product.catalogNumber}:`, error);
        results.push({
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error processing product'
        });
      }
    }

    // Calculate statistics
    const successfulResults = results.filter(r => r.success);
    const successRate = results.length > 0 ? (successfulResults.length / results.length) * 100 : 0;

    console.log('Processing completed:', {
      total: results.length,
      successful: successfulResults.length,
      successRate: `${successRate.toFixed(2)}%`
    });

    return NextResponse.json({
      success: true,
      results,
      stats: {
        total: results.length,
        successful: successfulResults.length,
        successRate: successRate.toFixed(2)
      }
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to process products',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
