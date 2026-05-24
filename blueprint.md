# BLUEPRINT DE PRODUTO & ARQUITETURA TÉCNICA
## Projeto: Almanaque da Copa – Estilo Scrapbook & Colagem

Este documento serve como a **Especificação Técnica de Produto (PRD)** consolidada para guiar o desenvolvimento do site informativo da Copa do Mundo através da CLI do Gemini/Antigravity. O objetivo é criar uma aplicação web performática, esteticamente disruptiva (visual Punk Zine/Scrapbook) e estruturada de forma 100% gratuita.

---

## 1. Visão Geral do Produto (Product Vision)
Um site informativo de seleções e jogadores da Copa do Mundo, focado em uma experiência visual extraordinária. O design simula um **caderno de recortes físico**, utilizando elementos desalinhados, texturas de papel, bordas rasgadas, sobreposições de camadas e animações fluidas. Para mitigar problemas de direitos autorais de forma criativa, todos os jogadores serão representados por ilustrações estilo Pop-Art/Vetor customizadas e identificáveis por seus traços marcantes.

---

## 2. Stack Tecnológica (100% Custo Zero)
* **Framework:** Next.js 14+ (App Router) utilizando **SSG (Static Site Generation)** para gerar páginas HTML estáticas em tempo de build (Latência e custo de servidor zero).
* **Hospedagem:** Vercel (Plano Hobby - Gratuito).
* **Estilização:** Tailwind CSS (Ideal para rotações arbitrárias, layouts sobrepostos e customização de z-index).
* **Animações:** Framer Motion (Transições de página 3D e efeitos de física de papel).
* **Banco de Dados/Armazenamento:** Arquivos JSON locais nativos no repositório.

---

## 3. Conceito de Design & UX (Mobile-First)

### 3.1. A Capa do Caderno (Home)
* **Desktop & Mobile:** Uma "mesa de trabalho" com uma textura sutil de fundo. No centro, a capa de um caderno de recortes. 
* **Navegação dos Grupos:** Os Grupos (A, B, C...) são estruturados em um formato de **Accordion Interativo**. 
* **O Efeito "Adesivo":** Ao expandir um grupo, as seleções aparecem como **figurinhas de papel coladas** (com sombras realistas e rotações leves). Clicar na figurinha engaja a animação de transição para a página da seleção.

### 3.2. A Página da Seleção (Layout de Rolagem)
* **Efeito de Virada de Página:** A transição da Home para a Seleção utiliza o Framer Motion simulando uma folha sendo virada no eixo Y (`rotateY`).
* **Rolagem Contínua de Papel Rasgado:** O site flui verticalmente. A transição entre a seção histórica do País e o álbum de jogadores é feita através de divisores gráficos (`clip-path` ou SVGs mascarados) que simulam **papel rasgado à mão**.
* **Cards de Jogadores (Efeito Flip):** Cada card tem rotação aleatória sutil (`rotate-1` ou `-rotate-2`). Ao passar o mouse (ou tocar no mobile), o card se alinha, "descola" da página (`scale-105`) e vira em 3D revelando as estatísticas históricas do jogador no verso.

---

## 4. Estrutura do Banco de Dados Local (`/data/worldcup.json`)

Para alimentar o projeto dinamicamente sem banco de dados, usaremos a estrutura JSON abaixo. O escopo de jogadores foi otimizado para garantir a viabilidade da curadoria:
* **Seleções Principais:** 8 a 12 jogadores de destaque.
* **Seleções Médio/Baixas:** 4 a 6 jogadores de destaque.

```json
{
  "teams": [
    {
      "id": "brasil",
      "name": "Brasil",
      "group": "Grupo A",
      "badge_image": "/images/badges/brasil.webp",
      "theme_color": "#ffdf00",
      "history": {
        "summary": "Único país pentacampeão mundial e a única seleção a participar de todas as edições da história das Copas.",
        "milestones": "Títulos marcantes em 1958 (Suécia), 1962 (Chile), 1970 (México), 1994 (EUA) e 2002 (Coreia/Japão)."
      },
      "culture": {
        "traditional_food": "Feijoada, Coxinha e Pastel de Feira",
        "curiosity": "O termo 'Pelé' virou oficialmente um adjetivo no dicionário para designar algo ou alguém que é excepcional."
      },
      "players": [
        {
          "id": "vini-jr",
          "name": "Vinícius Júnior",
          "jersey_number": 7,
          "position": "Atacante",
          "illustration_url": "/images/players/vini-jr.webp",
          "short_bio": "Revelado pelo Flamengo e protagonista no Real Madrid, conhecido por sua velocidade estonteante e dribles imprevisíveis.",
          "stats": {
            "career_goals": 145,
            "world_cups_played": 1,
            "world_cup_goals": 1,
            "historical_fact": "Marcou seu primeiro gol em Copas do Mundo contra a Coreia do Sul em 2022."
          }
        }
      ]
    }
  ]
}

## Diretrizes para Geração de Imagens

Prompt-Base Sugerido: > "Vector pop-art silhouette of [NOME DO JOGADOR], wearing [CORES DA SELEÇÃO] jersey with number [NÚMERO], highly recognizable facial features or signature hair, comic book halftone dots background, dynamic soccer action pose, sharp vector lines, paper cutout edge sticker style --no realistic photo"

Características Obrigatórias:

Traço de Identificação: Focar em cabelos icônicos, poses clássicas de comemoração ou acessórios marcantes do jogador para mantê-lo reconhecível.

Formato de Saída: Converter as imagens geradas para o formato .webp para garantir compressão máxima sem perda de nitidez gráfica.