import { motion } from 'framer-motion';
import { UsersIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface DepartmentCardProps {
  name: string;
  description: string;
  members: number;
  onClick: () => void;
  index: number;
  icon?: ReactNode;
}

export function DepartmentCard({
  name,
  description,
  members,
  onClick,
  index,
  icon
}: DepartmentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:bg-white/20">
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
          {/* Department Icon */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            {icon || <UsersIcon className="w-6 h-6 text-blue-400" />}
          </div>
          
          <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
            {name}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            {description}
          </p>
          <div className="flex items-center text-gray-300 text-sm">
            <UsersIcon className="w-4 h-4 mr-2" />
            <span>{members} team member{members !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-xl" />
      </div>
    </motion.div>
  );
}
