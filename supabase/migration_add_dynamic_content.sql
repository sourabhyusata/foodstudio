-- =============================================
-- Dosa Darbar — Migration: Dynamic Content Tables
-- Run this ONCE in the Supabase SQL Editor
-- =============================================

-- Ensure we work in the foodstudio schema
SET search_path TO foodstudio, public;

-- =============================================
-- 1. SITE SETTINGS (key-value config store)
-- =============================================
CREATE TABLE IF NOT EXISTS foodstudio.site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  description TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE foodstudio.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Site settings are viewable by everyone"
  ON foodstudio.site_settings FOR SELECT
  USING (true);

CREATE POLICY "Site settings are editable by admins"
  ON foodstudio.site_settings FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON foodstudio.site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- 2. TESTIMONIALS
-- =============================================
CREATE TABLE IF NOT EXISTS foodstudio.testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  avatar TEXT DEFAULT '',
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE foodstudio.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Testimonials are viewable by everyone"
  ON foodstudio.testimonials FOR SELECT
  USING (true);

CREATE POLICY "Testimonials are editable by admins"
  ON foodstudio.testimonials FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON foodstudio.testimonials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- 3. HIGHLIGHTS ("Why Dosa Darbar?" section)
-- =============================================
CREATE TABLE IF NOT EXISTS foodstudio.highlights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  icon_name TEXT NOT NULL,        -- lucide icon name: 'Flame', 'Utensils', 'Clock', 'IndianRupee'
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE foodstudio.highlights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Highlights are viewable by everyone"
  ON foodstudio.highlights FOR SELECT
  USING (true);

CREATE POLICY "Highlights are editable by admins"
  ON foodstudio.highlights FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE TRIGGER update_highlights_updated_at
  BEFORE UPDATE ON foodstudio.highlights
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- 4. ORDER CHANNELS (WhatsApp, Zomato, Swiggy)
-- =============================================
CREATE TABLE IF NOT EXISTS foodstudio.order_channels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  href TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL,         -- lucide icon name: 'MessageCircle', 'ShoppingBag', 'Bike'
  style TEXT NOT NULL DEFAULT '',  -- tailwind classes for bg color
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE foodstudio.order_channels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Order channels are viewable by everyone"
  ON foodstudio.order_channels FOR SELECT
  USING (true);

CREATE POLICY "Order channels are editable by admins"
  ON foodstudio.order_channels FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE TRIGGER update_order_channels_updated_at
  BEFORE UPDATE ON foodstudio.order_channels
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- GRANTS
-- =============================================
GRANT SELECT ON foodstudio.site_settings TO anon, authenticated;
GRANT SELECT ON foodstudio.testimonials TO anon, authenticated;
GRANT SELECT ON foodstudio.highlights TO anon, authenticated;
GRANT SELECT ON foodstudio.order_channels TO anon, authenticated;

GRANT ALL ON foodstudio.site_settings TO service_role;
GRANT ALL ON foodstudio.testimonials TO service_role;
GRANT ALL ON foodstudio.highlights TO service_role;
GRANT ALL ON foodstudio.order_channels TO service_role;

-- =============================================
-- SEED DATA
-- =============================================

-- Site Settings
INSERT INTO foodstudio.site_settings (key, value, description) VALUES
  ('tax_rate', '0.05', 'GST tax rate for restaurant (5%)'),
  ('delivery_charge_default', '30', 'Default delivery charge in INR'),
  ('free_delivery_threshold', '500', 'Minimum order amount for free delivery in INR'),
  ('whatsapp_number', '919785132125', 'WhatsApp business number with country code'),
  ('phone_number', '+91 97851 32125', 'Display phone number'),
  ('email', 'hello@dosadarbar.in', 'Contact email address'),
  ('address', 'Shop No. G4, Amrapali Nagar, Dhawas, Lalarpura, Landmark: Meghraj Hospital, Gandhipath West, Jaipur', 'Restaurant full address'),
  ('address_short', 'Ajmer Highway, Jaipur, Rajasthan 302001, India', 'Short address for footer'),
  ('opening_hours', '8:00 AM – 11:00 PM', 'Daily opening hours'),
  ('delivery_hours', '10:00 AM – 10:30 PM', 'Delivery service hours'),
  ('instagram_url', 'https://www.instagram.com/explore/locations/1491334574210545/dosa-darbar/recent/', 'Instagram profile URL'),
  ('zomato_url', 'https://www.zomato.com/jaipur/dosa-darbar-1-ajmer-highway', 'Zomato profile URL'),
  ('swiggy_url', 'https://www.swiggy.com/city/jaipur/dosa-darbar-vaishali-nagar-rest1103230?utm_source=GooglePlaceOrder&utm_campaign=GoogleMap&is_retargeting=true&media_source=GooglePlaceOrder', 'Swiggy profile URL'),
  ('google_maps_url', 'https://maps.google.com/?q=Dosa+Darbar+Amrapali+Nagar+Jaipur', 'Google Maps link'),
  ('google_maps_embed', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.5!2d75.7!3d26.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sDosa%20Darbar%2C%20Amrapali%20Nagar%2C%20Jaipur!5e0!3m2!1sen!2sin!4v1234567890', 'Google Maps embed URL'),
  ('youtube_video_url', 'https://www.youtube.com/embed/ei4cLt0mRKA?rel=0&modestbranding=1', 'Homepage video embed URL'),
  ('hero_badge_text', 'Now accepting online orders', 'Hero section badge text'),
  ('hero_title', 'Jaipur''s Favorite Dosa Destination', 'Hero section main title'),
  ('hero_subtitle', 'Fresh batter, hot griddle, 30+ varieties — from the classic Masala Dosa to our legendary Family Dosa. Authentic South Indian flavors, right here on Ajmer Highway.', 'Hero section description'),
  ('hero_image_url', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=1600', 'Hero section background image URL'),
  ('stat_dosa_varieties', '30+', 'Hero stat: dosa varieties count'),
  ('stat_happy_customers', '5000+', 'Hero stat: happy customers count'),
  ('stat_zomato_rating', '4.3★', 'Hero stat: Zomato rating'),
  ('delivery_free_within_km', '3', 'Free delivery radius in km'),
  ('delivery_charge_3_5km', '20', 'Delivery charge for 3-5 km'),
  ('delivery_charge_5_8km', '35', 'Delivery charge for 5-8 km'),
  ('delivery_charge_8_10km', '50', 'Delivery charge for 8-10 km')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, description = EXCLUDED.description;

-- Testimonials
INSERT INTO foodstudio.testimonials (name, rating, comment, date, sort_order) VALUES
  ('Rahul Sharma', 5, 'Best dosas in Jaipur, hands down! The Mysore Masala Dosa is absolutely incredible. Fresh batter, perfect crispiness, and the chutney is to die for.', '2025-12-15', 1),
  ('Priya Gupta', 5, 'We come here every weekend as a family. The Cheese Masala Dosa is a must-try — loaded with cheese and so flavorful! Great value for money.', '2026-01-08', 2),
  ('Amit Jain', 4, 'Authentic South Indian taste right here in Jaipur. The Idli Sambhar reminds me of my trips to Bangalore. Highly recommend!', '2026-02-20', 3),
  ('Sneha Patel', 5, 'The Schezwan Cheese Masala Dosa is a game changer! Crispy outside, oozing cheese inside. My kids absolutely love this place.', '2026-01-25', 4),
  ('Vikram Singh', 5, 'Dosa Darbar is my go-to place near Amrapali Nagar. Quick service, fresh food, and affordable prices. Can''t beat that combo!', '2026-03-01', 5),
  ('Ananya Reddy', 4, 'Being from Hyderabad, I''m very particular about South Indian food. Dosa Darbar doesn''t disappoint — all dosas made with butter, just perfect!', '2026-02-10', 6);

-- Highlights
INSERT INTO foodstudio.highlights (icon_name, title, description, sort_order) VALUES
  ('Flame', 'Fresh Batter Daily', 'Our dosa batter is prepared fresh every morning — no shortcuts, no preservatives.', 1),
  ('Utensils', 'Made with Butter', 'All our dosas and uttapams are made with butter for that rich, authentic taste.', 2),
  ('Clock', 'Fast Service', 'Hot food, served fast. Most orders are ready within 10–15 minutes.', 3),
  ('IndianRupee', 'Affordable Prices', 'Great food shouldn''t break the bank. Dosas starting at just ₹60.', 4);

-- Order Channels
INSERT INTO foodstudio.order_channels (name, href, description, icon_name, style, sort_order) VALUES
  ('WhatsApp', 'https://wa.me/919785132125?text=Hi%20Dosa%20Darbar!%20I%20want%20to%20place%20an%20order.', 'Chat directly with us and place your order instantly.', 'MessageCircle', 'bg-leaf-green hover:bg-leaf-dark', 1),
  ('Zomato', 'https://www.zomato.com/jaipur/dosa-darbar-1-ajmer-highway', 'Order through Zomato for quick doorstep delivery.', 'ShoppingBag', 'bg-curry-red hover:bg-red-700', 2),
  ('Swiggy', 'https://www.swiggy.com/city/jaipur/dosa-darbar-vaishali-nagar-rest1103230?utm_source=GooglePlaceOrder&utm_campaign=GoogleMap&is_retargeting=true&media_source=GooglePlaceOrder', 'Order your favorites directly on Swiggy.', 'Bike', 'bg-saffron hover:bg-saffron-dark', 3);
