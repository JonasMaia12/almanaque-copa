import React from 'react';

interface TornPaperProps {
  color?: string;
  position?: 'top' | 'bottom';
  className?: string;
}

export const TornPaper: React.FC<TornPaperProps> = ({
  color = '#ffffff',
  position = 'top',
  className = '',
}) => {
  // SVG Path simulando uma rasgadura de papel orgânica e irregular
  const path = "M0,0 L0,10 Q25,24 50,12 T100,15 T150,8 T200,22 T250,14 T300,10 T350,25 T400,12 T450,18 T500,6 T550,15 T600,11 T650,22 T700,14 T750,10 T800,24 T850,13 T900,17 T950,9 T1000,10 L1000,0 Z";

  return (
    <div 
      className={`relative w-full overflow-hidden leading-[0] z-20 pointer-events-none ${className} ${
        position === 'top' ? 'rotate-180' : ''
      }`}
      style={{ height: '35px' }}
      data-testid="torn-paper-container"
    >
      <svg
        viewBox="0 0 1000 30"
        className="relative block w-full h-full"
        preserveAspectRatio="none"
        data-testid="torn-paper-svg"
      >
        <path
          d={path}
          style={{ fill: color }}
        />
      </svg>
    </div>
  );
};
