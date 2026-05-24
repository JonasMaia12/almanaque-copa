"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { cyrb53, seededRandom } from '@/lib/doodle-seed';
import { Stamp } from './doodles/Stamp';
import { TapeStrip } from './doodles/TapeStrip';
import { Sticker } from './Sticker';
import { Team } from '@/types/worldcup';

interface GroupSheetProps {
  groupName: string;
  teams: Team[];
  isMobile: boolean;
  index: number;
}

const GROUP_COLORS: Record<string, string> = {
  "Grupo A": "#fef3c7",
  "Grupo B": "#fee2e2",
  "Grupo C": "#dbeafe",
  "Grupo D": "#d1fae5",
  "Grupo E": "#ffedd5",
  "Grupo F": "#ede9fe",
  "Grupo G": "#1a1a1a",
  "Grupo H": "#fdf6e3",
};

export function GroupSheet({ groupName, teams, isMobile, index }: GroupSheetProps) {
  const router = useRouter();
  const hash = cyrb53(groupName);
  const bgColor = GROUP_COLORS[groupName] || "#ffffff";
  const isDark = bgColor === "#1a1a1a";
  
  // Random base rotation for desktop
  const baseRotation = isMobile ? seededRandom(hash, -2, 2) : seededRandom(hash, -6, 6);
  // Random offsets for desktop to look scattered
  const xOffset = isMobile ? 0 : seededRandom(hash + 1, -40, 40);
  const yOffset = isMobile ? 0 : seededRandom(hash + 2, -20, 20);

  return (
    <motion.div
      className={`relative w-[90%] max-w-sm sm:w-64 md:w-72 p-4 md:p-6 rounded-sm mb-4 md:mb-0`}
      style={{ 
        backgroundColor: bgColor,
        color: isDark ? "#ffffff" : "#1a1a1a",
        boxShadow: "var(--shadow-scrapbook)"
      }}
      initial={{ rotate: baseRotation, x: xOffset, y: yOffset }}
      whileHover={{ 
        scale: 1.04, 
        rotate: isMobile ? baseRotation : 0, 
        zIndex: 50, 
        boxShadow: "var(--shadow-scrapbook-lifted)" 
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <TapeStrip seed={groupName} className="top-[-10px] left-1/2 -translate-x-1/2" color={isDark ? "washi" : "transparent"} />
      
      <div className="mb-6 mt-2 flex justify-center">
        <Stamp text={groupName} seed={groupName} color={isDark ? "punk-red" : "caneta-preta"} />
      </div>

      <div className="grid grid-cols-2 gap-4 place-items-center">
        {teams.map((team) => {
          const teamHash = cyrb53(team.id);
          const tRotate = seededRandom(teamHash, -12, 12);
          const tScale = seededRandom(teamHash + 1, 0.9, 1.1);
          const tx = seededRandom(teamHash + 2, -5, 5);
          const ty = seededRandom(teamHash + 3, -5, 5);

          return (
            <div 
              key={team.id}
              className="relative"
              style={{ transform: `rotate(${tRotate}deg) scale(${tScale}) translate(${tx}px, ${ty}px)` }}
            >
              <Sticker
                src={team.badge_image}
                alt={`Escudo da seleção ${team.name}`}
                width={80}
                height={80}
                onClick={() => router.push(`/team/${team.id}`)}
              />
              <span className={`absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs font-handwritten whitespace-nowrap ${isDark ? 'text-white' : 'text-neutral-800'}`}>
                {team.name}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
