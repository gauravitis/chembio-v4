import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ValueCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  index: number;
}

export function ValueCard({ title, description, icon, index }: ValueCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-lg transition-all duration-300 hover:shadow-blue-500/10 hover:bg-white/20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20" />
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
            backgroundSize: '20px 20px'
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="text-4xl mb-6 transform transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>
          <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-3">
            {title}
          </h3>
          <p className="text-gray-300 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
