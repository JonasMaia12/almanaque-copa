'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface StickerProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
  // Ângulo inicial de rotação (em graus, ex: -3, 2, 5)
  initialRotation?: number;
  // Tamanho do adesivo (ex: 120, 150, 200)
  width?: number;
  height?: number;
}

export const Sticker: React.FC<StickerProps> = ({
  src,
  alt,
  className = '',
  onClick,
  initialRotation = 0,
  width = 120,
  height = 120,
}) => {
  return (
    <motion.div
      className={`relative inline-block cursor-pointer select-none ${className}`}
      onClick={onClick}
      initial={{ 
        rotate: initialRotation, 
        scale: 1,
        filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))' 
      }}
      whileHover={{
        rotate: 0,
        scale: 1.06,
        filter: 'drop-shadow(0 15px 15px rgba(0, 0, 0, 0.35))',
        zIndex: 50,
      }}
      whileTap={{
        scale: 0.98,
        filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2))',
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 15,
      }}
      style={{ width, height }}
      data-testid="sticker-container"
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain pointer-events-none"
        draggable={false}
      />
    </motion.div>
  );
};
