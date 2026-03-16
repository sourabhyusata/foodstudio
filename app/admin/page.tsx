'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, IndianRupee, Users, Megaphone, TrendingUp, Loader2, UtensilsCrossed } from 'lucide-react';

interface Stats {
  orders_today: number;
  revenue_today: number;
  total_orders: number;
  total_customers: number;
  subscribed_customers: number;
  active_offers: number;
  menu_items: number;
  popular_items: { name: string; total_orders: number; total_revenue: number }[];
  recent_orders: {
    id: string;
    order_number: string;
    customer_name: string;
    user_phone: string;
    total: number;
    status: string;
    order_type: string;
    payment_method: string;
    created_at: string;
  }[];
  orders_by_status: { status: string; count: number }[];
}

function getStatusBadge(status: string) {
  const styles: Record<string, string> = {
    received: 'bg-blue-100 text-blue-700',
    preparing: 'bg-yellow-100 text-yellow-700',
    ready: 'bg-green-100 text-green-700',
    out_for_delivery: 'bg-purple-100 text-purple-700',
    delivered: 'bg-emerald-100 text-emerald-700',
    cancelled: 'bg-red-100 text-red-700',
  };
  const labels: Record<string, string> = {
    received: 'Received',
    preparing: 'Preparing',
    ready: 'Ready',
    out_for_delivery: 'Out for Delivery',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-700'}`}>
      {labels[status] || status}
    </span>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/admin/stats');
        const data = await res.json();
        setStats(data);
      } catch {
        // Stats unavailable
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-saffron" />
      </div>
    );
  }

  if (!stats) {
    return <div className="text-center py-20 text-gray-500">Failed to load dashboard</div>;
  }

  const statCards = [
    { label: 'Orders Today', value: stats.orders_today.toString(), icon: ShoppingCart, color: 'bg-blue-500', sub: `${stats.total_orders} total` },
    { label: 'Revenue Today', value: `₹${Math.round(stats.revenue_today).toLocaleString('en-IN')}`, icon: IndianRupee, color: 'bg-leaf-green', sub: 'from all orders' },
    { label: 'Total Customers', value: stats.total_customers.toString(), icon: Users, color: 'bg-saffron', sub: `${stats.subscribed_customers} subscribed` },
    { label: 'Menu Items', value: stats.menu_items.toString(), icon: UtensilsCrossed, color: 'bg-brown', sub: `${stats.active_offers} active offer(s)` },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-brown-dark mt-1">{stat.value}</p>
                <p className="text-xs text-gray-400 mt-1">{stat.sub}</p>
              </div>
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="text-white" size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Orders by Status */}
      {stats.orders_by_status.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="font-semibold text-brown-dark mb-4">Orders by Status</h2>
          <div className="flex flex-wrap gap-3">
            {stats.orders_by_status.map((item) => (
              <div key={item.status} className="flex items-center gap-2">
                {getStatusBadge(item.status)}
                <span className="text-sm font-bold text-brown-dark">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
          <div className="p-5 border-b border-gray-100">
            <h2 className="font-semibold text-brown-dark">Recent Orders</h2>
          </div>
          {stats.recent_orders.length === 0 ? (
            <div className="p-10 text-center text-gray-400">
              <ShoppingCart className="mx-auto mb-3 text-gray-300" size={40} />
              <p>No orders yet. They will appear here when customers start ordering.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-left text-gray-500">
                    <th className="px-5 py-3 font-medium">Order ID</th>
                    <th className="px-5 py-3 font-medium">Customer</th>
                    <th className="px-5 py-3 font-medium">Total</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recent_orders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-5 py-3 font-mono text-xs">{order.order_number}</td>
                      <td className="px-5 py-3">
                        <div className="text-brown-dark">{order.customer_name || 'Guest'}</div>
                        <div className="text-xs text-gray-400">{order.user_phone}</div>
                      </td>
                      <td className="px-5 py-3 font-medium">₹{order.total}</td>
                      <td className="px-5 py-3">{getStatusBadge(order.status)}</td>
                      <td className="px-5 py-3 text-gray-400 text-xs">
                        {new Date(order.created_at).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Popular Items */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-saffron" />
              <h2 className="font-semibold text-brown-dark">Popular Items</h2>
            </div>
          </div>
          {stats.popular_items.length === 0 ? (
            <div className="p-10 text-center text-gray-400">
              <p>No order data yet</p>
            </div>
          ) : (
            <div className="p-5 space-y-4">
              {stats.popular_items.map((item, index) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-saffron/10 rounded-full flex items-center justify-center text-xs font-bold text-saffron">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-brown-dark text-sm truncate">{item.name}</div>
                    <div className="text-xs text-gray-400">{item.total_orders} orders</div>
                  </div>
                  <div className="text-sm font-medium text-brown-dark">₹{Math.round(item.total_revenue).toLocaleString()}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h2 className="font-semibold text-brown-dark mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <a href="/admin/menu" className="flex items-center gap-2 bg-saffron/10 hover:bg-saffron/20 text-saffron px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
            <UtensilsCrossed size={16} />
            Manage Menu
          </a>
          <a href="/admin/orders" className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
            <ShoppingCart size={16} />
            View Orders
          </a>
          <a href="/admin/offers" className="flex items-center gap-2 bg-leaf-green/10 hover:bg-leaf-green/20 text-leaf-green px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
            <Megaphone size={16} />
            Manage Offers
          </a>
          <a href="/admin/customers" className="flex items-center gap-2 bg-purple-50 hover:bg-purple-100 text-purple-600 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
            <Users size={16} />
            View Customers
          </a>
        </div>
      </div>
    </div>
  );
}
