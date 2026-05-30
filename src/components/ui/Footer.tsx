interface FooterProps {
  className?: string;
}

export function Footer({ className = "" }: FooterProps) {
  return (
    <footer className={`w-full text-center py-8 text-xs text-amber-50/50 font-marker uppercase tracking-wider z-20 ${className}`}>
      © 2026 Almanaque da Copa - Feito à mão digitalmente
    </footer>
  );
}
