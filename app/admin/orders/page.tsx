'use client';

import { useState, useEffect } from 'react';
import { Eye, Loader2, RefreshCw } from 'lucide-react';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  special_instructions?: string;
}

interface Order {
  id: string;
  order_number: string;
  user_phone: string;
  customer_name: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  delivery_charge: number;
  total: number;
  order_type: string;
  status: string;
  payment_method: string;
  payment_status: string;
  created_at: string;
}

const statusOptions = ['received', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled'];

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
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-700'}`}>
      {labels[status] || status}
    </span>
  );
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  async function fetchOrders() {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.orders) setOrders(data.orders);
    } catch {
      // Orders unavailable
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchOrders();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  const filteredOrders = statusFilter === 'all'
    ? orders
    : orders.filter((o) => o.status === statusFilter);

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      await fetch('/api/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId, status: newStatus }),
      });
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch {
      alert('Failed to update order status');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-saffron" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{orders.length} total order(s)</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setStatusFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            statusFilter === 'all' ? 'bg-saffron text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          All ({orders.length})
        </button>
        {statusOptions.map((status) => {
          const count = orders.filter((o) => o.status === status).length;
          if (count === 0) return null;
          return (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                statusFilter === status ? 'bg-saffron text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {status.replace('_', ' ')} ({count})
            </button>
          );
        })}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-16 text-center">
          <p className="text-gray-400 text-lg">No orders found</p>
          <p className="text-gray-300 text-sm mt-1">Orders will appear here when customers place them</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-sm font-bold text-brown-dark">{order.order_number}</span>
                      {getStatusBadge(order.status)}
                    </div>
                    <p className="text-sm text-gray-500">
                      {order.customer_name || 'Guest'} • {order.user_phone}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(order.created_at).toLocaleString('en-IN')} • {order.order_type} •{' '}
                      {order.payment_method === 'razorpay' ? 'Paid Online' : 'COD'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-brown-dark">₹{order.total}</span>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-saffron"
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>
                        {s.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                    className="p-2 text-gray-400 hover:text-saffron transition-colors"
                    aria-label="View order details"
                  >
                    <Eye size={18} />
                  </button>
                </div>
              </div>

              {selectedOrder === order.id && (
                <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                  <h4 className="text-sm font-medium text-brown-dark mb-2">Order Items</h4>
                  <div className="space-y-1.5">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.name} × {item.quantity}
                          {item.special_instructions && (
                            <span className="text-xs text-gray-400 block">Note: {item.special_instructions}</span>
                          )}
                        </span>
                        <span className="text-gray-600">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                    <div className="border-t border-gray-100 pt-2 mt-2 space-y-1">
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Subtotal</span>
                        <span>₹{order.subtotal}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>GST</span>
                        <span>₹{order.tax}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Delivery</span>
                        <span>{order.delivery_charge === 0 ? 'FREE' : `₹${order.delivery_charge}`}</span>
                      </div>
                      <div className="flex justify-between font-bold text-brown-dark">
                        <span>Total</span>
                        <span>₹{order.total}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
