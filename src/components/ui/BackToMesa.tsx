import Link from 'next/link';
import { DoodleBackArrow } from './doodles/DoodleIcons';

interface BackToMesaProps {
  className?: string;
}

export function BackToMesa({ className = "" }: BackToMesaProps) {
  return (
    <div className={`w-full flex justify-start mb-6 z-30 ${className}`}>
      <Link href="/" className="relative inline-block rotate-[-2deg] hover:rotate-0 transition-transform duration-150">
        <div className="bg-amber-50 text-neutral-800 font-marker text-sm px-5 py-2.5 shadow-md border border-amber-200/50 uppercase tracking-wider relative flex items-center gap-2">
          <div className="absolute left-[-4px] top-0 bottom-0 w-[4px] bg-neutral-900/10 [clip-path:polygon(100%_0,0_50%,100%_100%)]" />
          <div className="absolute right-[-4px] top-0 bottom-0 w-[4px] bg-neutral-900/10 [clip-path:polygon(0_0,100%_50%,0_100%)]" />
          <DoodleBackArrow size={18} color="var(--color-caneta-preta)" />
          Voltar para a Mesa
        </div>
      </Link>
    </div>
  );
}
