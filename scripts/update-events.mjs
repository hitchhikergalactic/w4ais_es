// Guarda los próximos eventos del calendario de Luma de W4AIS en src/data/events.json.
// Lo ejecuta cada día .github/workflows/update-events.yml; si Luma falla, el archivo se queda como estaba.
// Basado en scripts/actualizar-eventos.mjs de aisafety.es.
//
// Se lee la página pública del calendario (no hace falta la API de pago de Luma).
// Entran los eventos creados en el calendario y también los destacados en él (por ejemplo, el de Madrid),
// porque son los que el propio calendario de W4AIS muestra.
import { readFileSync, writeFileSync } from 'node:fs';

const CALENDAR = 'cal-XhJ7azfTJM4lIWV';
const PAGE = 'https://luma.com/Women4AISafety';
const TARGET = new URL('../src/data/events.json', import.meta.url);

const response = await fetch(PAGE, { headers: { 'User-Agent': 'Mozilla/5.0 (women4aisafety.com)' } });
if (!response.ok) throw new Error(`Luma respondió ${response.status}`);
const html = await response.text();
const json = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/)?.[1];
if (!json) throw new Error('La página de Luma no trae los datos del calendario');
const data = JSON.parse(json)?.props?.pageProps?.initialData?.data;
if (data?.calendar?.api_id !== CALENDAR) throw new Error('La página no corresponde al calendario de W4AIS');

// Los eventos están repartidos en varias listas (próximos, destacados…): se recorren todas y se quitan duplicados.
const seen = new Map();
const walk = (node) => {
  if (Array.isArray(node)) return node.forEach(walk);
  if (!node || typeof node !== 'object') return;
  const ev = node.event;
  if (ev && typeof ev === 'object' && ev.start_at && ev.api_id && !seen.has(ev.api_id)) seen.set(ev.api_id, ev);
  Object.values(node).forEach(walk);
};
walk(data);

const now = Date.now();
const events = [...seen.values()]
  .filter((ev) => ev.visibility === 'public')
  .filter((ev) => new Date(ev.end_at ?? ev.start_at).getTime() > now)
  .map((ev) => {
    const place = ev.geo_address_info ?? {};
    const inPerson = ev.location_type === 'offline';
    return {
      id: ev.api_id,
      name: ev.name.trim(),
      url: `https://luma.com/${ev.url}`,
      start: ev.start_at,
      end: ev.end_at ?? null,
      timezone: ev.timezone ?? 'Europe/Madrid',
      inPerson,
      city: inPerson ? (place.city ?? null) : null,
      venue: inPerson ? (place.address ?? null) : null,
    };
  })
  .sort((a, b) => a.start.localeCompare(b.start));

const next = `${JSON.stringify(events, null, 2)}\n`;
let current = '';
try { current = readFileSync(TARGET, 'utf8'); } catch {}
if (next === current) {
  console.log('Sin cambios en los eventos.');
} else {
  writeFileSync(TARGET, next);
  console.log(`Próximos eventos: ${events.length}`);
  events.forEach((e) => console.log(`- ${e.start} ${e.name}`));
}
