/**
 * robots.txt is generated so the sitemap always points at the confirmed origin.
 *
 * Until PUBLIC_SITE_ORIGIN is set, the build has no confirmed domain — it is a
 * preview, not the live site — so it asks crawlers to stay away. That keeps a
 * temporary branch preview from being indexed. Setting the real origin flips
 * this to the normal production robots.txt with no other change.
 */
import type { APIRoute } from 'astro';
import { PRODUCTION_ORIGIN, ORIGIN_IS_PLACEHOLDER } from '../data/site';

const previewRobots = `# No production domain is configured for this build, so it is treated as a
# preview and excluded from search engines. Set PUBLIC_SITE_ORIGIN to publish.
User-agent: *
Disallow: /
`;

const productionRobots = `User-agent: *
Allow: /

Sitemap: ${PRODUCTION_ORIGIN}/sitemap-index.xml
`;

export const GET: APIRoute = () =>
  new Response(ORIGIN_IS_PLACEHOLDER ? previewRobots : productionRobots, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
