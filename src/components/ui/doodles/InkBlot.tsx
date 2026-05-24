import { cyrb53, seededRandom } from "@/lib/doodle-seed";

export function InkBlot({ seed, type = "coffee", className = "" }: { seed: string, type?: "coffee"|"ink", className?: string }) {
  const hash = cyrb53(seed);
  const color = type === "coffee" ? "#4a2c00" : "#000000";
  const rotate = seededRandom(hash, 0, 360);
  const scale = seededRandom(hash+1, 0.8, 1.5);
  const opacity = type === "coffee" ? seededRandom(hash+2, 0.04, 0.08) : seededRandom(hash+2, 0.05, 0.15);

  return (
    <svg viewBox="0 0 100 100" className={`absolute pointer-events-none ${className}`} style={{ transform: `rotate(${rotate}deg) scale(${scale})`, opacity, fill: color, filter: "blur(2px)" }}>
      <path d={`M 50,20 C 70,15 85,30 80,50 C 75,80 30,90 20,60 C 10,30 25,25 50,20 Z`} />
      <circle cx={seededRandom(hash+3, 10, 90)} cy={seededRandom(hash+4, 10, 90)} r={seededRandom(hash+5, 2, 8)} />
      <circle cx={seededRandom(hash+6, 10, 90)} cy={seededRandom(hash+7, 10, 90)} r={seededRandom(hash+8, 1, 5)} />
    </svg>
  );
}
