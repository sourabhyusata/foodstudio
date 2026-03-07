import { NextRequest, NextResponse } from 'next/server';

// POST /api/auth — Send OTP (placeholder)
export async function POST(request: NextRequest) {
  try {
    const { phone, action } = await request.json();

    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    if (action === 'send_otp') {
      // In production: Use Supabase Auth
      // const { data, error } = await supabase.auth.signInWithOtp({ phone });
      return NextResponse.json({
        message: 'OTP sent successfully',
        // In dev mode, we skip actual OTP
      });
    }

    if (action === 'verify_otp') {
      const { otp } = await request.json();
      // In production:
      // const { data, error } = await supabase.auth.verifyOtp({ phone, token: otp, type: 'sms' });
      return NextResponse.json({
        message: 'OTP verified',
        user: { phone, verified: true },
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
