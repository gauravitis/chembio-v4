'use client';

import { PageHeader } from '@/components/ui/page-header';
import { motion } from 'framer-motion';

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-gradient-custom">
      <PageHeader 
        title="Terms and Conditions" 
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
                <a href="https://merchant.razorpay.com/policy/PH8FRvVfs0s4lT/terms" className="text-blue-600 hover:text-blue-800 underline">
                  View on Razorpay
                </a>
              </p>

              <p className="text-gray-600 mb-8">
                For the purpose of these Terms and Conditions, The term "we", "us", "our" used anywhere on this page shall mean CHEMBIO LIFESCIENCES PRIVATE LIMITED, whose registered/operational office is L-10, HIMALAYA LEGEND, NYAY KHAND-1, INDIRAPURAM, GHAZIABAD,UP Ghaziabad UTTAR PRADESH 201014. "you", "your", "user", "visitor" shall mean any natural or legal person who is visiting our website and/or agreed to purchase from us.
              </p>

              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Terms of Use</h2>
              <p className="text-gray-600 mb-8">
                Your use of the website and/or purchase from us are governed by following Terms and Conditions:
              </p>

              <ul className="list-disc pl-6 mt-2 space-y-4 text-gray-600">
                <li>The content of the pages of this website is subject to change without notice.</li>
                
                <li>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</li>
                
                <li>Your use of any information or materials on our website and/or product pages is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through our website and/or product pages meet your specific requirements.</li>
                
                <li>Our website contains material which is owned by or licensed to us. This material includes, but are not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</li>
                
                <li>All trademarks reproduced in our website which are not the property of, or licensed to, the operator are acknowledged on the website.</li>
                
                <li>Unauthorized use of information provided by us shall give rise to a claim for damages and/or be a criminal offense.</li>
                
                <li>From time to time our website may also include links to other websites. These links are provided for your convenience to provide further information.</li>
                
                <li>You may not create a link to our website from another website or document without CHEMBIO LIFESCIENCES PRIVATE LIMITED's prior written consent.</li>
                
                <li>Any dispute arising out of use of our website and/or purchase with us and/or any engagement with us is subject to the laws of India.</li>
                
                <li>We, shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction, on Account of the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time.</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
