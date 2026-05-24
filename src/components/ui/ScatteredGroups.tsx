"use client";

import React, { useEffect, useState } from 'react';
import { GroupSheet } from './GroupSheet';
import { Team } from '@/types/worldcup';

interface ScatteredGroupsProps {
  groups: Record<string, Team[]>;
  sortedGroups: string[];
}

export function ScatteredGroups({ groups, sortedGroups }: ScatteredGroupsProps) {
  const [isMobile, setIsMobile] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!mounted) {
    // Avoid hydration mismatch by rendering a safe default
    return <div className="w-full max-w-6xl mx-auto flex flex-col items-center opacity-0"></div>;
  }

  return (
    <div className={`w-full max-w-6xl mx-auto ${isMobile ? 'flex flex-col gap-6 items-center' : 'flex flex-wrap justify-center gap-12 mt-10 pb-20'}`}>
      {sortedGroups.map((groupName, index) => (
        <GroupSheet 
          key={groupName} 
          groupName={groupName} 
          teams={groups[groupName]} 
          isMobile={isMobile}
          index={index}
        />
      ))}
    </div>
  );
}
