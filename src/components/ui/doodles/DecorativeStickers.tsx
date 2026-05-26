"use client";

import React, { useRef } from 'react';
import { motion } from 'framer-motion';

interface StickerProps {
  className?: string;
  initialX?: number;
  initialY?: number;
  rotate?: number;
  size?: number;
}

// 1. StarSticker: Estrela Colorida (Amarela/Laranja)
export function StarSticker({ className = "", rotate = 12, size = 60 }: StickerProps) {
  const constraintsRef = useRef(null);
  return (
    <motion.div
      ref={constraintsRef}
      drag
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      dragElastic={0.1}
      whileDrag={{ scale: 1.15, zIndex: 100, filter: 'drop-shadow(0 15px 20px rgba(0,0,0,0.4))' }}
      initial={{ rotate, scale: 1 }}
      whileHover={{ scale: 1.08, rotate: rotate + 5 }}
      className={`inline-block cursor-grab active:cursor-grabbing select-none ${className}`}
      style={{
        width: size,
        height: size,
        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.25))',
      }}
    >
      <svg viewBox="0 0 50 50" className="w-full h-full">
        {/* Borda adesiva branca (Backing) */}
        <path 
          d="M25,2 L32,16 L47,18 L36,29 L39,44 L25,37 L11,44 L14,29 L3,18 L18,16 Z" 
          fill="#ffffff" 
          stroke="#ffffff" 
          strokeWidth="6" 
          strokeLinejoin="round" 
        />
        {/* Corpo colorido preenchido */}
        <path 
          d="M25,3 L31.5,16.5 L46.5,18.5 L35.5,29 L38.5,43.5 L25,36.5 L11.5,43.5 L14.5,29 L3.5,18.5 L18.5,16.5 Z" 
          fill="#fef08a" 
          stroke="#ca8a04" 
          strokeWidth="2" 
          strokeLinejoin="round" 
        />
        {/* Detalhe rabisco interno */}
        <path 
          d="M25,8 L29,17 L38,18 L31,25 L33,34 L25,30 L17,34 L19,25 L12,18 L21,17 Z" 
          fill="none" 
          stroke="#eab308" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          opacity="0.7"
        />
      </svg>
    </motion.div>
  );
}

// 2. BallSticker: Bola de Futebol Clássica
export function BallSticker({ className = "", rotate = -8, size = 60 }: StickerProps) {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      dragElastic={0.1}
      whileDrag={{ scale: 1.15, zIndex: 100, filter: 'drop-shadow(0 15px 20px rgba(0,0,0,0.4))' }}
      initial={{ rotate, scale: 1 }}
      whileHover={{ scale: 1.08, rotate: rotate - 5 }}
      className={`inline-block cursor-grab active:cursor-grabbing select-none ${className}`}
      style={{
        width: size,
        height: size,
        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.25))',
      }}
    >
      <svg viewBox="0 0 50 50" className="w-full h-full">
        {/* Borda adesiva branca */}
        <circle cx="25" cy="25" r="21" fill="#ffffff" stroke="#ffffff" strokeWidth="4" />
        {/* Corpo principal */}
        <circle cx="25" cy="25" r="20" fill="#f9fafb" stroke="#374151" strokeWidth="2.5" />
        {/* Gomos de futebol rabiscados */}
        <path d="M25,19 L30,22 L28.5,27 L21.5,27 L20,22 Z" fill="#1f2937" stroke="#1f2937" strokeWidth="1" />
        {/* Linhas externas */}
        <path d="M25,19 L25,5" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
        <path d="M30,22 L41.5,18" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
        <path d="M28.5,27 L36.5,39" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
        <path d="M21.5,27 L13.5,39" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
        <path d="M20,22 L8.5,18" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
        {/* Gomos de borda */}
        <path d="M21,5 L29,5" stroke="#1f2937" strokeWidth="2" fill="none" />
        <path d="M40,14 L43,22" stroke="#1f2937" strokeWidth="2" fill="none" />
        <path d="M33,42 L39,36" stroke="#1f2937" strokeWidth="2" fill="none" />
        <path d="M11,36 L17,42" stroke="#1f2937" strokeWidth="2" fill="none" />
        <path d="M7,22 L10,14" stroke="#1f2937" strokeWidth="2" fill="none" />
      </svg>
    </motion.div>
  );
}

// 3. WhistleSticker: Apito de Juiz Retro
export function WhistleSticker({ className = "", rotate = -15, size = 65 }: StickerProps) {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -80, right: 80, top: -80, bottom: 80 }}
      dragElastic={0.1}
      whileDrag={{ scale: 1.15, zIndex: 100, filter: 'drop-shadow(0 15px 20px rgba(0,0,0,0.4))' }}
      initial={{ rotate, scale: 1 }}
      whileHover={{ scale: 1.08, rotate: rotate + 5 }}
      className={`inline-block cursor-grab active:cursor-grabbing select-none ${className}`}
      style={{
        width: size,
        height: size,
        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.25))',
      }}
    >
      <svg viewBox="0 0 50 50" className="w-full h-full">
        {/* Borda branca */}
        <path 
          d="M10,25 C10,17 17,10 25,10 L38,10 L44,20 L40,25 C39,26 39,27 40,28 L44,32 L36,32 L36,36 C36,40 32,42 28,42 L25,42 C17,42 10,35 10,25 Z M8,25 C8,21 12,18 12,25" 
          fill="#ffffff" 
          stroke="#ffffff" 
          strokeWidth="6" 
          strokeLinejoin="round" 
        />
        {/* Corpo principal (Metal Cromado / Azul-acinzentado Vintage) */}
        <path 
          d="M11,25 C11,17.5 17.5,11 25,11 L37,11 L43,20 L38,25 C37.5,25.5 37.5,26.5 38,27 C39,28 42,31 42,31 L35,31 L35,35 C35,39 31,41 27,41 C19.5,41 13.5,35 11,25 Z" 
          fill="#cbd5e1" 
          stroke="#475569" 
          strokeWidth="2" 
          strokeLinejoin="round" 
        />
        {/* Alça traseira do apito */}
        <circle cx="9" cy="25" r="4.5" fill="none" stroke="#475569" strokeWidth="2" />
        {/* Abertura do som do apito */}
        <rect x="25" y="15" width="8" height="5" rx="1.5" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
        {/* Brilho do metal */}
        <path d="M16,19 C18,16 23,14 25,14" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}

// 4. CardsSticker: Cartões de Juiz (Vermelho & Amarelo)
export function CardsSticker({ className = "", rotate = 20, size = 55 }: StickerProps) {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      dragElastic={0.1}
      whileDrag={{ scale: 1.15, zIndex: 100, filter: 'drop-shadow(0 15px 20px rgba(0,0,0,0.4))' }}
      initial={{ rotate, scale: 1 }}
      whileHover={{ scale: 1.08, rotate: rotate - 7 }}
      className={`inline-block cursor-grab active:cursor-grabbing select-none ${className}`}
      style={{
        width: size,
        height: size,
        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.25))',
      }}
    >
      <svg viewBox="0 0 50 50" className="w-full h-full">
        {/* Borda branca */}
        <path 
          d="M8,18 L22,6 L38,18 L32,38 L16,44 Z M24,18 L38,8 L46,24 L36,36 Z" 
          fill="#ffffff" 
          stroke="#ffffff" 
          strokeWidth="6" 
          strokeLinejoin="round" 
        />
        {/* Cartão Amarelo (Atrás) */}
        <rect x="8" y="14" width="20" height="30" rx="3" transform="rotate(-15 18 29)" fill="#facc15" stroke="#c2410c" strokeWidth="2" />
        {/* Cartão Vermelho (Frente) */}
        <rect x="22" y="10" width="20" height="30" rx="3" transform="rotate(15 32 25)" fill="#ef4444" stroke="#991b1b" strokeWidth="2" />
        {/* Detalhes rabiscados de movimento nos cartões */}
        <path d="M12,25 C14,24 18,26 19,27" stroke="#ca8a04" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M28,20 C30,19 34,21 35,22" stroke="#b91c1c" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}

// 5. CrownSticker: Coroa Dourada de Campeão
export function CrownSticker({ className = "", rotate = 5, size = 60 }: StickerProps) {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -80, right: 80, top: -80, bottom: 80 }}
      dragElastic={0.1}
      whileDrag={{ scale: 1.15, zIndex: 100, filter: 'drop-shadow(0 15px 20px rgba(0,0,0,0.4))' }}
      initial={{ rotate, scale: 1 }}
      whileHover={{ scale: 1.08, rotate: rotate + 4 }}
      className={`inline-block cursor-grab active:cursor-grabbing select-none ${className}`}
      style={{
        width: size,
        height: size,
        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.25))',
      }}
    >
      <svg viewBox="0 0 50 50" className="w-full h-full">
        {/* Borda branca */}
        <path 
          d="M8,38 L6,22 L16,30 L25,14 L34,30 L44,22 L42,38 Z" 
          fill="#ffffff" 
          stroke="#ffffff" 
          strokeWidth="6" 
          strokeLinejoin="round" 
        />
        {/* Corpo principal */}
        <path 
          d="M9,37 L7,23 L16,31 L25,16 L34,31 L43,23 L41,37 Z" 
          fill="#fbbf24" 
          stroke="#9a3412" 
          strokeWidth="2" 
          strokeLinejoin="round" 
        />
        {/* Joias da coroa */}
        <circle cx="7" cy="21" r="2.5" fill="#ef4444" stroke="#9a3412" strokeWidth="1" />
        <circle cx="25" cy="14" r="3" fill="#3b82f6" stroke="#9a3412" strokeWidth="1" />
        <circle cx="43" cy="21" r="2.5" fill="#ef4444" stroke="#9a3412" strokeWidth="1" />
        <circle cx="16" cy="35" r="2" fill="#10b981" />
        <circle cx="25" cy="35" r="2" fill="#ef4444" />
        <circle cx="34" cy="35" r="2" fill="#10b981" />
        {/* Borda inferior */}
        <path d="M9.5,35 L40.5,35" stroke="#9a3412" strokeWidth="1.5" />
      </svg>
    </motion.div>
  );
}

// 6. HeartSticker: Coração Rabiscado
export function HeartSticker({ className = "", rotate = -10, size = 50 }: StickerProps) {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      dragElastic={0.1}
      whileDrag={{ scale: 1.15, zIndex: 100, filter: 'drop-shadow(0 15px 20px rgba(0,0,0,0.4))' }}
      initial={{ rotate, scale: 1 }}
      whileHover={{ scale: 1.1, rotate: rotate + 7 }}
      className={`inline-block cursor-grab active:cursor-grabbing select-none ${className}`}
      style={{
        width: size,
        height: size,
        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.25))',
      }}
    >
      <svg viewBox="0 0 50 50" className="w-full h-full">
        {/* Borda branca */}
        <path 
          d="M25,42 C23,40 8,28 8,17 C8,10 13,6 19,6 C22,6 24,8 25,10 C26,8 28,6 31,6 C37,6 42,10 42,17 C42,28 27,40 25,42 Z" 
          fill="#ffffff" 
          stroke="#ffffff" 
          strokeWidth="6" 
          strokeLinejoin="round" 
        />
        {/* Corpo principal */}
        <path 
          d="M25,40.5 C23.5,39 9,27 9,17 C9,11 13.5,7 19,7 C21.5,7 23.5,8.5 24.5,10.5 C24.8,11 25.2,11 25.5,10.5 C26.5,8.5 28.5,7 31,7 C36.5,7 41,11 41,17 C41,27 26.5,39 25,40.5 Z" 
          fill="#f43f5e" 
          stroke="#9f1239" 
          strokeWidth="2.5" 
          strokeLinejoin="round" 
        />
        {/* Brilho rabiscado branco */}
        <path d="M13,14 C13,11 16,10 17,10" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}

// 7. LightningSticker: Raio Rabiscado
export function LightningSticker({ className = "", rotate = 15, size = 55 }: StickerProps) {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      dragElastic={0.1}
      whileDrag={{ scale: 1.15, zIndex: 100, filter: 'drop-shadow(0 15px 20px rgba(0,0,0,0.4))' }}
      initial={{ rotate, scale: 1 }}
      whileHover={{ scale: 1.1, rotate: rotate - 6 }}
      className={`inline-block cursor-grab active:cursor-grabbing select-none ${className}`}
      style={{
        width: size,
        height: size,
        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.25))',
      }}
    >
      <svg viewBox="0 0 50 50" className="w-full h-full">
        {/* Borda branca */}
        <path 
          d="M30,3 L10,27 L22,27 L16,47 L40,19 L26,19 Z" 
          fill="#ffffff" 
          stroke="#ffffff" 
          strokeWidth="6" 
          strokeLinejoin="round" 
        />
        {/* Corpo principal */}
        <path 
          d="M29,4 L11,26 L23,26 L17,45 L39,20 L27,20 Z" 
          fill="#fbbf24" 
          stroke="#b45309" 
          strokeWidth="2" 
          strokeLinejoin="round" 
        />
        {/* Brilho interno */}
        <path d="M27,10 L18,22" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}

// Componente utilitário para renderizar stickers espalhados em páginas específicas de forma limpa e harmônica
export function PageStickers({ page }: { page: 'home' | 'team' | 'stats' }) {
  if (page === 'home') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {/* Espalhado nas laterais e cantos da mesa principal */}
        <div className="absolute top-[8%] left-[4%] pointer-events-auto hidden md:block">
          <StarSticker rotate={-15} size={65} />
        </div>
        <div className="absolute top-[35%] left-[2%] pointer-events-auto">
          <BallSticker rotate={12} size={60} />
        </div>
        <div className="absolute bottom-[20%] left-[3%] pointer-events-auto hidden lg:block">
          <WhistleSticker rotate={-25} size={70} />
        </div>
        <div className="absolute top-[12%] right-[3%] pointer-events-auto hidden md:block">
          <CrownSticker rotate={8} size={65} />
        </div>
        <div className="absolute top-[48%] right-[2%] pointer-events-auto">
          <CardsSticker rotate={-18} size={58} />
        </div>
        <div className="absolute bottom-[25%] right-[4%] pointer-events-auto hidden lg:block">
          <LightningSticker rotate={22} size={60} />
        </div>
        <div className="absolute bottom-[5%] left-[20%] pointer-events-auto hidden md:block">
          <HeartSticker rotate={5} size={50} />
        </div>
      </div>
    );
  }

  if (page === 'team') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {/* Um sticker de estrela e bola discretos em volta do caderno de seleções */}
        <div className="absolute top-[5%] left-[8%] pointer-events-auto hidden lg:block">
          <StarSticker rotate={-10} size={60} />
        </div>
        <div className="absolute top-[25%] right-[5%] pointer-events-auto">
          <HeartSticker rotate={15} size={50} />
        </div>
        <div className="absolute bottom-[18%] left-[4%] pointer-events-auto hidden md:block">
          <LightningSticker rotate={-15} size={55} />
        </div>
        <div className="absolute bottom-[10%] right-[6%] pointer-events-auto">
          <BallSticker rotate={20} size={55} />
        </div>
      </div>
    );
  }

  if (page === 'stats') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {/* Adesivos colados nas bordas do painel de estatísticas */}
        <div className="absolute top-[4%] left-[6%] pointer-events-auto">
          <CrownSticker rotate={-8} size={65} />
        </div>
        <div className="absolute top-[20%] right-[4%] pointer-events-auto hidden md:block">
          <WhistleSticker rotate={15} size={65} />
        </div>
        <div className="absolute bottom-[15%] left-[3%] pointer-events-auto">
          <CardsSticker rotate={-12} size={55} />
        </div>
        <div className="absolute bottom-[8%] right-[8%] pointer-events-auto hidden md:block">
          <StarSticker rotate={25} size={60} />
        </div>
      </div>
    );
  }

  return null;
}
