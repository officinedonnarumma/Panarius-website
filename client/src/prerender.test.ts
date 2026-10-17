import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as React from "react";
import { describe, expect, it } from "vitest";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const publicIndexPath = path.join(projectRoot, "dist", "public", "index.html");

describe("homepage prerenderizzata per Cloudflare Pages", () => {
  it("inserisce il contenuto reale della homepage dentro #root", async () => {
    const documentHtml = await readFile(publicIndexPath, "utf8");
    const rootStart = documentHtml.indexOf('<div id="root">');
    const moduleScriptStart = documentHtml.indexOf("<script", rootStart);

    expect(rootStart).toBeGreaterThanOrEqual(0);
    expect(moduleScriptStart).toBeGreaterThan(rootStart);
    expect(documentHtml).not.toContain('<div id="root"></div>');

    const rootMarkup = documentHtml.slice(rootStart, moduleScriptStart);
    expect(rootMarkup).toContain("Panarius");
    expect(rootMarkup).toContain("Officine Donnarumma");
    expect(rootMarkup).toContain("Il tuo carico");
    expect(rootMarkup).toContain("Panarius Pro Wheels");
  });

  it("mantiene lo stesso markup SSR nella preview WebDev", async () => {
    (globalThis as typeof globalThis & { React: typeof React }).React = React;
    const { render } = await import("./entry-server");
    expect(render("/?from_webdev=1").html).toBe(render("/").html);
  });
});
