import { ExternalLink, MessageCircle, Bike, ShoppingBag } from 'lucide-react';

const orderChannels = [
  {
    name: 'WhatsApp',
    href: 'https://wa.me/919785132125?text=Hi%20Dosa%20Darbar!%20I%20want%20to%20place%20an%20order.',
    description: 'Chat directly with us and place your order instantly.',
    icon: MessageCircle,
    style: 'bg-leaf-green hover:bg-leaf-dark',
  },
  {
    name: 'Zomato',
    href: 'https://www.zomato.com/jaipur/dosa-darbar-1-ajmer-highway',
    description: 'Order through Zomato for quick doorstep delivery.',
    icon: ShoppingBag,
    style: 'bg-curry-red hover:bg-red-700',
  },
  {
    name: 'Swiggy',
    href: 'https://www.swiggy.com/city/jaipur/dosa-darbar-vaishali-nagar-rest1103230?utm_source=GooglePlaceOrder&utm_campaign=GoogleMap&is_retargeting=true&media_source=GooglePlaceOrder',
    description: 'Order your favorites directly on Swiggy.',
    icon: Bike,
    style: 'bg-saffron hover:bg-saffron-dark',
  },
];

export default function OrderPage() {
  return (
    <div className="min-h-[80vh] bg-cream py-16 px-4">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="font-[family-name:var(--font-display)] text-4xl text-brown-dark mb-3">Order Dosa Darbar Online</h1>
        <p className="text-gray-600">Choose any platform below to place your order.</p>
      </div>

      <div className="max-w-3xl mx-auto grid gap-4">
        {orderChannels.map((channel) => (
          <a
            key={channel.name}
            href={channel.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${channel.style} text-white rounded-2xl p-6 text-left transition-colors`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <channel.icon size={22} />
                  <h2 className="text-2xl font-semibold">{channel.name}</h2>
                </div>
                <p className="text-white/90">{channel.description}</p>
              </div>
              <ExternalLink size={20} className="shrink-0" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
