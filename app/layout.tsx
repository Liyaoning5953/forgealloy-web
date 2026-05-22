import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://forgealloyracing.com"),
  title: "ForgeAlloy | Premium Custom Forged Wheels Manufacturer",
  description: "ForgeAlloy specializes in high-end forged wheel manufacturing for sports cars, luxury SUVs, off-road builds, and trucks. 15-28 inch custom OEM & ODM support.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ForgeAlloy | Custom Forged Wheels",
    description: "Premium forged wheel manufacturing with full OEM & ODM support.",
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
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
