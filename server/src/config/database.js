const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, '../../../data');
fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(path.join(dataDir, 'rory-dev.db'));
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS enquiries (
    id                INTEGER  PRIMARY KEY AUTOINCREMENT,
    first_name        TEXT     NOT NULL,
    last_name         TEXT     NOT NULL,
    email             TEXT     NOT NULL,
    phone             TEXT     NOT NULL,
    company           TEXT     NOT NULL,
    project_type      TEXT     NOT NULL,
    budget            TEXT     NOT NULL,
    project_description TEXT   NOT NULL,
    file_path         TEXT,
    original_filename TEXT,
    status            TEXT     NOT NULL DEFAULT 'new'
                      CHECK (status IN ('new','contacted','proposal_sent','won','lost')),
    internal_notes    TEXT,
    created_at        TEXT     NOT NULL DEFAULT (datetime('now')),
    updated_at        TEXT     NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TRIGGER IF NOT EXISTS trg_enquiries_updated_at
    AFTER UPDATE ON enquiries FOR EACH ROW
    BEGIN
      UPDATE enquiries SET updated_at = datetime('now') WHERE id = NEW.id;
    END;
`);

const testConnection = () => {
  console.log('SQLite ready — data/rory-dev.db');
};

module.exports = { db, testConnection };
