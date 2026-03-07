import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { db } from '@/lib/db';

// POST /api/auth — Handle authentication (local mock for sandbox testing)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, action, name } = body;

    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    if (action === 'send_otp') {
      // In local mode, OTP is always 123456
      return NextResponse.json({ message: 'OTP sent successfully (use 123456 for local testing)' });
    }

    if (action === 'verify_otp') {
      const { otp } = body;
      if (!otp) {
        return NextResponse.json({ error: 'OTP is required' }, { status: 400 });
      }

      // Accept any OTP in local testing mode
      if (otp !== '123456') {
        return NextResponse.json({ error: 'Invalid OTP. Use 123456 for local testing.' }, { status: 401 });
      }

      const userId = randomUUID();

      // Upsert user profile
      db.userProfiles.upsert({
        id: userId,
        phone,
        name: name || '',
      });

      return NextResponse.json({
        message: 'OTP verified',
        user: {
          id: userId,
          phone,
          name: name || '',
          verified: true,
        },
        session: { access_token: `local-token-${userId}` },
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Authentication failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
