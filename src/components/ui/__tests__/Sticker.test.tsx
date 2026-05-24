import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Sticker } from '../Sticker';
import React from 'react';

describe('Sticker Component', () => {
  it('renders image with correct src and alt attributes', () => {
    render(<Sticker src="/test-sticker.png" alt="Test Sticker Alt" />);
    
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/test-sticker.png');
    expect(img).toHaveAttribute('alt', 'Test Sticker Alt');
  });

  it('triggers onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Sticker src="/test-sticker.png" alt="Test" onClick={handleClick} />);
    
    const container = screen.getByTestId('sticker-container');
    fireEvent.click(container);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom dimensions correctly via style', () => {
    render(<Sticker src="/test-sticker.png" alt="Test" width={150} height={200} />);
    
    const container = screen.getByTestId('sticker-container');
    expect(container).toHaveStyle({ width: '150px', height: '200px' });
  });
});
