# Almanaque da Copa do Mundo – Scrapbook Punk/Grunge
## Guia de Referência Principal (AI.md)

Este documento é a fonte única de verdade (Single Source of Truth) para o desenvolvimento do **Almanaque da Copa**.

---

## 1. Stack Tecnológica & Engenharia

* **Framework:** Next.js 16+ (App Router) com **SSG (Static Site Generation)** para carregamento instantâneo.
* **Estilização:** Tailwind CSS v4 com tokens `@theme`. **Sem imagens externas de textura** — texturas são 100% CSS puro (SVG inline, feTurbulence e gradientes).
* **Animações:** Framer Motion para efeitos físicos orgânicos (spring, hover lift, rotatividade).
* **Banco de Dados:** JSON local em `/src/data/worldcup.json`.
* **Qualidade:** Vitest + Testing Library para unitários, Playwright para E2E. Estrita observância de SOLID, DRY e acessibilidade (A11y ARIA).

---

## 2. Sistema de Design — Punk/Grunge Scrapbook

### 2.1. Conceito Central
Imitação de um caderno scrapbook físico feito à mão:
- Elementos orgânicos, desalinhados e inclinados (-3° a +3°).
- Ausência de componentes de UI padronizados ou retângulos perfeitos.
- Texturas de fundo via CSS puro para mesa de corte verde escuro, papel pautado envelhecido e papel kraft.

### 2.2. Tokens de Design (Cores & Tipografia)

| Token CSS | Hex | Uso |
|---|---|---|
| `--color-mesa` | `#1a2e1a` | Fundo global (mesa militar verde escuro) |
| `--color-kraft` | `#c8a97e` | Capa do caderno (papel kraft) |
| `--color-papel` | `#f0e8d0` | Páginas internas (papel envelhecido) |
| `--color-linha-caderno` | `#c8d8e8` | Linhas horizontais do papel pautado |
| `--color-caneta-azul` | `#1a3a6b` | Anotações principais manuscritas |
| `--color-caneta-vermelha` | `#8b1a1a` | Gols, estatísticas, marcações fortes |
| `--color-caneta-preta` | `#1a1a1a` | Títulos e marcações principais |
| `--color-marca-texto` | `rgba(255, 224, 102, 0.75)` | Efeito marca-texto amarelo |

* **Fontes:** `Permanent Marker` (Títulos de impacto), `Caveat` (Texto manuscrito/legenda), `Kalam` (Camisas e números estatísticos).

### 2.3. Doodles & Elementos Gráficos
Gerados dinamicamente via React com seeds determinísticos baseados em IDs para consistência visual:
- Qualquer cálculo pseudoaleatório para rotação, tamanho ou offset de stickers, manchas e fitas adesivas deve obrigatoriamente usar uma chave única (`id` do time, jogador ou índice) como *seed* determinística. Isso evita erros de *Hydration Mismatch* no Next.js entre o Node.js/Vercel (servidor) e o browser (cliente).
- `<TapeStrip />`: Fitas adesivas/washi tape SVG com rotações orgânicas.
- Doodles SVG: `<ScribbleLine />` (linhas à mão), `<HandArrow />` (setas de destaque), `<CircleHighlight />` (círculo ao redor de números).
- `<Stamp />`: Carimbos CSS puro com efeito desgastado.
- `<InkBlot />`: Manchas de café ou tinta em opacidade baixa (0.04-0.08).

---

## 3. Layout das Páginas

### 3.1. Home ("Mesa de Trabalho")
- Em vez de accordion rígido, os grupos aparecem como **folhas de papel soltas e espalhadas na mesa**, com rotações suaves.
- **Hover:** A folha ganha elevação física real (spring), levanta sombra e aumenta o z-index.
- **Escudos:** Colados como stickers nas folhas com link direto para as seleções.

### 3.2. Página de Seleção ("Folha Aberta")
- **Layout de Jogadores:** Alternado e desalinhado organicamente. Imagens de jogadores recortadas com transparência e fixadas com washi tape.
- **Histórico & Cultura:** Visual de recortes de jornais de época com `clip-path` irregular e blocos estilo post-it.

---

## 4. Escopo de Dados (`worldcup.json`)

* **Escopo de Jogadores:** Exatamente **2 jogadores de destaque** por seleção.
* **Pilotos de validação:**
  - **Brasil:** Vinícius Júnior e Neymar Jr.
  - **Argentina:** Lionel Messi e Emiliano Martínez (Dibu).

---

## 5. Diretrizes de Geração de Imagens (IA) & Aprendizados

Todas as imagens são geradas e pós-processadas usando o script [removeBg.js](file:///Users/macbookpro/Documents/Jonas/almanaque-copa/removeBg.js) para remoção de fundos sólidos via algoritmo de *Edge Flood Fill*, resultando em `.png` com transparência real.

### 5.1. Aprendizados Críticos de Geração (Stickers Perfeitos)

> [!IMPORTANT]
> **1. Contorno de Segurança das IAs (Workaround de Nomes):**
> Para evitar bloqueios por direitos autorais nas IAs geradoras, **nunca** use nomes de jogadores famosos diretamente no prompt. Em vez disso, utilize descrições físicas detalhadas, uniformes e poses específicas (ex: *"A pardo football player with mohawk hair fade, thin stubble beard, green eyes, wearing yellow and green jersey with number 10, pointing fingers to the sky"*).
>
> **2. Proteção do Recorte (Fundo Limpo & Borda de Proteção):**
> - **Sem Pop-Art Poluído no Fundo:** Remova texturas, fumaça ou explosões atrás do sticker. Elementos externos de fundo quebram o recorte transparente nas bordas.
> - **O Segredo do Escudo de Contorno:** Para evitar que o algoritmo de transparência "coma" a borda branca do sticker (quando ela se funde com o fundo branco gerado), inclua no prompt a instrução de uma **linha preta fina contornando o lado externo da borda branca do sticker** (ex: *"Sticker style with a very thick white outline border, and a thin black line outlining the outside edge of the white border"*). Essa linha fina preta serve de barreira física, garantindo que o recorte remova o fundo branco externo perfeitamente e mantenha a borda do adesivo 100% íntegra.

### 5.2. Prompts de Referência

* **Troféu da Copa:**
  > *"Flat vector illustration of the FIFA World Cup trophy, golden yellow color, thick black outline, bold graphic novel aesthetic. Sticker style with a very thick white outline border around the entire trophy, and a thin black line outlining the outside edge of the white border. Isolated on a solid plain pure white background, simple and iconic, no text, no realistic photo rendering, no background graphics."*

* **Figurinhas de Jogadores (ex: Neymar Jr):**
  > *"Flat vector pop-art style sticker illustration of a pardo Brazilian football player. He has a highly detailed styled mohawk fade hair cut, thin styled eyebrows, a well-groomed short stubble beard, green eyes, and a charismatic wide smile. He is wearing the yellow and green Brazilian national jersey with number 10, celebrating and pointing fingers to the sky. Clean sticker style with a thick, solid white outline border surrounding the entire player illustration, and a thin black line outlining the outside edge of the white border. Isolated on a solid plain pure white background, bold graphic novel aesthetic, vector portrait, no realistic photo, no text, no background graphics."*

---

## 6. Arquitetura de Componentes
- `src/app/page.tsx`: Home (Server Component) que renderiza `ScatteredGroups`.
- `src/app/team/[id]/page.tsx`: Detalhes do país (SSG).
- `src/components/ui/PlayerRow.tsx`: Renderização das figurinhas e estatísticas dos 2 jogadores.
- `src/components/ui/doodles/`: Componentes SVG de scrapbook (`TapeStrip`, `InkBlot`, `Stamp`, etc).

---

## 7. Fluxo de Trabalho Git
1. Criar branch separada para o recurso.
2. Commitar alterações lógicas e limpas.
3. Criar Pull Request via GitHub CLI com o corpo em linha única: `gh pr create --title "..." --body "Sua descrição longa em uma única linha..."`
4. Squash merge na `main`.
