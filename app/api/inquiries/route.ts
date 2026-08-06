import { desc } from "drizzle-orm";
import { env } from "cloudflare:workers";
import { getDb } from "@/db";
import { inquiries } from "@/db/schema";
import { sendEmail, inquiryEmailHtml, NOTIFY_EMAIL, FROM_EMAIL } from "@/lib/email";

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

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

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
      })
      .returning();

    // Send email notification (non-blocking — email failure won't reject the inquiry)
    const apiKey = (env as Record<string, string>).RESEND_API_KEY;
    if (apiKey) {
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
    }

    return Response.json({ inquiry }, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: toRouteErrorMessage(error) },
      { status: 500 }
    );
  }
}