import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { seoConfig } from "@/lib/data";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://forgealloyracing.com"),
  title: seoConfig.title,
  description: seoConfig.description,
  keywords: seoConfig.keywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: seoConfig.title,
    description: seoConfig.description,
    url: "https://forgealloyracing.com",
    siteName: "ForgeAlloy Racing",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ForgeAlloy Racing",
    "url": "https://forgealloyracing.com",
    "logo": "https://sc01.alicdn.com/kf/Ac2060c7e96074a7cb1298195df57a5fcu.jpg",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+86-17860625953",
      "contactType": "sales",
      "email": "sales@forgealloyracing.com",
      "areaServed": "Worldwide",
      "availableLanguage": ["English", "Chinese"]
    },
    "sameAs": [
      "https://www.facebook.com/forgealloyracing",
      "https://www.instagram.com/forgealloyracing"
    ]
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ForgeAlloy Racing",
    "url": "https://forgealloyracing.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://forgealloyracing.com/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
