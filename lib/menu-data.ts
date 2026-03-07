import { MenuItem } from '@/types';

export const menuItems: MenuItem[] = [
  // === DOSA ===
  { id: 'd001', name: 'Plain Dosa', description: 'Crispy golden dosa served with sambar and coconut chutney', price: 60, category: 'Dosa', image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'd002', name: 'Masala Dosa', description: 'Classic dosa stuffed with spiced potato filling', price: 80, category: 'Dosa', image_url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', is_veg: true, is_available: true, is_bestseller: true },
  { id: 'd003', name: 'Mysore Masala Dosa', description: 'Spicy red chutney spread dosa with potato masala', price: 100, category: 'Dosa', image_url: 'https://images.unsplash.com/photo-1667040014386-591a6ea6de46?w=400', is_veg: true, is_available: true, is_bestseller: true },
  { id: 'd004', name: 'Cheese Dosa', description: 'Crispy dosa loaded with melted cheese', price: 120, category: 'Dosa', image_url: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400', is_veg: true, is_available: true, is_bestseller: true },
  { id: 'd005', name: 'Paneer Dosa', description: 'Dosa filled with spiced crumbled paneer', price: 130, category: 'Dosa', image_url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', is_veg: true, is_available: true, is_bestseller: true },
  { id: 'd006', name: 'Onion Dosa', description: 'Crispy dosa topped with golden caramelized onions', price: 70, category: 'Dosa', image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'd007', name: 'Cheese Onion Dosa', description: 'Loaded with cheese and crispy onions — a fan favorite', price: 130, category: 'Dosa', image_url: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'd008', name: 'Mushroom Dosa', description: 'Dosa stuffed with sautéed mushrooms and spices', price: 120, category: 'Dosa', image_url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'd009', name: 'Paneer Mushroom Dosa', description: 'Rich filling of paneer and mushrooms in a crispy dosa', price: 150, category: 'Dosa', image_url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'd010', name: 'Spring Roll Dosa', description: 'Unique fusion dosa rolled with veggies spring-roll style', price: 130, category: 'Dosa', image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'd011', name: 'Pav Bhaji Dosa', description: 'Mumbai meets Chennai — dosa topped with pav bhaji masala', price: 130, category: 'Dosa', image_url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', is_veg: true, is_available: true, is_bestseller: false, is_chefs_special: true },
  { id: 'd012', name: 'Schezwan Dosa', description: 'Indo-Chinese twist with spicy schezwan sauce', price: 120, category: 'Dosa', image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'd013', name: 'Paper Dosa', description: 'Extra thin and crispy — the classic paper roast', price: 80, category: 'Dosa', image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'd014', name: 'Ghee Roast Dosa', description: 'Golden dosa roasted in pure ghee for rich flavor', price: 100, category: 'Dosa', image_url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'd015', name: 'Butter Masala Dosa', description: 'Buttery dosa with classic potato masala filling', price: 110, category: 'Dosa', image_url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', is_veg: true, is_available: true, is_bestseller: false },

  // === SPECIAL DOSA ===
  { id: 'sd001', name: 'Family Dosa', description: 'Massive 2-feet dosa — perfect for sharing with family', price: 250, category: 'Special Dosa', image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', is_veg: true, is_available: true, is_bestseller: true, is_chefs_special: true },
  { id: 'sd002', name: 'Cheese Burst Dosa', description: 'Stuffed with oozing cheese that bursts with every bite', price: 180, category: 'Special Dosa', image_url: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400', is_veg: true, is_available: true, is_bestseller: true },
  { id: 'sd003', name: 'Paneer Cheese Dosa', description: 'Double indulgence — paneer and cheese in crispy dosa', price: 170, category: 'Special Dosa', image_url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'sd004', name: 'Chocolate Dosa', description: 'Sweet dessert dosa filled with melted chocolate', price: 120, category: 'Special Dosa', image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', is_veg: true, is_available: true, is_bestseller: false, is_chefs_special: true },
  { id: 'sd005', name: 'Pizza Dosa', description: 'Fusion dosa topped with pizza sauce, cheese and veggies', price: 160, category: 'Special Dosa', image_url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', is_veg: true, is_available: true, is_bestseller: false },

  // === RAVA DOSA ===
  { id: 'rd001', name: 'Plain Rava Dosa', description: 'Crispy semolina dosa with a lacy texture', price: 80, category: 'Rava Dosa', image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'rd002', name: 'Masala Rava Dosa', description: 'Rava dosa filled with spiced potato masala', price: 100, category: 'Rava Dosa', image_url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'rd003', name: 'Onion Rava Dosa', description: 'Rava dosa sprinkled with crispy onions', price: 90, category: 'Rava Dosa', image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'rd004', name: 'Paneer Rava Dosa', description: 'Rava dosa stuffed with seasoned paneer', price: 130, category: 'Rava Dosa', image_url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'rd005', name: 'Cheese Rava Dosa', description: 'Crispy rava dosa with melted cheese goodness', price: 130, category: 'Rava Dosa', image_url: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400', is_veg: true, is_available: true, is_bestseller: false },

  // === UTTAPAM ===
  { id: 'u001', name: 'Plain Uttapam', description: 'Thick, fluffy South Indian pancake with sambar', price: 70, category: 'Uttapam', image_url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'u002', name: 'Onion Uttapam', description: 'Soft uttapam topped with chopped onions', price: 80, category: 'Uttapam', image_url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'u003', name: 'Tomato Uttapam', description: 'Topped with fresh tomato pieces and spices', price: 80, category: 'Uttapam', image_url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'u004', name: 'Mixed Veg Uttapam', description: 'Loaded with onions, tomatoes, capsicum and carrots', price: 90, category: 'Uttapam', image_url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'u005', name: 'Cheese Uttapam', description: 'Uttapam topped with generous melted cheese', price: 110, category: 'Uttapam', image_url: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'u006', name: 'Paneer Uttapam', description: 'Soft uttapam with crumbled paneer topping', price: 110, category: 'Uttapam', image_url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', is_veg: true, is_available: true, is_bestseller: false },

  // === SOUTH INDIAN ===
  { id: 'si001', name: 'Idli (2 Pcs)', description: 'Steamed rice cakes served with sambar and chutney', price: 50, category: 'South Indian', image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'si002', name: 'Medu Vada (2 Pcs)', description: 'Crispy urad dal fritters with sambar and chutney', price: 60, category: 'South Indian', image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'si003', name: 'Sambar Vada', description: 'Soft vada soaked in hot tangy sambar', price: 70, category: 'South Indian', image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'si004', name: 'Curd Vada', description: 'Soft vada in creamy yogurt with sweet chutney', price: 70, category: 'South Indian', image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'si005', name: 'Idli Sambar Combo', description: '4 idlis with a bowl of piping hot sambar', price: 80, category: 'South Indian', image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', is_veg: true, is_available: true, is_bestseller: false },

  // === NORTH INDIAN ===
  { id: 'ni001', name: 'Dal Makhani', description: 'Slow-cooked black lentils in creamy tomato gravy', price: 160, category: 'North Indian', image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'ni002', name: 'Kadhai Paneer', description: 'Paneer tossed with peppers in a spicy kadhai masala', price: 180, category: 'North Indian', image_url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'ni003', name: 'Shahi Paneer', description: 'Rich and creamy paneer in a cashew-based gravy', price: 180, category: 'North Indian', image_url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'ni004', name: 'Paneer Butter Masala', description: 'Paneer cubes in a velvety butter tomato sauce', price: 190, category: 'North Indian', image_url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400', is_veg: true, is_available: true, is_bestseller: true },
  { id: 'ni005', name: 'Chole', description: 'Spicy chickpea curry — a North Indian classic', price: 140, category: 'North Indian', image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'ni006', name: 'Rajma', description: 'Kidney beans in a thick, spiced tomato gravy', price: 140, category: 'North Indian', image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400', is_veg: true, is_available: true, is_bestseller: false },

  // === BREADS ===
  { id: 'b001', name: 'Tandoori Roti', description: 'Whole wheat bread baked in clay tandoor', price: 20, category: 'Breads', image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'b002', name: 'Butter Naan', description: 'Soft leavened bread brushed with butter', price: 40, category: 'Breads', image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'b003', name: 'Garlic Naan', description: 'Naan loaded with fresh garlic and butter', price: 50, category: 'Breads', image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'b004', name: 'Laccha Paratha', description: 'Layered and flaky buttery paratha', price: 40, category: 'Breads', image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'b005', name: 'Stuffed Paratha', description: 'Paratha stuffed with spiced potato or paneer', price: 60, category: 'Breads', image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400', is_veg: true, is_available: true, is_bestseller: false },

  // === RICE & BIRYANI ===
  { id: 'rb001', name: 'Jeera Rice', description: 'Fragrant basmati rice tempered with cumin seeds', price: 100, category: 'Rice & Biryani', image_url: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'rb002', name: 'Veg Biryani', description: 'Aromatic basmati rice layered with spiced vegetables', price: 150, category: 'Rice & Biryani', image_url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'rb003', name: 'Paneer Biryani', description: 'Rich biryani with tender paneer pieces', price: 180, category: 'Rice & Biryani', image_url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400', is_veg: true, is_available: true, is_bestseller: false },

  // === CHINESE ===
  { id: 'ch001', name: 'Veg Fried Rice', description: 'Wok-tossed rice with vegetables and soy sauce', price: 120, category: 'Chinese', image_url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'ch002', name: 'Veg Noodles', description: 'Stir-fried noodles with crunchy vegetables', price: 120, category: 'Chinese', image_url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'ch003', name: 'Veg Manchurian', description: 'Crispy veggie balls in a tangy manchurian sauce', price: 140, category: 'Chinese', image_url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'ch004', name: 'Chilli Paneer', description: 'Crispy paneer tossed with peppers in chilli sauce', price: 160, category: 'Chinese', image_url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400', is_veg: true, is_available: true, is_bestseller: false },

  // === STARTERS ===
  { id: 'st001', name: 'Honey Chilli Potato', description: 'Crispy potato fingers glazed with honey chilli sauce', price: 140, category: 'Starters', image_url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'st002', name: 'Paneer Tikka', description: 'Tandoor-grilled paneer cubes marinated in spices', price: 180, category: 'Starters', image_url: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'st003', name: 'Crispy Corn', description: 'Crunchy golden corn kernels with spicy seasoning', price: 130, category: 'Starters', image_url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'st004', name: 'Spring Rolls', description: 'Crispy rolls stuffed with seasoned veggies', price: 120, category: 'Starters', image_url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400', is_veg: true, is_available: true, is_bestseller: false },

  // === BEVERAGES ===
  { id: 'bv001', name: 'Filter Coffee', description: 'Authentic South Indian filter coffee — strong and aromatic', price: 30, category: 'Beverages', image_url: 'https://images.unsplash.com/photo-1497515114889-3f6b4e76859c?w=400', is_veg: true, is_available: true, is_bestseller: true },
  { id: 'bv002', name: 'Masala Chai', description: 'Traditional Indian tea with aromatic spices', price: 25, category: 'Beverages', image_url: 'https://images.unsplash.com/photo-1497515114889-3f6b4e76859c?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'bv003', name: 'Sweet Lassi', description: 'Chilled creamy yogurt drink with a hint of cardamom', price: 50, category: 'Beverages', image_url: 'https://images.unsplash.com/photo-1497515114889-3f6b4e76859c?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'bv004', name: 'Cold Coffee', description: 'Iced coffee blended to creamy perfection', price: 70, category: 'Beverages', image_url: 'https://images.unsplash.com/photo-1497515114889-3f6b4e76859c?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'bv005', name: 'Fresh Orange Juice', description: 'Freshly squeezed orange juice — no added sugar', price: 60, category: 'Beverages', image_url: 'https://images.unsplash.com/photo-1497515114889-3f6b4e76859c?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'bv006', name: 'Buttermilk', description: 'Spiced and refreshing chaas — perfect with any meal', price: 30, category: 'Beverages', image_url: 'https://images.unsplash.com/photo-1497515114889-3f6b4e76859c?w=400', is_veg: true, is_available: true, is_bestseller: false },

  // === COMBOS ===
  { id: 'cb001', name: 'Dosa + Filter Coffee Combo', description: 'Any regular dosa with a hot filter coffee', price: 99, category: 'Combos', image_url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', is_veg: true, is_available: true, is_bestseller: true, is_chefs_special: true },
  { id: 'cb002', name: 'South Indian Thali', description: '2 dosas, idli, vada, sambar, rasam, rice, chutneys, and papad', price: 150, category: 'Combos', image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', is_veg: true, is_available: true, is_bestseller: true },
  { id: 'cb003', name: 'North Indian Thali', description: 'Dal, paneer curry, rice, 2 rotis, salad, raita, and papad', price: 170, category: 'Combos', image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'cb004', name: 'Family Feast', description: 'Family dosa + 4 idlis + 2 vadas + sambar + coffee x4', price: 450, category: 'Combos', image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', is_veg: true, is_available: true, is_bestseller: false, is_chefs_special: true },
];

export const categories = [
  'Dosa', 'Special Dosa', 'Rava Dosa', 'Uttapam', 'South Indian',
  'North Indian', 'Breads', 'Rice & Biryani', 'Chinese', 'Starters',
  'Beverages', 'Combos'
] as const;

export const testimonials = [
  { id: '1', name: 'Rahul Sharma', rating: 5, comment: 'Best dosas in Jaipur, hands down! The Mysore Masala Dosa is absolutely incredible. Fresh batter, perfect crispiness, and the chutney is to die for.', date: '2025-12-15', avatar: '' },
  { id: '2', name: 'Priya Gupta', rating: 5, comment: 'We come here every weekend as a family. The Family Dosa is a must-try — it\'s huge and delicious! Great value for money.', date: '2026-01-08', avatar: '' },
  { id: '3', name: 'Amit Jain', rating: 4, comment: 'Authentic South Indian taste right here on Ajmer Highway. The filter coffee reminds me of my trips to Bangalore. Highly recommend!', date: '2026-02-20', avatar: '' },
  { id: '4', name: 'Sneha Patel', rating: 5, comment: 'The Cheese Burst Dosa is a game changer! Crispy outside, oozing cheese inside. My kids absolutely love this place.', date: '2026-01-25', avatar: '' },
  { id: '5', name: 'Vikram Singh', rating: 5, comment: 'As a highway regular, Dosa Darbar is my go-to stop. Quick service, fresh food, and affordable prices. Can\'t beat that combo!', date: '2026-03-01', avatar: '' },
  { id: '6', name: 'Ananya Reddy', rating: 4, comment: 'Being from Hyderabad, I\'m very particular about South Indian food. Dosa Darbar doesn\'t disappoint — the sambar is perfectly balanced.', date: '2026-02-10', avatar: '' },
];
