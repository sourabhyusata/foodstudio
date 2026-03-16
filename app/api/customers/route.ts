import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

// GET /api/customers — Get all customers
export async function GET(request: NextRequest) {
  const db = getDb();
  const { searchParams } = new URL(request.url);
  const subscribedOnly = searchParams.get('subscribed');

  let query = 'SELECT * FROM customers';
  if (subscribedOnly === 'true') {
    query += ' WHERE subscribed_offers = 1';
  }
  query += ' ORDER BY created_at DESC';

  const customers = db.prepare(query).all();

  return NextResponse.json({ customers });
}

// POST /api/customers — Register or subscribe a customer
export async function POST(request: NextRequest) {
  try {
    const db = getDb();
    const body = await request.json();
    const { phone, name, email, subscribe } = body;

    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    const existing = db.prepare('SELECT * FROM customers WHERE phone = ?').get(phone) as Record<string, unknown> | undefined;

    if (existing) {
      // Update subscription and details
      const updates: string[] = [];
      const params: Record<string, unknown> = { phone };

      if (name) { updates.push('name = @name'); params.name = name; }
      if (email) { updates.push('email = @email'); params.email = email; }
      if (subscribe !== undefined) { updates.push('subscribed_offers = @subscribed'); params.subscribed = subscribe ? 1 : 0; }

      if (updates.length > 0) {
        db.prepare(`UPDATE customers SET ${updates.join(', ')} WHERE phone = @phone`).run(params);
      }

      const updated = db.prepare('SELECT * FROM customers WHERE phone = ?').get(phone);
      return NextResponse.json({ message: 'Customer updated', customer: updated });
    }

    const id = crypto.randomUUID();
    db.prepare(`
      INSERT INTO customers (id, phone, name, email, subscribed_offers)
      VALUES (@id, @phone, @name, @email, @subscribed)
    `).run({
      id,
      phone,
      name: name || '',
      email: email || '',
      subscribed: subscribe ? 1 : 0,
    });

    const customer = db.prepare('SELECT * FROM customers WHERE id = ?').get(id);
    return NextResponse.json({ message: 'Customer registered', customer }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to register customer';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
