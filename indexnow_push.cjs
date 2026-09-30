// IndexNow 推送脚本：读取 sitemap 全部 URL 并推送到 api.indexnow.org
// 用法: node indexnow_push.cjs
// 密钥文件 public/<KEY>.txt 需已部署到站点根目录供 IndexNow 验证。
const fs = require('fs');
const https = require('https');

const KEY = fs.readFileSync(__dirname + '/.indexnow_key', 'utf8').trim();
const HOST = 'toolbox168.com';
const SITEMAP = 'https://toolbox168.com/sitemap-0.xml';

function fetchUrls() {
  return new Promise((resolve, reject) => {
    https.get(SITEMAP, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let body = '';
      res.on('data', (c) => (body += c));
      res.on('end', () => {
        const urls = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
        resolve(urls);
      });
    }).on('error', reject);
  });
}

function postIndexNow(urls) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({ host: HOST, key: KEY, urlList: urls });
    const req = https.request(
      {
        hostname: 'api.indexnow.org',
        path: '/indexnow',
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8', 'Content-Length': Buffer.byteLength(payload) },
      },
      (res) => {
        let b = '';
        res.on('data', (c) => (b += c));
        res.on('end', () => resolve({ status: res.statusCode, body: b }));
      }
    );
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

(async () => {
  const urls = await fetchUrls();
  console.log(`sitemap 取到 ${urls.length} 条 URL`);
  const r = await postIndexNow(urls);
  console.log(`IndexNow 响应: HTTP ${r.status}`);
  console.log(r.body || '(空)');
  if (r.status === 200 || r.status === 202) console.log('✅ 全部 URL 已提交，Bing/Yandex/Seznam/Naver/Yep 将即时收录');
  else if (r.status === 429) console.log('⏳ 触发限流，稍后重试');
  else console.log('⚠️ 检查密钥文件是否已在站点根目录: /' + KEY + '.txt');
})();
