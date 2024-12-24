'use client';

import Link from 'next/link';
import Image from 'next/image';
import Molecule from '@/components/Molecule';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
}

function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="group p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
      <div className="h-12 relative mb-4">
        <Image
          src={icon}
          alt={title}
          fill
          className="object-contain filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
        />
      </div>
      <h4 className="text-lg font-semibold text-white mb-3 group-hover:text-gradient transition-colors">{title}</h4>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
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
    <div className="group p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
      <div className="h-12 relative mb-4">
        <Image
          src={icon}
          alt={title}
          fill
          className="object-contain filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
        />
      </div>
      <h4 className="text-lg font-semibold text-white mb-3 group-hover:text-gradient transition-colors">{title}</h4>
      <p className="text-gray-400 text-sm leading-relaxed mb-4">{description}</p>
      {items && (
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item} className="text-gray-400 text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gradient-to-r from-[#7BA4F4] to-[#B490F5] rounded-full"></span>
              {item}
            </li>
          ))}
        </ul>
      )}
      <Link 
        href={`/products?category=${encodeURIComponent(title.toLowerCase())}`}
        className="inline-block mt-6 text-sm text-[#7BA4F4] hover:text-white transition-colors group-hover:translate-x-1 duration-300"
      >
        View Products →
      </Link>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-custom">
      <Molecule />
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-grid min-h-screen px-4">
          <div className="hero-glow" />
          <div className="max-w-7xl mx-auto text-center hero-content py-32">
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold text-white animate-float">
                Chembio Lifesciences
              </h1>
              <h2 className="text-3xl md:text-5xl font-semibold text-[#B490F5]">
                Empowering Research
              </h2>
              <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
                Your Trusted Vendor for High-Quality Chemicals and Lab Equipment
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
                <Link href="/products" className="btn-primary">
                  Explore Products
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Get Quotes
                </Link>
              </div>
            </div>
            
            {/* Stats */}
            <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="stats-card">
                <div className="text-3xl md:text-4xl font-bold text-[#7BA4F4] mb-2">1000+</div>
                <div className="text-gray-400">Products</div>
              </div>
              <div className="stats-card">
                <div className="text-3xl md:text-4xl font-bold text-[#7BA4F4] mb-2">10+</div>
                <div className="text-gray-400">Brands</div>
              </div>
              <div className="stats-card">
                <div className="text-3xl md:text-4xl font-bold text-[#7BA4F4] mb-2">100+</div>
                <div className="text-gray-400">Customers</div>
              </div>
              <div className="stats-card">
                <div className="text-3xl md:text-4xl font-bold text-[#7BA4F4] mb-2">24/7</div>
                <div className="text-gray-400">Support</div>
              </div>
            </div>

            {/* Company Description */}
            <div className="mt-24 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-2xl font-semibold text-[#B490F5] mb-6">
                    Your Partner in Scientific Excellence
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    As industry leaders, we specialize in the import, export, and domestic supply of{' '}
                    <span className="text-[#7BA4F4]">Organic & Inorganic Chemicals</span>,{' '}
                    <span className="text-[#7BA4F4]">High Purity Solvents</span>,{' '}
                    <span className="text-[#7BA4F4]">Fine Chemicals</span>, and{' '}
                    <span className="text-[#7BA4F4]">Life Science Research Products</span>.
                  </p>
                  <p className="text-gray-300 leading-relaxed mt-4">
                    Our comprehensive range includes Pharmaceutical Raw Materials, cutting-edge lab instruments, 
                    liquid handling products, HPLC & GC columns & accessories, precision weighing balances, 
                    spectrophotometers, glassware, plastic ware, filtration products, microbiological essentials, 
                    water & waste water analysis products, clean room solutions, and an extensive range of safety products.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Partners */}
      <section className="py-16 px-4 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-semibold text-center text-gradient mb-8">
            Trusted Partners
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { 
                name: 'Merck', 
                description: 'Leading provider of scientific products and high-quality chemicals for research and development.',
                logo: '/partner-logos/merck.png'
              },
              { 
                name: 'Sigma Aldrich', 
                description: 'Global leader in providing research chemicals, biochemicals and related products.',
                logo: '/partner-logos/sigma-aldrich.png'
              },
              { 
                name: 'Honeywell', 
                description: 'Renowned supplier of industrial chemicals and research-grade materials.',
                logo: '/partner-logos/honeywell.png'
              },
              { 
                name: 'SRL', 
                description: 'Premier manufacturer of laboratory chemicals and analytical reagents.',
                logo: '/partner-logos/srl.png'
              },
              { 
                name: 'GENAXY', 
                description: 'Innovative provider of life science research products and lab equipment.',
                logo: '/partner-logos/genaxy.png'
              },
              { 
                name: 'BRAND', 
                description: 'Specialist in precision laboratory equipment and liquid handling products.',
                logo: '/partner-logos/brand.png'
              }
            ].map((partner) => (
              <div 
                key={partner.name}
                className="group p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-16 relative mb-6">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    fill
                    className="object-contain filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <h4 className="text-xl font-semibold text-white mb-3">{partner.name}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{partner.description}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 mt-12 max-w-2xl mx-auto">
            We collaborate with industry-leading manufacturers and suppliers to ensure our customers receive the highest quality products and solutions for their research needs.
          </p>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-16 px-4 bg-white/5 backdrop-blur-sm animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-semibold text-center text-gradient mb-4">
            Our Services
          </h3>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Delivering excellence across various sectors of the scientific community with our comprehensive range of services
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
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
              title="Educational Institutions"
              description="Equipping colleges and universities with quality lab materials"
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
          <h3 className="text-2xl md:text-3xl font-semibold text-center text-gradient mb-4">
            Product Categories
          </h3>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Explore our comprehensive range of high-quality products for your research needs
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
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
    </main>
  );
}
