# ⚽ Design Spec: Ajustes Visuais do Sticker de Luís Figo e do Badge do Brasil

**Data:** 2026-05-31  
**Status:** Aprovado pelo Usuário  
**Tema:** Scrapbook Punk & Grunge - Copa do Mundo 2026  

---

## 1. Contexto e Objetivos

Este documento de especificação define as diretrizes de design visual, composição de imagem e prompts técnicos de IA para a renovação de dois ativos de imagem fundamentais do **Almanaque da Copa**:
1. **Figurinha de Lenda de Luís Figo (Portugal):** Garantir que siga o padrão visual metalizado e holográfico das lendas douradas, com reconhecimento imediato do rosto, pose e uniforme icônico da Euro 2004.
2. **Badge da Seleção Brasileira (Brasil):** Substituir o escudo padrão limpo por um badge personalizado no espírito punk/grunge, combinando o escudo oficial da CBF com o mascote supercarismático **Canarinho Pistola**.

Ambos os ativos devem se alinhar perfeitamente à estética de **Mesa de Trabalho + Recortes Manuais + Canetinha & Nanquim** que rege a identidade do Scrapbook do projeto.

---

## 2. Diretrizes de Estilo e Borda de Proteção

Para que as novas imagens se integrem com o algoritmo de remoção de fundo por preenchimento de bordas (`removeBg.js`), elas precisam obrigatoriamente seguir as seguintes diretrizes estéticas:

*   **Estilo Visual Principal:** Ilustração vetorial pop-art, cores vibrantes e chapadas, preenchimento com textura sutil de canetinha/marcador e contornos bem definidos com traço de nanquim.
*   **Isolamento:** Fundo branco sólido puro (`#ffffff`) para que o Edge Flood Fill remova sem problemas.
*   **Borda de Segurança:** Uma borda branca e espessa de adesivo recortado contornando toda a silhueta, finalizada no lado exterior por uma linha preta sólida bem fina. Isso evita que o preenchimento de transparência apague partes claras do desenho do jogador.

---

## 3. Especificação do Sticker: Luís Figo (Lenda de Ouro)

O sticker de Luís Figo deve capturar sua essência no auge de sua liderança técnica pela Seleção de Portugal na Euro 2004.

### Características Físicas e Rosto
*   **Cabelo:** Comprido (altura da nuca), ondulado e jogado para trás, preso com a sua clássica tiara/faixa elástica preta fina de cabelo.
*   **Expressão:** Foco intenso, determinação, sobrancelhas masculinas grossas e arqueadas, com barba por fazer rala desenhada nas laterais do rosto e queixo.
*   **Fidelidade:** Reconhecimento facial característico baseado em suas fotos clássicas liderando a Geração de Ouro.

### Pose e Uniforme
*   **Pose:** Corpo inclinado em corrida dinâmica, com o braço direito estendido e dedo apontando para a frente para ordenar uma jogada de ataque (pose de maestro).
*   **Camisa:** Camisa de Portugal de 2004 (fabricada pela Nike), de cor vermelha profunda (*crimson/deep red*) com painéis verdes nas laterais, gola redonda clássica e o **número 7 em amarelo ouro** no peito.
*   **Adereços:** Braçadeira de capitão com as cores de Portugal (verde e vermelha) visível no braço esquerdo.
*   **Acabamento:** Um fundo de card holográfico dourado brilhante com pequenos padrões geométricos reflexivos de metal escovado, dando o status de "Lenda Histórica" no álbum.

### Prompt de Geração de Imagem
```text
A professional vector pop-art illustration of a legendary Portuguese soccer player, inspired by Euro 2004. The player has medium-long dark slicked-back hair with a thin black headband, intense determined eyes, a strong jawline with light stubble. He is wearing a dark red Portugal jersey with green details, a golden number 7 on the chest, and a captain's armband on his arm. Pose: running on the pitch, pointing with his right hand to coordinate a play, looking focused. Flat colors, bold clean ink outline, marker pen texture, vibrant saturated colors. Background is a reflective shiny gold holographic metallic foil sticker card. Isolated on a solid pure white background. The entire sticker is enclosed by a thick solid white outline border, and a thin black line outlining the outside edge of the white border.
```

---

## 4. Especificação do Badge: Seleção Brasileira (CBF + Canarinho Pistola)

Este ativo deve encapsular a atitude irreverente e punk que o "Canarinho Pistola" trouxe à cultura do futebol brasileiro recente, integrando-o ao brasão oficial de forma harmônica e com alta dose de personalidade.

### Composição Visual
*   **Esquerda (O Escudo):** O brasão da CBF tradicional nas cores verde e amarela com a cruz azul ao centro e as 5 estrelas amarelas clássicas posicionadas horizontalmente logo acima dele.
*   **Direita (O Mascote):** O Canarinho Pistola posicionado ao lado esquerdo ou abraçando/apoiando o escudo com a asa. O mascote deve estar de corpo inteiro ou meio corpo (quadril para cima).
*   **Atitude e Feições do Mascote:** Expressão icônica invocada e focada, sobrancelhas grossas pretas franzidas em sinal de fúria cômica, asas cruzadas no peito em pose marrenta de desafio. Veste o uniforme da seleção brasileira (camisa amarela clássica com gola verde).

### Acabamento Estético
*   **Estilo:** Desenho feito à mão, com contorno marcante de nanquim e preenchimento estilo canetinha escolar. O conjunto inteiro (CBF + Canarinho) forma uma única silhueta adesiva integrada, facilitando a aplicação de rotação e sombra no Next.js.

### Prompt de Geração de Imagem
```text
A custom composite vector sticker for a scrapbook. On the left is the classic Brazilian national soccer federation shield (CBF shield in yellow, green, and blue) with 5 small gold stars above it. On the right, standing proudly next to the shield, is the famous 'Canarinho Pistola' mascot—an angry-looking, fierce yet charismatic yellow canary bird with dark furious eyebrows, wings crossed over his chest, wearing a yellow Brazil soccer jersey. Pop-art style, hand-drawn vector illustration, clean ink outlines, vibrant colors, markers texture. The entire composite graphic is on a solid pure white background, surrounded by a thick solid white sticker outline border, and a thin black line outlining the outside edge of the white border.
```

---

## 5. Próximos Passos e Fluxo de Integração

1. **Geração das Imagens:** Utilizar os prompts validados acima nas ferramentas de geração de imagem.
2. **Pós-processamento:**
   * Salvar os arquivos originais em formato bruto.
   * Adicionar as imagens geradas à lista de processamento do script `removeBg.js`.
   * Executar o script `node removeBg.js` para aplicar o *Edge Flood Fill*, deixando o fundo transparente e gerando os arquivos de saída finais em:
     * `/public/images/players/legend-figo.png`
     * `/public/images/badges/brasil.png`
3. **Validação Visual:** Verificar localmente a renderização nas páginas de Portugal (`/team/portugal`) e do Brasil (`/team/brasil`) para validar se o encaixe, as margens de segurança, a rotação dinâmica e o sombra do Framer Motion estão funcionando sem distorções ou cortes.
4. **Testes Unitários & E2E:** Rodar o comando `npm run test` e `npm run build` para certificar que nenhum caminho de imagem quebrado impeça o build estático (SSG) do Next.js.
