-- ============================================================================
-- KOLEEX CMS — SAFE MIGRATION
-- Only creates tables that DO NOT exist yet.
-- Existing tables (products, categories, subcategories, suppliers,
-- product_categories, product_divisions, product_subcategories,
-- product_lines, contacts, quotations) are NOT touched.
--
-- Run this in Supabase SQL Editor.
-- ============================================================================

-- Enable UUID extension (safe to run multiple times)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ══════════════════════════════════════════════════════════════════
-- 1. PAGES — CMS pages
-- ══════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  title TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ══════════════════════════════════════════════════════════════════
-- 2. SECTIONS — CMS content sections within pages
-- ══════════════════════════════════════════════════════════════════
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

-- ══════════════════════════════════════════════════════════════════
-- 3. MEDIA — Uploaded files and images
-- ══════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'image',
  size INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ══════════════════════════════════════════════════════════════════
-- INDEXES
-- ══════════════════════════════════════════════════════════════════
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
CREATE INDEX IF NOT EXISTS idx_sections_page_id ON sections(page_id);
CREATE INDEX IF NOT EXISTS idx_sections_order ON sections("order");
CREATE INDEX IF NOT EXISTS idx_sections_visible ON sections(visible);

-- ══════════════════════════════════════════════════════════════════
-- AUTO-UPDATE updated_at TRIGGER
-- ══════════════════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Only create triggers if they don't exist (use DO block)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'pages_updated_at') THEN
    CREATE TRIGGER pages_updated_at
      BEFORE UPDATE ON pages
      FOR EACH ROW EXECUTE FUNCTION update_updated_at();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'sections_updated_at') THEN
    CREATE TRIGGER sections_updated_at
      BEFORE UPDATE ON sections
      FOR EACH ROW EXECUTE FUNCTION update_updated_at();
  END IF;
END;
$$;

-- ══════════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY — Public read, authenticated write
-- ══════════════════════════════════════════════════════════════════
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Public read (anyone with anon key can read)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read pages') THEN
    CREATE POLICY "Public read pages" ON pages FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read sections') THEN
    CREATE POLICY "Public read sections" ON sections FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read media') THEN
    CREATE POLICY "Public read media" ON media FOR SELECT USING (true);
  END IF;
END;
$$;

-- Allow anon to insert/update/delete for now (admin panel will use anon key)
-- In production, replace with authenticated-only policies
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Anon write pages') THEN
    CREATE POLICY "Anon write pages" ON pages FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Anon write sections') THEN
    CREATE POLICY "Anon write sections" ON sections FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Anon write media') THEN
    CREATE POLICY "Anon write media" ON media FOR ALL USING (true) WITH CHECK (true);
  END IF;
END;
$$;

-- ══════════════════════════════════════════════════════════════════
-- SEED DATA — Pages + Home sections
-- ══════════════════════════════════════════════════════════════════

-- Insert pages (only if empty)
INSERT INTO pages (name, slug, title, description)
SELECT * FROM (VALUES
  ('Home', 'home', 'Koleex International Group', 'Global industrial technology company'),
  ('About', 'about', 'About Koleex', 'Learn about Koleex International Group'),
  ('Products', 'products', 'Products', 'Explore Koleex products'),
  ('Solutions', 'solutions', 'Solutions', 'Industry solutions'),
  ('Stories', 'stories', 'Stories', 'Latest news and stories'),
  ('Careers', 'careers', 'Careers', 'Join Koleex'),
  ('Contact', 'contact', 'Contact Us', 'Get in touch'),
  ('Support', 'support', 'Support', 'Customer support')
) AS v(name, slug, title, description)
WHERE NOT EXISTS (SELECT 1 FROM pages LIMIT 1);

-- Insert home sections (only if sections table is empty)
INSERT INTO sections (page_id, section_key, layout, title, subtitle, image_url, button_text, button_link, button2_text, button2_link, background, "order", items)
SELECT * FROM (VALUES
  (
    (SELECT id FROM pages WHERE slug = 'home'),
    'hero', 'hero',
    'KX-9000 Series',
    'Precision in motion. Power in every axis.',
    '/images/hero-hand-trimmed.jpg',
    'Learn more', '/products/industrial-technology',
    'Contact sales', '/contact',
    'white', 1, NULL::JSONB
  ),
  (
    (SELECT id FROM pages WHERE slug = 'home'),
    'company-intro', 'hero',
    'Engineering What Matters.',
    'A global industrial technology company delivering precision machinery, automation systems, and smart solutions.',
    '/images/factory-floor.jpg',
    'Learn more', '/about',
    NULL, NULL,
    'black', 2, NULL::JSONB
  ),
  (
    (SELECT id FROM pages WHERE slug = 'home'),
    'divisions', 'grid',
    'Our Divisions',
    'Four integrated segments driving industrial innovation.',
    NULL,
    'Learn more', '/products',
    NULL, NULL,
    'light', 3,
    '[{"title":"Industrial Machinery","description":"Precision equipment for manufacturing.","image":"/images/factory-floor.jpg"},{"title":"Automation Systems","description":"Smart production lines.","image":"/images/hero-robot.jpg"},{"title":"Technology Solutions","description":"Software, IoT & digital tools.","image":"/images/circuit-board.jpg"},{"title":"Parts & Service","description":"Global after-sales support.","image":"/images/composites.jpg"}]'::JSONB
  ),
  (
    (SELECT id FROM pages WHERE slug = 'home'),
    'featured-product', 'hero',
    'Smart Machines',
    'Intelligent. Automated. Built to perform.',
    '/images/hero-robot.jpg',
    'Learn more', '/products',
    'Contact sales', '/contact',
    'white', 4, NULL::JSONB
  ),
  (
    (SELECT id FROM pages WHERE slug = 'home'),
    'technology', 'cards',
    'Driven by Innovation.',
    'Intelligent solutions that power machines, software, and systems.',
    NULL,
    'Explore technology', '/about/technology',
    NULL, NULL,
    'black', 5,
    '[{"title":"Smart Automation"},{"title":"Industrial IoT"},{"title":"AI-Powered Systems"},{"title":"Precision Engineering"},{"title":"Digital Solutions"},{"title":"Predictive Analytics"}]'::JSONB
  ),
  (
    (SELECT id FROM pages WHERE slug = 'home'),
    'solutions', 'hero',
    'Solutions',
    'Engineered for your industry.',
    '/images/solar-panels.jpg',
    'Explore solutions', '/solutions',
    NULL, NULL,
    'light', 6, NULL::JSONB
  ),
  (
    (SELECT id FROM pages WHERE slug = 'home'),
    'global-presence', 'cta',
    'Global reach.',
    'Serving customers across key industrial markets worldwide.',
    NULL,
    'Learn more', '/about/global-presence',
    NULL, NULL,
    'white', 7, NULL::JSONB
  ),
  (
    (SELECT id FROM pages WHERE slug = 'home'),
    'contact-cta', 'cta',
    'Get in touch.',
    'Talk to a specialist about solutions for your business.',
    NULL,
    'Contact us', '/contact',
    'Request quotation', '/contact',
    'white', 8, NULL::JSONB
  )
) AS v(page_id, section_key, layout, title, subtitle, image_url, button_text, button_link, button2_text, button2_link, background, "order", items)
WHERE NOT EXISTS (SELECT 1 FROM sections LIMIT 1);

-- ══════════════════════════════════════════════════════════════════
-- VERIFY
-- ══════════════════════════════════════════════════════════════════
SELECT 'pages' AS "table", COUNT(*) AS rows FROM pages
UNION ALL
SELECT 'sections', COUNT(*) FROM sections
UNION ALL
SELECT 'media', COUNT(*) FROM media;
