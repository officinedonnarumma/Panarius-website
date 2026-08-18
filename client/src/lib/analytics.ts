export type PurchaseChannel = "amazon" | "ebay" | "direct";

export function trackPurchaseClick(channel: PurchaseChannel, productCode?: string) {
  if (typeof window === "undefined") return;

  const tracker = window.umami;
  if (typeof tracker?.track !== "function") return;

  tracker.track("purchase_click", {
    channel,
    ...(productCode ? { product_code: productCode } : {}),
  });
}

declare global {
  interface Window {
    umami?: {
      track: (eventName: string, data?: Record<string, string>) => void;
    };
  }
}

export {};
