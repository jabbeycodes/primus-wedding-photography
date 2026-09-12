// Sign out of the admin area: clears the admin session cookie.
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export async function GET() {
  const store = await cookies();
  store.delete("admin_session");
  redirect("/");
}
