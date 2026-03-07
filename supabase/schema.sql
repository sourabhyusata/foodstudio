-- =============================================
-- Dosa Darbar — Supabase Database Schema
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- MENU ITEMS
-- =============================================
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  price NUMERIC(8, 2) NOT NULL CHECK (price >= 0),
  category TEXT NOT NULL CHECK (category IN (
    'Dosa', 'Special Dosa', 'Rava Dosa', 'Uttapam', 'South Indian',
    'North Indian', 'Breads', 'Rice & Biryani', 'Chinese', 'Starters',
    'Beverages', 'Combos'
  )),
  image_url TEXT DEFAULT '',
  is_veg BOOLEAN NOT NULL DEFAULT true,
  is_available BOOLEAN NOT NULL DEFAULT true,
  is_bestseller BOOLEAN NOT NULL DEFAULT false,
  is_chefs_special BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast category filtering
CREATE INDEX idx_menu_items_category ON menu_items (category);
CREATE INDEX idx_menu_items_available ON menu_items (is_available);

-- =============================================
-- ORDERS
-- =============================================
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT UNIQUE NOT NULL,
  user_phone TEXT NOT NULL,
  customer_name TEXT DEFAULT '',
  items JSONB NOT NULL DEFAULT '[]',
  -- items format: [{ "item_id": "uuid", "name": "...", "quantity": 1, "price": 80, "special_instructions": "..." }]
  subtotal NUMERIC(10, 2) NOT NULL DEFAULT 0,
  tax NUMERIC(10, 2) NOT NULL DEFAULT 0,
  delivery_charge NUMERIC(10, 2) NOT NULL DEFAULT 0,
  total NUMERIC(10, 2) NOT NULL DEFAULT 0,
  order_type TEXT NOT NULL CHECK (order_type IN ('delivery', 'takeaway')),
  delivery_address JSONB DEFAULT NULL,
  -- address format: { "line1": "...", "line2": "...", "city": "...", "pincode": "...", "landmark": "...", "lat": 0, "lng": 0 }
  status TEXT NOT NULL DEFAULT 'received' CHECK (status IN (
    'received', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled'
  )),
  payment_method TEXT NOT NULL CHECK (payment_method IN ('razorpay', 'cod')),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
  razorpay_order_id TEXT DEFAULT NULL,
  razorpay_payment_id TEXT DEFAULT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_orders_status ON orders (status);
CREATE INDEX idx_orders_user_phone ON orders (user_phone);
CREATE INDEX idx_orders_created_at ON orders (created_at DESC);

-- =============================================
-- USERS (extends Supabase Auth users)
-- =============================================
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  phone TEXT UNIQUE,
  name TEXT DEFAULT '',
  email TEXT DEFAULT '',
  addresses JSONB DEFAULT '[]',
  -- addresses format: [{ "label": "Home", "line1": "...", "line2": "...", "city": "...", "pincode": "...", "landmark": "..." }]
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- =============================================
-- ADMIN CREDENTIALS
-- =============================================
CREATE TABLE admin_credentials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Menu items: public read, admin write
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Menu items are viewable by everyone"
  ON menu_items FOR SELECT
  USING (true);

CREATE POLICY "Menu items are editable by admins"
  ON menu_items FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Orders: users see their own, admins see all
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  USING (user_phone = auth.jwt() ->> 'phone' OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users can create orders"
  ON orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update orders"
  ON orders FOR UPDATE
  USING (auth.jwt() ->> 'role' = 'admin');

-- User profiles: users manage their own
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON user_profiles FOR SELECT
  USING (id = auth.uid());

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  USING (id = auth.uid());

CREATE POLICY "Users can insert their own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (id = auth.uid());

-- =============================================
-- UPDATED_AT TRIGGER
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_menu_items_updated_at
  BEFORE UPDATE ON menu_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_credentials_updated_at
  BEFORE UPDATE ON admin_credentials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
