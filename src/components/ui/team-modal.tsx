'use client';

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

interface TeamMember {
  name: string;
  role: string;
  experience: string;
}

interface TeamModalProps {
  isOpen: boolean;
  closeModal: () => void;
  department: string;
  members: TeamMember[];
}

export function TeamModal({ isOpen, closeModal, department, members }: TeamModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-gradient-to-b from-gray-900 to-black p-6 text-left align-middle shadow-xl transition-all border border-gray-800">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-semibold leading-6 text-gradient mb-8"
                >
                  {department} Team
                </Dialog.Title>
                <div className="grid gap-6">
                  {members.map((member, index) => (
                    <div 
                      key={member.name + index}
                      className="service-card group p-4 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-accent-blue/10 w-12 h-12 flex items-center justify-center border border-accent-blue/20 flex-shrink-0">
                          <svg
                            className="w-6 h-6 text-accent-blue/40"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-white mb-1">
                            {member.name}
                          </h4>
                          <p className="text-gradient text-sm mb-2">{member.role}</p>
                          <p className="text-gray-400 text-sm">{member.experience}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-accent-blue/10 px-4 py-2 text-sm font-medium text-accent-blue hover:bg-accent-blue/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/50 transition-colors"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
