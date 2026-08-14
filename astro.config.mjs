// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The production origin is centralised so it can be confirmed before deploy.
// Set PUBLIC_SITE_ORIGIN in the deployment environment (see .env.example).
const SITE = process.env.PUBLIC_SITE_ORIGIN || 'https://PRODUCTION-DOMAIN.example';

export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'never',
  build: {
    // Real files per route: /work/joan-leonardo.html rather than a directory
    // index, so direct route loading works on any static host.
    format: 'file',
    inlineStylesheets: 'auto',
  },
  devToolbar: { enabled: false },
  integrations: [sitemap()],
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
