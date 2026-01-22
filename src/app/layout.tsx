import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Unique Visa Consultancy - Your Gateway to Global Opportunities",
  description: "Professional visa consultancy services for Turkey, Germany, Schengen countries, USA, UK, and Australia. Expert guidance for student, visit, and business visas.",
  keywords: ["visa consultancy", "student visa", "tourist visa", "business visa", "immigration services", "visa application"],
  authors: [{ name: "Unique Visa Consultancy Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Unique Visa Consultancy",
    description: "Professional visa services for global opportunities",
    url: "https://unique1.pages.dev",
    siteName: "Unique Visa Consultancy",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
