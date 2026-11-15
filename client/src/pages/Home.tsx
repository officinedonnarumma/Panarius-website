/**
 * Officina Editoriale — la pagina racconta Panarius come prodotto italiano concreto.
 * Grafite, carta e Rame Officina guidano il percorso: scoperta, confronto, canale di acquisto.
 */
import { SectionHeading } from "@/components/SectionHeading";
import { trackPurchaseClick, type PurchaseChannel } from "@/lib/analytics";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Facebook,
  Instagram,
  Menu,
  MousePointer2,
  MoveUpRight,
  ShoppingBag,
  X,
  Youtube,
} from "lucide-react";
import { useEffect, useState, type FormEvent, type TouchEvent } from "react";

const previewAssets: Record<string, string> = {
  "tavola-tecnica-cesto-panarius-montacarichi.png": "/assets/tavola-tecnica-cesto-panarius-montacarichi_4dab7703-ottimizzata.webp",
  "lavorazione-artigianale-cesto-panarius-pompei.jpg": "/assets/lavorazione-artigianale-cesto-panarius-pompei_ed5234d2-ottimizzata.webp",
  "lamiera-microforata-zincata-panarius.jpg": "/assets/lamiera-microforata-zincata-panarius_d81bf494-ottimizzata.webp",
};

const asset = (filename: keyof typeof previewAssets) => previewAssets[filename];

const heroImage = "/assets/cesto-panarius-per-montacarichi-sospeso_3c3f94f9-ottimizzata.webp";
const brandLogo = "/assets/logo-officine-donnarumma-pompei_354bdd6b.png";

type Product = {
  code: string;
  name: string;
  capacity: string;
  internal: string;
  external: string;
  base: string;
  price: string;
  image: string;
  feature: string;
};

const products: Product[] = [
  {
    code: "PNR-100-W",
    name: "Panarius Pro Wheels",
    capacity: "100 L",
    internal: "60 × 40 × 40 cm",
    external: "60 × 40 × 68 cm",
    base: "Ruote sterzanti",
    price: "€ 215,00",
    image: "/assets/cesto-panarius-pro-wheels-ruote-sterzanti_03b659e1.jpg",
    feature: "TUTTO, OVUNQUE SERVA",
  },
  {
    code: "PNR-100",
    name: "Panarius Pro",
    capacity: "100 L",
    internal: "60 × 40 × 40 cm",
    external: "60 × 40 × 60 cm",
    base: "Piedini fissi",
    price: "€ 185,00",
    image: "/assets/cesto-panarius-pro-piedini-fissi_82e689da.jpg",
    feature: "L'ESSENZIALE, IN GRANDE",
  },
  {
    code: "PNR-80-W",
    name: "Panarius Lite Wheels",
    capacity: "80 L",
    internal: "60 × 40 × 34 cm",
    external: "60 × 40 × 58 cm",
    base: "Ruote sterzanti",
    price: "€ 180,00",
    image: "/assets/cesto-panarius-lite-wheels-ruote-sterzanti_05d1b1a8.jpg",
    feature: "PICCOLO INGOMBRO, MASSIMA LIBERTÀ",
  },
  {
    code: "PNR-80",
    name: "Panarius Lite",
    capacity: "80 L",
    internal: "60 × 40 × 34 cm",
    external: "60 × 40 × 50 cm",
    base: "Piedini fissi",
    price: "€ 150,00",
    image: "/assets/cesto-panarius-lite-piedini-fissi_ab52b6fa.jpg",
    feature: "COMPATTO E FUNZIONALE",
  },
];

const purchaseLinks = {
  amazon: "https://www.amazon.it/dp/B0HF5124YB",
  ebay: "https://www.ebay.it/usr/officinedonnarumma",
};

const directPurchaseEmail = "officinedonnarumma@gmail.com";
const siteYear = "2026";

type Review = {
  product: string;
  client: string;
  text: string;
};

// Ordinate prima per utilità all'acquisto: uso reale, robustezza, montaggio e consegna.
const reviews: Review[] = [
  { product: "Panarius Pro Wheels", client: "studio_dorsi", text: "La cesta molto robusta ha rispettato le mie aspettative. Ottimo prodotto artigianale: ho dovuto montare le ruote, ma viti e fori erano perfettamente corrispondenti. Questa versione con le ruote è davvero comoda in quanto puoi caricare la cesta e poi raggiungere il montacarichi sotto il mio balcone per portare su la roba caricata." },
  { product: "Panarius Lite", client: "litrav77", text: "Cesto conforme alla descrizione fatta, ottima resistenza e capienza. Primo utilizzo con legna eccezionale! Prodotto utile e consigliato." },
  { product: "Panarius Pro Wheels", client: "ramboco", text: "Oggetto veramente ben fatto, anche se la descrizione già lo indicava… ma sorpreso in positivo a vederlo dal vivo!!! Ottimo acquisto." },
  { product: "Panarius Pro Wheels", client: "cassandra2379", text: "Pacco arrivato integro e ben avvolto! Cestello resistente e ben rifinito! Ottimo!" },
  { product: "Panarius Lite Wheels", client: "sigen_8588", text: "Buon prodotto, rifinito, robusto, poco ingombrante e anche esteticamente carino." },
  { product: "Panarius Lite", client: "giallona270", text: "Prodotto perfetto in tutte le descrizioni fornite, consegnato nei tempi dichiarati dal venditore. Consigliato 10++++++++" },
  { product: "Panarius Pro Wheels", client: "duendecanaya", text: "Tutto perfetto, oggetto come la descrizione, arrivato nei tempi stabiliti!! Ottima transazione!!" },
  { product: "Panarius Pro", client: "carforc_91", text: "Perfetto. Venditore serio." },
  { product: "Panarius Lite Wheels", client: "pupiyzf81", text: "Ottimo prodotto, consigliatissimo" },
  { product: "Panarius Lite Wheels", client: "giusvene41", text: "Tutto perfetto, super positivo. Consigliatissimo" },
  { product: "Panarius Lite Wheels", client: "brizo83", text: "Perfetto ottimo!!!!" },
  { product: "Panarius Pro Wheels", client: "alfalfaalfa", text: "Tutto ok!" },
  { product: "Panarius Pro Wheels", client: "luca974", text: "Tutto come descrizione." },
  { product: "Panarius Pro", client: "adrranzo", text: "Super!!!" },
  { product: "Panarius Lite Wheels", client: "sepid0", text: "Tutto come da descrizione!" },
  { product: "Panarius Lite", client: "ema.pee.tivc7k23k", text: "Va benissimo 😊" },
  { product: "Panarius Pro Wheels", client: "sasas23", text: "Transazione perfetta.. grazie mille." },
];

function MarketplaceButton({ channel, href, productCode }: { channel: "Amazon" | "eBay"; href: string; productCode?: string }) {
  const analyticsChannel: PurchaseChannel = channel === "Amazon" ? "amazon" : "ebay";
  if (!href) {
    return (
      <span className="channel-link channel-link--pending" title="Il collegamento verrà configurato prima della pubblicazione">
        {channel}<small>link in configurazione</small>
      </span>
    );
  }

  return (
    <a className="channel-link" href={href} target="_blank" rel="noreferrer" onClick={() => trackPurchaseClick(analyticsChannel, productCode)}>
      {channel}<ExternalLink size={14} strokeWidth={1.7} />
    </a>
  );
}

function ProductCard({ product, index, onRequest }: { product: Product; index: number; onRequest: (product: Product) => void }) {
  const [baseName, wheelsLabel] = product.name.split(" Wheels");

  return (
    <article className={`product-card product-card--${index + 1} ${index === 0 ? "product-card--lead" : ""}`}>
      <div className="product-photo">
        <img
          src={product.image}
          alt={`${product.name}: cesto per montacarichi Panarius, ${product.capacity}`}
          loading={index === 0 ? "eager" : "lazy"}
          fetchPriority={index === 0 ? "high" : "auto"}
        />
        <span className="product-code"><i className="product-code__line" /><span>{product.code}</span><b className="product-code__diamond" aria-hidden="true" /></span>
      </div>
      <div className="product-card__body">
        <div className="product-card__intro">
          <p className="product-feature">{product.feature}</p>
          <h3>{baseName}{wheelsLabel !== undefined && <span className="product-wheel">Wheels</span>}</h3>
        </div>
        <div className="spec-list" aria-label={`Specifiche ${product.name}`}>
          <div><span>Capacità</span><strong>{product.capacity}</strong></div>
          <div><span>Misure interne</span><strong>{product.internal}</strong></div>
          <div><span>Misure esterne</span><strong>{product.external}</strong></div>
          <div><span>Base</span><strong>{product.base}</strong></div>
        </div>
        <div className="product-card__buy">
          <p><span>Prezzo indicato</span><strong>{product.price}</strong></p>
          <div className="buy-actions">
            <button className="direct-link" type="button" onClick={() => { trackPurchaseClick("direct", product.code); onRequest(product); }}>Richiedi il tuo Panarius <ArrowRight size={15} /></button>
          </div>
        </div>
      </div>
    </article>
  );
}

function OrderRequestModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const details = [
      `Nome e cognome: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Telefono: ${data.get("phone") || "Non indicato"}`,
      `Modello: ${product.name}`,
      `Quantità: ${data.get("quantity")}`,
      `Indirizzo: ${data.get("address")}`,
      `CAP: ${data.get("postalCode")}`,
      `Comune: ${data.get("city")}`,
      `Provincia: ${data.get("province")}`,
      `Note: ${data.get("notes") || "Nessuna"}`,
    ].join("\n");
    window.location.href = `mailto:${directPurchaseEmail}?subject=${encodeURIComponent(`Richiesta ${product.name}`)}&body=${encodeURIComponent(details)}`;
    setSubmitted(true);
  };

  return (
    <div className="order-modal" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="order-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="order-modal-title">
        <button className="order-modal__close" type="button" onClick={onClose} aria-label="Chiudi richiesta d’ordine"><X size={22} /></button>
        {submitted ? (
          <div className="order-modal__success">
            <span className="order-modal__check"><Check size={24} /></span>
            <h2>Richiesta ricevuta.</h2>
            <p>Grazie, abbiamo ricevuto i tuoi dati. Ti contatteremo per confermare il tuo ordine.</p>
            <button className="button button--copper" type="button" onClick={onClose}>Chiudi</button>
          </div>
        ) : (
          <>
            <p className="eyebrow"><span>Richiesta diretta</span></p>
            <h2 id="order-modal-title">Richiedi il tuo Panarius</h2>
            <p className="order-modal__intro">Compila il modulo con i tuoi dati. Ti ricontatteremo per confermare l’ordine.</p>
            <form className="order-form" onSubmit={handleSubmit}>
              <div className="order-form__grid">
                <label>Nome e cognome *<input name="name" required autoComplete="name" /></label>
                <label>Email *<input name="email" type="email" required autoComplete="email" /></label>
                <label>Telefono<input name="phone" type="tel" autoComplete="tel" /></label>
                <label>Modello desiderato<input value={product.name} readOnly aria-readonly="true" /></label>
                <label>Quantità *<input name="quantity" type="number" min="1" defaultValue="1" required /></label>
                <label>Provincia *<input name="province" required autoComplete="address-level1" /></label>
                <label className="order-form__full">Indirizzo e numero civico *<input name="address" required autoComplete="street-address" /></label>
                <label>CAP *<input name="postalCode" required inputMode="numeric" autoComplete="postal-code" /></label>
                <label>Comune *<input name="city" required autoComplete="address-level2" /></label>
                <label className="order-form__full">Note<textarea name="notes" rows={3} /></label>
              </div>
              <label className="order-form__privacy"><input type="checkbox" required /> <span>Ho letto l’informativa privacy e acconsento al trattamento dei dati per la gestione della richiesta.</span></label>
              <button className="button button--copper order-form__submit" type="submit">Invia richiesta d’ordine <ArrowRight size={17} /></button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function ReviewsGallery() {
  const [activeReview, setActiveReview] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const featuredReview = reviews[activeReview];

  const showReview = (index: number) => {
    setActiveReview((index + reviews.length) % reviews.length);
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    if (touchStart === null) return;
    const distance = event.changedTouches[0].clientX - touchStart;
    if (Math.abs(distance) > 45) showReview(activeReview + (distance < 0 ? 1 : -1));
    setTouchStart(null);
  };

  return (
    <section id="esperienze" className="reviews-section" aria-labelledby="recensioni-title">
      <div className="reviews-section__heading">
        <div>
          <p className="eyebrow"><span>Esperienze Panarius</span></p>
          <h2 id="recensioni-title">Chi ha scelto Panarius,<br /><em>lo racconta.</em></h2>
        </div>
        <p className="reviews-section__intro">Esperienze reali di chi utilizza Panarius in casa, in giardino e nel lavoro quotidiano.</p>
      </div>
      <div className="reviews-gallery" onTouchStart={(event) => setTouchStart(event.touches[0].clientX)} onTouchEnd={handleTouchEnd}>
        <div className="reviews-gallery__featured">
          <div className="reviews-gallery__featured-label">
            <div><span className="reviews-stars" aria-label="Feedback positivo">★★★★★</span><h3>La recensione più utile<br />all’acquisto</h3></div>
            <span className="reviews-model">{featuredReview.product} · recensione in evidenza</span>
          </div>
          <article className="reviews-gallery__quote" aria-live="polite">
            <span className="reviews-quote-mark" aria-hidden="true">“</span>
            <blockquote>{featuredReview.text}</blockquote>
            <span className="reviews-author">Cliente eBay · {featuredReview.client}</span>
          </article>
        </div>
        <div className="reviews-gallery__cards">
          {[1, 2, 3].map((offset) => {
            const review = reviews[(activeReview + offset) % reviews.length];
            return <article className="review-mini-card" key={`${review.client}-${activeReview}-${offset}`}>
              <div className="review-mini-card__top"><span className="reviews-model">{review.product}</span><span className="reviews-stars" aria-label="Feedback positivo">★★★★★</span></div>
              <p>{review.text}</p>
              <div className="review-mini-card__meta"><span>Cliente eBay · {review.client}</span><span>{review.product.includes("Lite") ? "80 L" : "100 L"}</span></div>
            </article>;
          })}
        </div>
        <div className="reviews-gallery__controls">
          <button className="reviews-gallery__arrow reviews-gallery__arrow--prev" type="button" onClick={() => showReview(activeReview - 1)} aria-label="Recensione precedente"><ChevronLeft size={22} /></button>
          <div className="reviews-gallery__dots" role="tablist" aria-label="Seleziona recensione">
            {reviews.map((item, index) => <button key={`${item.client}-${index}`} type="button" role="tab" aria-selected={index === activeReview} aria-label={`Mostra recensione ${index + 1} di ${reviews.length}`} className={index === activeReview ? "is-active" : ""} onClick={() => showReview(index)} />)}
          </div>
          <button className="reviews-gallery__arrow reviews-gallery__arrow--next" type="button" onClick={() => showReview(activeReview + 1)} aria-label="Recensione successiva"><ChevronRight size={22} /></button>
        </div>
      </div>
      <div className="reviews-section__cta"><p>Hai già scelto la configurazione più adatta?</p><a href="#panarius" className="button button--copper">Scopri i modelli Panarius <ArrowRight size={15} /></a></div>
      <p className="reviews-section__note">Le recensioni sono feedback originali pubblicati dai clienti sullo store eBay.</p>
    </section>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [requestedProduct, setRequestedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className={`site-shell ${menuOpen ? "site-shell--menu-open" : ""}`}>
      <div className="utility-bar">
        <p>Panarius · Cesti per montacarichi</p>
        <a href="#contatti">Richiedi un preventivo <ArrowDownRight size={15} /></a>
      </div>

      <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
        <a className="brand" href="#top" aria-label="Officine Donnarumma — torna all'inizio">
          <img className="brand__logo" src={brandLogo} alt="Officine Donnarumma, Pompei" />
        </a>
        <nav className="desktop-nav" aria-label="Navigazione principale">
          <a href="#panarius">Panarius</a>
          <a href="#utilizzi">Applicazioni</a>
          <a href="#progetto">Il concept</a>
          <a href="#materia">Made in Pompeii</a>
          <a href="#esperienze">Esperienze</a>
          <a href="#acquista" className="nav-cta"><ShoppingBag size={15} /> Acquista</a>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Chiudi menu" : "Apri menu"} aria-expanded={menuOpen}>
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </header>

      <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""} ${scrolled ? "mobile-menu--scrolled" : ""}`}>
        <a href="#panarius" onClick={closeMenu}>Panarius <ChevronRight size={16} /></a>
        <a href="#utilizzi" onClick={closeMenu}>Applicazioni <ChevronRight size={16} /></a>
        <a href="#progetto" onClick={closeMenu}>Il concept <ChevronRight size={16} /></a>
        <a href="#materia" onClick={closeMenu}>Made in Pompeii <ChevronRight size={16} /></a>
        <a href="#esperienze" onClick={closeMenu}>Esperienze <ChevronRight size={16} /></a>
        <a href="#acquista" onClick={closeMenu}><span>Acquista</span><ShoppingBag size={16} /></a>
        <a href="#contatti" onClick={closeMenu}>Richiedi un preventivo <ChevronRight size={16} /></a>
      </div>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__image" aria-hidden="true" style={{ backgroundImage: `url("${heroImage}")` }} />
          <div className="hero__veil" />
          <div className="hero__content">
            <p className="eyebrow eyebrow--light"><span>Panarius · Cesta per montacarichi</span></p>
            <h1 id="hero-title">Il tuo carico,<br /><em>sempre al sicuro.</em></h1>
            <p className="hero__copy">Panarius è il cesto metallico per paranchi e montacarichi progettato per distribuire il carico in maniera uniforme e rendere ogni movimentazione più semplice e sicura.</p>
            <div className="hero__actions">
              <a href="#panarius" className="button button--copper">Scopri le varianti <ArrowRight size={17} /></a>
              <a href="#progetto" className="text-link">Come è costruito <MoveUpRight size={15} /></a>
            </div>
          </div>
          <div className="hero__scroll"><span>Scorri per scoprire</span><i /></div>
        </section>

        <section className="intro-strip" aria-label="Introduzione Panarius">
          <p>Robustezza premium che ti accompagna ad ogni carico.</p>
        </section>

        <section id="panarius" className="catalogue section-space">
          <div className="catalogue__top">
            <SectionHeading
              eyebrow="La collezione Panarius"
              title="Quattro varianti, una sola logica costruttiva."
              copy="Tutti i modelli Panarius condividono la stessa qualità costruttiva e sono progettati per l’utilizzo con paranchi e montacarichi. A cambiare sono la capacità di carico e la modalità di movimentazione a terra, così da offrire una soluzione adatta a ogni esigenza."
            />
            <aside className="collection-side-note"><strong>Un Panarius per ogni esigenza</strong><p>Dalla sua ideazione, il cesto Panarius è stato scelto da oltre 200 clienti in tutta Italia.</p><p>Pensati soprattutto per uso domestico e da giardino, sono perfetti anche per esigenze professionali — edilizia, commercio, aziende agricole, strutture ricettive.</p><p>Scegli il modello più adatto a te.</p></aside>
          </div>
          <div className="product-grid">
            {products.map((product, index) => <ProductCard key={product.code} product={product} index={index} onRequest={setRequestedProduct} />)}
          </div>
          <p className="catalogue-note"><span>*</span> Prezzi e configurazioni saranno confermati nel canale di acquisto selezionato. Servizio di spedizione con corriere: <strong>€ 25,00</strong>.</p>
        </section>

        <section id="utilizzi" className="use-cases section-space" aria-labelledby="utilizzi-title">
          <div className="use-cases__heading">
            <SectionHeading
              eyebrow="Applicazioni in ogni settore"
              title="Il cesto per paranco e montacarichi, dove serve davvero."
              copy="Panarius completa il tuo paranco o montacarichi con uno spazio di carico sicuro e pratico. È pensato per chi deve sollevare e movimentare oggetti di uso quotidiano, materiali da lavoro e forniture in modo ordinato."
            />
          </div>
          <div className="use-cases__grid">
            <article><span>01</span><h3>Casa, giardino e biomasse per camini e stufe</h3><p>Per sollevare e trasportare legna da ardere, pellet di abete, di faggio o di legno vergine, sansa, nocciolino d’oliva, cippato di legno e bricchette. Ideale anche per gli oggetti necessari nelle attività domestiche e di giardinaggio.</p></article>
            <article><span>02</span><h3>Spesa e casse d’acqua</h3><p>Il cesto ideale per sollevare la spesa, casse d’acqua e carichi pesanti fino ai piani superiori, riducendo gli spostamenti manuali.</p></article>
            <article><span>03</span><h3>Commercio e Hôtellerie</h3><p>Adatto al sollevamento di pacchi, scatoloni, forniture, biancheria, prodotti per la pulizia, attrezzature e materiali di consumo per negozi, ristoranti, agriturismi e strutture ricettive.</p></article>
            <article><span>04</span><h3>Edilizia, Industria e Agricoltura</h3><p>Per il trasporto in sicurezza di sacchi di cemento, malta e laterizi nei cantieri edili, componenti e pezzi di ricambio in ambito industriale, mangimi, sementi e concimi per le aziende agricole.</p></article>
          </div>
        </section>

        <section id="progetto" className="project-section">
          <div className="project-image">
            <img src={asset("tavola-tecnica-cesto-panarius-montacarichi.png")} alt="Tavola tecnica del cesto Panarius per montacarichi" loading="lazy" decoding="async" />
            <span className="project-image__label">Disegno costruttivo · Panarius</span>
          </div>
          <div className="project-content">
            <SectionHeading
              eyebrow="Il concept"
              title="Una geometria al servizio di ogni carico."
              copy="La struttura del cesto e i suoi maniglioni sono progettati per accompagnare le operazioni quotidiane di sollevamento con una soluzione solida e funzionale."
              inverted
            />
            <div className="process-list">
              <article><span>01</span><div><h3>Sistema di sollevamento auto-equilibrante</h3><p>Gli ampi maniglioni reclinabili sono progettati per distribuire equamente il carico sui quattro punti della struttura portante durante la fase di salita, impedendo qualsiasi rotazione delle cerniere e garantendo la massima sicurezza.</p><p>Una volta a terra, possono essere reclinati per lasciare piena libertà di accesso alla zona di carico.</p></div></article>
              <article><span>02</span><div><h3>Telaio e fondo rinforzati</h3><p>La struttura portante, realizzata con profili angolari, e il fondo in lamiera piena rinforzata garantiscono un’elevata capacità di carico, con una resistenza senza eguali.</p><p>La finitura zincata protegge inoltre il metallo dall’ossidazione nel tempo.</p></div></article>
              <article><span>03</span><div><h3>Paratie laterali in lamiera microforata</h3><p>Le paratie laterali sono realizzate in lamiera microforata presso-piegata, in grado di irrigidire ulteriormente la struttura senza appesantirla e di evitare la caduta accidentale di piccoli oggetti durante la movimentazione.</p></div></article>
            </div>
          </div>
        </section>

        <section id="materia" className="material-section section-space">
          <div className="material-section__heading">
            <SectionHeading
              eyebrow="Artigianato Made in Pompeii"
              title="Progettato qui. Lavorato qui."
              copy={'Ogni Panarius nasce nella Valle di Pompei come pezzo unico realizzato artigianalmente, non come prodotto industriale ma come espressione di un mestiere.\nLavorazioni di precisione, esperienza e cura per i dettagli danno vita a un prodotto solido, fatto per durare. Vengono impiegati esclusivamente materiali di alta qualità, selezionati da fornitori locali: non è un vincolo, ma la base del risultato che vogliamo ottenere.\nOgni fase della produzione viene seguita da vicino, passo dopo passo. È questo controllo diretto a fare la differenza.'}
            />
            <aside className="material-side-note"><strong>Un mestiere, una firma</strong><p>Dall’idea al prodotto finito, ogni Panarius prende forma da un sapere concreto, in cui esperienza e manualità trasformano il progetto in un pezzo unico, realizzato su misura per te.</p></aside>
          </div>
          <div className="material-images">
            <figure className="material-images__large"><img src={asset("lavorazione-artigianale-cesto-panarius-pompei.jpg")} alt="Lavorazione artigianale del cesto Panarius nell’officina di Pompei" loading="lazy" decoding="async" /><figcaption>La lavorazione</figcaption></figure>
            <figure className="material-images__small"><img src={asset("lamiera-microforata-zincata-panarius.jpg")} alt="Lamiera microforata zincata impiegata nel cesto Panarius" loading="lazy" decoding="async" /><figcaption>La materia</figcaption></figure>
            <div className="material-statement"><span>Dal metallo<br />alla funzione.</span><ArrowDownRight size={28} /></div>
          </div>
        </section>

        <section id="acquista" className="buy-section">
          <div className="buy-section__backdrop" style={{ backgroundImage: `linear-gradient(90deg,#122f45,rgba(18,47,69,.72) 48%,rgba(18,47,69,.92)),url("/assets/bottega-artigiana-pompei-acquisto-panarius_900aacab-ottimizzata.webp")` }} />
          <div className="buy-section__content">
            <SectionHeading
              eyebrow="Acquista come preferisci"
              title="Hai scelto il tuo Panarius. Visita i nostri store."
              copy="Scegli la tua variante preferita e contattaci per procedere con l'acquisto indicandoci il modello, altrimenti visita i nostri store online."
              inverted
            />
            <div className="channel-grid">
              <article><span className="channel-number">01</span><h3>Amazon</h3><p>Acquista Panarius sul marketplace Amazon.</p><MarketplaceButton channel="Amazon" href={purchaseLinks.amazon} productCode="contact" /></article>
              <article><span className="channel-number">02</span><h3>eBay</h3><p>Acquista sul nostro store eBay ufficiale.</p><MarketplaceButton channel="eBay" href={purchaseLinks.ebay} productCode="contact" /></article>
              <article><span className="channel-number">03</span><h3>Acquisto diretto</h3><p>Scrivici per confermare il tuo ordine.</p><a href={`mailto:${directPurchaseEmail}?subject=Richiesta%20acquisto%20Panarius`} className="channel-link" onClick={() => trackPurchaseClick("direct", "contact")}>Scrivici <ArrowRight size={15} /></a></article>
            </div>
          </div>
        </section>

        <ReviewsGallery />

        <section id="contatti" className="contact-section">
          <div><p className="eyebrow"><span>Parliamone</span></p><h2>Ti serve una mano<br /><em>nella scelta?</em></h2></div>
          <div className="contact-section__right"><p>Siamo qui per aiutarti: scrivici per ricevere maggiori informazioni su un prodotto, oppure richiedi un preventivo per accedere al servizio <strong><em>Panarius Bespoke</em></strong> e progettare insieme un modello su misura per te.</p><div className="contact-actions"><a href={`mailto:${directPurchaseEmail}?subject=Richiesta%20informazioni%20Panarius`} className="button button--dark" onClick={() => trackPurchaseClick("direct", "information")}>Richiedi informazioni <ArrowRight size={17} /></a><a href={`mailto:${directPurchaseEmail}?subject=Richiesta%20acquisto%20Panarius`} className="button button--outline-dark" onClick={() => trackPurchaseClick("direct", "quote")}>Richiedi preventivo <ArrowRight size={17} /></a></div><p className="contact-direct" style={{ marginTop: 28 }}>Oppure scrivici direttamente: <strong><a className="contact-email" href={`mailto:${directPurchaseEmail}`}>{directPurchaseEmail}</a></strong></p></div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-footer__brand"><img className="site-footer__logo" src={brandLogo} alt="Officine Donnarumma, Pompei" /></div>
        <nav className="site-footer__social" aria-label="Social Officine Donnarumma">
          <a href="https://www.youtube.com/@OfficineDonnarumma" target="_blank" rel="noreferrer" aria-label="Officine Donnarumma su YouTube"><Youtube size={18} strokeWidth={1.8} /></a>
          <a href="https://www.facebook.com/OfficineDonnarumma" target="_blank" rel="noreferrer" aria-label="Officine Donnarumma su Facebook"><Facebook size={18} strokeWidth={1.8} /></a>
          <a href="https://www.instagram.com/officinedonnarumma/" target="_blank" rel="noreferrer" aria-label="Officine Donnarumma su Instagram"><Instagram size={18} strokeWidth={1.8} /></a>
        </nav>
        <div className="site-footer__meta">
          <p>Panarius · Cesti per montacarichi</p>
          <p>© {siteYear} Officine Donnarumma. Tutti i diritti riservati.</p>
        </div>
      </footer>
      {requestedProduct && <OrderRequestModal product={requestedProduct} onClose={() => setRequestedProduct(null)} />}
    </div>
  );
}
