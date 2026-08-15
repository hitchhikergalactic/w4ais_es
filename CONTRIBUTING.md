# Contributing

Guía breve de convenciones del sitio, para mantener consistencia entre páginas.

## Páginas en modo oscuro (`*-dark.html`)

Toda página con sufijo `-dark.html` debe llevar en su `<head>`, justo debajo del `<title>`, una etiqueta `<link rel="canonical">` apuntando a la URL absoluta (con `www`, `https://www.women4aisafety.com/...`) de su versión clara equivalente:

```html
<title>Título de la página (dark)</title>
<link rel="canonical" href="https://www.women4aisafety.com/pagina.html">
```

Ejemplos actuales:

| Página dark | Canonical |
|---|---|
| `home-dark.html` | `https://www.women4aisafety.com/` |
| `seminar-dark.html` | `https://www.women4aisafety.com/seminar.html` |
| `session-johanna-angulo-dark.html` | `https://www.women4aisafety.com/session-johanna-angulo.html` |

Esto evita contenido duplicado en el índice de Google: Search Console consolida la página dark bajo la clara en lugar de tratarlas como dos URLs distintas compitiendo por el mismo contenido.

Por el mismo motivo, ninguna página dark lleva metadatos SEO propios (`meta description`, `og:*`, `twitter:*`, JSON-LD). No es contenido indexable independiente — es solo el toggle 🌙 de la página clara, así que hereda semánticamente los metadatos de esta última.

## Dominio canónico

Todas las URLs absolutas del sitio (canonical tags, `sitemap.xml`, la línea `Sitemap:` de `robots.txt`, JSON-LD) usan el dominio con `www`: `https://www.women4aisafety.com/`. No mezclar con la variante sin `www`.

## `sitemap.xml`

Solo incluye páginas canónicas e indexables (las que tienen su propio `<link rel="canonical">` y metadatos SEO): `index.html`, `about.html`, `seminar.html`, `session-johanna-angulo.html` y cualquier página de sesión futura equivalente. Las páginas `*-dark.html` quedan fuera por la razón explicada arriba.

## Datos estructurados (JSON-LD)

`index.html` incluye `Organization` y `EventSeries`. Para el seminario recurrente se usa `EventSeries` en vez de `Event`: `Event` exige una `startDate` concreta, y las próximas fechas de sesión suelen estar como "Date TBA" en `seminar.html`. `EventSeries` no requiere fecha fija, así que evita inventar datos falsos en el schema.

## Commits

Los commits de este repo usan el email noreply de GitHub para el autor, en vez de un email personal o el autogenerado por el sistema:

```
163174714+hitchhikergalactic@users.noreply.github.com
```

Configurado con `git config --global user.email`. Evita el rechazo de GitHub (`GH007: push would publish a private email address`) sin depender de verificar un email personal en la cuenta.
