'use client';

import { PageHeader } from '@/components/ui/page-header';
import { motion } from 'framer-motion';

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-gradient-custom">
      <PageHeader 
        title="Terms of Service" 
        subtitle="Last updated: January 2024" 
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
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">1. Acceptance of Terms</h2>
              <p className="text-gray-600 mb-8">
                By accessing and using this website, you accept and agree to be bound by the terms and 
                provisions of this agreement. If you do not agree to abide by these terms, please do not 
                use this website.
              </p>

              <h2 className="text-2xl font-semibold mb-6 text-gray-800">2. Products and Services</h2>
              <p className="text-gray-600 mb-8">
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>All products are subject to availability</li>
                  <li>Prices are subject to change without notice</li>
                  <li>Product specifications may vary</li>
                  <li>We reserve the right to limit quantities</li>
                </ul>
              </p>

              <h2 className="text-2xl font-semibold mb-6 text-gray-800">3. Ordering and Payment</h2>
              <p className="text-gray-600 mb-8">
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Orders are subject to acceptance and confirmation</li>
                  <li>Payment must be received prior to shipment</li>
                  <li>We accept major credit cards and bank transfers</li>
                  <li>All prices are in Indian Rupees unless otherwise stated</li>
                </ul>
              </p>

              <h2 className="text-2xl font-semibold mb-6 text-gray-800">4. Shipping and Delivery</h2>
              <p className="text-gray-600 mb-8">
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Delivery times are estimates only</li>
                  <li>Shipping costs are calculated at checkout</li>
                  <li>Risk of loss passes upon delivery</li>
                  <li>International shipping may be subject to customs duties</li>
                </ul>
              </p>

              <h2 className="text-2xl font-semibold mb-6 text-gray-800">5. Returns and Refunds</h2>
              <p className="text-gray-600 mb-8">
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Returns must be authorized within 7 days of receipt</li>
                  <li>Products must be unused and in original packaging</li>
                  <li>Refunds will be processed within 14 business days</li>
                  <li>Shipping costs are non-refundable</li>
                </ul>
              </p>

              <h2 className="text-2xl font-semibold mb-6 text-gray-800">6. Intellectual Property</h2>
              <p className="text-gray-600 mb-8">
                All content on this website, including text, graphics, logos, and images, is the property 
                of Chembio Lifesciences and is protected by copyright laws.
              </p>

              <h2 className="text-2xl font-semibold mb-6 text-gray-800">7. Limitation of Liability</h2>
              <p className="text-gray-600 mb-8">
                Chembio Lifesciences shall not be liable for any direct, indirect, incidental, special, 
                or consequential damages arising from the use of our products or services.
              </p>

              <h2 className="text-2xl font-semibold mb-6 text-gray-800">8. Contact Information</h2>
              <p className="text-gray-600">
                For questions about these Terms of Service, please contact us at:
                <br />
                Email: contact.chembio@gmail.com
                <br />
                Phone: +91 120 1234567
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
