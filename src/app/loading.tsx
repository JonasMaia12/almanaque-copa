export default function Loading() {
  return (
    <main className="min-h-screen bg-cutting-mat flex flex-col items-center justify-center p-8">
      <div className="flex flex-col items-center gap-6 w-full max-w-6xl">

        {/* Título skeleton */}
        <div className="flex flex-col items-center gap-3 mb-4">
          <div className="flex gap-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="w-8 h-10 bg-neutral-700/50 animate-pulse rounded-sm"
                style={{ animationDelay: `${i * 60}ms` }}
              />
            ))}
          </div>
          <div className="flex gap-1.5">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="w-6 h-6 bg-neutral-700/30 animate-pulse rounded-sm"
                style={{ animationDelay: `${i * 60}ms` }}
              />
            ))}
          </div>
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="w-12 h-12 bg-neutral-700/50 animate-pulse rounded-sm"
                style={{ animationDelay: `${i * 60}ms` }}
              />
            ))}
          </div>
        </div>

        {/* Cards de grupo skeleton — folhas em branco na mesa */}
        <div className="flex flex-wrap justify-center gap-12 mt-4 pb-20">
          {Array.from({ length: 12 }).map((_, i) => {
            const rotations = [-4, 3, -2, 5, -3, 4, -1, 3, -5, 2, -4, 3];
            const rot = rotations[i] ?? 0;
            return (
              <div
                key={i}
                className="relative w-64 h-48 bg-[#f0e8d0]/80 rounded-sm animate-pulse"
                style={{
                  transform: `rotate(${rot}deg)`,
                  boxShadow: '0 4px 6px rgba(0,0,0,0.2), 0 10px 20px rgba(0,0,0,0.25)',
                  animationDelay: `${i * 80}ms`,
                  backgroundImage:
                    'repeating-linear-gradient(transparent, transparent 27px, rgba(200,216,232,0.5) 27px, rgba(200,216,232,0.5) 28px)',
                }}
              >
                {/* Fita adesiva fake */}
                <div
                  className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-16 h-5"
                  style={{
                    backgroundColor: 'rgba(200, 200, 200, 0.4)',
                    clipPath: 'polygon(3% 0, 97% 2%, 99% 100%, 1% 96%)',
                  }}
                />
                {/* Bloco de carimbo fake */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-7 bg-neutral-400/20 rounded-sm" />
                {/* Escudos fake */}
                <div className="absolute bottom-8 left-6 w-12 h-12 bg-neutral-400/20 rounded-full" />
                <div className="absolute bottom-8 right-6 w-12 h-12 bg-neutral-400/20 rounded-full" />
              </div>
            );
          })}
        </div>

        {/* Texto de loading manuscrito */}
        <p className="font-handwritten text-amber-50/40 text-lg animate-pulse -rotate-1">
          Abrindo o almanaque...
        </p>
      </div>
    </main>
  );
}
