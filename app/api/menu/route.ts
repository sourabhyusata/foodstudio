import { NextRequest, NextResponse } from 'next/server';
import { menuItems as seedMenuItems } from '@/lib/menu-data';
import { MenuItem } from '@/types';

let inMemoryMenuItems: MenuItem[] = seedMenuItems.map((item) => ({ ...item }));

function getFilteredItems(searchParams: URLSearchParams) {
  const category = searchParams.get('category');
  const available = searchParams.get('available');

  let items = [...inMemoryMenuItems];

  if (category && category !== 'All') {
    items = items.filter((item) => item.category === category);
  }

  if (available === 'true') {
    items = items.filter((item) => item.is_available);
  }

  return items;
}

// GET /api/menu — Return menu items from local config
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const items = getFilteredItems(searchParams);

  return NextResponse.json({ items, total: items.length, source: 'config' });
}

// POST /api/menu — Add a new menu item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const item: MenuItem = {
      id: body.id || `item-${Date.now()}`,
      name: body.name || '',
      description: body.description || '',
      price: Number(body.price || 0),
      category: body.category || 'Dosa',
      image_url: body.image_url || '',
      is_veg: body.is_veg ?? true,
      is_available: body.is_available ?? true,
      is_bestseller: body.is_bestseller ?? false,
      is_chefs_special: body.is_chefs_special ?? false,
      created_at: body.created_at,
    };

    inMemoryMenuItems = [...inMemoryMenuItems, item];

    return NextResponse.json(
      { message: 'Menu item created', item, source: 'config' },
      { status: 201 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to create menu item';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

// PUT /api/menu — Update a menu item
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Item ID is required' }, { status: 400 });
    }

    let updatedItem: MenuItem | null = null;

    inMemoryMenuItems = inMemoryMenuItems.map((item) => {
      if (item.id !== id) return item;
      const mergedItem: MenuItem = { ...item, ...updates };
      updatedItem = mergedItem;
      return mergedItem;
    });

    if (!updatedItem) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Menu item updated', item: updatedItem, source: 'config' });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to update menu item';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

// DELETE /api/menu — Delete a menu item
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Item ID is required' }, { status: 400 });
    }

    const before = inMemoryMenuItems.length;
    inMemoryMenuItems = inMemoryMenuItems.filter((item) => item.id !== id);

    if (inMemoryMenuItems.length === before) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Menu item deleted', source: 'config' });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to delete menu item';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
