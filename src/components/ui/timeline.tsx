import { motion } from 'framer-motion';

interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  milestones: TimelineMilestone[];
}

export function Timeline({ milestones }: TimelineProps) {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600 opacity-20" />

      <div className="space-y-12">
        {milestones.map((milestone, index) => (
          <motion.div
            key={milestone.year}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative flex gap-8 items-start group"
          >
            {/* Year bubble */}
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                viewport={{ once: true }}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-blue-500/20"
              >
                <span className="text-white font-bold">{milestone.year}</span>
              </motion.div>
            </div>

            {/* Content */}
            <div className="flex-grow">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-blue-500/10 hover:bg-white/20">
                <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                  {milestone.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
