-- SiMiTsu: Tsunami Events Table Schema
-- Target: Supabase PostgreSQL
-- Status: Belum diterapkan — menunggu konfigurasi Supabase

CREATE TABLE IF NOT EXISTS tsunami_events (
  id SERIAL PRIMARY KEY,
  year INTEGER NOT NULL,
  name TEXT NOT NULL,
  magnitude NUMERIC(3,1),
  max_height NUMERIC(5,1),
  victims TEXT,
  cause TEXT NOT NULL,
  latitude NUMERIC(7,4),
  longitude NUMERIC(7,4),
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Publik hanya baca, admin bisa tulis
ALTER TABLE tsunami_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Publik dapat membaca data tsunami"
  ON tsunami_events FOR SELECT
  USING (true);

CREATE POLICY "Admin dapat mengelola data tsunami"
  ON tsunami_events FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Index untuk pencarian dan filter
CREATE INDEX idx_tsunami_year ON tsunami_events(year);
CREATE INDEX idx_tsunami_cause ON tsunami_events(cause);

