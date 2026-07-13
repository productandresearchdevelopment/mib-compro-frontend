import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CookiesProvider } from "next-client-cookies/server";
import Script from "next/script";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistDisplay = Geist({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MIB - Partner in Innovation",
  description:
    "MIB provides end-to-end software and IoT solutions to streamline operations, improve efficiency, and drive real impact for businesses.",
};

// Root layout: sets up html/body shell shared by all routes including /cms
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${geistSans.variable} ${geistDisplay.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body>
        <CookiesProvider>{children}</CookiesProvider>

        <Script
          defer
          src="https://umami.qifess.id/script.js"
          data-website-id="46360e53-22cf-4898-9398-4853d13369f0"
        />
      </body>
    </html>
  );
}
