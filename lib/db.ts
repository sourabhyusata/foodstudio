import Database from 'better-sqlite3';
import path from 'path';

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    const dbPath = path.join(process.cwd(), 'data', 'dosadarbar.db');

    // Ensure the data directory exists
    const fs = require('fs');
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    db = new Database(dbPath);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');

    initializeDatabase(db);
  }

  return db;
}

function initializeDatabase(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS menu_items (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT DEFAULT '',
      price REAL NOT NULL DEFAULT 0,
      category TEXT NOT NULL DEFAULT 'Dosa',
      image_url TEXT DEFAULT '',
      is_veg INTEGER NOT NULL DEFAULT 1,
      is_available INTEGER NOT NULL DEFAULT 1,
      is_bestseller INTEGER NOT NULL DEFAULT 0,
      is_chefs_special INTEGER NOT NULL DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS customers (
      id TEXT PRIMARY KEY,
      phone TEXT UNIQUE NOT NULL,
      name TEXT DEFAULT '',
      email TEXT DEFAULT '',
      subscribed_offers INTEGER NOT NULL DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      order_number TEXT UNIQUE NOT NULL,
      customer_id TEXT,
      customer_name TEXT DEFAULT '',
      user_phone TEXT NOT NULL,
      subtotal REAL NOT NULL DEFAULT 0,
      tax REAL NOT NULL DEFAULT 0,
      delivery_charge REAL NOT NULL DEFAULT 0,
      total REAL NOT NULL DEFAULT 0,
      order_type TEXT NOT NULL DEFAULT 'delivery',
      delivery_address TEXT DEFAULT '',
      status TEXT NOT NULL DEFAULT 'received',
      payment_method TEXT NOT NULL DEFAULT 'cod',
      payment_status TEXT NOT NULL DEFAULT 'pending',
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (customer_id) REFERENCES customers(id)
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id TEXT NOT NULL,
      item_id TEXT,
      name TEXT NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      price REAL NOT NULL DEFAULT 0,
      special_instructions TEXT DEFAULT '',
      FOREIGN KEY (order_id) REFERENCES orders(id)
    );

    CREATE TABLE IF NOT EXISTS offers (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT DEFAULT '',
      discount_type TEXT NOT NULL DEFAULT 'percentage',
      discount_value REAL NOT NULL DEFAULT 0,
      min_order REAL DEFAULT 0,
      code TEXT UNIQUE,
      is_active INTEGER NOT NULL DEFAULT 1,
      valid_from TEXT DEFAULT (datetime('now')),
      valid_until TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS notifications (
      id TEXT PRIMARY KEY,
      offer_id TEXT,
      customer_id TEXT,
      message TEXT NOT NULL,
      is_read INTEGER NOT NULL DEFAULT 0,
      sent_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (offer_id) REFERENCES offers(id),
      FOREIGN KEY (customer_id) REFERENCES customers(id)
    );

    CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
    CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
    CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);
    CREATE INDEX IF NOT EXISTS idx_offers_active ON offers(is_active);
    CREATE INDEX IF NOT EXISTS idx_notifications_customer ON notifications(customer_id);
  `);

  // Seed menu items if empty
  const count = db.prepare('SELECT COUNT(*) as cnt FROM menu_items').get() as { cnt: number };
  if (count.cnt === 0) {
    seedMenuItems(db);
  }
}

function seedMenuItems(db: Database.Database) {
  const items = [
    { id: 'd001', name: 'Plain Dosa', description: 'Crispy golden dosa served with sambar and coconut chutney. Made with butter.', price: 60, category: 'Dosa', image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', is_veg: 1, is_available: 1, is_bestseller: 0, is_chefs_special: 0 },
    { id: 'd002', name: 'Plain Podi Masala Dosa', description: 'Crispy dosa with spicy podi masala — a South Indian classic', price: 70, category: 'Dosa', image_url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', is_veg: 1, is_available: 1, is_bestseller: 0, is_chefs_special: 0 },
    { id: 'd003', name: 'Plain Onion Dosa', description: 'Crispy dosa topped with golden caramelized onions', price: 70, category: 'Dosa', image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', is_veg: 1, is_available: 1, is_bestseller: 0, is_chefs_special: 0 },
    { id: 'd004', name: 'Plain Cheese Dosa', description: 'Crispy dosa loaded with melted cheese', price: 90, category: 'Dosa', image_url: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400', is_veg: 1, is_available: 1, is_bestseller: 0, is_chefs_special: 0 },
    { id: 'd005', name: 'Masala Dosa', description: 'Classic dosa stuffed with spiced potato filling. Made with butter.', price: 80, category: 'Dosa', image_url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', is_veg: 1, is_available: 1, is_bestseller: 1, is_chefs_special: 0 },
    { id: 'd006', name: 'Onion Masala Dosa', description: 'Masala dosa topped with crispy onions', price: 90, category: 'Dosa', image_url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', is_veg: 1, is_available: 1, is_bestseller: 0, is_chefs_special: 0 },
    { id: 'd007', name: 'Mysore Masala Dosa', description: 'Spicy red chutney spread dosa with potato masala', price: 100, category: 'Dosa', image_url: 'https://images.unsplash.com/photo-1667040014386-591a6ea6de46?w=400', is_veg: 1, is_available: 1, is_bestseller: 1, is_chefs_special: 0 },
    { id: 'd008', name: 'Podi Masala Dosa', description: 'Dosa with spicy podi masala and potato filling', price: 100, category: 'Dosa', image_url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', is_veg: 1, is_available: 1, is_bestseller: 0, is_chefs_special: 0 },
    { id: 'd009', name: 'Paneer Masala Dosa', description: 'Dosa filled with spiced paneer and potato masala', price: 110, category: 'Dosa', image_url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', is_veg: 1, is_available: 1, is_bestseller: 1, is_chefs_special: 0 },
    { id: 'd010', name: 'Cheese Masala Dosa', description: 'Masala dosa loaded with melted cheese', price: 120, category: 'Dosa', image_url: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400', is_veg: 1, is_available: 1, is_bestseller: 1, is_chefs_special: 0 },
    { id: 'd011', name: 'Schezwan Masala Dosa', description: 'Indo-Chinese twist with spicy schezwan sauce and masala', price: 120, category: 'Dosa', image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', is_veg: 1, is_available: 1, is_bestseller: 0, is_chefs_special: 0 },
    { id: 'd012', name: 'Schezwan Cheese Masala Dosa', description: 'Schezwan masala dosa with extra cheese — our premium dosa', price: 140, category: 'Dosa', image_url: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400', is_veg: 1, is_available: 1, is_bestseller: 0, is_chefs_special: 1 },
    { id: 'si001', name: 'Idli Sambhar (2 Pcs)', description: 'Steamed rice cakes served with hot sambar and coconut chutney', price: 50, category: 'South Indian', image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', is_veg: 1, is_available: 1, is_bestseller: 0, is_chefs_special: 0 },
    { id: 'si002', name: 'Masala Idli', description: 'Idlis tossed with spicy masala and served with chutney', price: 70, category: 'South Indian', image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', is_veg: 1, is_available: 1, is_bestseller: 0, is_chefs_special: 0 },
    { id: 'u001', name: 'Onion Uttapam', description: 'Soft uttapam topped with chopped onions. Made with butter.', price: 90, category: 'Uttapam', image_url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', is_veg: 1, is_available: 1, is_bestseller: 0, is_chefs_special: 0 },
    { id: 'u002', name: 'Vegetable Uttapam', description: 'Loaded with onions, tomatoes, capsicum and carrots. Made with butter.', price: 100, category: 'Uttapam', image_url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', is_veg: 1, is_available: 1, is_bestseller: 0, is_chefs_special: 0 },
    { id: 'u003', name: 'Paneer Uttapam', description: 'Soft uttapam with crumbled paneer topping. Made with butter.', price: 120, category: 'Uttapam', image_url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', is_veg: 1, is_available: 1, is_bestseller: 0, is_chefs_special: 0 },
    { id: 'u004', name: 'Cheese Uttapam', description: 'Uttapam topped with generous melted cheese. Made with butter.', price: 130, category: 'Uttapam', image_url: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400', is_veg: 1, is_available: 1, is_bestseller: 0, is_chefs_special: 0 },
  ];

  const insert = db.prepare(`
    INSERT OR IGNORE INTO menu_items (id, name, description, price, category, image_url, is_veg, is_available, is_bestseller, is_chefs_special)
    VALUES (@id, @name, @description, @price, @category, @image_url, @is_veg, @is_available, @is_bestseller, @is_chefs_special)
  `);

  const insertMany = db.transaction((rows: typeof items) => {
    for (const item of rows) {
      insert.run(item);
    }
  });

  insertMany(items);

  // Seed a welcome offer
  db.prepare(`
    INSERT OR IGNORE INTO offers (id, title, description, discount_type, discount_value, min_order, code, is_active, valid_from, valid_until)
    VALUES ('offer-welcome', '🎉 Welcome Offer!', 'Get 10% OFF on your first order above ₹200', 'percentage', 10, 200, 'WELCOME10', 1, datetime('now'), datetime('now', '+30 days'))
  `).run();
}
