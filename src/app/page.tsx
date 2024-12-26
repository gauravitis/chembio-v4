'use client';

import Link from 'next/link';
import { OptimizedImage } from '@/components/ui/optimized-image';
import Molecule from '@/components/Molecule';
import { useEffect, useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { cn } from '@/lib/utils';
import { TestimonialCard } from '@/components/ui/testimonial-card';
import { NewsletterForm } from '@/components/ui/newsletter-form';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
}

function ServiceCard({ icon, title, description }: ServiceCardProps) {
  const { elementRef, isVisible } = useIntersectionObserver();
  
  return (
    <div 
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={cn(
        "group p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 parallax-element section-fade-in will-change-transform",
        isVisible && "visible"
      )}
    >
      <div className="h-12 relative mb-4">
        <OptimizedImage
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
  const { elementRef, isVisible } = useIntersectionObserver();
  
  return (
    <div 
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={cn(
        "group p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 parallax-element section-fade-in will-change-transform",
        isVisible && "visible"
      )}
    >
      <div className="h-12 relative mb-4">
        <OptimizedImage
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
  const parallaxRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const { elementRef: partnersRef, isVisible: partnersVisible } = useIntersectionObserver();
  const { elementRef: servicesRef, isVisible: servicesVisible } = useIntersectionObserver();
  const { elementRef: categoriesRef, isVisible: categoriesVisible } = useIntersectionObserver();
  const { elementRef: whyUsRef, isVisible: whyUsVisible } = useIntersectionObserver();
  const { elementRef: testimonialsRef, isVisible: testimonialsVisible } = useIntersectionObserver();
  const { elementRef: certificationsRef, isVisible: certificationsVisible } = useIntersectionObserver();

  useEffect(() => {
    const handleParallax = (e: MouseEvent) => {
      if (!parallaxRef.current || window.innerWidth < 768) return; // Disable parallax on mobile

      const elements = parallaxRef.current.getElementsByClassName('parallax-element');
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const moveX = (mouseX - windowWidth / 2) / windowWidth;
      const moveY = (mouseY - windowHeight / 2) / windowHeight;

      requestAnimationFrame(() => {
        Array.from(elements).forEach((element) => {
          const speed = element.hasAttribute('data-speed') 
            ? Number(element.getAttribute('data-speed')) 
            : 2;
          
          const el = element as HTMLElement;
          el.style.transform = `translate3d(${moveX * speed}px, ${moveY * speed}px, 0)`;
        });
      });
    };

    const throttledParallax = throttle(handleParallax, 16); // ~60fps
    document.addEventListener('mousemove', throttledParallax);
    return () => document.removeEventListener('mousemove', throttledParallax);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-custom will-change-transform" ref={parallaxRef}>
      <Molecule />
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-grid min-h-screen px-4">
          <div className="hero-glow parallax-element" data-speed="4" />
          <div className="max-w-7xl mx-auto text-center hero-content py-32">
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold text-white animate-float parallax-element" data-speed="2">
                Chembio Lifesciences
              </h1>
              <h2 className="text-3xl md:text-5xl font-semibold text-[#B490F5] parallax-element" data-speed="1.5">
                Empowering Research
              </h2>
              <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto parallax-element" data-speed="1">
                Your Trusted Vendor for High-Quality Chemicals and Lab Equipment
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4 parallax-element" data-speed="0.5">
                <Link href="/products" className="btn-primary">
                  Explore Products
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Get Quotes
                </Link>
              </div>
            </div>
            
            {/* Stats */}
            <div 
              ref={statsRef}
              className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 animate-fade-in will-change-transform" 
              style={{ animationDelay: '0.3s' }}
            >
              <div className="stats-card parallax-element" data-speed="1.5">
                <div className="text-3xl md:text-4xl font-bold text-[#7BA4F4] mb-2">1000+</div>
                <div className="text-gray-400">Products</div>
              </div>
              <div className="stats-card parallax-element" data-speed="1">
                <div className="text-3xl md:text-4xl font-bold text-[#7BA4F4] mb-2">10+</div>
                <div className="text-gray-400">Brands</div>
              </div>
              <div className="stats-card parallax-element" data-speed="1.5">
                <div className="text-3xl md:text-4xl font-bold text-[#7BA4F4] mb-2">100+</div>
                <div className="text-gray-400">Customers</div>
              </div>
              <div className="stats-card parallax-element" data-speed="1">
                <div className="text-3xl md:text-4xl font-bold text-[#7BA4F4] mb-2">24/7</div>
                <div className="text-gray-400">Support</div>
              </div>
            </div>

            {/* Company Description */}
            <div className="mt-24 animate-fade-in parallax-wrapper will-change-transform" style={{ animationDelay: '0.6s' }}>
              <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 parallax-element" data-speed="0.5">
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
      <section 
        ref={partnersRef as React.RefObject<HTMLElement>}
        className={cn(
          "py-16 px-4 section-fade-in will-change-transform",
          partnersVisible && "visible"
        )}
      >
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
                className="group p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 parallax-element"
                data-speed="1"
              >
                <div className="h-16 relative mb-6">
                  <OptimizedImage
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    fill
                    quality={90}
                    className="partner-logo"
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
      <section 
        ref={servicesRef as React.RefObject<HTMLElement>}
        className={cn(
          "py-16 px-4 bg-white/5 backdrop-blur-sm section-fade-in will-change-transform",
          servicesVisible && "visible"
        )}
      >
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
      <section 
        ref={categoriesRef as React.RefObject<HTMLElement>}
        className={cn(
          "py-16 px-4 section-fade-in will-change-transform",
          categoriesVisible && "visible"
        )}
      >
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

      {/* Why Choose Us */}
      <section 
        ref={whyUsRef as React.RefObject<HTMLElement>}
        className={cn(
          "py-16 px-4 bg-white/5 backdrop-blur-sm section-fade-in will-change-transform",
          whyUsVisible && "visible"
        )}
      >
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-semibold text-center text-gradient mb-4">
            Why Choose Us
          </h3>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Your trusted partner in scientific excellence, delivering quality and reliability
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: "/icons/quality.svg",
                title: "Quality Assurance",
                description: "All products undergo rigorous quality control to meet international standards"
              },
              {
                icon: "/icons/support.svg",
                title: "Expert Support",
                description: "Dedicated technical support team to assist with product selection and usage"
              },
              {
                icon: "/icons/delivery.svg",
                title: "Fast Delivery",
                description: "Efficient logistics network ensuring timely delivery across India"
              },
              {
                icon: "/icons/competitive.svg",
                title: "Competitive Pricing",
                description: "Best-in-class products at competitive market rates"
              },
              {
                icon: "/icons/inventory.svg",
                title: "Wide Inventory",
                description: "Extensive range of products from leading global manufacturers"
              },
              {
                icon: "/icons/custom.svg",
                title: "Custom Solutions",
                description: "Tailored solutions to meet your specific research requirements"
              }
            ].map((feature) => (
              <div 
                key={feature.title}
                className="group p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 parallax-element"
                data-speed="1"
              >
                <div className="h-12 relative mb-4">
                  <OptimizedImage
                    src={feature.icon}
                    alt={feature.title}
                    fill
                    className="object-contain filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <h4 className="text-lg font-semibold text-white mb-3 group-hover:text-gradient transition-colors">
                  {feature.title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section 
        ref={testimonialsRef as React.RefObject<HTMLElement>}
        className={cn(
          "py-16 px-4 section-fade-in will-change-transform",
          testimonialsVisible && "visible"
        )}
      >
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-semibold text-center text-gradient mb-4">
            What Our Customers Say
          </h3>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Hear from our valued customers about their experience with Chembio Lifesciences
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <TestimonialCard
              name="Dr. Rajesh Kumar"
              role="Head of Research"
              company="National Research Institute"
              image="/testimonials/researcher-1.jpg"
              testimonial="Chembio Lifesciences has been instrumental in our research success. Their high-quality reagents and prompt technical support have significantly enhanced our laboratory operations."
            />
            <TestimonialCard
              name="Dr. Priya Sharma"
              role="Lab Director"
              company="Premier Medical College"
              image="/testimonials/researcher-2.jpg"
              testimonial="The wide range of products and competitive pricing make Chembio our go-to supplier. Their commitment to quality and customer service is exceptional."
            />
            <TestimonialCard
              name="Dr. Amit Patel"
              role="Principal Scientist"
              company="Biotech Research Center"
              image="/testimonials/researcher-3.jpg"
              testimonial="We appreciate the consistent quality and reliability of Chembio's products. Their technical team's expertise has been invaluable in our research projects."
            />
          </div>
        </div>
      </section>

      {/* Certifications & Accreditations */}
      <section 
        ref={certificationsRef as React.RefObject<HTMLElement>}
        className={cn(
          "py-16 px-4 bg-white/5 backdrop-blur-sm section-fade-in will-change-transform",
          certificationsVisible && "visible"
        )}
      >
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-semibold text-center text-gradient mb-4">
            Our Certifications
          </h3>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Committed to maintaining the highest standards of quality and compliance
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                name: "ISO 9001:2015",
                logo: "/certifications/iso-9001.png",
                description: "Quality Management System"
              },
              {
                name: "ISO 14001:2015",
                logo: "/certifications/iso-14001.png",
                description: "Environmental Management"
              },
              {
                name: "GMP Certified",
                logo: "/certifications/gmp.png",
                description: "Good Manufacturing Practices"
              },
              {
                name: "NABL Accredited",
                logo: "/certifications/nabl.png",
                description: "Testing Laboratory"
              }
            ].map((cert) => (
              <div 
                key={cert.name}
                className="group p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 parallax-element text-center"
                data-speed="1"
              >
                <div className="h-20 relative mb-4">
                  <OptimizedImage
                    src={cert.logo}
                    alt={cert.name}
                    fill
                    quality={90}
                    className="object-contain"
                  />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {cert.name}
                </h4>
                <p className="text-gray-400 text-sm">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <NewsletterForm />
        </div>
      </section>
    </main>
  );
}
