"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GroupSheet } from './GroupSheet';
import { Team } from '@/types/worldcup';

interface ScatteredGroupsProps {
  groups: Record<string, Team[]>;
  sortedGroups: string[];
}

export function ScatteredGroups({ groups, sortedGroups }: ScatteredGroupsProps) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Coleta todas as seleções para o sorteador aleatório
  const allTeams = Object.values(groups).flat();

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleRandomSelect = () => {
    if (allTeams.length === 0) return;
    const randomTeam = allTeams[Math.floor(Math.random() * allTeams.length)];
    router.push(`/team/${randomTeam.id}`);
  };

  if (!mounted) {
    // Avoid hydration mismatch by rendering a safe default
    return <div className="w-full max-w-6xl mx-auto flex flex-col items-center opacity-0"></div>;
  }

  const query = searchQuery.trim().toLowerCase();

  return (
    <div className="w-full flex flex-col items-center">
      {/* PAINEL DE CONTROLE / BUSCA E STATS LINK */}
      <div className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 relative z-30 px-4">
        
        {/* BARRA DE PESQUISA (TIRA DE PAPEL RASGADO) */}
        <div className="w-full max-w-md relative rotate-[-1deg] hover:rotate-0 transition-transform duration-200">
          <div className="absolute top-[-12px] left-[15%] w-10 h-6 bg-white/20 rotate-[-15deg] shadow-2xs border-l border-r border-white/5" style={{ clipPath: 'polygon(5% 0, 95% 5%, 100% 100%, 0% 90%)' }} />
          <div className="absolute top-[-12px] right-[15%] w-10 h-6 bg-white/20 rotate-[20deg] shadow-2xs border-l border-r border-white/5" style={{ clipPath: 'polygon(2% 5%, 98% 0%, 95% 100%, 5% 92%)' }} />
          
          <div 
            className="bg-amber-50 shadow-scrapbook border border-amber-200/50 p-2.5 px-5 flex items-center gap-3"
            style={{ clipPath: 'polygon(1% 2%, 99% 0%, 100% 97%, 0% 95%)' }}
          >
            <span className="font-marker text-lg text-neutral-500 select-none">🔍</span>
            <input 
              type="text"
              placeholder="Procurar seleção..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none outline-none font-handwritten text-xl text-neutral-800 placeholder-neutral-400"
            />
          </div>
        </div>

        {/* LINK PARA ESTATÍSTICAS (POST-IT PREGADO COM FITA CRÊPE) */}
        <button
          onClick={() => router.push('/stats')}
          className="relative inline-block bg-teal-100 hover:bg-teal-50 p-3 pt-4 px-6 shadow-scrapbook border border-teal-200/30 font-marker text-sm text-teal-950 rotate-[2deg] hover:rotate-[1deg] transition-all duration-200 cursor-pointer uppercase tracking-wider"
          style={{ clipPath: 'polygon(2% 0%, 98% 3%, 100% 95%, 0% 98%)' }}
        >
          <div className="absolute top-[-12px] left-1/2 -translate-x-1/2 w-12 h-6 bg-white/40 rotate-[-5deg] shadow-2xs border-l border-r border-white/10" style={{ clipPath: 'polygon(4% 0, 96% 4%, 100% 100%, 0% 95%)' }} />
          📊 Ver Painel de Estatísticas
        </button>

      </div>

      {/* LISTAGEM DOS GRUPOS */}
      <div className={`w-full max-w-6xl mx-auto ${isMobile ? 'flex flex-col gap-8 items-center' : 'flex flex-wrap justify-center gap-12 mt-4 pb-20'}`}>
        {sortedGroups.map((groupName, index) => {
          const groupTeams = groups[groupName];
          const hasMatch = !query || groupTeams.some(t => t.name.toLowerCase().includes(query));
          const isDimmed = query !== '' && !hasMatch;

          return (
            <GroupSheet 
              key={groupName} 
              groupName={groupName} 
              teams={groupTeams} 
              isMobile={isMobile}
              index={index}
              isDimmed={isDimmed}
              searchQuery={query}
            />
          );
        })}
      </div>

      {/* BOTÃO FLUTUANTE SORTEADOR ALEATÓRIO 🎲 (CARIMBO ROBUSTO DE DADO) */}
      <button
        onClick={handleRandomSelect}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-red-700 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-dashed border-red-900 cursor-pointer select-none group transition-transform active:scale-95"
        style={{
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(255,255,255,0.2)',
          transform: 'rotate(-5deg)'
        }}
        title="Sortear Seleção Aleatória 🎲"
      >
        <span className="font-marker text-3xl group-hover:scale-110 group-hover:rotate-[360deg] transition-all duration-500 ease-out select-none">
          🎲
        </span>
      </button>
    </div>
  );
}
