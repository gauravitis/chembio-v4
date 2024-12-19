'use client';

import { useEffect, useRef } from 'react';

export function InteractiveMolecule() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    };

    card.addEventListener('mousemove', handleMouseMove);
    return () => card.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={cardRef} className="interactive-card h-full">
      <div className="interactive-card-content h-full bg-white/5 backdrop-blur-sm p-8">
        <div className="interactive-card-layer">
          {/* Animated Molecule */}
          <div className="relative h-full">
            {/* Center dot */}
            <div className="molecule-dot left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            
            {/* Orbiting dots */}
            {[...Array(6)].map((_, i) => {
              const angle = (i * 60) * (Math.PI / 180);
              const radius = 80;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              const delay = i * 0.5;
              
              return (
                <div key={i} className="absolute left-1/2 top-1/2" style={{
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                }}>
                  <div 
                    className="molecule-dot"
                    style={{ animationDelay: `${delay}s` }}
                  />
                  <div 
                    className="molecule-line"
                    style={{
                      width: `${radius}px`,
                      transform: `rotate(${angle}rad)`,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center mt-8">
          <div className="text-4xl font-bold text-gradient animate-pulse-slow mb-4">
            Research Excellence
          </div>
          <div className="text-xl text-gray-300 mb-6">
            Advancing scientific discoveries through innovation
          </div>
          <div className="space-y-4">
            {[
              'State-of-the-art facilities',
              'Expert research team',
              'Global collaboration network'
            ].map((item, i) => (
              <div 
                key={i}
                className="bg-white/10 rounded-lg p-3 animate-fade-in"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Glow effect */}
        <div className="interactive-card-glow" />
      </div>
    </div>
  );
}
