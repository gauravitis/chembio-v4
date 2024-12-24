import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { CollectionReference, Query, DocumentData } from 'firebase-admin/firestore';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const searchQuery = searchParams.get('q');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const limitParam = parseInt(searchParams.get('limit') || '12');

    const productsRef = db.collection('products');
    let q: Query<DocumentData> = productsRef;

    if (category) {
      q = q.where('category', '==', category);
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

export async function POST(request: Request) {
  try {
    const product = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'description', 'price', 'category'];
    for (const field of requiredFields) {
      if (!product[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Add default values for optional fields
    const productWithDefaults = {
      ...product,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      stockQuantity: product.stockQuantity || 0,
      rating: product.rating || 0,
      reviewCount: product.reviewCount || 0,
    };

    const docRef = await db.collection('products').add(productWithDefaults);
    const newProduct = {
      id: docRef.id,
      ...productWithDefaults,
    };

    return NextResponse.json({ product: newProduct });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
