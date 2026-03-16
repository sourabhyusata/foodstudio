import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

// GET /api/offers — Get all active offers (public) or all offers (admin)
export async function GET(request: NextRequest) {
  const db = getDb();
  const { searchParams } = new URL(request.url);
  const all = searchParams.get('all');

  let query = 'SELECT * FROM offers';
  if (all !== 'true') {
    query += " WHERE is_active = 1 AND (valid_until IS NULL OR valid_until > datetime('now'))";
  }
  query += ' ORDER BY created_at DESC';

  const offers = db.prepare(query).all();

  return NextResponse.json({ offers });
}

// POST /api/offers — Create a new offer
export async function POST(request: NextRequest) {
  try {
    const db = getDb();
    const body = await request.json();

    const id = `offer-${Date.now()}`;

    db.prepare(`
      INSERT INTO offers (id, title, description, discount_type, discount_value, min_order, code, is_active, valid_from, valid_until)
      VALUES (@id, @title, @description, @discount_type, @discount_value, @min_order, @code, @is_active, @valid_from, @valid_until)
    `).run({
      id,
      title: body.title || '',
      description: body.description || '',
      discount_type: body.discount_type || 'percentage',
      discount_value: Number(body.discount_value || 0),
      min_order: Number(body.min_order || 0),
      code: body.code || null,
      is_active: body.is_active !== false ? 1 : 0,
      valid_from: body.valid_from || new Date().toISOString(),
      valid_until: body.valid_until || null,
    });

    const offer = db.prepare('SELECT * FROM offers WHERE id = ?').get(id);
    return NextResponse.json({ message: 'Offer created', offer }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to create offer';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

// PUT /api/offers — Update an offer
export async function PUT(request: NextRequest) {
  try {
    const db = getDb();
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Offer ID is required' }, { status: 400 });
    }

    const fields: string[] = [];
    const params: Record<string, unknown> = { id };

    const allowedFields = ['title', 'description', 'discount_type', 'discount_value', 'min_order', 'code', 'is_active', 'valid_from', 'valid_until'];

    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        if (field === 'is_active') {
          fields.push(`${field} = @${field}`);
          params[field] = updates[field] ? 1 : 0;
        } else {
          fields.push(`${field} = @${field}`);
          params[field] = updates[field];
        }
      }
    }

    if (fields.length > 0) {
      db.prepare(`UPDATE offers SET ${fields.join(', ')} WHERE id = @id`).run(params);
    }

    const offer = db.prepare('SELECT * FROM offers WHERE id = ?').get(id);
    return NextResponse.json({ message: 'Offer updated', offer });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to update offer';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

// DELETE /api/offers — Delete an offer
export async function DELETE(request: NextRequest) {
  try {
    const db = getDb();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Offer ID is required' }, { status: 400 });
    }

    // Delete related notifications first
    db.prepare('DELETE FROM notifications WHERE offer_id = ?').run(id);
    const result = db.prepare('DELETE FROM offers WHERE id = ?').run(id);

    if (result.changes === 0) {
      return NextResponse.json({ error: 'Offer not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Offer deleted' });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to delete offer';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
