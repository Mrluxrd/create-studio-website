// robots.txt is generated so the sitemap always points at the confirmed origin.
import type { APIRoute } from 'astro';
import { PRODUCTION_ORIGIN } from '../data/site';

export const GET: APIRoute = () =>
  new Response(
    `User-agent: *
Allow: /

Sitemap: ${PRODUCTION_ORIGIN}/sitemap-index.xml
`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
