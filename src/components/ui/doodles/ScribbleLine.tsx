import { cyrb53, seededRandom } from "@/lib/doodle-seed";

export function ScribbleLine({ seed, className = "", color = "var(--color-caneta-azul)" }: { seed: string, className?: string, color?: string }) {
  const hash = cyrb53(seed);
  return (
    <svg viewBox="0 0 100 20" preserveAspectRatio="none" className={`w-full h-4 ${className}`} style={{ stroke: color, fill: "none", strokeWidth: 2, strokeLinecap: "round" }}>
      <path d={`M 0,10 Q ${seededRandom(hash, 10, 20)},${seededRandom(hash+1, 0, 5)} 25,10 T 50,10 T 75,10 T 100,10`} />
    </svg>
  );
}
