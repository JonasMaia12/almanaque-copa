import { DoodleTrophy } from './doodles/DoodleIcons';

interface TrophyRowProps {
  count: number;
  className?: string;
}

export function TrophyRow({ count, className = "" }: TrophyRowProps) {
  if (!count || count <= 0) return null;

  return (
    <div className={`flex gap-1.5 mt-3 items-center inline-flex select-none ${className}`}>
      <span className="text-xl font-handwritten font-bold text-amber-800 rotate-[-1.5deg] mr-1.5">
        {count}x Campeão Mundial
      </span>
      <div className="flex gap-1" aria-label={`${count} título${count > 1 ? 's' : ''} mundiais`}>
        {Array.from({ length: count }).map((_, i) => (
          <DoodleTrophy 
            key={i}
            size={22} 
            color="#b45309" // Caneta marrom/dourada estilizada
            seed={`trophy-badge-${i}`}
            className="drop-shadow-2xs"
          />
        ))}
      </div>
    </div>
  );
}
