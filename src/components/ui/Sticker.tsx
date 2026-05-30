'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface StickerProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
  // Ângulo inicial de rotação (em graus, ex: -3, 2, 5)
  initialRotation?: number;
  // Ângulo de rotação no hover. Se omitido, rotaciona organicamente
  hoverRotation?: number;
  // Tamanho do adesivo (ex: 120, 150, 200)
  width?: number;
  height?: number;
  layoutId?: string;
}

export const Sticker: React.FC<StickerProps> = ({
  src,
  alt,
  className = '',
  onClick,
  initialRotation = 0,
  hoverRotation,
  width = 120,
  height = 120,
  layoutId,
}) => {
  // Rotação orgânica padrão no hover caso não especificado
  const defaultHoverRotation = initialRotation === 0 ? 5 : initialRotation + 4;
  const hoverRotateVal = hoverRotation !== undefined ? hoverRotation : defaultHoverRotation;

  return (
    <motion.div
      className={`relative inline-block cursor-pointer select-none ${className}`}
      onClick={onClick}
      layoutId={layoutId}
      initial={{ 
        rotate: initialRotation, 
        scale: 1,
        filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))' 
      }}
      whileHover={{
        rotate: hoverRotateVal,
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
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full object-contain pointer-events-none"
        draggable={false}
        loading="lazy"
        sizes={`${width}px`}
      />
    </motion.div>
  );
};
