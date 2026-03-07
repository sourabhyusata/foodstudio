import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSessionToken } from '@/lib/admin-session';

export async function middleware(request: NextRequest) {

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  const sessionSecret = process.env.ADMIN_SESSION_SECRET;
  const adminSession = request.cookies.get('admin_session')?.value;
  const hasSession = Boolean(
    sessionSecret && adminSession && await verifyAdminSessionToken(adminSession, sessionSecret)
  );
  const hasSession = Boolean(request.cookies.get('admin_session')?.value);

  if (pathname === '/admin/login') {
    if (hasSession) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    return NextResponse.next();
  }

  if (!hasSession) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
