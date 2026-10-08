# Panarius Website

Sito vetrina di **Panarius**, prodotto da **Officine Donnarumma**.

Il progetto è stato esportato da Manus e ripulito dalle dipendenze specifiche della piattaforma, in modo da poter essere gestito e pubblicato direttamente da GitHub.

## Stack

- React 19
- TypeScript
- Vite 7
- Tailwind CSS 4
- Express per il serving della build di produzione
- pnpm

## Requisiti

- Node.js 20 o successivo
- pnpm 10

## Avvio locale

```bash
pnpm install
pnpm dev
```

Il sito viene avviato normalmente su `http://localhost:3000`.

## Build

Build completa, comprensiva del server Express:

```bash
pnpm build
pnpm start
```

Per hosting statici come Cloudflare Pages è disponibile:

```bash
pnpm build:pages
```

La directory generata dal frontend è `dist/public`.

## Asset

Le immagini pubbliche sono in `client/public/assets`.

Nel progetto Manus alcune fotografie erano disponibili esclusivamente tramite `/manus-storage`. Questi riferimenti sono stati rimossi per rendere il repository indipendente da Manus. In attesa delle immagini definitive:

- la hero utilizza `officine-hero-fabrication.jpg`;
- le quattro card prodotto utilizzano `panarius-shop-source.webp`;
- il logo utilizza `officine-donnarumma-logo.png`.

Quando saranno disponibili le fotografie definitive delle quattro varianti, è consigliato salvarle in `client/public/assets` e aggiornare i riferimenti in `client/src/pages/Home.tsx`.

## Marketplace

I link Amazon ed eBay sono volutamente lasciati vuoti in `client/src/pages/Home.tsx`. Inserire gli URL ufficiali in `purchaseLinks` prima della pubblicazione.

## SEO

Sono già presenti:

- `client/public/robots.txt`
- `client/public/sitemap.xml`

Entrambi fanno riferimento a `https://officinedonnarumma.it/`.

## Repository

Repository previsto: `officinedonnarumma/Panarius-website`.
