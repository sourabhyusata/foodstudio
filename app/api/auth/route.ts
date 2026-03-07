import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

// POST /api/auth — Handle authentication
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, action, otp, name } = body;

    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    const supabase = createServerClient();

    if (action === 'send_otp') {
      // Use Supabase Auth to send OTP via phone
      const { error } = await supabase.auth.signInWithOtp({
        phone: phone.startsWith('+') ? phone : `+91${phone}`,
      });

      if (error) {
        // If Supabase phone auth isn't configured, use mock for dev
        if (error.message.includes('not enabled') || error.message.includes('not supported')) {
          return NextResponse.json({
            message: 'OTP sent successfully (dev mode)',
            dev_mode: true,
          });
        }
        throw error;
      }

      return NextResponse.json({ message: 'OTP sent successfully' });
    }

    if (action === 'verify_otp') {
      if (!otp) {
        return NextResponse.json({ error: 'OTP is required' }, { status: 400 });
      }

      const { data, error } = await supabase.auth.verifyOtp({
        phone: phone.startsWith('+') ? phone : `+91${phone}`,
        token: otp,
        type: 'sms',
      });

      if (error) {
        // Dev mode fallback: accept any 6-digit OTP
        if (error.message.includes('not enabled') || error.message.includes('not supported')) {
          if (otp.length === 6) {
            return NextResponse.json({
              message: 'OTP verified (dev mode)',
              user: { phone, name: name || '', verified: true },
              dev_mode: true,
            });
          }
          return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
        }
        throw error;
      }

      // Create or update user profile
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
          id: data.user?.id,
          phone,
          name: name || '',
          verified: true,
        },
        session: data.session,
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Authentication failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
