CREATE TABLE IF NOT EXISTS guestbook_messages (
  id TEXT PRIMARY KEY,
  signature TEXT NOT NULL,
  signature_key TEXT NOT NULL UNIQUE,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_guestbook_messages_created_at
  ON guestbook_messages(created_at DESC);

CREATE TABLE IF NOT EXISTS guestbook_rate_limits (
  ip_hash TEXT PRIMARY KEY,
  last_posted_at INTEGER NOT NULL
);
