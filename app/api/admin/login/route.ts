import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { verifyPassword } from '@/lib/admin-auth';
import { createAdminSessionToken } from '@/lib/admin-session';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    const sessionSecret = process.env.ADMIN_SESSION_SECRET;
    if (!sessionSecret) {
      return NextResponse.json({ error: 'Admin session is not configured' }, { status: 500 });
    }

    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('admin_credentials')
      .select('id, username, password_hash, is_active')
      .eq('username', username)
      .single();

    if (error || !data || !data.is_active || !verifyPassword(password, data.password_hash)) {
      return NextResponse.json({ error: 'Invalid admin credentials' }, { status: 401 });
    }

    const token = await createAdminSessionToken(data.username, sessionSecret);

    const response = NextResponse.json({ message: 'Login successful' });
    response.cookies.set('admin_session', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 8,
    });

    return response;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to login';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
