export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image_url: string;
  is_veg: boolean;
  is_available: boolean;
  is_bestseller: boolean;
  is_chefs_special?: boolean;
  created_at?: string;
}

export type MenuCategory =
  | 'Dosa'
  | 'Special Dosa'
  | 'Rava Dosa'
  | 'Uttapam'
  | 'South Indian'
  | 'North Indian'
  | 'Breads'
  | 'Rice & Biryani'
  | 'Chinese'
  | 'Starters'
  | 'Beverages'
  | 'Combos';

export interface CartItem {
  item: MenuItem;
  quantity: number;
  special_instructions?: string;
}

export interface Order {
  id: string;
  user_phone: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  delivery_charge: number;
  total: number;
  order_type: 'delivery' | 'takeaway';
  delivery_address?: DeliveryAddress;
  status: OrderStatus;
  payment_method: 'razorpay' | 'cod';
  payment_status: 'pending' | 'paid' | 'failed';
  razorpay_order_id?: string;
  created_at: string;
}

export interface OrderItem {
  item_id: string;
  name: string;
  quantity: number;
  price: number;
  special_instructions?: string;
}

export type OrderStatus =
  | 'received'
  | 'preparing'
  | 'ready'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface DeliveryAddress {
  label?: string;
  line1: string;
  line2?: string;
  city: string;
  pincode: string;
  landmark?: string;
  lat?: number;
  lng?: number;
}

export interface User {
  id: string;
  phone: string;
  name?: string;
  email?: string;
  addresses: DeliveryAddress[];
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}
