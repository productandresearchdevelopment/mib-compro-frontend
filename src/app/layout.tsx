import type React from "react";
import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CookiesProvider } from "next-client-cookies/server";
import Script from "next/script";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
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
    <html className={`${plusJakarta.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
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
