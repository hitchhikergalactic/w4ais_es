// Función de Vercel que lanza un redespliegue de la web. La llama cada día el cron de vercel.json.
// Al redesplegar, el build vuelve a leer Luma (scripts/update-events.mjs): aparecen los eventos nuevos
// y los eventos pasados de los capítulos se mueven a «Past events».
//
// Variables de entorno en Vercel (Settings → Environment Variables):
// - DEPLOY_HOOK_URL: URL del Deploy Hook de la rama main (Settings → Git → Deploy Hooks). Es secreta.
// - CRON_SECRET: cualquier texto largo y aleatorio. Vercel lo envía en las llamadas del cron,
//   así nadie más puede lanzar redespliegues llamando a esta URL.

export async function GET(request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return new Response('Unauthorized', { status: 401 });
  }
  const hook = process.env.DEPLOY_HOOK_URL;
  if (!hook) return new Response('DEPLOY_HOOK_URL no está configurada', { status: 500 });
  const response = await fetch(hook, { method: 'POST' });
  return new Response(response.ok ? 'Redespliegue lanzado' : `El Deploy Hook respondió ${response.status}`, {
    status: response.ok ? 200 : 502,
  });
}
