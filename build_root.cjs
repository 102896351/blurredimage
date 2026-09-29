const { spawnSync } = require('child_process');
const path = require('path');
const ROOT = __dirname;
const astro = path.join(ROOT, 'node_modules', 'astro', 'astro.js');
const r = spawnSync(process.execPath, [astro, 'build'], {
  cwd: ROOT,
  stdio: 'inherit',
  env: { ...process.env, CODEBUDDY_SAFE_DELETE_ENABLED: '0', MSYS_NO_PATHCONV: '1' },
});
process.exit(r.status ?? 1);
