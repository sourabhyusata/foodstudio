import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, MenuItem } from '@/types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  orderType: 'delivery' | 'takeaway';

  // Actions
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  updateInstructions: (itemId: string, instructions: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  setOrderType: (type: 'delivery' | 'takeaway') => void;

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

      addItem: (item: MenuItem) => {
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
        return Math.round(get().getSubtotal() * 0.05);
      },

      getDeliveryCharge: () => {
        if (get().orderType === 'takeaway') return 0;
        const subtotal = get().getSubtotal();
        if (subtotal >= 500) return 0; // Free delivery above ₹500
        return 30;
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
