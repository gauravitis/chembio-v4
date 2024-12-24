import { NextResponse } from 'next/server';
import { createHmac } from 'crypto';
import { db } from '@/lib/firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';

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
    const orderData = {
      orderId,
      paymentId,
      signature,
      items,
      amount,
      userId,
      status: 'completed',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    const orderRef = await db.collection('orders').add(orderData);

    return NextResponse.json({
      success: true,
      orderId: orderRef.id,
    });
  } catch (error) {
    console.error('Error processing payment:', error);
    return NextResponse.json(
      { error: 'Failed to process payment' },
      { status: 500 }
    );
  }
}
