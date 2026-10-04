// Generate 3 blog cover images via Agnes Image API (free tier)
// Usage: AGNES_API_KEY=sk-xxx node gen_blog_covers.cjs
const https = require('https');
const fs = require('fs');
const path = require('path');

const KEY = process.env.AGNES_API_KEY;
if (!KEY) { console.error('AGNES_API_KEY missing'); process.exit(1); }
const BASE = 'https://apihub.agnes-ai.com/v1';
const OUT = path.join(__dirname, 'public', 'blog', 'img');
const SIZE = '1536x1024';

const JOBS = [
  {
    name: 'censor-photo-online',
    prompt: 'Flat vector illustration, wide blog cover. A hand holding a smartphone displaying a photo where faces and a license plate are covered with blue pixelated mosaic squares, concept of photo redaction and privacy censoring before sharing online. Clean modern SaaS illustration style, white background with blue #2563eb accents, soft shapes, minimal, absolutely no text or letters.',
  },
  {
    name: 'pixelate-vs-blur',
    prompt: 'Flat vector illustration, wide blog cover. Split screen comparison of the same portrait photo: left half pixelated with large square mosaic blocks, right half covered by smooth gaussian blur streaks, concept of pixelate versus blur for hiding data. Clean modern SaaS illustration style, white background with blue #2563eb accents, minimal, absolutely no text or letters.',
  },
  {
    name: 'blur-image-for-gdpr',
    prompt: 'Flat vector illustration, wide blog cover. Identity card, documents and a laptop screen with personal data fields hidden behind blue blur bars, a subtle EU-star privacy shield icon nearby, concept of GDPR data protection compliance before sharing photos. Clean modern SaaS illustration style, white background with blue #2563eb accents, minimal, absolutely no text or letters.',
  },
];

function post(body) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(body);
    const u = new URL(BASE + '/images/generations');
    const req = https.request({
      hostname: u.hostname, path: u.pathname, method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${KEY}`, 'Content-Length': Buffer.byteLength(payload) },
    }, (res) => {
      let b = '';
      res.on('data', (c) => (b += c));
      res.on('end', () => {
        try { resolve({ status: res.statusCode, json: JSON.parse(b) }); }
        catch { reject(new Error(`bad json (HTTP ${res.status || res.statusCode}): ${b.slice(0, 200)}`)); }
      });
    });
    req.on('error', reject);
    req.setTimeout(120000, () => req.destroy(new Error('timeout')));
    req.write(payload);
    req.end();
  });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const get = (u, redirects) => {
      https.get(u, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && redirects < 5)
          return get(res.headers.location, redirects + 1);
        if (res.statusCode !== 200) return reject(new Error(`download HTTP ${res.statusCode}`));
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => { fs.writeFileSync(dest, Buffer.concat(chunks)); resolve(); });
      }).on('error', reject);
    };
    get(url, 0);
  });
}

(async () => {
  for (const job of JOBS) {
    const dest = path.join(OUT, job.name + '.png');
    let ok = false;
    for (let attempt = 1; attempt <= 3 && !ok; attempt++) {
      try {
        console.log(`[${job.name}] generating (attempt ${attempt})…`);
        const r = await post({ model: 'agnes-image-2.1-flash', prompt: job.prompt, size: SIZE });
        if (r.status !== 200) throw new Error(`API HTTP ${r.status}: ${JSON.stringify(r.json).slice(0, 300)}`);
        const url = r.json.data?.[0]?.url;
        if (!url) throw new Error('no url in response: ' + JSON.stringify(r.json).slice(0, 300));
        await download(url, dest);
        const kb = Math.round(fs.statSync(dest).size / 1024);
        console.log(`[${job.name}] saved ${dest} (${kb} KB)`);
        ok = true;
      } catch (e) {
        console.error(`[${job.name}] ${e.message}`);
        if (attempt < 3) await new Promise((s) => setTimeout(s, 8000));
      }
    }
    if (!ok) { console.error(`[${job.name}] FAILED after 3 attempts`); process.exitCode = 1; }
  }
  console.log('DONE');
})();
