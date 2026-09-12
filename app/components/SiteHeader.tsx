export default function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Primus Photography home">
        <img src="/images/primus-logo.jpg" alt="Primus Photography" />
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/pricing">Pricing</a>
        <a href="/contact">Contact</a>
      </nav>

      <a className="header-cta" href="/contact">
        Check your date
      </a>

      <details className="mobile-nav">
        <summary>Menu</summary>
        <nav aria-label="Mobile navigation">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/pricing">Pricing</a>
          <a href="/contact">Contact</a>
        </nav>
      </details>
    </header>
  );
}
