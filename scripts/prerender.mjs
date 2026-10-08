import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicIndexPath = path.join(projectRoot, "dist", "public", "index.html");
const serverEntryPath = path.join(projectRoot, "dist", "server-ssr", "entry-server.js");
const documentHtml = await readFile(publicIndexPath, "utf8");
const rootPlaceholderPattern = /<div id="root">(?:<!--app-html-->)?<\/div>/g;
const placeholders = documentHtml.match(rootPlaceholderPattern) ?? [];

if (placeholders.length !== 1) {
  throw new Error(
    `Prerender non eseguito: atteso un solo placeholder di #root in ${publicIndexPath}, trovati ${placeholders.length}.`,
  );
}

const { render } = await import(pathToFileURL(serverEntryPath).href);
const result = render("/");

if (!result || typeof result.html !== "string" || result.html.trim().length === 0) {
  throw new Error("Prerender non eseguito: render('/') non ha restituito markup HTML.");
}

const prerenderedDocument = documentHtml.replace(rootPlaceholderPattern, `<div id="root">${result.html}</div>`);

await writeFile(publicIndexPath, prerenderedDocument, "utf8");
