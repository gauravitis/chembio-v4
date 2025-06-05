'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/ui/page-header';
import { InteractiveMolecule } from '@/components/ui/interactive-molecule';
import { ValueCard } from '@/components/ui/value-card';
import { Timeline } from '@/components/ui/timeline';
import { BeakerIcon, FlaskConicalIcon, LightbulbIcon, ShieldCheckIcon, UsersIcon, ZapIcon } from 'lucide-react';
import Link from 'next/link';

const values = [
  {
    title: 'Quality Excellence',
    description: 'We maintain rigorous standards in our products and services, ensuring consistent quality that exceeds industry benchmarks.',
    icon: <BeakerIcon className="text-blue-400" />
  },
  {
    title: 'Innovation Focus',
    description: 'Continuously exploring and implementing cutting-edge technologies and methodologies to advance scientific research.',
    icon: <LightbulbIcon className="text-purple-400" />
  },
  {
    title: 'Customer Success',
    description: 'Dedicated to understanding and fulfilling our customers\' needs, providing comprehensive support at every step.',
    icon: <UsersIcon className="text-blue-400" />
  },
  {
    title: 'Research Integrity',
    description: 'Upholding the highest ethical standards in research and business practices, ensuring transparency and trust.',
    icon: <ShieldCheckIcon className="text-purple-400" />
  },
  {
    title: 'Scientific Expertise',
    description: 'Our team comprises industry experts and scientists committed to advancing chemical and biological research.',
    icon: <FlaskConicalIcon className="text-blue-400" />
  },
  {
    title: 'Rapid Innovation',
    description: 'Quick adaptation to emerging technologies and market needs while maintaining our commitment to quality.',
    icon: <ZapIcon className="text-purple-400" />
  }
];

const milestones = [
  {
    year: '2016',
    title: 'Foundation',
    description: 'ChemBio Lifesciences was established with a vision to provide high-quality research chemicals and equipment.'
  },
  {
    year: '2018',
    title: 'Market Growth',
    description: 'Expanded our product portfolio and established partnerships with leading manufacturers.'
  },
  {
    year: '2020',
    title: 'Digital Innovation',
    description: 'Launched our e-commerce platform and implemented digital inventory management systems.'
  },
  {
    year: '2021',
    title: 'Quality Certification',
    description: 'Achieved ISO 9001:2015 certification for our quality management systems.'
  },
  {
    year: '2022',
    title: 'Research Excellence',
    description: 'Established our R&D center and formed partnerships with premier research institutions.'
  },
  {
    year: '2024',
    title: 'Global Expansion',
    description: 'Expanded operations internationally with a focus on sustainable and innovative solutions.'
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-custom">
      <PageHeader 
        title="About Us" 
        subtitle="Advancing scientific research through quality and innovation since 2010" 
      />

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container-centered">
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Our Mission
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                At ChemBio Lifesciences, we are dedicated to advancing scientific research by providing 
                high-quality chemicals, equipment, and solutions to research institutions worldwide.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Our commitment to quality, innovation, and customer service has made us a trusted partner 
                in the scientific community. We strive to enable groundbreaking research and discoveries 
                through our comprehensive range of products and expert support.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/products" className="btn-primary">
                  Explore Products
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Get in Touch
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="h-[500px] relative"
            >
              <InteractiveMolecule />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container-centered">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              These principles guide our operations and reflect our commitment to excellence in scientific research.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <ValueCard
                key={value.title}
                title={value.title}
                description={value.description}
                icon={value.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-20">
        <div className="container-centered max-w-5xl">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
              Our Journey
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              From our humble beginnings to becoming a trusted name in the industry, 
              explore the key milestones that have shaped our growth.
            </p>
          </motion.div>

          <Timeline milestones={milestones} />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container-centered">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center">
            
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Join the thousands of research institutions that trust ChemBio Lifesciences 
            for their chemical and equipment needs.
          </p>
          <Link href="/contact" className="btn-primary">
            Contact Us Today
          </Link>
        </motion.div>
      </div>
    </section>
    </main>
  );
}
