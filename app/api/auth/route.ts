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
      const { error } = await supabase.auth.signInWithOtp({
        phone: phone.startsWith('+') ? phone : `+91${phone}`,
      });

      if (error) {
        throw error;
      }

      return NextResponse.json({ message: 'OTP sent successfully' });
    }

    if (action === 'verify_otp') {
      const { otp } = body;
      if (!otp) {
        return NextResponse.json({ error: 'OTP is required' }, { status: 400 });
      }

      const { data, error } = await supabase.auth.verifyOtp({
        phone: phone.startsWith('+') ? phone : `+91${phone}`,
        token: otp,
        type: 'sms',
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        await supabase
          .from('user_profiles')
          .upsert({
            id: data.user.id,
            phone: phone,
            name: name || '',
          }, { onConflict: 'id' });
      }

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
