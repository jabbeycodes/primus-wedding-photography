"use client";

import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "How far in advance should we book?",
    answer:
      "Most couples book 8–14 months ahead, especially for peak wedding season (May–October). We occasionally have last-minute openings, so it's always worth reaching out.",
  },
  {
    question: "Do you travel for weddings?",
    answer:
      "Absolutely. Based in Columbia, Missouri, we photograph weddings throughout the Midwest and beyond. Travel within 60 miles is included; destination weddings are quoted individually.",
  },
  {
    question: "How many photos do we receive?",
    answer:
      "Every collection includes high-resolution, professionally retouched images. Golden package typically delivers 400–600 images; Silver 250–350; Bronze 150–250. All delivered via an online gallery within 4–6 weeks.",
  },
  {
    question: "Can we add an engagement session?",
    answer:
      "Yes — every collection includes a complimentary pre-wedding session. Additional engagement or anniversary sessions can be added to any package.",
  },
  {
    question: "What about videography or drone coverage?",
    answer:
      "We offer videography, drone coverage, and photo booth options as add-ons to any collection. Let us know what you're envisioning and we'll build a custom quote.",
  },
  {
    question: "How does payment work?",
    answer:
      "A 25% deposit secures your date, with the balance due 14 days before your wedding. Flexible payment plans are available — just ask. We accept Cash App ($primus10) and Zelle (336) 457-2361 — Joshua Abbey.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="faq-list">
      {faqs.map((item, i) => (
        <details
          key={i}
          className="faq-item"
          open={open === i}
          onToggle={(e) => {
            if ((e.target as HTMLDetailsElement).open) setOpen(i);
          }}
        >
          <summary onClick={(e) => { e.preventDefault(); setOpen(open === i ? null : i); }}>
            <span>{item.question}</span>
            <span className="faq-toggle" aria-hidden="true">
              {open === i ? "−" : "+"}
            </span>
          </summary>
          <div className="faq-answer">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}