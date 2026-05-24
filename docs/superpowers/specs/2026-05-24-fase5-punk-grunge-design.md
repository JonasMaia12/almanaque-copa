# Spec: Fase 5 - Redesign Punk/Grunge Scrapbook

## Visão Geral
Este documento define as especificações de design e arquitetura para a implementação da **Fase 5** do Almanaque da Copa. O objetivo é transformar o layout atual em um scrapbook punk/grunge totalmente digital e performático, substituindo imagens de fundo por CSS puro e adicionando elementos interativos programáticos.

## 1. Tipografia e Temas
*   **Fontes (Google Fonts)**:
    *   `Permanent Marker`: Títulos principais, times e grupos.
    *   `Caveat`: Textos cursivos, anotações e post-its.
    *   `Kalam`: Dados numéricos, estatísticas e camisa.
*   **Fundo Global (CSS Puro)**: 
    *   Mesa de trabalho: Radial gradient escuro (`#22402a` a `#0f1f10`) com SVG `feTurbulence` (Data URI) injetado para adicionar granulação orgânica sem requisição HTTP extra.
    *   Papel (Cartões e Grupos): Fundos com texturas via `repeating-linear-gradient`.

## 2. Componentes Visuais Programáticos (Doodles)
Para evitar recarregamentos de imagens e manter a estética scrapbook, criaremos componentes React que renderizam SVG inline ou CSS puro baseados em uma *seed* para garantir consistência no SSR (Server-Side Rendering) e no Client.

*   `TapeStrip`: Pedaços de fita adesiva colados nas bordas (SVG).
*   `ScribbleLine`: Traços à caneta ondulados (SVG Path com Beziers).
*   `HandArrow`: Setas manuscritas apontando para detalhes (SVG).
*   `CircleHighlight`: Círculos em formato de esboço marcando números (SVG).
*   `InkBlot`: Manchas de café ou tinta em baixa opacidade (SVG).
*   `Stamp`: Carimbos textuais com estilo stencil/punk (CSS puro).

## 3. Estrutura da Home (Mesa de Trabalho)
Substituição completa do componente `GroupAccordion`.
*   **Componente `ScatteredGroups`**: Um contêiner que abriga os grupos espalhados sobre a mesa.
*   **Layout Mobile**: As folhas de grupo serão empilhadas verticalmente com uma leve sobreposição e pequenas rotações angulares (`-2deg` a `+2deg`), mantendo a navegação por scroll natural.
*   **Folha de Grupo (`GroupSheet`)**: Efeito de `hover` com Framer Motion (o papel levanta sutilmente ganhando sombra e zoom `scale(1.04)`).
*   **Posicionamento dos Adesivos**: Os escudos dos times em cada grupo serão organizados em um grid 2x2 intencionalmente torto e assimétrico para remeter a adesivos colados à mão, com rotações variadas.

## 4. Estrutura da Página de Seleção
A página da seleção irá simular duas folhas abertas de um caderno.
*   **Header**: Adição do componente `TrophyRow`, renderizando a imagem `trophy.webp` em cascata com a animação `animate-bounce` do Tailwind CSS.
*   **PlayerRow (Lista de Jogadores)**:
    *   O layout será alternado: um jogador exibe seu sticker na esquerda e anotações na direita, e o próximo jogador inverte o layout.
    *   **Comportamento Mobile**: A alternância (esquerda/direita) será mantida, mas em um grid mais compacto e lado-a-lado adaptado para visualização em telas pequenas, de forma legível.

## 5. Cuidados de Arquitetura
*   **Determinismo**: Qualquer cálculo "aleatório" para rotação de stickers, posição de fitas adesivas ou manchas deverá obrigatoriamente usar uma função pseudoaleatória baseada em uma chave única (`id` do time, jogador ou índice), para evitar o erro de Hydration Mismatch entre o Node.js/Vercel e o browser.

## Status
*Aprovado e pronto para planejamento de implementação.*
