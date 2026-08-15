# Pubblicazione su Cloudflare Pages

Il progetto è un sito **React/Vite completamente statico**. Per la pubblicazione su Cloudflare Pages non sono necessari server, funzioni o database. La configurazione proposta usa il comando dedicato `build:pages`, che genera i file da distribuire nella cartella `dist/public`.

| Campo Cloudflare Pages | Valore da inserire |
| --- | --- |
| Framework preset | `None` oppure `React (Vite)` |
| Production branch | `main` |
| Build command | `pnpm run build:pages` |
| Build output directory | `dist/public` |
| Root directory | lasciare vuoto se il repository contiene questo progetto alla radice |
| Node.js | `22` |

## Asset visivi

Per mantenere il repository leggero, le immagini non sono incluse nel codice. Prima del primo deploy occorre pubblicare i file contenuti nell’archivio `officine-donnarumma-assets.zip` in una delle due modalità riportate sotto.

| Opzione | Operazione | Variabile di ambiente Pages |
| --- | --- | --- |
| Cloudflare R2 consigliato | Caricare la cartella `assets/` in un bucket R2 pubblico, raggiungibile ad esempio da `https://media.officinedonnarumma.it/assets/…` | `VITE_ASSET_BASE_URL=https://media.officinedonnarumma.it` |
| Asset nella distribuzione Pages | Copiare la cartella `assets/` in `client/public/assets/` prima di eseguire il build | Non impostare la variabile |

> Per un sito di prodotto, l’opzione R2 consente di aggiornare immagini pesanti senza modificare i sorgenti dell’interfaccia. In entrambi i casi, le URL finali risulteranno sotto `/assets/`.

## Dominio e indicizzazione

Dopo aver collegato `officinedonnarumma.it` al progetto Pages, impostare `https://officinedonnarumma.it/` come dominio di produzione. Il sito include già `robots.txt`, `sitemap.xml`, metadati sociali, URL canonica e dati strutturati essenziali per la collezione Panarius. Dopo il deploy, registrare la sitemap nel profilo Google Search Console del dominio.

## Prima della pubblicazione

I pulsanti Amazon ed eBay sono volutamente indicati come **in configurazione**: sostituire gli URL in `client/src/pages/Home.tsx` con i collegamenti definitivi e inserire i recapiti ufficiali di Officine Donnarumma nella sezione contatti. Verificare inoltre prezzi, dimensioni e condizioni commerciali prima che il sito venga reso pubblico.

## Riferimenti

[1] [Cloudflare Pages — Build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/)

[2] [Cloudflare Pages — Redirects](https://developers.cloudflare.com/pages/configuration/redirects/)
