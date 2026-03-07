import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/menu — Return all menu items from SQLite
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const available = searchParams.get('available');

  try {
    const filters: { category?: string; available?: boolean } = {};
    if (category && category !== 'All') filters.category = category;
    if (available === 'true') filters.available = true;

    const items = db.menuItems.getAll(filters);

    return NextResponse.json({ items, total: items.length, source: 'database' });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch menu';
    return NextResponse.json({ error: message, source: 'database' }, { status: 500 });
  }
}

// POST /api/menu — Add a new menu item (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const item = db.menuItems.insert(body);

    return NextResponse.json(
      { message: 'Menu item created', item },
      { status: 201 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to create menu item';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

// PUT /api/menu — Update a menu item (admin only)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Item ID is required' }, { status: 400 });
    }

    const item = db.menuItems.update(id, updates);

    return NextResponse.json({ message: 'Menu item updated', item });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to update menu item';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

// DELETE /api/menu — Delete a menu item (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Item ID is required' }, { status: 400 });
    }

    db.menuItems.delete(id);

    return NextResponse.json({ message: 'Menu item deleted' });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to delete menu item';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
