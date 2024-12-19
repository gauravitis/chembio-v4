import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

let razorpay: Razorpay | null = null;

try {
  if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET) {
    console.error('Razorpay credentials are not configured');
  } else {
    razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET,
    });
  }
} catch (error) {
  console.error('Failed to initialize Razorpay:', error);
}

export async function POST(request: Request) {
  try {
    if (!razorpay) {
      console.error('Razorpay not initialized. Key ID:', process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ? 'present' : 'missing');
      return NextResponse.json(
        { 
          error: 'Payment service not configured',
          details: 'Razorpay credentials are missing or invalid'
        },
        { status: 500 }
      );
    }

    const { amount } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { 
          error: 'Invalid amount',
          details: 'Amount must be greater than 0'
        },
        { status: 400 }
      );
    }

    const options = {
      amount: Math.round(amount * 100), // Convert to paise and ensure it's a whole number
      currency: 'INR',
      receipt: `order_${Date.now()}`,
    };

    console.log('Creating order with options:', options);
    const order = await razorpay.orders.create(options);
    console.log('Order created:', order);

    return NextResponse.json({
      orderId: order.id,
      amount: options.amount,
      currency: options.currency,
    });
  } catch (error: any) {
    console.error('[CREATE_ORDER]', error);
    
    // Check if it's a Razorpay API error
    const errorMessage = error.error?.description || error.message || 'Unknown error';
    
    return NextResponse.json(
      { 
        error: 'Error creating order',
        details: errorMessage
      }, 
      { status: 500 }
    );
  }
}
