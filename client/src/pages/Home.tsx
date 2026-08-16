/**
 * Officina Editoriale — la pagina racconta Panarius come prodotto italiano concreto.
 * Grafite, carta e Rame Officina guidano il percorso: scoperta, confronto, canale di acquisto.
 */
import { SectionHeading } from "@/components/SectionHeading";
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

const asset = (filename: string) => `/assets/${filename}`;

// The original Manus project referenced some images stored only in Manus Storage.
// To keep the site self-contained, the local workshop image is used as the hero
// until the final product photos are copied into client/public/assets.
const heroImage = asset("officine-hero-fabrication.jpg");

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
    base: "Ruote sterzanti con freno",
    price: "€ 215,00",
    image: asset("panarius-shop-source.webp"),
    feature: "Mobilità controllata",
  },
  {
    code: "PNR-100",
    name: "Panarius",
    capacity: "100 L",
    internal: "60 × 40 × 40 cm",
    external: "60 × 40 × 60 cm",
    base: "Piedini fissi",
    price: "€ 185,00",
    image: asset("panarius-shop-source.webp"),
    feature: "Assetto essenziale",
  },
  {
    code: "PNR-80-W",
    name: "Panarius Lite Wheel",
    capacity: "80 L",
    internal: "60 × 40 × 34 cm",
    external: "60 × 40 × 58 cm",
    base: "Ruote sterzanti con freno",
    price: "€ 175,00",
    image: asset("panarius-shop-source.webp"),
    feature: "Volume compatto, massima libertà",
  },
  {
    code: "PNR-80",
    name: "Panarius Lite",
    capacity: "80 L",
    internal: "60 × 40 × 34 cm",
    external: "60 × 40 × 50 cm",
    base: "Piedini fissi",
    price: "€ 145,00",
    image: asset("panarius-shop-source.webp"),
    feature: "Leggero e funzionale",
  },
];

const purchaseLinks = {
  amazon: "",
  ebay: "",
};

function MarketplaceButton({ channel, href }: { channel: "Amazon" | "eBay"; href: string }) {
  if (!href) {
    return (
      <span className="channel-link channel-link--pending" title="Il collegamento verrà configurato prima della pubblicazione">
        {channel}<small>link in configurazione</small>
      </span>
    );
  }

  return (
    <a className="channel-link" href={href} target="_blank" rel="noreferrer">
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
        <span className="product-code"><i />{product.code}</span>
        <span className="product-index"><i />0{index + 1}</span>
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
            <MarketplaceButton channel="Amazon" href={purchaseLinks.amazon} />
            <MarketplaceButton channel="eBay" href={purchaseLinks.ebay} />
            <a className="direct-link" href="#contatti">Diretto <ArrowRight size={15} /></a>
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
        <a href="#acquista">Scegli la tua variante <ArrowDownRight size={15} /></a>
      </div>

      <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
        <a className="brand" href="#top" aria-label="Officine Donnarumma — torna all'inizio">
          <img className="brand__logo" src={asset("officine-donnarumma-logo.png")} alt="Officine Donnarumma, Pompei" />
        </a>
        <nav className="desktop-nav" aria-label="Navigazione principale">
          <a href="#panarius">Panarius</a>
          <a href="#progetto">Il progetto</a>
          <a href="#materia">Made in Pompei</a>
          <a href="#acquista" className="nav-cta"><ShoppingBag size={15} /> Acquista</a>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Apri menu" aria-expanded={menuOpen}>
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </header>

      <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}>
        <a href="#panarius" onClick={closeMenu}>Panarius <ChevronRight size={16} /></a>
        <a href="#progetto" onClick={closeMenu}>Il progetto <ChevronRight size={16} /></a>
        <a href="#materia" onClick={closeMenu}>Made in Pompei <ChevronRight size={16} /></a>
        <a href="#acquista" onClick={closeMenu}>Scegli la variante <ChevronRight size={16} /></a>
      </div>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__image" aria-hidden="true" style={{ backgroundImage: `url("${heroImage}")` }} />
          <div className="hero__veil" />
          <div className="hero__content">
            <p className="eyebrow eyebrow--light"><span>Officine Donnarumma · Italia</span></p>
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
              eyebrow="La collezione"
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
              title="Una geometria che lavora insieme al carico."
              copy="La struttura del cestello e il sistema di sollevamento sono pensati per accompagnare le operazioni quotidiane con una soluzione solida e leggibile."
              inverted
            />
            <div className="process-list">
              <article><span>01</span><div><h3>Sollevamento autoequilibrante</h3><p>Gli ampi maniglioni reclinabili distribuiscono il carico sui quattro punti della struttura portante.</p></div></article>
              <article><span>02</span><div><h3>Telaio con fondo rinforzato</h3><p>Profili angolari e lamiera zincata lavorano insieme per offrire resistenza in fase di movimentazione.</p></div></article>
              <article><span>03</span><div><h3>Sponde microforate</h3><p>La microforatura lascia respirare il contenuto e protegge anche gli oggetti più piccoli durante il trasporto.</p></div></article>
            </div>
          </div>
        </section>

        <section id="materia" className="material-section section-space">
          <div className="material-section__heading">
            <SectionHeading
              eyebrow="Materia e metodo"
              title="Progettato qui. Lavorato qui."
              copy="Ogni Panarius nasce da lavorazioni artigianali e da una scelta precisa dei materiali. La produzione locale non è un dettaglio: è parte del controllo sul risultato."
            />
            <div className="material-proof"><Check size={18} /><span>Artigianato<br /><b>Made in Pompei</b></span></div>
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
              copy="Stiamo preparando i collegamenti ai marketplace per ciascun modello. L’acquisto diretto resterà sempre disponibile per richieste specifiche."
              inverted
            />
            <div className="channel-grid">
              <article><span className="channel-number">01</span><h3>Amazon</h3><p>Acquisto tramite marketplace Amazon.</p><MarketplaceButton channel="Amazon" href={purchaseLinks.amazon} /></article>
              <article><span className="channel-number">02</span><h3>eBay</h3><p>Acquisto tramite marketplace eBay.</p><MarketplaceButton channel="eBay" href={purchaseLinks.ebay} /></article>
              <article><span className="channel-number">03</span><h3>Direttamente</h3><p>Per richieste, configurazioni e acquisti diretti.</p><a href="#contatti" className="channel-link">Contattaci <ArrowRight size={15} /></a></article>
            </div>
          </div>
        </section>

        <section id="contatti" className="contact-section">
          <div><p className="eyebrow"><span>Parliamone</span></p><h2>Ti serve una mano<br /><em>nella scelta?</em></h2></div>
          <div className="contact-section__right"><p>Per una richiesta sul prodotto o per l’acquisto diretto, contatta Officine Donnarumma. Inseriremo qui i recapiti ufficiali prima della pubblicazione.</p><a href="#top" className="button button--dark">Torna all'inizio <ArrowRight size={17} /></a></div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-footer__brand"><img className="site-footer__logo" src={asset("officine-donnarumma-logo.png")} alt="Officine Donnarumma, Pompei" /></div>
        <p>Panarius · Cesti per montacarichi</p>
        <p>© {new Date().getFullYear()} Officine Donnarumma. Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
}
