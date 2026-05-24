import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Team } from '@/types/worldcup';
import worldCupData from '@/data/worldcup.json';
import { PaperCard } from '@/components/ui/PaperCard';
import { TornPaper } from '@/components/ui/TornPaper';

// Habilita a geração estática das páginas (SSG) de todas as seleções em tempo de build!
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
  
  // Busca a seleção correspondente no JSON local
  const team = worldCupData.teams.find((t) => t.id === id) as Team | undefined;

  // Se não encontrar, lança 404 nativo do Next.js
  if (!team) {
    notFound();
  }

  // Gera as estrelas comemorativas físicas baseadas na contagem de títulos
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < team.titles_count; i++) {
      stars.push(
        <span 
          key={i} 
          className="text-amber-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)] text-2xl md:text-3xl animate-bounce"
          style={{ animationDelay: `${i * 150}ms`, animationDuration: '3s' }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <main className="min-h-screen bg-cutting-mat flex flex-col items-center justify-start py-8 px-4 relative select-none">
      {/* Sutil overlay de mesa */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.5)_100%)] z-0" />

      {/* BOTÃO VOLTAR (Estilo pedaço de fita adesiva washi tape rasgada nos cantos) */}
      <div className="w-full max-w-4xl flex justify-start mb-6 z-30">
        <Link href="/" className="relative inline-block rotate-[-2deg] hover:rotate-0 transition-transform duration-150">
          <div className="bg-amber-100/90 hover:bg-white text-neutral-800 font-display font-extrabold text-sm px-5 py-2.5 shadow-md border border-amber-200/50 rounded-xs uppercase tracking-wider relative">
            {/* Linha serrilhada simulando rasgos nas pontas da fita */}
            <div className="absolute left-[-4px] top-0 bottom-0 w-[4px] bg-neutral-900/10 [clip-path:polygon(100%_0,0_50%,100%_100%)]" />
            <div className="absolute right-[-4px] top-0 bottom-0 w-[4px] bg-neutral-900/10 [clip-path:polygon(0_0,100%_50%,0_100%)]" />
            ◀ Voltar para a Capa
          </div>
        </Link>
      </div>

      {/* CADERNO ABERTO (CONTEÚDO INTERNO) */}
      <div 
        className="w-full max-w-4xl bg-lined-paper rounded-2xl md:rounded-3xl shadow-scrapbook border-t-8 border-neutral-100 relative overflow-hidden flex flex-col min-h-[800px] z-10"
      >
        {/* Efeito espiral de caderno na lateral esquerda para parecer um caderno de verdade */}
        <div className="absolute left-2 top-0 bottom-0 w-8 flex flex-col justify-around py-4 z-20 pointer-events-none opacity-40">
          {Array.from({ length: 18 }).map((_, i) => (
            <div 
              key={i} 
              className="w-4 h-4 rounded-full bg-neutral-800/80 border-2 border-neutral-400 shadow-inner flex items-center justify-center"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
            </div>
          ))}
        </div>

        {/* CABEÇALHO DO PAÍS (Estilo colagem de fotos e post-its) */}
        <div className="p-6 md:p-10 pl-14 md:pl-16 flex flex-col md:flex-row md:items-start justify-between gap-6 relative">
          
          {/* TÍTULO & DADOS TÉCNICOS */}
          <div className="flex-1 flex flex-col items-start">
            {/* Nome do País */}
            <div className="relative">
              <h1 
                className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.15)] rotate-[-1deg]"
                style={{ color: team.theme_color }}
              >
                {team.name}
              </h1>
              {/* Contagem de Títulos */}
              {team.titles_count > 0 && (
                <div className="flex gap-1.5 mt-2 bg-neutral-900/80 px-3 py-1 rounded-full border border-neutral-800 shadow-sm inline-flex items-center">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-500 mr-1">Títulos</span>
                  <div className="flex">{renderStars()}</div>
                </div>
              )}
            </div>

            {/* Técnico / Informações Gerais em estilo bloco de anotações colado */}
            <div className="mt-4 bg-white/70 backdrop-blur-2xs p-3 rounded-lg border border-neutral-200 shadow-2xs rotate-1 text-xs">
              <span className="block text-neutral-400 font-bold uppercase tracking-wider text-[10px]">Técnico (Copa 2026)</span>
              <span className="text-neutral-800 font-extrabold text-sm">{team.manager}</span>
            </div>
          </div>

          {/* FATOS CULTURAIS & CURIOSIDADES (Estilo post-it colado com rotação) */}
          <div className="w-full md:w-[320px] flex flex-col gap-4">
            {/* Card de Curiosidade */}
            <div className="bg-amber-100/90 backdrop-blur-2xs p-4 rounded-lg shadow-sm border border-amber-200/50 rotate-[2deg] relative">
              {/* Alfinete vermelho tátil */}
              <div className="absolute top-[-8px] left-[50%] transform translate-x-[-50%] w-3 h-3 bg-red-600 rounded-full border border-red-800 shadow-xs" />
              <h3 className="font-display text-xs font-black uppercase tracking-wide text-amber-950 mb-1 border-b border-amber-950/10 pb-0.5">
                💡 Curiosidade Cultural
              </h3>
              <p className="text-[11px] text-amber-950 leading-relaxed font-sans font-medium">
                {team.culture.curiosity}
              </p>
            </div>

            {/* Card de Gastronomia */}
            <div className="bg-emerald-50/90 backdrop-blur-2xs p-4 rounded-lg shadow-sm border border-emerald-100/50 rotate-[-1.5deg] relative">
              <h3 className="font-display text-xs font-black uppercase tracking-wide text-emerald-950 mb-1 border-b border-emerald-950/10 pb-0.5">
                🍲 Culinária Típica
              </h3>
              <p className="text-[11px] text-emerald-950 leading-relaxed font-sans font-medium">
                {team.culture.traditional_food}
              </p>
            </div>
          </div>
        </div>

        {/* RESUMO HISTÓRICO (Estilo bloco de papel Kraft rasgado) */}
        <div className="px-6 md:px-10 pl-14 md:pl-16 mb-6">
          <div className="bg-kraft-cardboard p-5 rounded-2xl shadow-md text-amber-950/90 border border-amber-900/10 relative overflow-hidden rotate-[0.5deg]">
            {/* overlay de textura no post-it */}
            <div className="absolute inset-0 opacity-[0.03] bg-repeat pointer-events-none" style={{ backgroundImage: "url('/images/textures/kraft-paper.png')" }} />
            
            <h3 className="font-display text-sm font-extrabold uppercase tracking-wider text-amber-950 mb-2 border-b border-amber-950/10 pb-1">
              📜 Contexto Histórico em Copas
            </h3>
            <p className="text-xs leading-relaxed font-medium">
              {team.history.summary}
            </p>
            <p className="text-xs leading-relaxed mt-2 font-bold italic">
              {team.history.milestones}
            </p>
          </div>
        </div>

        {/* DIVISOR RASGADO DE SVG */}
        <TornPaper color="#ffffff" position="top" className="my-2 shadow-2xs" />

        {/* ÁLBUM DE FIGURINHAS (GRADE DE JOGADORES) */}
        <div className="bg-white p-6 md:p-8 pl-14 md:pl-16 flex-1 flex flex-col justify-start">
          <h2 className="font-display font-extrabold text-neutral-800 text-lg md:text-xl mb-6 text-center border-b border-neutral-100 pb-3 uppercase tracking-wide">
            Figurinhas de Jogadores Piloto
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center justify-items-center">
            {team.players.map((player, idx) => {
              // Rotações personalizadas alternadas para cada jogador
              const rotations = [-2, 3, -1, 2, -3, 1];
              const initialRotation = rotations[idx % rotations.length];
              
              return (
                <PaperCard 
                  key={player.id} 
                  player={player} 
                  initialRotation={initialRotation}
                  themeColor={team.theme_color}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Assinatura do Scrapbook no rodapé da página */}
      <footer className="w-full max-w-4xl text-center py-6 text-[10px] text-amber-950/60 font-semibold tracking-wider uppercase z-20">
        © 2026 Almanaque da Copa - Feito à mão digitalmente
      </footer>
    </main>
  );
}
