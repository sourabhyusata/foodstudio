-- Create and use dedicated application schema
CREATE SCHEMA IF NOT EXISTS foodstudio;
SET search_path TO foodstudio, public;

-- =============================================
-- Dosa Darbar — Complete Database Setup
-- Run this ONCE in Supabase SQL Editor
-- (Project > SQL Editor > New query)
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- MENU ITEMS
-- =============================================
CREATE TABLE IF NOT EXISTS foodstudio.menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  price NUMERIC(8, 2) NOT NULL CHECK (price >= 0),
  category TEXT NOT NULL,
  image_url TEXT DEFAULT '',
  is_veg BOOLEAN NOT NULL DEFAULT true,
  is_available BOOLEAN NOT NULL DEFAULT true,
  is_bestseller BOOLEAN NOT NULL DEFAULT false,
  is_chefs_special BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON foodstudio.menu_items (category);
CREATE INDEX IF NOT EXISTS idx_menu_items_available ON foodstudio.menu_items (is_available);

-- =============================================
-- ORDERS
-- =============================================
CREATE TABLE IF NOT EXISTS foodstudio.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT UNIQUE NOT NULL,
  user_phone TEXT NOT NULL,
  customer_name TEXT DEFAULT '',
  items JSONB NOT NULL DEFAULT '[]',
  subtotal NUMERIC(10, 2) NOT NULL DEFAULT 0,
  tax NUMERIC(10, 2) NOT NULL DEFAULT 0,
  delivery_charge NUMERIC(10, 2) NOT NULL DEFAULT 0,
  total NUMERIC(10, 2) NOT NULL DEFAULT 0,
  order_type TEXT NOT NULL CHECK (order_type IN ('delivery', 'takeaway')),
  delivery_address JSONB DEFAULT NULL,
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

CREATE INDEX IF NOT EXISTS idx_orders_status ON foodstudio.orders (status);
CREATE INDEX IF NOT EXISTS idx_orders_user_phone ON foodstudio.orders (user_phone);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON foodstudio.orders (created_at DESC);

-- =============================================
-- USER PROFILES
-- =============================================
CREATE TABLE IF NOT EXISTS foodstudio.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  phone TEXT UNIQUE,
  name TEXT DEFAULT '',
  email TEXT DEFAULT '',
  addresses JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- =============================================
-- ADMIN CREDENTIALS
-- =============================================
CREATE TABLE IF NOT EXISTS foodstudio.admin_credentials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

-- Menu: public read
ALTER TABLE foodstudio.menu_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Menu items are viewable by everyone" ON foodstudio.menu_items;
CREATE POLICY "Menu items are viewable by everyone"
  ON foodstudio.menu_items FOR SELECT USING (true);

DROP POLICY IF EXISTS "Menu items are editable by service role" ON foodstudio.menu_items;
CREATE POLICY "Menu items are editable by service role"
  ON foodstudio.menu_items FOR ALL USING (true);

-- Orders
ALTER TABLE foodstudio.orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Orders are viewable by everyone" ON foodstudio.orders;
CREATE POLICY "Orders are viewable by everyone"
  ON foodstudio.orders FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can create orders" ON foodstudio.orders;
CREATE POLICY "Anyone can create orders"
  ON foodstudio.orders FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Orders can be updated" ON foodstudio.orders;
CREATE POLICY "Orders can be updated"
  ON foodstudio.orders FOR UPDATE USING (true);

-- User profiles
ALTER TABLE foodstudio.user_profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own profile" ON foodstudio.user_profiles;
CREATE POLICY "Users can view own profile"
  ON foodstudio.user_profiles FOR SELECT USING (id = auth.uid());

DROP POLICY IF EXISTS "Users can update own profile" ON foodstudio.user_profiles;
CREATE POLICY "Users can update own profile"
  ON foodstudio.user_profiles FOR UPDATE USING (id = auth.uid());

DROP POLICY IF EXISTS "Users can insert own profile" ON foodstudio.user_profiles;
CREATE POLICY "Users can insert own profile"
  ON foodstudio.user_profiles FOR INSERT WITH CHECK (id = auth.uid());


-- Admin credentials: service role only (no anon/auth policies)
ALTER TABLE foodstudio.admin_credentials ENABLE ROW LEVEL SECURITY;

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

DROP TRIGGER IF EXISTS update_menu_items_updated_at ON foodstudio.menu_items;
CREATE TRIGGER update_menu_items_updated_at
  BEFORE UPDATE ON foodstudio.menu_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_orders_updated_at ON foodstudio.orders;
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON foodstudio.orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON foodstudio.user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON foodstudio.user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_admin_credentials_updated_at ON foodstudio.admin_credentials;
CREATE TRIGGER update_admin_credentials_updated_at
  BEFORE UPDATE ON foodstudio.admin_credentials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- SEED MENU DATA (from actual Dosa Darbar menu)
-- =============================================

-- Clear existing menu items
TRUNCATE TABLE foodstudio.menu_items CASCADE;
TRUNCATE TABLE foodstudio.admin_credentials CASCADE;

INSERT INTO foodstudio.menu_items (name, description, price, category, image_url, is_veg, is_available, is_bestseller, is_chefs_special) VALUES
-- DOSA
('Plain Dosa', 'Crispy golden dosa served with sambar and coconut chutney. Made with butter.', 60, 'Dosa', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', true, true, false, false),
('Plain Podi Masala Dosa', 'Crispy dosa with spicy podi masala — a South Indian classic', 70, 'Dosa', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', true, true, false, false),
('Plain Onion Dosa', 'Crispy dosa topped with golden caramelized onions', 70, 'Dosa', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', true, true, false, false),
('Plain Cheese Dosa', 'Crispy dosa loaded with melted cheese', 90, 'Dosa', 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400', true, true, false, false),
('Masala Dosa', 'Classic dosa stuffed with spiced potato filling. Made with butter.', 80, 'Dosa', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', true, true, true, false),
('Onion Masala Dosa', 'Masala dosa topped with crispy onions', 90, 'Dosa', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', true, true, false, false),
('Mysore Masala Dosa', 'Spicy red chutney spread dosa with potato masala', 100, 'Dosa', 'https://images.unsplash.com/photo-1667040014386-591a6ea6de46?w=400', true, true, true, false),
('Podi Masala Dosa', 'Dosa with spicy podi masala and potato filling', 100, 'Dosa', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', true, true, false, false),
('Paneer Masala Dosa', 'Dosa filled with spiced paneer and potato masala', 110, 'Dosa', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', true, true, true, false),
('Cheese Masala Dosa', 'Masala dosa loaded with melted cheese', 120, 'Dosa', 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400', true, true, true, false),
('Schezwan Masala Dosa', 'Indo-Chinese twist with spicy schezwan sauce and masala', 120, 'Dosa', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', true, true, false, false),
('Schezwan Cheese Masala Dosa', 'Schezwan masala dosa with extra cheese — our premium dosa', 140, 'Dosa', 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400', true, true, false, true),

-- IDLI
('Idli Sambhar (2 Pcs)', 'Steamed rice cakes served with hot sambar and coconut chutney', 50, 'South Indian', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', true, true, false, false),
('Masala Idli', 'Idlis tossed with spicy masala and served with chutney', 70, 'South Indian', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', true, true, false, false),

-- UTTAPAM
('Onion Uttapam', 'Soft uttapam topped with chopped onions. Made with butter.', 90, 'Uttapam', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', true, true, false, false),
('Vegetable Uttapam', 'Loaded with onions, tomatoes, capsicum and carrots. Made with butter.', 100, 'Uttapam', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', true, true, false, false),
('Paneer Uttapam', 'Soft uttapam with crumbled paneer topping. Made with butter.', 120, 'Uttapam', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', true, true, false, false),
('Cheese Uttapam', 'Uttapam topped with generous melted cheese. Made with butter.', 130, 'Uttapam', 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400', true, true, false, false);

-- Grants for Supabase API roles
GRANT USAGE ON SCHEMA foodstudio TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA foodstudio TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA foodstudio TO service_role;

-- Public app access (excluding admin_credentials)
GRANT SELECT ON foodstudio.menu_items TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON foodstudio.orders TO authenticated;
GRANT SELECT, INSERT, UPDATE ON foodstudio.user_profiles TO authenticated;

GRANT SELECT ON ALL TABLES IN SCHEMA foodstudio TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA foodstudio TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA foodstudio TO service_role;



INSERT INTO foodstudio.admin_credentials (username, password_hash, is_active) VALUES
('admin', '308b9eb79dbd40596d99f4c31a8bfc8b:552a691dd31faa6f5cc517f3af05b293b4fe947b0a75aefd12f81396be73f4ce76cffce788568a6f1584675fbe14927ee63e68fd7cc0f5a5c7e3dd7c49a28fa3', true);
