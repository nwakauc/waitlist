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
  title: "JUSTJAPA - How to Japa | Migration Platform for Visa, Relocation & Travel Abroad",
  description: "The smarter way to japa from Nigeria. Join 1000+ users on JUSTJAPA - your all-in-one migration platform for visa assistance, relocation services, and moving abroad safely.",
  keywords: [
    "japa",
    "how to japa",
    "japa from nigeria",
    "migration platform",
    "visa assistance",
    "relocate abroad",
    "travel overseas",
    "move to canada",
    "move to uk",
    "move to usa",
    "emigration from nigeria",
    "relocation services",
    "overseas migration",
    "study abroad",
    "work abroad",
    "justjapa"
  ],
  authors: [{ name: "JUSTJAPA Team" }],
  creator: "JUSTJAPA",
  publisher: "JUSTJAPA",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://justjapa.com',
    title: 'JUSTJAPA - How to Japa | #1 Migration Platform for Nigerians',
    description: 'The smarter way to japa from Nigeria. Join 1000+ users planning their relocation with verified agents, visa assistance, and migration support.',
    siteName: 'JUSTJAPA',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'JUSTJAPA - Migration Platform for Nigerians',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JUSTJAPA - How to Japa | Migration Platform',
    description: 'The smarter way to japa from Nigeria. Join 1000+ users planning their relocation abroad.',
    images: ['/twitter-image.jpg'],
    creator: '@justjapa',
  },
  alternates: {
    canonical: 'https://justjapa.com',
  },
  category: 'Migration Services',
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
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "JUSTJAPA",
    "description": "The smarter way to japa from Nigeria. Your all-in-one migration platform for visa assistance, relocation services, and moving abroad safely.",
    "url": "https://justjapa.com",
    "logo": "https://justjapa.com/logo.png",
    "sameAs": [
      "https://twitter.com/justjapa",
      "https://facebook.com/justjapa",
      "https://linkedin.com/company/justjapa"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "hello@justjapa.com",
      "contactType": "Customer Service"
    },
    "foundingDate": "2024",
    "keywords": "japa, migration platform, visa assistance, relocation services, emigration from nigeria, travel abroad",
    "areaServed": {
      "@type": "Country",
      "name": "Nigeria"
    },
    "serviceType": [
      "Migration Services",
      "Visa Assistance",
      "Relocation Planning",
      "Travel Documentation",
      "Agent Matching"
    ]
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "JUSTJAPA",
    "url": "https://justjapa.com",
    "description": "The smarter way to japa from Nigeria. Your all-in-one migration platform.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://justjapa.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
