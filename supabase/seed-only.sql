-- ============================================================================
-- KOLEEX CMS — SEED DATA ONLY (no CREATE TABLE)
-- All tables already exist. This only inserts data.
-- Run in Supabase SQL Editor.
-- ============================================================================

-- ── Clear existing seed data (safe to re-run) ──
DELETE FROM sections WHERE page_id IN (SELECT id FROM pages);
DELETE FROM pages;

-- ── Insert pages ──
INSERT INTO pages (name, slug, title, description) VALUES
  ('Home', 'home', 'Koleex International Group', 'Global industrial technology company'),
  ('About', 'about', 'About Koleex', 'Learn about Koleex International Group'),
  ('Products', 'products', 'Products', 'Explore Koleex products'),
  ('Solutions', 'solutions', 'Solutions', 'Industry solutions'),
  ('Stories', 'stories', 'Stories', 'Latest news and stories'),
  ('Careers', 'careers', 'Careers', 'Join Koleex'),
  ('Contact', 'contact', 'Contact Us', 'Get in touch'),
  ('Support', 'support', 'Support', 'Customer support');

-- ── Insert sections for HOME page ──
INSERT INTO sections (page_id, section_key, layout, title, subtitle, image_url, button_text, button_link, button2_text, button2_link, background, "order") VALUES
  (
    (SELECT id FROM pages WHERE slug = 'home'),
    'hero', 'hero',
    'KX-9000 Series',
    'Precision in motion. Power in every axis.',
    '/images/hero-hand-trimmed.jpg',
    'Learn more', '/products/industrial-technology',
    'Contact sales', '/contact',
    'white', 1
  ),
  (
    (SELECT id FROM pages WHERE slug = 'home'),
    'company-intro', 'hero',
    'Engineering What Matters.',
    'A global industrial technology company delivering precision machinery, automation systems, and smart solutions.',
    '/images/factory-floor.jpg',
    'Learn more', '/about',
    NULL, NULL,
    'black', 2
  ),
  (
    (SELECT id FROM pages WHERE slug = 'home'),
    'divisions', 'grid',
    'Our Divisions',
    'Four integrated segments driving industrial innovation.',
    NULL,
    'Learn more', '/products',
    NULL, NULL,
    'light', 3
  ),
  (
    (SELECT id FROM pages WHERE slug = 'home'),
    'featured-product', 'hero',
    'Smart Machines',
    'Intelligent. Automated. Built to perform.',
    '/images/hero-robot.jpg',
    'Learn more', '/products',
    'Contact sales', '/contact',
    'white', 4
  ),
  (
    (SELECT id FROM pages WHERE slug = 'home'),
    'technology', 'cards',
    'Driven by Innovation.',
    'Intelligent solutions that power machines, software, and systems.',
    NULL,
    'Explore technology', '/about/technology',
    NULL, NULL,
    'black', 5
  ),
  (
    (SELECT id FROM pages WHERE slug = 'home'),
    'solutions', 'hero',
    'Solutions',
    'Engineered for your industry.',
    '/images/solar-panels.jpg',
    'Explore solutions', '/solutions',
    NULL, NULL,
    'light', 6
  ),
  (
    (SELECT id FROM pages WHERE slug = 'home'),
    'global-presence', 'cta',
    'Global reach.',
    'Serving customers across key industrial markets worldwide.',
    NULL,
    'Learn more', '/about/global-presence',
    NULL, NULL,
    'white', 7
  ),
  (
    (SELECT id FROM pages WHERE slug = 'home'),
    'stories', 'grid',
    'Latest Stories.',
    NULL,
    NULL,
    'View all', '/stories',
    NULL, NULL,
    'light', 8
  ),
  (
    (SELECT id FROM pages WHERE slug = 'home'),
    'contact-cta', 'cta',
    'Get in touch.',
    'Talk to a specialist about solutions for your business.',
    NULL,
    'Contact us', '/contact',
    'Request quotation', '/contact',
    'white', 9
  );

-- ── Verify ──
SELECT 'Pages: ' || COUNT(*) FROM pages;
SELECT 'Sections: ' || COUNT(*) FROM sections;
