import { motion } from 'framer-motion';

export default function Molecule() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Center molecule */}
      <motion.div
        className="molecule-dot"
        style={{
          left: '50%',
          top: '50%',
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Orbiting atoms */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="molecule-dot"
          style={{
            left: '50%',
            top: '50%',
          }}
          animate={{
            x: [0, Math.cos(i * (2 * Math.PI / 3)) * 100],
            y: [0, Math.sin(i * (2 * Math.PI / 3)) * 100],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Connecting lines */}
      <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px]">
        <motion.circle
          cx="100"
          cy="100"
          r="50"
          fill="none"
          stroke="rgba(59, 130, 246, 0.3)"
          strokeWidth="1"
          strokeDasharray="5,5"
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </svg>
    </div>
  );
} 