import { describe, expect, it } from "vitest";
import { buildStructuredData, catalogProducts, headForPath } from "./seo";

describe("SEO Panarius", () => {
  it("espone un head indicizzabile e coerente per la homepage", () => {
    const head = headForPath("/");
    expect(head.notFound).toBeUndefined();
    expect(head.canonicalPath).toBe("/");
    expect(head.title).toContain("paranco e montacarichi");
  });

  it("espone quattro Product completi di brand, SKU, prezzo e disponibilità", () => {
    const structuredData = buildStructuredData("https://example.com");
    const products = structuredData["@graph"].filter((node) => node["@type"] === "Product");

    expect(structuredData["@graph"].some((node) => node["@type"] === "ItemList")).toBe(false);
    expect(products).toHaveLength(4);
    expect(products.map((product) => product.sku)).toEqual(catalogProducts.map((product) => product.code));
    for (const product of products) {
      expect(product.brand).toEqual({ "@type": "Brand", name: "Panarius" });
      expect(product.offers).toMatchObject({
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: "https://example.com/#panarius",
      });
    }
  });
});
