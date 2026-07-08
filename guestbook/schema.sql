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

CREATE TABLE IF NOT EXISTS site_visitors (
  visitor_hash TEXT PRIMARY KEY,
  first_seen_at TEXT NOT NULL,
  last_seen_at TEXT NOT NULL,
  visit_count INTEGER NOT NULL DEFAULT 1,
  user_agent TEXT NOT NULL DEFAULT '',
  ip_address TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS site_stats (
  key TEXT PRIMARY KEY,
  value INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL
);
