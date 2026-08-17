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
export const DEFAULT_CANONICAL_ORIGIN = "https://officinedon-f6a6rcbv.manus.space";
export const SHARE_IMAGE = "/manus-storage/panarius-hero-cable-only-gpt_164f15a6.png";

export const catalogProducts = [
  { name: "Panarius Pro Wheels", code: "PNR-100-W", price: "215.00", image: "/manus-storage/panarius-variant-01_b9e16593.jpg" },
  { name: "Panarius Pro", code: "PNR-100", price: "185.00", image: "/manus-storage/panarius-variant-02_01f381e7.jpg" },
  { name: "Panarius Lite Wheels", code: "PNR-80-W", price: "175.00", image: "/manus-storage/panarius-variant-03_e9d7ffc2.jpg" },
  { name: "Panarius Lite", code: "PNR-80", price: "145.00", image: "/manus-storage/panarius-variant-04_d5920e0f.jpg" },
] as const;

export function canonicalOrigin() {
  return (process.env.CANONICAL_ORIGIN || DEFAULT_CANONICAL_ORIGIN).replace(/\/+$/, "");
}

export function headForPath(pathname: string): SeoHead {
  const cleanPath = pathname.replace(/\/+$/, "") || "/";
  if (cleanPath === "/") {
    return {
      title: "Panarius | Cesti per montacarichi | Officine Donnarumma",
      description:
        "Panarius è la cesta per montacarichi artigianale di Officine Donnarumma: scopri varianti, misure, prezzi indicativi e canali di acquisto.",
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
        logo: `${origin}/manus-storage/officine-donnarumma-logo-original-transparent_bdd78817.png`,
      },
      {
        "@type": "WebSite",
        name: SITE_NAME,
        url: origin,
        inLanguage: "it-IT",
      },
      {
        "@type": "ItemList",
        name: "Cesti per montacarichi Panarius",
        itemListElement: productItems,
      },
    ],
  };
}
