import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/testimonials — Return active testimonials
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch testimonials';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
