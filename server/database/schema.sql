-- Rory Dev — PostgreSQL schema
-- Run: psql -U postgres -d rory_dev -f database/schema.sql

CREATE TABLE IF NOT EXISTS enquiries (
  id                  SERIAL PRIMARY KEY,
  first_name          VARCHAR(100) NOT NULL,
  last_name           VARCHAR(100) NOT NULL,
  email               VARCHAR(255) NOT NULL,
  phone               VARCHAR(50)  NOT NULL,
  company             VARCHAR(255) NOT NULL,
  project_type        VARCHAR(100) NOT NULL,
  budget              VARCHAR(100) NOT NULL,
  project_description TEXT         NOT NULL,
  file_path           TEXT,
  original_filename   VARCHAR(255),
  status              VARCHAR(50)  NOT NULL DEFAULT 'new'
                        CHECK (status IN ('new','contacted','proposal_sent','won','lost')),
  internal_notes      TEXT,
  created_at          TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_enquiries_status     ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_email      ON enquiries(email);

-- Automatically update updated_at on row changes
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_enquiries_updated_at ON enquiries;
CREATE TRIGGER trg_enquiries_updated_at
  BEFORE UPDATE ON enquiries
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
