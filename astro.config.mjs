import fs from 'node:fs';
import path from 'node:path';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// GitHub Pages deploys this site under a subpath (e.g. /blurredimage).
// Set PAGES_BASE=/blurredimage for the Pages build; production (root) builds leave it unset.
const base = (process.env.PAGES_BASE || '/').replace(/\/+$/, '');
const onPages = base !== '' && base !== '/';

/**
 * Astro's `base` only rewrites URLs it generates itself. Hand-written absolute
 * paths in templates/content (href="/blog", src="/img/...") and in CSS
 * (url('/img/...')) are patched here after the build. Canonical/og/hreflang
 * URLs are absolute (https://img.toolbox168.xyz/...) and intentionally left
 * pointing at the production domain so the Pages mirror never outranks it.
 */
function rewriteAbsolutePaths(prefix) {
  return {
    name: 'rewrite-absolute-paths',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        // Astro's own `base` already prefixes /_astro/* links and CSS url()s.
        // Skip anything that already carries the prefix to avoid double-prefixing.
        // Lookahead runs AFTER the leading "/" is consumed, so the skip list is
        // "/" (protocol-relative //) and the bare prefix name without its slash.
        const bare = prefix.replace(/^\/+/, '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const skip = `\\/|${bare}(?=["')/])`;
        const attrRe = new RegExp(`(\\s(?:href|src|srcset|poster)=")(\\/(?!${skip})[^"]*)`, 'g');
        const cssRe = new RegExp(`(url\\((['"]?))\\/(?!${skip})`, 'g');
        let files = 0, hits = 0;
        const walk = (d) => {
          for (const f of fs.readdirSync(d, { withFileTypes: true })) {
            const fp = path.join(d, f.name);
            if (f.isDirectory()) { walk(fp); continue; }
            if (!/\.(html|css)$/.test(f.name)) continue;
            const src = fs.readFileSync(fp, 'utf8');
            let out = src, n = 0;
            if (f.name.endsWith('.html')) {
              out = src.replace(attrRe, (m, a, v) => {
                // srcset may hold several candidates: "url 1x, url 2x"
                if (/^srcset/i.test(a.trim())) {
                  const fixed = v.slice(1, -1).split(',').map((part) => {
                    const t = part.trim();
                    return t.startsWith('/') && !t.startsWith('//') ? prefix + t : t;
                  }).join(', ');
                  n++; return a + '"' + fixed + '"';
                }
                n++; return a + prefix + v;
              });
            } else {
              out = src.replace(cssRe, (m, a) => { n++; return a + prefix + '/'; });
            }
            if (n > 0) { fs.writeFileSync(fp, out); files++; hits += n; }
          }
        };
        walk(dir.pathname.replace(/^\/([A-Za-z]:\/)/, '$1')); // file:///C:/ -> C:/
        logger.info(`rewrite-absolute-paths: prefixed ${hits} URLs with ${prefix} in ${files} files`);
      },
    },
  };
}

export default defineConfig({
  site: 'https://img.toolbox168.xyz',
  base,
  integrations: [
    sitemap({
      // Tag archives are noindex (thin listings) — keep them out of the sitemap
      // so Search Console does not report "submitted, but noindexed" errors.
      filter: (page) =>
        !page.includes('/blog/tags/') &&
        !page.includes('/404') &&
        !page.includes('/media/') &&
        !page.includes('/tool-placeholder'),
    }),
    ...(onPages ? [rewriteAbsolutePaths(base)] : []),
  ],
});
