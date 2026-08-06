import { eq } from "drizzle-orm";
import { env } from "cloudflare:workers";
import { getDb } from "@/db";
import { inquiries, intakeData } from "@/db/schema";

// GET /api/intake?token=xxx — retrieve inquiry + saved intake data for the portal
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");

    if (!token) {
      return Response.json({ error: "token is required" }, { status: 400 });
    }

    const db = getDb();
    const [inquiry] = await db
      .select()
      .from(inquiries)
      .where(eq(inquiries.portalToken, token))
      .limit(1);

    if (!inquiry) {
      return Response.json({ error: "Invalid or expired link" }, { status: 404 });
    }

    // Get saved intake data if it exists
    const [existing] = await db
      .select()
      .from(intakeData)
      .where(eq(intakeData.inquiryId, inquiry.id))
      .limit(1);

    return Response.json({ inquiry, intake: existing || null });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return Response.json({ error: message }, { status: 500 });
  }
}

// POST /api/intake — save intake data (auto-saves on each step)
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      token: string;
      step?: number;
      completed?: boolean;
      data: Record<string, string>;
    };

    if (!body.token || !body.data) {
      return Response.json({ error: "token and data are required" }, { status: 400 });
    }

    const db = getDb();
    const [inquiry] = await db
      .select()
      .from(inquiries)
      .where(eq(inquiries.portalToken, body.token))
      .limit(1);

    if (!inquiry) {
      return Response.json({ error: "Invalid or expired link" }, { status: 404 });
    }

    // Check if intake data already exists (update vs insert)
    const [existing] = await db
      .select()
      .from(intakeData)
      .where(eq(intakeData.inquiryId, inquiry.id))
      .limit(1);

    const now = new Date().toISOString();
    const completedAt = body.completed ? now : null;

    if (existing) {
      // Update existing record
      await db
        .update(intakeData)
        .set({
          ...body.data,
          completedAt: completedAt || existing.completedAt,
          updatedAt: now,
        })
        .where(eq(intakeData.id, existing.id));
    } else {
      // Insert new record
      await db.insert(intakeData).values({
        inquiryId: inquiry.id,
        ...body.data,
        completedAt,
        updatedAt: now,
      });
    }

    // If completed, update inquiry status and notify photographer
    if (body.completed) {
      await db
        .update(inquiries)
        .set({ status: "intake-complete" })
        .where(eq(inquiries.id, inquiry.id));

      const apiKey = (env as Record<string, string>).RESEND_API_KEY;
      if (apiKey) {
        const { sendEmail, intakeCompleteHtml, NOTIFY_EMAIL, FROM_EMAIL } = await import("@/lib/email");
        const requestHeaders = request.headers;
        const host =
          requestHeaders.get("x-forwarded-host") ??
          requestHeaders.get("host") ??
          "primusphotography.com";
        const protocol =
          requestHeaders.get("x-forwarded-proto") ??
          (host.includes("localhost") ? "http" : "https");
        const adminUrl = `${protocol}://${host}/admin`;

        sendEmail(apiKey, {
          to: NOTIFY_EMAIL,
          from: FROM_EMAIL,
          subject: `Intake complete — ${inquiry.name}`,
          html: intakeCompleteHtml({
            name: inquiry.name,
            email: inquiry.email,
            weddingDate: inquiry.weddingDate,
            portalUrl: adminUrl,
          }),
        });
      }
    }

    return Response.json({ success: true, completed: !!body.completed });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return Response.json({ error: message }, { status: 500 });
  }
}