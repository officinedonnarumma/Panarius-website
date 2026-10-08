import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicIndexPath = path.join(projectRoot, "dist", "public", "index.html");
const serverEntryPath = path.join(projectRoot, "dist", "server-ssr", "entry-server.js");
const rootPlaceholder = '<div id="root"></div>';

const documentHtml = await readFile(publicIndexPath, "utf8");
const placeholderCount = documentHtml.split(rootPlaceholder).length - 1;

if (placeholderCount !== 1) {
  throw new Error(
    `Prerender non eseguito: atteso un solo ${rootPlaceholder} in ${publicIndexPath}, trovati ${placeholderCount}.`,
  );
}

const { render } = await import(pathToFileURL(serverEntryPath).href);
const result = render("/");

if (!result || typeof result.html !== "string" || result.html.trim().length === 0) {
  throw new Error("Prerender non eseguito: render('/') non ha restituito markup HTML.");
}

const prerenderedDocument = documentHtml.replace(
  rootPlaceholder,
  () => `<div id="root">${result.html}</div>`,
);

await writeFile(publicIndexPath, prerenderedDocument, "utf8");
