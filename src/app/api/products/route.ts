import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, where, orderBy, limit, CollectionReference, Query, DocumentData } from 'firebase/firestore';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const searchQuery = searchParams.get('q');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const limitParam = parseInt(searchParams.get('limit') || '12');

    const productsRef = collection(db, 'products');
    let q: Query<DocumentData> = productsRef;
    const constraints: any[] = [];

    if (category) {
      constraints.push(where('category', '==', category));
    }

    if (searchQuery) {
      constraints.push(where('name', '>=', searchQuery));
      constraints.push(where('name', '<=', searchQuery + '\uf8ff'));
    }

    constraints.push(orderBy(sortBy, sortOrder as 'asc' | 'desc'));
    if (sortBy !== 'id') {
      constraints.push(orderBy('id')); // Secondary sort for consistency
    }

    constraints.push(limit(limitParam));

    if (constraints.length > 0) {
      q = query(productsRef, ...constraints);
    }

    const snapshot = await getDocs(q);

    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const {
      name,
      description,
      price,
      image,
      category,
      manufacturer,
      casNumber,
      packSize,
      stockQuantity = 0
    } = await request.json();

    // Validate required fields with specific messages
    const missingFields: string[] = [];
    if (!name) missingFields.push('name');
    if (!category) missingFields.push('category');
    if (!description) missingFields.push('description');
    if (!price) missingFields.push('price');

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: `Missing required fields: ${missingFields.join(', ')}`
        },
        { status: 400 }
      );
    }

    // Create product document
    const productsRef = collection(db, 'products');
    const product = {
      name,
      description,
      price: Number(price),
      image,
      category,
      manufacturer,
      casNumber,
      packSize,
      stockQuantity: Number(stockQuantity),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await addDoc(productsRef, product);

    return NextResponse.json({
      id: docRef.id,
      ...product
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
