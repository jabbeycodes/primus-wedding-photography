// Password login for the admin area.
// The /admin login form POSTs the password here. On success a long-lived
// httpOnly session cookie is set and the user is redirected to /admin.
// The cookie holds a SHA-256 derived value, never the password itself.
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  adminSessionValue,
  getAdminPassword,
} from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export async function POST(req: Request) {
  const adminPassword = getAdminPassword();
  const form = await req.formData();
  const password = String(form.get("password") ?? "");
  if (adminPassword && safeEqual(password, adminPassword)) {
    const store = await cookies();
    store.set("admin_session", await adminSessionValue(adminPassword), {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
    redirect("/admin");
  }
  redirect("/admin?error=1");
}
