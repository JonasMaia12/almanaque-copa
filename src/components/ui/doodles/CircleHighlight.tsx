import { cyrb53, seededRandom } from "@/lib/doodle-seed";

export function CircleHighlight({ seed, children, className = "", color = "var(--color-caneta-vermelha)" }: { seed: string, children: React.ReactNode, className?: string, color?: string }) {
  const hash = cyrb53(seed);
  const rotate = seededRandom(hash, -10, 10);
  const scale = seededRandom(hash+1, 0.95, 1.05);

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <svg viewBox="0 0 100 100" className="absolute top-1/2 left-1/2 w-[140%] h-[140%] -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none" style={{ transform: `translate(-50%, -50%) rotate(${rotate}deg) scale(${scale})`, stroke: color, fill: "none", strokeWidth: 4, strokeLinecap: "round" }}>
        <path d="M 50,5 C 80,10 95,40 90,70 C 80,95 40,95 15,75 C -5,50 15,15 45,8 C 60,5 70,8 75,12" />
      </svg>
    </span>
  );
}
