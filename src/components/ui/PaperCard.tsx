'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types/worldcup';

interface PaperCardProps {
  player: Player;
  initialRotation?: number;
  themeColor?: string;
}

export const PaperCard: React.FC<PaperCardProps> = ({
  player,
  initialRotation = 0,
  themeColor = '#ffdf00',
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className="relative w-[280px] h-[400px] perspective-1000 cursor-pointer select-none mx-auto"
      onClick={handleCardClick}
      data-testid="papercard-3d-wrapper"
    >
      <motion.div
        className="w-full h-full transform-style-3d relative"
        initial={{ rotate: initialRotation }}
        animate={{ 
          rotateY: isFlipped ? 180 : 0,
          rotate: isFlipped ? 0 : initialRotation,
        }}
        whileHover={{
          rotate: 0,
          scale: 1.04,
          zIndex: 40,
        }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
        data-testid="papercard-motion-container"
      >
        {/* LADO FRENTE (ILUSTRAÇÃO POP-ART DO JOGADOR) */}
        <div 
          className="absolute inset-0 w-full h-full rounded-2xl bg-white p-4 flex flex-col justify-between backface-hidden border-4 border-neutral-100 shadow-scrapbook"
          style={{ borderColor: `${themeColor}cc` }}
          data-testid="card-front"
        >
          {/* Fundo de papelão sutil no card para dar profundidade física */}
          <div className="absolute inset-0 rounded-xl opacity-[0.03] bg-repeat pointer-events-none" style={{ backgroundImage: "url('/images/textures/kraft-paper.png')" }} />
          
          {/* Cabeçalho do Card (Número e Posição) */}
          <div className="flex justify-between items-center z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
              {player.position}
            </span>
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-extrabold shadow-sm border border-white/20"
              style={{ backgroundColor: themeColor }}
            >
              {player.jersey_number}
            </div>
          </div>

          {/* Área da Ilustração Pop-Art (Sticker) */}
          <div className="relative flex-1 flex items-center justify-center my-2 bg-neutral-50 rounded-xl border border-neutral-100 p-2 overflow-hidden">
            {/* Círculo decorativo Pop-Art atrás do jogador */}
            <div 
              className="absolute w-32 h-32 rounded-full opacity-10 filter blur-xs animate-pulse"
              style={{ backgroundColor: themeColor }}
            />
            <img
              src={player.illustration_url}
              alt={player.name}
              className="h-full w-full object-contain z-10 drop-shadow-[0_8px_8px_rgba(0,0,0,0.3)] pointer-events-none"
              draggable={false}
            />
          </div>

          {/* Nome e Clube */}
          <div className="z-10 text-center">
            <h3 className="font-display text-xl font-extrabold text-neutral-800 leading-tight">
              {player.name}
            </h3>
            <p className="text-xs text-neutral-500 font-medium mt-0.5">
              {player.current_club} • {player.age} anos
            </p>
          </div>
        </div>

        {/* LADO VERSO (BIOGRAFIA E ESTATÍSTICAS DO JOGADOR) */}
        <div 
          className="absolute inset-0 w-full h-full rounded-2xl p-4 flex flex-col justify-between backface-hidden rotate-y-180 border-4 border-neutral-100 shadow-scrapbook bg-amber-50"
          style={{ borderColor: themeColor }}
          data-testid="card-back"
        >
          {/* Fundo de textura pautada amassada para o verso parecer uma anotação de caderno */}
          <div className="absolute inset-0 rounded-xl bg-lined-paper opacity-[0.25] pointer-events-none" />
          
          <div className="z-10 flex flex-col h-full justify-between">
            {/* Cabeçalho do Verso */}
            <div className="flex justify-between items-center border-b border-neutral-200/80 pb-2">
              <h4 className="font-display font-extrabold text-neutral-800 text-sm tracking-wide uppercase">
                Ficha Técnica
              </h4>
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: themeColor }}
              >
                {player.jersey_number}
              </div>
            </div>

            {/* Biografia Curta (Estilizada como escrita à mão) */}
            <div className="my-3 bg-white/70 backdrop-blur-xs p-3 rounded-lg border border-neutral-200/40 relative shadow-xs">
              <p className="text-xs text-neutral-700 italic leading-relaxed font-sans">
                "{player.short_bio}"
              </p>
            </div>

            {/* Estatísticas de Carreira (Mini Tabela de Recortes) */}
            <div className="grid grid-cols-3 gap-2 text-center my-1">
              <div className="bg-white/80 p-1.5 rounded border border-neutral-200/40 shadow-2xs">
                <span className="block text-[10px] text-neutral-400 font-bold uppercase">Carreira</span>
                <span className="text-sm font-extrabold text-neutral-800">{player.stats.career_goals}</span>
                <span className="block text-[8px] text-neutral-400">Gols</span>
              </div>
              <div className="bg-white/80 p-1.5 rounded border border-neutral-200/40 shadow-2xs">
                <span className="block text-[10px] text-neutral-400 font-bold uppercase">Copas</span>
                <span className="text-sm font-extrabold text-neutral-800">{player.stats.world_cups_played}</span>
                <span className="block text-[8px] text-neutral-400">Partidas</span>
              </div>
              <div className="bg-white/80 p-1.5 rounded border border-neutral-200/40 shadow-2xs">
                <span className="block text-[10px] text-neutral-400 font-bold uppercase">Gols Copa</span>
                <span className="text-sm font-extrabold text-neutral-800">{player.stats.world_cup_goals}</span>
                <span className="block text-[8px] text-neutral-400">Gols</span>
              </div>
            </div>

            {/* Fato Histórico (Estilo Recorte de Jornal Velho) */}
            <div className="mt-3 p-3 bg-neutral-100/90 rounded border-l-4 border-neutral-500 shadow-2xs relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-neutral-400 text-white text-[7px] font-black uppercase px-1">
                FATO
              </div>
              <p className="text-[10px] text-neutral-600 font-semibold leading-relaxed">
                {player.stats.historical_fact}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
