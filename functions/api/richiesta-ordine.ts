type OrderPayload = {
  name?: string;
  email?: string;
  phone?: string;
  model?: string;
  quantity?: string | number;
  address?: string;
  postalCode?: string;
  city?: string;
  province?: string;
  notes?: string;
  privacyConsent?: boolean | string;
};

type PagesEnv = {
  RESEND_API_KEY?: string;
};

type PagesContext = {
  request: Request;
  env: PagesEnv;
};

const recipient = "officinedonnarumma@gmail.com";
const allowedModels = new Set([
  "Panarius Pro Wheels",
  "Panarius Pro",
  "Panarius Lite Wheels",
  "Panarius Lite",
]);

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });

const clean = (value: unknown, maxLength = 500) =>
  String(value ?? "").trim().slice(0, maxLength);

export const onRequestPost = async (context: PagesContext) => {
  if (!context.env.RESEND_API_KEY) {
    return json({ error: "Servizio di invio non configurato." }, 503);
  }

  let payload: OrderPayload;
  try {
    payload = (await context.request.json()) as OrderPayload;
  } catch {
    return json({ error: "Richiesta non valida." }, 400);
  }

  const name = clean(payload.name, 120);
  const email = clean(payload.email, 254);
  const phone = clean(payload.phone, 50);
  const model = clean(payload.model, 60);
  const quantity = clean(payload.quantity, 10);
  const address = clean(payload.address, 200);
  const postalCode = clean(payload.postalCode, 20);
  const city = clean(payload.city, 100);
  const province = clean(payload.province, 100);
  const notes = clean(payload.notes, 1500);

  if (!name || !email || !model || !quantity || !address || !postalCode || !city || !province || !payload.privacyConsent) {
    return json({ error: "Compila tutti i campi obbligatori e accetta l’informativa privacy." }, 400);
  }

  if (!allowedModels.has(model)) {
    return json({ error: "Modello non valido." }, 400);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: "Inserisci un indirizzo email valido." }, 400);
  }

  const subject = `Richiesta d’ordine - ${model}`;
  const text = [
    "Nuova richiesta d’ordine Panarius",
    "",
    `Nome e cognome: ${name}`,
    `Email: ${email}`,
    `Telefono: ${phone || "Non indicato"}`,
    `Modello: ${model}`,
    `Quantità: ${quantity}`,
    `Indirizzo: ${address}`,
    `CAP: ${postalCode}`,
    `Comune: ${city}`,
    `Provincia: ${province}`,
    `Note: ${notes || "Nessuna"}`,
  ].join("\n");

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${context.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Panarius <ordini@officinedonnarumma.it>",
      to: [recipient],
      reply_to: email,
      subject,
      text,
    }),
  });

  if (!resendResponse.ok) {
    return json({ error: "Non è stato possibile inviare la richiesta. Riprova tra poco." }, 502);
  }

  return json({ ok: true });
};

export const onRequest = async (context: PagesContext) => {
  if (context.request.method !== "POST") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: { Allow: "POST" },
    });
  }
  return onRequestPost(context);
};
