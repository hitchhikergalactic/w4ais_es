# Contributing

Guía breve de convenciones del sitio, para mantener la coherencia entre páginas.

## Estructura

El sitio está hecho con [Astro](https://astro.build) y se publica en Vercel, que lo compila solo con cada cambio en `main`.

| Ruta | Qué contiene |
|---|---|
| `src/pages/` | Una página por fichero: `index.astro` → `index.html`, `about.astro` → `about.html`, etc. |
| `src/content/sessions/` | Una sesión del seminario por fichero Markdown |
| `src/components/` | Partes compartidas: menú (`Nav`), pie (`Footer`), bloque «Shape safe AI» (`JoinCta`), patrocinio (`Sponsor`), páginas de sesión y del seminario |
| `src/layouts/Base.astro` | `<head>` común: metadatos, fuentes y estilos base |
| `src/data/` | Datos compartidos: URL del sitio, enlaces de Luma y Airtable, colores de las categorías |
| `public/` | Imágenes, PDF y `robots.txt`; se publican tal cual en la raíz del sitio |

Para ver el sitio en local hace falta Node 22.12 o superior:

```
npm install
npm run dev
```

`npm run build` genera el sitio en `dist/`; es lo mismo que ejecuta Vercel.

## Añadir una sesión del seminario

1. Copia `src/content/sessions/_plantilla.md` con el slug de la ponente como nombre, por ejemplo `jane-doe.md`. Los ficheros que empiezan por `_` no se publican.
2. Rellena los campos de la cabecera; cada uno está explicado en `src/content.config.ts`. Si falta un campo obligatorio o tiene un formato incorrecto, la compilación falla e indica cuál es.
3. Escribe el texto de la sesión debajo de la cabecera, separando los párrafos con una línea en blanco.
4. Sube la foto (y el PDF de las diapositivas, si lo hay) a `public/`.

Con eso se generan solos `session-jane-doe.html`, su tarjeta en `seminar.html` y `seminar-dark.html`, y su entrada en `sitemap.xml`. El bloque «More sessions» de cada página muestra las sesiones que se indiquen en su campo `moreSessions`, en ese orden, seguidas de la tarjeta «Coming soon».

## Páginas en modo oscuro (`*-dark.html`)

Las versiones oscuras son páginas aparte a las que se llega con el botón 🌙. `seminar-dark.html` y las de sesión salen de los mismos componentes que su versión clara, con `theme="dark"`; una sesión tiene versión oscura si su fichero lleva `dark: true`. `home-dark.html` es una página propia (`src/pages/home-dark.astro`) porque algunos de sus textos y secciones no coinciden con los de `index.html`.

Toda página oscura lleva una etiqueta `<link rel="canonical">` hacia la URL absoluta de su versión clara, y ningún metadato SEO propio (`meta description`, `og:*`, `twitter:*`, JSON-LD). `Base.astro` lo hace automáticamente cuando la página no recibe `seo`. Así Search Console consolida la página oscura bajo la clara en lugar de tratarlas como dos URL distintas con el mismo contenido.

## Dominio canónico

Todas las URL absolutas del sitio (canonical, `sitemap.xml`, la línea `Sitemap:` de `robots.txt`, JSON-LD) usan el dominio con `www`: `https://www.women4aisafety.com/`. Está definido una sola vez en `src/data/site.ts`. `women4aisafety.com` redirige a la versión con `www` (`vercel.json`).

## `sitemap.xml`

Lo genera `src/pages/sitemap.xml.ts`. Incluye solo las páginas canónicas e indexables: `index.html`, `about.html`, `seminar.html` y las versiones claras de las sesiones. Las páginas `*-dark.html` quedan fuera por la razón explicada arriba.

## Datos estructurados (JSON-LD)

`index.html` incluye `Organization` y `EventSeries`. Para el seminario recurrente se usa `EventSeries` en vez de `Event`: `Event` exige una `startDate` concreta, y las próximas fechas de sesión no siempre están confirmadas. `EventSeries` no requiere fecha fija, así que evita inventar datos en el schema.

## Commits

Los commits de este repo usan el email noreply de GitHub para el autor, en vez de un email personal o el autogenerado por el sistema:

```
163174714+hitchhikergalactic@users.noreply.github.com
```

Configurado con `git config --global user.email`. Evita el rechazo de GitHub (`GH007: push would publish a private email address`) sin depender de verificar un email personal en la cuenta.
