import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PaperCard } from '../PaperCard';
import { Player } from '@/types/worldcup';
import React from 'react';

const mockPlayer: Player = {
  id: 'test-player',
  name: 'Jogador de Teste',
  jersey_number: 10,
  position: 'Meio-campista',
  age: 28,
  current_club: 'Clube Fictício',
  illustration_url: '/test-player.png',
  short_bio: 'Esta é uma biografia curta de teste.',
  stats: {
    career_goals: 120,
    world_cups_played: 2,
    world_cup_goals: 4,
    historical_fact: 'Ele marcou o gol mais rápido das eliminatórias de teste.'
  }
};

describe('PaperCard Component', () => {
  it('renders player details on the front of the card', () => {
    render(<PaperCard player={mockPlayer} themeColor="#ff0000" />);
    
    // Testa elementos da frente
    expect(screen.getByText('Jogador de Teste')).toBeInTheDocument();
    expect(screen.getByText('Meio-campista')).toBeInTheDocument();
    expect(screen.getByText('Clube Fictício • 28 anos')).toBeInTheDocument();
    expect(screen.getAllByText('10')[0]).toBeInTheDocument();
  });

  it('renders stats and short bio on the back of the card', () => {
    render(<PaperCard player={mockPlayer} />);
    
    // Testa elementos do verso
    expect(screen.getByText('"Esta é uma biografia curta de teste."')).toBeInTheDocument();
    expect(screen.getByText('120')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('Ele marcou o gol mais rápido das eliminatórias de teste.')).toBeInTheDocument();
  });

  it('has correct 3D perspective wrapper and motion container elements', () => {
    render(<PaperCard player={mockPlayer} />);
    
    const wrapper = screen.getByTestId('papercard-3d-wrapper');
    const motionContainer = screen.getByTestId('papercard-motion-container');
    
    expect(wrapper).toHaveClass('perspective-1000');
    expect(motionContainer).toHaveClass('transform-style-3d');
  });
});
