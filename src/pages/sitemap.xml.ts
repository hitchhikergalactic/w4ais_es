import type { APIRoute } from 'astro';
import { getSessions } from '../data/sessions';
import { SITE_URL } from '../data/site';

// Mismas URL que el sitemap anterior: portada, about, seminario y una por sesión (solo versiones claras).
export const GET: APIRoute = async () => {
  const sessions = await getSessions();
  const urls = [
    `${SITE_URL}/`,
    `${SITE_URL}/about.html`,
    `${SITE_URL}/seminar.html`,
    ...sessions.map((session) => `${SITE_URL}/session-${session.id}.html`),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${url}</loc></url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
