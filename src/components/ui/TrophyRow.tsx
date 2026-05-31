import Image from 'next/image';

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
          <Image 
            key={i}
            src="/images/trophy.png" 
            alt="Troféu" 
            width={20} 
            height={30} 
            className="drop-shadow-md"
            sizes="20px"
            style={{ height: 'auto' }}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}
