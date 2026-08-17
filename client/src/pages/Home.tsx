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
  ChevronRight,
  ExternalLink,
  Menu,
  MousePointer2,
  MoveUpRight,
  ShoppingBag,
  X,
} from "lucide-react";
import { useEffect, useState, type CSSProperties } from "react";

const previewAssets: Record<string, string> = {
  "officine-hero-fabrication.jpg": "/manus-storage/officine-hero-fabrication_5f47ba3b.jpg",
  "officine-detail-perforated-steel.jpg": "/manus-storage/officine-bending-new_fdd2dfa0.png",
  "officine-detail-weld.jpg": "/manus-storage/officine-welding-new_5b2042e7.jpg",
  "officine-technical-blueprint.jpg": "/manus-storage/panarius-technical-drawing-iso_4a4ee796.png",
  "officine-d-symbol.png": "/manus-storage/officine-d-symbol_2f7ead5c.png",
  "panarius-shop-source.webp": "/manus-storage/panarius-shop-source_4e57ba40.webp",
};

const asset = (filename: keyof typeof previewAssets) => previewAssets[filename];

const heroImage = "/manus-storage/panarius-hero-cable-only-gpt_164f15a6.png";

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
    name: "Panarius Wheel",
    capacity: "100 L",
    internal: "60 × 40 × 40 cm",
    external: "60 × 40 × 68 cm",
    base: "Ruote sterzanti",
    price: "€ 215,00",
    image: "/manus-storage/panarius-variant-01_b9e16593.jpg",
    feature: "TUTTO, OVUNQUE SERVA",
  },
  {
    code: "PNR-100",
    name: "Panarius",
    capacity: "100 L",
    internal: "60 × 40 × 40 cm",
    external: "60 × 40 × 60 cm",
    base: "Piedini fissi",
    price: "€ 185,00",
    image: "/manus-storage/panarius-variant-02_01f381e7.jpg",
    feature: "L'ESSENZIALE, IN GRANDE",
  },
  {
    code: "PNR-80-W",
    name: "Panarius Lite Wheel",
    capacity: "80 L",
    internal: "60 × 40 × 34 cm",
    external: "60 × 40 × 58 cm",
    base: "Ruote sterzanti",
    price: "€ 175,00",
    image: "/manus-storage/panarius-variant-03_e9d7ffc2.jpg",
    feature: "PICCOLO INGOMBRO, MASSIMA LIBERTÀ",
  },
  {
    code: "PNR-80",
    name: "Panarius Lite",
    capacity: "80 L",
    internal: "60 × 40 × 34 cm",
    external: "60 × 40 × 50 cm",
    base: "Piedini fissi",
    price: "€ 145,00",
    image: "/manus-storage/panarius-variant-04_d5920e0f.jpg",
    feature: "COMPATTO E FUNZIONALE",
  },
];

const purchaseLinks = {
  amazon: "https://www.amazon.it/dp/B0HF5124YB",
  ebay: "https://www.ebay.it/usr/officinedonnarumma",
};

const directPurchaseEmail = "officinedonnarumma@gmail.com";

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

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [baseName, wheelLabel] = product.name.split(" Wheel");

  return (
    <article className={`product-card product-card--${index + 1} ${index === 0 ? "product-card--lead" : ""}`}>
      <div
        className="product-photo"
        role="img"
        aria-label={`${product.name}, cesto per montacarichi Panarius`}
        style={{
          backgroundImage: `url("${product.image}")`,
        } as CSSProperties}
      >
        <span className="product-code"><i className="product-code__line" /><span>{product.code}</span><b className="product-code__diamond" aria-hidden="true" /></span>
      </div>
      <div className="product-card__body">
        <div className="product-card__intro">
          <p className="product-feature">{product.feature}</p>
          <h3>{baseName}{wheelLabel !== undefined && <span className="product-wheel">Wheel</span>}</h3>
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
            <a className="direct-link" href={`mailto:${directPurchaseEmail}?subject=Richiesta%20preventivo%20Panarius`} onClick={() => trackPurchaseClick("direct", product.code)}>Acquista <ArrowRight size={15} /></a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <div className="utility-bar">
        <p>Panarius · Cesti per montacarichi</p>
        <a href="#contatti">Richiedi un preventivo <ArrowDownRight size={15} /></a>
      </div>

      <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
        <a className="brand" href="#top" aria-label="Officine Donnarumma — torna all'inizio">
          <img className="brand__logo" src="/manus-storage/officine-donnarumma-logo-original-transparent_bdd78817.png" alt="Officine Donnarumma, Pompei" />
        </a>
        <nav className="desktop-nav" aria-label="Navigazione principale">
          <a href="#panarius">Panarius</a>
          <a href="#progetto">Il concept</a>
          <a href="#materia">Made in Pompeii</a>
          <a href="#acquista" className="nav-cta"><ShoppingBag size={15} /> Acquista</a>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Apri menu" aria-expanded={menuOpen}>
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </header>

      <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}>
        <a href="#panarius" onClick={closeMenu}>Panarius <ChevronRight size={16} /></a>
        <a href="#progetto" onClick={closeMenu}>Il concept <ChevronRight size={16} /></a>
        <a href="#materia" onClick={closeMenu}>Made in Pompeii <ChevronRight size={16} /></a>
        <a href="#contatti" onClick={closeMenu}>Richiedi un preventivo <ChevronRight size={16} /></a>
      </div>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__image" aria-hidden="true" style={{ backgroundImage: `url("${heroImage}")` }} />
          <div className="hero__veil" />
          <div className="hero__content">
            <p className="eyebrow eyebrow--light"><span>Panarius · Cesta per montacarichi</span></p>
            <h1 id="hero-title">Il tuo carico,<br /><em>sempre al sicuro.</em></h1>
            <p className="hero__copy">Panarius è il cesto per montacarichi progettato per distribuire il carico in maniera uniforme e rendere ogni movimentazione più semplice e sicura.</p>
            <div className="hero__actions">
              <a href="#panarius" className="button button--copper">Scopri le varianti <ArrowRight size={17} /></a>
              <a href="#progetto" className="text-link">Come è costruito <MoveUpRight size={15} /></a>
            </div>
          </div>
          <div className="hero__scroll"><span>Scorri per scoprire</span><i /></div>
        </section>

        <section className="intro-strip" aria-label="Introduzione Panarius">
          <p>Robustezza concreta che ti accompagna ad ogni carico.</p>
        </section>

        <section id="panarius" className="catalogue section-space">
          <div className="catalogue__top">
            <SectionHeading
              eyebrow="La collezione Panarius"
              title="Quattro varianti, una sola logica costruttiva."
              copy="Scegli il modello in base al volume di carico e alla necessità di spostamento a terra. Tutte le dimensioni indicate si riferiscono al singolo cesto."
            />
            <a href="#acquista" className="catalogue__anchor">Acquista Panarius <ArrowRight size={17} /></a>
          </div>
          <div className="product-grid">
            {products.map((product, index) => <ProductCard key={product.code} product={product} index={index} />)}
          </div>
          <p className="catalogue-note"><span>*</span> Prezzi e configurazioni saranno confermati nel canale di acquisto selezionato.</p>
        </section>

        <section id="progetto" className="project-section">
          <div className="project-image">
            <img src={asset("officine-technical-blueprint.jpg")} alt="Disegno tecnico della struttura Panarius" />
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
            <figure className="material-images__large"><img src={asset("officine-detail-weld.jpg")} alt="Dettaglio di lavorazione metallica in officina" /><figcaption>La lavorazione</figcaption></figure>
            <figure className="material-images__small"><img src={asset("officine-detail-perforated-steel.jpg")} alt="Dettaglio di lamiera microforata zincata" /><figcaption>La materia</figcaption></figure>
            <div className="material-statement"><span>Dal metallo<br />alla funzione.</span><ArrowDownRight size={28} /></div>
          </div>
        </section>

        <section id="acquista" className="buy-section">
          <div className="buy-section__backdrop" style={{ backgroundImage: `linear-gradient(90deg,#122f45,rgba(18,47,69,.72) 48%,rgba(18,47,69,.92)),url("${asset("officine-detail-perforated-steel.jpg")}")` }} />
          <div className="buy-section__content">
            <SectionHeading
              eyebrow="Acquista come preferisci"
              title="Hai scelto la variante. Ora scegli il canale."
              copy="Per richieste, configurazioni e acquisti diretti, scegli la variante e contattaci direttamente."
              inverted
            />
            <div className="channel-grid">
              <article><span className="channel-number">01</span><h3>Acquista</h3><p>Per richieste, configurazioni e acquisti diretti.</p><a href={`mailto:${directPurchaseEmail}?subject=Richiesta%20preventivo%20Panarius`} className="channel-link" onClick={() => trackPurchaseClick("direct", "contact")}>Acquista <ArrowRight size={15} /></a></article>
            </div>
          </div>
        </section>

        <section id="contatti" className="contact-section">
          <div><p className="eyebrow"><span>Parliamone</span></p><h2>Ti serve una mano<br /><em>nella scelta?</em></h2></div>
          <div className="contact-section__right"><p>Per una richiesta sul prodotto o per l’acquisto diretto, scrivi a Officine Donnarumma: <a href={`mailto:${directPurchaseEmail}`}>{directPurchaseEmail}</a>.</p><a href={`mailto:${directPurchaseEmail}?subject=Richiesta%20preventivo%20Panarius`} className="button button--dark">Richiedi un preventivo <ArrowRight size={17} /></a></div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-footer__brand"><img className="site-footer__logo" src="/manus-storage/officine-donnarumma-logo-original-transparent_bdd78817.png" alt="Officine Donnarumma, Pompei" /></div>
        <p>Panarius · Cesti per montacarichi</p>
        <p>© {new Date().getFullYear()} Officine Donnarumma. Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
}
