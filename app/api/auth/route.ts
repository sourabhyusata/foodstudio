import { NextRequest, NextResponse } from 'next/server';

// POST /api/auth — Handle authentication (simplified — no database)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, action, name } = body;

    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    if (action === 'send_otp') {
      // In production, integrate with an SMS provider here.
      return NextResponse.json({ message: 'OTP sent successfully' });
    }

    if (action === 'verify_otp') {
      const { otp } = body;
      if (!otp) {
        return NextResponse.json({ error: 'OTP is required' }, { status: 400 });
      }

      if (otp.length < 4) {
        return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
      }

      const userId = crypto.randomUUID();

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
