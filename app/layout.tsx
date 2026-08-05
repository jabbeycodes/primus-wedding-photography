import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "primusphotography.com";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    metadataBase: new URL(origin),
    title: "Primus Photography | Columbia, Missouri Wedding Photographer",
    description:
      "Artful wedding photography, engagement sessions, and full-day celebration coverage in Columbia, Missouri and beyond.",
    icons: {
      icon: "/images/primus-logo.jpg",
      shortcut: "/images/primus-logo.jpg",
    },
    openGraph: {
      title: "Primus Photography | Love Stories, Beautifully Told",
      description: "Wedding photography in Columbia, Missouri and beyond.",
      images: [`${origin}/og.jpg`],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Primus Photography | Love Stories, Beautifully Told",
      description: "Wedding photography in Columbia, Missouri and beyond.",
      images: [`${origin}/og.jpg`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable}`}>{children}</body>
    </html>
  );
}
