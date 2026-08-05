import type { Metadata } from "next";
import ContactForm from "./components/ContactForm";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import AvailabilityChecker from "./components/AvailabilityChecker";
import NewsletterCapture from "./components/NewsletterCapture";
import StickyCTA from "./components/StickyCTA";

export const metadata: Metadata = {
  title: "Columbia, Missouri Wedding Photographer | Primus Photography",
  description:
    "Wedding photography in Columbia, Missouri, with engagement sessions, full-day coverage, portraits, albums, videography, drone coverage, and photo booth options. Check your date today.",
};

const galleryImages = [
  { src: "/images/weddings/wedding-03.jpg", alt: "A newlywed couple beneath the trees", tall: true },
  { src: "/images/weddings/wedding-04.jpg", alt: "A quiet getting-ready moment by the window" },
  { src: "/images/weddings/wedding-06.jpg", alt: "A bride preparing for her ceremony" },
  { src: "/images/weddings/wedding-07.jpg", alt: "A couple celebrating in traditional wedding attire" },
  { src: "/images/weddings/wedding-08.jpg", alt: "Newlyweds sharing a joyful moment", tall: true },
  { src: "/images/weddings/wedding-09.jpg", alt: "A candid black-and-white wedding portrait" },
  { src: "/images/weddings/wedding-10.jpg", alt: "A father and child on the dance floor" },
  { src: "/images/weddings/wedding-14.jpg", alt: "A bride holding a vivid red bouquet" },
  { src: "/images/weddings/wedding-15.jpg", alt: "A newlywed portrait after the ceremony", tall: true },
  { src: "/images/weddings/wedding-17.jpg", alt: "A young wedding attendant arriving for the celebration" },
  { src: "/images/weddings/wedding-18.jpg", alt: "A bride with a soft pink bouquet" },
  { src: "/images/weddings/wedding-19.jpg", alt: "A couple celebrating together" },
  { src: "/images/weddings/wedding-20.jpg", alt: "A joyful black-and-white bridal portrait", tall: true },
  { src: "/images/weddings/wedding-21.jpg", alt: "A bride holding her bouquet" },
  { src: "/images/weddings/wedding-22.jpg", alt: "A guest capturing a wedding-day portrait" },
];

const stats = [
  { number: "200+", label: "Weddings photographed" },
  { number: "12", label: "Years of experience" },
  { number: "4.9★", label: "Average couple rating" },
  { number: "48hr", label: "Average response time" },
];

const packages = [
  {
    name: "Bronze",
    price: "$1,800",
    coverage: "Up to 6 hours",
    features: [
      "Bridal preparation",
      "Ceremony and reception",
      "Exclusive couple portraits",
      "High-end retouched images",
      "One photographer",
    ],
  },
  {
    name: "Silver",
    price: "$2,500",
    coverage: "6+ hours",
    features: [
      "Bride and groom preparation",
      "Ceremony and reception",
      "Exclusive couple portraits",
      "High-end retouched images",
      "Large standard photo frame",
      "One photographer",
    ],
  },
  {
    name: "Golden",
    price: "$3,600",
    coverage: "Whole-day coverage",
    featured: true,
    features: [
      "Bride and groom preparation",
      "Ceremony and reception",
      "Exclusive couple portraits",
      "High-end retouched images",
      "Large standard photo frame",
      "Custom photobook",
      "Two photographers",
    ],
  },
] as const;

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Primus Photography home">
          <img src="/images/primus-logo.jpg" alt="Primus Photography" />
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#stories">Love stories</a>
          <a href="#experience">Experience</a>
          <a href="#testimonials">Couples</a>
          <a href="#packages">Packages</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="header-cta" href="#contact">
          Check your date
        </a>

        <details className="mobile-nav">
          <summary>Menu</summary>
          <nav aria-label="Mobile navigation">
            <a href="#stories">Love stories</a>
            <a href="#experience">Experience</a>
            <a href="#testimonials">Couples</a>
            <a href="#packages">Packages</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
          </nav>
        </details>
      </header>

      {/* HERO — first impression, dual CTA */}
      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Columbia, Missouri · Wedding photography</p>
          <h1>
            Love stories,
            <span>beautifully told.</span>
          </h1>
          <p className="hero-intro">
            Honest moments, artful portraits, and every detail that makes your
            celebration unmistakably yours.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#contact">
              Tell us your date
            </a>
            <a className="text-link" href="#stories">
              Explore the stories <span aria-hidden="true">↘</span>
            </a>
          </div>
          <div className="hero-note">
            <span>01</span>
            <p>Wedding days, engagements, and celebrations photographed with care.</p>
          </div>
        </div>

        <div className="hero-visual">
          <img
            src="/images/weddings/wedding-15.jpg"
            alt="A newlywed couple photographed by Primus Photography"
          />
          <div className="hero-badge" aria-label="Creating beautiful memories">
            <span>Creating</span>
            <strong>beautiful memories</strong>
          </div>
        </div>
      </section>

      {/* STATS STRIP — instant social proof */}
      <section className="stats-strip" aria-label="At a glance">
        {stats.map((stat) => (
          <div className="stat" key={stat.label}>
            <strong>{stat.number}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      <section className="manifesto" aria-label="Primus promise">
        <p>For the moments that move fast</p>
        <h2>
          We preserve the emotion, the atmosphere, and the people who made it
          unforgettable.
        </h2>
      </section>

      {/* GALLERY — visual proof, lightbox keeps them engaged */}
      <section className="stories section" id="stories">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Selected work · 02</p>
            <h2>Moments captured</h2>
          </div>
          <p>
            A blend of candid storytelling and composed portraiture—from the
            first quiet preparations to the final celebration. Tap any photo
            to view it full screen.
          </p>
        </div>

        <Gallery images={galleryImages} />
      </section>

      {/* EXPERIENCE — builds trust, answers "what's it like working with you" */}
      <section className="experience section" id="experience">
        <div className="experience-image">
          <img
            src="/images/weddings/wedding-14.jpg"
            alt="A bride holding a red bouquet while her partner waits behind her"
            loading="lazy"
          />
        </div>
        <div className="experience-copy">
          <p className="eyebrow">The Primus experience · 03</p>
          <h2>Present with you. Never in the way.</h2>
          <p className="lead">
            Great wedding photography begins with trust. We take time to learn
            your story and your vision, then photograph the day as it naturally
            unfolds.
          </p>

          <ol className="steps">
            <li>
              <span>01</span>
              <div>
                <h3>Start with your story</h3>
                <p>A relaxed consultation shapes the coverage around what matters to you.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Get comfortable together</h3>
                <p>Your complimentary pre-wedding session lets us connect before the big day.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Live every moment</h3>
                <p>We balance thoughtful direction with unobtrusive, documentary coverage.</p>
              </div>
            </li>
            <li>
              <span>04</span>
              <div>
                <h3>Relive it beautifully</h3>
                <p>Your high-resolution photographs are carefully edited and retouched.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* TESTIMONIALS — social proof from real couples */}
      <section className="testimonials-section section" id="testimonials">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Couples · 04</p>
            <h2>Love in their words</h2>
          </div>
          <p>
            We&apos;ve had the privilege of photographing hundreds of celebrations.
            Here&apos;s what a few of them said.
          </p>
        </div>
        <Testimonials />
      </section>

      <section className="services-strip" aria-label="Available wedding services">
        <span>Engagement sessions</span>
        <span>Full-day coverage</span>
        <span>Albums & prints</span>
        <span>Videography</span>
        <span>Drone coverage</span>
        <span>Photo booth</span>
      </section>

      {/* PACKAGES — clear pricing, each card has inquiry CTA */}
      <section className="packages section" id="packages">
        <div className="section-heading packages-heading">
          <div>
            <p className="eyebrow">Wedding collections · 05</p>
            <h2>Choose your coverage</h2>
          </div>
          <p>
            Every collection includes a complimentary pre-wedding photo
            session and high-resolution, professionally retouched images.
          </p>
        </div>

        <div className="package-grid">
          {packages.map((item) => (
            <article className={item.featured ? "package featured" : "package"} key={item.name}>
              {item.featured ? <span className="featured-label">Whole story</span> : null}
              <p className="package-name">{item.name}</p>
              <p className="price">{item.price}</p>
              <p className="coverage">{item.coverage}</p>
              <ul>
                {item.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a href={`#contact`}>Ask about {item.name}</a>
            </article>
          ))}
        </div>

        <div className="package-footer">
          <p>
            Package details and prices were recovered from your existing
            2021/2022 guide. Confirm current pricing and availability for your date.
          </p>
          <a href="/files/wedding-packages.pdf" target="_blank" rel="noreferrer">
            Download the original package guide ↗
          </a>
        </div>
      </section>

      {/* AVAILABILITY CHECKER — low-friction lead capture */}
      <section className="availability-section section" id="availability">
        <div className="availability-inner">
          <AvailabilityChecker />
        </div>
      </section>

      {/* FAQ — handles objections before the contact form */}
      <section className="faq-section section" id="faq">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Good to know · 06</p>
            <h2>Frequently asked</h2>
          </div>
          <p>
            Still have questions? Text us anytime — we&apos;re happy to chat through
            the details.
          </p>
        </div>
        <FAQ />
        <div className="faq-cta">
          <p>Still wondering if we&apos;re the right fit?</p>
          <a className="button button-dark" href="#contact">
            Start a conversation →
          </a>
        </div>
      </section>

      {/* ABOUT — personal connection */}
      <section className="about section">
        <div className="about-quote">
          <p className="eyebrow">Hello there · 07</p>
          <blockquote>&ldquo;We are in love with love.&rdquo;</blockquote>
        </div>
        <div className="about-copy">
          <p>
            We are the artisans who capture the heartbeat of your wedding day
            and transform it into visual timestamps. We love natural settings,
            soft light, bubbly personalities, and all the details that make your
            celebration personal.
          </p>
          <p>
            We are down to earth, easy to deal with, and serious about high
            standards. Hearing your story is important to us—there is no such
            thing as too many details.
          </p>
        </div>
        <img
          src="/images/weddings/wedding-19.jpg"
          alt="A newlywed couple smiling together"
          loading="lazy"
        />
      </section>

      {/* CONTACT — full form, the primary conversion point */}
      <section className="contact section" id="contact">
        <div className="contact-copy">
          <p className="eyebrow">Begin your story · 08</p>
          <h2>Let&apos;s make something timeless.</h2>
          <p>
            Tell us your date, venue, and what you want to remember most. We&apos;ll
            talk through the right coverage for your celebration and get back
            to you within 24 hours.
          </p>
        </div>
        <div className="contact-form-wrapper">
          <ContactForm />
          <div className="contact-alt">
            <p>Prefer to talk now?</p>
            <a className="contact-card" href="sms:+13364572361">
              <span>Text or call</span>
              <strong>(336) 457-2361</strong>
              <em>Start an inquiry ↗</em>
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
      </section>

      {/* NEWSLETTER — captures visitors not ready to inquire yet */}
      <section className="newsletter-section" aria-label="Stay connected">
        <div className="newsletter-inner">
          <p className="eyebrow">Stay in the loop</p>
          <h2>Real weddings, tips, and behind-the-scenes.</h2>
          <p>
            Join our list for occasional emails — real wedding stories, planning
            tips, and early-access specials. No spam, ever.
          </p>
          <NewsletterCapture />
        </div>
      </section>

      <footer>
        <a className="footer-brand" href="#top" aria-label="Back to top">
          <img src="/images/primus-logo.jpg" alt="Primus Photography" loading="lazy" />
        </a>
        <p>Wedding photography in Columbia, Missouri and beyond.</p>
        <nav aria-label="Footer navigation">
          <a href="#stories">Love stories</a>
          <a href="#packages">Packages</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
        </nav>
        <p>© 2026 Primus Photography</p>
      </footer>

      <StickyCTA />
    </main>
  );
}