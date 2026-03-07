import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, MenuItem } from '@/types';

interface CartConfig {
  taxRate: number;
  deliveryChargeDefault: number;
  freeDeliveryThreshold: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  orderType: 'delivery' | 'takeaway';
  config: CartConfig;
  configLoaded: boolean;

  // Actions
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  updateInstructions: (itemId: string, instructions: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  setOrderType: (type: 'delivery' | 'takeaway') => void;
  loadConfig: () => Promise<void>;

  // Computed
  getSubtotal: () => number;
  getTax: () => number;
  getDeliveryCharge: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      orderType: 'delivery',
      config: {
        taxRate: 0.05,
        deliveryChargeDefault: 30,
        freeDeliveryThreshold: 500,
      },
      configLoaded: false,

      loadConfig: async () => {
        if (get().configLoaded) return;
        try {
          const res = await fetch('/api/site-settings');
          if (res.ok) {
            const settings = await res.json();
            set({
              config: {
                taxRate: parseFloat(settings.tax_rate) || 0.05,
                deliveryChargeDefault: parseFloat(settings.delivery_charge_default) || 30,
                freeDeliveryThreshold: parseFloat(settings.free_delivery_threshold) || 500,
              },
              configLoaded: true,
            });
          }
        } catch (err) {
          console.error('Failed to load cart config:', err);
        }
      },

      addItem: (item: MenuItem) => {
        get().loadConfig();
        set((state) => {
          const existing = state.items.find((i) => i.item.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.item.id === item.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return { items: [...state.items, { item, quantity: 1 }] };
        });
      },

      removeItem: (itemId: string) => {
        set((state) => ({
          items: state.items.filter((i) => i.item.id !== itemId),
        }));
      },

      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.item.id === itemId ? { ...i, quantity } : i
          ),
        }));
      },

      updateInstructions: (itemId: string, instructions: string) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.item.id === itemId
              ? { ...i, special_instructions: instructions }
              : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      setCartOpen: (open: boolean) => set({ isOpen: open }),
      setOrderType: (type) => set({ orderType: type }),

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.item.price * item.quantity,
          0
        );
      },

      getTax: () => {
        const { config } = get();
        return Math.round(get().getSubtotal() * config.taxRate);
      },

      getDeliveryCharge: () => {
        const { config } = get();
        if (get().orderType === 'takeaway') return 0;
        const subtotal = get().getSubtotal();
        if (subtotal >= config.freeDeliveryThreshold) return 0;
        return config.deliveryChargeDefault;
      },

      getTotal: () => {
        return get().getSubtotal() + get().getTax() + get().getDeliveryCharge();
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'dosa-darbar-cart',
      partialize: (state) => ({
        items: state.items,
        orderType: state.orderType,
      }),
    }
  )
);
