const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, 'dist');
let bad = [], noRobots = [], noindex = [];
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    const s = fs.statSync(p);
    if (s.isDirectory()) walk(p);
    else if (f === 'index.html') {
      const h = fs.readFileSync(p, 'utf8');
      const c = (h.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
      const r = (h.match(/<meta name="robots" content="([^"]*)"/) || [])[1];
      let rel = path.relative(ROOT, p).split(path.sep).join('/');
      let url = '/' + rel.replace(/\/index\.html$/, '/');
      if (url === '/index.html') url = '/';
      const full = 'https://toolbox168.com' + url;
      if (c && c !== full) bad.push({ p: rel, self: full, canon: c });
      if (!r && !h.includes('noindex')) noRobots.push(rel);
      if (h.includes('noindex')) noindex.push(rel);
    }
  }
}
walk(ROOT);
console.log('=== canonical 指向别处 ===');
bad.forEach(b => console.log(b.p, '\n  self :', b.self, '\n  canon:', b.canon));
console.log('共', bad.length, '个');
console.log('=== 无 robots meta 且无 noindex ===');
noRobots.forEach(p => console.log(p));
console.log('共', noRobots.length, '个');
console.log('=== 带 noindex 总数 ===');
console.log(noindex.length);
