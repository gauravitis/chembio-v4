import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { CollectionReference, Query, DocumentData } from 'firebase-admin/firestore';

// Add a runtime configuration to ensure this is a server component
export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const searchQuery = searchParams.get('q');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const limitParam = parseInt(searchParams.get('limit') || '12');
    const onSaleOnly = searchParams.get('onSale') === 'true';

    const productsRef = db.collection('products');
    let q: Query<DocumentData> = productsRef;

    if (category) {
      q = q.where('category', '==', category);
    }

    if (onSaleOnly) {
      q = q.where('isOnSale', '==', true);
    }

    if (searchQuery) {
      q = q.where('name', '>=', searchQuery)
           .where('name', '<=', searchQuery + '\uf8ff');
    }

    q = q.orderBy(sortBy, sortOrder as 'asc' | 'desc');
    if (sortBy !== 'id') {
      q = q.orderBy('id'); // Secondary sort for consistency
    }

    q = q.limit(limitParam);

    const snapshot = await q.get();
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error getting products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// Helper function to clean object of undefined values
function cleanObject(obj: any): any {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== null) {
      acc[key] = value;
    }
    return acc;
  }, {} as any);
}

export async function POST(request: Request) {
  console.log('POST /api/products - Request received');
  
  try {
    // Verify Firebase Admin initialization
    if (!db) {
      console.error('Firebase Admin DB is not initialized');
      return NextResponse.json(
        { error: 'Database not initialized' },
        { status: 500 }
      );
    }

    // Log request details
    console.log('Request headers:', Object.fromEntries(request.headers.entries()));
    
    let product;
    try {
      const text = await request.text();
      console.log('Raw request body:', text);
      product = JSON.parse(text);
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    console.log('Parsed product data:', product);

    // Validate required fields
    const requiredFields = [
      'name',
      'description',
      'price',
      'category',
      'catalogueId',
      'packSize',
      'make'
    ];
    
    const missingFields = requiredFields.filter(field => !product[field]);
    if (missingFields.length > 0) {
      console.log('Missing required fields:', missingFields);
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate CAS number format if provided
    if (product.casNumber) {
      const casNumber = product.casNumber.trim();
      if (casNumber.toLowerCase() !== 'mixture' && 
          !/^\d{1,7}-\d{2}-\d{1}$/.test(casNumber)) {
        console.log('Invalid CAS number format:', casNumber);
        return NextResponse.json(
          { error: 'Invalid CAS number format. Use either a valid CAS number or "mixture"' },
          { status: 400 }
        );
      }
    }

    // Validate HSN code format if provided
    if (product.hsnCode && !/^\d{4,8}$/.test(product.hsnCode.trim())) {
      console.log('Invalid HSN code format:', product.hsnCode);
      return NextResponse.json(
        { error: 'If provided, HSN code must be 4-8 digits' },
        { status: 400 }
      );
    }

    // Prepare product data with defaults and cleaning
    const productWithDefaults = cleanObject({
      ...product,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      stockQuantity: product.stockQuantity || 0,
      rating: product.rating || 0,
      reviewCount: product.reviewCount || 0,
      isOnSale: product.isOnSale || false,
      salePrice: product.isOnSale && product.salePrice ? Number(product.salePrice) : null,
      casNumber: product.casNumber ? product.casNumber.trim().toUpperCase() : null,
      catalogueId: product.catalogueId.trim().toUpperCase(),
      hsnCode: product.hsnCode ? product.hsnCode.trim() : null,
      images: Array.isArray(product.images) ? product.images.filter(Boolean) : [],
    });

    console.log('Cleaned product data:', productWithDefaults);

    try {
      // Test database connection
      const testDoc = await db.collection('_test').doc('_test').get();
      console.log('Database connection test successful');

      const docRef = await db.collection('products').add(productWithDefaults);
      const newProduct = {
        id: docRef.id,
        ...productWithDefaults,
      };
      console.log('Product saved successfully:', newProduct);
      return NextResponse.json({ product: newProduct });
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: `Database error: ${dbError instanceof Error ? dbError.message : 'Unknown error'}` },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Unexpected error in POST /api/products:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
