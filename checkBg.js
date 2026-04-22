import fs from 'fs';
import { PNG } from 'pngjs';

const buf = fs.readFileSync('public/assets/backgrounds/bg_1.png');
const png = PNG.sync.read(buf);
console.log('Background bg_1 dimensions:', png.width, 'x', png.height);
