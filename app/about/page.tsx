import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "About Primus Photography | Columbia, MO Wedding Photographer",
  description:
    "Meet Primus Photography — a Columbia, Missouri wedding photographer capturing timeless, emotional images for couples across Mid-Missouri.",
  alternates: {
    canonical: "https://primusphotography.com/about",
  },
};

const serviceAreas = [
  "Columbia, MO",
  "Jefferson City, MO",
  "Ashland, MO",
  "Fulton, MO",
  "Boonville, MO",
  "Lake Ozark, MO",
];

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Primus Photography",
  url: "https://primusphotography.com/about",
  description:
    "Primus Photography is a Columbia, Missouri wedding photographer capturing timeless, emotional images for couples across Mid-Missouri.",
  about: {
    "@type": "ProfessionalService",
    name: "Primus Photography",
    url: "https://primusphotography.com",
    telephone: "+1-336-457-2361",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Columbia",
      addressRegion: "MO",
      addressCountry: "US",
    },
  },
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <p className="eyebrow">About · Primus Photography</p>
          <h1>
            About Primus Photography
            <span>Columbia, Missouri wedding photographer</span>
          </h1>
          <p className="lead">
            We are in love with love — and with preserving the emotion,
            atmosphere, and people that make your wedding day unforgettable.
          </p>
        </section>

        <section className="experience section" aria-label="Our story">
          <div className="experience-image">
            <img
              src="/images/weddings/columbia-mo-wedding-photographer-14.jpg"
              alt="A bride holding a red bouquet while her partner waits behind her"
              loading="lazy"
            />
          </div>
          <div className="experience-copy">
            <p className="eyebrow">Our story · 01</p>
            <h2>Timeless images for couples across Mid-Missouri.</h2>
            <p className="lead">
              Primus Photography is a wedding photography studio based in
              Columbia, Missouri. From quiet getting-ready moments to
              golden-hour portraits, we document your wedding day exactly as
              it felt — honest, emotional, and unmistakably yours.
            </p>
            <p className="lead">
              We love natural settings, soft light, and all the details that
              make your celebration personal. We are down to earth, easy to
              work with, and serious about high standards — because your
              photographs are the one part of the day that only gets more
              precious with time.
            </p>
          </div>
        </section>

        <section className="section" aria-label="How we work">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Approach · 02</p>
              <h2>Present with you, never in the way.</h2>
            </div>
            <p>
              Great wedding photography begins with trust. Here is what
              working with us feels like, from first hello to final gallery.
            </p>
          </div>
          <ol className="steps">
            <li>
              <span>01</span>
              <div>
                <h3>Start with your story</h3>
                <p>
                  A relaxed consultation shapes the coverage around what
                  matters most to you — there is no such thing as too many
                  details.
                </p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Photograph the day as it unfolds</h3>
                <p>
                  We balance thoughtful direction for portraits with
                  unobtrusive, documentary coverage of everything in between.
                </p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Relive it beautifully</h3>
                <p>
                  Your high-resolution photographs are carefully edited and
                  retouched, then delivered in an online gallery you can share
                  with everyone you love.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <section className="section" aria-label="Where we photograph weddings">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Service areas · 03</p>
              <h2>Proudly photographing weddings across Mid-Missouri.</h2>
            </div>
            <p>
              Based in Columbia, we travel to venues throughout the region —
              and we are always happy to talk about celebrations further
              afield.
            </p>
          </div>
          <ul className="area-list">
            {serviceAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </section>

        <section className="cta-band" aria-label="Get in touch">
          <p className="eyebrow">Begin your story</p>
          <h2>Let&apos;s talk about your wedding day.</h2>
          <p>
            Now booking 2026 and 2027 weddings — reach out to check your date.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="/contact">
              Check your date
            </a>
            <a className="text-link" href="/pricing">
              See pricing <span aria-hidden="true">↘</span>
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
    </>
  );
}
