"use client";

import { motion } from 'framer-motion';
import worldCupData from '@/data/worldcup.json';
import { TapeStrip } from '@/components/ui/doodles/TapeStrip';
import { InkBlot } from '@/components/ui/doodles/InkBlot';
import { 
  DoodleStar, 
  DoodleTrophy, 
  DoodleBall, 
  DoodleFire, 
  DoodleGlobe 
} from '@/components/ui/doodles/DoodleIcons';
import { PageStickers } from '@/components/ui/doodles/DecorativeStickers';
import { BackToMesa } from '@/components/ui/BackToMesa';
import { Footer } from '@/components/ui/Footer';
import { RankingPostIt, RankingItem } from '@/components/ui/RankingPostIt';

export default function StatsPage() {
  const teams = worldCupData.teams;

  // 1. Ranking de Títulos de Seleções
  const titleRanking = [...teams]
    .sort((a, b) => b.titles_count - a.titles_count)
    .filter(t => t.titles_count > 0);

  // Coleta todos os jogadores para rankings individuais
  const allPlayers = teams.flatMap(t => 
    t.players.map(p => ({
      ...p,
      teamName: t.name,
      teamColor: t.theme_color
    }))
  );

  // 2. Ranking de Gols em Copas dos Jogadores
  const wcGoalsRanking = [...allPlayers]
    .sort((a, b) => b.stats.world_cup_goals - a.stats.world_cup_goals)
    .slice(0, 5);

  // 3. Ranking de Gols na Carreira (Career Goals)
  const careerGoalsRanking = [...allPlayers]
    .sort((a, b) => b.stats.career_goals - a.stats.career_goals)
    .slice(0, 5);

  // 4. Ranking de Copas Disputadas pelos Jogadores
  const wcPlayedRanking = [...allPlayers]
    .sort((a, b) => b.stats.world_cups_played - a.stats.world_cups_played)
    .slice(0, 5);

  // Mapeamentos para o RankingPostIt
  const titleRankingItems: RankingItem[] = titleRanking.map((team) => ({
    id: team.id,
    name: team.name,
    value: team.titles_count,
    extraElement: (
      <span className="flex gap-0.5 ml-1.5 shrink-0">
        {Array.from({ length: team.titles_count }).map((_, i) => (
          <DoodleStar key={i} size={16} color="#b45309" seed={`star-${team.id}-${i}`} />
        ))}
      </span>
    )
  }));

  const wcGoalsRankingItems: RankingItem[] = wcGoalsRanking.map((player) => ({
    id: player.id,
    name: player.name,
    subtitle: player.teamName,
    value: player.stats.world_cup_goals,
    valueLabel: "gols"
  }));

  const careerGoalsRankingItems: RankingItem[] = careerGoalsRanking.map((player) => ({
    id: player.id,
    name: player.name,
    subtitle: player.teamName,
    value: player.stats.career_goals,
    valueLabel: "gols"
  }));

  const wcPlayedRankingItems: RankingItem[] = wcPlayedRanking.map((player) => ({
    id: player.id,
    name: player.name,
    subtitle: player.teamName,
    value: player.stats.world_cups_played,
    valueLabel: "edições"
  }));

  // Animação de entrada dos post-its
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <main className="min-h-screen bg-cutting-mat flex flex-col items-center justify-start py-8 px-4 relative select-none">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.5)_100%)] z-0" />

      {/* STICKERS DECORATIVOS DA PÁGINA */}
      <PageStickers page="stats" />

      {/* BOTÃO VOLTAR */}
      <BackToMesa className="max-w-5xl" />

      {/* PAINEL DE CORTIÇA */}
      <div 
        className="w-full max-w-5xl rounded-lg shadow-2xl relative overflow-hidden flex flex-col min-h-[750px] z-10 p-6 md:p-10 border-[12px] border-amber-900/70"
        style={{
          backgroundColor: '#9a754b',
          backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.15) 1px, transparent 0), radial-gradient(rgba(0, 0, 0, 0.05) 2px, transparent 0)',
          backgroundSize: '8px 8px, 24px 24px',
          boxShadow: 'inset 0 0 40px rgba(0,0,0,0.6), 0 20px 40px rgba(0,0,0,0.5)'
        }}
      >
        {/* Tachinhas e Doodles Decorativos no Painel de Cortiça */}
        <InkBlot seed="stats-ink-1" type="ink" className="top-4 right-10 w-20 h-20 opacity-30 rotate-12" />
        <InkBlot seed="stats-ink-2" type="coffee" className="bottom-12 left-8 w-28 h-28 opacity-15" />
        
        {/* Tachinhas nos quatro cantos */}
        <div className="absolute top-5 left-5 w-4 h-4 bg-red-600 rounded-full border border-red-800 shadow-md z-20" />
        <div className="absolute top-5 right-5 w-4 h-4 bg-blue-600 rounded-full border border-blue-800 shadow-md z-20" />
        <div className="absolute bottom-5 left-5 w-4 h-4 bg-yellow-500 rounded-full border border-yellow-700 shadow-md z-20" />
        <div className="absolute bottom-5 right-5 w-4 h-4 bg-green-600 rounded-full border border-green-800 shadow-md z-20" />

        {/* TÍTULO DO PAINEL */}
        <div className="flex flex-col items-center mb-12 relative z-20">
          <div className="bg-amber-50 p-6 shadow-md border border-neutral-900/10 rotate-[-1deg] text-center max-w-md relative" style={{ clipPath: 'polygon(1% 0, 99% 3%, 100% 98%, 0% 95%)' }}>
            <TapeStrip seed="stats-title-tape" color="washi" className="-top-3 left-1/2 -translate-x-1/2 scale-110" />
            <h1 className="font-marker text-3xl md:text-4xl text-neutral-800 uppercase tracking-tight leading-none mt-2">
              Painel de Estatísticas
            </h1>
            <p className="font-handwritten text-xl text-red-800 mt-2 font-bold rotate-1 flex items-center justify-center gap-1.5">
              <DoodleStar size={18} color="var(--color-caneta-vermelha)" seed="stats-title-star" /> 
              Registros Históricos Consolidados
            </p>
          </div>
        </div>

        {/* CARDS COM RANKINGS (GRID DE POST-ITS) */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 relative z-10 pb-6 w-full place-items-center"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* POST-IT 1: SELEÇÕES COM TÍTULOS (AMARELO) */}
          <RankingPostIt
            title="Títulos Mundiais"
            icon={<DoodleTrophy size={20} color="var(--color-caneta-preta)" />}
            items={titleRankingItems}
            bgColorClass="bg-[#fef3c7]/95 border-[#fef3c7]/40"
            textColorClass="text-yellow-700"
            tapeColor="transparent"
            customRotation={-1.5}
            clipPathClass="polygon(1% 2%, 99% 0%, 98% 97%, 2% 98%)"
            tapeSeed="stats-postit-1"
          />

          {/* POST-IT 2: ARTILHARIA EM COPAS (ROSA) */}
          <RankingPostIt
            title="Gols em Copas"
            icon={<DoodleBall size={20} color="var(--color-caneta-preta)" />}
            items={wcGoalsRankingItems}
            bgColorClass="bg-[#fee2e2]/95 border-[#fee2e2]/40"
            textColorClass="text-red-800"
            tapeColor="washi"
            customRotation={1.8}
            clipPathClass="polygon(2% 0%, 98% 2%, 100% 98%, 0% 95%)"
            tapeSeed="stats-postit-2"
          />

          {/* POST-IT 3: GOLS NA CARREIRA (AZUL) */}
          <RankingPostIt
            title="Gols na Carreira"
            icon={<DoodleFire size={20} color="var(--color-caneta-preta)" />}
            items={careerGoalsRankingItems}
            bgColorClass="bg-[#dbeafe]/95 border-[#dbeafe]/40"
            textColorClass="text-blue-900"
            tapeColor="transparent"
            customRotation={-2.2}
            clipPathClass="polygon(0% 1%, 100% 0%, 97% 95%, 3% 98%)"
            tapeSeed="stats-postit-3"
          />

          {/* POST-IT 4: COPAS JOGADAS (VERDE) */}
          <RankingPostIt
            title="Copas Disputadas"
            icon={<DoodleGlobe size={20} color="var(--color-caneta-preta)" />}
            items={wcPlayedRankingItems}
            bgColorClass="bg-[#d1fae5]/95 border-[#d1fae5]/40"
            textColorClass="text-emerald-800"
            tapeColor="washi"
            customRotation={1.2}
            clipPathClass="polygon(1% 0%, 99% 2%, 98% 98%, 1% 94%)"
            tapeSeed="stats-postit-4"
          />

        </motion.div>
      </div>

      <Footer className="max-w-5xl" />
    </main>
  );
}
