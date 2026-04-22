import fs from 'fs';
import { PNG } from 'pngjs';
import path from 'path';

const files = [
  { in: 'ChatGPT Image 2026年4月22日 22_04_57 (1).png', out: 'public/assets/characters/char_1_green.png' },
  { in: 'ChatGPT Image 2026年4月22日 22_04_57 (2).png', out: 'public/assets/characters/char_2_green.png' },
  { in: 'ChatGPT Image 2026年4月22日 22_04_57 (3).png', out: 'public/assets/characters/char_3_green.png' },
  { in: 'ChatGPT Image 2026年4月22日 22_04_57 (4).png', out: 'public/assets/characters/char_4_green.png' },
  { in: 'ChatGPT Image 2026年4月22日 22_04_57 (5).png', out: 'public/assets/characters/char_5_green.png' }
];

for (const task of files) {
  if (!fs.existsSync(task.in)) {
    console.log(`Skipping ${task.in}, not found`);
    continue;
  }
  
  const buf = fs.readFileSync(task.in);
  const png = PNG.sync.read(buf);

  // Simple green screen removal
  for (let y = 0; y < png.height; y++) {
    for (let x = 0; x < png.width; x++) {
      const idx = (png.width * y + x) << 2;
      const r = png.data[idx];
      const g = png.data[idx + 1];
      const b = png.data[idx + 2];
      
      // If it's very green
      if (g > 150 && r < 100 && b < 100) {
        png.data[idx + 3] = 0; // Set alpha to 0 (transparent)
      } else if (g > 100 && g > r * 1.2 && g > b * 1.2) {
          // Softer green edge blending
          png.data[idx + 3] = 0;
      }
    }
  }

  const outBuf = PNG.sync.write(png);
  fs.writeFileSync(task.out, outBuf);
  console.log(`Processed ${task.in} -> ${task.out}`);
}
