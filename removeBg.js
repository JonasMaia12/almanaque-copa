const Jimp = require('jimp');

async function processImage(inputPath, outputPath) {
  try {
    const image = await Jimp.read(inputPath);
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    
    // Matriz de controle para evitar revisitar pixels
    const visited = new Uint8Array(width * height);
    const queue = [];

    // Função para verificar se um pixel é branco (r > 240, g > 240, b > 240)
    function isWhite(x, y) {
      const idx = (y * width + x) * 4;
      const r = image.bitmap.data[idx + 0];
      const g = image.bitmap.data[idx + 1];
      const b = image.bitmap.data[idx + 2];
      return r > 240 && g > 240 && b > 240;
    }

    // Adiciona pixels da borda à fila
    // Linhas de cima e baixo
    for (let x = 0; x < width; x++) {
      if (isWhite(x, 0)) {
        visited[0 * width + x] = 1;
        queue.push({ x, y: 0 });
      }
      if (isWhite(x, height - 1)) {
        visited[(height - 1) * width + x] = 1;
        queue.push({ x, y: height - 1 });
      }
    }
    // Colunas esquerda e direita
    for (let y = 0; y < height; y++) {
      if (isWhite(0, y)) {
        if (!visited[y * width + 0]) {
          visited[y * width + 0] = 1;
          queue.push({ x: 0, y });
        }
      }
      if (isWhite(width - 1, y)) {
        if (!visited[y * width + (width - 1)]) {
          visited[y * width + (width - 1)] = 1;
          queue.push({ x: width - 1, y });
        }
      }
    }

    // BFS para preencher/tornar transparente os pixels conectados
    let head = 0;
    const directions = [
      { dx: 1, dy: 0 },
      { dx: -1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: 0, dy: -1 }
    ];

    while (head < queue.length) {
      const { x, y } = queue[head++];
      
      // Tornar o pixel transparente (Alpha = 0)
      const idx = (y * width + x) * 4;
      image.bitmap.data[idx + 3] = 0;

      // Olhar vizinhos
      for (const dir of directions) {
        const nx = x + dir.dx;
        const ny = y + dir.dy;

        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const nIdx = ny * width + nx;
          if (!visited[nIdx] && isWhite(nx, ny)) {
            visited[nIdx] = 1;
            queue.push({ x: nx, y: ny });
          }
        }
      }
    }
    
    await image.writeAsync(outputPath);
    console.log(`Processed with Edge Flood Fill: ${outputPath}`);
  } catch (err) {
    console.error(`Error processing ${inputPath}:`, err);
  }
}

const artifactsDir = '/Users/macbookpro/.gemini/antigravity-cli/brain/d00ccc55-a555-4dcf-96d3-590418a6c4cf';
const publicDir = '/Users/macbookpro/Documents/Jonas/almanaque-copa/public/images';

const files = [
  { in: `${artifactsDir}/lukaku_raw_1779880501917.png`, out: `${publicDir}/players/lukaku.png` }
];

async function run() {
  for (const f of files) {
    await processImage(f.in, f.out);
  }
}

run();
