# Koleex International Group - Website

Premium corporate website for Koleex International Group. Built with Next.js, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Architecture:** Component-based, static generation (SSG) with on-demand refresh
- **Data:** the Koleex Hub is the ONLY source — products, taxonomy, pages and jobs (see below)

## Data: the Koleex Hub

The site has no database and no admin of its own. Its server reads the Hub's
website bridge (`hub.koleexgroup.com/api/website/v1/*`) with a shared key,
caches every answer under a tag, and the Hub asks it to refresh a tag when
something changes there — the page is fresh seconds later, without a rebuild.
Visitors never reach the Hub: they get finished HTML, and product photos go
through the site's own image optimizer.

- Only ACTIVE and VISIBLE Koleex products, never a price, a cost, a supplier
  or a factory code (the Hub scrubs them before they leave).
- `src/lib/hub.ts` — every read. Until the key is set, reads come back empty
  and the pages show their empty states. Once it is set, a Hub that does not
  answer makes the read fail, so the site keeps the last good copy of a page
  (never an empty one or a "not found"); only the Hub's 404 means "gone".
- `src/app/api/revalidate` — the Hub's refresh call (tags `products`,
  `taxonomy`, `jobs`, `page:<slug>`), accepted only with the same key.
- `src/app/api/products` — the next pages of a product list ("Show more").
- `/product/<slug>` — one address per product, whatever its division.

### Environment variables

| Where | Name | Value |
|---|---|---|
| Website (Vercel) | `WEBSITE_BRIDGE_KEY` | the shared key |
| Website (Vercel) | `HUB_URL` | optional, default `https://hub.koleexgroup.com` |
| Hub (Vercel) | `WEBSITE_BRIDGE_KEY` | the same key |
| Hub (Vercel) | `WEBSITE_REVALIDATE_URL` | `https://<this site>/api/revalidate` |

Set the key on the Hub first and redeploy it, then on the website: with the
key set, a build reads the Hub and fails (leaving the live site as it is)
while the Hub cannot answer. Never give the key a `NEXT_PUBLIC_` prefix.

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout (Header + Footer + AI Assistant)
│   ├── page.tsx                  # Homepage
│   ├── products/                 # Products section
│   │   ├── page.tsx              # Products hub
│   │   └── [division]/           # Division > Category > Type (from the Hub's taxonomy)
│   ├── product/[slug]/           # One product page per product (from the Hub)
│   ├── api/                      # revalidate (the Hub's refresh) · products ("Show more")
│   ├── solutions/page.tsx        # Solutions page
│   ├── stories/                  # Stories hub + individual articles
│   ├── about/page.tsx            # About Us
│   ├── careers/page.tsx          # Careers
│   ├── contact/page.tsx          # Contact Us
│   └── search/page.tsx           # Search results placeholder
├── components/
│   ├── layout/                   # Header, Footer, MegaMenu, MobileMenu, SearchOverlay, AIAssistant
│   ├── ui/                       # Reusable UI: Button, Card, Section, Badge, Container, etc.
│   └── home/                     # Homepage sections: Hero, DivisionsPreview, FeaturedProducts, etc.
├── data/                         # Navigation (products menu built from the Hub's taxonomy), site copy
├── lib/                          # hub.ts (the Hub bridge), utilities
└── styles/                       # Global CSS with design tokens
```

## Key Features

- Premium Apple-inspired design with glass morphism header
- Product hierarchy from the Hub: Division > Category > Type > Product
- Mega menu for Products navigation
- Mobile responsive with slide-out navigation
- AI Assistant floating UI placeholder
- Search overlay placeholder
- Language and region selector placeholders
- Scroll-triggered animations
- Every product, category and type page built ahead and refreshed on demand

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Design Tokens

Defined in `src/app/globals.css`:
- Colors: Primary (black), secondary (gray), accent (blue), surface variants
- Typography: Display, headline, title, subtitle, body scales
- Effects: Glass morphism, fade-in animations, premium transitions

## Scaling for Future Phases

The architecture is designed to integrate with:
- **Authentication:** Add middleware and auth providers
- **Leads:** forms go to the Hub's Contacts (next phase)
- **AI Assistant:** Wire the chat UI to an AI backend
- **Search:** Connect to a search engine (Algolia, Elasticsearch, etc.)
- **i18n:** Add next-intl or similar for language/region support
