import { cyrb53, seededRandom } from "@/lib/doodle-seed";

export function HandArrow({ seed, direction = "right", className = "", color = "var(--color-caneta-vermelha)" }: { seed: string, direction?: "left"|"right", className?: string, color?: string }) {
  const hash = cyrb53(seed);
  const flip = direction === "left" ? "scaleX(-1)" : "none";
  const rotate = seededRandom(hash, -10, 10);
  
  return (
    <svg viewBox="0 0 50 30" className={`w-8 h-6 inline-block ${className}`} style={{ transform: `${flip} rotate(${rotate}deg)`, stroke: color, fill: "none", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }}>
      <path d="M5,15 Q25,5 45,15 M35,5 L45,15 L35,25" />
    </svg>
  );
}
