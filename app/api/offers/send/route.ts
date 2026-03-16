import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

// POST /api/offers/send — Send an offer notification to all subscribed customers
export async function POST(request: NextRequest) {
  try {
    const db = getDb();
    const body = await request.json();
    const { offer_id, message } = body;

    if (!offer_id || !message) {
      return NextResponse.json({ error: 'offer_id and message are required' }, { status: 400 });
    }

    // Get all subscribed customers
    const subscribers = db.prepare('SELECT id, phone, name FROM customers WHERE subscribed_offers = 1').all() as { id: string; phone: string; name: string }[];

    if (subscribers.length === 0) {
      return NextResponse.json({ message: 'No subscribers found', sent_count: 0 });
    }

    // Create notification records
    const insertNotification = db.prepare(`
      INSERT INTO notifications (id, offer_id, customer_id, message)
      VALUES (@id, @offer_id, @customer_id, @message)
    `);

    const sendAll = db.transaction(() => {
      for (const subscriber of subscribers) {
        insertNotification.run({
          id: crypto.randomUUID(),
          offer_id,
          customer_id: subscriber.id,
          message,
        });
      }
    });

    sendAll();

    return NextResponse.json({
      message: `Offer alert sent to ${subscribers.length} customer(s)`,
      sent_count: subscribers.length,
      subscribers: subscribers.map((s) => ({ phone: s.phone, name: s.name })),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Failed to send offer alerts';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
