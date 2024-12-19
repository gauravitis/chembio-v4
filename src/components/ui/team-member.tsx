import { motion } from 'framer-motion';
import Image from 'next/image';
import { LinkedinIcon, MailIcon } from 'lucide-react';

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin?: string;
  email?: string;
  index: number;
}

export function TeamMember({
  name,
  role,
  image,
  bio,
  linkedin,
  email,
  index
}: TeamMemberProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="relative bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:bg-white/20">
        {/* Image */}
        <div className="relative h-80 overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative p-6">
          {/* Name and Role */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {name}
            </h3>
            <p className="text-gray-300 font-medium">{role}</p>
          </div>

          {/* Bio */}
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            {bio}
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <MailIcon className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
