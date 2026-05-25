import React from 'react';
import Image from 'next/image';

interface TrophyRowProps {
  count: number;
  className?: string;
}

export function TrophyRow({ count, className = "" }: TrophyRowProps) {
  if (!count || count <= 0) return null;

  return (
    <div className={`flex gap-1.5 mt-2 bg-neutral-900/80 px-3 py-1.5 rounded border border-neutral-800 shadow-sm inline-flex items-center ${className}`}>
      <span className="text-[10px] font-marker font-bold uppercase tracking-wider text-amber-500 mr-2">Títulos</span>
      <div className="flex gap-1" aria-label={`${count} título${count > 1 ? 's' : ''} mundiais`}>
        {Array.from({ length: count }).map((_, i) => (
          <div 
            key={i} 
            className="animate-bounce" 
            style={{ animationDelay: `${i * 150}ms` }}
            aria-hidden="true"
          >
            <Image 
              src="/images/trophy.png" 
              alt="Troféu" 
              width={24} 
              height={36} 
              className="drop-shadow-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
