import type { Metadata } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "JUSTJAPA - Waitlist",
  description: "Join the waitlist for JUSTJAPA - Your All in One Migration Companion",
  icons: {
    icon: [
      { url: '/just-japa-favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/just-japa-favicon.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/just-japa-favicon.png',
    shortcut: '/just-japa-favicon.png',
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
        className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
