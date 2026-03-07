import { NextRequest, NextResponse } from 'next/server';

// POST /api/orders — Create a new order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { items, user_phone, order_type, delivery_address, payment_method } = body;

    if (!items || !user_phone || !order_type || !payment_method) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Calculate totals
    const subtotal = items.reduce(
      (sum: number, item: { price: number; quantity: number }) =>
        sum + item.price * item.quantity,
      0
    );
    const tax = Math.round(subtotal * 0.05);
    const delivery_charge =
      order_type === 'takeaway' ? 0 : subtotal >= 500 ? 0 : 30;
    const total = subtotal + tax + delivery_charge;

    const order = {
      id: `DD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      user_phone,
      items,
      subtotal,
      tax,
      delivery_charge,
      total,
      order_type,
      delivery_address: delivery_address || null,
      status: 'received',
      payment_method,
      payment_status: payment_method === 'cod' ? 'pending' : 'pending',
      created_at: new Date().toISOString(),
    };

    // In production: save to Supabase
    // const { data, error } = await supabase.from('orders').insert(order);

    // If Razorpay, create Razorpay order
    if (payment_method === 'razorpay') {
      // In production:
      // const razorpay = new Razorpay({ key_id, key_secret });
      // const razorpayOrder = await razorpay.orders.create({
      //   amount: total * 100,
      //   currency: 'INR',
      //   receipt: order.id,
      // });
      // order.razorpay_order_id = razorpayOrder.id;
    }

    return NextResponse.json(
      { message: 'Order created', order },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

// GET /api/orders — Fetch orders (admin or by phone)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const phone = searchParams.get('phone');
  const status = searchParams.get('status');

  // In production: fetch from Supabase with filters
  // let query = supabase.from('orders').select('*');
  // if (phone) query = query.eq('user_phone', phone);
  // if (status) query = query.eq('status', status);
  // const { data, error } = await query.order('created_at', { ascending: false });

  return NextResponse.json({
    orders: [],
    message: 'Connect Supabase to fetch real orders',
  });
}
