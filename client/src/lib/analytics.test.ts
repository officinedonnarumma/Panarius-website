import { afterEach, describe, expect, it, vi } from "vitest";
import { trackPurchaseClick } from "./analytics";

describe("trackPurchaseClick", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("sends the purchase channel and product code to Umami", () => {
    const track = vi.fn();
    vi.stubGlobal("window", { umami: { track } });

    trackPurchaseClick("amazon", "PNR-100-W");

    expect(track).toHaveBeenCalledWith("purchase_click", {
      channel: "amazon",
      product_code: "PNR-100-W",
    });
  });

  it("does nothing when the tracker is not available", () => {
    vi.stubGlobal("window", {});

    expect(() => trackPurchaseClick("direct", "PNR-100")).not.toThrow();
  });
});
