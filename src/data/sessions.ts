import { getCollection, type CollectionEntry } from 'astro:content';
import type { Theme } from './site';

export type Session = CollectionEntry<'sessions'>;

export async function getSessions(): Promise<Session[]> {
  const sessions = await getCollection('sessions');
  return sessions.sort((a, b) => a.data.order - b.data.order);
}

// En la versión oscura se enlaza a la página oscura de la sesión si existe; si no, a la clara.
export function sessionHref(session: Session, theme: Theme = 'light'): string {
  const dark = theme === 'dark' && session.data.dark;
  return `session-${session.id}${dark ? '-dark' : ''}.html`;
}
