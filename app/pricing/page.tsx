import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import FAQ from "../components/FAQ";

export const metadata: Metadata = {
  title: "Wedding Photography Pricing in Columbia, MO | Primus Photography",
  description:
    "Wedding photography collections from $1,800 in Columbia, Missouri, plus engagement sessions. Request the full pricing guide and check your 2026–2027 date.",
  alternates: {
    canonical: "https://primusphotography.com/pricing",
  },
};

const pricingFaqs = [
  {
    question: "How do we book our date?",
    answer:
      "Send an inquiry through our contact form or call/text (336) 457-2361. We'll confirm your date is open and send the full pricing guide. A signed agreement and deposit reserve your date — now booking 2026 and 2027 weddings.",
  },
  {
    question: "Is a deposit required?",
    answer:
      "Yes — a deposit secures your wedding date, with the balance due before the wedding. Exact details are included in the pricing guide, and flexible payment plans are available. Just ask.",
  },
  {
    question: "Do you travel for weddings?",
    answer:
      "Yes. We're based in Columbia, Missouri and photograph weddings throughout Mid-Missouri — including Jefferson City, Ashland, Fulton, Boonville, and Lake Ozark. Celebrations further afield are quoted individually.",
  },
  {
    question: "When do we receive our photos?",
    answer:
      "Your carefully edited, high-resolution images are delivered in a private online gallery you can share with family and friends — typically within a few weeks of your wedding day.",
  },
  {
    question: "Can we add an engagement session?",
    answer:
      "Absolutely. Engagement sessions can be booked on their own or alongside any wedding collection. They're a wonderful way to get comfortable in front of the camera before the big day.",
  },
];

const pricingFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: pricingFaqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const collections = [
  {
    name: "Wedding Collections",
    price: "From $1,800",
    coverage: "Full wedding-day coverage",
    features: [
      "Complimentary pre-wedding session",
      "High-resolution, retouched images",
      "Private online gallery",
      "Coverage shaped around your day",
    ],
    cta: "Ask about collections",
  },
  {
    name: "Engagement Sessions",
    price: "Ask for details",
    coverage: "Standalone or with a collection",
    features: [
      "Relaxed session at a location you love",
      "High-resolution, retouched images",
      "Private online gallery to share",
      "A great way to get comfortable together",
    ],
    cta: "Plan your session",
  },
  {
    name: "Custom Coverage",
    price: "Let's talk",
    coverage: "Built around your celebration",
    featured: true,
    features: [
      "Timelines from intimate to full-day",
      "Albums & prints available",
      "Videography, drone & photo booth add-ons",
      "A quote tailored to your plans",
    ],
    cta: "Start a conversation",
  },
] as const;

export default function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <p className="eyebrow">Pricing · Primus Photography</p>
          <h1>
            Wedding photography pricing
            <span>Columbia, Missouri</span>
          </h1>
          <p className="lead">
            Wedding collections from $1,800, plus engagement sessions.
            Honest pricing, timeless photographs — now booking 2026 and
            2027 weddings.
          </p>
        </section>

        <section className="packages section" aria-label="Collections and pricing">
          <div className="section-heading packages-heading">
            <div>
              <p className="eyebrow">Collections · 01</p>
              <h2>Simple, honest wedding photography pricing.</h2>
            </div>
            <p>
              Every collection is built around your day — no cookie-cutter
              packages. Reach out for the full pricing guide with complete
              details.
            </p>
          </div>

          <div className="package-grid">
            {collections.map((item) => (
              <article
                className={"featured" in item && item.featured ? "package featured" : "package"}
                key={item.name}
              >
                {"featured" in item && item.featured ? (
                  <span className="featured-label">Most flexible</span>
                ) : null}
                <p className="package-name">{item.name}</p>
                <p className="price">{item.price}</p>
                <p className="coverage">{item.coverage}</p>
                <ul>
                  {item.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <a href="/contact">{item.cta}</a>
              </article>
            ))}
          </div>

          <div className="package-footer">
            <p>
              Planning something unique? Every wedding is different — tell us
              about yours and we&apos;ll build the right coverage together.
            </p>
            <a className="button button-dark" href="/contact">
              Get the full pricing guide →
            </a>
          </div>
        </section>

        <section className="section" aria-label="What to expect">
          <div className="section-heading">
            <div>
              <p className="eyebrow">What to expect · 02</p>
              <h2>From first hello to final gallery.</h2>
            </div>
            <p>
              Booking your Columbia, Missouri wedding photographer should be
              the easy part of planning. Here&apos;s how it works.
            </p>
          </div>
          <ol className="steps">
            <li>
              <span>01</span>
              <div>
                <h3>Check your date</h3>
                <p>
                  Send an inquiry with your wedding date and venue. We&apos;ll
                  confirm availability and send the full pricing guide.
                </p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Reserve your day</h3>
                <p>
                  A signed agreement and deposit lock in your date — then the
                  fun part begins: planning your coverage together.
                </p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Relive it beautifully</h3>
                <p>
                  After your wedding, your edited, high-resolution photographs
                  arrive in a private online gallery within a few weeks.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <section className="faq-section section" aria-label="Pricing questions">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Good to know · 03</p>
              <h2>Pricing questions, answered.</h2>
            </div>
            <p>
              Still have questions? Text us anytime — we&apos;re happy to
              chat through the details.
            </p>
          </div>
          <FAQ items={pricingFaqs} />
          <div className="faq-cta">
            <p>Ready to check your date?</p>
            <a className="button button-dark" href="/contact">
              Contact us →
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingFaqJsonLd) }}
      />
    </>
  );
}
