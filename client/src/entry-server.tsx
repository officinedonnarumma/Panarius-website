import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import App from "./App";
import { headForPath, type SeoHead } from "../../server/_core/seo";

export type SsrRenderResult = {
  html: string;
  head: SeoHead;
};

export function render(url: string): SsrRenderResult {
  const queryIndex = url.indexOf("?");
  const ssrPath = queryIndex === -1 ? url : url.slice(0, queryIndex);
  const ssrSearch = queryIndex === -1 ? "" : url.slice(queryIndex + 1);
  const html = renderToString(
    <Router ssrPath={ssrPath} ssrSearch={ssrSearch}>
      <App />
    </Router>,
  );

  return { html, head: headForPath(ssrPath) };
}
