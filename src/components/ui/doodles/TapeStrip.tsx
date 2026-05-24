import { cyrb53, seededRandom } from "@/lib/doodle-seed";

interface TapeStripProps {
  seed: string;
  color?: "transparent" | "washi" | "black";
  className?: string;
}

export function TapeStrip({ seed, color = "transparent", className = "" }: TapeStripProps) {
  const hash = cyrb53(seed);
  const angle = seededRandom(hash, -25, 25);
  const width = seededRandom(hash + 1, 60, 100);
  
  const colors = {
    transparent: "rgba(255, 255, 255, 0.4)",
    washi: "rgba(255, 182, 193, 0.7)",
    black: "rgba(30, 30, 30, 0.9)"
  };

  return (
    <div 
      className={`absolute z-10 ${className}`}
      style={{ 
        transform: `rotate(${angle}deg)`,
        width: `${width}px`,
        height: '22px',
        backgroundColor: colors[color],
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        opacity: 0.85,
        clipPath: 'polygon(3% 0, 97% 2%, 99% 100%, 1% 96%)'
      }}
    >
      <div className="w-full h-full opacity-30" style={{ backgroundImage: 'linear-gradient(90deg, transparent 50%, rgba(255,255,255,0.2) 50%)', backgroundSize: '4px 100%' }}></div>
    </div>
  );
}
