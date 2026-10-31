// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.women4aisafety.com',
  build: {
    // Genera about.html, seminar.html, session-x.html… para conservar las URL que ya están indexadas.
    format: 'file',
    // Todo el CSS va dentro de cada página, como en la versión anterior en HTML plano.
    inlineStylesheets: 'always',
  },
  markdown: {
    // Sin comillas tipográficas automáticas: el texto de las sesiones se publica tal como está escrito.
    smartypants: false,
  },
});
