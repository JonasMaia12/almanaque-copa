# 📋 Plano de Implementação: Renovação de Ativos (Figo & Brasil)

Este plano detalha o passo a passo técnico para implementar as especificações visuais aprovadas no [Design Spec](file:///Users/macbookpro/Documents/Jonas/almanaque-copa/docs/superpowers/specs/2026-05-31-figo-brasil-assets-design.md).

---

## 🎯 Escopo Geral
Substituir os ativos visuais de **Luís Figo (Lenda Dourada)** e do **Badge do Brasil (CBF + Canarinho Pistola)** seguindo a risca a identidade Punk & Grunge do Scrapbook, utilizando automação para recorte de fundo e garantindo que o build de produção (SSG) continue 100% íntegro.

---

## 🛠️ Detalhamento das Fases

### Fase 1: Geração e Armazenamento Bruto
1. **Geração da Imagem do Luís Figo:**
   * Utilizar a ferramenta de geração de imagens com o prompt especificado na Seção 3 da especificação técnica.
   * Salvar a imagem gerada temporariamente como `/Users/macbookpro/Documents/Jonas/almanaque-copa/scratch/figo_raw.png`.
2. **Geração da Imagem do Badge do Brasil:**
   * Utilizar o prompt da Seção 4 da especificação técnica.
   * Salvar a imagem gerada temporariamente como `/Users/macbookpro/Documents/Jonas/almanaque-copa/scratch/brasil_badge_raw.png`.

---

### Fase 2: Pós-processamento e Remoção de Fundo
O projeto utiliza um script de Edge Flood Fill (`removeBg.js`) para criar os recortes de adesivo autênticos.
1. **Configurar o `removeBg.js`:**
   * Ajustar a lista de arquivos (`const files`) no script `/Users/macbookpro/Documents/Jonas/almanaque-copa/removeBg.js` para ler das pastas temporárias e salvar diretamente nos destinos finais da pasta `public`.
   * Configuração esperada:
     ```javascript
     const files = [
       { in: './scratch/figo_raw.png', out: './public/images/players/legend-figo.png' },
       { in: './scratch/brasil_badge_raw.png', out: './public/images/badges/brasil.png' }
     ];
     ```
2. **Executar Processamento:**
   * Rodar o script no terminal: `node removeBg.js`.
   * Verificar nos logs se ambos os arquivos foram gerados com sucesso e se o recorte de fundo branco foi realizado corretamente.

---

### Fase 3: Integração dos Dados e Código
1. **Verificação de Caminhos no Banco Local (`worldcup.json`):**
   * Validar se o Luís Figo (`id: "figo"`) aponta para: `"/images/players/legend-figo.png"`.
   * Validar se o Brasil (`id: "brasil"`) aponta para: `"/images/badges/brasil.png"`.
   *(Nota: Ambos já apontam para essas rotas por padrão, então nenhuma alteração no JSON será necessária, garantindo compatibilidade retroativa instantânea).*

---

### Fase 4: Garantia de Qualidade (QA) e Homologação
1. **Executar Servidor de Desenvolvimento:**
   * Iniciar o projeto localmente: `npm run dev`.
   * Acessar `/team/portugal` no navegador e checar visualmente:
     * O sticker dourado e holográfico de Luís Figo.
     * Os efeitos de animação e rotação do Framer Motion.
     * O contorno de sticker (borda branca grossa e linha fina preta externa).
   * Acessar `/team/brasil` e checar:
     * O novo badge (Escudo CBF + Canarinho Pistola) renderizado no topo esquerdo.
     * Se o alinhamento e a sombra estão corretos no layout da folha de caderno pautada.
2. **Validação de Build e Testes:**
   * Executar os testes automatizados da aplicação: `npm run test`.
   * Realizar o build completo para garantir o funcionamento do Next.js Static Site Generation (SSG): `npm run build`.

---

## 🗹 Critérios de Aceitação
* [ ] Ambos os fundos de imagem são perfeitamente transparentes, sem rebarbas pixeladas brancas.
* [ ] O sticker do Figo exibe a pose clássica e o visual holográfico dourado.
* [ ] O badge do Brasil integra com sucesso o Canarinho Pistola com a identidade invocada pedida.
* [ ] O build de produção é concluído com sucesso sem erros de hidratação ou links de imagem quebrados.
