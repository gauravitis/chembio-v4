'use client';

import { PageHeader } from '@/components/ui/page-header';
import { motion } from 'framer-motion';

export default function ShippingAndDelivery() {
  return (
    <main className="min-h-screen bg-gradient-custom">
      <PageHeader 
        title="Shipping and Delivery" 
        subtitle="Last updated on Dec 19 2024" 
      />

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8"
          >
            <div className="prose prose-lg">
              <p className="text-gray-600 mb-8">
                <a href="https://merchant.razorpay.com/policy/PH8FRvVfs0s4lT/shipping" className="text-blue-600 hover:text-blue-800 underline">
                  View on Razorpay
                </a>
              </p>

              <div className="space-y-6 text-gray-600">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">International Orders</h2>
                <p>
                  For International buyers, orders are shipped and delivered through registered international courier companies and/or International speed post only.
                </p>

                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Domestic Orders</h2>
                <p>
                  For domestic buyers, orders are shipped through registered domestic courier companies and /or speed post only.
                </p>

                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Delivery Timeline</h2>
                <p>
                  Orders are shipped within 8-14 days or as per the delivery date agreed at the time of order confirmation and delivering of the shipment subject to Courier Company / post office norms.
                </p>

                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Delivery Disclaimer</h2>
                <p>
                  CHEMBIO LIFESCIENCES PRIVATE LIMITED is not liable for any delay in delivery by the courier company / postal authorities and only guarantees to hand over the consignment to the courier company or postal authorities within 8-14 days from the date of the order and payment or as per the delivery date agreed at the time of order confirmation.
                </p>

                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Delivery Address</h2>
                <p>
                  Delivery of all orders will be to the address provided by the buyer. Delivery of our services will be confirmed on your mail ID as specified during registration.
                </p>

                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact for Support</h2>
                <p>
                  For any issues in utilizing our services you may contact our helpdesk on{' '}
                  <a href="tel:01204909400" className="text-blue-600 hover:text-blue-800">01204909400</a> or{' '}
                  <a href="mailto:sales.chembio@gmail.com" className="text-blue-600 hover:text-blue-800">sales.chembio@gmail.com</a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
