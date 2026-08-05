import { desc } from "drizzle-orm";
import { getDb } from "@/db";
import { leads } from "@/db/schema";

function toRouteErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "Unexpected error";
  const detail =
    error instanceof Error && error.cause instanceof Error ? error.cause.message : "";
  const combined = `${message}\n${detail}`;

  if (combined.includes("no such table") || combined.includes('from "leads"')) {
    return "The leads table is unavailable. Generate the migration locally with `npm run db:generate`, then deploy so the platform can apply the generated SQL to the real D1 database.";
  }

  return message;
}

export async function GET() {
  try {
    const db = getDb();
    const rows = await db
      .select()
      .from(leads)
      .orderBy(desc(leads.createdAt), desc(leads.id))
      .limit(50);

    return Response.json({ leads: rows });
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
      email?: string;
      source?: string;
      weddingDate?: string;
      note?: string;
    };

    const email = payload.email?.trim() ?? "";
    const source = payload.source?.trim() ?? "";

    if (!email || !source) {
      return Response.json(
        { error: "email and source are required" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    const db = getDb();
    const [lead] = await db
      .insert(leads)
      .values({
        email,
        source,
        weddingDate: payload.weddingDate?.trim() || null,
        note: payload.note?.trim() || null,
      })
      .returning();

    return Response.json({ lead }, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: toRouteErrorMessage(error) },
      { status: 500 }
    );
  }
}