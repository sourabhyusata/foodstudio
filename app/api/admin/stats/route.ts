import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

// GET /api/admin/stats — Dashboard statistics
export async function GET() {
  try {
    const db = getDb();

    // Today's date range
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString();

    // Orders today
    const ordersToday = db.prepare("SELECT COUNT(*) as count, COALESCE(SUM(total), 0) as revenue FROM orders WHERE created_at >= ?").get(todayStr) as { count: number; revenue: number };

    // Total orders all time
    const totalOrders = db.prepare("SELECT COUNT(*) as count FROM orders").get() as { count: number };

    // Total customers
    const totalCustomers = db.prepare("SELECT COUNT(*) as count FROM customers").get() as { count: number };

    // Subscribed customers
    const subscribedCustomers = db.prepare("SELECT COUNT(*) as count FROM customers WHERE subscribed_offers = 1").get() as { count: number };

    // Active offers
    const activeOffers = db.prepare("SELECT COUNT(*) as count FROM offers WHERE is_active = 1").get() as { count: number };

    // Popular items (top 5 by order count)
    const popularItems = db.prepare(`
      SELECT oi.name, SUM(oi.quantity) as total_orders, SUM(oi.price * oi.quantity) as total_revenue
      FROM order_items oi
      JOIN orders o ON oi.order_id = o.id
      GROUP BY oi.name
      ORDER BY total_orders DESC
      LIMIT 5
    `).all();

    // Recent orders (last 10)
    const recentOrders = db.prepare(`
      SELECT id, order_number, customer_name, user_phone, total, status, order_type, payment_method, payment_status, created_at
      FROM orders
      ORDER BY created_at DESC
      LIMIT 10
    `).all();

    // Orders by status
    const ordersByStatus = db.prepare(`
      SELECT status, COUNT(*) as count FROM orders GROUP BY status
    `).all();

    // Menu item count
    const menuCount = db.prepare("SELECT COUNT(*) as count FROM menu_items").get() as { count: number };

    return NextResponse.json({
      orders_today: ordersToday.count,
      revenue_today: ordersToday.revenue,
      total_orders: totalOrders.count,
      total_customers: totalCustomers.count,
      subscribed_customers: subscribedCustomers.count,
      active_offers: activeOffers.count,
      menu_items: menuCount.count,
      popular_items: popularItems,
      recent_orders: recentOrders,
      orders_by_status: ordersByStatus,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch stats';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
