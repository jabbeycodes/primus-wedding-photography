// Shared admin session check for protected pages and API routes.
// The session cookie is set by POSTing the correct password to
// /api/admin/auth (validated against the ADMIN_PASSWORD worker secret).
// The cookie holds a SHA-256 derived value, never the password itself.
import { cookies } from "next/headers";
import { env } from "cloudflare:workers";

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export async function adminSessionValue(password: string): Promise<string> {
  const data = new TextEncoder().encode(`primus-admin-session:${password}`);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function getAdminPassword(): string | undefined {
  return (env as Record<string, string | undefined>).ADMIN_PASSWORD;
}

export async function hasAdminSession(): Promise<boolean> {
  const adminPassword = getAdminPassword();
  if (!adminPassword) return false;
  const session = (await cookies()).get("admin_session")?.value ?? "";
  return safeEqual(session, await adminSessionValue(adminPassword));
}
