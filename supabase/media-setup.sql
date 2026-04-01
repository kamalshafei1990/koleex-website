-- ============================================================================
-- MEDIA SYSTEM SETUP
-- Run this in Supabase SQL Editor.
-- 1. Fixes RLS policies on media table to allow write
-- 2. Creates storage bucket for media uploads
-- ============================================================================

-- ── Fix media table RLS — allow all operations ──
DROP POLICY IF EXISTS "Public read media" ON media;
DROP POLICY IF EXISTS "Anon write media" ON media;

CREATE POLICY "Anyone can read media" ON media FOR SELECT USING (true);
CREATE POLICY "Anyone can insert media" ON media FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update media" ON media FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Anyone can delete media" ON media FOR DELETE USING (true);

-- ── Also fix sections and pages write policies ──
DROP POLICY IF EXISTS "Anon write pages" ON pages;
DROP POLICY IF EXISTS "Anon write sections" ON sections;

CREATE POLICY "Anyone can insert pages" ON pages FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update pages" ON pages FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Anyone can delete pages" ON pages FOR DELETE USING (true);

CREATE POLICY "Anyone can insert sections" ON sections FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update sections" ON sections FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Anyone can delete sections" ON sections FOR DELETE USING (true);

-- ── Create storage bucket ──
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- ── Storage policies — allow public read and anon upload ──
CREATE POLICY "Public read media files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'media');

CREATE POLICY "Anyone can upload media files"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'media');

CREATE POLICY "Anyone can update media files"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'media')
  WITH CHECK (bucket_id = 'media');

CREATE POLICY "Anyone can delete media files"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'media');

-- ── Verify ──
SELECT 'Media table RLS: enabled' AS status;
SELECT name, public FROM storage.buckets WHERE id = 'media';
