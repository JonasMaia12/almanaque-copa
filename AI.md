# ⚽ Almanaque da Copa – Guia Essencial da AI (AI.md)

Este documento é a referência única de verdade para orientações de engenharia e design.

---

## 1. Stack Tecnológica & Engenharia
* **Framework:** Next.js 16+ (App Router) com **SSG (Static Site Generation)** para carregamento instantâneo.
* **Estilização:** Tailwind CSS v4 com tokens `@theme`. **Sem imagens de textura** — texturas são 100% CSS puro (SVG inline, feTurbulence e gradientes).
* **Animações:** Framer Motion para efeitos físicos orgânicos (spring, hover lift, rotatividade).
* **Banco de Dados:** JSON local em `/src/data/worldcup.json`.
* **Qualidade:** Vitest + Testing Library para unitários, Playwright para E2E.

---

## 2. Conceito de Design & Scrapbook
O projeto imita um caderno físico feito à mão, com elementos orgânicos, desalinhados e inclinados (-3° a +3°).
* **Fundos (CSS Puro):** Mesa de corte militar verde escuro (`--color-mesa`), capa do caderno kraft (`--color-kraft`), páginas internas pautadas (`--color-papel`).
* **Cores de Caneta:** Azul (`--color-caneta-azul`), Vermelho (`--color-caneta-vermelha`), e Preto (`--color-caneta-preta`).
* **Fontes:** `Permanent Marker` (títulos), `Caveat` (texto manuscrito), `Kalam` (números e camisas).
* **Doodles Determinísticos:** Todos os cálculos aleatórios para rotações, offset ou manchas de café (`<InkBlot />`, `<TapeStrip />`, etc.) devem usar IDs como seeds determinísticas para evitar *Hydration Mismatch* no Next.js.

---

## 3. Diretrizes de Geração de Imagens (IAs)
Todas as imagens de jogadores e troféus são processadas no script `removeBg.js` (Edge Flood Fill) para torná-las adesivos transparentes transparentes.

* **Regra Anti-Copyright:** Nunca use nomes reais de jogadores nos prompts. Descreva suas características físicas, uniformes e poses específicas.
* **Borda de Proteção:** Para o algoritmo de recorte não remover a borda branca do adesivo, inclua a instrução de uma linha preta fina contornando o exterior do adesivo (ex: *"thick solid white outline border surrounding the entire player, and a thin black line outlining the outside edge of the white border"*).
* **Estilo Visual:** Ilustrações planas estilo vetor/pop-art, contornos nítidos a nanquim, texturas de canetinha e cores vibrantes, isolados em fundo branco sólido puro.

---

## 4. Ideias Futuras de Produto
* **Dossiês de Grupo:** Transformar o almanaque de uma galeria informativa para uma experiência editorial mais completa, com páginas/áreas dedicadas aos grupos oficiais da Copa 2026. Cada dossiê poderia reunir adversários, jogos, datas, cidades, histórico de confrontos e uma nota editorial sobre o duelo mais interessante do grupo.
* **Dependência de Dados:** Esta ideia só deve ser implementada quando o dataset cobrir todos os times dos grupos oficiais, não apenas as seleções em destaque do MVP. Sem essa cobertura completa, os dossiês ficariam incompletos e passariam a impressão de conteúdo quebrado.
