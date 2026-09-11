const https = require('https');
const fs = require('fs');
const path = require('path');

const FONTS_DIR = 'D:/forgealloy-site/public/fonts';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': UA } }, (res) => {
      if (res.statusCode !== 200) { reject(new Error('HTTP ' + res.statusCode + ' for ' + url)); res.resume(); return; }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

(async () => {
  fs.mkdirSync(FONTS_DIR, { recursive: true });
  const cssUrl = 'https://fonts.googleapis.com/css2?family=Archivo:wght@400;700;800&family=JetBrains+Mono:wght@400;700&display=swap';
  const css = (await get(cssUrl)).toString('utf8');

  const blocks = [];
  const re = /@font-face\s*{([^}]+)}/g;
  let m;
  let idx = 0;
  while ((m = re.exec(css)) !== null) blocks.push(m[1]);

  const outBlocks = [];
  const used = {};
  for (const block of blocks) {
    const fam = (block.match(/font-family:\s*'([^']+)'/) || [])[1] || 'unknown';
    const weight = (block.match(/font-weight:\s*(\d+)/) || [])[1] || '400';
    const style = (block.match(/font-style:\s*(\w+)/) || [])[1] || 'normal';
    const ur = (block.match(/unicode-range:\s*([^;]+);/) || [])[1] || '';
    const srcMatch = block.match(/src:\s*url\((https:[^)]+)\)\s*format\('woff2'\)/);
    if (!srcMatch) continue;
    const famId = fam.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const styleId = style === 'normal' ? '' : '-' + style;
    used[famId + weight + styleId] = (used[famId + weight + styleId] || 0) + 1;
    const n = used[famId + weight + styleId];
    const file = `${famId}-${weight}${styleId}-${n}.woff2`;
    const buf = await get(srcMatch[1]);
    fs.writeFileSync(path.join(FONTS_DIR, file), buf);
    const localBlock = block
      .replace(srcMatch[1], `/fonts/${file}`)
      .replace(/\/\*[^*]*\*\//g, '');
    outBlocks.push(`@font-face {\n  ${localBlock.replace(/\n\s*/g, ' ').trim()}\n}`);
    idx++;
    console.log(`OK ${file} (${buf.length} bytes) family=${fam} w=${weight}`);
  }
  fs.writeFileSync(path.join(FONTS_DIR, 'fonts.css'), outBlocks.join('\n\n'));
  console.log('Total fonts: ' + idx + ', wrote fonts.css');
})().catch((e) => { console.error('FONT_FAIL: ' + e.message); process.exit(1); });
