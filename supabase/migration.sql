-- ============================================================================
-- KOLEEX CMS — Supabase Database Schema
-- Run this in Supabase SQL Editor to create all tables.
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── PAGES TABLE ──
CREATE TABLE IF NOT EXISTS pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  title TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── SECTIONS TABLE ──
CREATE TABLE IF NOT EXISTS sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  section_key TEXT NOT NULL,
  layout TEXT NOT NULL DEFAULT 'hero',
  title TEXT,
  subtitle TEXT,
  content TEXT,
  image_url TEXT,
  image_alt TEXT,
  video_url TEXT,
  button_text TEXT,
  button_link TEXT,
  button2_text TEXT,
  button2_link TEXT,
  background TEXT DEFAULT 'white',
  items JSONB,
  "order" INTEGER NOT NULL DEFAULT 0,
  visible BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── MEDIA TABLE ──
CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'image',
  size INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── INDEXES ──
CREATE INDEX IF NOT EXISTS idx_sections_page_id ON sections(page_id);
CREATE INDEX IF NOT EXISTS idx_sections_order ON sections("order");
CREATE INDEX IF NOT EXISTS idx_sections_visible ON sections(visible);
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);

-- ── AUTO-UPDATE updated_at TRIGGER ──
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER pages_updated_at
  BEFORE UPDATE ON pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER sections_updated_at
  BEFORE UPDATE ON sections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── ROW LEVEL SECURITY ──
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Public read access (anon key can read)
CREATE POLICY "Public read pages" ON pages FOR SELECT USING (true);
CREATE POLICY "Public read sections" ON sections FOR SELECT USING (true);
CREATE POLICY "Public read media" ON media FOR SELECT USING (true);

-- ============================================================================
-- SEED DATA — Home page with sample sections
-- ============================================================================

-- Insert home page
INSERT INTO pages (name, slug, title, description) VALUES
  ('Home', 'home', 'Koleex International Group', 'Global industrial technology company'),
  ('About', 'about', 'About Koleex', 'Learn about Koleex International Group'),
  ('Products', 'products', 'Products', 'Explore Koleex products'),
  ('Solutions', 'solutions', 'Solutions', 'Industry solutions'),
  ('Stories', 'stories', 'Stories', 'Latest news and stories'),
  ('Careers', 'careers', 'Careers', 'Join Koleex'),
  ('Contact', 'contact', 'Contact Us', 'Get in touch');

-- Insert sample sections for home page
INSERT INTO sections (page_id, section_key, layout, title, subtitle, image_url, button_text, button_link, button2_text, button2_link, background, "order") VALUES
  (
    (SELECT id FROM pages WHERE slug = 'home'),
    'hero',
    'hero',
    'KX-9000 Series',
    'Precision in motion. Power in every axis.',
    '/images/hero-hand-trimmed.jpg',
    'Learn more',
    '/products/industrial-technology',
    'Contact sales',
    '/contact',
    'white',
    1
  ),
  (
    (SELECT id FROM pages WHERE slug = 'home'),
    'company-intro',
    'hero',
    'Engineering What Matters.',
    'A global industrial technology company delivering precision machinery, automation systems, and smart solutions.',
    '/images/factory-floor.jpg',
    'Learn more',
    '/about',
    NULL,
    NULL,
    'black',
    2
  ),
  (
    (SELECT id FROM pages WHERE slug = 'home'),
    'featured-product',
    'hero',
    'Smart Machines',
    'Intelligent. Automated. Built to perform.',
    '/images/hero-robot.jpg',
    'Learn more',
    '/products',
    'Contact sales',
    '/contact',
    'white',
    3
  ),
  (
    (SELECT id FROM pages WHERE slug = 'home'),
    'solutions',
    'hero',
    'Solutions',
    'Engineered for your industry.',
    '/images/solar-panels.jpg',
    'Explore solutions',
    '/solutions',
    NULL,
    NULL,
    'light',
    4
  ),
  (
    (SELECT id FROM pages WHERE slug = 'home'),
    'global-presence',
    'cta',
    'Global reach.',
    'Serving customers across key industrial markets worldwide.',
    NULL,
    'Learn more',
    '/about/global-presence',
    NULL,
    NULL,
    'white',
    5
  ),
  (
    (SELECT id FROM pages WHERE slug = 'home'),
    'contact-cta',
    'cta',
    'Get in touch.',
    'Talk to a specialist about solutions for your business.',
    NULL,
    'Contact us',
    '/contact',
    'Request quotation',
    '/contact',
    'light',
    6
  );
