import { describe, expect, it, vi, afterEach } from "vitest";
import { onRequestPost } from "./richiesta-ordine";

const context = (body: Record<string, unknown>) => ({
  request: new Request("https://officinedonnarumma.it/api/richiesta-ordine", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }),
  env: { RESEND_API_KEY: "test-key" },
});

const validBody = {
  name: "Mario Rossi",
  email: "mario@example.com",
  phone: "+39 333 1234567",
  model: "Panarius Pro Wheels",
  quantity: "1",
  address: "Via Roma 1",
  postalCode: "80045",
  city: "Pompei",
  province: "NA",
  privacyConsent: true,
};

afterEach(() => vi.unstubAllGlobals());

describe("POST /api/richiesta-ordine", () => {
  it("rifiuta i dati obbligatori mancanti", async () => {
    const response = await onRequestPost(context({}));
    expect(response.status).toBe(400);
  });

  it("invia i dati a Resend e restituisce successo", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ id: "email-id" }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const response = await onRequestPost(context(validBody));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.resend.com/emails",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({ Authorization: "Bearer test-key" }),
      }),
    );

    const request = fetchMock.mock.calls[0][1] as RequestInit;
    expect(JSON.parse(String(request.body))).toMatchObject({
      to: ["officinedonnarumma@gmail.com"],
      reply_to: "mario@example.com",
      subject: "Richiesta d’ordine - Panarius Pro Wheels",
    });
  });
});
