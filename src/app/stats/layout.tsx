import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Estatísticas Históricas',
  description: 'Confira os recordes da Copa do Mundo: seleções com mais títulos mundiais, maiores artilheiros de todas as edições, jogadores com mais gols na carreira e mais edições disputadas.',
  openGraph: {
    title: 'Estatísticas Históricas | Almanaque da Copa 2026',
    description: 'Confira os recordes da Copa do Mundo: seleções com mais títulos mundiais, maiores artilheiros de todas as edições, jogadores com mais gols na carreira e mais edições disputadas.',
    url: 'https://almanaque-copa.vercel.app/stats',
  },
};

export default function StatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
