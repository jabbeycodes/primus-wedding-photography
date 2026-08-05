import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Columbia, Missouri Wedding Photographer | Primus Photography",
  description:
    "Wedding photography in Columbia, Missouri, with engagement sessions, full-day coverage, portraits, albums, videography, drone coverage, and photo booth options.",
};

const gallery = [
  ["03", "A newlywed couple beneath the trees"],
  ["04", "A quiet getting-ready moment by the window"],
  ["06", "A bride preparing for her ceremony"],
  ["07", "A couple celebrating in traditional wedding attire"],
  ["08", "Newlyweds sharing a joyful moment"],
  ["09", "A candid black-and-white wedding portrait"],
  ["10", "A father and child on the dance floor"],
  ["14", "A bride holding a vivid red bouquet"],
  ["15", "A newlywed portrait after the ceremony"],
  ["17", "A young wedding attendant arriving for the celebration"],
  ["18", "A bride with a soft pink bouquet"],
  ["19", "A couple celebrating together"],
  ["20", "A joyful black-and-white bridal portrait"],
  ["21", "A bride holding her bouquet"],
  ["22", "A guest capturing a wedding-day portrait"],
] as const;

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
          <a href="#packages">Packages</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="header-cta" href="sms:+13364572361">
          Check your date
        </a>

        <details className="mobile-nav">
          <summary>Menu</summary>
          <nav aria-label="Mobile navigation">
            <a href="#stories">Love stories</a>
            <a href="#experience">Experience</a>
            <a href="#packages">Packages</a>
            <a href="#contact">Contact</a>
          </nav>
        </details>
      </header>

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
            <a className="button button-dark" href="sms:+13364572361">
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

      <section className="manifesto" aria-label="Primus promise">
        <p>For the moments that move fast</p>
        <h2>
          We preserve the emotion, the atmosphere, and the people who made it
          unforgettable.
        </h2>
      </section>

      <section className="stories section" id="stories">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Selected work · 02</p>
            <h2>Moments captured</h2>
          </div>
          <p>
            A blend of candid storytelling and composed portraiture—from the
            first quiet preparations to the final celebration.
          </p>
        </div>

        <div className="gallery">
          {gallery.map(([number, alt], index) => (
            <figure className={index % 5 === 0 ? "gallery-tall" : ""} key={number}>
              <img
                src={`/images/weddings/wedding-${number}.jpg`}
                alt={alt}
                loading="lazy"
              />
            </figure>
          ))}
        </div>
      </section>

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

      <section className="services-strip" aria-label="Available wedding services">
        <span>Engagement sessions</span>
        <span>Full-day coverage</span>
        <span>Albums & prints</span>
        <span>Videography</span>
        <span>Drone coverage</span>
        <span>Photo booth</span>
      </section>

      <section className="packages section" id="packages">
        <div className="section-heading packages-heading">
          <div>
            <p className="eyebrow">Wedding collections · 04</p>
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
              <a href="sms:+13364572361">Ask about {item.name}</a>
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

      <section className="about section">
        <div className="about-quote">
          <p className="eyebrow">Hello there · 05</p>
          <blockquote>“We are in love with love.”</blockquote>
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

      <section className="contact section" id="contact">
        <div className="contact-copy">
          <p className="eyebrow">Begin your story · 06</p>
          <h2>Let’s make something timeless.</h2>
          <p>
            Tell us your date, venue, and what you want to remember most. We’ll
            talk through the right coverage for your celebration.
          </p>
        </div>
        <div className="contact-actions">
          <a className="contact-card" href="sms:+13364572361">
            <span>Text or call</span>
            <strong>(336) 457-2361</strong>
            <em>Start an inquiry ↗</em>
          </a>
          <a
            className="contact-card"
            href="https://www.instagram.com/primus_events/"
            target="_blank"
            rel="noreferrer"
          >
            <span>Instagram</span>
            <strong>@primus_events</strong>
            <em>See recent work ↗</em>
          </a>
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
          <a href="#contact">Contact</a>
        </nav>
        <p>© 2026 Primus Photography</p>
      </footer>
    </main>
  );
}
