# Koleex International Group - Website

Premium corporate website for Koleex International Group. Built with Next.js, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Architecture:** Component-based, static generation (SSG)

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout (Header + Footer + AI Assistant)
│   ├── page.tsx                  # Homepage
│   ├── products/                 # Products section
│   │   ├── page.tsx              # Products hub
│   │   └── [division]/           # Division > Category > Subcategory > Product > Model
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
├── data/                         # Placeholder data layer (navigation, products, solutions, stories, site)
├── lib/                          # Utilities
└── styles/                       # Global CSS with design tokens
```

## Key Features

- Premium Apple-inspired design with glass morphism header
- Full product hierarchy: Division > Category > Subcategory > Product > Model
- Mega menu for Products navigation
- Mobile responsive with slide-out navigation
- AI Assistant floating UI placeholder
- Search overlay placeholder
- Language and region selector placeholders
- Scroll-triggered animations
- 134 statically generated pages

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
- **CMS/Database:** Replace `src/data/` files with API calls or CMS integration
- **Authentication:** Add middleware and auth providers
- **ERP/CRM:** Connect product data, pricing, and quotation workflows
- **AI Assistant:** Wire the chat UI to an AI backend
- **Search:** Connect to a search engine (Algolia, Elasticsearch, etc.)
- **i18n:** Add next-intl or similar for language/region support
