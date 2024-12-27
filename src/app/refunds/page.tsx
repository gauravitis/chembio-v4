'use client';

import { PageHeader } from '@/components/ui/page-header';
import { motion } from 'framer-motion';

export default function CancellationAndRefunds() {
  return (
    <main className="min-h-screen bg-gradient-custom">
      <PageHeader 
        title="Cancellation and Refund" 
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
                <a href="https://merchant.razorpay.com/policy/PH8FRvVfs0s4lT/refund" className="text-blue-600 hover:text-blue-800 underline">
                  View on Razorpay
                </a>
              </p>

              <p className="text-gray-600 mb-8">
                CHEMBIO LIFESCIENCES PRIVATE LIMITED believes in helping its customers as far as possible, and has therefore a liberal cancellation policy. Under this policy:
              </p>

              <div className="space-y-6 text-gray-600">
                <p>
                  Cancellations will be considered only if the request is made within 2-3 days of placing the order. However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them.
                </p>

                <p>
                  CHEMBIO LIFESCIENCES PRIVATE LIMITED does not accept cancellation requests for perishable items like flowers, eatables etc. However, refund/replacement can be made if the customer establishes that the quality of product delivered is not good.
                </p>

                <p>
                  In case of receipt of damaged or defective items please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at his own end. This should be reported within 2-3 days of receipt of the products.
                </p>

                <p>
                  In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within 2-3 days of receiving the product. The Customer Service Team after looking into your complaint will take an appropriate decision.
                </p>

                <p>
                  In case of complaints regarding products that come with a warranty from manufacturers, please refer the issue to them.
                </p>

                <p>
                  In case of any Refunds approved by the CHEMBIO LIFESCIENCES PRIVATE LIMITED, it'll take 3-4 days for the refund to be processed to the end customer.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
