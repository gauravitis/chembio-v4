'use client';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
}

export function PageHeader({ title, subtitle, description }: PageHeaderProps) {
  return (
    <div className="relative py-24 bg-gradient-custom hero-grid">
      <div className="hero-glow" />
      <div className="container-centered text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-400 text-transparent bg-clip-text">
          {title}
        </h1>
        {(subtitle || description) && (
          <p className="text-xl max-w-2xl mx-auto animate-fade-in bg-gradient-to-r from-gray-100 to-gray-300 text-transparent bg-clip-text" style={{ animationDelay: '0.2s' }}>
            {subtitle || description}
          </p>
        )}
      </div>
    </div>
  );
}
