import type { Metadata } from "next";
import Link from "next/link";
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
  title: "Deshi Drip",
  description: "Deshi Drip — streetwear weekly drops, bundles, and world exclusives.",
  metadataBase: new URL("https://deshi-drip.local"),
  openGraph: {
    title: "Deshi Drip",
    description:
      "Weekly drops, curated bundles, and world exclusive collections across four brands.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white text-zinc-900`}>
        <header className="border-b border-zinc-200 sticky top-0 bg-white/80 backdrop-blur z-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="font-bold tracking-tight text-xl">Deshi Drip</Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link href="/brands" className="hover:underline">Brands</Link>
              <Link href="/drops" className="hover:underline">Weekly Drops</Link>
              <Link href="/bundles" className="hover:underline">Bundles</Link>
              <Link href="/exclusives" className="hover:underline">World Exclusives</Link>
              <Link href="/cart" className="hover:underline">Cart</Link>
            </nav>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="border-t border-zinc-200 py-10 text-sm text-zinc-500">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between">
            <span>© {new Date().getFullYear()} Deshi Drip</span>
            <span>Built with Next.js</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
