import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { categories } from './data/categories';

// Una sesión del seminario = un fichero Markdown en src/content/sessions/.
// El nombre del fichero es el slug: jane-doe.md → session-jane-doe.html.
const sessions = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/sessions' }),
  schema: z.object({
    // Posición en el listado del seminario (1 = primera).
    order: z.number().int(),
    title: z.string(),
    category: z.enum(Object.keys(categories) as [keyof typeof categories, ...(keyof typeof categories)[]]),
    // Frase bajo el título en la página de la sesión.
    subtitle: z.string(),
    // Texto de la tarjeta en seminar.html.
    summary: z.string(),
    // «Nombre on tema», sin punto final: genera la meta description y og:description.
    metaSummary: z.string(),
    speaker: z.string(),
    // Nombre del fichero de la foto en public/.
    photo: z.string(),
    linkedin: z.string().url(),
    // Fecha tal como se muestra en la página de la sesión.
    date: z.string(),
    // Fecha tal como se muestra en las tarjetas.
    cardDate: z.string(),
    // ID del vídeo de YouTube (lo que va detrás de youtube.com/embed/). Si no hay grabación, se omite.
    youtube: z.string().optional(),
    // Fichero PDF en public/ o URL externa. Si no hay diapositivas, se omite.
    slides: z.string().optional(),
    // Separación en píxeles entre párrafos del texto de la sesión.
    paragraphGap: z.number().default(20),
    // true genera también session-<slug>-dark.html y el botón 🌙 en la página clara.
    dark: z.boolean().default(false),
    // Slugs de las sesiones que se muestran en «More sessions», en orden.
    moreSessions: z.array(z.string()).default([]),
  }),
});

export const collections = { sessions };
