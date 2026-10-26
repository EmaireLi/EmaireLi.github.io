-- Index only: preserves all existing visitor records and historical totals.
CREATE INDEX IF NOT EXISTS idx_site_visitors_ip_first_seen
  ON site_visitors(ip_address, first_seen_at, visitor_hash);
