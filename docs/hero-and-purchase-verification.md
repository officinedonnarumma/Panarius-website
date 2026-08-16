# Verifica finale hero e collegamenti commerciali

## Hero Panarius

La versione attualmente pubblicata utilizza l’asset statico `panarius-hero-real-installation-composite_f5585258.png`, visibile nella homepage come fotografia reale dell’installazione. La verifica visiva desktop/mobile eseguita il 16 agosto 2026 conferma che nella composizione sono riconoscibili il paranco nella parte superiore, il binario/struttura di scorrimento, il cesto microforato, le ruote inferiori e il sistema di bracci con aggancio superiore compatto.

Questa verifica documenta la corrispondenza visiva con i riferimenti forniti durante il progetto; non sostituisce l’approvazione commerciale finale del cliente sull’immagine hero.

## Collegamenti di acquisto

I collegamenti Amazon ed eBay conservano l’apertura in nuova scheda e registrano l’evento `purchase_click` tramite il tracker analytics già caricato nella homepage. Il canale diretto conserva il link `mailto:` e registra lo stesso evento con il canale `direct`. Per i link presenti nelle schede prodotto, l’evento include anche il codice variante.

Il comportamento è indipendente dal viewport: gli stessi handler React sono usati dalla griglia desktop e dalla disposizione responsive mobile. La funzione è coperta da test Vitest e la build statica è stata completata senza errori TypeScript.
