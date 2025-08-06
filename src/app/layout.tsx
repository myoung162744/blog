import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap', // Improve font loading performance
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap', // Improve font loading performance
  preload: true,
  fallback: ['Courier New', 'monospace'],
});

export const metadata: Metadata = {
  title: {
    default: "Chalk and Code",
    template: "%s | Chalk and Code"
  },
  description: "Exploring ideas about education, technology, and the future of learning.",
  keywords: ["education", "technology", "learning", "teaching", "edtech", "blog"],
  authors: [{ name: "Matthew Young" }],
  creator: "Matthew Young",
  publisher: "Chalk and Code",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://chalkandcode.com",
    siteName: "Chalk and Code",
    title: "Chalk and Code",
    description: "Exploring ideas about education, technology, and the future of learning.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Chalk and Code"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Chalk and Code",
    description: "Exploring ideas about education, technology, and the future of learning.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
