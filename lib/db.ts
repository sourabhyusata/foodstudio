import Database from 'better-sqlite3';
import path from 'path';
import { randomUUID } from 'crypto';

const DB_PATH = path.join(process.cwd(), 'local.db');

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!_db) {
    _db = new Database(DB_PATH);
    _db.pragma('journal_mode = WAL');
    _db.pragma('foreign_keys = ON');
    initSchema(_db);
    seedIfEmpty(_db);
  }
  return _db;
}

function initSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS menu_items (
      id TEXT PRIMARY KEY DEFAULT '',
      name TEXT NOT NULL,
      description TEXT DEFAULT '',
      price REAL NOT NULL,
      category TEXT NOT NULL,
      image_url TEXT DEFAULT '',
      is_veg INTEGER DEFAULT 1,
      is_available INTEGER DEFAULT 1,
      is_bestseller INTEGER DEFAULT 0,
      is_chefs_special INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY DEFAULT '',
      order_number TEXT UNIQUE NOT NULL,
      user_phone TEXT NOT NULL,
      customer_name TEXT DEFAULT '',
      items TEXT NOT NULL,
      subtotal REAL NOT NULL,
      tax REAL NOT NULL,
      delivery_charge REAL NOT NULL,
      total REAL NOT NULL,
      order_type TEXT NOT NULL DEFAULT 'delivery',
      delivery_address TEXT,
      status TEXT NOT NULL DEFAULT 'received',
      payment_method TEXT NOT NULL DEFAULT 'cod',
      payment_status TEXT NOT NULL DEFAULT 'pending',
      razorpay_order_id TEXT,
      razorpay_payment_id TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS user_profiles (
      id TEXT PRIMARY KEY,
      phone TEXT UNIQUE NOT NULL,
      name TEXT DEFAULT '',
      email TEXT DEFAULT '',
      addresses TEXT DEFAULT '[]',
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS admin_credentials (
      id TEXT PRIMARY KEY DEFAULT '',
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      is_active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );
  `);
}

function seedIfEmpty(db: Database.Database) {
  const count = db.prepare('SELECT COUNT(*) as c FROM menu_items').get() as { c: number };
  if (count.c > 0) return;

  const insertItem = db.prepare(`
    INSERT INTO menu_items (id, name, description, price, category, image_url, is_veg, is_available, is_bestseller, is_chefs_special)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const items = [
    ['Plain Dosa', 'Crispy golden dosa served with sambar and coconut chutney. Made with butter.', 60, 'Dosa', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', 1, 1, 0, 0],
    ['Plain Podi Masala Dosa', 'Crispy dosa with spicy podi masala — a South Indian classic', 70, 'Dosa', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', 1, 1, 0, 0],
    ['Plain Onion Dosa', 'Crispy dosa topped with golden caramelized onions', 70, 'Dosa', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', 1, 1, 0, 0],
    ['Plain Cheese Dosa', 'Crispy dosa loaded with melted cheese', 90, 'Dosa', 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400', 1, 1, 0, 0],
    ['Masala Dosa', 'Classic dosa stuffed with spiced potato filling. Made with butter.', 80, 'Dosa', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', 1, 1, 1, 0],
    ['Onion Masala Dosa', 'Masala dosa topped with crispy onions', 90, 'Dosa', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', 1, 1, 0, 0],
    ['Mysore Masala Dosa', 'Spicy red chutney spread dosa with potato masala', 100, 'Dosa', 'https://images.unsplash.com/photo-1667040014386-591a6ea6de46?w=400', 1, 1, 1, 0],
    ['Podi Masala Dosa', 'Dosa with spicy podi masala and potato filling', 100, 'Dosa', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', 1, 1, 0, 0],
    ['Paneer Masala Dosa', 'Dosa filled with spiced paneer and potato masala', 110, 'Dosa', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', 1, 1, 1, 0],
    ['Cheese Masala Dosa', 'Masala dosa loaded with melted cheese', 120, 'Dosa', 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400', 1, 1, 1, 0],
    ['Schezwan Masala Dosa', 'Indo-Chinese twist with spicy schezwan sauce and masala', 120, 'Dosa', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', 1, 1, 0, 0],
    ['Schezwan Cheese Masala Dosa', 'Schezwan masala dosa with extra cheese — our premium dosa', 140, 'Dosa', 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400', 1, 1, 0, 1],
    ['Idli Sambhar (2 Pcs)', 'Steamed rice cakes served with hot sambar and coconut chutney', 50, 'South Indian', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', 1, 1, 0, 0],
    ['Masala Idli', 'Idlis tossed with spicy masala and served with chutney', 70, 'South Indian', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', 1, 1, 0, 0],
    ['Onion Uttapam', 'Soft uttapam topped with chopped onions. Made with butter.', 90, 'Uttapam', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', 1, 1, 0, 0],
    ['Vegetable Uttapam', 'Loaded with onions, tomatoes, capsicum and carrots. Made with butter.', 100, 'Uttapam', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', 1, 1, 0, 0],
    ['Paneer Uttapam', 'Soft uttapam with crumbled paneer topping. Made with butter.', 120, 'Uttapam', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', 1, 1, 0, 0],
    ['Cheese Uttapam', 'Uttapam topped with generous melted cheese. Made with butter.', 130, 'Uttapam', 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400', 1, 1, 0, 0],
  ];

  const insertMany = db.transaction(() => {
    for (const item of items) {
      insertItem.run(randomUUID(), ...item);
    }
  });
  insertMany();

  // Seed admin credentials (password: admin123)
  const adminCount = db.prepare('SELECT COUNT(*) as c FROM admin_credentials').get() as { c: number };
  if (adminCount.c === 0) {
    db.prepare(`
      INSERT INTO admin_credentials (id, username, password_hash, is_active)
      VALUES (?, ?, ?, 1)
    `).run(
      randomUUID(),
      'admin',
      '308b9eb79dbd40596d99f4c31a8bfc8b:552a691dd31faa6f5cc517f3af05b293b4fe947b0a75aefd12f81396be73f4ce76cffce788568a6f1584675fbe14927ee63e68fd7cc0f5a5c7e3dd7c49a28fa3'
    );
  }
}

// Helper to convert SQLite row booleans (0/1) to JS booleans
function toBool(row: Record<string, unknown>): Record<string, unknown> {
  const boolFields = ['is_veg', 'is_available', 'is_bestseller', 'is_chefs_special', 'is_active'];
  const result = { ...row };
  for (const field of boolFields) {
    if (field in result) {
      result[field] = Boolean(result[field]);
    }
  }
  // Parse JSON fields
  if (typeof result.items === 'string') {
    try { result.items = JSON.parse(result.items as string); } catch { /* keep as string */ }
  }
  if (typeof result.delivery_address === 'string' && result.delivery_address) {
    try { result.delivery_address = JSON.parse(result.delivery_address as string); } catch { /* keep as string */ }
  }
  if (typeof result.addresses === 'string') {
    try { result.addresses = JSON.parse(result.addresses as string); } catch { /* keep as string */ }
  }
  return result;
}

// Query helpers that mimic the Supabase-like patterns used in API routes
export const db = {
  menuItems: {
    getAll(filters?: { category?: string; available?: boolean }) {
      const db = getDb();
      let sql = 'SELECT * FROM menu_items';
      const conditions: string[] = [];
      const params: unknown[] = [];

      if (filters?.category) {
        conditions.push('category = ?');
        params.push(filters.category);
      }
      if (filters?.available !== undefined) {
        conditions.push('is_available = ?');
        params.push(filters.available ? 1 : 0);
      }
      if (conditions.length) sql += ' WHERE ' + conditions.join(' AND ');
      sql += ' ORDER BY created_at ASC';

      const rows = db.prepare(sql).all(...params) as Record<string, unknown>[];
      return rows.map(toBool);
    },

    insert(item: Record<string, unknown>) {
      const d = getDb();
      const id = randomUUID();
      d.prepare(`
        INSERT INTO menu_items (id, name, description, price, category, image_url, is_veg, is_available, is_bestseller, is_chefs_special)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        id,
        item.name, item.description || '', item.price, item.category,
        item.image_url || '', item.is_veg ? 1 : 0, item.is_available !== false ? 1 : 0,
        item.is_bestseller ? 1 : 0, item.is_chefs_special ? 1 : 0
      );
      const row = d.prepare('SELECT * FROM menu_items WHERE id = ?').get(id) as Record<string, unknown>;
      return toBool(row);
    },

    update(id: string, updates: Record<string, unknown>) {
      const d = getDb();
      const setClauses: string[] = [];
      const params: unknown[] = [];

      for (const [key, value] of Object.entries(updates)) {
        if (['is_veg', 'is_available', 'is_bestseller', 'is_chefs_special'].includes(key)) {
          setClauses.push(`${key} = ?`);
          params.push(value ? 1 : 0);
        } else {
          setClauses.push(`${key} = ?`);
          params.push(value);
        }
      }
      setClauses.push("updated_at = datetime('now')");
      params.push(id);

      d.prepare(`UPDATE menu_items SET ${setClauses.join(', ')} WHERE id = ?`).run(...params);
      const row = d.prepare('SELECT * FROM menu_items WHERE id = ?').get(id) as Record<string, unknown>;
      return toBool(row);
    },

    delete(id: string) {
      const d = getDb();
      d.prepare('DELETE FROM menu_items WHERE id = ?').run(id);
    },
  },

  orders: {
    getAll(filters?: { phone?: string; status?: string }) {
      const d = getDb();
      let sql = 'SELECT * FROM orders';
      const conditions: string[] = [];
      const params: unknown[] = [];

      if (filters?.phone) {
        conditions.push('user_phone = ?');
        params.push(filters.phone);
      }
      if (filters?.status) {
        conditions.push('status = ?');
        params.push(filters.status);
      }
      if (conditions.length) sql += ' WHERE ' + conditions.join(' AND ');
      sql += ' ORDER BY created_at DESC';

      const rows = d.prepare(sql).all(...params) as Record<string, unknown>[];
      return rows.map(toBool);
    },

    insert(order: Record<string, unknown>) {
      const d = getDb();
      const id = randomUUID();
      d.prepare(`
        INSERT INTO orders (id, order_number, user_phone, customer_name, items, subtotal, tax, delivery_charge, total, order_type, delivery_address, status, payment_method, payment_status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        id,
        order.order_number,
        order.user_phone,
        order.customer_name || '',
        JSON.stringify(order.items),
        order.subtotal,
        order.tax,
        order.delivery_charge,
        order.total,
        order.order_type,
        order.delivery_address ? JSON.stringify(order.delivery_address) : null,
        order.status || 'received',
        order.payment_method,
        order.payment_status || 'pending'
      );
      const row = d.prepare('SELECT * FROM orders WHERE id = ?').get(id) as Record<string, unknown>;
      return toBool(row);
    },
  },

  adminCredentials: {
    getByUsername(username: string) {
      const d = getDb();
      const row = d.prepare('SELECT * FROM admin_credentials WHERE username = ?').get(username) as Record<string, unknown> | undefined;
      return row ? toBool(row) : null;
    },
  },

  userProfiles: {
    upsert(profile: { id: string; phone: string; name?: string }) {
      const d = getDb();
      d.prepare(`
        INSERT INTO user_profiles (id, phone, name) VALUES (?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET phone = excluded.phone, name = excluded.name, updated_at = datetime('now')
      `).run(profile.id, profile.phone, profile.name || '');
    },
  },
};
