import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Providers from "@/components/Providers";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Delices Artisan Spices | Premium Delice",
  description: "Ayurvedic digestion and wellness spice blend — 12 herbs, stone-ground, small-batch crafted.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ivory text-dark-coffee">
        <Providers>
          <ScrollProgressBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
