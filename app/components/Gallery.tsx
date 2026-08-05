"use client";

import { useState, useCallback, useEffect } from "react";

type GalleryImage = {
  src: string;
  alt: string;
  tall?: boolean;
};

export default function Gallery({ images }: { images: GalleryImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length]
  );
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (openIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, next, prev]);

  return (
    <>
      <div className="gallery">
        {images.map((img, index) => (
          <figure
            className={img.tall ? "gallery-tall" : ""}
            key={index}
            onClick={() => setOpenIndex(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpenIndex(index);
              }
            }}
          >
            <img src={img.src} alt={img.alt} loading="lazy" />
            <span className="gallery-zoom" aria-hidden="true">⤢</span>
          </figure>
        ))}
      </div>

      {openIndex !== null && (
        <div className="lightbox" onClick={close} role="dialog" aria-modal="true">
          <button
            className="lightbox-close"
            onClick={close}
            aria-label="Close"
            type="button"
          >
            ✕
          </button>
          <button
            className="lightbox-nav lightbox-prev"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous"
            type="button"
          >
            ‹
          </button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={images[openIndex].src} alt={images[openIndex].alt} />
            <figcaption>
              {openIndex + 1} / {images.length} — {images[openIndex].alt}
            </figcaption>
          </figure>
          <button
            className="lightbox-nav lightbox-next"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next"
            type="button"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}