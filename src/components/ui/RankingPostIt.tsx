import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { TapeStrip } from './doodles/TapeStrip';

export interface RankingItem {
  id: string;
  name: string;
  subtitle?: string;
  value: number | string;
  valueLabel?: string;
  extraElement?: ReactNode;
}

interface RankingPostItProps {
  title: string;
  icon: ReactNode;
  items: RankingItem[];
  bgColorClass: string; // e.g. "bg-[#fee2e2]/95 border-[#fee2e2]/40"
  textColorClass: string; // e.g. "text-red-800"
  tapeColor?: 'washi' | 'transparent';
  customRotation: number;
  clipPathClass: string;
  tapeSeed: string;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (rot: number) => ({
    opacity: 1,
    y: 0,
    rotate: rot,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 10
    }
  })
};

export function RankingPostIt({
  title,
  icon,
  items,
  bgColorClass,
  textColorClass,
  tapeColor = 'transparent',
  customRotation,
  clipPathClass,
  tapeSeed
}: RankingPostItProps) {
  return (
    <motion.div 
      className="relative w-full max-w-sm filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.15)] hover:drop-shadow-[0_15px_20px_rgba(0,0,0,0.3)] transition-all duration-300"
      variants={itemVariants}
      custom={customRotation}
      whileHover={{ scale: 1.03, rotate: 0, zIndex: 30 }}
    >
      <TapeStrip seed={tapeSeed} color={tapeColor} className="-top-3.5 left-1/2 -translate-x-1/2 z-10" />
      <div 
        className={`w-full p-5 pt-7 pb-6 border relative flex flex-col ${bgColorClass}`}
        style={{ clipPath: clipPathClass }}
      >
        <h3 className="font-marker text-lg text-neutral-800 uppercase border-b border-dashed border-neutral-800/20 pb-2 mb-3 tracking-wider flex items-center gap-2">
          {icon} {title}
        </h3>
        <ul className="flex flex-col gap-2 font-handwritten text-xl text-neutral-800">
          {items.map((item, idx) => (
            <li key={item.id} className="flex justify-between items-center border-b border-neutral-800/5 pb-1">
              <div className="flex flex-col items-start leading-none">
                <div className="flex items-center gap-1.5">
                  <span className="font-sans text-xs inline-flex items-center justify-center w-4 h-4 bg-neutral-900 text-white rounded-full shrink-0">
                    {idx + 1}
                  </span>
                  <span className="font-bold text-neutral-900 leading-none">{item.name}</span>
                </div>
                {item.subtitle && (
                  <span className="text-xs text-neutral-500 font-marker uppercase ml-5 mt-1">{item.subtitle}</span>
                )}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <span className={`font-bold text-2xl font-sans shrink-0 ${textColorClass}`}>
                  {item.value} {item.valueLabel && <span className="text-sm font-handwritten font-normal">{item.valueLabel}</span>}
                </span>
                {item.extraElement}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
