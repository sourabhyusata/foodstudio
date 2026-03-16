'use client';

import { useState, useEffect } from 'react';
import { Users, Loader2, Search, Bell, BellOff } from 'lucide-react';

interface Customer {
  id: string;
  phone: string;
  name: string;
  email: string;
  subscribed_offers: number;
  created_at: string;
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const res = await fetch('/api/customers');
        const data = await res.json();
        if (data.customers) setCustomers(data.customers);
      } catch {
        // Customers unavailable
      } finally {
        setLoading(false);
      }
    }
    fetchCustomers();
  }, []);

  const filtered = customers.filter((c) => {
    const q = search.toLowerCase();
    return c.phone.includes(q) || c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
  });

  const subscribedCount = customers.filter((c) => c.subscribed_offers).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-saffron" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-saffron/10 rounded-lg flex items-center justify-center">
              <Users className="text-saffron" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-brown-dark">{customers.length}</p>
              <p className="text-xs text-gray-500">Total Customers</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-leaf-green/10 rounded-lg flex items-center justify-center">
              <Bell className="text-leaf-green" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-brown-dark">{subscribedCount}</p>
              <p className="text-xs text-gray-500">Subscribed to Offers</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <BellOff className="text-purple-500" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-brown-dark">{customers.length - subscribedCount}</p>
              <p className="text-xs text-gray-500">Not Subscribed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, phone, email..."
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-saffron text-sm"
        />
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-16 text-center">
            <Users className="mx-auto mb-3 text-gray-300" size={40} />
            <p className="text-gray-400">No customers found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left text-gray-500 bg-gray-50">
                  <th className="px-5 py-3 font-medium">Customer</th>
                  <th className="px-5 py-3 font-medium">Phone</th>
                  <th className="px-5 py-3 font-medium">Email</th>
                  <th className="px-5 py-3 font-medium">Offers</th>
                  <th className="px-5 py-3 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((customer) => (
                  <tr key={customer.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-5 py-3 font-medium text-brown-dark">
                      {customer.name || <span className="text-gray-400 italic">No name</span>}
                    </td>
                    <td className="px-5 py-3 font-mono text-sm">{customer.phone}</td>
                    <td className="px-5 py-3 text-gray-500">{customer.email || '—'}</td>
                    <td className="px-5 py-3">
                      {customer.subscribed_offers ? (
                        <span className="flex items-center gap-1 text-leaf-green text-xs font-medium">
                          <Bell size={12} /> Subscribed
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">Not subscribed</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-gray-400 text-xs">
                      {new Date(customer.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="px-5 py-3 text-sm text-gray-400 border-t border-gray-100">
          Showing {filtered.length} of {customers.length} customers
        </div>
      </div>
    </div>
  );
}
