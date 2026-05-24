# Almanaque da Copa do Mundo – Scrapbook & Colagem
## Guia de Referência Principal (AI.md)

Este documento centraliza todas as especificações do produto, arquitetura técnica, stack de tecnologia aprovada, escopo de dados, fluxo de gerenciamento de código e boas práticas de desenvolvimento para o projeto **Almanaque da Copa**. Ele serve como a fonte de verdade absoluta (Single Source of Truth) para o desenvolvimento.

---

## 1. Stack Tecnológica Aprovada (100% Custo Zero)

A stack foi validada e consolidada como a ideal para o estilo "Scrapbook interativo":
* **Framework:** Next.js 14+ (App Router) com **SSG (Static Site Generation)** para tempo de carregamento instantâneo (latência zero) e hospedagem sem custos.
* **Linguagem:** TypeScript (Tipagem rígida e segura).
* **Hospedagem:** Vercel (Plano Hobby - Gratuito).
* **Estilização:** Tailwind CSS. Excelente para:
  * Camadas com posicionamento absoluto (`absolute`, `z-index`).
  * Efeito de rotações arbitrárias feitas à mão (`rotate-[3deg]`, `-rotate-2`).
  * Sombras com profundidade realística de papel colado (`shadow-lg`, sombras customizadas).
* **Animações:** Framer Motion. Ideal para:
  * Transições 3D de páginas (efeito de "virar página" física usando `rotateY`).
  * Efeitos táteis e micro-interações (`whileHover={{ scale: 1.05 }}` simulando descolamento do papel).
  * Movimentos de arraste (*drag*) se aplicável a adesivos/figurinhas.
* **Banco de Dados/Armazenamento:** Arquivo local JSON em `/src/data/worldcup.json`.
* **Gerenciador de Pacotes:** `npm`.

### Qualidade de Engenharia & Testes
* **Testes Unitários:** Vitest (Rápido, integrado nativamente ao ecossistema Vite/ESBuild do Next.js).
* **Testes End-to-End (E2E):** Playwright (Testar fluxos completos e responsividade no navegador).
* **Boas Práticas de Engenharia:** SOLID, DRY (Don't Repeat Yourself), KISS (Keep It Simple, Stupid), YAGNI (You Ain't Gonna Need It) e TDD (Test Driven Development).
* **Acessibilidade (A11y) & SEO:** Estrutura HTML5 semântica completa, IDs de testes exclusivos, meta-tags e suporte total a leitores de tela.
* **Core Web Vitals:** Otimização agressiva de LCP e INP usando pré-carregamento e imagens convertidas para `.webp`.

---

## 2. Conceito de Design & UX (Mobile-First)

O design simula um **caderno de recortes físico** e toda a interface deve ser desenvolvida de forma **Mobile-First**:
* **Mesa de Trabalho (Fundo da Home):** Textura de mesa de corte de artesanato verde (craft cutting mat).
* **Capa do Caderno (Home):** Textura de papelão Kraft grosso. O caderno fica no centro com Accordion Interativo para os Grupos da Copa.
* **Páginas Internas (Seleções):** Textura de papel pautado amassado.
* **Efeito "Adesivo":** As seleções de cada grupo aparecem na Home como figurinhas coladas (com rotações sutis e sombras profundas realistas).
* **Transição Home -> Seleção:** Animação de página virando no eixo Y (`rotateY`).
* **Estrutura das Páginas de Seleções (Rolagem Contínua):**
  * Divisores de seção gráficos que imitam **papel rasgado à mão** (usando SVGs ou `clip-path`).
  * Cards de jogadores com rotação aleatória sutil. Ao passar o mouse/tocar (mobile), o card se alinha, "descola" da página (`scale-105`) e vira em 3D (Flip Card) para revelar as estatísticas no verso.

---

## 3. Escopo de Dados & Banco JSON Local (`worldcup.json`)

* **Seleções Inclusas:** Todas as seleções participantes desde o início na estrutura de dados do JSON.
* **Validação Inicial:** O desenvolvimento e a homologação visual serão feitos e validados usando **Brasil** e **Argentina** como pilotos.
* **Escopo de Jogadores:**
  * **Seleções Principais:** Começar com **6 jogadores de destaque** cada.
  * **Demais Seleções:** Começar com **3 jogadores de destaque** cada.
  * *Fase Futura:* O número de jogadores será duplicado em todas as seleções.

### Estrutura do Esquema de Dados JSON (Com Campos Adicionais)
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
        "milestones": "Títulos marcantes em 1958, 1962, 1970, 1994 e 2002."
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

## 4. Diretrizes de Geração de Imagens (Recursos de IA)

Todas as imagens serão geradas diretamente pelo assistente IA e salvas na pasta `/public/images/` em formato `.webp`.

### 4.1. Texturas de Fundo
*   **Mesa de Corte Verde:**
    > *"High resolution textures of a professional green self-healing craft cutting mat, top-down view, with subtle cutting grids and grid lines, realistic texture"*
*   **Papelão Kraft:**
    > *"High resolution top-down texture of raw recycled cardboard kraft paper, rough fiber texture, tactile brown paperboard surface"*
*   **Papel Pautado Amassado:**
    > *"High resolution top-down texture of a realistic crinkled and wrinkled white lined notebook paper page, subtle handwriting lines, paper texture"*

### 4.2. Escudos das Seleções (Badges)
*   **Estilo:** Adesivo vintage desgastado.
    > *"Vintage worn-out sticker emblem of [NOME DO PAÍS] soccer badge, retro style, distressed paper texture, thick white sticker border edge, isolated background"*

### 4.3. Figurinhas dos Jogadores (Stickers)
*   **Estilo:** Pop-Art de futebol com fundo transparente/isolado.
    > *"Vector pop-art silhouette portrait of [DESCRIÇÃO DO JOGADOR], wearing [CORES DA SELEÇÃO] national jersey with number [NÚMERO], clean jersey with no generic words or generic text, displaying the team logo shield on the left chest, highly recognizable facial features and signature hair, comic book halftone dots background, dynamic soccer action pose, sharp vector lines, paper cutout edge sticker style with clean thick white outline border, isolated on solid plain neutral background --no realistic photo"*
*   *Nota:* O fundo será removido programaticamente ou na geração para garantir transparência absoluta (`.webp`).

---

## 5. Fluxo de Git & Gerenciamento de Código

Para garantir reversibilidade e segurança, adotaremos um fluxo estrito de controle de versão:
1.  **Branches de Fase:** Cada fase do projeto terá sua própria branch específica (ex: `fase-1-setup-dados`, `fase-2-geracao-ativos`). Fases complexas serão subdivididas em sub-branches.
2.  **Inicialização do Repositório (Fase 1):** Assim que a Fase 1 for finalizada no workspace local, o projeto será enviado ao GitHub utilizando a ferramenta CLI `gh`.
3.  **Code Review e PRs (A partir da Fase 2):**
    *   Todas as próximas alterações passarão por uma branch separada.
    *   Um Pull Request (PR) será aberto contra a branch principal.
    *   Execução da criação de PR via GitHub CLI:
        `gh pr create --title "[Título Lógico]" --body "[Descrição detalhada do PR em uma única linha longa, sem quebras de linha]"`
    *   As revisões serão analisadas e o merge será feito via **Squash Merge**.

---

## 6. Checklist de Status do Projeto

### 🛠️ Fase 1: Configuração do Ambiente & Estruturação de Dados (CONCLUÍDO)
- [x] Inicialização do Next.js com TypeScript, Tailwind CSS e Framer Motion.
- [x] Configuração da infraestrutura de testes unitários com Vitest e testes E2E com Playwright (Chromium desktop e mobile).
- [x] Criação do esquema de tipos em `src/types/worldcup.ts`.
- [x] Criação do banco de dados local estruturado `src/data/worldcup.json` atualizado para 2026.
- [x] Inicialização do Git e push da branch `main` no GitHub.

### 🎨 Fase 2: Geração de Imagens & Texturas (CONCLUÍDO)
- [x] Geração das 3 texturas de alta fidelidade: mesa de corte verde, papelão kraft e papel pautado amassado.
- [x] Geração de escudos estilo adesivo vintage para Brasil e Argentina.
- [x] Geração e otimização das figurinhas Pop-Art de jogadores piloto (Messi, Neymar, Alisson, Dibu Martínez, Vini Jr).
- [x] Criação de Pull Request, Code Review e Squash Merge na `main`.

### 📐 Fase 3: Design System & Componentes Scrapbook (CONCLUÍDO)
- [x] Configuração dos tokens de tema do Tailwind v4 via `@theme` no `globals.css`.
- [x] Configuração das fontes Outfit e Inter no `layout.tsx`.
- [x] Desenvolvimento do componente de adesivos táteis `Sticker.tsx` com animações físicas.
- [x] Desenvolvimento do componente interativo 3D Flippable `PaperCard.tsx` com biografia e estatísticas de 2026.
- [x] Desenvolvimento do componente divisor orgânico `TornPaper.tsx` com SVG mascarado de rasgadura.
- [x] Criação e execução com 100% de sucesso de 10 testes unitários Vitest.
- [x] Criação de Pull Request e Squash Merge na `main`.

### 📖 Fase 4: Páginas, Integração & Testes E2E (CONCLUÍDO)
- [x] Criação de branch específica: `fase-4-paginas-integracao`.
- [x] Implementação da Capa e do Accordion interativo de Grupos na Home utilizando links semânticos e adesivos interativos.
- [x] Implementação das páginas dinâmicas das Seleções com furos de espiral e divisores de papel rasgado.
- [x] Integração dos dados do JSON de 2026 para renderização estática rápida (SSG) de todas as seleções.
- [x] Escrita de testes E2E com Playwright (navegação de grupos, flip de cards, responsividade mobile Pixel 5).
- [x] Execução bem-sucedida do build de produção final estático (`npm run build`).
- [x] Conclusão de todas as validações locais com 100% de aprovação (testes e compilação Next.js).

