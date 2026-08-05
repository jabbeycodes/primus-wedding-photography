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

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Primus Photography",
  description:
    "Wedding photography in Columbia, Missouri, with engagement sessions, full-day coverage, portraits, albums, videography, drone coverage, and photo booth options.",
  image: "/og.jpg",
  url: "https://primusphotography.com",
  telephone: "+1-336-457-2361",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Columbia",
    addressRegion: "MO",
    addressCountry: "US",
  },
  areaServed: "Columbia, Missouri and surrounding areas",
  priceRange: "$1,800 - $3,600",
  sameAs: ["https://www.instagram.com/primus_events/"],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "09:00",
    closes: "21:00",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Primus Photography",
  url: "https://primusphotography.com",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How far in advance should we book?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most couples book 8–14 months ahead, especially for peak wedding season (May–October). We occasionally have last-minute openings, so it's always worth reaching out.",
      },
    },
    {
      "@type": "Question",
      name: "Do you travel for weddings?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. Based in Columbia, Missouri, we photograph weddings throughout the Midwest and beyond. Travel within 60 miles is included; destination weddings are quoted individually.",
      },
    },
    {
      "@type": "Question",
      name: "How many photos do we receive?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every collection includes high-resolution, professionally retouched images. Golden package typically delivers 400–600 images; Silver 250–350; Bronze 150–250. All delivered via an online gallery within 4–6 weeks.",
      },
    },
    {
      "@type": "Question",
      name: "Can we add an engagement session?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — every collection includes a complimentary pre-wedding session. Additional engagement or anniversary sessions can be added to any package.",
      },
    },
    {
      "@type": "Question",
      name: "What about videography or drone coverage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer videography, drone coverage, and photo booth options as add-ons to any collection. Let us know what you're envisioning and we'll build a custom quote.",
      },
    },
    {
      "@type": "Question",
      name: "How does payment work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A 25% deposit secures your date, with the balance due 14 days before your wedding. Flexible payment plans are available — just ask.",
      },
    },
  ],
};

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
      "Artful wedding photography, engagement sessions, and full-day celebration coverage in Columbia, Missouri and beyond. Check your date today.",
    icons: {
      icon: "/images/primus-logo.jpg",
      shortcut: "/images/primus-logo.jpg",
    },
    openGraph: {
      title: "Primus Photography | Love Stories, Beautifully Told",
      description: "Wedding photography in Columbia, Missouri and beyond. Check your date today.",
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
      <body className={`${display.variable} ${sans.variable}`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </body>
    </html>
  );
}