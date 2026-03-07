-- =============================================
-- Dosa Darbar — Menu Seed Data
-- Run this in Supabase SQL Editor
-- =============================================

-- Clear existing data
TRUNCATE TABLE menu_items CASCADE;

INSERT INTO menu_items (name, description, price, category, image_url, is_veg, is_available, is_bestseller, is_chefs_special) VALUES

-- DOSA (from actual menu card)
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
('Schezwan Cheese Masala Dosa', 'Schezwan masala dosa with extra cheese topping', 140, 'Dosa', 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400', true, true, false, true),

-- VARIETY OF IDLI (from actual menu card)
('Idli Sambhar (2 Pcs)', 'Steamed rice cakes served with hot sambar and coconut chutney', 50, 'South Indian', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', true, true, false, false),
('Masala Idli', 'Idlis tossed with spicy masala and served with chutney', 70, 'South Indian', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', true, true, false, false),

-- VARIETY OF UTTAPAM (from actual menu card)
('Onion Uttapam', 'Soft uttapam topped with chopped onions. Made with butter.', 90, 'Uttapam', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', true, true, false, false),
('Vegetable Uttapam', 'Loaded with onions, tomatoes, capsicum and carrots. Made with butter.', 100, 'Uttapam', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', true, true, false, false),
('Paneer Uttapam', 'Soft uttapam with crumbled paneer topping. Made with butter.', 120, 'Uttapam', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', true, true, false, false),
('Cheese Uttapam', 'Uttapam topped with generous melted cheese. Made with butter.', 130, 'Uttapam', 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400', true, true, false, false);
