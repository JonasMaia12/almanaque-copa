"use client";

import React from 'react';
import { cyrb53, seededRandom } from '@/lib/doodle-seed';

interface IconProps {
  seed?: string;
  className?: string;
  color?: string;
  size?: number;
}

// 1. DoodleStats: Gráfico de barras rabiscado
export function DoodleStats({ seed = "stats", className = "", color = "currentColor", size = 24 }: IconProps) {
  const hash = cyrb53(seed);
  const rot = seededRandom(hash, -3, 3);
  return (
    <svg 
      viewBox="0 0 24 24" 
      width={size} 
      height={size} 
      className={`inline-block select-none ${className}`}
      style={{ transform: `rotate(${rot}deg)`, stroke: color, fill: "none", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }}
    >
      {/* Linhas de eixo */}
      <path d="M4,4 L4,20 L20,20" />
      {/* Barra 1 */}
      <path d="M7,20 L7,13 C7,13 7.5,12 8,12 C8.5,12 9,13 9,13 L9,20" />
      {/* Barra 2 */}
      <path d="M11,20 L11,9 C11,9 11.5,8 12,8 C12.5,8 13,9 13,9 L13,20" />
      {/* Barra 3 */}
      <path d="M15,20 L15,6 C15,6 15.5,5 16,5 C16.5,5 17,6 17,6 L17,20" />
    </svg>
  );
}

// 2. DoodleDie: Dado rabiscado
export function DoodleDie({ seed = "die", className = "", color = "currentColor", size = 24 }: IconProps) {
  const hash = cyrb53(seed);
  const rot = seededRandom(hash, -10, 10);
  return (
    <svg 
      viewBox="0 0 24 24" 
      width={size} 
      height={size} 
      className={`inline-block select-none ${className}`}
      style={{ transform: `rotate(${rot}deg)`, stroke: color, fill: "none", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }}
    >
      {/* Cubo isometrico desenhado à mão */}
      {/* Face frontal/lateral */}
      <path d="M6,8 L14,5 L20,9 L12,12 Z" />
      <path d="M6,8 L6,16 L12,20 L12,12" />
      <path d="M20,9 L20,17 L12,20" />
      {/* Pontos nas faces */}
      {/* Ponto superior */}
      <circle cx="13" cy="8.5" r="1" fill={color} />
      {/* Pontos frontais */}
      <circle cx="9" cy="12" r="0.75" fill={color} />
      <circle cx="9" cy="16" r="0.75" fill={color} />
      {/* Pontos laterais */}
      <circle cx="16" cy="12" r="0.75" fill={color} />
      <circle cx="16" cy="15" r="0.75" fill={color} />
    </svg>
  );
}

// 3. DoodlePencil: Lápis fofinho rabiscado
export function DoodlePencil({ seed = "pencil", className = "", color = "currentColor", size = 24 }: IconProps) {
  const hash = cyrb53(seed);
  const rot = seededRandom(hash, -5, 5);
  return (
    <svg 
      viewBox="0 0 24 24" 
      width={size} 
      height={size} 
      className={`inline-block select-none ${className}`}
      style={{ transform: `rotate(${rot}deg)`, stroke: color, fill: "none", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }}
    >
      {/* Corpo do lápis */}
      <path d="M6,18 L16,8 L18,10 L8,20 Z" />
      {/* Ponta */}
      <path d="M6,18 L3,21 L5,19 Z" />
      <path d="M3,21 L4,20" />
      {/* Borracha */}
      <path d="M16,8 L19,5 C19.5,4.5 20.5,4.5 21,5 C21.5,5.5 21.5,6.5 21,7 L18,10" />
      {/* Detalhe corpo */}
      <path d="M9.5,11.5 L12.5,14.5" />
    </svg>
  );
}

// 4. DoodleTrophy: Taça/Troféu rústico
export function DoodleTrophy({ seed = "trophy", className = "", color = "currentColor", size = 24 }: IconProps) {
  const hash = cyrb53(seed);
  const rot = seededRandom(hash, -4, 4);
  return (
    <svg 
      viewBox="0 0 24 24" 
      width={size} 
      height={size} 
      className={`inline-block select-none ${className}`}
      style={{ transform: `rotate(${rot}deg)`, stroke: color, fill: "none", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }}
    >
      {/* Copo principal */}
      <path d="M6,5 C6,10 7,14 12,14 C17,14 18,10 18,5 Z" />
      {/* Alça esquerda */}
      <path d="M6,7 C4,7 4,10 6,11" />
      {/* Alça direita */}
      <path d="M18,7 C20,7 20,10 18,11" />
      {/* Haste e Base */}
      <path d="M12,14 L12,19" />
      <path d="M8,20 C10,19 14,19 16,20" />
      {/* Detalhe da borda superior */}
      <path d="M5.5,5 C10,4.5 14,4.5 18.5,5" />
    </svg>
  );
}

// 5. DoodleStar: Estrela desenhada e imperfeita
export function DoodleStar({ seed = "star", className = "", color = "currentColor", size = 24 }: IconProps) {
  const hash = cyrb53(seed);
  const rot = seededRandom(hash, -15, 15);
  return (
    <svg 
      viewBox="0 0 24 24" 
      width={size} 
      height={size} 
      className={`inline-block select-none ${className}`}
      style={{ transform: `rotate(${rot}deg)`, stroke: color, fill: "none", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }}
    >
      {/* Desenho contínuo de estrela rabiscada de 5 pontas */}
      <path d="M12,2 L15,9 L22,9 L17,14 L19,21 L12,17 L5,21 L7,14 L2,9 L9,9 Z" />
    </svg>
  );
}

// 6. DoodleBall: Bola de futebol esquematizada
export function DoodleBall({ seed = "ball", className = "", color = "currentColor", size = 24 }: IconProps) {
  const hash = cyrb53(seed);
  const rot = seededRandom(hash, -45, 45);
  return (
    <svg 
      viewBox="0 0 24 24" 
      width={size} 
      height={size} 
      className={`inline-block select-none ${className}`}
      style={{ transform: `rotate(${rot}deg)`, stroke: color, fill: "none", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }}
    >
      {/* Círculo externo */}
      <circle cx="12" cy="12" r="9.5" />
      {/* Gomos centrais em hexágono rabiscado */}
      <path d="M12,9 L15,11 L14,14 L10,14 L9,11 Z" />
      {/* Linhas externas para os gomos */}
      <path d="M12,9 L12,4.5" />
      <path d="M15,11 L19,10" />
      <path d="M14,14 L17,17.5" />
      <path d="M10,14 L7,17.5" />
      <path d="M9,11 L5,10" />
    </svg>
  );
}

// 7. DoodleFire: Foginho rabiscado
export function DoodleFire({ seed = "fire", className = "", color = "currentColor", size = 24 }: IconProps) {
  const hash = cyrb53(seed);
  const rot = seededRandom(hash, -6, 6);
  return (
    <svg 
      viewBox="0 0 24 24" 
      width={size} 
      height={size} 
      className={`inline-block select-none ${className}`}
      style={{ transform: `rotate(${rot}deg)`, stroke: color, fill: "none", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }}
    >
      {/* Labareda de fogo com linhas duplas e orgânicas */}
      <path d="M12,22 C16,22 19,19 19,14 C19,10.5 16,8 15,5 C14,8 13,9.5 12,9 C11,8.5 10,7 9,5 C8.5,8 5,10.5 5,14 C5,19 8,22 12,22 Z" />
      <path d="M12,18 C14,18 15.5,16.5 15.5,14 C15.5,12 13.5,11 12,13 C10.5,11 10,10.5 9,13 C8,15.5 10,18 12,18 Z" fill={color} opacity="0.2" />
    </svg>
  );
}

// 8. DoodleGlobe: Globo rabiscado
export function DoodleGlobe({ seed = "globe", className = "", color = "currentColor", size = 24 }: IconProps) {
  const hash = cyrb53(seed);
  const rot = seededRandom(hash, -5, 5);
  return (
    <svg 
      viewBox="0 0 24 24" 
      width={size} 
      height={size} 
      className={`inline-block select-none ${className}`}
      style={{ transform: `rotate(${rot}deg)`, stroke: color, fill: "none", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }}
    >
      <circle cx="12" cy="12" r="9.5" />
      {/* Equador */}
      <path d="M2.5,12 Q12,14 21.5,12" />
      {/* Meridianos */}
      <path d="M12,2.5 Q15,12 12,21.5" />
      <path d="M12,2.5 Q9,12 12,21.5" />
      {/* Paralelos extras */}
      <path d="M5,7 Q12,8.5 19,7" />
      <path d="M5,17 Q12,15.5 19,17" />
    </svg>
  );
}

// 9. DoodleBackArrow: Seta de voltar estilosa e rabiscada
export function DoodleBackArrow({ seed = "back", className = "", color = "currentColor", size = 24 }: IconProps) {
  const hash = cyrb53(seed);
  const rot = seededRandom(hash, -5, 5);
  return (
    <svg 
      viewBox="0 0 24 24" 
      width={size} 
      height={size} 
      className={`inline-block select-none ${className}`}
      style={{ transform: `rotate(${rot}deg)`, stroke: color, fill: "none", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" }}
    >
      {/* Seta expressiva com calda curva */}
      <path d="M20,12 C16,12 11,10 7,6 M7,6 L12,4 M7,6 L9,11" />
      {/* Calda secundária rabiscada */}
      <path d="M18,12 C14,14 10,17 4,19" />
    </svg>
  );
}

// 10. DoodleMedal: Medalha rabiscada com fitas
export function DoodleMedal({ seed = "medal", className = "", color = "currentColor", size = 24 }: IconProps) {
  const hash = cyrb53(seed);
  const rot = seededRandom(hash, -8, 8);
  return (
    <svg 
      viewBox="0 0 24 24" 
      width={size} 
      height={size} 
      className={`inline-block select-none ${className}`}
      style={{ transform: `rotate(${rot}deg)`, stroke: color, fill: "none", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }}
    >
      {/* Fitas superiores */}
      <path d="M8,3 L12,10 L16,3" />
      <path d="M10,3 L12,8 L14,3" />
      {/* Medalha redonda */}
      <circle cx="12" cy="13" r="5.5" />
      {/* Detalhe interno da medalha */}
      <circle cx="12" cy="13" r="2.5" fill={color} opacity="0.3" />
      {/* Detalhe fitas penduradas abaixo */}
      <path d="M9.5,17.5 L7,22 L11,20" />
      <path d="M14.5,17.5 L17,22 L13,20" />
    </svg>
  );
}
