import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: "Dosa Darbar — Jaipur's Favorite Dosa Destination",
  description:
    "Authentic South Indian restaurant on Ajmer Highway, Jaipur. 30+ dosa varieties, uttapams, idlis, and more. Order online for delivery or takeaway.",
  keywords: [
    "dosa",
    "south indian food",
    "jaipur",
    "ajmer highway",
    "restaurant",
    "online order",
    "masala dosa",
    "dosa darbar",
  ],
  openGraph: {
    title: "Dosa Darbar — Jaipur's Favorite Dosa Destination",
    description:
      "Authentic South Indian restaurant on Ajmer Highway, Jaipur. 30+ dosa varieties, uttapams, idlis, and more.",
    url: "https://dosadarbar.in",
    siteName: "Dosa Darbar",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=1200",
        width: 1200,
        height: 630,
        alt: "Dosa Darbar — Delicious South Indian Food",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dosa Darbar — Jaipur's Favorite Dosa Destination",
    description: "30+ dosa varieties. Order online for delivery or takeaway.",
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Dosa Darbar",
              image:
                "https://images.unsplash.com/photo-1630383249896-424e482df921?w=1200",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Ajmer Highway",
                addressLocality: "Jaipur",
                addressRegion: "Rajasthan",
                postalCode: "302001",
                addressCountry: "IN",
              },
              servesCuisine: ["South Indian", "North Indian", "Chinese"],
              priceRange: "₹₹",
              openingHours: "Mo-Su 08:00-23:00",
              telephone: "+91-9876543210",
              url: "https://dosadarbar.in",
              menu: "https://dosadarbar.in/menu",
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <CartDrawer />
        <Footer />
      </body>
    </html>
  );
}
