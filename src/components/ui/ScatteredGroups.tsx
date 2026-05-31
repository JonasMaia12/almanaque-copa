"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { GroupSheet } from './GroupSheet';
import { Team } from '@/types/worldcup';
import { DoodleStats } from './doodles/DoodleIcons';

interface ScatteredGroupsProps {
  groups: Record<string, Team[]>;
  sortedGroups: string[];
}

export function ScatteredGroups({ groups, sortedGroups }: ScatteredGroupsProps) {
  const [isMobile, setIsMobile] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!mounted) {
    // Avoid hydration mismatch by rendering a safe default
    return <div className="w-full max-w-6xl mx-auto flex flex-col items-center opacity-0"></div>;
  }

  return (
    <div className="w-full flex flex-col items-center">
      {/* PAINEL DE CONTROLE / LINK PARA STATS */}
      <div className="w-full flex justify-center mb-12 relative z-30 px-4">
        
        {/* LINK PARA ESTATÍSTICAS (POST-IT PREGADO COM FITA CRÊPE) */}
        <Link
          href="/stats"
          className="relative inline-flex items-center gap-3 bg-teal-100 hover:bg-teal-50 p-4 pt-5 px-8 shadow-scrapbook border border-teal-200/30 font-marker text-lg text-teal-950 rotate-[2deg] hover:rotate-[1deg] transition-all duration-200 cursor-pointer uppercase tracking-wider text-center"
          style={{ clipPath: 'polygon(2% 0%, 98% 3%, 100% 95%, 0% 98%)' }}
        >
          <div className="absolute top-[-12px] left-1/2 -translate-x-1/2 w-16 h-6 bg-white/40 rotate-[-5deg] shadow-2xs border-l border-r border-white/10" style={{ clipPath: 'polygon(4% 0, 96% 4%, 100% 100%, 0% 95%)' }} />
          <DoodleStats size={24} className="text-teal-950" />
          Ver Painel de Estatísticas
        </Link>

      </div>

      {/* LISTAGEM DOS GRUPOS */}
      <div className={`w-full max-w-6xl mx-auto ${isMobile ? 'flex flex-col gap-8 items-center' : 'flex flex-wrap justify-center gap-12 mt-4 pb-20'}`}>
        {sortedGroups.map((groupName, index) => {
          const groupTeams = groups[groupName];
          return (
            <GroupSheet 
              key={groupName} 
              groupName={groupName} 
              teams={groupTeams} 
              isMobile={isMobile}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
}
