# Primus Wedding Photography

A conversion-focused wedding photography website for Primus Photography in
Columbia, Missouri. Built with Next.js 16, React 19, Tailwind CSS 4, and
deployed on Cloudflare Workers via [vinext](https://github.com/cloudflare/vinext).

## Prerequisites

- Node.js `>=22.13.0`

## Quick Start

```bash
npm install
npm run dev
npm run build
```

## Conversion Funnel

The site is structured as a conversion funnel to turn visitors into inquiries:

1. **Hero** — Bold headline with dual CTA (date check + explore stories)
2. **Stats strip** — Instant social proof (200+ weddings, 12 years, 4.9★)
3. **Gallery** — 15 wedding photos with full-screen lightbox (click/keyboard nav)
4. **Experience** — 4-step process that builds trust
5. **Testimonials** — Rotating quotes from real couples
6. **Services strip** — Scrolling list of offered services
7. **Packages** — Clear pricing (Bronze/Silver/Golden) with inquiry CTAs
8. **Availability checker** — Low-friction date capture (captures email + date as lead)
9. **FAQ** — Handles common objections (booking, travel, photos, payment)
10. **About** — Personal connection and brand story
11. **Contact form** — Full inquiry form (name, email, phone, date, venue, message)
12. **Newsletter capture** — Catches visitors not ready to inquire yet
13. **Sticky CTA** — Persistent bar appears after scrolling past hero

## Database

Inquiries and leads are stored in Cloudflare D1 via Drizzle ORM.

- `db/schema.ts` — Table definitions for `inquiries` and `leads`
- `app/api/inquiries/route.ts` — GET/POST for wedding inquiries
- `app/api/leads/route.ts` — GET/POST for lightweight leads (newsletter, date checker)

### Generate Migration

After schema changes:

```bash
npm run db:generate
```

This creates SQL files in `drizzle/` that the platform applies to the D1 database
on deployment.

## SEO

- **JSON-LD structured data** — LocalBusiness, WebSite, and FAQPage schemas in `layout.tsx`
- **Sitemap** — Dynamic sitemap at `/sitemap.xml` via `app/sitemap.ts`
- **robots.txt** — At `/robots.txt` pointing to the sitemap
- **Open Graph** — Dynamic OG metadata with origin detection

## Components

All interactive components live in `app/components/`:

| Component | Purpose |
|---|---|
| `ContactForm.tsx` | Full inquiry form with validation + success state |
| `Gallery.tsx` | Masonry gallery with click-to-open lightbox + keyboard nav |
| `Testimonials.tsx` | Rotating testimonial carousel with dot navigation |
| `FAQ.tsx` | Accordion FAQ with 6 common questions |
| `AvailabilityChecker.tsx` | Date + email capture with simulated availability response |
| `NewsletterCapture.tsx` | Email-only signup for casual visitors |
| `StickyCTA.tsx` | Scroll-triggered persistent CTA bar |

## Useful Commands

- `npm run dev`: start local development
- `npm run build`: verify the vinext build output
- `npm test`: build the starter and verify its rendered loading skeleton
- `npm run lint`: run ESLint
- `npm run db:generate`: generate Drizzle migrations after schema changes

## Learn More

- [vinext Documentation](https://github.com/cloudflare/vinext)
- [Drizzle D1 Guide](https://orm.drizzle.team/docs/get-started/d1-new)