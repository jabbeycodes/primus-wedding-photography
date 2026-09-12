// Magic-link login for the admin area.
// Visiting /api/admin/auth?token=<ADMIN_TOKEN> sets a long-lived httpOnly
// cookie and redirects to /admin. Wrong or missing token -> 404 (does not
// reveal that an admin area exists).
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { env } from "cloudflare:workers";

export const dynamic = "force-dynamic";

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export async function GET(req: Request) {
  const adminToken = (env as Record<string, string | undefined>).ADMIN_TOKEN;
  const token = new URL(req.url).searchParams.get("token") ?? "";
  if (!adminToken || !safeEqual(token, adminToken)) {
    notFound();
  }
  const store = await cookies();
  store.set("admin_token", adminToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });
  redirect("/admin");
}
