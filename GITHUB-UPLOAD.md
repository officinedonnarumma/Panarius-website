# Caricamento su GitHub

Repository di destinazione:

`https://github.com/officinedonnarumma/Panarius-website.git`

## Metodo da terminale

Apri il terminale nella cartella estratta e lancia:

```bash
git init
git branch -M main
git add .
git commit -m "Initial Panarius website"
git remote add origin https://github.com/officinedonnarumma/Panarius-website.git
git push -u origin main
```

Se il repository remoto contiene gia un README o un commit iniziale, prima del push esegui:

```bash
git pull origin main --rebase
```

quindi:

```bash
git push -u origin main
```

## Dopo il caricamento

1. Verifica che `client/public/assets` contenga tutte le immagini.
2. Inserisci i link Amazon ed eBay in `client/src/pages/Home.tsx`.
3. Sostituisci le immagini provvisorie delle quattro varianti con le fotografie definitive.
4. Esegui localmente `pnpm install`, `pnpm check` e `pnpm build`.
