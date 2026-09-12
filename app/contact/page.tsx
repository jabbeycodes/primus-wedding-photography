import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import ContactForm from "../components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Primus Photography | Columbia, MO Wedding Photographer",
  description:
    "Contact Primus Photography to check your wedding date. Call or text (336) 457-2361 or send an inquiry — we reply within 24 hours.",
  alternates: {
    canonical: "https://primusphotography.com/contact",
  },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Primus Photography",
  url: "https://primusphotography.com/contact",
  description:
    "Contact Primus Photography — Columbia, Missouri wedding photographer. Call or text (336) 457-2361 or send an inquiry online.",
  about: {
    "@type": "ProfessionalService",
    name: "Primus Photography",
    url: "https://primusphotography.com",
    telephone: "+1-336-457-2361",
    email: "primusphotographyinfo@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Columbia",
      addressRegion: "MO",
      addressCountry: "US",
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <p className="eyebrow">Contact · Primus Photography</p>
          <h1>
            Contact Primus Photography
            <span>Let&apos;s talk about your wedding day</span>
          </h1>
          <p className="lead">
            Tell us your date, venue, and what you want to remember most.
            We reply to every inquiry within 24 hours.
          </p>
        </section>

        <section className="contact section" aria-label="Contact details and form">
          <div className="contact-copy">
            <p className="eyebrow">Reach us directly</p>
            <h2>Call, text, or send an inquiry.</h2>
            <p>
              Now booking 2026 and 2027 weddings across Columbia, Missouri
              and Mid-Missouri. Prefer to talk now? We&apos;d love to hear
              from you.
            </p>
            <div className="contact-methods">
              <a className="contact-card" href="tel:+13364572361">
                <span>Call or text</span>
                <strong>(336) 457-2361</strong>
                <em>Fastest way to reach us ↗</em>
              </a>
              <a
                className="contact-card"
                href="mailto:primusphotographyinfo@gmail.com"
              >
                <span>Email</span>
                <strong>primusphotographyinfo@gmail.com</strong>
                <em>Write to us anytime ↗</em>
              </a>
              <a
                className="contact-card"
                href="https://www.instagram.com/primus_inspirations/"
                target="_blank"
                rel="noreferrer"
              >
                <span>Instagram</span>
                <strong>@primus_inspirations</strong>
                <em>See recent work ↗</em>
              </a>
            </div>
          </div>
          <div className="contact-form-wrapper">
            <ContactForm />
            <div className="contact-alt">
              <p>Prefer email?</p>
              <p className="mailto-fallback">
                If the form isn&apos;t working for you, write to us directly
                at{" "}
                <a href="mailto:primusphotographyinfo@gmail.com?subject=Wedding%20inquiry">
                  primusphotographyinfo@gmail.com
                </a>{" "}
                — we&apos;ll still get back to you within 24 hours.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
    </>
  );
}
