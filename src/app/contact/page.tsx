'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { motion } from 'framer-motion';
import { Building2, Mail, Phone } from 'lucide-react';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const form = e.currentTarget;
      const response = await fetch('https://formspree.io/f/mdkoyrjz', {
        method: 'POST',
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
        // Reset success status after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-custom">
      <PageHeader 
        title="Contact Us" 
        subtitle="Get in touch with our team" 
      />

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Information Cards */}
            <div className="space-y-6">
              {/* Office Address Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Office Address
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  L-10 Himalya Tower,<br />
                  Gyankhand 2, Indirapuram, Ghaziabad<br />
                  U.P, India - 201014
                </p>
              </motion.div>

              {/* Email Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Email Us
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  <strong>General Inquiries:</strong><br />
                  contact.chembio@gmail.com<br /><br />
                  <strong>Support:</strong><br />
                  sales.chembio@gmail.com
                </p>
              </motion.div>

              {/* Phone Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Call Us
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  <strong>Main Office:</strong><br />
                  +91 120 1234567<br /><br />
                  <strong>Hours:</strong><br />
                  Monday - Saturday<br />
                  9:00 AM - 6:00 PM IST
                </p>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              onSubmit={handleSubmit}
              className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl h-fit"
            >
              <div className="space-y-6">
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                    Inquiry Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="product">Product Information</option>
                    <option value="support">Technical Support</option>
                    <option value="business">Business Development</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-all duration-300 ${
                      status === 'loading'
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                    }`}
                  >
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                  </button>
                </div>

                {/* Status Messages */}
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-green-50 text-green-700"
                  >
                    Your message has been sent successfully! We'll get back to you soon.
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-red-50 text-red-700"
                  >
                    {errorMessage}
                  </motion.div>
                )}
              </div>
            </motion.form>
          </div>
        </div>
      </section>
    </main>
  );
}
