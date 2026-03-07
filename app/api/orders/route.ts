import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// POST /api/orders — Create a new order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { items, user_phone, customer_name, order_type, delivery_address, payment_method } = body;

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

    const order_number = `DD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const order = db.orders.insert({
      order_number,
      user_phone,
      customer_name: customer_name || '',
      items,
      subtotal,
      tax,
      delivery_charge,
      total,
      order_type,
      delivery_address: delivery_address || null,
      status: 'received',
      payment_method,
      payment_status: 'pending',
    });

    return NextResponse.json(
      { message: 'Order created', order },
      { status: 201 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to create order';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

// GET /api/orders — Fetch orders (admin or by phone)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const phone = searchParams.get('phone');
  const status = searchParams.get('status');

  try {
    const filters: { phone?: string; status?: string } = {};
    if (phone) filters.phone = phone;
    if (status) filters.status = status;

    const orders = db.orders.getAll(filters);

    return NextResponse.json({ orders });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch orders';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
