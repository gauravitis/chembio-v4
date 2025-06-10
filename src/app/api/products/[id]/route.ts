import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

// For static export, we need to provide a list of product IDs
export async function generateStaticParams() {
  // Return a placeholder ID for static generation
  return [
    { id: 'placeholder-product' },
    // Add more product IDs as needed
  ];
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id;
    const updates = await request.json();

    // Get the product reference
    const productRef = db.collection('products').doc(productId);
    
    // Validate that the product exists
    const product = await productRef.get();
    if (!product.exists) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Update the product
    await productRef.update({
      ...updates,
      updatedAt: new Date().toISOString(),
    });

    // Get the updated product
    const updatedProduct = await productRef.get();
    
    return NextResponse.json({
      product: {
        id: updatedProduct.id,
        ...updatedProduct.data(),
      },
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}