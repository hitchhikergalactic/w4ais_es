// Colores de la etiqueta de categoría de cada sesión.
// «card» es la tarjeta de seminar.html; «more» la tarjeta pequeña de «More sessions».
export const categories = {
  'Technical research': {
    light: { color: '#3f56a1', card: '#f2f5fe', more: '#eef2fe' },
    dark: { color: '#bac9fc', card: '#2a3050', more: '#2a3050' },
  },
  'Governance & policy': {
    light: { color: '#8a5a3f', card: '#fbeee2', more: '#fbeee2' },
    dark: { color: '#f6b98a', card: '#4a3226', more: '#4a3226' },
  },
  Career: {
    light: { color: '#6a4c9c', card: '#f1ecf9', more: '#f1ecf9' },
    dark: { color: '#d3c2f0', card: '#352c48', more: '#352c48' },
  },
} as const;

export type Category = keyof typeof categories;
