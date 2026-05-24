'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ScrapbookCoverProps {
  children: React.ReactNode;
}

export function ScrapbookCover({ children }: ScrapbookCoverProps) {
  return (
    <motion.div
      className="w-full max-w-lg md:max-w-xl bg-kraft-cardboard rounded-3xl p-6 md:p-8 shadow-scrapbook border-8 border-amber-900/10 relative overflow-hidden flex flex-col items-center select-none"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      {/* Adereços táteis nos cantos (Fitas Adesivas/Washi Tape transparentes nos cantos) */}
      <div className="absolute top-[-10px] left-[-10px] w-24 h-8 bg-amber-100/30 border border-amber-200/10 backdrop-blur-2xs rotate-[-35deg] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-[-10px] right-[-10px] w-24 h-8 bg-amber-100/30 border border-amber-200/10 backdrop-blur-2xs rotate-[-35deg] pointer-events-none" aria-hidden="true" />
      {children}
    </motion.div>
  );
}
