export const SITE_URL = 'https://www.women4aisafety.com';
export const OG_IMAGE = `${SITE_URL}/logo_color_cropped.png`;
export const LUMA_URL = 'https://luma.com/Women4AISafety';
export const JOIN_FORM_URL = 'https://airtable.com/app9fza9uUIvEEUrC/shrP2p2RewK8Y0kim';
export const GRADIENT =
  'radial-gradient(circle at 15% 85%, #f2a259 0%, transparent 45%), radial-gradient(circle at 85% 15%, #ae9ad5 0%, transparent 50%), linear-gradient(135deg, #d6897f 0%, #d6b39f 35%, #b380b8 100%)';

export type Theme = 'light' | 'dark';

// Enlace interno que mantiene el modo: en oscuro lleva a la versión oscura de la página.
// La portada oscura conserva su URL histórica, home-dark.html.
export function pageHref(page: 'index' | 'about' | 'seminar', theme: Theme = 'light', hash = ''): string {
  const file = theme === 'dark' ? (page === 'index' ? 'home-dark' : `${page}-dark`) : page;
  return `${file}.html${hash}`;
}

// Menú común a todas las páginas.
export function navLinks(theme: Theme = 'light', onHome = false) {
  const home = onHome ? '' : pageHref('index', theme);
  return [
    { href: `${home}#why`, label: 'Why it matters' },
    { href: `${home}#what`, label: 'What we do' },
    { href: pageHref('seminar', theme), label: 'Seminars' },
    { href: pageHref('about', theme), label: 'About us' },
  ];
}
