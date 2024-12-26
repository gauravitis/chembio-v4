import { NextResponse } from 'next/server';
import { cleanProducts } from '@/scripts/clean-products';
import { db } from '@/lib/firebase';
import { deleteDoc, doc } from 'firebase/firestore';

export async function GET() {
  try {
    const results = await cleanProducts();
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error in clean-products API:', error);
    return NextResponse.json({ error: 'Failed to analyze products' }, { status: 500 });
  }
}

export async function POST() {
  try {
    const results = await cleanProducts();
    
    // Delete the problematic products
    for (const product of results.productsToDelete) {
      await deleteDoc(doc(db, 'products', product.id));
    }

    return NextResponse.json({
      ...results,
      message: `Successfully deleted ${results.productsToDelete.length} products`
    });
  } catch (error) {
    console.error('Error in clean-products API:', error);
    return NextResponse.json({ error: 'Failed to clean products' }, { status: 500 });
  }
}
