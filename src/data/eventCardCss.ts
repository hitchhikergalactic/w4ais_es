// Estilos de EventCard.astro. Las páginas que usan la tarjeta los pasan a Base en «css».
export const eventCardCss = `
.sep{display:inline-block;width:4px;height:4px;border-radius:50%;background:currentColor;margin:0 9px;vertical-align:middle;opacity:.8}
.event-card{border:1px solid oklch(0.88 0.005 80);border-radius:24px;overflow:hidden;background:#fff}
.event-card.dark{border-color:#3a3532;background:#292522}
.event-top{position:relative;isolation:isolate;display:flex;gap:22px;align-items:center;padding:28px;color:#fff;
  background:radial-gradient(120% 120% at 0% 0%,#ef8a55 0%,transparent 60%),radial-gradient(110% 120% at 100% 100%,#6d63e8 0%,transparent 62%),linear-gradient(135deg,#e88a6a 0%,#d98aa6 45%,#a983d0 75%,#7a6be0 100%)}
.event-top::before{content:"";position:absolute;inset:0;z-index:-1;opacity:.5;mix-blend-mode:overlay;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
.event-date{flex:none;width:84px;border-radius:16px;background:#fff;color:#3f56a1;text-align:center;overflow:hidden;box-shadow:0 10px 26px rgba(60,30,120,.3)}
.event-date span{display:block;background:#3b5bdb;color:#fff;font-size:13px;font-weight:800;letter-spacing:.12em;padding:6px 0}
.event-date strong{display:block;font-size:38px;line-height:1;font-weight:800;padding:10px 0 12px}
.event-kicker{font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;opacity:.95;margin-bottom:6px}
.event-title{margin:0;font-size:26px;line-height:1.15;font-weight:800;text-shadow:0 2px 14px rgba(70,30,110,.25)}
.event-title-en{margin:8px 0 0;font-size:15px;font-weight:600;line-height:1.4;opacity:.95}
.event-body{display:grid;grid-template-columns:1.2fr .8fr;gap:32px;padding:28px}
.event-facts{display:grid;grid-template-columns:max-content 1fr;gap:10px 18px;margin:0 0 24px;font-size:15px;line-height:1.5}
.event-facts dt{font-size:12px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:#3f56a1;padding-top:3px}
.event-facts dd{margin:0;font-weight:600;color:oklch(0.3 0.01 260)}
.event-facts a{color:inherit;text-decoration:underline;text-underline-offset:3px}
.event-card .muted{font-weight:500;color:oklch(0.5 0.01 260)}
.event-btn{display:inline-block;text-decoration:none;font-weight:700;font-size:15px;color:#fff;background:#3f56a1;padding:13px 24px;border-radius:999px}
.event-btn.ghost{background:none;color:oklch(0.5 0.01 260);border:1.5px solid oklch(0.85 0.005 80)}
.event-agenda{list-style:none;margin:0;padding:0 0 0 18px;border-left:2px solid #d9cdf3;display:flex;flex-direction:column;gap:14px}
.event-agenda li{position:relative;font-size:15px;font-weight:600;color:oklch(0.3 0.01 260)}
.event-agenda li::before{content:"";position:absolute;left:-25px;top:6px;width:10px;height:10px;border-radius:50%;background:#7a6be0;box-shadow:0 0 0 3px #fff}
.event-agenda li span{display:block;font-size:13px;font-weight:800;color:#3f56a1;letter-spacing:.04em}
.event-about{padding:0 28px 28px;border-top:1px solid oklch(0.92 0.005 80)}
.event-about p{font-size:16px;line-height:1.7;color:oklch(0.35 0.01 260);margin:18px 0 0}
.event-card.dark .event-facts dt,.event-card.dark .event-agenda li span{color:#8fa7fa}
.event-card.dark .event-facts dd,.event-card.dark .event-agenda li{color:#efe9e2}
.event-card.dark .muted{color:#948c7d}
.event-card.dark .event-agenda{border-color:#4a4060}
.event-card.dark .event-agenda li::before{box-shadow:0 0 0 3px #292522}
.event-card.dark .event-about{border-color:#3a3532}
.event-card.dark .event-about p{color:#b3ac9f}
.event-card.dark .event-btn{border-radius:6px}
.event-card.dark .event-btn.ghost{color:#948c7d;border-color:#3a3532}
.event-card.past .event-top{filter:saturate(.55)}
@media (max-width:800px){.event-body{grid-template-columns:1fr}.event-top{flex-direction:column;align-items:flex-start}.event-title{font-size:22px}}
`;
