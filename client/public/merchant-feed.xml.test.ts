import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const expectedProducts = [
  { id: "PNR-100-W", price: "215.00 EUR", image: "cesto-panarius-pro-wheels-ruote-sterzanti_03b659e1.jpg" },
  { id: "PNR-100", price: "185.00 EUR", image: "cesto-panarius-pro-piedini-fissi_82e689da.jpg" },
  { id: "PNR-80-W", price: "175.00 EUR", image: "cesto-panarius-lite-wheels-ruote-sterzanti_05d1b1a8.jpg" },
  { id: "PNR-80", price: "145.00 EUR", image: "cesto-panarius-lite-piedini-fissi_ab52b6fa.jpg" },
];

const field = (item: string, name: string) => item.match(new RegExp(`<g:${name}>([\\s\\S]*?)<\\/g:${name}>`))?.[1];

describe("feed Merchant Center Panarius", () => {
  it("pubblica quattro prodotti completi e coerenti con le schede del catalogo", () => {
    const xml = readFileSync(new URL("./merchant-feed.xml", import.meta.url), "utf8");
    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((match) => match[1] ?? "");

    expect(xml).toContain('xmlns:g="http://base.google.com/ns/1.0"');
    expect(xml).not.toContain("<g:identifier_exists>");
    expect(items).toHaveLength(4);

    for (const [index, item] of items.entries()) {
      const expected = expectedProducts[index];
      expect(expected).toBeDefined();
      expect(field(item, "id")).toBe(expected?.id);
      expect(field(item, "mpn")).toBe(expected?.id);
      expect(field(item, "brand")).toBe("Panarius");
      expect(field(item, "availability")).toBe("in_stock");
      expect(field(item, "condition")).toBe("new");
      expect(field(item, "price")).toBe(expected?.price);
      expect(field(item, "link")).toBe("https://officinedonnarumma.it/#panarius");
      expect(field(item, "image_link")).toBe(`https://officinedonnarumma.it/assets/${expected?.image}`);
    }
  });
});
