import { NextResponse } from "next/server";

/* ============================================================================
   ENQUIRY ENDPOINT
   ----------------------------------------------------------------------------
   Validates server-side (never trust the client's own validation) and forwards
   the enquiry by email.

   To go live, set these in the hosting environment:

     RESEND_API_KEY   — from resend.com
     ENQUIRY_TO       — where enquiries should land (defaults to book@…)
     ENQUIRY_FROM     — a verified sender on your domain

   Without RESEND_API_KEY the route returns 501 and the form falls back to a
   pre-filled mailto, so the site never silently swallows a lead.
   ========================================================================== */

const MAX_LENGTHS: Record<string, number> = {
  name: 120,
  email: 200,
  projectType: 80,
  budget: 60,
  timing: 120,
  message: 5000,
};

type Payload = Record<keyof typeof MAX_LENGTHS, string>;

function validate(body: unknown): { ok: true; data: Payload } | { ok: false; error: string } {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Malformed request." };
  }

  const raw = body as Record<string, unknown>;
  const data = {} as Payload;

  for (const [field, max] of Object.entries(MAX_LENGTHS)) {
    const value = raw[field];
    if (value !== undefined && typeof value !== "string") {
      return { ok: false, error: `Field "${field}" must be text.` };
    }
    const str = ((value as string) ?? "").trim();
    if (str.length > max) {
      return { ok: false, error: `Field "${field}" is too long.` };
    }
    data[field as keyof Payload] = str;
  }

  if (!data.name) return { ok: false, error: "Name is required." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) {
    return { ok: false, error: "A valid email is required." };
  }
  if (data.message.length < 12) {
    return { ok: false, error: "Please include a little detail about the project." };
  }

  return { ok: true, data };
}

/** Strip anything that could be used to inject extra headers into the email. */
function sanitizeHeaderValue(value: string) {
  return value.replace(/[\r\n]+/g, " ").slice(0, 200);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const result = validate(body);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const { data } = result;
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // Not an error in the enquirer's world — the form shows the mailto path.
    return NextResponse.json(
      { error: "Email delivery is not configured on this deployment." },
      { status: 501 }
    );
  }

  const to = process.env.ENQUIRY_TO ?? "book@amrowmedia.com";
  const from = process.env.ENQUIRY_FROM ?? "site@amrowmedia.com";

  const lines = [
    `Name:     ${data.name}`,
    `Email:    ${data.email}`,
    `Project:  ${data.projectType || "—"}`,
    `Budget:   ${data.budget || "—"}`,
    `Timing:   ${data.timing || "—"}`,
    "",
    data.message,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        // Replying to the notification goes straight back to the enquirer.
        reply_to: data.email,
        subject: `Enquiry — ${sanitizeHeaderValue(data.projectType || "Project")} — ${sanitizeHeaderValue(data.name)}`,
        text: lines,
      }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "The email provider rejected the message." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not reach the email provider." }, { status: 502 });
  }
}
