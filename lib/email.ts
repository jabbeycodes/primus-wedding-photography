/**
 * Send email notifications via Resend.
 * Requires RESEND_API_KEY in the Cloudflare Worker environment.
 * Free tier: 100 emails/day — more than enough for wedding inquiries.
 *
 * Get a key at https://resend.com → API Keys → Create.
 * Set it as a Cloudflare secret:
 *   npx wrangler secret put RESEND_API_KEY
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const NOTIFY_EMAIL = "primusphotographyinfo@gmail.com";
const FROM_EMAIL = "inquiries@primusphotography.com";

type EmailPayload = {
  to: string;
  from: string;
  subject: string;
  html: string;
};

export async function sendEmail(
  apiKey: string,
  payload: EmailPayload
): Promise<boolean> {
  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Resend API error:", res.status, text);
      return false;
    }

    return true;
  } catch (err) {
    console.error("Email send failed:", err);
    return false;
  }
}

export function inquiryEmailHtml(data: {
  name: string;
  email: string;
  phone?: string | null;
  weddingDate?: string | null;
  venue?: string | null;
  package?: string | null;
  message: string;
}): string {
  const rows = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone || "—"],
    ["Wedding date", data.weddingDate || "—"],
    ["Venue", data.venue || "—"],
    ["Package", data.package || "—"],
    ["Message", data.message || "—"],
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 16px 8px 0;font-weight:700;vertical-align:top;color:#153c2b;">${label}</td><td style="padding:8px 0;vertical-align:top;">${value}</td></tr>`
    )
    .join("");

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;background:#fbf9f3;border:1px solid rgba(20,39,29,0.18);border-radius:4px;overflow:hidden;">
      <div style="background:#153c2b;color:#fbf9f3;padding:24px 32px;">
        <h1 style="margin:0;font-size:1.4rem;font-weight:600;">New Wedding Inquiry</h1>
        <p style="margin:8px 0 0;font-size:0.85rem;opacity:0.8;">Submitted via primusphotography.com</p>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:0.92rem;color:#14271d;">
        ${rowsHtml}
      </table>
      <div style="padding:20px 32px;background:#f4f0e7;border-top:1px solid rgba(20,39,29,0.18);">
        <p style="margin:0;font-size:0.78rem;color:#9baa91;">Reply directly to this email or contact the couple at ${data.email}${data.phone ? ` / ${data.phone}` : ""}.</p>
      </div>
    </div>
  `;
}

export function leadEmailHtml(data: {
  email: string;
  source: string;
  weddingDate?: string | null;
  note?: string | null;
}): string {
  const sourceLabel: Record<string, string> = {
    newsletter: "Newsletter signup",
    "date-checker": "Date availability check",
    "sticky-cta": "Sticky CTA",
    packages: "Package inquiry",
  };

  const rows = [
    ["Email", data.email],
    ["Source", sourceLabel[data.source] || data.source],
    ["Wedding date", data.weddingDate || "—"],
    ["Note", data.note || "—"],
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 16px 8px 0;font-weight:700;vertical-align:top;color:#153c2b;">${label}</td><td style="padding:8px 0;vertical-align:top;">${value}</td></tr>`
    )
    .join("");

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;background:#fbf9f3;border:1px solid rgba(20,39,29,0.18);border-radius:4px;overflow:hidden;">
      <div style="background:#153c2b;color:#fbf9f3;padding:24px 32px;">
        <h1 style="margin:0;font-size:1.4rem;font-weight:600;">New Lead Captured</h1>
        <p style="margin:8px 0 0;font-size:0.85rem;opacity:0.8;">Submitted via primusphotography.com</p>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:0.92rem;color:#14271d;">
        ${rowsHtml}
      </table>
      <div style="padding:20px 32px;background:#f4f0e7;border-top:1px solid rgba(20,39,29,0.18);">
        <p style="margin:0;font-size:0.78rem;color:#9baa91;">Follow up at ${data.email} to convert this lead into a booking.</p>
      </div>
    </div>
  `;
}

export { NOTIFY_EMAIL, FROM_EMAIL };