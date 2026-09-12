export default function SiteFooter() {
  return (
    <footer>
      <a className="footer-brand" href="/" aria-label="Primus Photography home">
        <img src="/images/primus-logo.jpg" alt="Primus Photography" loading="lazy" />
      </a>
      <p>Wedding photography in Columbia, Missouri and beyond.</p>
      <nav aria-label="Footer navigation">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/pricing">Pricing</a>
        <a href="/contact">Contact</a>
      </nav>
      <p>© 2026 Primus Photography</p>
    </footer>
  );
}
