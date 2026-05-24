import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Team } from '@/types/worldcup';
import worldCupData from '@/data/worldcup.json';
import { TornPaper } from '@/components/ui/TornPaper';
import { TrophyRow } from '@/components/ui/TrophyRow';
import { PlayerRow } from '@/components/ui/PlayerRow';
import { Stamp } from '@/components/ui/doodles/Stamp';
import { InkBlot } from '@/components/ui/doodles/InkBlot';

export async function generateStaticParams() {
  return worldCupData.teams.map((team) => ({
    id: team.id,
  }));
}

interface TeamPageProps {
  params: Promise<{ id: string }>;
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { id } = await params;
  
  const team = worldCupData.teams.find((t) => t.id === id) as Team | undefined;

  if (!team) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-cutting-mat flex flex-col items-center justify-start py-8 px-4 relative select-none">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.5)_100%)] z-0" />

      {/* BOTÃO VOLTAR */}
      <div className="w-full max-w-4xl flex justify-start mb-6 z-30">
        <Link href="/" className="relative inline-block rotate-[-2deg] hover:rotate-0 transition-transform duration-150">
          <div className="bg-amber-100 text-neutral-800 font-marker text-sm px-5 py-2.5 shadow-md border border-amber-200/50 uppercase tracking-wider relative">
            <div className="absolute left-[-4px] top-0 bottom-0 w-[4px] bg-neutral-900/10 [clip-path:polygon(100%_0,0_50%,100%_100%)]" />
            <div className="absolute right-[-4px] top-0 bottom-0 w-[4px] bg-neutral-900/10 [clip-path:polygon(0_0,100%_50%,0_100%)]" />
            ◀ Voltar para a Mesa
          </div>
        </Link>
      </div>

      {/* CADERNO ABERTO (CONTEÚDO INTERNO) */}
      <div 
        className="w-full max-w-4xl bg-lined-paper rounded-sm shadow-scrapbook border-l-4 border-red-700/60 relative overflow-hidden flex flex-col min-h-[800px] z-10"
      >
        <InkBlot seed={team.id} type="coffee" className="top-4 right-10 w-24 h-24" />
        <InkBlot seed={team.id + "ink"} type="ink" className="bottom-20 left-4 w-12 h-12" />

        {/* CABEÇALHO DO PAÍS */}
        <div className="p-6 md:p-10 pl-10 md:pl-16 flex flex-col md:flex-row md:items-start justify-between gap-6 relative">
          
          <div className="flex-1 flex flex-col items-start">
            <div className="relative">
              <h1 
                className="font-marker text-5xl md:text-7xl uppercase tracking-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.15)] rotate-[-2deg]"
                style={{ color: team.theme_color }}
              >
                {team.name}
              </h1>
              {team.titles_count > 0 && (
                <TrophyRow count={team.titles_count} />
              )}
            </div>

            {/* Técnico */}
            <div className="mt-8 bg-yellow-100/90 p-4 shadow-sm rotate-2 transform relative w-48">
              <Stamp text="TÉCNICO" seed={team.id} color="punk-red" className="absolute -top-4 -right-4 scale-75" />
              <span className="text-neutral-800 font-handwritten text-2xl leading-none">{team.manager}</span>
            </div>
          </div>

          {/* FATOS CULTURAIS */}
          <div className="w-full md:w-[320px] flex flex-col gap-6 mt-4 md:mt-0">
            {/* Card de Curiosidade */}
            <div className="bg-yellow-200/90 p-5 shadow-sm rotate-[1.5deg] relative">
              <div className="absolute top-[-8px] left-[50%] transform translate-x-[-50%] w-3 h-3 bg-red-600 rounded-full border border-red-800 shadow-xs" aria-hidden="true" />
              <h3 className="font-marker text-sm uppercase tracking-wide text-neutral-800 mb-2">
                Curiosidade
              </h3>
              <p className="text-2xl text-neutral-800 leading-tight font-handwritten">
                {team.culture.curiosity}
              </p>
            </div>

            {/* Card de Gastronomia */}
            <div className="bg-green-100/90 p-5 shadow-sm rotate-[-1.5deg] relative">
              <h3 className="font-marker text-sm uppercase tracking-wide text-neutral-800 mb-2">
                Gastronomia
              </h3>
              <p className="text-2xl text-neutral-800 leading-tight font-handwritten">
                {team.culture.traditional_food}
              </p>
            </div>
          </div>
        </div>

        {/* RESUMO HISTÓRICO */}
        <div className="px-6 md:px-10 pl-10 md:pl-16 mb-8 mt-4">
          <div className="bg-kraft-cardboard p-6 shadow-md text-neutral-900 border border-neutral-900/10 relative rotate-[0.5deg]" style={{ clipPath: 'polygon(1% 0, 99% 2%, 100% 98%, 0% 100%)' }}>
            <h3 className="font-marker text-lg uppercase tracking-wider mb-2">
              História
            </h3>
            <p className="text-2xl leading-tight font-handwritten">
              {team.history.summary}
            </p>
            <p className="text-2xl leading-tight mt-3 font-bold font-handwritten text-red-900">
              {team.history.milestones}
            </p>
          </div>
        </div>

        {/* JOGADORES */}
        <div className="p-6 md:p-8 pl-10 md:pl-16 flex-1 flex flex-col justify-start relative">
          <div className="flex flex-col w-full mt-2">
            {team.players.map((player, idx) => (
              <PlayerRow 
                key={player.id} 
                player={player} 
                isEven={idx % 2 === 0}
                index={idx}
              />
            ))}
          </div>
        </div>
      </div>
      
      <footer className="w-full max-w-4xl text-center py-8 text-xs text-amber-50/50 font-marker uppercase tracking-wider z-20">
        © 2026 Almanaque da Copa - Feito à mão digitalmente
      </footer>
    </main>
  );
}
