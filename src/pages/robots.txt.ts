import type { APIRoute } from 'astro';
// this generates a robots.txt file, including the generated sitemap. The site property within astro.config.mjs needs to be set to your site's URL.

const robotsTxt = `
User-agent: *
Allow: /

Sitemap: ${new URL('sitemap-index.xml', import.meta.env.SITE).href}
`.trim();

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
