'use client';

import { ShoppingCart, IndianRupee, TrendingUp, Clock } from 'lucide-react';

// Mock data for dashboard
const stats = [
  { label: 'Orders Today', value: '23', change: '+12%', icon: ShoppingCart, color: 'bg-blue-500' },
  { label: 'Revenue Today', value: '₹8,450', change: '+8%', icon: IndianRupee, color: 'bg-leaf-green' },
  { label: 'Popular Item', value: 'Masala Dosa', change: '32 orders', icon: TrendingUp, color: 'bg-saffron' },
  { label: 'Avg. Prep Time', value: '12 min', change: '-2 min', icon: Clock, color: 'bg-purple-500' },
];

const recentOrders = [
  { id: 'DD-ABC123', customer: 'Rahul S.', items: 3, total: 320, status: 'preparing', time: '5 min ago' },
  { id: 'DD-DEF456', customer: 'Priya G.', items: 2, total: 180, status: 'received', time: '8 min ago' },
  { id: 'DD-GHI789', customer: 'Amit J.', items: 5, total: 650, status: 'ready', time: '15 min ago' },
  { id: 'DD-JKL012', customer: 'Sneha P.', items: 1, total: 120, status: 'out_for_delivery', time: '22 min ago' },
  { id: 'DD-MNO345', customer: 'Vikram S.', items: 4, total: 450, status: 'delivered', time: '35 min ago' },
];

const popularItems = [
  { name: 'Masala Dosa', orders: 32, revenue: 2560 },
  { name: 'Cheese Dosa', orders: 24, revenue: 2880 },
  { name: 'Mysore Masala Dosa', orders: 20, revenue: 2000 },
  { name: 'Filter Coffee', orders: 45, revenue: 1350 },
  { name: 'South Indian Thali', orders: 15, revenue: 2250 },
];

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
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-700'}`}>
      {labels[status] || status}
    </span>
  );
}

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-brown-dark mt-1">{stat.value}</p>
                <p className="text-xs text-leaf-green mt-1">{stat.change}</p>
              </div>
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="text-white" size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
          <div className="p-5 border-b border-gray-100">
            <h2 className="font-semibold text-brown-dark">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left text-gray-500">
                  <th className="px-5 py-3 font-medium">Order ID</th>
                  <th className="px-5 py-3 font-medium">Customer</th>
                  <th className="px-5 py-3 font-medium">Items</th>
                  <th className="px-5 py-3 font-medium">Total</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-5 py-3 font-mono text-xs">{order.id}</td>
                    <td className="px-5 py-3">{order.customer}</td>
                    <td className="px-5 py-3">{order.items}</td>
                    <td className="px-5 py-3 font-medium">₹{order.total}</td>
                    <td className="px-5 py-3">{getStatusBadge(order.status)}</td>
                    <td className="px-5 py-3 text-gray-400">{order.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Popular Items */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-5 border-b border-gray-100">
            <h2 className="font-semibold text-brown-dark">Popular Items Today</h2>
          </div>
          <div className="p-5 space-y-4">
            {popularItems.map((item, index) => (
              <div key={item.name} className="flex items-center gap-3">
                <div className="w-7 h-7 bg-saffron/10 rounded-full flex items-center justify-center text-xs font-bold text-saffron">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-brown-dark text-sm truncate">{item.name}</div>
                  <div className="text-xs text-gray-400">{item.orders} orders</div>
                </div>
                <div className="text-sm font-medium text-brown-dark">₹{item.revenue.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
