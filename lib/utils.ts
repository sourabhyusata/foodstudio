// Simple class name merger
export function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ');
}

// Format price in INR
export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}

// Calculate GST (5% for restaurants)
export function calculateGST(subtotal: number): number {
  return Math.round(subtotal * 0.05);
}

// Calculate delivery charge based on distance
export function calculateDeliveryCharge(distance?: number): number {
  if (!distance || distance <= 3) return 0; // Free within 3km
  if (distance <= 5) return 20;
  if (distance <= 8) return 35;
  if (distance <= 10) return 50;
  return -1; // Out of delivery range
}

// Generate order ID
export function generateOrderId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `DD-${timestamp}-${random}`;
}

// Format date
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// WhatsApp order link
export function generateWhatsAppLink(items: { name: string; quantity: number; price: number }[], total: number): string {
  const phone = '919XXXXXXXXXX'; // Replace with actual number
  let message = '🍽️ *New Order from Dosa Darbar Website*\n\n';
  items.forEach((item) => {
    message += `• ${item.name} x${item.quantity} — ₹${item.price * item.quantity}\n`;
  });
  message += `\n*Total: ₹${total}*`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

// Slugify for URLs
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Status badge colors
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    received: 'bg-blue-100 text-blue-800',
    preparing: 'bg-yellow-100 text-yellow-800',
    ready: 'bg-green-100 text-green-800',
    out_for_delivery: 'bg-purple-100 text-purple-800',
    delivered: 'bg-emerald-100 text-emerald-800',
    cancelled: 'bg-red-100 text-red-800',
    pending: 'bg-gray-100 text-gray-800',
    paid: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
}
