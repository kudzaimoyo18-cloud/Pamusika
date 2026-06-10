-- Migration 0003 - Pamusika pivot.
--
-- Drops the M0 single-seller e-commerce schema (products, variants, orders)
-- and creates the Pamusika multi-shop marketplace schema (users, shops,
-- listings, conversations, messages, reports, boost_payments).

-- == DROP old M0 e-commerce tables ===========================

DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS product_images CASCADE;
DROP TABLE IF EXISTS variants CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- == CREATE Pamusika tables ==================================

CREATE TABLE users (
  id text PRIMARY KEY,
  phone text NOT NULL,
  name text,
  email text,
  avatar_url text,
  role text NOT NULL DEFAULT 'user',
  suspended_at timestamptz,
  city text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX users_phone_uq ON users (phone);
CREATE INDEX users_role_idx ON users (role);

CREATE TABLE shops (
  id text PRIMARY KEY,
  owner_user_id text NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  slug text NOT NULL,
  name text NOT NULL,
  bio text,
  logo_url text,
  banner_url text,
  verified boolean NOT NULL DEFAULT false,
  suspended_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX shops_slug_uq ON shops (slug);
CREATE UNIQUE INDEX shops_owner_uq ON shops (owner_user_id);

CREATE TABLE categories (
  id text PRIMARY KEY,
  parent_id text REFERENCES categories(id) ON DELETE SET NULL,
  name text NOT NULL,
  position integer NOT NULL DEFAULT 0,
  requires_condition boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE listings (
  id text PRIMARY KEY,
  shop_id text NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
  category_id text NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  price_usd_minor integer NOT NULL DEFAULT 0,
  is_negotiable boolean NOT NULL DEFAULT false,
  condition text,
  city text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  published_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '30 days'),
  boosted_until timestamptz,
  view_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX listings_shop_idx ON listings (shop_id);
CREATE INDEX listings_category_idx ON listings (category_id);
CREATE INDEX listings_status_idx ON listings (status);
CREATE INDEX listings_city_idx ON listings (city);
CREATE INDEX listings_published_idx ON listings (published_at DESC);
CREATE INDEX listings_boost_idx ON listings (boosted_until DESC) WHERE boosted_until IS NOT NULL;
CREATE INDEX listings_expires_idx ON listings (expires_at) WHERE status = 'active';
CREATE INDEX listings_fts_idx ON listings USING gin(
  to_tsvector('english', title || ' ' || description)
);

CREATE TABLE listing_images (
  id text PRIMARY KEY,
  listing_id text NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  url text NOT NULL,
  blob_path text NOT NULL,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX listing_images_listing_idx ON listing_images (listing_id, position);

CREATE TABLE conversations (
  id text PRIMARY KEY,
  listing_id text NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  buyer_user_id text NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  last_message_at timestamptz NOT NULL DEFAULT now(),
  buyer_unread_count integer NOT NULL DEFAULT 0,
  seller_unread_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX conversations_listing_buyer_uq ON conversations (listing_id, buyer_user_id);
CREATE INDEX conversations_buyer_idx ON conversations (buyer_user_id, last_message_at DESC);
CREATE INDEX conversations_last_message_idx ON conversations (last_message_at DESC);

CREATE TABLE messages (
  id text PRIMARY KEY,
  conversation_id text NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_user_id text NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX messages_conversation_idx ON messages (conversation_id, created_at);

CREATE TABLE reports (
  id text PRIMARY KEY,
  target_type text NOT NULL,
  target_id text NOT NULL,
  reporter_user_id text REFERENCES users(id) ON DELETE SET NULL,
  reason text NOT NULL,
  note text,
  status text NOT NULL DEFAULT 'open',
  resolved_by text REFERENCES users(id) ON DELETE SET NULL,
  resolved_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX reports_status_idx ON reports (status, created_at);
CREATE INDEX reports_target_idx ON reports (target_type, target_id);

CREATE TABLE boost_payments (
  id text PRIMARY KEY,
  listing_id text NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  user_id text NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount_usd_minor integer NOT NULL,
  paynow_reference text,
  paynow_poll_url text,
  status text NOT NULL DEFAULT 'pending',
  duration_days integer NOT NULL DEFAULT 7,
  paid_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX boost_payments_listing_idx ON boost_payments (listing_id);
CREATE INDEX boost_payments_user_idx ON boost_payments (user_id, created_at DESC);
CREATE INDEX boost_payments_status_idx ON boost_payments (status);

-- == SEED categories ==========================================

INSERT INTO categories (id, name, position, requires_condition) VALUES
  ('vehicles',     'Vehicles',            10, true),
  ('houses',       'Houses',              20, false),
  ('land',         'Land & Stands',       30, false),
  ('electronics',  'Electronics',         40, true),
  ('phones',       'Phones',              50, true),
  ('computers',    'Computers & Laptops', 60, true),
  ('furniture',    'Furniture',           70, true),
  ('appliances',   'Appliances',          80, true),
  ('fashion',      'Fashion',             90, true),
  ('baby',         'Baby & Kids',        100, true),
  ('beauty',       'Beauty',             110, true),
  ('books',        'Books & Hobbies',    120, true),
  ('sports',       'Sports & Outdoors',  130, true),
  ('pets',         'Pets',               140, false),
  ('free',         'Free Stuff',         150, true),
  ('jobs',         'Jobs',               160, false),
  ('services',     'Services',           170, false);
