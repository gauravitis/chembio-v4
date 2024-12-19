import { NextResponse } from 'next/server';
import { createHmac } from 'crypto';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(request: Request) {
  try {
    const {
      orderId,
      paymentId,
      signature,
      items,
      amount,
      userId,
    } = await request.json();

    // Verify the payment signature
    const secret = process.env.RAZORPAY_KEY_SECRET || '';
    const body = orderId + '|' + paymentId;
    const expectedSignature = createHmac('sha256', secret)
      .update(body.toString())
      .digest('hex');

    if (signature !== expectedSignature) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Store the order in Firestore
    const ordersRef = collection(db, 'orders');
    await addDoc(ordersRef, {
      userId,
      orderId,
      paymentId,
      items,
      amount,
      status: 'completed',
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('[VERIFY_PAYMENT]', error);
    return NextResponse.json(
      { error: 'Error verifying payment', details: error.message },
      { status: 500 }
    );
  }
}
