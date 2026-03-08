import { NextRequest, NextResponse } from 'next/server';

interface OrderRecord {
  id: string;
  order_number: string;
  user_phone: string;
  customer_name: string;
  items: { name: string; quantity: number; price: number }[];
  subtotal: number;
  tax: number;
  delivery_charge: number;
  total: number;
  order_type: string;
  delivery_address: Record<string, unknown> | null;
  status: string;
  payment_method: string;
  payment_status: string;
  created_at: string;
}

// In-memory orders store (resets on server restart — suitable for demo/static site)
let inMemoryOrders: OrderRecord[] = [];

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

    const order: OrderRecord = {
      id: crypto.randomUUID(),
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
      created_at: new Date().toISOString(),
    };

    inMemoryOrders = [order, ...inMemoryOrders];

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

  let orders = [...inMemoryOrders];

  if (phone) {
    orders = orders.filter((o) => o.user_phone === phone);
  }
  if (status) {
    orders = orders.filter((o) => o.status === status);
  }

  return NextResponse.json({ orders });
}
