import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

// POST /api/orders — Create a new order
export async function POST(request: NextRequest) {
  try {
    const db = getDb();
    const body = await request.json();
    const { items, user_phone, customer_name, order_type, delivery_address, payment_method } = body;

    if (!items || !user_phone || !order_type || !payment_method) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Calculate totals
    const subtotal = items.reduce(
      (sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity,
      0
    );
    const tax = Math.round(subtotal * 0.05);
    const delivery_charge = order_type === 'takeaway' ? 0 : subtotal >= 500 ? 0 : 30;
    const total = subtotal + tax + delivery_charge;

    const order_id = crypto.randomUUID();
    const order_number = `DD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // Upsert customer
    let customer_id: string | null = null;
    const existingCustomer = db.prepare('SELECT id FROM customers WHERE phone = ?').get(user_phone) as { id: string } | undefined;
    if (existingCustomer) {
      customer_id = existingCustomer.id;
      if (customer_name) {
        db.prepare('UPDATE customers SET name = ? WHERE id = ?').run(customer_name, customer_id);
      }
    } else {
      customer_id = crypto.randomUUID();
      db.prepare('INSERT INTO customers (id, phone, name) VALUES (?, ?, ?)').run(customer_id, user_phone, customer_name || '');
    }

    // Insert order
    db.prepare(`
      INSERT INTO orders (id, order_number, customer_id, customer_name, user_phone, subtotal, tax, delivery_charge, total, order_type, delivery_address, status, payment_method, payment_status)
      VALUES (@id, @order_number, @customer_id, @customer_name, @user_phone, @subtotal, @tax, @delivery_charge, @total, @order_type, @delivery_address, 'received', @payment_method, 'pending')
    `).run({
      id: order_id,
      order_number,
      customer_id,
      customer_name: customer_name || '',
      user_phone,
      subtotal,
      tax,
      delivery_charge,
      total,
      order_type,
      delivery_address: delivery_address ? JSON.stringify(delivery_address) : '',
      payment_method,
    });

    // Insert order items
    const insertItem = db.prepare(`
      INSERT INTO order_items (order_id, item_id, name, quantity, price, special_instructions)
      VALUES (@order_id, @item_id, @name, @quantity, @price, @special_instructions)
    `);

    for (const item of items) {
      insertItem.run({
        order_id,
        item_id: item.item_id || '',
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        special_instructions: item.special_instructions || '',
      });
    }

    return NextResponse.json({
      message: 'Order created',
      order: {
        id: order_id,
        order_number,
        customer_name: customer_name || '',
        user_phone,
        items,
        subtotal,
        tax,
        delivery_charge,
        total,
        order_type,
        status: 'received',
        payment_method,
        payment_status: 'pending',
        created_at: new Date().toISOString(),
      },
    }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to create order';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// GET /api/orders — Fetch orders
export async function GET(request: NextRequest) {
  const db = getDb();
  const { searchParams } = new URL(request.url);
  const phone = searchParams.get('phone');
  const status = searchParams.get('status');

  let query = 'SELECT * FROM orders WHERE 1=1';
  const params: Record<string, string> = {};

  if (phone) {
    query += ' AND user_phone = @phone';
    params.phone = phone;
  }
  if (status) {
    query += ' AND status = @status';
    params.status = status;
  }

  query += ' ORDER BY created_at DESC';

  const orders = db.prepare(query).all(params) as Record<string, unknown>[];

  // Attach items to each order
  const getItems = db.prepare('SELECT * FROM order_items WHERE order_id = ?');
  const enrichedOrders = orders.map((order) => ({
    ...order,
    items: getItems.all(order.id as string),
  }));

  return NextResponse.json({ orders: enrichedOrders });
}

// PUT /api/orders — Update order status
export async function PUT(request: NextRequest) {
  try {
    const db = getDb();
    const body = await request.json();
    const { id, status, payment_status } = body;

    if (!id) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const fields: string[] = [];
    const params: Record<string, unknown> = { id };

    if (status) {
      fields.push('status = @status');
      params.status = status;
    }
    if (payment_status) {
      fields.push('payment_status = @payment_status');
      params.payment_status = payment_status;
    }

    if (fields.length === 0) {
      return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });
    }

    const result = db.prepare(`UPDATE orders SET ${fields.join(', ')} WHERE id = @id`).run(params);

    if (result.changes === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(id);
    return NextResponse.json({ message: 'Order updated', order });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to update order';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
