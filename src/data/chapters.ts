import { getCollection, type CollectionEntry } from 'astro:content';
import type { Theme } from './site';

export type Chapter = CollectionEntry<'chapters'>;
export type ChapterEvent = Chapter['data']['events'][number];

export async function getChapters(): Promise<Chapter[]> {
  const chapters = await getCollection('chapters');
  return chapters.sort((a, b) => a.data.order - b.data.order);
}

// Cada capítulo tiene versión clara (chapter-x.html) y oscura (chapter-x-dark.html).
export function chapterHref(chapter: Chapter, theme: Theme = 'light'): string {
  return `chapter-${chapter.id}${theme === 'dark' ? '-dark' : ''}.html`;
}

// Fecha de hoy en Madrid (AAAA-MM-DD). Los eventos de hoy siguen contando como próximos.
// La web es estática: un evento pasa a «Past events» en el siguiente despliegue tras su fecha.
const today = () => new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Madrid' });

export function splitEvents(events: ChapterEvent[]) {
  const sorted = [...events].sort((a, b) => a.isoDate.localeCompare(b.isoDate));
  const t = today();
  return {
    upcoming: sorted.filter((e) => e.isoDate >= t),
    past: sorted.filter((e) => e.isoDate < t).reverse(),
  };
}
