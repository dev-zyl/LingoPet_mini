CREATE TABLE IF NOT EXISTS licenses (
  id TEXT PRIMARY KEY,
  key_hash TEXT NOT NULL UNIQUE,
  product_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'revoked')),
  expires_at TEXT,
  max_devices INTEGER NOT NULL DEFAULT 1,
  note TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS activations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  license_id TEXT NOT NULL REFERENCES licenses(id),
  device_hash TEXT NOT NULL,
  activated_at TEXT NOT NULL,
  last_check_at TEXT NOT NULL,
  UNIQUE(license_id, device_hash)
);

CREATE INDEX IF NOT EXISTS idx_licenses_key_hash ON licenses(key_hash);
CREATE INDEX IF NOT EXISTS idx_activations_license_id ON activations(license_id);
