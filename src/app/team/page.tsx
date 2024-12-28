'use client';

import { motion } from 'framer-motion';
import { PageHeader } from '@/components/ui/page-header';
import { SimpleModal } from '@/components/ui/simple-modal';
import { DepartmentCard } from '@/components/ui/department-card';
import { useState } from 'react';
import Image from 'next/image';
import { LinkedinIcon, MailIcon, PhoneIcon } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  experience: string;
  email: string;
  phone: string;
  expertise: string;
  image?: string;
}

interface DepartmentMembers {
  [key: string]: TeamMember[];
}

export default function TeamPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const leaders = [
    {
      name: 'Jagdish Kaushal',
      role: 'Managing Director',
      bio: 'With over 30 years of experience in the chemical and life sciences industry, Mr. Jagdish Kaushal has been instrumental in establishing ChemBio Lifesciences as a leading supplier of high-quality research chemicals and equipment.',
      achievements: [
        'Pioneer in research chemical distribution',
        'Built partnerships with leading global manufacturers',
        'Established nationwide distribution network'
      ],
      email: 'jagdish.chembio@gmail.com',
      phone: '+91-9717397104'
    },
    {
      name: 'Rajni Kaushal',
      role: 'Managing Director',
      bio: 'Mrs. Rajni Kaushal brings extensive expertise in business operations and customer relations. Her leadership has been crucial in developing strong relationships with research institutions and ensuring customer satisfaction.',
      achievements: [
        'Streamlined business operations',
        'Enhanced customer service standards',
        'Developed institutional partnerships'
      ],
      email: 'rajni.chembio@gmail.com',
      phone: '+91-8750982727'
    }
  ];

  const departmentMembers: DepartmentMembers = {
    'Sales & Marketing': [
      {
        name: 'Pramod Shukla',
        role: 'Business Development Manager',
        expertise: 'B2B Sales, Market Strategy, Client Relations, Proteomics & Genomics Research Workflows, Hands On Elisa, Blots & Electrophoresis',
        experience: '10+ Years in Sales & Marketing,5+ years in Diagnostic Laboratory Hands On Workflows, 2+ years in NABL 15189:17025 accrediationm as a Quality Manager',
        email: 'pramod.chembio@gmail.com',
        phone: '+91-8929800812',
        image: '/images/team/Pramod-Shukla.jpeg'
      },
      {
        name: 'Rahul Kushwaha',
        role: 'Sales & Marketing Manager',
        expertise: 'B2B Sales, Market Strategy, Client Relations',
        experience: '5+ years in Sales & Marketing',
        email: 'rahul.chembio@gmail.com',
        phone: '+91-XXXXXXXXXX'
      },
      {
        name: 'Narenar Sharma',
        role: 'Sales & Marketing Manager',
        expertise: 'B2B Sales, Market Strategy, Client Relations',
        experience: '10+ years in Sales & Marketing',
        email: 'narenar.chembio@gmail.com',
        phone: '+91-XXXXXXXXXX'
      },
      {
        name: 'Akash',
        role: 'Marketing Manager',
        expertise: 'Digital Marketing, Product Promotion',
        experience: '8+ years in chemical industry marketing',
        email: 'akash.chembio@gmail.com',
        phone: '+91-8826420679'
      },
      {
        name: 'Ayush Singh',
        role: 'Sales Manager',
        expertise: 'Sales Strategy, Team Management',
        experience: '9+ years in pharmaceutical sales',
        email: 'ayush.chembio@gmail.com',
        phone: '+91-9304440470'
      }
    ],
    'Customer Support': [
      {
        name: 'Rajendra Jadoun',
        role: 'Customer Support Lead',
        expertise: 'Technical Support, Customer Service, Product Knowledge',
        experience: '8+ years in technical support',
        email: 'rajendra.chembio@gmail.com',
        phone: '+91-9999817050'
      },
      {
        name: 'Rohit',
        role: 'Technical Support Specialist',
        expertise: 'Product Support, Customer Relations',
        experience: '6+ years in customer support',
        email: 'rohit.chembio@gmail.com',
        phone: '+91-7503821546'
      },
      {
        name: 'Rajeev Yadav',
        role: 'Customer Service Representative',
        expertise: 'Customer Care, Technical Assistance',
        experience: '5+ years in technical customer service',
        email: 'rajeev.chembio@gmail.com',
        phone: '+91-9711585551'
      }
    ],
    'Logistics & Supply Chain': [
      {
        name: 'Rajeev Yadav',
        role: 'Logistics Manager',
        expertise: 'Supply Chain Management, Distribution',
        experience: '10+ years in chemical logistics',
        email: 'rajeev.chembio@gmail.com',
        phone: '+91-9711585551'
      },
      {
        name: 'Vikas Prajapati',
        role: 'Supply Chain Analyst',
        expertise: 'Inventory Management, Process Optimization',
        experience: '7+ years in supply chain operations',
        email: 'vikas.chembio@gmail.com',
        phone: '+91-9313204913'
      },
      {
        name: 'Chandar Gupt',
        role: 'Warehouse Supervisor',
        expertise: 'Warehouse Management, Shipping Operations',
        experience: '8+ years in chemical storage and handling',
        email: 'chandu.chembio@gmail.com',
        phone: '+91-9911253516'
      }
    ]
  };

  const departments = [
    {
      name: 'Sales & Marketing',
      description: 'Building strong relationships and market presence',
      members: 5
    },
    {
      name: 'Customer Support',
      description: 'Providing exceptional service and technical assistance',
      members: 3
    },
    {
      name: 'Logistics & Supply Chain',
      description: 'Managing efficient distribution and delivery',
      members: 3
    }
  ];

  const handleDepartmentClick = (department: string) => {
    setSelectedDepartment(department);
    setIsModalOpen(true);
    setSelectedMember(null);
  };

  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member);
  };

  return (
    <main className="min-h-screen bg-gradient-custom">
      <PageHeader 
        title="Our Team" 
        subtitle="Meet the dedicated professionals behind ChemBio Lifesciences" 
      />

      {/* Leadership Team */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
              Leadership Team
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our visionary leaders who guide ChemBio Lifesciences towards excellence and innovation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {leaders.map((leader, index) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:bg-white/20">
                  {/* Abstract Pattern Background */}
                  <div className="relative h-80 overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-600/20">
                    {/* Grid Pattern */}
                    <div className="absolute inset-0" style={{ 
                      backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
                      backgroundSize: '20px 20px'
                    }} />
                    
                    {/* Animated Circles */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-48 h-48">
                        <div className="absolute inset-0 rounded-full bg-blue-500/10 animate-pulse" />
                        <div className="absolute inset-4 rounded-full bg-purple-500/10 animate-pulse delay-150" />
                        <div className="absolute inset-8 rounded-full bg-blue-500/10 animate-pulse delay-300" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg
                            className="w-24 h-24 text-white/20"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                      {leader.name}
                    </h3>
                    <p className="text-gray-300 font-medium mb-4">{leader.role}</p>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                      {leader.bio}
                    </p>

                    {/* Achievements */}
                    <div className="space-y-2 mb-6">
                      {leader.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                          <p className="text-gray-300 text-sm">{achievement}</p>
                        </div>
                      ))}
                    </div>

                    {/* Contact Information */}
                    <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-400">
                      <a
                        href={`mailto:${leader.email}`}
                        className="flex items-center gap-2 hover:text-blue-400 transition-colors"
                      >
                        <MailIcon className="w-4 h-4" />
                        <span>{leader.email}</span>
                      </a>
                      <a
                        href={`tel:${leader.phone}`}
                        className="flex items-center gap-2 hover:text-purple-400 transition-colors"
                      >
                        <PhoneIcon className="w-4 h-4" />
                        <span>{leader.phone}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-20 px-4 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
              Our Departments
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Explore our specialized teams working together to deliver excellence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, index) => (
              <DepartmentCard
                key={dept.name}
                name={dept.name}
                description={dept.description}
                members={dept.members}
                onClick={() => handleDepartmentClick(dept.name)}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Department Modal */}
      <SimpleModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedMember(null);
        }}
        title={selectedMember ? selectedMember.name : selectedDepartment || ''}
      >
        {selectedMember ? (
          // Individual member view
          <div className="space-y-8">
            {/* Header with back button */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => setSelectedMember(null)}
                className="p-2 rounded-lg bg-gray-800/50 hover:bg-blue-500/10 transition-colors duration-300 group"
              >
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
              <h3 className="text-2xl font-bold text-white">{selectedDepartment}</h3>
            </div>

            {/* Member details */}
            <div className="bg-gradient-to-br from-gray-800/30 via-gray-900/30 to-black/30 rounded-2xl p-8 border border-gray-700/50">
              <div className="flex items-start gap-8">
                {/* Avatar */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full animate-spin-slow opacity-70" />
                  {selectedMember.image ? (
                    <div className="relative w-24 h-24">
                      <Image
                        src={selectedMember.image}
                        alt={selectedMember.name}
                        fill
                        className="object-cover rounded-full border border-gray-700/50"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="relative rounded-full bg-gradient-to-br from-gray-800 to-gray-900 w-24 h-24 flex items-center justify-center border border-gray-700/50">
                      <svg
                        className="w-12 h-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-grow space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedMember.name}</h2>
                    <p className="text-lg text-purple-400">{selectedMember.role}</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-2">Expertise</h4>
                      <p className="text-white">{selectedMember.expertise}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-2">Experience</h4>
                      <p className="text-white">{selectedMember.experience}</p>
                    </div>
                  </div>

                  {/* Contact info */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-700/50">
                    <a
                      href={`mailto:${selectedMember.email}`}
                      className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-all duration-300 group"
                    >
                      <span className="p-2 rounded-lg bg-gray-800/50 group-hover:bg-blue-500/10 transition-colors duration-300">
                        <MailIcon className="w-5 h-5" />
                      </span>
                      <span className="text-base">{selectedMember.email}</span>
                    </a>
                    <a
                      href={`tel:${selectedMember.phone.replace(/\s/g, '')}`}
                      className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-all duration-300 group"
                    >
                      <span className="p-2 rounded-lg bg-gray-800/50 group-hover:bg-blue-500/10 transition-colors duration-300">
                        <PhoneIcon className="w-5 h-5" />
                      </span>
                      <span className="text-base">{selectedMember.phone}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Department members grid
          <div className="grid md:grid-cols-2 gap-6">
            {selectedDepartment && departmentMembers[selectedDepartment]?.map((member, index) => (
              <div 
                key={member.name + index}
                className="group relative rounded-xl bg-gradient-to-br from-gray-800/20 via-gray-900/20 to-black/20 hover:from-blue-500/10 hover:via-purple-500/10 hover:to-black/20 transition-all duration-500 cursor-pointer"
                onClick={() => handleMemberClick(member)}
              >
                {/* Animated border gradient */}
                <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500/30 to-purple-600/30 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm" />
                
                {/* Content container */}
                <div className="relative p-6 rounded-xl overflow-hidden backdrop-blur-sm border border-gray-800/50 group-hover:border-gray-700/50 transition-colors duration-500">
                  <div className="flex items-start gap-5">
                    {/* Avatar with animated gradient */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full animate-spin-slow opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
                      {member.image ? (
                        <div className="relative w-16 h-16">
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            className="object-cover rounded-full"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      ) : (
                        <div className="relative rounded-full bg-gradient-to-br from-gray-800 to-gray-900 w-16 h-16 flex items-center justify-center border border-gray-700/50 group-hover:border-gray-600/50 transition-colors duration-500">
                          <svg
                            className="w-8 h-8 text-gray-400 group-hover:text-blue-400/60 transition-colors duration-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-grow min-w-0">
                      <h3 className="text-xl font-semibold text-white mb-1 truncate group-hover:text-blue-400 transition-colors duration-500">
                        {member.name}
                      </h3>
                      <p className="text-purple-400/80 text-sm font-medium mb-2">{member.role}</p>
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 group-hover:text-gray-300 transition-colors duration-500">
                        Click to view full profile
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </SimpleModal>
    </main>
  );
}
