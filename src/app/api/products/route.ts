import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

// Helper function to read and parse CSV
async function readProductsFromCSV() {
  const csvPath = path.join(process.cwd(), 'products.csv');
  const fileContents = await fs.readFile(csvPath, 'utf-8');
  return parse(fileContents, {
    columns: true,
    skip_empty_lines: true
  });
}

export async function GET() {
  try {
    const products = await readProductsFromCSV();
    return NextResponse.json(products);
  } catch (error) {
    console.error('[PRODUCTS_GET]', error);
    return new NextResponse('Error reading products', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, category, description, price, unit, sku, stockQuantity, imageUrl } = body;

    // Validate required fields with specific messages
    const missingFields = [];
    if (!name) missingFields.push('name');
    if (!category) missingFields.push('category');
    if (!description) missingFields.push('description');
    if (!price) missingFields.push('price');
    if (!unit) missingFields.push('unit');
    if (!sku) missingFields.push('sku');
    if (!stockQuantity) missingFields.push('stockQuantity');

    if (missingFields.length > 0) {
      return new NextResponse(
        `Missing required fields: ${missingFields.join(', ')}`,
        { status: 400 }
      );
    }

    // Validate numeric fields
    if (isNaN(parseFloat(price))) {
      return new NextResponse('Price must be a valid number', { status: 400 });
    }
    if (isNaN(parseFloat(stockQuantity))) {
      return new NextResponse('Stock quantity must be a valid number', { status: 400 });
    }

    // Read existing products
    const products = await readProductsFromCSV();
    
    // Check if SKU already exists
    if (products.some((p: any) => p.sku === sku)) {
      return new NextResponse('SKU already exists', { status: 400 });
    }

    // Append new product to CSV
    const newProduct = {
      name,
      category,
      description,
      price: parseFloat(price),
      unit,
      sku,
      stockQuantity: parseFloat(stockQuantity),
      imageUrl: imageUrl || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const csvPath = path.join(process.cwd(), 'products.csv');
    const csvContent = await fs.readFile(csvPath, 'utf-8');
    const headers = csvContent.split('\n')[0];
    
    const newLine = Object.values(newProduct).join(',');
    await fs.writeFile(csvPath, `${csvContent}${newLine}\n`);

    return NextResponse.json(newProduct);
  } catch (error) {
    console.error('[PRODUCTS_POST]', error);
    return new NextResponse('Error creating product', { status: 500 });
  }
}
