"use client";

import { useState } from "react";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Primus captured every laugh, every tear, every detail. We relive our wedding day every time we look at these photos.",
    author: "Sarah & Marcus",
    role: "Golden package · Columbia, MO",
  },
  {
    quote:
      "Professional, warm, and completely unobtrusive. Our guests didn't even notice the cameras, yet every moment is there.",
    author: "Jasmine & Dev",
    role: "Silver package · Lake of the Ozarks",
  },
  {
    quote:
      "From the engagement session to the final album, the experience was effortless. The photos are absolute art.",
    author: "Emily & Thomas",
    role: "Golden package · Kansas City",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <div className="testimonials">
      <div className="testimonial-track">
        {testimonials.map((t, i) => (
          <blockquote
            key={i}
            className={i === active ? "testimonial active" : "testimonial"}
            aria-hidden={i !== active}
          >
            <p className="testimonial-quote">{t.quote}</p>
            <footer>
              <strong>{t.author}</strong>
              <span>{t.role}</span>
            </footer>
          </blockquote>
        ))}
      </div>
      <div className="testimonial-dots">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={i === active ? "dot active" : "dot"}
            onClick={() => setActive(i)}
            aria-label={`Testimonial ${i + 1}`}
            type="button"
          />
        ))}
      </div>
    </div>
  );
}