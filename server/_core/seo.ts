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
export const SHARE_IMAGE = "/manus-storage/cesto-panarius-per-montacarichi-sospeso_3c3f94f9.png";

export const catalogProducts = [
  { name: "Panarius Pro Wheels", code: "PNR-100-W", price: "215.00", image: "/manus-storage/cesto-panarius-pro-wheels-ruote-sterzanti_03b659e1.jpg" },
  { name: "Panarius Pro", code: "PNR-100", price: "185.00", image: "/manus-storage/cesto-panarius-pro-piedini-fissi_82e689da.jpg" },
  { name: "Panarius Lite Wheels", code: "PNR-80-W", price: "175.00", image: "/manus-storage/cesto-panarius-lite-wheels-ruote-sterzanti_05d1b1a8.jpg" },
  { name: "Panarius Lite", code: "PNR-80", price: "145.00", image: "/manus-storage/cesto-panarius-lite-piedini-fissi_ab52b6fa.jpg" },
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
  const productItems = catalogProducts.map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Product",
      name: product.name,
      sku: product.code,
      description: "Cesto metallico Panarius per paranchi e montacarichi, adatto a carichi domestici, commerciali, edili e agricoli.",
      brand: { "@type": "Brand", name: "Officine Donnarumma" },
      image: `${origin}${product.image}`,
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: "EUR",
        url: `${origin}/#panarius`,
      },
    },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
      "@type": "Organization",
        name: "Officine Donnarumma",
        url: origin,
        email: "officinedonnarumma@gmail.com",
        logo: `${origin}/manus-storage/logo-officine-donnarumma-pompei_354bdd6b.png`,
      },
      {
        "@type": "WebSite",
        name: SITE_NAME,
        url: origin,
        inLanguage: "it-IT",
        description: "Cesti metallici Panarius per paranchi e montacarichi, per uso domestico, commerciale, edilizio, agricolo e ricettivo.",
      },
      {
        "@type": "ItemList",
        name: "Cesti per montacarichi Panarius",
        itemListElement: productItems,
      },
    ],
  };
}
