import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword } from '@/lib/admin-auth';
import { createAdminSessionToken } from '@/lib/admin-session';
import { db } from '@/lib/db';

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

    const data = db.adminCredentials.getByUsername(username);

    if (!data || !data.is_active || !verifyPassword(password, data.password_hash as string)) {
      return NextResponse.json({ error: 'Invalid admin credentials' }, { status: 401 });
    }

    const token = await createAdminSessionToken(data.username as string, sessionSecret);

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
