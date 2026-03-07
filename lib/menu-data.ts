import { MenuItem } from '@/types';

// Fallback menu data — used when Supabase is unavailable
// Actual data comes from the database via API
export const menuItems: MenuItem[] = [
  // === DOSA (from actual menu card) ===
  { id: 'd001', name: 'Plain Dosa', description: 'Crispy golden dosa served with sambar and coconut chutney. Made with butter.', price: 60, category: 'Dosa', image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'd002', name: 'Plain Podi Masala Dosa', description: 'Crispy dosa with spicy podi masala — a South Indian classic', price: 70, category: 'Dosa', image_url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'd003', name: 'Plain Onion Dosa', description: 'Crispy dosa topped with golden caramelized onions', price: 70, category: 'Dosa', image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'd004', name: 'Plain Cheese Dosa', description: 'Crispy dosa loaded with melted cheese', price: 90, category: 'Dosa', image_url: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'd005', name: 'Masala Dosa', description: 'Classic dosa stuffed with spiced potato filling. Made with butter.', price: 80, category: 'Dosa', image_url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', is_veg: true, is_available: true, is_bestseller: true },
  { id: 'd006', name: 'Onion Masala Dosa', description: 'Masala dosa topped with crispy onions', price: 90, category: 'Dosa', image_url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'd007', name: 'Mysore Masala Dosa', description: 'Spicy red chutney spread dosa with potato masala', price: 100, category: 'Dosa', image_url: 'https://images.unsplash.com/photo-1667040014386-591a6ea6de46?w=400', is_veg: true, is_available: true, is_bestseller: true },
  { id: 'd008', name: 'Podi Masala Dosa', description: 'Dosa with spicy podi masala and potato filling', price: 100, category: 'Dosa', image_url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'd009', name: 'Paneer Masala Dosa', description: 'Dosa filled with spiced paneer and potato masala', price: 110, category: 'Dosa', image_url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', is_veg: true, is_available: true, is_bestseller: true },
  { id: 'd010', name: 'Cheese Masala Dosa', description: 'Masala dosa loaded with melted cheese', price: 120, category: 'Dosa', image_url: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400', is_veg: true, is_available: true, is_bestseller: true },
  { id: 'd011', name: 'Schezwan Masala Dosa', description: 'Indo-Chinese twist with spicy schezwan sauce and masala', price: 120, category: 'Dosa', image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'd012', name: 'Schezwan Cheese Masala Dosa', description: 'Schezwan masala dosa with extra cheese — our premium dosa', price: 140, category: 'Dosa', image_url: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400', is_veg: true, is_available: true, is_bestseller: false, is_chefs_special: true },

  // === SOUTH INDIAN ===
  { id: 'si001', name: 'Idli Sambhar (2 Pcs)', description: 'Steamed rice cakes served with hot sambar and coconut chutney', price: 50, category: 'South Indian', image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'si002', name: 'Masala Idli', description: 'Idlis tossed with spicy masala and served with chutney', price: 70, category: 'South Indian', image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', is_veg: true, is_available: true, is_bestseller: false },

  // === UTTAPAM ===
  { id: 'u001', name: 'Onion Uttapam', description: 'Soft uttapam topped with chopped onions. Made with butter.', price: 90, category: 'Uttapam', image_url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'u002', name: 'Vegetable Uttapam', description: 'Loaded with onions, tomatoes, capsicum and carrots. Made with butter.', price: 100, category: 'Uttapam', image_url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'u003', name: 'Paneer Uttapam', description: 'Soft uttapam with crumbled paneer topping. Made with butter.', price: 120, category: 'Uttapam', image_url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', is_veg: true, is_available: true, is_bestseller: false },
  { id: 'u004', name: 'Cheese Uttapam', description: 'Uttapam topped with generous melted cheese. Made with butter.', price: 130, category: 'Uttapam', image_url: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400', is_veg: true, is_available: true, is_bestseller: false },
];

export const categories = [
  'Dosa', 'South Indian', 'Uttapam'
] as const;

export const testimonials = [
  { id: '1', name: 'Rahul Sharma', rating: 5, comment: 'Best dosas in Jaipur, hands down! The Mysore Masala Dosa is absolutely incredible. Fresh batter, perfect crispiness, and the chutney is to die for.', date: '2025-12-15', avatar: '' },
  { id: '2', name: 'Priya Gupta', rating: 5, comment: 'We come here every weekend as a family. The Cheese Masala Dosa is a must-try — loaded with cheese and so flavorful! Great value for money.', date: '2026-01-08', avatar: '' },
  { id: '3', name: 'Amit Jain', rating: 4, comment: 'Authentic South Indian taste right here in Jaipur. The Idli Sambhar reminds me of my trips to Bangalore. Highly recommend!', date: '2026-02-20', avatar: '' },
  { id: '4', name: 'Sneha Patel', rating: 5, comment: 'The Schezwan Cheese Masala Dosa is a game changer! Crispy outside, oozing cheese inside. My kids absolutely love this place.', date: '2026-01-25', avatar: '' },
  { id: '5', name: 'Vikram Singh', rating: 5, comment: 'Dosa Darbar is my go-to place near Amrapali Nagar. Quick service, fresh food, and affordable prices. Can\'t beat that combo!', date: '2026-03-01', avatar: '' },
  { id: '6', name: 'Ananya Reddy', rating: 4, comment: 'Being from Hyderabad, I\'m very particular about South Indian food. Dosa Darbar doesn\'t disappoint — all dosas made with butter, just perfect!', date: '2026-02-10', avatar: '' },
];
