import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const sitemapPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "sitemap.xml");

describe("sitemap pubblica", () => {
  it("indica la homepage canonica e una data di modifica aggiornata", async () => {
    const sitemap = await readFile(sitemapPath, "utf8");

    expect(sitemap).toContain("<loc>https://officinedonnarumma.it/</loc>");
    expect(sitemap).toContain("<lastmod>2026-10-17</lastmod>");
    expect(sitemap).toContain("<priority>1.0</priority>");
  });
});
