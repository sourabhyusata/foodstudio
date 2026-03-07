import { NextRequest, NextResponse } from 'next/server';
import { menuItems } from '@/lib/menu-data';

// GET /api/menu — Return all menu items (or filter by category)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const available = searchParams.get('available');

  let items = [...menuItems];

  if (category && category !== 'All') {
    items = items.filter((item) => item.category === category);
  }

  if (available === 'true') {
    items = items.filter((item) => item.is_available);
  }

  return NextResponse.json({ items, total: items.length });
}

// POST /api/menu — Add a new menu item (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // In production, validate auth token and save to Supabase
    // const { data, error } = await supabase.from('menu_items').insert(body);

    return NextResponse.json(
      { message: 'Menu item created', item: { id: `new-${Date.now()}`, ...body } },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
