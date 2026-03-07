import { supabase } from '@/lib/supabase';
import { Testimonial } from '@/types';

export type SiteSettings = Record<string, string>;

export interface Highlight {
  id: string;
  icon_name: string;
  title: string;
  description: string;
  sort_order: number;
}

export interface OrderChannel {
  id: string;
  name: string;
  href: string;
  description: string;
  icon_name: string;
  style: string;
  sort_order: number;
}

// Fetch all site settings as a key-value map
export async function getSiteSettings(): Promise<SiteSettings> {
  const { data, error } = await supabase
    .from('site_settings')
    .select('key, value');

  if (error) {
    console.error('Failed to fetch site settings:', error.message);
    return {};
  }

  const settings: SiteSettings = {};
  (data || []).forEach((row: { key: string; value: string }) => {
    settings[row.key] = row.value;
  });
  return settings;
}

// Fetch active testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Failed to fetch testimonials:', error.message);
    return [];
  }

  return (data || []).map((row: { id: string; name: string; rating: number; comment: string; date: string; avatar?: string }) => ({
    id: row.id,
    name: row.name,
    rating: row.rating,
    comment: row.comment,
    date: row.date,
    avatar: row.avatar || '',
  }));
}

// Fetch active highlights
export async function getHighlights(): Promise<Highlight[]> {
  const { data, error } = await supabase
    .from('highlights')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Failed to fetch highlights:', error.message);
    return [];
  }

  return data || [];
}

// Fetch active order channels
export async function getOrderChannels(): Promise<OrderChannel[]> {
  const { data, error } = await supabase
    .from('order_channels')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Failed to fetch order channels:', error.message);
    return [];
  }

  return data || [];
}
