const Jimp = require('jimp');

async function processImage(inputPath, outputPath) {
  try {
    const image = await Jimp.read(inputPath);
    
    // We assume the background is white or near-white.
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      
      // If pixel is very close to white (e.g. > 240)
      if (r > 240 && g > 240 && b > 240) {
        this.bitmap.data[idx + 3] = 0; // Alpha 0
      }
    });
    
    await image.writeAsync(outputPath);
    console.log(`Processed: ${outputPath}`);
  } catch (err) {
    console.error(`Error processing ${inputPath}:`, err);
  }
}

const artifactsDir = '/Users/macbookpro/.gemini/antigravity-cli/brain/20e5142b-99a7-44cf-892c-b734df4db4a3';
const publicDir = '/Users/macbookpro/Documents/Jonas/almanaque-copa/public/images';

const files = [
  { in: 'trophy_1779644150204.png', out: `${publicDir}/trophy.png` },
  { in: 'vini_jr_1779644162941.png', out: `${publicDir}/players/vini-jr.png` },
  { in: 'neymar_1779644175059.png', out: `${publicDir}/players/neymar-jr.png` },
  { in: 'alisson_1779644187715.png', out: `${publicDir}/players/alisson.png` },
  { in: 'marquinhos_1779644200403.png', out: `${publicDir}/players/marquinhos.png` },
  { in: 'bruno_g_1779644213138.png', out: `${publicDir}/players/bruno-g.png` },
  { in: 'rodrygo_1779644226833.png', out: `${publicDir}/players/rodrygo.png` },
  { in: 'messi_1779644240252.png', out: `${publicDir}/players/lionel-messi.png` },
  { in: 'dibu_1779644252043.png', out: `${publicDir}/players/dibu-martinez.png` },
];

async function run() {
  for (const f of files) {
    await processImage(`${artifactsDir}/${f.in}`, f.out);
  }
}

run();
