import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Team } from '@/types/worldcup';
import worldCupData from '@/data/worldcup.json';
import { TrophyRow } from '@/components/ui/TrophyRow';
import { PlayerRow } from '@/components/ui/PlayerRow';
import { LegendRow } from '@/components/ui/LegendRow';
import { Stamp } from '@/components/ui/doodles/Stamp';
import { InkBlot } from '@/components/ui/doodles/InkBlot';
import { TapeStrip } from '@/components/ui/doodles/TapeStrip';
import { ScribbleLine } from '@/components/ui/doodles/ScribbleLine';
import { Sticker } from '@/components/ui/Sticker';
import { HandArrow } from '@/components/ui/doodles/HandArrow';
import { BackToMesa } from '@/components/ui/BackToMesa';
import { Footer } from '@/components/ui/Footer';

export async function generateStaticParams() {
  return worldCupData.teams.map((team) => ({
    id: team.id,
  }));
}

interface TeamPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: TeamPageProps): Promise<Metadata> {
  const { id } = await params;
  const team = worldCupData.teams.find((t) => t.id === id);

  if (!team) return {};

  return {
    title: `${team.name} – Almanaque da Copa 2026`,
    description: team.history.summary,
    openGraph: {
      title: `${team.name} – Almanaque da Copa 2026`,
      description: team.history.summary,
      type: 'website',
      url: `https://almanaque-copa.vercel.app/team/${team.id}`,
    },
  };
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { id } = await params;
  
  const team = worldCupData.teams.find((t) => t.id === id) as Team | undefined;

  if (!team) {
    notFound();
  }

  // Cálculos para navegação entre times (circular infinita)
  const currentIndex = worldCupData.teams.findIndex((t) => t.id === id);
  const totalTeams = worldCupData.teams.length;
  const prevIndex = (currentIndex - 1 + totalTeams) % totalTeams;
  const nextIndex = (currentIndex + 1) % totalTeams;
  const prevTeam = worldCupData.teams[prevIndex];
  const nextTeam = worldCupData.teams[nextIndex];

  return (
    <main className="min-h-screen bg-cutting-mat flex flex-col items-center justify-start py-8 px-4 relative select-none">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.5)_100%)] z-0" />

      {/* BOTÃO VOLTAR */}
      <BackToMesa className="max-w-4xl" />

      {/* CADERNO ABERTO (CONTEÚDO INTERNO) */}
      <div 
        className="w-full max-w-4xl bg-lined-paper rounded-sm shadow-scrapbook border-l-4 border-red-700/60 relative overflow-hidden flex flex-col min-h-[800px] z-10"
      >
        <InkBlot seed={team.id} type="coffee" className="top-4 right-10 w-24 h-24" />
        <InkBlot seed={team.id + "ink"} type="ink" className="bottom-20 left-4 w-12 h-12" />
        <InkBlot seed={team.id + "ink2"} type="coffee" className="top-1/2 right-2 w-16 h-16 opacity-50" />

        {/* CABEÇALHO DO PAÍS */}
        <div className="p-6 md:p-10 pl-10 md:pl-16 flex flex-col md:flex-row md:items-start justify-between gap-6 relative">
          
          <div className="flex-1 flex flex-col items-start w-full">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative w-full">
              <Sticker
                src={team.badge_image}
                alt={`Escudo da seleção ${team.name}`}
                width={110}
                height={110}
                layoutId={`shield-${team.id}`}
                initialRotation={0}
                className="shrink-0"
              />
              <div className="relative flex-1 text-center sm:text-left">
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
            <TapeStrip seed={team.id + 'history'} color="transparent" className="top-[-10px] left-8" />
            <h3 className="font-marker text-lg uppercase tracking-wider mb-2 mt-2">
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
              <React.Fragment key={player.id}>
                {idx > 0 && (
                  <div className="px-4 md:px-10 -my-2 opacity-40">
                    <ScribbleLine seed={`${team.id}-separator-${idx}`} color="var(--color-caneta-vermelha)" />
                  </div>
                )}
                <PlayerRow
                  player={player}
                  isEven={idx % 2 === 0}
                  index={idx}
                />
              </React.Fragment>
            ))}

            {team.legendary_player && (
              <>
                <div className="px-4 md:px-10 my-6 opacity-40">
                  <ScribbleLine seed={`${team.id}-legend-separator`} color="var(--color-caneta-preta)" />
                </div>
                <div className="w-full flex justify-center my-2">
                  <span className="font-marker text-2xl md:text-3xl uppercase text-amber-800 bg-amber-100 border-2 border-dashed border-amber-500/50 px-5 py-2 rotate-[-1deg] shadow-md">
                    Lenda Histórica
                  </span>
                </div>
                <LegendRow player={team.legendary_player} />
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* NAVEGAÇÃO ENTRE SELEÇÕES (POST-ITS COLORIDOS) */}
      <div className="w-full max-w-4xl flex justify-between px-6 sm:px-12 -mt-3 mb-6 z-20">
        {/* Seleção Anterior */}
        <Link 
          href={`/team/${prevTeam.id}`} 
          className="relative block w-44 sm:w-56 bg-amber-100/95 hover:bg-amber-50 p-3 pt-5 pb-3.5 shadow-md border border-amber-200/40 rotate-[-3deg] hover:rotate-[-1deg] transition-all duration-200"
          style={{ clipPath: 'polygon(0% 0%, 100% 2%, 97% 93%, 3% 100%)' }}
        >
          <TapeStrip seed={`${team.id}-nav-prev`} color="transparent" className="-top-3 left-1/2 -translate-x-1/2" />
          <div className="flex flex-col items-start gap-1">
            <span className="text-[10px] text-neutral-500 font-marker uppercase tracking-wider">Anterior</span>
            <div className="flex items-center gap-1.5 w-full py-0.5">
              <HandArrow seed={`${team.id}-arrow-prev`} direction="left" className="shrink-0 scale-75 w-6 h-4" color="var(--color-caneta-azul)" />
              <span className="font-handwritten text-sm sm:text-lg text-neutral-800 font-bold leading-tight break-words min-w-0">
                {prevTeam.name}
              </span>
            </div>
          </div>
        </Link>

        {/* Próxima Seleção */}
        <Link 
          href={`/team/${nextTeam.id}`} 
          className="relative block w-44 sm:w-56 bg-pink-100/95 hover:bg-pink-50 p-3 pt-5 pb-3.5 shadow-md border border-pink-200/40 rotate-[3deg] hover:rotate-[1deg] transition-all duration-200 text-right"
          style={{ clipPath: 'polygon(2% 2%, 98% 0%, 100% 100%, 0% 93%)' }}
        >
          <TapeStrip seed={`${team.id}-nav-next`} color="transparent" className="-top-3 left-1/2 -translate-x-1/2" />
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] text-neutral-500 font-marker uppercase tracking-wider">Próxima</span>
            <div className="flex items-center justify-end gap-1.5 w-full py-0.5">
              <span className="font-handwritten text-sm sm:text-lg text-neutral-800 font-bold leading-tight break-words min-w-0">
                {nextTeam.name}
              </span>
              <HandArrow seed={`${team.id}-arrow-next`} direction="right" className="shrink-0 scale-75 w-6 h-4" color="var(--color-caneta-vermelha)" />
            </div>
          </div>
        </Link>
      </div>
      
      <Footer className="max-w-4xl" />
    </main>
  );
}
