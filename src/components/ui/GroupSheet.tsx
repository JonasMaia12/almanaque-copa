"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
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
  "Grupo I": "#fae8ff",
  "Grupo J": "#f0fdf4",
  "Grupo K": "#ecfeff",
  "Grupo L": "#fff1f2",
};

export function GroupSheet({ groupName, teams, isMobile, index }: GroupSheetProps) {
  const [hoveredTeamId, setHoveredTeamId] = React.useState<string | null>(null);
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
      className="relative w-[90%] max-w-sm sm:w-64 md:w-72 p-4 md:p-6 rounded-sm mb-4 md:mb-0 opacity-100 transition-all duration-300"
      style={{ 
        backgroundColor: bgColor,
        color: isDark ? "#ffffff" : "#1a1a1a",
        boxShadow: "var(--shadow-scrapbook)"
      }}
      initial={{ 
        rotate: baseRotation, 
        x: xOffset, 
        y: isMobile ? -80 : -120,
        opacity: 0,
        scale: 0.92,
      }}
      animate={{ 
        rotate: baseRotation, 
        x: xOffset, 
        y: yOffset,
        opacity: 1,
        scale: 1,
      }}
      whileHover={{ 
        scale: 1.04, 
        rotate: isMobile ? baseRotation : 0, 
        zIndex: 50, 
        boxShadow: "var(--shadow-scrapbook-lifted)" 
      }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 22,
        delay: index * 0.07,
      }}
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
              className="relative transition-opacity duration-300 opacity-100"
              style={{ transform: `rotate(${tRotate}deg) scale(${tScale}) translate(${tx}px, ${ty}px)` }}
              onMouseEnter={() => setHoveredTeamId(team.id)}
              onMouseLeave={() => setHoveredTeamId(null)}
            >
              <AnimatePresence>
                {hoveredTeamId === team.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, y: 0, scale: 1, rotate: -2 }}
                    exit={{ opacity: 0, y: 8, scale: 0.8, rotate: -5 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                    className="absolute z-50 -top-16 left-1/2 -translate-x-1/2 bg-amber-100 text-neutral-800 text-xs font-handwritten rounded-sm shadow-md border border-amber-200/50 p-2 whitespace-nowrap pointer-events-none"
                  >
                    <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-amber-100"></div>
                    <span className="font-bold">{team.name}</span>
                    <span className="text-[9px] text-neutral-500 block leading-none mt-0.5">{groupName}</span>
                  </motion.div>
                )}
              </AnimatePresence>
              <Link href={`/team/${team.id}`}>
                <Sticker
                  src={team.badge_image}
                  alt={`Escudo da seleção ${team.name}`}
                  width={80}
                  height={80}
                  layoutId={`shield-${team.id}`}
                />
              </Link>
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
