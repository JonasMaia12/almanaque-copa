import React from 'react';
import { Player } from '@/types/worldcup';
import { Sticker } from './Sticker';
import { HandArrow } from './doodles/HandArrow';
import { CircleHighlight } from './doodles/CircleHighlight';
import { TapeStrip } from './doodles/TapeStrip';
import { cyrb53, seededRandom } from '@/lib/doodle-seed';

interface PlayerRowProps {
  player: Player;
  isEven: boolean;
  index: number;
}

export function PlayerRow({ player, isEven, index }: PlayerRowProps) {
  const alignClass = isEven ? 'md:flex-row' : 'md:flex-row-reverse';
  
  const seed = cyrb53(player.id);
  const initialRotation = seededRandom(seed, -6, 6);
  // Rotaciona para um ângulo ligeiramente diferente no hover (ex: soma ou subtrai de 3 a 6 graus)
  const hoverOffset = seededRandom(seed + 1, 3, 6) * (seededRandom(seed + 2, -1, 1) > 0 ? 1 : -1);
  const hoverRotation = initialRotation + hoverOffset;

  return (
    <div className={`flex flex-col ${alignClass} gap-6 md:gap-16 items-center md:items-start my-12 relative w-full px-4 md:px-10`}>
      {/* Coluna do Sticker */}
      <div className="relative shrink-0 flex flex-col items-center">
        <TapeStrip seed={player.id} color="washi" className="top-[-10px] left-1/2 -translate-x-1/2" />
        <Sticker 
          src={player.illustration_url} 
          alt={`Ilustração de ${player.name}`} 
          width={180} 
          height={200} 
          initialRotation={initialRotation}
          hoverRotation={hoverRotation}
          className="z-10"
        />
        <div className="absolute -bottom-4 right-0 font-stats text-4xl font-bold text-red-800 rotate-12 bg-white/50 rounded-full px-2">
          <CircleHighlight seed={player.id}>
            {player.jersey_number}
          </CircleHighlight>
        </div>
      </div>

      {/* Coluna de Anotações */}
      <div className="flex flex-col gap-2 flex-grow max-w-lg mt-4 md:mt-0 relative w-full">
        <h3 className="font-marker text-3xl md:text-4xl text-neutral-900 mb-1 leading-tight transform -rotate-1">
          {player.name}
        </h3>
        
        <p className="font-handwritten text-xl text-blue-900 leading-relaxed max-w-[90%] transform rotate-1 mb-2">
          {player.position} • {player.current_club}
          <HandArrow seed={player.id + 'arrow'} direction={isEven ? "left" : "right"} className="ml-2 hidden md:inline-block opacity-70" />
        </p>

        {/* Estatísticas estilo lista escrita à mão */}
        <div className="flex flex-col gap-2 ml-4 mt-2">
          <div className="flex items-center gap-2 font-handwritten text-xl text-red-800 -rotate-1">
            <span className="text-xl">✏</span> {player.stats.career_goals} gols na carreira
          </div>
          <div className="flex items-center gap-2 font-handwritten text-xl text-blue-900 rotate-1">
            <span className="text-xl">✏</span> {player.stats.world_cups_played} Copas disputadas
          </div>
          <div className="flex items-center gap-2 font-handwritten text-xl text-neutral-900 -rotate-[0.5deg]">
            <span className="text-xl">✏</span> {player.stats.world_cup_goals} gols em Copas
          </div>
        </div>

        {/* Citação com marca-texto */}
        <div className="mt-6 inline-block transform rotate-1">
          <span 
            className="font-handwritten text-xl text-neutral-900 px-1 py-1 leading-loose box-decoration-clone" 
            style={{ backgroundImage: 'linear-gradient(180deg, transparent 60%, var(--color-marca-texto) 60%)' }}
          >
            "{player.short_bio}"
          </span>
        </div>

        {player.stats.historical_fact && (
          <div className="mt-4 text-neutral-700 font-handwritten text-lg opacity-80 -rotate-1 ml-2 border-l-2 border-red-800/30 pl-3">
            * {player.stats.historical_fact}
          </div>
        )}
      </div>
    </div>
  );
}
