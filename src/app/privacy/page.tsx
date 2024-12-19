'use client';

import { PageHeader } from '@/components/ui/page-header';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gradient-custom">
      <PageHeader 
        title="Privacy Policy" 
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
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">1. Information We Collect</h2>
              <p className="text-gray-600 mb-8">
                We collect information that you provide directly to us, including when you:
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Create an account or place an order</li>
                  <li>Contact us for support or inquiries</li>
                  <li>Sign up for our newsletter</li>
                  <li>Participate in surveys or promotions</li>
                </ul>
              </p>

              <h2 className="text-2xl font-semibold mb-6 text-gray-800">2. How We Use Your Information</h2>
              <p className="text-gray-600 mb-8">
                We use the information we collect to:
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Process and fulfill your orders</li>
                  <li>Communicate with you about products and services</li>
                  <li>Improve our website and customer service</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </p>

              <h2 className="text-2xl font-semibold mb-6 text-gray-800">3. Information Sharing</h2>
              <p className="text-gray-600 mb-8">
                We do not sell or rent your personal information to third parties. We may share your information with:
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Service providers who assist in our operations</li>
                  <li>Law enforcement when required by law</li>
                  <li>Business partners with your consent</li>
                </ul>
              </p>

              <h2 className="text-2xl font-semibold mb-6 text-gray-800">4. Data Security</h2>
              <p className="text-gray-600 mb-8">
                We implement appropriate security measures to protect your personal information from unauthorized access, 
                disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>

              <h2 className="text-2xl font-semibold mb-6 text-gray-800">5. Your Rights</h2>
              <p className="text-gray-600 mb-8">
                You have the right to:
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt-out of marketing communications</li>
                </ul>
              </p>

              <h2 className="text-2xl font-semibold mb-6 text-gray-800">6. Contact Us</h2>
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy, please contact us at:
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
