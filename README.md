# ⚽ Almanaque da Copa 2026 – Scrapbook Punk & Grunge

Um scrapbook interativo, imersivo e totalmente responsivo da Copa do Mundo de 2026, projetado para emular um caderno físico feito à mão com colagens, fitas adesivas, anotações manuscritas e figurinhas analógicas.

---

## 🎨 O Conceito Estético
O projeto afasta-se de layouts digitais tradicionais para recriar uma **Mesa de Trabalho** de corte militar verde escuro, sobre a qual repousam papéis de grupos desalinhados de forma orgânica e um caderno de seleções com páginas de papel pautado envelhecido.

### Destaques do Design:
* **Texturas 100% CSS Puro:** Sem imagens externas pesadas. Texturas de mesa, papel kraft e papel pautado são geradas puramente via código CSS estruturado e gradientes SVG.
* **Doodles Determinísticos:** Divisores rasurados, manchas de café, fitas crepe e setas indicadoras desenhadas à mão com rotações físicas pseudoaleatórias seguras (seeds determinísticas contra erros de hidratação).
* **Física das Folhas:** Animações com Framer Motion que dão a sensação física das folhas flutuando e caindo sobre a mesa.
* **Caderno de Seleções:** Exibição com estética de folhas de caderno com figurinhas recortadas presas com washi tape e estatísticas anotadas à caneta esferográfica.

---

## 🚀 Funcionalidades Integradas
1. **Painel de Estatísticas (`/stats`):** Um quadro de cortiça reuniendo rankings históricos das 10 seleções do MVP (Artilharia, Títulos, Copas disputadas e mais).
2. **Figurinhas Estelares & Lendas de Ouro:** Adesivos transparentes em alta definição dos jogadores de destaque de cada país e das 10 maiores lendas da história das Copas (como Pelé e Maradona), renderizados com selo metalizado dourado refletivo.
3. **Navegação Circular:** Links no rodapé em formato de post-its coloridos para transitar fluentemente entre os países.

---

## 💻 Como Executar o Projeto

### Próximos Passos:
Instale as dependências:
```bash
npm install
```

Inicie o servidor de desenvolvimento local:
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

### Testes & Validação:
* **Executar Testes Unitários (Vitest):** `npm run test`
* **Validar Build de Produção (Next.js):** `npm run build`

---

## 🛠️ Pós-Processamento de Adesivos (removeBg.js)
O projeto conta com um script de pós-processamento de imagens (`removeBg.js`) que usa o algoritmo de *Edge Flood Fill* para limpar fundos brancos de novas figurinhas geradas e inseri-las como adesivos transparentes com bordas brancas grossas autênticas.
