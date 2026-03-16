'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  CreditCard,
  Banknote,
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  MessageSquare,
  Truck,
  Store,
  Loader2,
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { useRouter } from 'next/navigation';

type CheckoutStep = 'cart' | 'details' | 'payment' | 'confirmation';

export default function OrderPage() {
  const router = useRouter();
  const {
    items,
    updateQuantity,
    removeItem,
    updateInstructions,
    getSubtotal,
    getTax,
    getDeliveryCharge,
    getTotal,
    orderType,
    setOrderType,
    clearCart,
  } = useCartStore();

  const [step, setStep] = useState<CheckoutStep>('cart');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState({
    line1: '',
    line2: '',
    city: 'Jaipur',
    pincode: '',
    landmark: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cod'>('cod');
  const [isPlacing, setIsPlacing] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);
  const [expandedInstructions, setExpandedInstructions] = useState<string | null>(null);

  const handlePlaceOrder = async () => {
    setIsPlacing(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({
            item_id: i.item.id,
            name: i.item.name,
            quantity: i.quantity,
            price: i.item.price,
            special_instructions: i.special_instructions
          })),
          user_phone: phone,
          customer_name: name,
          order_type: orderType,
          delivery_address: orderType === 'delivery' ? address : null,
          payment_method: paymentMethod,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to place order');
      }

      setOrderData(data.order);
      setStep('confirmation');
      clearCart();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsPlacing(false);
    }
  };

  if (items.length === 0 && step !== 'confirmation') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-brown-dark mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-6 text-center">
          Looks like you haven&apos;t added anything yet. Browse our menu to find something delicious!
        </p>
        <Link
          href="/menu"
          className="bg-saffron hover:bg-saffron-dark text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  if (step === 'confirmation') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-leaf-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">✅</span>
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-3xl text-brown-dark mb-2">
            Order Confirmed!
          </h2>
          <p className="text-gray-500 mb-6">
            Your order has been placed successfully
          </p>
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <div className="text-sm text-gray-500 mb-1">Order ID</div>
            <div className="font-mono text-lg font-bold text-brown-dark mb-4">
              {orderData?.order_number || 'LOADING...'}
            </div>
            <div className="text-sm text-gray-500 mb-1">Estimated Time</div>
            <div className="font-semibold text-brown-dark">
              {orderType === 'delivery' ? '30–45 minutes' : '15–20 minutes'}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href="/menu"
              className="bg-saffron hover:bg-saffron-dark text-white py-3 rounded-lg font-medium transition-colors"
            >
              Order More
            </Link>
            <Link
              href="/"
              className="text-saffron hover:text-saffron-dark font-medium transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-white border-b border-cream-dark sticky top-16 md:top-20 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-6">
            {['cart', 'details', 'payment'].map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step === s
                      ? 'bg-saffron text-white'
                      : i < ['cart', 'details', 'payment'].indexOf(step)
                      ? 'bg-leaf-green text-white'
                      : 'bg-cream-dark text-gray-400'
                  }`}
                >
                  {i + 1}
                </div>
                <span
                  className={`text-sm font-medium hidden sm:inline ${
                    step === s ? 'text-brown-dark' : 'text-gray-400'
                  }`}
                >
                  {s === 'cart' ? 'Review Cart' : s === 'details' ? 'Details' : 'Payment'}
                </span>
                {i < 2 && <div className="w-8 h-px bg-cream-dark hidden sm:block" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {step === 'cart' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-3">
              {/* Order Type */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h3 className="font-semibold text-brown-dark mb-3">Order Type</h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => setOrderType('delivery')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 font-medium transition-colors ${
                      orderType === 'delivery'
                        ? 'border-saffron bg-saffron/5 text-saffron'
                        : 'border-cream-dark text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    <Truck size={18} />
                    Delivery
                  </button>
                  <button
                    onClick={() => setOrderType('takeaway')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 font-medium transition-colors ${
                      orderType === 'takeaway'
                        ? 'border-saffron bg-saffron/5 text-saffron'
                        : 'border-cream-dark text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    <Store size={18} />
                    Takeaway
                  </button>
                </div>
              </div>

              {items.map((cartItem) => (
                <div key={cartItem.item.id} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className={cartItem.item.is_veg ? 'veg-dot mt-1' : 'nonveg-dot mt-1'} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-medium text-brown-dark">{cartItem.item.name}</h4>
                        <button
                          onClick={() => removeItem(cartItem.item.id)}
                          className="text-gray-400 hover:text-curry-red transition-colors"
                          aria-label={`Remove ${cartItem.item.name}`}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{cartItem.item.description}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2 bg-cream rounded-lg">
                          <button
                            onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity - 1)}
                            className="p-2 hover:bg-cream-dark rounded-l-lg transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-medium w-8 text-center">{cartItem.quantity}</span>
                          <button
                            onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                            className="p-2 hover:bg-cream-dark rounded-r-lg transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <span className="font-bold text-brown-dark">
                          {formatPrice(cartItem.item.price * cartItem.quantity)}
                        </span>
                      </div>

                      {/* Special Instructions */}
                      <button
                        onClick={() =>
                          setExpandedInstructions(
                            expandedInstructions === cartItem.item.id ? null : cartItem.item.id
                          )
                        }
                        className="flex items-center gap-1 mt-2 text-sm text-gray-400 hover:text-saffron transition-colors"
                      >
                        <MessageSquare size={14} />
                        <span>
                          {cartItem.special_instructions
                            ? 'Edit instructions'
                            : 'Add special instructions'}
                        </span>
                      </button>
                      {expandedInstructions === cartItem.item.id && (
                        <textarea
                          value={cartItem.special_instructions || ''}
                          onChange={(e) =>
                            updateInstructions(cartItem.item.id, e.target.value)
                          }
                          placeholder="e.g., Extra crispy, no onions..."
                          className="w-full mt-2 p-2 text-sm border border-cream-dark rounded-lg resize-none focus:outline-none focus:border-saffron"
                          rows={2}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-5 shadow-sm sticky top-36">
                <h3 className="font-[family-name:var(--font-display)] text-xl text-brown-dark mb-4">
                  Order Summary
                </h3>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                    <span>{formatPrice(getSubtotal())}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>GST (5%)</span>
                    <span>{formatPrice(getTax())}</span>
                  </div>
                  {orderType === 'delivery' && (
                    <div className="flex justify-between text-gray-600">
                      <span>Delivery</span>
                      <span className={getDeliveryCharge() === 0 ? 'text-leaf-green font-medium' : ''}>
                        {getDeliveryCharge() === 0 ? 'FREE' : formatPrice(getDeliveryCharge())}
                      </span>
                    </div>
                  )}
                  {orderType === 'delivery' && getSubtotal() < 500 && (
                    <p className="text-xs text-saffron">
                      Add ₹{500 - getSubtotal()} more for free delivery!
                    </p>
                  )}
                </div>
                <div className="flex justify-between font-bold text-lg text-brown-dark pt-3 border-t border-cream-dark">
                  <span>Total</span>
                  <span>{formatPrice(getTotal())}</span>
                </div>
                <button
                  onClick={() => setStep('details')}
                  className="w-full mt-4 bg-saffron hover:bg-saffron-dark text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 'details' && (
          <div className="max-w-xl mx-auto">
            <button
              onClick={() => setStep('cart')}
              className="flex items-center gap-1 text-saffron mb-6 hover:text-saffron-dark transition-colors"
            >
              <ArrowLeft size={18} />
              <span>Back to cart</span>
            </button>

            <div className="bg-white rounded-xl p-6 shadow-sm space-y-5">
              <h3 className="font-[family-name:var(--font-display)] text-2xl text-brown-dark">
                Your Details
              </h3>

              <div>
                <label className="block text-sm font-medium text-brown-dark mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 border border-cream-dark rounded-lg focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brown-dark mb-1.5">
                  <Phone size={14} className="inline mr-1" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 97851 XXXXX"
                  className="w-full px-4 py-3 border border-cream-dark rounded-lg focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                />
              </div>

              {orderType === 'delivery' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-brown-dark mb-1.5">
                      <MapPin size={14} className="inline mr-1" />
                      Delivery Address
                    </label>
                    <input
                      type="text"
                      value={address.line1}
                      onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                      placeholder="House/Flat number, Street"
                      className="w-full px-4 py-3 border border-cream-dark rounded-lg focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20 mb-2"
                    />
                    <input
                      type="text"
                      value={address.line2}
                      onChange={(e) => setAddress({ ...address, line2: e.target.value })}
                      placeholder="Area / Locality"
                      className="w-full px-4 py-3 border border-cream-dark rounded-lg focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20 mb-2"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={address.pincode}
                        onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                        placeholder="Pincode"
                        className="px-4 py-3 border border-cream-dark rounded-lg focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                      />
                      <input
                        type="text"
                        value={address.landmark}
                        onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                        placeholder="Landmark"
                        className="px-4 py-3 border border-cream-dark rounded-lg focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                      />
                    </div>
                  </div>
                </>
              )}

              <button
                onClick={() => {
                  if (!name || !phone) return;
                  if (orderType === 'delivery' && !address.line1) return;
                  setStep('payment');
                }}
                disabled={!name || !phone || (orderType === 'delivery' && !address.line1)}
                className="w-full bg-saffron hover:bg-saffron-dark disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        )}

        {step === 'payment' && (
          <div className="max-w-xl mx-auto">
            <button
              onClick={() => setStep('details')}
              className="flex items-center gap-1 text-saffron mb-6 hover:text-saffron-dark transition-colors"
            >
              <ArrowLeft size={18} />
              <span>Back to details</span>
            </button>

            <div className="bg-white rounded-xl p-6 shadow-sm space-y-5">
              <h3 className="font-[family-name:var(--font-display)] text-2xl text-brown-dark">
                Payment Method
              </h3>

              <div className="space-y-3">
                <button
                  onClick={() => setPaymentMethod('cod')}
                  className={`w-full flex items-center gap-3 p-4 rounded-lg border-2 transition-colors ${
                    paymentMethod === 'cod'
                      ? 'border-saffron bg-saffron/5'
                      : 'border-cream-dark hover:border-gray-300'
                  }`}
                >
                  <Banknote
                    size={22}
                    className={paymentMethod === 'cod' ? 'text-saffron' : 'text-gray-400'}
                  />
                  <div className="text-left">
                    <div className="font-medium text-brown-dark">Cash on Delivery</div>
                    <div className="text-xs text-gray-500">Pay when your order arrives</div>
                  </div>
                </button>

                <button
                  disabled
                  title="Coming Soon"
                  className="w-full flex items-center gap-3 p-4 rounded-lg border-2 border-cream-dark opacity-50 cursor-not-allowed"
                >
                  <CreditCard size={22} className="text-gray-400" />
                  <div className="text-left">
                    <div className="font-medium text-gray-400">Pay Online (Coming Soon)</div>
                    <div className="text-xs text-gray-500">Razorpay integration in progress</div>
                  </div>
                </button>
              </div>

              {/* Order Summary */}
              <div className="bg-cream rounded-lg p-4">
                <h4 className="font-medium text-brown-dark mb-3">Order Summary</h4>
                <div className="space-y-1.5 text-sm">
                  {items.map((i) => (
                    <div key={i.item.id} className="flex justify-between text-gray-600">
                      <span>
                        {i.item.name} x{i.quantity}
                      </span>
                      <span>{formatPrice(i.item.price * i.quantity)}</span>
                    </div>
                  ))}
                  <div className="border-t border-cream-dark pt-2 mt-2">
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
                        <span>{getDeliveryCharge() === 0 ? 'FREE' : formatPrice(getDeliveryCharge())}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-brown-dark pt-1.5">
                      <span>Total</span>
                      <span>{formatPrice(getTotal())}</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isPlacing}
                className="w-full bg-saffron hover:bg-saffron-dark disabled:bg-gray-300 text-white py-3.5 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2"
              >
                {isPlacing ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Placing Order...
                  </>
                ) : (
                  `Place Order — ${formatPrice(getTotal())}`
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
