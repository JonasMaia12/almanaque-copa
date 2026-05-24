import { cyrb53, seededRandom } from "@/lib/doodle-seed";

export function Stamp({ text, seed, color = "punk-red", className = "" }: { text: string, seed: string, color?: "punk-red"|"caneta-azul"|"caneta-preta", className?: string }) {
  const hash = cyrb53(seed);
  const rotate = seededRandom(hash, -8, 8);
  const colorMap = {
    "punk-red": "var(--color-punk-red)",
    "caneta-azul": "var(--color-caneta-azul)",
    "caneta-preta": "var(--color-caneta-preta)",
  };
  const hexColor = colorMap[color];

  // We use CSS drop-shadow instead of SVG mask for better cross browser consistency on text
  return (
    <div 
      className={`inline-block font-marker tracking-[0.2em] font-bold uppercase border-4 px-3 py-1 opacity-80 ${className}`}
      style={{ 
        transform: `rotate(${rotate}deg)`, 
        color: hexColor, 
        borderColor: hexColor,
        borderRadius: '4px',
      }}
    >
      {text}
    </div>
  );
}
