import { desc, eq } from "drizzle-orm";
import { env } from "cloudflare:workers";
import { getDb } from "@/db";
import { inquiries, intakeData } from "@/db/schema";
import { generateToken } from "@/lib/token";

function toRouteErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "Unexpected error";
  const detail =
    error instanceof Error && error.cause instanceof Error ? error.cause.message : "";
  const combined = `${message}\n${detail}`;

  if (combined.includes("no such table") || combined.includes('from "inquiries"')) {
    return "The inquiries table is unavailable. Generate the migration locally with `npm run db:generate`, then deploy so the platform can apply the generated SQL to the real D1 database.";
  }

  return message;
}

export async function GET() {
  try {
    const db = getDb();
    const rows = await db
      .select()
      .from(inquiries)
      .orderBy(desc(inquiries.createdAt), desc(inquiries.id))
      .limit(50);

    return Response.json({ inquiries: rows });
  } catch (error) {
    return Response.json(
      { error: toRouteErrorMessage(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      name?: string;
      email?: string;
      phone?: string;
      weddingDate?: string;
      venue?: string;
      package?: string;
      message?: string;
      referralSource?: string;
    };

    const name = payload.name?.trim() ?? "";
    const email = payload.email?.trim() ?? "";
    const message = payload.message?.trim() ?? "";

    if (!name || !email) {
      return Response.json(
        { error: "name and email are required" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    const portalToken = generateToken();

    const db = getDb();
    const [inquiry] = await db
      .insert(inquiries)
      .values({
        name,
        email,
        phone: payload.phone?.trim() || null,
        weddingDate: payload.weddingDate?.trim() || null,
        venue: payload.venue?.trim() || null,
        package: payload.package?.trim() || null,
        message,
        referralSource: payload.referralSource?.trim() || null,
        portalToken,
        status: "intake-sent",
      })
      .returning();

    // Send inquiry notification email to photographer
    const apiKey = (env as Record<string, string>).RESEND_API_KEY;
    if (apiKey) {
      // 1. Notification to photographer
      const { sendEmail, inquiryEmailHtml, NOTIFY_EMAIL, FROM_EMAIL, intakeInvitationHtml } = await import("@/lib/email");
      sendEmail(apiKey, {
        to: NOTIFY_EMAIL,
        from: FROM_EMAIL,
        subject: `New inquiry from ${name}${payload.weddingDate ? ` — wedding ${payload.weddingDate}` : ""}`,
        html: inquiryEmailHtml({
          name,
          email,
          phone: inquiry.phone,
          weddingDate: inquiry.weddingDate,
          venue: inquiry.venue,
          package: inquiry.package,
          message,
        }),
      });

      // 2. Intake invitation email to the couple
      const requestHeaders = request.headers;
      const host =
        requestHeaders.get("x-forwarded-host") ??
        requestHeaders.get("host") ??
        "primusphotography.com";
      const protocol =
        requestHeaders.get("x-forwarded-proto") ??
        (host.includes("localhost") ? "http" : "https");
      const portalUrl = `${protocol}://${host}/portal/${portalToken}`;

      sendEmail(apiKey, {
        to: email,
        from: FROM_EMAIL,
        subject: `Your Primus Photography intake form${payload.weddingDate ? ` — ${payload.weddingDate}` : ""}`,
        html: intakeInvitationHtml({
          name,
          weddingDate: inquiry.weddingDate,
          portalUrl,
        }),
      });
    }

    return Response.json({ inquiry, portalToken }, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: toRouteErrorMessage(error) },
      { status: 500 }
    );
  }
}