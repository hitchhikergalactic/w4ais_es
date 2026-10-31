W4AIS — Women For AI Safety
Astro site, deployed on Vercel (https://www.women4aisafety.com).

Pages
index.html — Home (src/pages/index.astro)
about.html — About us (src/pages/about.astro)
seminar.html — AI Safety Seminar (src/components/SeminarPage.astro)
session-*.html — One page per seminar session (src/content/sessions/*.md)
*-dark.html — Dark variants

Development: npm install, then npm run dev (Node 22.12+).
Build: npm run build → dist/. Vercel builds automatically on every push to main.

See CONTRIBUTING.md for conventions and how to add a session.
