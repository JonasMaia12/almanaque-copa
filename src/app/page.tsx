'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import worldCupData from '@/data/worldcup.json';
import { Sticker } from '@/components/ui/Sticker';

export default function Home() {
  const [expandedGroup, setExpandedGroup] = useState<string | null>('Grupo G'); // Começa com o grupo do Brasil expandido para melhor impacto inicial

  // Agrupa as equipes do JSON por Grupo
  const groups: { [key: string]: typeof worldCupData.teams } = {};
  worldCupData.teams.forEach((team) => {
    if (!groups[team.group]) {
      groups[team.group] = [];
    }
    groups[team.group].push(team);
  });

  const sortedGroups = Object.keys(groups).sort();



  return (
    <main className="min-h-screen bg-cutting-mat flex items-center justify-center p-4 md:p-8 relative">
      {/* Sutil overlay de ruído e vinheta para dar realismo à mesa de corte */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.45)_100%)]" />

      {/* CADERNO CENTRAL DE RECOTES (CAPA) */}
      <motion.div
        className="w-full max-w-lg md:max-w-xl bg-kraft-cardboard rounded-3xl p-6 md:p-8 shadow-scrapbook border-8 border-amber-900/10 relative overflow-hidden flex flex-col items-center select-none"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        {/* Adereços táteis nos cantos (Fitas Adesivas/Washi Tape transparentes nos cantos) */}
        <div className="absolute top-[-10px] left-[-10px] w-24 h-8 bg-amber-100/30 border border-amber-200/10 backdrop-blur-2xs rotate-[-35deg] pointer-events-none" />
        <div className="absolute bottom-[-10px] right-[-10px] w-24 h-8 bg-amber-100/30 border border-amber-200/10 backdrop-blur-2xs rotate-[-35deg] pointer-events-none" />

        {/* TÍTULO DA CAPA (Estilo letras de recorte de revista/zine) */}
        <div 
          className="text-center mb-8 mt-2 relative z-10 w-full flex flex-col items-center"
          aria-label="Almanaque da Copa 2026"
          role="img"
        >
          <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 max-w-full">
            {["A", "L", "M", "A", "N", "A", "Q", "U", "E"].map((char, i) => {
              const rotation = i % 2 === 0 ? 'rotate-2' : '-rotate-3';
              const bg = i % 3 === 0 ? 'bg-amber-50 text-neutral-800' : i % 3 === 1 ? 'bg-neutral-800 text-amber-50' : 'bg-red-700 text-white';
              return (
                <span
                  key={i}
                  className={`inline-block px-3 py-1 font-display text-2xl md:text-3xl font-extrabold uppercase shadow-sm border border-neutral-700/20 transform ${rotation} ${bg}`}
                >
                  {char}
                </span>
              );
            })}
          </div>

          <div className="flex justify-center gap-1.5 mt-3">
            {["D", "A"].map((char, i) => (
              <span
                key={i}
                className="inline-block px-2.5 py-0.5 bg-neutral-100 text-neutral-700 font-display text-sm md:text-base font-black uppercase rotate-1 shadow-2xs border border-neutral-300"
              >
                {char}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 mt-3 max-w-full">
            {["C", "O", "P", "A"].map((char, i) => {
              const rotation = i % 2 === 0 ? '-rotate-3' : 'rotate-3';
              const bg = i % 2 === 0 ? 'bg-blue-600 text-white' : 'bg-amber-400 text-neutral-900';
              return (
                <span
                  key={i}
                  className={`inline-block px-4 py-1.5 font-display text-3xl md:text-4xl font-black uppercase shadow-md border border-neutral-800/10 transform ${rotation} ${bg}`}
                >
                  {char}
                </span>
              );
            })}
          </div>

          {/* Carimbo de 2026 rústico */}
          <div className="absolute right-[-10px] md:right-4 top-16 border-4 border-dashed border-red-700/40 text-red-700/40 font-display text-sm md:text-base font-extrabold px-2 py-0.5 rounded rotate-12 select-none uppercase tracking-wider">
            EUA 2026
          </div>
        </div>

        {/* ACCORDION DE GRUPOS (Páginas do álbum) */}
        <div className="w-full z-10 bg-amber-50/90 backdrop-blur-2xs rounded-2xl p-4 border border-amber-950/20 shadow-inner flex-1 min-h-[350px]">
          <h2 className="font-display font-extrabold text-neutral-800 text-base mb-3 text-center border-b border-amber-950/10 pb-2 uppercase tracking-wide">
            Coleção de Grupos
          </h2>

          <div className="space-y-2.5">
            {sortedGroups.map((groupName) => {
              const isOpen = expandedGroup === groupName;
              return (
                <div 
                  key={groupName} 
                  className="border border-neutral-200 rounded-xl overflow-hidden bg-white shadow-2xs transition-all duration-200"
                >
                  {/* Botão do Cabeçalho do Grupo (Efeito de aba colada) */}
                  <button
                    className={`w-full text-left px-4 py-2.5 font-display font-extrabold text-sm md:text-base flex justify-between items-center transition-colors duration-150 ${
                      isOpen ? 'bg-neutral-800 text-white' : 'bg-neutral-50 text-neutral-800 hover:bg-neutral-100'
                    }`}
                    onClick={() => setExpandedGroup(isOpen ? null : groupName)}
                  >
                    <span>{groupName}</span>
                    <span className="text-xs">{isOpen ? '▼' : '▶'}</span>
                  </button>

                  {/* Conteúdo do Accordion (Adesivos das seleções) */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 items-center justify-items-center bg-amber-50/10">
                          {groups[groupName].map((team, idx) => {
                            // Rotações alternadas aleatórias para parecer colado de verdade
                            const rotations = [-4, 3, -2, 5];
                            const initialRotation = rotations[idx % rotations.length];
                            
                            return (
                              <Link 
                                href={`/team/${team.id}`}
                                key={team.id} 
                                className="flex flex-col items-center text-center cursor-pointer select-none group"
                              >
                                <Sticker
                                  src={team.badge_image}
                                  alt={`Escudo de ${team.name}`}
                                  initialRotation={initialRotation}
                                  width={85}
                                  height={85}
                                />
                                <span className="font-display font-extrabold text-xs text-neutral-700 mt-2 bg-white/70 px-2 py-0.5 rounded shadow-2xs border border-neutral-200 group-hover:bg-neutral-800 group-hover:text-white transition-colors duration-150">
                                  {team.name}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Instrução no rodapé */}
        <p className="text-[10px] text-amber-900/60 font-semibold tracking-wider uppercase mt-4 text-center">
          Dica: Toque em um grupo e clique no adesivo para virar a folha
        </p>
      </motion.div>
    </main>
  );
}
