# Audit immagine 5:4 a tutta altezza

La sezione “Il concept” utilizza il nuovo asset 5:4 generato senza ritagli della tavola tecnica. Su desktop il contenitore immagine si estende alla stessa altezza della colonna tecnica e l’asset usa `object-fit: cover`: l’eventuale adattamento coinvolge esclusivamente il piano blu ossidato esteso sopra e sotto, non il foglio tecnico.

Su mobile il contenitore torna al rapporto 5:4 naturale e l’immagine rimane integralmente proporzionata. Nessun bordo vuoto o compressione verticale risulta visibile nelle verifiche.

TypeScript, test Vitest e build completati con esito positivo.
