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

  it('is accessible via keyboard: has role="button" and tabIndex=0', () => {
    render(<PaperCard player={mockPlayer} />);
    
    const wrapper = screen.getByTestId('papercard-3d-wrapper');
    expect(wrapper).toHaveAttribute('role', 'button');
    expect(wrapper).toHaveAttribute('tabindex', '0');
  });

  it('has descriptive aria-label that updates after flip', () => {
    render(<PaperCard player={mockPlayer} />);
    
    const wrapper = screen.getByTestId('papercard-3d-wrapper');
    
    // Estado inicial: label convida a ver as estatísticas
    expect(wrapper).toHaveAttribute(
      'aria-label',
      'Ver estatísticas de Jogador de Teste'
    );
    
    // Após o clique (flip): label convida a voltar
    fireEvent.click(wrapper);
    expect(wrapper).toHaveAttribute(
      'aria-label',
      'Voltar para a frente do card de Jogador de Teste'
    );
    
    // Ao clicar novamente: volta ao label original
    fireEvent.click(wrapper);
    expect(wrapper).toHaveAttribute(
      'aria-label',
      'Ver estatísticas de Jogador de Teste'
    );
  });

  it('toggles flip state on click', () => {
    render(<PaperCard player={mockPlayer} />);
    
    const wrapper = screen.getByTestId('papercard-3d-wrapper');
    const frontSide = screen.getByTestId('card-front');
    const backSide = screen.getByTestId('card-back');
    
    // Estado inicial: frente visível (aria-hidden=false), verso oculto (aria-hidden=true)
    expect(frontSide).toHaveAttribute('aria-hidden', 'false');
    expect(backSide).toHaveAttribute('aria-hidden', 'true');
    
    // Após clique: estados invertidos
    fireEvent.click(wrapper);
    expect(frontSide).toHaveAttribute('aria-hidden', 'true');
    expect(backSide).toHaveAttribute('aria-hidden', 'false');
  });

  it('triggers flip on Enter key press', () => {
    render(<PaperCard player={mockPlayer} />);
    
    const wrapper = screen.getByTestId('papercard-3d-wrapper');
    
    expect(wrapper).toHaveAttribute('aria-label', 'Ver estatísticas de Jogador de Teste');
    
    fireEvent.keyDown(wrapper, { key: 'Enter' });
    expect(wrapper).toHaveAttribute('aria-label', 'Voltar para a frente do card de Jogador de Teste');
  });
});
