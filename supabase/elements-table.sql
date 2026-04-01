-- ============================================================================
-- ELEMENTS TABLE — Sub-components inside sections.
-- Run in Supabase SQL Editor.
-- ============================================================================

CREATE TABLE IF NOT EXISTS elements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_id UUID NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
  type TEXT NOT NULL DEFAULT 'paragraph',
  content JSONB,
  style JSONB,
  settings JSONB,
  "order" INTEGER NOT NULL DEFAULT 0,
  visible BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_elements_section_id ON elements(section_id);
CREATE INDEX IF NOT EXISTS idx_elements_order ON elements("order");

ALTER TABLE elements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read elements" ON elements FOR SELECT USING (true);
CREATE POLICY "Anyone can insert elements" ON elements FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update elements" ON elements FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Anyone can delete elements" ON elements FOR DELETE USING (true);

CREATE TRIGGER elements_updated_at
  BEFORE UPDATE ON elements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

SELECT 'Elements table created' AS status;
