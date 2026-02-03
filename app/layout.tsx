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

const siteUrl = "https://femishculture.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Femish Culture | Sınırların ötesinde bir buluşma noktası",
    template: "%s | Femish Culture",
  },
  description:
    "Femish Culture - Sınırların ötesinde bir buluşma noktası. Dergi, kültür ve kolektif üretim.",
  keywords: [
    "femish culture",
    "femish",
    "femish culture dergi",
    "femish dergi",
    "kültür dergisi",
    "femishculture",
  ],
  authors: [{ name: "Femish Culture" }],
  creator: "Femish Culture",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Femish Culture",
    title: "Femish Culture | Sınırların ötesinde bir buluşma noktası",
    description: "Femish Culture - Sınırların ötesinde bir buluşma noktası. Dergi, kültür ve kolektif üretim.",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Femish Culture | Sınırların ötesinde bir buluşma noktası",
    description: "Femish Culture - Sınırların ötesinde bir buluşma noktası.",
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/femish-logo.png",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link rel="preload" href="/magazine-cover.jpg" as="image" />
        <link rel="preload" href="/sayfa-1.jpg" as="image" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
