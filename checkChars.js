import fs from 'fs';
const files = fs.readdirSync('public/assets/characters');
for (const file of files) {
  const stat = fs.statSync(`public/assets/characters/${file}`);
  console.log(file, stat.size);
}
