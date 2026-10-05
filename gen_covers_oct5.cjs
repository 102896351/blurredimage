const https = require('https');
const fs = require('fs');

const KEY = process.env.AGNES_API_KEY;
if (!KEY) { console.error('AGNES_API_KEY missing'); process.exit(1); }

const jobs = [
  {
    name: 'blur-child-face',
    prompt: 'Flat vector illustration, wide blog cover. A parent photographing a small child seen from behind, with the child face area softly blurred, plus a smartphone showing a shared photo with the face hidden behind a soft blue blur, concept of protecting a child privacy before posting online. Clean modern SaaS illustration style, white background with vivid royal blue accents, soft rounded shapes, minimal, absolutely no text, no letters, no numbers, no symbols anywhere.'
  },
  {
    name: 'blur-receipt-payment',
    prompt: 'Flat vector illustration, wide blog cover. A paper receipt and a smartphone showing a bank transfer screenshot, with the sensitive number fields covered by solid blue blocks and a blurred total area, concept of redacting financial screenshots before sharing. Clean modern SaaS illustration style, white background with vivid royal blue accents, soft rounded shapes, minimal, absolutely no text, no letters, no numbers, no symbols anywhere.'
  }
];

function post(payload) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const req = https.request({
      hostname: 'apihub.agnes-ai.com',
      path: '/v1/images/generations',
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + KEY, 'Content-Length': Buffer.byteLength(data) }
    }, res => {
      let b = '';
      res.on('data', c => b += c);
      res.on('end', () => {
        if (res.statusCode !== 200) return reject(new Error('HTTP ' + res.statusCode + ' ' + b.slice(0, 300)));
        try { resolve(JSON.parse(b).data[0].url); } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, r => {
      const c = [];
      r.on('data', d => c.push(d));
      r.on('end', () => { fs.writeFileSync(dest, Buffer.concat(c)); resolve(Buffer.concat(c).length); });
    }).on('error', reject);
  });
}

(async () => {
  const sharp = require('sharp');
  for (const job of jobs) {
    const url = await post({ model: 'agnes-image-2.1-flash', prompt: job.prompt, size: '1536x1024' });
    const png = 'public/blog/img/' + job.name + '.png';
    const webp = 'public/blog/img/' + job.name + '.webp';
    const sz = await download(url, png);
    await sharp(png).resize({ width: 1536 }).webp({ quality: 82 }).toFile(webp);
    const out = fs.statSync(webp).size;
    console.log(job.name, 'png', Math.round(sz / 1024) + 'KB', '-> webp', Math.round(out / 1024) + 'KB');
  }
  console.log('DONE');
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
