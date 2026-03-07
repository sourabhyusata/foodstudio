import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/highlights — Return active highlights
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('highlights')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch highlights';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
