import fs from 'fs';
import exif from 'exif-parser';

function readExif(filename) {
  try {
    const buffer = fs.readFileSync(filename);
    const parser = exif.create(buffer);
    const result = parser.parse();
    
    console.log(`\n--- EXIF Info for ${filename} ---`);
    console.log(JSON.stringify(result.tags, null, 2));
    
  } catch (e) {
    console.log(`\n--- EXIF Info for ${filename} ---`);
    console.log("No detectable EXIF data or error:", e.message);
  }
}

readExif('public/1.jpg');
readExif('public/2.jpg');
