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

Con eso se generan solos `session-jane-doe.html` y su versión oscura `session-jane-doe-dark.html`, su tarjeta en `seminar.html` y `seminar-dark.html`, su entrada en `sitemap.xml` y su tarjeta en el bloque «More sessions» de las demás sesiones. Ese bloque muestra siempre todas las demás sesiones, en el orden del campo `order`, seguidas de la tarjeta «Coming soon».

Las fechas se escriben con el formato `Wednesday, 12 August 2026` en `date` y `Wednesday, 12 August` en `cardDate`.

## Páginas en modo oscuro (`*-dark.html`)

Cada página tiene una versión oscura a la que se llega con el botón 🌙: `home-dark.html` (portada), `about-dark.html`, `seminar-dark.html` y `session-<slug>-dark.html`. Las dos versiones salen del mismo componente (`HomePage`, `AboutPage`, `SeminarPage`, `SessionPage`) con `theme="light"` o `theme="dark"`, así que tienen siempre el mismo texto; solo cambian los colores. Dentro del modo oscuro, el menú y los enlaces llevan a las versiones oscuras de las demás páginas.

Toda página oscura lleva una etiqueta `<link rel="canonical">` hacia la URL absoluta de su versión clara, y ningún metadato SEO propio (`meta description`, `og:*`, `twitter:*`, JSON-LD). `Base.astro` lo hace automáticamente cuando la página no recibe `seo`. Así Search Console consolida la página oscura bajo la clara en lugar de tratarlas como dos URL distintas con el mismo contenido.

## Tipografía

Todo el sitio usa Overpass (pesos 400 a 800), cargada desde Google Fonts en `src/layouts/Base.astro`.

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
