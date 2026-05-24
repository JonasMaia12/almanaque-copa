import React from 'react';
import worldCupData from '@/data/worldcup.json';
import { ScatteredGroups } from '@/components/ui/ScatteredGroups';

// Agrupa equipes por Grupo — executado uma única vez no servidor em build time
function buildGroups(teams: typeof worldCupData.teams): Record<string, typeof worldCupData.teams> {
  return teams.reduce<Record<string, typeof worldCupData.teams>>((acc, team) => {
    if (!acc[team.group]) acc[team.group] = [];
    acc[team.group].push(team);
    return acc;
  }, {});
}

const groups = buildGroups(worldCupData.teams);
const sortedGroups = Object.keys(groups).sort();

// Letras do título com metadados de estilo
const TITLE_CHARS = [
  { word: 'ALMANAQUE', chars: ['A','L','M','A','N','A','Q','U','E'], size: 'text-2xl md:text-3xl', gap: 'gap-1.5 md:gap-2' },
  { word: 'DA', chars: ['D','A'], size: 'text-sm md:text-base', gap: 'gap-1.5' },
  { word: 'COPA', chars: ['C','O','P','A'], size: 'text-3xl md:text-4xl', gap: 'gap-1.5 md:gap-2' },
] as const;

function getTitleCharStyle(wordIndex: number, charIndex: number): string {
  if (wordIndex === 0) {
    // ALMANAQUE
    const rotation = charIndex % 2 === 0 ? 'rotate-2' : '-rotate-3';
    const bg = charIndex % 3 === 0
      ? 'bg-amber-50 text-neutral-800'
      : charIndex % 3 === 1
      ? 'bg-neutral-800 text-amber-50'
      : 'bg-red-700 text-white';
    return `inline-block px-3 py-1 font-sans font-extrabold uppercase shadow-sm border border-neutral-700/20 transform ${rotation} ${bg}`;
  }
  if (wordIndex === 1) {
    // DA
    return 'inline-block px-2.5 py-0.5 bg-neutral-100 text-neutral-700 font-sans font-black uppercase rotate-1 shadow-2xs border border-neutral-300';
  }
  // COPA
  const rotation = charIndex % 2 === 0 ? '-rotate-3' : 'rotate-3';
  const bg = charIndex % 2 === 0 ? 'bg-blue-600 text-white' : 'bg-amber-400 text-neutral-900';
  return `inline-block px-4 py-1.5 font-sans font-black uppercase shadow-md border border-neutral-800/10 transform ${rotation} ${bg}`;
}

export default function Home() {
  return (
    <main className="min-h-screen bg-cutting-mat flex flex-col items-center p-4 md:p-8 relative">
      <div className="w-full max-w-6xl relative z-10 pt-4 md:pt-10">
        
        {/* TÍTULO DA CAPA */}
        <h1 
          className="text-center mb-12 relative z-10 w-full flex flex-col items-center"
          aria-label="Almanaque da Copa 2026"
        >
          {TITLE_CHARS.map((wordData, wIdx) => (
            <div
              key={wordData.word}
              className={`flex ${wIdx === 1 ? 'justify-center' : 'flex-wrap justify-center'} ${wordData.gap} ${wIdx > 0 ? 'mt-3' : ''} max-w-full`}
            >
              {wordData.chars.map((char, cIdx) => (
                <span
                  key={`${char}-${wIdx}-${cIdx}`}
                  className={`${getTitleCharStyle(wIdx, cIdx)} ${wordData.size}`}
                  aria-hidden="true"
                >
                  {char}
                </span>
              ))}
            </div>
          ))}

          {/* Carimbo de 2026 rústico usando font-marker */}
          <div
            className="absolute right-[-10px] md:right-[20%] top-16 md:top-20 border-4 border-dashed border-red-700/60 text-red-700/70 font-marker text-lg md:text-xl font-extrabold px-3 py-1 rounded rotate-12 select-none uppercase tracking-wider bg-white/20 backdrop-blur-sm"
            aria-hidden="true"
          >
            EUA 2026
          </div>
        </h1>

        {/* COMPONENTE DE PAPÉIS ESPALHADOS */}
        <ScatteredGroups
          groups={groups}
          sortedGroups={sortedGroups}
        />

      </div>
    </main>
  );
}
