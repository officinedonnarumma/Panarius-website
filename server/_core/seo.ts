export type SeoHead = {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  ogImageAlt?: string;
  notFound?: boolean;
  noindex?: boolean;
};

export const SITE_NAME = "Panarius | Officine Donnarumma";
export const DEFAULT_CANONICAL_ORIGIN = "https://officinedonnarumma.it";
export const SHARE_IMAGE = "/assets/cesto-panarius-per-montacarichi-sospeso_3c3f94f9.png";

export const catalogProducts = [
  {
    name: "Panarius Pro Wheels",
    code: "PNR-100-W",
    price: "215.00",
    image: "/assets/cesto-panarius-pro-wheels-ruote-sterzanti_03b659e1.jpg",
    description: "Cesta carrello in acciaio per montacarichi e paranco, capacità 100 L, con ruote sterzanti.",
  },
  {
    name: "Panarius Pro",
    code: "PNR-100",
    price: "185.00",
    image: "/assets/cesto-panarius-pro-piedini-fissi_82e689da.jpg",
    description: "Cesto in acciaio per montacarichi e paranco, capacità 100 L, con piedini fissi.",
  },
  {
    name: "Panarius Lite Wheels",
    code: "PNR-80-W",
    price: "175.00",
    image: "/assets/cesto-panarius-lite-wheels-ruote-sterzanti_05d1b1a8.jpg",
    description: "Cesta carrello in acciaio per montacarichi e paranco, capacità 80 L, con ruote sterzanti.",
  },
  {
    name: "Panarius Lite",
    code: "PNR-80",
    price: "145.00",
    image: "/assets/cesto-panarius-lite-piedini-fissi_ab52b6fa.jpg",
    description: "Cesta in acciaio per montacarichi e paranco da balcone, capacità 80 L, con piedini fissi.",
  },
] as const;

export function canonicalOrigin() {
  return (process.env.CANONICAL_ORIGIN || DEFAULT_CANONICAL_ORIGIN).replace(/\/+$/, "");
}

export function headForPath(pathname: string): SeoHead {
  const cleanPath = pathname.replace(/\/+$/, "") || "/";
  if (cleanPath === "/") {
    return {
      title: "Cesto per paranco e montacarichi | Panarius",
      description:
        "Panarius è il cesto metallico per paranco e montacarichi: legna, pellet, spesa, casse d’acqua, pacchi, materiali edili e agricoli.",
      canonicalPath: "/",
      ogImage: SHARE_IMAGE,
      ogImageAlt: "Cesta per montacarichi Panarius sospesa",
    };
  }
  return {
    title: "Pagina non trovata | Panarius",
    description: "La pagina richiesta non è disponibile.",
    notFound: true,
  };
}

export function buildStructuredData(origin: string) {
  const organizationId = `${origin}/#organization`;
  const websiteId = `${origin}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: "Officine Donnarumma",
        url: origin,
        email: "officinedonnarumma@gmail.com",
        logo: `${origin}/assets/logo-officine-donnarumma-pompei_354bdd6b.png`,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: SITE_NAME,
        url: origin,
        inLanguage: "it-IT",
        publisher: { "@id": organizationId },
        description: "Cesti metallici Panarius per paranchi e montacarichi, per uso domestico, commerciale, edilizio, agricolo e ricettivo.",
      },
      ...catalogProducts.map((product) => ({
        "@type": "Product",
        name: product.name,
        description: product.description,
        brand: { "@type": "Brand", name: "Panarius" },
        manufacturer: { "@id": organizationId },
        sku: product.code,
        image: `${origin}${product.image}`,
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url: `${origin}/#panarius`,
        },
      })),
    ],
  };
}
