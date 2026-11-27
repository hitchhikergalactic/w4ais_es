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
    // Línea bajo el nombre en la tarjeta de la ponente (cargo, organización). Opcional.
    speakerRole: z.string().optional(),
    // Nombre del fichero de la foto en public/. Si falta, la tarjeta muestra las iniciales.
    photo: z.string().optional(),
    // Si falta, no se muestra el icono de LinkedIn.
    linkedin: z.string().url().optional(),
    // Web personal de la ponente. Opcional: se muestra como «Follow her work and get in touch».
    website: z.string().url().optional(),
    // Nota sobre grabación/diapositivas cuando no hay vídeo o PDF (cada ponente decide qué se comparte).
    sharingNote: z.string().optional(),
    // Fecha tal como se muestra en la página de la sesión.
    date: z.string(),
    // Fecha tal como se muestra en las tarjetas.
    cardDate: z.string(),
    // ID del vídeo de YouTube (lo que va detrás de youtube.com/embed/). Si no hay grabación, se omite.
    youtube: z.string().optional(),
    // Fichero PDF en public/ o URL externa. Si no hay diapositivas, se omite.
    slides: z.string().optional(),
    // true = no sale en la fila «Women who have spoken» de la portada (la página de la sesión sigue existiendo).
    hideFromSpeakers: z.boolean().default(false),
    // Separación en píxeles entre párrafos del texto de la sesión.
    paragraphGap: z.number().default(20),
  }),
});

// Un capítulo local = un fichero Markdown en src/content/chapters/.
// El nombre del fichero es el slug: madrid.md → chapter-madrid.html.
// El texto del fichero es la presentación del capítulo; los eventos van en el frontmatter.
const chapters = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/chapters' }),
  schema: z.object({
    order: z.number().int(),
    city: z.string(),
    country: z.string(),
    // Idioma en el que se hacen los encuentros.
    language: z.string(),
    // Frase de la tarjeta en chapters.html y bajo el título del capítulo.
    summary: z.string(),
    events: z.array(
      z.object({
        title: z.string(),
        // Traducción del título si el evento no es en inglés.
        titleEn: z.string().optional(),
        // Título corto en inglés para la tarjeta de la portada (no una traducción literal).
        headlineEn: z.string().optional(),
        // Imagen cuadrada de la tarjeta de la portada (en public/). Si falta, se usa la portada de Luma.
        image: z.string().optional(),
        // Fecha ISO (AAAA-MM-DD): sirve para ordenar y para separar próximos de pasados.
        isoDate: z.string(),
        date: z.string(),
        time: z.string(),
        doors: z.string().optional(),
        venue: z.string(),
        address: z.string(),
        format: z.string(),
        luma: z.string().url(),
        hosts: z.array(z.string()).default([]),
        support: z.array(z.string()).default([]),
        agenda: z.array(z.object({ time: z.string(), item: z.string() })).default([]),
        // Párrafos de la descripción.
        about: z.array(z.string()).default([]),
        // Fotos del evento ya celebrado. Cada una en public/ en dos tamaños: «x.jpg» (1600 px) y «x-sm.jpg» (800 px).
        // Los ficheros se publican con caché de 30 días: si cambias una foto, usa un nombre nuevo en lugar de sobrescribir el anterior.
        // size: «large» ocupa 2×2 casillas de la galería y «wide» 2×1; si se omite, 1×1.
        // Si hay fotos, la página del capítulo muestra la galería del último evento pasado.
        photos: z.array(z.object({
          src: z.string(),
          alt: z.string(),
          size: z.enum(['large', 'wide']).optional(),
        })).default([]),
        // Autoría de las fotos, se muestra bajo la galería.
        photoCredit: z.string().optional(),
        // Resumen breve del encuentro para encabezar la galería.
        recap: z.string().optional(),
      }),
    ),
  }),
});

export const collections = { sessions, chapters };
