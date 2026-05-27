import React from 'react';
import { LegendaryPlayer } from '@/types/worldcup';
import { Sticker } from './Sticker';
import { CircleHighlight } from './doodles/CircleHighlight';
import { cyrb53, seededRandom } from '@/lib/doodle-seed';

interface LegendRowProps {
  player: LegendaryPlayer;
}

export function LegendRow({ player }: LegendRowProps) {
  const seed = cyrb53(player.id);
  const initialRotation = seededRandom(seed, -4, 4);
  const hoverOffset = seededRandom(seed + 1, 2, 4) * (seededRandom(seed + 2, -1, 1) > 0 ? 1 : -1);
  const hoverRotation = initialRotation + hoverOffset;

  return (
    <div 
      className="my-14 p-6 md:p-8 rounded-lg relative overflow-hidden border-4 border-double border-amber-500/50 shadow-[0_10px_30px_rgba(245,158,11,0.15)] flex flex-col md:flex-row gap-8 md:gap-16 items-center md:items-start w-full transition-all duration-300 hover:shadow-[0_15px_35px_rgba(245,158,11,0.25)] select-none rotate-[0.5deg]"
      style={{
        backgroundImage: 'radial-gradient(circle at center, #fffbeb 0%, #fef3c7 70%, #fde68a 100%)',
        clipPath: 'polygon(0.5% 1%, 99.5% 0%, 100% 99%, 0% 98%)'
      }}
    >
      {/* Detalhes de Brilho Dourado Metálico nas Bordas */}
      <div className="absolute inset-0 border-2 border-dashed border-amber-600/30 rounded-lg pointer-events-none" />
      
      {/* Símbolo de Edição de Ouro no Fundo */}
      <div className="absolute -right-12 -bottom-12 text-[140px] font-marker text-amber-500/10 pointer-events-none uppercase select-none tracking-widest font-black rotate-[-15deg]">
        GOLD
      </div>

      {/* Selo Metalizado Dourado "LENDA HISTÓRICA" */}
      <div 
        className="absolute top-4 right-4 md:right-8 font-marker text-xs md:text-sm tracking-widest font-bold border-4 border-amber-600 px-3 py-1 text-amber-800 bg-amber-200/90 shadow-md rotate-[-6deg]"
        style={{
          borderRadius: '4px',
          boxShadow: 'inset 0 0 6px rgba(217,119,6,0.3), 0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        🌟 LENDA DE OURO
      </div>

      {/* Coluna do Sticker */}
      <div className="relative shrink-0 flex flex-col items-center mt-6 md:mt-2">
        {/* Glow Dourado de Fundo */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/20 via-yellow-400/40 to-amber-300/20 blur-xl rounded-full scale-110 z-0 animate-pulse pointer-events-none" />
        
        <Sticker 
          src={player.illustration_url} 
          alt={`Ilustração Lendária de ${player.name}`} 
          width={240} 
          height={270} 
          initialRotation={initialRotation}
          hoverRotation={hoverRotation}
          className="z-10 w-[170px] h-[190px] md:w-[245px] md:h-[275px] shadow-[0_8px_20px_rgba(217,119,6,0.25)] border-4 border-amber-400"
        />
        
        <div className="absolute -bottom-4 right-0 font-stats text-4xl font-bold text-amber-900 rotate-12 bg-amber-100 rounded-full px-2 shadow-md border-2 border-amber-400 z-20">
          <CircleHighlight seed={player.id}>
            {player.jersey_number}
          </CircleHighlight>
        </div>
      </div>

      {/* Coluna de Anotações */}
      <div className="flex flex-col gap-2 flex-grow max-w-lg mt-4 md:mt-2 relative w-full z-10 text-neutral-800">
        
        <div className="inline-block transform -rotate-1">
          <h3 className="font-marker text-3xl md:text-5xl text-amber-900 mb-1 leading-none tracking-tight inline-block bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 bg-clip-text text-transparent">
            {player.name}
          </h3>
        </div>
        
        <p className="font-handwritten text-2xl text-amber-800 leading-relaxed font-bold transform rotate-1 mb-3">
          {player.position} • {player.era}
        </p>

        {/* Estatísticas estilo lista escrita com caneta dourada/vermelha */}
        <div className="flex flex-col gap-2 ml-2 mt-2">
          <div className="flex items-center gap-3 font-handwritten text-2xl text-amber-950 -rotate-[0.5deg]">
            <span className="shrink-0 text-2xl" role="img" aria-label="gols">⚽</span>
            <span className="font-bold">{player.stats.career_goals} gols na carreira lendária</span>
          </div>
          <div className="flex items-center gap-3 font-handwritten text-2xl text-amber-950 rotate-[0.5deg]">
            <span className="shrink-0 text-2xl" role="img" aria-label="copas">🏆</span>
            <span className="font-bold">{player.stats.world_cups_played} Copas disputadas</span>
          </div>
          <div className="flex items-center gap-3 font-handwritten text-2xl text-amber-950 -rotate-1">
            <span className="shrink-0 text-2xl" role="img" aria-label="gols copa">🎯</span>
            <span className="font-bold">{player.stats.world_cup_goals} gols em Copas do Mundo</span>
          </div>
        </div>

        {/* Citação com marca-texto Dourado/Amarelo Forte */}
        <div className="mt-8 inline-block transform rotate-1">
          <span 
            className="font-handwritten text-2xl text-neutral-900 px-2 py-1 leading-loose box-decoration-clone font-bold italic" 
            style={{ 
              backgroundImage: 'linear-gradient(180deg, transparent 55%, rgba(245, 158, 11, 0.4) 55%)' 
            }}
          >
            "{player.short_bio}"
          </span>
        </div>

        {player.stats.historical_fact && (
          <div className="mt-6 text-amber-900 font-handwritten text-xl opacity-90 -rotate-1 ml-1 border-l-4 border-amber-500 pl-4 italic">
            ⭐ {player.stats.historical_fact}
          </div>
        )}
      </div>
    </div>
  );
}
