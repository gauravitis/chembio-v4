declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayOptions {
  amount: number;
  currency?: string;
  orderId: string;
  name: string;
  description: string;
  image?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  handler: (response: any) => void;
}

export const loadRazorpay = () => {
  if (typeof window === 'undefined') {
    return Promise.resolve(false);
  }

  return new Promise<boolean>((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.error('Failed to load Razorpay SDK');
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const initializeRazorpayPayment = async (options: RazorpayOptions) => {
  const res = await loadRazorpay();

  if (!res) {
    throw new Error('Razorpay SDK failed to load. Please check your internet connection.');
  }

  if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
    throw new Error('Razorpay key ID is not configured');
  }

  const razorpayOptions = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: Math.round(options.amount * 100), // Razorpay expects amount in paise
    currency: options.currency || 'INR',
    name: options.name,
    description: options.description,
    image: options.image,
    order_id: options.orderId,
    handler: options.handler,
    prefill: options.prefill || {},
    theme: options.theme || { color: '#3B82F6' },
    modal: {
      ondismiss: () => {
        console.log('Payment modal closed');
      },
    },
  };

  const razorpay = new window.Razorpay(razorpayOptions);
  razorpay.open();

  return razorpay;
};
