// Función de Vercel servida en /next-seminar (ver «rewrites» en vercel.json).
// Redirige a la página de Luma del próximo seminario, sin tener que tocar el código
// tras cada sesión. Si algo falla, redirige al calendario de Luma.
//
// Cómo elige el evento: lee los eventos que Luma incluye en el HTML del calendario
// y se queda con el primero que (1) pertenece al propio calendario de Women4AISafety
// (así descarta los eventos de otros calendarios que aparecen destacados en él) y
// (2) todavía no ha terminado (así sigue enlazando al evento mientras se celebra).

const CALENDAR_URL = 'https://luma.com/Women4AISafety';

// Vercel guarda la redirección en su CDN: Luma recibe como mucho una petición cada 15 minutos.
const CACHE_OK = 'public, s-maxage=900, stale-while-revalidate=86400';
const CACHE_FALLBACK = 'public, s-maxage=60';

function redirect(location, cache) {
  return new Response(null, { status: 302, headers: { Location: location, 'Cache-Control': cache } });
}

export function pickNextSeminar(html, now = Date.now()) {
  const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
  if (!match) return null;
  const data = JSON.parse(match[1])?.props?.pageProps?.initialData?.data;
  const calendarId = data?.calendar?.api_id;
  const items = Array.isArray(data?.featured_items) ? data.featured_items : [];
  const upcoming = items
    .map((item) => item?.event)
    .filter((event) => event?.url && event.calendar_api_id === calendarId)
    .filter((event) => Date.parse(event.end_at ?? event.start_at) > now)
    .sort((a, b) => Date.parse(a.start_at) - Date.parse(b.start_at));
  return upcoming.length ? `https://luma.com/${upcoming[0].url}` : null;
}

export async function GET() {
  try {
    const response = await fetch(CALENDAR_URL, {
      headers: { 'User-Agent': 'women4aisafety.com next-seminar redirect' },
      signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) throw new Error(`Luma respondió ${response.status}`);
    const next = pickNextSeminar(await response.text());
    return next ? redirect(next, CACHE_OK) : redirect(CALENDAR_URL, CACHE_OK);
  } catch (error) {
    console.error('next-seminar:', error);
    return redirect(CALENDAR_URL, CACHE_FALLBACK);
  }
}
