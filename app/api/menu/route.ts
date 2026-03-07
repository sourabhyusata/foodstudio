import { NextRequest, NextResponse } from 'next/server';
import { supabase, createServerClient } from '@/lib/supabase';
import { menuItems as fallbackItems } from '@/lib/menu-data';

// GET /api/menu — Return all menu items from Supabase (with fallback)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const available = searchParams.get('available');

  try {
    let query = supabase
      .from('menu_items')
      .select('*')
      .order('created_at', { ascending: true });

    if (category && category !== 'All') {
      query = query.eq('category', category);
    }

    if (available === 'true') {
      query = query.eq('is_available', true);
    }

    const { data, error } = await query;

    if (error) throw error;

    if (!data || data.length === 0) {
      // Fallback to hardcoded data if DB is empty
      let items = [...fallbackItems];
      if (category && category !== 'All') {
        items = items.filter((item) => item.category === category);
      }
      if (available === 'true') {
        items = items.filter((item) => item.is_available);
      }
      return NextResponse.json({ items, total: items.length, source: 'fallback' });
    }

    return NextResponse.json({ items: data, total: data.length, source: 'database' });
  } catch {
    // Fallback to hardcoded data on any error
    let items = [...fallbackItems];
    if (category && category !== 'All') {
      items = items.filter((item) => item.category === category);
    }
    if (available === 'true') {
      items = items.filter((item) => item.is_available);
    }
    return NextResponse.json({ items, total: items.length, source: 'fallback' });
  }
}

// POST /api/menu — Add a new menu item (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const serverClient = createServerClient();

    const { data, error } = await serverClient
      .from('menu_items')
      .insert(body)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(
      { message: 'Menu item created', item: data },
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

    const serverClient = createServerClient();
    const { data, error } = await serverClient
      .from('menu_items')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ message: 'Menu item updated', item: data });
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

    const serverClient = createServerClient();
    const { error } = await serverClient
      .from('menu_items')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ message: 'Menu item deleted' });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to delete menu item';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
