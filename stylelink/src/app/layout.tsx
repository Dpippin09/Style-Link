import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://stylelink.app'),
  title: "StyleLink - Shoe Shopping & Price Comparison",
  description: "Compare shoe prices across multiple retailers and find the best deals on your favorite footwear. Save items, track prices, and never miss a deal.",
  keywords: ["shoes", "shopping", "price comparison", "deals", "footwear", "sneakers", "boots"],
  authors: [{ name: "StyleLink Team" }],
  creator: "StyleLink",
  publisher: "StyleLink",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "StyleLink",
  },
  openGraph: {
    type: "website",
    siteName: "StyleLink",
    title: "StyleLink - Shoe Shopping & Price Comparison",
    description: "Compare shoe prices across multiple retailers and find the best deals on your favorite footwear.",
    url: "https://stylelink.app",
    images: [
      {
        url: "/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "StyleLink Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StyleLink - Shoe Shopping & Price Comparison",
    description: "Compare shoe prices across multiple retailers and find the best deals on your favorite footwear.",
    images: ["/icon-512x512.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="StyleLink" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="apple-touch-icon" href="/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/icon-192x192.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
