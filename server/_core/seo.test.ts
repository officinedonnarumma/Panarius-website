import { describe, expect, it } from "vitest";
import { buildStructuredData, catalogProducts, headForPath } from "./seo";

describe("SEO Panarius", () => {
  it("espone un head indicizzabile e coerente per la homepage", () => {
    const head = headForPath("/");
    expect(head.notFound).toBeUndefined();
    expect(head.canonicalPath).toBe("/");
    expect(head.title).toContain("paranco e montacarichi");
    expect(head.description).toContain("realizzato artigianalmente a Pompei");
    expect(head.description).toContain("Officine Donnarumma");
  });

  it("usa le quattro denominazioni prodotto aggiornate nel JSON-LD", () => {
    const structuredData = JSON.stringify(buildStructuredData("https://example.com"));
    for (const product of catalogProducts) expect(structuredData).toContain(product.name);
  });
});
