/**
 * Gera um seed determinístico a partir de uma string.
 * Baseado no algoritmo cyrb53.
 */
export function cyrb53(str: string, seed = 0): number {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

/**
 * Retorna um número pseudoaleatório entre min e max, com base numa seed numérica.
 * @param seed - Número inteiro (obtido do cyrb53 por exemplo)
 * @param min - Valor mínimo
 * @param max - Valor máximo
 */
export function seededRandom(seed: number, min: number, max: number): number {
  // Uma função simples LCG (Linear Congruential Generator)
  const x = Math.sin(seed) * 10000;
  const rand = x - Math.floor(x);
  return min + rand * (max - min);
}
