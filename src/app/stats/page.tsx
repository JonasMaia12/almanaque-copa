"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import worldCupData from '@/data/worldcup.json';
import { TapeStrip } from '@/components/ui/doodles/TapeStrip';
import { Stamp } from '@/components/ui/doodles/Stamp';
import { InkBlot } from '@/components/ui/doodles/InkBlot';

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

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.95 },
    show: (angle: number) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      rotate: angle,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 18
      }
    })
  };

  return (
    <main className="min-h-screen bg-cutting-mat flex flex-col items-center justify-start py-8 px-4 relative select-none">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.5)_100%)] z-0" />

      {/* BOTÃO VOLTAR */}
      <div className="w-full max-w-5xl flex justify-start mb-6 z-30">
        <Link href="/" className="relative inline-block rotate-[-2deg] hover:rotate-0 transition-transform duration-150">
          <div className="bg-amber-50 text-neutral-800 font-marker text-sm px-5 py-2.5 shadow-md border border-amber-200/50 uppercase tracking-wider relative">
            <div className="absolute left-[-4px] top-0 bottom-0 w-[4px] bg-neutral-900/10 [clip-path:polygon(100%_0,0_50%,100%_100%)]" />
            <div className="absolute right-[-4px] top-0 bottom-0 w-[4px] bg-neutral-900/10 [clip-path:polygon(0_0,100%_50%,0_100%)]" />
            ◀ Voltar para a Mesa
          </div>
        </Link>
      </div>

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
        <div className="absolute top-3 left-3 w-4 h-4 bg-red-600 rounded-full border border-red-800 shadow-md z-20" />
        <div className="absolute top-3 right-3 w-4 h-4 bg-blue-600 rounded-full border border-blue-800 shadow-md z-20" />
        <div className="absolute bottom-3 left-3 w-4 h-4 bg-yellow-500 rounded-full border border-yellow-700 shadow-md z-20" />
        <div className="absolute bottom-3 right-3 w-4 h-4 bg-green-600 rounded-full border border-green-800 shadow-md z-20" />

        {/* TÍTULO DO PAINEL */}
        <div className="flex flex-col items-center mb-12 relative z-20">
          <div className="bg-amber-50 p-6 shadow-md border border-neutral-900/10 rotate-[-1deg] text-center max-w-md relative" style={{ clipPath: 'polygon(1% 0, 99% 3%, 100% 98%, 0% 95%)' }}>
            <TapeStrip seed="stats-title-tape" color="washi" className="-top-3 left-1/2 -translate-x-1/2 scale-110" />
            <h1 className="font-marker text-3xl md:text-4xl text-neutral-800 uppercase tracking-tight leading-none mt-2">
              Painel de Estatísticas
            </h1>
            <p className="font-handwritten text-xl text-red-800 mt-2 font-bold rotate-1">
              🎖️ Registros Históricos Consolidados
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
          <motion.div 
            className="w-full max-w-sm bg-[#fef3c7]/95 p-5 pt-7 pb-6 shadow-md border border-[#fef3c7]/40 relative flex flex-col"
            variants={itemVariants}
            custom={-1.5}
            style={{ clipPath: 'polygon(1% 2%, 99% 0%, 98% 97%, 2% 98%)' }}
            whileHover={{ scale: 1.03, rotate: 0, zIndex: 30, boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}
          >
            <TapeStrip seed="stats-postit-1" color="transparent" className="-top-3.5 left-1/2 -translate-x-1/2" />
            <h3 className="font-marker text-lg text-neutral-800 uppercase border-b border-dashed border-neutral-800/20 pb-2 mb-3 tracking-wider">
              🏆 Títulos Mundiais
            </h3>
            <ul className="flex flex-col gap-2 font-handwritten text-xl text-neutral-800">
              {titleRanking.map((team, idx) => (
                <li key={team.id} className="flex justify-between items-center border-b border-neutral-800/5 pb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold font-sans text-sm inline-flex items-center justify-center w-5 h-5 bg-neutral-900 text-white rounded-full">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-neutral-900">{team.name}</span>
                  </div>
                  <span className="font-bold text-yellow-700 text-2xl flex items-center gap-1">
                    {team.titles_count} {"⭐".repeat(team.titles_count)}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* POST-IT 2: ARTILHARIA EM COPAS (ROSA) */}
          <motion.div 
            className="w-full max-w-sm bg-[#fee2e2]/95 p-5 pt-7 pb-6 shadow-md border border-[#fee2e2]/40 relative flex flex-col"
            variants={itemVariants}
            custom={1.8}
            style={{ clipPath: 'polygon(2% 0%, 98% 2%, 100% 98%, 0% 95%)' }}
            whileHover={{ scale: 1.03, rotate: 0, zIndex: 30, boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}
          >
            <TapeStrip seed="stats-postit-2" color="washi" className="-top-3.5 left-1/2 -translate-x-1/2" />
            <h3 className="font-marker text-lg text-neutral-800 uppercase border-b border-dashed border-neutral-800/20 pb-2 mb-3 tracking-wider">
              ⚽ Gols em Copas
            </h3>
            <ul className="flex flex-col gap-2 font-handwritten text-xl text-neutral-800">
              {wcGoalsRanking.map((player, idx) => (
                <li key={player.id} className="flex justify-between items-center border-b border-neutral-800/5 pb-1">
                  <div className="flex flex-col items-start leading-none">
                    <div className="flex items-center gap-1.5">
                      <span className="font-sans text-xs inline-flex items-center justify-center w-4 h-4 bg-neutral-900 text-white rounded-full">
                        {idx + 1}
                      </span>
                      <span className="font-bold text-neutral-900 leading-none">{player.name}</span>
                    </div>
                    <span className="text-xs text-neutral-500 font-marker uppercase ml-5 mt-1">{player.teamName}</span>
                  </div>
                  <span className="font-bold text-red-800 text-2xl font-sans shrink-0">
                    {player.stats.world_cup_goals} <span className="text-sm font-handwritten font-normal">gols</span>
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* POST-IT 3: GOLS NA CARREIRA (AZUL) */}
          <motion.div 
            className="w-full max-w-sm bg-[#dbeafe]/95 p-5 pt-7 pb-6 shadow-md border border-[#dbeafe]/40 relative flex flex-col"
            variants={itemVariants}
            custom={-2.2}
            style={{ clipPath: 'polygon(0% 1%, 100% 0%, 97% 95%, 3% 98%)' }}
            whileHover={{ scale: 1.03, rotate: 0, zIndex: 30, boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}
          >
            <TapeStrip seed="stats-postit-3" color="transparent" className="-top-3.5 left-1/2 -translate-x-1/2" />
            <h3 className="font-marker text-lg text-neutral-800 uppercase border-b border-dashed border-neutral-800/20 pb-2 mb-3 tracking-wider">
              🔥 Gols na Carreira
            </h3>
            <ul className="flex flex-col gap-2 font-handwritten text-xl text-neutral-800">
              {careerGoalsRanking.map((player, idx) => (
                <li key={player.id} className="flex justify-between items-center border-b border-neutral-800/5 pb-1">
                  <div className="flex flex-col items-start leading-none">
                    <div className="flex items-center gap-1.5">
                      <span className="font-sans text-xs inline-flex items-center justify-center w-4 h-4 bg-neutral-900 text-white rounded-full">
                        {idx + 1}
                      </span>
                      <span className="font-bold text-neutral-900 leading-none">{player.name}</span>
                    </div>
                    <span className="text-xs text-neutral-500 font-marker uppercase ml-5 mt-1">{player.teamName}</span>
                  </div>
                  <span className="font-bold text-blue-900 text-2xl font-sans shrink-0">
                    {player.stats.career_goals} <span className="text-sm font-handwritten font-normal">gols</span>
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* POST-IT 4: COPAS JOGADAS (VERDE) */}
          <motion.div 
            className="w-full max-w-sm bg-[#d1fae5]/95 p-5 pt-7 pb-6 shadow-md border border-[#d1fae5]/40 relative flex flex-col"
            variants={itemVariants}
            custom={1.2}
            style={{ clipPath: 'polygon(1% 0%, 99% 2%, 98% 98%, 1% 94%)' }}
            whileHover={{ scale: 1.03, rotate: 0, zIndex: 30, boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}
          >
            <TapeStrip seed="stats-postit-4" color="washi" className="-top-3.5 left-1/2 -translate-x-1/2" />
            <h3 className="font-marker text-lg text-neutral-800 uppercase border-b border-dashed border-neutral-800/20 pb-2 mb-3 tracking-wider">
              🌍 Copas Disputadas
            </h3>
            <ul className="flex flex-col gap-2 font-handwritten text-xl text-neutral-800">
              {wcPlayedRanking.map((player, idx) => (
                <li key={player.id} className="flex justify-between items-center border-b border-neutral-800/5 pb-1">
                  <div className="flex flex-col items-start leading-none">
                    <div className="flex items-center gap-1.5">
                      <span className="font-sans text-xs inline-flex items-center justify-center w-4 h-4 bg-neutral-900 text-white rounded-full">
                        {idx + 1}
                      </span>
                      <span className="font-bold text-neutral-900 leading-none">{player.name}</span>
                    </div>
                    <span className="text-xs text-neutral-500 font-marker uppercase ml-5 mt-1">{player.teamName}</span>
                  </div>
                  <span className="font-bold text-emerald-800 text-2xl font-sans shrink-0">
                    {player.stats.world_cups_played} <span className="text-sm font-handwritten font-normal">edições</span>
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

        </motion.div>
      </div>

      <footer className="w-full max-w-5xl text-center py-8 text-xs text-amber-50/50 font-marker uppercase tracking-wider z-20">
        © 2026 Almanaque da Copa - Feito à mão digitalmente
      </footer>
    </main>
  );
}
