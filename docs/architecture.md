# Architecture

## Overview

The Koleex website follows a modular, component-based architecture with clear separation of concerns.

## Directory Layout

| Directory      | Purpose                                      |
|----------------|----------------------------------------------|
| `pages/`       | Full HTML pages for each route               |
| `components/`  | Reusable HTML partials (header, footer, etc) |
| `assets/`      | Static files: images, icons, fonts, media    |
| `styles/`      | CSS stylesheets and design tokens            |
| `scripts/`     | JavaScript modules and utilities             |
| `content/`     | Static text content and copy                 |
| `config/`      | Site configuration and metadata              |
| `docs/`        | Developer and project documentation          |

## Component System

Components are self-contained HTML partials designed for reuse across pages:

- **header.html** - Consistent site header with logo and navigation
- **footer.html** - Site-wide footer with copyright and links
- **navigation.html** - Main nav linking all pages
- **hero.html** - Configurable hero banner for page headers
- **cards.html** - Flexible card layout for content display
- **forms.html** - Form template with validation-ready markup

## Pages

Each page is a standalone HTML document:

| Page         | File               | Description                      |
|--------------|--------------------|----------------------------------|
| Home         | `home.html`        | Main landing page                |
| About        | `about.html`       | Company mission and background   |
| Products     | `products.html`    | Product catalog                  |
| Stories      | `stories.html`     | Case studies and company stories |
| Careers      | `careers.html`     | Open positions and culture       |
| Contact      | `contact.html`     | Contact form and details         |

## Design Principles

1. **Modular** - Components are reusable and independent
2. **Accessible** - Semantic HTML with ARIA support
3. **Responsive** - Mobile-first design approach
4. **Performant** - Minimal dependencies, optimized assets
