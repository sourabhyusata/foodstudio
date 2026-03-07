'use client';

import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';

export default function CartDrawer() {
  const {
    items,
    isOpen,
    setCartOpen,
    removeItem,
    updateQuantity,
    getSubtotal,
    getTax,
    getDeliveryCharge,
    getTotal,
    orderType,
    setOrderType,
  } = useCartStore();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl cart-slide-in flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-cream-dark">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-saffron" size={22} />
            <h2 className="font-[family-name:var(--font-display)] text-xl text-brown-dark">
              Your Cart
            </h2>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="p-1 hover:bg-cream rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X size={22} />
          </button>
        </div>

        {/* Order Type Toggle */}
        <div className="p-4 border-b border-cream-dark">
          <div className="flex bg-cream rounded-lg p-1">
            <button
              onClick={() => setOrderType('delivery')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                orderType === 'delivery'
                  ? 'bg-saffron text-white'
                  : 'text-brown hover:text-saffron'
              }`}
            >
              🛵 Delivery
            </button>
            <button
              onClick={() => setOrderType('takeaway')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                orderType === 'takeaway'
                  ? 'bg-saffron text-white'
                  : 'text-brown hover:text-saffron'
              }`}
            >
              🏪 Takeaway
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="font-[family-name:var(--font-display)] text-xl text-brown mb-2">
                Your cart is empty
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Add some delicious dosas to get started!
              </p>
              <Link
                href="/menu"
                onClick={() => setCartOpen(false)}
                className="bg-saffron hover:bg-saffron-dark text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
              >
                Browse Menu
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((cartItem) => (
                <div
                  key={cartItem.item.id}
                  className="bg-cream rounded-lg p-3 flex gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <div className={cartItem.item.is_veg ? 'veg-dot' : 'nonveg-dot'} />
                        <h4 className="font-medium text-sm text-brown-dark truncate">
                          {cartItem.item.name}
                        </h4>
                      </div>
                      <button
                        onClick={() => removeItem(cartItem.item.id)}
                        className="text-gray-400 hover:text-curry-red transition-colors shrink-0"
                        aria-label={`Remove ${cartItem.item.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 bg-white rounded-lg border border-cream-dark">
                        <button
                          onClick={() =>
                            updateQuantity(cartItem.item.id, cartItem.quantity - 1)
                          }
                          className="p-1.5 hover:bg-cream rounded-l-lg transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(cartItem.item.id, cartItem.quantity + 1)
                          }
                          className="p-1.5 hover:bg-cream rounded-r-lg transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="font-semibold text-sm text-brown-dark">
                        {formatPrice(cartItem.item.price * cartItem.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary & Checkout */}
        {items.length > 0 && (
          <div className="border-t border-cream-dark p-4 space-y-3">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(getSubtotal())}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>GST (5%)</span>
                <span>{formatPrice(getTax())}</span>
              </div>
              {orderType === 'delivery' && (
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span>
                    {getDeliveryCharge() === 0
                      ? 'FREE'
                      : formatPrice(getDeliveryCharge())}
                  </span>
                </div>
              )}
              <div className="flex justify-between font-bold text-brown-dark text-base pt-1.5 border-t border-cream-dark">
                <span>Total</span>
                <span>{formatPrice(getTotal())}</span>
              </div>
            </div>
            <Link
              href="/order"
              onClick={() => setCartOpen(false)}
              className="block w-full bg-saffron hover:bg-saffron-dark text-white text-center py-3 rounded-lg font-semibold transition-colors"
            >
              Proceed to Checkout — {formatPrice(getTotal())}
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
