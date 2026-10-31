import { getCollection, type CollectionEntry } from 'astro:content';
import type { Theme } from './site';

export type Session = CollectionEntry<'sessions'>;

export async function getSessions(): Promise<Session[]> {
  const sessions = await getCollection('sessions');
  return sessions.sort((a, b) => a.data.order - b.data.order);
}

// Cada sesión tiene versión clara (session-x.html) y oscura (session-x-dark.html).
export function sessionHref(session: Session, theme: Theme = 'light'): string {
  return `session-${session.id}${theme === 'dark' ? '-dark' : ''}.html`;
}
