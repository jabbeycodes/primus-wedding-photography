"use client";

import { useEffect, useState } from "react";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      // Show after scrolling past the hero (roughly 1 viewport down)
      setVisible(window.scrollY > window.innerHeight * 0.8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`sticky-cta ${visible ? "visible" : ""}`}>
      <a className="sticky-cta-text" href="#contact">
        <span>Ready to book?</span>
        <strong>Check your date →</strong>
      </a>
      <a className="sticky-cta-sms" href="sms:+13364572361">
        Text us
      </a>
    </div>
  );
}