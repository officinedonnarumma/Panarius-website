import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

type StructuredNode = {
  "@type": string;
  name?: string;
  sku?: string;
  image?: string;
  brand?: { name?: string };
  manufacturer?: { "@id"?: string };
  offers?: {
    price?: string;
    priceCurrency?: string;
    availability?: string;
    url?: string;
  };
};

function publicStructuredData() {
  const html = readFileSync(new URL("./index.html", import.meta.url), "utf8");
  const match = html.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/);
  if (!match?.[1]) throw new Error("Blocco JSON-LD non trovato in client/index.html");
  return JSON.parse(match[1]) as { "@context": string; "@graph": StructuredNode[] };
}

describe("JSON-LD della homepage pubblica", () => {
  it("espone Organization, WebSite e quattro Product acquistabili", () => {
    const data = publicStructuredData();
    const products = data["@graph"].filter((node) => node["@type"] === "Product");

    expect(data["@context"]).toBe("https://schema.org");
    expect(data["@graph"].some((node) => node["@type"] === "Organization")).toBe(true);
    expect(data["@graph"].some((node) => node["@type"] === "WebSite")).toBe(true);
    expect(data["@graph"].some((node) => node["@type"] === "ItemList")).toBe(false);
    expect(products).toHaveLength(4);

    expect(products.map((product) => product.sku)).toEqual(["PNR-100-W", "PNR-100", "PNR-80-W", "PNR-80"]);
    for (const product of products) {
      expect(product.brand?.name).toBe("Panarius");
      expect(product.manufacturer?.["@id"]).toBe("https://officinedonnarumma.it/#organization");
      expect(product.image).toMatch(/^https:\/\/officinedonnarumma\.it\/assets\/.+\.jpg$/);
      expect(product.offers).toMatchObject({
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: "https://officinedonnarumma.it/#panarius",
      });
    }
  });
});
