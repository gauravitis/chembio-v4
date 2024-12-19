'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-custom">
      {/* Hero Section */}
      <section className="hero-section min-h-screen">
        <div className="hero-grid min-h-screen pt-32 pb-16 px-4">
          <div className="hero-glow" />
          <div className="max-w-7xl mx-auto text-center hero-content">
            <div className="animate-fade-in">
              <h1 className="text-7xl font-bold text-white mb-6 animate-float">
                Chembio Lifesciences
              </h1>
              <h2 className="text-5xl font-semibold text-gradient mb-8">
                Empowering Research
              </h2>
              <p className="text-gray-300 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                Your Trusted Vendor for High-Quality Chemicals and Lab Equipment
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8">
                <Link href="/products" className="btn-primary">
                  Explore Products
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Get Quotes
                </Link>
              </div>
            </div>
            
            {/* Stats */}
            <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-4xl font-bold text-gradient mb-2">1000+</div>
                <div className="text-gray-400">Products</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-4xl font-bold text-gradient mb-2">10+</div>
                <div className="text-gray-400">Brands</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-4xl font-bold text-gradient mb-2">100+</div>
                <div className="text-gray-400">Customers</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-4xl font-bold text-gradient mb-2">24/7</div>
                <div className="text-gray-400">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Partners */}
      <section className="py-16 px-4 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-semibold text-center text-gradient mb-8">
            Trusted Partners
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { name: 'Merck', description: 'Leading provider of scientific products' },
              { name: 'SRL', description: 'Quality laboratory chemicals' },
              { name: 'Sigma Aldrich', description: 'Research chemicals and materials' },
              { name: 'Honeywell', description: 'Industrial chemicals and solutions' },
              { name: 'Borosil', description: 'Premium laboratory glassware' },
              { name: 'Thermo Fischer', description: 'Scientific instruments and supplies' }
            ].map((partner, index) => (
              <div
                key={partner.name}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-6 
                         hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300
                         border border-white/10 backdrop-blur-sm flex flex-col items-center justify-center text-center"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 
                              group-hover:opacity-100 transition-opacity duration-300" />
                <h4 className="text-xl font-semibold text-white mb-2 relative z-10 
                             group-hover:text-gradient transition-colors duration-300">
                  {partner.name}
                </h4>
                <p className="text-gray-400 text-sm relative z-10 group-hover:text-gray-300 
                             transition-colors duration-300 max-w-[200px] mx-auto">
                  {partner.description}
                </p>
                <div className="absolute -bottom-1 -right-1 w-20 h-20 bg-gradient-to-br 
                              from-blue-500/20 to-purple-500/20 blur-2xl rounded-full
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 mt-8">
            Partnering with industry leaders to deliver excellence in scientific solutions
          </p>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-16 px-4 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-semibold text-center text-gradient mb-2">
            Our Services
          </h3>
          <p className="text-center text-gray-400 mb-12">
            Delivering excellence across various sectors of the scientific community
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard
              icon="/icons/research-institute.svg"
              title="Research Institutes"
              description="Supporting groundbreaking research with premium equipment and chemicals"
            />
            <ServiceCard
              icon="/icons/research-center.svg"
              title="Research Centers"
              description="Providing specialized solutions for advanced research facilities"
            />
            <ServiceCard
              icon="/icons/university.svg"
              title="Colleges and Universities"
              description="Equipping educational institutions with quality lab materials"
            />
            <ServiceCard
              icon="/icons/government.svg"
              title="Government Organizations"
              description="Partnering with government bodies for scientific excellence"
            />
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 px-4 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-semibold text-center text-gradient mb-12">
            Product Categories
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <CategoryCard
              icon="/icons/chemical.svg"
              title="Chemical Reagents"
              description="High-purity chemicals for precise research and analysis"
              items={[
                'Analytical Reagents',
                'Organic Chemicals',
                'Inorganic Compounds',
                'Solvents'
              ]}
            />
            <CategoryCard
              icon="/icons/equipment.svg"
              title="Lab Equipment"
              description="State-of-the-art equipment for modern laboratories"
              items={[
                'Analytical Instruments',
                'Lab Furniture',
                'Safety Equipment',
                'Measurement Tools'
              ]}
            />
            <CategoryCard
              icon="/icons/diagnostic.svg"
              title="Diagnostic Tools"
              description="Advanced tools for accurate diagnostics"
              items={[
                'Clinical Analyzers',
                'Molecular Tools',
                'Diagnostic Kits',
                'Imaging Systems'
              ]}
            />
            <CategoryCard
              icon="/icons/consumables.svg"
              title="Research Consumables"
              description="Essential supplies for daily research needs"
              items={[
                'Lab Plasticware',
                'Filters & Membranes',
                'Glassware',
                'Safety Supplies'
              ]}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1E1145] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Image src="/logo.svg" alt="Chembio Logo" width={32} height={32} />
                <span className="text-xl font-bold text-gradient">Chembio</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Leading the way in innovative chemical and biological solutions. 
                Committed to excellence in research, development, and manufacturing.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/products" className="text-gray-400 hover:text-white transition-colors">Products</Link></li>
                <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact Info</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Email: contact.chembio@gmail.com<br />
                Phone: +91 120 1234567<br />
                Hours: Mon-Sat, 9:00 AM - 6:00 PM IST
              </p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                2024 Chembio Lifesciences. All rights reserved.
              </p>
              <div className="flex gap-8">
                <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
}

function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="service-card">
      <Image src={icon} alt={title} width={40} height={40} className="mb-4" />
      <h4 className="text-white font-semibold mb-2">{title}</h4>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}

interface CategoryCardProps {
  icon: string;
  title: string;
  description: string;
  items?: string[];
}

function CategoryCard({ icon, title, description, items }: CategoryCardProps) {
  return (
    <div className="service-card">
      <Image src={icon} alt={title} width={40} height={40} className="mb-4" />
      <h4 className="text-white font-semibold mb-2">{title}</h4>
      <p className="text-gray-400 text-sm mb-4">{description}</p>
      {items && (
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item} className="text-gray-400 text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#B490F5] rounded-full"></span>
              {item}
            </li>
          ))}
        </ul>
      )}
      <Link 
        href={`/products/${title.toLowerCase().replace(' ', '-')}`} 
        className="inline-block mt-4 text-[#7BA4F4] hover:text-white transition-colors"
      >
        View All Products →
      </Link>
    </div>
  );
}
