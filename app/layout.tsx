import type { Metadata } from "next";
import { Poppins, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const devanagari = Noto_Sans_Devanagari({
  weight: ['400', '500', '600', '700'],
  subsets: ["devanagari"],
  variable: "--font-devanagari",
});

export const metadata: Metadata = {
  title: "Sri Harivyas Nikunja Mandir | Nimbarka Sampradaya",
  description: "Experience divine love and devotion through the teachings of Nimbarka Sampradaya at Sri Harivyas Nikunja Mandir",
  keywords: "Nimbarka Sampradaya, Radha Krishna, Hindu Temple, Vrindavan, Bhakti, Devotion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${devanagari.variable} antialiased`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
