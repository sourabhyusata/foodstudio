import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/site-settings — Return all settings as key-value map
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('key, value');

    if (error) throw error;

    const settings: Record<string, string> = {};
    (data || []).forEach((row: { key: string; value: string }) => {
      settings[row.key] = row.value;
    });

    return NextResponse.json(settings);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch site settings';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
