'use client';

import React from 'react';

interface SimpleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

export function SimpleModal({ isOpen, onClose, title, children }: SimpleModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="relative bg-gradient-to-br from-gray-900/95 via-gray-900 to-black p-8 rounded-2xl w-full max-w-4xl border border-gray-800/50 shadow-2xl"
        style={{ maxHeight: 'calc(100vh - 2rem)' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 group"
          aria-label="Close modal"
        >
          <svg
            className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:rotate-90 transition-all duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header */}
        {title && (
          <div className="mb-10 relative">
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {title}
            </h2>
            <p className="text-gray-400 mt-2 text-lg">Meet our dedicated professionals</p>
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto pr-2 custom-scrollbar" style={{ maxHeight: 'calc(100vh - 15rem)' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
