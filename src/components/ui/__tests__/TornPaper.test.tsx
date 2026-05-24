import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TornPaper } from '../TornPaper';
import React from 'react';

describe('TornPaper Component', () => {
  it('renders SVG successfully', () => {
    render(<TornPaper />);
    
    const svg = screen.getByTestId('torn-paper-svg');
    expect(svg).toBeInTheDocument();
  });

  it('applies custom background fill color to SVG path', () => {
    render(<TornPaper color="#ffefd5" />);
    
    const path = screen.getByTestId('torn-paper-svg').querySelector('path');
    expect(path).toBeInTheDocument();
    expect(path).toHaveStyle({ fill: '#ffefd5' });
  });

  it('applies rotate class only when position is top', () => {
    const { rerender } = render(<TornPaper position="bottom" />);
    
    let container = screen.getByTestId('torn-paper-container');
    expect(container).not.toHaveClass('rotate-180');

    rerender(<TornPaper position="top" />);
    container = screen.getByTestId('torn-paper-container');
    expect(container).toHaveClass('rotate-180');
  });
});
