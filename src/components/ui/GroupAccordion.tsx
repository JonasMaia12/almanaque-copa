'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sticker } from '@/components/ui/Sticker';

interface Team {
  id: string;
  name: string;
  badge_image: string;
}

interface GroupAccordionProps {
  groups: Record<string, Team[]>;
  sortedGroups: string[];
  defaultOpenGroup?: string;
}

export function GroupAccordion({ groups, sortedGroups, defaultOpenGroup }: GroupAccordionProps) {
  const [expandedGroup, setExpandedGroup] = useState<string | null>(
    defaultOpenGroup ?? null
  );

  return (
    <div className="w-full z-10 bg-amber-50/90 backdrop-blur-2xs rounded-2xl p-4 border border-amber-950/20 shadow-inner flex-1 min-h-[350px]">
      <h2 className="font-display font-extrabold text-neutral-800 text-base mb-3 text-center border-b border-amber-950/10 pb-2 uppercase tracking-wide">
        Coleção de Grupos
      </h2>

      <div className="space-y-2.5">
        {sortedGroups.map((groupName) => {
          const isOpen = expandedGroup === groupName;
          const panelId = `group-panel-${groupName.replace(/\s+/g, '-')}`;
          const buttonId = `group-btn-${groupName.replace(/\s+/g, '-')}`;

          return (
            <div 
              key={groupName} 
              className="border border-neutral-200 rounded-xl overflow-hidden bg-white shadow-2xs transition-all duration-200"
            >
              {/* Botão do Cabeçalho do Grupo (Efeito de aba colada) */}
              <button
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className={`w-full text-left px-4 py-2.5 font-display font-extrabold text-sm md:text-base flex justify-between items-center transition-colors duration-150 ${
                  isOpen ? 'bg-neutral-800 text-white' : 'bg-neutral-50 text-neutral-800 hover:bg-neutral-100'
                }`}
                onClick={() => setExpandedGroup(isOpen ? null : groupName)}
              >
                <span>{groupName}</span>
                <span className="text-xs" aria-hidden="true">{isOpen ? '▼' : '▶'}</span>
              </button>

              {/* Conteúdo do Accordion (Adesivos das seleções) */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
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
                            aria-label={`Ver página da seleção ${team.name}`}
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
  );
}
