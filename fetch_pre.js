import fs from 'fs';

async function run() {
  const baseUrl = 'https://ais-pre-4b3vqlqizf6lssvdf57ukr-254205543764.asia-northeast1.run.app';
  
  // 要救援的人物图片列表
  const files = [1, 2, 3, 4, 5].map(i => `/assets/characters/char_${i}_green.png`);
  
  for (const path of files) {
    const url = baseUrl + path;
    console.log('Fetching from Pre:', url);
    try {
      const res = await fetch(url);
      if (res.ok) {
        const arrayBuffer = await res.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        fs.writeFileSync('./public' + path, buffer);
        console.log('Successfully saved ->', './public' + path);
      } else {
        console.error('Failed to fetch:', url, 'Status:', res.status);
      }
    } catch (e) {
      console.error('Error fetching', path, e.message);
    }
  }
}

run();
