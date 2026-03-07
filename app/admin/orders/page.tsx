'use client';

import { useState } from 'react';
import { Eye, ChevronDown } from 'lucide-react';

const mockOrders = [
  {
    id: 'DD-ABC123',
    user_phone: '+91 98765 43210',
    customer_name: 'Rahul Sharma',
    items: [
      { name: 'Masala Dosa', quantity: 2, price: 80 },
      { name: 'Filter Coffee', quantity: 2, price: 30 },
    ],
    subtotal: 220,
    tax: 11,
    delivery_charge: 0,
    total: 231,
    order_type: 'delivery' as const,
    status: 'preparing',
    payment_method: 'razorpay',
    payment_status: 'paid',
    created_at: '2026-03-07T10:30:00',
  },
  {
    id: 'DD-DEF456',
    user_phone: '+91 87654 32109',
    customer_name: 'Priya Gupta',
    items: [
      { name: 'Cheese Burst Dosa', quantity: 1, price: 180 },
      { name: 'Sweet Lassi', quantity: 1, price: 50 },
    ],
    subtotal: 230,
    tax: 12,
    delivery_charge: 30,
    total: 272,
    order_type: 'delivery' as const,
    status: 'received',
    payment_method: 'cod',
    payment_status: 'pending',
    created_at: '2026-03-07T10:45:00',
  },
  {
    id: 'DD-GHI789',
    user_phone: '+91 76543 21098',
    customer_name: 'Amit Jain',
    items: [
      { name: 'South Indian Thali', quantity: 2, price: 150 },
      { name: 'Paneer Butter Masala', quantity: 1, price: 190 },
      { name: 'Butter Naan', quantity: 3, price: 40 },
    ],
    subtotal: 610,
    tax: 31,
    delivery_charge: 0,
    total: 641,
    order_type: 'takeaway' as const,
    status: 'ready',
    payment_method: 'razorpay',
    payment_status: 'paid',
    created_at: '2026-03-07T09:15:00',
  },
];

const statusOptions = ['received', 'preparing', 'ready', 'out_for_delivery', 'delivered'];

function getStatusBadge(status: string) {
  const styles: Record<string, string> = {
    received: 'bg-blue-100 text-blue-700',
    preparing: 'bg-yellow-100 text-yellow-700',
    ready: 'bg-green-100 text-green-700',
    out_for_delivery: 'bg-purple-100 text-purple-700',
    delivered: 'bg-emerald-100 text-emerald-700',
  };
  const labels: Record<string, string> = {
    received: 'Received',
    preparing: 'Preparing',
    ready: 'Ready',
    out_for_delivery: 'Out for Delivery',
    delivered: 'Delivered',
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = statusFilter === 'all'
    ? orders
    : orders.filter((o) => o.status === statusFilter);

  const updateStatus = (orderId: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <div className="space-y-6">
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
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-sm font-bold text-brown-dark">{order.id}</span>
                    {getStatusBadge(order.status)}
                  </div>
                  <p className="text-sm text-gray-500">
                    {order.customer_name} • {order.user_phone}
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
    </div>
  );
}
