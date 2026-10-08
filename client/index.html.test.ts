import { describe, expect, it } from "vitest";
import { buildStructuredData, catalogProducts } from "../server/_core/seo";

describe("JSON-LD della homepage pubblica", () => {
  it("espone Organization, WebSite e quattro Product acquistabili", () => {
    const data = buildStructuredData("https://officinedonnarumma.it") as {
      "@context": string;
      "@graph": Array<{
        "@type": string;
        itemListElement?: Array<{
          item?: {
            name?: string;
            sku?: string;
            offers?: { price?: string; priceCurrency?: string };
          };
        }>;
      }>;
    };
    const itemList = data["@graph"].find((node) => node["@type"] === "ItemList");
    const products = itemList?.itemListElement?.map((entry) => entry.item).filter(Boolean) ?? [];

    expect(data["@context"]).toBe("https://schema.org");
    expect(data["@graph"].some((node) => node["@type"] === "Organization")).toBe(true);
    expect(data["@graph"].some((node) => node["@type"] === "WebSite")).toBe(true);
    expect(products).toHaveLength(4);
    expect(products.map((product) => product?.sku)).toEqual(catalogProducts.map((product) => product.code));
    expect(products.map((product) => product?.name)).toEqual(catalogProducts.map((product) => product.name));
    expect(products.find((product) => product?.sku === "PNR-80-W")?.offers).toMatchObject({ price: "180.00", priceCurrency: "EUR" });
    expect(products.find((product) => product?.sku === "PNR-80")?.offers).toMatchObject({ price: "150.00", priceCurrency: "EUR" });
  });
});
