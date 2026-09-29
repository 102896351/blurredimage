import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://img.toolbox168.xyz',
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
  ],
});
