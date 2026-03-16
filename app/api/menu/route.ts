import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

// GET /api/menu — Return menu items from SQLite
export async function GET(request: NextRequest) {
  const db = getDb();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const available = searchParams.get('available');

  let query = 'SELECT * FROM menu_items WHERE 1=1';
  const params: Record<string, string | number> = {};

  if (category && category !== 'All') {
    query += ' AND category = @category';
    params.category = category;
  }
  if (available === 'true') {
    query += ' AND is_available = 1';
  }

  query += ' ORDER BY category, name';

  const items = db.prepare(query).all(params);

  // Map integer booleans to actual booleans for the frontend
  const mapped = (items as Record<string, unknown>[]).map((item) => ({
    ...item,
    is_veg: Boolean(item.is_veg),
    is_available: Boolean(item.is_available),
    is_bestseller: Boolean(item.is_bestseller),
    is_chefs_special: Boolean(item.is_chefs_special),
  }));

  return NextResponse.json({ items: mapped, total: mapped.length });
}

// POST /api/menu — Add a new menu item
export async function POST(request: NextRequest) {
  try {
    const db = getDb();
    const body = await request.json();
    const id = body.id || `item-${Date.now()}`;

    db.prepare(`
      INSERT INTO menu_items (id, name, description, price, category, image_url, is_veg, is_available, is_bestseller, is_chefs_special)
      VALUES (@id, @name, @description, @price, @category, @image_url, @is_veg, @is_available, @is_bestseller, @is_chefs_special)
    `).run({
      id,
      name: body.name || '',
      description: body.description || '',
      price: Number(body.price || 0),
      category: body.category || 'Dosa',
      image_url: body.image_url || '',
      is_veg: body.is_veg ? 1 : 0,
      is_available: body.is_available !== false ? 1 : 0,
      is_bestseller: body.is_bestseller ? 1 : 0,
      is_chefs_special: body.is_chefs_special ? 1 : 0,
    });

    const item = db.prepare('SELECT * FROM menu_items WHERE id = ?').get(id) as Record<string, unknown>;
    const mapped = {
      ...item,
      is_veg: Boolean(item.is_veg),
      is_available: Boolean(item.is_available),
      is_bestseller: Boolean(item.is_bestseller),
      is_chefs_special: Boolean(item.is_chefs_special),
    };

    return NextResponse.json({ message: 'Menu item created', item: mapped }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to create menu item';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

// PUT /api/menu — Update a menu item
export async function PUT(request: NextRequest) {
  try {
    const db = getDb();
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Item ID is required' }, { status: 400 });
    }

    const existing = db.prepare('SELECT * FROM menu_items WHERE id = ?').get(id) as Record<string, unknown> | undefined;
    if (!existing) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    // Build dynamic update
    const fields: string[] = [];
    const params: Record<string, unknown> = { id };

    const allowedFields = ['name', 'description', 'price', 'category', 'image_url', 'is_veg', 'is_available', 'is_bestseller', 'is_chefs_special'];

    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        if (['is_veg', 'is_available', 'is_bestseller', 'is_chefs_special'].includes(field)) {
          fields.push(`${field} = @${field}`);
          params[field] = updates[field] ? 1 : 0;
        } else {
          fields.push(`${field} = @${field}`);
          params[field] = updates[field];
        }
      }
    }

    if (fields.length > 0) {
      db.prepare(`UPDATE menu_items SET ${fields.join(', ')} WHERE id = @id`).run(params);
    }

    const item = db.prepare('SELECT * FROM menu_items WHERE id = ?').get(id) as Record<string, unknown>;
    const mapped = {
      ...item,
      is_veg: Boolean(item.is_veg),
      is_available: Boolean(item.is_available),
      is_bestseller: Boolean(item.is_bestseller),
      is_chefs_special: Boolean(item.is_chefs_special),
    };

    return NextResponse.json({ message: 'Menu item updated', item: mapped });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to update menu item';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

// DELETE /api/menu — Delete a menu item
export async function DELETE(request: NextRequest) {
  try {
    const db = getDb();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Item ID is required' }, { status: 400 });
    }

    const result = db.prepare('DELETE FROM menu_items WHERE id = ?').run(id);

    if (result.changes === 0) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Menu item deleted' });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to delete menu item';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
