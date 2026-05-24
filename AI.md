# Almanaque da Copa do Mundo – Scrapbook Punk/Grunge
## Guia de Referência Principal (AI.md)

Este documento centraliza todas as especificações do produto, arquitetura técnica, stack de tecnologia aprovada, escopo de dados, sistema de design e boas práticas de desenvolvimento para o projeto **Almanaque da Copa**. Ele serve como a fonte de verdade absoluta (Single Source of Truth) para o desenvolvimento.

---

## 1. Stack Tecnológica Aprovada (100% Custo Zero)

* **Framework:** Next.js 16+ (App Router) com **SSG (Static Site Generation)** — latência zero, hospedagem sem custos.
* **Linguagem:** TypeScript (tipagem rígida, strict mode).
* **Hospedagem:** Vercel (Plano Hobby — Gratuito).
* **Estilização:** Tailwind CSS v4 com tokens `@theme`. Sem imagens de fundo externas — texturas via CSS puro (SVG inline + feTurbulence + gradientes).
* **Animações:** Framer Motion para micro-interações físicas (spring, hover lift, scale).
* **Banco de Dados:** Arquivo local JSON em `/src/data/worldcup.json`.
* **Gerenciador de Pacotes:** `npm`.

### Qualidade de Engenharia & Testes
* **Testes Unitários:** Vitest + Testing Library.
* **Testes E2E:** Playwright (Chromium desktop + mobile Pixel 5).
* **Boas Práticas:** SOLID, DRY, KISS, YAGNI, TDD.
* **Acessibilidade (A11y) & SEO:** HTML5 semântico, ARIA correto, meta-tags completas.

---

## 2. Sistema de Design — Punk/Grunge Scrapbook

### 2.1. Conceito Central
A interface imita um **caderno de scrapbook físico feito à mão**, com estética punk/grunge:
- Como se uma pessoa foi colando stickers, escrevendo com caneta, rasgando papéis e usando fita adesiva em diferentes momentos
- Nada deve parecer "componente de UI padrão" — sem bordas arredondadas uniformes, sem grids rígidos
- Elementos podem parecer que estão "pegando o espaço um do outro" — posicionamento orgânico mas sem sobreposição de conteúdo legível
- O fundo "respira" junto com as animações — nunca imagem estática morta

### 2.2. Paleta de Cores

| Token CSS | Hex | Uso |
|---|---|---|
| `--color-mesa` | `#1a2e1a` | Fundo da mesa de corte (verde militar escuro) |
| `--color-kraft` | `#c8a97e` | Capa do caderno (papel kraft) |
| `--color-papel` | `#f0e8d0` | Páginas internas (papel envelhecido) |
| `--color-linha-caderno` | `#c8d8e8` | Linhas do papel pautado |
| `--color-caneta-azul` | `#1a3a6b` | Texto manuscrito principal |
| `--color-caneta-vermelha` | `#8b1a1a` | Destaque, correções, gols |
| `--color-caneta-preta` | `#1a1a1a` | Títulos, anotações fortes |
| `--color-marca-texto` | `rgba(255, 224, 102, 0.75)` | Marca-texto amarelo |
| `--color-marca-verde` | `rgba(102, 255, 153, 0.65)` | Marca-texto verde |
| `--color-punk-red` | `#cc1100` | Elementos de destaque punk/carimbo |

### 2.3. Tipografia (Google Fonts — Gratuitas)

| Variável | Fonte | Uso |
|---|---|---|
| `--font-marker` | **Permanent Marker** | Títulos de impacto, nome do jogador, grupo |
| `--font-handwritten` | **Caveat** | Anotações, textos corridos, legendas |
| `--font-stats` | **Kalam** | Números de estatísticas, camisa, dados técnicos |

**Regras de uso:**
- Estatísticas: cada linha em cor diferente (azul → vermelho → preto), variando por índice
- Marca-texto: `background: linear-gradient(180deg, transparent 50%, var(--color-marca-texto) 50%)` — efeito de marcador real
- Rotações: todo texto manuscrito tem leve inclinação (-3° a +3°)
- Nunca usar fontes system-ui ou sans-serif como fonte principal de display

### 2.4. Texturas de Fundo (100% CSS — Sem Arquivo de Imagem)

#### Mesa de Corte (Home — fundo global)
```css
/* SVG feTurbulence para ruído orgânico + gradiente radial escuro */
background: radial-gradient(ellipse at center, #22402a 0%, #0f1f10 100%);
/* + SVG data URI com feTurbulence para grain de papel */
/* + pseudo-elemento ::before com grade sutil de 5mm */
```

#### Papel Pautado (Páginas de Seleção)
```css
/* Linhas horizontais via repeating-linear-gradient */
background: repeating-linear-gradient(
  transparent,
  transparent 27px,
  var(--color-linha-caderno) 27px,
  var(--color-linha-caderno) 28px
), #f0e8d0;
/* + margem esquerda vermelha vertical */
```

#### Papel Kraft (Container da capa)
```css
/* Gradiente diagonal + ruído SVG data URI inline */
background: 
  url("data:image/svg+xml,...") repeat,  /* grain SVG */
  linear-gradient(135deg, #d4b483 0%, #b8956a 100%);
```

### 2.5. Elementos Gráficos Programáticos

Todos os doodles/decorações são gerados por componentes React que usam seeds determinísticas (baseadas no ID/índice) para gerar variações. Nunca aleatório puro no servidor.

#### Fitas Adesivas (Tape)
- Componente `<TapeStrip angle={angle} color={color} />` — SVG inline
- Variações: scotch transparente, washi colorida, fita preta punk
- Sempre inclinadas (15°–35°), posicionadas absolutamente

#### Doodles SVG Programáticos
- `<ScribbleLine seed={n} />` — linha ondulada à mão (SVG path com curvas bezier)
- `<HandArrow seed={n} direction="left|right" />` — seta desenhada apontando para dado
- `<CircleHighlight seed={n} />` — círculo à mão em volta de número
- Seed baseada em `player.id` ou `team.id` — mesmo seed = mesmo doodle

#### Carimbos
- Componente `<Stamp text="GRUPO G" color="blue|red|black" angle={deg} />` — CSS puro
- `border: 3px solid`, `letter-spacing: 0.3em`, `opacity: 0.65`, `font-family: var(--font-marker)`

#### Manchas de Café/Tinta
- `<InkBlot seed={n} type="coffee|ink" />` — SVG elipse com blur, opacidade 0.04–0.08
- Posicionado absolutamente no canto das páginas

---

## 3. Layout & Componentes por Página

### 3.1. Home — "Mesa de Trabalho com Papéis Espalhados"

**Conceito:** Em vez de accordion, os grupos aparecem como **folhas de papel soltas espalhadas na mesa de corte**, como se alguém jogou tudo em cima da bancada.

#### Estrutura da Home
```
[Mesa de corte — fundo CSS grain verde escuro]
  ┌──────────────────────────────────┐
  │  ALMANAQUE DA COPA 2026          │  ← Título em Permanent Marker, carimbo grande
  │  (carimbo grande rotacionado)    │     rotação -3°, estilo carimbado/borrado
  └──────────────────────────────────┘

  [Papéis espalhados na mesa — posição CSS semi-orgânica]
  ╱‾‾‾‾‾‾‾‾╲     ╱‾‾‾‾‾‾‾‾╲
 │ GRUPO A   │╲  │ GRUPO B   │   ← folhas com rotações distintas (-5° a +5°)
 │ 🏴󠁧󠁢󠁳󠁣󠁴󠁿 🇩🇪 🇯🇵 │  │ 🇧🇷 🇷🇺 🇦🇺 │      cores distintas por grupo
 │ 🇪🇸       │  │ 🇲🇽       │      escudos como stickers colados na folha
  ╲_________╱   ╲_________╱
         ╱‾‾‾‾‾‾‾‾╲
        │  GRUPO C   │  ← papel "caído por cima", z-index maior
```

#### Comportamento das Folhas de Grupo
- **Hover:** folha "sobe" — `scale(1.04)`, `z-index` aumenta, sombra aumenta (spring)
- **Click numa folha:** folha vem para frente e expande levemente revelando os escudos mais claramente — mas **não é um accordion com altura animada**. Os escudos já estão visíveis, o hover apenas destaca
- **Escudos:** Stickers colados na folha, cada um com rotação própria, navegam para `/team/:id`
- **Nome do grupo:** `<Stamp>` no canto superior da folha

#### Cores das Folhas por Grupo
```
Grupo A → #fef3c7 (amarelo desbotado)
Grupo B → #fee2e2 (vermelho pálido)  
Grupo C → #dbeafe (azul claro)
Grupo D → #d1fae5 (verde menta)
Grupo E → #ffedd5 (laranja suave)
Grupo F → #ede9fe (lavanda)
Grupo G → #1a1a1a (preto — Brasil!) com texto branco
Grupo H → #fdf6e3 (bege kraft)
```

### 3.2. Página de Seleção — "Folhas Abertas do Caderno"

#### Header da Seleção
- Fundo: papel pautado CSS (linhas horizontais)
- Nome do país: **Permanent Marker**, cor do tema, rotação -2°, `font-size` enorme
- Escudo: sticker colado com fita adesiva SVG, rotação +3°, posição levemente deslocada
- Troféus (títulos): imagem `.webp` gerada por IA, fileira horizontal, `animate-bounce` escalonado
- Técnico: bloco estilo post-it, `<Stamp>` com "TÉCNICO", Caveat para o nome

#### Seção de Jogadores — Layout Alternado Orgânico
```
[Jogador par — sticker esquerda, anotações direita]
  [SILHUETA]   VINÍCIUS JÚNIOR        ← Permanent Marker
  [JOGADOR]    Atacante • Real Madrid  ← Caveat, azul caneta
               ━━━━━━━━━━━━━━━━━━━━━
               ✏ 145 gols de carreira  ← Caveat vermelho, HandArrow SVG
               ✏ 1 Copa disputada      ← Caveat azul
               ✏ 1 gol em Copas        ← Caveat preto
               ▓ "Revelado pelo..."    ← marca-texto amarelo CSS

[Jogador ímpar — anotações esquerda, sticker direita]
  RODRIGO          [SILHUETA]
  Goleiro...       [JOGADOR]
  ✏ 0 gols...
```

**Detalhes de posicionamento:**
- Sticker do jogador não fica em retângulo — tem `filter: drop-shadow` na silhueta
- Fita adesiva SVG no canto do sticker
- As anotações não são alinhadas à grade — têm offsets de 2-8px por linha (parecer escrito)
- Número da camisa: círculo desenhado à mão (`<CircleHighlight>`)
- Às vezes uma `<HandArrow>` do texto para o sticker

#### Seção Histórica
- Estilo recorte de jornal: fundo `#f5f0e8`, font-family serifada, texto justificado
- Bordas irregulares via `clip-path: polygon(...)` — parece recortado com tesoura
- Título em caixa alta, fonte serifada bold

#### Seção Cultura
- Dois post-its: Curiosidade + Gastronomia
- `clip-path` com leve irregularidade (não retângulo perfeito)
- Dobra no canto: pseudo-elemento com sombra triangular
- Manchas de café (`<InkBlot>`) em opacidade baixa

---

## 4. Escopo de Dados & Banco JSON Local (`worldcup.json`)

* **Seleções Inclusas:** Todas as seleções da Copa 2026.
* **Pilotos de validação visual:** Brasil e Argentina.
* **Escopo de Jogadores:**
  * Seleções principais (Brasil/Argentina): 6 jogadores de destaque.
  * Demais seleções: 3 jogadores de destaque.
  * *Fase futura:* duplicar número de jogadores.

### Estrutura do Esquema JSON
```json
{
  "teams": [
    {
      "id": "brasil",
      "name": "Brasil",
      "group": "Grupo G",
      "badge_image": "/images/badges/brasil.webp",
      "theme_color": "#ffdf00",
      "titles_count": 5,
      "manager": "Carlo Ancelotti",
      "history": {
        "summary": "Único país pentacampeão mundial...",
        "milestones": "Títulos em 1958, 1962, 1970, 1994 e 2002."
      },
      "culture": {
        "traditional_food": "Feijoada, Coxinha e Pastel de Feira",
        "curiosity": "O termo 'Pelé' virou oficialmente um adjetivo no dicionário..."
      },
      "players": [
        {
          "id": "vini-jr",
          "name": "Vinícius Júnior",
          "jersey_number": 7,
          "position": "Atacante",
          "age": 25,
          "current_club": "Real Madrid",
          "illustration_url": "/images/players/vini-jr.webp",
          "short_bio": "Revelado pelo Flamengo e protagonista no Real Madrid...",
          "stats": {
            "career_goals": 145,
            "world_cups_played": 1,
            "world_cup_goals": 1,
            "historical_fact": "Marcou seu primeiro gol em Copas contra a Coreia do Sul em 2022."
          }
        }
      ]
    }
  ]
}
```

---

## 5. Diretrizes de Geração de Imagens (IA)

Todas as imagens são geradas via IA e salvas em `/public/images/` como `.webp`.
**Texturas de fundo não são mais arquivos de imagem — são CSS puro.**

### 5.1. Troféu da Copa (NOVO — substitui estrelas ★)
> *"Flat vector illustration of a FIFA World Cup trophy, golden yellow color, thick black outline, pop-art comic book style, sticker style with clean thick white border edge, isolated on solid plain white background, simple and iconic, no text, no realistic photo rendering, bold graphic novel aesthetic"*

- Salvar em `/public/images/trophy.webp`
- Tamanho de exibição: ~32×48px por troféu
- `animate-bounce` com delay escalonado de 150ms por troféu

### 5.2. Escudos das Seleções (Badges)
> *"Vintage worn-out sticker emblem of [PAÍS] national soccer team badge, retro distressed style, punk/grunge aesthetic, thick white sticker border edge, rough paper texture overlay, isolated on solid white background"*

### 5.3. Figurinhas dos Jogadores (Silhuetas Pop-Art)
> *"Vector pop-art silhouette portrait of [JOGADOR], wearing [CORES] national jersey with number [N], comic book halftone dots background, dynamic soccer action pose, sharp vector lines, sticker style with clean thick white outline border, isolated on solid plain white background, no realistic photo, punk graphic novel aesthetic"*

### 5.4. Prompts Reais de Jogadores Validados
* **Vinícius Júnior:**
  > *"Vector pop-art silhouette portrait of Vinicius Junior, wearing yellow and green Brazilian national jersey with number 7, displaying the Brazil flag shield on the left chest, highly recognizable facial features and signature hair, comic book halftone dots background, dynamic soccer action pose, sharp vector lines, paper cutout edge sticker style with clean thick white outline border, isolated on solid plain white background, no realistic photo"*
* **Lionel Messi:**
  > *"Vector pop-art silhouette portrait of Lionel Messi, wearing light blue and white striped Argentine national jersey with number 10, displaying the Argentina flag shield on the left chest, highly recognizable facial features and signature beard, comic book halftone dots background, dynamic soccer action pose, sharp vector lines, paper cutout edge sticker style with clean thick white outline border, isolated on solid plain white background, no realistic photo"*
* **Neymar Jr.:**
  > *"Vector pop-art silhouette portrait of Neymar Jr, wearing yellow and green Brazilian national jersey with number 10, displaying the Brazil flag shield on the left chest, highly recognizable facial features and signature haircut, comic book halftone dots background, dynamic soccer action pose, paper cutout edge sticker style with clean thick white outline border, isolated on solid plain white background, no realistic photo"*
* **Alisson Becker:**
  > *"Vector pop-art silhouette portrait of goalkeeper Alisson Becker, wearing black goalkeeper national jersey with number 1, displaying the Brazil flag shield on the left chest, highly recognizable facial features with prominent beard, goalkeeper gloves on hands, comic book halftone dots background, dynamic soccer action pose, paper cutout edge sticker style with clean thick white outline border, isolated on solid plain white background, no realistic photo"*
* **Emiliano 'Dibu' Martínez:**
  > *"Vector pop-art silhouette portrait of goalkeeper Emiliano Dibu Martinez, wearing green goalkeeper national jersey with number 23, displaying the Argentina flag shield on the left chest, highly recognizable facial features, goalkeeper gloves on hands, comic book halftone dots background, dynamic soccer action pose, paper cutout edge sticker style with clean thick white outline border, isolated on solid plain white background, no realistic photo"*

---

## 6. Arquitetura de Componentes

```
src/
├── app/
│   ├── layout.tsx           ← Fontes: Permanent Marker + Caveat + Kalam
│   ├── page.tsx             ← Server Component — Home com papéis espalhados
│   └── team/[id]/
│       └── page.tsx         ← Server Component — Página da seleção
│
├── components/
│   ├── ui/
│   │   ├── ScatteredGroups.tsx    ← Client — Papéis espalhados (substitui GroupAccordion)
│   │   ├── GroupSheet.tsx         ← Client — Folha individual de grupo com hover lift
│   │   ├── PlayerRow.tsx          ← Client — Linha alternada jogador (sticker + anotações)
│   │   ├── Sticker.tsx            ← Client — Escudo/sticker com next/image
│   │   ├── TornPaper.tsx          ← SVG divisor rasgado
│   │   ├── TitleStars.tsx         ← Troféus animados
│   │   └── doodles/
│   │       ├── TapeStrip.tsx      ← Fita adesiva SVG
│   │       ├── ScribbleLine.tsx   ← Linha ondulada à mão
│   │       ├── HandArrow.tsx      ← Seta desenhada SVG
│   │       ├── CircleHighlight.tsx← Círculo à mão
│   │       ├── InkBlot.tsx        ← Mancha de café/tinta
│   │       └── Stamp.tsx          ← Carimbo de texto
│   └── __tests__/
│
├── data/
│   └── worldcup.json
│
├── types/
│   └── worldcup.ts
│
└── lib/
    └── doodle-seed.ts       ← Funções determinísticas de seed para doodles
```

---

## 7. Fluxo de Git & Gerenciamento de Código

1. **Branches de Fase:** Cada fase tem branch específica.
2. **Code Review e PRs:** Toda alteração passa por branch separada + PR.
3. **GitHub CLI:** `gh pr create --title "..." --body "...em linha única sem quebras..."`
4. **Merge:** Sempre Squash Merge na `main`.

---

## 8. Checklist de Status do Projeto

### ✅ Fase 1: Setup & Dados (CONCLUÍDO)
- [x] Next.js + TypeScript + Tailwind + Framer Motion
- [x] Vitest + Playwright configurados
- [x] `src/types/worldcup.ts` e `src/data/worldcup.json`
- [x] Git + GitHub inicializados

### ✅ Fase 2: Geração de Assets Visuais (CONCLUÍDO)
- [x] Texturas de fundo geradas (serão substituídas por CSS na Fase 5)
- [x] Escudos Brasil e Argentina
- [x] Figurinhas Pop-Art piloto (Messi, Neymar, Alisson, Dibu, Vini Jr)

### ✅ Fase 3: Design System & Componentes Base (CONCLUÍDO)
- [x] Tokens Tailwind v4 no `globals.css`
- [x] Fontes Outfit + Inter (serão substituídas por Permanent Marker + Caveat + Kalam)
- [x] Sticker.tsx, PaperCard.tsx, TornPaper.tsx
- [x] 17 testes unitários Vitest

### ✅ Fase 4: Páginas & Integração (CONCLUÍDO)
- [x] Home com accordion (será substituído na Fase 5)
- [x] Páginas dinâmicas de seleção com SSG
- [x] Testes E2E Playwright
- [x] Build de produção OK

### ✅ Fase 4.5: Code Review & Correções (CONCLUÍDO)
- [x] `next/image` em todos os componentes
- [x] ARIA completo (accordion, cards, títulos)
- [x] Home refatorada em Server + Client Components
- [x] 17/17 testes passando, build OK

### 🚧 Fase 5: Redesign Punk/Grunge Scrapbook (PRÓXIMA)
- [x] **5.1** Gerar imagem do troféu (`.webp`) via IA → salvo em `/public/images/trophy.webp`
- [ ] **5.2** Substituir fontes — Permanent Marker + Caveat + Kalam no `layout.tsx`
- [ ] **5.3** Reescrever `globals.css` — remover imagens de fundo, implementar CSS grain + papel pautado
- [ ] **5.4** Criar componentes de doodle programáticos (`TapeStrip`, `ScribbleLine`, `HandArrow`, `CircleHighlight`, `InkBlot`, `Stamp`)
- [ ] **5.5** Criar `GroupSheet.tsx` e `ScatteredGroups.tsx` — papéis espalhados substituindo accordion
- [ ] **5.6** Reescrever `page.tsx` (Home) com novo layout de papéis espalhados
- [ ] **5.7** Criar `PlayerRow.tsx` — layout alternado orgânico com doodles
- [ ] **5.8** Reescrever `team/[id]/page.tsx` com novo layout de seleção
- [ ] **5.9** Atualizar `TitleStars.tsx` → `TrophyRow.tsx` com imagem do troféu
- [ ] **5.10** Atualizar testes unitários e E2E para os novos componentes
- [ ] **5.11** Build final + PR para `main`

---

## 9. Próximos Passos (Fase 6+)

1. **Expansão do Plantel:** Duplicar jogadores no JSON, gerar figurinhas.
2. **Drag & Drop:** Arrastar stickers com Framer Motion drag.
3. **Novas Seleções:** França (Mbappé), Portugal (CR7), Espanha (Yamal), Inglaterra (Bellingham).
4. **Deploy & CI/CD:** Vercel + GitHub Actions (Vitest + Playwright na pipeline).
