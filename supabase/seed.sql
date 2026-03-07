-- =============================================
-- Dosa Darbar — Menu Seed Data
-- =============================================

INSERT INTO menu_items (name, description, price, category, image_url, is_veg, is_available, is_bestseller, is_chefs_special) VALUES

-- DOSA
('Plain Dosa', 'Crispy golden dosa served with sambar and coconut chutney', 60, 'Dosa', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', true, true, false, false),
('Masala Dosa', 'Classic dosa stuffed with spiced potato filling', 80, 'Dosa', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', true, true, true, false),
('Mysore Masala Dosa', 'Spicy red chutney spread dosa with potato masala', 100, 'Dosa', 'https://images.unsplash.com/photo-1667040014386-591a6ea6de46?w=400', true, true, true, false),
('Cheese Dosa', 'Crispy dosa loaded with melted cheese', 120, 'Dosa', 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400', true, true, true, false),
('Paneer Dosa', 'Dosa filled with spiced crumbled paneer', 130, 'Dosa', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', true, true, true, false),
('Onion Dosa', 'Crispy dosa topped with golden caramelized onions', 70, 'Dosa', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', true, true, false, false),
('Cheese Onion Dosa', 'Loaded with cheese and crispy onions', 130, 'Dosa', 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400', true, true, false, false),
('Mushroom Dosa', 'Dosa stuffed with sautéed mushrooms and spices', 120, 'Dosa', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', true, true, false, false),
('Paneer Mushroom Dosa', 'Rich filling of paneer and mushrooms in a crispy dosa', 150, 'Dosa', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', true, true, false, false),
('Spring Roll Dosa', 'Unique fusion dosa rolled with veggies spring-roll style', 130, 'Dosa', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', true, true, false, false),
('Pav Bhaji Dosa', 'Mumbai meets Chennai — dosa topped with pav bhaji masala', 130, 'Dosa', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', true, true, false, true),
('Schezwan Dosa', 'Indo-Chinese twist with spicy schezwan sauce', 120, 'Dosa', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', true, true, false, false),
('Paper Dosa', 'Extra thin and crispy — the classic paper roast', 80, 'Dosa', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', true, true, false, false),
('Ghee Roast Dosa', 'Golden dosa roasted in pure ghee for rich flavor', 100, 'Dosa', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', true, true, false, false),
('Butter Masala Dosa', 'Buttery dosa with classic potato masala filling', 110, 'Dosa', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', true, true, false, false),

-- SPECIAL DOSA
('Family Dosa', 'Massive 2-feet dosa — perfect for sharing with family', 250, 'Special Dosa', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', true, true, true, true),
('Cheese Burst Dosa', 'Stuffed with oozing cheese that bursts with every bite', 180, 'Special Dosa', 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400', true, true, true, false),
('Paneer Cheese Dosa', 'Double indulgence — paneer and cheese in crispy dosa', 170, 'Special Dosa', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', true, true, false, false),
('Chocolate Dosa', 'Sweet dessert dosa filled with melted chocolate', 120, 'Special Dosa', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', true, true, false, true),
('Pizza Dosa', 'Fusion dosa topped with pizza sauce, cheese and veggies', 160, 'Special Dosa', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', true, true, false, false),

-- RAVA DOSA
('Plain Rava Dosa', 'Crispy semolina dosa with a lacy texture', 80, 'Rava Dosa', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', true, true, false, false),
('Masala Rava Dosa', 'Rava dosa filled with spiced potato masala', 100, 'Rava Dosa', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', true, true, false, false),
('Onion Rava Dosa', 'Rava dosa sprinkled with crispy onions', 90, 'Rava Dosa', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', true, true, false, false),
('Paneer Rava Dosa', 'Rava dosa stuffed with seasoned paneer', 130, 'Rava Dosa', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', true, true, false, false),
('Cheese Rava Dosa', 'Crispy rava dosa with melted cheese goodness', 130, 'Rava Dosa', 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400', true, true, false, false),

-- UTTAPAM
('Plain Uttapam', 'Thick, fluffy South Indian pancake with sambar', 70, 'Uttapam', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', true, true, false, false),
('Onion Uttapam', 'Soft uttapam topped with chopped onions', 80, 'Uttapam', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', true, true, false, false),
('Tomato Uttapam', 'Topped with fresh tomato pieces and spices', 80, 'Uttapam', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', true, true, false, false),
('Mixed Veg Uttapam', 'Loaded with onions, tomatoes, capsicum and carrots', 90, 'Uttapam', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', true, true, false, false),
('Cheese Uttapam', 'Uttapam topped with generous melted cheese', 110, 'Uttapam', 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400', true, true, false, false),
('Paneer Uttapam', 'Soft uttapam with crumbled paneer topping', 110, 'Uttapam', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', true, true, false, false),

-- SOUTH INDIAN
('Idli (2 Pcs)', 'Steamed rice cakes served with sambar and chutney', 50, 'South Indian', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', true, true, false, false),
('Medu Vada (2 Pcs)', 'Crispy urad dal fritters with sambar and chutney', 60, 'South Indian', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', true, true, false, false),
('Sambar Vada', 'Soft vada soaked in hot tangy sambar', 70, 'South Indian', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', true, true, false, false),
('Curd Vada', 'Soft vada in creamy yogurt with sweet chutney', 70, 'South Indian', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', true, true, false, false),
('Idli Sambar Combo', '4 idlis with a bowl of piping hot sambar', 80, 'South Indian', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', true, true, false, false),

-- NORTH INDIAN
('Dal Makhani', 'Slow-cooked black lentils in creamy tomato gravy', 160, 'North Indian', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400', true, true, false, false),
('Kadhai Paneer', 'Paneer tossed with peppers in a spicy kadhai masala', 180, 'North Indian', 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400', true, true, false, false),
('Shahi Paneer', 'Rich and creamy paneer in a cashew-based gravy', 180, 'North Indian', 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400', true, true, false, false),
('Paneer Butter Masala', 'Paneer cubes in a velvety butter tomato sauce', 190, 'North Indian', 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400', true, true, true, false),
('Chole', 'Spicy chickpea curry — a North Indian classic', 140, 'North Indian', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400', true, true, false, false),
('Rajma', 'Kidney beans in a thick, spiced tomato gravy', 140, 'North Indian', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400', true, true, false, false),

-- BREADS
('Tandoori Roti', 'Whole wheat bread baked in clay tandoor', 20, 'Breads', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400', true, true, false, false),
('Butter Naan', 'Soft leavened bread brushed with butter', 40, 'Breads', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400', true, true, false, false),
('Garlic Naan', 'Naan loaded with fresh garlic and butter', 50, 'Breads', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400', true, true, false, false),
('Laccha Paratha', 'Layered and flaky buttery paratha', 40, 'Breads', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400', true, true, false, false),
('Stuffed Paratha', 'Paratha stuffed with spiced potato or paneer', 60, 'Breads', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400', true, true, false, false),

-- RICE & BIRYANI
('Jeera Rice', 'Fragrant basmati rice tempered with cumin seeds', 100, 'Rice & Biryani', 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400', true, true, false, false),
('Veg Biryani', 'Aromatic basmati rice layered with spiced vegetables', 150, 'Rice & Biryani', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400', true, true, false, false),
('Paneer Biryani', 'Rich biryani with tender paneer pieces', 180, 'Rice & Biryani', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400', true, true, false, false),

-- CHINESE
('Veg Fried Rice', 'Wok-tossed rice with vegetables and soy sauce', 120, 'Chinese', 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400', true, true, false, false),
('Veg Noodles', 'Stir-fried noodles with crunchy vegetables', 120, 'Chinese', 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400', true, true, false, false),
('Veg Manchurian', 'Crispy veggie balls in a tangy manchurian sauce', 140, 'Chinese', 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400', true, true, false, false),
('Chilli Paneer', 'Crispy paneer tossed with peppers in chilli sauce', 160, 'Chinese', 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400', true, true, false, false),

-- STARTERS
('Honey Chilli Potato', 'Crispy potato fingers glazed with honey chilli sauce', 140, 'Starters', 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400', true, true, false, false),
('Paneer Tikka', 'Tandoor-grilled paneer cubes marinated in spices', 180, 'Starters', 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400', true, true, false, false),
('Crispy Corn', 'Crunchy golden corn kernels with spicy seasoning', 130, 'Starters', 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400', true, true, false, false),
('Spring Rolls', 'Crispy rolls stuffed with seasoned veggies', 120, 'Starters', 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400', true, true, false, false),

-- BEVERAGES
('Filter Coffee', 'Authentic South Indian filter coffee — strong and aromatic', 30, 'Beverages', 'https://images.unsplash.com/photo-1497515114889-3f6b4e76859c?w=400', true, true, true, false),
('Masala Chai', 'Traditional Indian tea with aromatic spices', 25, 'Beverages', 'https://images.unsplash.com/photo-1497515114889-3f6b4e76859c?w=400', true, true, false, false),
('Sweet Lassi', 'Chilled creamy yogurt drink with a hint of cardamom', 50, 'Beverages', 'https://images.unsplash.com/photo-1497515114889-3f6b4e76859c?w=400', true, true, false, false),
('Cold Coffee', 'Iced coffee blended to creamy perfection', 70, 'Beverages', 'https://images.unsplash.com/photo-1497515114889-3f6b4e76859c?w=400', true, true, false, false),
('Fresh Orange Juice', 'Freshly squeezed orange juice — no added sugar', 60, 'Beverages', 'https://images.unsplash.com/photo-1497515114889-3f6b4e76859c?w=400', true, true, false, false),
('Buttermilk', 'Spiced and refreshing chaas — perfect with any meal', 30, 'Beverages', 'https://images.unsplash.com/photo-1497515114889-3f6b4e76859c?w=400', true, true, false, false),

-- COMBOS
('Dosa + Filter Coffee Combo', 'Any regular dosa with a hot filter coffee', 99, 'Combos', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', true, true, true, true),
('South Indian Thali', '2 dosas, idli, vada, sambar, rasam, rice, chutneys, and papad', 150, 'Combos', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', true, true, true, false),
('North Indian Thali', 'Dal, paneer curry, rice, 2 rotis, salad, raita, and papad', 170, 'Combos', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400', true, true, false, false),
('Family Feast', 'Family dosa + 4 idlis + 2 vadas + sambar + coffee x4', 450, 'Combos', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', true, true, false, true);
